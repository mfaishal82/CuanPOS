const { invoiceGenerator } = require("../helpers/invoiceGenerator")
const redis = require("../helpers/redis")
const { Sale, SaleItem, Product, Category, sequelize } = require("../models")
const { Op } = require("sequelize")
const { QueryTypes } = require("sequelize")

class SaleController {
  static async getAllSales(req, res, next){
    try{
      const allSales = await Sale.findAll({
        include: [{
          model: SaleItem,
          include: [{
            model: Product,
            attributes: ['id', 'name', 'price']
          }]
        }],
        order: [['updatedAt', 'DESC']]
      })

      res.status(200).json({
        message: "Success get all sales",
        data: {
          allSales
        }
      })
    }catch(error){
      next(error)
    }
  }

  static async getAllSaleItems(req, res, next) {
    try {
      const { order, sort } = req.query
      const saleItems = await SaleItem.findAll({
        include: [{
          model: Sale,
          attributes: ['id', 'invoice_number', 'total', 'payment_amount', 'change_amount', 'payment_method', 'createdAt']
        }, {
          model: Product,
          attributes: ['id', 'name', 'price', 'image'],
          include: Category
        }],
        order: [[order || 'createdAt', sort || 'DESC']]
      })
      res.status(200).json({
        message: "Success get all sale items",
        data: {
          saleItems
        }
      })
    } catch(error) {
      next(error)
    }
  }

  static async getSaleById(req, res, next){
    try{
      const id = req.params.id
      const sale = await Sale.findByPk(id, {
        include: [{
          model: SaleItem,
          include: [{
            model: Product,
            attributes: ['id', 'name', 'price']
          }]
        }]
      })
      if(!sale) throw { name: "NotFound" }

      res.status(200).json({
        message: "Success get sale",
        data: {
          sale
        }
      })
    }catch(error){
      next(error)
    }
  }

  //Sebagian dari AI
  static async addSaleItem(req, res, next){
    const t = await sequelize.transaction()
    try{
      const { items, payment_amount, change_amount, payment_method } = req.body

      // Validasi items
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          message: "Items must be a non-empty array"
        })
      }

      // Fetch semua products sekaligus (bukan per item dalam loop)
      const productIds = items.map(item => item.product_id)
      const products = await Product.findAll({
        where: { id: productIds },
        transaction: t
      })

      const productsById = {}
      for (const product of products) {
        productsById[product.id] = product
      }

      const sale = await Sale.create({
        user_id: req.user.id,
        invoice_number: '',
        total: 0,
        payment_amount,
        change_amount,
        payment_method
      }, { transaction: t })

      let totalSaleAmount = 0
      const productsToUpdate = [] // Batch update nanti

      // Process setiap item (karena bentuk array)
      for (const item of items) {
        const { product_id, quantity } = item

        if (!product_id || !quantity || quantity <= 0) {
          return res.status(400).json({
            message: "Invalid product_id or quantity"
          })
        }

        const product = productsById[product_id]
        if (!product) {
          throw { name: "NotFound", message: `Product ${product_id} not found` }
        }

        if (product.stock < quantity) {
          throw { name: "InsufficientStock", message: `Insufficient stock for ${product.name}` }
        }

        const subtotal = quantity * product.price

        await SaleItem.create({
          sale_id: sale.id,
          product_id: product.id,
          quantity,
          price: product.price,
          subtotal
        }, { transaction: t })

        product.stock -= quantity
        product.sold_count = (product.sold_count || 0) + quantity
        productsToUpdate.push(product)

        totalSaleAmount += subtotal
      }

      // Batch update semua products sekaligus (bukan satu-satu)
      for (const product of productsToUpdate) {
        await product.save({ transaction: t })
      }

      // Update sale total
      await sale.update({
        total: totalSaleAmount,
        invoice_number: invoiceGenerator(sale.id)
      }, { transaction: t })

      const keys = await redis.keys("products:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      await t.commit()
      res.status(201).json({
        message: "Success add sale item",
        data: {
          sale_id: sale.id,
          invoice_number: sale.invoice_number,
          total: totalSaleAmount
        }
      })
    } catch(error){
      await t.rollback()
      next(error)
    }
  }

  //! dari sini ke bawah digenerate AI
  static async getSalesSummary(req, res, next) {
    try {
      const { date } = req.query

      let whereSale = {}
      let meta = {}

      if (date) {
        const start = new Date(date)
        start.setHours(0, 0, 0, 0)

        const end = new Date(date)
        end.setHours(23, 59, 59, 999)

        whereSale.createdAt = {
          [Op.between]: [start, end]
        }

        meta.filter = {
          type: 'date',
          value: date
        }
      }

      // =============================
      // SEMUA WAKTU
      // =============================
      const [
        allRevenue,
        allTransactions,
        allProductsSold
      ] = await Promise.all([
        Sale.sum('total'),
        Sale.count(),
        SaleItem.sum('quantity')
      ])

      // =============================
      // BERDASARKAN FILTER
      // =============================
      const [
        filteredRevenue,
        filteredTransactions,
        filteredProductsSold
      ] = await Promise.all([
        Sale.sum('total', { where: whereSale }),
        Sale.count({ where: whereSale }),
        SaleItem.sum('quantity', {
          include: [{
            model: Sale,
            required: true,
            attributes: [],
            where: whereSale
          }]
        })
      ])

      res.json({
        message: 'Success get sales summary',
        data: {
          all: {
            total_revenue: allRevenue || 0,
            total_transactions: allTransactions || 0,
            total_products_sold: allProductsSold || 0
          },
          filtered: {
            total_revenue: filteredRevenue || 0,
            total_transactions: filteredTransactions || 0,
            total_products_sold: filteredProductsSold || 0
          }
        },
        meta
      })
    } catch (error) {
      next(error)
    }
  }

  // Analytics Chart - Daily data
  static async getDailyAnalytics(req, res, next) {
    try {
      const { month, year } = req.query
      const currentDate = new Date()
      const queryMonth = parseInt(month) || currentDate.getMonth() + 1
      const queryYear = parseInt(year) || currentDate.getFullYear()

      const rawData = await sequelize.query(`
        SELECT
          DATE(s."createdAt")::text as date,
          COALESCE(SUM(s."total"), 0)::numeric as total_revenue,
          COUNT(DISTINCT s."id")::integer as total_transactions,
          COALESCE(SUM(si."quantity"), 0)::integer as total_products_sold,
          COUNT(DISTINCT s."user_id")::integer as unique_customers
        FROM "Sales" s
        LEFT JOIN "SaleItems" si ON s."id" = si."sale_id"
        WHERE EXTRACT(MONTH FROM s."createdAt") = :month
          AND EXTRACT(YEAR FROM s."createdAt") = :year
        GROUP BY DATE(s."createdAt")
        ORDER BY DATE(s."createdAt") ASC
      `, {
        replacements: { month: queryMonth, year: queryYear },
        type: QueryTypes.SELECT
      })

      res.json({
        message: 'Success get daily analytics',
        data: {
          period: 'daily',
          month: queryMonth,
          year: queryYear,
          analytics: rawData.map(item => ({
            date: item.date,
            total_revenue: parseFloat(item.total_revenue) || 0,
            total_transactions: parseInt(item.total_transactions) || 0,
            total_products_sold: parseInt(item.total_products_sold) || 0,
            unique_customers: parseInt(item.unique_customers) || 0
          }))
        }
      })
    } catch (error) {
      next(error)
    }
  }

  // Analytics Chart - Weekly data
  static async getWeeklyAnalytics(req, res, next) {
    try {
      const { month, year } = req.query
      const currentDate = new Date()
      const queryMonth = parseInt(month) || currentDate.getMonth() + 1
      const queryYear = parseInt(year) || currentDate.getFullYear()

      const rawData = await sequelize.query(`
        SELECT
          EXTRACT(WEEK FROM s."createdAt")::integer as week,
          DATE_TRUNC('week', s."createdAt")::date::text as week_start,
          COALESCE(SUM(s."total"), 0)::numeric as total_revenue,
          COUNT(DISTINCT s."id")::integer as total_transactions,
          COALESCE(SUM(si."quantity"), 0)::integer as total_products_sold,
          COUNT(DISTINCT s."user_id")::integer as unique_customers
        FROM "Sales" s
        LEFT JOIN "SaleItems" si ON s."id" = si."sale_id"
        WHERE EXTRACT(MONTH FROM s."createdAt") = :month
          AND EXTRACT(YEAR FROM s."createdAt") = :year
        GROUP BY EXTRACT(WEEK FROM s."createdAt"), DATE_TRUNC('week', s."createdAt")
        ORDER BY EXTRACT(WEEK FROM s."createdAt") ASC
      `, {
        replacements: { month: queryMonth, year: queryYear },
        type: QueryTypes.SELECT
      })

      res.json({
        message: 'Success get weekly analytics',
        data: {
          period: 'weekly',
          month: queryMonth,
          year: queryYear,
          analytics: rawData.map(item => ({
            week: parseInt(item.week) || 0,
            week_start: item.week_start,
            total_revenue: parseFloat(item.total_revenue) || 0,
            total_transactions: parseInt(item.total_transactions) || 0,
            total_products_sold: parseInt(item.total_products_sold) || 0,
            unique_customers: parseInt(item.unique_customers) || 0
          }))
        }
      })
    } catch (error) {
      next(error)
    }
  }

  // Analytics Chart - Monthly data
  static async getMonthlyAnalytics(req, res, next) {
    try {
      const { year } = req.query
      const currentYear = parseInt(year) || new Date().getFullYear()

      const rawData = await sequelize.query(`
        SELECT
          EXTRACT(MONTH FROM s."createdAt")::integer as month,
          TO_CHAR(s."createdAt", 'YYYY-MM') as month_date,
          COALESCE(SUM(s."total"), 0)::numeric as total_revenue,
          COUNT(DISTINCT s."id")::integer as total_transactions,
          COALESCE(SUM(si."quantity"), 0)::integer as total_products_sold,
          COUNT(DISTINCT s."user_id")::integer as unique_customers
        FROM "Sales" s
        LEFT JOIN "SaleItems" si ON s."id" = si."sale_id"
        WHERE EXTRACT(YEAR FROM s."createdAt") = :year
        GROUP BY EXTRACT(MONTH FROM s."createdAt"), TO_CHAR(s."createdAt", 'YYYY-MM')
        ORDER BY EXTRACT(MONTH FROM s."createdAt") ASC
      `, {
        replacements: { year: currentYear },
        type: QueryTypes.SELECT
      })

      res.json({
        message: 'Success get monthly analytics',
        data: {
          period: 'monthly',
          year: currentYear,
          analytics: rawData.map(item => ({
            month: parseInt(item.month) || 0,
            month_date: item.month_date,
            total_revenue: parseFloat(item.total_revenue) || 0,
            total_transactions: parseInt(item.total_transactions) || 0,
            total_products_sold: parseInt(item.total_products_sold) || 0,
            unique_customers: parseInt(item.unique_customers) || 0
          }))
        }
      })
    } catch (error) {
      next(error)
    }
  }

  // Top Products Analytics
  static async getTopProductsAnalytics(req, res, next) {
    try {
      const { limit = 10, month, year } = req.query
      const currentDate = new Date()
      const queryMonth = parseInt(month) || currentDate.getMonth() + 1
      const queryYear = parseInt(year) || currentDate.getFullYear()
      const queryLimit = parseInt(limit) || 10

      const rawData = await sequelize.query(`
        SELECT
          p."id",
          p."name",
          p."price",
          p."image",
          COALESCE(SUM(si."quantity"), 0)::integer as total_sold,
          COALESCE(SUM(si."quantity" * si."price"), 0)::numeric as total_revenue
        FROM "Products" p
        LEFT JOIN "SaleItems" si ON p."id" = si."product_id"
        LEFT JOIN "Sales" s ON si."sale_id" = s."id"
        WHERE (s."id" IS NULL OR (EXTRACT(MONTH FROM s."createdAt") = :month AND EXTRACT(YEAR FROM s."createdAt") = :year))
        GROUP BY p."id", p."name", p."price", p."image"
        ORDER BY total_sold DESC
        LIMIT :limit
      `, {
        replacements: { month: queryMonth, year: queryYear, limit: queryLimit },
        type: QueryTypes.SELECT
      })

      res.json({
        message: 'Success get top products analytics',
        data: {
          period: 'top_products',
          month: queryMonth,
          year: queryYear,
          limit: queryLimit,
          products: rawData.map(product => ({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price) || 0,
            image: product.image,
            total_sold: parseInt(product.total_sold) || 0,
            total_revenue: parseFloat(product.total_revenue) || 0
          }))
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SaleController;

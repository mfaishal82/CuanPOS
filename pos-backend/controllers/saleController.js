const { invoiceGenerator } = require("../helpers/invoiceGenerator")
const { Sale, SaleItem, Product, Category, sequelize } = require("../models")
const { Op } = require("sequelize")

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

  static async addSaleItem(req, res, next){
    const t = await sequelize.transaction()
    try{
      const { items, sale_id, payment_amount, change_amount, payment_method } = req.body
      let sale = await Sale.findByPk(sale_id, { transaction: t })

      if(!sale) {
        sale = await Sale.create({
          user_id: req.user.id,
          invoice_number: '',
          total: 0,
          payment_amount,
          change_amount,
          payment_method
        }, { transaction: t })
      }

      // memastikan input yg diterima dalam bentuk array
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          message: "Items must be a non-empty array"
        })
      }

      let totalSaleAmount = 0

      // setiap item diproses (karena berbentuk array)
      for (const item of items) {
        const { product_id, quantity } = item

        if (!product_id || !quantity || quantity <= 0) {
          throw { name: "ValidationError", message: "Invalid product_id or quantity" }
        }

        const product = await Product.findByPk(product_id, { transaction: t })
        if (!product) throw { name: "NotFound"}

        // Cek stok
        if (product.stock < quantity) {
          throw { name: "InsufficientStock"}
        }

        const subtotal = quantity * product.price
        await SaleItem.create({
          sale_id: sale.id,
          product_id: product.id,
          quantity,
          price: product.price,
          subtotal
        }, { transaction: t })

        await product.update({
          stock: product.stock - quantity
        }, { transaction: t })

        await product.increment('sold_count', { by: quantity }, { transaction: t })

        totalSaleAmount += subtotal
      }

      await sale.update({
        total: totalSaleAmount,
        invoice_number: invoiceGenerator(sale.id)
      }, { transaction: t })

      await product.update({
        stock: currentStock
      }, { transaction: t })

      await product.increment('sold_count', { by: quantity }, { transaction: t })

      await t.commit()
      res.status(201).json({ message: "Success add sale item" })
    }catch(error){
      await t.rollback()
      next(error)
    }
  }

  // dari AI
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
}

module.exports = SaleController;

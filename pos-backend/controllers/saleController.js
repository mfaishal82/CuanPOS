const { invoiceGenerator } = require("../helpers/invoiceGenerator")
const { Sale, SaleItem, Product, sequelize } = require("../models")

class SaleController {
  static async addSaleItem(req, res, next){
    const t = await sequelize.transaction()
    try{
      const { sale_id, product_id, quantity } = req.body
      let sale = await Sale.findByPk(sale_id, { transaction: t })

      if(!sale) {
        sale = await Sale.create({
          user_id: req.user.id,
          invoice_number: '',
          total: 0,
          payment_amount: 0,
          change_amount: 0,
          payment_method: 'Cash'
        }, { transaction: t })
      }

      const product = await Product.findByPk(product_id, { transaction: t })
      if(!product) throw { name: "NotFound" }

      let subtotal = quantity * product.price
      let currentStock = product.stock

      if(currentStock < quantity) {
        throw { name: "InsufficientStock" }
      } else {
        currentStock = currentStock - quantity
      }

      await SaleItem.create({
        sale_id: sale.id,
        product_id: product.id,
        quantity,
        price: product.price,
        subtotal
      }, { transaction: t })

      let saleItems = await SaleItem.findAll({
        where:{
          sale_id: sale.id
        }
      }, { transaction: t })

      let total = 0
      for (let x = 0; x < saleItems.length; x++){
        total = total + saleItems[x].subtotal
      }

      await sale.update({
        total,
        invoice_number: invoiceGenerator(sale.id)
      }, { transaction: t })

      await product.update({
        stock: currentStock
      }, { transaction: t })

      await t.commit()
      res.status(201).json({ message: "Success add sale item" })
    }catch(error){
      await t.rollback()
      next(error)
    }
  }
}

module.exports = SaleController;

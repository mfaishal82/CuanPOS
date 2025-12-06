const { Purchase, PurchaseItem, Product, sequelize } = require("../models")
const { Op } = require("sequelize")

class PurchaseController{
  static async addPurchaseItem(req, res, next){
    try{
      const { purchase_id, product_id, quantity } = req.body

      const t = await sequelize.transaction()
      const product = await Product.findByPk(product_id, { transaction: t })
      if(!product) throw { name: "NotFound" }

      const purchase = await Purchase.findByPk(purchase_id, { transaction: t })
      if(!purchase) throw { name: "NotFound" }

      const subtotal = quantity * product.cost_price

      await PurchaseItem.create({
        purchase_id,
        product_id,
        quantity,
        cost_price: product.cost_price,
        subtotal
      }, { transaction: t })

      await product.update({
        stock: product.stock + quantity
      }, { transaction: t })

      const allItems = await PurchaseItem.findAll({
        where: {
          purchase_id
        }
      }, { transaction: t })

      let totalCost = 0
      for (let i = 0; i < allItems.length; i++){
        console.log(allItems[i])
        totalCost = totalCost + allItems[i].subtotal
      }

      await purchase.update({
        total_cost: totalCost
      }, { transaction: t })

      await t.commit()

      res.status(201).json({
        message: "Success add purchase item"
      })
    }catch(error){
      await t.rollback()
      next(error)
    }
  }
}

module.exports = PurchaseController

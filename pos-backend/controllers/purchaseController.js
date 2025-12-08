const { Purchase, PurchaseItem, Product, sequelize } = require("../models")
const { Op } = require("sequelize")

class PurchaseController{
  static async getAllPurchases(req, res, next){
    try{
      const purchases = await Purchase.findAll({
        include: [{
          model: PurchaseItem,
          include: [{
            model: Product,
            attributes: ['id', 'name', 'cost_price']
          }]
        }],
        order: [[ 'updatedAt', 'DESC' ]]
      })

      res.status(200).json({
        message: "Success get all purchases",
        data: {
          purchases
        }
      })
    }catch(error){
      next(error)
    }
  }

  static async getPurchaseById(req, res, next){
    try{
      const id = req.params.id
      const purchase = await Purchase.findByPk(id, {
        include: [{
          model: PurchaseItem,
          include: [{
            model: Product,
            attributes: ['id', 'name', 'cost_price']
          }]
        }]
      })
      if(!purchase) throw { name: "NotFound" }

      res.status(200).json(purchase)
    }catch(error){
      next(error)
    }
  }

  static async addPurchaseItem(req, res, next){
    const t = await sequelize.transaction()
    try{
      const { purchase_id, product_id, quantity } = req.body

      const product = await Product.findByPk(product_id, { transaction: t })
      if(!product) throw { name: "NotFound" }

      let purchase = await Purchase.findByPk(purchase_id, { transaction: t })
      if(!purchase) {
        purchase = await Purchase.create({
          user_id: req.user.id,
          total_cost: 0
        }, { transaction: t })
      }

      const subtotal = quantity * product.cost_price

      await PurchaseItem.create({
        purchase_id: purchase.id,
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
          purchase_id: purchase.id
        },
      }, { transaction: t })

      let totalCost = 0
      for (let i = 0; i < allItems.length; i++){
        // console.log(allItems[i])
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

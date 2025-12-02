const { Category, Product } = require("../models")

class CategoryController {

  static async getCategories(req, res, next) {
    try{
      const categories = await Category.findAll({
        include: {
          model: Product,
          attribute: ['name', 'sku', 'price', 'cost_price', 'stock']
        }
      })

      res.status(200).json(categories)
    }catch(error){
      next(error)
    }
  }
}

module.exports = CategoryController

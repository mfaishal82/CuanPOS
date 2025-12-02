const { Product, User, Category } = require("../models")

class ProductController {
  static async getProducts(req, res, next) {
    try{
      const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ['name']
        },
        order: [['id', 'ASC']]
      })

      res.status(200).json(products)
    } catch(error){
      next(error)
    }
  }

  static async getProductById(req, res, next){
    try{
      const id = req.params.id

      const product = await Product.findByPk(id)

      if(!product) throw { name: "NotFound" }

      res.status(200).json(product)
    } catch(error){
      next(error)
    }
  }

  static async createProduct(req, res, next){
    try{
      const { name, price, cost_price, stock, category_id } = req.body

      await Product.create({name, price, cost_price, stock, category_id})

      res.status(201).json({
        message: "Success"
      })
    }catch(error){
      next(error)
    }
  }

  static async editProduct(req, res, next){
    try{
      const id = req.params.id
      const { name, price, cost_price, stock, category_id } = req.body

      const product = await Product.findByPk(id)
      if(!product) {
        throw { name: "NotFound" }
      }

      await product.update({ name, price, cost_price, stock, category_id })

      res.status(200).json({
        message: "Update success"
      })
    }catch(error){
      next(error)
    }
  }

  static async deleteProductById(req, res, next){
    try{
      const id = req.params.id

      const product = await Product.findByPk(id)
      if(!product) {
        throw { name: "NotFound" }
      }

      await product.destroy()
      res.status(200).json({
        message: "Delete Success"
      })
    }catch(error){
      next(error)
    }
  }
}

module.exports = ProductController;

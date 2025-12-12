const { Product, User, Category } = require("../models")
const { Op } = require('sequelize')

class ProductController {
  static async getProducts(req, res, next) {
    try{
      let { page, limit, searchProduct } = req.query
      page = parseInt(page) || 1
      limit = parseInt(limit) || 10
      let offset = (page - 1) * limit // example: page 1 - 1 = 0 x 10 = 0 <-- offset / batas bawah

      let option = searchProduct ? {
          name: {
            [Op.iLike] : `%${searchProduct}%`
          }
      } : {}

      // doc sequelize:
      // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall

      const { count, rows } = await Product.findAndCountAll({
        where: option,
        include: {
          model: Category,
          attributes: ['name']
        },
        order: [['updatedAt', 'DESC']],
        offset,
        limit
      })

      res.status(200).json({
        message: `${searchProduct ? 'Success get product name: ' + searchProduct : 'Success get all products'}`,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        },
        data: rows
      })
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

const redis = require("../helpers/redis")
const { Product, User, Category } = require("../models")
const { Op } = require('sequelize')

class ProductController {
  static async getProducts(req, res, next) {
    try{
      let { page, limit, searchProduct } = req.query
      page = parseInt(page) || 1
      limit = parseInt(limit) || 10
      const offset = (page - 1) * limit // example: page 1 - 1 = 0 x 10 = 0 <-- offset / batas bawah

      const cacheKey = `products:${page}:${limit}:${searchProduct || 'all'}`
      const cacheData = await redis.get(cacheKey)
      if(cacheData) {
        // console.log("lewat")
        return res.status(200).json(JSON.parse(cacheData))
      }
      // console.log(cacheKey, '(<=== ini cache key')
      // console.log(cacheData, '(<=== ini cache data')

      const option = searchProduct && searchProduct !== 'all' ? {
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

      // const cekredis = await redis.get('products')
      // console.log(cekredis)

      const response = {
        message: `${searchProduct ? 'Success get product name: ' + searchProduct : 'Success get all products'}`,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        },
        data: rows
      }

      await redis.set(cacheKey, JSON.stringify(response))

      res.status(200).json(response)
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
      const { name, price, cost_price, image, stock, category_id } = req.body

      await Product.create({name, price, cost_price, image, stock, category_id})

      const keys = await redis.keys('products:*')
      if(keys.length > 0) {
        await redis.del(keys)
      }

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

      const keys = await redis.keys('products:*')
      if(keys.length > 0) {
        await redis.del(keys)
      }

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

      const keys = await redis.keys('products:*')
      if(keys.length > 0) {
        await redis.del(keys)
      }

      res.status(200).json({
        message: "Delete Success"
      })
    }catch(error){
      next(error)
    }
  }
}

module.exports = ProductController;

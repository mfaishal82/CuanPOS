const { randomUUID } = require("crypto");
const imageKit = require("../helpers/imagekit");
const redis = require("../helpers/redis");
const {
  Product,
  User,
  Category,
  Purchase,
  PurchaseItem,
} = require("../models");
const { Op } = require("sequelize");

class ProductController {
  static async getProducts(req, res, next) {
    try {
      let { page, limit, searchProduct, order, sort, category } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const offset = (page - 1) * limit; // contoh: page 1 - 1 = 0 x 10 = 0 <-- offset / batas bawah

      const cacheKey = `products:${page}:${limit}:${searchProduct || "all"}:${order || "updatedAt"}:${sort || "DESC"}:${category || "all"}`;
      const cacheData = await redis.get(cacheKey);
      if (cacheData) {
        // console.log("lewat")
        return res.status(200).json(JSON.parse(cacheData));
      }
      // console.log(cacheKey, '(<=== ini cache key')
      // console.log(cacheData, '(<=== ini cache data')

      const option = {};
      if (searchProduct && searchProduct !== "all") {
        option.name = {
          [Op.iLike]: `%${searchProduct}%`,
        };
      }

      const includeClause = {
        model: Category,
        attributes: ["name"],
      };
      if (category && category !== "all") {
        includeClause.where = {
          name: {
            [Op.iLike]: `%${category}%`,
          },
        };
        includeClause.required = true;
      }

      // doc sequelize:
      // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall

      const { count, rows } = await Product.findAndCountAll({
        where: option,
        include: includeClause,
        order: [
          [
            `${order ? order : "updatedAt"}`,
            `${sort ? sort.toUpperCase() : "DESC"}`,
          ],
        ],
        offset,
        limit,
      });

      // const cekredis = await redis.get('products')
      // console.log(cekredis)

      const response = {
        message: `${searchProduct ? "Success get product name: " + searchProduct : "Success get all products"}`,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
        data: rows,
      };

      await redis.set(cacheKey, JSON.stringify(response));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const id = req.params.id;

      const product = await Product.findByPk(id);

      if (!product) throw { name: "NotFound" };

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { name, price, cost_price, stock, category_id, barcode } = req.body;
      // console.log(req.file)
      const category = category_id === "" ? null : category_id;

      if (!req.file) {
        throw { name: "BadRequest" };
      }

      let checkType = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

      if (!checkType.includes(req.file.mimetype)) {
        throw { name: "BadRequest" };
      }

      // https://github.com/imagekit-developer/imagekit-nodejs

      // console.log(req.file)

      const response = await imageKit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `${name}-${randomUUID()}.png`,
        folder: "/products",
      });

      // console.log(response);

      await Product.create({
        name,
        price,
        cost_price,
        barcode,
        image: response.url,
        imageId: response.fileId,
        stock,
        category,
      });

      const keys = await redis.keys("products:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      res.status(201).json({
        message: "Success",
      });
    } catch (error) {
      // console.log('Error name:', error.name)
      // console.log('Error message:', error.message)
      // console.log('Error response:', error.response)  // ← ImageKit error detail
      // console.log('Full error:', error)
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const id = req.params.id;
      const { name, price, cost_price, barcode, stock, category_id } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        throw { name: "NotFound" };
      }

      let fileId = product.imageId;
      // console.log("req.file:", req.file);

      // let checkImage = await imageKit.files.get(fileId);
      // console.log(checkImage, "<<< checkImage")

      if (fileId) {
        try {
          await imageKit.files.delete(fileId);
          // console.log("Old image deleted");
        } catch (err) {
          console.log("Old image not found or error deleting:", err.message);
        }
      }

      let updateData = { name, price, cost_price, barcode, stock, category_id };

      if (req.file) {
        let checkType = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

        // console.log(req.file);
        if (!checkType.includes(req.file.mimetype)) {
          throw { name: "BadRequest" };
        }

        const response = await imageKit.files.upload({
          file: req.file.buffer.toString("base64"),
          fileName: `${product.name}-${randomUUID()}.png`,
          folder: "/products",
        });
        // console.log("New image uploaded:", response);

        updateData.image = response.url || "";
        updateData.imageId = response.fileId || "";
      }

      await product.update(updateData);

      const keys = await redis.keys("products:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      res.status(200).json({
        message: "Update success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const id = req.params.id;

      const product = await Product.findByPk(id);
      if (!product) {
        throw { name: "NotFound" };
      }

      const fileId = product.imageId;

      await product.destroy();
      await imageKit.files.delete(fileId);

      const keys = await redis.keys("products:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      res.status(200).json({
        message: "Delete Success",
      });
    } catch (error) {
      next(error);
    }
  }

  // Tambahan dari AI
  static async addProductWithInitialPurchase(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        name,
        selling_price,
        cost_price,
        stock,
        category_id,
        supplier_id,
        invoice_number,
        purchase_date,
      } = req.body;

      // 1️⃣ Create product (stok awal 0)
      const product = await Product.create(
        {
          name,
          selling_price,
          cost_price,
          stock: 0,
          category_id,
        },
        { transaction: t },
      );

      // 2️⃣ Jika ada stok awal → purchase
      if (Number(stock) > 0) {
        const totalCost = stock * cost_price;

        const purchase = await Purchase.create(
          {
            user_id: req.user.id,
            supplier_id,
            invoice_number,
            purchase_date,
            total_cost: totalCost,
            status: "completed",
          },
          { transaction: t },
        );

        await PurchaseItem.create(
          {
            purchase_id: purchase.id,
            product_id: product.id,
            quantity: stock,
            cost_price,
            subtotal: totalCost,
            status: "completed",
          },
          { transaction: t },
        );

        await product.update(
          {
            stock,
          },
          { transaction: t },
        );
      }

      await t.commit();

      res.status(201).json({
        message: "Product and initial purchase created successfully",
        product_id: product.id,
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = ProductController;

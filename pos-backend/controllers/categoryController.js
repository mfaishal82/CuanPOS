const { Category, Product } = require("../models");
const { Op } = require("sequelize");
class CategoryController {
  static async getCategories(req, res, next) {
    try {
      let { searchCategory } = req.query;

      let options = {};

      if (searchCategory) {
        options = {
          name: {
            [Op.iLike]: `%${searchCategory}%`,
          },
        };
      }

      const categories = await Category.findAll({
        include: {
          model: Product,
          attributes: ["name", "sku", "price", "cost_price", "stock"],
        },
        where: options,
      });

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const category = await Category.findAll();

      if (
        category.some((item) => item.name.toLowerCase() === name.toLowerCase())
      ) {
        throw new Error("Category name already exist");
      }

      const newCategory = await Category.create({
        name,
      });

      // console.log(newCategory)
      res.status(201).json({
        message: "Success",
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id, {
        include: [
          {
            model: Product,
            attributes: ["name", "sku", "price", "cost_price", "stock"],
          },
        ],
      });
      if (!category) throw { name: "NotFound" };

      res.status(200).json({
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      const { name } = req.body;

      const category = await Category.findByPk(id);
      if (!category) throw { name: "NotFound" };

      await category.update({
        name,
      });

      res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);

      await category.destroy();

      res.status(200).json({
        message: "Success delete",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;

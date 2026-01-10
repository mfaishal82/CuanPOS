'use strict';
const {
  Model
} = require('sequelize');
const { skuProduct } = require('../helpers/skuGenerator');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "category_id" })
      Product.hasMany(models.SaleItem, { foreignKey: "product_id" })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name product is required" },
        notEmpty: { msg: "Name product is required" }
      }
    },
    sku: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price product is required" },
        notEmpty: { msg: "Price product is required" },
        isInt: true,
        min: 0
      }
    },
    cost_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Cost price product is required" },
        notEmpty: { msg: "Cost price product is required" },
        isInt: true,
        min: 0
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://ik.imagekit.io/myfiles/default-image-1.jpg?updatedAt=1766536256955',
      validate: {
        notNull: { msg: "Image product is required" },
        notEmpty: { msg: "Image product is required" },
      }
    },
    imageId: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0
      }
    },
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      afterCreate: async (product) => {
        product.sku = skuProduct(product.name, product.id)
        await product.save()
      }
    }
  });
  return Product;
};

'use strict';
const {
  Model
} = require('sequelize');
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
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    cost_price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://ik.imagekit.io/myfiles/default-image-1.jpg?updatedAt=1766536256955'
    },
    imageId: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 0
      }
    },
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

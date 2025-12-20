'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SaleItem.belongsTo(models.Sale, { foreignKey: "sale_id" })
      SaleItem.belongsTo(models.Product, { foreignKey: "product_id" })
    }
  }
  SaleItem.init({
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SaleItem',
  });
  return SaleItem;
};

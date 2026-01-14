'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseItem.belongsTo(models.Purchase, { foreignKey: "purchase_id" })
      PurchaseItem.belongsTo(models.Product, { foreignKey: "product_id" })
    }
  }
  PurchaseItem.init({
    purchase_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1
      }
    },
    cost_price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 0
      }
    },
    subtotal: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 0
      }
    },
    status: DataTypes.ENUM('draft', 'completed', 'canceled'),
  }, {
    sequelize,
    modelName: 'PurchaseItem',
  });
  return PurchaseItem;
};

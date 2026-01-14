'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sale.belongsTo(models.User, { foreignKey: "user_id" })
      Sale.hasMany(models.SaleItem, { foreignKey: "sale_id" })
    }
  }
  Sale.init({
    invoice_number: DataTypes.STRING,
    total: DataTypes.INTEGER,
    payment_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    change_amount: DataTypes.INTEGER,
    payment_method: {
      type: DataTypes.ENUM("Cash", "QRIS", "Transfer"),
      allowNull: false,
      defaultValue: "Cash"
    },
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};

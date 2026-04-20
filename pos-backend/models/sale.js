"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sale.belongsTo(models.User, { foreignKey: "user_id" });
      Sale.hasMany(models.SaleItem, { foreignKey: "sale_id" });
    }
  }
  Sale.init(
    {
      invoice_number: DataTypes.STRING,
      total: DataTypes.INTEGER,
      payment_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      change_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      payment_method: {
        type: DataTypes.ENUM("Cash", "QRIS", "Transfer"),
        allowNull: false,
        defaultValue: "Cash",
      },
      user_id: DataTypes.INTEGER,
      payment_status: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      external_transaction_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Sale",
    },
  );
  return Sale;
};

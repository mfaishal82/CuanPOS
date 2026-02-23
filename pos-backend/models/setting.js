"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setting.init(
    {
      shopName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Shop Name is required" },
          notEmpty: { msg: "Shop Name is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      logo: {
        type: DataTypes.STRING,
        defaultValue: "https://ik.imagekit.io/myfiles/No_Image_Available.jpg",
      },
      imageId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "imageId not found. imageId is required" },
          notEmpty: { msg: "imageId not found. imageId is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Setting",
    },
  );
  return Setting;
};

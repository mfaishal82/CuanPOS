'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Purchase, { foreignKey: 'user_id' })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Username is required" },
        notNull: { msg: "Username is required" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is required' },
        notNull: { msg: 'Password is required' },
        len: {
          args: [8, 14],
          msg: 'Password length should be between 5 and 14 characters'
        }
      }
    },
    role: DataTypes.ENUM('admin', 'user'),
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://ik.imagekit.io/myfiles/vecteezy_male-profile-picture-placeholder-for-social-media-forum_.jpg'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      },
      beforeUpdate: (user) => {
        if (user.changed('password')) {
          user.password = hashPassword(user.password)
        }
      }
    }
  });
  return User;
};

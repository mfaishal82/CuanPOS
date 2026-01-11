'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sku: {
        type: Sequelize.STRING,
        unique: true
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1000
        }
      },
      cost_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1000
        }
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://ik.imagekit.io/myfiles/default-image-1.jpg?updatedAt=1766536256955',
        validate: {
          notNull: { msg: "Image product is required" },
          notEmpty: { msg: "Image product is required" },
        }
      },
      imageId: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};

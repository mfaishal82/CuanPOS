'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Products', 'image', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://ik.imagekit.io/myfiles/default-image-1.jpg?updatedAt=1766536256955',
      validate: {
        notNull: { msg: "Image product is required" },
        notEmpty: { msg: "Image product is required" },
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('Products', 'image')
  }
};

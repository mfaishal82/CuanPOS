"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Settings", "imageId", {
      type: Sequelize.INTEGER,
      // allowNull: false,
      validate: {
        notNull: { msg: "imageId not found. imageId required" },
        notEmpty: { msg: "imageId not found. imageId required" },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Settings", "imageId");
  },
};

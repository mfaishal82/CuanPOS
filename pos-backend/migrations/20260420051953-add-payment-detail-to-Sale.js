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
    await queryInterface.addColumn("Sales", "payment_status", {
      type: Sequelize.ENUM("pending", "paid", "failed"),
      defaultValue: "pending",
      allowNull: false,
    });

    await queryInterface.addColumn("Sales", "external_transaction_id", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Sales", "payment_status");
    await queryInterface.removeColumn("Sales", "external_transaction_id");
  },
};

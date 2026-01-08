'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const products = [
      {
        name: 'Indomie',
        sku: 'test123-1241',
        price: 3000,
        cost_price: 3000,
        stock: 50,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
        },
      {
        name: 'Bengbeng',
        sku: 'test123-1252',
        price: 2500,
        cost_price: 2500,
        stock: 50,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
        },
      {
        name: 'Daia',
        sku: 'test123-1292',
        price: 5000,
        cost_price: 5000,
        stock: 50,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
        },
    ]

    await queryInterface.bulkInsert('Products', products)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Products')
  }
};

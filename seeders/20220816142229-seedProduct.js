'use strict';

const product = require('../models/product');

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

    let product = require('../data/product.json')

    product.forEach(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

     await queryInterface.bulkInsert('Products', product, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Products', null, {})

  }
};

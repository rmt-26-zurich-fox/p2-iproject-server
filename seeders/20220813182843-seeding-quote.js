'use strict';

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

     let data = require('../datas/quote.json')
     data.forEach(el => {
      delete el.id
       el.updatedAt = el.createdAt = new Date()
     })
 
     await queryInterface.bulkInsert('Posts', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * 
     */

    await queryInterface.bulkDelete('Posts')
  }
};

'use strict';
const fs= require('fs');
const { hashPassword } = require('../helpers/bcryptHelper');

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
   let data= JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
   data.forEach(el=>{
    el.createdAt = el.updatedAt = new Date()
    el.password= hashPassword(el.password)
   })
     await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null);
  }
};

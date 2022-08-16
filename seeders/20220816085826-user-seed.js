'use strict';
const { hash } = require('../helper/helper');
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require('../data/user.json')
    user.forEach(u => {
      u.password = hash(u.password)
      u.createdAt = new Date()
      u.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Users", user)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", user)
  }
};

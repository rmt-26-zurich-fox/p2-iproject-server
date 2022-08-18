'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const food = require('../data/food.json')
    food.forEach(f => {
      delete f.id
      f.createdAt = new Date()
      f.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Food", food)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Food", food)
  }
};

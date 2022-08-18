'use strict';
const fs = require("fs")
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'))
    let newData = data.map(el => {
      el.createdAt = new Date(),
      el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Categories', newData, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categories', null, {})
  }
};

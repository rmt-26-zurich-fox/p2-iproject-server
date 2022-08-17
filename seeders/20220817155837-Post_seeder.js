'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../post.json");
    data.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Posts', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = require("../data/category.json");
    categories.forEach((category) => {
      delete category.id;
      category.updatedAt = category.createdAt = new Date();
    });

    await queryInterface.bulkInsert("Categories", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

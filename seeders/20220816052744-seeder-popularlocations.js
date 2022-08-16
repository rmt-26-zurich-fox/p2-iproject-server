'use strict';
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let popular = JSON.parse(fs.readFileSync("./data/popularlocations.json", "utf-8"));
    popular.forEach(x => {
      x.createdAt = new Date();
      x.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("PopularLocations", popular, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PopularLocations', null, {});
  }
};

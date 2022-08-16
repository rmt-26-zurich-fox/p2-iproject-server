"use strict";

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
    const diseaseSeed = require("../data/disease.json");
    diseaseSeed.forEach((el) => {
      el.updatedAt = el.createdAt = new Date();
    });
    await queryInterface.bulkInsert("Diseases", diseaseSeed);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Diseases");
  },
};

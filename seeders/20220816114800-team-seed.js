"use strict";
const axios = require("axios");

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
    const response = await axios.get("https://www.balldontlie.io/api/v1/teams");
    const { data } = response.data;
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Teams", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
    Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Teams", null, {});
  },
};

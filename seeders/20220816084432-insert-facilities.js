"use strict";
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const facilities = JSON.parse(fs.readFileSync("./data/facility.json", "utf-8"));
    facilities.forEach((facility) => {
      delete facility.id;
      facility.createdAt = facility.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Facilities", facilities);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Facilities", null, {});
  },
};

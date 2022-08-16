"use strict";
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const housefacilities = JSON.parse(fs.readFileSync("./data/housefacility.json", "utf-8"));
    housefacilities.forEach((housefacility) => {
      delete housefacility.id;
      housefacility.createdAt = housefacility.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("HouseFacilities", housefacilities);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("HouseFacilities", null, {});
  },
};

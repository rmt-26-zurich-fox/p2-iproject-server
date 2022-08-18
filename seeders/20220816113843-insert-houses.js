"use strict";
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const houses = JSON.parse(fs.readFileSync("./data/house.json", "utf-8"));
    houses.forEach((house) => {
      delete house.id;
      house.createdAt = house.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Houses", houses);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Houses", null, {});
  },
};

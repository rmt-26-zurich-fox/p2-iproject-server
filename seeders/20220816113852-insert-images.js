"use strict";
const fs = require("fs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const images = JSON.parse(fs.readFileSync("./data/image.json", "utf-8"));
    images.forEach((image) => {
      delete image.id;
      image.createdAt = image.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Images", images);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};

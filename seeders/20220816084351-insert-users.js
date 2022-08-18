"use strict";
const fs = require("fs");
const { hashPassword } = require("../helpers/passwordHashing");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));
    users.forEach((user) => {
      delete user.id;
      user.password = hashPassword(user.password);
      user.createdAt = user.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

"use strict";
module.exports = {
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};

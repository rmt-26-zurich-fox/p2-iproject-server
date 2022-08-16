"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Diseases", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      symptomOne: {
        type: Sequelize.STRING,
      },
      symptomTwo: {
        type: Sequelize.STRING,
      },
      symptomThree: {
        type: Sequelize.STRING,
      },
      symptomFour: {
        type: Sequelize.STRING,
      },
      symptomFive: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Diseases");
  },
};

"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      selfDescription: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNul: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNul: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        oneDelete: "cascade",
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
    await queryInterface.dropTable("Profiles");
  },
};

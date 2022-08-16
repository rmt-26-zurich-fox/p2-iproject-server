"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DoctorSpecializations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      specialization_one: {
        type: Sequelize.STRING,
        defaultValue: "-",
      },
      specialization_two: {
        type: Sequelize.STRING,
        defaultValue: "-",
      },
      specialization_three: {
        type: Sequelize.STRING,
        defaultValue: "-",
      },
      specialization_four: {
        type: Sequelize.STRING,
        defaultValue: "-",
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
    await queryInterface.dropTable("DoctorSpecializations");
  },
};

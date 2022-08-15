"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      explicit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      ProfileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Profiles",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: " cascade",
      },
      ThreadId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Threads",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: " cascade",
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
    await queryInterface.dropTable("Comments");
  },
};

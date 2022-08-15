"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Teams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      abbreviation: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      arena: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      team_colors: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      main_sponsor: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      conference: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      division: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      head_coach: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      president: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      general_manager: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      ownership: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      championships: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      conference_titles: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      division_titles: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      retired_numbers: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      website: {
        type: Sequelize.STRING,
        allowNul: false,
      },
      img_url: {
        type: Sequelize.TEXT,
        allowNul: false,
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
    await queryInterface.dropTable("Teams");
  },
};

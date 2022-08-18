'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plannings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: `Users`,
          key: "id"
        }
      },
      AnimeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: `Animes`,
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plannings');
  }
};
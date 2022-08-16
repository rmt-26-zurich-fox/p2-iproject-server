'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        defaultValue: "Input First Name"
      },
      lastName: {
        type: Sequelize.STRING,
        defaultValue: "Input Last Name"
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: "Input Address"
      },
      phoneNumber: {
        type: Sequelize.STRING,
        defaultValue: "Input Phonenumber"
      },
      editStatus: {
        type: Sequelize.STRING,
        defaultValue: "No"
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('Profiles');
  }
};
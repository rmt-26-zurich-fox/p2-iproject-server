'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderStatus: {
        type: Sequelize.STRING,
        defaultValue: "Cart"
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalCost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ProfileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Profiles',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      ProductId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
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
    await queryInterface.dropTable('Orders');
  }
};
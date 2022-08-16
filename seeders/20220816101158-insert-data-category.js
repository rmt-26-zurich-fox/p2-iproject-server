'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Categories", [{
        name: "IEM",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Headphone",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "DAC/AMPS",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "DAP",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null);
  }
};
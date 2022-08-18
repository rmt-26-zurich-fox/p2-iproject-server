'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const users = require('../data/users.json');

    const bcryptjs = require('bcryptjs');
    
    users.forEach(el => {
      el.password = bcryptjs.hashSync(el.password, 10);
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Users', users, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};

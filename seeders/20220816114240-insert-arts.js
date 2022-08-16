'use strict';
const axios = require("axios")
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let {data} = await axios.get(`https://danbooru.donmai.us/posts.json?login=brisket12688&api_key=FdwzSc7TPeqVHkKL7cuQXWkx`)
   let response = data.map(el => {
    return {
      imageUrl: el.file_url,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   })
   await queryInterface.bulkInsert('Arts', response)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Arts', null, {});
  }
};

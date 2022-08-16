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
    let {data} = await axios.get(`https://api.jikan.moe/v3/season/2022/winter`)

    let response = data.anime.map(el => {
      let allGenre = []
      el.genres.forEach(el => allGenre.push(el.name))
      return {
        title: el.title,
        imageUrl: el.image_url,
        synopsis: el.synopsis,
        airingStart: el.airing_start,
        episodes: el.episodes,
        genre: allGenre.join(),
        score: el.score,
        season: "Winter",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    await queryInterface.bulkInsert('Animes', response)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Animes', null, {});
  }
};

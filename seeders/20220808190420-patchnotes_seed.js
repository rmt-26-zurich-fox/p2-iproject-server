"use strict";

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

		//* function for reverse index add
		const reverseAdd = () => {
			let patchNotes = require("../../warframejsondata/patchnotes.json");

			//add createdAt & updatedAt for postgres database requirement
			patchNotes.forEach(data => {
				data, (data.createdAt = data.updatedAt = new Date());
			});
			//? reverse the data from the oldest (so we can read the id easier)
			return patchNotes.reverse();
		};

		await queryInterface.bulkInsert("Patchnotes", reverseAdd());
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Patchnotes", null);
	},
};

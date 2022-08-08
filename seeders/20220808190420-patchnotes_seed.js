"use strict"

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
			let patchNotes = require("../../warframejsondata/patchnotes.json")

			//add createdAt & updatedAt for postgres database requirement
			patchNotes.forEach(data => {
				data, (data.createdAt = data.updatedAt = new Date())
			})
			//? reverse the data from the oldest (so we can read the id easier)
			const reversePatchnote = []
			for (let index = patchNotes.length - 1; index > 0; index--) {
				reversePatchnote.push(patchNotes[index])
			}
			return reversePatchnote
		}

		await queryInterface.bulkInsert("Patchnotes", reverseAdd())
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Patchnotes", null)
	},
}

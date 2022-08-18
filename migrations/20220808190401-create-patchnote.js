"use strict"
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Patchnotes", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			url: {
				type: Sequelize.STRING,
			},
			date: {
				type: Sequelize.DATE,
			},
			additions: {
				type: Sequelize.TEXT,
			},
			changes: {
				type: Sequelize.TEXT,
			},
			fixes: {
				type: Sequelize.TEXT,
			},
			description: {
				type: Sequelize.TEXT,
			},
			type: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Patchnotes")
	},
}

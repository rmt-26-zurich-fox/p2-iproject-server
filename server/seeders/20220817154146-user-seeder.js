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
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "hafizhislami11@gmail.com",
          password:
            "$2a$10$WeXPldYdnDY97SUGK7.mJOCaR.pNGutlBhxFKNHZJbkC3NOwFalGS",
          phoneNumber: "085123456789",
          address: "Komp. pertamina blok J7",
          role: "Customer",
          imageUrl:
            "https://i.pinimg.com/originals/d8/7e/1b/d87e1b139dbbf94d4cb6c05b56cae4f9.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "user@mail.com",
          password:
            "$2a$10$WeXPldYdnDY97SUGK7.mJOCaR.pNGutlBhxFKNHZJbkC3NOwFalGS",
          phoneNumber: "085123456789",
          address: "Komp. PDAM blok J5",
          role: "Service Provider",
          imageUrl:
            "https://media.dinomarket.com/docs/imgTD/2017-01/pic_car_auto_1_110117200111_ll.jpg.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const portionsData = [
      { dayNumForeign: 1, portionDrinkForeign: 1 },
      { dayNumForeign: 2, portionDrinkForeign: 2 },
      { dayNumForeign: 3, portionDrinkForeign: 1 },
      { dayNumForeign: 4, portionDrinkForeign: 2 },
      { dayNumForeign: 5, portionDrinkForeign: 1 },
      { dayNumForeign: 6, portionDrinkForeign: 2 },
      { dayNumForeign: 7, portionDrinkForeign: 2 },

      // Add more data as needed
    ];

    await queryInterface.bulkInsert('Portions', portionsData, {});
  },

  async down (queryInterface, Sequelize) {  
    await queryInterface.bulkDelete('Portions', null, {});
  }
};

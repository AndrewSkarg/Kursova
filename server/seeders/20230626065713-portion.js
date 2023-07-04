'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {



    
    const portionsData = [

      { dayF: 1, portionDrinkF: 2, order: 'сніданок',firstDishF: 1, secondDishF: 2,dessertDishF:4, saladDishF:11},
      { dayF: 1, portionDrinkF: 2, order: 'обід' ,firstDishF: 5, secondDishF: 6,dessertDishF:16, saladDishF:15},
      { dayF: 1, portionDrinkF: 2, order: 'вечеря' ,firstDishF: 9, secondDishF: 14,dessertDishF:20, saladDishF:7},

      { dayF: 2, portionDrinkF: 1, order: 'сніданок' ,firstDishF: 5, secondDishF: 6,dessertDishF:16, saladDishF:15},
      { dayF: 2, portionDrinkF: 1, order: 'обід' ,firstDishF: 1, secondDishF: 14,dessertDishF:20, saladDishF:11},
      { dayF: 2, portionDrinkF: 1, order: 'вечеря' ,firstDishF: 9, secondDishF: 2,dessertDishF:4, saladDishF:7},

      { dayF: 3, portionDrinkF: 1, order: 'сніданок' ,firstDishF: 9, secondDishF: 14,dessertDishF:16, saladDishF:11},
      { dayF: 3, portionDrinkF: 1, order: 'обід' ,firstDishF: 1, secondDishF: 2,dessertDishF:4, saladDishF:7},
      { dayF: 3, portionDrinkF: 2, order: 'вечеря' ,firstDishF: 5, secondDishF: 6,dessertDishF:20, saladDishF:15},

      { dayF: 4, portionDrinkF: 1, order: 'сніданок',firstDishF: 1, secondDishF: 2,dessertDishF:4, saladDishF:11},
      { dayF: 4, portionDrinkF: 1, order: 'обід' ,firstDishF: 5, secondDishF: 6,dessertDishF:16, saladDishF:15},
      { dayF: 4, portionDrinkF: 2, order: 'вечеря' ,firstDishF: 9, secondDishF: 14,dessertDishF:20, saladDishF:7},

      { dayF: 5, portionDrinkF: 1, order: 'сніданок' ,firstDishF: 5, secondDishF: 6,dessertDishF:16, saladDishF:15},
      { dayF: 5, portionDrinkF: 2, order: 'обід' ,firstDishF: 1, secondDishF: 14,dessertDishF:20, saladDishF:11},
      { dayF: 5, portionDrinkF: 1, order: 'вечеря' ,firstDishF: 9, secondDishF: 2,dessertDishF:4, saladDishF:7},

      { dayF: 6, portionDrinkF: 2, order: 'сніданок' ,firstDishF: 9, secondDishF: 14,dessertDishF:16, saladDishF:11},
      { dayF: 6, portionDrinkF: 1, order: 'обід' ,firstDishF: 1, secondDishF: 2,dessertDishF:4, saladDishF:7},
      { dayF: 6, portionDrinkF: 2, order: 'вечеря' ,firstDishF: 5, secondDishF: 6,dessertDishF:20, saladDishF:15},


      { dayF: 7, portionDrinkF: 1, order: 'сніданок' ,firstDishF: 5, secondDishF: 6,dessertDishF:16, saladDishF:15},
      { dayF: 7, portionDrinkF: 2, order: 'обід' ,firstDishF: 1, secondDishF: 14,dessertDishF:20, saladDishF:11},
      { dayF: 7, portionDrinkF: 2, order: 'вечеря' ,firstDishF: 9, secondDishF: 2,dessertDishF:4, saladDishF:7},



      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Portions', portionsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Portions', null, {});
  }
};

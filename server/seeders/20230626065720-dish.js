'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    const dishesData = [
      { title: 'гречка з мясом', description: 'сніданок', portionForeign: 1 },
      { title: 'картопля', description: 'обід', portionForeign: 1 },
      { title: 'вівсянка', description: 'вечеря', portionForeign: 1 },
      { title: 'кашло', description: 'сніданок', portionForeign: 2 },
      { title: 'курка', description: 'обід', portionForeign: 2 },
      { title: 'індичка', description: 'вечеря', portionForeign: 2 },


      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Dishes', dishesData, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dishes', null, {});

  }
};


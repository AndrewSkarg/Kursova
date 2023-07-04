'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    const dishesData = [
      { kind:'перше', title: 'гречка з мясом' },
      { kind:'друге', title: 'суп' },
      { kind:'салат', title: 'з огірками салат'},
      { kind:'десерт', title: 'десерт якись' },

      { kind:'перше',title: 'картопля' },
      { kind:'друге',title: 'суп 2' },
      {kind:'салат', title: 'салат 2' },
      { kind:'десерт',title: 'десерт 2' },

      {kind:'перше', title: 'вівсянка' },
      { kind:'друге',title: 'ще щось 1' },
      { kind:'салат',title: 'щось 2' },
      { kind:'десерт', title: 'щось 3' },
      // .........................................................................................

       { kind:'перше', title: 'кашло мясом' },
      { kind:'друге', title: 'суп' },
      { kind:'салат', title: 'з огірками салат' },
      { kind:'десерт', title: 'десерт якись' },

      { kind:'перше',title: 'курка' },
      { kind:'друге',title: 'суп 2' },
      {kind:'салат', title: 'слат 2' },
      { kind:'десерт',title: 'десерт 2' },

      {kind:'перше', title: 'індичка' },
      { kind:'друге',title: 'ще щось 1' },
      { kind:'салат',title: 'щось 2' },
      { kind:'десерт', title: 'щось 3' },
      // .........................................................................................

      {kind:'перше', title: 'індичка2' },
      { kind:'друге',title: 'ще щось 2' },
      { kind:'салат',title: 'щось 3' },
      { kind:'десерт', title: 'щось 4' },

      {kind:'перше', title: 'індичка3' },
      { kind:'друге',title: 'ще щось 4' },
      { kind:'салат',title: 'щось 5' },
      { kind:'десерт', title: 'щось 6' },

      {kind:'перше', title: 'індичка4' },
      { kind:'друге',title: 'ще щось 7' },
      { kind:'салат',title: 'щось 7' },
      { kind:'десерт', title: 'щось 7' },


// .........................................................................................

      {kind:'перше', title: 'індичка5' },
      { kind:'друге',title: 'ще щось 8' },
      { kind:'салат',title: 'щось 9' },
      { kind:'десерт', title: 'щось 9' },

      {kind:'перше', title: 'індичка6' },
      { kind:'друге',title: 'ще щось 9' },
      { kind:'салат',title: 'щось10' },
      { kind:'десерт', title: 'щось11' },

      {kind:'перше', title: 'індичка12',   },
      { kind:'друге',title: 'ще щось13',   },
      { kind:'салат',title: 'щось14',   },
      { kind:'десерт', title: 'щось15',   },

     

      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Dishes', dishesData, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dishes', null, {});

  }
};


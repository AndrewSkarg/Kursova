'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    const dishesData = [
      { kind:'перше', title: 'гречка з мясом' },
      { kind:'друге', title: 'солянка' },
      { kind:'салат', title: 'з огірками'},
      { kind:'десерт', title: 'млинці' },
      { kind:'перше',title: 'картопля' },
      { kind:'друге',title: 'суп гречаний' },
      {kind:'салат', title: 'з помідорами' },
      { kind:'десерт',title: 'десерт 2' },
      {kind:'перше', title: 'вівсянка' },
      { kind:'друге',title: 'борщ' },
      { kind:'салат',title: 'цезар' },
      { kind:'десерт', title: 'десерт 3' },
       { kind:'перше', title: 'кашло з мясом' },
      { kind:'друге', title: 'суп 3' },
      { kind:'салат', title: 'олівє' },
      { kind:'десерт', title: 'оладки' },
      { kind:'перше',title: 'курка' },
      { kind:'друге',title: 'суп 4' },
      {kind:'салат', title: 'салат 4' },
      { kind:'десерт',title: 'десерт 4' },
      {kind:'перше', title: 'індичка' },
      { kind:'друге',title: 'суп 5' },
      { kind:'салат',title: 'салат 5' },
      { kind:'десерт', title: 'дес 5' },
      {kind:'перше', title: 'баранина' },
      { kind:'друге',title: 'суп 6' },
      { kind:'салат',title: 'щось 6' },
      { kind:'десерт', title: 'щось 6' },
      {kind:'перше', title: 'перше 7' },
      { kind:'друге',title: 'друге 7' },
      { kind:'салат',title: 'сал 7' },
      { kind:'десерт', title: 'дес 7' },
      {kind:'перше', title: 'пер 8' },
      { kind:'друге',title: 'ще щось 8' },
      { kind:'салат',title: 'щось 88' },
      { kind:'десерт', title: 'щось 76' },
      {kind:'перше', title: 'індичка 5' },
      { kind:'друге',title: 'ще щось 52' },
      { kind:'салат',title: 'щось 964' },
      { kind:'десерт', title: 'щось 931' },
      {kind:'перше', title: 'індичка675' },
      { kind:'друге',title: 'ще щось 9623' },
      { kind:'салат',title: 'щось107524' },
      { kind:'десерт', title: 'щось1711' },
      {kind:'перше', title: 'індичка126413',   },
      { kind:'друге',title: 'ще щось136143532',   },
      { kind:'салат',title: 'щось1462345',   },
      { kind:'десерт', title: 'щось1551436',   },

     

      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Dishes', dishesData, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dishes', null, {});

  }
};


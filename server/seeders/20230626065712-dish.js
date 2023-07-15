'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    const dishesData = [
      { kind: 'перше', title: 'Гречка з мясом' },
  { kind: 'друге', title: 'Солянка' },
  { kind: 'салат', title: 'Огірки з томатами' },
  { kind: 'десерт', title: 'Млинці з сиром' },
  { kind: 'перше', title: 'Картопля по-селянськи' },
  { kind: 'друге', title: 'Борщ український' },
  { kind: 'салат', title: 'Цезар з куркою' },
  { kind: 'десерт', title: 'Тірамісу' },
  { kind: 'перше', title: 'Суп-харчо' },
  { kind: 'друге', title: 'Риба гриль' },
  { kind: 'салат', title: 'Грецький салат' },
  { kind: 'десерт', title: 'Панна-котта з полуницею' },
  { kind: 'перше', title: 'Лагман' },
  { kind: 'друге', title: 'Сало з часником' },
  { kind: 'салат', title: 'Салат "Олів\'є"' },
  { kind: 'десерт', title: 'Шоколадний торт' },
  { kind: 'перше', title: 'Ризотто з грибами' },
  { kind: 'друге', title: 'Стейк зі свинини' },
  { kind: 'салат', title: 'Салат з авокадо та креветками' },
  { kind: 'десерт', title: 'Чізкейк з лимоном' },
  { kind: 'перше', title: 'Суп з куркою та вермішеллю' },
  { kind: 'друге', title: 'Курячі котлети' },
  { kind: 'салат', title: 'Салат з капусти і моркви' },
  { kind: 'десерт', title: 'Сирник зі сметаною' },
     

      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Dishes', dishesData, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dishes', null, {});

  }
};


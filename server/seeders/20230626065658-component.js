'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
const componentsData = [
      { title: 'Апельсиновий сік', count: 153, priceForUnit: 150, unit: 'л', description: 'напої' },
  { title: 'Томатний сік', count: 117, priceForUnit: 100, unit: 'л', description: 'напої' },
  { title: 'Гречка', count: 122, priceForUnit: 50, unit: 'кг', description: 'крупи' },
  { title: 'Капуста', count: 143, priceForUnit: 40, unit: 'кг', description: 'овочі' },
  { title: 'Печиво', count: 129, priceForUnit: 39, unit: 'кг', description: 'інше' },
  { title: 'Сіль', count: 100, priceForUnit: 67, unit: 'кг', description: 'спеції' },
  { title: 'Перець', count: 100, priceForUnit: 77, unit: 'кг', description: 'спеції' },
  { title: 'Олія', count: 100, priceForUnit: 80, unit: 'л', description: 'спеції' },
  { title: 'Яблука', count: 85, priceForUnit: 55, unit: 'кг', description: 'фрукти' },
  { title: 'Сир', count: 75, priceForUnit: 120, unit: 'кг', description: 'спеції' },
  { title: 'Мед', count: 60, priceForUnit: 150, unit: 'кг', description: 'спеції' },
  { title: 'Огірки', count: 55, priceForUnit: 30, unit: 'кг', description: 'овочі' },
  { title: 'Морква', count: 100, priceForUnit: 25, unit: 'кг', description: 'овочі' },
  { title: 'Картопля', count: 120, priceForUnit: 15, unit: 'кг', description: 'овочі' },
  { title: 'Апельсини', count: 90, priceForUnit: 60, unit: 'кг', description: 'фрукти' },
  { title: 'Кава', count: 200, priceForUnit: 80, unit: 'кг', description: 'напої' },
  { title: 'Гречана крупа', count: 80, priceForUnit: 40, unit: 'кг', description: 'крупи' },
  { title: 'Сметана', count: 50, priceForUnit: 70, unit: 'л', description: 'спеції' },
  { title: 'Помідори', count: 70, priceForUnit: 45, unit: 'кг', description: 'овочі' },
  { title: 'Мандарини', count: 95, priceForUnit: 70, unit: 'кг', description: 'фрукти' },
  { title: 'Рис', count: 110, priceForUnit: 50, unit: 'кг', description: 'крупи' },
  { title: 'Чай', count: 250, priceForUnit: 30, unit: 'кг', description: 'напої' },
  { title: 'Свинина', count: 65, priceForUnit: 100, unit: 'кг', description: 'спеції' },
  { title: 'Оливкова олія', count: 40, priceForUnit: 200, unit: 'л', description: 'спеції' },
  { title: 'Банани', count: 80, priceForUnit: 65, unit: 'кг', description: 'фрукти' },
  { title: 'Горох', count: 120, priceForUnit: 20, unit: 'кг', description: 'крупи' },
  { title: 'Молоко', count: 150, priceForUnit: 25, unit: 'л', description: 'спеції' }




      // Add more data as needed
    ];

    await queryInterface.bulkInsert('Components', componentsData, {});
  },

  async down (queryInterface, Sequelize) {
            await queryInterface.bulkDelete('Components', null, {});

  }
};
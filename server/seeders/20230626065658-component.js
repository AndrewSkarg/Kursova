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
      { title: 'Апельсиновий сік', count: 1, priceForUnit:150, unit:'л',description:'напої' },
      { title: 'Томатний сік', count: 1, priceForUnit:100, unit:'л',description:'напої' },
      { title: 'Гречка', count: 1, priceForUnit:50, unit:'кг',description:'крупи' },
      { title: 'Капуста', count: 1, priceForUnit:40, unit:'кг',description:'овочі' },
      { title: 'Печиво', count: 1, priceForUnit:39, unit:'кг',description:'інше' },
      { title: 'Банант', count: 1, priceForUnit:67, unit:'кг',description:'фрукти' },


      // Add more data as needed
    ];

    await queryInterface.bulkInsert('Components', componentsData, {});
  },

  async down (queryInterface, Sequelize) {
            await queryInterface.bulkDelete('Components', null, {});

  }
};
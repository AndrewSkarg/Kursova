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
      { title: 'Апельсиновий сік', count: 153, priceForUnit:150, unit:'л',description:'напої' },
      { title: 'Томатний сік', count: 117, priceForUnit:100, unit:'л',description:'напої' },
      { title: 'Гречка', count: 122, priceForUnit:50, unit:'кг',description:'крупи' },
      { title: 'Капуста', count: 143, priceForUnit:40, unit:'кг',description:'овочі' },
      { title: 'Печиво', count: 129, priceForUnit:39, unit:'кг',description:'інше' },
      { title: 'Банан', count: 100, priceForUnit:67, unit:'кг',description:'фрукти' },
      { title: 'Сіль', count: 100, priceForUnit:67, unit:'кг',description:'спеції' },
      { title: 'Перець', count: 100, priceForUnit:77, unit:'кг',description:'спеції' },
      { title: 'Олія', count: 100, priceForUnit:80, unit:'л',description:'спеції' },



      // Add more data as needed
    ];

    await queryInterface.bulkInsert('Components', componentsData, {});
  },

  async down (queryInterface, Sequelize) {
            await queryInterface.bulkDelete('Components', null, {});

  }
};
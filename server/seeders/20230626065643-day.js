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
    const daysData = [
      { day: 1, dayName: 'Monday' },
      { day: 2, dayName: 'Tuesday' },
      { day: 3, dayName: 'Wednesday' },
      { day: 4, dayName: 'Thursday' },
      { day: 5, dayName: 'Friday' },
      { day: 6, dayName: 'Saturday' },
      { day: 7, dayName: 'Sunday' },
      
      // Add more data as needed
    ];

    await queryInterface.bulkInsert('Days', daysData, {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

        await queryInterface.bulkDelete('Days', null, {});

  }
};

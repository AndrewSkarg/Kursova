'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {



    
    const positionsData = [

      { title: 'нач МПЗ', rank: 'підполковник', user: 1},
      { title: 'курсант', rank: 'солдат', user: 2},
      { title: 'курсант', rank: 'сержант', user: 3},
      { title: 'курсант', rank: 'солдат', user: 4},
      { title: 'начальник столової', rank: 'полковник', user: 5},
      { title: 'курсант', rank: 'солдат', user: 6},
      

      


      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Positions', positionsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Positions', null, {});
  }
};

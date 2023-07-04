'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {




    const rolesData = [

      { name: 'споживач' },
      { name: 'повар' },
      { name: 'шеф'},

      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Roles', rolesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

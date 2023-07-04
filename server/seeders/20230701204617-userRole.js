'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {




    const userRolesData = [

      { role: 1, user: 2 },
      { role: 2, user: 3 },
      { role: 1, user: 1 },
      { role: 1, user: 4 },
      { role: 3, user: 5 },
      { role: 1, user: 6 },






      // Add more data as needed
    ];
    await queryInterface.bulkInsert('userRoles', userRolesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userRoles', null, {});
  }
};

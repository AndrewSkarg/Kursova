'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {




    const dishComponentsData = [

      { dishF: 1, componentF: 9 },
      { dishF: 1, componentF: 8 },
      { dishF: 1, componentF: 7 },
      { dishF: 1, componentF: 3 },
      { dishF: 2, componentF: 2 },
      { dishF: 3, componentF: 1 },
      { dishF: 4, componentF: 2 },
      { dishF: 5, componentF: 3 },
      { dishF: 6, componentF: 4 },
      { dishF: 7, componentF: 5 },






      // Add more data as needed
    ];
    await queryInterface.bulkInsert('dishComponents', dishComponentsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dishComponents', null, {});
  }
};

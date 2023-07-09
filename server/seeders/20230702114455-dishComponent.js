'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {




    const dishComponentsData = [

      { dishF: 1, componentF: 9, countOfComp:0.3 },
      { dishF: 1, componentF: 8, countOfComp:0.2 },
      { dishF: 1, componentF: 7, countOfComp:0.5 },
      { dishF: 1, componentF: 3, countOfComp:0.8 },
      { dishF: 2, componentF: 2, countOfComp:0.4 },
      { dishF: 3, componentF: 1, countOfComp:0.3 },
      { dishF: 4, componentF: 2, countOfComp:0.2 },
      { dishF: 5, componentF: 3, countOfComp:0.3 },
      { dishF: 6, componentF: 4, countOfComp:0.1 },
      { dishF: 7, componentF: 5, countOfComp:0.9 },






      // Add more data as needed
    ];
    await queryInterface.bulkInsert('dishComponents', dishComponentsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dishComponents', null, {});
  }
};

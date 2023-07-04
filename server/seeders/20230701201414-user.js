'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {



    
    const usersData = [

      { firstName: 'Ivan1', lastName: 'Kentus1', email: "kentus1@gmail.com",password:"pass"},
      { firstName: 'Ivan2', lastName: 'Kentus2', email: "kentus2@gmail.com",password:"pass"},
      { firstName: 'Ivan3', lastName: 'Kentus3', email: "kentus3@gmail.com",password:"pass"},
      { firstName: 'Ivan4', lastName: 'Kentus4', email: "kentus4@gmail.com",password:"pass"},
      { firstName: 'Ivan5', lastName: 'Kentus5', email: "kentus5@gmail.com",password:"pass"},
      { firstName: 'Ivan6', lastName: 'Kentus6', email: "kentus6@gmail.com",password:"pass"},
      

      


      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Users', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

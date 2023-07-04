'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {



    
    const usersData = [
      //password 123
      { firstName: 'Ivan1', lastName: 'Kentus1', email: "kentus1@gmail.com",password:"$2b$10$J6pSjW1yA2MS0Bqpd4XuX.wUFumrvede2WNyL51h73/W6A51eSZ62"},
      { firstName: 'Ivan2', lastName: 'Kentus2', email: "kentus2@gmail.com",password:"$2b$10$J6pSjW1yA2MS0Bqpd4XuX.wUFumrvede2WNyL51h73/W6A51eSZ62"},
      { firstName: 'Ivan3', lastName: 'Kentus3', email: "kentus3@gmail.com",password:"$2b$10$J6pSjW1yA2MS0Bqpd4XuX.wUFumrvede2WNyL51h73/W6A51eSZ62"},
      { firstName: 'Ivan4', lastName: 'Kentus4', email: "kentus4@gmail.com",password:"$2b$10$J6pSjW1yA2MS0Bqpd4XuX.wUFumrvede2WNyL51h73/W6A51eSZ62"},
      { firstName: 'Ivan5', lastName: 'Kentus5', email: "kentus5@gmail.com",password:"$2b$10$J6pSjW1yA2MS0Bqpd4XuX.wUFumrvede2WNyL51h73/W6A51eSZ62"},
      { firstName: 'Ivan6', lastName: 'Kentus6', email: "kentus6@gmail.com",password:"$2b$10$J6pSjW1yA2MS0Bqpd4XuX.wUFumrvede2WNyL51h73/W6A51eSZ62"},
      

      


      // Add more data as needed
    ];
    await queryInterface.bulkInsert('Users', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

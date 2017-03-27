'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      { username: "user1", email: "user1@gmail.com", totalScore: 0, createdAt: new Date(), updatedAt: new Date() },
      { username: "user2", email: "user2@gmail.com", totalScore: 0, createdAt: new Date(), updatedAt: new Date() },
      { username: "user3", email: "user3@gmail.com", totalScore: 0, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

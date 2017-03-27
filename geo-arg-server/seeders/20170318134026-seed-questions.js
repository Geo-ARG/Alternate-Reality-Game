'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Quests', [
      { title: "Quest1", task: "Task1", EventId: 1, type: "Coordinate", answerKey: "-6.2656401, 106.7807317", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest2", task: "Task2", EventId: 1, type: "Text", answerKey: "Pikachu", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest3", task: "Task3", EventId: 1, type: "Photo", answerKey: "", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest1", task: "Task1", EventId: 2, type: "Coordinate", answerKey: "-6.2607134, 106.7794275", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest2", task: "Task2", EventId: 2, type: "Text", answerKey: "Pikachu", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest3", task: "Task3", EventId: 2, type: "Photo", answerKey: "", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest1", task: "Task1", EventId: 3, type: "Coordinate", answerKey: "-6.2915772, 106.7974708", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest2", task: "Task2", EventId: 3, type: "Text", answerKey: "Pikachu", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest3", task: "Task3", EventId: 3, type: "Photo", answerKey: "", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest1", task: "Task1", EventId: 4, type: "Coordinate", answerKey: "-6.1786686, 106.7899418", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest2", task: "Task2", EventId: 4, type: "Text", answerKey: "Pikachu", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() },
      { title: "Quest3", task: "Task3", EventId: 4, type: "Photo", answerKey: "", photoUrl: "", verification: false, createdAt: new Date(), updatedAt: new Date() }
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

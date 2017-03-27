'use strict';
module.exports = function(sequelize, DataTypes) {
  var Quests = sequelize.define('Quests', {
    title: DataTypes.STRING,
    task: DataTypes.STRING,
    EventId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    answerKey: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    verification: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Quests.hasMany(models.User_Events)
        Quests.belongsTo(models.Events)
        Quests.belongsToMany(models.Users, { through: 'User_Events' })
      }
    }
  });
  return Quests;
};

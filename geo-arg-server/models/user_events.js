'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Events = sequelize.define('User_Events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userAnswer: DataTypes.STRING,
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    QuestId: DataTypes.INTEGER,
    completion: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User_Events.belongsTo(models.Users)
        User_Events.belongsTo(models.Events)
        User_Events.belongsTo(models.Quests)
      }
    }
  });
  return User_Events;
};

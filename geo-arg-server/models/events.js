'use strict';
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define('Events', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    place: DataTypes.STRING,
    eventScore: DataTypes.INTEGER,
    geolocation: DataTypes.GEOMETRY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Events.hasMany(models.User_Events)
        Events.hasMany(models.Quests)
        Events.belongsToMany(models.Users, { through: 'User_Events' })
      }
    }
  });
  return Events;
};

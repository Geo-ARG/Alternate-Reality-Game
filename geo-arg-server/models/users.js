'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    totalScore: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany(models.User_Events)
        Users.hasMany(models.User_Locations)
        Users.belongsToMany(models.Events, { through: 'User_Events' })
        Users.belongsToMany(models.Quests, { through: 'User_Events' })
        Users.belongsToMany(models.Locations, { through: 'User_Locations' })
      }
    }
  });
  return Users;
};

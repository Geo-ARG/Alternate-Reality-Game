'use strict';
module.exports = function(sequelize, DataTypes) {
  var Locations = sequelize.define('Locations', {
    geolocation: DataTypes.GEOMETRY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Locations.hasMany(models.User_Locations)
        Locations.belongsToMany(models.Users, { through: 'User_Locations' })
      }
    }
  });
  return Locations;
};

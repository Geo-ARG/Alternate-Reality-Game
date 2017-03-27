'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Locations = sequelize.define('User_Locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User_Locations.belongsTo(models.Users)
        User_Locations.belongsTo(models.Locations)
      }
    }
  });
  return User_Locations;
};

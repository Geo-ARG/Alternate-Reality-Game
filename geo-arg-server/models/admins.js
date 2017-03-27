'use strict';
module.exports = function(sequelize, DataTypes) {
  var Admins = sequelize.define('Admins', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Admins;
};
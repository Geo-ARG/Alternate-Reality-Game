'use strict';
const models = require('../models')

let points = [
  {
    type: 'Point',
    coordinates: [-6.1722221, 106.7877785],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  },
  {
    type: 'Point',
    coordinates: [-6.1856472, 106.7340838],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  },
  {
    type: 'Point',
    coordinates: [-6.2903085, 106.7891122],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.Locations.bulkCreate([
      {
        geolocation: points[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        geolocation: points[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        geolocation: points[2],
        createdAt: new Date(),
        updatedAt: new Date()
      }
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

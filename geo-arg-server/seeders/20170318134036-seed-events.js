'use strict';
const models = require('../models')

let points = [
  {
    type: 'Point',
    coordinates: [-6.2656401, 106.7807317],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  },
  {
    type: 'Point',
    coordinates: [-6.2607134, 106.7794275],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  },
  {
    type: 'Point',
    coordinates: [-6.2915772, 106.7974708],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  },
  {
    type: 'Point',
    coordinates: [-6.1786686, 106.7899418],
    crs: { type: 'name', properties: { name: 'EPSG:4326'} }
  }
]

module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.Events.bulkCreate([
      {
        title: "Gotta catch'em All!",
        description: "Catch all pokemons.",
        date: new Date(),
        place: "Pondok Indah Mall 2",
        eventScore: 300,
        geolocation: points[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Gotta catch'em All!",
        description: "Catch all pokemons.",
        date: new Date(),
        place: "Hacktiv8 Indonesia",
        eventScore: 300,
        geolocation: points[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Gotta catch'em All!",
        description: "Catch all pokemons.",
        date: new Date(),
        place: "Cilandak Town Square",
        eventScore: 300,
        geolocation: points[2],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Gotta catch'em All!",
        description: "Catch all pokemons.",
        date: new Date(),
        place: "Mal Taman Anggrek",
        eventScore: 300,
        geolocation: points[3],
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

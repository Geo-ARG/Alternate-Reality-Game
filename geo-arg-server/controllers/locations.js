const models = require('../models')
const sequelize = require('sequelize')

module.exports = {
  getLocations: (req, res) => {
    models.Locations.findAll({
      include: [
        {model: models.Users}
      ]
    }).then(function (location) {
      res.send(location)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getLocation: (req, res) => {
    models.Locations.findAll({
      include: [
        {model: models.Users}
      ],
      attributes: {
        include: [[
          sequelize.fn('ST_DWithin',
          sequelize.col('geolocation'),
          sequelize.literal(`ST_Point(${req.body.latitude}, ${req.body.longitude})::geography`),
          1000), 'nearby'
        ]]
      }
    }).then(function (location) {
      res.send(location.filter(user => user.dataValues.nearby))
    }).catch(function (err) {
      res.send(err)
    })
  },
  createLocation: (req, res) => {
    var point = {
      type: 'Point',
      coordinates: [+req.body.latitude, +req.body.longitude],
      crs: { type: 'name', properties: { name: 'EPSG:4326'} }
    }
    models.Locations.findOrCreate({
      where: {
        id: req.body.UserId
      },
      defaults: {
        geolocation: point
      }
    }).then(function (location) {
      models.User_Locations.findOrCreate({
        where: {
          UserId: req.body.UserId
        },
        defaults: {
          LocationId: location[0].dataValues.id
        }
      }).then(function (userlocation) {
        res.send({Locations: location[0].dataValues, User_Locations: userlocation[0].dataValues})
      })
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteLocation: (req, res) => {
    models.Locations.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (location) {
      if (location) {
        res.status(200).json({message: `Deleted location with ID: ${req.params.id}`})
      } else {
        res.send(`There is no location with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateLocation: (req, res) => {
    var point = {
      type: 'Point',
      coordinates: [+req.body.latitude, +req.body.longitude],
      crs: { type: 'name', properties: { name: 'EPSG:4326'} }
    }
    models.Locations.findById(req.params.id).then(function (location) {
      location.update({
        geolocation: point
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}

const models = require('../models')

module.exports = {
  getUserLocations: (req, res) => {
    models.User_Locations.findAll({
      include: [
        {model: models.Users},
        {model: models.Locations}
      ]
    }).then(function (userlocation) {
      res.send(userlocation)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserLocation: (req, res) => {
    models.User_Locations.findById(req.params.id).then(function (userlocation) {
      userlocation.getUser().then(function (user) {
        userlocation.getLocation().then(function (location) {
          res.send({User_Locations: userlocation, Users: user, Locations: location})
        })
      })
    }).catch(function (err) {
      res.send(err)
    })
  },
  createUserLocation: (req, res) => {
    models.User_Locations.findOrCreate({
      where: {
        UserId: req.body.UserId
      },
      defaults: {
        LocationId: req.body.LocationId
      }
    }).then(function (userlocation) {
      if(userlocation[1]) {
        res.send(userlocation[0])
      } else {
        res.status(409).json({message: 'UserId already exists.'})
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUserLocation: (req, res) => {
    models.User_Locations.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (userlocation) {
      if (userlocation) {
        res.status(200).json({message: `Deleted userLocation with ID: ${req.params.id}`})
      } else {
        res.send(`There is no userLocation with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateUserLocation: (req, res) => {
    models.User_Locations.findById(req.params.id).then(function (userlocation) {
      userlocation.update({
        UserId: req.body.UserId,
        LocationId: req.body.LocationId
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}

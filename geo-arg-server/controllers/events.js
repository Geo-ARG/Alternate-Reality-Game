const models = require('../models')

module.exports = {
  getEvents: (req, res) => {
    models.Events.findAll({
      order: [['createdAt', 'DESC']],
      limit: 8,
      include: [
        {model: models.Quests},
        {model: models.Users}
      ]
    }).then(function (events) {
      res.send(events)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getEvent: (req, res) => {
    models.Events.findById(req.params.id).then(function (events) {
      events.getUsers().then(function (user) {
        events.getQuests().then(function (quest) {
          res.send({Events: events, Users: user, Quests: quest})
        })
      })
    }).catch(function (err) {
      res.send(err)
    })
  },
  createEvent: (req, res) => {
    var point = {
      type: 'Point',
      coordinates: [+req.body.latitude, +req.body.longitude],
      crs: { type: 'name', properties: { name: 'EPSG:4326'} }
    }
    models.Events.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      place: req.body.place,
      eventScore: req.body.eventScore,
      geolocation: point
    }).then(function (events) {
      res.send(events)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteEvent: (req, res) => {
    models.Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (events) {
      if (events) {
        res.status(200).json({message: `Deleted event with ID: ${req.params.id}`})
      } else {
        res.send(`There is no event with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateEvent: (req, res) => {
    var point = {
      type: 'Point',
      coordinates: [+req.body.latitude, +req.body.longitude],
      crs: { type: 'name', properties: { name: 'EPSG:4326'} }
    }
    models.Events.findById(req.params.id).then(function (events) {
      events.update({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        place: req.body.place,
        eventScore: req.body.eventScore,
        geolocation: point
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}

var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const adminController = require('../controllers/admins')
const locationController = require('../controllers/locations')
const eventController = require('../controllers/events')
const questController = require('../controllers/quests')
const userEventController = require('../controllers/user_events')
const userLocationController = require('../controllers/user_locations')
const middleware = require('../middlewares/auth')

/* GET home page. */
let dummy = {
  "id": 99,
  "quote": "ARG semangaatttt!"
}

router.get('/', function(req, res, next) {
  res.send(dummy);
});

// ==== Auth ====

router.get('/auth', function (req, res, next) {
  res.send({
    endpoints: [
      '/auth/users',
      '/auth/users/:id',
      '/auth/admins',
      '/auth/admins/:id',
      '/auth/admins/login'
    ]
  })
})

// ==== User ====

router.get('/auth/users', middleware.verifyAdmin, userController.getUsers)

router.get('/auth/users/:id', middleware.verifyAdmin, userController.getUser)

router.post('/auth/users', middleware.verifyLogin, userController.createUser)

router.put('/auth/users/:id', middleware.verifyAdmin, userController.updateUser)

router.delete('/auth/users/:id', middleware.verifyAdmin, userController.deleteUser)

// ==== Admin ====

router.post('/auth/admins/login', adminController.verifyAdmin)

router.get('/auth/admins', middleware.verifyAdmin, adminController.getAdmins)

router.get('/auth/admins/:id', middleware.verifyAdmin, adminController.getAdmin)

router.post('/auth/admins', adminController.createAdmin)

router.put('/auth/admins/:id', middleware.verifyAdmin, adminController.updateAdmin)

router.delete('/auth/admins/:id', middleware.verifyAdmin, adminController.deleteAdmin)

// ==== API ====

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/events',
      '/api/events/:id',
      '/api/locations',
      '/api/locations/:id',
      '/api/quests',
      '/api/quests/:id',
      '/api/userevents',
      '/api/userevents/:id',
      '/api/userlocations',
      '/api/userlocations/:id'
    ]
  })
})

// ==== Event ====

router.get('/api/events', middleware.verifyLogin, eventController.getEvents)

router.get('/api/events/:id', middleware.verifyAdmin, eventController.getEvent)

router.post('/api/events', middleware.verifyAdmin, eventController.createEvent)

router.put('/api/events/:id', middleware.verifyAdmin, eventController.updateEvent)

router.delete('/api/events/:id', middleware.verifyAdmin, eventController.deleteEvent)

// ==== Location ====

router.get('/api/locations', middleware.verifyAdmin, locationController.getLocations)

router.post('/api/locations/scan', middleware.verifyLogin, locationController.getLocation)

router.post('/api/locations', middleware.verifyLogin, locationController.createLocation)

router.put('/api/locations/:id', middleware.verifyLogin, locationController.updateLocation)

router.delete('/api/locations/:id', middleware.verifyAdmin, locationController.deleteLocation)

// ==== Quest ====

router.get('/api/quests', middleware.verifyAdmin, questController.getQuests)

router.get('/api/quests/:id', middleware.verifyAdmin, questController.getQuest)

router.post('/api/quests', middleware.verifyAdmin, questController.createQuest)

router.put('/api/quests/:id', middleware.verifyAdmin, questController.updateQuest)

router.delete('/api/quests/:id', middleware.verifyAdmin, questController.deleteQuest)

router.delete('/api/quests/event/:id', middleware.verifyAdmin, questController.deleteQuestByEventId)

// ==== User_Events ====

router.get('/api/userevents', middleware.verifyAdmin, userEventController.getUserEvents)

router.get('/api/userevents/:id', middleware.verifyAdmin, userEventController.getUserEvent)

router.get('/api/userevents/user/:userid/', middleware.verifyLogin, userEventController.getUserEventByUserId)

router.get('/api/userevents/user/:userid/event/:eventid', middleware.verifyLogin, userEventController.getUserEventByUserIdEventId)

router.get('/api/userevents/quests/photo', middleware.verifyAdmin, userEventController.getUserEventByCompletionAndTypePhoto)

router.post('/api/userevents', middleware.verifyLogin, userEventController.createUserEvent)

router.put('/api/userevents/:id', middleware.verifyLogin, userEventController.updateUserEvent)

router.put('/api/userevents/:id/quests/verification', middleware.verifyAdmin, userEventController.updateUserEventByQuestVerification)

router.put('/api/userevents/:id/quests/useranswer', middleware.verifyLogin, userEventController.updateUserEventByUserAnswer)

router.delete('/api/userevents/:id', middleware.verifyAdmin, userEventController.deleteUserEvent)

router.delete('/api/userevents/event/:id', middleware.verifyAdmin, userEventController.deleteUserEventByEventId)


// ==== User_Locations ====

router.get('/api/userlocations', middleware.verifyAdmin, userLocationController.getUserLocations)

router.get('/api/userlocations/:id', middleware.verifyAdmin, userLocationController.getUserLocation)

router.post('/api/userlocations', middleware.verifyAdmin, userLocationController.createUserLocation)

router.put('/api/userlocations/:id', middleware.verifyAdmin, userLocationController.updateUserLocation)

router.delete('/api/userlocations/:id', middleware.verifyAdmin, userLocationController.deleteUserLocation)

module.exports = router;

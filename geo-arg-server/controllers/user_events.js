const models = require('../models')
const sequelize = require('sequelize')

module.exports = {
  getUserEvents: (req, res) => {
    models.User_Events.findAll({
      include: [
        {model: models.Users},
        {model: models.Events},
        {model: models.Quests}
      ]
    }).then(function (userevent) {
      res.send(userevent)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserEvent: (req, res) => {
    models.User_Events.findById(req.params.id).then(function (userevent) {
      userevent.getUser().then(function (user) {
        userevent.getEvent().then(function (events) {
          userevent.getQuest().then(function (quest) {
            res.send({User_Events: userevent, Users: user, Events: events, Quests: quest})
          })
        })
      })
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserEventByUserIdEventId: (req, res) => {
    models.User_Events.findAll({
      include: [
        {model: models.Quests}
      ],
      where: {
        UserId: req.params.userid,
        EventId: req.params.eventid
      }
    }).then(function (questList) {
      res.send(questList)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserEventByUserId: (req, res) => {
    models.User_Events.findAll({
      include: [
        {model: models.Events},
        {model: models.Quests}
      ],
      where: {
        UserId: req.params.userid
      }
    }).then(function (userevent) {
      res.send(userevent)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserEventByCompletionAndTypePhoto: (req, res) => {
    models.User_Events.findAll({
      include: [
        {model: models.Users},
        {model: models.Events},
        {model: models.Quests}
      ],
      where: {
        completion: false
      }
    }).then(function (userevents) {
      res.send(userevents.filter(userevent => {
        return userevent.Quest.type === 'Photo'
      }))
    }).catch(function (err) {
      res.send(err)
    })
  },
  createUserEvent: (req, res) => {
    models.Quests.findAll({
      where: {
        EventId: req.body.EventId
      }
    }).then(function (quests) {
      let arr = []
      if (quests.length > 0) {
        quests.map((quest) => {
          models.User_Events.findOrCreate({
            where: {
              UserId: req.body.UserId,
              QuestId: quest.dataValues.id
            },
            defaults: {
              EventId: req.body.EventId,
              userAnswer: '',
              completion: false
            }
          }).then(function (userevents) {
              arr.push(userevents)
              if (arr.length === quests.length) {
                res.send(arr)
              }
          }).catch(function (err) {
            res.send(err)
          })
        })
      } else {
        models.User_Events.findOrCreate({
          where: {
            UserId: req.body.UserId,
            QuestId: req.body.QuestId
          },
          defaults: {
            EventId: req.body.EventId,
            userAnswer: '',
            completion: false
          }
        }).then(function (userevents) {
          if (userevents[1]) {
            res.send(userevents[0])
          } else {
            res.status(409).json({message: 'UserId && QuestId already exists.'})
          }
        }).catch(function (err) {
          res.send(err)
        })
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUserEvent: (req, res) => {
    models.User_Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (userevent) {
      if (userevent) {
        res.status(200).json({message: `Deleted userEvent with ID: ${req.params.id}`})
      } else {
        res.send(`There is no userEvent with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUserEventByEventId: (req, res) => {
    models.User_Events.destroy({
      where: {
        EventId: req.params.id
      }
    }).then(function (userevent) {
      if (userevent) {
        res.status(200).json({message: `Deleted userEvent with ID: ${req.params.id}`})
      } else {
        res.send(`There is no userEvent with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateUserEvent: (req, res) => {
    models.User_Events.findById(req.params.id).then(function (userevent) {
      userevent.update({
        UserId: req.body.UserId,
        EventId: req.body.EventId,
        QuestId: req.body.QuestId,
        completion: req.body.completion,
        userAnswer: req.body.userAnswer
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  },
  updateUserEventByQuestVerification: (req, res) => {
    models.User_Events.findById(req.params.id).then(function (userevent) {
      if (req.body.status) {
        userevent.update({
          completion: true
        }).then(function (data) {
          res.send(data)
        }).catch(function (err) {
          res.send(err)
        })
      } else {
        userevent.update({
          userAnswer: null
        }).then(function (data) {
          res.send(data)
        }).catch(function (err) {
          res.send(err)
        })
      }
    })
  },
  updateUserEventByUserAnswer: (req, res) => {
    let userAnswer = req.body.userAnswer
    models.User_Events.findById(req.params.id).then(function (userevent) {
      userevent.getQuest().then(function (quest) {
        if(!isNaN(parseFloat(userAnswer))){
          let key = quest.answerKey.split(', ').map(item => +item)
          models.Locations.find({
            where: {
              id: userAnswer
            },
            attributes: {
              include: [[
                sequelize.fn('ST_Distance',
                  sequelize.col('geolocation'),
                  sequelize.literal(`ST_POINT(${key[0]}, ${key[1]})::geography`)
                ), 'distance'
              ]]
            }
          }).then((data)=> {
            if(data.dataValues.distance/600 < 1){
              userevent.update({
                completion: true,
                userAnswer: 'User get the locations'
              }).then(function (data) {
                res.send(data)
              }).catch(function (err) {
                res.send(err)
              })
            } else {
              userevent.update({
                completion: false,
                userAnswer: 'Still Too Far'
              }).then(function (data) {
                res.send(data)
              }).catch(function (err) {
                res.send(err)
              })
            }
          })
        } else {
          if (userAnswer === quest.answerKey) {
            userevent.update({
              completion: true,
              userAnswer: req.body.userAnswer
            }).then(function (data) {
              res.send(data)
            }).catch(function (err) {
              res.send(err)
            })
          } else {
            userevent.update({
              completion: false,
              userAnswer: req.body.userAnswer
            }).then(function (data) {
              res.send(data)
            }).catch(function (err) {
              res.send(err)
            })
          }
        }
      })
    })
  }
}

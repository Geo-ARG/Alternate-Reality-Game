const models = require('../models')

module.exports = {
  getQuests: (req, res) => {
    models.Quests.findAll({
      include: [
        {model: models.Users}
      ]
    }).then(function (quest) {
      res.send(quest)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getQuest: (req, res) => {
    models.Quests.findById(req.params.id).then(function (quest) {
      quest.getUsers().then(function (user) {
        res.send({Quests: quest, Users: user})
      })
    }).catch(function (err) {
      res.send(err)
    })
  },
  createQuest: (req, res) => {
    models.Quests.create({
      title: req.body.title,
      task: req.body.task,
      EventId: req.body.EventId,
      type: req.body.type,
      answerKey: req.body.answerKey,
      photoUrl: req.body.photoUrl,
      verification: false
    }).then(function (quest) {
      res.send(quest)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteQuest: (req, res) => {
    models.Quests.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (quest) {
      if (quest) {
        res.status(200).json({message: `Deleted quest with ID: ${req.params.id}`})
      } else {
        res.send(`There is no quest with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteQuestByEventId: (req, res) => {
    models.Quests.destroy({
      where: {
        EventId: req.params.id
      }
    }).then(function (quest) {
      if (quest) {
        res.status(200).json({message: `Deleted quest with ID: ${req.params.id}`})
      } else {
        res.send(`There is no quest with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateQuest: (req, res) => {
    models.Quests.findById(req.params.id).then(function (quest) {
      quest.update({
        title: req.body.title,
        task: req.body.task,
        EventId: req.body.EventId,
        type: req.body.type,
        answerKey: req.body.answerKey,
        photoUrl: req.body.photoUrl,
        verification: req.body.verification
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}

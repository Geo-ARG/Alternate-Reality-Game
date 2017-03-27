const chai = require('chai')
const models = require('../models')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

const url = require('../app')

function success (status) {
  let isSuccess = (status >= 200 && status < 400)
  if (isSuccess) return status
  else {
    if (status === 404) return 404
    else if (status === 500) return 500
  }
}

function deleteData () {
  return models.User_Locations.destroy({
    where: {}
  }).then(function () {

  })
}

describe('API/userlocations status and response', function () {
  let createdId, adminId, token
  let dummyData = [
    1,
    2,
    3,
    4
  ]
  let dummyData2 = ['fadly7@gmail.com', '123', 'gana7@yahoo.com', '345']

  deleteData()

  describe('GET /api', function () {
    it('should return /api endpoints', function (done) {
      chai.request(url)
        .get('/api')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
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
          ])
          done()
        })
    })
  })

  describe('POST /auth/admins', function () {
    it('return 200 <= status < 400, an object, and res.body.email should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/auth/admins')
        .send({
          email: dummyData2[0],
          password: dummyData2[1]
        })
        .end(function (err, res) {
          adminId = res.body.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.email.should.equal(dummyData2[0])
          done()
        })
    })
  })

  describe('POST /auth/admins/login', function () {
    it('return 200 <= status < 400, an object, and res.body should have deep property token', function (done) {
      chai.request(url)
        .post('/auth/admins/login')
        .send({
          email: dummyData2[0],
          password: dummyData2[1]
        })
        .end(function (err, res) {
          token = res.body.token
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.should.have.deep.property('token')
          done()
        })
    })
  })

  describe('POST /api/userlocations', function () {
    it('return 200 <= status < 400, an object, and res.body.LocationId should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/api/userlocations')
        .set('token', token)
        .send({
          UserId: dummyData[1],
          LocationId: dummyData[0]
        })
        .end(function (err, res) {
          createdId = res.body.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.LocationId.should.equal(dummyData[0])
          done()
        })
    })
  })

  describe('GET /api/userlocations', function () {
    it('return 200 <= status < 400, an object, and res.body[0].UserId should equal dummyData[1]', function (done) {
      chai.request(url)
        .get('/api/userlocations')
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].UserId.should.equal(dummyData[1])
          done()
        })
    })
  })

  describe('PUT /api/userlocations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.LocationId should equal dummyData[2]', function (done) {
      chai.request(url)
        .put(`/api/userlocations/${createdId}`)
        .set('token', token)
        .send({
          LocationId: dummyData[2],
          UserId: dummyData[0]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.LocationId.should.equal(dummyData[2])
          done()
        })
    })
  })

  describe('DELETE /api/userlocations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/userlocations/${createdId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted userLocation with ID: ${createdId}`})
          done()
        })
    })
  })

  describe('DELETE /auth/admins/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message delete admin with id adminId', function (done) {
      chai.request(url)
        .delete(`/auth/admins/${adminId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted admin with ID: ${adminId}`})
          done()
        })
    })
  })
})

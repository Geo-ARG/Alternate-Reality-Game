const chai = require('chai')
const models = require('../models')
const expect = chai.expect
const should = chai.should()
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
  return models.Locations.destroy({
    where: {}
  }).then(function () {

  })
}

describe('API/locations status and response', function () {
  let createdId, dummyId1, dummyId2, dummyId3, dummyId4, dummyId5, adminId, token
  let dummyData = [
    6.12345,
    106.4321,
    6.5439,
    106.12323,
    6.5439,
    106.12321,
    {
      'type': 'Point',
      'coordinates': [
        6.12345,
        106.4321
      ]
    },
    {
      'type': 'Point',
      'coordinates': [
        6.5439,
        106.12323
      ],
      'crs': {
        'type': 'name',
        'properties': {
          'name': 'EPSG:4326'
        }
      }
    },
    1,
    2,
    3
  ]
  let dummyData2 = ['fadly2@gmail.com', '123', 'gana2@yahoo.com', '345']

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

  describe('POST /api/locations', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should be an object geometry', function (done) {
      chai.request(url)
        .post('/api/locations')
        .set('token', token)
        .send({
          latitude: dummyData[0],
          longitude: dummyData[1],
          UserId: dummyData[8]
        })
        .end(function (err, res) {
          createdId = res.body.Locations.id
          dummyId3 = res.body.User_Locations.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.Locations.geolocation.type.should.equal('Point')
          res.body.Locations.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
  })

  describe('GET /api/locations', function () {
    it('return 200 <= status < 400, an object, and res.body[0].geolocation should deep equal dummyData[6]', function (done) {
      chai.request(url)
        .get('/api/locations')
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].geolocation.should.deep.equal(dummyData[6])
          done()
        })
    })
  })
  describe('POST /api/locations', function () {
    it('return 200 <= status < 400, an object, should add new user whose location is far', function (done) {
      chai.request(url)
        .post('/api/locations')
        .set('token', token)
        .send({
          latitude: dummyData[2],
          longitude: dummyData[3],
          UserId: dummyData[9]
        })
        .end(function (err, res) {
          dummyId1 = res.body.Locations.id
          dummyId4 = res.body.User_Locations.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.Locations.geolocation.type.should.equal('Point')
          res.body.Locations.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
    it('return 200 <= status < 400, an object, should add new user whose location is nearby', function (done) {
      chai.request(url)
        .post('/api/locations')
        .set('token', token)
        .send({
          latitude: dummyData[4],
          longitude: dummyData[5],
          UserId: dummyData[10]
        })
        .end(function (err, res) {
          dummyId2 = res.body.Locations.id
          dummyId5 = res.body.User_Locations.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.Locations.geolocation.type.should.equal('Point')
          res.body.Locations.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
  })

  describe('PUT /api/locations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should deep equal dummyData[7]', function (done) {
      chai.request(url)
        .put(`/api/locations/${createdId}`)
        .set('token', token)
        .send({
          latitude: dummyData[2],
          longitude: dummyData[3]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.geolocation.should.deep.equal(dummyData[7])
          done()
        })
    })
  })

  describe('POST /api/locations/scan', function () {
    it('return 200 <= status < 400, an object, and res.body[0].nearby should deep equal true', function (done) {
      chai.request(url)
        .post('/api/locations/scan')
        .set('token', token)
        .send({
          latitude: dummyData[4],
          longitude: dummyData[5]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.should.be.an('array')
          res.body[0].nearby.should.deep.equal(true)
          done()
        })
    })
  })

  describe('DELETE /api/locations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message deleted location with ID createdId', function (done) {
      chai.request(url)
        .delete(`/api/locations/${createdId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted location with ID: ${createdId}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message deleted location with ID dummy1', function (done) {
      chai.request(url)
        .delete(`/api/locations/${dummyId1}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted location with ID: ${dummyId1}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message deleted location with ID dummy2', function (done) {
      chai.request(url)
        .delete(`/api/locations/${dummyId2}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted location with ID: ${dummyId2}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message deleted location with ID dummy3', function (done) {
      chai.request(url)
        .delete(`/api/userlocations/${dummyId3}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted userLocation with ID: ${dummyId3}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message deleted location with ID dummy4', function (done) {
      chai.request(url)
        .delete(`/api/userlocations/${dummyId4}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted userLocation with ID: ${dummyId4}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message deleted location with ID dummy5', function (done) {
      chai.request(url)
        .delete(`/api/userlocations/${dummyId5}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted userLocation with ID: ${dummyId5}`})
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

const chai = require('chai')
const models = require('../models')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

const url = require('../app.js')

function success (status) {
  let isSuccess = (status >= 200 && status < 400)
  if (isSuccess) return status
  else {
    if (status === 404) return 404
    else if (status === 500) return 500
  }
}

function deleteData () {
  return models.Users.destroy({
    where: {}
  }).then(function () {

  })
}

describe('Auth/users status and response', function () {
  let createdId, token, adminId
  let dummyData = ['fadly', 'fadly@gmail.com', 'gana', 'gana@yahoo.com']
  let dummyData2 = ['fadly8@gmail.com', '123', 'gana8@yahoo.com', '345']

  deleteData()

  describe('GET /auth', function () {
    it('should return /auth endpoints', function (done) {
      chai.request(url)
        .get('/auth')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/auth/users',
            '/auth/users/:id',
            '/auth/admins',
            '/auth/admins/:id',
            '/auth/admins/login'
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

  describe('POST /auth/users', function () {
    it('return 200 <= status < 400, an object, and res.body.User.username should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/auth/users')
        .set('token', token)
        .send({
          username: dummyData[0],
          email: dummyData[1]
        })
        .end(function (err, res) {
          createdId = res.body.User.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.User.username.should.equal(dummyData[0])
          done()
        })
    })
  })

  describe('GET /auth/users', function () {
    it('return 200 <= status < 400, an object, and res.body[0].email should equal dummyData[1]', function (done) {
      chai.request(url)
        .get('/auth/users')
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].email.should.equal(dummyData[1])
          done()
        })
    })
  })

  describe('PUT /auth/users/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.email should equal dummyData[3]', function (done) {
      chai.request(url)
        .put(`/auth/users/${createdId}`)
        .set('token', token)
        .send({
          username: dummyData[2],
          email: dummyData[3]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.email.should.equal(dummyData[3])
          done()
        })
    })
  })

  describe('DELETE /auth/users/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/auth/users/${createdId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted user with ID: ${createdId}`})
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

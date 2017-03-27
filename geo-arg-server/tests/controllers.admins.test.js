const chai = require('chai')
const models = require('../models')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

let jwt = require('jsonwebtoken')
let hash = require('password-hash')

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
  return models.Admins.destroy({
    where: {}
  }).then(function () {

  })
}

describe('Admin status and response', function () {
  let createdId, hashedPass, token
  let dummyData = ['fadly@gmail.com', '123', 'gana@yahoo.com', '345']

  setTimeout(function () {
    deleteData()
  }, 750)

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
          email: dummyData[0],
          password: dummyData[1]
        })
        .end(function (err, res) {
          createdId = res.body.id
          hashedPass = res.body.password
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.email.should.equal(dummyData[0])
          done()
        })
    })
  })

  describe('POST /auth/admins/login', function () {
    it('return 200 <= status < 400, an object, and res.body should have deep property token', function (done) {
      chai.request(url)
        .post('/auth/admins/login')
        .send({
          email: dummyData[0],
          password: dummyData[1]
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

  describe('GET /auth/admins', function () {
    it('return 200 <= status < 400, an object, and res.body[0].password should equal hashedPass', function (done) {
      chai.request(url)
        .get('/auth/admins')
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].password.should.equal(hashedPass)
          done()
        })
    })
  })

  describe('PUT /auth/admins/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.email should equal dummyData[2]', function (done) {
      chai.request(url)
        .put(`/auth/admins/${createdId}`)
        .set('token', token)
        .send({
          email: dummyData[2],
          password: dummyData[3]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.email.should.equal(dummyData[2])
          done()
        })
    })
  })

  describe('DELETE /auth/admins/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message delete admin with id createdId', function (done) {
      chai.request(url)
        .delete(`/auth/admins/${createdId}`)
        .set('token', token)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted admin with ID: ${createdId}`})
          done()
        })
    })
  })
})

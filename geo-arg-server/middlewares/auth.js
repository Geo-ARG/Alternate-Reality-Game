let jwt = require('jsonwebtoken')
module.exports = {
  verifyLogin: function (req, res, next) {
    if (req.headers.token == null || req.headers.token == 'null') {
      res.json("Authentication failed, you aren't authorized.")
    } else {
      let decoded = jwt.decode(req.headers.token)
      if (decoded.hasOwnProperty('id')) {
        if (jwt.verify(req.headers.token, process.env.SECRET)) {
          next()
        } else {
          res.json('Authentication failed, wrong token or token is expired.')
        }
      } else if (decoded.hasOwnProperty('userid')) {
        if (jwt.verify(req.headers.token, process.env.SECRET)) {
          next()
        } else {
          res.json('Authentication failed, wrong token or token is expired.')
        }
      }
    }
  },
  verifyAdmin: function (req, res, next) {
    if (req.headers.token == null || req.headers.token == 'null') {
      res.json("Authentication failed, you aren't authorized.")
    } else {
      let decoded = jwt.decode(req.headers.token)
      if (decoded.hasOwnProperty('id')) {
        if (jwt.verify(req.headers.token, process.env.SECRET)) {
          next()
        } else {
          res.json('Authentication failed, wrong token or token is expired.')
        }
      } else {
        res.json('Authentication failed, admin only.')
      }
    }
  }
}

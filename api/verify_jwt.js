const config = require('../config.js')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  jwt.verify(req.body.token, config.api.jwt.secretOrKey, (err, decoded) => {
    res.json({
      success: !err
    })
  })
}

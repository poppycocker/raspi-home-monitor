const config = require('../config.js')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt

module.exports = {
  api: {
    jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
    secretOrKey: config.api.jwt.secretOrKey
  },
  webcam: {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: config.api.jwt.secretOrKey
  }
}

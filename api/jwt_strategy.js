const passportJWT = require('passport-jwt')
const config = require('../config.js')
const jwtOptions = require('./jwt_options.js')
const JwtStrategy = passportJWT.Strategy

const judge = (jwt_payload, next) => {
  // console.log('payload received', jwt_payload)
  // usually this would be a database call:
  const user = config.users.find(v => v.id === jwt_payload.id)
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
}

module.exports = {
  api: new JwtStrategy(jwtOptions.api, judge),
  webcam: new JwtStrategy(jwtOptions.webcam, judge)
}

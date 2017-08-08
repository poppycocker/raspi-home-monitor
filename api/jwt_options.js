const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt

module.exports = {
  jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: 'doppanprinting'
}

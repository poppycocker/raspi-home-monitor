const config = require('../config.js')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  // usually this would be a database call:
  const user = config.users.find(v => v.name === req.body.name)
  if (!user) {
    res.status(401).json({
      message: `no such user found: ${JSON.stringify(req.body)}`
    })
    return
  }
  if (user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    const payload = {
      id: user.id
    }
    res.json({
      message: 'ok',
      token: jwt.sign(payload, config.api.jwt.secretOrKey, {
        expiresIn: config.api.jwt.expiresIn
      })
    })
  } else {
    res.status(401).json({
      message: 'passwords did not match'
    })
  }
}

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const config = require('../config.js')
const auth = require('./auth.js')
const bme280 = require('./bme280.js')
const jwtStrategy = require('./jwt_strategy.js')

const app = express()
passport.use(jwtStrategy)
app.use(passport.initialize())
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Express is up!'
  })
})

app.post('/api/auth', auth)

app.get('/api/bme280', passport.authenticate('jwt', {
  session: false
}), bme280)

// start server
app.listen(config.api_port, () => console.log('Express running'))


// [for test]
// 
// curl -i "http://{yourhost}:{port}/api/auth" -H "X-Requested-With: curl" -d 'name={name}&password={password}'
// curl -i "http://{yourhost}:{port}/api/bme280" -H "x-access-token: {token}"

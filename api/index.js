const fs = require('fs')
const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const MjpegProxy = require('mjpeg-proxy').MjpegProxy;

const config = require('../config.js')
const auth = require('./auth.js')
const bme280 = require('./bme280.js')
const irkit = require('./irkit.js')
const jwtStrategy = require('./jwt_strategy.js')

const app = express()
passport.use('jwt_api', jwtStrategy.api)
passport.use('jwt_webcam', jwtStrategy.webcam)
app.use(passport.initialize())
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}))
// parse application/json
app.use(bodyParser.json())

// publish webpage
app.use(express.static('public'))

app.post('/api/auth', auth)

app.get('/api/bme280', passport.authenticate('jwt_api', {
  session: false
}), bme280)

app.get('/api/irkit', passport.authenticate('jwt_api', {
  session: false
}), irkit.get)

app.post('/api/irkit', passport.authenticate('jwt_api', {
  session: false
}), irkit.post)

app.use('/webcam', passport.authenticate('jwt_webcam', {
  session: false
}), new MjpegProxy(`http://localhost:${config.webcam.port}/?action=stream`).proxyRequest)

// start server
if (config.https.use) {
  const options = {
    key:  fs.readFileSync(config.https.key),
    cert: fs.readFileSync(config.https.cert)
  }
  const server = https.createServer(options, app);
  server.listen(config.api.port, () => console.log('Express running'))
} else {
  app.listen(config.api.port, () => console.log('Express running'))
}


// [for test]
// 
// curl -i "http://{yourhost}:{port}/api/auth" -H "X-Requested-With: curl" -d 'name={name}&password={password}'
// curl -i "http://{yourhost}:{port}/api/bme280" -H "x-access-token: {token}"

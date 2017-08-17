const config = require('../config/webapi.config.js')
const http = require('http')

module.exports = {
  get: (req, res) => {
    res.json({
      success: true,
      commands: config.irkit.commands
    })
  },
  post: (req, res) => {
    const options = {
        host: config.irkit.host,
        path: '/messages',
        method: 'POST',
        headers: {
          'X-Requested-With': 'nodejs',
          'Content-Length': Buffer.byteLength(req.body.data)
        }
    }
    const reqIr = http.request(options, (resIr) => {
      if (resIr.statusCode === 200) {
        res.json({
          success: true
        })
      } else {
        res.status(resIr.statusCode).json({
          success: false,
          message: `IRKit returns ${resIr.statusCode}, ${resIr.statusMessage}`
        })
      }
    })
    reqIr.on('error', (e) => {
      res.json({
        success: false,
        message: e.message
      })
    })
    reqIr.write(req.body.data)
    reqIr.end()
  }
}

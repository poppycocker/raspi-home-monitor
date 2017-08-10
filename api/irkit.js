const config = require('../config.js')
const http = require('http')

module.exports = {
  get: (req, res) => {
    res.json({
      success: true,
      commands: config.irkit.commands
    })
  },
  post: (req, res) => {
    const postDataStr = JSON.stringify(req.body.data)
    const options = {
        host: config.irkit.host,
        path: '/messages',
        method: 'POST',
        headers: {
            'X-Requested-With': 'nodejs'
        }
    }
    const reqIr = http.request(options, (resIr) => {
      if (resIr.statusCode === 200) {
        res.json({
          success: true
        })
      } else {
        res.json({
          success: false,
          message: `IRKit returns ${resIr.statusCode}`
        })
      }
    })
    reqIr.on('error', (e) => {
      res.json({
        success: false,
        message: e.message
      })
    })
    reqIr.write(postDataStr)
    reqIr.end()
  }
}

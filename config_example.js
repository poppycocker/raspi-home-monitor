module.exports = {
  users: [{
    name: 'n@me',
    password: 'p@ssword'
  }],
  ir_commands: [{
    label: 'turn the light on',
    data: {}
  }],
  https: {
    use: true,
    key: '/etc/letsencrypt/live/your.ho.st/privkey.pem',
    cert: '/etc/letsencrypt/live/your.ho.st/fullchain.pem'
  },
  api: {
    port: 8080,
    jwt: {
      secretOrKey: 'secret'
    }
  },
  webcam: {
    port: 8081
  }
}

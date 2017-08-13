module.exports = {
  users: [{
    name: 'n@me',
    password: 'p@ssword'
  }],
  https: {
    use: true,
    key: '/etc/letsencrypt/live/your.ho.st/privkey.pem',
    cert: '/etc/letsencrypt/live/your.ho.st/fullchain.pem'
  },
  api: {
    port: 8080,
    jwt: {
      secretOrKey: 'secret',
      expiresIn: '1d'
    }
  },
  // params for package `bme280-sensor`
  bme280: {
    i2cBusNo: 1, // defaults to 1
    i2cAddress: 0x77 // defaults to 0x77
  },
  webcam: {
    port: 8081
  },
  irkit: {
    host: '192.168.1.2',
    commands: [{
      label: 'turn the light on',
      // request body for IRKit's `POST /messages`. stringified JSON required.
      data: '{"format":"raw","freq":38,"data":[2626,710,2626,710,...]}'
    }]
  }
}

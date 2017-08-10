const config = require('../config.js')
const BME280 = require('bme280-sensor');

const bme280 = new BME280({
  i2cBusNo: config.bme280.i2cBusNo, // defaults to 1
  i2cAddress: config.bme280.i2cAddress // BME280.BME280_DEFAULT_I2C_ADDRESS() // defaults to 0x77
});

const initBME280 = (res) => {
  bme280.init()
    .then(() => {
      readBME280SensorData(res)
    }).catch((err) => {
    res.json({
      success: false,
      message: `BME280 initialization failed: ${err}`
    })
  })
}

const readBME280SensorData = (res) => {
  bme280.readSensorData()
    .then((data) => {
      res.json({
        success: true,
        temperature_C: data.temperature_C,
        pressure_hPa: data.pressure_hPa,
        humidity: data.humidity
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        message: `BME280 read error: ${err}`
      })
    })
}

module.exports = (req, res) => {
  if (!bme280.cal) {
    initBME280(res)
  } else {
    readBME280SensorData(res)
  }
}

# raspi-home-monitor

A home monitoring system of using Raspberry Pi (with USB-WebCam and BME280 Sensor Unit) and IRKit.

## System Setup

1. Connect following devices to your Raspberry Pi.
    * USB-WebCam
    * BME280 Sensor Unit via I2C via GPIO
2. Install Node.js on your Raspberry Pi.
3. Launch MJPEG server(like 'mjpeg-streamer') on your Raspberry Pi.
4. Launch your IRKit on your network.
5. (optional, but recommended) install SSL/TLS server certificate files to your Raspberry Pi.

## How to Use

1. Create `config/webapi.config.js`
    * by copying `config/webapi.config_example.js` and edit it.
2. Run following commands(*).
3. Access `http(s)://[your Raspberry Pi's host]:[api.port on config/webapi.config.js]/`
4. Enter username and password that you defined in `config/webapi.config.js`
5. Enjoy.

### commands(*)

``` bash
# install dependencies
npm install

# build webui for production with minification
# generates public/index.html and statics.
npm run build

# run webapi-server on your Raspberry Pi
# 
# * depending on path of your SSL/TLS server certificate files, sudo will be required if `https.use: true` is set on config/webapi.config.js
# * running as daemon by using tool like `forever` is recommended
(sudo) node webapi/index.js
```

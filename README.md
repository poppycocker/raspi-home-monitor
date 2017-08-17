# raspi-home-monitor

A home monitoring system of using Raspberry Pi (with USB-WebCam and BME280 Sensor Unit) and IRKit.

![system composition example](https://github.com/poppycocker/raspi-home-monitor/blob/master/system_composition_example.jpg)

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

## REST API Specification

### POST /api/auth

Authenticates provided username and password, returns generated token.

- parameters
    + name (required)
    + password (required)
- response(200)
    + headers
        * Content-Type: application/json
    + body
        * `{"success":true,"token":"....."}` 
- response(401)
    + headers
        * Content-Type: application/json
    + body
        * `{"success":false,"message":"....."}`

### POST /api/verifyjwt

Verifies token string.

- parameters
    + token (required)
- response(200)
    + headers
        * Content-Type: application/json
    + body
        * `{"success":true/false}`

### GET /api/bme280

Provides temperature, pressure and humidity from BME280 sensor unit.

- headers
    + x-access-token: [served token]
- response(200)
    + headers
        * Content-Type: application/json
    + body
        * `{"success":true,"temperature_C":0.0,"pressure_hPa":0.0,"humidity":0.0}` 
- response(401)
    + body
        * Unauthorized
- response(500)
    + body
        * `{"success":false,"message":"....."}` 

### GET /api/irkit

Gets an array of IRKit command data you defined in `config/webapi.config.js`

- headers
    + x-access-token: [served token]
- response(200)
    + headers
        * Content-Type: application/json
    + body
        * `{"success":true,"commands":[{"label": ".....","data":{.....}}, ...]}` 
- response(401)
    + body
        * Unauthorized

### POST /api/irkit

Posts an IRKit command data.

- parameters
    + data (required, stringified JSON of IR data: `{"format":"raw","freq":"38","data":[.....]}`)
- response(200)
    + headers
        * Content-Type: application/json
    + body
        * `{"success":true}` 
- response(401)
    + body
        * Unauthorized
- response(other code, see IRKit's API document)
    + headers
        * Content-Type: application/json
    + body
        * `{"success":false,"message":"....."}` 

### GET /webcam

Provides MJPEG stream. Set this to attribute 'src' of `<img>`.

- parameters
    + token: [served token]
- response(200)
    + headers
        * Content-Type: multipart/x-mixed-replace;boundary=boundarydonotcross
    + body
        * MJPEG Stream 
- response(401)
    + body
        * Unauthorized
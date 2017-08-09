$(function() {

  const host = 'poppycocker.ddns.net'
  let token = ''
  let webcam = null

  $('#login').click(() => {
    const username = $('#username').val()
    const password = $('#password').val()
    $.ajax({
      type: 'POST',
      url: `/api/auth`,
      data: `name=${username}&password=${password}`,
      success: (msg) => {
        token = msg.token
        $('#token').text(token)
        setInterval(getSensorData, 3000)
        getWebCamStream()
      }
    })
  })

  const getSensorData = () => {
    $.ajax({
      type: 'GET',
      url: `/api/bme280`,
      headers: {
        'x-access-token': token
      },
      success: (msg) => {
        $('#bme280').text(JSON.stringify(msg))
      }
    })
  }

  // https://bl.ocks.org/igrigorik/5736866
  const getWebCamStream = () => {
    $('#webcam').attr('src', `//${host}/webcam?token=${token}`)
  }

})

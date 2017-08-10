$(function() {

  let token = localStorage.getItem('jwt')
  let webcam = null

  if (!!token) {
    $.ajax({
      type: 'POST',
      url: '/api/verifyjwt',
      data: `token=${token}`,
      success: (msg) => {
        if (msg.success) {
          $('#auth').hide()
          startMonitoring()
        } else {
          $('#msg').text('login required.')
        }
      },
      error: (xhr, status, err) => {
        $('#msg').text(`POST /api/verifyjwt: error: ${err}`)
      }
    })
  }

  $('#login').click(() => {
    const username = $('#username').val()
    const password = $('#password').val()
    $.ajax({
      type: 'POST',
      url: '/api/auth',
      data: `name=${username}&password=${password}`,
      success: (msg) => {
        token = msg.token
        localStorage.setItem('jwt', token)
        $('#auth').hide()
        startMonitoring()
      },
      error: (xhr, status, err) => {
        $('#msg').text(`POST /api/auth: error: ${err}`)
      }
    })
  })

  const startMonitoring = () => {
    getSensorData()
    setInterval(getSensorData, 30 * 1000)
    getWebCamStream()
    getIrCommands()
  }

  const getSensorData = () => {
    $.ajax({
      type: 'GET',
      url: '/api/bme280',
      headers: {
        'x-access-token': token
      },
      success: (msg) => {
        $('#bme280').text(JSON.stringify(msg))
      },
      error: (xhr, status, err) => {
        $('#msg').text(`GET /api/bme280: error: ${err}`)
      }
    })
  }

  // https://bl.ocks.org/igrigorik/5736866
  const getWebCamStream = () => {
    $('#webcam').attr('src', `/webcam?token=${token}`)
  }

  const getIrCommands = () => {
    $.ajax({
      type: 'GET',
      url: '/api/irkit',
      headers: {
        'x-access-token': token
      },
      success: (msg) => {
        msg.commands.forEach(generateIrButton)
      },
      error: (xhr, status, err) => {
        $('#msg').text(`GET /api/irkit: error: ${err}`)
      }
    })
  }

  const generateIrButton = (cmd) => {
    const $btn = $('<button/>')
    $btn.html(cmd.label)
    $btn.click(e => {
      $.ajax({
        type: 'POST',
        url: '/api/irkit',
        headers: {
          'x-access-token': token
        },
        data: `data=${cmd.data}`,
        success: (msg) => {
          $('#msg').text(`${cmd.label}: success`)
        },
        error: (xhr, status, err) => {
          $('#msg').text(`${cmd.label}: error: ${err}`)
        }
      })
    });
    $('#ir-cmds').append($btn)
  }

})

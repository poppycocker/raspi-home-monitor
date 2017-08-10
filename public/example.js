$(function() {

  let token = ''
  let webcam = null

  $('#login').click(() => {
    const username = $('#username').val()
    const password = $('#password').val()
    $.ajax({
      type: 'POST',
      url: '/api/auth',
      data: `name=${username}&password=${password}`,
      success: (msg) => {
        token = msg.token
        $('#token').text(token)
        setInterval(getSensorData, 3000)
        getWebCamStream()
        getIrCommands()
      }
    })
  })

  const getSensorData = () => {
    $.ajax({
      type: 'GET',
      url: '/api/bme280',
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

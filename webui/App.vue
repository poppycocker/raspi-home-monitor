<template>
  <div id="app">
    <header id="header" class="">
      <h1><i class="icon-raspberrypi"></i>raspi home monitor</h1>
    </header>
    <router-view :token="token" :hub="hub"></router-view>
    <message :message="message" :hub="hub" />
  </div>
</template>

<script>
import axios from 'axios'
import querystring from 'querystring'
import Vue from 'vue'
import VueHead from 'vue-head'
import Message from '@/components/Message'
require('font-mfizz/dist/font-mfizz.css')

Vue.use(VueHead)

const KEY_LOCALSTORAGE = 'RASPI_HOME_MONITOR'

export default {
  name: 'app',
  head: {
    meta: [{
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0'
    }]
  },
  data () {
    return {
      token: localStorage.getItem(KEY_LOCALSTORAGE),
      hub: new Vue(),
      message: ''
    }
  },
  created () {
    this.hub.$on('showMessage', this.showMessage)
    this.hub.$on('clearMessage', this.clearMessage)
    this.hub.$on('authenticated', (token) => {
      localStorage.setItem(KEY_LOCALSTORAGE, token)
      this.token = token
      this.showMainView()
    })
    this.showAuthView()
    this.checkToken()
  },
  methods: {
    checkToken () {
      // check token and move to auth view if needed.
      if (!this.token) {
        return
      }
      axios.post('/api/verifyjwt', querystring.stringify({
        token: this.token
      })).then(res => {
        res.data.success ? this.showMainView() : this.showAuthView()
      }).catch(err => {
        this.showAuthView()
        this.showMessage(err.message)
      })
    },
    showAuthView () {
      this.$router.replace('/auth')
    },
    showMainView () {
      this.$router.replace('/')
    },
    showMessage (message) {
      this.message = message
    },
    clearMessage () {
      this.message = ''
    }
  },
  components: {
    Message
  }

}
</script>

<style>
body, html {
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
header {
  background-color: #BC1142;
  color: white;
  width: 100%;
  padding-left: 0.5em;
}
h1 {
  font-size: 1.75em;
  margin: 0;
  padding: 0.1em 0 0 0.1em;
}
h2 {
  margin: 0.8em 0 0.4em 0.2em;
}
section {
  padding: 0 1.5em;
}
</style>

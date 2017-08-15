<template>
  <div>
    <section>
      <label for="username">user name:</label>
      <input type="text" id="username" v-model="username" v-on:keyup.enter="auth" minlength="1" required>
      <label for="password">password:</label>
      <input type="password" id="password" v-model="password" v-on:keyup.enter="auth" minlength="1" required>
      <button type="button" @click="auth">Authenticate</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import querystring from 'querystring'

export default {
  props: ['hub'],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    auth () {
      if (!this.username || !this.password) {
        this.hub.$emit('showMessage', 'Username and Password required.')
        return
      }
      axios.post('/api/auth', querystring.stringify({
        name: this.username,
        password: this.password
      })).then(res => {
        if (res.data.success) {
          this.hub.$emit('authenticated', res.data.token)
        } else {
          this.hub.$emit('showMessage', res.data.message)
          this.showAuthView()
        }
      }).catch(err => {
        this.hub.$emit('showMessage', err.message)
      })
    }
  }
}
</script>

<style>
input {
  width: 80%;
  height: 1.5em;
  background: #eee;
  border: 1px solid #bebebe;
  font-size: 1em;
  text-indent: 0.7em;
}
input:focus {
  background: #edf4ff;
}
label {
  display: block;
  margin-top: 0.2em;
  font-size: 1.5em;
}
button {
  width: 80%;
  height: 1.8em;
  margin: 1.2em auto;
  font-size: 1.5em;
  background-color: #BC1142;
  color: white;
}
</style>
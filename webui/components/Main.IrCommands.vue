<template>
  <section>
    <ul>
      <li v-for="command in commands" @click="postCommand(command)">{{command.label}}</li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'
import querystring from 'querystring'

export default {
  props: ['token', 'hub'],
  data () {
    return {
      commands: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      axios.get('/api/irkit', {
        headers: {
          'x-access-token': this.token
        }
      }).then(res => {
        if (res.data.success) {
          this.commands = res.data.commands
        } else {
          this.hub.$emit('showMessage', res.data.message)
        }
      }).catch(err => {
        this.hub.$emit('showMessage', err.message)
      })
    },
    postCommand (command) {
      axios.post('/api/irkit', querystring.stringify({
        data: command.data
      }), {
        headers: {
          'x-access-token': this.token
        }
      }).then(res => {
        if (res.data.success) {
          this.hub.$emit('showMessage', `"${command.label}" success.`)
        } else {
          this.hub.$emit('showMessage', res.data.message)
        }
      }).catch(err => {
        this.hub.$emit('showMessage', err.message)
      })
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul li {
  display: inline-block;
  border: 1px solid #CCC;
  margin: 0.2em;
  padding: 0.5em;
}
ul li:hover {
  background-color: #BC1142;
  color: white;
  cursor: pointer;
}
ul li:active {
  background-color: white;
  color: #2c3e50;
  cursor: pointer;
}
</style>
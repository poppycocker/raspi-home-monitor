<template>
  <section>
    <ul class="air-condition">
      <li>{{temperature}} ℃</li>
      <li>{{humidity}} %</li>
      <li>{{pressure}} hPa</li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['token', 'hub'],
  data () {
    return {
      temperature: 0.0,
      humidity: 0.0,
      pressure: 0
    }
  },
  created () {
    this.fetchData()
    setInterval(this.fetchData.bind(this), 5 * 1000)
  },
  methods: {
    fetchData () {
      axios.get('/api/bme280', {
        headers: {
          'x-access-token': this.token
        }
      }).then(res => {
        if (res.data.success) {
          this.cosmeAndApply(res.data)
        } else {
          this.hub.$emit('showMessage', res.data.message)
        }
      }).catch(err => {
        this.hub.$emit('showMessage', err.message)
      })
    },
    cosmeAndApply (data) {
      this.temperature = Math.round(data.temperature_C * 10) / 10
      this.pressure = Math.round(data.pressure_hPa)
      this.humidity = Math.round(data.humidity * 10) / 10
    }
  }
}
</script>

<style>
.air-condition {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.air-condition li {
  display: inline-block;
  margin-right: 0.5em;
  padding: 0.5em;
}
</style>
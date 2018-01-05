<template>
  <section>
    <input type="checkbox" v-model="autoDisconnection" @change="onAutoDisconnectionChanged" id="auto-disconnection">
    <label for="auto-disconnection">disconnect after {{remaining}}s</label>
    <img :src="imgSrc" v-bind:style="imgSize" ref="img" v-if="show">
    <div v-bind:style="imgSize" @click="onClickImg" v-else>Paused.<br>Tap to Resume.</div>
  </section>
</template>

<script>
const TIMEOUT = 15
const DUMMY_IMG = 'data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7'

export default {
  props: ['token', 'hub'],
  data () {
    return {
      imgSrc: '',
      imgSize: {
        height: null,
        width: '90%'
      },
      show: true,
      timers: {
        showImg: null,
        remaining: null
      },
      remaining: TIMEOUT,
      autoDisconnection: true
    }
  },
  created () {
    this.startTimer()
    window.addEventListener('resize', (e) => {
      console.log(e)
    })
    this.loadImg()
  },
  methods: {
    onClickImg () {
      if (this.imgSrc !== DUMMY_IMG) {
        return
      }
      if (this.autoDisconnection) {
        this.startTimer()
      }
      this.loadImg()
    },
    onAutoDisconnectionChanged () {
      this.stopTimer()
      if (this.autoDisconnection && !this.timers.showImg) {
        this.startTimer()
      }
      if (!this.autoDisconnection && this.imgSrc === DUMMY_IMG) {
        this.loadImg()
      }
    },
    startTimer () {
      this.timers.showImg = setTimeout(() => {
        this.syncHeight()
        this.hideImg()
        this.stopTimer()
      }, TIMEOUT * 1000)
      this.remaining = TIMEOUT
      this.timers.remaining = setInterval(() => {
        this.remaining--
      }, 1000)
    },
    stopTimer () {
      clearTimeout(this.timers.showImg)
      this.timers.showImg = null
      clearTimeout(this.timers.remaining)
      this.timers.remaining = null
      this.remaining = TIMEOUT
    },
    syncHeight () {
      const img = this.$refs.img
      this.imgSize.height = `${img.offsetHeight}px`
    },
    loadImg () {
      this.imgSrc = `/webcam?token=${this.token}`
      this.show = true
    },
    hideImg () {
      this.imgSrc = DUMMY_IMG
      this.show = false
    }
  }
}
</script>

<style scoped>
div {
  font-size: 1.5em;
  border: 1px solid #CCC;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
div:hover {
  cursor: pointer;
}
input {
  width: auto;
}
input, label {
  font-size: 1.2em;
  float: left;
}
</style>

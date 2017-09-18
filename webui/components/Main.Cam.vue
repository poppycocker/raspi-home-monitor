<template>
  <section>
    <img :src="imgSrc" v-bind:style="imgSize" ref="img" v-if="show">
    <div v-bind:style="imgSize" @click="onClick" v-else>Paused.<br>Tap to Resume.</div>
  </section>
</template>

<script>
const TIMEOUT = 15 * 1000
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
      timer: null
    }
  },
  created () {
    this.timer = this.startTimer()
    window.addEventListener('resize', (e) => {
      console.log(e)
    })
    this.loadImg()
  },
  methods: {
    onClick () {
      this.startTimer()
      this.loadImg()
    },
    startTimer () {
      setTimeout(() => {
        this.syncHeight()
        this.hideImg()
      }, TIMEOUT)
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
</style>

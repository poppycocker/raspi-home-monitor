<template>
  <section>
    <img class="webcam" :src="imgSrc">
  </section>
</template>

<script>
export default {
  props: ['token', 'hub'],
  data () {
    return {
      imgSrc: 'dummy-loading'
    }
  },
  created () {
    this.imgSrc = `/webcam?token=${this.token}`
  }
}
</script>

<style>
.webcam {
  width: 90%;
}
</style>
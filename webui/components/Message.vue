<template>
  <transition name="fade" v-on:after-enter="onAfterEnterTransition">
    <div v-if="message.length > 0">
      <p>{{message}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['message', 'hub'],
  methods: {
    onAfterEnterTransition () {
      setTimeout(() => (this.hub.$emit('clearMessage')), 2000)
    }
  }
}
</script>

<style scoped>
div {
  position: fixed;
  left: 0;
  top: 1em;
  width: 100%;
  text-align: center;
  z-index: 65536;
}
div p {
  display: inline-block;
  width: 80%;
  border: 3px solid #BC1142;
  background-color: white;
  font-size: 1.2em;
  border-radius: 6px;
  box-shadow:0px 0px 8px 3px white;
}
.fade-leave-active {
  transition: opacity 2s
}
.fade-leave-to {
  opacity: 0
}
</style>
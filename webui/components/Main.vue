<template>
  <div>
    <h2><i class="fa fa-thermometer-three-quarters fa-fw" aria-hidden="true"></i> Air Condition</h2>
    <air-condition :token="token" :hub="hub" />
    <h2><i class="fa fa-wifi fa-fw" aria-hidden="true"></i> IR Commands</h2>
    <ir-commands :token="token" :hub="hub" />
    <h2><i class="fa fa-video-camera fa-fw" aria-hidden="true"></i> Cam View</h2>
    <cam :token="token" :hub="hub" />
  </div>
</template>

<script>
require('font-awesome/css/font-awesome.css')
import AirCondition from '@/components/Main.AirCondition'
import IrCommands from '@/components/Main.IrCommands'
import Cam from '@/components/Main.Cam'

export default {
  props: ['token', 'hub'],
  components: {
    AirCondition,
    IrCommands,
    Cam
  }
}
</script>

<style>
</style>
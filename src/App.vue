<template>
  <div id="app">
    <HeatMap/>
    <VueSlideBar/>
  </div>
</template>

<script>
import HeatMap from '@/components/Points.vue'
import VueSlideBar from '@/components/Slider.vue'

export default {
  name: 'App',
  components: {
    HeatMap,
    VueSlideBar
  }
}
</script>

<style>
html, body {
  margin: 0px;
  padding: 0px;
}
</style>

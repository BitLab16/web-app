<template>
  <div id="app">
    <HeatMap/>
  </div>
</template>

<script>
import HeatMap from '@/components/Points.vue'

export default {
  name: 'App',
  components: {
    HeatMap
  }
}
</script>

<style>
html, body {
  margin: 0px;
  padding: 0px;
}
</style>

<template>
  <div id="app">
    <HeatMap/>
  </div>
</template>

<script>
import HeatMap from '@/components/Page.vue'

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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

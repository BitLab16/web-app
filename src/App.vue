<template>
  <div id="app">
    <HeatMap/>
    <!--<Page apiUrl="https://www.google.com/maps/search/?api=1&query=45.397959,11.87721"/>-->
  </div>
</template>

<script>
//import HeatMap from './components/Page.vue'
import HeatMap from '@/components/HeatMap.vue'

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

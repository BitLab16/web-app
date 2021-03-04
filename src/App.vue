<template>
  <div id="app">
    <HeatMap/>
    <VueSlideBar/>
    
  </div>
</template>

<script>
import HeatMap from '@/components/Points.vue'
import VueSlideBar from '@/components/Slider.vue'
//import FullCalendar from '@/components/Calendar.vue'

export default {
  name: 'App',
  components: {
    HeatMap,
    VueSlideBar
    //FullCalendar
  }
}
</script>

<style>
html, body {
  margin: 0px;
  padding: 0px;
}
</style>

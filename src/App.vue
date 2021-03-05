<template>
  <div id="app">
    <Points/>
    <VueSlideBar/>
  </div>
</template>

<script>
import Points from '@/components/Points.vue'
import VueSlideBar from '@/components/Slider.vue'
//import FullCalendar from '@/components/Calendar.vue'

export default {
  name: 'App',
  components: {
    Points,
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

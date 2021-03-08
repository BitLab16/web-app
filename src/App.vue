<template>
  <div id="app">
    <Points/>
    <Calendar/>
    <VueSlideBar/>
  </div>
</template>

<script>
import Points from '@/components/Points.vue'
import VueSlideBar from '@/components/Slider.vue'
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'App',
  components: {
    Points,
    Calendar,
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

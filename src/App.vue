<template>
  <div id="app">
    <Points/>
    <!-- <DatePicker/> -->
    <date-picker v-model="date" lang="en" type="date" format="YYYY-MM-dd"></date-picker>
    <VueSlideBar/>
  </div>
</template>

<script>
import Points from '@/components/Points.vue'
import VueSlideBar from '@/components/Slider.vue'
//import DatePicker from '@/components/Calendar.vue'
import DatePicker from 'vue2-datepicker';

export default {
  name: 'App',
  components: {
    Points,
    DatePicker,
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

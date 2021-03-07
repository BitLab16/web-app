<template>
  <div id="app">
    <Points/>
    <DatePicker/>
    <datepicker :readonly="true" format="YYYY-MM-DD"></datepicker>
    <datepicker format="YYYY-M-D" value="2015-9-5"></datepicker>
    <datepicker :readonly="true" format="MMM/D/YYYY" width="300px"></datepicker>
    <datepicker :readonly="true" format="MMM/D/YYYY" width="300px" name="date"></datepicker>
    <VueSlideBar/>
  </div>
</template>

<script>
import Points from '@/components/Points.vue'
import VueSlideBar from '@/components/Slider.vue'
import DatePicker from '@/components/DatePicker.vue'


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

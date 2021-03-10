<template>
  <div id="app">
    <Map :data="data_oggi" />
    <DateTimePicker @pickedDate="updatedDatePicker" @pickedTime="updatedTimePicker"/>
  </div>
</template>

<script>
import Map from "./components/Map";
import DateTimePicker from "./components/DateTimePicker";

import './assets/sytle/app.css';

export default {
  name: 'App',
  components: {
    Map,
    DateTimePicker
  },
  data() {
    return {
      data_di_oggi: new Date(),
      data_oggi: [],
    }
  },
  mounted() {
  },
  methods: {
    updatedDatePicker(newDate) {
      console.log("App value received date: " + newDate);
          this.data_oggi.push( {"newDateEvent": newDate} );
    },
    updatedTimePicker(newTime) {
      console.log("App value received time: " + newTime);
          this.data_oggi.push( {"newTimeEvent": newTime} );
    },
  },
}
</script>
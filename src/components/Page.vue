<template>
  <heat-map
    :points="coordinates"
  />
</template>

<script>
import HeatMap from '@/components/HeatMap'
import axios from 'axios';

export default {
  name: 'view-page',
  components: { HeatMap },
  data() {
    return {
      coordinates: [],
        
      errors: []
      /*data:
      [
        {lat: 45.407707, lng: 11.873161, weight: 3},
        {lat: 45.397959, lng: 11.877189}, 
        {lat: 45.397959, lng: 11.877190}, 
        {lat: 45.397959, lng: 11.877200},
        {lat: 45.397959, lng: 11.87721},
        {lat: 45.39795, lng: 11.87721},
        {lat: 45.397954, lng: 11.87721},
        {lat: 45.39796, lng: 11.877},
        {lat: 45.397959, lng: 11.77721},
        {lat: 45.39855567, lng: 11.87721},
        {lat: 45.397959, lng: 11.845343},
        {lat: 45.397100, lng: 11.8775432},
        {lat: 45.397959, lng: 11.87744},
        {lat: 45.397959, lng: 11.8774324},
        {lat: 45.397869, lng: 11.8771443, weight: 3},
        {lat: 45.3756465, lng: 11.87721343, weight: 3},
        {lat: 45.397956564, lng: 11.87721645645, weight: 3},
        {lat: 45.39795878, lng: 11.877216456, weight: 3},
        {lat: 45.3979596565, lng: 11.8772135454, weight: 3},
        {lat: 45.397955435, lng: 11.877215435, weight: 3},
        {lat: 45.39795943, lng: 11.87721343, weight: 3},
        {lat: 45.40885765234, lng: 11.87721343, weight: 3},
        {lat: 45.3979594543, lng: 11.877213434239, weight: 3},
        {lat: 45.39795943, lng: 11.87721343444, weight: 3},
        {lat: 45.408857654639, lng: 11.87721343, weight: 3},
        {lat: 45.408857654639235, lng: 11.873406951812912},
        {lat: 45.408857654435, lng: 11.873406951812912},
        {lat: 45.408857654654545, lng: 11.873406951812912},
        {lat: 45.408857654639235, lng: 11.873406951844445},
        {lat: 45.408857654639235, lng: 11.8734069518666},
        {lat: 45.40885765463, lng: 11.873406}
      ]*/
    }
  },
  mounted() {
    axios.get("http://localhost:3000/coordinates")
      .then(response => {this.coordinates = response.data
      })
      .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
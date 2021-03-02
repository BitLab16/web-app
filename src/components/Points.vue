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
  components: { HeatMap},
  data() {
    return {
      coordinates: {
        time: null,
        lat: null,
        lng: null,
        flow: null,
      },
  
      punti: [
      /*lat: null,
        lng: null,
        flow: null,*/
      ]
    }
  },
  mounted() {
    axios.get("http://localhost:3000/coordinates")
      .then(response => {this.coordinates = response.data})

    //this.punti=["45.397959", "11.87721", "1"];
    /*if(this.coordinates.time===slider.value) {
      axios.post("", {
        body: this.postBody
      })
      .then(response => {})
    }*/
    
    /*this.punti.lat="45.397959"
    this.punti.lng="11.87721"
    this.punti.flow="1"*/
    alert(this.punti)
  }
} 

</script>
<template>
  <heat-map
    :points="punti"
  />
</template>

<script>
import HeatMap from '@/components/HeatMap'
//import axios from 'axios';

export default {
  name: 'view-page',
  components: { HeatMap},
  data() {
    return {
      coordinates: [],
  
      punti: []
    }
  },
  beforeMount() {
    this.getData();
    
  },
  methods: {
    async getData() {
      const res = await fetch("http://localhost:3000/coordinates");
      const data = await res.json();
      this.coordinates = data;
      //alert(this.coordinates)

      //console.log(this.coordinates)
      //if(this.coordinates[0]===)
      this.punti.push(this.coordinates[0])
      //console.log(this.punti[0])
    }
  },
  mounted() {
    console.log(this.punti[0])
    /*
    axios.get("http://localhost:3000/coordinates")
    .then(response => {this.coordinates = response.data});
    
    
    

    if (!this.coordinates.flow) {
      alert("hdeu")
      this.punti.push()
      //alert(this.punti)
    }
    else {
      alert("hdieushfiuehd")
    }*/
  },
}

</script>
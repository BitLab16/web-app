<template>
  <heat-map
    :points="punti"
  />
</template>

<script>
import HeatMap from '@/components/HeatMap'
export default {
  name: 'view-page',
  components: { HeatMap },
  props: {
    sliderValue: {
      type: String,
      default: "18:30"
    }
  },
  data() {
    return {
      coordinates: [],
      punti: []
    }
  },
  beforeMount() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await fetch("http://localhost:3000/coordinates");
      const data = await res.json();
      this.coordinates = data;

      for(let i=0; i<this.coordinates.length; i++) {
        if(this.coordinates[i].time==this.sliderValue) {
          this.punti.push(this.coordinates[i])
        }
      }
      console.log(this.sliderValue)
    },
  }
}
</script>
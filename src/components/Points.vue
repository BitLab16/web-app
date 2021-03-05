<template>
  <heat-map
    :points="punti"
  />
</template>

<script>
import HeatMap from '@/components/HeatMap'

var data;
var sliderValue = "18:25";

export default {
  name: 'view-page',
  components: { HeatMap },
  data() {
    return {
      punti: []
    }
  },
  beforeMount() {
    console.log("Points::beforeMount");
    this.getData();
    var f = () => {
      console.log("STORE TRY1" + this.$store.state.sliderValue);
      sliderValue = this.$store.state.sliderValue;
      this.getData();
      setTimeout(f, 2000);
    };
    setTimeout(f, 10000);
  },
  mounted() {
  },
  methods: {
    async load() {
      if (data != undefined) return;
      const res = await fetch("http://localhost:3000/coordinates");
      data = await res.json();
    },
    async getData() {
      
      await this.load();
      
      this.punti = [];
      for(let i=0; i<data.length; i++) {
        if(data[i].time==sliderValue) {
          this.punti.push(data[i]);
        }
      }     
      console.log("Points:getData slidervalue: " + sliderValue)
      console.log("Points:getData punti: " + JSON.stringify(this.punti))
    },
  }
}
</script>
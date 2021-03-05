<template>
  <heat-map
    :points="punti"
  />
</template>

<script>
import HeatMap from '@/components/HeatMap'

var data;

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
      punti: []
    }
  },
  beforeMount() {
    console.log("Points::beforeMount");
  },
  mounted() {
    /*var f = () => {
      console.log("STORE TRY1" + this.$store.state.sliderValue);
      this.sliderValue = this.$store.state.sliderValue;
      this.getData();
      setTimeout(f, 1000);
    };*/
    //f();
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
        if(data[i].time==this.sliderValue) {
          this.punti.push(data[i]);
        }
      }
      console.log("Points:getData slidervalue: " + this.sliderValue)
      console.log("Points:getData punti: " + JSON.stringify(this.punti))
    },
  }
}
</script>
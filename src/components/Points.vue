<template>
  <heat-map
    :points="punti"
  />
</template>

<script>
import HeatMap from '@/components/HeatMap'

var data;
var sliderValue = ""
var dateValue = ""

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
    //this.getData();
    var f = () => {
      setTimeout(f, 100);
      if (! this.$store.state.secondBoolean && !this.$store.state.dateSecondBool) return;
      this.$store.state.secondBoolean = false;
      this.$store.state.dateSecondBool = false
      console.log("STORE TRY1" + this.$store.state.sliderValue);
      sliderValue = this.$store.state.sliderValue
      dateValue = this.$store.state.dateValue
      this.getData();
    };
    f();
  },
  mounted() {
  },
  methods: {
    async load() {
      if (data != undefined) return;
      const res = await fetch("http://localhost:5000/coordinates");
      data = await res.json();
    },
    async getData() {
      
      await this.load();
      
      this.punti = [];
      for(let i=0; i<data.length; i++) {
        if(data[i].time==sliderValue && data[i].date==dateValue) {
          this.punti.push(data[i]);
        }
      }     
      //console.log("Points:getData slidervalue: " + sliderValue)
      //console.log("Points:getData punti: " + JSON.stringify(this.punti))
    },
  }
}
</script>

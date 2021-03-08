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
      this.$store.state.dateSecondBool = false;
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
      console.log("Points::load()" + this.$store.state.dateSecondBool);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', "*");
      headers.append('Access-Control-Allow-Credentials', 'true');
      const request = new Request(
        "http://localhost:5000/points/time/"+dateValue,
        {
          method: "GET",
          headers,
          mode: "cors",
          cache: "default"
        }
      );
      console.log(dateValue);
      const res = await fetch(request);
      data = await res.json();
    },
    async getData() {
      
      await this.load();
      
      this.punti = [];
      for(let i=0; i<data.length; i++) {
        var OGGI = new Date(data[i].detectionTime);
        var mm = ""+(OGGI.getMonth() + 1);
        if (mm < 10) mm = '0'+mm;
        var gg = ""+(OGGI.getDate() + 0);
        if (gg < 10) gg = '0'+gg;
        var hh = OGGI.getHours();
        if (hh < 10) hh = '0'+hh;
        data[i].date = OGGI.getFullYear() + '-' + mm + '-' + gg;
        data[i].time = hh+":00";
        data[i].lat = "45.397959";
        data[i].lng = "11.87721";
        data[i].flow = "10"; /// TODO
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

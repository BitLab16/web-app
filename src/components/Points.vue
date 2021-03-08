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
      /*console.log("Points::load()" + this.$store.state.dateSecondBool);
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

      data = await res.json();*/
      data = [
   {
      "id":9937,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T00:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9938,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T00:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9939,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T01:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9940,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T01:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9941,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T02:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9942,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T02:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9943,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T03:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9944,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T03:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9945,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T04:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9946,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T04:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9947,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T05:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9948,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T05:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9949,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T06:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9950,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T06:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9951,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T07:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9952,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T07:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9953,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T08:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9954,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T08:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9955,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T09:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9956,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T09:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9957,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T10:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9958,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T10:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9959,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T11:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9960,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T11:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9961,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T12:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9962,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T12:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9963,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T13:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9964,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T13:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9965,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T14:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9966,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T14:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9967,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T15:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9968,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T15:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9969,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T16:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9970,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T16:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9971,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T17:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9972,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T17:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9973,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T18:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9974,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T18:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9975,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T19:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9976,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T19:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9977,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T20:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9978,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T20:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9979,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T21:00:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   },
   {
      "id":9980,
      "point":{
         "id":1,
         "name":"Piazza dei signori",
         "code":100,
         "description":"Una delle piazze più \nimportati di padova",
         "location":{
            "type":"Point",
            "coordinates":[
               -110,
               30
            ]
         }
      },
      "detectionTime":"2019-07-27T21:30:00.000+00:00",
      "season":"AUTUMN",
      "timeIndex":0,
      "weatherIndex":0,
      "seasonIndex":0,
      "attractionIndex":0,
      "holiday":false
   }
]

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

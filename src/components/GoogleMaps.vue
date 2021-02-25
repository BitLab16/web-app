<template>
  <div>
   <GmapMap
  :center="getCenter()"
  :zoom="14"
  :bounds="bounds"
  :max-bounds="maxBounds"
  map-type-id="roadmap"
  style="width: 100vw; height: 100vh; left:0; top0" 
  :options="getOptions()"
  >

    <!--<GmapMarker
      :key="index"
      v-for="(m,index) in getMarkers()" 
      :position="m.position"
      :clickable="true"
      :draggable="false"
      :title="m.title"
      :icon="m.icon"
      @click="clicked()"
      />-->
      <vue-google-heatmap :points="points"
                          style="width: 100vw; height: 100vh; left:0; top0" 
                                                
    />
    </GmapMap>
    
  </div>
</template>



<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY&libraries=visualization&callback=initMap">
</script>

<script>
//import MarkerClusterer from "marker-clusterer-plus";
//let map, heatmap;

export default {
  name: 'vue-google-heatmap',
  computed: {
    heatmapPoints() {
      return this.points.map(
        point => new google.maps.LatLng(point.lat, point.lng)
      );
    }
  },
  created() {
    return loaded.then(() => {
      const mapElement = this.$refs.map;
      this.$mapObject = new google.maps.Map(mapElement, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        mapTypeId: this.mapType
      });
      this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapPoints,
        map: this.$mapObject
      });
      this.$heatmap.setMap(this.$mapObject);
    });
  },
  mounted () {
    return this.$gmapApiPromiseLazy().then(() => {
      // eslint-disable-next-line
        this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        mapTypeId: this.mapType
      })
      // eslint-disable-next-line
        this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapPoints,
        map: this.$mapObject,
        opacity: this.opacity,
        maxIntensity: this.maxIntensity
      })

      this.$heatmap.setMap(this.$mapObject)
    })
  },
  
  methods: {
    /*initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 14,
          center: { lat:45.416667, lng:11.883333},
          mapTypeId: "roadmap",
        });
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map,
        });
      },

      toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
      },

      getPoints() {
        return [
          new google.maps.LatLng(45.407707,11.873161),
          new google.maps.LatLng(45.397959,11.877189), 
          new google.maps.LatLng(45.397959,11.877190), 
          new google.maps.LatLng(45.397959,11.877200), 
        ];
      }, */
      data() {
  return {
    points: [
      {lat: 37.786117, lng:-122.440119},
      {lat: 37.786564, lng:-122.440209},
      {lat: 37.786905, lng:-122.440270},
      {lat: 37.786956, lng:-122.440279},
      {lat: 37.800224, lng:-122.433520},
      {lat: 37.800155, lng:-122.434101},
      {lat: 37.800160, lng:-122.434430},
      {lat: 37.800378, lng:-122.434527},
      {lat: 37.800738, lng:-122.434598},
      {lat: 37.800938, lng:-122.434650},
      {lat: 37.801024, lng:-122.434889},
      {lat: 37.800955, lng:-122.435392},
      {lat: 37.800886, lng:-122.435959}
    ]
  }
},
    getOptions() {
      return {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      };
    },
    clicked() {
      //da definire
    },
    getCenter() {
      return {
        lat:45.416667, 
        lng:11.883333
      };
    },
    getMarkers() {
      var markers = [];
      const latLong = [
        {lat: 45.407707, lng: 11.873161},
        {lat: 45.397959, lng: 11.877189}
      ];
      for(let i=0; i<latLong.length; i++) {
        markers.push({
          position: latLong[i],
          title: 'test title',
          //icon: this.getSiteIcon(1) in base all'assembramento si può cambiare icona
        });
      } 
      return markers;
    },
    
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

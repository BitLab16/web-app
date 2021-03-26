<template>
  <div id="map" 
    ref="heatmap">
  </div>
</template>

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY&libraries=visualization&callback=initMap">
</script>

<script>

import '../assets/sytle/components/Map.css';

const bounds= {
    north: 45.444315,
    south: 45.362051,
    west: 11.825627,
    east: 11.948540,
};
const saveMarkers = [];
const saveInfoWindows = [];

export default {
  name: 'Map',
  props: {
    /*ref alla struttura dati totale di App!*/
    data_selezionata: "",
    orario_selezionato: "",
    data: { type: Object, required: true },

    //points: this.data[this.data_selezionata][this.orario_selezionato],

    /*della mappa*/
    map_bounds: {
      north: 45.444315,
      south: 45.362051,
      west: 11.825627,
      east: 11.948540
    },
    lat: { type: Number, default: 45.407588 },
    lng: { type: Number, default: 11.877029 },
    initialZoom: { type: Number, default: 14 },
    mapTypeId: { type: String, default: 'roadmap' },

    /*del punto*/
    opacity: { type: Number, default: 1 },
    radius: { type: Number, default:  15 },
    maxIntensity: { type: Number, default: 60 },

  },
  mounted() {
    this.$gmapApiPromiseLazy().then(()=> {
      this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        restriction: this.map_bounds,
        mapTypeId: this.mapTypeId,
      })
      
    });
  },
  methods: {
    pointsGenerator() {
      var points;
      try {
        points = this.data[this.data_selezionata][this.orario_selezionato];
      } catch (error) {
          console.error("ERROR Map::pointsGenerator: dati mai creati in App::data");
          return {}
      }
      return points.map(points => ({
          location: new google.maps.LatLng(points.lat, points.lng),
          weight: points.flow}))  
    },
    update_map() {
      this.$gmapApiPromiseLazy().then(() => {
        if(this.$heatmap) {
          this.$heatmap.setMap(null);
        }
        this.$heatmap = new google.maps.visualization.HeatmapLayer({ 
          data: this.pointsGenerator(),
          opacity: this.opacity,
          radius: this.radius,
          maxIntensity: this.maxIntensity,
        })
        this.$heatmap.setMap(this.$mapObject);
      })
      
      this.$gmapApiPromiseLazy().then(() => {
        var markers = this.data[this.data_selezionata][this.orario_selezionato];
        if(saveMarkers) {
          for(var i=0; i<saveMarkers.length; i++) {
            saveMarkers[i].setMap(null);
          }
        }
        for(var i=0; i<markers.length; i++) {
          this.$marker = new google.maps.Marker({ 
            position: new google.maps.LatLng(markers[i].lat, markers[i].lng)
          })
          this.$infoWindows = new google.maps.InfoWindow({ 
            content: "gygi",
          })
          this.$marker.setMap(this.$mapObject);
          saveMarkers.push(this.$marker);
          saveInfoWindows.push(this.$infoWindows);
          saveMarkers[i].addListener("click", () => {
            console.log(saveMarkers[i])
            saveInfoWindows[i].open(this.$mapObject, saveMarkers[i]);
          });
        } 
      });

      /*this.$gmapApiPromiseLazy().then(() => {
        var infoWindows = this.data[this.data_selezionata][this.orario_selezionato];
        for(var i=0; i<infoWindows.length; i++) {
          this.$infoWindows = new google.maps.InfoWindow({ 
            content: "gygi",
          })
          this.$infoWindows.setMap(this.$mapObject);
          saveInfoWindows.push(this.$infoWindows);
        }
        for(var i=0; i<saveMarkers.length; i++) {
          saveMarkers[i].addListener("click", () => {
            saveInfoWindows[i].open(this.$mapObject, saveMarkers[i]);
          });
        }
      });*/
    },
  }
}
</script>
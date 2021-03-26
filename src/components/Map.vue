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

const markers = [];
const infoWindows = [];

export default {
  name: 'Map',
  props: {
    /*ref alla struttura dati totale di App!*/
    data_selezionata: "",
    orario_selezionato: "",
    data: { type: Object, required: true },

    //points: {type: Object, default: this.data[this.data_selezionata][this.orario_selezionato]},

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
    addInfoWindow(marker, infowindow){
      google.maps.event.addListener( marker, "click", function() {
          infowindow.open(this.$mapObject, marker);   
      });
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
        var MARKERS = this.data[this.data_selezionata][this.orario_selezionato];
        const icon = {
          url: "/src/assets/circle.png",
          scaledSize: new google.maps.Size(50,50),
          anchor: new google.maps.Point(0, 0)
        };
        if(markers) {
          for(var i=0; i<markers.length; i++) {
            markers[i].setMap(null);
          }
        }
        for(var i=0; i<MARKERS.length; i++) {
          markers[i]= new google.maps.Marker({ 
            position: new google.maps.LatLng(MARKERS[i].lat-0.0015, MARKERS[i].lng),
            map: this.$mapObject,
            //icon: icon
          })
          infoWindows[i] = new google.maps.InfoWindow({
            content: "giiuh"
          });
          this.addInfoWindow(markers[i], infoWindows[i]);
        } 
      });
    },
  }
}
</script>
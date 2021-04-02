<template>
  <div id="map" 
    ref="heatmap">
    <Grafico ref="Grafico" :markers="markers" />
  </div>
</template>

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY&libraries=visualization&callback=initMap">
</script>

<script>

import '../assets/sytle/components/Map.css';
import Grafico from './Grafico';

export default {
  name: 'Map',
  components: {Grafico},
  data() {
    return {
      infoContent: [],
      markers: []
    }
  },
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
      // LA MAPPA
      this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        restriction: this.map_bounds,
        dmapTypeId: this.mapTypeId,
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
          opacity: this.opacitgmapApiPromiseLazyy,
          radius: this.radius,
          maxIntensity: this.maxIntensity,
        })
        this.$heatmap.setMap(this.$mapObject);
      })

      // I MARKERS
      if (this.markers.length < 1) {
        this.$gmapApiPromiseLazy().then(()=> {
          var punti_di_un_giorno = this.data[this.data_selezionata][this.orario_selezionato];
            /*const icon = {
              url: "/src/assets/circle.png",
              scaledSize: new google.maps.Size(50,50),
              anchor: new google.maps.Point(0, 0)
            };*/
            if(this.markers) {
              for(var i=0; i<this.markers.length; i++) {
                this.markers[i].setMap(null);
              }
            }
            for(var i=0; i<punti_di_un_giorno.length; i++) {
              this.markers[i] = new google.maps.Marker({ 
                position: new google.maps.LatLng(punti_di_un_giorno[i].lat/*-0.0015*/, punti_di_un_giorno[i].lng),
                map: this.$mapObject,
                //icon: icon
              })
              this.markers[i].flow = punti_di_un_giorno[i].flow;
            }
        })
      }
    },
  }
}
</script>
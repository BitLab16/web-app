<template>
  <GmapMap id="map" 
    ref="heatmap">
    <GmapMarker v-for="(item, key) in markers" :key="key" :position="getPosition(item)" />
  </GmapMap>
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
export default {
  name: 'Map',
  data () {
    return {
      markers: {
        0: {
          full_name: 'Erich  Kunze',
          lat: '45.397959',
          lng: '11.87721',
        },
        1: {
          full_name: 'Delmer Olson',
          lat: '45.397959',
          lng: '11.87721',
        }
      }
    }
  },
  props: {
    /*ref alla struttura dati totale di App!*/
    data_selezionata: "",
    orario_selezionato: "",

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
    data: { type: Object, required: true },

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
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
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
      // TODO:
      // togliere vecchio layer della heatmap
      this.$gmapApiPromiseLazy().then(() => {
        this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.pointsGenerator(),
        map: this.$mapObject,
        opacity: this.opacity,
        radius: this.radius,
        maxIntensity: this.maxIntensity,
        })
        this.$heatmap.setMap(this.$mapObject);
      });
    }
  }
}
</script>
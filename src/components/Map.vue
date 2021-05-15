<template>
  <div id="map" 
    ref="heatmap">
    <Infowindow ref="Infowindow"
      :markers="markers"
      :data="data"
      :data_selezionata="data_selezionata"
      :orario_selezionato="orario_selezionato"
      :mapObject="mapObject"
    />
  </div>
</template>

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY&libraries=visualization&callback=initMap">
</script>

<script>

import '../assets/sytle/components/Map.css';
import Infowindow from './Infowindow';

const bounds= {
  north: 45.444315,
  south: 45.362051,
  west: 11.807114,
  east: 11.948540
};
export default {
  name: 'Map',
  components: {Infowindow},
  data() {
    return {
      infoContent: [],
      markers: [],
      mapObject : undefined
    }
  },
  props: {
    /*ref alla struttura dati totale di App!*/
    data_selezionata: "",
    orario_selezionato: "",
    data: { type: Object, required: true },
    
    //points: {type: Object, default: this.data[this.data_selezionata][this.orario_selezionato]},

    /*della mappa*/
    lat: { type: Number, default: 45.405766 },
    lng: { type: Number, default: 11.878096 },
    initialZoom: { type: Number, default: 14 },
    mapTypeId: { type: String, default: 'roadmap' },

    /*del punto*/
    opacity: { type: Number, default: 0 },
    radius: { type: Number, default:  32 },
    maxIntensity: { type: Number, default: 55 },
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(()=> {
      // LA MAPPA
      this.mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        dmapTypeId: this.mapTypeId,
        restriction: {
          latLngBounds: bounds,
        },
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
      for(let i = 0;i < points.length; i++) {
        let max = 0;
        Object.keys(this.data[this.data_selezionata]).forEach((orario) => {
          if(this.data[this.data_selezionata][orario][i].flow > max) {
            max = this.data[this.data_selezionata][orario][i].flow;
          }
        });
        let multiplier; // TODO INSERIRE LA FUNZIONE (in funzione del massimo giornaliero e forse di qualcosaltro determinare il multt)
        if (max < 20)
          multiplier = 2.5;
        else if (max < 40)
          multiplier = 1.5;
        else if (max < 60)
          multiplier = 1.2;
        else
          multiplier = 1;
        points.flow = points.flow * multiplier;
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
        this.$heatmap.setMap(this.mapObject);
      })

      // I MARKERS
      if (this.markers.length < 1) {
        this.$gmapApiPromiseLazy().then(()=> {
          var punti_di_un_giorno = this.data[this.data_selezionata][this.orario_selezionato];
          var markerLogo = { 
            url: 'https://i.postimg.cc/7bvZVmJ0/Microsoft-Teams-image.png',
            scaledSize: new google.maps.Size(40, 40),
          }
            if(this.markers) {
              for(var i=0; i<this.markers.length; i++) {
                this.markers[i].setMap(null);
              }
            }
            for(var i=0; i<punti_di_un_giorno.length; i++) {
              this.markers[i] = new google.maps.Marker({ 
                position: new google.maps.LatLng(punti_di_un_giorno[i].lat/*-0.0015*/, punti_di_un_giorno[i].lng),
                map: this.mapObject,
                icon: markerLogo
              })
            }
        })
      }
    },
  }
}
</script>
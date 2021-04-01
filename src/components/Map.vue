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
  data() {
    return {
      infoContent: []
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
      this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        restriction: this.map_bounds,
        mapTypeId: this.mapTypeId,
      })
    });

    this.fetchContent();
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
    async fetchContent (code) {
      const data = await (
        await fetch("http://localhost:3000/points"/*code*/)
          .catch( error => {
            //TODO: sistemare il caso in cui non ricevo dati!
            alert("errore nel fetch");
            console.error("Errore nel fetch " + error);
          })
      ).json();
      this.infoContent = data;
    },
    daysFlow(data) {
      var mediaFlow = new Array(7).fill(0);
      var counter = new Array(7).fill(0);
      for(let i=0; i<data.gatherings.length; i++) {
        var date = new Date(data.gatherings[i].detectionTime);
        switch (date.getDay()) {
          case 0: 
            counter[0]++
            mediaFlow[0]+=data.gatherings[i].flow
            break;
          case 1:
            counter[1]++
            mediaFlow[1]+=data.gatherings[i].flow
            break;
          case 2:
            counter[2]++
            mediaFlow[2]+=data.gatherings[i].flow
            break;
          case 3:
            counter[3]++
            mediaFlow[3]+=data.gatherings[i].flow
            break;
          case 4:
            counter[4]++
            mediaFlow[4]+=data.gatherings[i].flow
            break;
          case 5:
            counter[5]++
            mediaFlow[5]+=data.gatherings[i].flow
            break;
          case 6:
            counter[6]++
            mediaFlow[6]+=data.gatherings[i].flow
            break
        }
      } 
      for(var i=0; i<7; i++) {
        mediaFlow[i]=mediaFlow[i]/counter[i];
      }
      return mediaFlow;
    },
    createContent() {
      var media = this.daysFlow(this.infoContent[0]);
      var string =  '<h1>' + this.infoContent[0].name + '</h1>' +
        '<h2> Description: </h2>' +
        '<p>' + this.infoContent[0].description + '</p>' +
        '<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css">'+
        '<table id="grafico" class="charts-css column show-heading show-labels show-primary-axis show-data-on-hover">' +
          '<caption> Media del flusso di persone </caption>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row"> LUN </th>' +
              '<td style="--size: calc(' + media[1] + '/ 100 )">' + media[1] + '</td>' +
            '</tr>'+
            '<tr>'+
              '<th scope="row"> MAR </th>'+
              '<td style="--size: calc(' + media[2] + '/ 100 )">' + media[2] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> MER </th>'+
              '<td style="--size: calc(' + media[3] + '/ 100 )">' + media[3] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> GIO </th>'+
              '<td style="--size: calc(' + media[4] + '/100 )">' + media[4] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> VEN </th>'+
              '<td style="--size: calc( ' + media[5] + '/ 100 )"> ' + media[5] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> SAB </th>'+
              '<td style="--size: calc( ' + media[6] + '/ 100 )"> ' + media[6] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> DOM </th>'+
              '<td style="--size: calc(' + media[0] + '/ 100 )"> ' + media[0] + ' </td>'+
            '</tr>'+
          '</tbody>'+
        '</table>' 
      return string
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
        /*const icon = {
          url: "/src/assets/circle.png",
          scaledSize: new google.maps.Size(50,50),
          anchor: new google.maps.Point(0, 0)
        };*/
        if(markers) {
          for(var i=0; i<markers.length; i++) {
            markers[i].setMap(null);
          }
        }
        for(var i=0; i<MARKERS.length; i++) {
          markers[i]= new google.maps.Marker({ 
            position: new google.maps.LatLng(MARKERS[i].lat/*-0.0015*/, MARKERS[i].lng),
            map: this.$mapObject,
            //icon: icon
          })
          //this.fetchContent(MARKERS[i].code);
          infoWindows[i] = new google.maps.InfoWindow({
            content: this.createContent()
          });
          this.addInfoWindow(markers[i], infoWindows[i]);
        } 
      });
    },
  }
}
</script>
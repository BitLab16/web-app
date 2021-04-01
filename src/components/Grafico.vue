<template>
    <div></div>
</template>

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY&libraries=visualization&callback=initMap">
</script>

<script>
export default {
  name: 'Grafico',
  props: {
      markers: {type: Array, required: true}
  },
  data() {
    return {
        infoContent: [],
        infoWindow: Object
    }
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      this.infoWindow = new google.maps.InfoWindow({ content: "" });
    });
    this.$gmapApiPromiseLazy().then(() => {
      var f = () => {
        if (this.markers.length === 0 || this.infoWindow === undefined) {
          console.log(1)
          setTimeout(f, 5);
      }
        for (let i = 0; i < this.markers.length; i++) {
          google.maps.event.addListener( this.markers[i], "click", function() {
            this.infoWindow.open(this.$mapObject, marker);
          });
        }
      };
      f();
    });
  },
  methods: {
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
        mediaFlow[i]=Math.round(mediaFlow[i]);
        if(isNaN(mediaFlow[i])) {
          mediaFlow[i]="";
        }
      }
      return mediaFlow;
    },
    createContent(flow_attuale) {
      var media = this.daysFlow(this.infoContent[0]);
      var string =  '<h1>' + this.infoContent[0].name + '</h1>' +
        '<h2> Descrizione: </h2>' +
        '<span>' + this.infoContent[0].description + '</span>' + '</br>' + '</br>' +
        '<h2> Flusso attuale: </h2>' +
        '<span>' + flow_attuale + '</span>' +
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
    }
  }
}

</script>
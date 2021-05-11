<template>
    <div></div>
</template>

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY&libraries=visualization&callback=initMap">
</script>

<script>
import '../assets/sytle/components/Infowindow.css';

export default {
  name: 'Infowindow',
  props: {
    markers: {type: Array, required: true},

    /*ref alla struttura dati totale di App!*/
    data_selezionata: "",
    orario_selezionato: "",
    data: { type: Object, required: true },
  },
  data() {
    return {
      infoContent: [],
      infoContent1: [],
      infoContent2: [],
      infoWindow: Object,
    }
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(() => {
      this.infoWindow = new google.maps.InfoWindow({ content: "" });
      var f = () => {
        if (this.markers.length === 0 || this.infoWindow === undefined) {
          setTimeout(f, 50);
          return;
        }
        for (let i = 0; i < this.markers.length; i++) {
          google.maps.event.addListener( this.markers[i], "mouseover", () => {
            this.infoWindow.open(this.$mapObject, this.markers[i]);
            this.infoWindow.setContent("");
            this.fetchContent(this.data[this.data_selezionata][this.orario_selezionato][i].code)
            .then( () => {
            this.fetchContent1(this.data[this.data_selezionata][this.orario_selezionato][i].code)
            .then( () => {
              this.fetchContent2(this.data[this.data_selezionata][this.orario_selezionato][i].code, this.data_selezionata)
              .then( () => {
                this.infoWindow.setContent(this.createContent(i));
              });
            });
          })
          });
          /*google.maps.event.addListener( this.markers[i], "mouseout", () => {
            this.infoWindow.close(this.$mapObject, this.markers[i]);
          })*/
        }
      };
      f();
    });
  },
  methods: {
    async fetchContent(code) {
      const data = await (
        await fetch("http://localhost:5000/point/"+code)
          .catch( error => {
            //TODO: sistemare il caso in cui non ricevo dati!
            alert("errore nel fetch1");
            console.error("Errore nel fetch " + error);
          })
      ).json();
      this.infoContent = data;
    },
    async fetchContent1(code) {
      const data = await (
        await fetch("http://localhost:5000/point/"+code+"/avg")
          .catch( error => {
            //TODO: sistemare il caso in cui non ricevo dati!
            alert("errore nel fetch1");
            console.error("Errore nel fetch " + error);
          })
      ).json();
      this.infoContent1 = data;
    },
    async fetchContent2(code, data_selezionata) {
      const data = await (
        await fetch("http://localhost:5000/point/"+code+"/full-day")
          .catch( error => {
            //TODO: sistemare il caso in cui non ricevo dati!
            alert("errore nel fetch2");
            console.error("Errore nel fetch " + error);
          })
      ).json();
      var dati_corretti_24 = [];
      for (let i = 0; i< 24; i++) {
        var hh = i+"";
        if (i<10)
          hh = '0'+hh;
        let res;
        for (let gathering_index = 0; gathering_index < data.gatherings.length; gathering_index++) {
          if (data.gatherings[gathering_index].detectionTime.includes(hh+":00:00.000+00:00")) {
            res = data.gatherings[gathering_index].flow;
            break;
          }
        }
        dati_corretti_24[i] = res;
      }
      this.infoContent2 = dati_corretti_24;
    },
    createContent(i) {
      var dateSelected=new Date(this.data_selezionata)
      var giornoSettimana=dateSelected.getDay()
      switch(giornoSettimana) {
        case 0: giornoSettimana = "SUNDAY";
        break;
        case 1: giornoSettimana = "MONDAY";
        break;
        case 2: giornoSettimana = "TUESDAY";
        break;
        case 3: giornoSettimana = "WEDNESDAY";
        break;
        case 4: giornoSettimana = "THURSDAY";
        break;
        case 5: giornoSettimana = "FRIDAY";
        break;
        case 6: giornoSettimana = "SATURDAY";
        break;
      } 
      
      var string1 = '<h1>' + this.infoContent.name + '</h1>' +
        '<h2> Descrizione: </h2>' +
        '<span>' + this.infoContent.description + '</span>' + '</br>' + '</br>' +
        '<h2> Flusso attuale: </h2>' +
        '<span>' + this.data[this.data_selezionata][this.orario_selezionato][i].flow + '</span>' +
        '</br>' + '</br>'

      

      var grafico1 = '<div>' +
        '<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css">'+
        '<table id="grafico1" class="charts-css column show-heading show-labels show-primary-axis ">' +
          '<caption> MEDIA FLUSSO MENSILE DI PERSONE GIORNO DELLA SETTIMANA </caption>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row"> 0 </th>' +
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][0] + '/ 60 )">' + this.infoContent1['flow-average'][giornoSettimana][0] + '</td>' +
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 1 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][1] + '/ 60 )">' + this.infoContent1['flow-average'][giornoSettimana][1] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 2 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][2] + '/ 60 )">' + this.infoContent1['flow-average'][giornoSettimana][2] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 3 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][3] + '/60 )">' + this.infoContent1['flow-average'][giornoSettimana][3] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 4 </th>'+
              '<td style="--size: calc( ' + this.infoContent1['flow-average'][giornoSettimana][4] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][4] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 5 </th>'+
              '<td style="--size: calc( ' + this.infoContent1['flow-average'][giornoSettimana][5] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][5] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 6 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][6] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][6] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 7 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][7] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][7] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 8 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][8] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][8] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 9 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][9] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][9] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 10 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][10] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][10] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 11 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][11] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][11] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 12 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][12] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][12] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 13 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][13] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][13] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 14 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][14] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][14] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 15 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][15] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][15] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 16 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][16] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][16] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 17 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][17] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][17] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 18 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][18] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][18] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 19 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][19] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][19] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 20 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][20] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][20] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 21 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][21] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][21] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 22 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][22] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][22] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 23 </th>'+
              '<td style="--size: calc(' + this.infoContent1['flow-average'][giornoSettimana][23] + '/ 60 )"> ' + this.infoContent1['flow-average'][giornoSettimana][23] + ' </td>'+
            '</tr>'+
          '</tbody>'+
        '</table>' +
        '</br>'

      var grafico2 = 
        '<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css">'+
        '<table id="grafico2" class="charts-css area show-heading show-labels show-primary-axis">' +
          '<caption> FLUSSO DI PERSONE GIORNO CORRENTE </caption>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row"> 0 </th>' +
              '<td style="--start: calc(' + this.infoContent2[0] + '/60); --size: calc(' + this.infoContent2[1] + '/60);"></td>' +
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 1 </th>'+
              '<td style="--start: calc(' + this.infoContent2[1] + '/60); --size: calc(' + this.infoContent2[2] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 2 </th>'+
              '<td style="--start: calc(' + this.infoContent2[2] + '/60); --size: calc(' + this.infoContent2[3] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 3 </th>'+
              '<td style="--start: calc(' + this.infoContent2[3] + '/60); --size: calc(' + this.infoContent2[4] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 4 </th>'+
              '<td style="--start: calc(' + this.infoContent2[4] + '/60); --size: calc(' + this.infoContent2[5] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 5 </th>'+
              '<td style="--start: calc(' + this.infoContent2[5] + '/60); --size: calc(' + this.infoContent2[6] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 6 </th>'+
              '<td style="--start: calc(' + this.infoContent2[6] + '/60); --size: calc(' + this.infoContent2[7] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 7 </th>'+
              '<td style="--start: calc(' + this.infoContent2[7] + '/60); --size: calc(' + this.infoContent2[8] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 8 </th>'+
              '<td style="--start: calc(' + this.infoContent2[8] + '/60); --size: calc(' + this.infoContent2[9] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 9 </th>'+
              '<td style="--start: calc(' + this.infoContent2[9] + '/60); --size: calc(' + this.infoContent2[10] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 10 </th>'+
              '<td style="--start: calc(' + this.infoContent2[10] + '/60); --size: calc(' + this.infoContent2[11] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 11 </th>'+
              '<td style="--start: calc(' + this.infoContent2[11] + '/60); --size: calc(' + this.infoContent2[12] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 12 </th>'+
              '<td style="--start: calc(' + this.infoContent2[12] + '/60); --size: calc(' + this.infoContent2[13] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 13 </th>'+
              '<td style="--start: calc(' + this.infoContent2[13] + '/60); --size: calc(' + this.infoContent2[14] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 14 </th>'+
              '<td style="--start: calc(' + this.infoContent2[14] + '/60); --size: calc(' + this.infoContent2[15] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 15 </th>'+
              '<td style="--start: calc(' + this.infoContent2[15] + '/60); --size: calc(' + this.infoContent2[16] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 16 </th>'+
              '<td style="--start: calc(' + this.infoContent2[16] + '/60); --size: calc(' + this.infoContent2[17] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 17 </th>'+
              '<td style="--start: calc(' + this.infoContent2[17] + '/60); --size: calc(' + this.infoContent2[18] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 18 </th>'+
              '<td style="--start: calc(' + this.infoContent2[18] + '/60); --size: calc(' + this.infoContent2[19] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 19 </th>'+
              '<td style="--start: calc(' + this.infoContent2[19] + '/60); --size: calc(' + this.infoContent2[20] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 20 </th>'+
              '<td style="--start: calc(' + this.infoContent2[20] + '/60); --size: calc(' + this.infoContent2[21] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 21 </th>'+
              '<td style="--start: calc(' + this.infoContent2[21] + '/60); --size: calc(' + this.infoContent2[22] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 22 </th>'+
              '<td style="--start: calc(' + this.infoContent2[22] + '/60); --size: calc(' + this.infoContent2[23] + '/60);"></td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 23 </th>'+
              '<td style="--start: calc(' + this.infoContent2[23] + '/60); --size: calc(' + this.infoContent2[23] + '/60);"></td>'+
            '</tr>'+
          '</tbody>'+
        '</table>' +
        '</div>'
      
      var string = string1 + grafico1 + grafico2;
      return string
    },
    
  }
}

</script>
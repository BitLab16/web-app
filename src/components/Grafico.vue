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
    markers: {type: Array, required: true},

    /*ref alla struttura dati totale di App!*/
    data_selezionata: "",
    orario_selezionato: "",
    data: { type: Object, required: true },
  },
  data() {
    return {
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
          google.maps.event.addListener( this.markers[i], "click", () => {
            this.infoWindow.open(this.$mapObject, this.markers[i]);
            this.infoWindow.setContent("");
            this.fetchContent1(this.data[this.data_selezionata][this.orario_selezionato][i].code)
              .then( () => {
                this.fetchContent2(this.data[this.data_selezionata][this.orario_selezionato][i].code, this.data_selezionata)
              .then( () => {
                this.infoWindow.setContent(this.createContent(i));
            });
            });
            
          });
        }
      };
      f();
    });
  },
  methods: {
    async fetchContent1(code) {
      const data = await (
        await fetch("http://localhost:3000/points/"/*+code+"/avg"*/)
          .catch( error => {
            //TODO: sistemare il caso in cui non ricevo dati!
            alert("errore nel fetch");
            console.error("Errore nel fetch " + error);
          })
      ).json();
      this.infoContent1 = data;
    },
    async fetchContent2(code, data_selezionata) {
      const data = await (
        await fetch("http://localhost:3000/points/"/*+code+"/"+data_selezionata*/)
          .catch( error => {
            //TODO: sistemare il caso in cui non ricevo dati!
            alert("errore nel fetch");
            console.error("Errore nel fetch " + error);
          })
      ).json();
      this.infoContent2 = data;
    },
    createContent(i) {
      var dateSelected=new Date(this.data_selezionata)
      var giornoSettimana=dateSelected.getDay()
      if(giornoSettimana==0) giornoSettimana = "SUNDAY"  
      /*selectElement('selezione', dateSelected.getDay())
      function selectElement(selezione, valueToSelect) {    
          let element = document.getElementById(selezione);
          element.value = valueToSelect;
      }*/
     
      var string1 = '<h1>' + this.infoContent1[0].name + '</h1>' +
        '<h2> Descrizione: </h2>' +
        '<span>' + this.infoContent1[0].description + '</span>' + '</br>' + '</br>' +
        '<h2> Flusso attuale: </h2>' +
        '<span>' + this.data[this.data_selezionata][this.orario_selezionato][i].flow + '</span>'
        //'<button onclick="cambioGrafico()">Cambia</button>'
        /*  '<select id="selezione">'+
            '<option value="1">Lunedì</option>'+
            '<option value="2">Martedì</option>'+
            '<option value="3">Mercoledì</option>'+
            '<option value="4">Giovedì</option>'+
            '<option value="5">Venerdì</option>' +
            '<option value="6">Sabato</option>' +
            '<option value="0">Domenica</option>' +
          '</select>' +
        '</div>' + */

      var grafico1 = '<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css">'+
        '<table id="grafico1" class="charts-css column show-heading show-labels show-primary-axis show-data-on-hover">' +
          '<caption> Media del flusso di persone </caption>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row"> 0 </th>' +
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][0] + '/ 60 )">' + this.infoContent1[0].flowaverage[giornoSettimana][0] + '</td>' +
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 1 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][1] + '/ 60 )">' + this.infoContent1[0].flowaverage[giornoSettimana][1] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 2 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][2] + '/ 60 )">' + this.infoContent1[0].flowaverage[giornoSettimana][2] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 3 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][3] + '/60 )">' + this.infoContent1[0].flowaverage[giornoSettimana][3] + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 4 </th>'+
              '<td style="--size: calc( ' + this.infoContent1[0].flowaverage[giornoSettimana][4] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][4] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 5 </th>'+
              '<td style="--size: calc( ' + this.infoContent1[0].flowaverage[giornoSettimana][5] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][5] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 6 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][6] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][6] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 7 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][7] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][7] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 8 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][8] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][8] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 9 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][9] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][9] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 10 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][10] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][10] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 11 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][11] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][11] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 12 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][12] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][12] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 13 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][13] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][13] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 14 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][14] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][14] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 15 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][15] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][15] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 16 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][16] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][16] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 17 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][17] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][17] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 18 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][18] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][18] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 19 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][19] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][19] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 20 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][20] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][20] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 21 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][21] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][21] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 22 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][22] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][22] + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 23 </th>'+
              '<td style="--size: calc(' + this.infoContent1[0].flowaverage[giornoSettimana][23] + '/ 60 )"> ' + this.infoContent1[0].flowaverage[giornoSettimana][23] + ' </td>'+
            '</tr>'+
          '</tbody>'+
        '</table>'

      var grafico2 = '<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css">'+
        '<table id="grafico2" class="charts-css area show-heading show-labels show-primary-axis show-data-on-hover">' +
          '<caption> Media del flusso di persone </caption>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row"> 0 </th>' +
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[0].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[1].flow + '/60);">' + this.infoContent2[0].gatherings[0].flow + '</td>' +
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 1 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[1].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[2].flow + '/60);">' + this.infoContent2[0].gatherings[1].flow + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 2 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[2].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[3].flow + '/60);">' + this.infoContent2[0].gatherings[2].flow + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 3 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[3].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[4].flow + '/60);">' + this.infoContent2[0].gatherings[3].flow + '</td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 4 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[4].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[5].flow + '/60);">' + this.infoContent2[0].gatherings[4].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 5 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[5].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[6].flow + '/60);">' + this.infoContent2[0].gatherings[5].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 6 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[6].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[7].flow + '/60);">' + this.infoContent2[0].gatherings[6].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 7 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[7].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[8].flow + '/60);">' + this.infoContent2[0].gatherings[7].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 8 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[8].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[9].flow + '/60);">' + this.infoContent2[0].gatherings[8].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 9 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[9].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[10].flow + '/60);">' + this.infoContent2[0].gatherings[9].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 10 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[10].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[11].flow + '/60);">' + this.infoContent2[0].gatherings[10].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 11 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[11].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[12].flow + '/60);">' + this.infoContent2[0].gatherings[11].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 12 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[12].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[13].flow + '/60);">' + this.infoContent2[0].gatherings[12].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 13 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[13].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[14].flow + '/60);">' + this.infoContent2[0].gatherings[13].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 14 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[14].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[15].flow + '/60);">' + this.infoContent2[0].gatherings[14].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 15 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[15].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[16].flow + '/60);">' + this.infoContent2[0].gatherings[15].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 16 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[16].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[17].flow + '/60);">' + this.infoContent2[0].gatherings[16].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 17 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[17].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[18].flow + '/60);">' + this.infoContent2[0].gatherings[17].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 18 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[18].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[19].flow + '/60);">' + this.infoContent2[0].gatherings[18].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 19 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[19].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[20].flow + '/60);">' + this.infoContent2[0].gatherings[19].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 20 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[20].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[21].flow + '/60);">' + this.infoContent2[0].gatherings[20].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 21 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[21].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[22].flow + '/60);">' + this.infoContent2[0].gatherings[21].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 22 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[22].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[23].flow + '/60);">' + this.infoContent2[0].gatherings[22].flow + ' </td>'+
            '</tr>'+
            '<tr>'+
              '<th scope="row"> 23 </th>'+
              '<td style="--start: calc(' + this.infoContent2[0].gatherings[23].flow + '/60); --size: calc(' + this.infoContent2[0].gatherings[23].flow + '/60);">' + this.infoContent2[0].gatherings[23].flow + ' </td>'+
            '</tr>'+
          '</tbody>'+
        '</table>'
      
      var string = string1 + grafico1 + grafico2;
      return string
    },
  }
}

</script>
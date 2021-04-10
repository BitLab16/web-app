<template id='2'>
    <div><p>ciao</p></div>
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
      infoContent: [],
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
            this.fetchContent(this.data[this.data_selezionata][this.orario_selezionato][i].code)
              .then( () => {
                this.infoWindow.setContent(this.template);
              });
          });
        }
      };
      f();
    });
  },
  methods: {
    async fetchContent(code) {
      const data = await (
        await fetch("http://localhost:3000/points/"/*+code+"/avg"*/)
          .catch( error => {
            //TODO: sistemare il caso in cui non ricevo dati!
            alert("errore nel fetch");
            console.error("Errore nel fetch " + error);
          })
      ).json();
      this.infoContent = data;
    },
    createContent(i) {
      var dateSelected=new Date(this.data_selezionata)

      selectElement('selezione', dateSelected.getDay())
      function selectElement(selezione, valueToSelect) {    
          let element = document.getElementById(selezione);
          element.value = valueToSelect;
      }

      var string1 = '<h1>' + this.infoContent[0].name + '</h1>' +
        '<h2> Descrizione: </h2>' +
        '<span>' + this.infoContent[0].description + '</span>' + '</br>' + '</br>' +
        '<h2> Flusso attuale: </h2>' +
        '<span>' + this.data[this.data_selezionata][this.orario_selezionato][i].flow + '</span>' +
          '<select id="selezione">'+
            '<option value="1">Lunedì</option>'+
            '<option value="2">Martedì</option>'+
            '<option value="3">Mercoledì</option>'+
            '<option value="4">Giovedì</option>'+
            '<option value="5">Venerdì</option>' +
            '<option value="6">Sabato</option>' +
            '<option value="0">Domenica</option>' +
          '</select>' +
        '</div>' +
        '<script>' +
          'var sel = document.forms.MyForm.selezione.value;' +  
        '</script>'

      var string2 = '<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css">'+
        '<table id="grafico" class="charts-css column show-heading show-labels show-primary-axis show-data-on-hover">' +
          '<caption> Media del flusso di persone </caption>' +
          '<tbody>' +
            '<tr>' +
              '<th scope="row"> LUN </th>' +
              '<td style="--size: calc(' + this.infoContent[0].flowaverage.monday[0] + '/ 100 )">' + media[1] + '</td>' +
            '</tr>'+
            '<tr>'+
              '<th scope="row"> MAR </th>'+
              '<td style="--size: calc(' + media[2] + '/ 100 )">' + media[1] + '</td>'+
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

      var string = string1 
      return string
    },
    
  }
}

</script>
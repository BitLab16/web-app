<template>
    <div></div>
</template>

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY&libraries=visualization&callback=initMap">
</script>

<script>
import '../assets/sytle/components/Infowindow.css';


// GRAFICO INFOWINDOW LOGIC
let numeroGraficoCorrente = 1;
window.currentPointID = 0;
window.cambiaGraficoInfoWindow = function() {
  if (numeroGraficoCorrente == 2)
    numeroGraficoCorrente = 1;
  else
    numeroGraficoCorrente += 1;
  window.infoWindow.infoWindow.setContent(window.infoWindow.createContent(window.currentPointID));
};

export default {
  name: 'Infowindow',
  props: {
    markers: {type: Array, required: true},

    /*ref alla struttura dati totale di App!*/
    data_selezionata: "",
    orario_selezionato: "",
    data: { type: Object, required: true },
    mapObject: {type: Object}
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
      window.infoWindow = this;
      this.infoWindow = new google.maps.InfoWindow({ content: "" /*, pixelOffset: new google.maps.Size(175, 114)*/ });
      var f = () => {
        if (this.markers.length === 0 || this.infoWindow === undefined) {
          setTimeout(f, 50);
          return;
        }
        for (let i = 0; i < this.markers.length; i++) {
          google.maps.event.addListener( this.markers[i], "click", () => {
            this.infoWindow.open(this.mapObject, this.markers[i]);
            google.maps.event.addListener(this.infoWindow, "domready", () => {
              this.mapObject.panTo(this.infoWindow.getPosition());
              this.mapObject.panBy(0, -100)
            });

            this.infoWindow.setContent("");
            this.fetchContent(this.data[this.data_selezionata][this.orario_selezionato][i].code)
            .then( () => {
              this.fetchContent1(this.data[this.data_selezionata][this.orario_selezionato][i].code)
                .then( () => {
                  this.fetchContent2(this.data[this.data_selezionata][this.orario_selezionato][i].code, this.data_selezionata)
                    .then( () => {
                      window.currentPointID = i;
                      numeroGraficoCorrente = 1;
                      this.infoWindow.setContent(this.createContent(i));
                    });
                });
            });
          });
          /*google.maps.event.addListener( this.infoWindow, "mouseout", () => {
            for (let i = 0; i < this.markers.length; i++) {
              this.infoWindow.close(this.mapObject, this.markers[i]);
            }
          });*/
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


    createContent(point_id) {
      
      var import_link = '<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css">';
      var header = '<h1 class="infoWindowH1">' + this.infoContent.name + '</h1>' +
        '<p class="infoWindowP">' + this.infoContent.description + '</p>' +
        '<h2 class="infoWindowH2"> Flusso attuale: ' + this.data[this.data_selezionata][this.orario_selezionato][point_id].flow + '</h2>';

      var grafico;
      switch (numeroGraficoCorrente) {
        case 1:
          grafico = this.getGrafico1();
          break;
        case 2:
          grafico = this.getGrafico2();
      }
      var bottoncino = '<div class="divBottone"><button id="bottoncinoCambiaGrafico" onclick="window.cambiaGraficoInfoWindow()" > Cambia grafico </button></div>';

      return import_link + '<div id="infoWindowDiv"> ' + header + "" + grafico + ' </div>' + bottoncino;
    },


    getGrafico1() {
      var dateSelected=new Date(this.data_selezionata)
      var giornoSettimana;
      switch(dateSelected.getDay()) {
        case 0: giornoSettimana = "SUNDAY"; break;
        case 1: giornoSettimana = "MONDAY"; break;
        case 2: giornoSettimana = "TUESDAY"; break;
        case 3: giornoSettimana = "WEDNESDAY"; break;
        case 4: giornoSettimana = "THURSDAY"; break;
        case 5: giornoSettimana = "FRIDAY"; break;
        case 6: giornoSettimana = "SATURDAY"; break;
      }
      var grafico1 = '<table id="grafico1" class="charts-css column show-heading show-labels show-primary-axis">' +
          '<tbody>';
      let max_flow1 = 0;
      for (let i = 0; i < 24; i++)
        if (this.infoContent1['flow-average'][giornoSettimana][i] > max_flow1)
          max_flow1 = this.infoContent1['flow-average'][giornoSettimana][i];
      for(let i =0; i < 24;i++)
        grafico1 = grafico1 +
            '<tr>' +
              '<th scope="row"><p class="descrizioneChart"> ' + i + ' </p></th>' +
              '<td style="--size: calc(' + (this.infoContent1['flow-average'][giornoSettimana][i] / max_flow1) + ' )">' +
              '<p class="numerettoChart">' + this.infoContent1['flow-average'][giornoSettimana][i] + '</p>' +
              '</td>'
            '</tr>';
      var giorno;
      switch(dateSelected.getDay()) {
        case 0: giorno = "la domenica"; break;
        case 1: giorno = "il lunedì"; break;
        case 2: giorno = "il martedì"; break;
        case 3: giorno = "il mercoledì"; break;
        case 4: giorno = "il giovedì"; break;
        case 5: giorno = "il venerdì"; break;
        case 6: giorno = "il sabato"; break;
      }
      grafico1 = grafico1 + '</tbody> </table><h3 class="infoWindowH3"> <i>Media flusso di persone ' + giorno + '</i> </h3>';
      return grafico1;
    },

    getGrafico2() {
      var grafico2 = 
        '<table id="grafico2" class="charts-css area show-heading show-labels show-primary-axis">' +
          '<tbody>';
      let max_flow2 = 0;
      for (let i = 0; i < 24; i++)
        if ( this.infoContent2[i] > max_flow2)
          max_flow2 = this.infoContent2[i];
      for(let i=0; i<24;i++)
        grafico2 = grafico2 +
            '<tr>' +
              '<th scope="row"> <p class="descrizioneChart">' + i + ' </p></th>' +
              '<td style="--start: calc(' + (this.infoContent2[i]/max_flow2) + '); --size: calc(' + (this.infoContent2[Math.min(i+1, 23)]/max_flow2) + ');"></td>' +
            '</tr>';
      grafico2 = grafico2 + '</tbody> </table><h3 class="infoWindowH3"> <i>Flusso di persone di oggi</i> </h3>';
      return grafico2;
    }
    
  }
}

</script>
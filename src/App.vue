<template>
  <div id="app">
    <Map ref="Map"
      :data="data"
      :data_selezionata="data_selezionata"
      :orario_selezionato="orario_selezionato"
    />
    <DateTimePicker @pickedDate="updatedDatePicker" @pickedTime="updatedTimePicker"/>
  </div>
</template>

<script>
import Map from "./components/Map";
import DateTimePicker from "./components/DateTimePicker";

import './assets/sytle/app.css';

export default {
  name: 'App',
  components: {
    Map,
    DateTimePicker
  },
  data() {
    return {
      data_selezionata: "",
      orario_selezionato: "", 
      data: {}
    }
  },
  methods: {
    updatedDatePicker(newDate) {
      this.data_selezionata = newDate;
      if(this.data[this.data_selezionata] && this.data_selezionata != this.dataOggi()) return;
      this.fetchData();
    },
    updatedTimePicker(newTime) {
      this.orario_selezionato = newTime;
      if (Object.keys(this.data).length !== 0)
        this.$refs.Map.update_map();
    },
    dataOggi() {
      var date = new Date();
      return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    },
    received_data_is_valid(received_data) {
      //TODO: testare se i dati sono validi!
      // per il momento return true
      return Object.keys(received_data).length !== 0;
    },
    async fetchData() {
      //ricevo i dati della data selezionata
      const dati_ricevuti_grezzi = await (
        await fetch("http://localhost:3000/points"/*"time/" + this.data_selezionata*/)
          .catch( error => {
            //TODO: sistemare il caso in cui non ricevo dati!
            alert("errore nel fetch");
            console.error("Errore nel fetch " + error);
          } )
      ).json();
      if ( ! this.received_data_is_valid(dati_ricevuti_grezzi) ) {
        //TODO: cosa faccio qui?
        console.error ("Errore dati ricevuti non validi!");
        return;
      }
      this.parseDataAndUpdateMap(dati_ricevuti_grezzi);
    },
    parseDataAndUpdateMap(dati_ricevuti_grezzi) {
      var dati_data_selezionata = {};
      for(let i=0; i < dati_ricevuti_grezzi.length; i++) {
        var nuovo_dato = {}
        nuovo_dato.flow = 60;
        nuovo_dato.lat = dati_ricevuti_grezzi[i].point.location.coordinates.lat;
        nuovo_dato.lng = dati_ricevuti_grezzi[i].point.location.coordinates.lng;
        var timestamp = new Date(dati_ricevuti_grezzi[i].detectionTime);
        var hh = timestamp.getHours();
        if (hh < 10) hh = '0'+hh;
        var min = timestamp.getMinutes();
        if (min < 10) min = '0'+min;
        var time = hh+':'+min;
        if (! dati_data_selezionata[time])
          dati_data_selezionata[time] = [];
        dati_data_selezionata[time].push(nuovo_dato);
      }
      this.data[this.data_selezionata] = dati_data_selezionata;
      this.$refs.Map.update_map();
    }
  },
}
</script>


<!--
FORMAT THIS.DATA
{
  "2019-01-01": {
      "18:00": [
      {
        "lat": 45.397959,
        "lng": 11.87721,
        "flow": 1
      },
      {
          "lat": 45.397959,
          "lng": 11.87721,
          "flow": 1
      },
    ],
    "18:30": [
      {
        "lat": 45.397959,
        "lng": 11.87721,
        "flow": 1
      },
      {
          "lat": 45.397959,
          "lng": 11.87721,
          "flow": 1
      }
    ],
  },

  ------


  "2019-01-02": [
    {
        "time": "18:00",
        "lat": 45.397959,
        "lng": 11.87721,
        "flow": 1
    },
    {
        "time": "18:00",
        "lat": 45.397959,
        "lng": 11.87721,
        "flow": 1
    }
  ]
}
-->
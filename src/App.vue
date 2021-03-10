<template>
  <div id="app">
    <Map :data="data" ref="Map"/>
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
      // console.log("App::updatedDatePicker value received date: " + newDate);
      this.data_selezionata = newDate;
      this.fetchData();
    },
    updatedTimePicker(newTime) {
      // console.log("App::updatedTimePicker value received time: " + newTime);
      this.orario_selezionato = newTime;
      this.$refs.Map.update_map();
    },
    async fetchData() {
      console.log("App::fetchData");
      //TODO QUI:
      // se la data è gia presente salta,
      // ma se è oggi ricarica comunque così aggiorna
      
      //ricevo i dati della data selezionata
      const dati_ricevuti_grezzi = await (await fetch("http://localhost:5000/points"/*"time/" + this.data_selezionata*/)).json();
      
      // TODO:
        // popolo dati_data_selezionata in funzione di dati_ricevuti_grezzi
      var dati_data_selezionata = dati_ricevuti_grezzi; // !!! ERRORE! da togliere questa riga

      this.data[this.data_selezionata] = dati_data_selezionata;
      this.$refs.Map.update_map();
    }
  },
}
</script>


<!--
FORMAT THIS.DATA
{
  "2019-01-01": [
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
    ],
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
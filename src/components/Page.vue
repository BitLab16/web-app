<template>
  <heat-map
    :points="data"
    :lat="getCenterMap().lat"
    :lng="getCenterMap().lng"
    :width="600"
    :height="500"
    :radius="40"
  />
</template>

<script>
import HeatMap from '@/components/HeatMap'

export default {
  name: 'view-page',
  components: { HeatMap },
  props: {
    apiUrl: String
  },
  data: () => {
    return {
      items: null
      /*data: [
        {lat: 45.407707, lng: 11.873161, weight: 3},
        {lat: 45.397959, lng: 11.877189}, 
        {lat: 45.397959, lng: 11.877190}, 
        {lat: 45.397959, lng: 11.877200},
        {lat: 45.397959, lng: 11.87721},
        {lat: 45.39795, lng: 11.87721},
        {lat: 45.397954, lng: 11.87721},
        {lat: 45.39796, lng: 11.877},
        {lat: 45.397959, lng: 11.77721},
        {lat: 45.39855567, lng: 11.87721},
        {lat: 45.397959, lng: 11.845343},
        {lat: 45.397100, lng: 11.8775432},
        {lat: 45.397959, lng: 11.87744},
        {lat: 45.397959, lng: 11.8774324},
        {lat: 45.397869, lng: 11.8771443, weight: 3},
        {lat: 45.3756465, lng: 11.87721343, weight: 3},
        {lat: 45.397956564, lng: 11.87721645645, weight: 3},
        {lat: 45.39795878, lng: 11.877216456, weight: 3},
        {lat: 45.3979596565, lng: 11.8772135454, weight: 3},
        {lat: 45.397955435, lng: 11.877215435, weight: 3},
        {lat: 45.39795943, lng: 11.87721343, weight: 3},
        {lat: 45.40885765234, lng: 11.87721343, weight: 3},
        {lat: 45.3979594543, lng: 11.877213434239, weight: 3},
        {lat: 45.39795943, lng: 11.87721343444, weight: 3},
        {lat: 45.408857654639, lng: 11.87721343, weight: 3},
        {lat: 45.408857654639235, lng: 11.873406951812912},
        {lat: 45.408857654435, lng: 11.873406951812912},
        {lat: 45.408857654654545, lng: 11.873406951812912},
        {lat: 45.408857654639235, lng: 11.873406951844445},
        {lat: 45.408857654639235, lng: 11.8734069518666},
        {lat: 45.40885765463, lng: 11.873406},
      ]*/
    }
  },
  /*created() {
    axios.get("http://localhost:3000/luoghi")
      .then(response => this.items = response.luoghi.lat + response.luoghi.lng)
  },*/
  /*async created() {
    try {
      const response = await axios.get(this.apiUrl)
      this.items = response.data
    } catch (e) {
      this.errors.push(e)
    }
  },*/
  /*mounted () {
    axios
      .get('https://www.google.com/maps/search/?api=1&query=45.397959,11.87721')
      .then(response => {
        this.data = response.data.bpi
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
  created() {
    axios.get(`https://www.google.com/maps/search/?api=1&query=45.397959,11.87721`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },*/
  /*http: {
    emulateJSON:true,
    emulateHTTP: true
  },*/
  methods: {
    getCenterMap () {
        return {
            lat:45.407588, 
            lng:11.877029
      }
    },/*
    function() {
       this.$http.post('http://localhost:3000/luoghi',
        {
            lat: this.luoghi.lat,              // Passo un oggetto con i dati da inviare via POST
            lng: this.luoghi.lng
        }).then(function(data) {
            console.log(data);       // Stampo nella console i dati ricevuti dal server
            this.dati_inviati = true;
        });
    }*/
  }
}
</script>
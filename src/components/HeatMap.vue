<template>
  <div
    ref="heatmap"
    :style="`width: 100vw; height: 100vh`"/>

</template>

<script>
import axios from 'axios';

const bounds= {
      north: 45.444315,
      south: 45.362051,
      west: 11.825627,
      east: 11.948540,
    };
export default {
  name: 'HeatMap',
  data() {
    return {
        lati: [],
        lngo: []
    }
  },
  props: {
    lat: {
      type: Number,
      default: () => 37.775
    },
    lng: {
      type: Number,
      default: () => -122.434
    },
    initialZoom: {
      type: Number,
      default: () => 14
    },
    mapType: {
      type: String,
      default: () => 'roadmap'
    },
    points: {
      type: Array,
      required: true
    },
    width: {
      type: [String, Number],
      default: () => '100%'
    },
    height: {
      type: [String, Number],
      default: () => '100%'
    },
    opacity: {
      type: Number,
      default: () => 1
    },
    radius: {
      type: Number,
      default: () => 15
    },
    markers: [
      {
        position: {lat: 45.444315, lng: 11.825627}
      },
      {
        position: {lat: 45.362051, lng: 11.948540}
      }
    ],
    maxIntensity: {
      type: Number,
      default: () => 5
    }
  },
  computed: {
    mapWidth () {
      if (typeof this.width === 'string') {
        return this.width
      } else {
        return `${this.width}px`
      }
    },
    mapHeight () {
      if (typeof this.height === 'string') {
        return this.height
      } else {
        return `${this.height}px`
      }
    },
    heatmapPoints () {
      return this.data.map(
          data => new google.maps.LatLng(data.lati, data.lngo)
      )
    }
  },
  
  mounted () {
    axios
      .get('http://localhost:3000/location')
      .then(response => (this.points = response.data))

    return this.$gmapApiPromiseLazy().then(() => {
      // eslint-disable-next-line
        this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        restriction: {
          latLngBounds: bounds,
        },
        mapTypeId: this.mapType,
      })
      // eslint-disable-next-line
        this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapPoints,
        map: this.$mapObject,
        opacity: this.opacity,
        radius: this.radius,
        maxIntensity: this.maxIntensity,
      })

      this.$heatmap.setMap(this.$mapObject)
    })
    
  },
  /*methods: {
    // Pushes posts to the server when called.
    postPost() {
      axios.post(`https://www.google.com/maps/search/?api=1&query=45.397959,11.87721`, {
        body: this.postBody
      })
      .then(response => {})
      .catch(e => {
        this.errors.push(e)
      })
    }
  }*/
}
</script>
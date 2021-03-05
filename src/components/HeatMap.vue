<template>
  <div
    ref="heatmap"
    :style="`width: 100vw; height: 100vh`"/>
</template>

<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY&libraries=visualization&callback=initMap">
</script>

<script>
const bounds= {
      north: 45.444315,
      south: 45.362051,
      west: 11.825627,
      east: 11.948540,
    };
export default {
  name: 'HeatMap',
  props: {
    lat: {
      type: Number,
      default: 45.407588 , 
    },
    lng: {
      type: Number,
      default: 11.877029
    },
    initialZoom: {
      type: Number,
      default: 14
    },
    mapType: {
      type: String,
      default: 'roadmap'
    },
    points: {
      type: Array,
      required: true
    },
    opacity: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default:  15
    },
    maxIntensity: {
      type: Number,
      default: 5
    }
  },
  methods: {
    pointsGenerator() {
      return this.points.map(points => ({
          location: new google.maps.LatLng(points.lat, points.lng),
          weight: points.flow}))    
    }
  },
  mounted() {
    return this.$gmapApiPromiseLazy().then(() => {
      this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        restriction: {
          latLngBounds: bounds,
        },
        mapTypeId: this.mapType,
      })
      this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.pointsGenerator(),
        map: this.$mapObject,
        opacity: this.opacity,
        radius: this.radius,
        maxIntensity: this.maxIntensity,
      })
      this.$heatmap.setMap(this.$mapObject)
    })   
  }
}
</script>
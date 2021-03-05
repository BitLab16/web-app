<template>
  <div id="slidebar">
    <VueSlideBar
      v-model="slider.value"
      :data="slider.data"
      :range="slider.range"
      :processStyle="{ backgroundColor: '#d8d8d8' }"
      @callbackRange="callbackRange">
      <template slot="tooltip">
        <img src="static/images/rectangle-slider.svg">
      </template>
    </VueSlideBar>
  </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar'
export default {
  components: {
    VueSlideBar
  },
  data() {
    return {
      slider: {
        value: "18:25",
        data: [
          "18:20",
          "18:25",
          "18:30",
          "18:35",
          "18:40"
        ],
        range: [
          {
            label: '18:20'
          },
          {
            label: '18:25',
            isHide: true
          },
          {
            label: '18:30'
          },
          {
            label: '18:35',
            isHide: true
          },
          {
            label: '18:40'
          }
        ]
      }
    }
  },
  methods: {
    callbackRange (val) {
      console.log("Slider::callBackRange new rangeValue: " + JSON.stringify(val) );
      this.$store.state.sliderValue = val.label;
    }
  }
}
</script>

<style>
    #slidebar{
        position: fixed;
        background-color: black;
        opacity: 0.8;
        margin-left: 20vw;
        margin-right: 20vw;
        width: 60vw;
        height: 10vh;
        bottom: 0;
        padding-left: 20px;  
        padding-right: 20px;   
    }
</style>
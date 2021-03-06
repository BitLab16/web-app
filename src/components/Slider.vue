<template>
  <div id="slidebar">
    <VueSlideBar
      v-model="slider.value"
      :data="slider.data"
      :range="slider.range"
      :processStyle="{ backgroundColor: '#d8d8d8' }"
      @callbackRange="callbackRange">
      
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
        value: "12:00",
        data: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
        range: [
          {
            label: '00:00'
          },
          {
            label: '01:00',
            isHide: true
          },
          {
            label: '02:00'
          },
          {
            label: '03:00',
            isHide: true
          },
          {
            label: '04:00'
          },
          {
            label: '05:00',
            isHide: true
          },
          {
            label: '06:00'
          },
          {
            label: '07:00',
            isHide: true
          },
          {
            label: '08:00'
          },
          {
            label: '09:00',
            isHide: true
          },
          {
            label: '10:00'
          },
          {
            label: '11:00',
            isHide: true
          },
          {
            label: '12:00'
          },
          {
            label: '13:00',
            isHide: true
          },
          {
            label: '14:00'
          },
          {
            label: '15:00',
            isHide: true
          },
          {
            label: '16:00'
          },
          {
            label: '17:00',
            isHide: true
          },
          {
            label: '18:00'
          },
          {
            label: '19:00',
            isHide: true
          },
          {
            label: '20:00'
          },
          {
            label: '21:00',
            isHide: true
          },
          {
            label: '22:00'
          },
          {
            label: '23:00',
            isHide: true
          },
        ]
      }
    }
  },
  methods: {
    callbackRange (val) {
      console.log("Slider::callBackRange new rangeValue: " + JSON.stringify(val) );
      this.$store.state.sliderValue = val.label;
      this.$store.state.firstBoolean = true;
      this.$store.state.secondBoolean = true;
    }
  }
}
</script>

<style>
    #slidebar{
        position: fixed;
        background-color: black;
        opacity: 0.8;
        margin: collapse;
        margin-left: 25vw;
        margin-right: 25vw;
        width: 50vw;
        height: 10vh;
        top: 0;
        padding-left: 20px;  
        padding-right: 20px;   
    }
</style>

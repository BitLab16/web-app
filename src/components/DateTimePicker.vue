<template>
    <div>
        <div id="calendar">
            <datetime format="YYYY-MM-DD" @input="updatedCalendar" firstDayOfWeek="1" />
        </div>
        <div id="slidebar">
            <VueSlideBar
                v-model="slider.value"
                :data="slider.data"
                :range="slider.range"
                :labelStyles="{ color: 'var(--main-color-2)', backgroundColor: 'var(--main-color-2)' }"
                :processStyle="{ backgroundColor: 'var(--main-color-3)' }"
                @callbackRange="updatedSlider"
            />
        </div>
    </div>
</template>

<script>
import datetime from './DateTimePicker/datetime-picker.vue';
import VueSlideBar from 'vue-slide-bar';

import '../assets/sytle/components/DateTimePicker.css';

export default {
  name: 'DateTimePicker',
  components: {
      datetime,
      VueSlideBar
  },
  data() {
    return {
      slider: {
        value: this.currentTime(),
        data: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30",
          "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
          "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
          "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
        ],
        range: [
          { label: '00:00', isHide: true }, { label: '00:30', isHide:true },
          { label: '01:00', isHide: false }, { label: '01:30', isHide: true },
          { label: '02:00', isHide: true }, { label: '02:30', isHide: true },
          { label: '03:00', isHide: false }, { label: '03:30', isHide: true },
          { label: '04:00', isHide: true }, { label: '04:30', isHide: true },
          { label: '05:00', isHide: false }, { label: '05:30', isHide: true },
          { label: '06:00', isHide: true }, { label: '06:30', isHide: true },
          { label: '07:00', isHide: false }, { label: '07:30', isHide: true },
          { label: '08:00', isHide: true }, { label: '08:30', isHide: true },
          { label: '09:00', isHide: false }, { label: '09:30', isHide: true },
          { label: '10:00', isHide: true }, { label: '10:30', isHide: true },
          { label: '11:00', isHide: false }, { label: '11:30', isHide: true },
          { label: '12:00', isHide: true }, { label: '12:30', isHide: true },
          { label: '13:00', isHide: false }, { label: '13:30', isHide: true },
          { label: '14:00', isHide: true }, { label: '14:30', isHide: true },
          { label: '15:00', isHide: false }, { label: '15:30', isHide: true },
          { label: '16:00', isHide: true }, { label: '16:30', isHide: true },
          { label: '17:00', isHide: false }, { label: '17:30', isHide: true },
          { label: '18:00', isHide: true }, { label: '18:30', isHide: true },
          { label: '19:00', isHide: false }, { label: '19:30', isHide: true },
          { label: '20:00', isHide: true }, { label: '20:30', isHide: true },
          { label: '21:00', isHide: false }, { label: '21:30', isHide: true },
          { label: '22:00', isHide: true }, { label: '22:30', isHide: true },
          { label: '23:00', isHide: false }, { label: '23:30', isHide:true },
        ]
      }
    }
  },
  methods: {
    updatedCalendar(newDate) {
      this.$emit("pickedDate", newDate);
    },
    updatedSlider(newTime) {
      this.$emit("pickedTime", newTime.label);
    },
    currentTime() {
      var data = new Date();
      var HH = data.getHours();
      var MM = data.getMinutes();
      if(MM<=15) {
        MM = 0;
      } 
      else {
        if(MM > 15 && MM<=45) {
          MM = 30;
        } 
        else {
          MM = 0
          HH++
        }
      }
      if (HH < 10) {
        HH = '0'+HH;
      }
      if (MM < 10) {
        MM = '0'+MM;
      }
      var time = HH + ':' + MM;
      return time
    }
  },
}
</script>
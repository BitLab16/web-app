<template>
    <div>
        <div id="calendar">
            <datetime format="YYYY-MM-DD" width="300px" @input="updatedCalendar" firstDayOfWeek="1" />
        </div>
        <div id="slidebar">
            <VueSlideBar
                v-model="slider.value"
                :data="slider.data"
                :range="slider.range"
                :labelStyles="{ color: '#003300', backgroundColor: 'green' }"
                :processStyle="{ backgroundColor: 'green' }"
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
        value: "12:00",
        data: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30",
          "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
          "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
          "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",
        ],
        range: [
          { label: '00:00', isHide: false }, { label: '00:30', isHide:true },
          { label: '01:00', isHide: true }, { label: '01:30', isHide: true },
          { label: '02:00', isHide: false }, { label: '02:30', isHide: true },
          { label: '03:00', isHide: true }, { label: '03:30', isHide: true },
          { label: '04:00', isHide: false }, { label: '04:30', isHide: true },
          { label: '05:00', isHide: true }, { label: '05:30', isHide: true },
          { label: '06:00', isHide: false }, { label: '06:30', isHide: true },
          { label: '07:00', isHide: true }, { label: '07:30', isHide: true },
          { label: '08:00', isHide: false }, { label: '08:30', isHide: true },
          { label: '09:00', isHide: true }, { label: '09:30', isHide: true },
          { label: '10:00', isHide: false }, { label: '10:30', isHide: true },
          { label: '11:00', isHide: true }, { label: '11:30', isHide: true },
          { label: '12:00', isHide: false }, { label: '12:30', isHide: true },
          { label: '13:00', isHide: true }, { label: '13:30', isHide: true },
          { label: '14:00', isHide: false }, { label: '14:30', isHide: true },
          { label: '15:00', isHide: true }, { label: '15:30', isHide: true },
          { label: '16:00', isHide: false }, { label: '16:30', isHide: true },
          { label: '17:00', isHide: true }, { label: '17:30', isHide: true },
          { label: '18:00', isHide: false }, { label: '18:30', isHide: true },
          { label: '19:00', isHide: true }, { label: '19:30', isHide: true },
          { label: '20:00', isHide: false }, { label: '20:30', isHide: true },
          { label: '21:00', isHide: true }, { label: '21:30', isHide: true },
          { label: '22:00', isHide: false }, { label: '22:30', isHide: true },
          { label: '23:00', isHide: true }, { label: '23:30', isHide:true },
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
    }
  },
}
</script>
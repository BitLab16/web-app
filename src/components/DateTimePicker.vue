<template>
    <div>
        <div id="calendar">
            <datetime format="YYYY/MM/DD" width="300px" @input="updatedCalendar" firstDayOfWeek="1" />
        </div>
        <div id="slidebar">
            <VueSlideBar
                v-model="slider.value"
                :data="slider.data"
                :range="slider.range"
                :labelStyles="{ color: '#003300', backgroundColor: '#003300' }"
                :processStyle="{ backgroundColor: '#ed4d00' }"
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
          "00:00",
          "01:00",
          "02:00",
          "03:00"
        ],
        range: [
          { label: '00:00' },
          { label: '01:00', isHide: true },
          { label: '02:00', isHide: true },
          { label: '03:00' },
        ]
      }
    }
  },
  methods: {
    updatedCalendar(newDate) {
        console.log("DatePicker::UpdatedCalendar val received::" + newDate);
        this.$emit("pickedDate", newDate);
    },
    updatedSlider(newTime) {
        console.log("DatePicker::updatedSlider new val: " + newTime.label );
        this.$emit("pickedTime", newTime.label);
    }
  },
}
</script>
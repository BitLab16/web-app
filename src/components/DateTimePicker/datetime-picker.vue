<template>
  <div :style='{width:width}' class="datetime-picker"  v-on:click='calendarClicked($event)'  v-on:blur='toggleCal' >
    <div class="calendario">
      <input type='text' readonly id='tj-datetime-input' :required="required" :value="date"  :name='name' v-on:click='toggleCal' autocomplete='off'  />
      <div class='calender-div' :class='{noDisplay: hideCal}'>
        <div :class='{noDisplay: hideDate}'>
          <div class='year-month-wrapper'>
            <div class='month-setter'>
              <button type='button' class='nav-l' v-on:click='leftYear'>&#x3C;</button>
              <span class='year'>{{year}}</span>
              <button type='button' class='nav-r' v-on:click='rightYear' >&#x3E;</button>
            </div>
            <div class='month-setter'>
              <button type='button' class='nav-l' v-on:click='leftMonth'>&#x3C;</button>
              <span class='month'>{{month}}</span>
              <button type='button' class='nav-r' v-on:click='rightMonth'>&#x3E;</button>
            </div>
          </div>
          <div class='headers'>
            <span class='days' v-for="port in days" :key="port">{{port}}</span>
          </div>
          <div>
            <div class="week" v-for="(week, weekIndex) in weeks" :key="weekIndex">
              <span class="port" v-for="(day, dayIndex) in week" :key="dayIndex" v-on:click='setDay(weekIndex*7 + dayIndex, day)' :class='{activePort: (weekIndex*7 + dayIndex) === activePort}'>
                {{day}}
              </span>
            </div>
          </div>
        </div>
        <button type='button' v-on:click='clearDate' hidden="true" class='okButton'>Clear</button>
        <button type='button' v-on:click='setDate' class='okButton ok'>OK</button>
      </div>
    </div>
  </div>


</template>

<script>
//import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import eachDay from 'date-fns/each_day';
import getDay from 'date-fns/get_day';
import format from 'date-fns/format';
import startOfDay from 'date-fns/start_of_day';
import isEqual from 'date-fns/is_equal';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const AM = 'AM'
const PM = 'PM'
export default {
  name: 'datetime-picker',
  props: {
    format: {
      type: String,
      default: 'YYYY-MM-DD h:i:s',
    },
    name: {
      type: String
    },
    width: {
      type: String
    },
    value: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    firstDayOfWeek: {
      default: 0,
      validator: function(value) {
        try {
          const val = parseInt(value, 10)
          return val >= 0 && val <= 1
        } catch (e) {
          console.warn(e.message)
          return false
        }
      },
      message: 'Only 0 (Sunday) and 1 (Monday) are supported.'
    },
  },
  data () {
    return {
      date: this.value,
      hideCal: true,
      activePort: null,
      timeStamp: new Date(),
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: [],
      monthIndex: 0,
      year: 2017,
      portsHolder: [],
      day: 1,
    }
  },
  mounted() {
    this.setDate();
  },
  methods: {
    leftMonth () {
      let index = this.months.indexOf(this.month)
      if (index === 0) {
        this.monthIndex = 11
      } else {
        this.monthIndex = index - 1
      }
      this.updateCalendar()
    },
    rightMonth () {
      let index = this.months.indexOf(this.month)
      if (index === 11) {
        this.monthIndex = 0
      } else {
        this.monthIndex = index + 1
      }
      this.updateCalendar()
    },
    rightYear () {
      this.year++
      this.updateCalendar()
    },
    leftYear () {
      this.year--
      this.updateCalendar()
    },
    updateActivePortFromWeek (week, weekIndex) {
      const currentActive = startOfDay(this.timeStamp);
      const index = week.findIndex(day => isEqual(currentActive, day));
      if (index !== -1) {
        this.activePort = weekIndex*7 + index;
      }
    },
    updateCalendar () {
      const date = new Date(this.year, this.monthIndex, 1, 0, 0, 0);
      const weeks = [];
      let week = null;
      let weekDays = new Array(7);
      // let index = 0;
      this.activePort = null;
      eachDay(date, endOfMonth(date)).forEach(day => {
        const weekday = getDay(day);
        if (weekday === this.normalizedFirstDayOfWeek) {
          if (week) {
            weeks.push(week);
            // Add those days that were not part of the month to the index
            // index += week.filter(d => d === null).length;
            this.updateActivePortFromWeek(weekDays, weeks.length - 1);
            weekDays = new Array(7);
          }
          week = new Array(7);
        } else if (week === null) {
          week = new Array(7);
        }
        const idx = (weekday - this.normalizedFirstDayOfWeek + 7) % 7
        week[idx] = format(day, 'DD');
        weekDays[idx] = day;
      });
      if (week && week.some(n => n)) {
        weeks.push(week);
        this.updateActivePortFromWeek(weekDays, weeks.length - 1);
      }
      this.weeks = weeks;
    },
    setDay (index, port) {
      if (port) {
        this.activePort = index;
        this.day = parseInt(port, 10);
        this.timeStamp = new Date(this.year, this.monthIndex, this.day);
      }
    },
    calendarClicked (event) {
      if (event.target.id !== 'j-hour' && event.target.id !== 'j-minute') {
        this.minuteSelectorVisible = false
        this.hourSelectorVisible = false
      }
      event.cancelBubble = true
      if (event.stopPropagation) {
        event.stopPropagation()
      }
    },
    documentClicked (event) {
      if (event.target.id !== 'tj-datetime-input') {
        this.hideCal = true
      }
    },
    toggleCal () {
      this.hideCal = !this.hideCal
    },
    setPeriodStyle () {
      if (this.dateFormat.indexOf('H') !== -1) {
        this.periodStyle = 24;
        this.period = null;
      } else {
        this.periodStyle = 12;
      }
    },
    setDate () {
      let d = null

      this.setPeriodStyle()

      let h = this.hour + ''

      if (this.periodStyle === 12) {
        if (h === '12') {
          h = this.period === AM ? '00' : '12'
        } else if (this.period === PM && parseInt(h) < 12) {
          h = parseInt(h) + 12
          h = '' + h
        } else if (this.period === AM && parseInt(h) > 12) {
          h = parseInt(h) - 12
          h = '' + h
        }
      }
      d = this.dateFormat
      d = d.replace('YYYY', this.year)
      d = d.replace('DD', this.day < 10 ? '0' + this.day : this.day)
      let m = this.monthIndex + 1
      d = d.replace('MM', m < 10 ? '0' + m : m)
      this.minute += ''
      d = d.replace(this.periodStyle === 24 ? 'H' : 'h', h.length < 2 ? '0' + h : '' + h )
      d = d.replace('i', this.minute.length < 2 ? '0' + this.minute : '' + this.minute)
      d = d.replace('s', '00')
      this.$emit('input', d)
      this.date = d
      this.hideCal = true
    },
    /**
    `*Creates a date object from a given date string
    */
    makeDateObject (val) {
      // handle support for eu date format
      let dateAndTime = val.split(' ')
      let arr = []
      if (this.format.indexOf('-') !== -1) {
        arr = dateAndTime[0].split('-')
      } else {
        arr = dateAndTime[0].split('/')
      }
      let year = 0
      let month = 0
      let day = 0
      if (this.format.indexOf('DD/MM/YYYY') === 0 || this.format.indexOf('DD-MM-YYYY') === 0) {
        year = arr[2]
        month = arr[1]
        day = arr[0]
      } else if (this.format.indexOf('YYYY/MM/DD') === 0 || this.format.indexOf('YYYY-MM-DD') === 0) {
        year = arr[0]
        month = arr[1]
        day = arr[2]
      } else {
        year = arr[2]
        month = arr[0]
        day = arr[1]
      }

      let date = new Date();
      if(this.hideDate){
        // time only
        let splitTime = dateAndTime[0].split(':')
        // handle date format without seconds
        let secs = splitTime.length > 2 ? parseInt(splitTime[2]) : 0
        date.setHours(parseInt(splitTime[0]), parseInt(splitTime[1]), secs, 0)
      } else if (this.hideTime) {
        // date only
        date = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
      } else {
        // we have both date and time
        let splitTime = dateAndTime[1].split(':')
        // handle date format without seconds
        let secs = splitTime.length > 2 ? parseInt(splitTime[2]) : 0
        date = new Date(parseInt(year), parseInt(month)-1, parseInt(day), parseInt(splitTime[0]), parseInt(splitTime[1]), secs)
      }

      return date
    },
    clearDate(){
      this.date = ''
      this.$emit('input', '')
      this.toggleCal ()
    },
  },
  created () {
    if (this.value) {
      try {
        this.timeStamp = this.makeDateObject(this.value)

        // set #period (am or pm) based on date hour
        if (this.timeStamp.getHours() >= 12) {
          this.period = PM
        } else {
          this.period = AM
        }
      } catch (e) {
        this.timeStamp = new Date()
        console.log(e);
      }
    }

    this.year = this.timeStamp.getFullYear()
    this.monthIndex = this.timeStamp.getMonth()
    this.day = this.timeStamp.getDate()
    this.hour = this.timeStamp.getHours()
    this.hour = this.hour < 10 ? '0' + this.hour : '' + this.hour
    this.minute = this.timeStamp.getMinutes()
    this.minute = this.minute < 10 ? '0' + this.minute : '' + this.minute
    this.updateCalendar()
    days.forEach((day, idx) => {
      this.days[(idx - this.normalizedFirstDayOfWeek + 7) % 7] = day;
    });
    document.addEventListener('keydown', this.keyIsDown)
    document.addEventListener('click', this.documentClicked)
    // this.setDate()
    this.setPeriodStyle()
  },
  watch: {
    value (newVal, /*oldVal*/) {
      if (newVal) {
        this.value = newVal;
        try {
          this.timeStamp = this.makeDateObject(this.value)
        } catch (e) {
          console.warn(e.message +'. Current date is being used.')
          this.timeStamp = new Date()
        }
        this.year = this.timeStamp.getFullYear()
        this.monthIndex = this.timeStamp.getMonth()
        this.day = this.timeStamp.getDate()
        this.hour = this.timeStamp.getHours()
        this.hour = this.hour < 10 ? '0' + this.hour : '' + this.hour
        this.minute = this.timeStamp.getMinutes()
        this.minute = this.minute < 10 ? '0' + this.minute : '' + this.minute
        this.updateCalendar()
        this.setDate()
      }

    }
  },
  destroyed: function () {
    document.removeEventListener('keydown', this.keyIsDown)
    document.removeEventListener('click', this.documentClicked)
  },
  computed: {
    normalizedFirstDayOfWeek: function() {
      return parseInt(this.firstDayOfWeek, 10);
    },
    ports: {
      get: function () {
        let p = []
        if (this.portsHolder.length === 0) {
          for (let i = 0; i < 42; i++) {
            p.push('')
          }
        } else {
          p = this.portsHolder
        }
        return p
      },
      set: function (newValue) {
        this.portsHolder = newValue
      }
    },
    month () {
      return this.months[this.monthIndex]
    },
    dateTime () {
      return this.timeStamp.getFullYear() + '-' + (this.timeStamp.getMonth() + 1) + '-' + this.timeStamp.getUTCDay()
    },
    minutes () {
      let arr = []
      for (let i = 0; i < 60; i++) {
        i < 10 ? arr.push('0' + i) : arr.push('' + i)
      }
      return arr
    },
    hours () {
      let arr = []
      if (this.periodStyle === 24) {
        for (let i = 0; i < this.periodStyle; i++) {
          i < 10 ? arr.push('0' + i) : arr.push('' + i)
        }
      } else {
        for (let i = 1; i <= this.periodStyle; i++) {
          i < 10 ? arr.push('0' + i) : arr.push('' + i)
        }
      }
      return arr
    },
    dateFormat () {
      let f = 'YYYY-MM-DD h:i:s'
      let allowedFormats = [
        'YYYY-MM-DD h:i:s', 'DD-MM-YYYY h:i:s', 'MM-DD-YYYY h:i:s',
        'YYYY-MM-DD h:i', 'DD-MM-YYYY h:i', 'MM-DD-YYYY h:i',
        'YYYY-MM-DD H:i:s', 'DD-MM-YYYY H:i:s', 'MM-DD-YYYY H:i:s',
        'YYYY-MM-DD H:i', 'DD-MM-YYYY H:i', 'MM-DD-YYYY H:i',
        'YYYY-MM-DD', 'DD-MM-YYYY', 'MM-DD-YYYY',
        'YYYY/MM/DD', 'DD/MM/YYYY', 'MM/DD/YYYY',
        'h:i:s', 'H:i:s', 'h:i', 'H:i',
        'YYYY/MM/DD h:i:s', 'DD/MM/YYYY h:i:s', 'MM/DD/YYYY h:i:s',
        'YYYY/MM/DD h:i', 'DD/MM/YYYY h:i', 'MM/DD/YYYY h:i',
        'YYYY/MM/DD H:i:s', 'DD/MM/YYYY H:i:s', 'MM/DD/YYYY H:i:s',
        'YYYY/MM/DD H:i', 'DD/MM/YYYY H:i', 'MM/DD/YYYY H:i'
      ]
      if (this.format) {
        f = this.format
      }
      if (allowedFormats.indexOf(f) < 0) {
        console.warn('Invalid date format supplied. Current default date format is being used.')
        // return default date format if date format is invalid
        return 'YYYY-MM-DD h:i:s'
      } else {
        return f
      }
    },
    hideTime () {
      return this.dateFormat.indexOf('h:i:s') === -1
          && this.dateFormat.indexOf('H:i:s') === -1
          && this.dateFormat.indexOf('h:i') === -1
          && this.dateFormat.indexOf('H:i') === -1
    },
    hideDate () {
      return this.dateFormat === 'h:i:s' || this.dateFormat === 'H:i:s'
        || this.dateFormat === 'h:i' || this.dateFormat === 'H:i'
    }
  }
}
</script>
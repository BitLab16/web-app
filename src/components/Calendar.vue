<template>
  <div id="picker">
    <date-picker v-model="date" valueType="format" @change="pickDate"></date-picker> 
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
export default {
   components: {
       DatePicker
   },
   data() {
       return {
           date: new Date('2019-07-27').toISOString().slice(0, 10) ,
      };
   },
   methods: {
       pickDate() {
            this.$store.state.dateValue = this.date;
            this.$store.state.dateFirstBool = true
            this.$store.state.dateSecondBool = true
       }
   }
}
</script>

<style>
#picker {
    position: fixed;
    top: 10px;
    left: 5px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    color: #333;
}

#picker input {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    padding: 6px 30px;
    padding-left: 10px;
    font-size: 14px;
    line-height: 1.4;
    background-color: #fff;
    border: 2px solid;
    border-radius: 15px;
}
</style>
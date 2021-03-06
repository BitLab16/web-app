<template>
    <div id="calendar">
        <date-picker v-model="date" lang="en" type="date" format="YYYY-MM-dd"></date-picker>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
    name: 'DatePicker',
    components: {
        DatePicker
    },
    data() {
        return {
            date: ""
        }
    }
}

</script>

<style>
    #calendar date-picker{
        display: none;
        margin: 10px;
        position: fixed;
        width: 1px;
        height: 0px;
    }
</style>

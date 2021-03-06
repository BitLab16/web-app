import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
    sliderValue: "12:00",
    firstBoolean: false,
    secondBoolean: false,
    dateFirstBool: false,
    dateSecontBool: false,
    dateValue: new Date().toISOString().slice(0, 10) 
 },
 getters: {},
 mutations: {},
 actions: {}
});

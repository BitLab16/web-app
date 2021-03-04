import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

import FullCalendar from 'vue-full-calendar'
Vue.use(FullCalendar)

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY',
    libraries: ['visualization', 'places']
  }
});
new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

import * as VueGoogleMaps from 'vue2-google-maps'
//import VueGoogleHeatmap from 'vue-google-heatmap'

Vue.use(VueResource);

Vue.config.productionTip = false
Vue.use(VueGoogleMaps,/* VueGoogleHeatmap, */{
  load: {
    key: 'AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY',
    libraries: ['visualization', 'places']
  }
  /*load: {
    apiKey: 'AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY',
    libraries: ['visualization']
  },*/
});
new Vue({
  render: h => h(App),
}).$mount('#app')

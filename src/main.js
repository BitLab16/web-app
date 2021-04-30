import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDPjpdiS-hafI9F8ap5kegUFu6exQ4fElY",
    libraries: ["places", "visualization"]
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')

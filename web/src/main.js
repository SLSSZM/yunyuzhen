import Vue from 'vue'
import App from './App.vue'
import store from './store'
import http from './network'
import { VueJsonp } from 'vue-jsonp'

Vue.use(VueJsonp)
Vue.prototype.$http = http
Vue.prototype.bus = new Vue()
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

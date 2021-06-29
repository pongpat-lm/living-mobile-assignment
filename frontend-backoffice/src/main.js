import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import "../src/assets/css/reset.css"
import VueAxios from "vue-axios";
import axios from "axios";

import router from './router'
import store from './store'


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


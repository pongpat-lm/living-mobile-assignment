import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/data-table.js'
import "../src/assets/css/reset.css"
import router from './router'

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

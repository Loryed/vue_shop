import Vue from 'vue'
import App from './App.vue'
import router from './router/router' 

import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios //每个组件都可以通过this直接访问到$http，发起axios请求



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

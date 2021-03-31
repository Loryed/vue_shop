import Vue from 'vue'
import App from './App.vue'
import router from './router/router' 

import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios //每个组件都可以通过this直接访问到$http，发起axios请求

//请求拦截。（发起请求之前做些处理）
//在发起axios请求之前必须先调用use回调函数
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token');
  //config是请求对象，必须return config。此时的config已经过预处理（加上了token）
  return config;
})

//乱码处理
// axios.defaults.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8"
// axios.defaults.transformRequest = [function (data) {
//   var newData = "";
//   for (var k in data) {
//       newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
//   }
//   return newData
// }]


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

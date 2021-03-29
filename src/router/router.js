import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

// const routes=[
//   { path: '/', redirect: '/login' }, //当用户访问xxx/时，重新定向至xxx/login.....未实现
//   { path: '/login', component:  Login } //当用户访问xxx/login地址是展示组件
// ]

// const router=new VueRouter({routes})
//var app=new Vue({router}).$mount('#app');




Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' }, //当用户访问xxx/时，重新定向至xxx/login.....未实现
    { path: '/login', component:  Login }, //当用户访问xxx/login地址是展示组件
    { path:'/home',component:Home },
  ]
})

//挂载路由导航守卫
router.beforeEach((to,form,next)=>{

  //to 将要访问的路径
  //from 从哪个路径跳转而来
  //next()放行，next('/login')强制跳转

  if(to.path=='/login') return next();                      //访问login，直接放行
  const token_str=window.sessionStorage.getItem('token');   //获取token
  if(!token_str) return next('/login');                     //没有token，强制跳转
  next();                                                   //有token放行

  //只要token有值就放行，不论真假token。token真假验证是后端做

})

export default router
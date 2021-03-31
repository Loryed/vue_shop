import Vue from 'vue'
import { Button } from 'element-ui'
import {form,formItem} from 'element-ui'
import {Input} from 'element-ui'
import {Message} from 'element-ui'

Vue.use(Button) //设置为全局组件
Vue.use(form)
Vue.use(formItem)
Vue.use(Input)

//主页组件
import {Container,Header,Aside,Main,Menu,Submenu,MenuItem,} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)


Vue.prototype.$message=Message  //挂载为全局组件，$自定义名
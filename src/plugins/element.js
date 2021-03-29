import Vue from 'vue'
import { Button } from 'element-ui'
import {form,formItem} from 'element-ui'
import {Input} from 'element-ui'
import {Message} from 'element-ui'

//主页组件
import {Container,Header,Aside,Main} from 'element-ui'

Vue.use(Button) //设置为全局组件
Vue.use(form)
Vue.use(formItem)
Vue.use(Input)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.prototype.$message=Message  //挂载为全局组件，$自定义名
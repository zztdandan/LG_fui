/* eslint-disable */
import Vue from 'vue'
import login from './login.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.prototype.$ajax=axios;

Vue.use(ElementUI)
new Vue({
  el: '#app',
  render: h => h(login)
})

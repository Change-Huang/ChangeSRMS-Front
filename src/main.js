import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import animate from 'animate.css'
import router from './plugins/vueRouter'
import './plugins/elementUI.js'
import './assets/css/global.css'
import './assets/css/iconfont/iconfont.css'

// axios配置
axios.defaults.baseURL = 'http://localhost:9090'
axios.defaults.headers = { 'Content-Type': 'application/json' }
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

// 生产环境不警告
Vue.config.productionTip = false

// 动画引入
Vue.use(animate)

// 主对象创建
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/login/login.vue'
import LoginComponent from './components/login/main.vue'
import ForgetComponent from './components/login/forget.vue'
import RegistComponent from './components/login/regist.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    component: Login,
    children: [
      { path: '/', component: LoginComponent },
      { path: '/forget', component: ForgetComponent },
      { path: '/regist', component: RegistComponent }
    ]
  }]
})

export default router

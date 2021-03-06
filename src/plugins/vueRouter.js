import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
import LoginComponent from '../components/login/login.vue'
import ForgetComponent from '../components/login/forget.vue'
import RegistComponent from '../components/login/regist.vue'
import EChartsComponent from '../components/index/eCharts.vue'
import SiteManageComponent from '../components/siteManage/siteList.vue'
import UserManageComponent from '../components/userManage/userList.vue'
import AdminManageComponent from '../components/adminManage/adminList.vue'
import ReservationSubmitComponent from '../components/reservationSubmit/siteList.vue'
import HistoryManageComponent from '../components/historyManage/historyList.vue'
import FirstCheckComponent from '../components/firstCheck/firstCheck.vue'
import SecondCheckComponent from '../components/secondCheck/secondCheck.vue'
import KeyManageComponent from '../components/keyManage/keyManageList.vue'

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
  }, {
    path: '/index',
    component: Index,
    children: [
      { path: '/', component: EChartsComponent },
      { path: '/siteManage', component: SiteManageComponent },
      { path: '/userManage', component: UserManageComponent },
      { path: '/adminManage', component: AdminManageComponent },
      { path: '/reservationSubmit', component: ReservationSubmitComponent },
      { path: '/historyManage', component: HistoryManageComponent },
      { path: '/firstCheck', component: FirstCheckComponent },
      { path: '/secondCheck', component: SecondCheckComponent },
      { path: '/keyManage', component: KeyManageComponent }
    ]
  }]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/forget' || to.path === '/regist') return next()
  const isLogin = window.sessionStorage.getItem('isLogin')
  if (isLogin === null || isLogin === false) return next('/')
  next()
})

export default router

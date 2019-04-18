import Vue from 'vue'
import Router from 'vue-router'
import dashboard from './components/dashBoard/dashBoard.vue'
import pti from './components/device/pti.vue'
import alarmsHistoryboard from './components/historyAlarmes/alarmsHistoryBoard.vue'
import usesHistoryBoard from './components/historyUsed/usesHistoryBoard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },{
      path: '/alarmsHistoryboard',
      name:'alarmsHistoryboard',
      component: alarmsHistoryboard
    },
    {
      path: '/usesHistoryBoard',
      name:'usesHistoryBoard',
      component: usesHistoryBoard
    },
    {
      path: '/device/:id',
      name: 'device',
      component: pti
    },
    {
      path:'*',redirect:'/dashboard'
    }
  ]
})

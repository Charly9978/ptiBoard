import Vue from 'vue'
import Router from 'vue-router'
import dashboard from './components/dashBoard.vue'
import pti from './components/pti.vue'
import historyboard from './components/historyBoard.vue'

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
      path: '/historyboard',
      name:'historyboard',
      component: historyboard
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

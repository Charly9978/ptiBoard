import Vue from 'vue'
import Router from 'vue-router'
import dashboard from './components/dashBoard.vue'
import pti from './components/pti.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/device/:id',
      name: 'device',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: pti
    },
    {
      path:'*',redirect:'/dashboard'
    }
  ]
})

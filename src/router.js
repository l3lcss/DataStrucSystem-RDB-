import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Schedules from './views/schedule/Schedules.vue'
import TAschedule from './views/ta/TAschedule'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Schedules',
      name: 'Schedules',
      component: Schedules
    },
    {
      path: '/TAschedule',
      name: 'TAschedule',
      component: TAschedule
    }
  ]
})

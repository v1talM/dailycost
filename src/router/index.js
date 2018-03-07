import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import User from '@/pages/User'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/user',
        name: 'user',
        component: User
    }
  ]
})

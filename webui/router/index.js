import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Auth from '@/components/Auth'

Vue.use(Router)

export default new Router({
  mode: 'history', // to remove hashbang
  routes: [{
    path: '/',
    name: 'Main',
    component: Main,
    props: true
  }, {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }]
})

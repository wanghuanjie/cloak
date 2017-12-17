import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import RoleList from '@/components/role/list'
import PrivilegeList from '@/components/privilege/list'

import UserList from '@/components/user/list'
import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'

import Statistics from '@/components/statistics/user'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {path: '/dashboard', component: Dashboard}
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {path: '/user/list', component: UserList}
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {path: '/role/list', component: RoleList}
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {path: '/privilege/list', component: PrivilegeList}
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {path: 'statistics/user', component: Statistics}
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {path: '/user/profile', component: UserProfile},
        {path: '/user/changepwd', component: UserChangePwd}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router

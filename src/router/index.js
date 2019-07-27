import AddrList from '@/components/AddrList'
import Admin from '@/admin/admin.vue'
import AdminDelete from '@/admin/AdminDelete'
import AdminLogin from '@/admin/AdminLogin'
import AdminLottery from '@/admin/AdminLottery'
import AdminMessage from '@/admin/AdminMessage'
import AdminPay from '@/admin/AdminPay'
import AdminRaffle from '@/admin/AdminRaffle'
import AdminRanking from '@/admin/AdminRanking'
import AdminRegis from '@/admin/AdminRegis'
import AdminUser from '@/admin/AdminUser'
import Detail from '@/components/Detail'
import Login from '@/components/Login'
import Loginup from '@/components/Loginup'
import Notice from '@/components/Notice'
import NoticeDetail from '@/components/NoticeDetail'
import Parent from '@/admin/parent'
import Register from '@/components/Register'
import Router from 'vue-router'
import Userinfo from '@/components/Userinfo'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/page/',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/loginup',
      name: 'Loginup',
      component: Loginup
    },
    {
      path: '/addrList',
      name: 'AddrList',
      component: AddrList
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/userinfo',
      name: 'Userinfo',
      component: Userinfo
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/noticedetail',
      name: 'NoticeDetail',
      component: NoticeDetail
    },
    {
      path: '/adminLogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path:'/admin',
      name:'admin',
      component:Admin,
      children:[
        {
          path:'/',
          name: 'AdminLogin',
          component: AdminLogin
        },
        {
          path: 'user_management',
          name: 'AdminUser',
          component: AdminUser
        },
        {
          path: 'lottery',
          name: 'AdminLottery',
          component: AdminLottery
        },
        {
          path: 'delete',
          name: 'AdminDelete',
          component: AdminDelete
        },
        {
          path: 'payment_management',
          name: 'AdminPay',
          component: AdminPay
        },
        {
          path: 'payregis_management',
          name: 'AdminRegis',
          component: AdminRegis
        },
        {
          path: 'message',
          name: 'AdminMessage',
          component: AdminMessage
        },
        {
          path: 'raffle',
          name: 'AdminRaffle',
          component: AdminRaffle
        },
        {
          path: 'rankinglist',
          name: 'AdminRanking',
          component: AdminRanking
        },
        {
          path: 'parent',
          name: 'Parent',
          component: Parent
        }
      ]
    },
  ]
})

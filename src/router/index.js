import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
// import Signin from '@/components/Signin'
// import Userinfo from '@/components/Userinfo'
import Chat from '@/components/Chat'
import Online from '@/components/Online'
import Detail from '@/components/Detail'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: to => {
        if (document.cookie.indexOf('user=') === -1) {
          return { name: 'signup' }
        } else {
          return { name: 'online' }
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    // {
    //   path: '/signin',
    //   name: 'signin',
    //   component: Signin
    // },
    // {
    //   path: '/userinfo',
    //   name: 'userinfo',
    //   component: Userinfo
    // }
    {
      path: '/chat',
      component: Chat,
      children: [
        {
          path: 'online',
          name: 'online',
          component: Online
        },
        {
          path: '',
          component: Online
        },
        {
          path: 'detail',
          name: 'detail',
          component: Detail
        }
      ]
    }
  ]
})


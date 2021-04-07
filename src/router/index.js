import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import SignIn from '@/components/SignIn'
import firebase from "firebase";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/SignIn',
        name: 'SignIn',
        component: SignIn,
        meta: {
            guest: true
        }
    },
    {
      path: '/tutor',
      name: 'tutor',
      component: () => import('../components/Tutor.vue')
    },
    {
      path: '/tutee',
      name: 'tutee',
      component: () => import('../components/Tutee.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          next({
            path: "/SignIn",
          })
        } else {
          next()
        }
      })
    } else {
      next()
    }
  })
  
  export default router
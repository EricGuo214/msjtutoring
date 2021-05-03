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
      path: '/ApplyToBeTutor',
      name: 'ApplyToBeTutor',
      component: () => import('../components/ApplyToBeTutor.vue')
    },
    {
      path: '/OurTutors',
      name: 'OurTutors',
      component: () => import('../components/OurTutors.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('../components/Question.vue')
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
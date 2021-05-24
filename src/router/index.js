import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import SignIn from "@/components/SignIn";
import firebase from "firebase";
import ApplyToBeTutor from "@/components/ApplyToBeTutor";
import TutorInbox from "@/components/TutorInbox";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/SignIn",
    name: "SignIn",
    component: SignIn,
    meta: {
      guest: true,
    },
  },
  {
    path: "/ApplyToBeTutor",
    name: "ApplyToBeTutor",
    component: ApplyToBeTutor,
    meta: {
      auth: true,
    },
  },
  {
    path: "/OurTutors",
    name: "OurTutors",
    component: () => import("../components/OurTutors.vue"),
  },
  {
    path: "/questions",
    name: "questions",
    component: () => import("../components/Questions.vue"),
  },
  {
    path: "/askquestion",
    name: "askquestion",
    component: () => import("../components/AskQuestion.vue"),
  },

  {
    path: "/replies/:id",
    name: "Replies",
    component: () => import("../components/Replies.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../components/test.vue"),
  },
  {
    path: "/TutorInbox",
    name: "TutorInbox",
    component: TutorInbox,
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        next({
          path: "/SignIn",
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;

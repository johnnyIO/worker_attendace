import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/Profile.vue";
import Greetings from "../views/Greetings.vue";
import GoodBye from "../views/GoodBye.vue";
import Admin from "../views/Admin.vue";
import AdminIndex from "../views/AdminIndex.vue";
import SingleDate from "../views/SingleDate.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },

    {
      path: "/generate",
      name: "generate",
      component: Profile,
    },

    {
      path: "/greet",
      name: "greet",
      component: Greetings,
    },

    {
      path: "/goodbye",
      name: "goodbye",
      component: GoodBye,
    },

    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },

    {
      path: "/adminindex",
      name: "adminindex",
      component: AdminIndex,
    },

    {
      path: "/singledate/:id",
      name: "singledate",
      component: SingleDate,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Tutorial from "../views/Tutorial.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import CategoriesIndex from "../views/CategoriesIndex.vue";
import CategoriesNew from "../views/CategoriesNew.vue";
import CategoriesShow from "../views/CategoriesShow.vue";
import HabitsIndex from "../views/HabitsIndex.vue";
import HabitsShow from "../views/HabitsShow.vue";
import HabitsNew from "../views/HabitsNew.vue";
import UsersDeleteConfirm from "../views/UsersDeleteConfirm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tutorial",
    name: "Tutorial",
    component: Tutorial,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/categories",
    name: "CategoriesIndex",
    component: CategoriesIndex,
  },
  {
    path: "/categories/new",
    name: "CategoriesNew",
    component: CategoriesNew,
  },
  {
    path: "/categories/:id",
    name: "CategoriesShow",
    component: CategoriesShow,
  },
  {
    path: "/habits",
    name: "HabitsIndex",
    component: HabitsIndex,
  },
  {
    path: "/habits/new",
    name: "HabitsNew",
    component: HabitsNew,
  },
  {
    path: "/habits/:id",
    name: "HabitsShow",
    component: HabitsShow,
  },
  {
    path: "/users/delete_confirm",
    name: "UsersDeleteConfirm",
    component: UsersDeleteConfirm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

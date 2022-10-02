import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/configs/firebase";

const requiredAuth = (to, from, next) => {
  const userData = auth.currentUser;
  if (!userData) next({ name: "intro", params: {} });
  else next();
};

const checkAuth = (to, from, next) => {
  const userData = auth.currentUser;
  if (userData) next({ name: "home", params: {} });
  else next();
};
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/logout",
    name: "logout",
    component: () =>
      import(/*webpackChunkName : "logout" */ "@/views/Logout.vue"),
  },
  {
    path: "/sign-up",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/intro",
    name: "intro",
    component: () =>
      import(/* webpackChunkName: "intro" */ "@/views/IntroScreen.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import(/* webpackChunkName: "cart" */ "@/views/Cart.vue"),
    meta: {
      layout: "auth",
    },
    beforeEnter: requiredAuth,
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: () =>
      import(/* webpackChunkName: "wishlist" */ "@/views/WishList.vue"),
    meta: {
      layout: "auth",
    },
    beforeEnter: requiredAuth,
  },
  {
    path: "/wallet",
    name: "wallet",
    component: () =>
      import(/* webpackChunkName: "wallet" */ "@/views/MyWallet.vue"),
    meta: {
      layout: "auth",
    },
    beforeEnter: requiredAuth,
  },
  {
    path: "/PlantDetail/:id",
    name: "plant-detail",
    component: () =>
      import(/* webpackChunkName: "plant-detail" */ "@/views/PlantDetail.vue"),
    beforeEnter: requiredAuth,
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/UserProfile.vue"),
    beforeEnter: requiredAuth,
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/check-out",
    name: "checkout",
    component: () =>
      import(/* webpackChunkName: "checkout" */ "@/views/CheckoutPage.vue"),
    beforeEnter: requiredAuth,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "not found" */ "@/views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// firebase@8.10.0

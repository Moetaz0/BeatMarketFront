import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Verify from "../views/verificationCode.vue";
import Home from "../views/Home.vue";
import Musicians from "../views/Musicians.vue";
import Tracks from "../views/Tracks.vue";
import Settings from "../views/Settings.vue";
import Privacy from "../views/Privacy.vue";
import Terms from "../views/Terms.vue";
import License from "../views/License.vue";
// TODO: Create Upload.vue component
// import Upload from "../views/Upload.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/signup", component: SignUp, name: "SignUp" },
  // Temporary placeholder for upload route until component is created
  {
    path: "/upload",
    name: "Upload",
    redirect: { name: "Home" },
    meta: { requiresAuth: true },
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    name: "ForgotPassword",
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
    props: (route) => ({ email: route.query.email }),
  },
  {
    path: "/home",
    redirect: { name: "Home" },
  },
  {
    path: "/tracks",
    component: Tracks,
    name: "Tracks",
    meta: { requiresAuth: true },
  },
  {
    path: "/musicians",
    component: Musicians,
    name: "Musicians",
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    component: Settings,
    name: "Settings",
    meta: { requiresAuth: true },
  },
  { path: "/privacy", component: Privacy, name: "Privacy" },
  { path: "/terms", component: Terms, name: "Terms" },
  { path: "/license", component: License, name: "License" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard for auth protection
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!(
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to home if trying to access protected route
    next({ name: "Home" });
  } else if ((to.name === "Login" || to.name === "SignUp") && isLoggedIn) {
    // Redirect to home if already logged in and trying to access auth pages
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;

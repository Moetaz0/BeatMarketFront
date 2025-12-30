import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Verify from "../views/verificationCode.vue";
import Home from "../views/Home.vue"; 
import Musicians from "../views/Musicians.vue";
import Tracks from "../views/Tracks.vue";
import Settings from "../views/Settings.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/signup", component: SignUp, name: "SignUp" },
  { 
    path: "/forgot-password", 
    component: ForgotPassword, 
    name: "ForgotPassword" 
  },
  { 
    path: "/verify", 
    name: "Verify", 
    component: Verify,
    props: (route) => ({ email: route.query.email }),
  },
  { 
    path: "/home", 
    component: Home, 
    name: "Home",
    
  },
  { path: "/tracks", component: Tracks, name: "Tracks" },
  { path: "/musicians", component: Musicians, name: "Musicians" },
  { path: "/settings", component: Settings, name: "Settings" },
  // Add more protected routes here later (e.g. /profile, /upload, etc.)
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard for auth protection
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login if trying to access protected route
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
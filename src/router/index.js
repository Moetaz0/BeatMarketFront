import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Verify from "../views/verificationCode.vue";

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/verify",
    name: "verify",
    component: Verify,
    props: (route) => ({ email: route.query.email }),
  },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/forgot-password", component: ForgotPassword },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

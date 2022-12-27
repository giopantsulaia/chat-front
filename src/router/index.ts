import { createRouter, createWebHistory } from "vue-router";
import RegisterForm from "../components/forms/RegisterForm.vue";
import LoginForm from "../components/forms/LoginForm.vue";
import NotFound from "../components/UI/NotFound.vue";
import VerifyEmail from "../pages/VerifyEmail.vue";
import { redirectIfAuthenticated } from "./guards";
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  history: createWebHistory(),
  routes: [
    {
      path: "/:NotFound(.*)",
      name: "not-found",
      component: NotFound,
    },
    {
      path: "/registration",
      name: "registration",
      component: RegisterForm,
      beforeEnter: [redirectIfAuthenticated],
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
      beforeEnter: [redirectIfAuthenticated],
    },
    {
      path: "/verify",
      name: "verify",
      component: VerifyEmail,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: MainDashboard,
    },
  ],
});

export default router;

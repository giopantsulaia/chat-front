import { createRouter, createWebHistory } from "vue-router";
import NotFound from "@/components/UI/NotFound.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";
import MainDashboard from "@/pages/MainDashboard.vue";
import MyProfile from "@/pages/MyProfile.vue";
import UserProfile from "@/pages/UserProfile.vue";
import VerifyEmail from "@/pages/VerifyEmail.vue";
import { checkAuthentication, redirectIfAuthenticated } from "./guards";
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
      path: "/",
      name: "home",
      component: MainDashboard,
      beforeEnter: [checkAuthentication],
    },
    {
      path: "/profile",
      name: "profile",
      component: MyProfile,
      beforeEnter: [checkAuthentication],
    },
    {
      path: "/users/:id",
      name: "user-profile",
      props: true,
      component: UserProfile,
      beforeEnter: [checkAuthentication],
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import RegisterForm from "../components/forms/RegisterForm.vue";
import NotFound from "../components/UI/NotFound.vue";
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
    },
  ],
});

export default router;

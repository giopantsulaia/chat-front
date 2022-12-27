import router from "../router/index.js";
import { defineStore } from "pinia";
import axios from "../config/axios/index.js";
import { useUserStore } from "./user.js";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false as boolean,
  }),
  actions: {
    tryLogin() {
      const validToken =
        localStorage.getItem("access_token") &&
        Number(localStorage.getItem("expires_at")) >
          Math.round(Date.now() / 1000);

      if (validToken) {
        this.getUserData();
        this.authenticated = true;
        router.push({ name: "home" });
      } else {
        localStorage.clear();
      }
    },
    getUserData() {
      const userStore = useUserStore();
      axios
        .get("/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          userStore.name = res.data.user.name;
          userStore.last_name = res.data.user.last_name;
          userStore.email = res.data.user.email;
        });
    },
    logout() {
      axios
        .post("logout", null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          localStorage.clear();
          this.authenticated = false;
          router.push({ name: "login" });
        });
    },
  },
});

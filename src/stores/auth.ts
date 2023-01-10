import { defineStore } from "pinia";
import axios from "../config/axios/index.js";
import router from "../router/index.js";
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
          userStore.firstName = res.data.user.first_name;
          userStore.lastName = res.data.user.last_name;
          userStore.email = res.data.user.email;
          userStore.birthDate = res.data.user.birth_date;
          userStore.phone = res.data.user.phone;
          userStore.gender = res.data.user.gender;
          userStore.auth_id = res.data.user.id;
          userStore.friendsAmount = res.data.user.number_of_friends;
          userStore.avatar = res.data.user.avatar;
        })
        .catch(() => {
          this.authenticated = false;
          localStorage.clear();
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

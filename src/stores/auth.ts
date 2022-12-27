import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false as boolean,
  }),
  actions: {
    tryLogin() {
      if (
        localStorage.getItem("access_token") &&
        Number(localStorage.getItem("expires_at")) >
          Math.round(Date.now() / 1000)
      ) {
        this.authenticated = true;
      } else {
        localStorage.clear();
      }
    },
  },
});

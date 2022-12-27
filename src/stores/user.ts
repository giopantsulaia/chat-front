import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "" as string,
    last_name: "" as string,
    email: "" as string,
  }),
  actions: {},
});

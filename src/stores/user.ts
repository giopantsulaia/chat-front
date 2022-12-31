import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "" as string,
    lastName: "" as string,
    email: "" as string,
    phone: "" as string,
    birthDate: "" as string,
  }),
  actions: {},
});

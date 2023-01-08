import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    firstName: "" as string,
    lastName: "" as string,
    email: "" as string,
    phone: "" as string,
    birthDate: "" as string,
    gender: "" as string,
    auth_id: 0 as number,
    friendsAmount: 0 as number,
  }),
  actions: {},
});

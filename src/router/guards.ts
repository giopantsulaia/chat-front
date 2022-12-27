import { useAuthStore } from "../stores/auth.js";

export function redirectIfAuthenticated() {
  const store = useAuthStore();
  if (store.authenticated) {
    return "/dashboard";
  }
}

import { useAuthStore } from "../stores/auth.js";

export function redirectIfAuthenticated() {
  const store = useAuthStore();
  if (store.authenticated) {
    return "/";
  }
}

export function checkAuthentication() {
  const store = useAuthStore();
  if (!store.authenticated) {
    return "/login";
  }
}

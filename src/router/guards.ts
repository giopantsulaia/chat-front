import { useAuthStore } from "../stores/auth.js";

export function redirectIfAuthenticated() {
  const store = useAuthStore();
  if (store.authenticated) {
    return "/";
  }
}

export function checkAuthentication() {
  const store = useAuthStore();
  const expired =
    Number(localStorage.getItem("expires_at")) < Math.round(Date.now() / 1000);

  if (!store.authenticated) {
    return "/login";
  }
  if (expired) {
    store.logout();
  }
}

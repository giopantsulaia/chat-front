import axios from "axios";
import { useAuthStore } from "../../stores/auth";
import router from "../../router";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
});
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      const authStore = useAuthStore();
      authStore.authenticated = false;
      localStorage.clear();
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

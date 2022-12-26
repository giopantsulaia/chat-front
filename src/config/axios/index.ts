import axios from "axios";
import { useAuthStore } from "../../stores/auth.js";
import router from "../../router/index.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: 3000,
});
// axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: any) {
    if (error.response.status == 401) {
      const authStore = useAuthStore();
      authStore.authenticated = false;
      router.push({ name: "notAuthorized" });
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

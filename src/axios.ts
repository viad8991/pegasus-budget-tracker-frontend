import axios from "axios";
import { useAuthStore } from "./store/auth/store/authStore";

axios.interceptors.request.use(
  async function (config) {
    const store = useAuthStore();
    const token = store.token;

    if (token) {
      config.headers["Authorization"] = token;
    }

    config.headers["Content-Type"] = "application/json";
    config.baseURL = "http://localhost:8080/";

    return config;
  },

  function (error) {
    console.log(error);
  },
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 401) {
      console.log(error);
    } else if (error?.response?.status === 403) {
      console.log(error);
    }
    throw error;
  },
);

export default axios;

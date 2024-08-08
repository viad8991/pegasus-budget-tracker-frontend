import axios from "axios";
import {useAuthStore} from "../store/auth/authStore";

axios.interceptors.request.use(
    async function (config) {
        config.baseURL = "http://localhost:8080";

        const store = useAuthStore();
        const token = store.token;

        if (token && token !== "stub") {
            config.headers["Authorization"] = token;
        }
        config.headers["Content-Type"] = "application/json";
        console.log("config", config)
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

/* SAVE:
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8080/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Добавление интерсепторов
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token"); // Можно заменить на вызов из store
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Логика при неавторизованном доступе
        } else if (error.response?.status === 403) {
          // Логика при доступе запрещена
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

export default new ApiClient();
*/

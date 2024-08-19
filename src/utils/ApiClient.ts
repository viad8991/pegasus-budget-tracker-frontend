// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import axios from "./axios";

class ApiClient {
  public async get<T>(url: string, config?: {}): Promise<T> {
    const response = await axios.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: unknown, config?: {}): Promise<T> {
    const response = await axios.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown, config?: {}): Promise<T> {
    const response = await axios.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: {}): Promise<T> {
    const response = await axios.delete<T>(url, config);
    return response.data;
  }

  /*
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
  }*/

}

export default new ApiClient();

import axios from "axios";
import { showToast } from "nextjs-toast-notify";

export const baseApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await baseApi
          .get<{
            accessToken: string;
          }>("auth/refresh", { withCredentials: true })
          .then(({ data }) => data);

        localStorage.setItem("accessToken", accessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return authApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const errorHandling = (error: unknown) => {
  if (axios.isAxiosError<{ message: string }>(error)) {
    const serverMessage = error.response?.data?.message;
    if (serverMessage) {
      showToast.error(serverMessage, {
        position: "top-center",
      });
      return;
    }
  }

  if (error instanceof Error) {
    showToast.error(error.message, { position: "top-center" });
  }
};

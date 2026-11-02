import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "./tokenStorage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({ baseURL: BASE_URL, timeout: 15000 });

let onSessionExpired: () => void = () => {};
export const setOnSessionExpired = (fn: () => void) => {
  onSessionExpired = fn;
};

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = await tokenStorage.getRefresh();
  if (!refreshToken) throw new Error("No refresh token");

  const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
  await tokenStorage.save(data.accessToken, data.refreshToken);
  return data.accessToken;
};

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const isAuthRoute = original?.url?.startsWith("/auth/");
    if (error.response?.status !== 401 || !original || original._retry || isAuthRoute) {
      return Promise.reject(error);
    }
    original._retry = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const newToken = await refreshPromise;

      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (refreshError) {
      await tokenStorage.clear();
      onSessionExpired();
      return Promise.reject(refreshError);
    }
  },
);

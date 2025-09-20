import axios from "axios";
import type { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) localStorage.removeItem("token");
    return Promise.reject(err);
  }
);

export type ApiResult<T = any> =
  | { ok: true; data: T }
  | { ok: false; status?: number; error: string };

export async function request<T = any>(
  promise: Promise<AxiosResponse<any>>
): Promise<ApiResult<T>> {
  try {
    const res = await promise;
    const data = res.data?.data ?? res.data;
    return { ok: true, data };
  } catch (err: any) {
    const status = err?.response?.status;
    const error = err?.response?.data?.error || "Network error";
    return { ok: false, status, error };
  }
}

export default api;

import axios from "axios";
import { getAccessToken, clearTokens, setTokens } from "@/utils/tokenStorage";
const api = axios.create({
  baseURL: "https://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data, headers) => {
      // Keep FormData untouched (for uploads), stringify plain objects to valid JSON
      if (data instanceof FormData) return data;
      if (typeof data === "string") return data;
      if (data === undefined || data === null) return "{}";
      return JSON.stringify(data);
    },
  ],
});

// Add JWT automatically to headers
api.interceptors.request.use((config) => {
  // Let the browser set proper multipart boundaries for FormData
  if (config.data instanceof FormData) {
    try {
      console.log(
        "Request has FormData, cleaning Content-Type headers before send."
      );
      // Ensure headers object exists
      config.headers = config.headers || {};
      // Remove common header locations axios might use
      try {
        delete config.headers["Content-Type"];
      } catch (e) {}
      try {
        delete config.headers["content-type"];
      } catch (e) {}
      try {
        delete config.headers.common &&
          delete config.headers.common["Content-Type"];
      } catch (e) {}
      try {
        delete config.headers.post &&
          delete config.headers.post["Content-Type"];
      } catch (e) {}
      // If using AxiosHeaders helper, set to undefined to allow browser to set boundary
      config.headers["Content-Type"] = undefined;
    } catch (e) {
      console.warn(
        "Failed to clear Content-Type header for FormData request",
        e
      );
    }
  }

  const token = getAccessToken();
  if (token) {
    // Ensure headers exists before assigning
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    console.log("[API Request] Token length:", token.length);
    console.log("[API Request] Token preview:", token.substring(0, 50) + "...");
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isRefreshCall = requestUrl.includes("/api/auth/refresh");

    // Avoid infinite refresh loops and do not retry refresh endpoint itself
    if (status === 401 && !isRefreshCall && !error.config?._retry) {
      try {
        error.config._retry = true;

        const refresh =
          localStorage.getItem("refresh_token") ||
          sessionStorage.getItem("refresh_token");

        if (!refresh) {
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const res = await api.post("/api/auth/refresh", {
          refresh_token: refresh,
        });

        const remember = !!localStorage.getItem("refresh_token");
        // Backend returns 'token' not 'access_token'
        const newAccessToken = res.data.token || res.data.access_token;
        const newRefreshToken = res.data.refresh_token || refresh;

        setTokens(newAccessToken, newRefreshToken, remember);
        error.config.headers = error.config.headers || {};
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(error.config);
      } catch {
        clearTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";
import { getAccessToken, clearTokens } from "@/utils/tokenStorage";
const api = axios.create({
  baseURL: "https://127.0.0.1:8000", // your Symfony server
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically to headers
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refresh =
          localStorage.getItem("refresh_token") ||
          sessionStorage.getItem("refresh_token");

        const res = await axios.post("/api/token/refresh", {
          refresh_token: refresh,
        });

        setTokens(res.data.access_token, refresh, true);
        error.config.headers.Authorization = `Bearer ${res.data.access_token}`;

        return axios(error.config);
      } catch {
        clearTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

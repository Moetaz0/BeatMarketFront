import axios from "axios";

const api = axios.create({
  baseURL: "https://127.0.0.1:8000", // your Symfony server
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT automatically to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

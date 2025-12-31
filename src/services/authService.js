import api from "./api"; // <-- your axios instance

export default {
  // REGISTER
  register(payload) {
    return api.post("/api/auth/register", payload);
  },

  // LOGIN
  login(payload) {
    return api.post("/api/auth/login", payload);
  },

  // REFRESH TOKEN
  refreshToken(refreshToken) {
    return api.post("/api/auth/refresh", {
      refresh_token: refreshToken,
    });
  },

  // FORGOT PASSWORD
  forgot(email) {
    return api.post("/api/auth/forgot", { email });
  },

  // RESET PASSWORD
  reset(payload) {
    return api.post("/api/auth/reset", payload);
  },

  // VERIFY CODE
  verify(payload) {
    // payload should contain { email, code }
    return api.post("/api/auth/verify", payload);
  },

  // LOGOUT
  logout(refreshToken) {
    return api.post("/api/auth/logout", {
      refresh_token: refreshToken,
    });
  },
};

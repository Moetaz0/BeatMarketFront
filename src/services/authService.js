import api from "./api"; // <-- your axios instance

export default {
  // REGISTER
  register(payload) {
    return api.post("/auth/register", payload);
  },

  // LOGIN
  login(payload) {
    return api.post("/auth/login", payload);
  },

  // REFRESH TOKEN
  refreshToken(refreshToken) {
    return api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
  },

  // FORGOT PASSWORD
  forgot(email) {
    return api.post("/auth/forgot", { email });
  },

  // RESET PASSWORD
  reset(payload) {
    return api.post("/auth/reset", payload);
  },

  // LOGOUT
  logout(refreshToken) {
    return api.post("/auth/logout", {
      refresh_token: refreshToken,
    });
  },
};

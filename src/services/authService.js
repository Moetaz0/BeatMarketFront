import api from "./api";
import { getAccessToken } from "../utils/tokenStorage";
import { h } from "vue";
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
    return api.post("/api/auth/verify", payload);
  },

  // LOGOUT
  logout(refreshToken) {
    return api.post("/api/auth/logout", {
      refresh_token: refreshToken,
    });
  },

  // GET USER PROFILE
  getProfile() {
    return api.get("/api/user/profile");
  },

  // UPDATE USER SETTINGS
  updateSettings(payload) {
    // Try PUT directly with FormData (some backends support this)
    return api.put("/api/user/settings", payload);
  },

  // CHANGE PASSWORD
  changePassword(payload) {
    return api.put("/api/user/security/password", payload);
  },

  // CHANGE EMAIL
  changeEmail(payload) {
    return api.put("/api/user/security/email", payload);
  },

  // VERIFY EMAIL CHANGE
  verifyEmailChange(payload) {
    return api.post("/api/user/security/email/verify", payload);
  },

  // DELETE ACCOUNT
  deleteAccount(payload) {
    return api.delete("/api/user/account", { data: payload });
  },

  // GET SECURITY OVERVIEW
  getSecurityOverview() {
    return api.get("/api/user/security");
  },
};

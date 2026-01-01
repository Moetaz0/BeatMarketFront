// store.js
import { reactive, computed } from "vue";
import { getAccessToken, clearTokens } from "./src/utils/tokenStorage";

// Helper functions to persist user data
const saveUserData = (user, email) => {
  const storage = localStorage.getItem("access_token")
    ? localStorage
    : sessionStorage;
  if (user) {
    storage.setItem("user_data", JSON.stringify(user));
  }
  if (email) {
    storage.setItem("user_email", email);
  }
};

const getUserData = () => {
  const userData =
    localStorage.getItem("user_data") || sessionStorage.getItem("user_data");
  return userData ? JSON.parse(userData) : null;
};

const getUserEmail = () => {
  return (
    localStorage.getItem("user_email") || sessionStorage.getItem("user_email")
  );
};

const state = reactive({
  email: null,
  user: null,
  isAuthenticated: false,
});

// Check if user is authenticated on load and restore user data
const token = getAccessToken();
if (token) {
  state.isAuthenticated = true;
  state.user = getUserData();
  state.email = getUserEmail();
}

export const useAuthStore = () => {
  const setEmail = (email) => {
    state.email = email;
    saveUserData(state.user, email);
  };

  const setUser = (user) => {
    state.user = user;
    state.isAuthenticated = true;
    // Keep email in sync for navbar/account display
    if (user?.email) {
      state.email = user.email;
    }
    saveUserData(user, state.email);
  };

  const logout = () => {
    state.user = null;
    state.isAuthenticated = false;
    state.email = null;
    clearTokens();
    // Clear user data from storage
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_email");
    sessionStorage.removeItem("user_data");
    sessionStorage.removeItem("user_email");
  };

  const isAuthenticated = computed(() => state.isAuthenticated);
  const currentUser = computed(() => state.user);

  return {
    state,
    setEmail,
    setUser,
    logout,
    isAuthenticated,
    currentUser,
  };
};

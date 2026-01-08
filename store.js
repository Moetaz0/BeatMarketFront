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

// Cart state
const cartState = reactive({
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
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

// Cart management
export const useCartStore = () => {
  const addToCart = (beat) => {
    const existingItem = cartState.items.find((item) => item.id === beat.id);

    if (!existingItem) {
      cartState.items.push({
        id: beat.id,
        title: beat.title,
        producer: beat.producer,
        price: beat.price,
        cover: beat.cover,
        fileUrl: beat.fileUrl,
        licenseName: beat.licenseName,
        licenseId: beat.licenseId || beat.license?.id || null,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
      localStorage.setItem("cart", JSON.stringify(cartState.items));
    }
  };

  const removeFromCart = (beatId) => {
    cartState.items = cartState.items.filter((item) => item.id !== beatId);
    localStorage.setItem("cart", JSON.stringify(cartState.items));
  };

  const isInCart = (beatId) => {
    return cartState.items.some((item) => item.id === beatId);
  };

  const clearCart = () => {
    cartState.items = [];
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const cartItems = computed(() => cartState.items);
  const cartCount = computed(() => cartState.items.length);

  return {
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
    cartItems,
    cartCount,
  };
};

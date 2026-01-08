import api from "./api";

const normalizePaymentMethod = (raw) => {
  if (!raw) return null;

  // Backend addPaymentMethod returns: { id, type, card: { brand, last4, expMonth, expYear } }
  // Some list endpoints might return: { id, type, last4, brand, expMonth, expYear }
  const card = raw.card || {};

  return {
    id: raw.id,
    type: raw.type || card.type || "card",
    brand: raw.brand || card.brand || null,
    last4: raw.last4 || card.last4 || null,
    expMonth: raw.expMonth || card.expMonth || card.exp_month || null,
    expYear: raw.expYear || card.expYear || card.exp_year || null,
    // UI uses this optionally
    default: !!raw.default,
  };
};

const walletService = {
  // Get wallet information
  getWallet: async () => {
    try {
      const response = await api.get("/api/wallet");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch wallet:", error);
      throw error;
    }
  },

  // Get wallet statistics
  getStats: async () => {
    try {
      const response = await api.get("/api/wallet/stats");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch wallet stats:", error);
      throw error;
    }
  },

  // Get wallet transactions
  getTransactions: async (limit = 50, offset = 0) => {
    try {
      const response = await api.get("/api/wallet/transactions", {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  },

  // Deposit funds
  deposit: async (amount, paymentMethodId) => {
    try {
      const response = await api.post("/api/wallet/deposit", {
        amount,
        paymentMethodId,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to deposit funds:", error);
      throw error;
    }
  },

  // Withdraw funds
  withdraw: async (amount, bankAccountId) => {
    try {
      const response = await api.post("/api/wallet/withdraw", {
        amount,
        bankAccountId,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to withdraw funds:", error);
      throw error;
    }
  },

  // Add payment method
  addPaymentMethod: async (paymentMethodId) => {
    try {
      if (!paymentMethodId) {
        throw new Error("paymentMethodId is required");
      }

      console.log("[walletService] addPaymentMethod", {
        paymentMethodId,
      });

      const response = await api.post("/api/wallet/payment-methods", {
        paymentMethodId,
        // Some backends use snake_case
        payment_method_id: paymentMethodId,
      });
      const data = response.data;
      const normalized = normalizePaymentMethod(data);
      if (normalized) return { ...normalized, message: data?.message };
      return data;
    } catch (error) {
      console.error("Failed to add payment method:", error);
      throw error;
    }
  },

  // Remove payment method
  removePaymentMethod: async (id) => {
    try {
      const response = await api.delete(`/api/wallet/payment-methods/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to remove payment method:", error);
      throw error;
    }
  },

  // List payment methods
  listPaymentMethods: async () => {
    try {
      const response = await api.get("/api/wallet/payment-methods");
      const data = response.data;
      // Backend may return an array directly, or wrap it
      const list =
        (Array.isArray(data) && data) ||
        (Array.isArray(data?.paymentMethods) && data.paymentMethods) ||
        (Array.isArray(data?.data) && data.data) ||
        [];

      return list.map(normalizePaymentMethod).filter(Boolean);
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
      throw error;
    }
  },
};

export default walletService;

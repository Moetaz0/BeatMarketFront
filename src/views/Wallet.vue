<template>
  <SuccessToast :message="successMessage" :show="showSuccess" />
  <ErrorToast
    :message="errorMessage"
    :show="showError"
    @close="showError = false"
  />

  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <!-- Full-page loading state -->
    <div v-if="loading" class="flex items-center justify-center py-16 px-4">
      <div class="text-center">
        <svg
          class="animate-spin h-8 w-8 text-red-600 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p class="text-gray-300">Loading your wallet...</p>
      </div>
    </div>

    <div v-else class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Wallet</h1>
        <p class="text-gray-400">Manage your balance and payment methods</p>
      </div>

      <div
        v-if="loadError"
        class="mb-6 p-4 rounded-lg border border-gray-800 bg-gray-900"
      >
        <p class="text-red-400 text-sm">{{ loadError }}</p>
      </div>

      <!-- Balance Card -->
      <div class="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 mb-8">
        <p class="text-red-100 text-sm mb-2">Available Balance</p>
        <h2 class="text-4xl font-bold mb-4">${{ balance }}</h2>
        <div class="flex gap-4">
          <button
            @click="showWithdrawModal = true"
            class="px-6 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Withdraw
          </button>
          <button
            @click="showDepositModal = true"
            class="px-6 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition"
          >
            Add Funds
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <p class="text-gray-400 text-sm mb-2">Earnings</p>
          <h3 class="text-2xl font-bold">${{ earnings }}</h3>
          <p class="text-gray-500 text-xs mt-2">This month</p>
        </div>
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <p class="text-gray-400 text-sm mb-2">Spent</p>
          <h3 class="text-2xl font-bold">${{ spent }}</h3>
          <p class="text-gray-500 text-xs mt-2">This month</p>
        </div>
        <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <p class="text-gray-400 text-sm mb-2">Total Transactions</p>
          <h3 class="text-2xl font-bold">{{ totalTransactions }}</h3>
          <p class="text-gray-500 text-xs mt-2">All time</p>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold">Payment Methods</h3>
          <button
            @click="openAddPaymentModal"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition"
          >
            + Add Payment Method
          </button>
        </div>

        <div v-if="paymentMethods.length === 0" class="text-center py-8">
          <p class="text-gray-400">No payment methods added yet</p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            class="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-8 bg-gray-700 rounded flex items-center justify-center"
              >
                <svg
                  class="w-6 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1H3zm0 2h14v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-semibold">{{ method.type }}</p>
                <p class="text-gray-400 text-sm">•••• {{ method.last4 }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span
                v-if="method.default"
                class="px-2 py-1 bg-green-600/30 text-green-400 text-xs rounded"
              >
                Default
              </span>
              <button
                @click="removePaymentMethod(method.id)"
                class="text-gray-400 hover:text-red-400 transition"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Withdraw Modal -->
    <div
      v-if="showWithdrawModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800"
      >
        <h3 class="text-xl font-semibold mb-4">Withdraw Funds</h3>
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>
            <input
              v-model="withdrawAmount"
              type="number"
              placeholder="0.00"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
            />
            <p class="text-gray-400 text-xs mt-2">Available: ${{ balance }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              To Payment Method
            </label>
            <select
              v-model="selectedPaymentMethod"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
            >
              <option value="">Select a payment method</option>
              <option
                v-for="method in paymentMethods"
                :key="method.id"
                :value="method.id"
              >
                {{ method.type }} •••• {{ method.last4 }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex gap-3">
          <button
            @click="showWithdrawModal = false"
            class="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition"
          >
            Cancel
          </button>
          <button
            @click="processWithdraw"
            class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>

    <!-- Deposit Modal -->
    <div
      v-if="showDepositModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800"
      >
        <h3 class="text-xl font-semibold mb-4">Add Funds</h3>
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>
            <input
              v-model="depositAmount"
              type="number"
              placeholder="0.00"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              From Payment Method
            </label>
            <select
              v-model="selectedPaymentMethod"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
            >
              <option value="">Select a payment method</option>
              <option
                v-for="method in paymentMethods"
                :key="method.id"
                :value="method.id"
              >
                {{ method.type }} •••• {{ method.last4 }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex gap-3">
          <button
            @click="showDepositModal = false"
            class="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition"
          >
            Cancel
          </button>
          <button
            @click="processDeposit"
            class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
          >
            Add Funds
          </button>
        </div>
      </div>
    </div>

    <!-- Add Payment Method Modal -->
    <div
      v-if="showAddPaymentModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800"
      >
        <h3 class="text-xl font-semibold mb-4">Add Payment Method</h3>
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Card Details
            </label>
            <div
              id="card-element"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            ></div>
            <p v-if="cardError" class="text-red-400 text-sm mt-2">
              {{ cardError }}
            </p>
          </div>
        </div>
        <div class="flex gap-3">
          <button
            @click="showAddPaymentModal = false"
            class="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition"
          >
            Cancel
          </button>
          <button
            @click="addPaymentMethod"
            :disabled="isProcessing"
            class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition disabled:opacity-50"
          >
            {{ isProcessing ? "Processing..." : "Add" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import walletService from "@/services/walletService";
import SuccessToast from "@/components/SuccessToast.vue";
import ErrorToast from "@/components/ErrorToast.vue";

const balance = ref(0);
const earnings = ref(0);
const spent = ref(0);
const totalTransactions = ref(0);
const loading = ref(true);
const isProcessing = ref(false);
const loadError = ref("");

const showSuccess = ref(false);
const successMessage = ref("");

const showError = ref(false);
const errorMessage = ref("");

const toastSuccess = (message) => {
  successMessage.value = message;
  showSuccess.value = false;
  setTimeout(() => {
    showSuccess.value = true;
  }, 0);
  setTimeout(() => {
    showSuccess.value = false;
  }, 3100);
};

const toastError = (message) => {
  errorMessage.value = message;
  showError.value = false;
  setTimeout(() => {
    showError.value = true;
  }, 0);
  setTimeout(() => {
    showError.value = false;
  }, 4000);
};

const paymentMethods = ref([]);

const showWithdrawModal = ref(false);
const showDepositModal = ref(false);
const showAddPaymentModal = ref(false);

const withdrawAmount = ref("");
const depositAmount = ref("");
const selectedPaymentMethod = ref("");

// Stripe related
let stripe = null;
let elements = null;
let cardElement = null;
const cardError = ref("");

const loadStripeScript = () => {
  if (window.Stripe) return Promise.resolve();

  return new Promise((resolve, reject) => {
    // Avoid injecting the script multiple times
    const existing = document.querySelector(
      'script[src="https://js.stripe.com/v3/"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Stripe.js"))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Stripe.js"));
    document.head.appendChild(script);
  });
};

const ensureStripeReady = async () => {
  await loadStripeScript();
  await initStripe();
  if (!stripe || !elements) {
    throw new Error(
      "Stripe is not initialized. Check VITE_STRIPE_PUBLISHABLE_KEY and restart Vite."
    );
  }
};

// Initialize Stripe
const initStripe = async () => {
  // Idempotent: do not recreate Stripe/Elements once initialized
  if (stripe && elements) return;

  if (window.Stripe) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error(
        "Missing Stripe publishable key. Set VITE_STRIPE_PUBLISHABLE_KEY in your .env file."
      );
      return;
    }

    stripe = window.Stripe(publishableKey);
    elements = stripe.elements();
  } else {
    console.error("Stripe.js not loaded");
  }
};

// Mount card element when modal opens
const mountCardElement = () => {
  if (elements) {
    // If we somehow have an old element (e.g., hot reload), recreate it
    if (cardElement) {
      try {
        cardElement.unmount();
      } catch (e) {}
      cardElement = null;
    }

    cardElement = elements.create("card", {
      style: {
        base: {
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "14px",
          backgroundColor: "#1f2937",
          "::placeholder": {
            color: "#9ca3af",
          },
        },
        invalid: {
          color: "#ef4444",
        },
      },
    });
    cardElement.mount("#card-element");
  }
};

// Fetch wallet data
const fetchWalletData = async () => {
  loading.value = true;
  loadError.value = "";
  try {
    const [walletRes, statsRes, pmRes] = await Promise.allSettled([
      walletService.getWallet(),
      walletService.getStats(),
      walletService.listPaymentMethods(),
    ]);

    if (walletRes.status === "fulfilled") {
      balance.value = walletRes.value?.balance || 0;
    } else {
      loadError.value = "Failed to load wallet balance.";
    }

    if (statsRes.status === "fulfilled") {
      earnings.value = statsRes.value?.earnings || 0;
      spent.value = statsRes.value?.spent || 0;
      totalTransactions.value = statsRes.value?.totalTransactions || 0;
    } else {
      loadError.value = loadError.value
        ? loadError.value
        : "Failed to load wallet stats.";
    }

    if (pmRes.status === "fulfilled") {
      paymentMethods.value = pmRes.value || [];
    } else {
      loadError.value = loadError.value
        ? loadError.value
        : "Failed to load payment methods.";
    }
  } catch (error) {
    console.error("Failed to fetch wallet data:", error);
    loadError.value = "Failed to load wallet data.";
  } finally {
    loading.value = false;
  }
};

const processWithdraw = async () => {
  if (!withdrawAmount.value || !selectedPaymentMethod.value) {
    toastError("Please fill in all fields");
    return;
  }

  isProcessing.value = true;
  try {
    const result = await walletService.withdraw(
      parseFloat(withdrawAmount.value),
      selectedPaymentMethod.value
    );
    balance.value = result.balance;
    withdrawAmount.value = "";
    selectedPaymentMethod.value = "";
    showWithdrawModal.value = false;
    toastSuccess("Withdrawal processed successfully!");
  } catch (error) {
    toastError(
      "Withdrawal failed: " + (error.response?.data?.error || error.message)
    );
  } finally {
    isProcessing.value = false;
  }
};

const processDeposit = async () => {
  if (!depositAmount.value || !selectedPaymentMethod.value) {
    toastError("Please fill in all fields");
    return;
  }

  isProcessing.value = true;
  try {
    const result = await walletService.deposit(
      parseFloat(depositAmount.value),
      selectedPaymentMethod.value
    );
    balance.value = result.balance;
    depositAmount.value = "";
    selectedPaymentMethod.value = "";
    showDepositModal.value = false;
    toastSuccess("Deposit successful!");
  } catch (error) {
    toastError(
      "Deposit failed: " + (error.response?.data?.error || error.message)
    );
  } finally {
    isProcessing.value = false;
  }
};

const addPaymentMethod = async () => {
  try {
    await ensureStripeReady();
    // Card element might not be mounted if the user clicked quickly
    if (!cardElement) mountCardElement();
  } catch (e) {
    const message = e?.message || "Stripe is not initialized";
    cardError.value = message;
    toastError(message);
    return;
  }

  if (!cardElement) {
    cardError.value = "Card element failed to mount. Try reopening the modal.";
    toastError(cardError.value);
    return;
  }

  cardError.value = "";
  isProcessing.value = true;

  try {
    // Create payment method from card element
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      cardError.value = error.message;
      isProcessing.value = false;
      return;
    }

    if (!paymentMethod?.id) {
      cardError.value = "Stripe did not return a paymentMethodId.";
      isProcessing.value = false;
      return;
    }

    // Send payment method ID to backend
    const result = await walletService.addPaymentMethod(paymentMethod.id);

    // Add to local list
    paymentMethods.value.push(result);

    // Clean up
    cardElement.clear();
    cardError.value = "";
    showAddPaymentModal.value = false;
    toastSuccess("Payment method added successfully!");
  } catch (error) {
    const apiError = error?.response?.data?.error;
    cardError.value =
      apiError || error?.message || "Failed to add payment method";
    console.error("Add payment method failed:", error);
    toastError("Error: " + cardError.value);
  } finally {
    isProcessing.value = false;
  }
};

const removePaymentMethod = async (id) => {
  if (confirm("Are you sure you want to remove this payment method?")) {
    try {
      await walletService.removePaymentMethod(id);
      paymentMethods.value = paymentMethods.value.filter((m) => m.id !== id);
    } catch (error) {
      toastError("Failed to remove payment method");
    }
  }
};

onMounted(async () => {
  // Start loading Stripe early (do not block wallet fetch)
  loadStripeScript()
    .then(initStripe)
    .catch((e) => {
      console.error(e);
    });
  fetchWalletData();
});

// Watch for modal opening to mount card element
const openAddPaymentModal = () => {
  showAddPaymentModal.value = true;
  // Ensure Stripe is ready before mounting card element
  setTimeout(async () => {
    try {
      await ensureStripeReady();
      mountCardElement();
    } catch (e) {
      const message = e?.message || "Stripe is not initialized";
      cardError.value = message;
    }
  }, 0);
};
</script>

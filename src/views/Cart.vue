<template>
  <SuccessToast :message="successMessage" :show="showSuccess" />
  <ErrorToast
    :message="errorMessage"
    :show="showError"
    @close="showError = false"
  />

  <div class="min-h-screen bg-black text-white pb-32">
    <Navbar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-2">Shopping Cart</h1>
        <p class="text-gray-400">
          {{ cartStore.cartCount }} item{{
            cartStore.cartCount !== 1 ? "s" : ""
          }}
          in your cart
        </p>
      </div>

      <!-- Empty Cart -->
      <div v-if="cartStore.cartItems.length === 0" class="text-center py-20">
        <svg
          class="w-24 h-24 text-gray-600 mx-auto mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 class="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p class="text-gray-400 mb-6">Start adding beats to get started!</p>
        <router-link
          to="/"
          class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition"
        >
          Continue Shopping
        </router-link>
      </div>

      <!-- Cart Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Items List -->
        <div class="lg:col-span-2">
          <div class="space-y-4">
            <div
              v-for="item in cartStore.cartItems"
              :key="item.id"
              class="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 hover:border-red-500/50 transition"
            >
              <div class="flex gap-6">
                <img
                  :src="item.cover"
                  alt="Beat cover"
                  class="w-24 h-24 rounded-lg object-cover shadow-lg"
                />
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white mb-1">
                    {{ item.title }}
                  </h3>
                  <p class="text-gray-400 mb-3">by {{ item.producer }}</p>

                  <div class="flex items-center gap-4 mb-4">
                    <span class="text-2xl font-bold text-red-400">{{
                      item.price
                    }}</span>
                  </div>

                  <!-- License Dropdown -->
                  <select
                    :value="licenseSelections[item.id]?.id || ''"
                    @change="handleLicenseChange(item.id, $event)"
                    class="w-full bg-gray-800 border border-gray-500 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500 transition mb-4 cursor-pointer"
                  >
                    <option value="">-- Select License --</option>
                    <option
                      v-for="license in licenses"
                      :key="license.id"
                      :value="license.id"
                    >
                      {{ license.name }}
                    </option>
                  </select>

                  <button
                    @click="cartStore.removeFromCart(item.id)"
                    class="text-red-400 hover:text-red-300 text-sm font-medium transition"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div
            class="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 sticky top-20"
          >
            <h2 class="text-2xl font-bold mb-6">Order Summary</h2>

            <div class="space-y-4 mb-6 pb-6 border-b border-gray-700">
              <div class="flex justify-between">
                <span class="text-gray-400">Subtotal</span>
                <span class="text-white font-semibold">{{ subtotal }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Items</span>
                <span class="text-white font-semibold">{{
                  cartStore.cartCount
                }}</span>
              </div>
            </div>

            <div class="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span class="text-red-400">{{ subtotal }}</span>
            </div>

            <button
              @click="checkout"
              :disabled="isCheckingOut"
              class="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-red-500/30 mb-3"
            >
              {{ isCheckingOut ? "Processing..." : "Proceed to Checkout" }}
            </button>

            <router-link
              to="/"
              class="block text-center text-gray-400 hover:text-white text-sm font-medium transition py-2"
            >
              Continue Shopping
            </router-link>

            <div class="mt-6 pt-6 border-t border-gray-700">
              <p class="text-xs text-gray-500 text-center">
                All beats come with commercial license included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useCartStore } from "../../store";
import Navbar from "../components/Navbar.vue";
import SuccessToast from "@/components/SuccessToast.vue";
import ErrorToast from "@/components/ErrorToast.vue";
import licenseService from "@/services/licenseService";
import orderService from "@/services/orderService";

const cartStore = useCartStore();

const showSuccess = ref(false);
const successMessage = ref("");

const showError = ref(false);
const errorMessage = ref("");

const isCheckingOut = ref(false);
const licenses = ref([]);
const isLoadingLicenses = ref(false);
const licenseSelections = ref({}); // Map beatId -> { id, name, ...license object }

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

const fetchLicenses = async () => {
  isLoadingLicenses.value = true;
  try {
    const data = await licenseService.getAllLicenses();
    licenses.value = data || [];
  } catch (error) {
    console.error("[fetchLicenses] failed", error);
    toastError("Failed to load license types");
  } finally {
    isLoadingLicenses.value = false;
  }
};

onMounted(() => {
  fetchLicenses();
});

const handleLicenseChange = (beatId, event) => {
  const licenseId = event.target.value;
  if (!licenseId) {
    delete licenseSelections.value[beatId];
    return;
  }

  const selectedLicense = licenses.value.find(
    (l) => l.id === parseInt(licenseId)
  );
  if (selectedLicense) {
    licenseSelections.value[beatId] = selectedLicense;
  }
};

const subtotal = computed(() => {
  return cartStore.cartItems.value
    .reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price;
    }, 0)
    .toFixed(2);
});

const checkout = async () => {
  if (isCheckingOut.value) return;

  const itemsInCart = cartStore.cartItems.value;
  if (!itemsInCart || itemsInCart.length === 0) {
    toastError("Your cart is empty.");
    return;
  }

  // Check if any items need license selection
  const itemsNeedingLicense = itemsInCart.filter(
    (item) => !licenseSelections.value[item.id]
  );

  if (itemsNeedingLicense.length > 0) {
    toastError(
      `Please select a license for: ${itemsNeedingLicense
        .map((i) => i.title)
        .join(", ")}`
    );
    return;
  }

  isCheckingOut.value = true;
  try {
    const items = itemsInCart.map((item) => ({
      beatId: item.id,
      quantity: item.quantity || 1,
      licenseId: licenseSelections.value[item.id].id,
    }));

    console.log("[checkout] sending items", items);

    const result = await orderService.checkout(items);
    toastSuccess(result?.message || "Checkout successful");
    cartStore.clearCart();
    licenseSelections.value = {}; // Reset selections after successful checkout
  } catch (error) {
    const data = error?.response?.data;
    console.error("[checkout] failed", {
      status: error?.response?.status,
      data,
      message: error?.message,
    });

    const status = error?.response?.status;
    let message =
      data?.error || data?.message || error?.message || "Checkout failed";

    // Friendlier message for server errors
    if (status >= 500) {
      message =
        data?.error ||
        "Server error while processing checkout. Please try again.";
    }

    // Append wallet info when controller provides it
    if (
      typeof data?.balance !== "undefined" &&
      typeof data?.total !== "undefined"
    ) {
      message = `${message} (Balance: $${data.balance}, Total: $${data.total})`;
    }

    toastError(message);
  } finally {
    isCheckingOut.value = false;
  }
};
</script>

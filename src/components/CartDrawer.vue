<template>
  <!-- Cart Drawer Overlay -->
  <transition name="fade">
    <div
      v-if="isOpen"
      @click="close"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
    ></div>
  </transition>

  <!-- Cart Drawer Slide Panel -->
  <transition name="slide-in">
    <div
      v-if="isOpen"
      class="fixed right-0 top-16 h-[calc(100vh-64px)] w-full max-w-md bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 border-l border-red-500/20 shadow-2xl shadow-red-900/20 z-50 flex flex-col overflow-hidden"
    >
      <!-- Animated header background -->
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/10 to-rose-500/5 rounded-full blur-3xl -z-10 opacity-60"
      ></div>

      <!-- Header -->
      <div
        class="flex items-center justify-between p-6 border-b border-red-500/10 bg-gradient-to-r from-gray-900/50 via-transparent to-red-500/5 backdrop-blur-sm"
      >
        <div>
          <h2
            class="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
          >
            Shopping Cart
          </h2>
          <p class="text-sm text-gray-400 mt-1">
            {{ cartStore.cartCount.value }}
            {{ cartStore.cartCount.value !== 1 ? "items" : "item" }}
          </p>
        </div>
        <button
          @click="close"
          class="text-gray-400 hover:text-white hover:bg-red-500/20 transition-all duration-300 p-2 rounded-lg hover:scale-110 active:scale-95"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Empty Cart -->
      <div
        v-if="cartStore.cartItems.value.length === 0"
        class="flex-1 flex flex-col items-center justify-center p-6 text-center"
      >
        <div
          class="w-20 h-20 bg-gradient-to-br from-red-500/20 to-rose-500/10 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            class="w-10 h-10 text-red-400"
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
        </div>
        <h3 class="text-lg font-bold text-white mb-2">Your cart is empty</h3>
        <p class="text-sm text-gray-500">Start adding beats to get started!</p>
      </div>

      <!-- Cart Items List -->
      <div
        v-else
        class="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar"
      >
        <div
          v-for="item in cartStore.cartItems.value"
          :key="item.id"
          class="bg-gradient-to-br from-gray-800/40 via-slate-800/30 to-gray-900/40 border border-red-500/20 rounded-xl p-4 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 group"
        >
          <div class="flex gap-3">
            <div class="relative flex-shrink-0 overflow-hidden rounded-lg">
              <img
                :src="item.cover"
                alt="Beat cover"
                class="w-16 h-16 rounded-lg object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"
              ></div>
            </div>
            <div class="flex-1 min-w-0">
              <h4
                class="text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors"
              >
                {{ item.title }}
              </h4>
              <p class="text-xs text-gray-500 truncate mb-2">
                {{ item.producer }}
              </p>
              <div class="flex items-center justify-between mb-2">
                <span
                  class="text-lg font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent"
                  >{{ item.price }}</span
                >
                <button
                  @click="cartStore.removeFromCart(item.id)"
                  class="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 p-1.5 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <span
                v-if="item.licenseName"
                class="text-xs bg-gradient-to-r from-slate-700/80 to-slate-600/60 text-gray-200 px-2.5 py-1 rounded-full inline-block font-medium"
              >
                {{ item.licenseName }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary Footer -->
      <div
        v-if="cartStore.cartItems.value.length > 0"
        class="border-t border-red-500/10 p-6 space-y-4 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent backdrop-blur-sm"
      >
        <div class="space-y-3">
          <div
            class="flex justify-between text-sm group cursor-default hover:text-red-400/80 transition-colors"
          >
            <span class="text-gray-400">Subtotal</span>
            <span class="text-white font-semibold">${{ subtotal }}</span>
          </div>
          <div
            class="flex justify-between text-sm group cursor-default hover:text-red-400/80 transition-colors"
          >
            <span class="text-gray-400">Items</span>
            <span class="text-white font-semibold">{{
              cartStore.cartCount.value
            }}</span>
          </div>
        </div>

        <div
          class="flex justify-between text-lg font-bold pt-3 border-t border-red-500/10"
        >
          <span class="text-white">Total</span>
          <span
            class="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent"
            >${{ subtotal }}</span
          >
        </div>

        <button
          @click="checkout"
          class="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:via-rose-500 hover:to-red-500 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-red-600/40 hover:shadow-red-500/50 hover:scale-105 active:scale-95 relative group overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500"
          ></div>
          <span class="relative flex items-center justify-center gap-2">
            <span>Proceed to Checkout</span>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </button>

        <p class="text-xs text-gray-600 text-center">
          ✓ All beats come with commercial license included
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../../store";

const cartStore = useCartStore();
const isOpen = ref(false);

const subtotal = computed(() => {
  return cartStore.cartItems.value
    .reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price;
    }, 0)
    .toFixed(2);
});

const open = () => {
  isOpen.value = true;
  document.body.style.overflow = "hidden";
};

const close = () => {
  isOpen.value = false;
  document.body.style.overflow = "auto";
};

const toggle = () => {
  if (isOpen.value) {
    close();
  } else {
    open();
  }
};

const checkout = () => {
  alert("Checkout coming soon! Total: $" + subtotal.value);
};

// Expose methods
defineExpose({
  open,
  close,
  toggle,
  isOpen,
});
</script>

<style scoped>
/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

/* Custom scrollbar for cart items */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    rgba(239, 68, 68, 0.6),
    rgba(244, 63, 94, 0.4)
  );
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    rgba(239, 68, 68, 0.8),
    rgba(244, 63, 94, 0.6)
  );
}

/* Smooth transitions for all interactive elements */
* {
  transition: color 0.3s ease, background-color 0.3s ease;
}
</style>

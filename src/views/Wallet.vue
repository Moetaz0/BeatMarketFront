<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Wallet</h1>
        <p class="text-gray-400">Manage your balance and payment methods</p>
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
            @click="showAddPaymentModal = true"
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
              Card Number
            </label>
            <input
              type="text"
              placeholder="4111 1111 1111 1111"
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Expiry
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
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
            class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";

const balance = ref(1250.5);
const earnings = ref(450);
const spent = ref(120);
const totalTransactions = ref(24);

const paymentMethods = ref([
  { id: 1, type: "Visa", last4: "4242", default: true },
  { id: 2, type: "Mastercard", last4: "5555", default: false },
]);

const showWithdrawModal = ref(false);
const showDepositModal = ref(false);
const showAddPaymentModal = ref(false);

const withdrawAmount = ref("");
const depositAmount = ref("");
const selectedPaymentMethod = ref("");

const processWithdraw = () => {
  if (withdrawAmount.value && selectedPaymentMethod.value) {
    balance.value -= parseFloat(withdrawAmount.value);
    withdrawAmount.value = "";
    selectedPaymentMethod.value = "";
    showWithdrawModal.value = false;
  }
};

const processDeposit = () => {
  if (depositAmount.value && selectedPaymentMethod.value) {
    balance.value += parseFloat(depositAmount.value);
    depositAmount.value = "";
    selectedPaymentMethod.value = "";
    showDepositModal.value = false;
  }
};

const addPaymentMethod = () => {
  showAddPaymentModal.value = false;
};

const removePaymentMethod = (id) => {
  const index = paymentMethods.value.findIndex((m) => m.id === id);
  if (index > -1) {
    paymentMethods.value.splice(index, 1);
  }
};
</script>

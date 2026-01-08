<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">My Transactions</h1>
        <p class="text-gray-400">View all your transaction history</p>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Type
          </label>
          <select
            v-model="filters.type"
            class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Types</option>
            <option value="purchase">Purchase</option>
            <option value="sale">Sale</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <select
            v-model="filters.status"
            class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Date Range
          </label>
          <select
            v-model="filters.dateRange"
            class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="text-center py-12">
        <svg
          class="w-8 h-8 animate-spin text-red-600 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <p class="text-gray-400 mt-3">Loading transactions...</p>
      </div>

      <!-- Transactions Table -->
      <div
        v-else-if="filteredTransactions.length === 0"
        class="text-center py-12 bg-gray-900 rounded-lg border border-gray-800"
      >
        <svg
          class="w-12 h-12 text-gray-600 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-gray-400">No transactions found</p>
      </div>

      <div
        v-else
        class="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-800 border-b border-gray-700">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">
                  Description
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold">
                  Amount
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in paginatedTransactions"
                :key="transaction.id"
                class="border-b border-gray-800 hover:bg-gray-800/50 transition"
              >
                <td class="px-6 py-4 text-sm">{{ transaction.date }}</td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      transaction.type === 'purchase' &&
                        'bg-blue-600/30 text-blue-400',
                      transaction.type === 'sale' &&
                        'bg-green-600/30 text-green-400',
                      transaction.type === 'deposit' &&
                        'bg-purple-600/30 text-purple-400',
                      transaction.type === 'withdrawal' &&
                        'bg-orange-600/30 text-orange-400',
                    ]"
                  >
                    {{ transaction.typeLabel }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">{{ transaction.description }}</td>
                <td
                  :class="[
                    'px-6 py-4 text-sm font-semibold',
                    transaction.amount.startsWith('+')
                      ? 'text-green-400'
                      : 'text-red-400',
                  ]"
                >
                  {{ transaction.amount }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      transaction.status === 'completed' &&
                        'bg-green-600/30 text-green-400',
                      transaction.status === 'pending' &&
                        'bg-yellow-600/30 text-yellow-400',
                      transaction.status === 'failed' &&
                        'bg-red-600/30 text-red-400',
                    ]"
                  >
                    {{ transaction.statusLabel }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="filteredTransactions.length > 0"
        class="flex items-center justify-between mt-8"
      >
        <p class="text-sm text-gray-400">
          Showing {{ currentPage * itemsPerPage - itemsPerPage + 1 }} to
          {{
            Math.min(currentPage * itemsPerPage, filteredTransactions.length)
          }}
          of
          {{ filteredTransactions.length }}
        </p>
        <div class="flex gap-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <button
            @click="currentPage = currentPage + 1"
            :disabled="
              currentPage * itemsPerPage >= filteredTransactions.length
            "
            class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import walletService from "@/services/walletService";

const filters = ref({
  type: "",
  status: "",
  dateRange: "",
});

const currentPage = ref(1);
const loading = ref(true);
const transactions = ref([]);
const itemsPerPage = 10;

// Fetch transactions from API
const fetchTransactions = async () => {
  loading.value = true;
  try {
    const data = await walletService.getTransactions(1000, 0);

    // Map API response to display format
    transactions.value = (data || []).map((tx) => {
      const isCredit = tx.type === "credit";
      return {
        id: tx.id,
        date: new Date(tx.createdAt).toLocaleDateString("en-US"),
        type: isCredit ? "deposit" : "withdrawal",
        typeLabel: isCredit ? "Deposit" : "Withdrawal",
        description: tx.description,
        amount: `${isCredit ? "+" : "-"}$${Math.abs(tx.amount).toFixed(2)}`,
        status: "completed",
        statusLabel: "Completed",
        reference: tx.reference,
      };
    });
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

const filteredTransactions = computed(() => {
  return transactions.value.filter((tx) => {
    if (filters.value.type && tx.type !== filters.value.type) return false;
    if (filters.value.status && tx.status !== filters.value.status)
      return false;
    return true;
  });
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTransactions.value.slice(start, end);
});

onMounted(fetchTransactions);
</script>

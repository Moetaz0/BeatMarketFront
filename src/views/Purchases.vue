<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">My Purchases</h1>
        <p class="text-gray-400">
          View all beats and licenses you've purchased
        </p>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            License Type
          </label>
          <select
            v-model="filters.licenseType"
            class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Licenses</option>
            <option value="personal">Personal Use</option>
            <option value="commercial">Commercial</option>
            <option value="exclusive">Exclusive</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Genre
          </label>
          <select
            v-model="filters.genre"
            class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="">All Genres</option>
            <option value="hip-hop">Hip Hop</option>
            <option value="trap">Trap</option>
            <option value="drill">Drill</option>
            <option value="rnb">R&B</option>
            <option value="pop">Pop</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Sort By
          </label>
          <select
            v-model="filters.sortBy"
            class="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
        </div>
      </div>

      <!-- Purchases Grid -->
      <div
        v-if="filteredPurchases.length === 0"
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <p class="text-gray-400">No purchases found</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="purchase in filteredPurchases"
          :key="purchase.id"
          class="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-red-600 transition group"
        >
          <!-- Beat Cover -->
          <div class="relative w-full h-40 bg-gray-800 overflow-hidden">
            <img
              :src="purchase.cover"
              alt="Beat cover"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              @error="
                (e) =>
                  (e.target.src =
                    'https://via.placeholder.com/300x200?text=Beat')
              "
            />
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/60 flex items-center justify-center transition-opacity duration-300"
            >
              <button
                @click="playBeat(purchase)"
                class="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition"
              >
                <svg
                  class="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Beat Info -->
          <div class="p-4">
            <h3 class="font-semibold text-white mb-1 truncate">
              {{ purchase.title }}
            </h3>
            <p class="text-gray-400 text-sm mb-3">by {{ purchase.producer }}</p>

            <!-- License Badge -->
            <div class="mb-4">
              <span
                :class="[
                  'inline-block px-3 py-1 rounded-full text-xs font-medium',
                  purchase.licenseType === 'personal' &&
                    'bg-blue-600/30 text-blue-400',
                  purchase.licenseType === 'commercial' &&
                    'bg-green-600/30 text-green-400',
                  purchase.licenseType === 'exclusive' &&
                    'bg-purple-600/30 text-purple-400',
                ]"
              >
                {{ purchase.licenseLabel }}
              </span>
            </div>

            <!-- Price and Actions -->
            <div
              class="flex items-center justify-between pt-4 border-t border-gray-800"
            >
              <span class="font-bold text-red-400">{{ purchase.price }}</span>
              <div class="flex gap-2">
                <button
                  @click="downloadBeat(purchase)"
                  class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-sm font-medium transition"
                  title="Download"
                >
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
                <button
                  @click="viewDetails(purchase)"
                  class="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition"
                >
                  Details
                </button>
              </div>
            </div>

            <!-- Purchase Date -->
            <p class="text-gray-500 text-xs mt-3">
              Purchased: {{ purchase.purchasedDate }}
            </p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="filteredPurchases.length > 0"
        class="flex items-center justify-between mt-8"
      >
        <p class="text-sm text-gray-400">
          Showing {{ currentPage * 9 - 8 }} to
          {{ Math.min(currentPage * 9, filteredPurchases.length) }} of
          {{ filteredPurchases.length }}
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
            :disabled="currentPage * 9 >= filteredPurchases.length"
            class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div
      v-if="selectedPurchase"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-gray-900 rounded-lg p-6 max-w-2xl w-full border border-gray-800 max-h-96 overflow-y-auto"
      >
        <div class="flex items-start justify-between mb-6">
          <h3 class="text-2xl font-semibold">{{ selectedPurchase.title }}</h3>
          <button
            @click="selectedPurchase = null"
            class="text-gray-400 hover:text-white transition"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-gray-400 text-sm mb-1">Producer</p>
            <p class="font-semibold">{{ selectedPurchase.producer }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-400 text-sm mb-1">Genre</p>
              <p class="font-semibold">{{ selectedPurchase.genre }}</p>
            </div>
            <div>
              <p class="text-gray-400 text-sm mb-1">BPM</p>
              <p class="font-semibold">{{ selectedPurchase.bpm }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-400 text-sm mb-1">License Type</p>
              <p class="font-semibold">{{ selectedPurchase.licenseLabel }}</p>
            </div>
            <div>
              <p class="text-gray-400 text-sm mb-1">Price</p>
              <p class="font-bold text-red-400">{{ selectedPurchase.price }}</p>
            </div>
          </div>
          <div>
            <p class="text-gray-400 text-sm mb-1">Purchased Date</p>
            <p class="font-semibold">{{ selectedPurchase.purchasedDate }}</p>
          </div>
          <div>
            <p class="text-gray-400 text-sm mb-1">License Agreement</p>
            <p class="text-sm text-gray-300">
              This license grants you personal/commercial use rights. Please
              review the full license agreement before use.
            </p>
          </div>
        </div>

        <div class="flex gap-3 mt-8">
          <button
            @click="selectedPurchase = null"
            class="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition"
          >
            Close
          </button>
          <button
            @click="downloadBeat(selectedPurchase)"
            class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Navbar from "@/components/Navbar.vue";

const filters = ref({
  licenseType: "",
  genre: "",
  sortBy: "recent",
});

const currentPage = ref(1);
const selectedPurchase = ref(null);

const purchases = ref([
  {
    id: 1,
    title: "Summer Vibes",
    producer: "Beat Master",
    cover: "https://via.placeholder.com/300x200?text=Summer+Vibes",
    price: "$29.99",
    licenseType: "personal",
    licenseLabel: "Personal Use",
    genre: "Hip Hop",
    bpm: 90,
    purchasedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Night Trap",
    producer: "Trap King",
    cover: "https://via.placeholder.com/300x200?text=Night+Trap",
    price: "$49.99",
    licenseType: "commercial",
    licenseLabel: "Commercial",
    genre: "Trap",
    bpm: 140,
    purchasedDate: "2024-01-14",
  },
  {
    id: 3,
    title: "Urban Dreams",
    producer: "Drill Beats",
    cover: "https://via.placeholder.com/300x200?text=Urban+Dreams",
    price: "$99.99",
    licenseType: "exclusive",
    licenseLabel: "Exclusive",
    genre: "Drill",
    bpm: 65,
    purchasedDate: "2024-01-13",
  },
  {
    id: 4,
    title: "Midnight Music",
    producer: "RnB Producer",
    cover: "https://via.placeholder.com/300x200?text=Midnight+Music",
    price: "$39.99",
    licenseType: "personal",
    licenseLabel: "Personal Use",
    genre: "R&B",
    bpm: 95,
    purchasedDate: "2024-01-12",
  },
  {
    id: 5,
    title: "Smooth Groove",
    producer: "Jazz Vibes",
    cover: "https://via.placeholder.com/300x200?text=Smooth+Groove",
    price: "$29.99",
    licenseType: "commercial",
    licenseLabel: "Commercial",
    genre: "Hip Hop",
    bpm: 88,
    purchasedDate: "2024-01-11",
  },
  {
    id: 6,
    title: "Pop Sensation",
    producer: "Pop Stars",
    cover: "https://via.placeholder.com/300x200?text=Pop+Sensation",
    price: "$44.99",
    licenseType: "personal",
    licenseLabel: "Personal Use",
    genre: "Pop",
    bpm: 120,
    purchasedDate: "2024-01-10",
  },
]);

const filteredPurchases = computed(() => {
  let result = purchases.value.filter((purchase) => {
    if (
      filters.value.licenseType &&
      purchase.licenseType !== filters.value.licenseType
    )
      return false;
    if (filters.value.genre && purchase.genre !== filters.value.genre)
      return false;
    return true;
  });

  // Sort
  if (filters.value.sortBy === "oldest") {
    result.sort(
      (a, b) => new Date(a.purchasedDate) - new Date(b.purchasedDate)
    );
  } else if (filters.value.sortBy === "price-high") {
    result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (filters.value.sortBy === "price-low") {
    result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  return result;
});

const playBeat = (purchase) => {
  console.log("Playing:", purchase.title);
};

const downloadBeat = (purchase) => {
  console.log("Downloading:", purchase.title);
};

const viewDetails = (purchase) => {
  selectedPurchase.value = purchase;
};
</script>

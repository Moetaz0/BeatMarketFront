<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <!-- Filter Section -->
    <div
      class="bg-gradient-to-b from-gray-950 to-gray-900 border-b border-gray-800 sticky top-16 z-40"
    >
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1H3zm0 2h14v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm3-1h8v2H6V4zm0 4h8v2H6V8zm0 4h8v2H6v-2z"
                />
              </svg>
              <h3 class="text-lg font-semibold">Filters</h3>
            </div>
            <button
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="text-sm text-gray-400 hover:text-red-400 transition font-medium flex items-center gap-1"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset filters
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <!-- Time Range -->
            <div class="relative group">
              <label
                class="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider"
                >Time Range</label
              >
              <select
                v-model="filters.timeRange"
                @change="applyFilters"
                class="w-full bg-gray-800 border border-gray-700 hover:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition appearance-none cursor-pointer"
              >
                <option value="">All time</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="3months">Last 3 months</option>
                <option value="year">Last year</option>
              </select>
              <svg
                class="absolute right-3 top-9 pointer-events-none w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- Genre -->
            <div class="relative group">
              <label
                class="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider"
                >Genre</label
              >
              <select
                v-model="filters.genre"
                @change="applyFilters"
                class="w-full bg-gray-800 border border-gray-700 hover:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition appearance-none cursor-pointer"
              >
                <option value="">All genres</option>
                <option value="Trap">Trap</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Drill">Drill</option>
                <option value="RNB">RNB</option>
                <option value="Pop">Pop</option>
                <option value="Phonk">Phonk</option>
              </select>
              <svg
                class="absolute right-3 top-9 pointer-events-none w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- Price -->
            <div class="relative group">
              <label
                class="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider"
                >Price Range</label
              >
              <select
                v-model="filters.price"
                @change="applyFilters"
                class="w-full bg-gray-800 border border-gray-700 hover:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition appearance-none cursor-pointer"
              >
                <option value="">Any price</option>
                <option value="free">Free</option>
                <option value="0-20">$0 - $20</option>
                <option value="20-50">$20 - $50</option>
                <option value="50+">$50+</option>
              </select>
              <svg
                class="absolute right-3 top-9 pointer-events-none w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- BPM -->
            <div class="relative group">
              <label
                class="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider"
                >Tempo (BPM)</label
              >
              <select
                v-model="filters.bpm"
                @change="applyFilters"
                class="w-full bg-gray-800 border border-gray-700 hover:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition appearance-none cursor-pointer"
              >
                <option value="">Any BPM</option>
                <option value="120-140">120-140</option>
                <option value="140-160">140-160</option>
                <option value="160+">160+</option>
              </select>
              <svg
                class="absolute right-3 top-9 pointer-events-none w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- Duration -->
            <div class="relative group">
              <label
                class="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider"
                >Duration</label
              >
              <select
                v-model="filters.duration"
                @change="applyFilters"
                class="w-full bg-gray-800 border border-gray-700 hover:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition appearance-none cursor-pointer"
              >
                <option value="">Any length</option>
                <option value="0-2">Under 2 min</option>
                <option value="2-3">2-3 min</option>
                <option value="3+">3+ min</option>
              </select>
              <svg
                class="absolute right-3 top-9 pointer-events-none w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">All Beats</h1>
        <span class="text-gray-400 text-sm" v-if="beats.length"
          >{{ beats.length }} beats</span
        >
      </div>

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
        <p class="text-gray-400 mt-3">Loading beats...</p>
      </div>

      <div
        v-else-if="!filteredBeats.length"
        class="text-center py-12 bg-gray-900 rounded-lg border border-gray-800"
      >
        <h3 class="text-xl font-semibold text-white mb-2">No beats found</h3>
        <p class="text-gray-400">Try adjusting your filters.</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="beat in filteredBeats"
          :key="beat.id"
          class="bg-gray-900 border border-gray-800 rounded-lg hover:border-red-500 transition-all duration-300 overflow-hidden flex gap-4 p-4 cursor-pointer group"
          @click="handleBeatClick(beat)"
        >
          <!-- Cover Image -->
          <div
            class="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800"
          >
            <img
              :src="beat.cover"
              alt="Beat cover"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              @error="
                (e) =>
                  (e.target.src =
                    'https://i8.amplience.net/i/naras/hero_1644x925_v1.png.jpg')
              "
            />
            <!-- Play Button -->
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
            >
              <div
                class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Beat Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-lg text-white truncate">
                  {{ beat.title }}
                </h3>
                <p class="text-gray-400 text-sm">by {{ beat.producer }}</p>
                <p v-if="beat.licenseName" class="text-gray-500 text-xs mt-1">
                  License: {{ beat.licenseName }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <span
                    v-if="beat.genre"
                    class="inline-block px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
                  >
                    {{ beat.genre }}
                  </span>
                  <span
                    v-if="beat.bpm"
                    class="inline-block px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
                  >
                    {{ beat.bpm }} BPM
                  </span>
                </div>
              </div>

              <!-- Right Side: Price and Actions -->
              <div
                class="flex flex-col items-end justify-between gap-2 flex-shrink-0"
              >
                <span
                  :class="[
                    'font-bold text-lg whitespace-nowrap',
                    beat.price === 'Free' ? 'text-green-400' : 'text-red-400',
                  ]"
                >
                  {{ beat.price }}
                </span>
                <div class="flex items-center gap-3 text-gray-400 text-sm">
                  <span class="flex items-center gap-1">
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ beat.views }}
                  </span>
                  <button
                    v-if="beat.isYours"
                    @click.stop="handleEdit(beat)"
                    class="text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    v-else
                    @click.stop="handleLicense(beat)"
                    class="text-gray-400 hover:text-red-400 font-medium transition-colors"
                  >
                    License
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Music Player -->
    <MusicPlayer
      v-if="currentBeat"
      :currentBeat="currentBeat"
      :isYours="currentBeatIsYours"
      @close="currentBeat = null"
      @next="playNext"
      @previous="playPrevious"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import beatService from "@/services/beatService";
import { useAuthStore } from "../../store";

const route = useRoute();
const authStore = useAuthStore();
const allBeats = ref([]);
const beats = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const currentBeat = ref(null);
const currentBeatIsYours = ref(false);

const filters = ref({
  timeRange: "",
  genre: "",
  price: "",
  bpm: "",
  duration: "",
});

const fetchBeats = async () => {
  loading.value = true;
  try {
    const response = await beatService.getAllBeats();
    const data = response.data || response || [];
    console.log("API Response sample:", data[0]); // Log first beat to see structure

    // Fetch views for all beats in parallel
    const beatsWithViewsResults = await Promise.allSettled(
      data.map(async (beat) => {
        let views = "0";
        try {
          const viewResult = await beatService.getBeatViews(beat.id);
          views = String(viewResult.views || viewResult.viewCount || "0");
        } catch (err) {
          console.warn(`Failed to fetch views for beat ${beat.id}:`, err);
        }

        // Extract userId from various possible locations in API response
        const userId =
          beat.userId ||
          beat.createdBy ||
          beat.user?.id ||
          beat.producer?.id ||
          null;

        return {
          id: beat.id,
          title: beat.title,
          producer:
            beat.user?.username ||
            beat.producer?.username ||
            beat.producer?.name ||
            beat.producerName ||
            beat.producer ||
            "Unknown",
          price: beat.price ? parseFloat(beat.price) : 0,
          priceDisplay: beat.price ? `$${beat.price}` : "Free",
          cover:
            beat.coverImage || beat.cover || "https://via.placeholder.com/300",
          plays: beat.plays || "0",
          views: views,
          fileUrl: beat.audioFileUrl || beat.audioFile || beat.fileUrl || "",
          licenseName: beat.license?.name || "",
          genre: beat.genre || "",
          bpm: beat.bpm || 0,
          uploadedAt: beat.uploadedAt || "",
          duration: beat.duration ? parseFloat(beat.duration) : 0,
          userId: userId,
          createdBy: userId,
        };
      })
    );

    // Filter successful results
    allBeats.value = beatsWithViewsResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    beats.value = [...allBeats.value];
    // Apply filters after fetching (includes search query)
    applyFilters();
  } catch (err) {
    console.error("Failed to fetch beats:", err);
    allBeats.value = [];
    beats.value = [];
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  beats.value = allBeats.value.filter((beat) => {
    // Search query filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      const matchesTitle = (beat.title || "").toLowerCase().includes(query);
      const matchesGenre = (beat.genre || "").toLowerCase().includes(query);
      const matchesProducer = (beat.producer || "")
        .toLowerCase()
        .includes(query);
      if (!matchesTitle && !matchesGenre && !matchesProducer) {
        return false;
      }
    }

    // Genre filter
    if (
      filters.value.genre &&
      beat.genre &&
      beat.genre !== filters.value.genre
    ) {
      return false;
    }

    // Price filter
    if (filters.value.price) {
      const beatPrice = beat.price || 0;
      if (filters.value.price === "free" && beatPrice !== 0) return false;
      if (filters.value.price === "0-20" && (beatPrice < 0 || beatPrice > 20))
        return false;
      if (filters.value.price === "20-50" && (beatPrice < 20 || beatPrice > 50))
        return false;
      if (filters.value.price === "50+" && beatPrice < 50) return false;
    }

    // BPM filter
    if (filters.value.bpm && beat.bpm) {
      if (filters.value.bpm === "120-140" && (beat.bpm < 120 || beat.bpm > 140))
        return false;
      if (filters.value.bpm === "140-160" && (beat.bpm < 140 || beat.bpm > 160))
        return false;
      if (filters.value.bpm === "160+" && beat.bpm < 160) return false;
    }

    // Duration filter (in minutes)
    if (filters.value.duration && beat.duration) {
      if (filters.value.duration === "0-2" && beat.duration > 2) return false;
      if (
        filters.value.duration === "2-3" &&
        (beat.duration < 2 || beat.duration > 3)
      )
        return false;
      if (filters.value.duration === "3+" && beat.duration < 3) return false;
    }

    // Time range filter (based on uploadedAt)
    if (filters.value.timeRange && beat.uploadedAt) {
      const beatDate = new Date(beat.uploadedAt);
      // Only filter if we have a valid date
      if (!isNaN(beatDate.getTime())) {
        const now = new Date();
        const daysDiff = (now - beatDate) / (1000 * 60 * 60 * 24);

        if (filters.value.timeRange === "week" && daysDiff > 7) return false;
        if (filters.value.timeRange === "month" && daysDiff > 30) return false;
        if (filters.value.timeRange === "3months" && daysDiff > 90)
          return false;
        if (filters.value.timeRange === "year" && daysDiff > 365) return false;
      }
    }

    return true;
  });
};

const filteredBeats = computed(() => {
  return beats.value.map((beat) => ({
    ...beat,
    price: beat.priceDisplay,
  }));
});

const hasActiveFilters = computed(() => {
  return Object.values(filters.value).some((value) => value !== "");
});

const resetFilters = () => {
  filters.value = {
    timeRange: "",
    genre: "",
    price: "",
    bpm: "",
    duration: "",
  };
  searchQuery.value = "";
  beats.value = [...allBeats.value];
};

const handleBeatClick = async (beat) => {
  try {
    console.log("Beat clicked, setting player...", beat);

    // Check if beat is owned by current user
    const currentUserId = authStore.currentUser.value?.id;
    console.log("Current User ID:", currentUserId);
    console.log("Beat userId:", beat.userId);
    console.log("Beat createdBy:", beat.createdBy);

    // Convert to string for comparison to handle both string and number IDs
    const currentUserIdStr = String(currentUserId);
    const beatUserIdStr = beat.userId ? String(beat.userId) : null;
    const beatCreatedByStr = beat.createdBy ? String(beat.createdBy) : null;

    const isOwned =
      currentUserId &&
      (beatUserIdStr === currentUserIdStr ||
        beatCreatedByStr === currentUserIdStr);

    console.log("Is owned (initial):", isOwned);

    // First, set the beat data we already have
    currentBeat.value = {
      id: beat.id,
      title: beat.title,
      producer: beat.producer,
      price: beat.price,
      cover: beat.cover,
      fileUrl: beat.fileUrl,
      licenseName: beat.licenseName || "",
      isOwned: isOwned,
      isPurchased: false,
      producerId: beat.userId || beat.createdBy || null,
    };
    currentBeatIsYours.value = isOwned;

    // Then try to fetch full beat data asynchronously for better info
    if (beat.id) {
      try {
        const fullBeat = await beatService.getBeat(beat.id);
        console.log("Fetched full beat data:", fullBeat);

        // Check if beat is owned by current user
        const currentUserId = authStore.currentUser.value?.id;

        // Convert to string for comparison to handle both string and number IDs
        const currentUserIdStr = String(currentUserId);
        const fullBeatUserIdStr = fullBeat.userId
          ? String(fullBeat.userId)
          : null;
        const fullBeatCreatedByStr = fullBeat.createdBy
          ? String(fullBeat.createdBy)
          : null;

        const isOwned =
          fullBeatUserIdStr === currentUserIdStr ||
          fullBeatCreatedByStr === currentUserIdStr;
        const isPurchased = fullBeat.isPurchased || false;

        // Update with full data
        currentBeat.value = {
          id: fullBeat.id || beat.id,
          title: fullBeat.title || beat.title,
          producer:
            fullBeat.user?.username ||
            fullBeat.producer?.username ||
            fullBeat.producer?.name ||
            fullBeat.producerName ||
            fullBeat.producer ||
            beat.producer,
          price: fullBeat.price ? `$${fullBeat.price}` : beat.price,
          cover: fullBeat.coverImage || fullBeat.cover || beat.cover,
          fileUrl:
            fullBeat.fileUrl ||
            fullBeat.audioFile ||
            fullBeat.audioFileUrl ||
            fullBeat.audioUrl ||
            fullBeat.audio ||
            beat.fileUrl,
          licenseName: fullBeat.license?.name || fullBeat.licenseName || "",
          isOwned: isOwned,
          isPurchased: isPurchased,
          producerId:
            fullBeat.userId ||
            fullBeat.createdBy ||
            beat.userId ||
            beat.createdBy ||
            null,
        };
        currentBeatIsYours.value = isOwned;
        console.log("Updated current beat with full data:", currentBeat.value);
      } catch (fetchError) {
        console.warn(
          "Could not fetch full beat data, using basic info:",
          fetchError
        );
        // Keep the basic beat data we already set
      }
    }
  } catch (error) {
    console.error("Error in handleBeatClick:", error);
  }
};

const playNext = async () => {
  if (!currentBeat.value || filteredBeats.value.length === 0) return;

  const currentIndex = filteredBeats.value.findIndex(
    (beat) => beat.id === currentBeat.value.id
  );

  if (currentIndex < filteredBeats.value.length - 1) {
    const nextBeat = filteredBeats.value[currentIndex + 1];
    await handleBeatClick(nextBeat);
  }
};

const playPrevious = async () => {
  if (!currentBeat.value || filteredBeats.value.length === 0) return;

  const currentIndex = filteredBeats.value.findIndex(
    (beat) => beat.id === currentBeat.value.id
  );

  if (currentIndex > 0) {
    const previousBeat = filteredBeats.value[currentIndex - 1];
    await handleBeatClick(previousBeat);
  }
};

const handleEdit = (beat) => {
  // Navigate to edit page or open edit modal
  console.log("Edit beat:", beat);
};

const handleLicense = (beat) => {
  // Handle licensing logic
  console.log("License beat:", beat);
};

// Watch for route query changes
watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || "";
    applyFilters();
  }
);

// Initialize page when route or search query changes
onMounted(async () => {
  // Read search query from route
  if (route.query.q) {
    searchQuery.value = route.query.q;
  }
  // Fetch all beats from API
  await fetchBeats();
});
</script>

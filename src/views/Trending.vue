<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <div class="bg-gray-950 border-b border-gray-800">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex items-center justify-between py-6 border-t border-gray-800"
        >
          <div>
            <p class="text-sm text-gray-400">Curated highlights</p>
            <h1 class="text-3xl font-bold">Trending Beats</h1>
          </div>
          <span class="text-gray-400 text-sm" v-if="beats.length"
            >Top {{ beats.length }}</span
          >
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <p class="text-gray-400 mt-3">Loading trending beats...</p>
      </div>

      <div
        v-else-if="!beats.length"
        class="text-center py-12 bg-gray-900 rounded-lg border border-gray-800"
      >
        <h3 class="text-xl font-semibold text-white mb-2">No trending beats</h3>
        <p class="text-gray-400">Check back soon for popular picks.</p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <BeatCard v-for="beat in beats" :key="beat.id" v-bind="beat" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import BeatCard from "@/components/BeatCard.vue";
import beatService from "@/services/beatService";

const beats = ref([]);
const loading = ref(false);

const fetchTrending = async () => {
  loading.value = true;
  try {
    const response = await beatService.getAllBeats();
    let data = response.data || response || [];

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
          price: beat.price ? `$${beat.price}` : "Free",
          cover:
            beat.coverImage || beat.cover || "https://via.placeholder.com/300",
          plays: beat.plays || "0",
          views: views,
          fileUrl: beat.audioFileUrl || beat.audioFile || beat.fileUrl || "",
          licenseName: beat.license?.name || "",
        };
      })
    );

    // Filter successful results
    const allBeatsWithViews = beatsWithViewsResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    // Sort by views in descending order
    allBeatsWithViews.sort((a, b) => {
      const viewsA = parseInt(a.views) || 0;
      const viewsB = parseInt(b.views) || 0;
      return viewsB - viewsA;
    });

    // Take top 20 after sorting
    beats.value = allBeatsWithViews.slice(0, 20);
  } catch (err) {
    console.error("Failed to fetch trending beats:", err);
    beats.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTrending);
</script>

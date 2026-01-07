<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Full Page Loading State -->
    <div
      v-if="isPageLoading"
      class="min-h-screen flex flex-col items-center justify-center bg-black"
    >
      <svg
        class="w-16 h-16 animate-spin text-red-600 mb-4"
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
      <p class="text-gray-400 text-lg">Loading your beats...</p>
    </div>

    <!-- Main Content -->
    <template v-else>
      <Navbar @open-upload-modal="openUploadModal" />

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <button
              @click="$router.back()"
              class="text-gray-400 hover:text-white"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 class="text-3xl font-bold">My Beats</h1>
          </div>
          <button
            @click="openUploadModal"
            class="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-medium cursor-pointer"
          >
            Upload New →
          </button>
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
          <p class="text-gray-400 mt-3">Loading your beats...</p>
        </div>

        <div v-else>
          <div
            v-if="beats.length === 0"
            class="text-center py-12 bg-gray-900 rounded-lg border border-gray-800"
          >
            <h3 class="text-xl font-semibold text-white mb-2">
              No beats found
            </h3>
            <p class="text-gray-400 mb-4">
              Upload beats to see them listed here.
            </p>
            <button
              @click="openUploadModal"
              class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium text-white transition cursor-pointer"
            >
              Upload Your First Beat
            </button>
          </div>

          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <BeatCard
              v-for="beat in beats"
              :key="beat.id"
              v-bind="beat"
              isYours
              @play="handlePlayBeat"
              @edit="handleEditBeat"
            />
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex items-center justify-center gap-4">
          <button
            @click="goPrev"
            :disabled="!hasPrev() || loading"
            class="px-3 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            ← Previous
          </button>

          <div class="text-gray-300">Page {{ page }}</div>

          <button
            @click="goNext"
            :disabled="!hasNext() || loading"
            class="px-3 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Next →
          </button>
        </div>

        <UploadBeatModal
          :isOpen="isUploadModalOpen"
          :beatData="beatDataForModal"
          @close="isUploadModalOpen = false"
          @upload="handleBeatUpload"
        />

        <MusicPlayer
          v-if="currentBeat"
          :currentBeat="currentBeat"
          @close="currentBeat = null"
          @next="playNext"
          @previous="playPrevious"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import BeatCard from "@/components/BeatCard.vue";
import UploadBeatModal from "@/components/UploadBeatModal.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import { useAuthStore } from "../../store";
import beatService from "@/services/beatService";

const authStore = useAuthStore();
const beats = ref([]);
const loading = ref(false);
const isPageLoading = ref(true);
const page = ref(1);
const perPage = ref(10);
const lastFetchCount = ref(0);
const isUploadModalOpen = ref(false);
const beatDataForModal = ref(null);
const currentBeat = ref(null);
const currentPlaylist = ref([]);

const fetchMyBeats = async (requestedPage = page.value) => {
  const userId =
    authStore.currentUser.value?.id || localStorage.getItem("userId");
  if (!userId) return;
  loading.value = true;
  try {
    const resp = await beatService.getBeatsByUser(
      userId,
      requestedPage,
      perPage.value
    );
    const data = resp.data || resp || [];
    lastFetchCount.value = (data || []).length;
    page.value = requestedPage;

    // Fetch views for all beats in parallel
    const beatsWithViews = await Promise.allSettled(
      (data || []).map(async (b) => {
        let views = "0";
        try {
          const viewResult = await beatService.getBeatViews(b.id);
          views = String(viewResult.views || viewResult.viewCount || "0");
        } catch (err) {
          console.warn(`Failed to fetch views for beat ${b.id}:`, err);
        }
        return {
          id: b.id,
          title: b.title,
          producer: authStore.currentUser.value?.name || "You",
          price: b.price ? `$${b.price}` : "Free",
          cover: b.coverImage || "https://via.placeholder.com/300",
          plays: b.plays || "0",
          views: views,
          fileUrl: b.audioFileUrl || b.audioFile || b.fileUrl || "",
        };
      })
    );

    beats.value = beatsWithViews
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
  } catch (err) {
    console.error("Failed to fetch my beats:", err);
    beats.value = [];
    lastFetchCount.value = 0;
  } finally {
    loading.value = false;
  }
};

const openUploadModal = () => {
  beatDataForModal.value = null;
  isUploadModalOpen.value = true;
};

const handleEditBeat = (beatData) => {
  beatDataForModal.value = beatData;
  isUploadModalOpen.value = true;
};

const handleBeatUpload = (beatData) => {
  const idx = beats.value.findIndex((b) => b.id === beatData.id);
  const transformed = {
    id: beatData.id,
    title: beatData.title,
    producer: authStore.currentUser.value?.name || "You",
    price: beatData.price ? `$${beatData.price}` : "Free",
    cover: beatData.coverImage || "https://via.placeholder.com/300",
    plays: beatData.plays || "0",
    views: beatData.views || "0",
    fileUrl:
      beatData.audioFileUrl || beatData.audioFile || beatData.fileUrl || "",
  };
  if (idx !== -1) beats.value.splice(idx, 1, transformed);
  else beats.value.unshift(transformed);
};

const handlePlayBeat = async (beatData) => {
  try {
    if (beatData.id) {
      const fullBeat = await beatService.getBeat(beatData.id);

      // For MyBeats, all beats are owned by current user, so no watermark needed
      const beatToPlay = {
        id: fullBeat.id || beatData.id,
        title: fullBeat.title || beatData.title,
        producer:
          fullBeat.producer?.username ||
          fullBeat.producerName ||
          beatData.producer,
        price: fullBeat.price ? `$${fullBeat.price}` : beatData.price,
        cover: fullBeat.coverImage || fullBeat.cover || beatData.cover,
        fileUrl:
          fullBeat.fileUrl ||
          fullBeat.audioFile ||
          fullBeat.audioFileUrl ||
          fullBeat.audioUrl ||
          fullBeat.audio ||
          beatData.fileUrl,
        // Mark as owned since this is MyBeats view
        isOwned: true,
        isPurchased: true,
      };

      console.log("Setting current beat:", beatToPlay);
      currentBeat.value = beatToPlay;

      // Record the beat play
      try {
        await beatService.recordBeatPlay(beatData.id);
      } catch (error) {
        console.warn("Failed to record beat play:", error);
        // Don't stop playback if recording fails
      }
    } else {
      console.log("No ID, using fallback data:", beatData);
      currentBeat.value = beatData;
    }
    currentPlaylist.value = [...beats.value];
  } catch (err) {
    console.error("Error playing beat:", err);
    currentBeat.value = beatData;
    currentPlaylist.value = [...beats.value];
  }
};

const playNext = async () => {
  if (!currentBeat.value || currentPlaylist.value.length === 0) return;
  const currentIndex = currentPlaylist.value.findIndex(
    (b) => b.id === currentBeat.value.id
  );
  if (currentIndex < currentPlaylist.value.length - 1)
    await handlePlayBeat(currentPlaylist.value[currentIndex + 1]);
};
const playPrevious = async () => {
  if (!currentBeat.value || currentPlaylist.value.length === 0) return;
  const currentIndex = currentPlaylist.value.findIndex(
    (b) => b.id === currentBeat.value.id
  );
  if (currentIndex > 0)
    await handlePlayBeat(currentPlaylist.value[currentIndex - 1]);
};

onMounted(async () => {
  try {
    await fetchMyBeats();
  } catch (error) {
    console.error("Error loading beats:", error);
  } finally {
    isPageLoading.value = false;
  }
});

const hasNext = () => lastFetchCount.value === perPage.value;
const hasPrev = () => page.value > 1;
const goNext = async () => {
  if (!hasNext()) return;
  await fetchMyBeats(page.value + 1);
};
const goPrev = async () => {
  if (!hasPrev()) return;
  await fetchMyBeats(page.value - 1);
};
</script>

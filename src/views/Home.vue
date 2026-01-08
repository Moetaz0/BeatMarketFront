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

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <!-- Welcome / Hero -->
        <div class="mb-12">
          <h1 class="text-4xl md:text-5xl font-bold mb-3">
            Welcome back<span v-if="userName">, {{ userName }}</span
            >!
          </h1>
          <p class="text-gray-400 text-lg">
            Discover trending beats and manage your catalog
          </p>
        </div>

        <!-- Trending Tracks Section -->
        <section class="mb-16">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-3xl font-bold">Trending Tracks</h2>
            <router-link
              to="/trending"
              class="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-medium"
            >
              View all →
            </router-link>
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <BeatCard
              v-for="beat in trendingBeats"
              :key="beat.id"
              v-bind="beat"
              :isYours="beat.isOwned"
              @play="handlePlayBeat"
            />
          </div>
        </section>

        <!-- Your Recent Uploads -->
        <section>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-3xl font-bold">Your Recent Uploads</h2>
            <button
              @click="openUploadModal"
              class="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              Upload New →
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loadingBeats" class="text-center py-12">
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

          <!-- Empty State -->
          <div
            v-else-if="yourBeats.length === 0"
            class="text-center py-12 bg-gray-900 rounded-lg border border-gray-800"
          >
            <svg
              class="w-16 h-16 text-gray-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <h3 class="text-xl font-semibold text-white mb-2">
              No beats uploaded yet
            </h3>
            <p class="text-gray-400 mb-4">
              Start uploading your beats to build your catalog
            </p>
            <button
              @click="openUploadModal"
              class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium text-white transition cursor-pointer"
            >
              Upload Your First Beat
            </button>
          </div>

          <!-- Beats Grid -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <BeatCard
              v-for="beat in yourBeats"
              :key="beat.id"
              v-bind="beat"
              :isYours="true"
              @play="handlePlayBeat"
              @edit="handleEditBeat"
            />
          </div>
        </section>
      </div>

      <!-- Upload Beat Modal -->
      <UploadBeatModal
        :isOpen="isUploadModalOpen"
        :beatData="beatDataForModal"
        @close="isUploadModalOpen = false"
        @upload="handleBeatUpload"
      />

      <!-- Music Player -->
      <MusicPlayer
        v-if="currentBeat"
        :currentBeat="currentBeat"
        :isYours="currentBeatIsYours"
        @close="currentBeat = null"
        @next="playNext"
        @previous="playPrevious"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Navbar from "@/components/Navbar.vue";
import BeatCard from "@/components/BeatCard.vue";
import UploadBeatModal from "@/components/UploadBeatModal.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import authService from "@/services/authService";
import beatService from "@/services/beatService";
import { useAuthStore } from "../../store";

const authStore = useAuthStore();
const isUploadModalOpen = ref(false);
const beatDataForModal = ref(null);
const userName = ref(
  authStore.currentUser.value?.name ||
    authStore.currentUser.value?.username ||
    authStore.state.email ||
    ""
);
const profile = ref(null);
const loadingProfile = ref(false);
const profileError = ref("");
const loadingBeats = ref(false);
const isPageLoading = ref(true);
const currentBeat = ref(null);
const currentBeatIsYours = ref(false);
const currentPlaylist = ref([]);

const yourBeats = ref([]);
const trendingBeats = ref([]);
const userBeatIds = ref(new Set()); // Track user's beat IDs for quick lookup

// Music player functions
const handlePlayBeat = async (beatData) => {
  try {
    // Fetch the full beat data from backend to get the Cloudinary audio URL
    if (beatData.id) {
      const fullBeat = await beatService.getBeat(beatData.id);
      console.log("Fetched full beat data for playback:", fullBeat);

      // Check if beat is owned by current user or purchased
      const currentUserId = authStore.currentUser.value?.id;
      const isOwned =
        fullBeat.userId === currentUserId ||
        fullBeat.createdBy === currentUserId ||
        beatData.isOwned; // Use isOwned flag from beatData if available
      const isPurchased = fullBeat.isPurchased || isOwned; // If owned, treat as purchased

      const beatToPlay = {
        id: fullBeat.id || beatData.id,
        title: fullBeat.title || beatData.title,
        producer:
          fullBeat.user?.username ||
          fullBeat.producer?.username ||
          fullBeat.producer?.name ||
          fullBeat.producerName ||
          fullBeat.producer ||
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
        licenseName: fullBeat.license?.name || fullBeat.licenseName || "",
        // Add purchase info (watermark is generated in frontend)
        isOwned: isOwned,
        isPurchased: isPurchased,
        producerId:
          fullBeat.userId || fullBeat.createdBy || beatData.producerId,
      };

      console.log("Setting current beat:", beatToPlay);
      currentBeat.value = beatToPlay;
      // Use isYours from beatData if available (from BeatCard), otherwise use ownership check
      currentBeatIsYours.value = beatData.isYours || isOwned;

      // Record the beat play
      try {
        await beatService.recordBeatPlay(beatData.id);
      } catch (error) {
        console.warn("Failed to record beat play:", error);
        // Don't stop playback if recording fails
      }
    } else {
      // Fallback to demo data if no ID
      console.log("No ID, using fallback data:", beatData);
      currentBeat.value = beatData;
      currentBeatIsYours.value = false;
    }

    // Store current playlist context (combine trending and user beats)
    currentPlaylist.value = [...trendingBeats.value, ...yourBeats.value];
  } catch (error) {
    console.error("Error playing beat:", error);
    // Fallback to the data we have
    currentBeat.value = beatData;
    currentPlaylist.value = [...trendingBeats.value, ...yourBeats.value];
  }
};

const playNext = async () => {
  if (!currentBeat.value || currentPlaylist.value.length === 0) return;

  const currentIndex = currentPlaylist.value.findIndex(
    (beat) => beat.id === currentBeat.value.id
  );

  if (currentIndex < currentPlaylist.value.length - 1) {
    const nextBeat = currentPlaylist.value[currentIndex + 1];
    await handlePlayBeat(nextBeat);
  }
};

const playPrevious = async () => {
  if (!currentBeat.value || currentPlaylist.value.length === 0) return;

  const currentIndex = currentPlaylist.value.findIndex(
    (beat) => beat.id === currentBeat.value.id
  );

  if (currentIndex > 0) {
    const previousBeat = currentPlaylist.value[currentIndex - 1];
    await handlePlayBeat(previousBeat);
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

const fetchUserBeats = async () => {
  const userId =
    authStore.currentUser.value?.id || localStorage.getItem("userId");

  if (!userId) {
    return;
  }

  try {
    loadingBeats.value = true;
    const response = await beatService.getBeatsByUser(userId, 1, 10);

    // Transform the API data to match the BeatCard component props
    const beats = response.data || [];

    // Clear and populate userBeatIds set with user's beat IDs
    userBeatIds.value.clear();
    beats.forEach((beat) => {
      userBeatIds.value.add(beat.id);
    });

    const beatsWithViews = await Promise.allSettled(
      beats.map(async (beat) => {
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
          producer: authStore.currentUser.value?.name || "You",
          price: beat.price ? `$${beat.price}` : "Free",
          cover: beat.coverImage || "https://via.placeholder.com/300",
          plays: beat.plays || "0",
          views: views,
          fileUrl: beat.audioFileUrl || beat.audioFile || "",
          producerId: beat.userId || userId,
        };
      })
    );

    yourBeats.value = beatsWithViews
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
  } catch (error) {
    console.error("Failed to fetch user beats:", error);
    // Keep empty array on error
  } finally {
    loadingBeats.value = false;
  }
};

const fetchTrending = async () => {
  try {
    const response = await beatService.getAllBeats();
    let beats = response.data || response || [];

    // Fetch views for all beats first
    const beatsWithViewsResults = await Promise.allSettled(
      beats.map(async (beat) => {
        let views = "0";
        try {
          const viewResult = await beatService.getBeatViews(beat.id);
          views = String(viewResult.views || viewResult.viewCount || "0");
        } catch (err) {
          console.warn(`Failed to fetch views for beat ${beat.id}:`, err);
        }

        // Check if beat belongs to current user by checking userBeatIds set
        const isOwned = userBeatIds.value.has(beat.id);

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
          producerId: beat.userId || beat.producer?.id || beat.createdBy,
          isOwned: isOwned,
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

    // Take top 8 after sorting
    trendingBeats.value = allBeatsWithViews.slice(0, 8);
  } catch (err) {
    console.error("Failed to fetch trending beats:", err);
    trendingBeats.value = [];
  }
};

const handleBeatUpload = (beatData) => {
  // If the beat already exists in the list (edit), update it; otherwise prepend new beat
  const existingIndex = yourBeats.value.findIndex((b) => b.id === beatData.id);
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

  const beatWithProducerId = {
    ...transformed,
    producerId: beatData.userId || authStore.currentUser.value?.id,
  };
  if (existingIndex !== -1) {
    yourBeats.value.splice(existingIndex, 1, beatWithProducerId);
  } else {
    yourBeats.value.unshift(beatWithProducerId);
  }
};

const fetchProfile = async () => {
  console.log(
    "fetchProfile called, isAuthenticated:",
    authStore.isAuthenticated.value
  );
  if (!authStore.isAuthenticated.value) {
    console.log("Not authenticated, skipping profile fetch");
    return;
  }

  loadingProfile.value = true;
  profileError.value = "";

  try {
    const { data } = await authService.getProfile();
    console.log("Fetched profile data:", data);
    profile.value = data;
    userName.value = data.username;

    // Store userId for beat uploads
    if (data.id) {
      localStorage.setItem("userId", data.id);
    }

    // Store user role if available
    if (data.role) {
      localStorage.setItem("user_role", data.role);
    }

    authStore.setUser({
      ...data,
      name: data.username,
      avatar: data.profilePicture,
    });
    authStore.setEmail(data.email);
  } catch (error) {
    console.error("Profile fetch error (full):", error);
    console.error("Error response:", error.response);
    console.error("Error message:", error.message);
    profileError.value =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Unable to load profile. Please check your backend JWT configuration.";
  } finally {
    loadingProfile.value = false;
  }
};

onMounted(async () => {
  try {
    await fetchProfile();
    console.log("Profile loaded:", authStore.currentUser.value);

    // Fetch user's beats and trending beats after profile is loaded
    await Promise.all([fetchUserBeats(), fetchTrending()]);
  } catch (error) {
    console.error("Error during page initialization:", error);
  } finally {
    // Hide loading state after all data is fetched
    isPageLoading.value = false;
  }
});
</script>

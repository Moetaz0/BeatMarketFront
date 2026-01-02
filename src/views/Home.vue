<template>
  <div class="min-h-screen bg-black text-white">
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
          <a
            href="#"
            class="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-medium"
          >
            View all →
          </a>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <BeatCard
            v-for="beat in trendingBeats"
            :key="beat.id"
            v-bind="beat"
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
            isYours
            @play="handlePlayBeat"
          />
        </div>
      </section>
    </div>

    <!-- Upload Beat Modal -->
    <UploadBeatModal
      :isOpen="isUploadModalOpen"
      @close="isUploadModalOpen = false"
      @upload="handleBeatUpload"
    />

    <!-- Music Player -->
    <MusicPlayer
      v-if="currentBeat"
      :currentBeat="currentBeat"
      @close="currentBeat = null"
      @next="playNext"
      @previous="playPrevious"
    />
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
const currentBeat = ref(null);
const currentPlaylist = ref([]);

// Dummy data - replace with real API calls later
const trendingBeats = ref([
  {
    id: 1,
    title: "Murder | Kendrick x JID Type",
    producer: "ShadowProd",
    price: "$29.95",
    cover:
      "https://townsquare.media/site/812/files/2022/12/attachment-freddie-gibbs-pusha-t-latto-drake-21-savage-glorilla-jid.jpg?w=780&q=75",
    plays: "12.4k",
    fileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Demo audio
  },
  {
    id: 2,
    title: "Yeat x KanKan - Alien Vibes",
    producer: "Nebula",
    price: "$19.99",
    cover: "https://i.ytimg.com/vi/HZZZyIKvAWE/maxresdefault.jpg",
    plays: "8.9k",
    fileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Demo audio
  },
  {
    id: 3,
    title: "200 Beats Mega Bundle 🔥",
    producer: "MarkkAylin",
    price: "$49.99",
    cover: "https://i.ytimg.com/vi/YGlJ6LwuidU/maxresdefault.jpg",
    plays: "15.2k",
    fileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", // Demo audio
  },
  {
    id: 4,
    title: "Keepin It Real Free Type",
    producer: "StunnaBeatz",
    price: "Free",
    cover:
      "http://unfocussed.com/cdn/shop/articles/Luminescent_Symphony.png?v=1732049525",
    plays: "22.1k",
    fileUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", // Demo audio
  },
]);

const yourBeats = ref([]);

// Music player functions
const handlePlayBeat = async (beatData) => {
  try {
    // Fetch the full beat data from backend to get the Cloudinary audio URL
    if (beatData.id) {
      const fullBeat = await beatService.getBeat(beatData.id);

      // Update current beat with the full data including audio file URL from Cloudinary
      currentBeat.value = {
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
      };
    } else {
      // Fallback to demo data if no ID
      currentBeat.value = beatData;
    }

    // Store current playlist context (combine trending and user beats)
    currentPlaylist.value = [...trendingBeats.value, ...yourBeats.value];
  } catch (error) {
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
    yourBeats.value = beats.map((beat) => ({
      id: beat.id,
      title: beat.title,
      producer: authStore.currentUser.value?.name || "You",
      price: beat.price ? `$${beat.price}` : "Free",
      cover: beat.coverImage || "https://via.placeholder.com/300",
      plays: beat.plays || "0",
      fileUrl: beat.audioFileUrl || beat.audioFile || "",
    }));
  } catch (error) {
    console.error("Failed to fetch user beats:", error);
    // Keep empty array on error
  } finally {
    loadingBeats.value = false;
  }
};

const handleBeatUpload = (beatData) => {
  // Add the newly created beat to the beginning of your beats array
  const newBeat = {
    id: beatData.id,
    title: beatData.title,
    producer: authStore.currentUser.value?.name || "You",
    price: `$${beatData.price}`,
    cover: beatData.coverImage || "https://via.placeholder.com/300",
    plays: "0",
    fileUrl: beatData.audioFileUrl || beatData.audioFile || "",
  };
  yourBeats.value.unshift(newBeat);
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
  await fetchProfile();
  console.log("Profile loaded:", authStore.currentUser.value);

  // Fetch user's beats after profile is loaded
  await fetchUserBeats();
});
</script>

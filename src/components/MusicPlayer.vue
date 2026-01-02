<template>
  <transition name="slide-up">
    <div
      v-if="currentBeat"
      class="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-t border-gray-700 z-50 shadow-2xl"
    >
      <!-- Error Message -->
      <div
        v-if="loadError"
        class="bg-red-900/50 border-b border-red-700 px-4 py-2"
      >
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-2 text-sm">
            <svg
              class="w-5 h-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-red-200">{{ loadErrorMessage }}</span>
          </div>
          <button
            @click="loadError = false"
            class="text-red-400 hover:text-red-300"
          >
            ×
          </button>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center gap-4">
          <!-- Beat Info & Cover -->
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <img
              :src="currentBeat.cover || fallbackCover"
              alt="Beat cover"
              class="w-14 h-14 rounded object-cover"
            />
            <div class="min-w-0 flex-1">
              <h4 class="text-white font-semibold truncate">
                {{ currentBeat.title }}
              </h4>
              <p class="text-gray-400 text-sm truncate">
                {{ currentBeat.producer }}
              </p>
            </div>
          </div>

          <!-- Player Controls -->
          <div class="flex flex-col items-center gap-2 flex-1">
            <div class="flex items-center gap-4">
              <!-- Previous Button -->
              <button
                @click="previous"
                class="text-gray-400 hover:text-white transition"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"
                  />
                </svg>
              </button>

              <!-- Play/Pause Button -->
              <button
                @click="togglePlay"
                class="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition"
              >
                <svg
                  v-if="!isPlaying"
                  class="w-5 h-5 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Next Button -->
              <button
                @click="next"
                class="text-gray-400 hover:text-white transition"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"
                  />
                </svg>
              </button>
            </div>

            <!-- Progress Bar -->
            <div class="w-full flex items-center gap-2">
              <span class="text-xs text-gray-400 min-w-[40px]">{{
                formatTime(currentTime)
              }}</span>
              <div
                class="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group"
                @click="seek"
              >
                <div
                  class="h-full bg-red-600 rounded-full relative group-hover:bg-red-500 transition"
                  :style="{ width: `${progress}%` }"
                >
                  <div
                    class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  ></div>
                </div>
              </div>
              <span class="text-xs text-gray-400 min-w-[40px]">{{
                formatTime(duration)
              }}</span>
            </div>
          </div>

          <!-- Volume & Close -->
          <div class="flex items-center gap-4 flex-1 justify-end">
            <!-- Volume Control -->
            <div class="flex items-center gap-2">
              <button
                @click="toggleMute"
                class="text-gray-400 hover:text-white transition"
              >
                <svg
                  v-if="volume > 0"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <input
                v-model="volume"
                type="range"
                min="0"
                max="100"
                class="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                @input="updateVolume"
              />
            </div>

            <!-- Close Button -->
            <button
              @click="close"
              class="text-gray-400 hover:text-white transition"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Hidden Audio Element -->
      <audio
        ref="audioPlayer"
        @timeupdate="updateProgress"
        @loadedmetadata="onMetadataLoaded"
        @ended="onEnded"
        @error="onAudioError"
        @canplay="onCanPlay"
      ></audio>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  currentBeat: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "next", "previous"]);

const fallbackCover =
  "https://i8.amplience.net/i/naras/hero_1644x925_v1.png.jpg";
const audioPlayer = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(70);
const loadError = ref(false);
const loadErrorMessage = ref("");

const progress = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

const togglePlay = () => {
  if (!audioPlayer.value) return;

  if (isPlaying.value) {
    audioPlayer.value.pause();
    isPlaying.value = false;
  } else {
    audioPlayer.value
      .play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch(() => {
        isPlaying.value = false;
      });
  }
};

const onAudioError = (event) => {
  loadError.value = true;

  // Get error code and provide user-friendly message
  const errorCode = audioPlayer.value?.error?.code;
  const errorMessage = audioPlayer.value?.error?.message;

  if (errorCode === 4 || errorMessage?.includes("URL safety check")) {
    loadErrorMessage.value =
      "Cannot play audio due to CORS restrictions. Please check CLOUDINARY_CORS_FIX.md for solution.";
  } else if (errorCode === 3) {
    loadErrorMessage.value = "Audio file format not supported by your browser.";
  } else if (errorCode === 2) {
    loadErrorMessage.value =
      "Network error while loading audio. Please check your connection.";
  } else {
    loadErrorMessage.value = "Failed to load audio file. Please try again.";
  }
};

const onCanPlay = () => {
  loadError.value = false;
};

const seek = (event) => {
  if (!audioPlayer.value) return;

  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percentage = x / rect.width;
  audioPlayer.value.currentTime = percentage * duration.value;
};

const updateProgress = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime;
  }
};

const onMetadataLoaded = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration;
  }
};

const onEnded = () => {
  isPlaying.value = false;
  emit("next");
};

const updateVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value / 100;
  }
};

const toggleMute = () => {
  if (volume.value > 0) {
    volume.value = 0;
  } else {
    volume.value = 70;
  }
  updateVolume();
};

const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const close = () => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.currentTime = 0;
  }
  isPlaying.value = false;
  emit("close");
};

const next = () => {
  emit("next");
};

const previous = () => {
  emit("previous");
};

// Watch for beat changes
watch(
  () => props.currentBeat,
  (newBeat, oldBeat) => {
    console.log("Beat changed - Full Beat Object:", newBeat);
    console.log("Beat fileUrl property:", newBeat?.fileUrl);
    console.log(
      "All beat properties:",
      newBeat ? Object.keys(newBeat) : "null"
    );

    if (!newBeat || !audioPlayer.value) {
      return;
    }

    const audioUrl = newBeat.fileUrl || "";

    if (!audioUrl) {
      loadError.value = true;
      loadErrorMessage.value = "No audio file available for this beat.";
      return;
    }

    // Reset player state and errors
    audioPlayer.value.pause();
    isPlaying.value = false;
    currentTime.value = 0;
    loadError.value = false;

    // Set source and load
    audioPlayer.value.src = audioUrl;
    audioPlayer.value.load();

    // Attempt to play
    if (newBeat.autoPlay !== false) {
      // Use setTimeout to ensure element is ready
      setTimeout(() => {
        audioPlayer.value
          ?.play()
          .then(() => {
            isPlaying.value = true;
            loadError.value = false;
          })
          .catch(() => {
            isPlaying.value = false;
          });
      }, 100);
    }
  },
  { immediate: false }
);

// Set initial volume
watch(
  audioPlayer,
  (player) => {
    if (player) {
      player.volume = volume.value / 100;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

/* Custom slider styles */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
</style>

<template>
  <transition name="slide-up">
    <div
      v-if="currentBeat"
      class="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-gradient-to-t from-gray-950/99 via-slate-900/98 to-slate-800/90 border-t border-red-500/30 z-50 shadow-2xl"
    >
      <!-- Animated gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-red-500/5 via-rose-500/5 to-pink-500/5 pointer-events-none"
      ></div>

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

      <div class="max-w-7xl mx-auto px-6 py-3 relative">
        <!-- Main Player Container -->
        <div class="flex flex-col gap-3">
          <!-- Top Row: Beat Info + Controls + Actions -->
          <div class="flex items-center gap-6">
            <!-- Beat Cover & Info Section -->
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <!-- Album Art -->
              <div class="relative group shrink-0">
                <img
                  :src="currentBeat.cover || fallbackCover"
                  alt="Beat cover"
                  class="w-16 h-16 rounded-lg object-cover shadow-2xl shadow-red-900/40 ring-2 ring-red-500/30 group-hover:ring-red-400/50 transition-all duration-300"
                />
                <!-- Glow effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-lg blur-xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity"
                ></div>
                <!-- Now playing indicator -->
                <div
                  class="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-rose-500 rounded-full p-1 shadow-lg"
                >
                  <div
                    class="w-2 h-2 bg-white rounded-full animate-pulse"
                  ></div>
                </div>
              </div>

              <!-- Beat Metadata -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="text-xs font-semibold text-red-400 uppercase tracking-wider"
                    >Now Playing</span
                  >
                  <span
                    v-if="isWatermarked"
                    class="text-xs font-bold px-2.5 py-1 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 text-yellow-200 rounded-full border border-yellow-400/60 shadow-lg shadow-yellow-500/20 backdrop-blur-sm"
                    >Preview</span
                  >
                </div>
                <h4 class="text-white font-bold text-sm truncate">
                  {{ currentBeat.title }}
                </h4>
                <p class="text-gray-500 text-xs truncate">
                  {{ currentBeat.producer }}
                </p>
              </div>
            </div>

            <!-- Player Controls (Center) -->
            <div class="flex items-center gap-4 flex-shrink-0">
              <!-- Previous Button -->
              <button
                @click="previous"
                class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
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
                class="w-12 h-12 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 hover:from-red-400 hover:via-rose-400 hover:to-pink-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/40 hover:shadow-red-400/50 transition-all duration-300 hover:scale-105 active:scale-95 ring-2 ring-white/10 hover:ring-white/20"
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
                class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"
                  />
                </svg>
              </button>
            </div>

            <!-- Right Actions: Volume + Cart + Close -->
            <div class="flex items-center gap-3 flex-shrink-0">
              <!-- Volume Control -->
              <div
                class="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full px-3 py-2 transition-all duration-300"
              >
                <button
                  @click="toggleMute"
                  class="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
                >
                  <svg
                    v-if="volume > 0"
                    class="w-4 h-4"
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
                    class="w-4 h-4"
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
                  class="w-24 h-1.5 bg-transparent rounded-lg appearance-none cursor-pointer slider"
                  @input="updateVolume"
                />
              </div>

              <!-- Add to Cart Button -->
              <button
                v-show="!props.isYours"
                @click="addToCart"
                :class="[
                  'flex items-center justify-center w-9 h-9 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 relative group',
                  cartStore.isInCart(props.currentBeat.id)
                    ? 'bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-500/30 hover:shadow-green-400/40 text-white'
                    : 'bg-gradient-to-br from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-500/30 hover:shadow-red-400/40 text-white',
                ]"
              >
                <svg
                  v-if="!cartStore.isInCart(props.currentBeat.id)"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
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
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <!-- Tooltip -->
                <div
                  class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {{
                    cartStore.isInCart(props.currentBeat.id)
                      ? "Remove from Cart"
                      : "Add to Cart"
                  }}
                </div>
              </button>

              <!-- Close Button -->
              <button
                @click="close"
                class="flex items-center justify-center w-9 h-9 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
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

          <!-- Progress Bar (Full Width) -->
          <div class="w-full flex items-center gap-3">
            <span
              class="text-xs text-gray-400 font-medium min-w-[32px] tabular-nums"
            >
              {{ formatTime(currentTime) }}
            </span>
            <div
              class="flex-1 h-1.5 bg-white/5 rounded-full cursor-pointer group shadow-inner overflow-hidden relative hover:h-2 transition-all duration-200"
              @click="seek"
            >
              <!-- Progress fill -->
              <div
                class="h-full bg-gradient-to-r from-red-500 via-rose-400 to-pink-400 rounded-full relative shadow-lg shadow-red-500/30 group-hover:shadow-red-400/40 transition-shadow"
                :style="{ width: `${progress}%` }"
              >
                <!-- Progress thumb -->
                <div
                  class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg ring-2 ring-red-400/50"
                ></div>
              </div>
            </div>
            <span
              class="text-xs text-gray-400 font-medium min-w-[32px] text-right tabular-nums"
            >
              {{ formatTime(duration) }}
            </span>
          </div>

          <!-- Status Bar: Watermark message -->
          <div
            v-if="isWatermarked || showCartMessage"
            class="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg text-xs border border-yellow-400/30 backdrop-blur-sm"
          >
            <p v-if="isWatermarked" class="text-yellow-200 font-medium">
              💡 Preview version - Purchase to unlock full speed
            </p>
            <transition name="fade">
              <p
                v-if="
                  showCartMessage && cartStore.isInCart(props.currentBeat.id)
                "
                class="text-green-400 font-semibold"
              >
                ✓ Added to cart!
              </p>
              <p
                v-else-if="
                  showCartMessage && !cartStore.isInCart(props.currentBeat.id)
                "
                class="text-red-400 font-semibold"
              >
                ✓ Removed from cart
              </p>
            </transition>
          </div>
        </div>
      </div>

      <!-- Hidden Audio Element -->
      <audio
        ref="audioPlayer"
        crossorigin="anonymous"
        preload="auto"
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
import { ref, watch, computed, nextTick } from "vue";
import { useCartStore, useAuthStore } from "../../store";

const props = defineProps({
  currentBeat: {
    type: Object,
    default: null,
  },
  isYours: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "next", "previous"]);

const cartStore = useCartStore();
const authStore = useAuthStore();
const showCartMessage = ref(false);

const fallbackCover =
  "https://i8.amplience.net/i/naras/hero_1644x925_v1.png.jpg";
const audioPlayer = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(70);
const loadError = ref(false);
const loadErrorMessage = ref("");
const isWatermarked = ref(false);
const watermarkPlayed = ref(false);

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
    // Check if we're starting from the beginning and watermark needs to play
    if (
      isWatermarked.value &&
      watermarkPlayed.value &&
      currentTime.value < 0.5 // If near the start
    ) {
      // Reset watermark flag and play it again
      watermarkPlayed.value = false;
      audioPlayer.value.currentTime = 0;
      playWatermarkFirst(() => {
        audioPlayer.value.play();
        isPlaying.value = true;
      });
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

const addToCart = () => {
  if (props.currentBeat) {
    if (cartStore.isInCart(props.currentBeat.id)) {
      // Remove from cart if already in cart
      cartStore.removeFromCart(props.currentBeat.id);
      showCartMessage.value = true;
      setTimeout(() => {
        showCartMessage.value = false;
      }, 1500);
    } else {
      // Add to cart if not in cart
      cartStore.addToCart(props.currentBeat);
      showCartMessage.value = true;
      setTimeout(() => {
        showCartMessage.value = false;
      }, 1500);
    }
  }
};

const next = () => {
  emit("next");
};

const previous = () => {
  emit("previous");
};

// Helper function to load and play beat
const loadAndPlayBeat = () => {
  console.log("loadAndPlayBeat called with:", props.currentBeat);

  if (!props.currentBeat || !audioPlayer.value) {
    console.warn("Missing currentBeat or audioPlayer:", {
      beat: !!props.currentBeat,
      player: !!audioPlayer.value,
    });
    return;
  }

  // Check if beat needs watermarking (not owned and not purchased)
  // Beat is owned by current user if isYours flag is true OR user ID matches producer ID
  const isPurchased = props.currentBeat.isPurchased || false;
  const isOwned = props.currentBeat.isOwned || false;
  const isBeatOwnedByCurrentUser =
    props.isYours ||
    authStore.currentUser.value?.id === props.currentBeat.producerId;

  isWatermarked.value = !isPurchased && !isOwned && !isBeatOwnedByCurrentUser;
  watermarkPlayed.value = false; // Always reset watermark flag for new beat play

  // Always use full URL, but will lower BPM for unpurchased beats
  const audioUrl = props.currentBeat.fileUrl || "";

  if (!audioUrl) {
    loadError.value = true;
    loadErrorMessage.value = "No audio file available for this beat.";
    console.error("No audio URL found");
    return;
  }

  console.log(
    "Loading beat:",
    props.currentBeat.title,
    "URL:",
    audioUrl,
    "Watermarked:",
    isWatermarked.value
  );

  // Reset player state and errors
  audioPlayer.value.pause();
  isPlaying.value = false;
  currentTime.value = 0;
  duration.value = 0;
  loadError.value = false;

  // Always play watermark if beat is watermarked (don't check watermarkPlayed flag)
  if (isWatermarked.value) {
    playWatermarkFirst(() => {
      loadBeatAudio(audioUrl);
    });
  } else {
    // If not watermarked, load and play beat directly
    loadBeatAudio(audioUrl);
  }
};

// Helper function to load beat audio
const loadBeatAudio = (audioUrl) => {
  if (!audioPlayer.value) return;

  // Set source and load
  audioPlayer.value.src = audioUrl;
  audioPlayer.value.load();

  // Lower playback speed for unpurchased beats
  if (isWatermarked.value) {
    audioPlayer.value.playbackRate = 0.85; // Reduced to 85% BPM (~15% slower)
    console.log("Lowering BPM to 85% for preview beat");
  } else {
    audioPlayer.value.playbackRate = 1.0; // Normal speed
  }

  // Wait for the audio to be ready and then play
  const playAttempt = () => {
    if (!audioPlayer.value) return;

    const playPromise = audioPlayer.value.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Audio playing successfully");
          isPlaying.value = true;
          loadError.value = false;
        })
        .catch((err) => {
          console.error("Play error:", err);
          isPlaying.value = false;
        });
    }
  };

  // Try to play immediately after setting src
  playAttempt();
};

// Helper function to generate and play watermark using Web Audio API and Speech Synthesis
const playWatermarkFirst = (onComplete) => {
  const watermarkText = "This beat is secure by BeatMarket";

  // Try to use Web Speech API for text-to-speech
  const synth = window.speechSynthesis;

  if (synth && synth.getVoices) {
    const utterance = new SpeechSynthesisUtterance(watermarkText);
    utterance.rate = 1.0; // Normal speaking speed
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Try to use a male voice for professional sound
    const voices = synth.getVoices();
    if (voices.length > 0) {
      // Prefer a professional sounding voice
      const preferredVoice =
        voices.find(
          (voice) =>
            voice.name.includes("Google") ||
            voice.name.includes("Microsoft") ||
            voice.name.includes("Male")
        ) || voices[0];
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      watermarkPlayed.value = true;
      console.log("Watermark finished, loading beat");
      // Add small delay to ensure clean transition
      setTimeout(() => {
        onComplete();
      }, 200);
    };

    utterance.onerror = (event) => {
      console.log(
        "Watermark speech synthesis failed, continuing with beat:",
        event.error
      );
      watermarkPlayed.value = true;
      onComplete();
    };

    // Cancel any ongoing speech
    synth.cancel();

    // Speak the watermark
    try {
      synth.speak(utterance);
      console.log("Playing watermark: ", watermarkText);
    } catch (err) {
      console.log("Could not play watermark:", err);
      watermarkPlayed.value = true;
      onComplete();
    }
  } else {
    // Fallback: if speech synthesis not available, use Web Audio API tone
    console.log("Speech synthesis not available, using audio tone watermark");
    playToneWatermark(onComplete);
  }
};

// Helper function to play a tone-based watermark using Web Audio API
const playToneWatermark = (onComplete) => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const duration = 2; // 2 second watermark tone
    const now = audioContext.currentTime;

    // Create oscillator for tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Create a series of beeps/tones to represent "watermark"
    oscillator.frequency.setValueAtTime(440, now); // A4 note
    oscillator.frequency.setValueAtTime(880, now + 0.5); // A5 note
    oscillator.frequency.setValueAtTime(440, now + 1.0); // A4 note
    oscillator.frequency.setValueAtTime(440, now + 1.5); // A4 note

    // Volume envelope
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);

    // Call onComplete after tone duration
    setTimeout(() => {
      watermarkPlayed.value = true;
      console.log("Tone watermark finished, loading beat");
      onComplete();
    }, duration * 1000 + 200);
  } catch (err) {
    console.log("Could not play tone watermark:", err);
    watermarkPlayed.value = true;
    // Still continue even if watermark fails
    setTimeout(() => {
      onComplete();
    }, 100);
  }
};

// Watch for beat changes
watch(
  () => props.currentBeat,
  async (newBeat, oldBeat) => {
    console.log("currentBeat changed:", newBeat?.id, "old:", oldBeat?.id);
    // Wait for DOM to be ready before loading beat
    await nextTick();
    loadAndPlayBeat();
  },
  { deep: true, immediate: true }
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

/* Fade transition for messages */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom slider styles */
.slider {
  background: transparent;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, #ef4444, #ec4899);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
  transition: all 0.2s ease;
  margin-top: -3px; /* Center the thumb on the track */
}

.slider::-webkit-slider-thumb:hover {
  width: 16px;
  height: 16px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.7);
  margin-top: -4px; /* Adjust for larger size */
}

.slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: linear-gradient(135deg, #ef4444, #ec4899);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  width: 16px;
  height: 16px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.7);
}

/* Slider track */
.slider::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    rgba(239, 68, 68, 0.3),
    rgba(236, 72, 153, 0.3)
  );
  height: 8px;
  border-radius: 4px;
}

.slider::-moz-range-track {
  background: linear-gradient(
    to right,
    rgba(239, 68, 68, 0.3),
    rgba(236, 72, 153, 0.3)
  );
  height: 8px;
  border-radius: 4px;
}

/* Animations */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes gradient-shift {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-shimmer {
  animation: shimmer 3s infinite;
}

.animate-gradient-shift {
  animation: gradient-shift 4s ease-in-out infinite;
}
</style>

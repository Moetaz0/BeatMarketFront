<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
  >
    <div
      class="bg-gradient-to-br from-gray-950/95 via-slate-900/95 to-gray-900/95 border border-white/10 rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
    >
      <!-- Header -->
      <div
        class="sticky top-0 bg-gradient-to-r from-gray-950 via-gray-900 to-slate-900 border-b border-white/10 px-8 py-6 flex items-center justify-between backdrop-blur-sm"
      >
        <div>
          <h2
            class="text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent"
          >
            {{ isEditMode ? "Edit Beat" : "Upload Beat" }}
          </h2>
          <p class="text-sm text-gray-300 mt-1">
            Step
            <span class="font-semibold text-red-400">{{ currentStep }}</span> of
            <span class="font-semibold">{{ isEditMode ? "1" : "2" }}</span>
          </p>
        </div>
        <button
          @click="closeModal"
          class="text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10 active:scale-95"
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

      <!-- Progress Bar -->
      <div
        class="px-8 py-5 bg-gradient-to-r from-gray-900/30 to-slate-900/30 border-b border-white/5 backdrop-blur-sm"
      >
        <div class="flex gap-3">
          <div
            :class="[
              'flex-1 h-1.5 rounded-full transition-all duration-500',
              currentStep >= 1
                ? 'bg-gradient-to-r from-red-500 to-rose-500 shadow-lg shadow-red-500/50'
                : 'bg-gray-700',
            ]"
          ></div>
          <div
            :class="[
              'flex-1 h-1.5 rounded-full transition-all duration-500',
              currentStep >= 2
                ? 'bg-gradient-to-r from-red-500 to-rose-500 shadow-lg shadow-red-500/50'
                : 'bg-gray-700',
            ]"
          ></div>
        </div>
      </div>

      <!-- Content -->
      <div class="px-8 py-8">
        <!-- Step 1: Basic Info -->
        <div v-if="currentStep === 1">
          <div class="space-y-6">
            <!-- Title -->
            <div>
              <label
                class="block text-sm font-semibold text-white mb-3 flex items-center gap-1"
              >
                <span
                  class="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent"
                  >Beat Title</span
                >
                <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.title"
                type="text"
                placeholder="e.g., Trap Soul 2025"
                class="w-full bg-gray-800/40 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
              />
              <p
                v-if="errors.title"
                class="text-red-400 text-sm mt-2 flex items-center gap-1"
              >
                <span>⚠</span> {{ errors.title }}
              </p>
            </div>

            <!-- Genre -->
            <div>
              <label
                class="block text-sm font-semibold text-white mb-3 flex items-center gap-1"
              >
                <span
                  class="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent"
                  >Genre</span
                >
                <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.genre"
                class="w-full bg-gray-800/40 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm"
              >
                <option value="" class="bg-gray-900">Select a genre</option>
                <option value="Trap" class="bg-gray-900">Trap</option>
                <option value="Hip-Hop" class="bg-gray-900">Hip-Hop</option>
                <option value="R&B" class="bg-gray-900">R&B</option>
                <option value="Drill" class="bg-gray-900">Drill</option>
                <option value="Afrobeats" class="bg-gray-900">Afrobeats</option>
                <option value="Soul" class="bg-gray-900">Soul</option>
                <option value="Electronic" class="bg-gray-900">
                  Electronic
                </option>
                <option value="Other" class="bg-gray-900">Other</option>
              </select>
              <p
                v-if="errors.genre"
                class="text-red-400 text-sm mt-2 flex items-center gap-1"
              >
                <span>⚠</span> {{ errors.genre }}
              </p>
            </div>

            <!-- Key -->
            <div>
              <label class="block text-sm font-semibold text-gray-200 mb-3">
                Key (Optional)
              </label>
              <select
                v-model="formData.key"
                class="w-full bg-gray-800/40 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm"
              >
                <option value="" class="bg-gray-900">Select a key</option>
                <option value="C" class="bg-gray-900">C</option>
                <option value="C#" class="bg-gray-900">C#</option>
                <option value="D" class="bg-gray-900">D</option>
                <option value="D#" class="bg-gray-900">D#</option>
                <option value="E" class="bg-gray-900">E</option>
                <option value="F" class="bg-gray-900">F</option>
                <option value="F#" class="bg-gray-900">F#</option>
                <option value="G" class="bg-gray-900">G</option>
                <option value="G#" class="bg-gray-900">G#</option>
                <option value="A" class="bg-gray-900">A</option>
                <option value="A#" class="bg-gray-900">A#</option>
                <option value="B" class="bg-gray-900">B</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-gray-200 mb-3">
                Description (Optional)
              </label>
              <textarea
                v-model="formData.description"
                placeholder="Describe your beat... (vibes, inspiration, etc.)"
                rows="4"
                class="w-full bg-gray-800/40 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 resize-none backdrop-blur-sm placeholder-gray-400"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 2: Files & Details -->
        <div v-if="currentStep === 2">
          <div class="space-y-6">
            <!-- Audio File -->
            <div>
              <label
                class="block text-sm font-semibold text-white mb-3 flex items-center gap-1"
              >
                <span
                  class="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent"
                  >Audio File</span
                >
                <span class="text-red-500">*</span>
              </label>
              <div
                @click="$refs.audioInput.click()"
                :class="[
                  'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300',
                  formData.audioFile
                    ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20'
                    : 'border-white/20 hover:border-white/40 hover:bg-white/5',
                ]"
              >
                <input
                  ref="audioInput"
                  type="file"
                  accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg"
                  @change="handleAudioFileChange"
                  class="hidden"
                />
                <div v-if="formData.audioFile">
                  <svg
                    class="w-10 h-10 text-red-400 mx-auto mb-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                  <p class="text-white font-semibold mb-1">
                    {{ formData.audioFile.name }}
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{ (formData.audioFile.size / 1024 / 1024).toFixed(2) }} MB
                  </p>
                </div>
                <div v-else>
                  <svg
                    class="w-10 h-10 text-gray-400 mx-auto mb-3"
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
                  <p class="text-white font-semibold mb-1">
                    Click to upload audio
                  </p>
                  <p class="text-gray-400 text-sm">MP3, WAV, OGG (Max 50MB)</p>
                </div>
              </div>
              <p
                v-if="errors.audioFile"
                class="text-red-400 text-sm mt-2 flex items-center gap-1"
              >
                <span>⚠</span> {{ errors.audioFile }}
              </p>
            </div>

            <!-- Cover Image -->
            <div>
              <label class="block text-sm font-semibold text-gray-200 mb-3">
                Cover Image (Optional)
              </label>
              <div
                @click="$refs.coverInput.click()"
                :class="[
                  'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300',
                  formData.coverImage
                    ? 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20'
                    : 'border-white/20 hover:border-white/40 hover:bg-white/5',
                ]"
              >
                <input
                  ref="coverInput"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  @change="handleCoverImageChange"
                  class="hidden"
                />
                <div v-if="formData.coverImage">
                  <img
                    :src="formData.coverImagePreview"
                    alt="Cover"
                    class="w-24 h-24 object-cover rounded-lg mx-auto mb-3 shadow-lg shadow-red-500/20 ring-2 ring-red-500/30"
                  />
                  <p class="text-white font-semibold">
                    {{ formData.coverImage.name }}
                  </p>
                </div>
                <div v-else>
                  <svg
                    class="w-10 h-10 text-gray-400 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p class="text-white font-semibold mb-1">
                    Click to upload image
                  </p>
                  <p class="text-gray-400 text-sm">JPG, PNG, WebP</p>
                </div>
              </div>
            </div>

            <!-- BPM -->
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label
                  class="block text-sm font-semibold text-white mb-3 flex items-center gap-1"
                >
                  BPM <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.bpm"
                  type="number"
                  placeholder="e.g., 140"
                  class="w-full bg-gray-800/40 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
                />
                <p
                  v-if="errors.bpm"
                  class="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {{ errors.bpm }}
                </p>
              </div>

              <!-- Price -->
              <div>
                <label
                  class="block text-sm font-semibold text-white mb-3 flex items-center gap-1"
                >
                  Price ($) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.price"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 29.99"
                  class="w-full bg-gray-800/40 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
                />
                <p
                  v-if="errors.price"
                  class="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {{ errors.price }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer / Buttons -->
      <div
        class="sticky bottom-0 bg-gradient-to-r from-gray-900/50 to-slate-900/50 border-t border-white/10 px-8 py-6 flex items-center justify-between backdrop-blur-sm"
      >
        <button
          v-if="currentStep === 2"
          @click="previousStep"
          class="text-gray-200 hover:text-white font-semibold transition-all duration-300 hover:translate-x-1"
        >
          ← Back
        </button>
        <div v-else></div>

        <div class="flex gap-4">
          <button
            @click="closeModal"
            class="px-7 py-2.5 border border-white/20 text-gray-200 rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300 font-semibold active:scale-95"
          >
            Cancel
          </button>
          <button
            v-if="currentStep === 1"
            @click="nextStep"
            class="px-7 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-400/40 active:scale-95"
          >
            Next Step →
          </button>
          <button
            v-if="currentStep === 2"
            @click="submitForm"
            :disabled="isUploading"
            class="px-7 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-400/40 active:scale-95 flex items-center gap-2"
          >
            <svg
              v-if="isUploading"
              class="w-4 h-4 animate-spin"
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
            {{
              isUploading
                ? isEditMode
                  ? "Updating..."
                  : "Uploading..."
                : isEditMode
                ? "Update Beat"
                : "Upload Beat"
            }}
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <transition name="fade">
        <div
          v-if="uploadSuccess"
          class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
        >
          <div
            class="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 text-white rounded-2xl p-8 shadow-2xl max-w-sm backdrop-blur-xl"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-emerald-500/30 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-7 h-7 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="font-semibold text-lg"
                >Beat uploaded successfully!</span
              >
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import beatService from "@/services/beatService";
import { useAuthStore } from "../../store";

const authStore = useAuthStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  beatData: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "upload"]);

const currentStep = ref(1);
const isUploading = ref(false);
const uploadSuccess = ref(false);
const isEditMode = ref(false);
const editingBeatId = ref(null);

const formData = ref({
  title: "",
  genre: "",
  key: "",
  description: "",
  audioFile: null,
  coverImage: null,
  coverImagePreview: null,
  bpm: "",
  price: "",
});

const errors = ref({
  title: "",
  genre: "",
  audioFile: "",
  bpm: "",
  price: "",
});

const validateStep1 = () => {
  errors.value = { title: "", genre: "", audioFile: "", bpm: "", price: "" };
  let isValid = true;

  if (!formData.value.title.trim()) {
    errors.value.title = "Title is required";
    isValid = false;
  }

  if (!formData.value.genre) {
    errors.value.genre = "Genre is required";
    isValid = false;
  }

  return isValid;
};

const validateStep2 = () => {
  errors.value = { title: "", genre: "", audioFile: "", bpm: "", price: "" };
  let isValid = true;

  if (!formData.value.audioFile) {
    errors.value.audioFile = "Audio file is required";
    isValid = false;
  }

  if (!formData.value.bpm || parseInt(formData.value.bpm) <= 0) {
    errors.value.bpm = "Valid BPM is required";
    isValid = false;
  }

  if (!formData.value.price || parseFloat(formData.value.price) <= 0) {
    errors.value.price = "Valid price is required";
    isValid = false;
  }

  return isValid;
};

const nextStep = () => {
  if (validateStep1()) {
    currentStep.value = 2;
  }
};

const previousStep = () => {
  currentStep.value = 1;
};

const handleAudioFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.audioFile = file;
  }
};

const handleCoverImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.coverImage = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      formData.value.coverImagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const validateForm = () => {
  errors.value = { title: "", genre: "", audioFile: "", bpm: "", price: "" };
  let isValid = true;

  if (!formData.value.title.trim()) {
    errors.value.title = "Title is required";
    isValid = false;
  }

  if (!formData.value.genre) {
    errors.value.genre = "Genre is required";
    isValid = false;
  }

  if (!formData.value.bpm || parseInt(formData.value.bpm) <= 0) {
    errors.value.bpm = "Valid BPM is required";
    isValid = false;
  }

  if (!formData.value.price || parseFloat(formData.value.price) <= 0) {
    errors.value.price = "Valid price is required";
    isValid = false;
  }

  return isValid;
};

const loadBeatData = async (beatId) => {
  try {
    console.log("Loading beat data for ID:", beatId);
    const beat = await beatService.getBeat(beatId);
    console.log("Beat data loaded:", beat);

    // Populate form with beat data
    formData.value.title = beat.title || "";
    formData.value.genre = beat.genre || "";
    formData.value.description = beat.description || "";
    formData.value.key = beat.key || "";
    formData.value.bpm = beat.bpm || "";
    formData.value.price = beat.price || "";

    // Load cover image preview if available
    if (beat.coverImage) {
      formData.value.coverImagePreview = beat.coverImage;
    }
  } catch (error) {
    console.error("Error loading beat data:", error);
    errors.value.audioFile = "Failed to load beat data. Please try again.";
  }
};

const submitForm = async () => {
  if (isEditMode.value) {
    if (!validateForm()) return;
  } else {
    if (!validateStep2()) return;
  }

  isUploading.value = true;

  try {
    if (isEditMode.value) {
      // Edit mode - send JSON with optional fields
      const updateData = {
        title: formData.value.title,
        genre: formData.value.genre,
        description: formData.value.description,
        bpm: formData.value.bpm,
        price: formData.value.price,
      };

      // Only include optional fields if provided
      if (formData.value.key) {
        updateData.key = formData.value.key;
      }

      // If a new cover image file was selected, upload it first (same as profile picture flow)
      if (formData.value.coverImage instanceof File) {
        try {
          console.log("Uploading cover image:", formData.value.coverImage.name);
          const uploadResp = await beatService.uploadCoverImage(
            formData.value.coverImage,
            editingBeatId.value
          );
          console.log("Cover upload response:", uploadResp.data);
          const uploadedUrl =
            uploadResp.data.coverImage ||
            uploadResp.data.url ||
            uploadResp.data.path ||
            (uploadResp.data.data && uploadResp.data.data.url);
          if (uploadedUrl) {
            updateData.coverImage = uploadedUrl;
          } else {
            console.warn(
              "Cover upload did not return a URL; server response:",
              uploadResp.data
            );
          }
        } catch (err) {
          console.error("Failed to upload cover image:", err);
        }
      } else if (formData.value.coverImagePreview) {
        // keep existing cover image URL if no new file
        updateData.coverImage = formData.value.coverImagePreview;
      }

      console.log("Updating beat with data:", updateData);

      // Call the API to update the beat (JSON payload)
      const result = await beatService.updateBeat(
        editingBeatId.value,
        updateData
      );
      console.log("Beat updated successfully:", result);

      // Emit success event with the updated beat data
      emit("upload", result);

      uploadSuccess.value = true;
      setTimeout(() => {
        resetForm();
        closeModal();
      }, 2000);
    } else {
      // Create mode - send FormData with files
      const formDataObj = new FormData();

      // Append basic fields
      formDataObj.append("title", formData.value.title);
      formDataObj.append("genre", formData.value.genre);
      formDataObj.append("key", formData.value.key || "");
      formDataObj.append("description", formData.value.description || "");
      formDataObj.append("bpm", formData.value.bpm);
      formDataObj.append("price", formData.value.price);

      // Append audio file (required)
      if (formData.value.audioFile) {
        formDataObj.append("audioFile", formData.value.audioFile);
      }

      // NOTE: do NOT append cover image here. Create beat first, then upload
      // the cover to the per-beat endpoint `/api/beats/{id}/cover-image`.

      // Get userId from auth store
      const userId =
        authStore.currentUser.value?.id || localStorage.getItem("userId");
      console.log("User ID for upload:", userId);
      console.log("Auth store user:", authStore.currentUser.value);

      // Debug log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formDataObj.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }

      if (!userId) {
        errors.value.audioFile = "User not authenticated. Please log in.";
        isUploading.value = false;
        return;
      }
      formDataObj.append("userId", userId);

      // Call the API to create the beat (without cover)
      let result = await beatService.createBeat(formDataObj);
      console.log("Beat created successfully:", result);

      // If a cover file was selected, upload it to /api/beats/{id}/cover-image
      if (
        formData.value.coverImage &&
        formData.value.coverImage instanceof File
      ) {
        try {
          console.log(
            "Uploading cover image for new beat:",
            formData.value.coverImage.name
          );
          const uploadResp = await beatService.uploadCoverImage(
            formData.value.coverImage,
            result.id
          );
          console.log(
            "Cover upload response (create -> update):",
            uploadResp.data
          );
          // Use the updated beat returned by the cover upload endpoint when available
          result = uploadResp.data || result;
        } catch (err) {
          console.error("Failed to upload cover image after create:", err);
          // continue - emit the created beat even if cover upload failed
        }
      }

      // Emit success event with the final beat data (possibly updated with coverImage)
      emit("upload", result);

      uploadSuccess.value = true;
      setTimeout(() => {
        resetForm();
        closeModal();
      }, 2000);
    }
  } catch (error) {
    console.error("Upload/Update error:", error);
    console.error("Error response:", error.response);
    console.error("Error data:", error.response?.data);

    // Display specific error message from backend
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      `Failed to ${
        isEditMode.value ? "update" : "upload"
      } beat. Please try again.`;

    errors.value.audioFile = errorMessage;
  } finally {
    isUploading.value = false;
  }
};

const resetForm = () => {
  currentStep.value = 1;
  isEditMode.value = false;
  editingBeatId.value = null;
  formData.value = {
    title: "",
    genre: "",
    key: "",
    description: "",
    audioFile: null,
    coverImage: null,
    coverImagePreview: null,
    bpm: "",
    price: "",
    licenseId: "",
  };
  errors.value = {
    title: "",
    genre: "",
    audioFile: "",
    bpm: "",
    price: "",
  };
  uploadSuccess.value = false;
};

onMounted(() => {
  // Component initialization
});

// Watch for beatData changes to load edit form
// Watch for incoming prop changes and load beat data when editing
watch(
  () => props.beatData,
  async (newBeatData) => {
    if (newBeatData && newBeatData.id) {
      isEditMode.value = true;
      editingBeatId.value = newBeatData.id;
      await loadBeatData(newBeatData.id);
    } else {
      // Ensure form is reset when no beat data provided (create mode)
      resetForm();
    }
  }
);

const closeModal = () => {
  resetForm();
  emit("close");
};
</script>

<style scoped>
/* Enhanced Scrollbar Styling */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.4);
  margin: 8px 0;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ef4444 0%, #ec4899 50%, #f472b6 100%);
  border-radius: 6px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3), 0 0 10px rgba(239, 68, 68, 0.5);
  min-height: 40px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #dc2626 0%, #be185d 50%, #ec4899 100%);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4), 0 0 16px rgba(220, 38, 38, 0.7);
}

::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, #b91c1c 0%, #9d174d 50%, #be185d 100%);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5), 0 0 20px rgba(185, 28, 28, 0.9);
}

::-webkit-scrollbar-corner {
  background: transparent;
}

/* Firefox Scrollbar - using solid color since it doesn't support gradients well */
* {
  scrollbar-width: thin;
  scrollbar-color: #ef4444 rgba(15, 23, 42, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

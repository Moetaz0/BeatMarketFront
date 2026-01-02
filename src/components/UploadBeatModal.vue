<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div
      class="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
    >
      <!-- Header -->
      <div
        class="sticky top-0 bg-gray-900 border-b border-gray-700 px-8 py-6 flex items-center justify-between"
      >
        <div>
          <h2 class="text-2xl font-bold text-white">Upload Beat</h2>
          <p class="text-sm text-gray-400 mt-1">Step {{ currentStep }} of 2</p>
        </div>
        <button
          @click="closeModal"
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

      <!-- Progress Bar -->
      <div class="px-8 py-4 bg-gray-800/50">
        <div class="flex gap-2">
          <div
            :class="[
              'flex-1 h-1 rounded-full transition',
              currentStep >= 1 ? 'bg-red-600' : 'bg-gray-700',
            ]"
          ></div>
          <div
            :class="[
              'flex-1 h-1 rounded-full transition',
              currentStep >= 2 ? 'bg-red-600' : 'bg-gray-700',
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
              <label class="block text-sm font-medium text-white mb-2">
                Beat Title <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.title"
                type="text"
                placeholder="e.g., Trap Soul 2025"
                class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
              />
              <p v-if="errors.title" class="text-red-500 text-sm mt-1">
                {{ errors.title }}
              </p>
            </div>

            <!-- Genre -->
            <div>
              <label class="block text-sm font-medium text-white mb-2">
                Genre <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.genre"
                class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
              >
                <option value="">Select a genre</option>
                <option value="Trap">Trap</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="R&B">R&B</option>
                <option value="Drill">Drill</option>
                <option value="Afrobeats">Afrobeats</option>
                <option value="Soul">Soul</option>
                <option value="Electronic">Electronic</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errors.genre" class="text-red-500 text-sm mt-1">
                {{ errors.genre }}
              </p>
            </div>

            <!-- Key -->
            <div>
              <label class="block text-sm font-medium text-white mb-2">
                Key (Optional)
              </label>
              <select
                v-model="formData.key"
                class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
              >
                <option value="">Select a key</option>
                <option value="C">C</option>
                <option value="C#">C#</option>
                <option value="D">D</option>
                <option value="D#">D#</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F#</option>
                <option value="G">G</option>
                <option value="G#">G#</option>
                <option value="A">A</option>
                <option value="A#">A#</option>
                <option value="B">B</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-white mb-2">
                Description (Optional)
              </label>
              <textarea
                v-model="formData.description"
                placeholder="Describe your beat... (vibes, inspiration, etc.)"
                rows="4"
                class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 2: Files & Details -->
        <div v-if="currentStep === 2">
          <div class="space-y-6">
            <!-- Audio File -->
            <div>
              <label class="block text-sm font-medium text-white mb-2">
                Audio File <span class="text-red-500">*</span>
              </label>
              <div
                @click="$refs.audioInput.click()"
                :class="[
                  'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition',
                  formData.audioFile
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-gray-600 hover:border-gray-500',
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
                    class="w-8 h-8 text-red-500 mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                  <p class="text-white font-medium">
                    {{ formData.audioFile.name }}
                  </p>
                  <p class="text-gray-400 text-sm">
                    {{ (formData.audioFile.size / 1024 / 1024).toFixed(2) }} MB
                  </p>
                </div>
                <div v-else>
                  <svg
                    class="w-8 h-8 text-gray-400 mx-auto mb-2"
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
                  <p class="text-white font-medium">Click to upload audio</p>
                  <p class="text-gray-400 text-sm">MP3, WAV, OGG (Max 50MB)</p>
                </div>
              </div>
              <p v-if="errors.audioFile" class="text-red-500 text-sm mt-1">
                {{ errors.audioFile }}
              </p>
            </div>

            <!-- Cover Image -->
            <div>
              <label class="block text-sm font-medium text-white mb-2">
                Cover Image (Optional)
              </label>
              <div
                @click="$refs.coverInput.click()"
                :class="[
                  'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition',
                  formData.coverImage
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-gray-600 hover:border-gray-500',
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
                    class="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                  />
                  <p class="text-white font-medium">
                    {{ formData.coverImage.name }}
                  </p>
                </div>
                <div v-else>
                  <svg
                    class="w-8 h-8 text-gray-400 mx-auto mb-2"
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
                  <p class="text-white font-medium">Click to upload image</p>
                  <p class="text-gray-400 text-sm">JPG, PNG, WebP</p>
                </div>
              </div>
            </div>

            <!-- BPM -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-white mb-2">
                  BPM <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.bpm"
                  type="number"
                  placeholder="e.g., 140"
                  class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
                />
                <p v-if="errors.bpm" class="text-red-500 text-sm mt-1">
                  {{ errors.bpm }}
                </p>
              </div>

              <!-- Price -->
              <div>
                <label class="block text-sm font-medium text-white mb-2">
                  Price ($) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.price"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 29.99"
                  class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
                />
                <p v-if="errors.price" class="text-red-500 text-sm mt-1">
                  {{ errors.price }}
                </p>
              </div>
            </div>

            <!-- License -->
            <div>
              <label class="block text-sm font-medium text-white mb-2">
                License Type (Optional)
              </label>
              <select
                v-model="formData.licenseId"
                class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition"
              >
                <option value="">No license selected</option>
                <option
                  v-for="license in licenses"
                  :key="license.id"
                  :value="license.id"
                >
                  {{ license.name }}
                </option>
              </select>
              <p
                v-if="licenses.length === 0"
                class="text-gray-400 text-xs mt-1"
              >
                {{
                  loadingLicenses
                    ? "Loading licenses..."
                    : "No licenses available"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer / Buttons -->
      <div
        class="sticky bottom-0 bg-gray-800/50 border-t border-gray-700 px-8 py-6 flex items-center justify-between"
      >
        <button
          v-if="currentStep === 2"
          @click="previousStep"
          class="text-gray-300 hover:text-white font-medium transition"
        >
          ← Back
        </button>
        <div v-else></div>

        <div class="flex gap-3">
          <button
            @click="closeModal"
            class="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Cancel
          </button>
          <button
            v-if="currentStep === 1"
            @click="nextStep"
            class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
          >
            Next Step →
          </button>
          <button
            v-if="currentStep === 2"
            @click="submitForm"
            :disabled="isUploading"
            class="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition font-medium flex items-center gap-2"
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
            {{ isUploading ? "Uploading..." : "Upload Beat" }}
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <transition name="fade">
        <div
          v-if="uploadSuccess"
          class="fixed inset-0 flex items-center justify-center z-50"
        >
          <div
            class="bg-green-600 text-white rounded-lg p-6 shadow-xl max-w-sm"
          >
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium">Beat uploaded successfully!</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import beatService from "@/services/beatService";
import licenseService from "@/services/licenseService";
import { useAuthStore } from "../../store";

const authStore = useAuthStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "upload"]);

const currentStep = ref(1);
const isUploading = ref(false);
const uploadSuccess = ref(false);
const licenses = ref([]);
const loadingLicenses = ref(false);

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
  licenseId: "",
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

const submitForm = async () => {
  if (!validateStep2()) {
    return;
  }

  isUploading.value = true;

  try {
    const formDataObj = new FormData();
    formDataObj.append("title", formData.value.title);
    formDataObj.append("genre", formData.value.genre);
    formDataObj.append("key", formData.value.key);
    formDataObj.append("description", formData.value.description);
    formDataObj.append("audioFile", formData.value.audioFile);
    if (formData.value.coverImage) {
      formDataObj.append("coverImage", formData.value.coverImage);
    }
    formDataObj.append("bpm", formData.value.bpm);
    formDataObj.append("price", formData.value.price);
    if (formData.value.licenseId) {
      formDataObj.append("licenseId", formData.value.licenseId);
    }

    // Get userId from auth store
    const userId =
      authStore.currentUser.value?.id || localStorage.getItem("userId");
    console.log("User ID for upload:", userId);
    console.log("Auth store user:", authStore.currentUser.value);

    if (!userId) {
      errors.value.audioFile = "User not authenticated. Please log in.";
      isUploading.value = false;
      return;
    }
    formDataObj.append("userId", userId);

    // Call the API to upload the beat
    const result = await beatService.createBeat(formDataObj);
    console.log("Beat created successfully:", result);

    // Emit success event with the created beat data
    emit("upload", result);

    uploadSuccess.value = true;
    setTimeout(() => {
      resetForm();
      closeModal();
    }, 2000);
  } catch (error) {
    console.error("Upload error:", error);
    console.error("Error response:", error.response);
    console.error("Error data:", error.response?.data);

    // Display specific error message from backend
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Failed to upload beat. Please try again.";

    errors.value.audioFile = errorMessage;
  } finally {
    isUploading.value = false;
  }
};

const resetForm = () => {
  currentStep.value = 1;
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

const fetchLicenses = async () => {
  try {
    loadingLicenses.value = true;
    const response = await licenseService.getAllLicenses();
    console.log("Licenses response:", response);

    // Handle both array and object with 'data' property
    licenses.value = Array.isArray(response) ? response : response.data || [];
    console.log("Loaded licenses:", licenses.value);
  } catch (error) {
    console.error("Failed to fetch licenses:", error);
    licenses.value = [];
  } finally {
    loadingLicenses.value = false;
  }
};

onMounted(() => {
  fetchLicenses();
});

const closeModal = () => {
  resetForm();
  emit("close");
};
</script>

<style scoped>
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

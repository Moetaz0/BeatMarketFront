<template>
  <transition name="modal-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
      @click="closeModal"
    >
      <div
        class="bg-gray-900 border border-gray-700 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl"
        @click.stop
      >
        <!-- Header -->
        <div
          class="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">Select License</h2>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-white transition"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p class="text-gray-400 mt-2">
            Choose a license type for "{{ beatTitle }}"
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="p-6 text-center">
          <div class="inline-flex items-center gap-3">
            <svg
              class="w-6 h-6 animate-spin text-red-600"
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
            <span class="text-gray-400">Loading licenses...</span>
          </div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="p-6 bg-red-500/10 border-b border-red-500/20 text-red-400"
        >
          {{ error }}
        </div>

        <!-- License Options -->
        <div v-else class="p-6 space-y-3">
          <button
            v-for="license in licenses"
            :key="license.id"
            @click="selectLicense(license)"
            :class="[
              'w-full text-left p-4 rounded-lg border-2 transition-all',
              selectedLicense?.id === license.id
                ? 'border-red-500 bg-red-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600',
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-bold text-white mb-1">{{ license.name }}</h3>
                <p class="text-sm text-gray-400 mb-2">
                  {{ license.description || "No description available" }}
                </p>
                <div v-if="license.features" class="mt-3 space-y-1">
                  <p
                    class="text-xs font-semibold text-gray-300 uppercase tracking-wider"
                  >
                    Includes:
                  </p>
                  <ul class="text-xs text-gray-400 space-y-1">
                    <li
                      v-for="feature in license.features.split(',') || []"
                      :key="feature"
                      class="flex items-center gap-2"
                    >
                      <svg
                        class="w-3 h-3 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{ feature.trim() }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex-shrink-0 ml-4">
                <div
                  :class="[
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    selectedLicense?.id === license.id
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-600',
                  ]"
                >
                  <svg
                    v-if="selectedLicense?.id === license.id"
                    class="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>

        <!-- Footer -->
        <div
          class="sticky bottom-0 bg-gray-900 border-t border-gray-700 px-6 py-4 flex gap-3"
        >
          <button
            @click="closeModal"
            class="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition"
          >
            Cancel
          </button>
          <button
            @click="confirmSelection"
            :disabled="!selectedLicense || isSubmitting"
            :class="[
              'flex-1 px-4 py-2 rounded-lg font-medium transition',
              selectedLicense && !isSubmitting
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed',
            ]"
          >
            {{ isSubmitting ? "Processing..." : "Continue to Checkout" }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import licenseService from "@/services/licenseService";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  beatTitle: {
    type: String,
    default: "beat",
  },
});

const emit = defineEmits(["close", "selected"]);

const licenses = ref([]);
const selectedLicense = ref(null);
const isLoading = ref(false);
const isSubmitting = ref(false);
const error = ref("");

onMounted(async () => {
  if (props.isOpen) {
    await fetchLicenses();
  }
});

const fetchLicenses = async () => {
  isLoading.value = true;
  error.value = "";
  try {
    const response = await licenseService.getAllLicenses();
    licenses.value = response.data || response || [];
    // Auto-select the first license
    if (licenses.value.length > 0) {
      selectedLicense.value = licenses.value[0];
    }
  } catch (err) {
    console.error("Failed to fetch licenses:", err);
    error.value = "Failed to load licenses. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const selectLicense = (license) => {
  selectedLicense.value = license;
};

const confirmSelection = async () => {
  if (!selectedLicense.value || isSubmitting.value) return;

  isSubmitting.value = true;
  try {
    emit("selected", selectedLicense.value);
    closeModal();
  } catch (err) {
    console.error("Error confirming license:", err);
    error.value = "Failed to select license. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

const closeModal = () => {
  selectedLicense.value = null;
  error.value = "";
  emit("close");
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>

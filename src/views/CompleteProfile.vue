<template>
  <SuccessToast :message="successMessage" :show="showSuccess" />
  <ErrorToast :message="errorMessage" :show="showError" />

  <div
    class="min-h-screen bg-gradient-to-br from-[rgba(10,0,0,0.95)] via-[rgba(20,0,0,0.92)] to-[rgba(30,0,0,0.95)] backdrop-blur-2xl bg-fixed relative overflow-hidden flex flex-col"
  >
    <!-- Animated background elements -->
    <div
      class="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl opacity-20"
    ></div>
    <div
      class="absolute bottom-0 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl opacity-20"
    ></div>

    <!-- Logo -->
    <div
      class="absolute top-8 left-8 flex items-center gap-3 text-red-600 text-2xl font-bold z-10 hover:text-red-500 transition"
    >
      <div
        class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-600/30"
      >
        BM
      </div>
      <span class="logo-text">BeatMarket</span>
    </div>

    <div
      class="flex flex-col items-center justify-center h-screen px-4 max-w-[1900px] mx-auto w-full relative z-20 overflow-hidden"
    >
      <!-- Form Container -->
      <div class="w-full max-w-[480px]">
        <!-- Card with premium styling -->
        <div
          class="relative bg-gradient-to-br from-[rgba(25,0,0,0.95)] via-[rgba(30,0,0,0.92)] to-[rgba(20,0,0,0.95)] backdrop-blur-3xl rounded-3xl p-8 shadow-2xl border border-red-900/20"
        >
          <!-- Gradient border effect -->
          <div
            class="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-900/20 to-transparent opacity-0 hover:opacity-100 transition duration-300 pointer-events-none"
          ></div>

          <!-- Content -->
          <div class="relative">
            <!-- Header Section -->
            <div class="text-center mb-6">
              <div
                class="inline-block mb-2 px-3 py-1 bg-red-900/20 border border-red-800/30 rounded-full"
              >
                <span
                  class="text-xs font-semibold text-red-400 uppercase tracking-widest"
                  >Step 2 of 2</span
                >
              </div>
              <h1
                class="text-3xl font-black text-white mb-1 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent"
              >
                Complete Profile
              </h1>
              <p class="text-gray-400 text-xs leading-relaxed">
                Just a few details to personalize your BeatMarket experience
              </p>
            </div>

            <!-- Progress indicator -->
            <div class="flex items-center justify-between mb-6 px-1">
              <div class="flex items-center gap-2">
                <div
                  class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-emerald-500/30"
                >
                  ✓
                </div>
                <span class="text-xs font-medium text-gray-400"
                  >Account Created</span
                >
              </div>
              <div
                class="flex-1 h-px bg-gradient-to-r from-emerald-500/0 via-red-600/40 to-red-600/0 mx-3"
              ></div>
              <div class="flex items-center gap-2">
                <div
                  class="w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-red-600/30"
                >
                  2
                </div>
                <span class="text-xs font-medium text-red-300"
                  >Profile Setup</span
                >
              </div>
            </div>

            <form @submit.prevent="completeProfile" class="space-y-5">
              <!-- Role Selection Section -->
              <div>
                <label
                  class="block text-white font-bold text-xs mb-2 flex items-center gap-2"
                >
                  <span class="text-red-400">●</span>
                  What's Your Role?
                </label>
                <div class="grid grid-cols-2 gap-3">
                  <!-- Artist Button -->
                  <button
                    type="button"
                    @click="selectedRole = 'ROLE_ARTIST'"
                    :class="[
                      'group relative py-4 px-3 rounded-2xl border-2 transition-all duration-300 text-center overflow-hidden',
                      selectedRole === 'ROLE_ARTIST'
                        ? 'border-red-600 bg-gradient-to-br from-red-600/20 to-red-700/10 shadow-[0_0_25px_rgba(220,38,38,0.35)]'
                        : 'border-red-900/30 bg-[rgba(40,0,0,0.4)] hover:border-red-700 hover:bg-[rgba(50,0,0,0.6)]',
                    ]"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-red-600/10 transition duration-300"
                    ></div>
                    <div class="relative">
                      <div
                        class="text-3xl mb-1 transform group-hover:scale-110 transition duration-300"
                      >
                        🎤
                      </div>
                      <div class="text-white font-bold text-xs mb-0.5">
                        Artist
                      </div>
                      <div class="text-xs text-gray-400">Looking for beats</div>
                    </div>
                  </button>

                  <!-- Beatmaker Button -->
                  <button
                    type="button"
                    @click="selectedRole = 'ROLE_BEATMAKER'"
                    :class="[
                      'group relative py-4 px-3 rounded-2xl border-2 transition-all duration-300 text-center overflow-hidden',
                      selectedRole === 'ROLE_BEATMAKER'
                        ? 'border-red-600 bg-gradient-to-br from-red-600/20 to-red-700/10 shadow-[0_0_25px_rgba(220,38,38,0.35)]'
                        : 'border-red-900/30 bg-[rgba(40,0,0,0.4)] hover:border-red-700 hover:bg-[rgba(50,0,0,0.6)]',
                    ]"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-red-600/10 transition duration-300"
                    ></div>
                    <div class="relative">
                      <div
                        class="text-3xl mb-1 transform group-hover:scale-110 transition duration-300"
                      >
                        🎹
                      </div>
                      <div class="text-white font-bold text-xs mb-0.5">
                        Beatmaker
                      </div>
                      <div class="text-xs text-gray-400">Selling beats</div>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Phone Number Section -->
              <div>
                <label
                  class="block text-white font-bold text-xs mb-1.5 flex items-center gap-2"
                >
                  <span class="text-red-400">●</span>
                  Phone Number
                  <span class="text-xs text-gray-500 font-normal"
                    >(optional)</span
                  >
                </label>
                <input
                  type="tel"
                  v-model="phone"
                  placeholder="+1 (555) 123-4567"
                  class="w-full py-2 px-3 bg-[rgba(40,0,0,0.5)] border border-red-900/30 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-600 focus:bg-[rgba(50,0,0,0.7)] focus:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition duration-300"
                />
              </div>

              <!-- Profile Picture Section -->
              <div>
                <label
                  class="block text-white font-bold text-xs mb-2 flex items-center gap-2"
                >
                  <span class="text-red-400">●</span>
                  Profile Photo
                  <span class="text-xs text-gray-500 font-normal"
                    >(optional)</span
                  >
                </label>
                <div class="flex items-center gap-4">
                  <!-- Avatar Preview -->
                  <div class="relative flex-shrink-0">
                    <div class="relative w-16 h-16">
                      <img
                        v-if="profilePicturePreview"
                        :src="profilePicturePreview"
                        alt="Profile Preview"
                        class="w-full h-full rounded-2xl object-cover border-2 border-red-600/50 shadow-lg shadow-red-600/20"
                      />
                      <img
                        v-else
                        :src="defaultAvatar"
                        alt="Default Avatar"
                        class="w-full h-full rounded-2xl object-cover border-2 border-red-900/30"
                      />
                    </div>
                    <!-- Remove button -->
                    <button
                      v-if="profilePicturePreview"
                      type="button"
                      @click="removeProfilePicture"
                      class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-full flex items-center justify-center text-white transition shadow-lg shadow-red-600/30"
                    >
                      <svg
                        class="w-2.5 h-2.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Upload Area -->
                  <div class="flex-1">
                    <input
                      ref="fileInput"
                      type="file"
                      accept="image/*"
                      @change="handleFileSelect"
                      class="hidden"
                    />
                    <button
                      type="button"
                      @click="$refs.fileInput.click()"
                      class="w-full group relative py-3 px-3 bg-[rgba(40,0,0,0.5)] border-2 border-dashed border-red-900/40 hover:border-red-600 rounded-lg transition-all duration-300 overflow-hidden"
                    >
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-red-600/10 transition duration-300"
                      ></div>
                      <div
                        class="relative flex items-center justify-center gap-1.5"
                      >
                        <svg
                          class="w-3 h-3 text-gray-400 group-hover:text-red-400 transition"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span
                          class="text-white text-xs font-medium group-hover:text-red-300 transition"
                        >
                          {{ selectedFileName || "Choose photo" }}
                        </span>
                      </div>
                      <p class="text-xs text-gray-500 mt-0.5">
                        Max 5MB • JPG, PNG, GIF
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="pt-3 space-y-2">
                <!-- Complete Profile Button -->
                <button
                  type="submit"
                  :disabled="isLoading || !selectedRole"
                  class="w-full py-2.5 px-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold text-sm rounded-lg transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 disabled:shadow-gray-600/20 transform hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  <span
                    v-if="isLoading"
                    class="flex items-center justify-center gap-2"
                  >
                    <svg
                      class="animate-spin h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Completing...
                  </span>
                  <span v-else>Complete My Profile →</span>
                </button>

                <!-- Skip Button -->
                <button
                  type="button"
                  @click="skipProfile"
                  class="w-full py-1.5 px-3 text-gray-400 hover:text-red-300 text-xs font-medium transition duration-300 rounded-lg hover:bg-[rgba(220,38,38,0.05)]"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Bottom text -->
        <p class="text-center text-gray-600 text-xs mt-3">
          You can always update these details later in settings
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SuccessToast from "@/components/SuccessToast.vue";
import ErrorToast from "@/components/ErrorToast.vue";
import authService from "@/services/authService";
import { useAuthStore } from "../../store";

const router = useRouter();
const authStore = useAuthStore();

const selectedRole = ref("");
const phone = ref("");
const profilePictureFile = ref(null);
const profilePicturePreview = ref("");
const selectedFileName = ref("");
const fileInput = ref(null);
const isLoading = ref(false);

const showSuccess = ref(false);
const successMessage = ref("");
const showError = ref(false);
const errorMessage = ref("");

// Random avatar selection
const getRandomAvatar = () => {
  const avatars = [
    new URL("../assets/avatars/a1.jpg", import.meta.url).href,
    new URL("../assets/avatars/a2.jpg", import.meta.url).href,
    new URL("../assets/avatars/a3.jpg", import.meta.url).href,
    new URL("../assets/avatars/a4.jpg", import.meta.url).href,
  ];

  let storedAvatar = sessionStorage.getItem("defaultAvatar");

  if (!storedAvatar) {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    storedAvatar = avatars[randomIndex];
    sessionStorage.setItem("defaultAvatar", storedAvatar);
  }

  return storedAvatar;
};

const defaultAvatar = ref(getRandomAvatar());

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showErrorMessage("Please select an image file");
    return;
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    showErrorMessage("File size must be less than 5MB");
    return;
  }

  selectedFileName.value = file.name;
  profilePictureFile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    profilePicturePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const removeProfilePicture = () => {
  profilePicturePreview.value = "";
  selectedFileName.value = "";
  profilePictureFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const completeProfile = async () => {
  if (!selectedRole.value) {
    showErrorMessage("Please select your role");
    return;
  }

  isLoading.value = true;
  try {
    // Upload profile picture first if selected
    let profilePictureUrl = "";
    if (profilePictureFile.value) {
      const uploadResponse = await authService.uploadProfilePicture(
        profilePictureFile.value
      );
      profilePictureUrl = uploadResponse.data.profilePicture || "";
    }

    // Complete profile with role and phone using dedicated endpoint
    const response = await authService.completeProfile({
      userRole: selectedRole.value,
      phone: phone.value || "",
    });

    // Update auth store with returned user data
    const userData = response.data.user;
    authStore.setUser({
      id: userData.id,
      email: userData.email,
      username: userData.username,
      phone: userData.phone,
      avatar:
        profilePictureUrl || userData.profilePicture || defaultAvatar.value,
      role: userData.userRole,
      isVerified: userData.isVerified,
    });

    successMessage.value = "Profile completed successfully!";
    showSuccess.value = true;

    setTimeout(() => {
      showSuccess.value = false;
      router.push("/");
    }, 1500);
  } catch (err) {
    console.error("Failed to complete profile:", err);
    showErrorMessage(err.response?.data?.error || "Failed to complete profile");
  } finally {
    isLoading.value = false;
  }
};

const skipProfile = () => {
  router.push("/");
};

const showSuccessMessage = (message) => {
  successMessage.value = message;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};

const showErrorMessage = (message) => {
  errorMessage.value = message;
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 3000);
};
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <SuccessToast :message="successMessage" :show="showSuccess" />
    <ErrorToast :message="errorMessage" :show="showError" />

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Settings</h1>
        <p class="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-800 mb-8">
        <nav class="flex gap-8">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'pb-4 px-1 border-b-2 font-medium text-sm transition',
              activeTab === 'profile'
                ? 'border-red-600 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300',
            ]"
          >
            Profile
          </button>
          <button
            @click="activeTab = 'security'"
            :class="[
              'pb-4 px-1 border-b-2 font-medium text-sm transition',
              activeTab === 'security'
                ? 'border-red-600 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300',
            ]"
          >
            Security
          </button>
          <button
            @click="activeTab = 'about'"
            :class="[
              'pb-4 px-1 border-b-2 font-medium text-sm transition',
              activeTab === 'about'
                ? 'border-red-600 text-white'
                : 'border-transparent text-gray-400 hover:text-gray-300',
            ]"
          >
            About
          </button>
        </nav>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="space-y-6">
        <!-- Profile Picture -->
        <div class="bg-gray-900 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Profile Picture</h2>
          <div class="flex items-center gap-6">
            <div class="relative">
              <img
                v-if="profilePicturePreview"
                :src="profilePicturePreview"
                alt="Profile"
                class="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
              />
              <img
                v-else
                :src="defaultAvatar"
                alt="Default Avatar"
                class="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
              />
              <!-- Remove button -->
              <button
                v-if="profilePicturePreview"
                @click="removeProfilePicture"
                class="absolute -top-2 -right-2 w-7 h-7 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition"
                title="Remove picture"
              >
                <svg
                  class="w-4 h-4"
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
            <div class="flex-1">
              <!-- File Input (Hidden) -->
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="hidden"
              />

              <!-- Custom Upload Button -->
              <button
                @click="$refs.fileInput.click()"
                class="w-full bg-gray-800 hover:bg-gray-750 border-2 border-dashed border-gray-700 hover:border-red-600 rounded-lg px-4 py-8 transition group"
              >
                <div class="flex flex-col items-center justify-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-gray-700 group-hover:bg-red-600/20 flex items-center justify-center transition"
                  >
                    <svg
                      class="w-6 h-6 text-gray-400 group-hover:text-red-500 transition"
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
                  </div>
                  <div>
                    <p class="text-white font-medium">
                      {{ selectedFileName || "Click to upload" }}
                    </p>
                    <p class="text-sm text-gray-400 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="bg-gray-900 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Personal Information</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Username</label
              >
              <input
                type="text"
                v-model="profileForm.username"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Email</label
              >
              <input
                type="email"
                v-model="profileForm.email"
                disabled
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
              />
              <p class="text-sm text-gray-400 mt-1">
                Email can be changed in Security settings
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Phone</label
              >
              <input
                type="tel"
                v-model="profileForm.phone"
                placeholder="+1234567890"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
          <button
            @click="updateProfile"
            :disabled="isLoading"
            class="mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition"
          >
            {{ isLoading ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </div>

      <!-- Security Tab -->
      <div v-if="activeTab === 'security'" class="space-y-6">
        <!-- Change Password -->
        <div class="bg-gray-900 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Change Password</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Current Password</label
              >
              <input
                type="password"
                v-model="passwordForm.currentPassword"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >New Password</label
              >
              <input
                type="password"
                v-model="passwordForm.newPassword"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Confirm New Password</label
              >
              <input
                type="password"
                v-model="passwordForm.confirmPassword"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
          <button
            @click="changePassword"
            :disabled="isLoading"
            class="mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition"
          >
            {{ isLoading ? "Updating..." : "Update Password" }}
          </button>
        </div>

        <!-- Change Email -->
        <div class="bg-gray-900 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Change Email</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Current Email</label
              >
              <input
                type="email"
                :value="authStore.state.email"
                disabled
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >New Email</label
              >
              <input
                type="email"
                v-model="emailForm.newEmail"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Password (for verification)</label
              >
              <input
                type="password"
                v-model="emailForm.password"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
          </div>
          <button
            @click="changeEmail"
            :disabled="isLoading"
            class="mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition"
          >
            {{ isLoading ? "Sending..." : "Send Verification Email" }}
          </button>
        </div>

        <!-- Delete Account -->
        <div class="bg-red-900/20 border border-red-900 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-red-400">
            Delete Account
          </h2>
          <p class="text-gray-300 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            @click="showDeleteModal = true"
            class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      <!-- About Tab -->
      <div v-if="activeTab === 'about'" class="space-y-6">
        <div class="bg-gray-900 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">About BeatMarket</h2>
          <p class="text-gray-400 mb-6">Version 1.0.0</p>

          <div class="space-y-4">
            <router-link
              to="/privacy"
              class="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition"
            >
              <span>Privacy Policy</span>
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </router-link>

            <router-link
              to="/terms"
              class="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition"
            >
              <span>Terms of Service</span>
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </router-link>

            <router-link
              to="/license"
              class="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition"
            >
              <span>App License</span>
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-gray-900 rounded-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-bold mb-4">Delete Account</h3>
        <p class="text-gray-400 mb-4">
          This action cannot be undone. Please enter your password and type
          "DELETE" to confirm.
        </p>

        <div class="space-y-4 mb-6">
          <input
            type="password"
            v-model="deleteForm.password"
            placeholder="Password"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          />
          <input
            type="text"
            v-model="deleteForm.confirmation"
            placeholder="Type DELETE to confirm"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <div class="flex gap-4">
          <button
            @click="showDeleteModal = false"
            class="flex-1 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition"
          >
            Cancel
          </button>
          <button
            @click="deleteAccount"
            :disabled="
              deleteForm.confirmation !== 'DELETE' || !deleteForm.password
            "
            class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import SuccessToast from "@/components/SuccessToast.vue";
import ErrorToast from "@/components/ErrorToast.vue";
import authService from "@/services/authService";
import { useAuthStore } from "../../store";

const router = useRouter();
const authStore = useAuthStore();

const activeTab = ref("profile");
const isLoading = ref(false);
const showDeleteModal = ref(false);

const showSuccess = ref(false);
const successMessage = ref("");
const showError = ref(false);
const errorMessage = ref("");

const profileForm = ref({
  username: "",
  email: "",
  phone: "",
  profilePicture: "",
});

const selectedFileName = ref("");
const profilePicturePreview = ref("");
const profilePictureFile = ref(null);
const fileInput = ref(null);

// Random avatar selection - persists for the session
const getRandomAvatar = () => {
  const avatars = [
    new URL("../assets/avatars/a1.jpg", import.meta.url).href,
    new URL("../assets/avatars/a2.jpg", import.meta.url).href,
    new URL("../assets/avatars/a3.jpg", import.meta.url).href,
    new URL("../assets/avatars/a4.jpg", import.meta.url).href,
  ];

  // Check if we already have a random avatar stored for this session
  let storedAvatar = sessionStorage.getItem("defaultAvatar");

  if (!storedAvatar) {
    // Select random avatar and store it
    const randomIndex = Math.floor(Math.random() * avatars.length);
    storedAvatar = avatars[randomIndex];
    sessionStorage.setItem("defaultAvatar", storedAvatar);
  }

  return storedAvatar;
};

const defaultAvatar = ref(getRandomAvatar());

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const emailForm = ref({
  newEmail: "",
  password: "",
});

const deleteForm = ref({
  password: "",
  confirmation: "",
});

const getUserInitial = computed(() => {
  const name = profileForm.value.username || "U";
  return name.charAt(0).toUpperCase();
});

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    showErrorMessage("Please select an image file");
    return;
  }

  // Validate file size (5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    showErrorMessage("File size must be less than 5MB");
    return;
  }

  selectedFileName.value = file.name;
  profilePictureFile.value = file;

  // Create preview
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
  profileForm.value.profilePicture = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const loadProfile = async () => {
  try {
    const response = await authService.getProfile();
    const profile = response.data;

    profileForm.value = {
      username: profile.username || "",
      email: profile.email || "",
      phone: profile.phone || "",
      profilePicture: profile.profilePicture || "",
    };

    // Set preview if profile picture exists
    if (profile.profilePicture) {
      profilePicturePreview.value = profile.profilePicture;
    }
  } catch (err) {
    console.error("Failed to load profile:", err);
    showErrorMessage("Failed to load profile");
  }
};

const updateProfile = async () => {
  isLoading.value = true;
  try {
    // Prepare form data for file upload
    const formData = new FormData();
    formData.append("username", profileForm.value.username);
    formData.append("phone", profileForm.value.phone || "");

    // If a new file was selected, append it
    if (profilePictureFile.value) {
      formData.append("profilePicture", profilePictureFile.value);
    } else if (profilePicturePreview.value) {
      // Keep existing URL if no new file
      formData.append("profilePictureUrl", profileForm.value.profilePicture);
    }

    await authService.updateSettings(formData);

    // Update store
    authStore.setUser({
      ...authStore.currentUser.value,
      name: profileForm.value.username,
      avatar: profilePicturePreview.value,
      phone: profileForm.value.phone,
    });

    showSuccessMessage("Profile updated successfully!");
  } catch (err) {
    console.error("Failed to update profile:", err);
    showErrorMessage(err.response?.data?.error || "Failed to update profile");
  } finally {
    isLoading.value = false;
  }
};

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showErrorMessage("Passwords do not match");
    return;
  }

  if (passwordForm.value.newPassword.length < 8) {
    showErrorMessage("Password must be at least 8 characters");
    return;
  }

  isLoading.value = true;
  try {
    await authService.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword,
    });

    passwordForm.value = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    showSuccessMessage("Password changed successfully!");
  } catch (err) {
    console.error("Failed to change password:", err);
    showErrorMessage(err.response?.data?.error || "Failed to change password");
  } finally {
    isLoading.value = false;
  }
};

const changeEmail = async () => {
  if (!emailForm.value.newEmail || !emailForm.value.password) {
    showErrorMessage("Please fill in all fields");
    return;
  }

  isLoading.value = true;
  try {
    await authService.changeEmail({
      newEmail: emailForm.value.newEmail,
      password: emailForm.value.password,
    });

    showSuccessMessage("Verification code sent to new email!");
    emailForm.value = { newEmail: "", password: "" };
  } catch (err) {
    console.error("Failed to change email:", err);
    showErrorMessage(err.response?.data?.error || "Failed to change email");
  } finally {
    isLoading.value = false;
  }
};

const deleteAccount = async () => {
  try {
    await authService.deleteAccount({
      password: deleteForm.value.password,
      confirmation: deleteForm.value.confirmation,
    });

    authStore.logout();
    router.push("/");
  } catch (err) {
    console.error("Failed to delete account:", err);
    showErrorMessage(err.response?.data?.error || "Failed to delete account");
    showDeleteModal.value = false;
  }
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

onMounted(() => {
  loadProfile();
});
</script>

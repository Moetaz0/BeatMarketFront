<template>
  <nav class="bg-black border-b border-gray-800 sticky top-0 z-50">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo + Left Menu -->
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xl"
            >
              BM
            </div>
            <span class="text-xl font-bold text-white">BEATMARKET</span>
          </div>

          <div class="hidden md:flex items-center gap-6 text-sm font-medium">
            <router-link
              to="/home"
              class="text-gray-300 hover:text-white transition"
              >Feed</router-link
            >
            <router-link
              to="/tracks"
              class="text-gray-300 hover:text-white transition"
              >Tracks</router-link
            >
            <router-link
              to="/musicians"
              class="text-gray-300 hover:text-white transition"
              >Musicians</router-link
            >
          </div>
        </div>

        <!-- Center Search Bar -->
        <div class="hidden md:flex flex-1 max-w-xl mx-8">
          <div class="relative w-full">
            <input
              type="text"
              placeholder="Try searching Trap or Sad or Juice Wrld..."
              class="w-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-full py-2 px-5 pl-10 focus:outline-none focus:border-red-500 transition"
            />
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Right Side: Auth + Actions -->
        <div class="flex items-center gap-6">
          <!-- Show Sign Up/Sign In when NOT authenticated -->
          <div
            v-if="!authStore.isAuthenticated.value"
            class="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            <router-link
              to="/signup"
              class="text-gray-300 hover:text-white transition"
              >Sign up</router-link
            >
            <router-link
              to="/login"
              class="text-gray-300 hover:text-white transition"
              >Sign in</router-link
            >
          </div>

          <!-- Show User Avatar with Dropdown when authenticated -->
          <div v-else class="relative">
            <button
              @click="toggleDropdown"
              class="flex items-center gap-2 hover:opacity-80 transition"
            >
              <img
                v-if="authStore.currentUser.value?.avatar"
                :src="authStore.currentUser.value.avatar"
                alt="User Avatar"
                class="w-8 h-8 rounded-full object-cover"
              />
              <img
                v-else
                :src="defaultAvatar"
                alt="Default Avatar"
                class="w-8 h-8 rounded-full object-cover"
              />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-2"
            >
              <div class="px-4 py-2 border-b border-gray-700">
                <p class="text-sm font-medium text-white">
                  {{ authStore.currentUser.value?.name || "User" }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ authStore.state.email || "user@email.com" }}
                </p>
              </div>
              <router-link
                to="/settings"
                class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
                @click="closeDropdown"
              >
                Settings
              </router-link>
              <router-link
                to="/home"
                class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
                @click="closeDropdown"
              >
                My Beats
              </router-link>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition"
              >
                Sign Out
              </button>
            </div>
          </div>

          <router-link
            to="/upload"
            class="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-medium text-white transition"
          >
            Start Selling
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </router-link>
          <button class="text-gray-300 hover:text-white transition">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store";

const authStore = useAuthStore();
const router = useRouter();
const isDropdownOpen = ref(false);

// Random avatar selection - persists for the session (same as Settings)
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

const getUserInitial = computed(() => {
  const name = authStore.currentUser.value?.name || "U";
  return name.charAt(0).toUpperCase();
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleLogout = () => {
  authStore.logout();
  closeDropdown();
  router.push("/");
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = event.target.closest(".relative");
  if (!dropdown) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

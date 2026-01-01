<template>
  <div
    v-if="isLoggedIn"
    class="bg-gradient-to-r from-purple-950/70 to-purple-800/70 backdrop-blur-md border-b border-purple-600/40 py-3 px-4 text-white shadow-lg sticky top-0 z-50"
  >
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Left: Welcome message -->
      <div class="flex items-center gap-3">
        <span class="text-lg font-medium">
          Welcome back, <strong class="text-purple-300">{{ userName || 'Producer' }}</strong>! 🔥
        </span>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-6">
        <router-link
          to="/upload"
          class="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          Upload New Beat
        </router-link>

        <router-link
          to="/settings"
          class="text-sm text-purple-300 hover:text-purple-100 transition"
        >
          Settings
        </router-link>

        <button
          @click="logout"
          class="text-sm text-red-400 hover:text-red-300 transition"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Check if user is logged in (based on token presence)
const isLoggedIn = computed(() => {
  return !!(localStorage.getItem('token') || sessionStorage.getItem('token'))
})

// Placeholder - in real app, get from auth store / API / user object
const userName = computed(() => {
  return 'ProducerX' // ← replace with real name later
})

const logout = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  router.push('/login')
}
</script>
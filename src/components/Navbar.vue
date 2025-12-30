<template>
  <nav class="bg-black border-b border-gray-800 sticky top-0 z-50">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo + Left Menu -->
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xl">
              BM
            </div>
            <span class="text-xl font-bold text-white">BEATMARKET</span>
          </div>

          <div class="hidden md:flex items-center gap-6 text-sm font-medium">
            <router-link to="/home" class="text-gray-300 hover:text-white transition">Feed</router-link>
            <router-link to="/tracks" class="text-gray-300 hover:text-white transition">Tracks</router-link>
            <router-link to="/musicians" class="text-gray-300 hover:text-white transition">Musicians</router-link>
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Right Side: Auth + Actions -->
        <div class="flex items-center gap-6">
          <div class="hidden md:flex items-center gap-6 text-sm font-medium">
            <router-link to="/signup" class="text-gray-300 hover:text-white transition">Sign up</router-link>
            <router-link to="/login" class="text-gray-300 hover:text-white transition">Sign in</router-link>
          </div>
          <router-link
            to="/upload"
            class="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-medium text-white transition"
          >
            Start Selling
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </router-link>
          <button class="text-gray-300 hover:text-white transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Optional: add auth state later (e.g. show profile dropdown instead of Sign up/Sign in when logged in)
</script>
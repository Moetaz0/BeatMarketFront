<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <div class="bg-gray-950 border-b border-gray-800">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Secondary tabs -->
        

        <!-- Filters Row -->
        <div class="flex flex-wrap gap-4 py-6 border-t border-gray-800">
          <select class="bg-gray-900 border border-gray-700 rounded-full px-5 py-2 text-sm focus:outline-none focus:border-red-500">
            <option>All time</option>
            <option>This week</option>
            <option>This month</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>

          <select class="bg-gray-900 border border-gray-700 rounded-full px-5 py-2 text-sm focus:outline-none focus:border-red-500">
            <option>Genre</option>
            <option>Trap</option>
            <option>Hip Hop</option>
            <option>Drill</option>
            <option>RNB</option>
            <option>Pop</option>
            <option>Phonk</option>
          </select>

          <select class="bg-gray-900 border border-gray-700 rounded-full px-5 py-2 text-sm focus:outline-none focus:border-red-500">
            <option>Price</option>
            <option>Free</option>
            <option>$0 - $20</option>
            <option>$20 - $50</option>
            <option>$50+</option>
          </select>

          <select class="bg-gray-900 border border-gray-700 rounded-full px-5 py-2 text-sm focus:outline-none focus:border-red-500">
            <option>Mood</option>
            <option>Dark</option>
            <option>Happy</option>
            <option>Melodic</option>
            <option>Energetic</option>
            <option>Chill</option>
          </select>

          <select class="bg-gray-900 border border-gray-700 rounded-full px-5 py-2 text-sm focus:outline-none focus:border-red-500">
            <option>BPM</option>
            <option>120-140</option>
            <option>140-160</option>
            <option>160+</option>
          </select>

          <select class="bg-gray-900 border border-gray-700 rounded-full px-5 py-2 text-sm focus:outline-none focus:border-red-500">
            <option>Duration</option>
            <option>Under 2 min</option>
            <option>2-3 min</option>
            <option>3+ min</option>
          </select>

          <button class="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-medium transition">
            + More Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-bold mb-8">Top Charts</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <BeatCard v-for="beat in trendingBeats" :key="beat.id" v-bind="beat" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import BeatCard from '@/components/BeatCard.vue'

// ... your existing data ...
</script>
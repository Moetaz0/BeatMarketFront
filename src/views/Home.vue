<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <!-- Welcome / Hero -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-3">
          Welcome back<span v-if="userName">, {{ userName }}</span>!
        </h1>
        <p class="text-gray-400 text-lg">
          Discover trending beats and manage your catalog
        </p>
      </div>

      <!-- Trending Tracks Section -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-bold">Trending Tracks</h2>
          <a href="#" class="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-medium">
            View all →
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <BeatCard
            v-for="beat in trendingBeats"
            :key="beat.id"
            v-bind="beat"
          />
        </div>
      </section>

      <!-- Your Recent Uploads -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-bold">Your Recent Uploads</h2>
          <router-link 
            to="/upload" 
            class="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm font-medium"
          >
            Upload New →
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <BeatCard
            v-for="beat in yourBeats"
            :key="beat.id"
            v-bind="beat"
            isYours
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import BeatCard from '@/components/BeatCard.vue'

// Dummy data - replace with real API calls later
const trendingBeats = ref([
  { id: 1, title: "Murder | Kendrick x JID Type", producer: "ShadowProd", price: "$29.95", cover: "https://townsquare.media/site/812/files/2022/12/attachment-freddie-gibbs-pusha-t-latto-drake-21-savage-glorilla-jid.jpg?w=780&q=75", plays: "12.4k" },
  { id: 2, title: "Yeat x KanKan - Alien Vibes", producer: "Nebula", price: "$19.99", cover: "https://i.ytimg.com/vi/HZZZyIKvAWE/maxresdefault.jpg", plays: "8.9k" },
  { id: 3, title: "200 Beats Mega Bundle 🔥", producer: "MarkkAylin", price: "$49.99", cover: "https://i.ytimg.com/vi/YGlJ6LwuidU/maxresdefault.jpg", plays: "15.2k" },
  { id: 4, title: "Keepin It Real Free Type", producer: "StunnaBeatz", price: "Free", cover: "http://unfocussed.com/cdn/shop/articles/Luminescent_Symphony.png?v=1732049525", plays: "22.1k" },
])

const yourBeats = ref([
  { id: 5, title: "Your Drill x Afro Fusion", producer: "You", price: "$34.99", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPpsMqkon_oG4YGRLiQ6S0NzVh84DH0C-4DIOypP5cDDH06Sek&s", plays: "487" },
  { id: 6, title: "Trap Soul 2025", producer: "You", price: "$24.99", cover: "https://consequence.net/wp-content/uploads/2023/04/best-greatest-stoner-weed-albums-all-time.jpg?quality=80", plays: "312" },
])

const userName = ref('')

onMounted(() => {
  // Simple placeholder - in real app fetch from API / store
  userName.value = 'ProducerX'
})
</script>
<template>
  <div
    class="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all duration-300"
  >
    <!-- Cover -->
    <div class="aspect-square relative bg-gray-800">
      <img
        :src="cover || fallbackCover"
        alt="Beat cover"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="handleImageError"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-1 truncate text-white">
        {{ title }}
      </h3>
      <p class="text-gray-400 text-sm mb-3">
        by {{ producer }}
      </p>

      <div class="flex items-center justify-between">
        <span
          :class="[
            'font-bold text-lg',
            price === 'Free' ? 'text-green-400' : 'text-red-400'
          ]"
        >
          {{ price }}
        </span>
        <div class="flex items-center gap-4 text-gray-400 text-sm">
          <span>▶ {{ plays }}</span>
          <button
            class="hover:text-white transition-colors duration-200"
          >
            {{ isYours ? 'Edit' : 'License' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fallbackCover = 'https://i8.amplience.net/i/naras/hero_1644x925_v1.png.jpg'

const handleImageError = (event) => {
  event.target.src = fallbackCover
  event.target.alt = 'Fallback cover (original image failed to load)'
}

defineProps({
  title: {
    type: String,
    required: true
  },
  producer: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    default: ''
  },
  plays: {
    type: String,
    default: '0'
  },
  isYours: {
    type: Boolean,
    default: false
  }
})
</script>
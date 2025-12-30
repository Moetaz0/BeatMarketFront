<template>
  <div
    class="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all duration-300 group"
  >
    <!-- Sample Beat Covers Carousel -->
    <div class="relative h-48 overflow-x-auto flex gap-2 p-3 bg-black/40 snap-x snap-mandatory">
      <img
        v-for="(cover, index) in covers"
        :key="index"
        :src="cover"
        alt="Beat preview"
        class="w-32 h-full object-cover rounded-lg flex-shrink-0 snap-center border border-gray-700 group-hover:border-red-500 transition-all"
        loading="lazy"
      />
      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
    </div>

    <!-- Producer Info -->
    <div class="p-5">
      <div class="flex items-center gap-4 mb-4">
        <img
          :src="avatar"
          alt="Producer avatar"
          class="w-16 h-16 rounded-full object-cover border-2 border-red-500"
        />
        <div>
          <h3 class="font-bold text-xl text-white">{{ name }}</h3>
          <p class="text-gray-400 text-sm">{{ location }}</p>
        </div>
      </div>

      <p class="text-gray-300 text-sm mb-6 line-clamp-3">
        {{ bio }}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-red-400 font-bold text-lg">
          From {{ price }}
        </span>
        <div class="flex gap-3">
          <button
            class="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
          >
            Show Profile
          </button>
          <button
            class="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  covers: {
    type: Array,
    default: () => []
  }
})
</script>
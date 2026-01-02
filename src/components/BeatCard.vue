<template>
  <div
    @click="handleClick"
    class="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all duration-300 cursor-pointer"
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

      <!-- Play Button Overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div
          class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <svg
            class="w-8 h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-1 truncate text-white">
        {{ title }}
      </h3>
      <p class="text-gray-400 text-sm mb-3">by {{ producer }}</p>

      <div class="flex items-center justify-between">
        <span
          :class="[
            'font-bold text-lg',
            price === 'Free' ? 'text-green-400' : 'text-red-400',
          ]"
        >
          {{ price }}
        </span>
        <div class="flex items-center gap-4 text-gray-400 text-sm">
          <span>▶ {{ plays }}</span>
          <button class="hover:text-white transition-colors duration-200">
            {{ isYours ? "Edit" : "License" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fallbackCover =
  "https://i8.amplience.net/i/naras/hero_1644x925_v1.png.jpg";

const handleImageError = (event) => {
  event.target.src = fallbackCover;
  event.target.alt = "Fallback cover (original image failed to load)";
};

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: "",
  },
  plays: {
    type: String,
    default: "0",
  },
  isYours: {
    type: Boolean,
    default: false,
  },
  fileUrl: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["play"]);

const handleClick = () => {
  emit("play", {
    id: props.id,
    title: props.title,
    producer: props.producer,
    price: props.price,
    cover: props.cover || fallbackCover,
    fileUrl: props.fileUrl,
  });
};
</script>

<template>
  <div class="bg-white border border-red-300 rounded-2xl p-5 shadow-lg">
    <!-- Banner -->
    <img v-if="post.banner" :src="post.banner" class="w-full rounded-xl mb-4" />

    <!-- Text -->
    <p v-if="post.text" class="text-gray-800 mb-4 text-lg">
      {{ post.text }}
    </p>

    <!-- Audio -->
    <audio
      v-if="post.audio"
      :src="post.audio"
      controls
      class="w-full my-3"
    ></audio>

    <!-- Actions -->
    <div class="flex justify-between items-center mt-3 text-red-700">
      <div class="flex items-center gap-5">
        <!-- Like -->
        <button
          @click="like"
          class="flex items-center gap-2 hover:text-red-900 transition"
        >
          <i class="fa-solid fa-heart"></i>
          <span>{{ likes }}</span>
        </button>

        <!-- Comment -->
        <button class="flex items-center gap-2 hover:text-red-900 transition">
          <i class="fa-regular fa-comment"></i>
        </button>

        <!-- Share -->
        <button class="flex items-center gap-2 hover:text-red-900 transition">
          <i class="fa-solid fa-share"></i>
        </button>
      </div>

      <!-- Views -->
      <div class="flex items-center gap-2 text-gray-600">
        <i class="fa-solid fa-eye"></i>
        <span>{{ views }} views</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  post: Object,
});

const likes = ref(props.post.likes);
const views = ref(Math.floor(Math.random() * 1000));

const like = () => likes.value++;
</script>

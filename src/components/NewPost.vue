<template>
  <div class="bg-white shadow-lg rounded-2xl p-5 border border-red-300 mb-6">
    <!-- Text Area -->
    <textarea
      class="w-full bg-red-50 p-3 rounded-xl border border-red-300 focus:border-red-600 outline-none"
      rows="3"
      placeholder="Share something, upload a beat, or add a banner..."
      v-model="text"
    ></textarea>

    <!-- Action Icons Row -->
    <div class="flex items-center justify-between mt-4 px-2 text-red-600">
      <div class="flex items-center gap-6">
        <!-- Banner Upload -->
        <label
          class="cursor-pointer flex items-center gap-2 hover:text-red-800 transition"
        >
          <i class="fa-solid fa-image text-xl"></i>
          <input type="file" class="hidden" @change="selectBanner" />
        </label>

        <!-- Beat Upload -->
        <label
          class="cursor-pointer flex items-center gap-2 hover:text-red-800 transition"
        >
          <i class="fa-solid fa-music text-xl"></i>
          <input type="file" class="hidden" @change="selectAudio" />
        </label>

        <!-- Emoji -->
        <button class="hover:text-red-800">
          <i class="fa-regular fa-face-smile text-xl"></i>
        </button>

        <!-- Hashtag -->
        <button class="hover:text-red-800">
          <i class="fa-solid fa-hashtag text-xl"></i>
        </button>

        <!-- Camera -->
        <button class="hover:text-red-800">
          <i class="fa-solid fa-camera text-xl"></i>
        </button>

        <!-- Link -->
        <button class="hover:text-red-800">
          <i class="fa-solid fa-link text-xl"></i>
        </button>
      </div>

      <!-- Publish -->
      <button
        @click="publish"
        class="bg-red-600 text-white font-bold px-5 py-2 rounded-xl hover:bg-red-700 transition"
      >
        Publish
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["postCreated"]);

const text = ref("");
const banner = ref(null);
const audio = ref(null);

const selectBanner = (e) => (banner.value = e.target.files[0]);
const selectAudio = (e) => (audio.value = e.target.files[0]);

const publish = () => {
  if (!text.value && !banner.value && !audio.value) return;

  emit("postCreated", {
    id: Date.now(),
    text: text.value,
    banner: banner.value ? URL.createObjectURL(banner.value) : null,
    audio: audio.value ? URL.createObjectURL(audio.value) : null,
    likes: 0,
  });

  text.value = "";
  banner.value = null;
  audio.value = null;
};
</script>

<template>
  <transition name="slide-in-up">
    <div
      v-if="visible"
      class="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl shadow-green-600/50 z-50 flex items-center gap-3 backdrop-blur-sm border border-green-500/30 group hover:shadow-green-500/70 transition-all duration-300"
    >
      <div class="flex-shrink-0">
        <svg
          class="w-6 h-6 animate-bounce"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="flex-1">
        <p class="font-bold text-sm">Success!</p>
        <p class="text-green-100 text-sm">{{ message }}</p>
      </div>
      <button
        @click="visible = false"
        class="flex-shrink-0 text-green-200 hover:text-white transition p-1"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: String,
  show: Boolean,
});

const visible = ref(false);

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      visible.value = true;
      setTimeout(() => (visible.value = false), 3000);
    }
  }
);
</script>

<style scoped>
.slide-in-up-enter-active,
.slide-in-up-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-in-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 1.5s ease-in-out infinite;
}
</style>

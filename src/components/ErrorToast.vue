<template>
  <transition name="slide-in-up">
    <div
      v-if="show"
      class="fixed bottom-8 right-8 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-4 rounded-xl shadow-2xl shadow-red-600/50 z-50 flex items-center gap-3 backdrop-blur-sm border border-red-500/30 group hover:shadow-red-500/70 transition-all duration-300"
    >
      <div class="flex-shrink-0">
        <svg
          class="w-6 h-6 animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="flex-1">
        <p class="font-bold text-sm">Error</p>
        <p class="text-red-100 text-sm">{{ message }}</p>
      </div>
      <button
        @click="$emit('close')"
        class="flex-shrink-0 text-red-200 hover:text-white transition p-1 hover:bg-red-500/20 rounded-lg"
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
defineProps({
  show: Boolean,
  message: String,
});

defineEmits(["close"]);
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

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

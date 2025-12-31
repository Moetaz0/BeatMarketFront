<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed top-5 right-5 bg-red-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
    >
      <span class="font-bold">⚠ Error</span>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

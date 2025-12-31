<template>
  <div v-if="visible" class="toast">
    {{ message }}
  </div>
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
      setTimeout(() => (visible.value = false), 2000);
    }
  }
);
</script>

<style>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: black;
  color: white;
  padding: 12px 18px;
  border-radius: 6px;
  font-weight: bold;
  z-index: 9999;
  box-shadow: 0 0 8px rgba(255, 0, 0, 0.5); /* slight red glow */
}
</style>

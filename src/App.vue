<template>
  <CartDrawer ref="cartDrawer" />
  <router-view />
</template>

<script setup>
import { ref } from "vue";
import CartDrawer from "./components/CartDrawer.vue";

const cartDrawer = ref(null);

// Global method to toggle cart from anywhere
window.openCart = () => {
  if (cartDrawer.value) {
    cartDrawer.value.toggle();
  }
};
</script>

<template>
  <ErrorToast
    :message="errorMessage"
    :show="showError"
    @close="showError = false"
  />

  <div
    class="min-h-screen bg-[rgba(20,0,0,0.88)] backdrop-blur-xl bg-fixed relative overflow-hidden flex flex-col"
  >
    <!-- Logo -->
    <div
      class="absolute top-8 left-8 flex items-center gap-3 text-red-600 text-2xl font-bold z-10"
    >
      <div
        class="w-10 h-10 bg-red-700 rounded-md flex items-center justify-center text-white font-bold"
      >
        <span class="text-sm">BM</span>
      </div>
      <span class="logo-text">BeatMarket</span>
    </div>

    <div
      class="flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-20 max-w-[1900px] mx-auto w-full"
    >
      <!-- Form Card -->
      <div
        class="flex-none w-full max-w-[440px] z-20 mt-12 lg:mt-12 ml-0 lg:ml-12"
      >
        <div
          class="relative bg-[rgba(20,0,0,0.88)] backdrop-blur-xl rounded-2xl p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[rgba(120,10,10,0.25)]"
        >
          <!-- Back to Login -->
          <a
            href="/login"
            class="absolute top-4 right-4 text-sm text-red-300 hover:text-red-100 hover:underline"
          >
            Back To Login
          </a>

          <h1 class="text-white text-3xl text-center mb-2">Forgot Password</h1>
          <p class="text-red-300 text-sm leading-6 text-center mb-10">
            Enter your email and we’ll send you a<br />password reset link.
          </p>

          <form @submit.prevent="sendResetLink">
            <div class="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                v-model="email"
                required
                class="w-full p-4 bg-[rgba(50,0,0,0.6)] border border-[rgba(120,10,10,0.4)] rounded-xl text-white text-base outline-none placeholder-red-400 focus:border-red-700 focus:bg-[rgba(70,0,0,0.7)] focus:shadow-[0_0_15px_rgba(120,10,10,0.4)] transition-all"
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-4 mt-4 bg-red-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:bg-red-800 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(120,10,10,0.5)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg
                v-if="isLoading"
                class="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? "Sending..." : "Send Reset Link" }}
            </button>
          </form>
        </div>
      </div>

      <!-- Guitar Background -->
      <div
        class="pointer-events-none hidden lg:block absolute top-0 right-[-10%] w-[1100px] h-screen z-10"
        aria-hidden="true"
      >
        <div
          class="w-full h-full bg-center bg-no-repeat bg-contain filter drop-shadow-[0_0_100px_rgba(120,10,10,0.7)] brightness-[1.05] contrast-[1.25] opacity-95"
          :style="{
            transform: 'rotate(18deg)',
            backgroundImage: `url('/src/assets/guitar.png')`,
          }"
        ></div>
      </div>
    </div>

    <!-- SUCCESS MODAL -->
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="showModal = false"
        >
          <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

          <div
            class="relative bg-[rgba(20,0,0,0.95)] backdrop-blur-2xl rounded-2xl p-10 shadow-[0_0_80px_rgba(120,10,10,0.6)] border border-red-800/50 max-w-md w-full"
          >
            <!-- Checkmark -->
            <div
              class="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center border-4 border-green-500/40"
            >
              <svg
                class="w-12 h-12 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 class="text-2xl font-bold text-white text-center mb-3">
              Check Your Inbox!
            </h3>
            <p class="text-red-200 text-center leading-relaxed">
              A password reset link has been sent to<br />
              <span class="text-red-400 font-semibold">{{ email }}</span>
            </p>

            <button
              @click="showModal = false"
              class="mt-8 w-full py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-lg rounded-xl hover:from-red-700 hover:to-red-900 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import authService from "../services/authService"; // adjust path if needed
import ErrorToast from "@/components/ErrorToast.vue";

const email = ref("");
const showModal = ref(false);
const isLoading = ref(false);

const showError = ref(false);
const errorMessage = ref("");

const toastError = (message) => {
  errorMessage.value = message;
  showError.value = false;
  setTimeout(() => {
    showError.value = true;
  }, 0);
  setTimeout(() => {
    showError.value = false;
  }, 4000);
};

const sendResetLink = async () => {
  if (!email.value) return;

  isLoading.value = true;

  try {
    // 🔥 Call your backend API
    const response = await authService.forgot(email.value);
    console.log("Reset email sent:", response.data);

    // Show success modal
    showModal.value = true;
  } catch (err) {
    console.error("Forgot password error:", err.response?.data || err.message);
    toastError("This email is not registered.");
  }

  isLoading.value = false;
};
</script>

<!-- Built-in Vue transition instead of custom keyframes (no more errors) -->
<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
</style>

<template>
  <SuccessToast :message="successMessage" :show="showSuccess" />
  <ErrorToast :message="errorMessage" :show="showError" />

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
      <!-- Left: Form -->
      <div
        class="flex-none w-full max-w-[440px] z-20 mt-12 lg:mt-12 ml-0 lg:ml-12"
      >
        <div
          class="relative bg-[rgba(20,0,0,0.88)] backdrop-blur-xl rounded-2xl p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[rgba(120,10,10,0.25)]"
        >
          <a
            href="/signup"
            class="absolute top-4 right-4 text-sm text-red-300 hover:text-red-100 hover:underline"
          >
            Don't have an account?
          </a>

          <h1 class="text-white text-3xl text-center mb-2">
            Welcome to BeatMarket
          </h1>
          <p class="text-red-300 text-sm leading-6 text-center mb-10">
            Login to your account to see and choose your<br />
            favorite musical instrument from BeatMarket.
          </p>

          <form @submit.prevent="login">
            <div class="mb-4">
              <input
                type="email"
                placeholder="Email"
                v-model="email"
                required
                class="w-full p-4 bg-[rgba(50,0,0,0.6)] border border-[rgba(120,10,10,0.4)] rounded-xl text-white focus:border-red-700"
              />
            </div>

            <div class="mb-4">
              <input
                type="password"
                placeholder="Password"
                v-model="password"
                required
                class="w-full p-4 bg-[rgba(50,0,0,0.6)] border border-[rgba(120,10,10,0.4)] rounded-xl text-white focus:border-red-700"
              />
            </div>

            <button
              type="submit"
              class="w-full py-4 mt-4 bg-red-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:bg-red-800"
            >
              Sign In
            </button>
          </form>

          <div
            class="flex justify-between items-center mt-6 text-sm text-red-300"
          >
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="remember" class="sr-only" />
              <span
                class="w-4 h-4 border-2 border-red-400 rounded-sm flex items-center justify-center"
              >
                <svg
                  v-if="remember"
                  class="w-3 h-3 text-red-600"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M3.5 8.5L6.2 11l6-7"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="text-red-300">Remember Me</span>
            </label>

            <a href="/forgot-password" class="text-red-400 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      <!-- Right side Image -->
      <div
        class="pointer-events-none hidden lg:block absolute top-0 right-[-10%] w-[1100px] h-screen z-10"
      >
        <div
          class="w-full h-full bg-center bg-no-repeat bg-contain filter drop-shadow-[0_0_100px_rgba(120,10,10,0.7)]"
          :style="{
            transform: 'rotate(18deg)',
            backgroundImage: `url('/src/assets/guitar.png')`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import authService from "../services/authService";
import SuccessToast from "@/components/SuccessToast.vue";
import ErrorToast from "@/components/ErrorToast.vue";
import { useRouter } from "vue-router";
import { setTokens } from "@/utils/tokenStorage";
import { useAuthStore } from "../../store";
const router = useRouter();
const authStore = useAuthStore();
const showSuccess = ref(false);
const successMessage = ref("");

const showError = ref(false);
const errorMessage = ref("");

const email = ref("");
const password = ref("");
const remember = ref(false);

const login = async () => {
  try {
    const response = await authService.login({
      email: email.value,
      password: password.value,
      remember: remember.value,
    });

    console.log("Login response:", response);
    console.log("Response data:", response.data);

    const access =
      response.data?.token ||
      response.data?.access_token ||
      response.data?.accessToken;
    const refresh = response.data?.refresh_token || response.data?.refreshToken;

    console.log("Extracted tokens:", {
      access: access?.substring(0, 20),
      refresh: refresh?.substring(0, 20),
    });

    if (access && refresh) {
      console.log("Calling setTokens with remember:", remember.value);
      setTokens(access, refresh, remember.value);
      console.log("setTokens completed");

      // Set minimal auth state to allow navigation
      authStore.state.isAuthenticated = true;
      authStore.setEmail(email.value);
    }

    successMessage.value = "Login successful!";
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
      router.push("/");
    }, 1500);
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Login failed. Please try again.";
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 3000);
  }
};
</script>

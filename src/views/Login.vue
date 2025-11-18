<template>
  <div
    class="min-h-screen bg-[rgba(20,0,0,0.88)] backdrop-blur-xl bg-fixed relative overflow-hidden flex flex-col"
  >
    <!-- Logo -->
    <div class="absolute top-8 left-8 flex items-center gap-3 text-red-600 text-2xl font-bold z-10">
      <div class="w-10 h-10 bg-red-700 rounded-md flex items-center justify-center text-white font-bold">
        <span class="text-sm">BM</span>
      </div>
      <span class="logo-text">BeatMarket</span>
    </div>

    <!-- Main layout: form left + guitar right -->
    <div class="flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-20 max-w-[1900px] mx-auto w-full">
      <!-- Left: Form -->
      <div class="flex-none w-full max-w-[440px] z-20 mt-12 lg:mt-12 ml-0 lg:ml-12">
        <div
          class="relative bg-[rgba(20,0,0,0.88)] backdrop-blur-xl rounded-2xl p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[rgba(120,10,10,0.25)]"
        >
          <!-- top-right link -->
          <a
  href="#"
  @click.prevent="$emit('switch', 'signup')"
  class="absolute top-4 right-4 text-sm text-red-300 hover:text-red-100 hover:underline"
>
  Don't have an account?
</a>



          <h1 class="text-white text-3xl text-center mb-2">Welcome to BeatMarket</h1>
          <p class="text-red-300 text-sm leading-6 text-center mb-10">
            Login to your account to see and choose your<br />favorite musical instrument from BeatMarket.
          </p>

          <form @submit.prevent="login">
            

            <div class="mb-4">
              <input
                type="email"
                placeholder="Email"
                v-model="email"
                required
                class="w-full p-4 bg-[rgba(50,0,0,0.6)] border border-[rgba(120,10,10,0.4)] rounded-xl text-white text-base outline-none placeholder-red-400 focus:border-red-700 focus:bg-[rgba(70,0,0,0.7)] focus:shadow-[0_0_15px_rgba(120,10,10,0.4)]"
              />
            </div>

            <div class="mb-4">
              <input
                type="password"
                placeholder="Password"
                v-model="password"
                required
                class="w-full p-4 bg-[rgba(50,0,0,0.6)] border border-[rgba(120,10,10,0.4)] rounded-xl text-white text-base outline-none placeholder-red-400 focus:border-red-700 focus:bg-[rgba(70,0,0,0.7)] focus:shadow-[0_0_15px_rgba(120,10,10,0.4)]"
              />
            </div>

            <button
              type="submit"
              class="w-full py-4 mt-4 bg-red-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:bg-red-800 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(120,10,10,0.5)]"
            >
              Sign In
            </button>
          </form>

          <div class="flex justify-between items-center mt-6 text-sm text-red-300">
            <label class="flex items-center gap-3 cursor-pointer relative">
              <input type="checkbox" v-model="remember" class="sr-only" />
              <span
                class="w-4 h-4 border-2 border-red-400 rounded-sm flex items-center justify-center"
                aria-hidden="true"
              >
                <svg v-if="remember" class="w-3 h-3 text-red-600" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                  <path d="M3.5 8.5L6.2 11l6-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="text-red-300 select-none">Remember Me</span>
            </label>

            <a href="#" @click.prevent="$emit('switch', 'forgot')" class="text-red-400 hover:underline">Forgot Password?</a>
          </div>
        </div>
      </div>

      <!-- Right: Giant rotated guitar -->
      <div
        class="pointer-events-none hidden lg:block absolute top-0 right-[-10%] w-[1100px] h-screen z-10"
        aria-hidden="true"
      >
        <div
          class="w-full h-full bg-center bg-no-repeat bg-contain filter drop-shadow-[0_0_100px_rgba(120,10,10,0.7)] brightness-[1.05] contrast-[1.25] opacity-95"
          :style="{ transform: 'rotate(18deg)', backgroundImage: `url('/src/assets/guitar.png')` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('someone@gmail.com')
const password = ref('')
const remember = ref(false)

const login = () => {
  alert(`Logging in as ${email.value}`)
}
</script>

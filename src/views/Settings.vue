<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />
    <AuthTopBar /> <!-- Optional: if you have the signed-in top bar -->

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold mb-2">Settings</h1>
      <p class="text-gray-400 mb-12">Manage your account information and security</p>

      <div class="space-y-12">
        <!-- Personal Information -->
        <section class="bg-gray-950/70 backdrop-blur-xl rounded-3xl p-8 border border-red-900/30 shadow-xl">
          <h2 class="text-2xl font-bold mb-6 text-red-300">Personal Information</h2>

          <form @submit.prevent="updateProfile" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-2">Email</label>
              <input
                v-model="form.email"
                type="email"
                disabled
                class="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm text-gray-400 mb-2">Location</label>
              <input
                v-model="form.location"
                type="text"
                class="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
                placeholder="City, Country"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm text-gray-400 mb-2">Bio</label>
              <textarea
                v-model="form.bio"
                rows="4"
                class="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <div class="md:col-span-2 flex justify-end">
              <button
                type="submit"
                class="px-8 py-3 bg-red-700 hover:bg-red-600 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_8px_25px_rgba(168,85,247,0.3)]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>

        <!-- Change Password -->
        <section class="bg-gray-950/70 backdrop-blur-xl rounded-3xl p-8 border border-red-900/30 shadow-xl">
          <h2 class="text-2xl font-bold mb-6 text-red-300">Change Password</h2>

          <form @submit.prevent="changePassword" class="space-y-6">
            <div>
              <label class="block text-sm text-gray-400 mb-2">Current Password</label>
              <input
                v-model="password.current"
                type="password"
                class="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-2">New Password</label>
              <input
                v-model="password.new"
                type="password"
                class="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-2">Confirm New Password</label>
              <input
                v-model="password.confirm"
                type="password"
                class="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="px-8 py-3 bg-red-700 hover:bg-red-600 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_8px_25px_rgba(168,85,247,0.3)]"
              >
                Update Password
              </button>
            </div>
          </form>
        </section>

        <!-- Logout -->
        <section class="bg-gray-950/70 backdrop-blur-xl rounded-3xl p-8 border border-red-900/30 shadow-xl">
          <h2 class="text-2xl font-bold mb-6 text-red-300">Account Actions</h2>

          <button
            @click="logout"
            class="w-full py-4 bg-red-700/80 hover:bg-red-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_8px_25px_rgba(239,68,68,0.3)]"
          >
            Log Out
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import AuthTopBar from '@/components/AuthTopBar.vue' // optional

const router = useRouter()

// Personal info form
const form = ref({
  name: 'ProducerX',
  email: 'producerx@example.com',
  location: 'Paris, France',
  bio: 'Beatmaker specializing in trap & melodic hip-hop. Always looking for new vibes.'
})

// Password change form
const password = ref({
  current: '',
  new: '',
  confirm: ''
})

// Simple logout
const logout = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  router.push('/login')
}

// Placeholder handlers (add real API calls later)
const updateProfile = () => {
  alert('Profile updated! (API call placeholder)')
}

const changePassword = () => {
  if (password.value.new !== password.value.confirm) {
    alert('New passwords do not match!')
    return
  }
  alert('Password changed! (API call placeholder)')
}
</script>
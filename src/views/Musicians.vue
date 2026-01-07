<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <div class="bg-gray-950 border-b border-gray-800">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Secondary tabs -->
      </div>
    </div>

    <!-- Main Content with Filters -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Sidebar Filters -->
        <div class="lg:w-72 flex-shrink-0">
          <div
            class="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-20"
          >
            <h3 class="text-xl font-bold mb-6">Filters</h3>

            <div class="space-y-6">
              <!-- Location -->
              <div>
                <label class="block text-gray-400 text-sm mb-2">Location</label>
                <select
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white"
                >
                  <option>All Locations</option>
                  <option>United States</option>
                  <option>France</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Germany</option>
                </select>
              </div>

              <!-- Genre -->
              <div>
                <label class="block text-gray-400 text-sm mb-2">Genre</label>
                <select
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white"
                >
                  <option>All Genres</option>
                  <option>Trap</option>
                  <option>Hip Hop</option>
                  <option>RNB</option>
                  <option>Pop</option>
                  <option>Drill</option>
                </select>
              </div>

              <!-- Price Range -->
              <div>
                <label class="block text-gray-400 text-sm mb-2"
                  >Starting Price</label
                >
                <select
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white"
                >
                  <option>Any Price</option>
                  <option>Free</option>
                  <option>$0 - $25</option>
                  <option>$25 - $50</option>
                  <option>$50+</option>
                </select>
              </div>

              <!-- Rating -->
              <div>
                <label class="block text-gray-400 text-sm mb-2">Rating</label>
                <select
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white"
                >
                  <option>Any Rating</option>
                  <option>4.5+ Stars</option>
                  <option>4+ Stars</option>
                  <option>3+ Stars</option>
                </select>
              </div>

              <!-- More Filters Button -->
              <button
                class="w-full px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-8">Musicians</h1>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <ProducerCard
              v-for="producer in producers"
              :key="producer.id"
              v-bind="producer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import ProducerCard from "@/components/ProducerCard.vue";

// ... your producers data ...
</script>

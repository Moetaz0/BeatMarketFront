<template>
  <div
    class="group bg-gray-900/70 backdrop-blur-lg rounded-2xl p-6 border border-gray-800 
           hover:border-red-500 hover:shadow-[0_8px_25px_rgba(168,85,247,0.15)] 
           transition-all duration-300 transform hover:scale-[1.02]"
  >
    <div class="text-4xl mb-3 opacity-90 group-hover:opacity-100 transition-opacity">
      {{ icon }}
    </div>
    <p class="text-gray-400 text-sm uppercase tracking-wide font-medium">
      {{ label }}
    </p>
    <p :class="['text-3xl font-bold mt-2', color || 'text-white']">
      {{ value }}
    </p>
    <p class="text-sm mt-2 font-medium" :class="trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'">
      {{ trend }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  trend: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '📊'
  },
  color: {
    type: String,
    default: 'text-white'
  }
})
</script>
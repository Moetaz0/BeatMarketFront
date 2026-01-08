<template>
  <div
    @click="handleClick"
    class="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500 transition-all duration-300 cursor-pointer"
  >
    <!-- Cover -->
    <div class="aspect-square relative bg-gray-800">
      <img
        :src="cover || fallbackCover"
        alt="Beat cover"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="handleImageError"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <!-- Play Button Overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div
          class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <svg
            class="w-8 h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-1 truncate text-white">
        {{ title }}
      </h3>
      <p class="text-gray-400 text-sm mb-3">by {{ producer }}</p>

      <div class="flex items-center justify-between">
        <span
          :class="[
            'font-bold text-lg',
            price === 'Free' ? 'text-green-400' : 'text-red-400',
          ]"
        >
          {{ price }}
        </span>
        <div class="flex items-center gap-4 text-gray-400 text-sm">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>
            {{ viewCount }}
          </span>
          <button
            v-if="isYours"
            @click.stop="handleEdit"
            class="transition-colors duration-200 hover:text-red-400 font-medium"
          >
            Edit
          </button>
          <button
            v-else
            class="hover:text-white transition-colors duration-200"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import beatService from "../services/beatService";

const fallbackCover =
  "https://i8.amplience.net/i/naras/hero_1644x925_v1.png.jpg";

const viewCount = ref("0");
const isLoading = ref(false);

const handleImageError = (event) => {
  event.target.src = fallbackCover;
  event.target.alt = "Fallback cover (original image failed to load)";
};

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  licenseName: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: "",
  },
  plays: {
    type: String,
    default: "0",
  },
  views: {
    type: [String, Number],
    default: null,
  },
  isYours: {
    type: Boolean,
    default: false,
  },
  isOwned: {
    type: Boolean,
    default: false,
  },
  fileUrl: {
    type: String,
    default: "",
  },
  producerId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["play", "edit"]);

// Set initial view count from props if provided
if (props.views) {
  viewCount.value = String(props.views);
}

// Fetch view count when component mounts if not provided as prop
const fetchViewCount = async () => {
  if (!props.id || isLoading.value) return;

  try {
    isLoading.value = true;
    const result = await beatService.getBeatViews(props.id);
    viewCount.value = String(result.views || result.viewCount || "0");
  } catch (error) {
    console.warn("Failed to load view count:", error);
    if (!viewCount.value || viewCount.value === "0") {
      viewCount.value = "0";
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  // Only fetch if views weren't provided as prop
  if (!props.views && props.id) {
    fetchViewCount();
  }
});

// Watch for changes in views prop
watch(
  () => props.views,
  (newValue) => {
    if (newValue) {
      viewCount.value = String(newValue);
    }
  }
);

const handleClick = () => {
  emit("play", {
    id: props.id,
    title: props.title,
    producer: props.producer,
    licenseName: props.licenseName,
    price: props.price,
    cover: props.cover || fallbackCover,
    fileUrl: props.fileUrl,
    isYours: props.isYours,
    isOwned: props.isOwned || props.isYours,
    producerId: props.producerId || null,
  });
};

const handleEdit = () => {
  emit("edit", {
    id: props.id,
    title: props.title,
    producer: props.producer,
    licenseName: props.licenseName,
    price: props.price,
    cover: props.cover || fallbackCover,
    fileUrl: props.fileUrl,
  });
};
</script>

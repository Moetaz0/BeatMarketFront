<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Support</h1>
        <p class="text-gray-400">
          We're here to help. Get in touch with our support team.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Support Channels -->
        <div class="lg:col-span-1 space-y-4">
          <!-- Live Chat -->
          <div
            class="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-red-600 transition cursor-pointer"
            @click="activeChannel = 'chat'"
          >
            <div
              class="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="font-semibold mb-1">Live Chat</h3>
            <p class="text-sm text-gray-400">Chat with our support team</p>
            <p class="text-xs text-gray-500 mt-2">Response time: ~2 minutes</p>
          </div>

          <!-- Email Support -->
          <div
            class="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-red-600 transition cursor-pointer"
            @click="activeChannel = 'email'"
          >
            <div
              class="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="font-semibold mb-1">Email Support</h3>
            <p class="text-sm text-gray-400">support@beatmarket.com</p>
            <p class="text-xs text-gray-500 mt-2">Response time: ~24 hours</p>
          </div>

          <!-- FAQ -->
          <div
            class="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-red-600 transition cursor-pointer"
            @click="activeChannel = 'faq'"
          >
            <div
              class="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="font-semibold mb-1">FAQ</h3>
            <p class="text-sm text-gray-400">Browse common questions</p>
            <p class="text-xs text-gray-500 mt-2">Instant answers</p>
          </div>

          <!-- Ticket Status -->
          <div
            class="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-red-600 transition cursor-pointer"
            @click="activeChannel = 'tickets'"
          >
            <div
              class="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="font-semibold mb-1">My Tickets</h3>
            <p class="text-sm text-gray-400">View support tickets</p>
            <p class="text-xs text-gray-500 mt-2">
              {{ tickets.length }} open tickets
            </p>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Live Chat -->
          <div
            v-if="activeChannel === 'chat'"
            class="bg-gray-900 rounded-lg border border-gray-800 p-6"
          >
            <h3 class="text-xl font-semibold mb-4">Live Chat Support</h3>
            <div
              class="bg-gray-800 rounded-lg p-4 h-64 mb-4 overflow-y-auto space-y-4"
            >
              <div class="flex gap-3">
                <div
                  class="w-8 h-8 bg-red-600 rounded-full flex-shrink-0"
                ></div>
                <div>
                  <p class="font-medium text-sm">Support Agent</p>
                  <p class="text-sm text-gray-300 mt-1">
                    Hi! How can we help you today?
                  </p>
                  <p class="text-xs text-gray-500 mt-1">2:30 PM</p>
                </div>
              </div>
              <div class="flex gap-3 justify-end">
                <div class="max-w-xs">
                  <p class="text-sm text-gray-300 bg-red-600/30 rounded-lg p-2">
                    I need help with my beat upload
                  </p>
                  <p class="text-xs text-gray-500 mt-1">2:32 PM</p>
                </div>
              </div>
              <div class="flex gap-3">
                <div
                  class="w-8 h-8 bg-red-600 rounded-full flex-shrink-0"
                ></div>
                <div>
                  <p class="font-medium text-sm">Support Agent</p>
                  <p class="text-sm text-gray-300 mt-1">
                    Of course! I'd be happy to help. Can you describe the issue
                    you're experiencing?
                  </p>
                  <p class="text-xs text-gray-500 mt-1">2:33 PM</p>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <input
                v-model="chatMessage"
                type="text"
                placeholder="Type your message..."
                class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
              <button
                @click="sendMessage"
                class="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
              >
                Send
              </button>
            </div>
          </div>

          <!-- Email Support -->
          <div
            v-if="activeChannel === 'email'"
            class="bg-gray-900 rounded-lg border border-gray-800 p-6"
          >
            <h3 class="text-xl font-semibold mb-4">Email Support</h3>
            <form @submit.prevent="submitEmailSupport" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  v-model="emailForm.subject"
                  type="text"
                  placeholder="What can we help with?"
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  v-model="emailForm.category"
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
                >
                  <option value="">Select a category</option>
                  <option value="upload">Beat Upload Issues</option>
                  <option value="payment">Payment Issues</option>
                  <option value="account">Account Problems</option>
                  <option value="license">License Questions</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  v-model="emailForm.message"
                  placeholder="Describe your issue in detail..."
                  rows="6"
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
              >
                Send Email
              </button>
            </form>
          </div>

          <!-- FAQ -->
          <div v-if="activeChannel === 'faq'" class="space-y-4">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
            >
              <button
                @click="expandedFaq = expandedFaq === index ? null : index"
                class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition"
              >
                <span class="font-semibold text-left">{{ faq.question }}</span>
                <svg
                  :class="[
                    'w-5 h-5 transition-transform',
                    expandedFaq === index && 'rotate-180',
                  ]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
              <div
                v-if="expandedFaq === index"
                class="px-6 py-4 bg-gray-800/50 border-t border-gray-800"
              >
                <p class="text-gray-300">{{ faq.answer }}</p>
              </div>
            </div>
          </div>

          <!-- Tickets -->
          <div v-if="activeChannel === 'tickets'" class="space-y-4">
            <button
              @click="showCreateTicketModal = true"
              class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition mb-4"
            >
              + Create New Ticket
            </button>
            <div
              v-if="tickets.length === 0"
              class="text-center py-8 bg-gray-900 rounded-lg border border-gray-800"
            >
              <p class="text-gray-400">No open tickets</p>
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="ticket in tickets"
                :key="ticket.id"
                class="bg-gray-900 rounded-lg border border-gray-800 p-4 hover:border-red-600 transition"
              >
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h4 class="font-semibold">{{ ticket.subject }}</h4>
                    <p class="text-sm text-gray-400">Ticket #{{ ticket.id }}</p>
                  </div>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      ticket.status === 'open' &&
                        'bg-blue-600/30 text-blue-400',
                      ticket.status === 'in-progress' &&
                        'bg-yellow-600/30 text-yellow-400',
                      ticket.status === 'closed' &&
                        'bg-green-600/30 text-green-400',
                    ]"
                  >
                    {{ ticket.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-300 mb-2">{{ ticket.message }}</p>
                <p class="text-xs text-gray-500">
                  Created: {{ ticket.createdDate }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Ticket Modal -->
      <div
        v-if="showCreateTicketModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800"
        >
          <h3 class="text-xl font-semibold mb-4">Create Support Ticket</h3>
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                v-model="ticketForm.subject"
                type="text"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                v-model="ticketForm.message"
                rows="4"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600 resize-none"
              ></textarea>
            </div>
          </div>
          <div class="flex gap-3">
            <button
              @click="showCreateTicketModal = false"
              class="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              @click="submitTicket"
              class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";

const activeChannel = ref("chat");
const chatMessage = ref("");
const expandedFaq = ref(null);
const showCreateTicketModal = ref(false);

const emailForm = ref({
  subject: "",
  category: "",
  message: "",
});

const ticketForm = ref({
  subject: "",
  message: "",
});

const tickets = ref([
  {
    id: "TK-001",
    subject: "Upload failed with large file",
    message: "My 500MB beat file won't upload to the platform",
    status: "open",
    createdDate: "2024-01-15",
  },
  {
    id: "TK-002",
    subject: "License agreement question",
    message: "Can I use this beat for commercial purposes?",
    status: "in-progress",
    createdDate: "2024-01-14",
  },
]);

const faqs = ref([
  {
    question: "How do I upload a beat?",
    answer:
      "Click on 'Upload' in the navigation menu. Fill in the beat details, select a cover image, and upload your audio file. Make sure your file is in MP3 or WAV format.",
  },
  {
    question: "What are the licensing options?",
    answer:
      "We offer three license types: Personal Use (for personal projects), Commercial (for paid commercial projects), and Exclusive (for complete exclusive rights).",
  },
  {
    question: "How long does payment take to process?",
    answer:
      "Payments are processed within 24-48 hours. You can track your payments in the Wallet section under Transactions.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refunds are available within 7 days of purchase if the product is unused. Contact our support team for assistance.",
  },
  {
    question: "How do I delete a beat?",
    answer:
      "Go to 'My Beats', find the beat you want to delete, click the menu icon, and select 'Delete'. This action cannot be undone.",
  },
]);

const sendMessage = () => {
  if (chatMessage.value.trim()) {
    chatMessage.value = "";
  }
};

const submitEmailSupport = () => {
  console.log("Email support submitted:", emailForm.value);
  emailForm.value = { subject: "", category: "", message: "" };
};

const submitTicket = () => {
  if (ticketForm.value.subject && ticketForm.value.message) {
    const newTicket = {
      id: `TK-${String(tickets.value.length + 1).padStart(3, "0")}`,
      subject: ticketForm.value.subject,
      message: ticketForm.value.message,
      status: "open",
      createdDate: new Date().toISOString().split("T")[0],
    };
    tickets.value.push(newTicket);
    showCreateTicketModal.value = false;
    ticketForm.value = { subject: "", message: "" };
  }
};
</script>

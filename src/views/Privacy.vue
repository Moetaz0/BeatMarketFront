<template>
  <div class="min-h-screen bg-black text-white">
    <nav class="bg-black border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <router-link to="/" class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xl"
            >
              BM
            </div>
            <span class="text-xl font-bold text-white">BEATMARKET</span>
          </router-link>
          <router-link to="/settings" class="text-gray-400 hover:text-white">
            Back to Settings
          </router-link>
        </div>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div class="space-y-8 text-gray-300">
        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            1. Information We Collect
          </h2>
          <p class="mb-4">
            When you use BeatMarket, we collect information that you provide
            directly to us, including:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Account information (username, email, phone number)</li>
            <li>Profile information (profile picture, bio)</li>
            <li>Payment information for transactions</li>
            <li>Content you upload (beats, tracks, samples)</li>
            <li>Communication data (messages, support requests)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            2. How We Use Your Information
          </h2>
          <p class="mb-4">We use the information we collect to:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Detect, prevent, and address fraud and abuse</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            3. Information Sharing
          </h2>
          <p class="mb-4">
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Other users (only public profile information)</li>
            <li>Service providers who help operate our platform</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            4. Data Security
          </h2>
          <p>
            We take reasonable measures to protect your information from
            unauthorized access, alteration, disclosure, or destruction.
            However, no internet transmission is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
          <p class="mb-4">You have the right to:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Access and update your personal information</li>
            <li>Delete your account</li>
            <li>Object to processing of your data</li>
            <li>Request a copy of your data</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">6. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            7. Changes to This Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
            <a
              href="mailto:privacy@beatmarket.com"
              class="text-red-400 hover:text-red-300"
            >
              privacy@beatmarket.com
            </a>
          </p>
        </section>

        <div class="text-sm text-gray-500 pt-8 border-t border-gray-800">
          Last updated: January 1, 2026
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

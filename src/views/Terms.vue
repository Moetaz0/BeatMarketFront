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
      <h1 class="text-4xl font-bold mb-8">Terms of Service</h1>

      <div class="space-y-8 text-gray-300">
        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using BeatMarket, you accept and agree to be bound
            by the terms and provision of this agreement. If you do not agree to
            these Terms of Service, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            2. User Accounts
          </h2>
          <p class="mb-4">
            To use certain features of BeatMarket, you must create an account.
            You are responsible for:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
            <li>Providing accurate and complete information</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            3. Content Ownership and Rights
          </h2>
          <p class="mb-4">When you upload content to BeatMarket:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>You retain all ownership rights to your content</li>
            <li>
              You grant us a license to use, display, and distribute your
              content on the platform
            </li>
            <li>
              You represent that you have all necessary rights to the content
              you upload
            </li>
            <li>
              You agree not to upload copyrighted material without permission
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            4. Prohibited Conduct
          </h2>
          <p class="mb-4">You agree not to:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Violate any laws or regulations</li>
            <li>Infringe on others' intellectual property rights</li>
            <li>Upload malicious code or viruses</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Manipulate prices or engage in fraudulent activities</li>
            <li>Attempt to gain unauthorized access to our systems</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            5. Transactions and Payments
          </h2>
          <p class="mb-4">All transactions on BeatMarket are subject to:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Our payment processing terms</li>
            <li>Applicable fees and commissions</li>
            <li>The seller's licensing terms</li>
            <li>Local tax requirements</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            6. Intellectual Property
          </h2>
          <p>
            The BeatMarket platform, including its software, design, and content
            (excluding user-generated content), is owned by us and protected by
            copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            7. Disclaimer of Warranties
          </h2>
          <p>
            BeatMarket is provided "as is" without warranties of any kind,
            either express or implied. We do not guarantee that the service will
            be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            8. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, BeatMarket shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use of the platform.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">9. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account at any
            time for violations of these Terms of Service or for any other
            reason at our discretion.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            10. Changes to Terms
          </h2>
          <p>
            We may modify these Terms of Service at any time. Continued use of
            BeatMarket after changes constitutes acceptance of the modified
            terms.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            11. Contact Information
          </h2>
          <p>
            For questions about these Terms of Service, contact us at:
            <a
              href="mailto:legal@beatmarket.com"
              class="text-red-400 hover:text-red-300"
            >
              legal@beatmarket.com
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

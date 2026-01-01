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
      <h1 class="text-4xl font-bold mb-8">App License</h1>

      <div class="space-y-8 text-gray-300">
        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            End-User License Agreement (EULA)
          </h2>
          <p>
            This End-User License Agreement ("EULA") is a legal agreement
            between you and BeatMarket for the BeatMarket application.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            1. License Grant
          </h2>
          <p class="mb-4">
            BeatMarket grants you a personal, non-exclusive, non-transferable
            license to use the BeatMarket application on devices you own or
            control, subject to the terms of this EULA.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            2. Restrictions
          </h2>
          <p class="mb-4">You may not:</p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Reverse engineer, decompile, or disassemble the application</li>
            <li>Remove or modify any proprietary notices</li>
            <li>Use the application for any illegal purpose</li>
            <li>Rent, lease, lend, or sublicense the application</li>
            <li>Create derivative works based on the application</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">3. Ownership</h2>
          <p>
            BeatMarket and its licensors own all rights, title, and interest in
            and to the application, including all intellectual property rights.
            This EULA does not grant you any rights to trademarks or service
            marks.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            4. Updates and Modifications
          </h2>
          <p>
            BeatMarket may provide updates, patches, or modifications to the
            application. Such updates may be automatically installed without
            providing additional notice or receiving additional consent.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            5. Data Collection and Privacy
          </h2>
          <p>
            The application may collect and transmit certain data as described
            in our Privacy Policy. By using the application, you consent to such
            data collection and transmission.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">6. Termination</h2>
          <p>
            This license is effective until terminated. Your rights under this
            license will terminate automatically without notice if you fail to
            comply with any terms of this EULA. Upon termination, you must cease
            all use of the application and destroy all copies.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            7. Disclaimer of Warranties
          </h2>
          <p>
            THE APPLICATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
            BEATMARKET DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
            BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
            PARTICULAR PURPOSE.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            8. Limitation of Liability
          </h2>
          <p>
            IN NO EVENT SHALL BEATMARKET BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
            INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF THE USE
            OF OR INABILITY TO USE THE APPLICATION.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            9. Third-Party Components
          </h2>
          <p class="mb-4">
            The application may include third-party components subject to
            separate license terms:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Vue.js - MIT License</li>
            <li>Tailwind CSS - MIT License</li>
            <li>Axios - MIT License</li>
            <li>And other open-source components</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            10. Governing Law
          </h2>
          <p>
            This EULA is governed by and construed in accordance with the laws
            of the jurisdiction in which BeatMarket operates, without regard to
            its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-white mb-4">
            11. Contact Information
          </h2>
          <p>
            If you have any questions about this EULA, please contact us at:
            <a
              href="mailto:legal@beatmarket.com"
              class="text-red-400 hover:text-red-300"
            >
              legal@beatmarket.com
            </a>
          </p>
        </section>

        <div class="bg-gray-900 rounded-lg p-6 mt-8">
          <h3 class="text-lg font-semibold mb-2">Open Source Licenses</h3>
          <p class="text-sm mb-4">
            BeatMarket uses the following open-source software. We are grateful
            to the open-source community:
          </p>
          <div class="space-y-2 text-sm">
            <div>
              <span class="text-white font-medium">Vue.js</span> -
              <span class="text-gray-400">MIT License © Evan You</span>
            </div>
            <div>
              <span class="text-white font-medium">Tailwind CSS</span> -
              <span class="text-gray-400">MIT License © Tailwind Labs</span>
            </div>
            <div>
              <span class="text-white font-medium">Axios</span> -
              <span class="text-gray-400">MIT License © Matt Zabriskie</span>
            </div>
          </div>
        </div>

        <div class="text-sm text-gray-500 pt-8 border-t border-gray-800">
          Last updated: January 1, 2026<br />
          Version 1.0.0
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

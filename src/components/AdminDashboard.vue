<template>
  <div
    class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white"
  >
    <Navbar />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header with Gradient -->
      <div
        class="mb-12 bg-gradient-to-r from-red-600/10 to-red-600/5 rounded-2xl p-8 border border-red-600/20 backdrop-blur-sm"
      >
        <div class="flex items-center gap-4 mb-2">
          <div
            class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/50"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div>
            <h1
              class="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
            >
              Admin Dashboard
            </h1>
          </div>
        </div>
        <p class="text-gray-300 ml-16">
          Welcome back! Monitor your platform's performance and manage
          administrative access.
        </p>
      </div>

      <!-- Stats Overview with Enhanced Design -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <!-- Total Users Card -->
        <div
          class="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20"
        >
          <div
            class="absolute top-3 right-3 w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors"
          >
            <svg
              class="w-5 h-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              ></path>
            </svg>
          </div>
          <p
            class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
          >
            Total Users
          </p>
          <p class="text-4xl font-bold text-white mb-2">
            {{ stats.users?.total ?? 0 }}
          </p>
          <p class="text-xs text-blue-400 font-medium">
            <span class="text-green-400">{{ stats.users?.verified ?? 0 }}</span>
            verified
          </p>
        </div>

        <!-- Total Beats Card -->
        <div
          class="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-yellow-500/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/20"
        >
          <div
            class="absolute top-3 right-3 w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-600/30 transition-colors"
          >
            <svg
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 1 1 0 000 2H3a3 3 0 000 6h10a3 3 0 000-6h3a1 1 0 000-2 2 2 0 00-2 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
              ></path>
            </svg>
          </div>
          <p
            class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
          >
            Total Beats
          </p>
          <p class="text-4xl font-bold text-yellow-400 mb-2">
            {{ stats.beats?.total ?? 0 }}
          </p>
          <p class="text-xs text-gray-500">Music library</p>
        </div>

        <!-- Orders Card -->
        <div
          class="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-purple-500/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20"
        >
          <div
            class="absolute top-3 right-3 w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600/30 transition-colors"
          >
            <svg
              class="w-5 h-5 text-purple-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM5 16a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <p
            class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
          >
            Orders
          </p>
          <p class="text-4xl font-bold text-purple-400 mb-2">
            {{ stats.orders?.completed ?? 0 }}
          </p>
          <p class="text-xs text-purple-400/60">
            {{ stats.orders?.pending ?? 0 }} pending
          </p>
        </div>

        <!-- Revenue Card -->
        <div
          class="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-green-500/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20"
        >
          <div
            class="absolute top-3 right-3 w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center group-hover:bg-green-600/30 transition-colors"
          >
            <svg
              class="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              ></path>
            </svg>
          </div>
          <p
            class="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2"
          >
            Total Revenue
          </p>
          <p class="text-4xl font-bold text-green-400 mb-2">
            ${{ (stats.revenue?.total ?? 0).toFixed(2) }}
          </p>
          <p class="text-xs text-green-400/60">Platform earnings</p>
        </div>
      </div>

      <!-- Navigation Tabs with Modern Design -->
      <div class="mb-8">
        <div
          class="flex gap-2 bg-gray-800/30 rounded-xl p-1 w-fit border border-gray-700/50"
        >
          <button
            @click="activeTab = 'users'"
            :class="[
              'px-6 py-3 font-semibold text-sm transition-all duration-300 rounded-lg',
              activeTab === 'users'
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/50'
                : 'text-gray-400 hover:text-white',
            ]"
          >
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v-2c0-.331.067-.654.177-.964a4 4 0 018.646 0v2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a5 5 0 00-10 0v2a1 1 0 11-2 0v-2a7 7 0 0114 0v2a1 1 0 11-2 0z"
                ></path>
              </svg>
              User Statistics
            </span>
          </button>
          <button
            @click="activeTab = 'admins'"
            :class="[
              'px-6 py-3 font-semibold text-sm transition-all duration-300 rounded-lg',
              activeTab === 'admins'
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/50'
                : 'text-gray-400 hover:text-white',
            ]"
          >
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293zM9 11a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0zM9 15a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
              Admin Accounts
            </span>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="inline-flex items-center justify-center">
            <div
              class="w-12 h-12 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin"
            ></div>
          </div>
          <p class="text-gray-400 mt-4 font-medium">Loading dashboard...</p>
        </div>
      </div>

      <!-- User Statistics Tab -->
      <div v-if="activeTab === 'users' && !loading">
        <div class="mb-8">
          <h2
            class="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
          >
            User Statistics
          </h2>
          <p class="text-gray-400 text-sm">
            Overview of your user base and verification status
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Users Overview Chart -->
          <div
            class="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-8 backdrop-blur-sm hover:border-gray-600/50 transition-colors"
          >
            <h3 class="text-xl font-semibold mb-6 flex items-center gap-2">
              <div
                class="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9 11a3 3 0 110-6 3 3 0 010 6zM17 16a4 4 0 01-8 0v-1a6 6 0 0112 0v1z"
                  ></path>
                </svg>
              </div>
              Users Overview
            </h3>
            <div class="flex justify-around items-center">
              <div class="text-center py-6">
                <div class="text-6xl font-bold text-blue-400">
                  {{ userStats.totalUsers || 0 }}
                </div>
                <p class="text-gray-400 text-sm mt-3 font-medium">
                  Total Users
                </p>
              </div>
              <div class="border-l border-gray-700 h-20"></div>
              <div class="flex flex-col gap-6">
                <div class="text-center">
                  <div class="text-4xl font-bold text-green-400">
                    {{ userStats.verified || 0 }}
                  </div>
                  <p class="text-gray-400 text-xs mt-2 font-medium">Verified</p>
                </div>
                <div class="text-center">
                  <div class="text-4xl font-bold text-yellow-400">
                    {{ userStats.unverified || 0 }}
                  </div>
                  <p class="text-gray-400 text-xs mt-2 font-medium">
                    Unverified
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Monthly Signups Chart -->
          <div
            class="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-8 backdrop-blur-sm hover:border-gray-600/50 transition-colors"
          >
            <h3 class="text-xl font-semibold mb-8 flex items-center gap-2">
              <div
                class="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
              </div>
              New Users This Month
            </h3>

            <!-- Main Stats Row -->
            <div class="flex flex-col items-center gap-8">
              <!-- Circular Chart -->
              <div class="flex flex-col items-center">
                <div
                  class="relative w-48 h-48 flex items-center justify-center"
                >
                  <!-- Outer Circle -->
                  <svg
                    class="absolute w-full h-full transform -rotate-90"
                    viewBox="0 0 200 200"
                  >
                    <!-- Background Circle -->
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#374151"
                      stroke-width="12"
                    />
                    <!-- Progress Circle -->
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#gradientRed)"
                      stroke-width="12"
                      stroke-linecap="round"
                      stroke-dasharray="251.2"
                      stroke-dashoffset="0"
                      style="animation: fillProgress 2s ease-out forwards"
                    />
                    <defs>
                      <linearGradient
                        id="gradientRed"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color: #dc2626; stop-opacity: 1"
                        />
                        <stop
                          offset="100%"
                          style="stop-color: #ef4444; stop-opacity: 1"
                        />
                      </linearGradient>
                    </defs>
                  </svg>

                  <!-- Center Content -->
                  <div class="text-center z-10">
                    <div
                      class="text-5xl font-bold text-transparent bg-gradient-to-r from-red-400 to-red-300 bg-clip-text mb-1"
                    >
                      {{ userStats.thisMonthUsers || 0 }}
                    </div>
                    <p class="text-gray-400 text-sm font-medium">New Signups</p>
                  </div>
                </div>
              </div>

              <!-- Stats Details -->
              <div class="grid grid-cols-2 gap-4 w-full">
                <div
                  class="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-700/50"
                >
                  <p class="text-gray-400 text-xs font-medium mb-2">
                    Daily Avg
                  </p>
                  <p class="text-2xl font-bold text-blue-400">
                    {{
                      userStats.totalUsers > 0
                        ? Math.ceil((userStats.thisMonthUsers || 0) / 30)
                        : 0
                    }}
                  </p>
                </div>
                <div
                  class="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-700/50"
                >
                  <p class="text-gray-400 text-xs font-medium mb-2">
                    Conversion
                  </p>
                  <p class="text-2xl font-bold text-green-400">
                    {{
                      userStats.totalUsers > 0
                        ? (
                            (userStats.thisMonthUsers / userStats.totalUsers) *
                            100
                          ).toFixed(1)
                        : 0
                    }}%
                  </p>
                </div>
              </div>

              <!-- Growth Indicator -->
              <div
                class="w-full bg-gray-900/50 rounded-lg p-4 border border-gray-700/50"
              >
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm font-medium text-gray-300"
                    >Monthly Growth</span
                  >
                  <span
                    class="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full font-semibold"
                    >↑ Positive</span
                  >
                </div>
                <div class="w-full bg-gray-800 rounded-full h-2">
                  <div
                    class="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                    :style="{
                      width:
                        userStats.totalUsers > 0
                          ? Math.min(
                              (userStats.thisMonthUsers /
                                userStats.totalUsers) *
                                100,
                              100
                            ) + '%'
                          : '0%',
                    }"
                  ></div>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  Percentage of total users gained this month
                </p>
              </div>
            </div>
          </div>

          <!-- Verification Status -->
          <div
            class="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 p-8 backdrop-blur-sm hover:border-gray-600/50 transition-colors lg:col-span-2"
          >
            <h3 class="text-xl font-semibold mb-8 flex items-center gap-2">
              <div
                class="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.756a3.066 3.066 0 01-3.062 3.062H7.041a3.066 3.066 0 01-3.062-3.062V6.517a3.066 3.066 0 012.812-3.062zM9 13a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 11-2 0 1 1 0 012 0zm-5-4a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </div>
              Verification Status Breakdown
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-gray-300 font-semibold"
                      >Verified Users</span
                    >
                    <span class="text-green-400 font-bold text-lg">{{
                      userStats.verified || 0
                    }}</span>
                  </div>
                  <div
                    class="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden"
                  >
                    <div
                      class="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500"
                      :style="{
                        width:
                          userStats.totalUsers > 0
                            ? (userStats.verified / userStats.totalUsers) *
                                100 +
                              '%'
                            : '0%',
                      }"
                    ></div>
                  </div>
                  <p class="text-sm text-green-400/70 mt-2 font-medium">
                    {{
                      userStats.totalUsers > 0
                        ? Math.round(
                            (userStats.verified / userStats.totalUsers) * 100
                          )
                        : 0
                    }}% of users verified
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-gray-300 font-semibold"
                      >Unverified Users</span
                    >
                    <span class="text-yellow-400 font-bold text-lg">{{
                      userStats.unverified || 0
                    }}</span>
                  </div>
                  <div
                    class="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden"
                  >
                    <div
                      class="bg-gradient-to-r from-yellow-500 to-yellow-400 h-3 rounded-full transition-all duration-500"
                      :style="{
                        width:
                          userStats.totalUsers > 0
                            ? (userStats.unverified / userStats.totalUsers) *
                                100 +
                              '%'
                            : '0%',
                      }"
                    ></div>
                  </div>
                  <p class="text-sm text-yellow-400/70 mt-2 font-medium">
                    {{
                      userStats.totalUsers > 0
                        ? Math.round(
                            (userStats.unverified / userStats.totalUsers) * 100
                          )
                        : 0
                    }}% pending verification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Accounts Tab -->
      <div v-if="activeTab === 'admins' && !loading">
        <div class="mb-8 flex justify-between items-start">
          <div>
            <h2
              class="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
            >
              Admin Accounts
            </h2>
            <p class="text-gray-400 text-sm">
              Manage administrators and their access permissions
            </p>
          </div>
          <button
            @click="showCreateAdminModal = true"
            class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-red-600/50 hover:shadow-red-600/70 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V9.5m-11-4h6m-6 4h6m-6 4h6m4.5-13v6m3-3h-6"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
              />
              <path
                d="M15 1.5v6m3-3h-6"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
              />
            </svg>
            Create Admin
          </button>
        </div>

        <div
          v-if="admins.length === 0"
          class="text-center py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/50 backdrop-blur-sm"
        >
          <div
            class="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v-2c0-.331.067-.654.177-.964a4 4 0 018.646 0v2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a5 5 0 00-10 0v2a1 1 0 11-2 0v-2a7 7 0 0114 0v2a1 1 0 11-2 0z"
              ></path>
            </svg>
          </div>
          <p class="text-gray-400 font-medium text-lg">No admins found</p>
          <p class="text-gray-500 text-sm mt-2">
            Create your first admin account to get started
          </p>
        </div>

        <div v-else>
          <!-- Admin Table -->
          <div
            class="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 overflow-hidden backdrop-blur-sm"
          >
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-700/50">
                    <th
                      class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400"
                    >
                      Username
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400"
                    >
                      Email
                    </th>
                    <th
                      class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-400"
                    >
                      Status
                    </th>
                    <th
                      class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400"
                    >
                      Joined
                    </th>
                    <th
                      class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-700/30">
                  <tr
                    v-for="admin in admins"
                    :key="admin.id"
                    class="hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <!-- Username Column -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-red-600/30 flex-shrink-0"
                        >
                          {{ admin.username?.charAt(0).toUpperCase() || "A" }}
                        </div>
                        <div>
                          <p class="font-semibold text-white">
                            {{ admin.username }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <!-- Email Column -->
                    <td class="px-6 py-4">
                      <p class="text-sm text-gray-300 truncate">
                        {{ admin.email }}
                      </p>
                    </td>

                    <!-- Status Column -->
                    <td class="px-6 py-4 text-center">
                      <span
                        :class="[
                          'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold',
                          admin.isVerified
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-yellow-600/20 text-yellow-400',
                        ]"
                      >
                        <svg
                          class="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        {{ admin.isVerified ? "Verified" : "Pending" }}
                      </span>
                    </td>

                    <!-- Joined Date Column -->
                    <td class="px-6 py-4">
                      <p class="text-sm text-gray-400">
                        {{ formatDate(admin.createdAt) }}
                      </p>
                    </td>

                    <!-- Action Column -->
                    <td class="px-6 py-4 text-center">
                      <button
                        v-if="admin.id !== currentUserId"
                        @click="deleteAdmin(admin.id)"
                        class="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 rounded-lg text-xs font-medium transition-all duration-300"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Delete
                      </button>
                      <span
                        v-else
                        class="inline-flex items-center gap-1 px-3 py-1 text-xs text-yellow-400 bg-yellow-600/20 rounded-lg font-medium"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          ></path>
                        </svg>
                        You
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="pagination.totalPages > 1"
            class="flex items-center justify-between mt-6"
          >
            <p class="text-sm text-gray-400">
              Showing <span class="font-semibold">{{ admins.length }}</span> of
              <span class="font-semibold">{{ pagination.total }}</span> admins
            </p>
            <div class="flex gap-2">
              <button
                @click="loadAdmins(pagination.page - 1)"
                :disabled="pagination.page === 1"
                class="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                ← Previous
              </button>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-400">
                  Page
                  <span class="font-semibold text-white">{{
                    pagination.page
                  }}</span>
                  of
                  <span class="font-semibold text-white">{{
                    pagination.totalPages
                  }}</span>
                </span>
              </div>
              <button
                @click="loadAdmins(pagination.page + 1)"
                :disabled="pagination.page === pagination.totalPages"
                class="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Admin Modal -->
      <div
        v-if="showCreateAdminModal"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl p-8 max-w-md w-full border border-gray-700/50 shadow-2xl shadow-black/50"
        >
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold">Create Admin</h3>
          </div>

          <p class="text-gray-400 text-sm mb-6">
            Create a new admin account. A password will be auto-generated and
            sent via email.
          </p>

          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2"
                >Email Address</label
              >
              <input
                v-model="adminForm.email"
                type="email"
                placeholder="admin@example.com"
                class="w-full bg-gray-900/50 border border-gray-700 hover:border-gray-600 focus:border-red-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2"
                >Full Name</label
              >
              <input
                v-model="adminForm.fullName"
                type="text"
                placeholder="John Doe"
                class="w-full bg-gray-900/50 border border-gray-700 hover:border-gray-600 focus:border-red-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-colors focus:outline-none"
              />
            </div>
          </div>

          <div
            class="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3 mb-6"
          >
            <p class="text-xs text-blue-300 flex items-start gap-2">
              <svg
                class="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                >A secure password will be generated and sent to the email
                address with login instructions.</span
              >
            </p>
          </div>

          <div class="flex gap-3">
            <button
              @click="showCreateAdminModal = false"
              class="flex-1 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition-all duration-300 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              @click="submitAdmin"
              class="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg font-semibold transition-all duration-300 text-white shadow-lg shadow-red-600/50 hover:shadow-red-600/70"
            >
              Create Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import adminService from "@/services/adminService";
import SuccessToast from "@/components/SuccessToast.vue";
import ErrorToast from "@/components/ErrorToast.vue";

const activeTab = ref("stats");
const loading = ref(false);
const showCreateAdminModal = ref(false);

const stats = ref({
  users: {
    total: 0,
    verified: 0,
  },
  beats: {
    total: 0,
  },
  orders: {
    completed: 0,
    pending: 0,
  },
  revenue: {
    total: 0,
  },
});

const userStats = ref({
  ROLE_ADMIN: { total: 0, verified: 0, unverified: 0 },
  ROLE_USER: { total: 0, verified: 0, unverified: 0 },
});

const admins = ref([]);
const currentUserId = ref(null);
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
});

const adminForm = ref({
  email: "",
  fullName: "",
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const loadStats = async () => {
  try {
    const response = await adminService.getDashboardStats();
    console.log("Stats response:", response.data);

    // Handle both response formats
    if (response.data.success && response.data.data) {
      // New format with success wrapper
      stats.value = {
        users: {
          total: response.data.data.users || 0,
          verified: 0,
        },
        beats: {
          total: response.data.data.beats || 0,
        },
        orders: {
          completed: response.data.data.orders || 0,
          pending: 0,
        },
        revenue: {
          total: response.data.data.totalRevenue || 0,
        },
      };
    } else if (response.data.users !== undefined) {
      // Direct format from PHP
      stats.value = {
        users: {
          total: response.data.users || 0,
          verified: 0,
        },
        beats: {
          total: response.data.beats || 0,
        },
        orders: {
          completed: response.data.orders || 0,
          pending: 0,
        },
        revenue: {
          total: response.data.totalRevenue || 0,
        },
      };
    }
  } catch (error) {
    console.error("Error loading stats:", error);
    console.error("Error details:", error.response?.data);
    // Set default stats on error
    stats.value = {
      users: { total: 0, verified: 0 },
      beats: { total: 0 },
      orders: { completed: 0, pending: 0 },
      revenue: { total: 0 },
    };
  }
};

const loadUserStatistics = async () => {
  try {
    const response = await adminService.getUserStatistics();
    // Handle direct response from PHP (no success wrapper)
    if (response.data) {
      userStats.value = response.data;
    }
  } catch (error) {
    console.error("Error loading user statistics:", error);
  }
};

const loadAdmins = async (page = 1) => {
  loading.value = true;
  try {
    const response = await adminService.getAdmins(page, pagination.value.limit);
    // Handle response with pagination data
    if (response.data && response.data.admins) {
      admins.value = response.data.admins;
      if (response.data.pagination) {
        pagination.value = response.data.pagination;
      }
    }
  } catch (error) {
    console.error("Error loading admins:", error);
  } finally {
    loading.value = false;
  }
};

const submitAdmin = async () => {
  if (!adminForm.value.email || !adminForm.value.fullName) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    const response = await adminService.createAdmin(adminForm.value);
    if (response.data.message || response.data.admin) {
      showCreateAdminModal.value = false;
      adminForm.value = {
        email: "",
        fullName: "",
      };
      await loadAdmins();
      alert(
        "Admin account created successfully! Welcome email sent with login credentials."
      );
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    const errorMessage =
      error.response?.data?.error || "Failed to create admin";
    alert(errorMessage);
  }
};

const deleteAdmin = async (id) => {
  if (!confirm("Are you sure you want to delete this admin?")) {
    return;
  }

  try {
    const response = await adminService.deleteAdmin(id);
    if (response.data.success) {
      await loadAdmins();
    }
  } catch (error) {
    console.error("Error deleting admin:", error);
    alert("Failed to delete admin");
  }
};

onMounted(async () => {
  // Get current user ID from localStorage
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      const user = JSON.parse(userString);
      currentUserId.value = user.id;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
    }
  }

  loading.value = true;
  await loadStats();
  await loadUserStatistics();
  await loadAdmins();
  loading.value = false;
});
</script>
<style scoped>
@keyframes fillProgress {
  from {
    stroke-dashoffset: 251.2;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>

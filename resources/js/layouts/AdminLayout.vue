<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Top Bar -->
    <header class="bg-white shadow-sm sticky top-0 z-30">
      <div class="px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <button @click="sidebarOpen = !sidebarOpen" class="md:hidden text-gray-600">
            <i class="fas fa-bars text-xl"></i>
          </button>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <i class="fas fa-shield-alt text-white"></i>
            </div>
            <span class="font-bold text-xl text-gray-800">Admin Panel</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <button @click="notificationsOpen = !notificationsOpen" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative">
              <i class="fas fa-bell text-gray-600"></i>
              <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{{ unreadCount }}</span>
            </button>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div class="hidden md:block">
              <p class="text-sm font-bold">Admin Global</p>
              <p class="text-xs text-gray-500">Super Administrateur</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside :class="['fixed md:relative z-40 w-64 h-full bg-white shadow-lg transition-transform', sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
        <nav class="p-4 space-y-1">
          <slot name="navigation" />
        </nav>
      </aside>

      <!-- Overlay mobile -->
      <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="sidebarOpen = false"></div>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sidebarOpen = ref(false);
const notificationsOpen = ref(false);
const unreadCount = ref(3);
</script>
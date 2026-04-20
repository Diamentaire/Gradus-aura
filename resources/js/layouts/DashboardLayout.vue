<template>
  <div :class="['flex h-screen', isDarkMode ? 'dark' : '']">
    <!-- Sidebar -->
    <aside :class="['fixed md:relative z-40 w-64 h-full transition-transform duration-300 flex flex-col shrink-0', isDarkMode ? 'bg-gray-900' : 'bg-white', sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
      <!-- Logo -->
      <div class="p-6 border-b" :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center">
            <i class="fas fa-graduation-cap text-white"></i>
          </div>
          <span class="font-bold text-xl" :class="isDarkMode ? 'text-white' : 'text-gray-800'">Gradus Aura</span>
        </div>
      </div>
      
      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-4 space-y-1">
        <slot name="navigation" />
      </nav>
      
      <!-- Footer Sidebar -->
      <div class="p-4 border-t" :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">
        <button @click="logout" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition">
          <i class="fas fa-sign-out-alt"></i>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-50'">
      <header class="sticky top-0 z-10 bg-white border-b px-8 py-4 flex justify-between items-center">
        <button @click="sidebarOpen = !sidebarOpen" class="md:hidden text-gray-600">
          <i class="fas fa-bars text-xl"></i>
        </button>
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold">
            {{ userInitials }}
          </div>
        </div>
      </header>
      <div class="p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const sidebarOpen = ref(false);
const isDarkMode = ref(false);
const userInitials = computed(() => {
  const user = localStorage.getItem('gradus_user');
  if (user) {
    const name = JSON.parse(user).fullname;
    return name.charAt(0).toUpperCase();
  }
  return 'U';
});

const logout = () => {
  localStorage.removeItem('gradus_user');
  localStorage.removeItem('gradus_token');
  router.push('/login');
};
</script>
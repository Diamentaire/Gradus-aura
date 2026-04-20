<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900">
    <div class="container mx-auto px-5 py-8">
      <div class="flex justify-center mb-8">
        <router-link to="/" class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <i class="fas fa-graduation-cap text-white text-xl"></i>
          </div>
          <span class="text-2xl font-bold text-white tracking-tighter">Gradus Aura</span>
        </router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>
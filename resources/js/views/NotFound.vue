<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div class="text-center">
      <div class="text-9xl font-bold text-primary mb-4">404</div>
      <h1 class="text-2xl font-bold text-slate-950 mb-2">Page non trouvée</h1>
      <p class="text-gray-500 mb-6">La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <button @click="$router.push('/formateur')" class="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition">
        <i class="fas fa-home mr-2"></i> Retour au dashboard
      </button>
    </div>
  </div>
</template>
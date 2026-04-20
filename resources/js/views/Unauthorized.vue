<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-8">
    <div class="text-center">
      <div class="text-9xl font-bold text-red-500 mb-4">403</div>
      <h1 class="text-2xl font-bold text-slate-950 mb-2">Accès non autorisé</h1>
      <p class="text-gray-500 mb-6">Vous n'avez pas les droits nécessaires pour accéder à cette page.</p>
      <button @click="$router.push('/formateur')" class="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition">
        <i class="fas fa-home mr-2"></i> Retour au dashboard
      </button>
    </div>
  </div>
</template>
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
    <div class="container mx-auto px-5 max-w-4xl">
      <!-- Carte de confirmation -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <!-- En-tête -->
        <div class="gradient-bg px-8 py-12 text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
            <i class="fas fa-check-circle text-white text-4xl"></i>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Inscription confirmée !</h1>
          <p class="text-indigo-100">Votre pré-inscription a été enregistrée avec succès</p>
        </div>

        <!-- Contenu -->
        <div class="p-8">
          <!-- Message de bienvenue -->
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800">Félicitations {{ inscriptionData.fullname || 'cher étudiant' }} !</h2>
            <p class="text-gray-600 mt-2">Vous êtes désormais pré-inscrit(e) à la formation</p>
            <p class="text-primary font-bold text-xl mt-1">{{ formation.titre }}</p>
          </div>

          <!-- Récapitulatif -->
          <div class="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 class="font-bold text-lg mb-4">📋 Récapitulatif de votre inscription</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div><span class="text-gray-500">Numéro de dossier :</span><p class="font-semibold">{{ dossierNumber }}</p></div>
              <div><span class="text-gray-500">Date d'inscription :</span><p class="font-semibold">{{ new Date().toLocaleDateString() }}</p></div>
              <div><span class="text-gray-500">Formation :</span><p class="font-semibold">{{ formation.titre }}</p></div>
              <div><span class="text-gray-500">Établissement :</span><p class="font-semibold">{{ formation.etablissement }}</p></div>
              <div><span class="text-gray-500">Mode d'enseignement :</span><p class="font-semibold">{{ formation.mode }}</p></div>
              <div><span class="text-gray-500">Durée :</span><p class="font-semibold">{{ formation.duree }}</p></div>
            </div>
          </div>

          <!-- Paiement -->
          <div class="bg-indigo-50 rounded-2xl p-6 mb-8">
            <h3 class="font-bold text-lg mb-4">💰 Informations de paiement</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div><span class="text-gray-500">Montant total :</span><p class="font-bold text-primary text-xl">{{ formation.prix.toLocaleString() }} FCFA</p></div>
              <div><span class="text-gray-500">Mode de paiement :</span><p class="font-semibold">{{ paymentData.method }}</p></div>
              <div><span class="text-gray-500">Statut :</span><p class="text-green-600 font-semibold">En attente de validation</p></div>
              <div><span class="text-gray-500">Référence transaction :</span><p class="font-semibold">{{ transactionRef }}</p></div>
            </div>
            <div class="mt-4 p-3 bg-yellow-50 rounded-xl">
              <p class="text-sm text-yellow-700"><i class="fas fa-info-circle mr-2"></i> Vous recevrez un email de confirmation sous 48h après validation de votre paiement.</p>
            </div>
          </div>

          <!-- Prochaines étapes -->
          <div class="mb-8">
            <h3 class="font-bold text-lg mb-4">📌 Prochaines étapes</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">1</div><span>Validez votre paiement via {{ paymentData.method }}</span></div>
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">2</div><span>Envoyez vos documents par email à admissions@gradusaura.com</span></div>
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">3</div><span>Un conseiller vous contactera sous 48h pour finaliser votre inscription</span></div>
            </div>
          </div>

      <!-- Boutons d'action -->
          <div class="flex flex-wrap gap-4 justify-center">
            <router-link to="/dashboard" class="px-8 py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg transition">
              <i class="fas fa-tachometer-alt mr-2"></i> Accéder à mon tableau de bord
            </router-link>
            <router-link to="/formations" class="px-8 py-3 border border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition">
              <i class="fas fa-search mr-2"></i> Découvrir d'autres formations
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Récupération des données
const formation = ref({
  titre: route.query.titre || 'Master en Administration des Affaires',
  etablissement: 'Université de Douala',
  mode: 'Distanciel',
  duree: '2 ans',
  prix: parseInt(route.query.prix) || 250000
});

const inscriptionData = ref({
  fullname: route.query.fullname || 'Jean Dupont',
  email: route.query.email || 'jean@example.com'
});

const paymentData = ref({
  method: route.query.method || 'Orange Money'
});

// Génération des références
const dossierNumber = ref('DOS-' + Date.now() + '-' + Math.floor(Math.random() * 1000));
const transactionRef = ref('TRX-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase());
</script>

<style scoped>
.gradient-bg { background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%); }
</style>
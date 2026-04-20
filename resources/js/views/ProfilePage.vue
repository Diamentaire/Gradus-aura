<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <!-- En-tête du profil avec bannière -->
      <div class="relative mb-8">
        <!-- Bannière de couverture -->
        <div class="relative h-32 sm:h-40 md:h-48 lg:h-56 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=1200&h=300&fit=crop" 
            alt="Couverture profil" 
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <!-- Photo de profil -->
        <div class="absolute -bottom-10 left-4 sm:left-6 md:left-8">
          <div class="relative">
            <div class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span class="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                {{ userInitials }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations principales -->
      <div class="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mt-12 sm:mt-14 md:mt-16">
        <!-- En-tête des infos -->
        <div class="p-4 sm:p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 to-cyan-50/50">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 class="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 tracking-tighter">
                {{ userFullname }}
              </h1>
              <div class="flex items-center gap-2 mt-1">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] sm:text-xs font-bold">
                  <i class="fas fa-check-circle text-[8px] sm:text-[10px]"></i>
                  Compte vérifié
                </span>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] sm:text-xs font-bold">
                  <i class="fas fa-graduation-cap text-[8px] sm:text-[10px]"></i>
                  {{ userRole }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Grille des informations -->
        <div class="p-4 sm:p-6 md:p-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <!-- Informations personnelles -->
            <div class="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-user text-primary text-sm"></i>
                </div>
                <h3 class="font-bold text-slate-950 text-sm">Informations personnelles</h3>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nom complet</p>
                  <p class="text-sm sm:text-base font-semibold text-slate-800">{{ userFullname || 'Non renseigné' }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                  <p class="text-sm sm:text-base text-slate-600">{{ userEmail || 'Non renseigné' }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Téléphone</p>
                  <p class="text-sm sm:text-base text-slate-600">{{ userPhone || 'Non renseigné' }}</p>
                </div>
              </div>
            </div>

            <!-- Localisation -->
            <div class="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-map-marker-alt text-cyan-600 text-sm"></i>
                </div>
                <h3 class="font-bold text-slate-950 text-sm">Localisation</h3>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ville</p>
                  <p class="text-sm sm:text-base text-slate-600">{{ userCity || 'Yaoundé' }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pays</p>
                  <p class="text-sm sm:text-base text-slate-600">{{ userCountry || 'Cameroun' }}</p>
                </div>
              </div>
            </div>

            <!-- Parcours académique -->
            <div class="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-graduation-cap text-emerald-600 text-sm"></i>
                </div>
                <h3 class="font-bold text-slate-950 text-sm">Parcours académique</h3>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Niveau d'étude</p>
                  <p class="text-sm sm:text-base text-slate-600">{{ userLevel || 'Non renseigné' }}</p>
                </div>
              </div>
            </div>

            <!-- Concours visés -->
            <div class="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-trophy text-purple-600 text-sm"></i>
                </div>
                <h3 class="font-bold text-slate-950 text-sm">Objectifs</h3>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Concours visé</p>
                  <p class="text-sm sm:text-base text-slate-600">{{ userTargetConcours || 'Non renseigné' }}</p>
                </div>
              </div>
            </div>

            <!-- Statistiques -->
            <div class="bg-slate-50 rounded-xl p-4 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-chart-line text-orange-600 text-sm"></i>
                </div>
                <h3 class="font-bold text-slate-950 text-sm">Statistiques</h3>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Membre depuis</p>
                  <p class="text-sm sm:text-base text-slate-600">{{ userMemberSince }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Récupération des données utilisateur depuis le store
const user = computed(() => store.getters.user);

// Extraction des différentes informations
const userFullname = computed(() => user.value?.fullname || user.value?.name || 'Utilisateur');
const userEmail = computed(() => user.value?.email || '');
const userPhone = computed(() => user.value?.phone || 'Non renseigné');
const userLevel = computed(() => user.value?.level || 'Non renseigné');
const userTargetConcours = computed(() => user.value?.targetConcours || 'Non renseigné');
const userCity = computed(() => user.value?.city || 'Yaoundé');
const userCountry = computed(() => user.value?.country || 'Cameroun');
const userMemberSince = computed(() => {
  if (user.value?.memberSince) return user.value.memberSince;
  if (user.value?.createdAt) return new Date(user.value.createdAt).toLocaleDateString();
  return new Date().toLocaleDateString();
});

// Initiales pour l'avatar
const userInitials = computed(() => {
  const name = userFullname.value;
  return name.charAt(0).toUpperCase();
});

// Rôle de l'utilisateur
const userRole = computed(() => {
  const role = user.value?.role;
  if (role === 'admin') return 'Administrateur';
  if (role === 'formateur') return 'Formateur';
  return 'Élève';
});

// Vérification et chargement des données au montage
onMounted(() => {
  // Si le store n'a pas de données, essayer de récupérer depuis localStorage
  if (!user.value) {
    const storedUser = localStorage.getItem('gradus_user');
    if (storedUser) {
      store.commit('setUser', JSON.parse(storedUser));
    }
  }
});
</script>

<style scoped>
.text-primary {
  color: #4F46E5;
}

.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}
</style>
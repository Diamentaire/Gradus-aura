<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
    <!-- Hero Section avec animation et image -->
    <section class="relative overflow-hidden bg-gradient-to-r from-orange-700 via-red-700 to-rose-700 py-20">
      <div class="absolute inset-0 opacity-15">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
      </div>
      
      <div class="absolute inset-0">
        <div class="particles">
          <div v-for="i in 20" :key="i" class="particle" :style="{ left: Math.random() * 100 + '%', animationDelay: Math.random() * 5 + 's' }"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <i class="fas fa-chart-line text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Suivi personnalisé</span>
        </div>
        
        <div class="animate-fadeInUp">
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Suivi de candidature</h1>
          <p class="text-indigo-100 text-xl max-w-2xl mx-auto">
            Suivez l'avancement de vos dossiers de candidature
          </p>
        </div>
        
        <div class="absolute bottom-0 left-0 right-0">
          <svg class="w-full h-12 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-5 py-12">
      <!-- Cartes statistiques en haut -->
      <div class="grid md:grid-cols-4 gap-4 mb-8">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 text-center text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div class="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
            <i class="fas fa-clock text-xl"></i>
          </div>
          <p class="text-2xl font-bold">{{ candidatures.filter(c => c.statut === 'en_attente').length }}</p>
          <p class="text-sm opacity-90">En attente</p>
        </div>
        <div class="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-4 text-center text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div class="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
            <i class="fas fa-spinner text-xl"></i>
          </div>
          <p class="text-2xl font-bold">{{ candidatures.filter(c => c.statut === 'en_cours').length }}</p>
          <p class="text-sm opacity-90">En cours</p>
        </div>
        <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-center text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div class="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
            <i class="fas fa-check-circle text-xl"></i>
          </div>
          <p class="text-2xl font-bold">{{ candidatures.filter(c => c.statut === 'acceptee').length }}</p>
          <p class="text-sm opacity-90">Acceptée</p>
        </div>
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-center text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div class="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2">
            <i class="fas fa-file-alt text-xl"></i>
          </div>
          <p class="text-2xl font-bold">{{ candidatures.length }}</p>
          <p class="text-sm opacity-90">Total dossiers</p>
        </div>
      </div>

      <!-- Aucune candidature -->
      <div v-if="candidatures.length === 0" class="text-center py-16">
        <div class="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
          <i class="fas fa-folder-open text-gray-400 text-5xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Aucune candidature</h3>
        <p class="text-gray-500 mb-6">Vous n'avez pas encore soumis de dossier de candidature.</p>
        <router-link to="/mobilite/dossier" class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition transform hover:scale-105">
          <i class="fas fa-plus-circle"></i> Créer mon dossier
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>

      <!-- Liste des candidatures - Chaque carte est une section indépendante -->
      <div v-else class="grid lg:grid-cols-2 gap-6">
        <div v-for="(candidature, index) in candidatures" :key="candidature.id" class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeInUp" :style="{ animationDelay: index * 0.1 + 's' }">
          <!-- Image d'illustration de la carte -->
          <div class="relative h-48 overflow-hidden">
            <img :src="getImageForCandidature(candidature)" :alt="candidature.programme" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <!-- Badge de statut -->
            <div class="absolute top-4 right-4">
              <span :class="getStatutBadgeClass(candidature.statut)" class="px-4 py-2 rounded-full text-sm font-bold shadow-md backdrop-blur-sm flex items-center gap-2">
                <i :class="getStatutIcon(candidature.statut)"></i>
                {{ getStatutTexte(candidature.statut) }}
              </span>
            </div>
            
            <!-- Informations principales sur l'image -->
            <div class="absolute bottom-4 left-4 right-4">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <i class="fas fa-graduation-cap text-white text-lg"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white line-clamp-1">{{ candidature.programme }}</h3>
                  <p class="text-white/80 text-sm flex items-center gap-2">
                    <i class="fas fa-university text-xs"></i> {{ candidature.universite }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-5">
            <!-- Pays et date -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-map-marker-alt text-primary text-sm"></i>
                </div>
                <span class="text-sm font-medium text-gray-700">{{ candidature.pays }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fas fa-calendar-alt text-primary text-xs"></i>
                <span class="text-xs text-gray-500">Déposé le : {{ candidature.dateDepot }}</span>
              </div>
            </div>
            
            <!-- Timeline compacte -->
            <div class="relative mt-4 mb-5">
              <div class="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
              <div class="relative flex justify-between">
                <div v-for="(etape, idx) in etapesCompact" :key="idx" class="text-center z-10 flex-1">
                  <div :class="getEtapeClass(candidature, idx)" class="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md transition-all duration-300">
                    <i :class="getEtapeIcon(candidature, idx)" class="text-white text-xs"></i>
                  </div>
                  <p class="text-xs font-medium hidden md:block" :class="getEtapeTextClass(candidature, idx)">{{ etape }}</p>
                </div>
              </div>
            </div>
            
            <!-- Délai estimé -->
            <div class="flex items-center justify-center gap-2 mb-4 py-2 bg-gray-50 rounded-xl">
              <i class="fas fa-hourglass-half text-primary text-sm"></i>
              <span class="text-xs text-gray-600">Délai estimé :</span>
              <span class="text-xs font-semibold text-primary">{{ getDelaiEstime(candidature.statut) }}</span>
            </div>
            
            <!-- Actions -->
            <div class="flex flex-wrap gap-2">
              <button @click="voirDetails(candidature)" class="flex-1 py-2.5 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/10 transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm">
                <i class="fas fa-eye"></i> Détails
              </button>
              <button v-if="candidature.statut === 'acceptee'" @click="confirmerInscription(candidature)" class="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm">
                <i class="fas fa-check-circle"></i> Confirmer
              </button>
              <button v-if="candidature.statut === 'en_attente'" @click="relancer(candidature)" class="flex-1 py-2.5 border-2 border-gray-300 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm">
                <i class="fas fa-bell"></i> Relancer
              </button>
              <button v-if="candidature.statut === 'rejetee'" @click="contester(candidature)" class="flex-1 py-2.5 border-2 border-orange-500 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm">
                <i class="fas fa-comment-dots"></i> Contester
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal détails -->
    <div v-if="detailsModalOpen" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" @click.self="closeDetailsModal">
      <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transform animate-slideUp">
        <div class="relative h-32 overflow-hidden">
          <img :src="getImageForCandidature(selectedCandidature)" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <h3 class="text-xl font-bold text-white">{{ selectedCandidature?.programme }}</h3>
            <p class="text-white/80 text-sm">{{ selectedCandidature?.universite }}</p>
          </div>
          <button @click="closeDetailsModal" class="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-50 rounded-xl p-3 text-center">
              <i class="fas fa-map-marker-alt text-primary mb-1"></i>
              <p class="text-xs text-gray-500">Pays</p>
              <p class="text-sm font-semibold">{{ selectedCandidature?.pays }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3 text-center">
              <i class="fas fa-calendar text-primary mb-1"></i>
              <p class="text-xs text-gray-500">Date dépôt</p>
              <p class="text-sm font-semibold">{{ selectedCandidature?.dateDepot }}</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-3 text-center">
              <i class="fas fa-chart-line text-primary mb-1"></i>
              <p class="text-xs text-gray-500">Statut</p>
              <span :class="getStatutBadgeClass(selectedCandidature?.statut)" class="text-xs px-2 py-1 rounded-full inline-block mt-1">{{ getStatutTexte(selectedCandidature?.statut) }}</span>
            </div>
            <div class="bg-gray-50 rounded-xl p-3 text-center">
              <i class="fas fa-hourglass-half text-primary mb-1"></i>
              <p class="text-xs text-gray-500">Délai estimé</p>
              <p class="text-sm font-semibold">{{ getDelaiEstime(selectedCandidature?.statut) }}</p>
            </div>
          </div>
          
          <div v-if="selectedCandidature?.commentaire" class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div class="flex items-start gap-2">
              <i class="fas fa-comment-dots text-amber-600 mt-0.5"></i>
              <div>
                <p class="text-sm font-semibold text-amber-800">Commentaire du conseiller :</p>
                <p class="text-sm text-amber-700 mt-1">{{ selectedCandidature.commentaire }}</p>
              </div>
            </div>
          </div>
          
          <button @click="closeDetailsModal" class="w-full py-3 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2">
            <i class="fas fa-check-circle"></i> Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const etapesCompact = ['Création', 'Validation', 'Envoi', 'Réponse', 'Final'];

// Images pour chaque candidature
const getImageForCandidature = (candidature) => {
  const images = {
    'Master en Droit International': 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?w=600&h=350&fit=crop',
    'MBA - Management': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?w=600&h=350&fit=crop',
    'Doctorat en Sciences Politiques': 'https://images.pexels.com/photos/1396881/pexels-photo-1396881.jpeg?w=600&h=350&fit=crop',
    'Master en Génie Logiciel': 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=600&h=350&fit=crop',
    'Licence en Économie': 'https://images.pexels.com/photos/208702/pexels-photo-208702.jpeg?w=600&h=350&fit=crop'
  };
  return images[candidature.programme] || 'https://images.pexels.com/photos/1523050854058-8df90110c9f1.jpeg?w=600&h=350&fit=crop';
};

const getStatutBadgeClass = (statut) => {
  const classes = {
    en_attente: 'bg-yellow-500/90 text-white',
    en_cours: 'bg-blue-500/90 text-white',
    acceptee: 'bg-green-500/90 text-white',
    rejetee: 'bg-red-500/90 text-white'
  };
  return classes[statut] || 'bg-gray-500/90 text-white';
};

const getStatutIcon = (statut) => {
  const icons = {
    en_attente: 'fas fa-clock',
    en_cours: 'fas fa-sync-alt',
    acceptee: 'fas fa-check-circle',
    rejetee: 'fas fa-times-circle'
  };
  return icons[statut] || 'fas fa-info-circle';
};

const getStatutTexte = (statut) => {
  const textes = {
    en_attente: 'En attente',
    en_cours: 'En cours',
    acceptee: 'Acceptée',
    rejetee: 'Rejetée'
  };
  return textes[statut] || statut;
};

const getDelaiEstime = (statut) => {
  const delais = {
    en_attente: '2-3 semaines',
    en_cours: '4-6 semaines',
    acceptee: 'Félicitations !',
    rejetee: 'Contacter support'
  };
  return delais[statut] || 'En cours';
};

const getEtapeClass = (candidature, idx) => {
  const etapeStatus = getEtapeStatus(candidature, idx);
  if (etapeStatus === 'completed') return 'bg-gradient-to-r from-green-500 to-emerald-500';
  if (etapeStatus === 'current') return 'bg-gradient-to-r from-primary to-indigo-600 animate-pulse';
  return 'bg-gray-300';
};

const getEtapeIcon = (candidature, idx) => {
  const etapeStatus = getEtapeStatus(candidature, idx);
  if (etapeStatus === 'completed') return 'fas fa-check';
  if (etapeStatus === 'current') return 'fas fa-hourglass-half';
  return 'far fa-circle';
};

const getEtapeTextClass = (candidature, idx) => {
  const etapeStatus = getEtapeStatus(candidature, idx);
  if (etapeStatus === 'completed') return 'text-green-600 font-semibold';
  if (etapeStatus === 'current') return 'text-primary font-semibold';
  return 'text-gray-400';
};

const getEtapeStatus = (candidature, idx) => {
  const progressionMap = {
    en_attente: 0,
    en_cours: 2,
    acceptee: 3,
    rejetee: 3
  };
  const currentStep = progressionMap[candidature.statut] || 0;
  if (idx < currentStep) return 'completed';
  if (idx === currentStep) return 'current';
  return 'pending';
};

const candidatures = ref([]);
const detailsModalOpen = ref(false);
const selectedCandidature = ref(null);

const voirDetails = (candidature) => {
  selectedCandidature.value = candidature;
  detailsModalOpen.value = true;
};

const closeDetailsModal = () => {
  detailsModalOpen.value = false;
  selectedCandidature.value = null;
};

const confirmerInscription = (candidature) => {
  alert(`Félicitations ! Vous allez confirmer votre inscription pour ${candidature.programme} à ${candidature.universite}.\n\nUn email de confirmation vous sera envoyé dans les prochaines minutes.`);
};

const relancer = (candidature) => {
  alert(`Un message de relance a été envoyé à l'équipe en charge de votre dossier "${candidature.programme}".\n\nVous recevrez une réponse sous 48h.`);
};

const contester = (candidature) => {
  alert(`Votre contestation pour le dossier "${candidature.programme}" a été enregistrée.\n\nUn conseiller vous contactera dans les plus brefs délais.`);
};

onMounted(() => {
  const saved = localStorage.getItem('candidatures');
  if (saved) {
    candidatures.value = JSON.parse(saved);
  } else {
    candidatures.value = [
      {
        id: 1,
        programme: 'Master en Droit International',
        universite: 'Université Paris 1 Panthéon-Sorbonne',
        pays: 'France',
        dateDepot: '15 Mars 2025',
        statut: 'en_cours',
        commentaire: 'Votre dossier est en cours d\'examen par la commission pédagogique. Les résultats seront disponibles dans 2 semaines.'
      },
      {
        id: 2,
        programme: 'MBA - Management',
        universite: 'HEC Montréal',
        pays: 'Canada',
        dateDepot: '10 Février 2025',
        statut: 'acceptee',
        commentaire: 'Félicitations ! Vous êtes accepté sous réserve de validation des documents. Veuillez confirmer votre inscription.'
      },
      {
        id: 3,
        programme: 'Doctorat en Sciences Politiques',
        universite: 'Sciences Po Paris',
        pays: 'France',
        dateDepot: '5 Janvier 2025',
        statut: 'en_attente',
        commentaire: 'Votre dossier a été reçu. Il sera étudié par le comité d\'admission.'
      },
      {
        id: 4,
        programme: 'Master en Génie Logiciel',
        universite: 'École Polytechnique de Montréal',
        pays: 'Canada',
        dateDepot: '20 Février 2025',
        statut: 'en_cours',
        commentaire: 'Votre dossier est en cours d\'évaluation. Nous reviendrons vers vous sous peu.'
      }
    ];
  }
});
</script>

<style scoped>
.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float 8s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
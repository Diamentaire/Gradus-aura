<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Background décoratif animé -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow"></div>
      <div class="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-fast"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
    </div>

    <!-- En-tête avec animation -->
    <section class="relative overflow-hidden bg-gradient-to-r from-yellow-600 to-orange-600 py-16 md:py-20">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" class="w-full h-full object-cover" alt="background">
      </div>
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-bounce-in">
          <i class="fas fa-trophy text-white text-sm animate-pulse"></i>
          <span class="text-white font-semibold text-sm">Classement national</span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-down">
          Classement des <span class="text-yellow-300">candidats</span>
        </h1>
        <p class="text-indigo-100 text-base md:text-lg max-w-2xl mx-auto animate-slide-up">
          Découvrez votre position parmi tous les candidats du concours
        </p>
        <div class="absolute top-20 left-10 animate-float-slow">
          <i class="fas fa-chart-line text-white/20 text-4xl"></i>
        </div>
        <div class="absolute bottom-10 right-10 animate-float-fast">
          <i class="fas fa-trophy text-white/20 text-4xl"></i>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm mb-6 overflow-x-auto pb-2">
        <router-link to="/dashboard" class="text-gray-500 hover:text-primary transition flex items-center gap-1">
          <i class="fas fa-home"></i> Dashboard
        </router-link>
        <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        <span class="text-gray-800 font-medium">Classement national</span>
      </div>

      <!-- Filtres -->
      <div class="bg-white rounded-2xl shadow-lg p-4 mb-8 animate-fade-in-up">
        <div class="flex flex-wrap gap-4">
          <select v-model="selectedConcours" class="px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
            <option value="enam"><i class="fas fa-trophy"></i> ENAM 2025</option>
            <option value="ens"><i class="fas fa-graduation-cap"></i> ENS 2025</option>
            <option value="injs"><i class="fas fa-gavel"></i> INJS 2025</option>
            <option value="iric"><i class="fas fa-globe"></i> IRIC 2025</option>
          </select>
          <select v-model="selectedFiliere" class="px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
            <option value="all"><i class="fas fa-book"></i> Toutes filières</option>
            <option value="droit"><i class="fas fa-gavel"></i> Droit</option>
            <option value="economie"><i class="fas fa-chart-line"></i> Économie</option>
            <option value="science"><i class="fas fa-flask"></i> Sciences</option>
            <option value="lettres"><i class="fas fa-book-open"></i> Lettres</option>
          </select>
          <div class="flex-1">
            <div class="relative">
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input type="text" v-model="search" placeholder="Rechercher un candidat..." class="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques personnelles -->
      <div v-if="userRank" class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-8 animate-scale-in shadow-xl">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <i class="fas fa-user-graduate text-3xl"></i>
            </div>
            <div>
              <p class="text-sm opacity-80">Votre position</p>
              <p class="text-3xl font-bold">{{ userRank.position }}<span class="text-lg">/{{ totalCandidates }}</span></p>
            </div>
          </div>
          <div class="text-center">
            <p class="text-sm opacity-80">Score total</p>
            <p class="text-3xl font-bold">{{ userRank.score }}/1000</p>
          </div>
          <div class="text-center">
            <p class="text-sm opacity-80">Pourcentage</p>
            <div class="relative w-20 h-20 mx-auto">
              <svg class="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,0.2)" stroke-width="6" fill="none"/>
                <circle cx="40" cy="40" r="35" stroke="white" stroke-width="6" fill="none" stroke-dasharray="219.9" :stroke-dashoffset="219.9 * (1 - userRank.percentage / 100)"/>
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-xl font-bold">{{ userRank.percentage }}%</span>
            </div>
          </div>
          <div class="text-center">
            <p class="text-sm opacity-80">Meilleure matière</p>
            <p class="text-xl font-bold">{{ userRank.bestSubject }}</p>
          </div>
        </div>
      </div>

      <!-- Top 3 avec animations -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div v-for="(candidate, idx) in topThree" :key="candidate.id" class="text-center animate-fade-in-up" :style="{ animationDelay: idx * 0.1 + 's' }">
          <div class="relative group">
            <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 shadow-lg transition-transform duration-300 group-hover:scale-105" :class="idx === 0 ? 'border-yellow-500' : idx === 1 ? 'border-gray-400' : 'border-amber-600'">
              <img :src="candidate.avatar" class="w-full h-full object-cover" :alt="candidate.name">
            </div>
            <div class="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-bounce-in" :class="idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-amber-600'">
              {{ idx + 1 }}
            </div>
            <div v-if="idx === 0" class="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <i class="fas fa-crown text-yellow-500 text-2xl animate-bounce"></i>
            </div>
          </div>
          <h3 class="font-bold text-xl mt-3">{{ candidate.name }}</h3>
          <p class="text-gray-500 text-sm">{{ candidate.school }}</p>
          <p class="text-primary font-bold text-2xl mt-2">{{ candidate.score }} pts</p>
          <div class="flex justify-center gap-1 mt-2">
            <i v-for="n in 5" :key="n" class="fas fa-star text-yellow-400 text-sm"></i>
          </div>
        </div>
      </div>

      <!-- Tableau des meilleurs scores -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in-up" style="animation-delay: 0.2s">
        <div class="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
          <h3 class="font-bold text-gray-800"><i class="fas fa-chart-line text-primary mr-2"></i> Classement général</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b">
              <tr class="text-left">
                <th class="p-4 text-sm font-bold text-gray-500 w-20">Rang</th>
                <th class="p-4 text-sm font-bold text-gray-500">Candidat</th>
                <th class="p-4 text-sm font-bold text-gray-500">Score</th>
                <th class="p-4 text-sm font-bold text-gray-500">Progression</th>
                <th class="p-4 text-sm font-bold text-gray-500">Détails</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="(candidate, idx) in filteredRanking" :key="candidate.id" :class="['hover:bg-gray-50 transition duration-300', candidate.isCurrentUser ? 'bg-gradient-to-r from-indigo-50 to-purple-50' : '']">
                <td class="p-4 font-bold" :class="getRankClass(idx + 1)">
                  {{ idx + 1 }}
                  <i v-if="idx < 3" class="fas fa-crown ml-1" :class="idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : 'text-amber-600'"></i>
                </td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                      {{ candidate.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-medium">{{ candidate.name }}</p>
                      <p class="text-xs text-gray-500">{{ candidate.school }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-4">
                  <span class="font-bold text-primary">{{ candidate.score }}</span>
                  <span class="text-xs text-gray-400">/1000</span>
                </td>
                <td class="p-4">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="candidate.progression > 0 ? 'bg-green-100' : candidate.progression < 0 ? 'bg-red-100' : 'bg-gray-100'">
                      <i :class="candidate.progression > 0 ? 'fas fa-arrow-up text-green-500' : candidate.progression < 0 ? 'fas fa-arrow-down text-red-500' : 'fas fa-minus text-gray-400'"></i>
                    </div>
                    <span :class="candidate.progression > 0 ? 'text-green-600' : candidate.progression < 0 ? 'text-red-600' : 'text-gray-500'">{{ Math.abs(candidate.progression) }} places</span>
                  </div>
                </td>
                <td class="p-4">
                  <button @click="showDetails(candidate)" class="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300">
                    <i class="fas fa-eye mr-1"></i> Détails
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center gap-2 mt-8">
        <button @click="currentPage = currentPage - 1" :disabled="currentPage === 1" class="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button v-for="page in displayedPages" :key="page" @click="currentPage = page" :class="['w-10 h-10 rounded-lg transition-all duration-300', currentPage === page ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'bg-white border border-gray-200 hover:bg-gray-50']">
          {{ page }}
        </button>
        <button @click="currentPage = currentPage + 1" :disabled="currentPage === totalPages" class="w-10 h-10 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Modal détails candidat -->
    <div v-if="detailsModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in" @click.self="closeDetailsModal">
      <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden animate-scale-in">
        <div class="p-5 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-gray-800 text-lg">Détails du candidat</h3>
            <button @click="closeDetailsModal" class="w-8 h-8 rounded-full hover:bg-gray-200 transition flex items-center justify-center">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="p-5 space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {{ selectedCandidate?.name.charAt(0) }}
            </div>
            <div>
              <h4 class="text-xl font-bold">{{ selectedCandidate?.name }}</h4>
              <p class="text-gray-500">{{ selectedCandidate?.school }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 text-center">
              <p class="text-sm text-gray-500">Score total</p>
              <p class="text-2xl font-bold text-primary">{{ selectedCandidate?.score }}/1000</p>
            </div>
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 text-center">
              <p class="text-sm text-gray-500">Rang</p>
              <p class="text-2xl font-bold text-primary">{{ selectedCandidate?.rank }}</p>
            </div>
          </div>
          
          <div>
            <h4 class="font-bold mb-2">Scores par matière</h4>
            <div class="space-y-2">
              <div v-for="subject in selectedCandidate?.subjects" :key="subject.name">
                <div class="flex justify-between text-sm mb-1">
                  <span>{{ subject.name }}</span>
                  <span>{{ subject.score }}/200</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div class="bg-primary h-2 rounded-full transition-all" :style="{ width: (subject.score / 200 * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
          
          <button @click="closeDetailsModal" class="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-[1.02]">
            <i class="fas fa-check-circle mr-2"></i> Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Toast notification -->
    <div v-if="toastVisible" class="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-in-right">
      <i class="fas fa-check-circle mr-2"></i> {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedConcours = ref('enam');
const selectedFiliere = ref('all');
const search = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const detailsModalOpen = ref(false);
const selectedCandidate = ref(null);
const toastVisible = ref(false);
const toastMessage = ref('');

// Données utilisateur connecté
const userRank = ref({
  position: 42,
  score: 785,
  percentage: 78.5,
  bestSubject: 'Mathématiques'
});

const totalCandidates = ref(1250);

// Images qui fonctionnent (placeholders génériques)
const defaultAvatar = 'https://placehold.co/200x200/4F46E5/FFFFFF?text=User';

// Données du classement
const rankingData = ref([
  { id: 1, name: 'Jean Dupont', school: 'Université de Yaoundé I', score: 985, progression: 5, subjects: [{ name: 'Mathématiques', score: 195 }, { name: 'Français', score: 198 }, { name: 'Anglais', score: 197 }, { name: 'Culture Générale', score: 195 }, { name: 'Droit', score: 200 }], isCurrentUser: false, avatar: 'https://placehold.co/200x200/FFD700/FFFFFF?text=JD' },
  { id: 2, name: 'Marie Claire', school: 'Université de Douala', score: 972, progression: 3, subjects: [{ name: 'Mathématiques', score: 190 }, { name: 'Français', score: 195 }, { name: 'Anglais', score: 198 }, { name: 'Culture Générale', score: 194 }, { name: 'Droit', score: 195 }], isCurrentUser: false, avatar: 'https://placehold.co/200x200/C0C0C0/FFFFFF?text=MC' },
  { id: 3, name: 'Paul Mbarga', school: 'ENS Yaoundé', score: 958, progression: 7, subjects: [{ name: 'Mathématiques', score: 200 }, { name: 'Français', score: 190 }, { name: 'Anglais', score: 195 }, { name: 'Culture Générale', score: 188 }, { name: 'Droit', score: 185 }], isCurrentUser: false, avatar: 'https://placehold.co/200x200/CD7F32/FFFFFF?text=PM' },
  { id: 42, name: 'Vous', school: 'Université de Yaoundé I', score: 785, progression: 12, subjects: [{ name: 'Mathématiques', score: 185 }, { name: 'Français', score: 165 }, { name: 'Anglais', score: 170 }, { name: 'Culture Générale', score: 155 }, { name: 'Droit', score: 110 }], isCurrentUser: true, avatar: 'https://placehold.co/200x200/4F46E5/FFFFFF?text=Vous' }
]);

// Générer plus de données
for (let i = 4; i <= 100; i++) {
  if (i !== 42) {
    rankingData.value.push({
      id: i,
      name: `Candidat ${i}`,
      school: ['Université de Yaoundé I', 'Université de Douala', 'Université de Dschang', 'ENS Yaoundé'][Math.floor(Math.random() * 4)],
      score: Math.floor(Math.random() * (950 - 500) + 500),
      progression: Math.floor(Math.random() * 21) - 10,
      subjects: [],
      isCurrentUser: false,
      avatar: 'https://placehold.co/200x200/9CA3AF/FFFFFF?text=C'+i
    });
  }
}

// Trier par score
rankingData.value.sort((a, b) => b.score - a.score);

// Assigner les rangs
rankingData.value.forEach((candidate, idx) => {
  candidate.rank = idx + 1;
});

const topThree = computed(() => rankingData.value.slice(0, 3));

const filteredRanking = computed(() => {
  let result = [...rankingData.value];
  if (search.value) {
    result = result.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()));
  }
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return result.slice(start, end);
});

const totalPages = computed(() => Math.ceil(rankingData.value.length / itemsPerPage));

const displayedPages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const getRankClass = (rank) => {
  if (rank === 1) return 'text-yellow-500';
  if (rank === 2) return 'text-gray-400';
  if (rank === 3) return 'text-amber-600';
  return 'text-gray-700';
};

const showDetails = (candidate) => {
  selectedCandidate.value = candidate;
  detailsModalOpen.value = true;
};

const closeDetailsModal = () => {
  detailsModalOpen.value = false;
  selectedCandidate.value = null;
};

const showToast = (message) => {
  toastMessage.value = message;
  toastVisible.value = true;
  setTimeout(() => {
    toastVisible.value = false;
  }, 3000);
};
</script>

<style scoped>
.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

/* Animations */
@keyframes bounce-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes slide-down {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fade-in-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(-10px); }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.05); opacity: 0.2; }
}

@keyframes slide-in-right {
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-bounce-in { animation: bounce-in 0.6s ease-out; }
.animate-slide-down { animation: slide-down 0.6s ease-out; }
.animate-slide-up { animation: slide-up 0.6s ease-out; }
.animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; opacity: 0; }
.animate-scale-in { animation: scale-in 0.4s ease-out; }
.animate-bounce { animation: bounce 0.5s ease-in-out; }
.animate-fade-in { animation: fade-in 0.3s ease-out; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
.animate-float-fast { animation: float-fast 6s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
.animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }

.delay-700 { animation-delay: 0.7s; }

/* Responsive */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
    <!-- Hero Section avec animation et image -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-700 py-20">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
      </div>
      
      <div class="absolute inset-0">
        <div class="particles">
          <div v-for="i in 20" :key="i" class="particle" :style="{ left: Math.random() * 100 + '%', animationDelay: Math.random() * 5 + 's' }"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <i class="fas fa-globe text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Mobilité internationale</span>
        </div>
        
        <div class="animate-fadeInUp">
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Destinations d'étude</h1>
          <p class="text-indigo-100 text-xl max-w-2xl mx-auto">
            Découvrez les meilleures destinations pour poursuivre vos études à l'étranger
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
      <!-- Filtres modernes -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-sm border border-gray-100">
        <div class="grid md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">
              <i class="fas fa-globe-africa text-primary mr-1"></i> Continent
            </label>
            <div class="relative">
              <select v-model="filters.continent" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition appearance-none bg-white pr-10">
                <option value="all">
                  <i class="fas fa-globe"></i> Tous les continents
                </option>
                <option value="europe">
                  <i class="fas fa-map-marker-alt"></i> Europe
                </option>
                <option value="amerique">
                  <i class="fas fa-map-marker-alt"></i> Amérique du Nord
                </option>
                <option value="asie">
                  <i class="fas fa-map-marker-alt"></i> Asie
                </option>
                <option value="oceanie">
                  <i class="fas fa-map-marker-alt"></i> Océanie
                </option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">
              <i class="fas fa-language text-primary mr-1"></i> Langue
            </label>
            <div class="relative">
              <select v-model="filters.langue" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition appearance-none bg-white pr-10">
                <option value="all">
                  <i class="fas fa-language"></i> Toutes les langues
                </option>
                <option value="francais">
                  <i class="fas fa-flag-checkered"></i> Français
                </option>
                <option value="anglais">
                  <i class="fas fa-flag-checkered"></i> Anglais
                </option>
                <option value="espagnol">
                  <i class="fas fa-flag-checkered"></i> Espagnol
                </option>
                <option value="allemand">
                  <i class="fas fa-flag-checkered"></i> Allemand
                </option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">
              <i class="fas fa-coins text-primary mr-1"></i> Frais de scolarité
            </label>
            <div class="relative">
              <select v-model="filters.frais" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition appearance-none bg-white pr-10">
                <option value="all">
                  <i class="fas fa-coins"></i> Tous les budgets
                </option>
                <option value="low">
                  <i class="fas fa-chart-line"></i> Moins de 1M FCFA/an
                </option>
                <option value="medium">
                  <i class="fas fa-chart-line"></i> 1M - 5M FCFA/an
                </option>
                <option value="high">
                  <i class="fas fa-chart-line"></i> Plus de 5M FCFA/an
                </option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">
              <i class="fas fa-search text-primary mr-1"></i> Recherche
            </label>
            <div class="relative">
              <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input type="text" v-model="filters.search" placeholder="Rechercher un pays..." class="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des pays -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="pays in filteredPays" :key="pays.id" class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          <div class="relative h-52 overflow-hidden">
            <img :src="pays.image" :alt="pays.nom" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <span class="bg-white/95 text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                <i class="fas fa-university mr-1"></i> {{ pays.universites }} universités
              </span>
            </div>
            <div class="absolute top-4 right-4">
              <div class="bg-white rounded-full p-2 shadow-lg transform group-hover:scale-110 transition">
                <i :class="pays.drapeau" class="text-2xl"></i>
              </div>
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              {{ pays.nom }}
              <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                <i class="fas fa-star text-xs mr-1"></i> Top destination
              </span>
            </h3>
            <p class="text-gray-500 text-sm mb-3 line-clamp-2">{{ pays.description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-3">
              <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                <i class="fas fa-language mr-1"></i> {{ pays.langue }}
              </span>
              <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                <i class="fas fa-coins mr-1"></i> {{ pays.frais }}
              </span>
              <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                <i class="fas fa-clock mr-1"></i> Visa: {{ pays.visa }}
              </span>
            </div>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-1">
                <i class="fas fa-star text-yellow-400 text-sm"></i>
                <span class="text-sm font-semibold">{{ pays.note }}</span>
                <span class="text-xs text-gray-400">({{ pays.avis }} avis)</span>
              </div>
              <span class="text-sm text-gray-500"><i class="fas fa-users mr-1"></i> {{ pays.etudiants }}+ étudiants</span>
            </div>
            
            <button @click="voirDetails(pays)" class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <i class="fas fa-info-circle"></i> Découvrir
            </button>
          </div>
        </div>
      </div>

      <!-- Message si aucun résultat -->
      <div v-if="filteredPays.length === 0" class="text-center py-12">
        <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fas fa-search text-gray-400 text-3xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-600">Aucune destination trouvée</h3>
        <p class="text-gray-400 mt-2">Essayez de modifier vos critères de recherche</p>
      </div>
    </div>

    <!-- Modal détails pays -->
    <div v-if="selectedPays" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" @click.self="closeModal">
      <div class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl transform animate-slideUp">
        <div class="relative h-64 overflow-hidden">
          <img :src="selectedPays.image" :alt="selectedPays.nom" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <h2 class="text-3xl font-bold">{{ selectedPays.nom }}</h2>
            <p class="text-indigo-200">{{ selectedPays.universites }} universités partenaires</p>
          </div>
          <button @click="closeModal" class="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:scale-110 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="bg-gray-50 rounded-xl p-4">
              <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-primary"></i> Informations générales
              </h3>
              <ul class="space-y-2 text-sm">
                <li class="flex justify-between border-b border-gray-100 pb-2">
                  <span class="text-gray-500"><i class="fas fa-city mr-2"></i>Capitale</span>
                  <span class="font-medium">{{ selectedPays.capitale }}</span>
                </li>
                <li class="flex justify-between border-b border-gray-100 pb-2">
                  <span class="text-gray-500"><i class="fas fa-users mr-2"></i>Population</span>
                  <span class="font-medium">{{ selectedPays.population }}</span>
                </li>
                <li class="flex justify-between border-b border-gray-100 pb-2">
                  <span class="text-gray-500"><i class="fas fa-language mr-2"></i>Langue officielle</span>
                  <span class="font-medium">{{ selectedPays.langue }}</span>
                </li>
                <li class="flex justify-between border-b border-gray-100 pb-2">
                  <span class="text-gray-500"><i class="fas fa-coins mr-2"></i>Monnaie</span>
                  <span class="font-medium">{{ selectedPays.monnaie }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-500"><i class="fas fa-graduation-cap mr-2"></i>Frais de scolarité</span>
                  <span class="font-medium text-primary">{{ selectedPays.frais }}</span>
                </li>
              </ul>
            </div>
            <div class="bg-gray-50 rounded-xl p-4">
              <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                <i class="fas fa-graduation-cap text-primary"></i> Universités populaires
              </h3>
              <ul class="space-y-2">
                <li v-for="uni in selectedPays.universitesList" :key="uni" class="flex items-center gap-2 text-sm p-2 hover:bg-white rounded-lg transition">
                  <i class="fas fa-university text-primary text-xs"></i>
                  <span>{{ uni }}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mb-6 bg-blue-50 rounded-xl p-4">
            <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
              <i class="fas fa-passport text-primary"></i> Procédures de visa
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ selectedPays.visaProcedure }}</p>
          </div>
          
          <div class="flex gap-3">
            <button @click="creerDossier(selectedPays)" class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <i class="fas fa-file-alt"></i> Créer mon dossier
            </button>
            <button @click="voirBourses(selectedPays)" class="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/10 hover:scale-105 transition-all transform flex items-center justify-center gap-2">
              <i class="fas fa-graduation-cap"></i> Voir les bourses
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const filters = ref({
  continent: 'all',
  langue: 'all',
  frais: 'all',
  search: ''
});

const paysList = ref([
  {
    id: 1,
    nom: 'France',
    drapeau: 'fi fi-fr',
    image: 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?w=600&h=400&fit=crop',
    description: 'Destination phare pour les études, avec des universités reconnues mondialement et un système éducatif d\'excellence.',
    capitale: 'Paris',
    population: '68 millions',
    langue: 'Français',
    monnaie: 'Euro (€)',
    frais: '110 000 - 2 470 000 FCFA/an',
    visa: '2-3 mois',
    universites: 85,
    note: 4.8,
    avis: 1240,
    etudiants: 35000,
    continent: 'europe',
    universitesList: ['Sorbonne Université', 'Université PSL', 'Sciences Po', 'Université Paris-Saclay'],
    visaProcedure: 'Le visa étudiant français (VLS-TS) nécessite une inscription dans un établissement, une preuve de ressources (environ 400 000 FCFA/mois) et une couverture santé.'
  },
  {
    id: 2,
    nom: 'Canada',
    drapeau: 'fi fi-ca',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?w=600&h=400&fit=crop',
    description: 'Système éducatif d\'excellence, possibilités d\'immigration après les études et qualité de vie exceptionnelle.',
    capitale: 'Ottawa',
    population: '38 millions',
    langue: 'Français/Anglais',
    monnaie: 'Dollar canadien (CAD)',
    frais: '6 500 000 - 15 000 000 FCFA/an',
    visa: '3-4 mois',
    universites: 98,
    note: 4.9,
    avis: 2150,
    etudiants: 45000,
    continent: 'amerique',
    universitesList: ['Université de Toronto', 'McGill University', 'UBC', 'Université de Montréal'],
    visaProcedure: 'Le permis d\'études canadien nécessite une lettre d\'acceptation, une preuve de fonds (environ 6 500 000 FCFA) et une lettre de motivation.'
  },
  {
    id: 3,
    nom: 'Allemagne',
    drapeau: 'fi fi-de',
    image: 'https://images.pexels.com/photos/1396881/pexels-photo-1396881.jpeg?w=600&h=400&fit=crop',
    description: 'Frais de scolarité très bas ou gratuits dans la plupart des universités publiques allemandes.',
    capitale: 'Berlin',
    population: '83 millions',
    langue: 'Allemand',
    monnaie: 'Euro (€)',
    frais: '100 000 - 260 000 FCFA/semestre',
    visa: '2-3 mois',
    universites: 120,
    note: 4.7,
    avis: 980,
    etudiants: 38000,
    continent: 'europe',
    universitesList: ['LMU Munich', 'TU Berlin', 'Université de Heidelberg', 'Université de Hambourg'],
    visaProcedure: 'Le visa étudiant allemand nécessite une preuve d\'admission, un compte bloqué (environ 7 800 000 FCFA/an) et une assurance maladie.'
  },
  {
    id: 4,
    nom: 'États-Unis',
    drapeau: 'fi fi-us',
    image: 'https://images.pexels.com/photos/208702/pexels-photo-208702.jpeg?w=600&h=400&fit=crop',
    description: 'Universités prestigieuses, opportunités professionnelles uniques et réseau d\'alumni mondial.',
    capitale: 'Washington DC',
    population: '331 millions',
    langue: 'Anglais',
    monnaie: 'Dollar US (USD)',
    frais: '13 000 000 - 36 000 000 FCFA/an',
    visa: '4-6 mois',
    universites: 150,
    note: 4.9,
    avis: 3200,
    etudiants: 55000,
    continent: 'amerique',
    universitesList: ['Harvard University', 'Stanford University', 'MIT', 'UC Berkeley'],
    visaProcedure: 'Le visa F-1 nécessite une admission SEVIS, une preuve de fonds et un entretien à l\'ambassade.'
  },
  {
    id: 5,
    nom: 'Suisse',
    drapeau: 'fi fi-ch',
    image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?w=600&h=400&fit=crop',
    description: 'Formation de qualité dans un cadre exceptionnel, avec des écoles de renom international.',
    capitale: 'Berne',
    population: '8.6 millions',
    langue: 'Allemand/Français/Italien',
    monnaie: 'Franc suisse (CHF)',
    frais: '330 000 - 1 300 000 FCFA/semestre',
    visa: '2-3 mois',
    universites: 45,
    note: 4.8,
    avis: 650,
    etudiants: 25000,
    continent: 'europe',
    universitesList: ['ETH Zurich', 'EPFL', 'Université de Genève', 'Université de Lausanne'],
    visaProcedure: 'Le visa étudiant suisse nécessite une admission, une preuve de fonds (environ 14 000 000 FCFA/an) et une assurance maladie.'
  },
  {
    id: 6,
    nom: 'Royaume-Uni',
    drapeau: 'fi fi-gb',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?w=600&h=400&fit=crop',
    description: 'Universités historiques prestigieuses et programmes courts (3 ans pour la licence).',
    capitale: 'Londres',
    population: '67 millions',
    langue: 'Anglais',
    monnaie: 'Livre sterling (£)',
    frais: '7 800 000 - 29 000 000 FCFA/an',
    visa: '3 mois',
    universites: 130,
    note: 4.8,
    avis: 1850,
    etudiants: 48000,
    continent: 'europe',
    universitesList: ['Oxford University', 'Cambridge University', 'Imperial College', 'UCL'],
    visaProcedure: 'Le visa Student Route nécessite un CAS, une preuve de fonds et un test de langue anglais.'
  }
]);

const filteredPays = computed(() => {
  let result = paysList.value;
  
  if (filters.value.continent !== 'all') {
    result = result.filter(p => p.continent === filters.value.continent);
  }
  if (filters.value.langue !== 'all') {
    result = result.filter(p => p.langue.toLowerCase().includes(filters.value.langue.toLowerCase()));
  }
  if (filters.value.search) {
    result = result.filter(p => p.nom.toLowerCase().includes(filters.value.search.toLowerCase()));
  }
  
  return result;
});

const selectedPays = ref(null);

const voirDetails = (pays) => {
  selectedPays.value = pays;
};

const closeModal = () => {
  selectedPays.value = null;
};

const creerDossier = (pays) => {
  localStorage.setItem('mobilite_pays_selected', JSON.stringify(pays));
  router.push('/mobilite/dossier');
};

const voirBourses = (pays) => {
  localStorage.setItem('mobilite_pays_bourses', pays.nom);
  router.push('/mobilite/bourses');
};
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

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Style pour les selects avec icônes */
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Style pour les flags */
.fi {
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
  width: 1.333333em;
  line-height: 1em;
}

.fi-fr {
  background-image: url(https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/fr.svg);
}
.fi-ca {
  background-image: url(https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/ca.svg);
}
.fi-de {
  background-image: url(https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/de.svg);
}
.fi-us {
  background-image: url(https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/us.svg);
}
.fi-ch {
  background-image: url(https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/ch.svg);
}
.fi-gb {
  background-image: url(https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/gb.svg);
}
</style>
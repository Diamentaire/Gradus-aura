<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 pt-16 pb-20 md:pt-20 md:pb-28">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-5 lg:px-8 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-graduation-cap text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Plateforme de Réussite aux Examens Camerounais</span>
        </div>
        <h1 class="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white">
          Annales officielles <span class="text-yellow-300">Cameroun 2019-2025</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-6 max-w-3xl mx-auto">
          Téléchargez gratuitement les sujets et corrigés des examens camerounais du BEPC au Doctorat
        </p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-download text-white"></i>
            <span class="text-white text-sm">2000+ sujets</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-check-circle text-white"></i>
            <span class="text-white text-sm">Corrigés inclus</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-line text-white"></i>
            <span class="text-white text-sm">Mise à jour 2025</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <!-- STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-file-alt text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">2000+</span>
            <span class="text-xs text-gray-500">Sujets disponibles</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-check-circle text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">100%</span>
            <span class="text-xs text-gray-500">Corrigés officiels</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-calendar-alt text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">2019-2025</span>
            <span class="text-xs text-gray-500">7 années d'archives</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-users text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">50K+</span>
            <span class="text-xs text-gray-500">Étudiants servis</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-trophy text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">89%</span>
            <span class="text-xs text-gray-500">Taux de réussite</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Onglets de navigation principaux avec effet visuel -->
    <div class="sticky top-0 z-40 bg-white shadow-md">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="flex flex-wrap overflow-x-auto justify-center gap-2 py-4">
          <button 
            v-for="category in examCategories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap',
              activeCategory === category.id 
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            <i :class="category.icon + ' mr-2'"></i>
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Contenu dynamique -->
    <div class="py-12">
      <div class="container mx-auto px-5 lg:px-8">
        
        <!-- ==================== BEPC avec image ==================== -->
        <div v-if="activeCategory === 'bepc'" class="animate-fadeIn">
          <div class="text-center mb-12">
            <div class="w-24 h-24 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-graduation-cap text-primary text-3xl"></i>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-dark">BEPC - Brevet d'Études du Premier Cycle</h2>
            <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Sujets officiels du Cameroun (2019 - 2025)</p>
          </div>
          
          <div v-for="annee in [2025,2024,2023,2022,2021,2020,2019]" :key="annee" class="mb-8 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
            <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-4">
              <div class="flex justify-between items-center">
                <h3 class="text-xl font-bold text-white">Session {{ annee }}</h3>
                <button @click="downloadAnnales(annee)" class="px-3 py-1 bg-white/20 text-white rounded-lg text-sm hover:bg-white/30 transition">
                  <i class="fas fa-download mr-1"></i> Tout télécharger
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="matiere in bepcMatieres" :key="matiere.id" class="border rounded-xl p-3 hover:shadow-md transition group">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-primary transition">
                      <i :class="matiere.icon + ' text-primary text-lg group-hover:text-white'"></i>
                    </div>
                    <div class="flex-1">
                      <p class="font-semibold">{{ matiere.nom }}</p>
                      <p class="text-xs text-gray-500">Coeff: {{ matiere.coefficient }}</p>
                    </div>
                    <button @click="downloadEpreuve('BEPC', annee, matiere.nom)" class="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition">
                      <i class="fas fa-download mr-1"></i> PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== PROBATOIRE GÉNÉRALE avec image ==================== -->
        <div v-if="activeCategory === 'probatoireG'" class="animate-fadeIn">
          <div class="text-center mb-12">
            <div class="w-24 h-24 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-chart-line text-primary text-3xl"></i>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-dark">Probatoire Générale</h2>
            <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Séries A, C, D, E - Sujets officiels du Cameroun (2019 - 2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div v-for="serie in probatoireSeries" :key="serie.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-4 text-center">
                <i :class="serie.icon + ' text-white text-3xl'"></i>
                <h3 class="text-xl font-bold text-white mt-2">Série {{ serie.nom }}</h3>
              </div>
              <div class="p-4">
                <div class="space-y-2">
                  <div v-for="matiere in serie.matieres.slice(0,4)" :key="matiere" class="flex justify-between items-center text-sm">
                    <span>{{ matiere }}</span>
                    <div class="flex gap-1">
                      <button @click="downloadEpreuve('Probatoire ' + serie.nom, 2024, matiere)" class="text-primary text-xs hover:underline">📄</button>
                    </div>
                  </div>
                  <button class="w-full mt-3 text-center text-primary text-sm font-semibold">Voir plus →</button>
                </div>
              </div>
            </div>
          </div>

          <div v-for="serie in probatoireSeries" :key="serie.id" class="mb-8">
            <h3 class="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <i :class="serie.icon"></i> Série {{ serie.nom }} - Toutes les années
            </h3>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="annee in [2025,2024,2023,2022,2021,2020,2019]" :key="annee" class="bg-gray-50 rounded-xl p-3 hover:shadow-md transition">
                <div class="flex justify-between items-center">
                  <span class="font-semibold">Session {{ annee }}</span>
                  <button @click="downloadEpreuve('Probatoire ' + serie.nom, annee, 'Toutes matières')" class="text-primary text-sm hover:underline">
                    <i class="fas fa-download"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== BAC GÉNÉRALE ==================== -->
        <div v-if="activeCategory === 'bacG'" class="animate-fadeIn">
          <div class="text-center mb-12">
            <div class="w-24 h-24 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-trophy text-primary text-3xl"></i>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-dark">Baccalauréat Générale</h2>
            <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Séries A, C, D, E - Sujets officiels du Cameroun (2019 - 2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div v-for="serie in bacSeries" :key="serie.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-4 text-center">
                <i :class="serie.icon + ' text-white text-3xl'"></i>
                <h3 class="text-xl font-bold text-white mt-2">Série {{ serie.nom }}</h3>
              </div>
              <div class="p-4">
                <div class="space-y-2">
                  <div v-for="matiere in serie.matieres.slice(0,4)" :key="matiere" class="flex justify-between items-center text-sm">
                    <span>{{ matiere }}</span>
                    <button @click="downloadEpreuve('Bac ' + serie.nom, 2024, matiere)" class="text-primary text-xs"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== PROBATOIRE TECHNIQUE ==================== -->
        <div v-if="activeCategory === 'probatoireT'" class="animate-fadeIn">
          <div class="text-center mb-12">
            <div class="w-24 h-24 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-tools text-primary text-3xl"></i>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-dark">Probatoire Technique</h2>
            <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Filières industrielles et tertiaires - Sujets officiels (2019-2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="filiere in probatoireTech" :key="filiere.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div class="h-32 bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center">
                <i :class="filiere.icon + ' text-white text-4xl'"></i>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold">{{ filiere.nom }}</h3>
                <div class="mt-3 space-y-1">
                  <div v-for="annee in [2025,2024,2023]" :key="annee" class="flex justify-between items-center text-sm">
                    <span>Session {{ annee }}</span>
                    <button @click="downloadEpreuve(filiere.nom, annee, 'Épreuve')" class="text-primary text-xs hover:underline">Télécharger</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== BAC TECHNIQUE ==================== -->
        <div v-if="activeCategory === 'bacT'" class="animate-fadeIn">
          <div class="text-center mb-12">
            <div class="w-24 h-24 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-industry text-primary text-3xl"></i>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-dark">Baccalauréat Technique</h2>
            <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Filières industrielles, tertiaires et hôtelières - Sujets officiels (2019-2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="filiere in bacTech" :key="filiere.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div class="h-32 bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center">
                <i :class="filiere.icon + ' text-white text-4xl'"></i>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold">{{ filiere.nom }}</h3>
                <button @click="downloadEpreuve(filiere.nom, 2024, 'Toutes épreuves')" class="mt-3 w-full py-2 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition">
                  <i class="fas fa-download mr-1"></i> Télécharger
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section conseils améliorée -->
        <div class="mt-16 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl p-8 text-white">
          <h3 class="text-xl font-bold mb-4 text-center"> Conseils pour réussir vos examens</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="flex gap-3 items-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <i class="fas fa-calendar-alt text-2xl"></i>
              <div><h4 class="font-semibold">Planification</h4><p class="text-sm text-indigo-100">Établissez un planning de révisions réaliste</p></div>
            </div>
            <div class="flex gap-3 items-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <i class="fas fa-stopwatch text-2xl"></i>
              <div><h4 class="font-semibold">Entraînement</h4><p class="text-sm text-indigo-100">Faites des sujets chronométrés régulièrement</p></div>
            </div>
            <div class="flex gap-3 items-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <i class="fas fa-chalkboard-user text-2xl"></i>
              <div><h4 class="font-semibold">Accompagnement</h4><p class="text-sm text-indigo-100">Bénéficiez du suivi de nos formateurs experts</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Catégories principales
const examCategories = ref([
  { id: 'bepc', name: 'BEPC', icon: 'fas fa-graduation-cap' },
  { id: 'probatoireG', name: 'Probatoire Générale', icon: 'fas fa-chart-line' },
  { id: 'bacG', name: 'Baccalauréat Générale', icon: 'fas fa-trophy' },
  { id: 'probatoireT', name: 'Probatoire Technique', icon: 'fas fa-tools' },
  { id: 'bacT', name: 'Baccalauréat Technique', icon: 'fas fa-industry' },
  { id: 'bts', name: 'BTS', icon: 'fas fa-certificate' },
  { id: 'licence', name: 'Licence', icon: 'fas fa-graduation-cap' },
  { id: 'master', name: 'Master', icon: 'fas fa-chalkboard-user' },
  { id: 'doctorat', name: 'Doctorat', icon: 'fas fa-microscope' }
]);

const activeCategory = ref('bepc');

// Matières BEPC
const bepcMatieres = ref([
  { id: 1, nom: 'Français', icon: 'fas fa-book', coefficient: 4 },
  { id: 2, nom: 'Mathématiques', icon: 'fas fa-calculator', coefficient: 4 },
  { id: 3, nom: 'Anglais', icon: 'fas fa-language', coefficient: 3 },
  { id: 4, nom: 'Sciences Physiques', icon: 'fas fa-flask', coefficient: 2 },
  { id: 5, nom: 'SVT', icon: 'fas fa-leaf', coefficient: 2 },
  { id: 6, nom: 'Histoire-Géographie', icon: 'fas fa-globe', coefficient: 2 }
]);

// Probatoire Générale
const probatoireSeries = ref([
  { id: 1, nom: 'A', icon: 'fas fa-book', matieres: ['Français', 'Anglais', 'Philosophie', 'Histoire', 'Géographie', 'Mathématiques'] },
  { id: 2, nom: 'C', icon: 'fas fa-calculator', matieres: ['Mathématiques', 'Physique', 'Chimie', 'SVT', 'Anglais', 'Philosophie'] },
  { id: 3, nom: 'D', icon: 'fas fa-leaf', matieres: ['SVT', 'Mathématiques', 'Physique', 'Chimie', 'Anglais', 'Philosophie'] },
  { id: 4, nom: 'E', icon: 'fas fa-chart-line', matieres: ['Économie', 'Mathématiques', 'Comptabilité', 'Gestion', 'Anglais', 'Philosophie'] }
]);

// Bac Générale
const bacSeries = ref([
  { id: 1, nom: 'A', icon: 'fas fa-book', matieres: ['Français', 'Anglais', 'Philosophie', 'Histoire', 'Géographie', 'Mathématiques'] },
  { id: 2, nom: 'C', icon: 'fas fa-calculator', matieres: ['Mathématiques', 'Physique', 'Chimie', 'SVT', 'Anglais', 'Philosophie'] },
  { id: 3, nom: 'D', icon: 'fas fa-leaf', matieres: ['SVT', 'Mathématiques', 'Physique', 'Chimie', 'Anglais', 'Philosophie'] },
  { id: 4, nom: 'E', icon: 'fas fa-chart-line', matieres: ['Économie', 'Mathématiques', 'Comptabilité', 'Gestion', 'Anglais', 'Philosophie'] }
]);

// Probatoire Technique
const probatoireTech = ref([
  { id: 1, nom: 'Génie Civil', icon: 'fas fa-hard-hat' },
  { id: 2, nom: 'Génie Mécanique', icon: 'fas fa-cogs' },
  { id: 3, nom: 'Électrotechnique', icon: 'fas fa-bolt' },
  { id: 4, nom: 'Informatique', icon: 'fas fa-laptop-code' },
  { id: 5, nom: 'Gestion', icon: 'fas fa-chart-line' }
]);

// Bac Technique
const bacTech = ref([
  { id: 1, nom: 'Génie Civil', icon: 'fas fa-hard-hat' },
  { id: 2, nom: 'Génie Mécanique', icon: 'fas fa-cogs' },
  { id: 3, nom: 'Électrotechnique', icon: 'fas fa-bolt' },
  { id: 4, nom: 'Informatique', icon: 'fas fa-laptop-code' },
  { id: 5, nom: 'Gestion', icon: 'fas fa-chart-line' }
]);

// Fonction de téléchargement
const downloadEpreuve = (examen, annee, matiere) => {
  const epreuve = {
    id: Date.now(),
    examen: examen,
    annee: annee,
    matiere: matiere,
    dateTelechargement: new Date().toLocaleString(),
    type: 'epreuve'
  };
  
  const existingDownloads = JSON.parse(localStorage.getItem('gradus_epreuves_telechargees') || '[]');
  const existe = existingDownloads.some(e => e.examen === examen && e.annee === annee && e.matiere === matiere);
  
  if (!existe) {
    existingDownloads.push(epreuve);
    localStorage.setItem('gradus_epreuves_telechargees', JSON.stringify(existingDownloads));
    store.dispatch('addTelechargement', epreuve);
  }
  
  alert(` Téléchargement en cours...\n\nExamen: ${examen}\nSession: ${annee}\nMatière/Épreuve: ${matiere}\n\n L'épreuve a été ajoutée à votre tableau de bord.`);
};

const downloadAnnales = (annee) => {
  const epreuve = {
    id: Date.now(),
    examen: 'BEPC',
    annee: annee,
    matiere: 'Annales complètes',
    dateTelechargement: new Date().toLocaleString(),
    type: 'annales'
  };
  
  const existingDownloads = JSON.parse(localStorage.getItem('gradus_epreuves_telechargees') || '[]');
  const existe = existingDownloads.some(e => e.examen === 'BEPC' && e.annee === annee);
  
  if (!existe) {
    existingDownloads.push(epreuve);
    localStorage.setItem('gradus_epreuves_telechargees', JSON.stringify(existingDownloads));
    store.dispatch('addTelechargement', epreuve);
  }
  
  alert(`Téléchargement des annales BEPC ${annee} en cours...`);
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

/* Animation au survol des cartes */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Transition fluide */
.transition {
  transition: all 0.3s ease;
}
</style>
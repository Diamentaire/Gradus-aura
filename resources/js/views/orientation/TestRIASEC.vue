<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO avec image de fond - Style du test QI -->
    <section class="relative overflow-hidden bg-gradient-to-r from-green-700 to-teal-700 py-20">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      
      <!-- Boutons de navigation -->
      <div class="absolute top-4 left-4 z-20 flex gap-3">
        <router-link to="/" class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full px-4 py-2 text-white text-sm font-medium">
          <i class="fas fa-home text-xs"></i>
          <span>Accueil</span>
        </router-link>
        <router-link to="/dashboard" class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full px-4 py-2 text-white text-sm font-medium">
          <i class="fas fa-tachometer-alt text-xs"></i>
          <span>Tableau de bord</span>
        </router-link>
      </div>
      
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-chart-bar text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Test d'orientation</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Test <span class="text-yellow-300">RIASEC</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">
          Découvrez les métiers qui correspondent à votre personnalité
        </p>
        <div class="flex justify-center gap-4 mt-8 flex-wrap">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-clock text-white"></i>
            <span class="text-white text-sm">10 minutes</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-question-circle text-white"></i>
            <span class="text-white text-sm">30 questions</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-line text-white"></i>
            <span class="text-white text-sm">6 profils</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>

    <!-- SECTION STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div v-for="trait in riasecColors" :key="trait.code" class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300" @click="scrollToTrait(trait.code)">
            <div :class="trait.bgCircle" class="w-12 h-12 rounded-full flex items-center justify-center mb-2 group-hover:shadow-lg transition">
              <i :class="trait.icon + ' text-white text-xl'"></i>
            </div>
            <span class="text-xs font-bold" :class="trait.textColor">{{ trait.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-5 py-12">
      <!-- Écran d'accueil -->
      <div v-if="!testStarted && !testFinished" class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <i class="fas fa-chart-bar text-green-600 text-3xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-800">À propos du test RIASEC</h2>
              <p class="text-gray-500">Découvrez vos intérêts professionnels</p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-6 gap-3 mb-8">
            <div v-for="trait in riasecColors" :key="trait.code" class="text-center p-3 rounded-xl" :class="trait.bgLight">
              <i :class="trait.icon + ' text-xl'"></i>
              <p class="font-bold text-xs" :class="trait.textColor">{{ trait.name }}</p>
            </div>
          </div>
          
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p class="text-sm font-semibold text-amber-800 mb-2">
              <i class="fas fa-lightbulb mr-2"></i> Instructions :
            </p>
            <p class="text-xs text-amber-700 mt-1">Pour chaque activité, indiquez votre niveau d'intérêt sur une échelle de 0 à 4. Soyez honnête pour obtenir des recommandations précises.</p>
          </div>
          
          <button @click="startTest" class="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <i class="fas fa-play mr-2"></i> Commencer le test
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Questions du test -->
      <div v-else-if="testStarted && !testFinished" class="max-w-3xl mx-auto">
        <div class="fixed bottom-6 left-6 z-50 flex gap-3">
          <router-link to="/" class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-green-50 transition-all duration-300 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-md">
            <i class="fas fa-home text-xs"></i>
            <span>Accueil</span>
          </router-link>
          <router-link to="/dashboard" class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-green-50 transition-all duration-300 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-md">
            <i class="fas fa-tachometer-alt text-xs"></i>
            <span>Dashboard</span>
          </router-link>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div class="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
            <div class="flex justify-between items-center flex-wrap gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-600/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-question-circle text-green-600"></i>
                </div>
                <span class="text-sm font-semibold text-gray-600">Question {{ currentIndex + 1 }}/{{ questions.length }}</span>
              </div>
              <div class="w-1/2 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div class="bg-gradient-to-r from-green-600 to-teal-600 h-2 rounded-full transition-all duration-500" :style="{ width: ((currentIndex + 1) / questions.length * 100) + '%' }"></div>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-gray-800 leading-relaxed">{{ questions[currentIndex].text }}</h3>
            </div>
            
            <div class="grid grid-cols-5 gap-3 mb-8">
              <div v-for="(label, idx) in ['Pas du tout', 'Peu', 'Moyennement', 'Beaucoup', 'Énormément']" :key="idx"
                @click="selectAnswer(idx)"
                :class="[
                  'p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] text-center',
                  selectedAnswer === idx 
                    ? 'border-green-600 bg-gradient-to-r from-green-600/10 to-teal-50 shadow-md' 
                    : 'border-gray-200 hover:border-green-400/50 hover:bg-gray-50'
                ]">
                <span class="text-sm font-medium">{{ label }}</span>
              </div>
            </div>
            
            <div class="flex justify-between gap-4">
              <button @click="prevQuestion" :disabled="currentIndex === 0" 
                class="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-all font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Précédent
              </button>
              <button @click="nextQuestion" 
                class="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2 transform hover:scale-105">
                {{ currentIndex === questions.length - 1 ? 'Terminer' : 'Suivant' }}
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Résultats -->
      <div v-else-if="testFinished" class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div class="relative bg-gradient-to-r from-green-600 to-teal-600 p-10 text-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=400&h=200&fit=crop')] bg-cover bg-center"></div>
            </div>
            <div class="relative z-10">
              <div class="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-5 animate-bounce">
                <i class="fas fa-chart-bar text-white text-4xl"></i>
              </div>
              <h2 class="text-3xl font-bold text-white mb-2">Vos intérêts RIASEC</h2>
              <p class="text-green-100">Découvrez les métiers qui vous correspondent</p>
            </div>
          </div>
          
          <div class="p-8">
            <div class="flex justify-end gap-3 mb-6">
              <router-link to="/" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-green-100 hover:text-green-700 transition">
                <i class="fas fa-home"></i>
                <span>Accueil</span>
              </router-link>
              <router-link to="/dashboard" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-green-100 hover:text-green-700 transition">
                <i class="fas fa-tachometer-alt"></i>
                <span>Tableau de bord</span>
              </router-link>
            </div>
            
            <div class="grid md:grid-cols-6 gap-4 mb-8">
              <div v-for="trait in riasecScores" :key="trait.code" class="text-center p-3 rounded-xl" :class="trait.bgColor">
                <i :class="trait.icon + ' text-2xl mb-2'"></i>
                <p class="font-bold text-sm" :class="trait.textColor">{{ trait.name }}</p>
                <div class="w-full bg-white/30 rounded-full h-2 mt-2">
                  <div class="h-2 rounded-full transition-all" :class="trait.barColor" :style="{ width: trait.score + '%' }"></div>
                </div>
                <p class="text-lg font-bold mt-2" :class="trait.textColor">{{ trait.score }}%</p>
              </div>
            </div>
            
            <div class="border-t pt-6">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i class="fas fa-chart-line text-green-600"></i> Top 3 de vos domaines d'intérêt
              </h3>
              <div class="space-y-3 mb-6">
                <div v-for="(top, idx) in topThree" :key="idx" class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition">
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">{{ idx + 1 }}</div>
                  <div class="flex-1">
                    <p class="font-semibold">{{ top.name }}</p>
                    <div class="w-full bg-gray-200 rounded-full h-1.5">
                      <div class="bg-green-600 h-1.5 rounded-full" :style="{ width: top.score + '%' }"></div>
                    </div>
                  </div>
                  <span class="text-lg font-bold text-green-600">{{ top.score }}%</span>
                </div>
              </div>
              
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 mb-6 border border-green-200">
                <h4 class="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <i class="fas fa-briefcase text-green-600"></i> Métiers recommandés
                </h4>
                <div class="grid md:grid-cols-2 gap-3">
                  <div v-for="job in recommendedJobs" :key="job.title" class="flex items-start gap-2 p-2 hover:bg-white rounded-lg transition">
                    <i class="fas fa-check-circle text-green-600 mt-1"></i>
                    <div>
                      <p class="font-medium text-sm">{{ job.title }}</p>
                      <p class="text-xs text-gray-500">{{ job.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 mb-6 border border-blue-200">
                <h4 class="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <i class="fas fa-graduation-cap text-blue-600"></i> Formations recommandées
                </h4>
                <ul class="grid md:grid-cols-2 gap-2">
                  <li v-for="formation in recommendedTrainings" :key="formation" class="flex items-center gap-2 text-sm text-blue-700">
                    <i class="fas fa-chevron-right text-blue-500 text-xs"></i> {{ formation }}
                  </li>
                </ul>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="saveAllResults" class="flex-1 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  <i class="fas fa-check-circle"></i> Terminer l'orientation
                </button>
                <button @click="saveResults" class="flex-1 py-3 border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                  <i class="fas fa-download"></i> Sauvegarder
                </button>
                <router-link to="/dashboard" class="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <i class="fas fa-tachometer-alt"></i> Mon tableau de bord
                </router-link>
              </div>
            </div>
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

const testStarted = ref(false);
const testFinished = ref(false);
const currentIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref([]);

// Couleurs RIASEC
const riasecColors = [
  { code: 'R', name: 'Réaliste', icon: 'fas fa-tools', bgCircle: 'bg-red-500', bgLight: 'bg-red-50', textColor: 'text-red-700', barColor: 'bg-red-500' },
  { code: 'I', name: 'Investigateur', icon: 'fas fa-microscope', bgCircle: 'bg-blue-500', bgLight: 'bg-blue-50', textColor: 'text-blue-700', barColor: 'bg-blue-500' },
  { code: 'A', name: 'Artistique', icon: 'fas fa-palette', bgCircle: 'bg-purple-500', bgLight: 'bg-purple-50', textColor: 'text-purple-700', barColor: 'bg-purple-500' },
  { code: 'S', name: 'Social', icon: 'fas fa-handshake', bgCircle: 'bg-yellow-500', bgLight: 'bg-yellow-50', textColor: 'text-yellow-700', barColor: 'bg-yellow-500' },
  { code: 'E', name: 'Entreprenant', icon: 'fas fa-chart-line', bgCircle: 'bg-green-500', bgLight: 'bg-green-50', textColor: 'text-green-700', barColor: 'bg-green-500' },
  { code: 'C', name: 'Conventionnel', icon: 'fas fa-folder-open', bgCircle: 'bg-indigo-500', bgLight: 'bg-indigo-50', textColor: 'text-indigo-700', barColor: 'bg-indigo-500' }
];

const questions = ref([
  { id: 1, text: 'Travailler avec des machines ou des outils', category: 'R' },
  { id: 2, text: 'Faire des expériences scientifiques', category: 'I' },
  { id: 3, text: 'Créer des œuvres artistiques', category: 'A' },
  { id: 4, text: 'Aider et conseiller les autres', category: 'S' },
  { id: 5, text: 'Vendre des produits ou des idées', category: 'E' },
  { id: 6, text: 'Organiser des données ou des fichiers', category: 'C' },
  { id: 7, text: 'Réparer des équipements électroniques', category: 'R' },
  { id: 8, text: 'Résoudre des problèmes mathématiques', category: 'I' },
  { id: 9, text: 'Écrire des histoires ou des poèmes', category: 'A' },
  { id: 10, text: 'Enseigner à des étudiants', category: 'S' },
  { id: 11, text: 'Lancer mon propre business', category: 'E' },
  { id: 12, text: 'Gérer un emploi du temps ou des budgets', category: 'C' },
  { id: 13, text: 'Construire des meubles ou des structures', category: 'R' },
  { id: 14, text: 'Analyser des données statistiques', category: 'I' },
  { id: 15, text: 'Dessiner ou peindre', category: 'A' },
  { id: 16, text: 'Travailler dans un hôpital ou une école', category: 'S' },
  { id: 17, text: 'Diriger une équipe ou un projet', category: 'E' },
  { id: 18, text: 'Classer des documents ou des archives', category: 'C' },
  { id: 19, text: 'Utiliser des outils informatiques', category: 'R' },
  { id: 20, text: 'Faire des recherches en laboratoire', category: 'I' },
  { id: 21, text: 'Designer des sites web ou des applications', category: 'A' },
  { id: 22, text: 'Travailler avec des enfants ou des personnes âgées', category: 'S' },
  { id: 23, text: 'Négocier des contrats', category: 'E' },
  { id: 24, text: 'Vérifier des comptes ou des factures', category: 'C' },
  { id: 25, text: 'Jardiner ou travailler en extérieur', category: 'R' },
  { id: 26, text: 'Étudier les étoiles ou l\'univers', category: 'I' },
  { id: 27, text: 'Jouer d\'un instrument de musique', category: 'A' },
  { id: 28, text: 'Participer à des activités caritatives', category: 'S' },
  { id: 29, text: 'Organiser des événements', category: 'E' },
  { id: 30, text: 'Utiliser des logiciels de bureautique', category: 'C' }
]);

const riasecScores = ref([
  { code: 'R', name: 'Réaliste', icon: 'fas fa-tools', score: 0, bgColor: 'bg-red-50', textColor: 'text-red-700', barColor: 'bg-red-500' },
  { code: 'I', name: 'Investigateur', icon: 'fas fa-microscope', score: 0, bgColor: 'bg-blue-50', textColor: 'text-blue-700', barColor: 'bg-blue-500' },
  { code: 'A', name: 'Artistique', icon: 'fas fa-palette', score: 0, bgColor: 'bg-purple-50', textColor: 'text-purple-700', barColor: 'bg-purple-500' },
  { code: 'S', name: 'Social', icon: 'fas fa-handshake', score: 0, bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', barColor: 'bg-yellow-500' },
  { code: 'E', name: 'Entreprenant', icon: 'fas fa-chart-line', score: 0, bgColor: 'bg-green-50', textColor: 'text-green-700', barColor: 'bg-green-500' },
  { code: 'C', name: 'Conventionnel', icon: 'fas fa-folder-open', score: 0, bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', barColor: 'bg-indigo-500' }
]);

const scrollToTrait = (code) => {
  if (testFinished.value) {
    const element = document.querySelector(`[data-trait="${code}"]`);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
};

const startTest = () => {
  testStarted.value = true;
  userAnswers.value = [];
  currentIndex.value = 0;
  selectedAnswer.value = null;
};

const selectAnswer = (value) => {
  selectedAnswer.value = value;
};

const nextQuestion = () => {
  if (selectedAnswer.value === null) {
    alert('Veuillez sélectionner une réponse');
    return;
  }
  
  userAnswers.value[currentIndex.value] = selectedAnswer.value;
  selectedAnswer.value = null;
  
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  } else {
    finishTest();
  }
};

const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    selectedAnswer.value = userAnswers.value[currentIndex.value] ?? null;
  }
};

const finishTest = () => {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  questions.value.forEach((q, idx) => {
    const answer = userAnswers.value[idx];
    if (answer !== undefined) {
      scores[q.category] += answer;
      counts[q.category]++;
    }
  });
  
  riasecScores.value.forEach(score => {
    const maxPossible = counts[score.code] * 4;
    if (maxPossible > 0) {
      score.score = Math.round((scores[score.code] / maxPossible) * 100);
    } else {
      score.score = 0;
    }
  });
  
  testStarted.value = false;
  testFinished.value = true;
};

const topThree = computed(() => {
  return [...riasecScores.value].sort((a, b) => b.score - a.score).slice(0, 3);
});

const recommendedJobs = computed(() => {
  const topCodes = topThree.value.map(t => t.code);
  const jobsMap = {
    R: { title: 'Ingénieur / Technicien', description: 'Travail concret avec des outils et machines' },
    I: { title: 'Chercheur / Scientifique', description: 'Analyse, expérimentation et découverte' },
    A: { title: 'Designer / Artiste', description: 'Création et expression artistique' },
    S: { title: 'Enseignant / Psychologue', description: 'Aide et accompagnement des personnes' },
    E: { title: 'Entrepreneur / Manager', description: 'Leadership et développement commercial' },
    C: { title: 'Comptable / Administratif', description: 'Organisation et gestion de données' }
  };
  
  const jobs = [];
  for (const code of topCodes) {
    if (jobsMap[code]) {
      jobs.push(jobsMap[code]);
    }
  }
  return jobs;
});

const recommendedTrainings = computed(() => {
  const topCode = topThree.value[0]?.code;
  const trainingsMap = {
    R: ['BTS Maintenance industrielle', 'Licence Professionnelle Mécanique', 'DUT Génie mécanique', 'CAP Métallurgie'],
    I: ['Licence Biologie', 'Master Chimie', 'Doctorat en Physique', 'BTS Laboratoire'],
    A: ['BTS Design graphique', 'Licence Arts plastiques', 'Master Création numérique', 'École d\'art'],
    S: ['BTS Économie sociale', 'Licence Psychologie', 'Master MEEF Enseignement', 'DEASS'],
    E: ['BTS Négociation', 'Licence Commerce', 'Master Entrepreneuriat', 'École de commerce'],
    C: ['BTS Comptabilité', 'Licence Administration', 'Master Contrôle de gestion', 'DCG']
  };
  return trainingsMap[topCode] || ['BTS Général', 'Licence', 'Master', 'Formation professionnelle'];
});

const saveResults = () => {
  const results = {
    test: 'RIASEC',
    scores: riasecScores.value,
    topThree: topThree.value,
    date: new Date().toISOString()
  };
  localStorage.setItem('riasec_test_result', JSON.stringify(results));
  alert('Résultats sauvegardés dans votre profil !');
};

const saveAllResults = () => {
  const qiResult = localStorage.getItem('qi_test_result');
  const discResult = localStorage.getItem('disc_test_result');
  const riasecResult = {
    scores: riasecScores.value,
    topThree: topThree.value,
    date: new Date().toISOString()
  };
  
  const fullOrientation = {
    qi: qiResult ? JSON.parse(qiResult) : null,
    disc: discResult ? JSON.parse(discResult) : null,
    riasec: riasecResult,
    completedAt: new Date().toISOString()
  };
  
  localStorage.setItem('orientation_complete', JSON.stringify(fullOrientation));
  
  alert('Félicitations ! Votre bilan d\'orientation est complet.\n\nVous allez être redirigé vers vos recommandations personnalisées.');
  router.push('/orientation/resultats');
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #10B981 0%, #14B8A6 100%);
}

.text-primary { color: #10B981; }
.bg-primary { background-color: #10B981; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO avec image de fond - Style du test QI -->
    <section class="relative overflow-hidden bg-gradient-to-r from-purple-700 to-pink-700 py-20">
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
          <i class="fas fa-chart-line text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Test comportemental</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Test <span class="text-yellow-300">DISC</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">
          Découvrez votre profil comportemental et apprenez à mieux communiquer
        </p>
        <div class="flex justify-center gap-4 mt-8 flex-wrap">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-clock text-white"></i>
            <span class="text-white text-sm">15 minutes</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-question-circle text-white"></i>
            <span class="text-white text-sm">24 questions</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-line text-white"></i>
            <span class="text-white text-sm">4 profils</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>

    <!-- SECTION STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div v-for="trait in discColors" :key="trait.code" class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300" @click="scrollToTrait(trait.code)">
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
            <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
              <i class="fas fa-chart-line text-purple-600 text-3xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-800">À propos du test DISC</h2>
              <p class="text-gray-500">Découvrez votre style comportemental</p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-4 gap-3 mb-8">
            <div v-for="trait in discColors" :key="trait.code" class="text-center p-3 rounded-xl" :class="trait.bgLight">
              <i :class="trait.icon + ' text-xl'"></i>
              <p class="font-bold text-xs" :class="trait.textColor">{{ trait.name }}</p>
            </div>
          </div>
          
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p class="text-sm font-semibold text-amber-800 mb-2">
              <i class="fas fa-lightbulb mr-2"></i> Instructions :
            </p>
            <ul class="text-xs text-amber-700 mt-2 space-y-1 list-disc list-inside">
              <li>Pour chaque question, choisissez la réponse qui vous correspond le mieux</li>
              <li>Répondez spontanément, sans trop réfléchir</li>
              <li>Soyez honnête pour obtenir des résultats précis</li>
            </ul>
          </div>
          
          <button @click="startTest" class="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <i class="fas fa-play mr-2"></i> Commencer le test
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Questions du test -->
      <div v-else-if="testStarted && !testFinished" class="max-w-3xl mx-auto">
        <div class="fixed bottom-6 left-6 z-50 flex gap-3">
          <router-link to="/" class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-purple-50 transition-all duration-300 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-md">
            <i class="fas fa-home text-xs"></i>
            <span>Accueil</span>
          </router-link>
          <router-link to="/dashboard" class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-purple-50 transition-all duration-300 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-md">
            <i class="fas fa-tachometer-alt text-xs"></i>
            <span>Dashboard</span>
          </router-link>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div class="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
            <div class="flex justify-between items-center flex-wrap gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-purple-600/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-question-circle text-purple-600"></i>
                </div>
                <span class="text-sm font-semibold text-gray-600">Question {{ currentIndex + 1 }}/{{ questions.length }}</span>
              </div>
              <div class="w-1/2 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div class="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500" :style="{ width: ((currentIndex + 1) / questions.length * 100) + '%' }"></div>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-gray-800 leading-relaxed">{{ questions[currentIndex].text }}</h3>
            </div>
            
            <div class="space-y-3 mb-8">
              <div v-for="(opt, idx) in questions[currentIndex].options" :key="idx" 
                @click="selectAnswer(idx)"
                :class="[
                  'p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]',
                  selectedAnswer === idx 
                    ? 'border-purple-600 bg-gradient-to-r from-purple-600/10 to-pink-50 shadow-md' 
                    : 'border-gray-200 hover:border-purple-400/50 hover:bg-gray-50'
                ]">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center" 
                    :class="selectedAnswer === idx ? 'border-purple-600 bg-purple-600' : 'border-gray-400'">
                    <div v-if="selectedAnswer === idx" class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span class="text-gray-700">{{ opt }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between gap-4">
              <button @click="prevQuestion" :disabled="currentIndex === 0" 
                class="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-all font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Précédent
              </button>
              <button @click="nextQuestion" 
                class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2 transform hover:scale-105">
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
          <div class="relative bg-gradient-to-r from-purple-600 to-pink-600 p-10 text-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=400&h=200&fit=crop')] bg-cover bg-center"></div>
            </div>
            <div class="relative z-10">
              <div class="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-5 animate-bounce">
                <i class="fas fa-chart-line text-white text-4xl"></i>
              </div>
              <h2 class="text-3xl font-bold text-white mb-2">Votre profil DISC</h2>
              <p class="text-purple-100">Découvrez votre style comportemental dominant</p>
            </div>
          </div>
          
          <div class="p-8">
            <div class="flex justify-end gap-3 mb-6">
              <router-link to="/" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition">
                <i class="fas fa-home"></i>
                <span>Accueil</span>
              </router-link>
              <router-link to="/dashboard" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition">
                <i class="fas fa-tachometer-alt"></i>
                <span>Tableau de bord</span>
              </router-link>
            </div>
            
            <div class="grid md:grid-cols-4 gap-4 mb-8">
              <div v-for="trait in discScores" :key="trait.code" class="text-center p-3 rounded-xl" :class="trait.bgColor">
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
                <i class="fas fa-chart-line text-purple-600"></i> Votre profil dominant : <span class="text-purple-600">{{ dominantProfile.name }}</span>
              </h3>
              
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 mb-6 border border-purple-200">
                <h4 class="font-bold text-purple-800 mb-3 flex items-center gap-2">
                  <i class="fas fa-user-check text-purple-600"></i> Description de votre profil
                </h4>
                <p class="text-gray-700 leading-relaxed">{{ dominantProfile.description }}</p>
              </div>
              
              <div class="grid md:grid-cols-2 gap-4 mb-6">
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <h4 class="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <i class="fas fa-star text-green-600"></i> Points forts
                  </h4>
                  <ul class="space-y-1">
                    <li v-for="point in strengths" :key="point" class="flex items-center gap-2 text-sm text-green-700">
                      <i class="fas fa-check-circle text-green-500 text-xs"></i> {{ point }}
                    </li>
                  </ul>
                </div>
                
                <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
                  <h4 class="font-bold text-amber-800 mb-2 flex items-center gap-2">
                    <i class="fas fa-chart-line text-amber-600"></i> Axes d'amélioration
                  </h4>
                  <ul class="space-y-1">
                    <li v-for="point in improvements" :key="point" class="flex items-center gap-2 text-sm text-amber-700">
                      <i class="fas fa-arrow-right text-amber-500 text-xs"></i> {{ point }}
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 mb-6 border border-blue-200">
                <h4 class="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <i class="fas fa-briefcase text-blue-600"></i> Métiers recommandés
                </h4>
                <div class="grid md:grid-cols-2 gap-2">
                  <div v-for="job in recommendedJobs" :key="job" class="flex items-center gap-2 text-sm text-blue-700">
                    <i class="fas fa-chevron-right text-blue-500 text-xs"></i> {{ job }}
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="saveAllResults" class="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  <i class="fas fa-check-circle"></i> Terminer l'orientation
                </button>
                <button @click="saveResults" class="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
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

// Couleurs DISC
const discColors = [
  { code: 'D', name: 'Dominance', icon: 'fas fa-crown', bgCircle: 'bg-red-500', bgLight: 'bg-red-50', textColor: 'text-red-700', barColor: 'bg-red-500' },
  { code: 'I', name: 'Influence', icon: 'fas fa-users', bgCircle: 'bg-yellow-500', bgLight: 'bg-yellow-50', textColor: 'text-yellow-700', barColor: 'bg-yellow-500' },
  { code: 'S', name: 'Stabilité', icon: 'fas fa-hand-peace', bgCircle: 'bg-green-500', bgLight: 'bg-green-50', textColor: 'text-green-700', barColor: 'bg-green-500' },
  { code: 'C', name: 'Conformité', icon: 'fas fa-clipboard-list', bgCircle: 'bg-blue-500', bgLight: 'bg-blue-50', textColor: 'text-blue-700', barColor: 'bg-blue-500' }
];

// 24 questions complexes pour le test DISC
const questions = ref([
  { id: 1, text: 'En équipe, je préfère :', options: ['Prendre les décisions rapidement', 'Motiver les autres', 'Écouter et soutenir', 'Analyser toutes les options'], category: 'D' },
  { id: 2, text: 'Face à un conflit, je :', options: ['Affronte directement', 'Utilise l\'humour pour désamorcer', 'Cherche un compromis', 'Analyse les causes profondes'], category: 'D' },
  { id: 3, text: 'Dans un projet, mon rôle naturel est :', options: ['Leader et décideur', 'Communicateur et rassembleur', 'Exécutant fiable', 'Contrôleur qualité'], category: 'D' },
  { id: 4, text: 'Je préfère travailler :', options: ['Avec des objectifs ambitieux', 'En équipe dynamique', 'Dans un environnement stable', 'Avec des règles claires'], category: 'D' },
  { id: 5, text: 'Mon principal atout est :', options: ['Ma détermination', 'Mon charisme', 'Ma fiabilité', 'Ma rigueur'], category: 'I' },
  { id: 6, text: 'Je réagis face aux critiques :', options: ['En me défendant', 'En les prenant avec humour', 'En les acceptant', 'En les analysant'], category: 'I' },
  { id: 7, text: 'En situation de stress, je deviens :', options: ['Impatient', 'Bavard', 'Silencieux', 'Méticuleux'], category: 'I' },
  { id: 8, text: 'Je valorise chez mes collègues :', options: ['L\'efficacité', 'La convivialité', 'La loyauté', 'La précision'], category: 'I' },
  { id: 9, text: 'Ma plus grande peur est :', options: ['Perdre le contrôle', 'Être rejeté', 'Le changement brutal', 'Faire des erreurs'], category: 'S' },
  { id: 10, text: 'Je prends des risques :', options: ['Facilement', 'Si je suis entouré', 'Rarement', 'Après calcul'], category: 'S' },
  { id: 11, text: 'Dans une réunion, je :', options: ['Prends la parole souvent', 'Anime les débats', 'Écoute attentivement', 'Prends des notes'], category: 'S' },
  { id: 12, text: 'Je suis motivé par :', options: ['La réussite', 'La reconnaissance', 'La stabilité', 'La perfection'], category: 'S' },
  { id: 13, text: 'Mon rythme de travail est :', options: ['Rapide', 'Variable', 'Régulier', 'Méthodique'], category: 'C' },
  { id: 14, text: 'Je gère mon temps :', options: ['En priorisant l\'urgent', 'En m\'adaptant', 'En suivant un planning', 'En respectant les délais'], category: 'C' },
  { id: 15, text: 'Je préfère les consignes :', options: ['Globales', 'Suggestives', 'Claires', 'Détaillées'], category: 'C' },
  { id: 16, text: 'Mon environnement idéal est :', options: ['Compétitif', 'Social', 'Paisible', 'Structuré'], category: 'C' },
  { id: 17, text: 'Face à l\'échec, je :', options: ['Me relève plus fort', 'En ris', 'M\'en veux', 'Analyse pourquoi'], category: 'D' },
  { id: 18, text: 'En réunion, mon style est :', options: ['Directif', 'Persuasif', 'Diplomate', 'Précis'], category: 'I' },
  { id: 19, text: 'Je délégué facilement :', options: ['Oui, avec contrôle', 'Oui, avec confiance', 'Avec difficulté', 'Avec des consignes'], category: 'S' },
  { id: 20, text: 'Je change d\'avis :', options: ['Rarement', 'Facilement', 'Difficilement', 'Après analyse'], category: 'C' },
  { id: 21, text: 'Mon style de communication est :', options: ['Direct', 'Chaleureux', 'Calme', 'Précis'], category: 'D' },
  { id: 22, text: 'Je gère les imprévus :', options: ['Bien', 'En m\'adaptant', 'Avec difficulté', 'En planifiant'], category: 'I' },
  { id: 23, text: 'Je préfère les décisions :', options: ['Rapides', 'Partagées', 'Réfléchies', 'Justifiées'], category: 'S' },
  { id: 24, text: 'Mon style de leadership est :', options: ['Directif', 'Participatif', 'Délégatif', 'Consultatif'], category: 'D' }
]);

const discScores = ref([
  { code: 'D', name: 'Dominance', icon: 'fas fa-crown', score: 0, bgColor: 'bg-red-50', textColor: 'text-red-700', barColor: 'bg-red-500' },
  { code: 'I', name: 'Influence', icon: 'fas fa-users', score: 0, bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', barColor: 'bg-yellow-500' },
  { code: 'S', name: 'Stabilité', icon: 'fas fa-hand-peace', score: 0, bgColor: 'bg-green-50', textColor: 'text-green-700', barColor: 'bg-green-500' },
  { code: 'C', name: 'Conformité', icon: 'fas fa-clipboard-list', score: 0, bgColor: 'bg-blue-50', textColor: 'text-blue-700', barColor: 'bg-blue-500' }
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
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  const counts = { D: 0, I: 0, S: 0, C: 0 };
  
  questions.value.forEach((q, idx) => {
    const answer = userAnswers.value[idx];
    if (answer !== undefined) {
      scores[q.category] += answer;
      counts[q.category]++;
    }
  });
  
  discScores.value.forEach(score => {
    const maxPossible = counts[score.code] * 3;
    if (maxPossible > 0) {
      score.score = Math.round((scores[score.code] / maxPossible) * 100);
    } else {
      score.score = 0;
    }
  });
  
  testStarted.value = false;
  testFinished.value = true;
};

const dominantProfile = computed(() => {
  const sorted = [...discScores.value].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  
  const profiles = {
    D: { name: 'Dominance', description: 'Vous êtes orienté résultats, ambitieux et aimez les défis. Vous prenez des risques calculés et n\'avez pas peur des conflits. Votre leadership est naturel et vous inspirez le respect.' },
    I: { name: 'Influence', description: 'Vous êtes sociable, optimiste et enthousiaste. Vous aimez travailler en équipe, motiver les autres et créer une atmosphère positive. Votre charisme attire naturellement les gens.' },
    S: { name: 'Stabilité', description: 'Vous êtes calme, patient et fiable. Vous appréciez la stabilité, la routine et les environnements harmonieux. Vous êtes un excellent auditeur et un collègue sur qui on peut compter.' },
    C: { name: 'Conformité', description: 'Vous êtes analytique, précis et méthodique. Vous aimez les règles, les procédures et la qualité. Votre rigueur vous permet d\'éviter les erreurs et de produire un travail de qualité.' }
  };
  
  return profiles[top.code] || profiles.D;
});

const strengths = computed(() => {
  const topCode = [...discScores.value].sort((a, b) => b.score - a.score)[0].code;
  const strengthsMap = {
    D: ['Prise de décision rapide', 'Leadership naturel', 'Orientation résultats', 'Capacité à surmonter les obstacles'],
    I: ['Capacité à motiver les autres', 'Optimisme contagieux', 'Réseautage efficace', 'Adaptabilité sociale'],
    S: ['Fiabilité et loyauté', 'Capacité d\'écoute', 'Patience et persévérance', 'Stabilité émotionnelle'],
    C: ['Rigueur et précision', 'Analyse approfondie', 'Respect des procédures', 'Qualité du travail']
  };
  return strengthsMap[topCode] || strengthsMap.D;
});

const improvements = computed(() => {
  const topCode = [...discScores.value].sort((a, b) => b.score - a.score)[0].code;
  const improvementsMap = {
    D: ['Peut être perçu comme autoritaire', 'Manque parfois de patience', 'Tendance à négliger les détails'],
    I: ['Peut manquer de suivi', 'Tendance à surestimer ses capacités', 'Difficulté avec les tâches répétitives'],
    S: ['Résistance au changement', 'Tendance à éviter les conflits', 'Peut manquer d\'initiative'],
    C: ['Peut être trop perfectionniste', 'Difficulté à déléguer', 'Tendance à l\'analyse excessive']
  };
  return improvementsMap[topCode] || improvementsMap.D;
});

const recommendedJobs = computed(() => {
  const topCode = [...discScores.value].sort((a, b) => b.score - a.score)[0].code;
  const jobsMap = {
    D: ['Chef d\'entreprise', 'Directeur commercial', 'Avocat', 'Policier', 'Entrepreneur'],
    I: ['Commercial', 'Community Manager', 'Journaliste', 'Animateur', 'Coach'],
    S: ['Enseignant', 'Psychologue', 'Assistant social', 'Infirmier', 'RH'],
    C: ['Comptable', 'Ingénieur qualité', 'Analyste financier', 'Chercheur', 'Auditeur']
  };
  return jobsMap[topCode] || jobsMap.D;
});

const saveResults = () => {
  const results = {
    test: 'DISC',
    scores: discScores.value,
    dominant: dominantProfile.value,
    date: new Date().toISOString()
  };
  localStorage.setItem('disc_test_result', JSON.stringify(results));
  alert('Résultats sauvegardés dans votre profil !');
};

const saveAllResults = () => {
  const qiResult = localStorage.getItem('qi_test_result');
  const riasecResult = localStorage.getItem('riasec_test_result');
  const discResult = {
    scores: discScores.value,
    dominant: dominantProfile.value,
    date: new Date().toISOString()
  };
  
  const fullOrientation = {
    qi: qiResult ? JSON.parse(qiResult) : null,
    riasec: riasecResult ? JSON.parse(riasecResult) : null,
    disc: discResult,
    completedAt: new Date().toISOString()
  };
  
  localStorage.setItem('orientation_complete', JSON.stringify(fullOrientation));
  
  alert('Félicitations ! Votre bilan d\'orientation est complet.\n\nVous allez être redirigé vers vos recommandations personnalisées.');
  router.push('/orientation/resultats');
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
}

.text-primary { color: #8B5CF6; }
.bg-primary { background-color: #8B5CF6; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-20">
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
          <i class="fas fa-brain text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Test psychotechnique</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Test de <span class="text-yellow-300">QI et logique</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">
          Évaluez vos capacités cognitives : raisonnement logique, mémoire, rapidité de calcul, culture générale camerounaise et résolution de problèmes complexes.
        </p>
        <div class="flex justify-center gap-4 mt-8 flex-wrap">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-clock text-white"></i>
            <span class="text-white text-sm">45 minutes</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-question-circle text-white"></i>
            <span class="text-white text-sm">20 questions</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-line text-white"></i>
            <span class="text-white text-sm">Difficulté élevée</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>

    <!-- SECTION STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">

        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-puzzle-piece text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">20</span>
            <span class="text-xs text-gray-500">Questions</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-clock text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">45</span>
            <span class="text-xs text-gray-500">Minutes</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-chart-line text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">5</span>
            <span class="text-xs text-gray-500">Catégories</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-trophy text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">5000+</span>
            <span class="text-xs text-gray-500">Tests réalisés</span>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-5 py-12">
      <!-- Page d'accueil avant test -->
      <div v-if="!testStarted" class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <i class="fas fa-info-circle text-primary text-3xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-800">À propos du test</h2>
              <p class="text-gray-500">Évaluez vos capacités intellectuelles</p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4 mb-8">
            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
              <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <i class="fas fa-clock text-primary text-lg"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-800">Durée</p>
                <p class="text-sm text-gray-500">45 minutes</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
              <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <i class="fas fa-question-circle text-primary text-lg"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-800">Questions</p>
                <p class="text-sm text-gray-500">20 questions</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
              <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <i class="fas fa-chart-line text-primary text-lg"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-800">Difficulté</p>
                <p class="text-sm text-gray-500">Élevée / Complexe</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition">
              <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <i class="fas fa-dice-d6 text-primary text-lg"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-800">Catégories</p>
                <p class="text-sm text-gray-500">Logique, mémoire, calcul, actualité</p>
              </div>
            </div>
          </div>
          
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p class="text-sm font-semibold text-amber-800 mb-2">
              <i class="fas fa-lightbulb mr-2"></i> Conseils :
            </p>
            <ul class="text-xs text-amber-700 mt-2 space-y-1 list-disc list-inside">
              <li>Prenez le temps de bien lire chaque question</li>
              <li>Certaines questions nécessitent une réflexion approfondie</li>
              <li>La culture générale camerounaise est testée</li>
              <li>Ne passez pas trop de temps sur une question difficile</li>
            </ul>
          </div>
          
          <button @click="startTest" class="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <i class="fas fa-play mr-2"></i> Commencer le test
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Pendant le test -->
      <div v-else-if="testStarted && !testFinished" class="max-w-3xl mx-auto">
        <div class="fixed bottom-6 left-6 z-50 flex gap-3">
          <router-link to="/" class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-indigo-50 transition-all duration-300 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-md">
            <i class="fas fa-home text-xs"></i>
            <span>Accueil</span>
          </router-link>
          <router-link to="/dashboard" class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-indigo-50 transition-all duration-300 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-md">
            <i class="fas fa-tachometer-alt text-xs"></i>
            <span>Dashboard</span>
          </router-link>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div class="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
            <div class="flex justify-between items-center flex-wrap gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-question-circle text-primary"></i>
                </div>
                <span class="text-sm font-semibold text-gray-600">Question {{ currentIndex + 1 }}/{{ questions.length }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-hourglass-half text-red-600"></i>
                </div>
                <span class="text-sm font-bold font-mono text-primary">{{ formattedTime }}</span>
              </div>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
              <div class="bg-gradient-to-r from-primary to-indigo-600 h-2 rounded-full transition-all duration-500" :style="{ width: ((currentIndex + 1) / questions.length * 100) + '%' }"></div>
            </div>
          </div>
          
          <div class="p-8">
            <div class="mb-6">
              <span class="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-3">
                <i class="fas fa-tag mr-1"></i> {{ getCategoryLabel(questions[currentIndex].category) }}
              </span>
              <h3 class="text-2xl font-bold text-gray-800 leading-relaxed">{{ questions[currentIndex].question }}</h3>
            </div>
            
            <div class="space-y-4 mb-8">
              <div v-for="(opt, idx) in questions[currentIndex].options" :key="idx" 
                @click="selectAnswer(opt)"
                :class="[
                  'p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]',
                  selectedAnswer === opt 
                    ? 'border-primary bg-gradient-to-r from-primary/10 to-indigo-50 shadow-md' 
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                ]">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all" 
                    :class="selectedAnswer === opt ? 'border-primary bg-primary text-white' : 'border-gray-400'">
                    <span class="text-sm font-bold">{{ String.fromCharCode(65 + idx) }}</span>
                  </div>
                  <span class="text-gray-700 text-lg">{{ opt }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between gap-4">
              <button @click="prevQuestion" :disabled="currentIndex === 0" 
                class="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-all font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Précédent
              </button>
              <button @click="nextQuestion" 
                class="px-8 py-3 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2 transform hover:scale-105">
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
          <div class="relative bg-gradient-to-r from-indigo-600 to-cyan-600 p-10 text-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=400&h=200&fit=crop')] bg-cover bg-center"></div>
            </div>
            <div class="relative z-10">
              <div class="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-5 animate-bounce">
                <i class="fas fa-chart-line text-white text-4xl"></i>
              </div>
              <h2 class="text-3xl font-bold text-white mb-2">Votre résultat</h2>
              <p class="text-indigo-100">Analyse de vos capacités cognitives</p>
            </div>
          </div>
          
          <div class="p-8">
            <div class="flex justify-end gap-3 mb-6">
              <router-link to="/" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-indigo-100 hover:text-primary transition">
                <i class="fas fa-home"></i>
                <span>Accueil</span>
              </router-link>
              <router-link to="/dashboard" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-indigo-100 hover:text-primary transition">
                <i class="fas fa-tachometer-alt"></i>
                <span>Tableau de bord</span>
              </router-link>
            </div>
            
            <div class="text-center mb-8">
              <div class="inline-block relative">
                <div class="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center bg-white shadow-lg">
                  <span class="text-5xl font-bold text-primary">{{ totalScore }}/{{ questions.length * 10 }}</span>
                </div>
                <div class="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-3 py-1 text-sm font-bold shadow-md">
                  {{ Math.round(totalScore / (questions.length * 10) * 100) }}%
                </div>
              </div>
              <p class="text-gray-500 mt-4">Score total</p>
            </div>
            
            <div class="grid md:grid-cols-5 gap-4 mb-8">
              <div v-for="category in categories" :key="category.name" class="text-center p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm hover:shadow-md transition">
                <div class="w-10 h-10 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                  <i :class="category.icon" class="text-primary text-lg"></i>
                </div>
                <p class="font-semibold text-gray-800 text-xs">{{ category.name }}</p>
                <p class="text-xl font-bold text-primary">{{ category.score }}%</p>
              </div>
            </div>
            
            <div class="border-t pt-6">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i class="fas fa-graduation-cap text-primary"></i> Analyse et recommandations
              </h3>
              <p class="text-gray-600 mb-6 leading-relaxed">{{ analysis }}</p>
              
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
                    <i class="fas fa-chart-line text-amber-600"></i> Points à améliorer
                  </h4>
                  <ul class="space-y-1">
                    <li v-for="point in weaknesses" :key="point" class="flex items-center gap-2 text-sm text-amber-700">
                      <i class="fas fa-arrow-right text-amber-500 text-xs"></i> {{ point }}
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="redirectToRIASEC" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                  <i class="fas fa-arrow-right"></i> Passer le test RIASEC
                </button>
                <button @click="saveResults" class="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
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
import { ref, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const testStarted = ref(false);
const testFinished = ref(false);
const currentIndex = ref(0);
const selectedAnswer = ref('');
const userAnswers = ref([]);
const totalScore = ref(0);
const timeLeft = ref(2700);
let timer = null;

const getCategoryLabel = (category) => {
  const labels = {
    logique: '🧠 Raisonnement logique',
    memory: '📝 Mémoire et concentration',
    calcul: '🔢 Calcul mental avancé',
    actualite: '📰 Actualité Cameroun',
    culture: '🌍 Culture générale'
  };
  return labels[category] || category;
};

// 20 questions complexes et d'actualité au Cameroun
const questions = ref([
  // 1. Logique
  {
    id: 1,
    category: 'logique',
    question: 'Dans une course, si vous dépassez la deuxième personne, à quelle position êtes-vous ?',
    options: ['Premier', 'Deuxième', 'Troisième', 'Dernier'],
    correct: 'Deuxième',
    explanation: 'Si vous dépassez la deuxième personne, vous prenez sa place, vous êtes donc deuxième.'
  },
  // 2. Logique
  {
    id: 2,
    category: 'logique',
    question: 'Un père a 4 enfants : Nana, Néné, Nini, ? Quel est le nom du quatrième enfant ?',
    options: ['Nono', 'Nunu', 'Nana', 'Néné'],
    correct: 'Nono',
    explanation: 'Les noms suivent le pattern des voyelles : A, É, I, O, U'
  },
  // 3. Calcul
  {
    id: 3,
    category: 'calcul',
    question: 'Si 3 ouvriers mettent 6 heures pour creuser une tranchée de 12 mètres, combien de temps mettront 6 ouvriers pour creuser une tranchée de 24 mètres ?',
    options: ['3 heures', '6 heures', '9 heures', '12 heures'],
    correct: '6 heures',
    explanation: '3 ouvriers → 12m en 6h → 1 ouvrier → 12m en 18h. Pour 24m : 1 ouvrier → 36h. Avec 6 ouvriers → 36/6 = 6h.'
  },
  // 4. Actualité Cameroun
  {
    id: 4,
    category: 'actualite',
    question: 'Qui est l\'actuel Premier Ministre du Cameroun (2025) ?',
    options: ['Joseph Dion Ngute', 'Philémon Yang', 'Peter Mafany Musonge', 'Ephraïm Inoni'],
    correct: 'Joseph Dion Ngute',
    explanation: 'Joseph Dion Ngute est Premier Ministre depuis le 4 janvier 2019.'
  },
  // 5. Logique
  {
    id: 5,
    category: 'logique',
    question: 'Si 5 machines fabriquent 5 objets en 5 minutes, combien de temps faudrait-il à 100 machines pour fabriquer 100 objets ?',
    options: ['5 minutes', '10 minutes', '20 minutes', '100 minutes'],
    correct: '5 minutes',
    explanation: '1 machine fabrique 1 objet en 5 minutes, donc 100 machines fabriquent 100 objets en 5 minutes.'
  },
  // 6. Culture Cameroun
  {
    id: 6,
    category: 'culture',
    question: 'Quel est le surnom de l\'équipe nationale de football du Cameroun ?',
    options: ['Les Lions Indomptables', 'Les Éléphants', 'Les Panthères', 'Les Aigles'],
    correct: 'Les Lions Indomptables',
    explanation: 'L\'équipe nationale du Cameroun est surnommée "Les Lions Indomptables".'
  },
  // 7. Calcul
  {
    id: 7,
    category: 'calcul',
    question: 'Une bouteille et son bouchon coûtent 1,10 euro. La bouteille coûte 1 euro de plus que le bouchon. Combien coûte le bouchon ?',
    options: ['0,05 euro', '0,10 euro', '0,15 euro', '0,20 euro'],
    correct: '0,05 euro',
    explanation: 'Soit x le prix du bouchon. Bouteille = x + 1. Total = x + (x+1) = 1,10 → 2x = 0,10 → x = 0,05'
  },
  // 8. Actualité Cameroun
  {
    id: 8,
    category: 'actualite',
    question: 'En quelle année le Cameroun a-t-il organisé la Coupe d\'Afrique des Nations (CAN) ?',
    options: ['2019', '2020', '2021', '2022'],
    correct: '2021',
    explanation: 'La CAN 2021 s\'est déroulée au Cameroun du 9 janvier au 6 février 2022.'
  },
  // 9. Logique
  {
    id: 9,
    category: 'logique',
    question: 'Quel nombre complète la série : 2, 6, 12, 20, ?',
    options: ['28', '30', '32', '36'],
    correct: '30',
    explanation: 'Différence : +4, +6, +8, +10 → 20+10=30'
  },
  // 10. Culture Cameroun
  {
    id: 10,
    category: 'culture',
    question: 'Quelle est la capitale politique du Cameroun ?',
    options: ['Douala', 'Yaoundé', 'Garoua', 'Bafoussam'],
    correct: 'Yaoundé',
    explanation: 'Yaoundé est la capitale politique du Cameroun depuis 1960.'
  },
  // 11. Mémoire
  {
    id: 11,
    category: 'memory',
    question: 'Si "CHIEN" s\'écrit "3-8-9-5-14", comment s\'écrit "CHAT" selon la même logique ?',
    options: ['3-8-1-20', '3-8-1-21', '3-8-1-19', '3-8-1-18'],
    correct: '3-8-1-20',
    explanation: 'Position des lettres dans l\'alphabet : C=3, H=8, A=1, T=20'
  },
  // 12. Actualité Cameroun
  {
    id: 12,
    category: 'actualite',
    question: 'Quel est le nom du plus grand port du Cameroun ?',
    options: ['Port de Kribi', 'Port de Douala', 'Port de Limbé', 'Port de Campo'],
    correct: 'Port de Douala',
    explanation: 'Le Port Autonome de Douala (PAD) est le plus grand port du Cameroun.'
  },
  // 13. Calcul
  {
    id: 13,
    category: 'calcul',
    question: 'Un escargot grimpe le long d\'un mur de 10 mètres. Chaque jour, il monte de 3 mètres mais chaque nuit, il redescend de 2 mètres. Combien de jours lui faut-il pour atteindre le sommet ?',
    options: ['7 jours', '8 jours', '9 jours', '10 jours'],
    correct: '8 jours',
    explanation: 'Après 7 jours : à 7m. Le 8e jour : monte à 10m et atteint le sommet.'
  },
  // 14. Culture Cameroun
  {
    id: 14,
    category: 'culture',
    question: 'Quel est le plat traditionnel emblématique du Cameroun ?',
    options: ['Ndolé', 'Tchiomba', 'Foufou', 'Koki'],
    correct: 'Ndolé',
    explanation: 'Le Ndolé est considéré comme le plat national du Cameroun.'
  },
  // 15. Logique
  {
    id: 15,
    category: 'logique',
    question: 'Si 2 + 2 = 4, 3 + 3 = 8, alors 4 + 4 = ?',
    options: ['8', '10', '12', '16'],
    correct: '12',
    explanation: 'La logique est : 2+2=4, 3+3=8 (3×2+2), 4+4=12 (4×2+4)'
  },
  // 16. Actualité Cameroun
  {
    id: 16,
    category: 'actualite',
    question: 'Qui a remporté la dernière édition du championnat de football camerounais (Elite One) ?',
    options: ['Coton Sport', 'Union Douala', 'Canon Yaoundé', 'AS Fortuna'],
    correct: 'Coton Sport',
    explanation: 'Coton Sport de Garoua est le club le plus titré du Cameroun.'
  },
  // 17. Mémoire
  {
    id: 17,
    category: 'memory',
    question: 'Quel nombre manque dans la suite : 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '12', '13', '14'],
    correct: '13',
    explanation: 'Suite de Fibonacci : chaque nombre est la somme des deux précédents (5+8=13)'
  },
  // 18. Culture Cameroun
  {
    id: 18,
    category: 'culture',
    question: 'Quel est le nom du stade national du Cameroun situé à Yaoundé ?',
    options: ['Stade Ahmadou Ahidjo', 'Stade Paul Biya', 'Stade Japoma', 'Stade de la Réunification'],
    correct: 'Stade Ahmadou Ahidjo',
    explanation: 'Le stade Ahmadou Ahidjo est le principal stade de Yaoundé.'
  },
  // 19. Calcul
  {
    id: 19,
    category: 'calcul',
    question: 'Un agriculteur vend des pommes. Le premier client achète la moitié des pommes plus une demi-pomme. Le deuxième client achète la moitié du reste plus une demi-pomme. Le troisième client achète la moitié du nouveau reste plus une demi-pomme. Il ne reste plus aucune pomme. Combien de pommes l\'agriculteur avait-il au départ ?',
    options: ['7 pommes', '8 pommes', '9 pommes', '10 pommes'],
    correct: '7 pommes',
    explanation: 'En résolvant à rebours : après 3e client : 0 → avant 3e : 1 pomme → avant 2e : 3 pommes → au départ : 7 pommes.'
  },
  // 20. Actualité Cameroun
  {
    id: 20,
    category: 'actualite',
    question: 'Quelle est la langue officielle du Cameroun avec le français ?',
    options: ['Anglais', 'Allemand', 'Espagnol', 'Portugais'],
    correct: 'Anglais',
    explanation: 'Le Cameroun a deux langues officielles : le français et l\'anglais.'
  }
]);

const categories = ref([
  { name: 'Logique', icon: 'fas fa-puzzle-piece', score: 0 },
  { name: 'Mémoire', icon: 'fas fa-brain', score: 0 },
  { name: 'Calcul', icon: 'fas fa-calculator', score: 0 },
  { name: 'Actualité', icon: 'fas fa-newspaper', score: 0 },
  { name: 'Culture', icon: 'fas fa-globe-africa', score: 0 }
]);

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const startTest = () => {
  testStarted.value = true;
  userAnswers.value = [];
  currentIndex.value = 0;
  totalScore.value = 0;
  timeLeft.value = 2700;
  
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft.value > 0 && testStarted.value && !testFinished.value) {
      timeLeft.value--;
    } else if (timeLeft.value <= 0) {
      finishTest();
    }
  }, 1000);
};

const selectAnswer = (answer) => {
  selectedAnswer.value = answer;
};

const nextQuestion = () => {
  if (!selectedAnswer.value) {
    alert('Veuillez sélectionner une réponse');
    return;
  }
  
  userAnswers.value[currentIndex.value] = selectedAnswer.value;
  if (selectedAnswer.value === questions.value[currentIndex.value].correct) {
    totalScore.value += 10;
  }
  selectedAnswer.value = '';
  
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  } else {
    finishTest();
  }
};

const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    selectedAnswer.value = userAnswers.value[currentIndex.value] || '';
  }
};

const finishTest = () => {
  if (timer) clearInterval(timer);
  
  const categoryScores = { logique: 0, memory: 0, calcul: 0, actualite: 0, culture: 0 };
  const categoryCounts = { logique: 0, memory: 0, calcul: 0, actualite: 0, culture: 0 };
  
  questions.value.forEach((q, idx) => {
    if (userAnswers.value[idx] === q.correct) {
      if (q.category === 'logique') {
        categoryScores.logique += 10;
        categoryCounts.logique++;
      } else if (q.category === 'memory') {
        categoryScores.memory += 10;
        categoryCounts.memory++;
      } else if (q.category === 'calcul') {
        categoryScores.calcul += 10;
        categoryCounts.calcul++;
      } else if (q.category === 'actualite') {
        categoryScores.actualite += 10;
        categoryCounts.actualite++;
      } else if (q.category === 'culture') {
        categoryScores.culture += 10;
        categoryCounts.culture++;
      }
    }
  });
  
  categories.value[0].score = categoryCounts.logique ? Math.round(categoryScores.logique / (categoryCounts.logique * 10) * 100) : 0;
  categories.value[1].score = categoryCounts.memory ? Math.round(categoryScores.memory / (categoryCounts.memory * 10) * 100) : 0;
  categories.value[2].score = categoryCounts.calcul ? Math.round(categoryScores.calcul / (categoryCounts.calcul * 10) * 100) : 0;
  categories.value[3].score = categoryCounts.actualite ? Math.round(categoryScores.actualite / (categoryCounts.actualite * 10) * 100) : 0;
  categories.value[4].score = categoryCounts.culture ? Math.round(categoryScores.culture / (categoryCounts.culture * 10) * 100) : 0;
  
  testStarted.value = false;
  testFinished.value = true;
};

const analysis = computed(() => {
  const scorePercent = totalScore.value / (questions.value.length * 10) * 100;
  if (scorePercent >= 80) return 'Excellent ! Vos capacités cognitives sont très développées. Vous avez une excellente maîtrise de la logique, des mathématiques et de la culture camerounaise.';
  if (scorePercent >= 60) return 'Très bien ! Vous avez de bonnes capacités de raisonnement. Continuez à vous entraîner pour exceller dans tous les domaines.';
  if (scorePercent >= 40) return 'Correct. Vous avez des bases solides mais certains domaines méritent d\'être renforcés, notamment l\'actualité camerounaise.';
  return 'À améliorer. Nous vous recommandons de vous entraîner régulièrement avec des exercices de logique et de suivre l\'actualité camerounaise.';
});

const strengths = computed(() => {
  const strengthsList = [];
  if (categories.value[0].score >= 70) strengthsList.push('Excellent raisonnement logique');
  if (categories.value[1].score >= 70) strengthsList.push('Bonne mémoire et capacité de rétention');
  if (categories.value[2].score >= 70) strengthsList.push('Calcul mental rapide et précis');
  if (categories.value[3].score >= 70) strengthsList.push('Très bonne connaissance de l\'actualité camerounaise');
  if (categories.value[4].score >= 70) strengthsList.push('Solide culture générale camerounaise');
  if (strengthsList.length === 0) strengthsList.push('Potentiel à développer dans tous les domaines');
  return strengthsList;
});

const weaknesses = computed(() => {
  const weaknessesList = [];
  if (categories.value[0].score < 50) weaknessesList.push('Renforcer le raisonnement logique avec des puzzles et jeux de déduction');
  if (categories.value[1].score < 50) weaknessesList.push('Améliorer la mémoire avec des techniques de mémorisation');
  if (categories.value[2].score < 50) weaknessesList.push('Pratiquer le calcul mental quotidiennement');
  if (categories.value[3].score < 50) weaknessesList.push('Suivre régulièrement l\'actualité camerounaise (journaux, radios)');
  if (categories.value[4].score < 50) weaknessesList.push('Lire des livres sur l\'histoire et la culture du Cameroun');
  if (weaknessesList.length === 0) weaknessesList.push('Maintenir votre niveau avec une pratique régulière');
  return weaknessesList;
});

const redirectToRIASEC = () => {
  localStorage.setItem('qi_test_result', JSON.stringify({
    score: totalScore.value,
    categories: categories.value,
    date: new Date().toISOString()
  }));
  router.push('/orientation/test-riasec');
};

const saveResults = () => {
  const results = {
    test: 'QI',
    score: totalScore.value,
    percentage: Math.round(totalScore.value / (questions.value.length * 10) * 100),
    categories: categories.value,
    date: new Date().toISOString()
  };
  localStorage.setItem('qi_test_result', JSON.stringify(results));
  alert('Résultats sauvegardés dans votre profil !');
};

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}

.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>
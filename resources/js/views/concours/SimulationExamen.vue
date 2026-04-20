<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
    <!-- SECTION HERO avec animation et image -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-700 py-24">
      <div class="absolute inset-0 opacity-15">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
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
      
      <div class="absolute inset-0">
        <div class="particles">
          <div v-for="i in 20" :key="i" class="particle" :style="{ left: Math.random() * 100 + '%', animationDelay: Math.random() * 5 + 's' }"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <i class="fas fa-laptop-code text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Simulation interactive</span>
        </div>
        
        <div class="animate-fadeInUp">
          <h1 class="font-display text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Simulation <span class="text-yellow-300">d'examen</span>
          </h1>
          <p class="text-indigo-100 text-xl max-w-2xl mx-auto">
            Préparez-vous dans des conditions réelles avec notre simulateur d'examen intelligent
          </p>
        </div>
        
        <div class="flex justify-center gap-4 mt-8 flex-wrap">
          <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <i class="fas fa-clock text-white"></i>
            <span class="text-white text-sm">Temps réel</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <i class="fas fa-chart-line text-white"></i>
            <span class="text-white text-sm">Correction auto</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <i class="fas fa-trophy text-white"></i>
            <span class="text-white text-sm">Classement</span>
          </div>
        </div>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-12 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <!-- SECTION STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition">
              <i class="fas fa-clock text-blue-600 text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">60</span>
            <span class="text-xs text-gray-500">Minutes</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition">
              <i class="fas fa-question-circle text-indigo-600 text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">100</span>
            <span class="text-xs text-gray-500">Questions</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-200 transition">
              <i class="fas fa-chart-line text-purple-600 text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">5</span>
            <span class="text-xs text-gray-500">Matières</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-200 transition">
              <i class="fas fa-trophy text-green-600 text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">5000</span>
            <span class="text-xs text-gray-500">Candidats</span>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-5 py-12">
      <!-- Page d'accueil avant simulation -->
      <div v-if="!simulationStarted && !simulationFinished" class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Carte d'information -->
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div class="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-500">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3" alt="Exam" class="w-full h-full object-cover opacity-30">
              <div class="absolute inset-0 flex items-center justify-center">
                <i class="fas fa-laptop-code text-white text-6xl"></i>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                <i class="fas fa-trophy text-indigo-600 text-xl"></i>
                <i class="fas fa-brain text-purple-600 text-xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Simulation complète</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Entraînez-vous dans des conditions réelles d'examen avec un chronomètre et une correction automatique.
              </p>
              <div class="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                <i class="fas fa-chart-line text-blue-600"></i>
                <i class="fas fa-trophy text-green-600"></i>
                <i class="fas fa-clock text-purple-600"></i>
              </div>
            </div>
          </div>
          
          <!-- Formulaire de configuration -->
          <div class="bg-white rounded-3xl shadow-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center animate-pulse">
                <i class="fas fa-sliders-h text-blue-600 text-3xl"></i>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800">Configuration</h2>
                <p class="text-gray-500">Personnalisez votre simulation</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-layer-group mr-2 text-primary"></i>Type d'examen
                </label>
                <div class="relative">
                  <select v-model="examType" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition appearance-none bg-white">
                    <option value="complet">Examen complet - Toutes matières</option>
                    <option value="culture">Culture Générale</option>
                    <option value="maths">Mathématiques</option>
                    <option value="francais">Français</option>
                    <option value="droit">Droit Administratif</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-hourglass-half mr-2 text-primary"></i>Durée (minutes)
                </label>
                <div class="relative">
                  <select v-model="duration" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition appearance-none bg-white">
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-chart-line mr-2 text-primary"></i>Difficulté
                </label>
                <div class="relative">
                  <select v-model="difficulty" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition appearance-none bg-white">
                    <option value="facile">Facile - Révision de base</option>
                    <option value="moyen">Moyen - Niveau standard</option>
                    <option value="difficile">Difficile - Challenge avancé</option>
                    <option value="expert">Expert - Préparation intensive</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 mt-6 border border-yellow-200">
              <p class="text-sm font-semibold text-yellow-800 mb-2">
                <i class="fas fa-info-circle mr-2"></i>Informations
              </p>
              <ul class="text-xs text-yellow-700 space-y-1">
                <li><i class="fas fa-check-circle mr-1 text-green-500"></i> Questions générées aléatoirement</li>
                <li><i class="fas fa-check-circle mr-1 text-green-500"></i> Correction automatique à la fin</li>
                <li><i class="fas fa-check-circle mr-1 text-green-500"></i> Statistiques détaillées</li>
              </ul>
            </div>
            
            <button @click="startSimulation" class="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <i class="fas fa-play"></i>
              Commencer la simulation
              <i class="fas fa-arrow-right"></i>
            </button>
            
            <div class="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-100">
              <i class="fas fa-bullseye text-primary text-sm"></i>
              <i class="fas fa-rocket text-primary text-sm"></i>
              <i class="fas fa-star text-primary text-sm"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Pendant la simulation -->
      <div v-else-if="simulationStarted && !simulationFinished" class="max-w-4xl mx-auto">
        <div class="fixed top-20 right-5 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 animate-pulse">
          <i class="fas fa-hourglass-half"></i>
          <span class="font-mono text-lg">{{ formattedTime }}</span>
        </div>
        
        <div class="fixed bottom-6 left-6 z-50 flex gap-3">
          <router-link to="/" class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-blue-50 transition-all duration-300 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-md">
            <i class="fas fa-home text-xs"></i>
            <span>Accueil</span>
          </router-link>
          <router-link to="/dashboard" class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-blue-50 transition-all duration-300 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-md">
            <i class="fas fa-tachometer-alt text-xs"></i>
            <span>Dashboard</span>
          </router-link>
        </div>
        
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div class="p-5 border-b bg-gradient-to-r from-gray-50 to-white">
            <div class="flex justify-between items-center flex-wrap gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-question-circle text-primary"></i>
                </div>
                <span class="text-sm font-semibold text-gray-600">Question {{ currentIndex + 1 }}/{{ questions.length }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-star text-green-600"></i>
                </div>
                <span class="text-sm font-bold text-primary">{{ score }}/{{ questions.length * 10 }} pts</span>
              </div>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-3 mt-4 overflow-hidden">
              <div class="bg-gradient-to-r from-primary to-indigo-600 h-3 rounded-full transition-all duration-500" :style="{ width: ((currentIndex + 1) / questions.length * 100) + '%' }"></div>
            </div>
          </div>
          
          <div class="p-8">
            <div class="mb-8">
              <span class="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-3">
                <i class="fas fa-tag mr-1"></i> {{ questions[currentIndex]?.subject || 'Général' }}
              </span>
              <h3 class="text-2xl font-bold text-gray-800 leading-relaxed">{{ questions[currentIndex]?.question }}</h3>
            </div>
            
            <div class="space-y-4 mb-10">
              <div v-for="(opt, idx) in questions[currentIndex]?.options" :key="idx" 
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

      <!-- Résultats finaux -->
      <div v-else-if="simulationFinished" class="max-w-4xl mx-auto animate-fadeInUp">
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div class="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-10 text-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
            </div>
            <div class="relative z-10">
              <div class="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-5 animate-bounce">
                <i class="fas fa-chart-line text-white text-4xl"></i>
              </div>
              <h2 class="text-4xl font-black text-white mb-3">Simulation terminée !</h2>
              <p class="text-emerald-100 text-xl">Votre score : {{ finalScore }}/{{ questions.length * 10 }}</p>
            </div>
          </div>
          
          <div class="p-8">
            <div class="flex justify-end gap-3 mb-6">
              <router-link to="/" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition">
                <i class="fas fa-home"></i>
                <span>Accueil</span>
              </router-link>
              <router-link to="/dashboard" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition">
                <i class="fas fa-tachometer-alt"></i>
                <span>Tableau de bord</span>
              </router-link>
            </div>
            
            <div class="grid md:grid-cols-3 gap-5 mb-10">
              <div class="text-center p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl transform hover:scale-105 transition">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i class="fas fa-check-circle text-blue-600 text-xl"></i>
                </div>
                <p class="text-3xl font-black text-blue-600">{{ correctAnswers }}</p>
                <p class="text-sm text-gray-600">Bonnes réponses</p>
              </div>
              <div class="text-center p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl transform hover:scale-105 transition">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i class="fas fa-times-circle text-red-600 text-xl"></i>
                </div>
                <p class="text-3xl font-black text-red-600">{{ wrongAnswers }}</p>
                <p class="text-sm text-gray-600">Mauvaises réponses</p>
              </div>
              <div class="text-center p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl transform hover:scale-105 transition">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i class="fas fa-trophy text-green-600 text-xl"></i>
                </div>
                <p class="text-3xl font-black text-green-600">{{ successRate }}%</p>
                <p class="text-sm text-gray-600">Taux de réussite</p>
              </div>
            </div>
            
            <div class="mb-10">
              <h3 class="font-black text-xl mb-5 flex items-center gap-2">
                <i class="fas fa-chart-pie text-primary"></i> Performances par matière
              </h3>
              <div class="space-y-4">
                <div v-for="subject in subjectScores" :key="subject.name" class="group">
                  <div class="flex justify-between text-sm mb-2">
                    <span class="font-semibold">{{ subject.name }}</span>
                    <span class="text-primary font-bold">{{ subject.score }}%</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div class="h-3 rounded-full transition-all duration-1000" 
                      :class="subject.score >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-red-500'"
                      :style="{ width: subject.score + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 mb-8 border border-amber-200">
              <h4 class="font-black text-amber-800 mb-3 flex items-center gap-2">
                <i class="fas fa-lightbulb text-amber-600"></i> Recommandations personnalisées
              </h4>
              <ul class="space-y-2">
                <li v-for="(rec, idx) in recommendations" :key="idx" class="flex items-start gap-2 text-sm text-amber-700">
                  <i class="fas fa-chevron-right text-amber-600 mt-0.5"></i>
                  {{ rec }}
                </li>
              </ul>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="voirClassement" class="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                <i class="fas fa-trophy"></i> Voir mon classement
              </button>
              <button @click="resetSimulation" class="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <i class="fas fa-redo"></i> Nouvelle simulation
              </button>
              <router-link to="/dashboard" class="flex-1 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
                <i class="fas fa-tachometer-alt"></i> Tableau de bord
              </router-link>
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

// États
const simulationStarted = ref(false);
const simulationFinished = ref(false);
const examType = ref('complet');
const duration = ref(60);
const difficulty = ref('moyen');
const questions = ref([]);
const currentIndex = ref(0);
const selectedAnswer = ref('');
const userAnswers = ref([]);
const score = ref(0);
const timeLeft = ref(3600);
let timer = null;

// Computed
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const finalScore = computed(() => score.value);
const correctAnswers = computed(() => questions.value.filter((q, idx) => userAnswers.value[idx] === q.correct).length);
const wrongAnswers = computed(() => questions.value.length - correctAnswers.value);
const successRate = computed(() => Math.round(finalScore.value / (questions.value.length * 10) * 100));

// Scores par matière
const subjectScores = ref([
  { name: 'Mathématiques', score: 0 },
  { name: 'Français', score: 0 },
  { name: 'Culture Générale', score: 0 },
  { name: 'Droit Administratif', score: 0 },
  { name: 'Actualité', score: 0 }
]);

// Recommandations
const recommendations = computed(() => {
  const recs = [];
  subjectScores.value.forEach(subject => {
    if (subject.score < 70 && subject.score > 0) {
      recs.push(`Renforcez vos compétences en ${subject.name} avec des exercices supplémentaires`);
    }
  });
  if (recs.length === 0 && subjectScores.value.some(s => s.score > 0)) {
    recs.push('Excellent travail ! Continuez à vous entraîner pour maintenir ce niveau d\'excellence');
  }
  if (recs.length === 0) {
    recs.push('Complétez une simulation pour obtenir des recommandations personnalisées');
  }
  return recs;
});

// Base de données des questions
const questionsData = {
  complet: [
    { id: 1, question: 'Un agriculteur vend des pommes. Le premier client achète la moitié des pommes plus une demi-pomme. Le deuxième client achète la moitié du reste plus une demi-pomme. Le troisième client achète la moitié du nouveau reste plus une demi-pomme. Il ne reste plus aucune pomme. Combien de pommes l\'agriculteur avait-il au départ ?', options: ['7 pommes', '8 pommes', '9 pommes', '10 pommes'], correct: '7 pommes', subject: 'Mathématiques' },
    { id: 2, question: 'Si 5 machines fabriquent 5 objets en 5 minutes, combien de temps faudrait-il à 100 machines pour fabriquer 100 objets ?', options: ['5 minutes', '10 minutes', '20 minutes', '100 minutes'], correct: '5 minutes', subject: 'Mathématiques' },
    { id: 3, question: 'Qui a été le premier président du Cameroun après l\'indépendance ?', options: ['Paul Biya', 'Ahmadou Ahidjo', 'John Ngu Foncha', 'Simon Pierre Tchoungui'], correct: 'Ahmadou Ahidjo', subject: 'Histoire' }
  ],
  culture: [
    { id: 1, question: 'Quelle est la capitale du Cameroun ?', options: ['Douala', 'Yaoundé', 'Garoua', 'Bafoussam'], correct: 'Yaoundé', subject: 'Culture Générale' },
    { id: 2, question: 'Quel est le plus haut sommet d\'Afrique ?', options: ['Mont Kenya', 'Kilimandjaro', 'Mont Stanley', 'Rwenzori'], correct: 'Kilimandjaro', subject: 'Géographie' }
  ],
  maths: [
    { id: 1, question: 'Une bouteille et son bouchon coûtent 1,10 euro. La bouteille coûte 1 euro de plus que le bouchon. Combien coûte le bouchon ?', options: ['0,05 euro', '0,10 euro', '0,15 euro', '0,20 euro'], correct: '0,05 euro', subject: 'Mathématiques' }
  ],
  francais: [
    { id: 1, question: 'Quelle est la nature du mot "beaucoup" ?', options: ['Adverbe', 'Adjectif', 'Nom', 'Verbe'], correct: 'Adverbe', subject: 'Français' }
  ],
  droit: [
    { id: 1, question: 'Qu\'est-ce qu\'un acte administratif unilatéral ?', options: ['Une décision de l\'administration', 'Un contrat', 'Une loi', 'Un jugement'], correct: 'Une décision de l\'administration', subject: 'Droit Administratif' }
  ]
};

// Démarrer la simulation
const startSimulation = () => {
  questions.value = [...questionsData[examType.value]];
  simulationStarted.value = true;
  simulationFinished.value = false;
  currentIndex.value = 0;
  userAnswers.value = [];
  score.value = 0;
  selectedAnswer.value = '';
  timeLeft.value = duration.value * 60;
  
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft.value > 0 && simulationStarted.value && !simulationFinished.value) {
      timeLeft.value--;
    } else if (timeLeft.value <= 0) {
      finishSimulation();
    }
  }, 1000);
};

// Sélectionner une réponse
const selectAnswer = (answer) => {
  selectedAnswer.value = answer;
};

// Question suivante
const nextQuestion = () => {
  if (!selectedAnswer.value) {
    alert('Veuillez sélectionner une réponse');
    return;
  }
  
  userAnswers.value[currentIndex.value] = selectedAnswer.value;
  if (selectedAnswer.value === questions.value[currentIndex.value].correct) {
    score.value += 10;
  }
  selectedAnswer.value = '';
  
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  } else {
    finishSimulation();
  }
};

// Question précédente
const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    selectedAnswer.value = userAnswers.value[currentIndex.value] || '';
  }
};

// Terminer la simulation
const finishSimulation = () => {
  if (timer) clearInterval(timer);
  
  const subjectStats = {};
  questions.value.forEach((q, idx) => {
    if (!subjectStats[q.subject]) {
      subjectStats[q.subject] = { total: 0, correct: 0 };
    }
    subjectStats[q.subject].total += 10;
    if (userAnswers.value[idx] === q.correct) {
      subjectStats[q.subject].correct += 10;
    }
  });
  
  subjectScores.value.forEach(subject => {
    if (subjectStats[subject.name]) {
      subject.score = Math.round((subjectStats[subject.name].correct / subjectStats[subject.name].total) * 100);
    } else {
      subject.score = 0;
    }
  });
  
  simulationStarted.value = false;
  simulationFinished.value = true;
};

// Réinitialiser la simulation
const resetSimulation = () => {
  simulationStarted.value = false;
  simulationFinished.value = false;
  currentIndex.value = 0;
  userAnswers.value = [];
  score.value = 0;
  selectedAnswer.value = '';
  if (timer) clearInterval(timer);
  subjectScores.value.forEach(s => s.score = 0);
};

// Voir le classement
const voirClassement = () => {
  router.push('/classement-national');
};

// Nettoyage
onUnmounted(() => {
  if (timer) clearInterval(timer);
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

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
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

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
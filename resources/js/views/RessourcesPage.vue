<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-20">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="Bibliothèque" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-book-open text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">+3000 ressources disponibles</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Bibliothèque d'<span class="text-yellow-300">entraînement</span>
        </h1>
        <p class="text-indigo-100 text-lg max-w-2xl mx-auto">
          Accédez à +3000 exercices, QCM chronométrés, annales corrigées et tests blancs interactifs
        </p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-download text-white"></i>
            <span class="text-white text-sm">Téléchargement illimité</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-line text-white"></i>
            <span class="text-white text-sm">Suivi de progression</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-users text-white"></i>
            <span class="text-white text-sm">Classes virtuelles</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <!-- STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-file-alt text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">3000+</span>
            <span class="text-xs text-gray-500">Exercices</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-stopwatch text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">500+</span>
            <span class="text-xs text-gray-500">QCM chronométrés</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-archive text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">500+</span>
            <span class="text-xs text-gray-500">Annales corrigées</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-video text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">150+</span>
            <span class="text-xs text-gray-500">Vidéos cours</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CARTES DES RESSOURCES -->
    <section class="py-16">
      <div class="container mx-auto px-5">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- QCM Chronométrés - ACCESSIBLE À TOUS -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?w=400&h=250&fit=crop" alt="QCM" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold"><i class="fas fa-star mr-1"></i> Populaire</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-stopwatch text-primary text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold">QCM Chronométrés</h3>
              </div>
              <p class="text-gray-500">Entraînement en conditions réelles avec score instantané et correction détaillée.</p>
              <button @click="openQuizModal" class="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <i class="fas fa-play"></i> Commencer
              </button>
            </div>
          </div>

          <!-- Annales & Sujets corrigés - ACCESSIBLE À TOUS -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.pexels.com/photos/210647/pexels-photo-210647.jpeg?w=400&h=250&fit=crop" alt="Annales" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-archive text-primary text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold">Annales & Sujets corrigés</h3>
              </div>
              <p class="text-gray-500">Plus de 500 sujets de concours précédents (administratifs, écoles, TCF).</p>
              <button @click="openAnnalesModal" class="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <i class="fas fa-download"></i> Accéder
              </button>
            </div>
          </div>

          <!-- Tests Blancs Complets - RÉSERVÉ AUX INSCRITS -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.pexels.com/photos/6238046/pexels-photo-6238046.jpeg?w=400&h=250&fit=crop" alt="Tests blancs" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div v-if="!isAuthenticated" class="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div class="text-center">
                  <i class="fas fa-lock text-white text-3xl mb-2"></i>
                  <p class="text-white text-xs font-bold">Réservé aux inscrits</p>
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"><i class="fas fa-lock mr-1"></i> Inscrits uniquement</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-chalkboard text-primary text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold">Tests Blancs Complets</h3>
              </div>
              <p class="text-gray-500">Simulations d'épreuves écrites et orales avec correction personnalisée.</p>
              <button v-if="isAuthenticated" @click="openTestBlancModal" class="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <i class="fas fa-calendar"></i> Commencer
              </button>
              <button v-else @click="showInscriptionRequired" class="mt-6 w-full py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                <i class="fas fa-lock"></i> Réservé aux inscrits
              </button>
            </div>
          </div>

          <!-- Vidéos & Cours replay - RÉSERVÉ AUX INSCRITS -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=400&h=250&fit=crop" alt="Vidéos" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div v-if="!isAuthenticated" class="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div class="text-center">
                  <i class="fas fa-lock text-white text-3xl mb-2"></i>
                  <p class="text-white text-xs font-bold">Réservé aux inscrits</p>
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"><i class="fas fa-lock mr-1"></i> Inscrits uniquement</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-video text-primary text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold">Vidéos & Cours replay</h3>
              </div>
              <p class="text-gray-500">150+ vidéos de cours par des formateurs experts, accessible 24/7.</p>
              <button v-if="isAuthenticated" @click="openVideoModal" class="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <i class="fas fa-play-circle"></i> Regarder
              </button>
              <button v-else @click="showInscriptionRequired" class="mt-6 w-full py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                <i class="fas fa-lock"></i> Réservé aux inscrits
              </button>
            </div>
          </div>

          <!-- Statistiques & Progression - ACCESSIBLE À TOUS -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?w=400&h=250&fit=crop" alt="Statistiques" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-chart-simple text-primary text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold">Statistiques & Progression</h3>
              </div>
              <p class="text-gray-500">Suivez vos scores, vos points faibles et progressez grâce à l'IA.</p>
              <button @click="$router.push('/dashboard')" class="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <i class="fas fa-chart-line"></i> Voir tableau
              </button>
            </div>
          </div>

          <!-- Classes virtuelles - RÉSERVÉ AUX INSCRITS -->
          <div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-48 overflow-hidden">
              <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=400&h=250&fit=crop" alt="Classes virtuelles" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div v-if="!isAuthenticated" class="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div class="text-center">
                  <i class="fas fa-lock text-white text-3xl mb-2"></i>
                  <p class="text-white text-xs font-bold">Réservé aux inscrits</p>
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"><i class="fas fa-lock mr-1"></i> Inscrits uniquement</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-users text-primary text-xl group-hover:text-white"></i>
                </div>
                <h3 class="text-xl font-bold">Classes virtuelles</h3>
              </div>
              <p class="text-gray-500">Sessions de révision en groupe avec formateurs en direct.</p>
              <button v-if="isAuthenticated" @click="openClasseVirtuelleModal" class="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <i class="fas fa-users"></i> Participer
              </button>
              <button v-else @click="showInscriptionRequired" class="mt-6 w-full py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2">
                <i class="fas fa-lock"></i> Réservé aux inscrits
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== MODAL QCM ==================== -->
    <div v-if="quizModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" @click.self="closeQuizModal">
      <div class="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div>
            <h3 class="font-bold text-gray-800">QCM Chronométré</h3>
            <p class="text-xs text-gray-500">Chapitre: {{ selectedChapitre }}</p>
          </div>
          <button @click="closeQuizModal" class="w-8 h-8 rounded-full hover:bg-gray-200"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div v-if="!quizStarted && !quizFinished">
            <div class="text-center mb-6">
              <i class="fas fa-info-circle text-primary text-4xl mb-3"></i>
              <p class="text-gray-600">Choisissez un chapitre pour commencer</p>
            </div>
            <div class="grid grid-cols-2 gap-3 mb-6">
              <button v-for="chapitre in chapitres" :key="chapitre" @click="selectChapitre(chapitre)" :class="['px-4 py-2 rounded-xl transition', selectedChapitre === chapitre ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                {{ chapitre }}
              </button>
            </div>
            <button @click="startQuiz" class="w-full py-3 bg-primary text-white rounded-xl font-bold">Commencer le quiz</button>
          </div>
          
          <div v-else-if="quizStarted && !quizFinished">
            <div class="flex justify-between items-center mb-6">
              <span class="text-sm text-gray-500">Question {{ currentQuizIndex + 1 }}/{{ quizQuestions.length }}</span>
              <span class="text-sm font-bold text-primary">{{ quizScore }}/{{ quizQuestions.length * 10 }} pts</span>
              <span class="text-sm font-bold text-red-500"><i class="fas fa-hourglass-half mr-1"></i> {{ formatQuizTime }}</span>
            </div>
            
            <div class="mb-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">{{ quizQuestions[currentQuizIndex]?.question }}</h3>
              <div class="space-y-3">
                <div v-for="(opt, idx) in quizQuestions[currentQuizIndex]?.options" :key="idx" @click="selectQuizAnswer(opt)" :class="['p-3 rounded-xl border cursor-pointer transition', quizSelectedAnswer === opt ? 'bg-primary/10 border-primary' : 'border-gray-200 hover:bg-gray-50']">
                  <span class="text-sm">{{ opt }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between">
              <button @click="prevQuizQuestion" :disabled="currentQuizIndex === 0" class="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50"><i class="fas fa-arrow-left mr-1"></i> Précédent</button>
              <button @click="nextQuizQuestion" class="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                {{ currentQuizIndex === quizQuestions.length - 1 ? 'Terminer' : 'Suivant' }} <i class="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
          
          <div v-else class="text-center">
            <i class="fas fa-check-circle text-green-500 text-5xl mb-3"></i>
            <h3 class="text-xl font-bold text-gray-800">Quiz terminé</h3>
            <p class="text-gray-600 mt-2">Votre score : {{ quizScore }}/{{ quizQuestions.length * 10 }}</p>
            <p class="text-sm text-gray-500">Soit {{ Math.round(quizScore / (quizQuestions.length * 10) * 100) }}% de réussite</p>
            
            <div class="text-left mt-6 max-h-[400px] overflow-y-auto">
              <h4 class="font-bold mb-3"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i> Correction détaillée :</h4>
              <div v-for="(q, idx) in quizQuestions" :key="idx" class="mb-4 p-3 border-b">
                <p class="font-medium">{{ q.question }}</p>
                <p class="text-sm text-green-600"><i class="fas fa-check-circle mr-1"></i> Bonne réponse : {{ q.correct }}</p>
                <p v-if="quizUserAnswers[idx] && quizUserAnswers[idx] !== q.correct" class="text-sm text-red-600"><i class="fas fa-times-circle mr-1"></i> Votre réponse : {{ quizUserAnswers[idx] }}</p>
                <p class="text-xs text-gray-500 mt-1"><i class="fas fa-info-circle mr-1"></i> {{ q.explanation }}</p>
              </div>
            </div>
            
            <button @click="resetQuiz" class="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold"><i class="fas fa-redo mr-2"></i> Refaire le quiz</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL ANNALES ==================== -->
    <div v-if="annalesModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" @click.self="closeAnnalesModal">
      <div class="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div>
            <h3 class="font-bold text-gray-800">Annales & Sujets corrigés</h3>
            <p class="text-xs text-gray-500">Plus de 500 sujets de concours précédents</p>
          </div>
          <button @click="closeAnnalesModal" class="w-8 h-8 rounded-full hover:bg-gray-200"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="flex flex-col md:flex-row gap-4 p-4 border-b bg-gray-50">
          <select v-model="filtreConcours" class="px-4 py-2 rounded-xl border border-gray-200 text-sm">
            <option value="all">Tous les concours</option>
            <option value="enam">ENAM</option>
            <option value="injs">INJS</option>
            <option value="enieg">ENIEG</option>
            <option value="iric">IRIC</option>
            <option value="tcf">TCF</option>
            <option value="toefl">TOEFL/IELTS</option>
          </select>
          <select v-model="filtreAnnee" class="px-4 py-2 rounded-xl border border-gray-200 text-sm">
            <option value="all">Toutes années</option>
            <option v-for="a in anneesDisponibles" :key="a" :value="a">{{ a }}</option>
          </select>
          <input type="text" v-model="searchAnnales" placeholder="Rechercher un sujet..." class="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm">
        </div>
        
        <div class="p-4 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="annale in filteredAnnalesList" :key="annale.id" class="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <i class="fas fa-file-pdf text-red-500"></i>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 text-sm">{{ annale.titre }}</h4>
                  <p class="text-xs text-gray-500">{{ annale.concours }} • {{ annale.annee }} • {{ annale.matiere }}</p>
                </div>
              </div>
              <div class="flex gap-2 mt-3">
                <button @click="telechargerSujet(annale)" class="flex-1 py-1.5 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition">
                  <i class="fas fa-download mr-1"></i> Sujet
                </button>
                <button @click="voirCorrige(annale)" class="flex-1 py-1.5 border border-green-500 text-green-600 rounded-lg text-xs font-bold hover:bg-green-500 hover:text-white transition">
                  <i class="fas fa-check-circle mr-1"></i> Corrigé
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL TEST BLANC ==================== -->
    <div v-if="testBlancModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" @click.self="closeTestBlancModal">
      <div class="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
          <div>
            <h3 class="font-bold text-gray-800">Examen blanc</h3>
            <p class="text-xs text-gray-500">Conditions réelles - Chronométré sans pause</p>
          </div>
          <button @click="closeTestBlancModal" class="w-8 h-8 rounded-full hover:bg-gray-200"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div v-if="!testBlancStarted && !testBlancFinished">
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <p class="text-sm text-yellow-800"><i class="fas fa-exclamation-triangle mr-2"></i> Conditions réelles :</p>
              <ul class="text-xs text-yellow-700 mt-2 list-disc list-inside">
                <li>Durée limitée : 60 minutes</li>
                <li>Pas de pause possible</li>
                <li>Correction automatique à la fin</li>
              </ul>
            </div>
            
            <div class="mb-6">
              <label class="block text-sm font-bold text-gray-700 mb-2">Choisissez le type d'examen :</label>
              <select v-model="selectedTestBlancType" class="w-full px-4 py-2 rounded-xl border border-gray-200">
                <option value="complet">Examen complet - Toutes matières (100 questions)</option>
                <option value="culture">Culture Générale (50 questions)</option>
                <option value="droit">Droit Administratif (40 questions)</option>
                <option value="maths">Mathématiques (30 questions)</option>
              </select>
            </div>
            
            <button @click="startTestBlanc" class="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
              <i class="fas fa-play mr-2"></i> Commencer l'examen blanc
            </button>
          </div>
          
          <div v-else-if="testBlancStarted && !testBlancFinished">
            <div class="fixed top-20 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg z-50">
              <i class="fas fa-hourglass-half mr-2"></i> {{ formatTestBlancTime }}
            </div>
            
            <div class="mb-6">
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm text-gray-500">Question {{ testBlancCurrentIndex + 1 }}/{{ testBlancQuestions.length }}</span>
                <span class="text-sm font-bold text-primary">{{ testBlancScore }}/{{ testBlancQuestions.length * 10 }} pts</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mt-2">{{ testBlancQuestions[testBlancCurrentIndex]?.question }}</h3>
              <div class="space-y-3 mt-4">
                <div v-for="(opt, idx) in testBlancQuestions[testBlancCurrentIndex]?.options" :key="idx" @click="selectTestBlancAnswer(opt)" :class="['p-3 rounded-xl border cursor-pointer transition', testBlancAnswers[testBlancCurrentIndex] === opt ? 'bg-primary/10 border-primary' : 'border-gray-200 hover:bg-gray-50']">
                  <span class="text-sm">{{ opt }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between">
              <button @click="prevTestBlancQuestion" :disabled="testBlancCurrentIndex === 0" class="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50"><i class="fas fa-arrow-left mr-1"></i> Précédent</button>
              <button @click="nextTestBlancQuestion" class="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                {{ testBlancCurrentIndex === testBlancQuestions.length - 1 ? 'Terminer' : 'Suivant' }} <i class="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
          
          <div v-else class="text-center">
            <i class="fas fa-chart-line text-primary text-5xl mb-3"></i>
            <h3 class="text-xl font-bold text-gray-800">Examen blanc terminé</h3>
            <p class="text-gray-600 mt-2">Votre score : {{ testBlancScore }}/{{ testBlancQuestions.length * 10 }}</p>
            <p class="text-sm text-gray-500">Soit {{ Math.round(testBlancScore / (testBlancQuestions.length * 10) * 100) }}% de réussite</p>
            
            <div class="text-left mt-6 max-h-[400px] overflow-y-auto">
              <h4 class="font-bold mb-3"><i class="fas fa-chart-simple text-primary mr-2"></i> Résultats détaillés :</h4>
              <div v-for="(q, idx) in testBlancQuestions" :key="idx" class="mb-4 p-3 border-b">
                <p class="font-medium">{{ q.question }}</p>
                <p class="text-sm text-green-600"><i class="fas fa-check-circle mr-1"></i> Bonne réponse : {{ q.correct }}</p>
                <p v-if="testBlancAnswers[idx] && testBlancAnswers[idx] !== q.correct" class="text-sm text-red-600"><i class="fas fa-times-circle mr-1"></i> Votre réponse : {{ testBlancAnswers[idx] }}</p>
                <p class="text-xs text-gray-500 mt-1"><i class="fas fa-info-circle mr-1"></i> {{ q.explanation }}</p>
              </div>
            </div>
            
            <div class="flex gap-3 justify-center mt-6">
              <button @click="resetTestBlanc" class="px-6 py-2 bg-primary text-white rounded-lg font-bold"><i class="fas fa-redo mr-2"></i> Nouvel examen</button>
              <button @click="closeTestBlancModal" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-bold">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL VIDÉOS ==================== -->
    <div v-if="videoModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" @click.self="closeVideoModal">
      <div class="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div>
            <h3 class="font-bold text-gray-800">Vidéos & Cours replay</h3>
            <p class="text-xs text-gray-500">150+ vidéos de cours par des formateurs experts</p>
          </div>
          <button @click="closeVideoModal" class="w-8 h-8 rounded-full hover:bg-gray-200"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="flex flex-col md:flex-row gap-4 p-4 border-b bg-gray-50">
          <select v-model="filtreCategorie" class="px-4 py-2 rounded-xl border border-gray-200 text-sm">
            <option value="all">Toutes les catégories</option>
            <option value="culture">Culture Générale</option>
            <option value="droit">Droit</option>
            <option value="maths">Mathématiques</option>
            <option value="francais">Français</option>
            <option value="anglais">Anglais</option>
          </select>
          <input type="text" v-model="searchVideo" placeholder="Rechercher une vidéo..." class="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm">
        </div>
        
        <div class="flex gap-4 p-4 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div class="w-1/3 space-y-3 overflow-y-auto max-h-[500px]">
            <div v-for="video in filteredVideos" :key="video.id" @click="selectedVideo = video" :class="['p-3 rounded-xl cursor-pointer transition-all', selectedVideo?.id === video.id ? 'bg-gradient-to-r from-indigo-50 to-cyan-50 border-l-4 border-primary' : 'hover:bg-gray-50']">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <i class="fas fa-play-circle text-primary text-xl"></i>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 text-sm">{{ video.titre }}</h4>
                  <p class="text-xs text-gray-500">{{ video.formateur }} • {{ video.duree }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="w-2/3">
            <div v-if="selectedVideo" class="bg-black rounded-xl overflow-hidden">
              <iframe :src="selectedVideo.url" class="w-full aspect-video" frameborder="0" allowfullscreen></iframe>
              <div class="p-4 bg-white">
                <h3 class="font-bold text-gray-800">{{ selectedVideo.titre }}</h3>
                <p class="text-sm text-gray-500 mt-1">Présenté par {{ selectedVideo.formateur }}</p>
                <p class="text-sm text-gray-600 mt-2">{{ selectedVideo.description }}</p>
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-12 text-gray-400">
              <i class="fas fa-video text-5xl mb-4"></i>
              <p>Sélectionnez une vidéo pour la visionner</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL CLASSES VIRTUELLES ==================== -->
    <div v-if="classeVirtuelleModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" @click.self="closeClasseVirtuelleModal">
      <div class="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div>
            <h3 class="font-bold text-gray-800">Classes virtuelles</h3>
            <p class="text-xs text-gray-500">Sessions de révision en groupe avec formateurs en direct</p>
          </div>
          <button @click="closeClasseVirtuelleModal" class="w-8 h-8 rounded-full hover:bg-gray-200"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="flex flex-col md:flex-row gap-4 p-4 border-b bg-gray-50">
          <select v-model="filtreClasse" class="px-4 py-2 rounded-xl border border-gray-200 text-sm">
            <option value="all">Toutes les sessions</option>
            <option value="a_venir">À venir</option>
            <option value="passees">Passées</option>
          </select>
          <input type="text" v-model="searchClasse" placeholder="Rechercher une session..." class="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm">
        </div>
        
        <div class="p-4 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="session in filteredSessions" :key="session.id" class="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
              <div class="flex items-start gap-3">
                <div class="w-12 h-12 rounded-xl" :class="session.type === 'cours' ? 'bg-blue-100' : 'bg-green-100'">
                  <i :class="session.type === 'cours' ? 'fas fa-video text-blue-600' : 'fas fa-users text-green-600'" class="text-xl w-full h-full flex items-center justify-center"></i>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800">{{ session.titre }}</h4>
                  <p class="text-sm text-gray-500">{{ session.formateur }}</p>
                  <div class="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span><i class="far fa-calendar mr-1"></i> {{ session.date }}</span>
                    <span><i class="far fa-clock mr-1"></i> {{ session.heure }}</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">{{ session.description }}</p>
                  <div class="flex items-center justify-between mt-3">
                    <span class="text-xs text-gray-500"><i class="fas fa-users mr-1"></i> {{ session.inscrits }}/{{ session.placesMax }} inscrits</span>
                    <span class="text-xs" :class="session.statut === 'en_cours' ? 'text-green-600' : session.statut === 'a_venir' ? 'text-blue-600' : 'text-gray-400'">
                      <i :class="session.statut === 'en_cours' ? 'fas fa-circle' : session.statut === 'a_venir' ? 'far fa-clock' : 'fas fa-check-circle'"></i>
                      {{ session.statut === 'en_cours' ? 'En cours' : session.statut === 'a_venir' ? 'À venir' : 'Terminé' }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex gap-2 mt-4">
                <button v-if="session.statut === 'a_venir'" @click="inscrireSession(session)" class="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition">
                  <i class="fas fa-user-plus mr-1"></i> S'inscrire
                </button>
                <button v-if="session.statut === 'en_cours'" @click="rejoindreSession(session)" class="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition">
                  <i class="fas fa-video mr-1"></i> Rejoindre
                </button>
                <button v-if="session.inscrit && session.statut === 'termine'" @click="voirReplay(session)" class="flex-1 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition">
                  <i class="fas fa-play mr-1"></i> Voir le replay
                </button>
                <button v-if="session.statut === 'a_venir'" @click="ajouterRappel(session)" class="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">
                  <i class="fas fa-bell"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION COACHING IA -->
    <section class="py-16 bg-gradient-to-r from-indigo-600 to-cyan-600 mt-8">
      <div class="container mx-auto px-5">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="text-white text-center md:text-left">
            <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
              <i class="fas fa-robot text-white text-sm"></i>
              <span class="text-white font-semibold text-sm">Nouveauté</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold">Coaching IA personnalisé</h2>
            <p class="text-indigo-100 mt-2 max-w-lg">Recommandations intelligentes basées sur tes résultats et objectifs concours.</p>
          </div>
          <button @click="$router.push('/dashboard')" class="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2">
            <i class="fas fa-rocket"></i> Voir ma progression
          </button>
        </div>
      </div>
    </section>

    <!-- MODAL D'INSCRIPTION REQUISE -->
    <div v-if="inscriptionModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeInscriptionModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden">
        <div class="flex justify-between items-center p-5 border-b bg-gradient-to-r from-amber-50 to-orange-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-lock text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">Accès réservé</h2>
          </div>
          <button @click="closeInscriptionModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>
        <div class="p-5 text-center">
          <i class="fas fa-user-plus text-5xl text-primary mb-3"></i>
          <p class="text-slate-600 mb-4">Cette fonctionnalité est réservée aux utilisateurs inscrits.</p>
          <div class="flex gap-3">
            <router-link to="/concours" class="flex-1 py-2 bg-primary text-white rounded-xl font-bold text-center">
              S'inscrire maintenant
            </router-link>
            <button @click="closeInscriptionModal" class="flex-1 py-2 border border-gray-300 text-gray-700 rounded-xl font-bold">
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ==================== AUTHENTIFICATION ====================
const isAuthenticated = ref(false);

const checkAuth = () => {
  const user = localStorage.getItem('gradus_user');
  const token = localStorage.getItem('gradus_token');
  isAuthenticated.value = !!(user && token);
};

const showInscriptionRequired = () => {
  inscriptionModalOpen.value = true;
};

// ==================== ÉTATS MODAUX ====================
const quizModalOpen = ref(false);
const annalesModalOpen = ref(false);
const testBlancModalOpen = ref(false);
const videoModalOpen = ref(false);
const classeVirtuelleModalOpen = ref(false);
const inscriptionModalOpen = ref(false);

// ==================== ÉTATS QUIZ ====================
const quizStarted = ref(false);
const quizFinished = ref(false);
const quizQuestions = ref([]);
const currentQuizIndex = ref(0);
const quizSelectedAnswer = ref('');
const quizScore = ref(0);
const quizUserAnswers = ref([]);
const quizTimeLeft = ref(0);
let quizTimer = null;
const selectedChapitre = ref('Culture Générale');
const chapitres = ['Culture Générale', 'Droit Administratif', 'Mathématiques', 'Français', 'Anglais'];

const questionsParChapitre = {
  'Culture Générale': [
    { id: 1, question: 'Quelle est la capitale du Cameroun ?', options: ['Douala', 'Yaoundé', 'Garoua', 'Bafoussam'], correct: 'Yaoundé', explanation: 'Yaoundé est la capitale politique du Cameroun depuis 1960.' },
    { id: 2, question: 'La fête nationale du Cameroun est célébrée le ?', options: ['20 mai', '1er janvier', '11 février', '15 août'], correct: '20 mai', explanation: 'Le 20 mai célèbre l\'avènement de la République unitaire du Cameroun en 1972.' },
    { id: 3, question: 'Quel est le plus haut sommet d\'Afrique ?', options: ['Mont Kenya', 'Kilimandjaro', 'Mont Stanley', 'Ras Dashen'], correct: 'Kilimandjaro', explanation: 'Le Kilimandjaro en Tanzanie culmine à 5 895 mètres.' },
    { id: 4, question: 'Qui a écrit "Le Contrat Social" ?', options: ['Voltaire', 'Rousseau', 'Montesquieu', 'Diderot'], correct: 'Rousseau', explanation: 'Jean-Jacques Rousseau est l\'auteur du Contrat Social, publié en 1762.' }
  ],
  'Droit Administratif': [
    { id: 1, question: 'Qu\'est-ce qu\'un acte administratif unilatéral ?', options: ['Une décision prise par l\'administration', 'Un contrat', 'Une loi', 'Un jugement'], correct: 'Une décision prise par l\'administration', explanation: 'L\'acte administratif unilatéral est une décision prise par l\'administration sans le consentement du destinataire.' },
    { id: 2, question: 'Qui est le garant de l\'indépendance de l\'autorité judiciaire ?', options: ['Le Président', 'Le Premier ministre', 'Le Garde des Sceaux', 'Le Parlement'], correct: 'Le Président', explanation: 'Le Président de la République est garant de l\'indépendance de l\'autorité judiciaire.' }
  ],
  'Mathématiques': [
    { id: 1, question: 'Que vaut 2³ ?', options: ['6', '8', '9', '4'], correct: '8', explanation: '2³ = 2 × 2 × 2 = 8.' },
    { id: 2, question: 'Quelle est la dérivée de f(x) = x² ?', options: ['2x', 'x', '2', 'x²'], correct: '2x', explanation: 'La dérivée de x² est 2x.' }
  ],
  'Français': [
    { id: 1, question: 'Quelle est la nature du mot "beaucoup" ?', options: ['Adverbe', 'Adjectif', 'Nom', 'Verbe'], correct: 'Adverbe', explanation: 'Beaucoup est un adverbe de quantité.' }
  ],
  'Anglais': [
    { id: 1, question: 'What is the past tense of "go" ?', options: ['Went', 'Gone', 'Goed', 'Going'], correct: 'Went', explanation: 'The past tense of "go" is "went".' }
  ]
};

// ==================== ÉTATS ANNALES ====================
const filtreConcours = ref('all');
const filtreAnnee = ref('all');
const searchAnnales = ref('');

const annalesList = ref([
  { id: 1, titre: 'Sujet ENAM 2024 - Culture Générale', concours: 'ENAM', annee: '2024', matiere: 'Culture Générale' },
  { id: 2, titre: 'Sujet ENAM 2024 - Droit Administratif', concours: 'ENAM', annee: '2024', matiere: 'Droit' },
  { id: 3, titre: 'Sujet INJS 2024 - Culture Générale', concours: 'INJS', annee: '2024', matiere: 'Culture Générale' },
  { id: 4, titre: 'Sujet TCF - Compréhension écrite', concours: 'TCF', annee: '2024', matiere: 'Français' },
  { id: 5, titre: 'Sujet ENIEG 2023 - Mathématiques', concours: 'ENIEG', annee: '2023', matiere: 'Mathématiques' },
  { id: 6, titre: 'Sujet IRIC 2023 - Français', concours: 'IRIC', annee: '2023', matiere: 'Français' },
  { id: 7, titre: 'Sujet TOEFL - Reading Comprehension', concours: 'TOEFL/IELTS', annee: '2024', matiere: 'Anglais' }
]);

const anneesDisponibles = computed(() => {
  return [...new Set(annalesList.value.map(a => a.annee))].sort().reverse();
});

const filteredAnnalesList = computed(() => {
  let result = annalesList.value;
  if (filtreConcours.value !== 'all') result = result.filter(a => a.concours === filtreConcours.value);
  if (filtreAnnee.value !== 'all') result = result.filter(a => a.annee === filtreAnnee.value);
  if (searchAnnales.value) result = result.filter(a => a.titre.toLowerCase().includes(searchAnnales.value.toLowerCase()));
  return result;
});

// ==================== ÉTATS TEST BLANC ====================
const testBlancStarted = ref(false);
const testBlancFinished = ref(false);
const testBlancQuestions = ref([]);
const testBlancCurrentIndex = ref(0);
const testBlancAnswers = ref([]);
const testBlancScore = ref(0);
const testBlancTimeLeft = ref(0);
let testBlancTimer = null;
const selectedTestBlancType = ref('complet');

const testBlancQuestionsParType = {
  complet: [
    { id: 1, question: 'Quelle est la capitale du Cameroun ?', options: ['Douala', 'Yaoundé', 'Garoua', 'Bafoussam'], correct: 'Yaoundé', explanation: 'Yaoundé est la capitale politique du Cameroun.' },
    { id: 2, question: 'Qui est le garant de l\'indépendance judiciaire ?', options: ['Le Président', 'Le Premier ministre', 'Le Garde des Sceaux', 'Le Parlement'], correct: 'Le Président', explanation: 'Le Président est garant de l\'indépendance judiciaire.' },
    { id: 3, question: 'Que vaut 2³ ?', options: ['6', '8', '9', '4'], correct: '8', explanation: '2³ = 8' },
    { id: 4, question: 'Quelle est la devise de la France ?', options: ['Liberté, Égalité, Fraternité', 'Travail, Famille, Patrie', 'Unité, Progrès', 'Paix, Liberté'], correct: 'Liberté, Égalité, Fraternité', explanation: 'Devise officielle de la France.' }
  ],
  culture: [
    { id: 1, question: 'Quelle est la capitale du Cameroun ?', options: ['Douala', 'Yaoundé', 'Garoua', 'Bafoussam'], correct: 'Yaoundé', explanation: 'Yaoundé est la capitale politique.' }
  ],
  droit: [
    { id: 1, question: 'Qu\'est-ce qu\'un acte administratif ?', options: ['Décision', 'Contrat', 'Loi', 'Jugement'], correct: 'Décision', explanation: 'Acte pris par l\'administration.' }
  ],
  maths: [
    { id: 1, question: 'Que vaut 2³ ?', options: ['6', '8', '9', '4'], correct: '8', explanation: '2³ = 8' }
  ]
};

// ==================== ÉTATS VIDÉOS ====================
const filtreCategorie = ref('all');
const searchVideo = ref('');
const selectedVideo = ref(null);

const videosList = ref([
  { id: 1, titre: 'Introduction aux concours administratifs', formateur: 'Prof. Jean Martin', duree: '45 min', categorie: 'culture', url: 'https://youtu.be/GwCpdjh6tog?si=2kubC7hi9_W7CC7B', description: 'Présentation des différents concours et méthodologie de préparation.' },
  { id: 2, titre: 'Droit Administratif - Les bases', formateur: 'Dr. Marie Claire', duree: '1h', categorie: 'droit', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Les principes fondamentaux du droit administratif.' },
  { id: 3, titre: 'Mathématiques - Algèbre linéaire', formateur: 'Prof. Paul André', duree: '1h15', categorie: 'maths', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Cours complet sur l\'algèbre linéaire.' }
]);

const filteredVideos = computed(() => {
  let result = videosList.value;
  if (filtreCategorie.value !== 'all') result = result.filter(v => v.categorie === filtreCategorie.value);
  if (searchVideo.value) result = result.filter(v => v.titre.toLowerCase().includes(searchVideo.value.toLowerCase()));
  return result;
});

// ==================== ÉTATS CLASSES VIRTUELLES ====================
const filtreClasse = ref('all');
const searchClasse = ref('');

const sessionsList = ref([
  { id: 1, titre: 'Révision Culture Générale', formateur: 'Prof. Jean Martin', date: '15 Avril 2025', heure: '18h00', type: 'revision', description: 'Session de révision intensive sur les chapitres clés.', placesMax: 50, inscrits: 32, statut: 'a_venir', inscrit: false },
  { id: 2, titre: 'Cours de Droit Administratif', formateur: 'Dr. Marie Claire', date: '16 Avril 2025', heure: '17h00', type: 'cours', description: 'Cours sur la responsabilité administrative.', placesMax: 100, inscrits: 78, statut: 'a_venir', inscrit: false },
  { id: 3, titre: 'Atelier Mathématiques', formateur: 'Prof. Paul André', date: '14 Avril 2025', heure: '15h00', type: 'cours', description: 'Exercices corrigés sur les probabilités.', placesMax: 40, inscrits: 40, statut: 'en_cours', inscrit: true }
]);

const filteredSessions = computed(() => {
  let result = sessionsList.value;
  if (filtreClasse.value === 'a_venir') result = result.filter(s => s.statut === 'a_venir');
  if (filtreClasse.value === 'passees') result = result.filter(s => s.statut === 'termine');
  if (searchClasse.value) result = result.filter(s => s.titre.toLowerCase().includes(searchClasse.value.toLowerCase()));
  return result;
});

// ==================== FONCTIONS ====================
const closeInscriptionModal = () => {
  inscriptionModalOpen.value = false;
};

// QUIZ
const openQuizModal = () => { quizModalOpen.value = true; resetQuiz(); };
const closeQuizModal = () => { if (quizTimer) clearInterval(quizTimer); quizModalOpen.value = false; resetQuiz(); };
const selectChapitre = (chapitre) => { selectedChapitre.value = chapitre; };

const startQuiz = () => {
  quizQuestions.value = questionsParChapitre[selectedChapitre.value] || questionsParChapitre['Culture Générale'];
  quizStarted.value = true;
  quizFinished.value = false;
  currentQuizIndex.value = 0;
  quizScore.value = 0;
  quizUserAnswers.value = [];
  quizSelectedAnswer.value = '';
  quizTimeLeft.value = 180;
  if (quizTimer) clearInterval(quizTimer);
  quizTimer = setInterval(() => {
    if (quizTimeLeft.value > 0 && quizStarted.value) quizTimeLeft.value--;
    else if (quizTimeLeft.value <= 0) finishQuiz();
  }, 1000);
};

const formatQuizTime = computed(() => {
  const m = Math.floor(quizTimeLeft.value / 60);
  const s = quizTimeLeft.value % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

const selectQuizAnswer = (answer) => { quizSelectedAnswer.value = answer; };
const prevQuizQuestion = () => { if (currentQuizIndex.value > 0) { currentQuizIndex.value--; quizSelectedAnswer.value = quizUserAnswers.value[currentQuizIndex.value] || ''; } };

const nextQuizQuestion = () => {
  if (quizSelectedAnswer.value) {
    const isCorrect = quizSelectedAnswer.value === quizQuestions.value[currentQuizIndex.value].correct;
    if (isCorrect) quizScore.value += 10;
    quizUserAnswers.value[currentQuizIndex.value] = quizSelectedAnswer.value;
    quizSelectedAnswer.value = '';
    if (currentQuizIndex.value < quizQuestions.value.length - 1) currentQuizIndex.value++;
    else finishQuiz();
  } else alert('Veuillez sélectionner une réponse');
};

const finishQuiz = () => { if (quizTimer) clearInterval(quizTimer); quizStarted.value = false; quizFinished.value = true; };
const resetQuiz = () => { if (quizTimer) clearInterval(quizTimer); quizStarted.value = false; quizFinished.value = false; currentQuizIndex.value = 0; quizScore.value = 0; quizUserAnswers.value = []; quizSelectedAnswer.value = ''; quizTimeLeft.value = 180; };

// ANNALES
const openAnnalesModal = () => { annalesModalOpen.value = true; };
const closeAnnalesModal = () => { annalesModalOpen.value = false; };
const telechargerSujet = (annale) => { alert(`Téléchargement du sujet : ${annale.titre}`); };
const voirCorrige = (annale) => { alert(`Consultation du corrigé : ${annale.titre}`); };

// TEST BLANC (protégé)
const openTestBlancModal = () => { 
  if (isAuthenticated.value) { 
    testBlancModalOpen.value = true; 
    resetTestBlanc(); 
  } else { 
    showInscriptionRequired(); 
  } 
};
const closeTestBlancModal = () => { if (testBlancTimer) clearInterval(testBlancTimer); testBlancModalOpen.value = false; resetTestBlanc(); };

const startTestBlanc = () => {
  testBlancQuestions.value = testBlancQuestionsParType[selectedTestBlancType.value] || testBlancQuestionsParType.complet;
  testBlancStarted.value = true;
  testBlancFinished.value = false;
  testBlancCurrentIndex.value = 0;
  testBlancAnswers.value = [];
  testBlancScore.value = 0;
  testBlancTimeLeft.value = 3600;
  if (testBlancTimer) clearInterval(testBlancTimer);
  testBlancTimer = setInterval(() => {
    if (testBlancTimeLeft.value > 0 && testBlancStarted.value) testBlancTimeLeft.value--;
    else if (testBlancTimeLeft.value <= 0) finishTestBlanc();
  }, 1000);
};

const formatTestBlancTime = computed(() => {
  const m = Math.floor(testBlancTimeLeft.value / 60);
  const s = testBlancTimeLeft.value % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

const selectTestBlancAnswer = (answer) => { testBlancAnswers.value[testBlancCurrentIndex.value] = answer; };
const prevTestBlancQuestion = () => { if (testBlancCurrentIndex.value > 0) testBlancCurrentIndex.value--; };
const nextTestBlancQuestion = () => { if (testBlancCurrentIndex.value < testBlancQuestions.value.length - 1) testBlancCurrentIndex.value++; else finishTestBlanc(); };

const finishTestBlanc = () => {
  if (testBlancTimer) clearInterval(testBlancTimer);
  let score = 0;
  testBlancQuestions.value.forEach((q, idx) => { if (testBlancAnswers.value[idx] === q.correct) score += 10; });
  testBlancScore.value = score;
  testBlancStarted.value = false;
  testBlancFinished.value = true;
};

const resetTestBlanc = () => {
  if (testBlancTimer) clearInterval(testBlancTimer);
  testBlancStarted.value = false;
  testBlancFinished.value = false;
  testBlancAnswers.value = [];
  testBlancScore.value = 0;
  testBlancCurrentIndex.value = 0;
};

// VIDÉOS (protégé)
const openVideoModal = () => { 
  if (isAuthenticated.value) { 
    videoModalOpen.value = true; 
  } else { 
    showInscriptionRequired(); 
  } 
};
const closeVideoModal = () => { videoModalOpen.value = false; selectedVideo.value = null; };

// CLASSES VIRTUELLES (protégé)
const openClasseVirtuelleModal = () => { 
  if (isAuthenticated.value) { 
    classeVirtuelleModalOpen.value = true; 
  } else { 
    showInscriptionRequired(); 
  } 
};
const closeClasseVirtuelleModal = () => { classeVirtuelleModalOpen.value = false; };

const inscrireSession = (session) => {
  if (session.inscrits < session.placesMax) {
    session.inscrits++;
    session.inscrit = true;
    alert(`Vous êtes inscrit à la session "${session.titre}" du ${session.date} à ${session.heure}.`);
  } else {
    alert('Désolé, cette session est complète.');
  }
};

const rejoindreSession = (session) => {
  alert(`Vous allez rejoindre la session "${session.titre}".`);
  window.open('https://meet.google.com/', '_blank');
};

const voirReplay = (session) => {
  alert(`Visionnage du replay de "${session.titre}"`);
};

const ajouterRappel = (session) => {
  alert(`Un rappel sera envoyé avant la session "${session.titre}" du ${session.date}.`);
};

// ==================== INIT ====================
onMounted(() => {
  checkAuth();
});

onUnmounted(() => {
  if (quizTimer) clearInterval(quizTimer);
  if (testBlancTimer) clearInterval(testBlancTimer);
});
</script>

<style scoped>
.gradient-bg { background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%); }
.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
</style>
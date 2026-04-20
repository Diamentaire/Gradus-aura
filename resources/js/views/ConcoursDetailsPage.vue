<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- EN-TÊTE DU CONCOURS -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-16">
      <div class="absolute inset-0 opacity-20">
        <img :src="concours.image" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
          <i class="fas fa-trophy text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">{{ concours.categorie }} • Mise à jour 2025</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ concours.nom }}</h1>
        <p class="text-indigo-100 text-lg max-w-2xl mx-auto">{{ concours.description }}</p>
        
        <!-- Stats rapides du concours -->
        <div class="flex flex-wrap justify-center gap-6 mt-8">
          <div class="bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
            <i class="fas fa-calendar-alt text-white mr-2"></i>
            <span class="text-white">Date : {{ concours.date }}</span>
          </div>
          <div class="bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
            <i class="fas fa-chart-line text-white mr-2"></i>
            <span class="text-white">Coefficient : {{ concours.coefficient }}</span>
          </div>
          <div class="bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
            <i class="fas fa-users text-white mr-2"></i>
            <span class="text-white">{{ concours.candidats }} candidats préparés</span>
          </div>
        </div>
      </div>
    </section>

    <!-- NAVIGATION TABS -->
    <div class="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div class="container mx-auto px-5">
        <div class="flex overflow-x-auto gap-1">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="['px-5 py-3 font-semibold transition-all whitespace-nowrap', activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700']">
            <i :class="tab.icon + ' mr-2'"></i> {{ tab.nom }}
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-5 py-8">
      <!-- ==================== TAB 1 : PRÉSENTATION ==================== -->
      <div v-if="activeTab === 'presentation'" class="max-w-4xl mx-auto">
        <!-- Matières et coefficients -->
        <div class="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-book-open text-primary mr-2"></i> Matières et coefficients</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="matiere in concours.matieresDetail" :key="matiere.nom" class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span class="font-medium"><i :class="matiere.icon" class="text-primary mr-2"></i>{{ matiere.nom }}</span>
              <span class="text-primary font-bold">Coefficient {{ matiere.coefficient }}</span>
            </div>
          </div>
        </div>

        <!-- Dates clés -->
        <div class="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-calendar-alt text-primary mr-2"></i> Calendrier du concours</h2>
          <div class="space-y-3">
            <div v-for="date in concours.dates" :key="date.label" class="flex justify-between items-center p-3 border-b border-gray-100">
              <span class="text-gray-600">{{ date.label }}</span>
              <span class="font-semibold text-gray-800">{{ date.date }}</span>
            </div>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-2xl p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-chart-line text-primary mr-2"></i> Statistiques du concours</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-primary">{{ concours.statistiques.tauxReussite }}%</p>
              <p class="text-sm text-gray-500">Taux de réussite</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-primary">{{ concours.statistiques.nombrePlaces }}</p>
              <p class="text-sm text-gray-500">Places disponibles</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-primary">{{ concours.statistiques.nombreCandidats }}k+</p>
              <p class="text-sm text-gray-500">Candidats par an</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-primary">{{ concours.statistiques.noteAdmission }}/20</p>
              <p class="text-sm text-gray-500">Moyenne admission</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB 2 : CONTENUS PÉDAGOGIQUES ==================== -->
      <div v-if="activeTab === 'contenus'">
        <!-- Barre de recherche et filtres -->
        <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div class="relative flex-1 max-w-md">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input type="text" v-model="searchCours" placeholder="Rechercher un cours..." class="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none">
          </div>
          <div class="flex gap-2">
            <button @click="filtreTypeCours = 'all'" :class="['px-3 py-1 rounded-full text-sm', filtreTypeCours === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600']">Tous</button>
            <button @click="filtreTypeCours = 'pdf'" :class="['px-3 py-1 rounded-full text-sm', filtreTypeCours === 'pdf' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600']">PDF</button>
            <button @click="filtreTypeCours = 'video'" :class="['px-3 py-1 rounded-full text-sm', filtreTypeCours === 'video' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600']">Vidéos</button>
          </div>
        </div>

        <!-- Liste des matières avec leurs chapitres -->
        <div v-for="matiere in concours.matieresDetail" :key="matiere.nom" class="mb-8">
          <div class="flex items-center justify-between mb-4 cursor-pointer" @click="toggleMatiere(matiere.nom)">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <i :class="matiere.icon" class="text-primary"></i> {{ matiere.nom }}
              <span class="text-sm text-gray-400 font-normal">(Coeff {{ matiere.coefficient }})</span>
            </h2>
            <i :class="matieresOuvertes.includes(matiere.nom) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-400"></i>
          </div>
          
          <div v-if="matieresOuvertes.includes(matiere.nom)" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="chapitre in getChapitresByMatiere(matiere.nom)" :key="chapitre.id" class="bg-white rounded-xl shadow-sm border hover:shadow-md transition group">
              <div class="p-4">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg" :class="chapitre.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'">
                      <i :class="chapitre.type === 'pdf' ? 'fas fa-file-pdf text-red-500' : 'fas fa-video text-blue-500'" class="text-lg w-full h-full flex items-center justify-center"></i>
                    </div>
                    <h3 class="font-bold text-gray-800">{{ chapitre.titre }}</h3>
                  </div>
                  <span class="text-xs text-gray-400">{{ chapitre.duree }}</span>
                </div>
                <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ chapitre.description }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex gap-1">
                    <span v-if="chapitre.vu" class="text-xs text-green-600"><i class="fas fa-check-circle"></i> Vu</span>
                    <span v-else class="text-xs text-gray-400">Non commencé</span>
                  </div>
                  <button @click="ouvrirRessource(chapitre)" class="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                    <i class="fas" :class="chapitre.type === 'pdf' ? 'fa-file-pdf' : 'fa-play'"></i> {{ chapitre.type === 'pdf' ? 'Lire' : 'Regarder' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal de lecture PDF/Vidéo -->
        <div v-if="ressourceModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" @click.self="closeRessourceModal">
          <div class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div class="flex justify-between items-center p-4 border-b">
              <h3 class="font-bold">{{ currentRessource?.titre }}</h3>
              <button @click="closeRessourceModal" class="w-8 h-8 rounded-full hover:bg-gray-100"><i class="fas fa-times"></i></button>
            </div>
            <div class="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div v-if="currentRessource?.type === 'pdf'">
                <iframe :src="currentRessource.url" class="w-full h-[70vh]" frameborder="0"></iframe>
              </div>
              <div v-else-if="currentRessource?.type === 'video'">
                <iframe :src="currentRessource.url" class="w-full h-[70vh]" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB 3 : EXERCICES ET ENTRAÎNEMENTS ==================== -->
      <div v-if="activeTab === 'exercices'">
        <!-- Filtres -->
        <div class="flex flex-wrap gap-3 mb-6">
          <button v-for="dif in ['Tous', 'Facile', 'Moyen', 'Difficile']" :key="dif" @click="filtreDifficulte = dif" :class="['px-4 py-2 rounded-full text-sm font-medium transition', filtreDifficulte === dif ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']">
            {{ dif }}
          </button>
          <select v-model="filtreMatiereExercice" class="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm">
            <option value="all">Toutes matières</option>
            <option v-for="m in concours.matieresDetail" :key="m.nom" :value="m.nom">{{ m.nom }}</option>
          </select>
        </div>

        <!-- Statistiques d'entraînement -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-xl p-4 text-center shadow-sm border">
            <i class="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
            <p class="text-2xl font-bold text-gray-800">{{ statsExercices.completed }}/{{ statsExercices.total }}</p>
            <p class="text-xs text-gray-500">Exercices complétés</p>
          </div>
          <div class="bg-white rounded-xl p-4 text-center shadow-sm border">
            <i class="fas fa-chart-line text-primary text-2xl mb-2"></i>
            <p class="text-2xl font-bold text-gray-800">{{ statsExercices.moyenne }}%</p>
            <p class="text-xs text-gray-500">Moyenne générale</p>
          </div>
          <div class="bg-white rounded-xl p-4 text-center shadow-sm border">
            <i class="fas fa-clock text-orange-500 text-2xl mb-2"></i>
            <p class="text-2xl font-bold text-gray-800">{{ statsExercices.tempsTotal }}h</p>
            <p class="text-xs text-gray-500">Temps d'étude</p>
          </div>
          <div class="bg-white rounded-xl p-4 text-center shadow-sm border">
            <i class="fas fa-trophy text-yellow-500 text-2xl mb-2"></i>
            <p class="text-2xl font-bold text-gray-800">{{ statsExercices.meilleurScore }}%</p>
            <p class="text-xs text-gray-500">Meilleur score</p>
          </div>
        </div>

        <!-- Liste des exercices -->
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="exercice in exercicesFiltres" :key="exercice.id" class="bg-white rounded-xl shadow-sm border hover:shadow-md transition">
            <div class="p-5">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-bold text-gray-800">{{ exercice.titre }}</h3>
                  <p class="text-sm text-gray-500">{{ exercice.matiere }} • {{ exercice.questions }} questions</p>
                </div>
                <span :class="exercice.difficulte === 'Facile' ? 'bg-green-100 text-green-700' : exercice.difficulte === 'Moyen' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded-full text-xs font-bold">
                  {{ exercice.difficulte }}
                </span>
              </div>
              
              <!-- Barre de progression -->
              <div class="mb-3">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-500">Progression</span>
                  <span class="text-primary font-medium">{{ exercice.progression || 0 }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-1.5">
                  <div class="bg-primary h-1.5 rounded-full" :style="{ width: (exercice.progression || 0) + '%' }"></div>
                </div>
              </div>
              
              <div class="flex gap-2">
                <button @click="lancerExercice(exercice)" class="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition">
                  <i class="fas fa-play mr-1"></i> Commencer
                </button>
                <button @click="voirCorrige(exercice)" class="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB 4 : SUJETS PRÉCÉDENTS ==================== -->
      <div v-if="activeTab === 'annales'">
        <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h2 class="text-xl font-bold text-gray-800"><i class="fas fa-archive text-primary mr-2"></i> Annales et sujets corrigés</h2>
          <select v-model="anneeFilter" class="px-4 py-2 rounded-xl border border-gray-200">
            <option value="all">Toutes années</option>
            <option v-for="a in anneesDisponibles" :key="a" :value="a">{{ a }}</option>
          </select>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="annale in annalesFiltrees" :key="annale.id" class="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <i class="fas fa-file-pdf text-red-500 text-xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">{{ annale.titre }}</h3>
                <p class="text-xs text-gray-500">{{ annale.annee }} • {{ annale.matiere }} • Durée {{ annale.duree }}</p>
              </div>
            </div>
            <div class="flex gap-2 mt-3">
              <button @click="telechargerSujet(annale)" class="flex-1 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition">
                <i class="fas fa-download mr-1"></i> Sujet
              </button>
              <button @click="voirCorrection(annale)" class="flex-1 py-2 border border-green-500 text-green-600 rounded-lg text-sm font-bold hover:bg-green-500 hover:text-white transition">
                <i class="fas fa-check-circle mr-1"></i> Corrigé
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== TAB 5 : TESTS BLANCS ==================== -->
      <div v-if="activeTab === 'testsBlancs'">
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div v-for="test in testsBlancs" :key="test.id" class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-800">{{ test.titre }}</h3>
              <span class="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">Chronométré</span>
            </div>
            <p class="text-gray-500 mb-3">{{ test.description }}</p>
            <div class="flex justify-between text-sm text-gray-500 mb-4">
              <span><i class="fas fa-clock mr-1"></i> {{ test.duree }} min</span>
              <span><i class="fas fa-question-circle mr-1"></i> {{ test.questions }} questions</span>
              <span><i class="fas fa-chart-line mr-1"></i> {{ test.points }} pts</span>
            </div>
            <button @click="lancerTestBlanc(test)" class="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-lg transition">
              <i class="fas fa-play mr-2"></i> Commencer le test blanc
            </button>
          </div>
        </div>

        <!-- Historique des tests -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4"><i class="fas fa-history text-primary mr-2"></i> Historique des tests</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="p-3 text-left">Test</th>
                  <th class="p-3 text-left">Date</th>
                  <th class="p-3 text-left">Score</th>
                  <th class="p-3 text-left">Temps</th>
                  <th class="p-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="historique in historiqueTests" :key="historique.id" class="border-b">
                  <td class="p-3 font-medium">{{ historique.testNom }}</td>
                  <td class="p-3 text-gray-500">{{ historique.date }}</td>
                  <td class="p-3"><span :class="historique.score >= 70 ? 'text-green-600 font-bold' : 'text-orange-600'">{{ historique.score }}%</span></td>
                  <td class="p-3 text-gray-500">{{ historique.temps }}</td>
                  <td class="p-3"><button @click="revoirTest(historique)" class="text-primary text-sm">Revoir</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ==================== TAB 6 : ÉVALUATIONS & STATS ==================== -->
      <div v-if="activeTab === 'evaluations'">
        <div class="grid lg:grid-cols-3 gap-6 mb-8">
          <!-- Graphique progression -->
          <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Progression globale</h3>
            <canvas ref="progressionChartCanvas" height="200"></canvas>
          </div>
          
          <!-- Stats par matière -->
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Performance par matière</h3>
            <div class="space-y-4">
              <div v-for="stat in statsParMatiere" :key="stat.nom">
                <div class="flex justify-between text-sm mb-1">
                  <span>{{ stat.nom }}</span>
                  <span class="font-medium">{{ stat.score }}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" :style="{ width: stat.score + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Classement -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4"><i class="fas fa-trophy text-yellow-500 mr-2"></i> Classement des apprenants</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="p-3 text-center">#</th>
                  <th class="p-3 text-left">Apprenant</th>
                  <th class="p-3 text-center">Score moyen</th>
                  <th class="p-3 text-center">Tests complétés</th>
                  <th class="p-3 text-center">Temps total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(apprenant, idx) in classement" :key="apprenant.id" class="border-b">
                  <td class="p-3 text-center font-bold">
                    <span v-if="idx === 0" class="text-yellow-500"><i class="fas fa-crown"></i> {{ idx+1 }}</span>
                    <span v-else-if="idx === 1" class="text-gray-400"><i class="fas fa-medal"></i> {{ idx+1 }}</span>
                    <span v-else-if="idx === 2" class="text-amber-600"><i class="fas fa-medal"></i> {{ idx+1 }}</span>
                    <span v-else>{{ idx+1 }}</span>
                  </td>
                  <td class="p-3 font-medium">{{ apprenant.nom }}</td>
                  <td class="p-3 text-center"><span class="text-primary font-bold">{{ apprenant.scoreMoyen }}%</span></td>
                  <td class="p-3 text-center">{{ apprenant.testsCompletes }}</td>
                  <td class="p-3 text-center">{{ apprenant.tempsTotal }}h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL EXERCICE (QCM) ==================== -->
    <div v-if="exerciceModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" @click.self="closeExerciceModal">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div>
            <h3 class="font-bold text-gray-800">{{ currentExercice?.titre }}</h3>
            <p class="text-xs text-gray-500">{{ currentExercice?.matiere }} • {{ currentExercice?.difficulte }}</p>
          </div>
          <button @click="closeExerciceModal" class="w-8 h-8 rounded-full hover:bg-gray-200"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div v-if="!quizStarted && !quizFinished">
            <div class="text-center mb-6">
              <i class="fas fa-info-circle text-primary text-4xl mb-3"></i>
              <p class="text-gray-600">Cet exercice contient {{ currentExercice?.questions }} questions.</p>
              <p class="text-gray-500 text-sm mt-2">Correction immédiate à la fin.</p>
            </div>
            <button @click="startExerciceQuiz" class="w-full py-3 bg-primary text-white rounded-xl font-bold">Commencer l'exercice</button>
          </div>
          
          <div v-else-if="quizStarted && !quizFinished">
            <div class="flex justify-between items-center mb-6">
              <span class="text-sm text-gray-500">Question {{ quizCurrentIndex + 1 }}/{{ quizQuestionsList.length }}</span>
              <span class="text-sm font-bold text-primary">{{ quizScore }}/{{ quizQuestionsList.length * 10 }} pts</span>
            </div>
            
            <div class="mb-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4">{{ quizQuestionsList[quizCurrentIndex]?.question }}</h3>
              <div class="space-y-3">
                <div v-for="(opt, idx) in quizQuestionsList[quizCurrentIndex]?.options" :key="idx" @click="selectAnswer(opt)" :class="['p-3 rounded-xl border cursor-pointer transition', quizSelectedAnswer === opt ? 'bg-primary/10 border-primary' : 'border-gray-200 hover:bg-gray-50']">
                  <span class="text-sm">{{ opt }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between">
              <button @click="prevQuizQuestion" :disabled="quizCurrentIndex === 0" class="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50">Précédent</button>
              <button @click="nextQuizQuestion" class="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                {{ quizCurrentIndex === quizQuestionsList.length - 1 ? 'Terminer' : 'Suivant' }}
              </button>
            </div>
          </div>
          
          <div v-else class="text-center">
            <i class="fas fa-check-circle text-green-500 text-5xl mb-3"></i>
            <h3 class="text-xl font-bold text-gray-800">Exercice terminé</h3>
            <p class="text-gray-600 mt-2">Votre score : {{ quizScore }}/{{ quizQuestionsList.length * 10 }}</p>
            <p class="text-sm text-gray-500">Soit {{ Math.round(quizScore / (quizQuestionsList.length * 10) * 100) }}% de réussite</p>
            
            <div class="text-left mt-6">
              <h4 class="font-bold mb-3">Correction détaillée :</h4>
              <div v-for="(q, idx) in quizQuestionsList" :key="idx" class="mb-4 p-3 border-b">
                <p class="font-medium">{{ q.question }}</p>
                <p class="text-sm text-green-600"><i class="fas fa-check-circle mr-1"></i> Bonne réponse : {{ q.correct }}</p>
                <p v-if="quizUserAnswers[idx] && quizUserAnswers[idx] !== q.correct" class="text-sm text-red-600"><i class="fas fa-times-circle mr-1"></i> Votre réponse : {{ quizUserAnswers[idx] }}</p>
                <p class="text-xs text-gray-500 mt-1"><i class="fas fa-lightbulb mr-1"></i> {{ q.explanation }}</p>
              </div>
            </div>
            
            <button @click="closeExerciceModal" class="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold">Fermer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL TEST BLANC CHRONOMÉTRÉ ==================== -->
    <div v-if="testBlancModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" @click.self="closeTestBlancModal">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
          <div>
            <h3 class="font-bold text-gray-800">{{ currentTestBlanc?.titre }}</h3>
            <p class="text-xs text-gray-500">Chronométré - Temps limité : {{ currentTestBlanc?.duree }} min</p>
          </div>
          <button @click="closeTestBlancModal" class="w-8 h-8 rounded-full hover:bg-gray-200"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div v-if="!testBlancStarted && !testBlancFinished">
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <p class="text-sm text-yellow-800"><i class="fas fa-exclamation-triangle mr-2"></i> Conditions réelles :</p>
              <ul class="text-xs text-yellow-700 mt-2 list-disc list-inside">
                <li>Durée limitée : {{ currentTestBlanc?.duree }} minutes</li>
                <li>Pas de pause possible</li>
                <li>Correction automatique à la fin</li>
              </ul>
            </div>
            <button @click="startTestBlanc" class="w-full py-3 bg-red-600 text-white rounded-xl font-bold">Commencer le test blanc</button>
          </div>
          
          <div v-else-if="testBlancStarted && !testBlancFinished">
            <div class="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg z-50">
              <i class="fas fa-hourglass-half mr-2"></i> {{ formatTestBlancTime }}
            </div>
            
            <div class="mb-6">
              <span class="text-sm text-gray-500">Question {{ testBlancCurrentIndex + 1 }}/{{ testBlancQuestionsList.length }}</span>
              <h3 class="text-lg font-bold text-gray-800 mt-2">{{ testBlancQuestionsList[testBlancCurrentIndex]?.question }}</h3>
              <div class="space-y-3 mt-4">
                <div v-for="(opt, idx) in testBlancQuestionsList[testBlancCurrentIndex]?.options" :key="idx" @click="selectTestBlancAnswer(opt)" :class="['p-3 rounded-xl border cursor-pointer transition', testBlancAnswers[testBlancCurrentIndex] === opt ? 'bg-primary/10 border-primary' : 'border-gray-200 hover:bg-gray-50']">
                  <span class="text-sm">{{ opt }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex justify-between">
              <button @click="prevTestBlancQuestion" :disabled="testBlancCurrentIndex === 0" class="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-50">Précédent</button>
              <button @click="nextTestBlancQuestion" class="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                {{ testBlancCurrentIndex === testBlancQuestionsList.length - 1 ? 'Terminer' : 'Suivant' }}
              </button>
            </div>
          </div>
          
          <div v-else class="text-center">
            <i class="fas fa-chart-line text-primary text-5xl mb-3"></i>
            <h3 class="text-xl font-bold text-gray-800">Test blanc terminé</h3>
            <p class="text-gray-600 mt-2">Votre score : {{ testBlancScore }}/{{ testBlancQuestionsList.length * 10 }}</p>
            <p class="text-sm text-gray-500">Soit {{ Math.round(testBlancScore / (testBlancQuestionsList.length * 10) * 100) }}% de réussite</p>
            
            <div class="text-left mt-6">
              <h4 class="font-bold mb-3">Résultats détaillés :</h4>
              <div v-for="(q, idx) in testBlancQuestionsList" :key="idx" class="mb-4 p-3 border-b">
                <p class="font-medium">{{ q.question }}</p>
                <p class="text-sm text-green-600"><i class="fas fa-check-circle mr-1"></i> Bonne réponse : {{ q.correct }}</p>
                <p v-if="testBlancAnswers[idx] && testBlancAnswers[idx] !== q.correct" class="text-sm text-red-600"><i class="fas fa-times-circle mr-1"></i> Votre réponse : {{ testBlancAnswers[idx] }}</p>
              </div>
            </div>
            
            <button @click="closeTestBlancModal" class="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Chart from 'chart.js/auto';

const route = useRoute();
const router = useRouter();

// ==================== DONNÉES DU CONCOURS ====================
const concours = ref({
  id: 1,
  nom: 'Concours Administratifs',
  categorie: 'administratifs',
  description: 'Préparez-vous efficacement aux concours de la fonction publique : ENAM, INJS, ENIEG, IRIC, MINFI...',
  image: 'https://images.pexels.com/photos/5668861/pexels-photo-5668861.jpeg',
  date: 'Juin 2025',
  coefficient: 'Variables selon filière',
  candidats: '5000+',
  matieresDetail: [
    { nom: 'Culture Générale', coefficient: 3, icon: 'fas fa-globe' },
    { nom: 'Droit Administratif', coefficient: 4, icon: 'fas fa-gavel' },
    { nom: 'Mathématiques', coefficient: 2, icon: 'fas fa-calculator' },
    { nom: 'Français', coefficient: 3, icon: 'fas fa-language' },
    { nom: 'Anglais', coefficient: 2, icon: 'fas fa-comments' },
    { nom: 'Économie', coefficient: 2, icon: 'fas fa-chart-line' }
  ],
  dates: [
    { label: 'Ouverture des inscriptions', date: '1er Mars 2025' },
    { label: 'Clôture des inscriptions', date: '30 Avril 2025' },
    { label: 'Date des épreuves écrites', date: '15-20 Juin 2025' },
    { label: 'Publication des résultats', date: '15 Juillet 2025' }
  ],
  statistiques: {
    tauxReussite: 35,
    nombrePlaces: 500,
    nombreCandidats: 15,
    noteAdmission: 12.5
  }
});

// ==================== CONTENUS PÉDAGOGIQUES ====================
const coursParMatiere = ref({
  'Culture Générale': [
    { id: 1, titre: 'Introduction à la Culture Générale', type: 'pdf', duree: '30 min', url: 'https://www.cairn.info/revue-culture-generale-2025-1.htm', description: 'Les bases essentielles pour réussir les épreuves de culture générale.', vu: false },
    { id: 2, titre: 'Histoire politique de la France', type: 'video', duree: '45 min', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Cours vidéo sur l\'histoire politique française.', vu: false },
    { id: 3, titre: 'Géographie économique mondiale', type: 'pdf', duree: '1h', url: 'https://www.cairn.info/geographie-economique-mondiale--9782707149330.htm', description: 'Les enjeux géopolitiques contemporains.', vu: false },
    { id: 4, titre: 'Actualités 2024-2025', type: 'video', duree: '1h', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Revue de presse des événements marquants.', vu: false }
  ],
  'Droit Administratif': [
    { id: 5, titre: 'Introduction au droit administratif', type: 'pdf', duree: '45 min', url: 'https://www.cairn.info/droit-administratif--9782130814313.htm', description: 'Les principes fondamentaux du droit administratif.', vu: false },
    { id: 6, titre: 'La responsabilité administrative', type: 'video', duree: '50 min', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Cours sur la responsabilité de l\'administration.', vu: false },
    { id: 7, titre: 'Les actes administratifs', type: 'pdf', duree: '1h', url: 'https://www.cairn.info/les-actes-administratifs--9782275047328.htm', description: 'Typologie et régime juridique des actes.', vu: false }
  ],
  'Mathématiques': [
    { id: 8, titre: 'Algèbre linéaire', type: 'pdf', duree: '1h', url: 'https://www.cairn.info/algebre-lineaire--9782340012134.htm', description: 'Matrices, déterminants, systèmes linéaires.', vu: false },
    { id: 9, titre: 'Analyse numérique', type: 'video', duree: '1h15', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Suites, fonctions, limites.', vu: false },
    { id: 10, titre: 'Probabilités et statistiques', type: 'pdf', duree: '1h', url: 'https://www.cairn.info/probabilites-statistiques--9782311406984.htm', description: 'Les bases des probabilités pour les concours.', vu: false }
  ],
  'Français': [
    { id: 11, titre: 'Grammaire française', type: 'pdf', duree: '45 min', url: 'https://www.cairn.info/grammaire-francaise--9782091615350.htm', description: 'Règles essentielles de grammaire.', vu: false },
    { id: 12, titre: 'La dissertation', type: 'video', duree: '1h', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Méthodologie de la dissertation en concours.', vu: false },
    { id: 13, titre: 'Le commentaire de texte', type: 'pdf', duree: '50 min', url: 'https://www.cairn.info/le-commentaire-de-texte--9782091617958.htm', description: 'Techniques d\'analyse de texte.', vu: false }
  ],
  'Anglais': [
    { id: 14, titre: 'Anglais des affaires', type: 'pdf', duree: '1h', url: 'https://www.cairn.info/anglais-des-affaires--9782091614568.htm', description: 'Vocabulaire professionnel anglais.', vu: false },
    { id: 15, titre: 'Compréhension orale', type: 'video', duree: '45 min', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Exercices d\'écoute et compréhension.', vu: false }
  ],
  'Économie': [
    { id: 16, titre: 'Microéconomie', type: 'pdf', duree: '1h', url: 'https://www.cairn.info/microeconomie--9782340015128.htm', description: 'Les bases de la microéconomie.', vu: false },
    { id: 17, titre: 'Macroéconomie', type: 'video', duree: '1h15', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Politiques économiques et conjoncture.', vu: false }
  ]
});

// ==================== EXERCICES ET QCM ====================
const exercicesList = ref([
  { id: 1, titre: 'QCM Culture Générale - Série 1', matiere: 'Culture Générale', difficulte: 'Facile', questions: 20, progression: 0, questionsData: genererQuestions('Culture Générale', 20) },
  { id: 2, titre: 'QCM Droit Administratif - Série 1', matiere: 'Droit Administratif', difficulte: 'Moyen', questions: 25, progression: 0, questionsData: genererQuestions('Droit Administratif', 25) },
  { id: 3, titre: 'Exercices Mathématiques - Algèbre', matiere: 'Mathématiques', difficulte: 'Difficile', questions: 15, progression: 0, questionsData: genererQuestions('Mathématiques', 15) },
  { id: 4, titre: 'QCM Français - Grammaire', matiere: 'Français', difficulte: 'Facile', questions: 20, progression: 0, questionsData: genererQuestions('Français', 20) },
  { id: 5, titre: 'QCM Anglais - Vocabulaire', matiere: 'Anglais', difficulte: 'Moyen', questions: 30, progression: 0, questionsData: genererQuestions('Anglais', 30) },
  { id: 6, titre: 'Exercices Économie - Micro', matiere: 'Économie', difficulte: 'Difficile', questions: 20, progression: 0, questionsData: genererQuestions('Économie', 20) }
]);

function genererQuestions(matiere, nb) {
  const questions = [];
  for (let i = 1; i <= nb; i++) {
    questions.push({
      id: i,
      question: `${matiere} - Question ${i} : Quel est l'énoncé correct ?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 'Option B',
      explanation: `Explication détaillée pour la question ${i} de ${matiere}.`
    });
  }
  return questions;
}

// ==================== ANNALES ====================
const annalesList = ref([
  { id: 1, titre: 'ENAM 2023 - Sujet complet', annee: '2023', matiere: 'Général', duree: '3h', sujetUrl: '/annales/enam-2023-sujet.pdf', corrigeUrl: '/annales/enam-2023-corrige.pdf' },
  { id: 2, titre: 'ENAM 2022 - Culture Générale', annee: '2022', matiere: 'Culture Générale', duree: '1h30', sujetUrl: '/annales/enam-2022-cg-sujet.pdf', corrigeUrl: '/annales/enam-2022-cg-corrige.pdf' },
  { id: 3, titre: 'ENAM 2022 - Droit', annee: '2022', matiere: 'Droit Administratif', duree: '2h', sujetUrl: '/annales/enam-2022-droit-sujet.pdf', corrigeUrl: '/annales/enam-2022-droit-corrige.pdf' },
  { id: 4, titre: 'INJS 2023 - Culture Générale', annee: '2023', matiere: 'Culture Générale', duree: '1h30', sujetUrl: '/annales/injs-2023-cg-sujet.pdf', corrigeUrl: '/annales/injs-2023-cg-corrige.pdf' },
  { id: 5, titre: 'ENIEG 2022 - Mathématiques', annee: '2022', matiere: 'Mathématiques', duree: '2h', sujetUrl: '/annales/enieg-2022-maths-sujet.pdf', corrigeUrl: '/annales/enieg-2022-maths-corrige.pdf' },
  { id: 6, titre: 'IRIC 2023 - Français', annee: '2023', matiere: 'Français', duree: '2h', sujetUrl: '/annales/iric-2023-francais-sujet.pdf', corrigeUrl: '/annales/iric-2023-francais-corrige.pdf' }
]);

// ==================== TESTS BLANCS ====================
const testsBlancs = ref([
  { id: 1, titre: 'Test blanc ENAM - Session 2025', description: 'Simulation complète des épreuves écrites ENAM', duree: 180, questions: 100, points: 100, questionsData: genererQuestions('Complet', 100) },
  { id: 2, titre: 'Test blanc Culture Générale', description: 'Épreuve de Culture Générale - 50 questions', duree: 60, questions: 50, points: 50, questionsData: genererQuestions('Culture Générale', 50) },
  { id: 3, titre: 'Test blanc Droit Administratif', description: 'Épreuve de Droit - 40 questions', duree: 90, questions: 40, points: 40, questionsData: genererQuestions('Droit Administratif', 40) }
]);

// ==================== ÉTATS ====================
const activeTab = ref('presentation');
const tabs = ref([
  { id: 'presentation', nom: 'Présentation', icon: 'fas fa-info-circle' },
  { id: 'contenus', nom: 'Contenus', icon: 'fas fa-book' },
  { id: 'exercices', nom: 'Exercices', icon: 'fas fa-tasks' },
  { id: 'annales', nom: 'Annales', icon: 'fas fa-archive' },
  { id: 'testsBlancs', nom: 'Tests blancs', icon: 'fas fa-stopwatch' },
  { id: 'evaluations', nom: 'Évaluations', icon: 'fas fa-chart-line' }
]);

// Filtres
const searchCours = ref('');
const filtreTypeCours = ref('all');
const filtreDifficulte = ref('Tous');
const filtreMatiereExercice = ref('all');
const anneeFilter = ref('all');
const matieresOuvertes = ref(['Culture Générale', 'Droit Administratif', 'Mathématiques', 'Français', 'Anglais', 'Économie']);

// Stats exercices
const statsExercices = ref({
  completed: 0,
  total: 0,
  moyenne: 0,
  tempsTotal: 0,
  meilleurScore: 0
});

// États modaux
const ressourceModalOpen = ref(false);
const currentRessource = ref(null);
const exerciceModalOpen = ref(false);
const currentExercice = ref(null);
const testBlancModalOpen = ref(false);
const currentTestBlanc = ref(null);

// États Quiz
const quizStarted = ref(false);
const quizFinished = ref(false);
const quizQuestionsList = ref([]);
const quizCurrentIndex = ref(0);
const quizSelectedAnswer = ref('');
const quizScore = ref(0);
const quizUserAnswers = ref([]);

// États Test Blanc
const testBlancStarted = ref(false);
const testBlancFinished = ref(false);
const testBlancQuestionsList = ref([]);
const testBlancCurrentIndex = ref(0);
const testBlancAnswers = ref([]);
const testBlancScore = ref(0);
let testBlancTimer = null;
let testBlancTimeLeft = 0;

// Statistiques par matière
const statsParMatiere = ref([
  { nom: 'Culture Générale', score: 75 },
  { nom: 'Droit Administratif', score: 68 },
  { nom: 'Mathématiques', score: 82 },
  { nom: 'Français', score: 70 },
  { nom: 'Anglais', score: 85 },
  { nom: 'Économie', score: 65 }
]);

// Classement
const classement = ref([
  { id: 1, nom: 'Jean Dupont', scoreMoyen: 92, testsCompletes: 15, tempsTotal: 45 },
  { id: 2, nom: 'Marie Claire', scoreMoyen: 88, testsCompletes: 12, tempsTotal: 38 },
  { id: 3, nom: 'Paul Mbarga', scoreMoyen: 85, testsCompletes: 10, tempsTotal: 35 },
  { id: 4, nom: 'Sarah Ndiaye', scoreMoyen: 82, testsCompletes: 9, tempsTotal: 32 },
  { id: 5, nom: 'Thomas Ekambi', scoreMoyen: 78, testsCompletes: 8, tempsTotal: 28 }
]);

// Historique tests
const historiqueTests = ref([
  { id: 1, testNom: 'Test blanc ENAM', date: '15/03/2025', score: 75, temps: '2h45' },
  { id: 2, testNom: 'QCM Culture Générale', date: '10/03/2025', score: 85, temps: '45min' },
  { id: 3, testNom: 'Test blanc Droit', date: '05/03/2025', score: 68, temps: '1h30' }
]);

// Graphique
const progressionChartCanvas = ref(null);
let progressionChart = null;

// ==================== COMPUTED ====================
function getChapitresByMatiere(matiere) {
  return coursParMatiere.value[matiere] || [];
}

const exercicesFiltres = computed(() => {
  let exos = exercicesList.value;
  if (filtreDifficulte.value !== 'Tous') {
    exos = exos.filter(e => e.difficulte === filtreDifficulte.value);
  }
  if (filtreMatiereExercice.value !== 'all') {
    exos = exos.filter(e => e.matiere === filtreMatiereExercice.value);
  }
  return exos;
});

const anneesDisponibles = computed(() => {
  return [...new Set(annalesList.value.map(a => a.annee))];
});

const annalesFiltrees = computed(() => {
  if (anneeFilter.value === 'all') return annalesList.value;
  return annalesList.value.filter(a => a.annee === anneeFilter.value);
});

const formatTestBlancTime = computed(() => {
  const minutes = Math.floor(testBlancTimeLeft / 60);
  const seconds = testBlancTimeLeft % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// ==================== FONCTIONS ====================
function toggleMatiere(matiere) {
  const index = matieresOuvertes.value.indexOf(matiere);
  if (index === -1) {
    matieresOuvertes.value.push(matiere);
  } else {
    matieresOuvertes.value.splice(index, 1);
  }
}

function ouvrirRessource(ressource) {
  currentRessource.value = ressource;
  ressourceModalOpen.value = true;
  ressource.vu = true;
}

function closeRessourceModal() {
  ressourceModalOpen.value = false;
  currentRessource.value = null;
}

function lancerExercice(exercice) {
  currentExercice.value = exercice;
  quizQuestionsList.value = exercice.questionsData;
  exerciceModalOpen.value = true;
}

function startExerciceQuiz() {
  quizStarted.value = true;
  quizFinished.value = false;
  quizCurrentIndex.value = 0;
  quizScore.value = 0;
  quizUserAnswers.value = [];
  quizSelectedAnswer.value = '';
}

function selectAnswer(answer) {
  quizSelectedAnswer.value = answer;
}

function nextQuizQuestion() {
  if (quizSelectedAnswer.value) {
    const isCorrect = quizSelectedAnswer.value === quizQuestionsList.value[quizCurrentIndex.value].correct;
    if (isCorrect) quizScore.value += 10;
    quizUserAnswers.value[quizCurrentIndex.value] = quizSelectedAnswer.value;
    quizSelectedAnswer.value = '';
    
    if (quizCurrentIndex.value < quizQuestionsList.value.length - 1) {
      quizCurrentIndex.value++;
    } else {
      quizFinished.value = true;
      quizStarted.value = false;
      if (currentExercice.value) {
        currentExercice.value.progression = Math.round(quizScore.value / (quizQuestionsList.value.length * 10) * 100);
        sauvegarderProgression();
      }
    }
  } else {
    alert('Veuillez sélectionner une réponse');
  }
}

function prevQuizQuestion() {
  if (quizCurrentIndex.value > 0) {
    quizCurrentIndex.value--;
    quizSelectedAnswer.value = quizUserAnswers.value[quizCurrentIndex.value] || '';
  }
}

function closeExerciceModal() {
  exerciceModalOpen.value = false;
  quizStarted.value = false;
  quizFinished.value = false;
  currentExercice.value = null;
}

function voirCorrige(exercice) {
  alert(`Corrigé de l'exercice "${exercice.titre}" disponible dans la section des ressources.`);
}

function telechargerSujet(annale) {
  alert(`Téléchargement du sujet : ${annale.titre}`);
}

function voirCorrection(annale) {
  alert(`Consultation du corrigé : ${annale.titre}`);
}

function lancerTestBlanc(test) {
  currentTestBlanc.value = test;
  testBlancQuestionsList.value = test.questionsData;
  testBlancModalOpen.value = true;
}

function startTestBlanc() {
  testBlancStarted.value = true;
  testBlancFinished.value = false;
  testBlancCurrentIndex.value = 0;
  testBlancAnswers.value = [];
  testBlancScore.value = 0;
  testBlancTimeLeft = currentTestBlanc.value.duree * 60;
  
  if (testBlancTimer) clearInterval(testBlancTimer);
  testBlancTimer = setInterval(() => {
    if (testBlancTimeLeft > 0 && testBlancStarted.value) {
      testBlancTimeLeft--;
    } else if (testBlancTimeLeft <= 0) {
      finishTestBlanc();
    }
  }, 1000);
}

function selectTestBlancAnswer(answer) {
  testBlancAnswers.value[testBlancCurrentIndex.value] = answer;
}

function nextTestBlancQuestion() {
  if (testBlancCurrentIndex.value < testBlancQuestionsList.value.length - 1) {
    testBlancCurrentIndex.value++;
  } else {
    finishTestBlanc();
  }
}

function prevTestBlancQuestion() {
  if (testBlancCurrentIndex.value > 0) {
    testBlancCurrentIndex.value--;
  }
}

function finishTestBlanc() {
  if (testBlancTimer) clearInterval(testBlancTimer);
  
  let score = 0;
  testBlancQuestionsList.value.forEach((q, idx) => {
    if (testBlancAnswers.value[idx] === q.correct) score += 10;
  });
  testBlancScore.value = score;
  
  testBlancStarted.value = false;
  testBlancFinished.value = true;
  
  historiqueTests.value.unshift({
    id: Date.now(),
    testNom: currentTestBlanc.value.titre,
    date: new Date().toLocaleDateString(),
    score: Math.round(score / (testBlancQuestionsList.value.length * 10) * 100),
    temps: formatTime(testBlancTimeLeft)
  });
}

function closeTestBlancModal() {
  if (testBlancTimer) clearInterval(testBlancTimer);
  testBlancModalOpen.value = false;
  testBlancStarted.value = false;
  testBlancFinished.value = false;
  currentTestBlanc.value = null;
}

function revoirTest(historique) {
  alert(`Révision du test "${historique.testNom}" du ${historique.date}`);
}

function sauvegarderProgression() {
  const userId = localStorage.getItem('gradus_user')?.email || 'default';
  const progressionKey = `gradus_progression_${userId}_${concours.value.id}`;
  const progressionData = {
    exercices: exercicesList.value,
    stats: statsExercices.value,
    historiqueTests: historiqueTests.value
  };
  localStorage.setItem(progressionKey, JSON.stringify(progressionData));
}

function chargerProgression() {
  const userId = localStorage.getItem('gradus_user')?.email || 'default';
  const progressionKey = `gradus_progression_${userId}_${concours.value.id}`;
  const saved = localStorage.getItem(progressionKey);
  if (saved) {
    const data = JSON.parse(saved);
    if (data.exercices) exercicesList.value = data.exercices;
    if (data.stats) statsExercices.value = data.stats;
    if (data.historiqueTests) historiqueTests.value = data.historiqueTests;
  }
  
  statsExercices.value.total = exercicesList.value.length;
  statsExercices.value.completed = exercicesList.value.filter(e => e.progression >= 100).length;
  const totalScore = exercicesList.value.reduce((sum, e) => sum + (e.progression || 0), 0);
  statsExercices.value.moyenne = Math.round(totalScore / exercicesList.value.length);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}min ${secs}s`;
}

// ==================== GRAPHIQUE ====================
function initChart() {
  if (progressionChartCanvas.value && !progressionChart) {
    progressionChart = new Chart(progressionChartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
        datasets: [{
          label: 'Progression (%)',
          data: [25, 35, 45, 58, 72, 85],
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { position: 'top' } }
      }
    });
  }
}

// ==================== INIT ====================
onMounted(() => {
  chargerProgression();
  nextTick(() => {
    initChart();
  });
});

onUnmounted(() => {
  if (testBlancTimer) clearInterval(testBlancTimer);
  if (progressionChart) {
    progressionChart.destroy();
    progressionChart = null;
  }
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}
.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
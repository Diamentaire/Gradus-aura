<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
    <!-- SECTION HERO AVEC ANIMATION -->
    <section class="relative overflow-hidden bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 py-16 md:py-20">
      <!-- Animated background shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-ping"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-bounce-in">
          <i class="fas fa-chalkboard-user text-white text-sm animate-pulse"></i>
          <span class="text-white font-semibold text-sm">Espace formateur</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-down">
          Gérez vos formations
        </h1>
        <p class="text-indigo-100 text-base md:text-lg max-w-2xl mx-auto animate-slide-up">
          Créez, gérez et suivez vos formations et vos étudiants
        </p>
        
        <!-- Floating elements -->
        <div class="absolute top-20 left-10 animate-float-slow">
          <i class="fas fa-graduation-cap text-white/20 text-4xl"></i>
        </div>
        <div class="absolute bottom-10 right-10 animate-float-fast">
          <i class="fas fa-certificate text-white/20 text-4xl"></i>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </section>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Breadcrumb navigation -->
      <div class="flex items-center gap-2 text-sm mb-6 overflow-x-auto pb-2">
        <router-link to="/dashboard" class="text-gray-500 hover:text-primary transition flex items-center gap-1">
          <i class="fas fa-home"></i> Dashboard
        </router-link>
        <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        <span class="text-gray-800 font-medium">Espace formateur</span>
      </div>

      <!-- Stats formateur avec animations -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Formations publiées</p>
              <p class="text-2xl md:text-3xl font-bold text-primary">{{ formations.length }}</p>
            </div>
            <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
              <i class="fas fa-book text-blue-600 text-lg md:text-xl"></i>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex items-center gap-1 text-xs text-green-600">
              <i class="fas fa-arrow-up"></i>
              <span>+2 cette semaine</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up" style="animation-delay: 0.1s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Étudiants inscrits</p>
              <p class="text-2xl md:text-3xl font-bold text-primary">{{ totalEtudiants }}</p>
            </div>
            <div class="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i class="fas fa-users text-green-600 text-lg md:text-xl"></i>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex items-center gap-1 text-xs text-green-600">
              <i class="fas fa-arrow-up"></i>
              <span>+12% ce mois</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up" style="animation-delay: 0.2s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Chiffre d'affaires</p>
              <p class="text-2xl md:text-3xl font-bold text-primary">{{ formatPrice(chiffreAffaires) }} FCFA</p>
            </div>
            <div class="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <i class="fas fa-chart-line text-yellow-600 text-lg md:text-xl"></i>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex items-center gap-1 text-xs text-green-600">
              <i class="fas fa-arrow-up"></i>
              <span>+23% ce mois</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs sm:text-sm">Note moyenne</p>
              <p class="text-2xl md:text-3xl font-bold text-primary">{{ noteMoyenne }}/5</p>
            </div>
            <div class="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <i class="fas fa-star text-purple-600 text-lg md:text-xl"></i>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex items-center gap-1 text-xs text-green-600">
              <i class="fas fa-star"></i>
              <span>4.8 sur 5 étoiles</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglets avec animation -->
      <div class="flex flex-wrap border-b border-gray-200 mb-6 gap-1">
        <button @click="activeTab = 'formations'" :class="['px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all rounded-t-lg', activeTab === 'formations' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100']">
          <i class="fas fa-book mr-2"></i> Mes formations
        </button>
        <button @click="activeTab = 'ajouter'" :class="['px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all rounded-t-lg', activeTab === 'ajouter' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100']">
          <i class="fas fa-plus mr-2"></i> Ajouter une formation
        </button>
        <button @click="activeTab = 'etudiants'" :class="['px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all rounded-t-lg', activeTab === 'etudiants' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100']">
          <i class="fas fa-users mr-2"></i> Mes étudiants
        </button>
        <button @click="activeTab = 'revenus'" :class="['px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all rounded-t-lg', activeTab === 'revenus' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100']">
          <i class="fas fa-chart-line mr-2"></i> Revenus
        </button>
      </div>

      <!-- Liste des formations -->
      <div v-if="activeTab === 'formations'" class="space-y-4">
        <div v-for="(formation, index) in formations" :key="formation.id" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up" :style="{ animationDelay: index * 0.1 + 's' }">
          <div class="flex flex-col md:flex-row">
            <div class="relative w-full md:w-56 h-48 overflow-hidden flex-shrink-0 group">
              <img :src="formation.image" :alt="formation.titre" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fas fa-check-circle mr-1"></i> Actif
              </div>
            </div>
            <div class="flex-1 p-4 md:p-6">
              <div class="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h3 class="text-lg md:text-xl font-bold text-gray-800 hover:text-primary transition-colors">{{ formation.titre }}</h3>
                  <p class="text-gray-500 text-sm mt-1 line-clamp-2">{{ formation.description }}</p>
                  <div class="flex flex-wrap gap-2 mt-3">
                    <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{{ formation.niveau }}</span>
                    <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"><i class="fas fa-clock mr-1"></i> {{ formation.duree }}</span>
                    <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"><i class="fas fa-users mr-1"></i> {{ formation.inscrits }} inscrits</span>
                    <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"><i class="fas fa-star mr-1"></i> {{ formation.note || 4.8 }}</span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ formatPrice(formation.prix) }} FCFA</p>
                  <div class="flex items-center gap-1 mt-1">
                    <i v-for="n in 5" :key="n" class="fas fa-star text-yellow-400 text-sm"></i>
                    <span class="text-xs text-gray-500">({{ formation.avis }} avis)</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-4">
                <button @click="modifierFormation(formation)" class="px-3 py-1.5 md:px-4 md:py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/10 transition">
                  <i class="fas fa-edit mr-1"></i> Modifier
                </button>
                <button @click="supprimerFormation(formation.id)" class="px-3 py-1.5 md:px-4 md:py-2 border border-red-500 text-red-500 rounded-lg text-sm font-bold hover:bg-red-50 transition">
                  <i class="fas fa-trash mr-1"></i> Supprimer
                </button>
                <button @click="voirStatistiques(formation)" class="px-3 py-1.5 md:px-4 md:py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition">
                  <i class="fas fa-chart-line mr-1"></i> Statistiques
                </button>
                <router-link :to="`/formation/${formation.id}`" class="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                  <i class="fas fa-eye mr-1"></i> Voir
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Message si aucune formation -->
        <div v-if="formations.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-lg animate-fade-in">
          <i class="fas fa-book-open text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">Vous n'avez pas encore de formation</p>
          <button @click="activeTab = 'ajouter'" class="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-bold">Créer ma première formation</button>
        </div>
      </div>

      <!-- Ajouter une formation -->
      <div v-if="activeTab === 'ajouter'" class="bg-white rounded-2xl shadow-xl p-4 md:p-6 animate-fade-in-up">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <i class="fas fa-plus text-white text-lg"></i>
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-gray-800">Ajouter une nouvelle formation</h3>
        </div>
        
        <form @submit.prevent="ajouterFormation">
          <div class="grid md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Titre de la formation *</label>
              <input type="text" v-model="nouvelleFormation.titre" required class="w-full px-4 py-2 md:py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select v-model="nouvelleFormation.categorie" class="w-full px-4 py-2 md:py-3 rounded-xl border border-gray-200">
                <option value="informatique">Informatique</option>
                <option value="management">Management</option>
                <option value="langues">Langues</option>
                <option value="concours">Préparation concours</option>
                <option value="marketing">Marketing Digital</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
              <select v-model="nouvelleFormation.niveau" class="w-full px-4 py-2 md:py-3 rounded-xl border border-gray-200">
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA) *</label>
              <input type="number" v-model="nouvelleFormation.prix" required class="w-full px-4 py-2 md:py-3 rounded-xl border border-gray-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Durée</label>
              <input type="text" v-model="nouvelleFormation.duree" placeholder="Ex: 3 mois, 40 heures" class="w-full px-4 py-2 md:py-3 rounded-xl border border-gray-200">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Image (URL)</label>
              <input type="text" v-model="nouvelleFormation.image" placeholder="https://..." class="w-full px-4 py-2 md:py-3 rounded-xl border border-gray-200">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="nouvelleFormation.description" rows="3" class="w-full px-4 py-2 md:py-3 rounded-xl border border-gray-200"></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Programme (chapitres)</label>
              <div v-for="(chap, idx) in nouvelleFormation.chapitres" :key="idx" class="flex flex-wrap gap-2 mb-2">
                <input type="text" v-model="chap.titre" placeholder="Titre du chapitre" class="flex-1 px-4 py-2 rounded-xl border border-gray-200">
                <input type="text" v-model="chap.duree" placeholder="Durée" class="w-24 px-4 py-2 rounded-xl border border-gray-200">
                <button @click="supprimerChapitre(idx)" type="button" class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">×</button>
              </div>
              <button @click="ajouterChapitre" type="button" class="text-primary text-sm hover:underline flex items-center gap-1">
                <i class="fas fa-plus-circle"></i> Ajouter un chapitre
              </button>
            </div>
          </div>
          <div class="flex flex-wrap gap-3 mt-6">
            <button type="submit" class="px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105">
              <i class="fas fa-cloud-upload-alt mr-2"></i> Publier la formation
            </button>
            <button type="button" @click="activeTab = 'formations'" class="px-5 py-2 md:px-6 md:py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition">
              <i class="fas fa-times mr-2"></i> Annuler
            </button>
          </div>
        </form>
      </div>

      <!-- Liste des étudiants -->
      <div v-if="activeTab === 'etudiants'" class="space-y-4">
        <div v-for="(etudiant, index) in etudiants" :key="etudiant.id" class="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up" :style="{ animationDelay: index * 0.1 + 's' }">
          <div class="flex flex-wrap justify-between items-center gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                {{ etudiant.nom.charAt(0) }}
              </div>
              <div>
                <h3 class="font-bold text-gray-800">{{ etudiant.nom }}</h3>
                <p class="text-sm text-gray-500">{{ etudiant.email }}</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-4">
              <div class="text-center min-w-[60px]">
                <p class="text-xl md:text-2xl font-bold text-primary">{{ etudiant.progression }}%</p>
                <p class="text-xs text-gray-500">Progression</p>
              </div>
              <div class="text-center min-w-[60px]">
                <p class="text-xl md:text-2xl font-bold text-green-600">{{ etudiant.scoreMoyen }}%</p>
                <p class="text-xs text-gray-500">Score moyen</p>
              </div>
              <div class="text-center min-w-[60px]">
                <p class="text-xl md:text-2xl font-bold text-orange-600">{{ etudiant.tempsTotal }}h</p>
                <p class="text-xs text-gray-500">Temps étudié</p>
              </div>
              <button @click="voirDetailsEtudiant(etudiant)" class="px-3 py-1.5 md:px-4 md:py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition">
                Voir détails
              </button>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t">
            <p class="text-sm font-medium mb-2">Formations suivies :</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="formation in etudiant.formations" :key="formation" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {{ formation }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenus -->
      <div v-if="activeTab === 'revenus'" class="bg-white rounded-2xl shadow-xl p-4 md:p-6 animate-fade-in-up">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <i class="fas fa-chart-line text-white text-lg"></i>
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-gray-800">Statistiques financières</h3>
        </div>
        <canvas ref="revenueChartCanvas" height="200" class="w-full mb-8"></canvas>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div class="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-md transition">
            <p class="text-gray-500 text-sm">Total des ventes</p>
            <p class="text-2xl md:text-3xl font-bold text-green-600">{{ totalVentes }}</p>
          </div>
          <div class="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition">
            <p class="text-gray-500 text-sm">Commission plateforme</p>
            <p class="text-2xl md:text-3xl font-bold text-blue-600">{{ formatPrice(commissionPlateforme) }} FCFA</p>
          </div>
          <div class="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition">
            <p class="text-gray-500 text-sm">Prochain versement</p>
            <p class="text-2xl md:text-3xl font-bold text-purple-600">{{ formatPrice(prochainVersement) }} FCFA</p>
          </div>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
        <button @click="goBack" class="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition">
          <i class="fas fa-arrow-left"></i> Retour
        </button>
        <div class="text-sm text-gray-500">
          <i class="fas fa-question-circle mr-1"></i> Besoin d'aide ? Contactez le support
        </div>
        <button @click="goToDashboard" class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-indigo-700 transition">
          Dashboard <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';

const router = useRouter();

const activeTab = ref('formations');

const formations = ref([
  {
    id: 1,
    titre: 'Préparation Complète Concours Administratifs',
    description: 'Formation intensive pour réussir les concours administratifs. Plus de 2000 questions corrigées et 20 tests blancs.',
    niveau: 'Avancé',
    duree: '3 mois',
    prix: 150000,
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=300&h=200&fit=crop',
    inscrits: 45,
    avis: 128,
    note: 4.9
  },
  {
    id: 2,
    titre: 'Data Science et Intelligence Artificielle',
    description: 'Maîtrisez les outils de data science : Python, Pandas, Scikit-learn, TensorFlow',
    niveau: 'Intermédiaire',
    duree: '4 mois',
    prix: 200000,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=300&h=200&fit=crop',
    inscrits: 32,
    avis: 89,
    note: 4.8
  }
]);

const nouvelleFormation = ref({
  titre: '',
  categorie: 'informatique',
  niveau: 'Débutant',
  prix: '',
  duree: '',
  image: '',
  description: '',
  chapitres: [{ titre: '', duree: '' }]
});

const etudiants = ref([
  {
    id: 1,
    nom: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    progression: 75,
    scoreMoyen: 82,
    tempsTotal: 45,
    formations: ['Préparation Concours Administratifs', 'Data Science']
  },
  {
    id: 2,
    nom: 'Marie Claire',
    email: 'marie.claire@email.com',
    progression: 60,
    scoreMoyen: 78,
    tempsTotal: 38,
    formations: ['Préparation Concours Administratifs']
  },
  {
    id: 3,
    nom: 'Paul Mbarga',
    email: 'paul.mbarga@email.com',
    progression: 90,
    scoreMoyen: 91,
    tempsTotal: 52,
    formations: ['Data Science']
  }
]);

const revenueChartCanvas = ref(null);
let revenueChart = null;

const totalEtudiants = computed(() => {
  return formations.value.reduce((sum, f) => sum + f.inscrits, 0);
});

const chiffreAffaires = computed(() => {
  return formations.value.reduce((sum, f) => sum + (f.prix * f.inscrits), 0);
});

const noteMoyenne = computed(() => {
  const total = formations.value.reduce((sum, f) => sum + (f.note || 4.8), 0);
  return (total / formations.value.length).toFixed(1);
});

const totalVentes = computed(() => {
  return formations.value.reduce((sum, f) => sum + f.inscrits, 0);
});

const commissionPlateforme = computed(() => {
  return Math.round(chiffreAffaires.value * 0.2);
});

const prochainVersement = computed(() => {
  return Math.round(chiffreAffaires.value * 0.8);
});

const formatPrice = (price) => {
  return price.toLocaleString('fr-FR');
};

const goBack = () => {
  router.back();
};

const goToDashboard = () => {
  router.push('/dashboard');
};

const ajouterChapitre = () => {
  nouvelleFormation.value.chapitres.push({ titre: '', duree: '' });
};

const supprimerChapitre = (index) => {
  nouvelleFormation.value.chapitres.splice(index, 1);
};

const ajouterFormation = () => {
  const newId = Math.max(...formations.value.map(f => f.id), 0) + 1;
  formations.value.push({
    id: newId,
    ...nouvelleFormation.value,
    inscrits: 0,
    avis: 0,
    note: 0
  });
  alert('Formation publiée avec succès !');
  activeTab.value = 'formations';
  nouvelleFormation.value = {
    titre: '',
    categorie: 'informatique',
    niveau: 'Débutant',
    prix: '',
    duree: '',
    image: '',
    description: '',
    chapitres: [{ titre: '', duree: '' }]
  };
};

const modifierFormation = (formation) => {
  alert(`Modification de la formation "${formation.titre}"\n\nCette fonctionnalité sera disponible prochainement.`);
};

const supprimerFormation = (id) => {
  if (confirm('Voulez-vous vraiment supprimer cette formation ?')) {
    formations.value = formations.value.filter(f => f.id !== id);
  }
};

const voirStatistiques = (formation) => {
  alert(`Statistiques de la formation "${formation.titre}"\n\n📊 Inscrits: ${formation.inscrits}\n📈 Taux de complétion: 68%\n⭐ Note moyenne: ${formation.note || 4.8}/5\n💰 Revenus: ${formatPrice(formation.prix * formation.inscrits)} FCFA`);
};

const voirDetailsEtudiant = (etudiant) => {
  alert(`📋 Détails de l'étudiant\n\n👤 Nom: ${etudiant.nom}\n📧 Email: ${etudiant.email}\n📊 Progression: ${etudiant.progression}%\n🎯 Score moyen: ${etudiant.scoreMoyen}%\n⏱️ Temps total: ${etudiant.tempsTotal}h`);
};

const initRevenueChart = () => {
  if (revenueChartCanvas.value && !revenueChart) {
    revenueChart = new Chart(revenueChartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
          label: 'Revenus (FCFA)',
          data: [500000, 750000, 1200000, 950000, 1500000, 2100000],
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: { responsive: true, maintainAspectRatio: true }
    });
  }
};

onMounted(() => {
  initRevenueChart();
});
</script>

<style scoped>
.text-primary { color: #8B5CF6; }
.bg-primary { background-color: #8B5CF6; }

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

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(-10px); }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
  opacity: 0;
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.delay-700 {
  animation-delay: 0.7s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
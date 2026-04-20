<template>
  <div>
    <!-- SECTION HERO avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-green-700 via-teal-700 to-emerald-700 py-28">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=500&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      
      <!-- Particules décoratives -->
      <div class="absolute inset-0">
        <div class="particles">
          <div v-for="i in 20" :key="i" class="particle" :style="{ left: Math.random() * 100 + '%', animationDelay: Math.random() * 5 + 's', animationDuration: (Math.random() * 5 + 3) + 's' }"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 mb-6 animate-bounce">
          <div class="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
          <i class="fas fa-graduation-cap text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Opportunités de financement</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
          Bourses <span class="text-yellow-300">d'études</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">
          Découvrez les bourses disponibles pour financer vos études à l'étranger
        </p>
        <div class="flex justify-center gap-4 mt-8 flex-wrap">
          <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 hover:bg-white/30 transition">
            <i class="fas fa-globe text-white"></i>
            <span class="text-white text-sm">Monde entier</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 hover:bg-white/30 transition">
            <i class="fas fa-trophy text-white"></i>
            <span class="text-white text-sm">Bourses d'excellence</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 hover:bg-white/30 transition">
            <i class="fas fa-calendar-alt text-white"></i>
            <span class="text-white text-sm">Mises à jour fréquentes</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <!-- SECTION STATS RAPIDES -->
    <section class="py-12 bg-white border-b">
      <div class="container mx-auto px-5">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300" @click="scrollToBourses">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition">
              <i class="fas fa-trophy text-primary text-2xl"></i>
            </div>
            <span class="text-3xl font-bold text-dark">{{ boursesList.length }}+</span>
            <span class="text-sm text-gray-500">Bourses disponibles</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300" @click="scrollToPays">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition">
              <i class="fas fa-globe text-primary text-2xl"></i>
            </div>
            <span class="text-3xl font-bold text-dark">12</span>
            <span class="text-sm text-gray-500">Pays partenaires</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300" @click="scrollToAvantages">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition">
              <i class="fas fa-users text-primary text-2xl"></i>
            </div>
            <span class="text-3xl font-bold text-dark">15k+</span>
            <span class="text-sm text-gray-500">Bénéficiaires</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300" @click="scrollToTemoignages">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition">
              <i class="fas fa-percent text-primary text-2xl"></i>
            </div>
            <span class="text-3xl font-bold text-dark">85%</span>
            <span class="text-sm text-gray-500">Taux de succès</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION FILTRES -->
    <section class="sticky top-0 z-30 bg-white/95 backdrop-blur-sm shadow-md py-4">
      <div class="container mx-auto px-5">
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-wrap justify-center gap-3">
            <button 
              v-for="filtre in filtresBourse" 
              :key="filtre.id"
              @click="setFiltreActif(filtre.id)"
              :class="[
                'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2',
                filtreActif === filtre.id 
                  ? 'bg-primary text-white shadow-md scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              ]"
            >
              <i :class="filtre.icon"></i>
              {{ filtre.nom }}
            </button>
          </div>
          
          <!-- Bouton favoris avec indicateur -->
          <div class="flex items-center gap-3">
            <button @click="afficherFavoris = !afficherFavoris" class="relative group">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 transition-all group-hover:scale-110">
                <i class="fas fa-heart" :class="afficherFavoris ? 'text-red-500' : 'text-gray-400'"></i>
              </div>
              <span v-if="favorisList.length > 0" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {{ favorisList.length }}
              </span>
            </button>
            
            <!-- Indicateur de filtre favoris actif -->
            <span v-if="afficherFavoris" class="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
              <i class="fas fa-heart mr-1"></i> {{ favorisList.length }} favori(s)
            </span>
          </div>
        </div>
        
        <!-- Barre de recherche -->
        <div class="max-w-lg mx-auto mt-5">
          <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Rechercher une bourse, pays, organisateur..." 
              class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            >
            <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div v-if="searchQuery" class="text-center mt-2">
            <p class="text-xs text-gray-500">Résultats pour : <span class="font-semibold text-primary">{{ searchQuery }}</span></p>
          </div>
        </div>
      </div>
    </section>

    <!-- LISTE DES BOURSES -->
    <section class="py-16 bg-gray-50" id="bourses-section">
      <div class="container mx-auto px-5">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <i class="fas fa-graduation-cap text-sm"></i>
            <span class="text-sm font-semibold">Opportunités internationales</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            {{ afficherFavoris ? 'Mes bourses favorites' : 'Bourses disponibles' }}
          </h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">
            {{ afficherFavoris ? 'Retrouvez ici toutes les bourses que vous avez ajoutées à vos favoris' : 'Des financements pour réaliser vos rêves d\'études à l\'étranger' }}
          </p>
        </div>

        <!-- Message si aucun favori -->
        <div v-if="afficherFavoris && favorisList.length === 0" class="text-center py-16">
          <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fas fa-heart text-gray-400 text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-600">Aucune bourse favorite</h3>
          <p class="text-gray-400 mt-2">Ajoutez des bourses à vos favoris en cliquant sur l'icône cœur</p>
          <button @click="afficherFavoris = false" class="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:shadow-lg transition">
            Voir toutes les bourses
          </button>
        </div>

        <!-- Grille des bourses -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div 
            v-for="bourse in boursesAffichees" 
            :key="bourse.id"
            class="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
          >
            <div class="relative h-52 overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50">
              <img 
                :src="bourse.image" 
                :alt="bourse.nom" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                @error="handleImageError(bourse)"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  <i class="fas fa-chart-line mr-1"></i> {{ bourse.tauxReussite }}% succès
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <div class="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                  <i :class="getTypeIcon(bourse.type)" class="text-primary text-xl"></i>
                </div>
              </div>
              <div v-if="isNewBourse(bourse.dateLimite)" class="absolute top-4 left-4">
                <span class="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                  <i class="fas fa-fire mr-1"></i> Nouveau
                </span>
              </div>
              <!-- Badge favori sur la carte -->
              <div v-if="estFavori(bourse)" class="absolute bottom-4 right-4">
                <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  <i class="fas fa-heart mr-1"></i> Favori
                </span>
              </div>
            </div>
            
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <span :class="getTypeBadgeClass(bourse.type)" class="text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <i :class="getTypeIcon(bourse.type)"></i> {{ getTypeLabel(bourse.type) }}
                </span>
                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{{ getNiveauLabel(bourse.niveau) }}</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 group-hover:text-primary transition line-clamp-1">{{ bourse.nom }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ bourse.organisateur }}</p>
              <p class="text-xs text-gray-400 flex items-center gap-1"><i class="fas fa-map-marker-alt"></i> {{ bourse.pays }}</p>
              <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ bourse.description }}</p>
              
              <div class="mt-3 flex flex-wrap gap-1">
                <span class="text-xs bg-indigo-50 text-primary px-2 py-0.5 rounded-full">
                  <i class="fas fa-calendar-alt mr-1"></i> {{ bourse.dateLimite }}
                </span>
                <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {{ getTypeLabel(bourse.type) }}
                </span>
              </div>
              
              <div class="mt-4 flex justify-between items-center">
                <div>
                  <span class="text-xl font-bold text-primary">{{ bourse.montant }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fas fa-chart-line text-primary text-sm"></i>
                  <span class="text-sm font-semibold">{{ bourse.tauxReussite }}%</span>
                </div>
              </div>
              
              <div class="mt-2">
                <div :class="getDelaiClass(bourse.dateLimite)" class="text-xs flex items-center gap-1">
                  <i class="fas fa-hourglass-half"></i>
                  <span>{{ getDelaiRestant(bourse.dateLimite) }}</span>
                </div>
              </div>
              
              <div class="mt-4 flex gap-2">
                <button 
                  @click.stop="postuler(bourse)" 
                  class="flex-1 py-2.5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
                >
                  <i class="fas fa-file-alt"></i> Postuler
                </button>
                <button 
                  @click.stop="toggleFavori(bourse)" 
                  class="py-2.5 px-4 border-2 rounded-xl font-semibold transition-all duration-300"
                  :class="estFavori(bourse) ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'"
                >
                  <i :class="estFavori(bourse) ? 'fas fa-heart' : 'far fa-bookmark'"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Aucun résultat pour les filtres -->
        <div v-if="!afficherFavoris && boursesFiltres.length === 0 && boursesList.length > 0" class="text-center py-16">
          <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fas fa-search text-gray-400 text-4xl"></i>
          </div>
          <p class="text-gray-500">Aucune bourse ne correspond à votre recherche</p>
          <button @click="resetFiltres" class="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:shadow-lg transition">Réinitialiser les filtres</button>
        </div>
      </div>
    </section>

    <!-- SECTION PAYS POPULAIRES -->
    <section class="py-20 bg-white" id="pays-section">
      <div class="container mx-auto px-5">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <i class="fas fa-map-marker-alt text-sm"></i>
            <span class="text-sm font-semibold">Destinations prisées</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Pays populaires</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Les destinations les plus demandées par les étudiants</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div v-for="pays in paysPopulaires" :key="pays.nom" class="group text-center cursor-pointer" @click="filtrerParPays(pays.nom)">
            <div class="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-xl">
              <i :class="pays.icon" class="text-3xl text-primary"></i>
            </div>
            <h3 class="font-semibold text-gray-700">{{ pays.nom }}</h3>
            <p class="text-xs text-gray-400">{{ getNombreBoursesParPays(pays.nom) }} bourses</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION AVANTAGES -->
    <section class="py-20 bg-gradient-to-br from-indigo-50 to-cyan-50" id="avantages-section">
      <div class="container mx-auto px-5">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold uppercase tracking-wide">Pourquoi postuler</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Des opportunités uniques</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Des bourses pour financer votre avenir académique</p>
        </div>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1" @click="showAdvantageDetail(avantages[0])">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <i class="fas fa-globe text-primary text-2xl group-hover:text-white transition"></i>
            </div>
            <h3 class="text-lg font-bold">Monde entier</h3>
            <p class="text-gray-500 text-sm mt-2">Destinations variées</p>
          </div>
          <div class="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1" @click="showAdvantageDetail(avantages[1])">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <i class="fas fa-trophy text-primary text-2xl group-hover:text-white transition"></i>
            </div>
            <h3 class="text-lg font-bold">Bourses d'excellence</h3>
            <p class="text-gray-500 text-sm mt-2">Reconnues internationalement</p>
          </div>
          <div class="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1" @click="showAdvantageDetail(avantages[2])">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <i class="fas fa-headset text-primary text-2xl group-hover:text-white transition"></i>
            </div>
            <h3 class="text-lg font-bold">Accompagnement</h3>
            <p class="text-gray-500 text-sm mt-2">Conseillers dédiés</p>
          </div>
          <div class="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1" @click="showAdvantageDetail(avantages[3])">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <i class="fas fa-clock text-primary text-2xl group-hover:text-white transition"></i>
            </div>
            <h3 class="text-lg font-bold">Mises à jour</h3>
            <p class="text-gray-500 text-sm mt-2">Informations récentes</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION TÉMOIGNAGES -->
    <section class="py-20 bg-white" id="temoignages-section">
      <div class="container mx-auto px-5">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <i class="fas fa-quote-left text-sm"></i>
            <span class="text-sm font-semibold">Ils ont réussi</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Témoignages</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Des étudiants qui ont réalisé leurs rêves grâce aux bourses</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="temoignage in temoignages" :key="temoignage.id" class="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <i class="fas fa-user-graduate text-primary text-xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-800">{{ temoignage.nom }}</h4>
                <p class="text-xs text-gray-500">{{ temoignage.bourse }}</p>
              </div>
            </div>
            <p class="text-sm text-gray-600 italic leading-relaxed">"{{ temoignage.message }}"</p>
            <div class="flex items-center gap-1 mt-4">
              <i v-for="i in 5" :key="i" class="fas fa-star text-yellow-400 text-xs"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL AVANTAGE -->
    <div v-if="advantageModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="advantageModalOpen = false">
      <div class="absolute inset-0 modal-overlay" @click="advantageModalOpen = false"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center animate-modalSlideIn">
        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i :class="advantageData.icon" class="text-primary text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800">{{ advantageData.titre }}</h3>
        <p class="text-gray-600 mt-2">{{ advantageData.descriptionLongue || advantageData.description }}</p>
        <button @click="advantageModalOpen = false" class="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-indigo-700 transition">Fermer</button>
      </div>
    </div>

    <!-- NOTIFICATION -->
    <div v-if="notificationVisible" class="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg animate-slide-in-right flex items-center gap-3">
      <i class="fas fa-heart text-xl"></i>
      <div>
        <p class="font-semibold">{{ notificationMessage }}</p>
        <p class="text-xs opacity-90">{{ notificationDetail }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// ==================== ÉTATS ====================
const filtreActif = ref('all');
const searchQuery = ref('');
const afficherFavoris = ref(false);
const advantageModalOpen = ref(false);
const advantageData = ref({});
const notificationVisible = ref(false);
const notificationMessage = ref('');
const notificationDetail = ref('');
let notificationTimeout = null;

// Favoris
const favorisList = ref([]);

// ==================== DONNÉES STATIQUES ====================
const filtresBourse = ref([
  { id: 'all', nom: 'Toutes les bourses', icon: 'fas fa-globe' },
  { id: 'gouvernementale', nom: 'Gouvernementale', icon: 'fas fa-landmark' },
  { id: 'universitaire', nom: 'Universitaire', icon: 'fas fa-university' },
  { id: 'privee', nom: 'Privée', icon: 'fas fa-briefcase' }
]);

const paysPopulaires = ref([
  { nom: 'France', icon: 'fas fa-flag-checkered', nombre: 0 },
  { nom: 'Canada', icon: 'fas fa-maple-leaf', nombre: 0 },
  { nom: 'Allemagne', icon: 'fas fa-flag', nombre: 0 },
  { nom: 'Royaume-Uni', icon: 'fas fa-flag', nombre: 0 },
  { nom: 'États-Unis', icon: 'fas fa-flag-usa', nombre: 0 },
  { nom: 'Suisse', icon: 'fas fa-flag', nombre: 0 }
]);

const avantages = ref([
  { 
    titre: 'Monde entier', 
    icon: 'fas fa-globe', 
    description: 'Destinations variées',
    descriptionLongue: 'Nous vous accompagnons pour postuler dans plus de 50 pays à travers le monde, avec des opportunités dans les meilleures universités internationales.'
  },
  { 
    titre: 'Bourses d\'excellence', 
    icon: 'fas fa-trophy', 
    description: 'Reconnues internationalement',
    descriptionLongue: 'Accédez aux bourses les plus prestigieuses comme Eiffel, Chevening, Fulbright, DAAD et bien d\'autres programmes d\'excellence.'
  },
  { 
    titre: 'Accompagnement', 
    icon: 'fas fa-headset', 
    description: 'Conseillers dédiés',
    descriptionLongue: 'Bénéficiez d\'un accompagnement personnalisé tout au long de votre processus de candidature, de la sélection à l\'obtention de la bourse.'
  },
  { 
    titre: 'Mises à jour', 
    icon: 'fas fa-clock', 
    description: 'Informations récentes',
    descriptionLongue: 'Recevez les dernières actualités sur les bourses disponibles, les dates limites et les nouvelles opportunités en temps réel.'
  }
]);

const temoignages = ref([
  {
    id: 1,
    nom: 'Marie N.',
    bourse: 'Bourse Eiffel - France',
    message: 'Grâce à Gradus Aura, j\'ai obtenu la bourse Eiffel pour mon master en France. Un accompagnement exceptionnel !'
  },
  {
    id: 2,
    nom: 'Jean P.',
    bourse: 'Chevening - Royaume-Uni',
    message: 'Je recommande vivement cette plateforme. Les conseils m\'ont permis de préparer un dossier gagnant.'
  },
  {
    id: 3,
    nom: 'Fatima D.',
    bourse: 'Bourse Canada',
    message: 'Un grand merci à toute l\'équipe pour leur professionnalisme et leur disponibilité. Mon rêve canadien est devenu réalité !'
  }
]);

// Liste des bourses
const boursesList = ref([
  {
    id: 1,
    nom: 'Bourse Eiffel',
    image: 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Ministère français des Affaires étrangères',
    description: 'Bourse d\'excellence pour les étudiants internationaux souhaitant étudier en France. Couvre les frais de scolarité et offre une allocation mensuelle.',
    pays: 'France',
    montant: '775 000 FCFA/mois',
    dateLimite: '10 Janvier 2025',
    niveau: 'master',
    type: 'gouvernementale',
    tauxReussite: 35
  },
  {
    id: 2,
    nom: 'Bourse du gouvernement canadien',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Gouvernement du Canada',
    description: 'Programme de bourses pour les étudiants francophones hors Québec. Financement pour les études de master et doctorat.',
    pays: 'Canada',
    montant: '4 500 000 FCFA/an',
    dateLimite: '15 Mars 2025',
    niveau: 'master',
    type: 'gouvernementale',
    tauxReussite: 42
  },
  {
    id: 3,
    nom: 'DAAD Scholarship',
    image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Service allemand d\'échanges universitaires',
    description: 'Bourse pour étudiants internationaux en Allemagne. Soutien financier pour les études, stages et projets de recherche.',
    pays: 'Allemagne',
    montant: '612 000 FCFA/mois',
    dateLimite: '31 Octobre 2025',
    niveau: 'master',
    type: 'gouvernementale',
    tauxReussite: 38
  },
  {
    id: 4,
    nom: 'Fulbright Program',
    image: 'https://images.pexels.com/photos/208702/pexels-photo-208702.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Département d\'État américain',
    description: 'Programme d\'échanges culturels et académiques prestigieux. Bourse complète pour études aux États-Unis.',
    pays: 'États-Unis',
    montant: '13 000 000 - 26 000 000 FCFA/an',
    dateLimite: '15 Avril 2025',
    niveau: 'master',
    type: 'gouvernementale',
    tauxReussite: 28
  },
  {
    id: 5,
    nom: 'Bourse Suisse d\'excellence',
    image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Confédération suisse',
    description: 'Bourse pour chercheurs et artistes internationaux souhaitant poursuivre des études en Suisse.',
    pays: 'Suisse',
    montant: '1 260 000 FCFA/mois',
    dateLimite: '30 Novembre 2025',
    niveau: 'doctorat',
    type: 'gouvernementale',
    tauxReussite: 25
  },
  {
    id: 6,
    nom: 'Chevening Scholarship',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Gouvernement britannique',
    description: 'Bourse pour leaders exceptionnels du monde entier. Financement complet pour un master au Royaume-Uni.',
    pays: 'Royaume-Uni',
    montant: 'Frais complets + 1 500 000 FCFA',
    dateLimite: '5 Novembre 2025',
    niveau: 'master',
    type: 'gouvernementale',
    tauxReussite: 12
  },
  {
    id: 7,
    nom: 'Bourse Master France Excellence',
    image: 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Campus France',
    description: 'Bourse pour étudiants internationaux en master en France. Allocation mensuelle et exonération des frais.',
    pays: 'France',
    montant: '525 000 FCFA/mois',
    dateLimite: '30 Mars 2025',
    niveau: 'master',
    type: 'universitaire',
    tauxReussite: 45
  },
  {
    id: 8,
    nom: 'Bourse Belgique ARES',
    image: 'https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Académie de Recherche et d\'Enseignement supérieur',
    description: 'Bourse pour étudiants internationaux souhaitant suivre un master en Belgique.',
    pays: 'Belgique',
    montant: '850 000 FCFA/mois',
    dateLimite: '15 Février 2025',
    niveau: 'master',
    type: 'gouvernementale',
    tauxReussite: 30
  },
  {
    id: 9,
    nom: 'Bourse Australie Destination',
    image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Gouvernement australien',
    description: 'Programme de bourses pour étudiants internationaux en Australie.',
    pays: 'Australie',
    montant: '20 000 000 - 35 000 000 FCFA/an',
    dateLimite: '30 Avril 2025',
    niveau: 'master',
    type: 'gouvernementale',
    tauxReussite: 20
  },
  {
    id: 10,
    nom: 'Bourse MEXT Japon',
    image: 'https://images.pexels.com/photos/1157255/pexels-photo-1157255.jpeg?w=400&h=250&fit=crop',
    organisateur: 'Ministère japonais de l\'Éducation',
    description: 'Bourse du gouvernement japonais pour étudiants internationaux.',
    pays: 'Japon',
    montant: '1 150 000 FCFA/mois',
    dateLimite: '20 Mai 2025',
    niveau: 'master',
    type: 'gouvernementale',
    tauxReussite: 18
  }
]);

// ==================== FONCTIONS UTILITAIRES ====================
const getTypeBadgeClass = (type) => {
  const classes = {
    gouvernementale: 'bg-blue-600/90 text-white',
    universitaire: 'bg-purple-600/90 text-white',
    privee: 'bg-green-600/90 text-white'
  };
  return classes[type] || 'bg-gray-600/90 text-white';
};

const getTypeIcon = (type) => {
  const icons = {
    gouvernementale: 'fas fa-landmark',
    universitaire: 'fas fa-university',
    privee: 'fas fa-briefcase'
  };
  return icons[type] || 'fas fa-tag';
};

const getTypeLabel = (type) => {
  const labels = {
    gouvernementale: 'Gouvernementale',
    universitaire: 'Universitaire',
    privee: 'Privée'
  };
  return labels[type] || type;
};

const getNiveauLabel = (niveau) => {
  const labels = {
    licence: 'Licence',
    master: 'Master',
    doctorat: 'Doctorat'
  };
  return labels[niveau] || niveau;
};

const isNewBourse = (dateLimite) => {
  const date = new Date(dateLimite);
  const now = new Date();
  const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  return diffDays > 60;
};

const getDelaiRestant = (dateLimite) => {
  const date = new Date(dateLimite);
  const now = new Date();
  const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Date limite dépassée';
  if (diffDays === 0) return 'Dernier jour !';
  if (diffDays <= 7) return `Plus que ${diffDays} jours !`;
  return `${diffDays} jours restants`;
};

const getDelaiClass = (dateLimite) => {
  const date = new Date(dateLimite);
  const now = new Date();
  const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'text-red-600';
  if (diffDays <= 7) return 'text-orange-600 font-semibold';
  return 'text-green-600';
};

const getNombreBoursesParPays = (pays) => {
  return boursesList.value.filter(b => b.pays === pays).length;
};

// Mettre à jour le nombre de bourses par pays
const updatePaysPopulaires = () => {
  paysPopulaires.value.forEach(p => {
    p.nombre = getNombreBoursesParPays(p.nom);
  });
};

// ==================== FAVORIS ====================
const estFavori = (bourse) => {
  return favorisList.value.some(f => f.id === bourse.id);
};

const toggleFavori = (bourse) => {
  if (estFavori(bourse)) {
    favorisList.value = favorisList.value.filter(f => f.id !== bourse.id);
    notificationMessage.value = 'Bourse retirée des favoris';
    notificationDetail.value = bourse.nom;
  } else {
    favorisList.value.push(bourse);
    notificationMessage.value = 'Bourse ajoutée aux favoris';
    notificationDetail.value = bourse.nom;
  }
  
  notificationVisible.value = true;
  if (notificationTimeout) clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    notificationVisible.value = false;
  }, 2000);
  
  localStorage.setItem('bourses_favoris', JSON.stringify(favorisList.value));
};

// ==================== BOURSES FILTRÉES ====================
// Bourses selon le filtre de type
const boursesParType = computed(() => {
  if (filtreActif.value === 'all') {
    return boursesList.value;
  }
  return boursesList.value.filter(b => b.type === filtreActif.value);
});

// Bourses selon la recherche
const boursesRecherchees = computed(() => {
  if (!searchQuery.value) {
    return boursesParType.value;
  }
  const query = searchQuery.value.toLowerCase();
  return boursesParType.value.filter(b => 
    b.nom.toLowerCase().includes(query) ||
    b.organisateur.toLowerCase().includes(query) ||
    b.pays.toLowerCase().includes(query)
  );
});

// Bourses finales à afficher (filtre favoris ou non)
const boursesFiltres = computed(() => {
  if (afficherFavoris.value) {
    return favorisList.value;
  }
  return boursesRecherchees.value;
});

// Bourses affichées (alias pour compatibilité)
const boursesAffichees = computed(() => boursesFiltres.value);

// ==================== ACTIONS ====================
const setFiltreActif = (filtreId) => {
  filtreActif.value = filtreId;
  afficherFavoris.value = false;
};

// Redirection vers la page de dossier
const postuler = (bourse) => {
  localStorage.setItem('bourse_selected', JSON.stringify({
    id: bourse.id,
    nom: bourse.nom,
    organisateur: bourse.organisateur,
    pays: bourse.pays,
    montant: bourse.montant,
    dateLimite: bourse.dateLimite,
    niveau: bourse.niveau,
    type: bourse.type,
    tauxReussite: bourse.tauxReussite
  }));
  
  router.push('/mobilite/dossier');
};

const filtrerParPays = (pays) => {
  searchQuery.value = pays;
  afficherFavoris.value = false;
  document.getElementById('bourses-section')?.scrollIntoView({ behavior: 'smooth' });
};

const resetFiltres = () => {
  filtreActif.value = 'all';
  searchQuery.value = '';
  afficherFavoris.value = false;
};

const handleImageError = (bourse) => {
  bourse.image = 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?w=400&h=250&fit=crop';
};

const showAdvantageDetail = (avantage) => {
  advantageData.value = avantage;
  advantageModalOpen.value = true;
};

// Scroll
const scrollToBourses = () => {
  document.getElementById('bourses-section')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToPays = () => {
  document.getElementById('pays-section')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToAvantages = () => {
  document.getElementById('avantages-section')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToTemoignages = () => {
  document.getElementById('temoignages-section')?.scrollIntoView({ behavior: 'smooth' });
};

// ==================== INITIALISATION ====================
onMounted(() => {
  updatePaysPopulaires();
  
  const savedFavoris = localStorage.getItem('bourses_favoris');
  if (savedFavoris) {
    favorisList.value = JSON.parse(savedFavoris);
  }
});

onUnmounted(() => {
  if (notificationTimeout) clearTimeout(notificationTimeout);
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}

.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }
.border-primary { border-color: #4F46E5; }

.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.modal-container {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from { opacity: 0; transform: translateY(-50px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes modalSlideInAdvantage {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-modalSlideIn {
  animation: modalSlideInAdvantage 0.3s ease-out;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes slide-in-right {
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 1s ease-in-out infinite;
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
</style>
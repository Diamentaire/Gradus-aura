<template>
  <div>
    <!-- SECTION HERO avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-cyan-600 py-20">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-book-open text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">+5000 livres disponibles</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Librairie <span class="text-yellow-300">Gradus Aura</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">
          Découvrez notre collection de livres recommandés par le ministère de l'Éducation du Cameroun
        </p>
        <div class="flex justify-center gap-4 mt-8">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-shipping-fast text-white"></i>
            <span class="text-white text-sm">Livraison gratuite</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-credit-card text-white"></i>
            <span class="text-white text-sm">Paiement sécurisé</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-undo-alt text-white"></i>
            <span class="text-white text-sm">Retour sous 14 jours</span>
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
              <i class="fas fa-book text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">5000+</span>
            <span class="text-xs text-gray-500">Livres disponibles</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-users text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">10000+</span>
            <span class="text-xs text-gray-500">Lecteurs satisfaits</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-star text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">4.8/5</span>
            <span class="text-xs text-gray-500">Note moyenne</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-truck text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">48h</span>
            <span class="text-xs text-gray-500">Livraison express</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION PANIER ICONE ET FILTRES -->
    <section class="py-4 bg-gray-50">
      <div class="container mx-auto px-5">
        <div class="flex flex-wrap justify-between items-center gap-4">
          <!-- Filtres -->
          <div class="flex flex-wrap justify-center gap-3">
            <button 
              v-for="filtre in filtres" 
              :key="filtre.id"
              @click="filtreActif = filtre.id"
              :class="[
                'px-6 py-2 rounded-full text-sm font-medium transition-all',
                filtreActif === filtre.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              ]"
            >
              <i :class="filtre.icon + ' mr-2'"></i>
              {{ filtre.nom }}
            </button>
          </div>
          
          <!-- Icône Panier avec compteur -->
          <router-link to="/e-learning/panier" class="relative group">
            <div class="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all group-hover:scale-105">
              <i class="fas fa-shopping-cart text-primary text-xl"></i>
            </div>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {{ cartCount }}
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SECTION RECHERCHE -->
    <section class="py-4 bg-gray-50">
      <div class="container mx-auto px-5">
        <div class="max-w-md mx-auto">
          <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Rechercher un livre, auteur, éditeur..." 
              class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none transition"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- LIVRES LIST avec images -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-5">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div 
            v-for="livre in livresFiltres" 
            :key="livre.id"
            class="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            @click="openDetailsModal(livre)"
          >
            <!-- Image d'illustration -->
            <div class="relative h-56 overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50">
              <img 
                :src="livre.image" 
                :alt="livre.titre" 
                class="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                  <i class="fas fa-star mr-1"></i> {{ livre.note }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <div class="bg-white rounded-full p-2 shadow-md">
                  <i :class="livre.icon || 'fas fa-book'" class="text-primary text-xl"></i>
                </div>
              </div>
            </div>
            
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{{ livre.niveau }}</span>
                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{{ livre.matiere }}</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 group-hover:text-primary transition line-clamp-1">{{ livre.titre }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ livre.auteur }}</p>
              <p class="text-xs text-gray-400">{{ livre.editeur }}</p>
              <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ livre.description }}</p>
              
              <!-- Badges -->
              <div class="mt-3 flex flex-wrap gap-1">
                <span class="text-xs bg-indigo-50 text-primary px-2 py-0.5 rounded-full">
                  <i class="fas fa-book-open mr-1"></i> {{ livre.pages || 250 }} pages
                </span>
                <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {{ livre.annee || 2024 }}
                </span>
              </div>
              
              <!-- Prix et actions -->
              <div class="mt-4 flex justify-between items-center">
                <div>
                  <span class="text-xl font-bold text-primary">{{ formatPrice(livre.prix) }} FCFA</span>
                  <p v-if="livre.ancienPrix" class="text-xs text-gray-400 line-through">{{ formatPrice(livre.ancienPrix) }} FCFA</p>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fas fa-star text-yellow-400 text-sm"></i>
                  <span class="text-sm font-semibold">{{ livre.note }}</span>
                  <span class="text-xs text-gray-400">({{ livre.avis }})</span>
                </div>
              </div>
              
              <!-- Bouton ajouter au panier -->
              <button @click.stop="ajouterAuPanier(livre)" class="mt-4 w-full py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <i class="fas fa-shopping-cart"></i> Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        <!-- Aucun résultat -->
        <div v-if="livresFiltres.length === 0" class="text-center py-12">
          <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fas fa-book-open text-gray-400 text-4xl"></i>
          </div>
          <p class="text-gray-500">Aucun livre ne correspond à votre recherche</p>
          <button @click="resetFiltres" class="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-bold">Réinitialiser les filtres</button>
        </div>
      </div>
    </section>

    <!-- SECTION AVANTAGES -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-5">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold uppercase tracking-wide">Pourquoi nous choisir</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Des avantages exclusifs</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Des livres de qualité et un service fiable</p>
        </div>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center p-6 rounded-2xl hover:shadow-lg transition">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-truck text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Livraison rapide</h3>
            <p class="text-gray-500 text-sm mt-2">Livraison à domicile en 48h</p>
          </div>
          <div class="text-center p-6 rounded-2xl hover:shadow-lg transition">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-lock text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Paiement sécurisé</h3>
            <p class="text-gray-500 text-sm mt-2">Mobile Money, Carte, PayPal</p>
          </div>
          <div class="text-center p-6 rounded-2xl hover:shadow-lg transition">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-undo-alt text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Retour gratuit</h3>
            <p class="text-gray-500 text-sm mt-2">Satisfait ou remboursé</p>
          </div>
          <div class="text-center p-6 rounded-2xl hover:shadow-lg transition">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-headset text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Support 24/7</h3>
            <p class="text-gray-500 text-sm mt-2">Une équipe à votre écoute</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL DÉTAILS LIVRE -->
    <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="handleOverlayClick">
      <div class="absolute inset-0 modal-overlay" @click="closeModal"></div>
      
      <div class="modal-container relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <button 
          @click="closeModal" 
          class="absolute top-4 right-4 z-20 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
        
        <div class="gradient-bg rounded-t-2xl p-6 text-center relative">
          <div class="absolute inset-0 opacity-20 rounded-t-2xl overflow-hidden">
            <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=400&h=200&fit=crop" class="w-full h-full object-cover">
          </div>
          <div class="relative z-10">
            <div class="flex justify-center mb-3">
              <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <i class="fas fa-book text-white text-3xl"></i>
              </div>
            </div>
            <h2 class="text-2xl font-bold text-white">Détails du livre</h2>
            <p class="text-indigo-100 text-sm mt-1">
              <i class="fas fa-book-open text-white mr-1"></i> {{ selectedLivre?.titre }}
            </p>
          </div>
        </div>

        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Image -->
            <div class="md:w-1/3">
              <div class="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-2xl p-4">
                <img :src="selectedLivre?.image" :alt="selectedLivre?.titre" class="w-full h-64 object-contain">
              </div>
            </div>
            
            <!-- Infos -->
            <div class="md:w-2/3">
              <h3 class="text-2xl font-bold text-gray-800">{{ selectedLivre?.titre }}</h3>
              <p class="text-gray-500 mt-1">{{ selectedLivre?.auteur }}</p>
              <p class="text-sm text-gray-400">{{ selectedLivre?.editeur }} • {{ selectedLivre?.annee }}</p>
              
              <div class="flex items-center gap-2 mt-3">
                <div class="flex items-center gap-1">
                  <i class="fas fa-star text-yellow-400 text-sm"></i>
                  <span class="font-semibold">{{ selectedLivre?.note }}</span>
                  <span class="text-xs text-gray-400">({{ selectedLivre?.avis }} avis)</span>
                </div>
                <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{{ selectedLivre?.niveau }}</span>
                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{{ selectedLivre?.matiere }}</span>
              </div>
              
              <div class="mt-4">
                <h4 class="font-semibold text-gray-800">Description</h4>
                <p class="text-sm text-gray-600 mt-1">{{ selectedLivre?.descriptionLongue || selectedLivre?.description }}</p>
              </div>
              
              <div class="grid grid-cols-2 gap-3 mt-4 p-3 bg-gray-50 rounded-xl">
                <div>
                  <p class="text-xs text-gray-400">ISBN</p>
                  <p class="text-sm font-medium">{{ selectedLivre?.isbn || '978-2-123456-78-9' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400">Pages</p>
                  <p class="text-sm font-medium">{{ selectedLivre?.pages || 250 }} pages</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400">Format</p>
                  <p class="text-sm font-medium">15 x 21 cm</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400">Poids</p>
                  <p class="text-sm font-medium">0.5 kg</p>
                </div>
              </div>
              
              <div class="mt-4 flex justify-between items-center">
                <div>
                  <p class="text-2xl font-bold text-primary">{{ formatPrice(selectedLivre?.prix) }} FCFA</p>
                  <p v-if="selectedLivre?.ancienPrix" class="text-sm text-gray-400 line-through">{{ formatPrice(selectedLivre?.ancienPrix) }} FCFA</p>
                </div>
                <button @click="ajouterAuPanier(selectedLivre)" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2">
                  <i class="fas fa-shopping-cart"></i> Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification ajout panier -->
    <div v-if="notificationVisible" class="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-in-right">
      <i class="fas fa-check-circle mr-2"></i> Article ajouté au panier !
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// États du modal
const modalOpen = ref(false);
const selectedLivre = ref(null);
const filtreActif = ref('all');
const searchQuery = ref('');
const notificationVisible = ref(false);
let notificationTimeout = null;

// Compteur du panier
const cartCount = ref(0);

// Filtres
const filtres = ref([
  { id: 'all', nom: 'Tous les livres', icon: 'fas fa-book' },
  { id: 'college', nom: 'Collège', icon: 'fas fa-school' },
  { id: 'lycee', nom: 'Lycée', icon: 'fas fa-graduation-cap' },
  { id: 'concours', nom: 'Concours', icon: 'fas fa-trophy' },
  { id: 'universite', nom: 'Université', icon: 'fas fa-university' }
]);

// Liste des livres
const livresList = ref([
  {
    id: 1,
    titre: 'Le Français au Cameroun',
    auteur: 'Prof. Joseph Owona',
    editeur: 'Presses Universitaires de Yaoundé',
    annee: 2024,
    niveau: 'Lycée',
    matiere: 'Français',
    description: 'Manuel complet de français conforme aux programmes officiels du Cameroun.',
    descriptionLongue: 'Cet ouvrage couvre l\'intégralité du programme de français du secondaire.',
    prix: 12500,
    ancienPrix: 15000,
    note: 4.8,
    avis: 234,
    pages: 320,
    isbn: '978-9956-123-45-6',
    icon: 'fas fa-language',
    categorie: 'lycee',
    image: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    titre: 'Mathématiques Terminale C & E',
    auteur: 'Dr. François Ngue',
    editeur: 'Éditions ABC',
    annee: 2024,
    niveau: 'Lycée',
    matiere: 'Mathématiques',
    description: 'Préparation complète au baccalauréat avec annales corrigées.',
    prix: 18500,
    ancienPrix: 22000,
    note: 4.9,
    avis: 456,
    pages: 450,
    isbn: '978-9956-789-01-2',
    icon: 'fas fa-calculator',
    categorie: 'lycee',
    image: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    titre: 'Histoire du Cameroun',
    auteur: 'Prof. Achille Mbembe',
    editeur: 'Éditions CLE',
    annee: 2023,
    niveau: 'Université',
    matiere: 'Histoire',
    description: 'Histoire complète du Cameroun des origines à nos jours.',
    prix: 22500,
    ancienPrix: null,
    note: 4.7,
    avis: 189,
    pages: 580,
    isbn: '978-9956-456-78-9',
    icon: 'fas fa-landmark',
    categorie: 'universite',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    titre: 'Droit Administratif Camerounais',
    auteur: 'Me. Paul Mba',
    editeur: 'Presses Universitaires',
    annee: 2024,
    niveau: 'Concours',
    matiere: 'Droit',
    description: 'Manuel pour la préparation des concours administratifs.',
    prix: 19500,
    ancienPrix: 25000,
    note: 4.8,
    avis: 312,
    pages: 420,
    isbn: '978-9956-234-56-7',
    icon: 'fas fa-gavel',
    categorie: 'concours',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 5,
    titre: 'Anglais pour les Concours',
    auteur: 'Dr. Sarah Ndi',
    editeur: 'Éditions Bilingual',
    annee: 2024,
    niveau: 'Concours',
    matiere: 'Anglais',
    description: 'Préparation complète aux épreuves d\'anglais des concours.',
    prix: 13500,
    ancienPrix: 16000,
    note: 4.6,
    avis: 178,
    pages: 280,
    isbn: '978-9956-345-67-8',
    icon: 'fas fa-language',
    categorie: 'concours',
    image: 'https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 6,
    titre: 'Culture Générale',
    auteur: 'Prof. Jean Tobie',
    editeur: 'Éditions Savoir',
    annee: 2024,
    niveau: 'Concours',
    matiere: 'Culture Générale',
    description: 'Questions et réponses sur l\'actualité camerounaise et mondiale.',
    prix: 14500,
    ancienPrix: 18000,
    note: 4.8,
    avis: 267,
    pages: 350,
    isbn: '978-9956-456-78-0',
    icon: 'fas fa-globe',
    categorie: 'concours',
    image: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 7,
    titre: 'Sciences de la Vie et de la Terre',
    auteur: 'Dr. Rose Ngo',
    editeur: 'Éditions Science Plus',
    annee: 2024,
    niveau: 'Lycée',
    matiere: 'SVT',
    description: 'Manuel conforme au programme officiel du Cameroun.',
    prix: 15500,
    ancienPrix: 19000,
    note: 4.7,
    avis: 145,
    pages: 380,
    isbn: '978-9956-567-89-0',
    icon: 'fas fa-leaf',
    categorie: 'lycee',
    image: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?w=300&h=300&fit=crop'
  },
  {
    id: 8,
    titre: 'Philosophie Terminale',
    auteur: 'Prof. Lucien Ayissi',
    editeur: 'Éditions Phi',
    annee: 2024,
    niveau: 'Lycée',
    matiere: 'Philosophie',
    description: 'Méthodologie et sujets corrigés pour le baccalauréat.',
    prix: 12500,
    ancienPrix: null,
    note: 4.5,
    avis: 98,
    pages: 300,
    isbn: '978-9956-678-90-1',
    icon: 'fas fa-brain',
    categorie: 'lycee',
    image: 'https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?w=300&h=300&fit=crop'
  }
]);

// Livres filtrés
const livresFiltres = computed(() => {
  let result = livresList.value;
  
  if (filtreActif.value !== 'all') {
    result = result.filter(l => l.categorie === filtreActif.value);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(l => 
      l.titre.toLowerCase().includes(query) ||
      l.auteur.toLowerCase().includes(query) ||
      l.matiere.toLowerCase().includes(query) ||
      l.editeur.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// Mettre à jour le compteur du panier
const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart_items') || '[]');
  cartCount.value = cart.length;
};

// Formatage du prix
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Gestion modal
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && modalOpen.value) {
    closeModal();
  }
};

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const openDetailsModal = (livre) => {
  selectedLivre.value = livre;
  modalOpen.value = true;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEscapeKey);
};

const closeModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = 'auto';
  selectedLivre.value = null;
  document.removeEventListener('keydown', handleEscapeKey);
};

// Ajouter au panier
const ajouterAuPanier = (livre) => {
  let cart = JSON.parse(localStorage.getItem('cart_items') || '[]');
  
  const articlePanier = {
    id: livre.id,
    titre: livre.titre,
    formateur: livre.auteur,
    duree: 'Livre physique',
    niveau: livre.niveau,
    modules: 1,
    prix: livre.prix,
    popularite: Math.round(livre.note * 20),
    image: livre.image,
    type: 'livre',
    categorie: livre.matiere
  };
  
  if (!cart.some(item => item.id === livre.id)) {
    cart.push(articlePanier);
    localStorage.setItem('cart_items', JSON.stringify(cart));
    
    // Mettre à jour le compteur
    updateCartCount();
    
    // Afficher notification
    notificationVisible.value = true;
    if (notificationTimeout) clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      notificationVisible.value = false;
    }, 2000);
  } else {
    alert('Ce livre est déjà dans votre panier');
  }
};

// Réinitialiser les filtres
const resetFiltres = () => {
  filtreActif.value = 'all';
  searchQuery.value = '';
};

// Initialisation
onMounted(() => {
  updateCartCount();
  
  // Écouter les changements de localStorage
  window.addEventListener('storage', (e) => {
    if (e.key === 'cart_items') {
      updateCartCount();
    }
  });
});

// Nettoyage
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
  document.body.style.overflow = 'auto';
  if (notificationTimeout) clearTimeout(notificationTimeout);
  window.removeEventListener('storage', () => {});
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}

.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

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

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.animate-pulse {
  animation: pulse 0.5s ease-in-out;
}
</style>
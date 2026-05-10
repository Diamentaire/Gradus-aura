<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
    <div class="container mx-auto px-5 lg:px-8 py-3 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2 flex-shrink-0">
        <div class="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-md">
          <i class="fas fa-graduation-cap text-white text-xl"></i>
        </div>
        <span class="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
          Gradus Aura
        </span>
      </router-link>
      
      <!-- Navigation Desktop -->
      <nav class="hidden lg:flex items-center space-x-6 xl:space-x-8 text-gray-700 font-medium">
        <router-link to="/" class="hover:text-primary transition-colors" :class="{ 'text-primary font-semibold border-b-2 border-primary': $route.path === '/' }">
          Accueil
        </router-link>
        <router-link to="/concours" class="hover:text-primary transition-colors" :class="{ 'text-primary font-semibold border-b-2 border-primary': $route.path === '/concours' }">
          Concours
        </router-link>
        <router-link to="/examens" class="hover:text-primary transition-colors" :class="{ 'text-primary font-semibold border-b-2 border-primary': $route.path === '/examens' }">
          Examens
        </router-link>
        <router-link to="/formations" class="hover:text-primary transition-colors" :class="{ 'text-primary font-semibold border-b-2 border-primary': $route.path === '/formations' }">
          Formations
        </router-link>
        <router-link to="/ressources" class="hover:text-primary transition-colors" :class="{ 'text-primary font-semibold border-b-2 border-primary': $route.path === '/ressources' }">
          Ressources
        </router-link>
        
        <!-- Boutique avec dropdown -->
        <div class="relative">
          <button 
            @click="toggleBoutique"
            @mouseenter="boutiqueOpen = true"
            class="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none"
            :class="{ 'text-primary font-semibold': boutiqueOpen || $route.path.includes('/boutique') || $route.path.includes('/mobilite') || $route.path.includes('/e-learning') }"
          >
            Boutique
            <i class="fas fa-chevron-down text-xs transition-transform" :class="{ 'rotate-180': boutiqueOpen }"></i>
          </button>
          
          <!-- Dropdown Boutique avec délai avant fermeture -->
          <div 
            v-show="boutiqueOpen" 
            @mouseenter="cancelCloseBoutique"
            @mouseleave="startCloseBoutiqueTimer"
            class="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-fade-in-up"
          >
            <router-link 
              to="/boutique" 
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              @click="boutiqueOpen = false"
            >
              <i class="fas fa-laptop-code w-5 text-primary"></i>
              <div>
                <span class="text-sm font-medium">E-learning</span>
                <p class="text-[10px] text-gray-400">Formations en ligne</p>
              </div>
            </router-link>
            
            <div class="border-t border-gray-100 my-1"></div>
            
            <router-link 
              to="/mobilite/pays" 
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              @click="boutiqueOpen = false"
            >
              <i class="fas fa-globe w-5 text-primary"></i>
              <div>
                <span class="text-sm font-medium">Pays d'études</span>
                <p class="text-[10px] text-gray-400">Destinations internationales</p>
              </div>
            </router-link>
            
            <router-link 
              to="/mobilite/bourses" 
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              @click="boutiqueOpen = false"
            >
              <i class="fas fa-graduation-cap w-5 text-primary"></i>
              <div>
                <span class="text-sm font-medium">Bourses d'études</span>
                <p class="text-[10px] text-gray-400">Financez vos études</p>
              </div>
            </router-link>
          </div>
        </div>
        
        <router-link to="/contact" class="hover:text-primary transition-colors" :class="{ 'text-primary font-semibold border-b-2 border-primary': $route.path === '/contact' }">
          Contact
        </router-link>
      </nav>
      
      <!-- Boutons droite -->
      <div class="hidden lg:flex items-center gap-3 flex-shrink-0">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="px-5 py-2 text-primary font-semibold border border-primary rounded-xl hover:bg-primary hover:text-white transition-all whitespace-nowrap">
            <i class="fas fa-sign-in-alt mr-2"></i> Connexion
          </router-link>
          <router-link to="/register" class="px-5 py-2 gradient-bg text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap">
            <i class="fas fa-user-plus mr-2"></i> Inscription
          </router-link>
        </template>
        <template v-else>
          <!-- Menu utilisateur -->
          <div class="relative">
            <button @click="toggleDropdown" class="flex items-center gap-2 focus:outline-none group">
              <div class="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                {{ userInitials }}
              </div>
              <div class="hidden xl:block text-left">
                <p class="text-sm font-semibold text-gray-800">{{ userName }}</p>
                <p class="text-[10px] text-gray-500">{{ userRole }}</p>
              </div>
              <i class="fas fa-chevron-down text-gray-500 text-xs transition-transform" :class="{ 'rotate-180': dropdownOpen }"></i>
            </button>
            
            <!-- Dropdown menu -->
            <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 animate-fade-in-up">
              <!-- En-tête dropdown -->
              <div class="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                <div class="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold">
                  {{ userInitials }}
                </div>
                <div>
                  <p class="font-bold text-gray-800 text-sm">{{ userName }}</p>
                  <p class="text-xs text-gray-500">{{ userEmail }}</p>
                </div>
              </div>
              
              <!-- Liens -->
              <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors" @click="dropdownOpen = false">
                <i class="fas fa-tachometer-alt w-5 text-primary"></i>
                <span class="text-sm">Tableau de bord</span>
              </router-link>
              <router-link to="/profile" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors" @click="dropdownOpen = false">
                <i class="fas fa-user w-5 text-primary"></i>
                <span class="text-sm">Mon profil</span>
              </router-link>
              <router-link to="/mes-formations" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors" @click="dropdownOpen = false">
                <i class="fas fa-graduation-cap w-5 text-primary"></i>
                <span class="text-sm">Mes formations</span>
              </router-link>
              <router-link to="/mes-concours" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors" @click="dropdownOpen = false">
                <i class="fas fa-trophy w-5 text-primary"></i>
                <span class="text-sm">Mes concours</span>
              </router-link>
              
              <hr class="my-1">
              
              <router-link to="/boutique" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors" @click="dropdownOpen = false">
                <i class="fas fa-laptop-code w-5 text-primary"></i>
                <span class="text-sm">E-learning</span>
              </router-link>
              <router-link to="/mobilite/pays" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors" @click="dropdownOpen = false">
                <i class="fas fa-globe w-5 text-primary"></i>
                <span class="text-sm">Pays d'études</span>
              </router-link>
              <router-link to="/mobilite/bourses" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors" @click="dropdownOpen = false">
                <i class="fas fa-graduation-cap w-5 text-primary"></i>
                <span class="text-sm">Bourses d'études</span>
              </router-link>
              
              <hr class="my-1">
              
              <router-link to="/parametres" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors" @click="dropdownOpen = false">
                <i class="fas fa-cog w-5 text-gray-500"></i>
                <span class="text-sm">Paramètres</span>
              </router-link>
              
              <hr class="my-1">
              
              <button @click="logout" class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600">
                <i class="fas fa-sign-out-alt w-5"></i>
                <span class="text-sm font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </template>
      </div>
      
      <!-- Bouton menu mobile -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden text-gray-700 text-2xl focus:outline-none p-2">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    
    <!-- Menu mobile -->
    <div v-show="mobileMenuOpen" class="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in-up" style="max-height: 80vh; overflow-y: auto;">
      <!-- Profil mobile -->
      <div v-if="isAuthenticated" class="px-5 py-4 bg-gradient-to-r from-indigo-50 to-cyan-50 flex items-center gap-3 sticky top-0">
        <div class="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-lg">
          {{ userInitials }}
        </div>
        <div>
          <p class="font-bold text-gray-800">{{ userName }}</p>
          <p class="text-xs text-gray-500">{{ userEmail }}</p>
        </div>
      </div>
      
      <div class="px-5 py-3 flex flex-col space-y-2">
        <router-link to="/" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors" :class="{ 'text-primary font-semibold': $route.path === '/' }">
          Accueil
        </router-link>
        <router-link to="/concours" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors" :class="{ 'text-primary font-semibold': $route.path === '/concours' }">
          Concours
        </router-link>
        <router-link to="/examens" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors" :class="{ 'text-primary font-semibold': $route.path === '/examens' }">
          Examens
        </router-link>
        <router-link to="/formations" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors" :class="{ 'text-primary font-semibold': $route.path === '/formations' }">
          Formations
        </router-link>
        <router-link to="/ressources" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors" :class="{ 'text-primary font-semibold': $route.path === '/ressources' }">
          Ressources
        </router-link>
        
        <!-- Boutique mobile avec sous-menu -->
        <div class="py-2.5 border-t border-gray-100 mt-2">
          <button @click="mobileBoutiqueOpen = !mobileBoutiqueOpen" class="w-full text-left text-gray-700 hover:text-primary transition-colors flex items-center justify-between">
            <span :class="{ 'text-primary font-semibold': $route.path.includes('/e-learning') || $route.path.includes('/mobilite') }">Boutique</span>
            <i class="fas fa-chevron-down text-xs transition-transform" :class="{ 'rotate-180': mobileBoutiqueOpen }"></i>
          </button>
          <div v-show="mobileBoutiqueOpen" class="pl-4 mt-2 space-y-2 border-l-2 border-primary/20 ml-2">
            <router-link to="/boutique" @click="mobileMenuOpen = false" class="block py-2 text-gray-600 hover:text-primary transition-colors">
              <i class="fas fa-laptop-code w-4 mr-2 text-primary"></i> E-learning
            </router-link>
            <router-link to="/mobilite/pays" @click="mobileMenuOpen = false" class="block py-2 text-gray-600 hover:text-primary transition-colors">
              <i class="fas fa-globe w-4 mr-2 text-primary"></i> Pays d'études
            </router-link>
            <router-link to="/mobilite/bourses" @click="mobileMenuOpen = false" class="block py-2 text-gray-600 hover:text-primary transition-colors">
              <i class="fas fa-graduation-cap w-4 mr-2 text-primary"></i> Bourses d'études
            </router-link>
          </div>
        </div>
        
        <router-link to="/contact" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors" :class="{ 'text-primary font-semibold': $route.path === '/contact' }">
          Contact
        </router-link>
        
        <!-- Menu utilisateur mobile -->
        <div v-if="isAuthenticated" class="pt-3 mt-2 border-t border-gray-100">
          <router-link to="/dashboard" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors block">
            Tableau de bord
          </router-link>
          <router-link to="/profile" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors block">
            Mon profil
          </router-link>
          <router-link to="/mes-formations" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors block">
            Mes formations
          </router-link>
          <router-link to="/mes-concours" @click="mobileMenuOpen = false" class="py-2.5 text-gray-700 hover:text-primary transition-colors block">
            Mes concours
          </router-link>
          <button @click="logout" class="w-full text-left py-2.5 text-red-600 hover:bg-red-50 transition-colors rounded-lg mt-2">
            Déconnexion
          </button>
        </div>
        
        <!-- Boutons auth mobile avec icones -->
        <div v-else class="flex flex-col gap-2 pt-3 mt-2 border-t border-gray-100">
          <router-link to="/login" @click="mobileMenuOpen = false" class="text-center py-2.5 text-primary font-semibold border border-primary rounded-xl hover:bg-primary hover:text-white transition-all">
            <i class="fas fa-sign-in-alt mr-2"></i> Connexion
          </router-link>
          <router-link to="/register" @click="mobileMenuOpen = false" class="text-center py-2.5 gradient-bg text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
            <i class="fas fa-user-plus mr-2"></i> Inscription
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// États
const dropdownOpen = ref(false);
const mobileMenuOpen = ref(false);
const boutiqueOpen = ref(false);
const mobileBoutiqueOpen = ref(false);
let closeTimer = null;

// Données utilisateur locales (sans store)
const isAuthenticated = ref(false);
const user = ref(null);

// Charger les données utilisateur depuis localStorage
const loadUserData = () => {
  const token = localStorage.getItem('gradus_token');
  const userStr = localStorage.getItem('gradus_user');
  
  isAuthenticated.value = !!token;
  
  if (userStr) {
    try {
      user.value = JSON.parse(userStr);
    } catch (e) {
      console.error('Erreur lors du chargement des données utilisateur');
      user.value = null;
    }
  } else {
    user.value = null;
  }
};

// Informations utilisateur complètes
const userName = computed(() => {
  return user.value?.fullname || user.value?.name || user.value?.nom || 'Utilisateur';
});

const userEmail = computed(() => {
  return user.value?.email || '';
});

const userInitials = computed(() => {
  const name = userName.value;
  return name.charAt(0).toUpperCase();
});

const userRole = computed(() => {
  const role = user.value?.role || user.value?.type;
  if (role === 'admin') return 'Administrateur';
  if (role === 'formateur' || role === 'instructor') return 'Formateur';
  if (role === 'student') return 'Élève';
  return 'Membre';
});

// Toggle dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const toggleBoutique = () => {
  boutiqueOpen.value = !boutiqueOpen.value;
};

// Gestion du timer pour fermeture différée
const startCloseBoutiqueTimer = () => {
  closeTimer = setTimeout(() => {
    boutiqueOpen.value = false;
  }, 300);
};

const cancelCloseBoutique = () => {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
};

// Fermer dropdown au clic extérieur
const closeDropdown = (event) => {
  if (!event.target.closest('.relative')) {
    dropdownOpen.value = false;
  }
  if (!event.target.closest('.relative:has(button)')) {
    cancelCloseBoutique();
    boutiqueOpen.value = false;
  }
};

// Déconnexion
const logout = async () => {
  dropdownOpen.value = false;
  mobileMenuOpen.value = false;
  
  // Nettoyer le localStorage
  localStorage.removeItem('gradus_token');
  localStorage.removeItem('gradus_user');
  
  // Mettre à jour l'état local
  isAuthenticated.value = false;
  user.value = null;
  
  await router.push('/');
};

// Lifecycle
onMounted(() => {
  loadUserData();
  document.addEventListener('click', closeDropdown);
  
  // Écouter les changements de localStorage (pour mise à jour depuis d'autres onglets)
  window.addEventListener('storage', loadUserData);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
  window.removeEventListener('storage', loadUserData);
  if (closeTimer) {
    clearTimeout(closeTimer);
  }
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.2s ease-out;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
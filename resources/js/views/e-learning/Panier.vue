<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO AVEC ANIMATION -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-16 md:py-20">
      <!-- Animated background shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-ping"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-bounce-in">
          <i class="fas fa-shopping-cart text-white text-sm animate-pulse"></i>
          <span class="text-white font-semibold text-sm">Achat de formations</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-down">
          Mon panier
        </h1>
        <p class="text-indigo-100 text-base md:text-lg max-w-2xl mx-auto animate-slide-up">
          Gérez vos achats de formations et passez à la caisse en toute sécurité
        </p>
        
        <!-- Floating elements -->
        <div class="absolute top-20 left-10 animate-float-slow">
          <i class="fas fa-graduation-cap text-white/20 text-4xl"></i>
        </div>
        <div class="absolute bottom-10 right-10 animate-float-fast">
          <i class="fas fa-certificate text-white/20 text-4xl"></i>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Liste des articles -->
        <div class="lg:col-span-2">
          <!-- Panier vide -->
          <div v-if="cartItems.length === 0" class="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in">
            <div class="relative inline-block">
              <div class="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mb-6 animate-float">
                <i class="fas fa-shopping-cart text-5xl text-indigo-400"></i>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center animate-pulse">
                <i class="fas fa-exclamation text-white text-xs"></i>
              </div>
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-gray-800">Votre panier est vide</h3>
            <p class="text-gray-500 mt-2">Découvrez nos formations et ajoutez-en à votre panier</p>
            <router-link to="/boutique" class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <i class="fas fa-search"></i> Explorer les formations
              <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
            </router-link>
          </div>

          <!-- Liste des articles -->
          <div v-else class="space-y-4">
            <div v-for="(item, index) in cartItems" :key="item.id" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in" :style="{ animationDelay: index * 0.1 + 's' }">
              <div class="flex flex-col sm:flex-row gap-4 p-4">
                <!-- Image avec effet -->
                <div class="relative group w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img :src="item.image" :alt="item.titre" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-check-circle mr-1"></i> Disponible
                  </div>
                </div>
                
                <div class="flex-1">
                  <div class="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h3 class="font-bold text-lg text-gray-800 hover:text-primary transition-colors">{{ item.titre }}</h3>
                      <p class="text-sm text-gray-500 mt-1">
                        <i class="fas fa-chalkboard-user text-primary mr-1"></i> {{ item.formateur }} 
                        <span class="mx-2">•</span>
                        <i class="fas fa-clock text-primary mr-1"></i> {{ item.duree }}
                      </p>
                      <div class="flex flex-wrap items-center gap-2 mt-2">
                        <span class="text-xs bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-2 py-0.5 rounded-full">
                          <i class="fas fa-chart-line mr-1"></i> {{ item.niveau }}
                        </span>
                        <span class="text-xs bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-2 py-0.5 rounded-full">
                          <i class="fas fa-video mr-1"></i> {{ item.modules || 12 }} modules
                        </span>
                        <span class="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-0.5 rounded-full">
                          <i class="fas fa-certificate mr-1"></i> Certificat inclus
                        </span>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                        {{ formatPrice(item.prix) }} FCFA
                      </p>
                      <button @click="retirerDuPanier(item.id)" class="text-red-500 text-sm hover:text-red-700 transition-colors mt-1 flex items-center gap-1">
                        <i class="fas fa-trash-alt"></i> Retirer
                      </button>
                    </div>
                  </div>
                  
                  <!-- Barre de progression -->
                  <div class="mt-3 pt-2 border-t border-gray-100">
                    <div class="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Popularité</span>
                      <span>{{ item.popularite || 89 }}%</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500" :style="{ width: (item.popularite || 89) + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section coupon -->
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-5 border border-amber-100 animate-fade-in">
              <div class="flex flex-col sm:flex-row gap-4 items-center">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <i class="fas fa-ticket-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800">Code promo</p>
                    <p class="text-xs text-gray-500">Économisez sur votre commande</p>
                  </div>
                </div>
                <div class="flex-1 flex gap-2">
                  <input type="text" v-model="couponCode" placeholder="Entrez votre code promo" 
                    class="flex-1 px-4 py-2.5 rounded-xl border border-amber-200 bg-white focus:border-primary focus:ring-primary transition">
                  <button @click="appliquerCoupon" class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105">
                    <i class="fas fa-gift mr-1"></i> Appliquer
                  </button>
                </div>
              </div>
              <p v-if="couponMessage" class="text-sm mt-3 text-center" :class="couponValide ? 'text-green-600' : 'text-red-500'">
                <i :class="couponValide ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="mr-1"></i>
                {{ couponMessage }}
              </p>
            </div>
            
            <!-- Suggestions -->
            <div class="mt-6">
              <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <i class="fas fa-star text-yellow-400"></i> Vous pourriez aussi aimer
              </h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div v-for="suggestion in suggestions" :key="suggestion.id" class="bg-white rounded-xl shadow-sm p-2 hover:shadow-md transition cursor-pointer" @click="ajouterSuggestion(suggestion)">
                  <img :src="suggestion.image" class="w-full h-20 object-cover rounded-lg mb-2">
                  <p class="text-xs font-medium text-gray-800 line-clamp-1">{{ suggestion.titre }}</p>
                  <p class="text-xs text-primary font-bold mt-1">{{ formatPrice(suggestion.prix) }} FCFA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Résumé de la commande -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100 animate-slide-in-right">
            <div class="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <div class="w-10 h-10 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-receipt text-primary text-lg"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Résumé de la commande</h3>
            </div>
            
            <div class="space-y-3 border-b pb-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Sous-total</span>
                <span class="font-semibold">{{ formatPrice(sousTotal) }} FCFA</span>
              </div>
              <div v-if="remise > 0" class="flex justify-between items-center">
                <span class="text-gray-600">Remise</span>
                <span class="text-red-600 font-semibold">- {{ formatPrice(remise) }} FCFA</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Frais de plateforme</span>
                <span class="font-semibold">{{ formatPrice(fraisPlateforme) }} FCFA</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center pt-4 mb-6">
              <span class="text-xl font-bold text-gray-800">Total</span>
              <div class="text-right">
                <span class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  {{ formatPrice(total) }} FCFA
                </span>
                <p class="text-xs text-gray-400">TVA incluse</p>
              </div>
            </div>
            
            <!-- Méthodes de paiement -->
            <div class="mb-4 p-3 bg-gray-50 rounded-xl">
              <p class="text-xs text-gray-500 mb-2">Paiement sécurisé par :</p>
              <div class="flex gap-3 justify-center">
                <i class="fab fa-cc-visa text-2xl text-blue-800"></i>
                <i class="fab fa-cc-mastercard text-2xl text-red-600"></i>
                <i class="fas fa-mobile-alt text-2xl text-orange-500"></i>
                <i class="fas fa-university text-2xl text-green-600"></i>
              </div>
            </div>
            
            <button @click="passerCommande" :disabled="cartItems.length === 0" 
              class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group">
              <i class="fas fa-credit-card group-hover:animate-bounce"></i>
              Passer à la caisse
              <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
            </button>
            
            <div class="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <span><i class="fas fa-lock mr-1"></i> Paiement sécurisé</span>
              <span><i class="fas fa-shield-alt mr-1"></i> Données cryptées</span>
              <span><i class="fas fa-clock mr-1"></i> 14 jours de rétractation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const cartItems = ref([]);
const couponCode = ref('');
const couponMessage = ref('');
const couponValide = ref(false);
const remiseValue = ref(0);

// Suggestions
const suggestions = ref([
  { id: 101, titre: 'Management et Leadership', prix: 120000, image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=80&h=80&fit=crop' },
  { id: 102, titre: 'Marketing Digital Avancé', prix: 135000, image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?w=80&h=80&fit=crop' },
  { id: 103, titre: 'Comptabilité Générale', prix: 110000, image: 'https://images.pexels.com/photos/210647/pexels-photo-210647.jpeg?w=80&h=80&fit=crop' }
]);

const sousTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.prix, 0);
});

const remise = computed(() => {
  return couponValide.value ? remiseValue.value : 0;
});

const fraisPlateforme = computed(() => {
  return Math.round(sousTotal.value * 0.05);
});

const total = computed(() => {
  return sousTotal.value - remise.value + fraisPlateforme.value;
});

const formatPrice = (price) => {
  return price.toLocaleString('fr-FR');
};

const appliquerCoupon = () => {
  if (couponCode.value === 'BIENVENUE10') {
    remiseValue.value = Math.round(sousTotal.value * 0.1);
    couponValide.value = true;
    couponMessage.value = 'Code promo appliqué ! Remise de 10%';
  } else if (couponCode.value === 'FORMATION20') {
    remiseValue.value = Math.round(sousTotal.value * 0.2);
    couponValide.value = true;
    couponMessage.value = 'Code promo appliqué ! Remise de 20%';
  } else if (couponCode.value === 'GRADUS30') {
    remiseValue.value = Math.round(sousTotal.value * 0.3);
    couponValide.value = true;
    couponMessage.value = 'Code promo appliqué ! Remise exceptionnelle de 30%';
  } else if (couponCode.value) {
    couponValide.value = false;
    remiseValue.value = 0;
    couponMessage.value = 'Code promo invalide';
  }
};

const retirerDuPanier = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id);
  localStorage.setItem('cart_items', JSON.stringify(cartItems.value));
};

const ajouterSuggestion = (suggestion) => {
  const newItem = {
    id: suggestion.id,
    titre: suggestion.titre,
    formateur: 'Formateur Expert',
    duree: '2 mois',
    niveau: 'Intermédiaire',
    modules: 8,
    prix: suggestion.prix,
    popularite: 75,
    image: suggestion.image
  };
  cartItems.value.push(newItem);
  localStorage.setItem('cart_items', JSON.stringify(cartItems.value));
};

const passerCommande = () => {
  if (cartItems.value.length === 0) return;
  
  const commande = {
    id: Date.now(),
    items: cartItems.value,
    sousTotal: sousTotal.value,
    remise: remise.value,
    fraisPlateforme: fraisPlateforme.value,
    total: total.value,
    date: new Date().toISOString(),
    statut: 'en_attente'
  };
  
  localStorage.setItem('commande_en_cours', JSON.stringify(commande));
  router.push('/e-learning/paiement');
};

onMounted(() => {
  const savedCart = localStorage.getItem('cart_items');
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
  } else {
    // Données de démonstration
    cartItems.value = [
      {
        id: 1,
        titre: 'Préparation Complète Concours Administratifs',
        formateur: 'Prof. Jean Martin',
        duree: '3 mois',
        niveau: 'Avancé',
        modules: 12,
        prix: 150000,
        popularite: 94,
        image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=150&h=150&fit=crop'
      },
      {
        id: 2,
        titre: 'Data Science et Intelligence Artificielle',
        formateur: 'Dr. Marie Claire',
        duree: '4 mois',
        niveau: 'Intermédiaire',
        modules: 15,
        prix: 200000,
        popularite: 87,
        image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=150&h=150&fit=crop'
      }
    ];
  }
});
</script>

<style scoped>
.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

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

@keyframes slide-in {
  from { transform: translateX(-30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-right {
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(-10px); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
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

.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.delay-700 {
  animation-delay: 0.7s;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
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
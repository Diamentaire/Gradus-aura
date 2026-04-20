<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO AVEC ANIMATIONS -->
    <section class="relative overflow-hidden bg-gradient-to-r from-green-700 to-teal-700 py-16 md:py-20">
      <!-- Animated background -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-ping"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-bounce-in">
          <i class="fas fa-credit-card text-white text-sm animate-pulse"></i>
          <span class="text-white font-semibold text-sm">Paiement sécurisé</span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-down">
          Finaliser votre paiement
        </h1>
        <p class="text-indigo-100 text-base md:text-lg max-w-2xl mx-auto animate-slide-up">
          Choisissez votre mode de paiement et validez votre commande en toute sécurité
        </p>
        
        <!-- Floating elements -->
        <div class="absolute top-20 left-10 animate-float-slow">
          <i class="fas fa-lock text-white/20 text-4xl"></i>
        </div>
        <div class="absolute bottom-10 right-10 animate-float-fast">
          <i class="fas fa-shield-alt text-white/20 text-4xl"></i>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm mb-6 overflow-x-auto pb-2">
        <router-link to="/dashboard" class="text-gray-500 hover:text-primary transition flex items-center gap-1">
          <i class="fas fa-home"></i> Dashboard
        </router-link>
        <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        <router-link to="/e-learning/panier" class="text-gray-500 hover:text-primary transition">Panier</router-link>
        <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
        <span class="text-gray-800 font-medium">Paiement</span>
      </div>

      <div class="grid lg:grid-cols-3 gap-6 md:gap-8">
        <!-- Formulaire de paiement -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-xl p-4 md:p-6 animate-fade-in-up">
            <div class="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
              <div class="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                <i class="fas fa-credit-card text-white text-lg"></i>
              </div>
              <h3 class="text-lg md:text-xl font-bold text-gray-800">Mode de paiement</h3>
            </div>
            
            <!-- Options de paiement -->
            <div class="grid gap-4 mb-8">
              <div v-for="option in paymentOptions" :key="option.id" 
                @click="selectedPayment = option.id"
                :class="['p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]', selectedPayment === option.id ? 'border-primary bg-gradient-to-r from-primary/5 to-transparent shadow-md' : 'border-gray-200 hover:border-primary hover:shadow-md']">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-all" :class="[option.bgColor, selectedPayment === option.id ? 'scale-110' : '']">
                    <i :class="option.icon" class="text-2xl"></i>
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-gray-800">{{ option.nom }}</p>
                    <p class="text-xs text-gray-500">{{ option.description }}</p>
                  </div>
                  <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all" :class="selectedPayment === option.id ? 'border-primary bg-primary' : 'border-gray-300'">
                    <i v-if="selectedPayment === option.id" class="fas fa-check text-white text-xs"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Formulaire Mobile Money (MTN/Orange) -->
            <div v-if="selectedPayment === 'mtn' || selectedPayment === 'orange'" class="border-t pt-6 animate-fade-in">
              <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-mobile-alt text-primary"></i> Informations de paiement
              </h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                  <div class="flex">
                    <span class="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">+237</span>
                    <input type="tel" v-model="mobileMoneyNumber" placeholder="6XXXXXXXX" class="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom du compte</label>
                  <input type="text" v-model="accountName" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
                </div>
                <div class="bg-yellow-50 rounded-xl p-3 flex gap-2">
                  <i class="fas fa-info-circle text-yellow-600 mt-0.5"></i>
                  <p class="text-xs text-yellow-700">Vous recevrez une notification sur votre téléphone pour confirmer le paiement.</p>
                </div>
              </div>
            </div>

            <!-- Formulaire Carte Bancaire -->
            <div v-if="selectedPayment === 'carte'" class="border-t pt-6 animate-fade-in">
              <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fas fa-credit-card text-primary"></i> Informations carte bancaire
              </h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                  <input type="text" v-model="cardNumber" placeholder="1234 5678 9012 3456" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                    <input type="text" v-model="expiryDate" placeholder="MM/AA" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input type="text" v-model="cvv" placeholder="123" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nom du titulaire</label>
                  <input type="text" v-model="cardHolder" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
                </div>
                <div class="flex gap-2 items-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" class="h-6 object-contain" alt="Visa">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" class="h-6 object-contain" alt="Mastercard">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/American_Express_logo.svg/1280px-American_Express_logo.svg.png" class="h-5 object-contain" alt="American Express">
                </div>
              </div>
            </div>

            <!-- Formulaire PayPal -->
            <div v-if="selectedPayment === 'paypal'" class="border-t pt-6 animate-fade-in">
              <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i class="fab fa-paypal text-primary text-xl"></i> Connexion PayPal
              </h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email PayPal</label>
                  <input type="email" v-model="paypalEmail" placeholder="votre@email.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary transition">
                </div>
                <div class="bg-blue-50 rounded-xl p-3 flex gap-2">
                  <i class="fab fa-paypal text-blue-600 text-xl"></i>
                  <div>
                    <p class="text-sm text-blue-800 font-medium">Paiement sécurisé avec PayPal</p>
                    <p class="text-xs text-blue-600">Vous serez redirigé vers PayPal pour finaliser votre paiement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Résumé commande -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl p-4 md:p-6 sticky top-24 border border-gray-100 animate-slide-in-right">
            <div class="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <div class="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-receipt text-primary text-lg"></i>
              </div>
              <h3 class="text-lg md:text-xl font-bold text-gray-800">Récapitulatif</h3>
            </div>
            
            <div class="space-y-3 max-h-64 overflow-y-auto mb-4 custom-scrollbar">
              <div v-for="item in commande.items" :key="item.id" class="flex gap-3 pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded-lg transition">
                <img :src="item.image" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-1">
                  <p class="font-medium text-sm text-gray-800">{{ item.titre }}</p>
                  <p class="text-xs text-gray-500">{{ formatPrice(item.prix) }} FCFA</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-2 border-t pt-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Sous-total</span>
                <span class="font-medium">{{ formatPrice(commande.sousTotal) }} FCFA</span>
              </div>
              <div v-if="commande.remise > 0" class="flex justify-between text-sm">
                <span class="text-gray-600">Remise</span>
                <span class="text-red-600 font-medium">- {{ formatPrice(commande.remise) }} FCFA</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Frais de plateforme</span>
                <span class="font-medium">{{ formatPrice(commande.fraisPlateforme) }} FCFA</span>
              </div>
              <div class="flex justify-between pt-3 border-t border-gray-200">
                <span class="font-bold text-gray-800">Total</span>
                <span class="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  {{ formatPrice(commande.total) }} FCFA
                </span>
              </div>
            </div>
            
            <button @click="effectuerPaiement" :disabled="isProcessing" class="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group">
              <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-lock group-hover:animate-pulse"></i>
              {{ isProcessing ? 'Traitement en cours...' : 'Confirmer le paiement' }}
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

    <!-- Modal succès -->
    <div v-if="successModalOpen" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in" @click.self="closeSuccessModal">
      <div class="bg-white rounded-2xl w-full max-w-md text-center p-6 animate-scale-in">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <i class="fas fa-check-circle text-green-600 text-4xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-800">Paiement réussi !</h3>
        <p class="text-gray-500 mt-2">Votre commande a été confirmée. Vous recevrez un email de confirmation.</p>
        <div class="flex flex-col sm:flex-row gap-3 mt-6">
          <button @click="voirMesFormations" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg transition">
            <i class="fas fa-graduation-cap mr-2"></i> Voir mes formations
          </button>
          <button @click="closeSuccessModal" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition">
            <i class="fas fa-times mr-2"></i> Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Modal chargement -->
    <div v-if="isProcessing" class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-8 text-center">
        <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-700 font-medium">Traitement du paiement...</p>
        <p class="text-xs text-gray-400 mt-1">Veuillez patienter</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const paymentOptions = ref([
  { id: 'mtn', nom: 'MTN Mobile Money', icon: 'fas fa-mobile-alt', bgColor: 'bg-yellow-100 text-yellow-600', description: 'Paiement via MTN Mobile Money' },
  { id: 'orange', nom: 'Orange Money', icon: 'fas fa-mobile-alt', bgColor: 'bg-orange-100 text-orange-600', description: 'Paiement via Orange Money' },
  { id: 'carte', nom: 'Carte Bancaire', icon: 'fas fa-credit-card', bgColor: 'bg-blue-100 text-blue-600', description: 'Visa, Mastercard, American Express' },
  { id: 'paypal', nom: 'PayPal', icon: 'fab fa-paypal', bgColor: 'bg-blue-100 text-blue-600', description: 'Paiement sécurisé via PayPal' }
]);

const selectedPayment = ref('mtn');
const mobileMoneyNumber = ref('');
const accountName = ref('');
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');
const cardHolder = ref('');
const paypalEmail = ref('');
const isProcessing = ref(false);
const successModalOpen = ref(false);

const commande = ref({
  items: [],
  sousTotal: 0,
  remise: 0,
  fraisPlateforme: 0,
  total: 0
});

const formatPrice = (price) => {
  return price.toLocaleString('fr-FR');
};

const effectuerPaiement = () => {
  // Validation selon le mode de paiement
  if (selectedPayment.value === 'mtn' || selectedPayment.value === 'orange') {
    if (!mobileMoneyNumber.value || mobileMoneyNumber.value.length < 9) {
      alert('Veuillez entrer un numéro de téléphone valide');
      return;
    }
    if (!accountName.value) {
      alert('Veuillez entrer le nom du compte');
      return;
    }
  } else if (selectedPayment.value === 'carte') {
    if (!cardNumber.value || cardNumber.value.replace(/\s/g, '').length < 16) {
      alert('Veuillez entrer un numéro de carte valide');
      return;
    }
    if (!expiryDate.value) {
      alert('Veuillez entrer la date d\'expiration');
      return;
    }
    if (!cvv.value || cvv.value.length < 3) {
      alert('Veuillez entrer le CVV');
      return;
    }
    if (!cardHolder.value) {
      alert('Veuillez entrer le nom du titulaire');
      return;
    }
  } else if (selectedPayment.value === 'paypal') {
    if (!paypalEmail.value || !paypalEmail.value.includes('@')) {
      alert('Veuillez entrer une adresse email PayPal valide');
      return;
    }
  }
  
  isProcessing.value = true;
  
  // Simulation de traitement
  setTimeout(() => {
    isProcessing.value = false;
    successModalOpen.value = true;
    
    // Sauvegarder la commande dans l'historique
    const historique = JSON.parse(localStorage.getItem('commandes_historique') || '[]');
    commande.value.id = Date.now();
    commande.value.statut = 'payee';
    commande.value.datePaiement = new Date().toISOString();
    commande.value.modePaiement = selectedPayment.value;
    historique.unshift(commande.value);
    localStorage.setItem('commandes_historique', JSON.stringify(historique));
    
    // Ajouter les formations aux formations achetées
    const formationsAchetees = JSON.parse(localStorage.getItem('formations_achetees') || '[]');
    commande.value.items.forEach(item => {
      if (!formationsAchetees.some(f => f.id === item.id)) {
        formationsAchetees.push({ ...item, dateAchat: new Date().toISOString(), progression: 0 });
      }
    });
    localStorage.setItem('formations_achetees', JSON.stringify(formationsAchetees));
    
    // Vider le panier
    localStorage.setItem('cart_items', '[]');
    localStorage.removeItem('commande_en_cours');
  }, 2000);
};

const closeSuccessModal = () => {
  successModalOpen.value = false;
  router.push('/dashboard');
};

const voirMesFormations = () => {
  successModalOpen.value = false;
  router.push('/dashboard?tab=formations');
};

onMounted(() => {
  const savedCommande = localStorage.getItem('commande_en_cours');
  if (savedCommande) {
    commande.value = JSON.parse(savedCommande);
  } else {
    router.push('/e-learning/panier');
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

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-in-right {
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-15px) translateX(-10px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-bounce {
  animation: bounce 0.5s ease-in-out;
}

.delay-700 {
  animation-delay: 0.7s;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #F1F5F9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 10px;
}

/* Responsive */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
<template>
  <div>
    <!-- SECTION HERO avec image -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-20">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=1920&h=400&fit=crop" alt="Contact" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-headset text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Support 24/7</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Contactez notre <span class="text-yellow-300">équipe</span>
        </h1>
        <p class="text-indigo-100 text-lg max-w-2xl mx-auto">
          Une question ? Besoin d'accompagnement ? Notre équipe est là pour vous répondre.
        </p>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <section class="py-20 bg-lightgray">
      <div class="container mx-auto px-5">
        <!-- Carte principale de contact -->
        <div class="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
          <div class="grid md:grid-cols-2">
            <!-- Informations de contact avec icônes animées -->
            <div class="gradient-bg p-8 text-white relative overflow-hidden">
              <div class="absolute top-0 right-0 opacity-10">
                <i class="fas fa-headset text-9xl"></i>
              </div>
              <div class="relative z-10">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <i class="fas fa-comment-dots text-white text-xl"></i>
                  </div>
                  <h2 class="text-2xl font-bold">Parlons de votre réussite</h2>
                </div>
                <p class="mt-4 opacity-90">Notre équipe vous accompagne dans votre préparation. Réponse sous 24h.</p>
                
                <div class="mt-8 space-y-5">
                  <div class="flex items-center gap-3 group cursor-pointer hover:translate-x-2 transition">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition">
                      <i class="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <p class="text-sm opacity-70">Téléphone</p>
                      <p class="font-semibold">+237 6XX XX XX XX</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 group cursor-pointer hover:translate-x-2 transition">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                      <p class="text-sm opacity-70">Email</p>
                      <p class="font-semibold">contact@gradusaura.com</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 group cursor-pointer hover:translate-x-2 transition">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition">
                      <i class="fab fa-whatsapp"></i>
                    </div>
                    <div>
                      <p class="text-sm opacity-70">WhatsApp</p>
                      <p class="font-semibold">+237 6XX XX XX XX</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 group cursor-pointer hover:translate-x-2 transition">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p class="text-sm opacity-70">Adresse</p>
                      <p class="font-semibold">Douala - Douala - Paris</p>
                    </div>
                  </div>
                </div>

                <!-- Horaires d'ouverture -->
                <div class="mt-8 pt-6 border-t border-white/20">
                  <div class="flex items-center gap-2 mb-3">
                    <i class="fas fa-clock"></i>
                    <h3 class="font-semibold">Horaires d'ouverture</h3>
                  </div>
                  <div class="space-y-1 text-sm">
                    <p class="flex justify-between"><span>Lundi - Vendredi:</span><span class="font-semibold">8h00 - 18h00</span></p>
                    <p class="flex justify-between"><span>Samedi:</span><span class="font-semibold">9h00 - 13h00</span></p>
                    <p class="flex justify-between"><span>Dimanche:</span><span class="font-semibold text-yellow-300">Fermé</span></p>
                  </div>
                </div>

                <!-- Réseaux sociaux -->
                <div class="mt-6 pt-4 border-t border-white/20">
                  <p class="text-sm mb-3">Suivez-nous</p>
                  <div class="flex gap-4">
                    <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Formulaire de contact amélioré -->
            <div class="p-8">
              <form @submit.prevent="submitContact" class="space-y-4">
                <div class="relative">
                  <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    v-model="form.name" 
                    required 
                    class="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Nom complet"
                  >
                </div>
                
                <div class="relative">
                  <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="email" 
                    v-model="form.email" 
                    required 
                    class="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Email"
                  >
                </div>
                
                <div class="relative">
                  <i class="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="tel" 
                    v-model="form.phone" 
                    class="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Téléphone"
                  >
                </div>
                
                <div class="relative">
                  <i class="fas fa-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <select 
                    v-model="form.subject" 
                    required 
                    class="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary transition-all appearance-none"
                  >
                    <option value="">Sujet de votre message</option>
                    <option value="Concours / Inscription">Concours / Examens</option>
                    <option value="Formation diplômante">Formation diplômante</option>
                    <option value="Formation qualifiante">Formation qualifiante</option>
                    <option value="Assistance technique">Assistance technique</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Réclamation">Réclamation</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
                
                <div class="relative">
                  <i class="fas fa-comment absolute left-4 top-4 text-gray-400"></i>
                  <textarea 
                    v-model="form.message" 
                    rows="5" 
                    required 
                    class="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Votre message..."
                  ></textarea>
                </div>
                
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="form.copyMe" class="w-5 h-5 text-primary rounded focus:ring-primary">
                  <span class="text-sm text-gray-600"><i class="fas fa-envelope mr-1"></i> M'envoyer une copie de ce message</span>
                </label>
                
                <button 
                  type="submit" 
                  :disabled="isSubmitting"
                  class="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-paper-plane group-hover:translate-x-1 transition"></i>
                  {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <!-- FAQ Section améliorée -->
        <div class="max-w-5xl mx-auto mt-16">
          <div class="text-center mb-10">
            <span class="text-primary font-semibold uppercase tracking-wide">Questions fréquentes</span>
            <h2 class="text-3xl md:text-4xl font-bold mt-2">Foire aux questions</h2>
            <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Trouvez rapidement une réponse à vos questions</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="(faq, index) in faqs" :key="faq.id" class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <i class="fas fa-question-circle text-primary text-xl group-hover:text-white transition-colors duration-300"></i>
                </div>
                <div>
                  <h3 class="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{{ faq.question }}</h3>
                  <p class="text-sm text-gray-600">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Carte interactive améliorée -->
        <div class="max-w-5xl mx-auto mt-16">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div class="gradient-bg p-5 text-white text-center">
              <div class="flex items-center justify-center gap-3">
                <i class="fas fa-map-marked-alt text-2xl"></i>
                <h3 class="text-xl font-bold">Nos bureaux</h3>
              </div>
              <p class="text-indigo-100 text-sm mt-1">Retrouvez-nous dans nos différents campus</p>
            </div>
            <div class="relative h-80 bg-gray-200">
              <img src="https://images.pexels.com/photos/258117/pexels-photo-258117.jpeg?w=800&h=400&fit=crop" alt="Carte" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div class="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-6 mx-4">
                  <i class="fas fa-map-marker-alt text-4xl text-primary mb-2"></i>
                  <p class="font-bold text-gray-800">Douala - Quartier Mvog-Mbi</p>
                  <p class="text-sm text-gray-600">Immeuble Gradus Aura, 2ème étage</p>
                  <div class="flex gap-4 mt-4 justify-center">
                    <span class="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">📞 Accueil</span>
                    <span class="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">🅿️ Parking</span>
                    <span class="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">♿ Accessible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter Section -->
        <div class="max-w-5xl mx-auto mt-16">
          <div class="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-10 text-white text-center shadow-xl">
            <i class="fas fa-envelope-open-text text-5xl mb-4"></i>
            <h3 class="text-2xl font-bold mb-2">Restez informé</h3>
            <p class="text-indigo-100 mb-6">Recevez nos actualités et offres exclusives</p>
            <div class="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Votre email" class="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <button class="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- MODAL DE CONFIRMATION D'ENVOI (amélioré) -->
    <div v-if="confirmationModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeConfirmationModal">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container relative bg-white rounded-2xl shadow-2xl max-w-md w-full text-center">
        <div class="gradient-bg rounded-t-2xl p-6">
          <div class="flex justify-center mb-3">
            <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
              <i class="fas fa-envelope-open-text text-white text-4xl"></i>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-white">Message envoyé !</h2>
        </div>
        <div class="p-6">
          <div class="bg-green-50 rounded-xl p-4 mb-4">
            <i class="fas fa-check-circle text-green-500 text-3xl mb-2"></i>
            <p class="font-bold text-gray-800">Merci {{ form.name }} !</p>
            <p class="text-sm text-gray-600 mt-2">Votre message a bien été envoyé.</p>
            <p class="text-xs text-gray-500 mt-1">Référence : {{ messageReference }}</p>
          </div>
          <div class="text-left bg-gray-50 rounded-xl p-4 mb-4">
            <p class="text-sm font-semibold mb-2">📋 Récapitulatif :</p>
            <p class="text-xs text-gray-600"><strong>Sujet :</strong> {{ form.subject }}</p>
            <p class="text-xs text-gray-600"><strong>Email :</strong> {{ form.email }}</p>
            <p class="text-xs text-gray-600 mt-2 italic">"{{ form.message.substring(0, 100) }}..."</p>
          </div>
          <p class="text-gray-600 text-sm mb-4">
            Un conseiller vous répondra dans les meilleurs délais.<br>
            Un email de confirmation a été envoyé à <strong>{{ form.email }}</strong>
          </p>
          <div class="flex gap-3">
            <button @click="closeConfirmationModal" class="flex-1 gradient-bg text-white py-2 rounded-xl hover:shadow-lg transition">Fermer</button>
            <button @click="newMessage" class="px-4 py-2 border rounded-xl hover:bg-gray-50 transition">Nouveau message</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODAL D'ERREUR -->
    <div v-if="errorModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeErrorModal">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container relative bg-white rounded-2xl shadow-2xl max-w-md w-full text-center">
        <div class="bg-red-500 rounded-t-2xl p-6">
          <div class="flex justify-center mb-3">
            <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-shake">
              <i class="fas fa-exclamation-triangle text-white text-4xl"></i>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-white">Erreur d'envoi</h2>
        </div>
        <div class="p-6">
          <p class="text-gray-600 mb-4">{{ errorMessage }}</p>
          <div class="flex gap-3">
            <button @click="closeErrorModal" class="flex-1 gradient-bg text-white py-2 rounded-xl">Fermer</button>
            <button @click="retrySend" class="px-4 py-2 border rounded-xl hover:bg-gray-50 transition">Réessayer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// État du formulaire
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  copyMe: false
});

const isSubmitting = ref(false);
const confirmationModalOpen = ref(false);
const errorModalOpen = ref(false);
const errorMessage = ref('');
const messageReference = ref('');

// FAQ
const faqs = ref([
  {
    id: 1,
    question: 'Comment puis-je m\'inscrire à un concours ?',
    answer: 'Connectez-vous à votre compte, rendez-vous dans la section "Concours", choisissez le concours qui vous intéresse et cliquez sur "S\'inscrire".'
  },
  {
    id: 2,
    question: 'Quels sont les délais de réponse ?',
    answer: 'Nous nous engageons à vous répondre sous 24h ouvrées. Pour les demandes urgentes, contactez-nous par téléphone.'
  },
  {
    id: 3,
    question: 'Puis-je modifier mon inscription ?',
    answer: 'Oui, contactez notre service client qui se fera un plaisir de vous aider à modifier votre inscription.'
  },
  {
    id: 4,
    question: 'Les formations sont-elles certifiantes ?',
    answer: 'Oui, toutes nos formations diplômantes et qualifiantes délivrent des certificats reconnus.'
  }
]);

// Générer une référence unique
const generateReference = () => {
  return 'MSG-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
};

// Envoi du message
const submitContact = async () => {
  // Validation côté client
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires.';
    errorModalOpen.value = true;
    return;
  }
  
  // Validation email simple
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errorMessage.value = 'Veuillez entrer une adresse email valide.';
    errorModalOpen.value = true;
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Simulation d'appel API (à remplacer par votre backend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Générer une référence unique
    messageReference.value = generateReference();
    
    // Sauvegarder dans localStorage (simulation)
    const messages = JSON.parse(localStorage.getItem('gradus_contact_messages') || '[]');
    const newMessage = {
      ...form.value,
      reference: messageReference.value,
      date: new Date().toISOString(),
      status: 'envoyé'
    };
    messages.push(newMessage);
    localStorage.setItem('gradus_contact_messages', JSON.stringify(messages));
    
    // Afficher la confirmation
    confirmationModalOpen.value = true;
    document.body.style.overflow = 'hidden';
    
  } catch (error) {
    console.error('Erreur d\'envoi:', error);
    errorMessage.value = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
    errorModalOpen.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

// Fermer le modal de confirmation
const closeConfirmationModal = () => {
  confirmationModalOpen.value = false;
  document.body.style.overflow = 'auto';
  resetForm();
};

// Nouveau message (après confirmation)
const newMessage = () => {
  confirmationModalOpen.value = false;
  document.body.style.overflow = 'auto';
  resetForm();
};

// Réinitialiser le formulaire
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    copyMe: false
  };
};

// Fermer le modal d'erreur
const closeErrorModal = () => {
  errorModalOpen.value = false;
};

// Réessayer l'envoi
const retrySend = () => {
  errorModalOpen.value = false;
  submitContact();
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}

.bg-lightgray {
  background-color: #F8FAFC;
}

.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.modal-container {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-bounce {
  animation: bounce 0.5s ease-in-out;
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}

textarea {
  resize: none;
}

input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}
</style>
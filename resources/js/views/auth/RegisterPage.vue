<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 relative flex items-center justify-center">
    <!-- Image de fond -->
    <div class="absolute inset-0 bg-cover bg-center opacity-20" :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }"></div>
    
    <!-- Conteneur principal -->
    <div class="relative z-10 w-full max-w-md px-4">
      <div class="bg-white rounded-2xl shadow-2xl border border-slate-100">
        <div class="p-6">
          <!-- En-tête -->
          <div class="text-center mb-4">
            <div class="w-12 h-12 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-2">
              <i class="fas fa-graduation-cap text-white text-xl"></i>
            </div>
            <h2 class="text-xl font-black text-slate-800 tracking-tighter">Gradus Aura</h2>
            <p class="text-slate-400 text-[10px] mt-1">Créez votre compte</p>
          </div>

          <!-- Indicateur d'étapes -->
          <div class="mb-5">
            <div class="flex items-center justify-between">
              <div v-for="(step, index) in steps" :key="index" class="flex-1 relative">
                <div class="flex flex-col items-center">
                  <div 
                    :class="[
                      'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300',
                      currentStep > index ? 'bg-green-500 text-white' :
                      currentStep === index ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow' :
                      'bg-slate-200 text-slate-500'
                    ]"
                  >
                    <i v-if="currentStep > index" class="fas fa-check text-[8px]"></i>
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                </div>
                <div v-if="index < steps.length - 1" 
                  :class="[
                    'absolute top-3 left-1/2 w-full h-0.5 transition-all duration-300',
                    currentStep > index ? 'bg-green-500' : 'bg-slate-200'
                  ]"
                  style="transform: translateX(-50%);"
                ></div>
              </div>
            </div>
          </div>

          <form @submit.prevent="nextStep" class="space-y-3">
            <!-- Étape 1: Informations personnelles -->
            <div v-show="currentStep === 0" class="space-y-3 animate-fade-in">
              <div class="relative">
                <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                <input 
                  type="text" 
                  v-model="registerForm.fullname" 
                  placeholder="Nom complet" 
                  required
                  class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
              </div>
              
              <div class="relative">
                <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                <input 
                  type="email" 
                  v-model="registerForm.email" 
                  placeholder="Email" 
                  required
                  class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
              </div>
              
              <div class="relative">
                <i class="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                <input 
                  type="tel" 
                  v-model="registerForm.phone" 
                  placeholder="Téléphone (optionnel)"
                  class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
              </div>
            </div>

            <!-- Étape 2: Parcours académique -->
            <div v-show="currentStep === 1" class="space-y-3 animate-fade-in">
              <div class="relative">
                <i class="fas fa-graduation-cap absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                <select 
                  v-model="registerForm.level" 
                  class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition appearance-none"
                >
                  <option value="">Niveau d'étude</option>
                  <option value="BEPC">BEPC</option>
                  <option value="Probatoire">Probatoire</option>
                  <option value="Baccalauréat">Baccalauréat</option>
                  <option value="BTS">BTS</option>
                  <option value="Licence">Licence</option>
                  <option value="Master">Master</option>
                </select>
                <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px]"></i>
              </div>
              
              <div class="relative">
                <i class="fas fa-trophy absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                <select 
                  v-model="registerForm.targetConcours" 
                  class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition appearance-none"
                >
                  <option value="">Concours visé</option>
                  <option value="Administratifs">Concours Administratifs</option>
                  <option value="Grandes Ecoles">Grandes Écoles</option>
                  <option value="Medecine">Médecine</option>
                  <option value="TCF">TCF / TOEFL</option>
                  <option value="BTS">BTS / Licences</option>
                </select>
                <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px]"></i>
              </div>
            </div>

            <!-- Étape 3: Sécurité -->
            <div v-show="currentStep === 2" class="space-y-3 animate-fade-in">
              <div class="relative">
                <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="registerForm.password" 
                  placeholder="Mot de passe (min 8 caractères)" 
                  required
                  class="w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
                <button type="button" @click="showPassword = !showPassword" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-600 transition">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-xs"></i>
                </button>
              </div>
              
              <!-- Indicateurs de force du mot de passe -->
              <div v-if="registerForm.password" class="grid grid-cols-2 gap-1.5 bg-slate-50 p-2 rounded-xl">
                <div class="flex items-center gap-1.5">
                  <i :class="passwordRules.length ? 'fas fa-check-circle text-green-500 text-[8px]' : 'fas fa-circle text-slate-300 text-[8px]'"></i>
                  <span :class="passwordRules.length ? 'text-green-600' : 'text-slate-500'" class="text-[9px]">8+ caractères</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i :class="passwordRules.hasUpperCase ? 'fas fa-check-circle text-green-500 text-[8px]' : 'fas fa-circle text-slate-300 text-[8px]'"></i>
                  <span :class="passwordRules.hasUpperCase ? 'text-green-600' : 'text-slate-500'" class="text-[9px]">Majuscule</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i :class="passwordRules.hasLowerCase ? 'fas fa-check-circle text-green-500 text-[8px]' : 'fas fa-circle text-slate-300 text-[8px]'"></i>
                  <span :class="passwordRules.hasLowerCase ? 'text-green-600' : 'text-slate-500'" class="text-[9px]">Minuscule</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i :class="passwordRules.hasNumber ? 'fas fa-check-circle text-green-500 text-[8px]' : 'fas fa-circle text-slate-300 text-[8px]'"></i>
                  <span :class="passwordRules.hasNumber ? 'text-green-600' : 'text-slate-500'" class="text-[9px]">Chiffre</span>
                </div>
              </div>

              <div class="relative">
                <i class="fas fa-check-circle absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  v-model="registerForm.confirmPassword" 
                  placeholder="Confirmer le mot de passe" 
                  required
                  class="w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
                <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-600 transition">
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-xs"></i>
                </button>
              </div>
              
              <p v-if="registerForm.confirmPassword && registerForm.password !== registerForm.confirmPassword" class="text-red-500 text-[10px] flex items-center gap-1">
                <i class="fas fa-exclamation-circle text-[8px]"></i> Les mots de passe ne correspondent pas
              </p>
            </div>

            <!-- Étape 4: Confirmation -->
            <div v-show="currentStep === 3" class="space-y-3 animate-fade-in">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
                <h3 class="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1.5">
                  <i class="fas fa-clipboard-list text-primary text-[10px]"></i>
                  Récapitulatif
                </h3>
                <div class="space-y-1 text-xs">
                  <div class="flex justify-between">
                    <span class="text-slate-500">Nom :</span>
                    <span class="font-medium text-slate-700 text-[11px]">{{ registerForm.fullname || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Email :</span>
                    <span class="font-medium text-slate-700 text-[11px]">{{ registerForm.email || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Niveau :</span>
                    <span class="font-medium text-slate-700 text-[11px]">{{ registerForm.level || '-' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Concours :</span>
                    <span class="font-medium text-slate-700 text-[11px]">{{ registerForm.targetConcours || '-' }}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="registerForm.terms" id="terms" class="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                <label for="terms" class="text-[10px] text-slate-600">
                  J'accepte les <a href="#" class="text-blue-600 hover:underline">conditions</a>
                </label>
              </div>
            </div>

            <!-- Boutons de navigation -->
            <div class="flex gap-2 pt-2">
              <button 
                v-if="currentStep > 0" 
                type="button"
                @click="previousStep"
                class="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
              >
                <i class="fas fa-arrow-left text-[10px]"></i>
                Retour
              </button>
              
              <button 
                v-if="currentStep < steps.length - 1" 
                type="button"
                @click="nextStep"
                :disabled="!canProceed"
                class="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                Suivant
                <i class="fas fa-arrow-right text-[10px]"></i>
              </button>
              
              <button 
                v-if="currentStep === steps.length - 1" 
                type="button"
                @click="handleRegister"
                :disabled="authLoading || !isRegisterFormValid"
                class="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xs hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <i class="fas fa-check-circle text-[10px]"></i>
                {{ authLoading ? 'Inscription...' : "S'inscrire" }}
              </button>
            </div>
          </form>

          <!-- Message d'erreur -->
          <p v-if="authError" class="text-red-500 text-[10px] text-center mt-3 flex items-center justify-center gap-1">
            <i class="fas fa-exclamation-circle text-[8px]"></i>
            {{ authError }}
          </p>

          <!-- Séparateur -->
          <div class="flex items-center gap-2 my-4">
            <div class="flex-1 h-px bg-slate-200"></div>
            <span class="text-slate-400 text-[9px]">ou</span>
            <div class="flex-1 h-px bg-slate-200"></div>
          </div>

          <!-- Boutons sociaux -->
          <div class="flex gap-2">
            <button class="flex-1 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-1.5 text-[10px]">
              <i class="fab fa-google text-red-500 text-[10px]"></i>
              <span>Google</span>
            </button>
            <button class="flex-1 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-1.5 text-[10px]">
              <i class="fab fa-facebook-f text-blue-600 text-[10px]"></i>
              <span>Facebook</span>
            </button>
          </div>

          <!-- Lien vers connexion -->
          <p class="text-center text-[10px] text-slate-500 mt-4">
            Déjà un compte ? 
            <router-link to="/login" class="text-blue-600 font-semibold hover:underline">Se connecter</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// États
const authLoading = ref(false);
const authError = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const currentStep = ref(0);

// Étapes du formulaire
const steps = [
  { title: 'Info', icon: 'fas fa-user' },
  { title: 'Études', icon: 'fas fa-graduation-cap' },
  { title: 'Sécurité', icon: 'fas fa-lock' },
  { title: 'Confirmer', icon: 'fas fa-check' }
];

// Formulaire d'inscription
const registerForm = ref({
  fullname: '',
  email: '',
  phone: '',
  level: '',
  targetConcours: '',
  password: '',
  confirmPassword: '',
  terms: false
});

// Règles de validation du mot de passe
const passwordRules = computed(() => {
  const password = registerForm.value.password || '';
  return {
    length: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*\-_+=\?]/.test(password)
  };
});

// Validation de l'étape courante
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      return registerForm.value.fullname && registerForm.value.email;
    case 1:
      return true;
    case 2:
      return registerForm.value.password && 
             registerForm.value.confirmPassword && 
             registerForm.value.password === registerForm.value.confirmPassword &&
             Object.values(passwordRules.value).every(rule => rule === true);
    default:
      return true;
  }
});

// Validation finale
const isRegisterFormValid = computed(() => {
  return registerForm.value.fullname &&
         registerForm.value.email &&
         registerForm.value.password &&
         registerForm.value.password === registerForm.value.confirmPassword &&
         Object.values(passwordRules.value).every(rule => rule === true) &&
         registerForm.value.terms;
});

// Navigation
const nextStep = () => {
  if (canProceed.value && currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

// Inscription avec connexion automatique - REDIRECTION VERS LA PAGE D'ACCUEIL
const handleRegister = async () => {
  if (!isRegisterFormValid.value) {
    authError.value = 'Veuillez accepter les conditions d\'utilisation';
    return;
  }

  authLoading.value = true;
  authError.value = '';

  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Création du nouvel utilisateur
    const newUser = {
      id: Date.now(),
      fullname: registerForm.value.fullname,
      email: registerForm.value.email,
      phone: registerForm.value.phone,
      level: registerForm.value.level,
      targetConcours: registerForm.value.targetConcours,
      password: registerForm.value.password,
      role: 'eleve',
      createdAt: new Date().toISOString()
    };
    
    // Vérification si l'email existe déjà
    const existingUsers = JSON.parse(localStorage.getItem('gradus_users') || '[]');
    
    if (existingUsers.some(u => u.email === registerForm.value.email)) {
      throw new Error('Cet email est déjà utilisé');
    }
    
    // Sauvegarde de l'utilisateur
    existingUsers.push(newUser);
    localStorage.setItem('gradus_users', JSON.stringify(existingUsers));
    
    // Création du token de session
    const token = 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Données de session (sans le mot de passe)
    const sessionUser = {
      id: newUser.id,
      fullname: newUser.fullname,
      email: newUser.email,
      role: newUser.role,
      level: newUser.level,
      targetConcours: newUser.targetConcours,
      phone: newUser.phone
    };
    
    // Stockage en localStorage pour persistance
    localStorage.setItem('gradus_token', token);
    localStorage.setItem('gradus_user', JSON.stringify(sessionUser));
    
    // Mise à jour du store Vuex
    await store.dispatch('login', { user: sessionUser, token });
    
    // ✅ REDIRECTION VERS LA PAGE D'ACCUEIL (HOME)
    // Au lieu de '/dashboard', on redirige vers '/' (page d'accueil)
    router.push('/');
    
  } catch (error) {
    authError.value = error.message;
  } finally {
    authLoading.value = false;
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.text-primary {
  color: #4F46E5;
}
</style>
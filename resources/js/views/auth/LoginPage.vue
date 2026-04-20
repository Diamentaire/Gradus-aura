<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Image de fond -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-100 to-gray-200"></div>
    <div class="absolute inset-0 bg-cover bg-center opacity-20" :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }"></div>
    
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-slate-100 relative z-10">
      <div class="text-center mb-8">
        <div 
          class="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 cursor-pointer transition-transform hover:scale-105"
          @click="incrementSecretClick"
          :title="secretClickCount >= 3 ? 'Mode admin débloqué' : 'Cliquez 5 fois pour accès spécial'"
        >
          <i class="fas fa-graduation-cap text-white text-2xl"></i>
        </div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tighter">Gradus Aura</h2>
        <p class="text-slate-500 text-sm mt-2">Connectez-vous à votre espace personnel</p>
        
        <!-- Indicateur mode spécial débloqué -->
        <div v-if="specialModeUnlocked" class="mt-3">
          <span class="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full">
            <i class="fas fa-unlock-alt mr-1"></i> Mode spécial débloqué
          </span>
        </div>
      </div>

      <!-- Formulaire de connexion -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="relative">
          <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            type="email" 
            v-model="loginForm.email" 
            placeholder="Email" 
            required
            class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
        </div>
        
        <div class="relative">
          <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="loginForm.password" 
            placeholder="Mot de passe" 
            required
            class="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
          <button 
            type="button" 
            @click="showPassword = !showPassword" 
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-600 transition">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
          </button>
        </div>
        
        <div class="flex justify-between items-center">
          <label class="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="rememberMe" 
              class="mr-2 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
            <span class="text-xs text-slate-500">Se souvenir de moi</span>
          </label>
          <a 
            href="#" 
            class="text-xs text-blue-600 hover:text-blue-700 transition" 
            @click.prevent="openForgotPasswordModal">
            Mot de passe oublié ?
          </a>
        </div>
        
        <button 
          type="submit" 
          :disabled="authLoading" 
          class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2">
          <i class="fas fa-arrow-right text-sm"></i>
          {{ authLoading ? 'Chargement...' : 'Se connecter' }}
        </button>
      </form>

      <p v-if="authError" class="text-red-500 text-sm text-center mt-4 flex items-center justify-center gap-2">
        <i class="fas fa-exclamation-circle"></i>
        {{ authError }}
      </p>

      <div class="flex items-center gap-3 my-6">
        <div class="flex-1 h-px bg-slate-200"></div>
        <span class="text-slate-400 text-xs">ou</span>
        <div class="flex-1 h-px bg-slate-200"></div>
      </div>

      <div class="flex gap-3">
        <button 
          type="button"
          class="flex-1 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
          <i class="fab fa-google text-red-500"></i>
          <span class="text-sm">Google</span>
        </button>
        <button 
          type="button"
          class="flex-1 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
          <i class="fab fa-facebook-f text-blue-600"></i>
          <span class="text-sm">Facebook</span>
        </button>
      </div>

      <p class="text-center text-sm text-slate-500 mt-6">
        Pas encore de compte ? 
        <router-link to="/register" class="text-blue-600 font-semibold hover:underline">Créer un compte</router-link>
      </p>
    </div>

    <!-- Modal spécial (apparaît après 5 clics sur le logo) - RESTE SUR LE LOGIN -->
    <div v-if="specialModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="closeSpecialModal">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-fade-in-up">
        <div class="text-center mb-4">
          <div class="w-12 h-12 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
            <i class="fas fa-user-shield text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-800">Accès spécial</h3>
          <p class="text-slate-500 text-sm mt-1">Choisissez un rôle pour pré-remplir les champs</p>
          <p class="text-slate-400 text-xs mt-1">Vous pourrez modifier les informations avant de vous connecter</p>
        </div>
        
        <div class="space-y-3">
          <button 
            @click="fillFormWithRole('formateur')"
            class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold hover:shadow-lg transition flex items-center justify-center gap-2">
            <i class="fas fa-chalkboard-user"></i>
            Formulaire Formateur
          </button>
          <button 
            @click="fillFormWithRole('admin')"
            class="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-lg transition flex items-center justify-center gap-2">
            <i class="fas fa-user-shield"></i>
            Formulaire Admin
          </button>
          <button 
            @click="fillFormWithRole('superadmin')"
            class="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold hover:shadow-lg transition flex items-center justify-center gap-2">
            <i class="fas fa-crown"></i>
            Formulaire Super Admin
          </button>
        </div>
        
        <div class="mt-4 pt-3 border-t">
          <p class="text-xs text-slate-400 text-center">Les champs seront pré-remplis, vous pouvez les modifier</p>
        </div>
      </div>
    </div>

    <!-- Modal Mot de passe oublié -->
    <div v-if="forgotModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="closeForgotModal">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-fade-in-up">
        <div class="text-center mb-4">
          <div class="w-12 h-12 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
            <i class="fas fa-key text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-800">Mot de passe oublié</h3>
          <p class="text-slate-500 text-sm mt-1">Entrez votre email pour recevoir un lien de réinitialisation</p>
        </div>
        <div class="relative mb-4">
          <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            type="email" 
            v-model="resetEmail" 
            placeholder="Email" 
            class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
        </div>
        <div class="flex gap-3">
          <button 
            @click="sendResetLink" 
            class="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-lg transition">
            Envoyer
          </button>
          <button 
            @click="closeForgotModal" 
            class="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// États
const authLoading = ref(false);
const authError = ref('');
const showPassword = ref(false);
const forgotModalOpen = ref(false);
const specialModalOpen = ref(false);
const resetEmail = ref('');
const rememberMe = ref(false);
const specialModeUnlocked = ref(false);

// Formulaire de connexion
const loginForm = ref({
  email: '',
  password: ''
});

// Comptes spéciaux (pour pré-remplissage uniquement)
const specialAccounts = {
  formateur: {
    email: 'formateur@gradusaura.com',
    password: 'Formateur-237',
    role: 'formateur',
    fullname: 'Formateur Gradus'
  },
  admin: {
    email: 'admin@gradusaura.com',
    password: 'Admin-237',
    role: 'admin',
    fullname: 'Admin Gradus'
  },
  superadmin: {
    email: 'superadmin@gradusaura.com',
    password: 'Super-237',
    role: 'superadmin',
    fullname: 'Super Admin Gradus'
  }
};

// Initialiser les comptes par défaut dans le localStorage
const initDefaultAccounts = () => {
  let registeredUsers = JSON.parse(localStorage.getItem('gradus_registered_users') || '[]');
  let modified = false;
  
  // Ajouter les comptes spéciaux s'ils n'existent pas
  for (const [key, account] of Object.entries(specialAccounts)) {
    const exists = registeredUsers.some(u => u.email === account.email);
    if (!exists) {
      registeredUsers.push({
        id: Date.now() + Math.random(),
        fullname: account.fullname,
        email: account.email,
        password: account.password,
        role: account.role,
        createdAt: new Date().toLocaleString()
      });
      modified = true;
    }
  }
  
  // Ajouter un compte élève de démonstration s'il n'existe pas
  const studentExists = registeredUsers.some(u => u.email === 'eleve@gradusaura.com');
  if (!studentExists) {
    registeredUsers.push({
      id: Date.now() + Math.random(),
      fullname: 'Élève Démo',
      email: 'eleve@gradusaura.com',
      password: 'Eleve-123',
      role: 'eleve',
      createdAt: new Date().toLocaleString()
    });
    modified = true;
  }
  
  if (modified) {
    localStorage.setItem('gradus_registered_users', JSON.stringify(registeredUsers));
    console.log('✅ Comptes par défaut initialisés');
  }
};

// Compteur pour débloquer l'accès spécial (5 clics sur le logo)
const secretClickCount = ref(0);
let secretClickTimer = null;

const incrementSecretClick = () => {
  secretClickCount.value++;
  
  if (secretClickTimer) clearTimeout(secretClickTimer);
  
  secretClickTimer = setTimeout(() => {
    if (secretClickCount.value >= 5) {
      specialModalOpen.value = true;
      specialModeUnlocked.value = true;
      console.log('🔓 Mode spécial débloqué');
    }
    secretClickCount.value = 0;
  }, 1000);
};

// Remplir le formulaire avec le rôle sélectionné (sans se connecter automatiquement)
const fillFormWithRole = (role) => {
  const account = specialAccounts[role];
  if (account) {
    loginForm.value.email = account.email;
    loginForm.value.password = account.password;
    specialModalOpen.value = false;
    // Focus sur le formulaire
    console.log(`📝 Formulaire pré-rempli pour ${role}`);
  }
};

const closeSpecialModal = () => {
  specialModalOpen.value = false;
};

// Connexion normale (vérifie dans le localStorage)
const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    authError.value = 'Veuillez remplir tous les champs';
    return;
  }

  authLoading.value = true;
  authError.value = '';

  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Récupérer les utilisateurs inscrits
    let registeredUsers = JSON.parse(localStorage.getItem('gradus_registered_users') || '[]');
    
    // Si aucun utilisateur, initialiser les comptes par défaut
    if (registeredUsers.length === 0) {
      initDefaultAccounts();
      registeredUsers = JSON.parse(localStorage.getItem('gradus_registered_users') || '[]');
    }
    
    // Chercher l'utilisateur
    const user = registeredUsers.find(u => u.email === loginForm.value.email);
    
    if (user && user.password === loginForm.value.password) {
      // Connexion réussie
      const token = 'user_token_' + Date.now();
      const userData = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role || 'eleve'
      };
      
      localStorage.setItem('gradus_token', token);
      localStorage.setItem('gradus_user', JSON.stringify(userData));
      
      if (rememberMe.value) {
        localStorage.setItem('remember_email', loginForm.value.email);
      } else {
        localStorage.removeItem('remember_email');
      }
      
      await store.dispatch('login', { user: userData, token });
      
      // Redirection selon le rôle
      if (userData.role === 'formateur') {
        router.push('/formateur');
      } else if (userData.role === 'admin' || userData.role === 'superadmin') {
        router.push('/superadmin');
      } else {
        router.push('/dashboard');
      }
    } else {
      authError.value = 'Email ou mot de passe incorrect';
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    authError.value = 'Erreur de connexion';
  } finally {
    authLoading.value = false;
  }
};

// Mot de passe oublié
const openForgotPasswordModal = () => {
  forgotModalOpen.value = true;
};

const closeForgotModal = () => {
  forgotModalOpen.value = false;
  resetEmail.value = '';
};

const sendResetLink = () => {
  if (!resetEmail.value) {
    alert('Veuillez entrer votre email');
    return;
  }
  
  const registeredUsers = JSON.parse(localStorage.getItem('gradus_registered_users') || '[]');
  const userExists = registeredUsers.some(u => u.email === resetEmail.value);
  
  if (userExists) {
    alert(`Un lien de réinitialisation a été envoyé à ${resetEmail.value}`);
  } else {
    alert(`Aucun compte trouvé avec l'email ${resetEmail.value}`);
  }
  
  closeForgotModal();
};

// Restaurer l'email si "Se souvenir de moi" était coché
onMounted(() => {
  initDefaultAccounts();
  
  const savedEmail = localStorage.getItem('remember_email');
  if (savedEmail) {
    loginForm.value.email = savedEmail;
    rememberMe.value = true;
  }
  
  console.log('📋 Comptes disponibles dans le système :');
  const users = JSON.parse(localStorage.getItem('gradus_registered_users') || '[]');
  users.forEach(u => {
    console.log(`- ${u.role}: ${u.email}`);
  });
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

/* Style pour le logo */
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cursor-pointer:hover {
  transform: scale(1.05);
}
</style>
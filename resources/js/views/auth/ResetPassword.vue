<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900 py-12 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
          <i class="fas fa-lock text-white text-2xl"></i>
        </div>
        <h2 class="text-3xl font-bold text-white">Nouveau mot de passe</h2>
        <p class="text-indigo-200 mt-2">Choisissez un mot de passe sécurisé</p>
      </div>

      <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
        <div class="space-y-6">
          <div class="relative">
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"></i>
            <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Nouveau mot de passe" class="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition">
            <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          
          <div class="relative">
            <i class="fas fa-check-circle absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"></i>
            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirmer le mot de passe" class="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition">
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white">
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          
          <div v-if="password" class="space-y-2">
            <div class="flex items-center gap-2 text-xs" :class="passwordRules.length ? 'text-green-400' : 'text-white/50'">
              <i :class="passwordRules.length ? 'fas fa-check-circle' : 'far fa-circle'"></i>
              <span>Au moins 8 caractères</span>
            </div>
            <div class="flex items-center gap-2 text-xs" :class="passwordRules.hasUpperCase ? 'text-green-400' : 'text-white/50'">
              <i :class="passwordRules.hasUpperCase ? 'fas fa-check-circle' : 'far fa-circle'"></i>
              <span>Au moins une lettre majuscule</span>
            </div>
            <div class="flex items-center gap-2 text-xs" :class="passwordRules.hasNumber ? 'text-green-400' : 'text-white/50'">
              <i :class="passwordRules.hasNumber ? 'fas fa-check-circle' : 'far fa-circle'"></i>
              <span>Au moins un chiffre</span>
            </div>
          </div>
          
          <button @click="resetPassword" :disabled="loading || !isFormValid" class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2">
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-save"></i>
            {{ loading ? 'Chargement...' : 'Réinitialiser le mot de passe' }}
          </button>
          
          <div class="text-center">
            <router-link to="/login" class="text-indigo-300 hover:text-white text-sm transition flex items-center justify-center gap-2">
              <i class="fas fa-arrow-left"></i> Retour à la connexion
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordRules = computed(() => ({
  length: password.value.length >= 8,
  hasUpperCase: /[A-Z]/.test(password.value),
  hasNumber: /[0-9]/.test(password.value)
}));

const isFormValid = computed(() => {
  return passwordRules.value.length && passwordRules.value.hasUpperCase && passwordRules.value.hasNumber && password.value === confirmPassword.value;
});

const resetPassword = () => {
  if (!isFormValid.value) return;
  
  loading.value = true;
  
  setTimeout(() => {
    loading.value = false;
    alert('Votre mot de passe a été réinitialisé avec succès !');
    router.push('/login');
  }, 1500);
};
</script>
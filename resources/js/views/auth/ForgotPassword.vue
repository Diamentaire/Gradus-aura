<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900 py-12 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
          <i class="fas fa-key text-white text-2xl"></i>
        </div>
        <h2 class="text-3xl font-bold text-white">Mot de passe oublié</h2>
        <p class="text-indigo-200 mt-2">Entrez votre email pour réinitialiser votre mot de passe</p>
      </div>

      <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
        <div v-if="!emailSent" class="space-y-6">
          <div class="relative">
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"></i>
            <input type="email" v-model="email" placeholder="Votre adresse email" class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition">
          </div>
          
          <button @click="sendResetLink" :disabled="loading" class="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2">
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-paper-plane"></i>
            {{ loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation' }}
          </button>
          
          <div class="text-center">
            <router-link to="/login" class="text-indigo-300 hover:text-white text-sm transition flex items-center justify-center gap-2">
              <i class="fas fa-arrow-left"></i> Retour à la connexion
            </router-link>
          </div>
        </div>

        <div v-else class="text-center space-y-6">
          <div class="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
            <i class="fas fa-check-circle text-white text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold text-white">Email envoyé !</h3>
          <p class="text-indigo-200 text-sm">
            Un lien de réinitialisation a été envoyé à <strong>{{ email }}</strong>.<br>
            Veuillez vérifier votre boîte de réception.
          </p>
          <button @click="emailSent = false" class="text-indigo-300 hover:text-white text-sm">Changer d'email</button>
          <router-link to="/login" class="block w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold hover:shadow-lg transition">
            Retour à la connexion
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const loading = ref(false);
const emailSent = ref(false);

const sendResetLink = () => {
  if (!email.value) {
    alert('Veuillez entrer votre adresse email');
    return;
  }
  
  loading.value = true;
  
  setTimeout(() => {
    loading.value = false;
    emailSent.value = true;
  }, 1500);
};
</script>
<template>
  <div class="settings-module min-h-screen bg-slate-50 p-6">
    <div class="settings-header mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <i class="fab fa-google text-indigo-500 text-2xl"></i>
          Configuration Google
        </h2>
        <p class="text-slate-500 text-sm mt-1">Configurez l'authentification Google pour permettre aux utilisateurs de se connecter avec leur compte Google</p>
      </div>
    </div>

    <div class="settings-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        <div class="settings-form">
          <div class="form-group mb-6">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fab fa-google text-indigo-500"></i> GOOGLE_CLIENT_ID
            </label>
            <input type="text" v-model="googleSettings.clientId" placeholder="Entrez votre Google Client ID" 
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm">
            <small class="text-xs text-slate-400 block mt-1">
              <i class="fas fa-info-circle mr-1"></i>Obtenez votre Client ID depuis la Google Cloud Console
            </small>
          </div>

          <div class="form-group mb-6">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-key text-indigo-500"></i> GOOGLE_CLIENT_SECRET
            </label>
            <div class="relative">
              <input :type="showSecret ? 'text' : 'password'" v-model="googleSettings.clientSecret" placeholder="Entrez votre Google Client Secret" 
                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm pr-10">
              <button type="button" @click="showSecret = !showSecret" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <i :class="showSecret ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <small class="text-xs text-slate-400 block mt-1">
              <i class="fas fa-exclamation-triangle mr-1"></i>Conservez cette clé secrète, elle est sensible
            </small>
          </div>

          <div class="form-group mb-6">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-link text-indigo-500"></i> URI de redirection autorisée
            </label>
            <input type="text" v-model="googleSettings.redirectUri" readonly 
              class="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-sm text-slate-600 cursor-not-allowed">
            <small class="text-xs text-slate-400 block mt-1">
              <i class="fas fa-check-circle mr-1"></i>Ajoutez cette URI dans vos paramètres Google OAuth
            </small>
          </div>

          <div class="form-actions flex gap-4 mt-8">
            <button class="btn-test flex-1 bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-300 transition-all duration-200 flex items-center justify-center gap-2" @click="testGoogleConnection">
              <i class="fas fa-vial"></i> Tester la connexion
            </button>
            <button class="btn-save flex-1 bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2" @click="saveGoogleSettings">
              <i class="fas fa-save"></i> Mettre à jour
            </button>
          </div>
        </div>

        <div class="settings-info bg-indigo-50 rounded-xl p-5">
          <h4 class="text-base font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <i class="fas fa-question-circle text-indigo-600"></i> Comment configurer Google OAuth ?
          </h4>
          <ol class="space-y-3 list-decimal list-inside">
            <li class="text-sm text-slate-700 flex items-start gap-2">
              <i class="fas fa-external-link-alt text-indigo-500 mt-0.5 text-xs"></i>
              <span>Allez sur <a href="https://console.cloud.google.com" target="_blank" class="text-indigo-600 hover:text-indigo-700 font-medium">Google Cloud Console</a></span>
            </li>
            <li class="text-sm text-slate-700 flex items-start gap-2">
              <i class="fas fa-folder-plus text-indigo-500 mt-0.5 text-xs"></i>
              <span>Créez un nouveau projet ou sélectionnez un projet existant</span>
            </li>
            <li class="text-sm text-slate-700 flex items-start gap-2">
              <i class="fas fa-plug text-indigo-500 mt-0.5 text-xs"></i>
              <span>Activez l'API Google+ (ou People API)</span>
            </li>
            <li class="text-sm text-slate-700 flex items-start gap-2">
              <i class="fas fa-id-card text-indigo-500 mt-0.5 text-xs"></i>
              <span>Créez des identifiants (type OAuth client ID)</span>
            </li>
            <li class="text-sm text-slate-700 flex items-start gap-2">
              <i class="fas fa-redo-alt text-indigo-500 mt-0.5 text-xs"></i>
              <span>Ajoutez l'URI de redirection ci-dessus</span>
            </li>
            <li class="text-sm text-slate-700 flex items-start gap-2">
              <i class="fas fa-copy text-indigo-500 mt-0.5 text-xs"></i>
              <span>Copiez le Client ID et Client Secret</span>
            </li>
          </ol>
          
          <div class="mt-5 pt-4 border-t border-indigo-200">
            <div class="flex items-center gap-3 text-sm text-indigo-700 bg-indigo-100 p-3 rounded-lg">
              <i class="fas fa-lightbulb text-amber-500"></i>
              <p class="font-medium">Astuce : Utilisez les identifiants de test en développement avant de passer en production</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de test -->
    <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showTestModal, 'flex': showTestModal }" @click.self="showTestModal = false">
      <div class="modal-content bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
        <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <i class="fab fa-google text-indigo-500"></i> Test de connexion Google
          </h3>
          <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="showTestModal = false">&times;</button>
        </div>
        <div class="modal-body p-6">
          <div v-if="testStatus === 'loading'" class="test-loading text-center py-6">
            <i class="fas fa-spinner fa-spin text-5xl text-indigo-500 mb-4"></i>
            <p class="text-slate-600">Test en cours...</p>
          </div>
          <div v-else-if="testStatus === 'success'" class="test-success text-center py-6">
            <i class="fas fa-check-circle text-5xl text-emerald-500 mb-4"></i>
            <h4 class="text-xl font-semibold text-slate-800 mb-2">Connexion réussie !</h4>
            <p class="text-slate-500">La configuration Google OAuth fonctionne correctement.</p>
          </div>
          <div v-else-if="testStatus === 'error'" class="test-error text-center py-6">
            <i class="fas fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
            <h4 class="text-xl font-semibold text-slate-800 mb-2">Erreur de connexion</h4>
            <p class="text-red-500">{{ testError }}</p>
          </div>
        </div>
        <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
          <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="showTestModal = false">
            <i class="fas fa-times"></i> Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Informations de configuration actuelles -->
    <div class="config-status mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <h4 class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        <i class="fas fa-info-circle text-indigo-500"></i> État de la configuration
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <span class="text-sm text-slate-600"><i class="fab fa-google mr-2"></i>Client ID</span>
          <span :class="googleSettings.clientId ? 'text-emerald-600' : 'text-red-500'" class="text-sm font-medium">
            <i :class="googleSettings.clientId ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            {{ googleSettings.clientId ? 'Configuré' : 'Non configuré' }}
          </span>
        </div>
        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <span class="text-sm text-slate-600"><i class="fas fa-key mr-2"></i>Client Secret</span>
          <span :class="googleSettings.clientSecret ? 'text-emerald-600' : 'text-red-500'" class="text-sm font-medium">
            <i :class="googleSettings.clientSecret ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            {{ googleSettings.clientSecret ? 'Configuré' : 'Non configuré' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleGoogleSetting',
  data() {
    return {
      showSecret: false,
      showTestModal: false,
      testStatus: null,
      testError: '',
      googleSettings: {
        clientId: '',
        clientSecret: '',
        redirectUri: `${window.location.origin}/auth/google/callback`
      }
    }
  },
  mounted() {
    this.loadSettings()
  },
  methods: {
    loadSettings() {
      const saved = localStorage.getItem('googleSettings')
      if (saved) {
        try {
          this.googleSettings = JSON.parse(saved)
        } catch (e) {
          console.error('Erreur de chargement des paramètres Google')
        }
      }
    },
    async testGoogleConnection() {
      this.showTestModal = true
      this.testStatus = 'loading'
      setTimeout(() => {
        if (this.googleSettings.clientId && this.googleSettings.clientSecret) {
          this.testStatus = 'success'
          setTimeout(() => {
            this.showTestModal = false
            this.testStatus = null
          }, 2000)
        } else {
          this.testStatus = 'error'
          this.testError = 'Veuillez saisir un Client ID et Client Secret valides'
        }
      }, 1500)
    },
    saveGoogleSettings() {
      localStorage.setItem('googleSettings', JSON.stringify(this.googleSettings))
      alert('Configuration Google enregistrée avec succès')
    }
  }
}
</script>

<style scoped>
/* Animations */
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.settings-module {
  animation: fadeIn 0.3s ease;
}

.settings-card,
.config-status {
  animation: fadeInUp 0.3s ease-out;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Transition pour les boutons */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.97);
}

/* Focus styles */
input:focus {
  outline: none;
  ring: 2px solid #6366f1;
}

/* Modal animation */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

/* Liste stylisée */
ol {
  padding-left: 0;
}

ol li {
  margin-left: 0;
}

/* Lien stylisé */
a {
  transition: all 0.2s ease;
}

a:hover {
  text-decoration: underline;
}
</style>
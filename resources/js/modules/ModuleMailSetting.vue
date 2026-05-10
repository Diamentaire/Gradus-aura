<template>
  <div class="settings-module min-h-screen bg-slate-50 p-6">
    <div class="settings-header mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <i class="fas fa-envelope text-indigo-500 text-2xl"></i>
          Configuration SMTP (Mail)
        </h2>
        <p class="text-slate-500 text-sm mt-1">Configurez les paramètres d'envoi d'emails pour votre plateforme</p>
      </div>
    </div>

    <div class="settings-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        <div class="settings-form">
          <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <i class="fas fa-server text-indigo-500"></i> Mail Mailer
              </label>
              <select v-model="mailSettings.mailer" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="smtp">SMTP</option>
                <option value="sendmail">Sendmail</option>
                <option value="mail">Mail</option>
              </select>
            </div>
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <i class="fas fa-globe text-indigo-500"></i> Mail Host
              </label>
              <input type="text" v-model="mailSettings.host" placeholder="sandbox.smtp.mailtrap.io" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>
          </div>

          <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <i class="fas fa-plug text-indigo-500"></i> MAIL PORT
              </label>
              <input type="number" v-model="mailSettings.port" placeholder="587" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <i class="fas fa-shield-alt text-indigo-500"></i> MAIL ENCRYPTION
              </label>
              <select v-model="mailSettings.encryption" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="null">Aucun</option>
              </select>
            </div>
          </div>

          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-user text-indigo-500"></i> MAIL USERNAME
            </label>
            <input type="text" v-model="mailSettings.username" placeholder="votre_nom_utilisateur" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          </div>

          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-key text-indigo-500"></i> MAIL PASSWORD
            </label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" v-model="mailSettings.password" placeholder="••••••••" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10">
              <button type="button" class="toggle-password absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-envelope text-indigo-500"></i> MAIL FROM ADDRESS
            </label>
            <input type="email" v-model="mailSettings.fromAddress" placeholder="info@lms.com" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          </div>

          <div class="form-group mb-6">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-signature text-indigo-500"></i> MAIL FROM NAME
            </label>
            <input type="text" v-model="mailSettings.fromName" placeholder="Udemy Clone" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          </div>

          <div class="form-actions flex gap-4">
            <button class="btn-test flex-1 bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-300 transition-all duration-200 flex items-center justify-center gap-2" @click="testMailConnection">
              <i class="fas fa-paper-plane"></i> Tester l'envoi
            </button>
            <button class="btn-save flex-1 bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2" @click="saveMailSettings">
              <i class="fas fa-save"></i> Mettre à jour
            </button>
          </div>
        </div>

        <div class="settings-info bg-indigo-50 rounded-xl p-5">
          <h4 class="text-base font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <i class="fas fa-info-circle text-indigo-600"></i> Configuration recommandée
          </h4>
          
          <div class="mb-5">
            <p class="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-flask text-indigo-500"></i> Pour les tests, utilisez Mailtrap :
            </p>
            <ul class="space-y-2 list-disc list-inside text-sm text-slate-600">
              <li><i class="fas fa-server text-indigo-400 mr-2 w-4"></i>Hôte: sandbox.smtp.mailtrap.io</li>
              <li><i class="fas fa-plug text-indigo-400 mr-2 w-4"></i>Port: 2525 ou 587</li>
              <li><i class="fas fa-shield-alt text-indigo-400 mr-2 w-4"></i>Encryption: TLS</li>
            </ul>
          </div>

          <div>
            <p class="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-rocket text-indigo-500"></i> Pour la production
            </p>
            <ul class="space-y-2 text-sm text-slate-600">
              <li class="flex items-start gap-2"><i class="fas fa-check-circle text-indigo-400 mt-0.5"></i><span><strong>SendGrid</strong> - smtp.sendgrid.net (587)</span></li>
              <li class="flex items-start gap-2"><i class="fas fa-check-circle text-indigo-400 mt-0.5"></i><span><strong>Mailgun</strong> - smtp.mailgun.org (587)</span></li>
              <li class="flex items-start gap-2"><i class="fas fa-check-circle text-indigo-400 mt-0.5"></i><span><strong>Amazon SES</strong> - email-smtp.region.amazonaws.com</span></li>
              <li class="flex items-start gap-2"><i class="fas fa-check-circle text-indigo-400 mt-0.5"></i><span><strong>Brevo (Sendinblue)</strong> - smtp-relay.brevo.com (587)</span></li>
            </ul>
          </div>

          <div class="mt-5 pt-4 border-t border-indigo-200">
            <div class="flex items-center gap-3 text-sm text-indigo-700 bg-indigo-100 p-3 rounded-lg">
              <i class="fas fa-lightbulb text-amber-500"></i>
              <p class="font-medium">Astuce : Testez d'abord avec Mailtrap avant de passer en production</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de test d'envoi -->
    <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showTestModal, 'flex': showTestModal }" @click.self="showTestModal = false">
      <div class="modal-content bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
        <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <i class="fas fa-paper-plane text-indigo-500"></i> Tester l'envoi d'email
          </h3>
          <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="showTestModal = false">&times;</button>
        </div>
        <div class="modal-body p-6">
          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-envelope text-indigo-500"></i> Email de test
            </label>
            <input type="email" v-model="testEmail" placeholder="destinataire@example.com" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          </div>
          <div v-if="mailTestStatus" class="test-result">
            <div v-if="mailTestStatus === 'sending'" class="test-loading text-center py-4">
              <i class="fas fa-spinner fa-spin text-3xl text-indigo-500 mb-2 block"></i>
              <p class="text-slate-600">Envoi en cours...</p>
            </div>
            <div v-else-if="mailTestStatus === 'success'" class="test-success text-center py-4 bg-emerald-50 rounded-lg">
              <i class="fas fa-check-circle text-4xl text-emerald-500 mb-2 block"></i>
              <p class="text-emerald-700 font-medium">Email envoyé avec succès !</p>
            </div>
            <div v-else-if="mailTestStatus === 'error'" class="test-error text-center py-4 bg-red-50 rounded-lg">
              <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-2 block"></i>
              <p class="text-red-600">{{ testError }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
          <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="showTestModal = false">
            <i class="fas fa-times"></i> Annuler
          </button>
          <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="sendTestEmail">
            <i class="fas fa-paper-plane"></i> Envoyer le test
          </button>
        </div>
      </div>
    </div>

    <!-- État de la configuration actuelle -->
    <div class="config-status mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <h4 class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        <i class="fas fa-info-circle text-indigo-500"></i> État de la configuration
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <span class="text-sm text-slate-600"><i class="fas fa-server mr-2"></i>Serveur SMTP</span>
          <span :class="mailSettings.host && mailSettings.port ? 'text-emerald-600' : 'text-red-500'" class="text-sm font-medium">
            <i :class="mailSettings.host && mailSettings.port ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            {{ mailSettings.host && mailSettings.port ? 'Configuré' : 'Non configuré' }}
          </span>
        </div>
        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <span class="text-sm text-slate-600"><i class="fas fa-user mr-2"></i>Authentification</span>
          <span :class="mailSettings.username && mailSettings.password ? 'text-emerald-600' : 'text-red-500'" class="text-sm font-medium">
            <i :class="mailSettings.username && mailSettings.password ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            {{ mailSettings.username && mailSettings.password ? 'Configurée' : 'Non configurée' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleMailSetting',
  data() {
    return {
      showPassword: false,
      showTestModal: false,
      testEmail: '',
      mailTestStatus: null,
      testError: '',
      mailSettings: {
        mailer: 'smtp',
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        encryption: 'tls',
        username: '',
        password: '',
        fromAddress: 'noreply@gradusaura.com',
        fromName: 'Gradus Aura'
      }
    }
  },
  mounted() { 
    this.loadSettings() 
  },
  methods: {
    loadSettings() {
      const saved = localStorage.getItem('mailSettings')
      if (saved) {
        try {
          this.mailSettings = JSON.parse(saved)
        } catch (e) {
          console.error('Erreur de chargement des paramètres email')
        }
      }
    },
    saveMailSettings() {
      localStorage.setItem('mailSettings', JSON.stringify(this.mailSettings))
      alert('Configuration email enregistrée avec succès')
    },
    testMailConnection() {
      this.showTestModal = true
      this.mailTestStatus = null
      this.testEmail = ''
      this.testError = ''
    },
    sendTestEmail() {
      if (!this.testEmail) {
        alert('Veuillez saisir un email de test')
        return
      }
      this.mailTestStatus = 'sending'
      setTimeout(() => {
        if (this.mailSettings.host && this.mailSettings.username && this.mailSettings.password) {
          this.mailTestStatus = 'success'
          setTimeout(() => {
            this.showTestModal = false
            this.mailTestStatus = null
          }, 2000)
        } else {
          this.mailTestStatus = 'error'
          this.testError = 'Configuration SMTP incomplète. Vérifiez vos paramètres.'
        }
      }, 1500)
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
input:focus, select:focus {
  outline: none;
  ring: 2px solid #6366f1;
}

/* Modal animation */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}
</style>
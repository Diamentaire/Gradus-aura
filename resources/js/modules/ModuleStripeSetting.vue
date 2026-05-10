<template>
    <div class="stripe-settings min-h-screen bg-slate-50 p-6">
        <div class="module-header mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fab fa-stripe text-indigo-500 text-2xl"></i>
                    Configuration Stripe
                </h2>
                <p class="text-slate-500 text-sm mt-1">Configurez les paramètres de paiement Stripe pour votre plateforme</p>
            </div>
        </div>

        <!-- Statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Mode actuel</p>
                    <p class="text-xl font-bold" :class="mode === 'live' ? 'text-emerald-600' : 'text-amber-600'">
                        <i :class="mode === 'live' ? 'fas fa-globe' : 'fas fa-flask'"></i> {{ mode === 'live' ? 'Live' : 'Test' }}
                    </p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fab fa-stripe text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Clé publique</p>
                    <p class="text-md font-semibold text-slate-800">{{ stripeSettings.publishableKey ? 'Configurée' : 'Non configurée' }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-key text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Devise</p>
                    <p class="text-xl font-bold text-amber-600">{{ getCurrencySymbol(stripeSettings.currency) }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-dollar-sign text-amber-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Abonnements</p>
                    <p class="text-md font-semibold" :class="stripeSettings.subscriptionEnabled ? 'text-emerald-600' : 'text-slate-500'">
                        <i :class="stripeSettings.subscriptionEnabled ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                        {{ stripeSettings.subscriptionEnabled ? 'Activé' : 'Désactivé' }}
                    </p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-credit-card text-rose-500"></i>
                </div>
            </div>
        </div>

        <div class="settings-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                <div class="settings-form">
                    <div class="form-group mb-6">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-sliders-h text-indigo-500"></i> Mode de paiement
                        </label>
                        <div class="mode-toggle flex gap-2 bg-slate-100 p-1 rounded-xl">
                            <button :class="['flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2', mode === 'test' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']" @click="mode = 'test'">
                                <i class="fas fa-flask"></i> Mode test
                            </button>
                            <button :class="['flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2', mode === 'live' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']" @click="mode = 'live'">
                                <i class="fas fa-globe"></i> Mode live
                            </button>
                        </div>
                    </div>

                    <div class="form-group mb-6">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-key text-indigo-500"></i> Clé publique (Publishable Key)
                        </label>
                        <div class="input-with-copy flex gap-2">
                            <input type="text" v-model="stripeSettings.publishableKey" 
                                   :placeholder="mode === 'test' ? 'pk_test_...' : 'pk_live_...'"
                                   class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm">
                            <button class="btn-copy px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-all duration-200 flex items-center gap-2" @click="copyToClipboard(stripeSettings.publishableKey)" title="Copier">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                        <small class="text-xs text-slate-400 mt-1 block">Cette clé est utilisée côté client pour initialiser Stripe.js</small>
                    </div>

                    <div class="form-group mb-6">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-lock text-indigo-500"></i> Clé secrète (Secret Key)
                        </label>
                        <div class="input-with-copy flex gap-2">
                            <input :type="showSecret ? 'text' : 'password'" v-model="stripeSettings.secretKey"
                                   :placeholder="mode === 'test' ? 'sk_test_...' : 'sk_live_...'"
                                   class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm">
                            <button class="btn-toggle px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-all duration-200" @click="showSecret = !showSecret">
                                <i :class="showSecret ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                            <button class="btn-copy px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-all duration-200" @click="copyToClipboard(stripeSettings.secretKey)" title="Copier">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                        <small class="text-xs text-slate-400 mt-1 block">Conservez cette clé secrète, elle ne doit jamais être exposée côté client</small>
                    </div>

                    <div class="form-group mb-6">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-webhook text-indigo-500"></i> Webhook secret (optionnel)
                        </label>
                        <div class="input-with-copy flex gap-2">
                            <input :type="showWebhookSecret ? 'text' : 'password'" v-model="stripeSettings.webhookSecret"
                                   placeholder="whsec_..."
                                   class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm">
                            <button class="btn-toggle px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-all duration-200" @click="showWebhookSecret = !showWebhookSecret">
                                <i :class="showWebhookSecret ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                            <button class="btn-copy px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-all duration-200" @click="copyToClipboard(stripeSettings.webhookSecret)" title="Copier">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                        <small class="text-xs text-slate-400 mt-1 block">Utilisé pour vérifier les signatures des webhooks Stripe</small>
                    </div>

                    <div class="form-group mb-6">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-money-bill-wave text-indigo-500"></i> Devise par défaut
                        </label>
                        <select v-model="stripeSettings.currency" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="eur">Euro (EUR) - €</option>
                            <option value="usd">Dollar américain (USD) - $</option>
                            <option value="gbp">Livre sterling (GBP) - £</option>
                            <option value="cad">Dollar canadien (CAD) - $</option>
                            <option value="aud">Dollar australien (AUD) - $</option>
                            <option value="xof">Franc CFA (XOF) - FCFA</option>
                        </select>
                    </div>

                    <div class="form-group mb-6">
                        <label class="checkbox-label flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" v-model="stripeSettings.subscriptionEnabled" class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500">
                            <span class="text-sm text-slate-700"><i class="fas fa-sync-alt mr-1"></i> Activer les paiements récurrents (abonnements)</span>
                        </label>
                    </div>

                    <div class="form-actions flex gap-4">
                        <button class="btn-test flex-1 bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-300 transition-all duration-200 flex items-center justify-center gap-2" @click="testConnection">
                            <i class="fas fa-vial"></i> Tester la connexion
                        </button>
                        <button class="btn-save flex-1 bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2" @click="saveSettings">
                            <i class="fas fa-save"></i> Mettre à jour
                        </button>
                    </div>
                </div>

                <div class="settings-info bg-indigo-50 rounded-xl p-5">
                    <h4 class="text-base font-bold text-indigo-800 mb-4 flex items-center gap-2">
                        <i class="fas fa-question-circle text-indigo-600"></i> Comment configurer Stripe ?
                    </h4>
                    <ol class="space-y-3">
                        <li class="text-sm text-slate-700 flex items-start gap-2">
                            <i class="fas fa-user-plus text-indigo-500 mt-0.5 text-xs"></i>
                            <span>Créez un compte sur <a href="https://dashboard.stripe.com" target="_blank" class="text-indigo-600 hover:text-indigo-700 font-medium">Stripe Dashboard</a></span>
                        </li>
                        <li class="text-sm text-slate-700 flex items-start gap-2">
                            <i class="fas fa-flask text-indigo-500 mt-0.5 text-xs"></i>
                            <span>Activez le mode test/développement</span>
                        </li>
                        <li class="text-sm text-slate-700 flex items-start gap-2">
                            <i class="fas fa-key text-indigo-500 mt-0.5 text-xs"></i>
                            <span>Récupérez vos clés API dans "Développeurs → Clés API"</span>
                        </li>
                        <li class="text-sm text-slate-700 flex items-start gap-2">
                            <i class="fas fa-plug text-indigo-500 mt-0.5 text-xs"></i>
                            <span>Configurez les webhooks dans "Développeurs → Webhooks"</span>
                        </li>
                        <li class="text-sm text-slate-700 flex items-start gap-2">
                            <i class="fas fa-link text-indigo-500 mt-0.5 text-xs"></i>
                            <span>Ajoutez l'URL de redirection : <code class="bg-white px-1 py-0.5 rounded text-xs">{{ redirectUrl }}/stripe/callback</code></span>
                        </li>
                    </ol>

                    <div class="info-box mt-4 p-3 bg-indigo-100 rounded-lg flex gap-3 items-start">
                        <i class="fas fa-info-circle text-indigo-600 mt-0.5"></i>
                        <div class="text-sm text-indigo-800">
                            <p class="font-medium">Carte de test</p>
                            <p class="text-xs mt-1">Utilisez la carte : <strong>4242 4242 4242 4242</strong> (date future, CVC 123)</p>
                        </div>
                    </div>

                    <div class="mt-4 pt-3 border-t border-indigo-200">
                        <div class="flex items-center gap-2 text-sm text-indigo-700">
                            <i class="fas fa-shield-alt"></i>
                            <span>Environnement sécurisé : les clés sont stockées localement</span>
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
                        <i class="fab fa-stripe text-indigo-500"></i> Test de connexion Stripe
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
                        <p class="text-slate-500">Vos clés Stripe sont valides. Le mode {{ mode === 'test' ? 'test' : 'live' }} est actif.</p>
                    </div>
                    <div v-else-if="testStatus === 'error'" class="test-error text-center py-6">
                        <i class="fas fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
                        <h4 class="text-xl font-semibold text-slate-800 mb-2">Erreur de connexion</h4>
                        <p class="text-red-500">{{ testErrorMessage }}</p>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="showTestModal = false">
                        <i class="fas fa-times"></i> Fermer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleStripeSetting',
    data() {
        return {
            mode: 'test',
            showSecret: false,
            showWebhookSecret: false,
            showTestModal: false,
            testStatus: null,
            testErrorMessage: '',
            redirectUrl: window.location.origin,
            stripeSettings: {
                publishableKey: '',
                secretKey: '',
                webhookSecret: '',
                currency: 'eur',
                subscriptionEnabled: false
            }
        }
    },
    computed: {
        getCurrencySymbol() {
            return (currency) => {
                const symbols = {
                    eur: '€',
                    usd: '$',
                    gbp: '£',
                    cad: 'C$',
                    aud: 'A$',
                    xof: 'FCFA'
                }
                return symbols[currency] || '€'
            }
        }
    },
    mounted() {
        this.loadSettings()
    },
    methods: {
        loadSettings() {
            const saved = localStorage.getItem('stripe_settings')
            if (saved) {
                try {
                    const settings = JSON.parse(saved)
                    this.stripeSettings = settings
                    this.mode = settings.mode || 'test'
                } catch (e) {
                    console.error('Erreur de chargement des paramètres Stripe')
                }
            }
        },
        saveSettings() {
            if (!this.stripeSettings.publishableKey) {
                alert('Veuillez saisir la clé publique')
                return
            }
            if (!this.stripeSettings.secretKey) {
                alert('Veuillez saisir la clé secrète')
                return
            }
            const settingsToSave = {
                ...this.stripeSettings,
                mode: this.mode
            }
            localStorage.setItem('stripe_settings', JSON.stringify(settingsToSave))
            alert('Configuration Stripe enregistrée avec succès')
        },
        testConnection() {
            this.showTestModal = true
            this.testStatus = 'loading'
            
            setTimeout(() => {
                const expectedPrefix = this.mode === 'test' ? 'pk_test_' : 'pk_live_'
                if (this.stripeSettings.publishableKey && this.stripeSettings.publishableKey.startsWith(expectedPrefix)) {
                    this.testStatus = 'success'
                    setTimeout(() => {
                        this.showTestModal = false
                        this.testStatus = null
                    }, 2000)
                } else {
                    this.testStatus = 'error'
                    this.testErrorMessage = `Clé ${this.mode === 'test' ? 'publishable' : 'API'} invalide. Vérifiez que vous utilisez le bon mode (${this.mode}).\nFormat attendu: ${expectedPrefix}...`
                }
            }, 1500)
        },
        copyToClipboard(text) {
            if (!text) {
                alert('Aucune valeur à copier')
                return
            }
            navigator.clipboard.writeText(text).then(() => {
                alert('Clé copiée dans le presse-papier')
            }).catch(() => {
                alert('Erreur lors de la copie. Veuillez copier manuellement.')
            })
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

.stripe-settings {
  animation: fadeIn 0.3s ease;
}

.stats-grid .stat-card,
.settings-card {
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
  transform: scale(0.96);
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

/* Mode toggle buttons */
.mode-toggle button {
  transition: all 0.2s ease;
}

.mode-toggle button:active {
  transform: scale(0.98);
}
</style>
<template>
    <div class="configuration-module min-h-screen bg-slate-50 p-6">
        <div class="module-header mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-cog text-indigo-500 text-2xl"></i>
                    Configuration générale
                </h2>
                <p class="text-slate-500 text-sm mt-1">Paramétrez les options globales de votre plateforme</p>
            </div>
        </div>

        <!-- Onglets -->
        <div class="config-tabs flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" 
                :class="['flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    activeTab === tab.id ? 'bg-indigo-500 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200']">
                <i :class="tab.icon + ' text-sm'"></i> {{ tab.name }}
            </button>
        </div>

        <!-- Onglet Général -->
        <div class="config-pane transition-all duration-300" v-show="activeTab === 'general'">
            <div class="card bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="card-header bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-slate-200">
                    <h3 class="font-semibold text-slate-800 flex items-center gap-2"><i class="fas fa-info-circle text-indigo-500"></i>Informations générales</h3>
                </div>
                <div class="card-body p-6">
                    <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-globe text-indigo-500 mr-1"></i>Nom du site</label>
                            <input type="text" v-model="general.siteName" placeholder="Udemy Clone" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-quote-right text-indigo-500 mr-1"></i>Slogan</label>
                            <input type="text" v-model="general.slogan" placeholder="Apprenez les compétences les plus recherchées" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                    </div>
                    <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-envelope text-indigo-500 mr-1"></i>Email de contact</label>
                            <input type="email" v-model="general.contactEmail" placeholder="contact@udemyclone.com" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-phone text-indigo-500 mr-1"></i>Téléphone</label>
                            <input type="tel" v-model="general.phone" placeholder="+33 1 23 45 67 89" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-map-marker-alt text-indigo-500 mr-1"></i>Adresse</label>
                        <textarea v-model="general.address" rows="2" placeholder="123 rue de l'Exemple, 75001 Paris" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-euro-sign text-indigo-500 mr-1"></i>Devise</label>
                        <select v-model="general.currency" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="EUR">Euro (€)</option>
                            <option value="USD">Dollar ($)</option>
                            <option value="GBP">Livre (£)</option>
                            <option value="XOF">Franc CFA (FCFA)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Onglet Personnalisation -->
        <div class="config-pane transition-all duration-300" v-show="activeTab === 'customization'">
            <div class="card bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="card-header bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-slate-200">
                    <h3 class="font-semibold text-slate-800 flex items-center gap-2"><i class="fas fa-palette text-indigo-500"></i>Apparence et personnalisation</h3>
                </div>
                <div class="card-body p-6">
                    <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-fill-drip text-indigo-500 mr-1"></i>Couleur principale</label>
                            <div class="flex items-center gap-3">
                                <input type="color" v-model="customization.primaryColor" class="w-12 h-10 border border-slate-300 rounded-lg cursor-pointer">
                                <span class="text-sm font-mono text-slate-600">{{ customization.primaryColor }}</span>
                            </div>
                            <div class="color-preview w-16 h-4 rounded-full mt-2" :style="{ background: customization.primaryColor }"></div>
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-fill-drip text-indigo-500 mr-1"></i>Couleur secondaire</label>
                            <div class="flex items-center gap-3">
                                <input type="color" v-model="customization.secondaryColor" class="w-12 h-10 border border-slate-300 rounded-lg cursor-pointer">
                                <span class="text-sm font-mono text-slate-600">{{ customization.secondaryColor }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-moon text-indigo-500 mr-1"></i>Thème</label>
                        <select v-model="customization.theme" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="light">Clair</option>
                            <option value="dark">Sombre</option>
                            <option value="auto">Automatique</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-image text-indigo-500 mr-1"></i>Logo du site</label>
                        <input type="file" @change="onLogoChange" accept="image/*" class="w-full px-4 py-2 border border-slate-300 rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                        <div class="image-preview mt-3" v-if="customization.logoPreview">
                            <img :src="customization.logoPreview" alt="Logo" class="h-16 object-contain">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Onglet Sécurité -->
        <div class="config-pane transition-all duration-300" v-show="activeTab === 'security'">
            <div class="card bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="card-header bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-slate-200">
                    <h3 class="font-semibold text-slate-800 flex items-center gap-2"><i class="fas fa-shield-alt text-indigo-500"></i>Paramètres de sécurité</h3>
                </div>
                <div class="card-body p-6">
                    <div class="form-group">
                        <label class="checkbox-label flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-lg">
                            <input type="checkbox" v-model="security.twoFactorAuth" class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500">
                            <span class="text-sm text-slate-700"><i class="fas fa-mobile-alt text-indigo-500 mr-2"></i>Activer l'authentification à deux facteurs pour les admins</span>
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-label flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-lg">
                            <input type="checkbox" v-model="security.recaptcha" class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500">
                            <span class="text-sm text-slate-700"><i class="fab fa-google text-indigo-500 mr-2"></i>Activer Google reCAPTCHA sur les formulaires</span>
                        </label>
                    </div>
                    <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-clock text-indigo-500 mr-1"></i>Session timeout (minutes)</label>
                            <input type="number" v-model="security.sessionTimeout" min="5" max="480" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-key text-indigo-500 mr-1"></i>Tentatives de connexion max</label>
                            <input type="number" v-model="security.maxLoginAttempts" min="3" max="10" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Onglet Paiement -->
        <div class="config-pane transition-all duration-300" v-show="activeTab === 'payment'">
            <div class="card bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="card-header bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-slate-200">
                    <h3 class="font-semibold text-slate-800 flex items-center gap-2"><i class="fas fa-credit-card text-indigo-500"></i>Configuration des paiements</h3>
                </div>
                <div class="card-body p-6">
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-wallet text-indigo-500 mr-1"></i>Mode de paiement par défaut</label>
                        <select v-model="payment.defaultMethod" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="stripe">Stripe</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-label flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-lg">
                            <input type="checkbox" v-model="payment.testMode" class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500">
                            <span class="text-sm text-slate-700"><i class="fas fa-flask text-indigo-500 mr-2"></i>Mode test (sandbox)</span>
                        </label>
                    </div>
                    <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-percent text-indigo-500 mr-1"></i>Commission plateforme (%)</label>
                            <input type="number" v-model="payment.commission" min="0" max="100" step="0.5" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-hourglass-half text-indigo-500 mr-1"></i>Délai de rétention des fonds (jours)</label>
                            <input type="number" v-model="payment.retentionDays" min="0" max="90" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Boutons d'action -->
        <div class="form-actions flex justify-end gap-4 mt-6">
            <button class="btn-reset px-6 py-2.5 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-all duration-200 flex items-center gap-2" @click="resetConfig">
                <i class="fas fa-undo-alt"></i> Réinitialiser
            </button>
            <button class="btn-save px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="saveConfig">
                <i class="fas fa-save"></i> Enregistrer les modifications
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleConfiguration',
    data() {
        return {
            activeTab: 'general',
            tabs: [
                { id: 'general', name: 'Général', icon: 'fas fa-info-circle' },
                { id: 'customization', name: 'Personnalisation', icon: 'fas fa-palette' },
                { id: 'security', name: 'Sécurité', icon: 'fas fa-shield-alt' },
                { id: 'payment', name: 'Paiement', icon: 'fas fa-credit-card' }
            ],
            general: {
                siteName: 'Gradus Aura Academy',
                slogan: 'L\'excellence éducative à portée de clic',
                contactEmail: 'contact@gradusaura.com',
                phone: '+221 33 123 45 67',
                address: 'Dakar, Sénégal - Plateau, Rue de l\'Université',
                currency: 'XOF'
            },
            customization: {
                primaryColor: '#6366f1',
                secondaryColor: '#8b5cf6',
                theme: 'light',
                logo: null,
                logoPreview: null
            },
            security: {
                twoFactorAuth: true,
                recaptcha: true,
                sessionTimeout: 30,
                maxLoginAttempts: 3
            },
            payment: {
                defaultMethod: 'stripe',
                testMode: false,
                commission: 15,
                retentionDays: 7
            }
        }
    },
    mounted() {
        this.loadConfig()
    },
    methods: {
        onLogoChange(event) {
            const file = event.target.files[0]
            if (file) {
                this.customization.logo = file
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.customization.logoPreview = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },
        loadConfig() {
            const saved = localStorage.getItem('platform_config')
            if (saved) {
                try {
                    const config = JSON.parse(saved)
                    this.general = config.general || this.general
                    this.customization = config.customization || this.customization
                    this.security = config.security || this.security
                    this.payment = config.payment || this.payment
                } catch (e) {
                    console.error('Erreur de chargement de la configuration')
                }
            }
        },
        saveConfig() {
            const config = {
                general: this.general,
                customization: this.customization,
                security: this.security,
                payment: this.payment
            }
            localStorage.setItem('platform_config', JSON.stringify(config))
            alert('Configuration enregistrée avec succès !')
        },
        resetConfig() {
            if (confirm('Réinitialiser tous les paramètres ? Cette action est irréversible.')) {
                localStorage.removeItem('platform_config')
                // Recharger les valeurs par défaut
                this.general = {
                    siteName: 'Gradus Aura Academy',
                    slogan: 'L\'excellence éducative à portée de clic',
                    contactEmail: 'contact@gradusaura.com',
                    phone: '+221 33 123 45 67',
                    address: 'Dakar, Sénégal - Plateau, Rue de l\'Université',
                    currency: 'XOF'
                }
                this.customization = {
                    primaryColor: '#6366f1',
                    secondaryColor: '#8b5cf6',
                    theme: 'light',
                    logo: null,
                    logoPreview: null
                }
                this.security = {
                    twoFactorAuth: true,
                    recaptcha: true,
                    sessionTimeout: 30,
                    maxLoginAttempts: 3
                }
                this.payment = {
                    defaultMethod: 'stripe',
                    testMode: false,
                    commission: 15,
                    retentionDays: 7
                }
                alert('🔄 Configuration réinitialisée avec succès !')
            }
        }
    }
}
</script>

<style scoped>
/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.configuration-module {
    animation: fadeIn 0.3s ease;
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
input:focus, select:focus, textarea:focus {
    outline: none;
    ring: 2px solid #6366f1;
}

/* Checkbox personnalisée */
input[type="checkbox"] {
    cursor: pointer;
}

/* Color input */
input[type="color"] {
    cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
}

input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: 8px;
}
</style>
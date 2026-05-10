<template>
    <div class="site-settings min-h-screen bg-slate-50 p-6">
        <div class="module-header mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-globe text-indigo-500 text-2xl"></i>
                    Paramètres du site
                </h2>
                <p class="text-slate-500 text-sm mt-1">Configurez les informations générales et le référencement du site</p>
            </div>
        </div>

        <!-- Statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Nom du site</p>
                    <p class="text-lg font-bold text-indigo-600 truncate max-w-[150px]">{{ settings.siteName }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-tag text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">SEO Description</p>
                    <p class="text-md font-semibold text-emerald-600">{{ settings.metaDescription.length }} caractères</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-align-left text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Mots-clés</p>
                    <p class="text-md font-semibold text-amber-600">{{ keywordsCount }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-tags text-amber-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Copyright</p>
                    <p class="text-md font-semibold text-rose-600 truncate max-w-[150px]">{{ settings.copyright }}</p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-copyright text-rose-500"></i>
                </div>
            </div>
        </div>

        <!-- Formulaire des paramètres -->
        <div class="settings-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="card-header bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-slate-200">
                <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <i class="fas fa-sliders-h text-indigo-500"></i> Configuration générale
                </h3>
            </div>
            <div class="card-body p-6">
                <div class="form-group mb-6">
                    <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <i class="fas fa-globe text-indigo-500"></i> Nom du site
                    </label>
                    <input v-model="settings.siteName" type="text" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Ex: EduPlatform">
                    <small class="text-xs text-slate-400 mt-1 block">Le nom qui apparaît dans l'en-tête et les onglets du navigateur</small>
                </div>

                <div class="form-group mb-6">
                    <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <i class="fas fa-align-left text-indigo-500"></i> Description du site (meta description)
                    </label>
                    <textarea v-model="settings.metaDescription" rows="3" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" placeholder="Description du site pour les moteurs de recherche..."></textarea>
                    <div class="flex justify-between items-center mt-1">
                        <small class="text-xs text-slate-400">Longueur recommandée: 150-160 caractères</small>
                        <span :class="settings.metaDescription.length > 160 ? 'text-red-500' : settings.metaDescription.length > 120 ? 'text-amber-500' : 'text-emerald-500'" class="text-xs font-medium">
                            {{ settings.metaDescription.length }} / 160
                        </span>
                    </div>
                </div>

                <div class="form-group mb-6">
                    <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <i class="fas fa-tags text-indigo-500"></i> Mots-clés (meta keywords)
                    </label>
                    <input v-model="settings.metaKeywords" type="text" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="cours, formation, e-learning, éducation">
                    <small class="text-xs text-slate-400 mt-1 block">Séparez les mots-clés par des virgules</small>
                </div>

                <div class="form-group mb-6">
                    <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <i class="fas fa-image text-indigo-500"></i> Favicon
                    </label>
                    <div class="flex items-center gap-4">
                        <div class="flex-1">
                            <input type="file" @change="onFaviconChange" accept="image/*" class="w-full px-4 py-2 border border-slate-300 rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                        </div>
                        <div v-if="settings.faviconPreview" class="relative">
                            <img :src="settings.faviconPreview" class="favicon-preview w-12 h-12 rounded-lg border-2 border-indigo-500 shadow-sm object-cover">
                            <button @click="removeFavicon" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div v-else class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                            <i class="fas fa-image text-slate-400 text-xl"></i>
                        </div>
                    </div>
                    <small class="text-xs text-slate-400 mt-1 block">Format recommandé: ICO, PNG, ou JPEG (16x16, 32x32, ou 64x64 pixels)</small>
                </div>

                <div class="form-group mb-6">
                    <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <i class="fas fa-copyright text-indigo-500"></i> Copyright
                    </label>
                    <input v-model="settings.copyright" type="text" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="© 2024 Votre Société">
                </div>

                <div class="flex gap-3 pt-4 border-t border-slate-200">
                    <button class="btn-reset px-6 py-2.5 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-all duration-200 flex items-center gap-2" @click="resetSettings">
                        <i class="fas fa-undo-alt"></i> Réinitialiser
                    </button>
                    <button class="btn-save px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="saveSettings">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>

        <!-- Aperçu SEO -->
        <div class="seo-preview mt-6 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h4 class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <i class="fas fa-search text-indigo-500"></i> Aperçu dans les moteurs de recherche
            </h4>
            <div class="seo-snippet p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p class="text-blue-600 text-xl font-medium">{{ settings.siteName || 'Nom du site' }}</p>
                <p class="text-green-600 text-sm mt-1">{{ windowLocation }}/</p>
                <p class="text-slate-600 text-sm mt-2">{{ settings.metaDescription || 'Description du site pour les moteurs de recherche...' }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleSiteSettings',
    data() {
        return {
            windowLocation: window.location.origin,
            settings: {
                siteName: 'Gradus Aura - Formation en ligne',
                metaDescription: 'Plateforme e-learning de qualité avec des cours en ligne, formations certifiantes et accompagnement personnalisé pour réussir votre carrière.',
                metaKeywords: 'cours en ligne, formation, e-learning, éducation, certification, développement web, data science, marketing digital',
                faviconPreview: null,
                faviconFile: null,
                copyright: '© 2024 Gradus Aura. Tous droits réservés.'
            }
        }
    },
    computed: {
        keywordsCount() {
            if (!this.settings.metaKeywords) return 0
            return this.settings.metaKeywords.split(',').length
        }
    },
    mounted() {
        this.loadSettings()
    },
    methods: {
        onFaviconChange(e) {
            const file = e.target.files[0]
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('Le fichier est trop volumineux. Taille maximum: 2 Mo')
                    return
                }
                this.settings.faviconFile = file
                const reader = new FileReader()
                reader.onload = (ev) => {
                    this.settings.faviconPreview = ev.target.result
                }
                reader.readAsDataURL(file)
            }
        },
        removeFavicon() {
            this.settings.faviconPreview = null
            this.settings.faviconFile = null
        },
        loadSettings() {
            const saved = localStorage.getItem('siteSettings')
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    this.settings = { ...this.settings, ...parsed }
                } catch (e) {
                    console.error('Erreur de chargement des paramètres')
                }
            }
        },
        saveSettings() {
            if (!this.settings.siteName.trim()) {
                alert('Veuillez saisir un nom de site')
                return
            }
            localStorage.setItem('siteSettings', JSON.stringify(this.settings))
            alert('Paramètres sauvegardés avec succès !')
        },
        resetSettings() {
            if (confirm('Réinitialiser tous les paramètres ?')) {
                this.settings = {
                    siteName: 'Gradus Aura - Formation en ligne',
                    metaDescription: 'Plateforme e-learning de qualité avec des cours en ligne, formations certifiantes et accompagnement personnalisé pour réussir votre carrière.',
                    metaKeywords: 'cours en ligne, formation, e-learning, éducation, certification, développement web, data science, marketing digital',
                    faviconPreview: null,
                    faviconFile: null,
                    copyright: '© 2024 Gradus Aura. Tous droits réservés.'
                }
                alert('Paramètres réinitialisés')
            }
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

.site-settings {
  animation: fadeIn 0.3s ease;
}

.stats-grid .stat-card,
.settings-card,
.seo-preview {
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
input:focus, textarea:focus {
  outline: none;
  ring: 2px solid #6366f1;
}

/* Favicon preview */
.favicon-preview {
  transition: all 0.2s ease;
}

.favicon-preview:hover {
  transform: scale(1.05);
}

/* Snippet SEO */
.seo-snippet {
  transition: all 0.2s ease;
}

.seo-snippet:hover {
  background-color: #f8fafc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
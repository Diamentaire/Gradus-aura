<template>
    <div class="page-settings min-h-screen bg-slate-50 p-6">
        <div class="module-header mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-file-alt text-indigo-500 text-2xl"></i>
                    Paramètres des pages
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez le contenu et le référencement des pages statiques</p>
            </div>
        </div>

        <!-- Statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Pages totales</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ pages.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-file-alt text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Pages modifiées</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ modifiedPagesCount }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-edit text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">SEO optimisé</p>
                    <p class="text-2xl font-bold text-amber-600">{{ seoOptimizedCount }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-chart-line text-amber-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Dernière mise à jour</p>
                    <p class="text-lg font-bold text-rose-600">Aujourd'hui</p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-clock text-rose-500"></i>
                </div>
            </div>
        </div>

        <!-- Liste des pages -->
        <div class="pages-list bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="pages-header bg-slate-50 px-6 py-3 border-b border-slate-200 grid grid-cols-12 gap-4">
                <div class="col-span-5"><span class="text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-file mr-1"></i>Page</span></div>
                <div class="col-span-4"><span class="text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-link mr-1"></i>URL</span></div>
                <div class="col-span-2"><span class="text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-search mr-1"></i>SEO</span></div>
                <div class="col-span-1"><span class="text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</span></div>
            </div>
            <div v-for="(page, idx) in pages" :key="idx" class="page-item border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <div class="grid grid-cols-12 gap-4 items-center p-4">
                    <div class="col-span-5">
                        <div class="page-info flex items-center gap-3">
                            <div :class="getPageIconBg(page.name)" class="w-10 h-10 rounded-xl flex items-center justify-center">
                                <i :class="getPageIcon(page.name)" class="text-white text-lg"></i>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">{{ page.name }}</h3>
                                <p class="text-xs text-slate-400 mt-0.5">ID: {{ page.id }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-link text-slate-400 text-xs"></i>
                            <code class="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">{{ page.slug }}</code>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <span :class="page.seoTitle && page.seoDescription ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'" class="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                            <i :class="page.seoTitle && page.seoDescription ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'"></i>
                            {{ page.seoTitle && page.seoDescription ? 'Optimisé' : 'À compléter' }}
                        </span>
                    </div>
                    <div class="col-span-1">
                        <button class="btn-edit w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editPage(idx)" title="Modifier la page">
                            <i class="fas fa-edit text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Modification de page -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showModal, 'flex': showModal }" @click.self="showModal=false">
            <div class="modal-content bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-edit text-indigo-500"></i>
                        Modifier la page : <span class="text-indigo-600">{{ pages[editingIndex]?.name }}</span>
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="showModal=false">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-tag text-indigo-500"></i> Titre SEO
                        </label>
                        <input v-model="editForm.seoTitle" type="text" placeholder="Titre pour les moteurs de recherche" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <small class="text-xs text-slate-400 mt-1 block">Longueur recommandée: 50-60 caractères</small>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-align-left text-indigo-500"></i> Description SEO
                        </label>
                        <textarea v-model="editForm.seoDescription" rows="2" placeholder="Description pour les moteurs de recherche" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
                        <small class="text-xs text-slate-400 mt-1 block">Longueur recommandée: 150-160 caractères</small>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-file-code text-indigo-500"></i> Contenu de la page
                        </label>
                        <div class="bg-slate-50 rounded-lg p-3 mb-2">
                            <div class="flex items-center gap-3 mb-2">
                                <button class="px-2 py-1 bg-white rounded border border-slate-200 text-xs"><i class="fas fa-bold"></i></button>
                                <button class="px-2 py-1 bg-white rounded border border-slate-200 text-xs"><i class="fas fa-italic"></i></button>
                                <button class="px-2 py-1 bg-white rounded border border-slate-200 text-xs"><i class="fas fa-list-ul"></i></button>
                                <button class="px-2 py-1 bg-white rounded border border-slate-200 text-xs"><i class="fas fa-link"></i></button>
                                <button class="px-2 py-1 bg-white rounded border border-slate-200 text-xs"><i class="fas fa-image"></i></button>
                            </div>
                        </div>
                        <textarea v-model="editForm.content" rows="8" placeholder="Contenu HTML de la page..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm resize-none"></textarea>
                        <small class="text-xs text-slate-400 mt-1 block">Vous pouvez utiliser du HTML pour formater votre contenu</small>
                    </div>
                    <div class="preview-box mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h4 class="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><i class="fas fa-eye text-indigo-500"></i> Aperçu SEO</h4>
                        <div class="bg-white p-3 rounded-lg border border-slate-200">
                            <p class="text-blue-600 text-lg font-medium">{{ editForm.seoTitle || 'Titre de la page' }}</p>
                            <p class="text-green-600 text-sm mt-1">{{ pages[editingIndex]?.slug || '/page' }}</p>
                            <p class="text-slate-600 text-sm mt-2">{{ editForm.seoDescription || 'Description de la page pour les moteurs de recherche...' }}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="showModal=false">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="savePage">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModulePageSettings',
    data() {
        return {
            showModal: false, 
            editingIndex: null,
            editForm: { seoTitle: '', seoDescription: '', content: '' },
            // 10 exemples de pages
            pages: [
                { id: 1, name: 'Accueil', slug: '/', seoTitle: 'Accueil - Plateforme éducative en ligne', seoDescription: 'Bienvenue sur notre plateforme éducative. Découvrez nos cours et formations.', content: '<h1>Bienvenue</h1><p>Contenu de la page d\'accueil...</p>' },
                { id: 2, name: 'À propos', slug: '/about', seoTitle: 'À propos - Notre histoire et mission', seoDescription: 'Découvrez notre histoire, notre mission et nos valeurs.', content: '<h1>À propos de nous</h1><p>Notre histoire...</p>' },
                { id: 3, name: 'Contact', slug: '/contact', seoTitle: 'Contact - Nous contacter', seoDescription: 'Contactez-nous pour toute question ou demande d\'information.', content: '<h1>Contactez-nous</h1><p>Formulaire de contact...</p>' },
                { id: 4, name: 'Cours', slug: '/courses', seoTitle: 'Tous nos cours - Formations en ligne', seoDescription: 'Découvrez tous nos cours et formations disponibles.', content: '<h1>Nos cours</h1><p>Liste des cours...</p>' },
                { id: 5, name: 'Blog', slug: '/blog', seoTitle: 'Blog - Actualités et conseils', seoDescription: 'Actualités, conseils et articles sur l\'éducation.', content: '<h1>Blog</h1><p>Articles récents...</p>' },
                { id: 6, name: 'FAQ', slug: '/faq', seoTitle: 'FAQ - Questions fréquentes', seoDescription: 'Réponses aux questions les plus fréquentes.', content: '<h1>Foire aux questions</h1><p>Questions et réponses...</p>' },
                { id: 7, name: 'Mentions légales', slug: '/legal', seoTitle: 'Mentions légales', seoDescription: 'Informations légales et conditions d\'utilisation.', content: '<h1>Mentions légales</h1><p>Informations légales...</p>' },
                { id: 8, name: 'Politique de confidentialité', slug: '/privacy', seoTitle: 'Politique de confidentialité', seoDescription: 'Protection de vos données personnelles.', content: '<h1>Politique de confidentialité</h1><p>Protection des données...</p>' },
                { id: 9, name: 'Conditions générales', slug: '/terms', seoTitle: 'Conditions Générales de Vente', seoDescription: 'CGV - Conditions d\'utilisation de la plateforme.', content: '<h1>Conditions Générales</h1><p>CGV...</p>' },
                { id: 10, name: 'Partenaires', slug: '/partners', seoTitle: 'Nos partenaires', seoDescription: 'Découvrez nos partenaires éducatifs.', content: '<h1>Partenaires</h1><p>Liste des partenaires...</p>' }
            ]
        }
    },
    computed: {
        modifiedPagesCount() {
            return this.pages.filter(p => p.seoTitle && p.seoDescription && p.seoTitle !== p.name).length
        },
        seoOptimizedCount() {
            return this.pages.filter(p => p.seoTitle && p.seoDescription && p.seoTitle.length > 20 && p.seoDescription.length > 50).length
        }
    },
    methods: {
        getPageIcon(name) {
            const icons = {
                'Accueil': 'fas fa-home',
                'À propos': 'fas fa-info-circle',
                'Contact': 'fas fa-envelope',
                'Cours': 'fas fa-book-open',
                'Blog': 'fas fa-blog',
                'FAQ': 'fas fa-question-circle',
                'Mentions légales': 'fas fa-gavel',
                'Politique de confidentialité': 'fas fa-shield-alt',
                'Conditions générales': 'fas fa-file-contract',
                'Partenaires': 'fas fa-handshake'
            }
            return icons[name] || 'fas fa-file-alt'
        },
        getPageIconBg(name) {
            const colors = {
                'Accueil': 'bg-gradient-to-r from-indigo-500 to-indigo-600',
                'À propos': 'bg-gradient-to-r from-blue-500 to-blue-600',
                'Contact': 'bg-gradient-to-r from-emerald-500 to-emerald-600',
                'Cours': 'bg-gradient-to-r from-amber-500 to-amber-600',
                'Blog': 'bg-gradient-to-r from-rose-500 to-rose-600',
                'FAQ': 'bg-gradient-to-r from-purple-500 to-purple-600',
                'Mentions légales': 'bg-gradient-to-r from-slate-500 to-slate-600',
                'Politique de confidentialité': 'bg-gradient-to-r from-cyan-500 to-cyan-600',
                'Conditions générales': 'bg-gradient-to-r from-orange-500 to-orange-600',
                'Partenaires': 'bg-gradient-to-r from-teal-500 to-teal-600'
            }
            return colors[name] || 'bg-gradient-to-r from-indigo-500 to-indigo-600'
        },
        editPage(idx) { 
            this.editingIndex = idx
            this.editForm = { 
                seoTitle: this.pages[idx].seoTitle, 
                seoDescription: this.pages[idx].seoDescription, 
                content: this.pages[idx].content || '' 
            }
            this.showModal = true 
        },
        savePage() { 
            if (this.editingIndex !== null) {
                this.pages[this.editingIndex] = { 
                    ...this.pages[this.editingIndex], 
                    seoTitle: this.editForm.seoTitle, 
                    seoDescription: this.editForm.seoDescription, 
                    content: this.editForm.content 
                }
                alert(`Page "${this.pages[this.editingIndex].name}" mise à jour avec succès`)
            }
            this.showModal = false
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

.page-settings {
  animation: fadeIn 0.3s ease;
}

.stats-grid .stat-card,
.pages-list {
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

/* Modal animation */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

/* Code styling */
code {
  font-family: 'Courier New', monospace;
}
</style>
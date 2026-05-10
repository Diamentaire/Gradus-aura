<template>
    <div class="manage-info min-h-screen bg-slate-50 p-6">
        <div class="module-header mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-info-circle text-indigo-500 text-2xl"></i>
                    Gestion des informations
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez les sections d'informations affichées sur la plateforme</p>
            </div>
        </div>

        <!-- Statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Sections totales</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ infoSections.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-info-circle text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Types d'icônes</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ uniqueIconsCount }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-icons text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Contenu total</p>
                    <p class="text-2xl font-bold text-amber-600">{{ totalCharsCount }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-align-left text-amber-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Liens actifs</p>
                    <p class="text-2xl font-bold text-rose-600">{{ activeLinksCount }}</p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-link text-rose-500"></i>
                </div>
            </div>
        </div>

        <!-- Sections d'informations -->
        <div class="info-sections grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(section, idx) in infoSections" :key="idx" class="info-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                <div class="info-header relative p-6 pb-4">
                    <div class="info-icon w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4" :style="{ background: getIconGradient(idx), color: getIconColor(idx) }">
                        <i :class="section.icon + ' text-3xl'"></i>
                    </div>
                    <button class="btn-edit absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editSection(idx)" title="Modifier">
                        <i class="fas fa-edit text-sm"></i>
                    </button>
                    <h3 class="text-xl font-bold text-slate-800 mb-3 text-center">{{ section.title }}</h3>
                    <p class="info-description text-slate-500 text-sm leading-relaxed text-center">{{ section.description }}</p>
                </div>
                <div class="info-footer bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                    <span class="flex items-center gap-1">
                        <i class="fas fa-code"></i> {{ getIconName(section.icon) }}
                    </span>
                    <span class="flex items-center gap-1">
                        <i class="fas fa-text-height"></i> {{ section.description.length }} caractères
                    </span>
                </div>
                <!-- Lien vers la page de certificat (UNIQUEMENT pour la certification) -->
                <div class="info-link px-6 pb-4" v-if="section.link">
                    <router-link 
                        :to="section.link" 
                        class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200"
                    >
                        <i class="fas fa-certificate text-xs"></i>
                        Voir mes certificats
                        <i class="fas fa-arrow-right text-xs"></i>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Modal Modification -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showModal, 'flex': showModal }" @click.self="showModal=false">
            <div class="modal-content bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-edit text-indigo-500"></i> Modifier l'information
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="showModal=false">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-icons text-indigo-500"></i> Icône FontAwesome
                        </label>
                        <div class="flex gap-3">
                            <input v-model="editForm.icon" placeholder="fas fa-graduation-cap" class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm">
                            <div class="w-12 h-12 rounded-lg flex items-center justify-center" :style="{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }">
                                <i :class="editForm.icon || 'fas fa-question'" class="text-xl"></i>
                            </div>
                        </div>
                        <small class="text-xs text-slate-400 mt-1 block">Exemples: fas fa-graduation-cap, fas fa-certificate, fas fa-headset</small>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-heading text-indigo-500"></i> Titre
                        </label>
                        <input v-model="editForm.title" type="text" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-align-left text-indigo-500"></i> Description
                        </label>
                        <textarea v-model="editForm.description" rows="4" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
                        <small class="text-xs text-slate-400 mt-1 block">Longueur: {{ editForm.description.length }} / 200 caractères</small>
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-link text-indigo-500"></i> Lien (URL)
                        </label>
                        <input v-model="editForm.link" type="text" placeholder="/e-learning/certificat" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <small class="text-xs text-slate-400 mt-1 block">Lien vers la page associée (optionnel)</small>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="showModal=false">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveInfo">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>

        <!-- Aperçu de la disposition -->
        <div class="preview-section mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h4 class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <i class="fas fa-eye text-indigo-500"></i> Aperçu des sections
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="(section, idx) in infoSections.slice(0, 3)" :key="idx" class="preview-card p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" :style="{ background: getIconGradient(idx) }">
                        <i :class="section.icon" class="text-white text-xl"></i>
                    </div>
                    <p class="font-semibold text-slate-700 text-sm">{{ section.title }}</p>
                    <p class="text-xs text-slate-400 mt-1 line-clamp-2">{{ section.description }}</p>
                    <div v-if="section.link" class="mt-2">
                        <span class="text-xs text-indigo-500"><i class="fas fa-link"></i> Lien actif</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleManageInfo',
    data() {
        return {
            showModal: false, 
            editingIndex: null,
            editForm: { icon: '', title: '', description: '', link: '' },
            // Sections d'informations - SEULE LA CERTIFICATION A UN LIEN
            infoSections: [
                { 
                    icon: 'fas fa-graduation-cap', 
                    title: 'Des cours de qualité', 
                    description: 'Accédez à des cours créés par des experts du secteur avec des contenus actualisés et pertinents.',
                    link: null
                },
                { 
                    icon: 'fas fa-certificate', 
                    title: 'Certification reconnue', 
                    description: 'Obtenez des certificats valorisables professionnellement reconnus par les entreprises.',
                    link: '/e-learning/certificat'
                },
                { 
                    icon: 'fas fa-headset', 
                    title: 'Support 24/7', 
                    description: 'Une équipe dédiée pour répondre à toutes vos questions, disponible jour et nuit.',
                    link: null
                },
                { 
                    icon: 'fas fa-chalkboard-user', 
                    title: 'Formateurs expérimentés', 
                    description: 'Apprenez auprès de professionnels reconnus dans leur domaine avec plusieurs années d\'expérience.',
                    link: null
                },
                { 
                    icon: 'fas fa-clock', 
                    title: 'Apprentissage flexible', 
                    description: 'Suivez les cours à votre rythme, où que vous soyez, sur tous vos appareils.',
                    link: null
                },
                { 
                    icon: 'fas fa-users', 
                    title: 'Communauté active', 
                    description: 'Échangez avec des milliers d\'apprenants et de formateurs sur notre forum.',
                    link: null
                },
                { 
                    icon: 'fas fa-mobile-alt', 
                    title: 'Accès mobile', 
                    description: 'Apprenez où que vous soyez avec nos applications iOS et Android gratuites.',
                    link: null
                },
                { 
                    icon: 'fas fa-chart-line', 
                    title: 'Suivi de progression', 
                    description: 'Visualisez vos progrès et atteignez vos objectifs d\'apprentissage.',
                    link: null
                },
                { 
                    icon: 'fas fa-hand-holding-usd', 
                    title: 'Prix abordables', 
                    description: 'Des formations de qualité à des prix accessibles pour tous les budgets.',
                    link: null
                },
                { 
                    icon: 'fas fa-globe', 
                    title: 'Communauté internationale', 
                    description: 'Rejoignez une communauté d\'apprenants du monde entier et échangez en plusieurs langues.',
                    link: null
                }
            ]
        }
    },
    computed: {
        uniqueIconsCount() {
            const icons = [...new Set(this.infoSections.map(s => s.icon))]
            return icons.length
        },
        totalCharsCount() {
            return this.infoSections.reduce((sum, s) => sum + s.description.length, 0)
        },
        activeLinksCount() {
            return this.infoSections.filter(s => s.link && s.link !== '#').length
        }
    },
    methods: {
        getIconGradient(idx) {
            const gradients = [
                'linear-gradient(135deg, #6366f1, #818cf8)',
                'linear-gradient(135deg, #10b981, #34d399)',
                'linear-gradient(135deg, #f59e0b, #fbbf24)',
                'linear-gradient(135deg, #ef4444, #f87171)',
                'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                'linear-gradient(135deg, #ec4899, #f472b6)',
                'linear-gradient(135deg, #06b6d4, #22d3ee)',
                'linear-gradient(135deg, #84cc16, #a3e635)',
                'linear-gradient(135deg, #d946ef, #e879f9)',
                'linear-gradient(135deg, #f97316, #fb923c)'
            ]
            return gradients[idx % gradients.length]
        },
        getIconColor(idx) {
            const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#d946ef', '#f97316']
            return colors[idx % colors.length]
        },
        getIconName(iconClass) {
            const nameMap = {
                'fas fa-graduation-cap': 'graduation-cap',
                'fas fa-certificate': 'certificate',
                'fas fa-headset': 'headset',
                'fas fa-chalkboard-user': 'chalkboard-user',
                'fas fa-clock': 'clock',
                'fas fa-users': 'users',
                'fas fa-mobile-alt': 'mobile-alt',
                'fas fa-chart-line': 'chart-line',
                'fas fa-hand-holding-usd': 'hand-holding-usd',
                'fas fa-globe': 'globe'
            }
            return nameMap[iconClass] || iconClass.split(' ').pop() || 'icon'
        },
        editSection(idx) { 
            this.editingIndex = idx
            this.editForm = { 
                icon: this.infoSections[idx].icon, 
                title: this.infoSections[idx].title, 
                description: this.infoSections[idx].description,
                link: this.infoSections[idx].link || ''
            }
            this.showModal = true
        },
        saveInfo() { 
            if (this.editingIndex !== null && this.editForm.title && this.editForm.description) {
                this.infoSections[this.editingIndex] = { 
                    icon: this.editForm.icon,
                    title: this.editForm.title,
                    description: this.editForm.description,
                    link: this.editForm.link
                }
                alert('Section modifiée avec succès')
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

.manage-info {
  animation: fadeIn 0.3s ease;
}

.stats-grid .stat-card,
.info-sections .info-card,
.preview-section {
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

/* Line clamp pour l'aperçu */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Info card hover */
.info-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
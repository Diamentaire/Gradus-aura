<template>
    <div class="manage-slider min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-images text-indigo-500 text-2xl"></i>
                    Gestion du slider
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez les images du carrousel principal de la plateforme</p>
            </div>
            <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openAddModal">
                <i class="fas fa-plus text-sm"></i> Ajouter un slide
            </button>
        </div>

        <!-- Statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Slides totaux</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ slides.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-images text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Actifs</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ activeSlidesCount }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Inactifs</p>
                    <p class="text-2xl font-bold text-rose-600">{{ inactiveSlidesCount }}</p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-ban text-rose-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Ordre max</p>
                    <p class="text-2xl font-bold text-amber-600">{{ maxOrder }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-sort-numeric-down text-amber-500"></i>
                </div>
            </div>
        </div>

        <!-- Aperçu du carrousel - Sans scroll horizontal -->
        <div class="slider-preview-section mb-6">
            <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i class="fas fa-eye text-indigo-500"></i> Aperçu du carrousel
            </h3>
            <div class="carousel-preview flex flex-wrap gap-4">
                <div v-for="(slide, idx) in slides" :key="idx" class="preview-slide relative w-[280px] rounded-xl overflow-hidden shadow-md group bg-white border border-slate-200">
                    <img :src="slide.image || 'https://picsum.photos/id/20/800/300'" class="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105" alt="slide">
                    <div class="preview-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3">
                        <h4 class="text-white font-bold text-sm truncate">{{ slide.title || 'Titre du slide' }}</h4>
                        <p class="text-white/80 text-xs truncate">{{ slide.subtitle || 'Sous-titre' }}</p>
                    </div>
                    <div class="absolute top-2 right-2">
                        <span :class="slide.active ? 'bg-emerald-500' : 'bg-slate-500'" class="text-white text-xs px-2 py-0.5 rounded-full">
                            {{ slide.active ? 'Actif' : 'Inactif' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tableau des slides -->
        <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
            <table class="data-table w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-image mr-1"></i>Image</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-heading mr-1"></i>Titre</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-align-left mr-1"></i>Sous-titre</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-sort-numeric-down mr-1"></i>Ordre</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-flag mr-1"></i>Statut</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="(slide, idx) in slides" :key="idx" class="hover:bg-slate-50 transition-colors">
                        <td class="px-4 py-3">
                            <img :src="slide.image" class="thumb w-16 h-10 object-cover rounded-lg border border-slate-200 shadow-sm" alt="slide">
                        </td>
                        <td class="px-4 py-3 text-sm font-medium text-slate-700 max-w-[200px] truncate">{{ slide.title }}</td>
                        <td class="px-4 py-3 text-sm text-slate-500 max-w-[200px] truncate">{{ slide.subtitle }}</td>
                        <td class="px-4 py-3">
                            <input type="number" v-model="slide.order" class="order-input w-16 px-2 py-1 text-center border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </td>
                        <td class="px-4 py-3">
                            <button @click="slide.active = !slide.active" :class="slide.active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'" class="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1">
                                <i :class="slide.active ? 'fas fa-toggle-on' : 'fas fa-toggle-off'"></i>
                                {{ slide.active ? 'Actif' : 'Inactif' }}
                            </button>
                        </td>
                        <td class="px-4 py-3">
                            <div class="actions flex items-center gap-2">
                                <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editSlide(idx)" title="Modifier">
                                    <i class="fas fa-edit text-sm"></i>
                                </button>
                                <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteSlide(idx)" title="Supprimer">
                                    <i class="fas fa-trash-alt text-sm"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="slides.length === 0">
                        <td colspan="6" class="px-4 py-8 text-center text-slate-400">
                            <i class="fas fa-images text-4xl mb-2 block"></i>
                            <p>Aucun slide trouvé. Cliquez sur "Ajouter un slide" pour commencer.</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal Ajout/Modification -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showModal, 'flex': showModal }" @click.self="showModal=false">
            <div class="modal-content bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-image text-indigo-500"></i>
                        {{ editingIndex !== null ? 'Modifier' : 'Ajouter' }} un slide
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="showModal=false">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-heading text-indigo-500"></i> Titre
                        </label>
                        <input v-model="form.title" type="text" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-align-left text-indigo-500"></i> Sous-titre
                        </label>
                        <input v-model="form.subtitle" type="text" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-image text-indigo-500"></i> URL de l'image
                        </label>
                        <input v-model="form.image" placeholder="https://picsum.photos/id/1/800/300" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <div v-if="form.image" class="mt-2">
                            <img :src="form.image" class="h-20 object-cover rounded-lg border border-slate-200" alt="Aperçu">
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-link text-indigo-500"></i> Lien (optionnel)
                        </label>
                        <input v-model="form.link" placeholder="https://exemple.com/page" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-sort-numeric-down text-indigo-500"></i> Ordre d'affichage
                        </label>
                        <input v-model="form.order" type="number" placeholder="1, 2, 3..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="showModal=false">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveSlide">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleManageSlider',
    data() {
        return {
            showModal: false, 
            editingIndex: null,
            form: { title: '', subtitle: '', image: '', link: '', order: 1, active: true },
            // 10 exemples de slides
            slides: [
                { id: 1, title: 'Bienvenue sur EduPlatform', subtitle: 'La plateforme éducative de référence en Afrique', image: 'https://picsum.photos/id/20/800/300', link: '/', active: true, order: 1 },
                { id: 2, title: 'Des milliers de cours disponibles', subtitle: 'Apprenez à votre rythme avec nos experts', image: 'https://picsum.photos/id/26/800/300', link: '/courses', active: true, order: 2 },
                { id: 3, title: 'Formez-vous aux nouvelles technologies', subtitle: 'React, Vue, Laravel, Python et plus encore', image: 'https://picsum.photos/id/0/800/300', link: '/tech', active: true, order: 3 },
                { id: 4, title: 'Certifications reconnues', subtitle: 'Valorisez vos compétences avec nos certificats', image: 'https://picsum.photos/id/1/800/300', link: '/certifications', active: true, order: 4 },
                { id: 5, title: 'Formateurs expérimentés', subtitle: 'Apprenez auprès des meilleurs experts', image: 'https://picsum.photos/id/2/800/300', link: '/trainers', active: true, order: 5 },
                { id: 6, title: 'Communauté active', subtitle: 'Échangez avec des milliers d\'apprenants', image: 'https://picsum.photos/id/3/800/300', link: '/community', active: false, order: 6 },
                { id: 7, title: 'Accès mobile', subtitle: 'Apprenez où que vous soyez', image: 'https://picsum.photos/id/4/800/300', link: '/mobile', active: true, order: 7 },
                { id: 8, title: 'Suivi de progression', subtitle: 'Visualisez vos progrès en temps réel', image: 'https://picsum.photos/id/5/800/300', link: '/progress', active: true, order: 8 },
                { id: 9, title: 'Prix abordables', subtitle: 'Des formations de qualité à petit prix', image: 'https://picsum.photos/id/6/800/300', link: '/pricing', active: false, order: 9 },
                { id: 10, title: 'Support 24/7', subtitle: 'Une équipe dédiée pour vous accompagner', image: 'https://picsum.photos/id/7/800/300', link: '/support', active: true, order: 10 }
            ]
        }
    },
    computed: {
        activeSlidesCount() {
            return this.slides.filter(s => s.active).length
        },
        inactiveSlidesCount() {
            return this.slides.filter(s => !s.active).length
        },
        maxOrder() {
            if (this.slides.length === 0) return 0
            return Math.max(...this.slides.map(s => s.order || 0))
        }
    },
    methods: {
        openAddModal() { 
            this.editingIndex = null
            this.form = { title: '', subtitle: '', image: '', link: '', order: this.slides.length + 1, active: true }
            this.showModal = true 
        },
        editSlide(idx) { 
            this.editingIndex = idx
            this.form = { ...this.slides[idx] }
            this.showModal = true 
        },
        saveSlide() {
            if (!this.form.title) {
                alert('Veuillez saisir un titre')
                return
            }
            if (!this.form.image) {
                alert('Veuillez saisir une URL d\'image')
                return
            }
            const newSlide = {
                id: Date.now(),
                title: this.form.title,
                subtitle: this.form.subtitle,
                image: this.form.image,
                link: this.form.link,
                order: this.form.order || this.slides.length + 1,
                active: this.form.active !== undefined ? this.form.active : true
            }
            if (this.editingIndex !== null) {
                this.slides[this.editingIndex] = newSlide
                alert('Slide modifié avec succès')
            } else {
                this.slides.push(newSlide)
                alert('Slide ajouté avec succès')
            }
            this.showModal = false
        },
        deleteSlide(idx) { 
            if (confirm('Supprimer ce slide ?')) {
                this.slides.splice(idx, 1)
                alert('Slide supprimé avec succès')
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

.manage-slider {
  animation: fadeIn 0.3s ease;
}

.stats-grid .stat-card,
.slider-preview-section,
.table-responsive {
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
input:focus {
  outline: none;
  ring: 2px solid #6366f1;
}

/* Modal animation */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

/* Preview cards - taille fixe et sans scroll */
.preview-slide {
  width: 280px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.preview-slide:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Conteneur flex-wrap pour éviter le scroll horizontal */
.carousel-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Truncate pour les textes longs */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Tableau responsive */
.table-responsive {
  overflow-x: auto;
}
</style>
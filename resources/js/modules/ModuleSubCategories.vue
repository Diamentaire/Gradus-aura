<template>
    <div class="subcategories-module min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-sitemap text-indigo-500 text-2xl"></i>
                    Gestion des sous-catégories
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez les sous-catégories pour organiser vos cours</p>
            </div>
            <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openAddModal">
                <i class="fas fa-plus text-sm"></i> Ajouter une sous-catégorie
            </button>
        </div>

        <!-- Statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Sous-catégories</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ subCategories.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-sitemap text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Catégories parentes</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ categories.length }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-folder text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Actives</p>
                    <p class="text-2xl font-bold text-amber-600">{{ activeCount }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-amber-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Cours associés</p>
                    <p class="text-2xl font-bold text-rose-600">1,247</p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-book-open text-rose-500"></i>
                </div>
            </div>
        </div>

        <div class="table-controls flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm mb-6">
            <div class="entries-select flex items-center gap-2">
                <label class="text-sm text-slate-600"><i class="fas fa-table-list mr-1"></i>Afficher</label>
                <select v-model="perPage" class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                <label class="text-sm text-slate-600">entrées</label>
            </div>
            <div class="filter-group flex items-center gap-3">
                <i class="fas fa-filter text-slate-400"></i>
                <select v-model="filterParentCategory" class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Toutes les catégories parentes</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
            </div>
            <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
                <i class="fas fa-search text-slate-400"></i>
                <input type="text" v-model="searchTerm" placeholder="Rechercher une sous-catégorie..." class="bg-transparent border-none outline-none text-sm w-64">
            </div>
        </div>

        <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
            <table class="data-table w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-hashtag mr-1"></i>N°</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-tag mr-1"></i>Nom</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-folder mr-1"></i>Catégorie parente</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-flag mr-1"></i>Statut</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-calendar mr-1"></i>Date création</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="(sub, idx) in paginatedSubCategories" :key="sub.id" class="hover:bg-slate-50 transition-colors">
                        <td class="px-4 py-3 text-sm text-slate-600">{{ (currentPage - 1) * perPage + idx + 1 }}</td>
                        <td class="px-4 py-3 text-sm font-medium text-slate-800">{{ sub.name }}</td>
                        <td class="px-4 py-3">
                            <span class="parent-badge inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                <i class="fas fa-folder-open text-indigo-500 text-xs"></i> {{ getParentName(sub.parentId) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', 
                                sub.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700']">
                                <i :class="sub.status === 'active' ? 'fas fa-check-circle' : 'fas fa-ban'"></i>
                                {{ sub.status === 'active' ? 'Actif' : 'Inactif' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-slate-500">{{ sub.createdAt }}</td>
                        <td class="px-4 py-3">
                            <div class="actions flex items-center gap-2">
                                <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editSubCategory(sub)" title="Modifier">
                                    <i class="fas fa-edit text-sm"></i>
                                </button>
                                <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteSubCategory(sub.id)" title="Supprimer">
                                    <i class="fas fa-trash-alt text-sm"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedSubCategories.length === 0">
                        <td colspan="6" class="px-4 py-8 text-center text-slate-400">
                            <i class="fas fa-inbox text-4xl mb-2 block"></i>
                            <p>Aucune sous-catégorie trouvée</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
            <div class="text-sm text-slate-500">
                <i class="fas fa-chart-simple mr-1"></i>
                Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredSubCategories.length }} entrées
            </div>
            <div class="pagination flex gap-2">
                <button @click="prevPage" :disabled="currentPage === 1" 
                    class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
                    <i class="fas fa-chevron-left text-xs"></i> Précédent
                </button>
                <button v-for="p in totalPages" :key="p" @click="currentPage = p" 
                    :class="['px-3 py-1.5 rounded-lg text-sm transition-colors', 
                        currentPage === p ? 'bg-indigo-500 text-white' : 'border border-slate-300 hover:bg-slate-50']">
                    {{ p }}
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages" 
                    class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
                    Suivant <i class="fas fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>

        <!-- Modal Ajout/Modification -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showModal, 'flex': showModal }" @click.self="closeModal">
            <div class="modal-content bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-plus-circle text-indigo-500"></i>
                        {{ editingSubCategory ? 'Modifier la sous-catégorie' : 'Ajouter une sous-catégorie' }}
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-folder text-indigo-500"></i> Catégorie parente <span class="text-red-500">*</span>
                        </label>
                        <select v-model="form.parentId" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="">Sélectionner une catégorie</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                        </select>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-tag text-indigo-500"></i> Nom de la sous-catégorie <span class="text-red-500">*</span>
                        </label>
                        <input type="text" v-model="form.name" placeholder="Ex: JavaScript, Python, UI/UX..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-align-left text-indigo-500"></i> Description
                        </label>
                        <textarea v-model="form.description" rows="3" placeholder="Description de la sous-catégorie..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-flag text-indigo-500"></i> Statut
                        </label>
                        <select v-model="form.status" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="active">Actif</option>
                            <option value="inactive">Inactif</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="closeModal">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveSubCategory">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleSubCategories',
    data() {
        return {
            searchTerm: '',
            perPage: 10,
            currentPage: 1,
            filterParentCategory: '',
            showModal: false,
            editingSubCategory: null,
            form: {
                parentId: '',
                name: '',
                description: '',
                status: 'active'
            },
            categories: [
                { id: 1, name: 'Développement Web', icon: 'fas fa-code' },
                { id: 2, name: 'Design Graphique', icon: 'fas fa-palette' },
                { id: 3, name: 'Marketing Digital', icon: 'fas fa-chart-line' },
                { id: 4, name: 'Business & Management', icon: 'fas fa-briefcase' },
                { id: 5, name: 'Data Science', icon: 'fas fa-database' },
                { id: 6, name: 'Cybersécurité', icon: 'fas fa-shield-alt' },
                { id: 7, name: 'Cloud Computing', icon: 'fas fa-cloud' },
                { id: 8, name: 'Langues', icon: 'fas fa-language' }
            ],
            // 10 exemples de sous-catégories
            subCategories: [
                { id: 1, name: 'JavaScript', parentId: 1, description: 'Cours JavaScript fondamentaux et avancés', status: 'active', createdAt: '2024-01-01' },
                { id: 2, name: 'Python', parentId: 1, description: 'Programmation Python pour débutants et experts', status: 'active', createdAt: '2024-01-02' },
                { id: 3, name: 'UI/UX Design', parentId: 2, description: 'Design d\'interface utilisateur', status: 'active', createdAt: '2024-01-03' },
                { id: 4, name: 'SEO', parentId: 3, description: 'Optimisation pour les moteurs de recherche', status: 'inactive', createdAt: '2024-01-04' },
                { id: 5, name: 'React', parentId: 1, description: 'Développement d\'applications avec React', status: 'active', createdAt: '2024-01-05' },
                { id: 6, name: 'Machine Learning', parentId: 5, description: 'Apprentissage automatique et IA', status: 'active', createdAt: '2024-01-06' },
                { id: 7, name: 'Leadership', parentId: 4, description: 'Gestion d\'équipe et leadership', status: 'active', createdAt: '2024-01-07' },
                { id: 8, name: 'Anglais des affaires', parentId: 8, description: 'Anglais professionnel', status: 'active', createdAt: '2024-01-08' },
                { id: 9, name: 'AWS', parentId: 7, description: 'Services Amazon Web Services', status: 'active', createdAt: '2024-01-09' },
                { id: 10, name: 'Photoshop', parentId: 2, description: 'Maîtrise de Photoshop', status: 'active', createdAt: '2024-01-10' }
            ]
        }
    },
    computed: {
        activeCount() {
            return this.subCategories.filter(s => s.status === 'active').length
        },
        filteredSubCategories() {
            let filtered = this.subCategories
            if (this.searchTerm) {
                filtered = filtered.filter(s => s.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
            }
            if (this.filterParentCategory) {
                filtered = filtered.filter(s => s.parentId == this.filterParentCategory)
            }
            return filtered
        },
        paginatedSubCategories() {
            const start = (this.currentPage - 1) * this.perPage
            return this.filteredSubCategories.slice(start, start + this.perPage)
        },
        totalPages() {
            return Math.ceil(this.filteredSubCategories.length / this.perPage) || 1
        },
        startEntry() {
            return this.filteredSubCategories.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1
        },
        endEntry() {
            return Math.min(this.currentPage * this.perPage, this.filteredSubCategories.length)
        }
    },
    watch: {
        searchTerm() { this.currentPage = 1 },
        filterParentCategory() { this.currentPage = 1 },
        perPage() { this.currentPage = 1 }
    },
    methods: {
        getParentName(parentId) {
            const parent = this.categories.find(c => c.id === parentId)
            return parent ? parent.name : '---'
        },
        openAddModal() {
            this.editingSubCategory = null
            this.form = { parentId: '', name: '', description: '', status: 'active' }
            this.showModal = true
        },
        editSubCategory(sub) {
            this.editingSubCategory = sub
            this.form = {
                parentId: sub.parentId,
                name: sub.name,
                description: sub.description,
                status: sub.status
            }
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
            this.editingSubCategory = null
        },
        saveSubCategory() {
            if (!this.form.parentId) {
                alert('Veuillez sélectionner une catégorie parente')
                return
            }
            if (!this.form.name.trim()) {
                alert('Veuillez saisir un nom de sous-catégorie')
                return
            }

            if (this.editingSubCategory) {
                const index = this.subCategories.findIndex(s => s.id === this.editingSubCategory.id)
                if (index !== -1) {
                    this.subCategories[index] = {
                        ...this.subCategories[index],
                        name: this.form.name,
                        parentId: this.form.parentId,
                        description: this.form.description,
                        status: this.form.status
                    }
                }
                alert('Sous-catégorie modifiée avec succès')
            } else {
                const newSubCategory = {
                    id: Date.now(),
                    name: this.form.name,
                    parentId: this.form.parentId,
                    description: this.form.description,
                    status: this.form.status,
                    createdAt: new Date().toISOString().split('T')[0]
                }
                this.subCategories.push(newSubCategory)
                alert('Sous-catégorie ajoutée avec succès')
            }
            this.closeModal()
        },
        deleteSubCategory(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?')) {
                this.subCategories = this.subCategories.filter(s => s.id !== id)
                alert('Sous-catégorie supprimée avec succès')
            }
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++
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

.subcategories-module {
  animation: fadeIn 0.3s ease;
}

.stats-grid .stat-card,
.table-controls,
.table-responsive,
.pagination-area {
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

/* Ligne de séparation du tableau */
.data-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
}

.data-table tbody tr:last-child {
  border-bottom: none;
}

/* Effet de survol des lignes */
.data-table tbody tr:hover {
  background: linear-gradient(90deg, #f8fafc, #ffffff);
}

/* Modal animation */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

/* Focus styles */
input:focus, select:focus, textarea:focus {
  outline: none;
  ring: 2px solid #6366f1;
}
</style>
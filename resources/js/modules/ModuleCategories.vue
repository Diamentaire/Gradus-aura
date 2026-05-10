<template>
    <div class="categories-module min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-layer-group text-indigo-500 text-2xl"></i>
                    Gestion des catégories
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez les catégories de cours et formations</p>
            </div>
            <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openAddModal">
                <i class="fas fa-plus text-sm"></i> Ajouter une catégorie
            </button>
        </div>

        <!-- Statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Total catégories</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ categories.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-layer-group text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Actives</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ activeCategoriesCount }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Inactives</p>
                    <p class="text-2xl font-bold text-rose-600">{{ inactiveCategoriesCount }}</p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-ban text-rose-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Sous-catégories</p>
                    <p class="text-2xl font-bold text-amber-600">{{ totalSubCategories }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-sitemap text-amber-500"></i>
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
            <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
                <i class="fas fa-search text-slate-400"></i>
                <input type="text" v-model="searchTerm" placeholder="Rechercher une catégorie..." class="bg-transparent border-none outline-none text-sm w-64">
            </div>
        </div>

        <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
            <table class="data-table w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-hashtag mr-1"></i>N°</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-tag mr-1"></i>Nom</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-align-left mr-1"></i>Description</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-image mr-1"></i>Image</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-flag mr-1"></i>Statut</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-calendar mr-1"></i>Date création</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="(category, idx) in paginatedCategories" :key="category.id" class="hover:bg-slate-50 transition-colors">
                        <td class="px-5 py-3 text-sm text-slate-600">{{ (currentPage - 1) * perPage + idx + 1 }}</td>
                        <td class="px-5 py-3 text-sm font-medium text-slate-800">{{ category.name }}</td>
                        <td class="px-5 py-3 text-sm text-slate-500 max-w-xs truncate">{{ category.description || '---' }}</td>
                        <td class="px-5 py-3">
                            <div class="category-image">
                                <img v-if="category.image" :src="category.image" alt="image" class="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm">
                                <div v-else class="no-image w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                                    <i class="fas fa-image"></i>
                                </div>
                            </div>
                        </td>
                        <td class="px-5 py-3">
                            <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', 
                                category.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700']">
                                <i :class="category.status === 'active' ? 'fas fa-check-circle' : 'fas fa-ban'"></i>
                                {{ category.status === 'active' ? 'Actif' : 'Inactif' }}
                            </span>
                        </td>
                        <td class="px-5 py-3 text-sm text-slate-500">{{ category.createdAt }}</td>
                        <td class="px-5 py-3">
                            <div class="actions flex items-center gap-2">
                                <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editCategory(category)" title="Modifier">
                                    <i class="fas fa-edit text-sm"></i>
                                </button>
                                <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteCategory(category.id)" title="Supprimer">
                                    <i class="fas fa-trash-alt text-sm"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedCategories.length === 0">
                        <td colspan="7" class="px-5 py-8 text-center text-slate-400">
                            <i class="fas fa-inbox text-4xl mb-2 block"></i>
                            <p>Aucune catégorie trouvée</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
            <div class="text-sm text-slate-500">
                <i class="fas fa-chart-simple mr-1"></i>
                Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredCategories.length }} entrées
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
                        <i class="fas fa-tag text-indigo-500"></i>
                        {{ editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie' }}
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            <i class="fas fa-heading text-indigo-500 mr-1"></i>Nom de la catégorie <span class="text-red-500">*</span>
                        </label>
                        <input type="text" v-model="form.name" placeholder="Ex: Développement Web" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            <i class="fas fa-align-left text-indigo-500 mr-1"></i>Description
                        </label>
                        <textarea v-model="form.description" rows="3" placeholder="Description de la catégorie..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            <i class="fas fa-image text-indigo-500 mr-1"></i>Image de la catégorie
                        </label>
                        <input type="file" @change="onImageChange" accept="image/*" class="w-full px-4 py-2 border border-slate-300 rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                        <div class="image-preview mt-3" v-if="form.imagePreview">
                            <img :src="form.imagePreview" alt="Aperçu" class="w-24 h-24 object-cover rounded-lg border border-slate-200 shadow-sm">
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            <i class="fas fa-flag text-indigo-500 mr-1"></i>Statut
                        </label>
                        <select v-model="form.status" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="active">✅ Actif</option>
                            <option value="inactive">⛔ Inactif</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="closeModal">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveCategory">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleCategories',
    data() {
        return {
            searchTerm: '',
            perPage: 10,
            currentPage: 1,
            showModal: false,
            editingCategory: null,
            form: {
                name: '',
                description: '',
                status: 'active',
                image: null,
                imagePreview: null
            },
            // 10 exemples de catégories avec images
            categories: [
                { id: 1, name: 'Développement Web', description: 'Cours de développement web front-end et back-end', status: 'active', image: 'https://picsum.photos/id/0/100/100', createdAt: '2024-01-01', subCategories: 12 },
                { id: 2, name: 'Design Graphique', description: 'Cours de design graphique, UI/UX et création visuelle', status: 'active', image: 'https://picsum.photos/id/10/100/100', createdAt: '2024-01-02', subCategories: 8 },
                { id: 3, name: 'Marketing Digital', description: 'Stratégies marketing, SEO, réseaux sociaux', status: 'active', image: 'https://picsum.photos/id/26/100/100', createdAt: '2024-01-03', subCategories: 6 },
                { id: 4, name: 'Business & Entrepreneuriat', description: 'Création d\'entreprise, gestion et leadership', status: 'inactive', image: 'https://picsum.photos/id/20/100/100', createdAt: '2024-01-04', subCategories: 5 },
                { id: 5, name: 'Photographie', description: 'Techniques photo, retouche et matériel', status: 'active', image: 'https://picsum.photos/id/15/100/100', createdAt: '2024-01-05', subCategories: 7 },
                { id: 6, name: 'Data Science', description: 'Analyse de données, machine learning et IA', status: 'active', image: 'https://picsum.photos/id/1/100/100', createdAt: '2024-01-06', subCategories: 10 },
                { id: 7, name: 'Mobile Development', description: 'Développement iOS, Android et multiplateforme', status: 'active', image: 'https://picsum.photos/id/2/100/100', createdAt: '2024-01-07', subCategories: 9 },
                { id: 8, name: 'Cybersécurité', description: 'Sécurité informatique et protection des données', status: 'active', image: 'https://picsum.photos/id/3/100/100', createdAt: '2024-01-08', subCategories: 11 },
                { id: 9, name: 'Cloud Computing', description: 'AWS, Azure, Google Cloud et DevOps', status: 'active', image: 'https://picsum.photos/id/4/100/100', createdAt: '2024-01-09', subCategories: 8 },
                { id: 10, name: 'Langues étrangères', description: 'Apprentissage des langues (Anglais, Espagnol, etc.)', status: 'inactive', image: 'https://picsum.photos/id/5/100/100', createdAt: '2024-01-10', subCategories: 4 }
            ]
        }
    },
    computed: {
        activeCategoriesCount() {
            return this.categories.filter(c => c.status === 'active').length
        },
        inactiveCategoriesCount() {
            return this.categories.filter(c => c.status === 'inactive').length
        },
        totalSubCategories() {
            return this.categories.reduce((sum, c) => sum + (c.subCategories || 0), 0)
        },
        filteredCategories() {
            if (!this.searchTerm) return this.categories
            return this.categories.filter(c => c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                (c.description && c.description.toLowerCase().includes(this.searchTerm.toLowerCase())))
        },
        paginatedCategories() {
            const start = (this.currentPage - 1) * this.perPage
            return this.filteredCategories.slice(start, start + this.perPage)
        },
        totalPages() {
            return Math.ceil(this.filteredCategories.length / this.perPage) || 1
        },
        startEntry() {
            return this.filteredCategories.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1
        },
        endEntry() {
            return Math.min(this.currentPage * this.perPage, this.filteredCategories.length)
        }
    },
    watch: {
        searchTerm() { this.currentPage = 1 },
        perPage() { this.currentPage = 1 }
    },
    methods: {
        onImageChange(event) {
            const file = event.target.files[0]
            if (file) {
                this.form.image = file
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.form.imagePreview = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },
        openAddModal() {
            this.editingCategory = null
            this.form = { name: '', description: '', status: 'active', image: null, imagePreview: null }
            this.showModal = true
        },
        editCategory(category) {
            this.editingCategory = category
            this.form = {
                name: category.name,
                description: category.description,
                status: category.status,
                image: null,
                imagePreview: category.image
            }
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
            this.editingCategory = null
        },
        saveCategory() {
            if (!this.form.name) {
                alert('Veuillez saisir un nom de catégorie')
                return
            }

            if (this.editingCategory) {
                const index = this.categories.findIndex(c => c.id === this.editingCategory.id)
                if (index !== -1) {
                    this.categories[index] = {
                        ...this.categories[index],
                        name: this.form.name,
                        description: this.form.description,
                        status: this.form.status,
                        image: this.form.imagePreview || this.categories[index].image
                    }
                }
                alert('Catégorie modifiée avec succès')
            } else {
                const newCategory = {
                    id: Date.now(),
                    name: this.form.name,
                    description: this.form.description,
                    status: this.form.status,
                    image: this.form.imagePreview || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`,
                    createdAt: new Date().toISOString().split('T')[0],
                    subCategories: 0
                }
                this.categories.push(newCategory)
                alert('Catégorie ajoutée avec succès')
            }
            this.closeModal()
        },
        deleteCategory(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
                this.categories = this.categories.filter(c => c.id !== id)
                alert('Catégorie supprimée avec succès')
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

@keyframes slideIn {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.categories-module {
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

/* Animation modal */
.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}

/* Focus styles */
input:focus, textarea:focus, select:focus {
    outline: none;
    ring: 2px solid #6366f1;
}

/* File input styling */
::file-selector-button {
    transition: all 0.2s ease;
}
</style>
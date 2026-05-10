<template>
    <div class="avis-module min-h-screen bg-slate-50 p-6">
        <div class="module-header mb-8">
            <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <i class="fas fa-star text-amber-500"></i> 
                Gestion des avis
            </h2>
            <p class="text-slate-500 text-sm mt-1">Modérez et gérez les avis des étudiants sur les formations</p>
        </div>
        
        <!-- Statistiques -->
        <div class="stats-banner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-item bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Total avis</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ avis.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-star text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-item bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Note moyenne</p>
                    <p class="text-2xl font-bold text-amber-600">{{ avgRating }} / 5</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-chart-line text-amber-500"></i>
                </div>
            </div>
            <div class="stat-item bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">En attente</p>
                    <p class="text-2xl font-bold text-orange-600">{{ pendingCount }}</p>
                </div>
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-clock text-orange-500"></i>
                </div>
            </div>
            <div class="stat-item bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Publiés</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ approvedCount }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-emerald-500"></i>
                </div>
            </div>
        </div>

        <!-- Contrôles du tableau -->
        <div class="table-controls flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm mb-6">
            <div class="entries-select flex items-center gap-2">
                <label class="text-sm text-slate-600">Afficher</label>
                <select v-model="perPage" class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                <label class="text-sm text-slate-600">entrées</label>
            </div>
            <div class="filter-group flex items-center gap-3">
                <i class="fas fa-filter text-slate-400"></i>
                <select v-model="filterStatus" class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Tous les statuts</option>
                    <option value="approved">Publiés</option>
                    <option value="pending">En attente</option>
                </select>
            </div>
            <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
                <i class="fas fa-search text-slate-400"></i>
                <input type="text" v-model="searchTerm" placeholder="Rechercher un avis..." class="bg-transparent border-none outline-none text-sm w-64">
            </div>
        </div>

        <!-- Tableau des avis -->
        <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
            <table class="data-table w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-user mr-2 text-indigo-400"></i>Utilisateur</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-graduation-cap mr-2 text-indigo-400"></i>Cours</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-star mr-2 text-indigo-400"></i>Note</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-comment mr-2 text-indigo-400"></i>Commentaire</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-calendar mr-2 text-indigo-400"></i>Date</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-flag mr-2 text-indigo-400"></i>Statut</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-2 text-indigo-400"></i>Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="(a, idx) in paginatedAvis" :key="idx" class="hover:bg-slate-50 transition-colors">
                        <td class="px-5 py-3 text-sm">
                            <div class="flex items-center gap-3">
                                <img :src="a.avatar" class="w-8 h-8 rounded-full object-cover">
                                <strong class="text-slate-800">{{ a.user }}</strong>
                            </div>
                        </td>
                        <td class="px-5 py-3 text-sm text-slate-600">{{ a.course }}</td>
                        <td class="px-5 py-3 text-sm">
                            <div class="stars flex gap-1">
                                <i v-for="n in 5" :key="n" :class="n <= a.rating ? 'fas fa-star text-amber-500' : 'far fa-star text-slate-300'"></i>
                                <span class="ml-2 text-xs text-slate-500">({{ a.rating }}/5)</span>
                            </div>
                        </td>
                        <td class="px-5 py-3 text-sm text-slate-500 max-w-xs truncate">{{ a.comment }}</td>
                        <td class="px-5 py-3 text-sm text-slate-500">{{ a.date }}</td>
                        <td class="px-5 py-3">
                            <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', 
                                a.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700']">
                                <i :class="a.status === 'approved' ? 'fas fa-check-circle' : 'fas fa-clock'"></i>
                                {{ a.status === 'approved' ? 'Publié' : 'En attente' }}
                            </span>
                        </td>
                        <td class="px-5 py-3">
                            <div class="flex items-center gap-2">
                                <button v-if="a.status === 'pending'" @click="moderateAvis(a)" 
                                    class="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors">
                                    <i class="fas fa-check"></i> Approuver
                                </button>
                                <button @click="deleteAvis(idx)" 
                                    class="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-colors">
                                    <i class="fas fa-trash-alt"></i> Supprimer
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedAvis.length === 0">
                        <td colspan="7" class="px-5 py-8 text-center text-slate-400">
                            <i class="fas fa-inbox text-4xl mb-2 block"></i>
                            <p>Aucun avis trouvé</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
            <div class="text-sm text-slate-500">
                <i class="fas fa-chart-simple mr-1"></i>
                Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredAvis.length }} entrées
            </div>
            <div class="pagination flex gap-2">
                <button @click="prevPage" :disabled="currentPage === 1" 
                    class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="fas fa-chevron-left mr-1"></i> Précédent
                </button>
                <button v-for="p in totalPages" :key="p" @click="currentPage = p" 
                    :class="['px-3 py-1.5 rounded-lg text-sm transition-colors', 
                        currentPage === p ? 'bg-indigo-500 text-white' : 'border border-slate-300 hover:bg-slate-50']">
                    {{ p }}
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages" 
                    class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Suivant <i class="fas fa-chevron-right ml-1"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleAvis',
    data() {
        return {
            searchTerm: '', 
            filterStatus: '', 
            perPage: 10, 
            currentPage: 1,
            // 10 exemples d'avis avec images
            avis: [
                { 
                    user: 'Thomas Richard', 
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                    course: 'React - La formation complète', 
                    rating: 5, 
                    comment: 'Excellent cours, très bien expliqué ! Les exercices sont pertinents et le formateur est passionnant.', 
                    date: '2024-01-18', 
                    status: 'approved' 
                },
                { 
                    user: 'Julie Petit', 
                    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                    course: 'Photoshop pour les pros', 
                    rating: 4, 
                    comment: 'Très complet, quelques passages un peu rapides mais globalement excellent.', 
                    date: '2024-01-22', 
                    status: 'approved' 
                },
                { 
                    user: 'Nicolas Legrand', 
                    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                    course: 'Stratégies SEO avancées', 
                    rating: 3, 
                    comment: 'Bon contenu mais manque d\'exemples concrets. La partie technique est bonne.', 
                    date: '2024-01-28', 
                    status: 'pending' 
                },
                { 
                    user: 'Sophie Bernard', 
                    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
                    course: 'Python pour data science', 
                    rating: 5, 
                    comment: 'Formation exceptionnelle ! Je recommande vivement à tous les débutants.', 
                    date: '2024-02-01', 
                    status: 'approved' 
                },
                { 
                    user: 'Lucas Martin', 
                    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
                    course: 'UI/UX Design Masterclass', 
                    rating: 4, 
                    comment: 'Très inspirant, j\'ai beaucoup appris sur les principes du design.', 
                    date: '2024-02-05', 
                    status: 'approved' 
                },
                { 
                    user: 'Emma Dubois', 
                    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
                    course: 'Marketing Digital 2024', 
                    rating: 5, 
                    comment: 'Un cours complet qui couvre tous les aspects du marketing digital.', 
                    date: '2024-02-10', 
                    status: 'approved' 
                },
                { 
                    user: 'Hugo Lefebvre', 
                    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
                    course: 'Laravel 11 - LMS complet', 
                    rating: 4, 
                    comment: 'Très bon cours, le formateur maîtrise parfaitement son sujet.', 
                    date: '2024-02-12', 
                    status: 'pending' 
                },
                { 
                    user: 'Chloé Garcia', 
                    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
                    course: 'Anglais des affaires', 
                    rating: 5, 
                    comment: 'Excellent pour améliorer son anglais professionnel.', 
                    date: '2024-02-15', 
                    status: 'approved' 
                },
                { 
                    user: 'Maxime Bernard', 
                    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
                    course: 'Leadership et management', 
                    rating: 4, 
                    comment: 'Des concepts intéressants à mettre en pratique.', 
                    date: '2024-02-18', 
                    status: 'pending' 
                },
                { 
                    user: 'Camille Rousseau', 
                    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
                    course: 'Deep Learning avec TensorFlow', 
                    rating: 5, 
                    comment: 'Formation de haute qualité, parfaite pour approfondir l\'IA.', 
                    date: '2024-02-20', 
                    status: 'approved' 
                }
            ]
        }
    },
    computed: {
        filteredAvis() {
            let filtered = this.avis
            if (this.searchTerm) {
                filtered = filtered.filter(a => 
                    a.comment.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    a.user.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    a.course.toLowerCase().includes(this.searchTerm.toLowerCase())
                )
            }
            if (this.filterStatus) {
                filtered = filtered.filter(a => a.status === this.filterStatus)
            }
            return filtered
        },
        paginatedAvis() { 
            const start = (this.currentPage - 1) * this.perPage
            return this.filteredAvis.slice(start, start + this.perPage) 
        },
        totalPages() { 
            return Math.ceil(this.filteredAvis.length / this.perPage) || 1
        },
        startEntry() { 
            return this.filteredAvis.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1 
        },
        endEntry() { 
            return Math.min(this.currentPage * this.perPage, this.filteredAvis.length) 
        },
        avgRating() { 
            const sum = this.avis.reduce((s, a) => s + a.rating, 0)
            return (sum / this.avis.length).toFixed(1) 
        },
        pendingCount() { 
            return this.avis.filter(a => a.status === 'pending').length 
        },
        approvedCount() { 
            return this.avis.filter(a => a.status === 'approved').length 
        }
    },
    watch: {
        searchTerm() { this.currentPage = 1 },
        filterStatus() { this.currentPage = 1 },
        perPage() { this.currentPage = 1 }
    },
    methods: {
        moderateAvis(avis) { 
            avis.status = 'approved'
            alert(`Avis de ${avis.user} approuvé et publié avec succès !`)
        },
        deleteAvis(idx) { 
            const avisToDelete = this.paginatedAvis[idx]
            if (confirm(`Supprimer l'avis de ${avisToDelete.user} ?`)) {
                const globalIndex = this.avis.findIndex(a => a.id === avisToDelete.id || 
                    (a.user === avisToDelete.user && a.date === avisToDelete.date))
                if (globalIndex !== -1) {
                    this.avis.splice(globalIndex, 1)
                } else {
                    this.avis.splice(this.avis.indexOf(avisToDelete), 1)
                }
                alert('Avis supprimé avec succès')
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

.stats-banner .stat-item,
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
    background-color: #f8fafc;
}

/* Style pour le texte tronqué */
.truncate {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
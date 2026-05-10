<template>
    <div class="utilisateurs-module min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-users text-indigo-500 text-2xl"></i>
                    Gestion des utilisateurs
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez les comptes utilisateurs de la plateforme</p>
            </div>
            <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openAddModal">
                <i class="fas fa-plus text-sm"></i> Ajouter un utilisateur
            </button>
        </div>

        <!-- Statistiques -->
        <div class="stats-banner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-item bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Total utilisateurs</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ utilisateurs.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-users text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-item bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Étudiants</p>
                    <p class="text-2xl font-bold text-blue-600">{{ studentsCount }}</p>
                </div>
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-user-graduate text-blue-500"></i>
                </div>
            </div>
            <div class="stat-item bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Instructeurs</p>
                    <p class="text-2xl font-bold text-purple-600">{{ instructorsCount }}</p>
                </div>
                <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-chalkboard-user text-purple-500"></i>
                </div>
            </div>
            <div class="stat-item bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Comptes actifs</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ activeCount }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-emerald-500"></i>
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
                <select v-model="filterRole" class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Tous les rôles</option>
                    <option value="student">Étudiants</option>
                    <option value="instructor">Instructeurs</option>
                    <option value="admin">Administrateurs</option>
                </select>
            </div>
            <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
                <i class="fas fa-search text-slate-400"></i>
                <input type="text" v-model="searchTerm" placeholder="Rechercher un utilisateur..." class="bg-transparent border-none outline-none text-sm w-64">
            </div>
        </div>

        <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
            <table class="data-table w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-hashtag mr-1"></i>N°</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-user-circle mr-1"></i>Avatar</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-user mr-1"></i>Nom</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-envelope mr-1"></i>Email</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-badge mr-1"></i>Rôle</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-book mr-1"></i>Cours inscrits</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-euro-sign mr-1"></i>Dépenses</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-calendar mr-1"></i>Inscription</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-flag mr-1"></i>Statut</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="(user, idx) in paginatedUsers" :key="user.id" class="hover:bg-slate-50 transition-colors">
                        <td class="px-4 py-3 text-sm text-slate-600">{{ idx + 1 }}</td>
                        <td class="px-4 py-3">
                            <div class="avatar-placeholder w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" :style="{ background: getAvatarColor(user.name) }">
                                {{ user.name.charAt(0).toUpperCase() }}
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm font-medium text-slate-800">{{ user.name }}</td>
                        <td class="px-4 py-3 text-sm text-slate-500">{{ user.email }}</td>
                        <td class="px-4 py-3">
                            <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
                                user.role === 'student' ? 'bg-blue-100 text-blue-700' :
                                user.role === 'instructor' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700']">
                                <i :class="user.role === 'student' ? 'fas fa-user-graduate' : user.role === 'instructor' ? 'fas fa-chalkboard-user' : 'fas fa-user-shield'"></i>
                                {{ user.role === 'student' ? 'Étudiant' : user.role === 'instructor' ? 'Instructeur' : 'Admin' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm font-semibold text-indigo-600">{{ user.enrolledCourses || 0 }}</td>
                        <td class="px-4 py-3 text-sm font-semibold text-emerald-600">{{ (user.totalSpent || 0).toFixed(2) }} F</td>
                        <td class="px-4 py-3 text-sm text-slate-500">{{ user.registeredAt }}</td>
                        <td class="px-4 py-3">
                            <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
                                user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700']">
                                <i :class="user.status === 'active' ? 'fas fa-check-circle' : 'fas fa-ban'"></i>
                                {{ user.status === 'active' ? 'Actif' : 'Inactif' }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <div class="actions flex items-center gap-2">
                                <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editUser(user)" title="Modifier">
                                    <i class="fas fa-edit text-sm"></i>
                                </button>
                                <button class="btn-toggle w-8 h-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="toggleStatus(user)" title="Changer statut">
                                    <i :class="user.status === 'active' ? 'fas fa-ban' : 'fas fa-check-circle'"></i>
                                </button>
                                <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteUser(user.id)" title="Supprimer">
                                    <i class="fas fa-trash-alt text-sm"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedUsers.length === 0">
                        <td colspan="10" class="px-4 py-8 text-center text-slate-400">
                            <i class="fas fa-inbox text-4xl mb-2 block"></i>
                            <p>Aucun utilisateur trouvé</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
            <div class="text-sm text-slate-500">
                <i class="fas fa-chart-simple mr-1"></i>
                Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredUsers.length }} entrées
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
            <div class="modal-content bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-user-plus text-indigo-500"></i>
                        {{ editingUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur' }}
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-user text-indigo-500"></i> Nom complet
                        </label>
                        <input v-model="form.name" type="text" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-envelope text-indigo-500"></i> Email
                        </label>
                        <input v-model="form.email" type="email" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-row grid grid-cols-2 gap-4 mb-4">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <i class="fas fa-badge text-indigo-500"></i> Rôle
                            </label>
                            <select v-model="form.role" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <option value="student">Étudiant</option>
                                <option value="instructor">Instructeur</option>
                                <option value="admin">Administrateur</option>
                            </select>
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
                    <div class="form-group" v-if="!editingUser">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-lock text-indigo-500"></i> Mot de passe
                        </label>
                        <input type="password" v-model="form.password" placeholder="********" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="closeModal">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveUser">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleUtilisateurs',
    data() {
        return {
            searchTerm: '', 
            filterRole: '', 
            perPage: 10, 
            currentPage: 1, 
            showModal: false, 
            editingUser: null,
            form: { name: '', email: '', role: 'student', status: 'active', password: '' },
            // 10 exemples d'utilisateurs avec avatars
            utilisateurs: [
                { id: 1, name: 'Thomas Richard', email: 'thomas.richard@email.com', role: 'student', enrolledCourses: 5, totalSpent: 349.95, registeredAt: '2024-01-10', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
                { id: 2, name: 'Julie Petit', email: 'julie.petit@email.com', role: 'student', enrolledCourses: 3, totalSpent: 209.97, registeredAt: '2024-01-12', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
                { id: 3, name: 'Nicolas Legrand', email: 'nicolas.legrand@email.com', role: 'instructor', enrolledCourses: 0, totalSpent: 0, registeredAt: '2024-01-05', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
                { id: 4, name: 'Sophie Bernard', email: 'sophie.bernard@email.com', role: 'admin', enrolledCourses: 0, totalSpent: 0, registeredAt: '2024-01-01', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
                { id: 5, name: 'Lucas Martin', email: 'lucas.martin@email.com', role: 'student', enrolledCourses: 2, totalSpent: 129.98, registeredAt: '2024-01-15', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
                { id: 6, name: 'Emma Dubois', email: 'emma.dubois@email.com', role: 'instructor', enrolledCourses: 0, totalSpent: 0, registeredAt: '2024-01-08', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
                { id: 7, name: 'Hugo Lefebvre', email: 'hugo.lefebvre@email.com', role: 'student', enrolledCourses: 1, totalSpent: 49.99, registeredAt: '2024-02-20', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
                { id: 8, name: 'Chloé Garcia', email: 'chloe.garcia@email.com', role: 'student', enrolledCourses: 4, totalSpent: 279.96, registeredAt: '2024-02-18', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
                { id: 9, name: 'Maxime Bernard', email: 'maxime.bernard@email.com', role: 'instructor', enrolledCourses: 12, totalSpent: 0, registeredAt: '2024-01-25', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
                { id: 10, name: 'Camille Rousseau', email: 'camille.rousseau@email.com', role: 'student', enrolledCourses: 3, totalSpent: 189.97, registeredAt: '2024-02-01', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' }
            ]
        }
    },
    computed: {
        filteredUsers() {
            let filtered = this.utilisateurs
            if (this.searchTerm) {
                filtered = filtered.filter(u => u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || u.email.toLowerCase().includes(this.searchTerm.toLowerCase()))
            }
            if (this.filterRole) {
                filtered = filtered.filter(u => u.role === this.filterRole)
            }
            return filtered
        },
        paginatedUsers() { 
            const start = (this.currentPage - 1) * this.perPage
            return this.filteredUsers.slice(start, start + this.perPage) 
        },
        totalPages() { 
            return Math.ceil(this.filteredUsers.length / this.perPage) || 1
        },
        startEntry() { 
            return this.filteredUsers.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1 
        },
        endEntry() { 
            return Math.min(this.currentPage * this.perPage, this.filteredUsers.length) 
        },
        studentsCount() { 
            return this.utilisateurs.filter(u => u.role === 'student').length 
        },
        instructorsCount() { 
            return this.utilisateurs.filter(u => u.role === 'instructor').length 
        },
        activeCount() { 
            return this.utilisateurs.filter(u => u.status === 'active').length 
        }
    },
    watch: {
        searchTerm() { this.currentPage = 1 },
        filterRole() { this.currentPage = 1 },
        perPage() { this.currentPage = 1 }
    },
    methods: {
        getAvatarColor(name) {
            const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#d946ef', '#f97316']
            const index = name.length % colors.length
            return colors[index]
        },
        openAddModal() { 
            this.editingUser = null
            this.form = { name: '', email: '', role: 'student', status: 'active', password: '' }
            this.showModal = true 
        },
        editUser(user) { 
            this.editingUser = user
            this.form = { name: user.name, email: user.email, role: user.role, status: user.status, password: '' }
            this.showModal = true 
        },
        saveUser() {
            if (!this.form.name || !this.form.email) {
                alert('Veuillez remplir tous les champs obligatoires')
                return
            }
            if (!this.editingUser && !this.form.password) {
                alert('Veuillez saisir un mot de passe')
                return
            }

            if (this.editingUser) {
                const idx = this.utilisateurs.findIndex(u => u.id === this.editingUser.id)
                if (idx !== -1) {
                    this.utilisateurs[idx] = { ...this.utilisateurs[idx], ...this.form }
                }
                alert('Utilisateur modifié avec succès')
            } else {
                this.utilisateurs.push({ 
                    id: Date.now(), 
                    ...this.form, 
                    registeredAt: new Date().toISOString().split('T')[0], 
                    enrolledCourses: 0, 
                    totalSpent: 0 
                })
                alert('Utilisateur ajouté avec succès')
            }
            this.closeModal()
        },
        toggleStatus(user) { 
            user.status = user.status === 'active' ? 'inactive' : 'active'
            alert(`Statut modifié en ${user.status === 'active' ? 'Actif' : 'Inactif'}`)
        },
        deleteUser(id) { 
            if (confirm('Supprimer cet utilisateur ?')) {
                this.utilisateurs = this.utilisateurs.filter(u => u.id !== id)
                alert('Utilisateur supprimé avec succès')
            }
        },
        closeModal() { 
            this.showModal = false 
            this.editingUser = null
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

.utilisateurs-module {
  animation: fadeIn 0.3s ease;
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
  background: linear-gradient(90deg, #f8fafc, #ffffff);
}

/* Modal animation */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

/* Focus styles */
input:focus, select:focus {
  outline: none;
  ring: 2px solid #6366f1;
}

/* Avatar placeholder */
.avatar-placeholder {
  transition: all 0.2s ease;
}

.avatar-placeholder:hover {
  transform: scale(1.05);
}
</style>
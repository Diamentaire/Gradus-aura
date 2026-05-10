<template>
    <div class="instructeurs-module min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-chalkboard-user text-indigo-500 text-2xl"></i>
                    Gestion des instructeurs
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez les formateurs et enseignants de la plateforme</p>
            </div>
            <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openAddModal">
                <i class="fas fa-plus text-sm"></i> Ajouter un instructeur
            </button>
        </div>

        <!-- Statistiques -->
        <div class="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card-small bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Instructeurs</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ instructeurs.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-chalkboard-user text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card-small bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Cours créés</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ totalCoursesInstructor }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-book-open text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card-small bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Étudiants</p>
                    <p class="text-2xl font-bold text-amber-600">{{ totalStudentsInstructor }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-users text-amber-500"></i>
                </div>
            </div>
            <div class="stat-card-small bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Revenus</p>
                    <p class="text-2xl font-bold text-rose-600">{{ totalRevenueInstructor }} F</p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-euro-sign text-rose-500"></i>
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
                <select v-model="filterStatus" class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Tous les statuts</option>
                    <option value="active">Actifs</option>
                    <option value="inactive">Inactifs</option>
                </select>
            </div>
            <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
                <i class="fas fa-search text-slate-400"></i>
                <input type="text" v-model="searchTerm" placeholder="Rechercher un instructeur..." class="bg-transparent border-none outline-none text-sm w-64">
            </div>
        </div>

        <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
            <table class="data-table w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-hashtag mr-1"></i>N°</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-user-circle mr-1"></i>Avatar</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-user mr-1"></i>Nom complet</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-envelope mr-1"></i>Email</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-book mr-1"></i>Cours</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-users mr-1"></i>Étudiants</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-euro-sign mr-1"></i>Revenu</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-flag mr-1"></i>Statut</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-calendar mr-1"></i>Date inscription</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="(instructor, idx) in paginatedInstructeurs" :key="instructor.id" class="hover:bg-slate-50 transition-colors">
                        <td class="px-4 py-3 text-sm text-slate-600">{{ (currentPage - 1) * perPage + idx + 1 }}</td>
                        <td class="px-4 py-3">
                            <div class="avatar w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                                <img v-if="instructor.avatar" :src="instructor.avatar" alt="avatar" class="w-full h-full object-cover">
                                <div v-else class="avatar-placeholder text-slate-400"><i class="fas fa-user text-xl"></i></div>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm font-medium text-slate-800">{{ instructor.name }}</td>
                        <td class="px-4 py-3 text-sm text-slate-500">{{ instructor.email }}</td>
                        <td class="px-4 py-3 text-sm font-semibold text-indigo-600">{{ instructor.coursesCount }}</td>
                        <td class="px-4 py-3 text-sm text-slate-600">{{ instructor.studentsCount }}</td>
                        <td class="px-4 py-3 text-sm font-semibold text-emerald-600">{{ instructor.revenue }} F</td>
                        <td class="px-4 py-3">
                            <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', 
                                instructor.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700']">
                                <i :class="instructor.status === 'active' ? 'fas fa-check-circle' : 'fas fa-ban'"></i>
                                {{ instructor.status === 'active' ? 'Actif' : 'Inactif' }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-slate-500">{{ instructor.joinedAt }}</td>
                        <td class="px-4 py-3">
                            <div class="actions flex items-center gap-2">
                                <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editInstructor(instructor)" title="Modifier">
                                    <i class="fas fa-edit text-sm"></i>
                                </button>
                                <button class="btn-toggle w-8 h-8 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="toggleStatus(instructor)" title="Changer statut">
                                    <i :class="instructor.status === 'active' ? 'fas fa-ban' : 'fas fa-check-circle'"></i>
                                </button>
                                <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteInstructor(instructor.id)" title="Supprimer">
                                    <i class="fas fa-trash-alt text-sm"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedInstructeurs.length === 0">
                        <td colspan="10" class="px-4 py-8 text-center text-slate-400">
                            <i class="fas fa-inbox text-4xl mb-2 block"></i>
                            <p>Aucun instructeur trouvé</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
            <div class="text-sm text-slate-500">
                <i class="fas fa-chart-simple mr-1"></i>
                Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredInstructeurs.length }} entrées
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
                        <i class="fas fa-user-plus text-indigo-500"></i>
                        {{ editingInstructor ? 'Modifier l\'instructeur' : 'Ajouter un instructeur' }}
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-user text-indigo-500 mr-1"></i>Nom complet <span class="text-red-500">*</span></label>
                        <input type="text" v-model="form.name" placeholder="Jean Dupont" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-envelope text-indigo-500 mr-1"></i>Email <span class="text-red-500">*</span></label>
                        <input type="email" v-model="form.email" placeholder="jean@example.com" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-graduation-cap text-indigo-500 mr-1"></i>Spécialité</label>
                        <input type="text" v-model="form.specialty" placeholder="Développement Web, React, Python..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-align-left text-indigo-500 mr-1"></i>Biographie</label>
                        <textarea v-model="form.bio" rows="3" placeholder="Présentation de l'instructeur..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-image text-indigo-500 mr-1"></i>Avatar</label>
                        <input type="file" @change="onAvatarChange" accept="image/*" class="w-full px-4 py-2 border border-slate-300 rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                        <div class="image-preview mt-3" v-if="form.avatarPreview">
                            <img :src="form.avatarPreview" alt="Aperçu" class="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-sm">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-flag text-indigo-500 mr-1"></i>Statut</label>
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
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveInstructor">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleInstructeurs',
    data() {
        return {
            searchTerm: '',
            perPage: 10,
            currentPage: 1,
            filterStatus: '',
            showModal: false,
            editingInstructor: null,
            form: {
                name: '',
                email: '',
                phone: '',
                specialty: '',
                bio: '',
                status: 'active',
                avatar: null,
                avatarPreview: null
            },
            // 10 exemples d'instructeurs avec avatars
            instructeurs: [
                { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', phone: '+33 6 12 34 56 78', specialty: 'Développement Web', coursesCount: 12, studentsCount: 845, revenue: 12450, status: 'active', joinedAt: '2023-06-01', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', bio: 'Expert en développement web avec 10 ans d\'expérience' },
                { id: 2, name: 'Marie Martin', email: 'marie.martin@email.com', phone: '+33 6 23 45 67 89', specialty: 'Design Graphique', coursesCount: 8, studentsCount: 623, revenue: 8920, status: 'active', joinedAt: '2023-07-15', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', bio: 'Designer UI/UX passionnée' },
                { id: 3, name: 'Pierre Durand', email: 'pierre.durand@email.com', phone: '+33 6 34 56 78 90', specialty: 'Marketing Digital', coursesCount: 5, studentsCount: 234, revenue: 3450, status: 'inactive', joinedAt: '2023-08-20', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', bio: 'Spécialiste SEO et marketing' },
                { id: 4, name: 'Sophie Bernard', email: 'sophie.bernard@email.com', phone: '+33 6 45 67 89 01', specialty: 'Data Science', coursesCount: 15, studentsCount: 1245, revenue: 18760, status: 'active', joinedAt: '2023-05-10', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', bio: 'Data scientist et formateur' },
                { id: 5, name: 'Thomas Richard', email: 'thomas.richard@email.com', phone: '+33 6 56 78 90 12', specialty: 'Intelligence Artificielle', coursesCount: 7, studentsCount: 456, revenue: 6780, status: 'active', joinedAt: '2023-09-01', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', bio: 'Spécialiste en IA et Machine Learning' },
                { id: 6, name: 'Julie Petit', email: 'julie.petit@email.com', phone: '+33 6 67 89 01 23', specialty: 'Cybersécurité', coursesCount: 6, studentsCount: 389, revenue: 5430, status: 'active', joinedAt: '2023-10-15', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', bio: 'Experte en sécurité informatique' },
                { id: 7, name: 'Nicolas Legrand', email: 'nicolas.legrand@email.com', phone: '+33 6 78 90 12 34', specialty: 'Cloud Computing', coursesCount: 9, studentsCount: 567, revenue: 7890, status: 'active', joinedAt: '2023-11-01', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', bio: 'Spécialiste AWS et Azure' },
                { id: 8, name: 'Emma Dubois', email: 'emma.dubois@email.com', phone: '+33 6 89 01 23 45', specialty: 'Mobile Development', coursesCount: 11, studentsCount: 723, revenue: 10120, status: 'active', joinedAt: '2023-12-10', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', bio: 'Développeuse mobile iOS et Android' },
                { id: 9, name: 'Lucas Lefebvre', email: 'lucas.lefebvre@email.com', phone: '+33 6 90 12 34 56', specialty: 'DevOps', coursesCount: 4, studentsCount: 198, revenue: 2980, status: 'inactive', joinedAt: '2024-01-20', avatar: 'https://randomuser.me/api/portraits/men/9.jpg', bio: 'Expert en CI/CD et infrastructures' },
                { id: 10, name: 'Chloé Garcia', email: 'chloe.garcia@email.com', phone: '+33 6 01 23 45 67', specialty: 'Blockchain', coursesCount: 3, studentsCount: 156, revenue: 2340, status: 'active', joinedAt: '2024-02-05', avatar: 'https://randomuser.me/api/portraits/women/10.jpg', bio: 'Spécialiste blockchain et cryptomonnaies' }
            ]
        }
    },
    computed: {
        totalCoursesInstructor() {
            return this.instructeurs.reduce((sum, i) => sum + i.coursesCount, 0)
        },
        totalStudentsInstructor() {
            return this.instructeurs.reduce((sum, i) => sum + i.studentsCount, 0)
        },
        totalRevenueInstructor() {
            return this.instructeurs.reduce((sum, i) => sum + i.revenue, 0)
        },
        filteredInstructeurs() {
            let filtered = this.instructeurs
            if (this.searchTerm) {
                filtered = filtered.filter(i => 
                    i.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    i.email.toLowerCase().includes(this.searchTerm.toLowerCase())
                )
            }
            if (this.filterStatus) {
                filtered = filtered.filter(i => i.status === this.filterStatus)
            }
            return filtered
        },
        paginatedInstructeurs() {
            const start = (this.currentPage - 1) * this.perPage
            return this.filteredInstructeurs.slice(start, start + this.perPage)
        },
        totalPages() {
            return Math.ceil(this.filteredInstructeurs.length / this.perPage) || 1
        },
        startEntry() {
            return this.filteredInstructeurs.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1
        },
        endEntry() {
            return Math.min(this.currentPage * this.perPage, this.filteredInstructeurs.length)
        }
    },
    watch: {
        searchTerm() { this.currentPage = 1 },
        filterStatus() { this.currentPage = 1 },
        perPage() { this.currentPage = 1 }
    },
    methods: {
        onAvatarChange(event) {
            const file = event.target.files[0]
            if (file) {
                this.form.avatar = file
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.form.avatarPreview = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },
        openAddModal() {
            this.editingInstructor = null
            this.form = { name: '', email: '', phone: '', specialty: '', bio: '', status: 'active', avatar: null, avatarPreview: null }
            this.showModal = true
        },
        editInstructor(instructor) {
            this.editingInstructor = instructor
            this.form = {
                name: instructor.name,
                email: instructor.email,
                phone: instructor.phone,
                specialty: instructor.specialty,
                bio: instructor.bio,
                status: instructor.status,
                avatar: null,
                avatarPreview: instructor.avatar
            }
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
            this.editingInstructor = null
        },
        saveInstructor() {
            if (!this.form.name || !this.form.email) {
                alert('Veuillez remplir tous les champs obligatoires')
                return
            }

            if (this.editingInstructor) {
                const index = this.instructeurs.findIndex(i => i.id === this.editingInstructor.id)
                if (index !== -1) {
                    this.instructeurs[index] = {
                        ...this.instructeurs[index],
                        name: this.form.name,
                        email: this.form.email,
                        phone: this.form.phone,
                        specialty: this.form.specialty,
                        bio: this.form.bio,
                        status: this.form.status,
                        avatar: this.form.avatarPreview || this.instructeurs[index].avatar
                    }
                }
                alert('Instructeur modifié avec succès')
            } else {
                const newInstructor = {
                    id: Date.now(),
                    name: this.form.name,
                    email: this.form.email,
                    phone: this.form.phone,
                    specialty: this.form.specialty,
                    bio: this.form.bio,
                    status: this.form.status,
                    avatar: this.form.avatarPreview || 'https://randomuser.me/api/portraits/lego/1.jpg',
                    coursesCount: 0,
                    studentsCount: 0,
                    revenue: 0,
                    joinedAt: new Date().toISOString().split('T')[0]
                }
                this.instructeurs.push(newInstructor)
                alert('Instructeur ajouté avec succès')
            }
            this.closeModal()
        },
        toggleStatus(instructor) {
            instructor.status = instructor.status === 'active' ? 'inactive' : 'active'
            alert(`Statut modifié: ${instructor.status === 'active' ? 'Actif' : 'Inactif'}`)
        },
        deleteInstructor(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cet instructeur ?')) {
                this.instructeurs = this.instructeurs.filter(i => i.id !== id)
                alert('Instructeur supprimé avec succès')
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

.instructeurs-module {
  animation: fadeIn 0.3s ease;
}

.stats-cards .stat-card-small,
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

/* File input styling */
::file-selector-button {
  transition: all 0.2s ease;
  cursor: pointer;
}

::file-selector-button:hover {
  background-color: #e0e7ff;
}
</style>
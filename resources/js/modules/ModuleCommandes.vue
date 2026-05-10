<template>
    <div class="commandes-module min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-shopping-cart text-indigo-500 text-2xl"></i>
                    Gestion des commandes
                </h2>
                <p class="text-slate-500 text-sm mt-1">Suivez et gérez toutes les commandes de la plateforme</p>
            </div>
            <div class="header-actions">
                <button class="btn-export bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="exportOrders">
                    <i class="fas fa-download text-sm"></i> Exporter
                </button>
            </div>
        </div>

        <!-- Statistiques -->
        <div class="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card-small bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Commandes totales</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ commandes.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-shopping-cart text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card-small bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Chiffre d'affaires</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ totalRevenue }} F</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-euro-sign text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card-small bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Commandes complétées</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ completedOrders }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card-small bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">En attente</p>
                    <p class="text-2xl font-bold text-amber-600">{{ pendingOrders }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-clock text-amber-500"></i>
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
                    <option value="completed">Complétées</option>
                    <option value="pending">En attente</option>
                    <option value="cancelled">Annulées</option>
                </select>
            </div>
            <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
                <i class="fas fa-search text-slate-400"></i>
                <input type="text" v-model="searchTerm" placeholder="Rechercher par client..." class="bg-transparent border-none outline-none text-sm w-64">
            </div>
        </div>

        <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
            <table class="data-table w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-hashtag mr-1"></i>N° commande</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-user mr-1"></i>Client</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-envelope mr-1"></i>Email</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-book mr-1"></i>Produit(s)</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-euro-sign mr-1"></i>Montant</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-calendar mr-1"></i>Date</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-credit-card mr-1"></i>Méthode</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-flag mr-1"></i>Statut</th>
                        <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="order in paginatedCommandes" :key="order.id" class="hover:bg-slate-50 transition-colors">
                        <td class="px-5 py-3 text-sm"><span class="order-id font-mono font-semibold text-indigo-600">#{{ order.id }}</span></td>
                        <td class="px-5 py-3 text-sm font-medium text-slate-800">{{ order.client }}</td>
                        <td class="px-5 py-3 text-sm text-slate-500">{{ order.email }}</td>
                        <td class="px-5 py-3 text-sm text-slate-600 max-w-xs truncate">{{ order.courses }}</td>
                        <td class="px-5 py-3 text-sm font-semibold text-emerald-600">{{ order.amount }} F</td>
                        <td class="px-5 py-3 text-sm text-slate-500">{{ order.date }}</td>
                        <td class="px-5 py-3">
                            <span class="payment-method inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs">
                                <i :class="order.paymentMethod === 'Carte bancaire' ? 'fas fa-credit-card' : 'fab fa-paypal'"></i>
                                {{ order.paymentMethod }}
                            </span>
                        </td>
                        <td class="px-5 py-3">
                            <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', 
                                order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                                order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700']">
                                <i :class="order.status === 'completed' ? 'fas fa-check-circle' : order.status === 'pending' ? 'fas fa-clock' : 'fas fa-ban'"></i>
                                {{ getStatusText(order.status) }}
                            </span>
                        </td>
                        <td class="px-5 py-3">
                            <div class="actions flex items-center gap-2">
                                <button class="btn-view w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="viewOrder(order)" title="Voir détails">
                                    <i class="fas fa-eye text-sm"></i>
                                </button>
                                <button class="btn-edit w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="updateStatus(order)" title="Modifier statut">
                                    <i class="fas fa-edit text-sm"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedCommandes.length === 0">
                        <td colspan="9" class="px-5 py-8 text-center text-slate-400">
                            <i class="fas fa-inbox text-4xl mb-2 block"></i>
                            <p>Aucune commande trouvée</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
            <div class="text-sm text-slate-500">
                <i class="fas fa-chart-simple mr-1"></i>
                Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredCommandes.length }} entrées
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

        <!-- Modal Détails commande -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showDetailModal, 'flex': showDetailModal }" @click.self="showDetailModal = false">
            <div class="modal-content bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-receipt text-indigo-500"></i>
                        Détails de la commande #{{ selectedOrder?.id }}
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="showDetailModal = false">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]" v-if="selectedOrder">
                    <div class="detail-section mb-4 pb-4 border-b border-slate-100">
                        <h4 class="text-base font-semibold text-indigo-600 mb-3 flex items-center gap-2"><i class="fas fa-user-circle"></i> Informations client</h4>
                        <p class="text-sm mb-2"><strong class="text-slate-700 w-24 inline-block">Nom:</strong> <span class="text-slate-600">{{ selectedOrder.client }}</span></p>
                        <p class="text-sm mb-2"><strong class="text-slate-700 w-24 inline-block">Email:</strong> <span class="text-slate-600">{{ selectedOrder.email }}</span></p>
                    </div>
                    <div class="detail-section mb-4 pb-4 border-b border-slate-100">
                        <h4 class="text-base font-semibold text-indigo-600 mb-3 flex items-center gap-2"><i class="fas fa-shopping-bag"></i> Informations commande</h4>
                        <p class="text-sm mb-2"><strong class="text-slate-700 w-24 inline-block">Cours:</strong> <span class="text-slate-600">{{ selectedOrder.courses }}</span></p>
                        <p class="text-sm mb-2"><strong class="text-slate-700 w-24 inline-block">Montant:</strong> <span class="text-emerald-600 font-semibold">{{ selectedOrder.amount }} €</span></p>
                        <p class="text-sm mb-2"><strong class="text-slate-700 w-24 inline-block">Date:</strong> <span class="text-slate-600">{{ selectedOrder.date }}</span></p>
                        <p class="text-sm mb-2"><strong class="text-slate-700 w-24 inline-block">Paiement:</strong> <span class="text-slate-600">{{ selectedOrder.paymentMethod }}</span></p>
                        <p class="text-sm mb-2"><strong class="text-slate-700 w-24 inline-block">Statut:</strong>
                            <span :class="['inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ml-2', 
                                selectedOrder.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                                selectedOrder.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700']">
                                <i :class="selectedOrder.status === 'completed' ? 'fas fa-check-circle' : selectedOrder.status === 'pending' ? 'fas fa-clock' : 'fas fa-ban'"></i>
                                {{ getStatusText(selectedOrder.status) }}
                            </span>
                        </p>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="showDetailModal = false">
                        <i class="fas fa-times"></i> Fermer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleCommandes',
    data() {
        return {
            searchTerm: '',
            perPage: 10,
            currentPage: 1,
            filterStatus: '',
            showDetailModal: false,
            selectedOrder: null,
            // 10 exemples de commandes
            commandes: [
                { id: 'CMD-001', client: 'Thomas Richard', email: 'thomas.richard@email.com', courses: 'React - La formation complète', amount: 89.99, date: '2024-01-15', paymentMethod: 'Carte bancaire', status: 'completed' },
                { id: 'CMD-002', client: 'Julie Petit', email: 'julie.petit@email.com', courses: 'Photoshop pour les pros', amount: 69.99, date: '2024-01-20', paymentMethod: 'PayPal', status: 'completed' },
                { id: 'CMD-003', client: 'Nicolas Legrand', email: 'nicolas.legrand@email.com', courses: 'Stratégies SEO avancées', amount: 79.99, date: '2024-01-25', paymentMethod: 'Carte bancaire', status: 'pending' },
                { id: 'CMD-004', client: 'Sophie Bernard', email: 'sophie.bernard@email.com', courses: 'Python pour débutants', amount: 49.99, date: '2024-02-01', paymentMethod: 'PayPal', status: 'completed' },
                { id: 'CMD-005', client: 'Pierre Martin', email: 'pierre.martin@email.com', courses: 'Marketing digital 2024', amount: 99.99, date: '2024-02-05', paymentMethod: 'Carte bancaire', status: 'cancelled' },
                { id: 'CMD-006', client: 'Marie Dubois', email: 'marie.dubois@email.com', courses: 'UI/UX Design Masterclass', amount: 129.99, date: '2024-02-10', paymentMethod: 'PayPal', status: 'completed' },
                { id: 'CMD-007', client: 'Lucas Lefebvre', email: 'lucas.lefebvre@email.com', courses: 'Data Science avec Python', amount: 149.99, date: '2024-02-12', paymentMethod: 'Carte bancaire', status: 'pending' },
                { id: 'CMD-008', client: 'Emma Rousseau', email: 'emma.rousseau@email.com', courses: 'Développement Mobile Flutter', amount: 79.99, date: '2024-02-15', paymentMethod: 'PayPal', status: 'completed' },
                { id: 'CMD-009', client: 'Hugo Moreau', email: 'hugo.moreau@email.com', courses: 'Cybersécurité - Fondamentaux', amount: 119.99, date: '2024-02-18', paymentMethod: 'Carte bancaire', status: 'cancelled' },
                { id: 'CMD-010', client: 'Chloé Girard', email: 'chloe.girard@email.com', courses: 'Cloud Computing AWS', amount: 199.99, date: '2024-02-20', paymentMethod: 'PayPal', status: 'completed' }
            ]
        }
    },
    computed: {
        totalRevenue() {
            return this.commandes.reduce((sum, o) => o.status === 'completed' ? sum + o.amount : sum, 0).toFixed(2)
        },
        completedOrders() {
            return this.commandes.filter(o => o.status === 'completed').length
        },
        pendingOrders() {
            return this.commandes.filter(o => o.status === 'pending').length
        },
        filteredCommandes() {
            let filtered = this.commandes
            if (this.searchTerm) {
                filtered = filtered.filter(o => 
                    o.client.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    o.email.toLowerCase().includes(this.searchTerm.toLowerCase())
                )
            }
            if (this.filterStatus) {
                filtered = filtered.filter(o => o.status === this.filterStatus)
            }
            return filtered
        },
        paginatedCommandes() {
            const start = (this.currentPage - 1) * this.perPage
            return this.filteredCommandes.slice(start, start + this.perPage)
        },
        totalPages() {
            return Math.ceil(this.filteredCommandes.length / this.perPage) || 1
        },
        startEntry() {
            return this.filteredCommandes.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1
        },
        endEntry() {
            return Math.min(this.currentPage * this.perPage, this.filteredCommandes.length)
        }
    },
    watch: {
        searchTerm() { this.currentPage = 1 },
        filterStatus() { this.currentPage = 1 },
        perPage() { this.currentPage = 1 }
    },
    methods: {
        getStatusText(status) {
            const statusMap = {
                completed: 'Complétée',
                pending: 'En attente',
                cancelled: 'Annulée'
            }
            return statusMap[status] || status
        },
        viewOrder(order) {
            this.selectedOrder = order
            this.showDetailModal = true
        },
        updateStatus(order) {
            const newStatus = prompt('Changer le statut de la commande (completed/pending/cancelled):', order.status)
            if (newStatus && ['completed', 'pending', 'cancelled'].includes(newStatus)) {
                order.status = newStatus
                alert(`Statut modifié en: ${this.getStatusText(newStatus)}`)
            }
        },
        exportOrders() {
            const data = this.commandes.map(o => `${o.id},${o.client},${o.email},${o.courses},${o.amount},${o.date},${o.status}`).join('\n')
            const blob = new Blob([`ID,Client,Email,Cours,Montant,Date,Statut\n${data}`], { type: 'text/csv' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'commandes.csv'
            link.click()
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

.commandes-module {
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
input:focus, select:focus {
    outline: none;
    ring: 2px solid #6366f1;
}
</style>
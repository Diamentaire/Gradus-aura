<template>
  <div class="subscriber-module min-h-screen bg-slate-50 p-6">
    <div class="module-header flex justify-between items-center mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <i class="fas fa-users text-indigo-500 text-2xl"></i>
          Liste des abonnés
        </h2>
        <p class="text-slate-500 text-sm mt-1">Gérez les abonnés à la newsletter et envoyez des communications</p>
      </div>
      <div class="header-actions flex gap-3">
        <button class="btn-export bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-indigo-200" @click="exportSubscribers">
          <i class="fas fa-download text-sm"></i> Exporter
        </button>
        <button class="btn-send-all bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openSendAllModal">
          <i class="fas fa-envelope text-sm"></i> Envoyer à tous
        </button>
      </div>
    </div>

    <!-- Statistiques -->
    <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Total abonnés</p>
          <p class="text-2xl font-bold text-indigo-600">{{ subscribers.length }}</p>
        </div>
        <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <i class="fas fa-users text-indigo-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Nouveaux (7j)</p>
          <p class="text-2xl font-bold text-emerald-600">{{ newSubscribersCount }}</p>
        </div>
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <i class="fas fa-user-plus text-emerald-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Emails envoyés</p>
          <p class="text-2xl font-bold text-amber-600">1,247</p>
        </div>
        <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <i class="fas fa-envelope-open-text text-amber-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Taux d'ouverture</p>
          <p class="text-2xl font-bold text-rose-600">68%</p>
        </div>
        <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
          <i class="fas fa-chart-line text-rose-500"></i>
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
      <div class="bulk-actions flex gap-2">
        <button @click="selectAll" class="btn-select-all px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-all duration-200 flex items-center gap-2">
          <i class="fas fa-check-double"></i> Tout sélectionner
        </button>
        <button @click="deleteSelected" class="btn-delete-bulk px-4 py-1.5 bg-red-50 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" :disabled="selectedIds.length === 0">
          <i class="fas fa-trash-alt"></i> Supprimer sélection
        </button>
      </div>
      <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
        <i class="fas fa-search text-slate-400"></i>
        <input type="text" v-model="searchTerm" placeholder="Rechercher un email..." class="bg-transparent border-none outline-none text-sm w-64">
      </div>
    </div>

    <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="data-table w-full">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-4 py-3 text-left w-10"><input type="checkbox" @change="toggleAll" v-model="allSelected" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"></th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-envelope mr-1"></i>Email</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-calendar mr-1"></i>Date d'inscription</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="subscriber in paginatedSubscribers" :key="subscriber.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-4 py-3"><input type="checkbox" v-model="selectedIds" :value="subscriber.id" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"></td>
            <td class="px-4 py-3 text-sm text-slate-700 font-medium">{{ subscriber.email }}</td>
            <td class="px-4 py-3">
              <div class="text-sm text-slate-600">{{ subscriber.createdAt }}</div>
              <small class="date-relative text-xs text-slate-400 flex items-center gap-1 mt-0.5"><i class="far fa-clock"></i> {{ subscriber.createdRelative }}</small>
            </td>
            <td class="px-4 py-3">
              <div class="actions flex gap-2">
                <button class="btn-send w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="sendToSubscriber(subscriber)" title="Envoyer un email">
                  <i class="fas fa-envelope text-sm"></i>
                </button>
                <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteSubscriber(subscriber.id)" title="Supprimer">
                  <i class="fas fa-trash-alt text-sm"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedSubscribers.length === 0">
            <td colspan="4" class="px-4 py-8 text-center text-slate-400">
              <i class="fas fa-inbox text-4xl mb-2 block"></i>
              <p>Aucun abonné trouvé</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
      <div class="text-sm text-slate-500">
        <i class="fas fa-chart-simple mr-1"></i>
        Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredSubscribers.length }} entrées
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

    <!-- Modal d'envoi d'email -->
    <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showSendModal, 'flex': showSendModal }" @click.self="closeSendModal">
      <div class="modal-content bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
        <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <i class="fas fa-paper-plane text-indigo-500"></i> Envoyer un email promotionnel
          </h3>
          <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="closeSendModal">&times;</button>
        </div>
        <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-users text-indigo-500"></i> Destinataires
            </label>
            <input type="text" :value="sendTarget" readonly class="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-600 cursor-not-allowed">
          </div>
          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-heading text-indigo-500"></i> Sujet
            </label>
            <input type="text" v-model="emailForm.subject" placeholder="Nouveau cours disponible !" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          </div>
          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-file-alt text-indigo-500"></i> Modèle d'email
            </label>
            <select v-model="emailForm.template" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="new_course">Nouveau cours lancé</option>
              <option value="promotion">Offre promotionnelle</option>
              <option value="newsletter">Newsletter</option>
              <option value="custom">Personnalisé</option>
            </select>
          </div>
          <div class="form-group">
            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <i class="fas fa-comment-dots text-indigo-500"></i> Message
            </label>
            <textarea v-model="emailForm.message" rows="6" placeholder="Votre message ici..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
            <small class="text-xs text-slate-400 mt-1 block">Longueur: {{ emailForm.message.length }} caractères</small>
          </div>
        </div>
        <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
          <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="closeSendModal">
            <i class="fas fa-times"></i> Annuler
          </button>
          <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="sendEmail" :disabled="sending">
            <i v-if="sending" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-paper-plane"></i>
            {{ sending ? 'Envoi en cours...' : 'Envoyer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleManageSubscriber',
  data() {
    return {
      searchTerm: '',
      perPage: 10,
      currentPage: 1,
      selectedIds: [],
      allSelected: false,
      showSendModal: false,
      sending: false,
      sendTarget: '',
      emailForm: { subject: '', template: 'new_course', message: '' },
      // 10 exemples d'abonnés
      subscribers: [
        { id: 1, email: 'jean.dupont@email.com', createdAt: '2025-05-01', createdRelative: 'il y a 7 jours', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, email: 'marie.martin@email.com', createdAt: '2025-05-02', createdRelative: 'il y a 6 jours', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, email: 'pierre.durand@email.com', createdAt: '2025-05-03', createdRelative: 'il y a 5 jours', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, email: 'sophie.bernard@email.com', createdAt: '2025-05-04', createdRelative: 'il y a 4 jours', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: 5, email: 'thomas.richard@email.com', createdAt: '2025-05-05', createdRelative: 'il y a 3 jours', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { id: 6, email: 'julie.petit@email.com', createdAt: '2025-05-06', createdRelative: 'il y a 2 jours', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { id: 7, email: 'nicolas.legrand@email.com', createdAt: '2025-05-07', createdRelative: 'hier', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { id: 8, email: 'emma.dubois@email.com', createdAt: '2025-05-08', createdRelative: 'aujourd\'hui', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { id: 9, email: 'lucas.lefebvre@email.com', createdAt: '2025-04-28', createdRelative: 'il y a 10 jours', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
        { id: 10, email: 'chloe.garcia@email.com', createdAt: '2025-04-25', createdRelative: 'il y a 13 jours', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' }
      ]
    }
  },
  computed: {
    newSubscribersCount() {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return this.subscribers.filter(s => new Date(s.createdAt) >= sevenDaysAgo).length
    },
    filteredSubscribers() {
      if (!this.searchTerm) return this.subscribers
      return this.subscribers.filter(s => s.email.toLowerCase().includes(this.searchTerm.toLowerCase()))
    },
    paginatedSubscribers() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredSubscribers.slice(start, start + this.perPage)
    },
    totalPages() { 
      return Math.ceil(this.filteredSubscribers.length / this.perPage) || 1
    },
    startEntry() { 
      return this.filteredSubscribers.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1 
    },
    endEntry() { 
      return Math.min(this.currentPage * this.perPage, this.filteredSubscribers.length) 
    }
  },
  watch: {
    searchTerm() { this.currentPage = 1 },
    perPage() { this.currentPage = 1 },
    selectedIds() { 
      this.allSelected = this.selectedIds.length === this.paginatedSubscribers.length && this.paginatedSubscribers.length > 0 
    }
  },
  methods: {
    toggleAll() {
      if (this.allSelected) this.selectedIds = this.paginatedSubscribers.map(s => s.id)
      else this.selectedIds = []
    },
    selectAll() { 
      this.selectedIds = this.paginatedSubscribers.map(s => s.id)
    },
    deleteSelected() {
      if (confirm(`Supprimer ${this.selectedIds.length} abonné(s) ?`)) {
        this.subscribers = this.subscribers.filter(s => !this.selectedIds.includes(s.id))
        this.selectedIds = []
        alert(`${this.selectedIds.length} abonné(s) supprimé(s)`)
      }
    },
    deleteSubscriber(id) {
      if (confirm('Supprimer cet abonné ?')) {
        this.subscribers = this.subscribers.filter(s => s.id !== id)
        alert('Abonné supprimé avec succès')
      }
    },
    sendToSubscriber(subscriber) {
      this.sendTarget = subscriber.email
      this.emailForm = { subject: '', template: 'new_course', message: '' }
      this.showSendModal = true
    },
    openSendAllModal() {
      this.sendTarget = `${this.subscribers.length} abonné(s)`
      this.emailForm = { subject: 'Newsletter EduPlatform', template: 'newsletter', message: 'Découvrez nos nouveaux cours et promotions du mois !' }
      this.showSendModal = true
    },
    closeSendModal() { 
      this.showSendModal = false 
    },
    sendEmail() {
      if (!this.emailForm.subject) {
        alert('Veuillez saisir un sujet')
        return
      }
      if (!this.emailForm.message) {
        alert('Veuillez saisir un message')
        return
      }
      this.sending = true
      setTimeout(() => {
        alert(`Email envoyé à ${this.sendTarget} avec succès !`)
        this.sending = false
        this.closeSendModal()
      }, 1500)
    },
    exportSubscribers() {
      const data = this.subscribers.map(s => `${s.email},${s.createdAt}`).join('\n')
      const blob = new Blob([`Email,Date d'inscription\n${data}`], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `abonnes_${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      alert('Export CSV effectué avec succès')
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

.subscriber-module {
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

/* Checkbox styling */
input[type="checkbox"] {
  cursor: pointer;
  accent-color: #6366f1;
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
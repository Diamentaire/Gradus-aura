<template>
  <div class="dashboard-module min-h-screen bg-slate-50 p-6">
    <!-- Statistiques -->
    <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div class="stat-card bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-slate-100" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon w-14 h-14 rounded-xl flex items-center justify-center text-2xl" :style="{ background: stat.iconBg, color: stat.iconColor }">
          <i :class="stat.icon"></i>
        </div>
        <div class="stat-info flex-1">
          <h3 class="text-2xl font-bold text-slate-800">{{ stat.value }}</h3>
          <p class="text-sm text-slate-500">{{ stat.label }}</p>
          <span class="stat-trend text-xs inline-flex items-center gap-1 mt-1" :class="stat.trend >= 0 ? 'text-emerald-600' : 'text-red-600'">
            <i :class="stat.trend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
            {{ Math.abs(stat.trend) }}% depuis la semaine dernière
          </span>
        </div>
      </div>
    </div>

    <!-- Graphique des ventes -->
    <div class="chart-section mb-8">
      <div class="chart-card bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div class="chart-header flex justify-between items-center mb-5 flex-wrap gap-4">
          <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <i class="fas fa-chart-line text-indigo-500"></i> Aperçu des ventes
          </h3>
          <div class="chart-tabs flex gap-2">
            <button :class="{ active: chartType === 'orders' }" @click="chartType = 'orders'" 
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-slate-200 hover:bg-indigo-500 hover:text-white">
              Commandes
            </button>
            <button :class="{ active: chartType === 'courses' }" @click="chartType = 'courses'"
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-slate-200 hover:bg-indigo-500 hover:text-white">
              Cours
            </button>
          </div>
        </div>
        <canvas ref="salesChart" class="w-full" style="max-height: 320px;"></canvas>
      </div>
    </div>

    <!-- Liste des contacts récents -->
    <div class="contact-section bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <div class="section-header flex justify-between items-center mb-5">
        <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <i class="fas fa-address-book text-indigo-500"></i> Derniers contacts
        </h3>
        <button class="btn-view-all text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 transition">
          Voir tous <i class="fas fa-arrow-right text-xs"></i>
        </button>
      </div>
      <div class="table-responsive overflow-x-auto">
        <table class="contact-table w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="py-3 px-2 text-left w-10"><input type="checkbox" class="w-4 h-4 rounded border-slate-300"></th>
              <th class="py-3 px-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-user mr-1"></i>Nom</th>
              <th class="py-3 px-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-envelope mr-1"></i>Email</th>
              <th class="py-3 px-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-tag mr-1"></i>Sujet</th>
              <th class="py-3 px-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-calendar mr-1"></i>Date</th>
              <th class="py-3 px-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in recentContacts" :key="contact.id" class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="py-3 px-2"><input type="checkbox" class="w-4 h-4 rounded border-slate-300"></td>
              <td class="py-3 px-2">
                <div class="flex items-center gap-2">
                  <img :src="contact.avatar" class="w-8 h-8 rounded-full object-cover">
                  <span class="font-medium text-slate-700">{{ contact.name }}</span>
                </div>
              </td>
              <td class="py-3 px-2 text-sm text-slate-500">{{ contact.email }}</td>
              <td class="py-3 px-2 text-sm text-slate-500">{{ contact.subject }}</td>
              <td class="py-3 px-2 text-sm text-slate-500">{{ contact.date }}</td>
              <td class="py-3 px-2">
                <div class="actions flex gap-2">
                  <button class="btn-view w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="viewContact(contact)" title="Détails">
                    <i class="fas fa-eye text-sm"></i>
                  </button>
                  <button class="btn-edit-sm w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editContact(contact)" title="Modifier">
                    <i class="fas fa-edit text-sm"></i>
                  </button>
                  <button class="btn-delete-sm w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteContact(contact.id)" title="Supprimer">
                    <i class="fas fa-trash-alt text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="recentContacts.length === 0">
              <td colspan="6" class="py-8 text-center text-slate-400">
                <i class="fas fa-inbox text-4xl mb-2 block"></i>
                <p>Aucun contact récent</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'ModuleDashboard',
  data() {
    return {
      chartType: 'orders',
      chart: null,
      stats: [
        { label: 'Commandes totales', value: '124', icon: 'fas fa-shopping-cart', iconBg: 'rgba(99,102,241,0.1)', iconColor: '#6366f1', trend: 12.5 },
        { label: 'Gains totaux', value: '12 845 €', icon: 'fas fa-euro-sign', iconBg: 'rgba(16,185,129,0.1)', iconColor: '#10b981', trend: 8.3 },
        { label: 'Étudiants', value: '1 247', icon: 'fas fa-users', iconBg: 'rgba(59,130,246,0.1)', iconColor: '#3b82f6', trend: 15.2 },
        { label: 'Instructeurs', value: '48', icon: 'fas fa-chalkboard-user', iconBg: 'rgba(245,158,11,0.1)', iconColor: '#f59e0b', trend: 10.5 }
      ],
      // 10 exemples de contacts récents avec images
      recentContacts: [
        { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', subject: 'Question sur le cours React', date: '2024-05-15', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Marie Martin', email: 'marie.martin@email.com', subject: 'Support technique pour connexion', date: '2024-05-14', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Pierre Durand', email: 'pierre.durand@email.com', subject: 'Devenir instructeur sur la plateforme', date: '2024-05-13', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'Sophie Bernard', email: 'sophie.bernard@email.com', subject: 'Demande de remboursement', date: '2024-05-12', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: 5, name: 'Thomas Richard', email: 'thomas.richard@email.com', subject: 'Certification après formation', date: '2024-05-11', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { id: 6, name: 'Julie Petit', email: 'julie.petit@email.com', subject: 'Problème d\'accès au cours', date: '2024-05-10', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { id: 7, name: 'Nicolas Legrand', email: 'nicolas.legrand@email.com', subject: 'Question sur le planning', date: '2024-05-09', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { id: 8, name: 'Emma Dubois', email: 'emma.dubois@email.com', subject: 'Recommandation de cours', date: '2024-05-08', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { id: 9, name: 'Lucas Lefebvre', email: 'lucas.lefebvre@email.com', subject: 'Demande de partenariat', date: '2024-05-07', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
        { id: 10, name: 'Chloé Garcia', email: 'chloe.garcia@email.com', subject: 'Information sur les prix', date: '2024-05-06', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' }
      ],
      ordersData: [2, 3, 4, 5, 6, 5, 7, 6, 8, 6, 5, 6],
      coursesData: [1, 2, 3, 4, 5, 4, 6, 5, 7, 5, 4, 5],
      months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
    }
  },
  mounted() {
    this.initChart()
  },
  watch: {
    chartType() {
      this.updateChart()
    }
  },
  methods: {
    initChart() {
      const ctx = this.$refs.salesChart?.getContext('2d')
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.months,
            datasets: [{
              label: this.chartType === 'orders' ? 'Commandes' : 'Cours',
              data: this.chartType === 'orders' ? this.ordersData : this.coursesData,
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99,102,241,0.05)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#6366f1',
              pointBorderColor: '#6366f1',
              pointRadius: 4,
              pointHoverRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { 
              legend: { position: 'top' },
              tooltip: { mode: 'index', intersect: false }
            },
            scales: {
              y: { 
                beginAtZero: true, 
                title: { display: true, text: 'Nombre', color: '#64748b' },
                grid: { color: '#e2e8f0' }
              },
              x: { 
                title: { display: true, text: 'Mois', color: '#64748b' },
                grid: { display: false }
              }
            }
          }
        })
      }
    },
    updateChart() {
      if (this.chart) {
        this.chart.data.datasets[0].label = this.chartType === 'orders' ? 'Commandes' : 'Cours'
        this.chart.data.datasets[0].data = this.chartType === 'orders' ? this.ordersData : this.coursesData
        this.chart.update()
      }
    },
    viewContact(contact) { 
      alert(`Détails du contact: ${contact.name}\nEmail: ${contact.email}\nSujet: ${contact.subject}\nDate: ${contact.date}`)
    },
    editContact(contact) { 
      alert(`Modifier le contact: ${contact.name}`)
    },
    deleteContact(id) { 
      if (confirm('Supprimer ce contact ?')) {
        alert('Contact supprimé')
      }
    }
  }
}
</script>

<style scoped>
/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dashboard-module {
  animation: fadeIn 0.3s ease;
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

/* Effet de survol pour les cartes */
.stat-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-4px);
}

/* Style pour le graphique */
canvas {
  max-height: 320px;
  width: 100%;
}

/* Style pour les onglets actifs */
.chart-tabs button.active {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
}

/* Style pour le tableau au survol */
.contact-table tbody tr:hover {
  background-color: #f8fafc;
}

/* Checkbox styling */
input[type="checkbox"] {
  cursor: pointer;
  accent-color: #6366f1;
}
</style>
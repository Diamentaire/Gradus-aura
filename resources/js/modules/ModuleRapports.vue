<template>
    <div class="rapports-module min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-chart-line text-indigo-500 text-2xl"></i>
                    Gestion des rapports
                </h2>
                <p class="text-slate-500 text-sm mt-1">Analysez les performances et les ventes de la plateforme</p>
            </div>
            <button class="btn-export bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="exportRapport">
                <i class="fas fa-download text-sm"></i> Exporter le rapport
            </button>
        </div>

        <!-- Période de sélection -->
        <div class="date-range bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
            <div class="flex flex-wrap gap-5 items-end">
                <div class="form-group">
                    <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <i class="fas fa-calendar-alt text-indigo-500"></i> Date de début
                    </label>
                    <input type="date" v-model="dateStart" class="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                </div>
                <div class="form-group">
                    <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <i class="fas fa-calendar-check text-indigo-500"></i> Date de fin
                    </label>
                    <input type="date" v-model="dateEnd" class="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                </div>
                <button class="btn-apply bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm" @click="applyDateRange">
                    <i class="fas fa-check"></i> Appliquer
                </button>
            </div>
        </div>

        <!-- Cartes statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div class="stat-card bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
                <div class="stat-icon w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <i class="fas fa-shopping-cart text-2xl text-indigo-600"></i>
                </div>
                <div class="stat-info">
                    <h3 class="text-2xl font-bold text-slate-800">{{ totalVentes }}</h3>
                    <p class="text-sm text-slate-500">Ventes totales</p>
                    <span class="trend positive text-xs text-emerald-600 flex items-center gap-1 mt-1"><i class="fas fa-arrow-up"></i> +12.5%</span>
                </div>
            </div>
            <div class="stat-card bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
                <div class="stat-icon w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <i class="fas fa-euro-sign text-2xl text-emerald-600"></i>
                </div>
                <div class="stat-info">
                    <h3 class="text-2xl font-bold text-slate-800">{{ chiffreAffaire }} F</h3>
                    <p class="text-sm text-slate-500">Chiffre d'affaires</p>
                    <span class="trend positive text-xs text-emerald-600 flex items-center gap-1 mt-1"><i class="fas fa-arrow-up"></i> +8.3%</span>
                </div>
            </div>
            <div class="stat-card bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
                <div class="stat-icon w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                    <i class="fas fa-users text-2xl text-blue-600"></i>
                </div>
                <div class="stat-info">
                    <h3 class="text-2xl font-bold text-slate-800">{{ nouveauxUtilisateurs }}</h3>
                    <p class="text-sm text-slate-500">Nouveaux utilisateurs</p>
                    <span class="trend positive text-xs text-emerald-600 flex items-center gap-1 mt-1"><i class="fas fa-arrow-up"></i> +15.2%</span>
                </div>
            </div>
            <div class="stat-card bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
                <div class="stat-icon w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
                    <i class="fas fa-book text-2xl text-orange-600"></i>
                </div>
                <div class="stat-info">
                    <h3 class="text-2xl font-bold text-slate-800">{{ nouveauxCours }}</h3>
                    <p class="text-sm text-slate-500">Nouveaux cours</p>
                    <span class="trend negative text-xs text-red-500 flex items-center gap-1 mt-1"><i class="fas fa-arrow-down"></i> -3.1%</span>
                </div>
            </div>
        </div>

        <!-- Graphiques -->
        <div class="charts-row grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="chart-card bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-chart-line text-indigo-500"></i> Évolution des ventes
                </h3>
                <canvas ref="salesChart" class="w-full" style="max-height: 300px;"></canvas>
            </div>
            <div class="chart-card bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-chart-pie text-indigo-500"></i> Top catégories
                </h3>
                <canvas ref="categoriesChart" class="w-full" style="max-height: 300px;"></canvas>
            </div>
        </div>

        <!-- Tableau des meilleures ventes -->
        <div class="table-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="card-header flex flex-wrap justify-between items-center gap-4 p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <i class="fas fa-trophy text-amber-500"></i> Meilleures ventes
                </h3>
                <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
                    <i class="fas fa-search text-slate-400"></i>
                    <input type="text" v-model="searchTerm" placeholder="Rechercher un cours..." class="bg-transparent border-none outline-none text-sm w-64">
                </div>
            </div>
            <div class="table-responsive overflow-x-auto">
                <table class="data-table w-full">
                    <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-book mr-1"></i>Cours</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-folder mr-1"></i>Catégorie</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-chart-simple mr-1"></i>Ventes</th>
                            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-euro-sign mr-1"></i>Revenu</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="item in filteredTopVentes" :key="item.name" class="hover:bg-slate-50 transition-colors">
                            <td class="px-5 py-3 text-sm font-medium text-slate-700">{{ item.name }}</td>
                            <td class="px-5 py-3 text-sm text-slate-500">
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" :class="getCategoryBadgeClass(item.category)">
                                    <i :class="getCategoryIcon(item.category)" class="text-xs"></i> {{ item.category }}
                                </span>
                            </td>
                            <td class="px-5 py-3 text-sm font-semibold text-indigo-600">{{ item.sales }}</td>
                            <td class="px-5 py-3 text-sm font-semibold text-emerald-600">{{ item.revenue.toLocaleString() }} F</td>
                        </tr>
                        <tr v-if="filteredTopVentes.length === 0">
                            <td colspan="4" class="px-5 py-8 text-center text-slate-400">
                                <i class="fas fa-inbox text-4xl mb-2 block"></i>
                                <p>Aucun résultat trouvé</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Section d'export avancé -->
        <div class="export-section mt-6 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-wrap justify-between items-center gap-4">
            <div class="flex items-center gap-3">
                <i class="fas fa-file-export text-2xl text-indigo-500"></i>
                <div>
                    <p class="text-sm font-semibold text-slate-700">Exporter les données</p>
                    <p class="text-xs text-slate-400">Formats disponibles : CSV, Excel, PDF</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button class="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200 transition flex items-center gap-2" @click="exportCSV">
                    <i class="fas fa-file-csv"></i> CSV
                </button>
                <button class="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200 transition flex items-center gap-2" @click="exportExcel">
                    <i class="fas fa-file-excel text-emerald-600"></i> Excel
                </button>
                <button class="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200 transition flex items-center gap-2" @click="exportPDF">
                    <i class="fas fa-file-pdf text-red-500"></i> PDF
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
    name: 'ModuleRapports',
    data() {
        return {
            dateStart: '2024-01-01',
            dateEnd: new Date().toISOString().split('T')[0],
            searchTerm: '',
            salesChart: null,
            categoriesChart: null,
            // 10 exemples de meilleures ventes
            topVentes: [
                { name: 'React - La formation complète', category: 'Développement', sales: 342, revenue: 30558 },
                { name: 'Photoshop pour les pros', category: 'Design', sales: 234, revenue: 16366 },
                { name: 'Python pour data science', category: 'Data', sales: 189, revenue: 17010 },
                { name: 'SEO avancé', category: 'Marketing', sales: 156, revenue: 12444 },
                { name: 'UI/UX Design Masterclass', category: 'Design', sales: 145, revenue: 11600 },
                { name: 'Laravel 11 - LMS complet', category: 'Développement', sales: 128, revenue: 15360 },
                { name: 'Marketing Digital 2024', category: 'Marketing', sales: 112, revenue: 8960 },
                { name: 'Cloud Computing AWS', category: 'Cloud', sales: 98, revenue: 11760 },
                { name: 'Cybersécurité fondamentale', category: 'Security', sales: 87, revenue: 7830 },
                { name: 'Anglais des affaires', category: 'Langues', sales: 76, revenue: 4560 }
            ],
            salesData: [12, 19, 15, 17, 14, 23, 21, 25, 22, 28, 30, 35],
            categoriesData: [42, 28, 18, 12, 15, 10, 8, 5],
            categoryLabels: ['Développement', 'Design', 'Marketing', 'Data', 'Cloud', 'Security', 'Langues', 'Autres']
        }
    },
    computed: {
        totalVentes() { 
            return this.topVentes.reduce((s, i) => s + i.sales, 0).toLocaleString() 
        },
        chiffreAffaire() { 
            return this.topVentes.reduce((s, i) => s + i.revenue, 0).toLocaleString() 
        },
        nouveauxUtilisateurs() { 
            return 1256 
        },
        nouveauxCours() { 
            return 18 
        },
        filteredTopVentes() {
            if (!this.searchTerm) return this.topVentes
            return this.topVentes.filter(i => i.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
        }
    },
    mounted() {
        this.initCharts()
    },
    methods: {
        getCategoryBadgeClass(category) {
            const classes = {
                'Développement': 'bg-indigo-100 text-indigo-700',
                'Design': 'bg-pink-100 text-pink-700',
                'Marketing': 'bg-amber-100 text-amber-700',
                'Data': 'bg-cyan-100 text-cyan-700',
                'Cloud': 'bg-sky-100 text-sky-700',
                'Security': 'bg-red-100 text-red-700',
                'Langues': 'bg-emerald-100 text-emerald-700'
            }
            return classes[category] || 'bg-slate-100 text-slate-700'
        },
        getCategoryIcon(category) {
            const icons = {
                'Développement': 'fas fa-code',
                'Design': 'fas fa-palette',
                'Marketing': 'fas fa-chart-line',
                'Data': 'fas fa-database',
                'Cloud': 'fas fa-cloud',
                'Security': 'fas fa-shield-alt',
                'Langues': 'fas fa-language'
            }
            return icons[category] || 'fas fa-folder'
        },
        initCharts() {
            // Graphique des ventes
            const salesCtx = this.$refs.salesChart?.getContext('2d')
            if (salesCtx) {
                if (this.salesChart) this.salesChart.destroy()
                this.salesChart = new Chart(salesCtx, {
                    type: 'line',
                    data: { 
                        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'], 
                        datasets: [{ 
                            label: 'Ventes', 
                            data: this.salesData, 
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
                            y: { beginAtZero: true, title: { display: true, text: 'Nombre de ventes', color: '#64748b' } },
                            x: { title: { display: true, text: 'Mois', color: '#64748b' } }
                        }
                    }
                })
            }
            
            // Graphique des catégories
            const catCtx = this.$refs.categoriesChart?.getContext('2d')
            if (catCtx) {
                if (this.categoriesChart) this.categoriesChart.destroy()
                this.categoriesChart = new Chart(catCtx, {
                    type: 'doughnut',
                    data: { 
                        labels: this.categoryLabels, 
                        datasets: [{ 
                            data: this.categoriesData, 
                            backgroundColor: ['#6366f1', '#ec4899', '#f59e0b', '#06b6d4', '#10b981', '#ef4444', '#8b5cf6', '#94a3b8']
                        }] 
                    },
                    options: { 
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: { position: 'right' },
                            tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}%` } }
                        }
                    }
                })
            }
        },
        applyDateRange() { 
            alert(`Rapport généré du ${this.dateStart} au ${this.dateEnd}`) 
        },
        exportRapport() { 
            alert('Rapport exporté en CSV') 
        },
        exportCSV() {
            const data = this.topVentes.map(i => `${i.name},${i.category},${i.sales},${i.revenue}`).join('\n')
            const blob = new Blob([`Cours,Catégorie,Ventes,Revenu\n${data}`], { type: 'text/csv' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `rapport_ventes_${new Date().toISOString().split('T')[0]}.csv`
            link.click()
            alert('Export CSV effectué')
        },
        exportExcel() {
            alert('Export Excel effectué')
        },
        exportPDF() {
            alert('Export PDF effectué')
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

.rapports-module {
  animation: fadeIn 0.3s ease;
}

.date-range,
.stats-grid .stat-card,
.charts-row .chart-card,
.table-card,
.export-section {
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

/* Style pour les badges de catégorie */
.inline-flex {
  transition: all 0.2s ease;
}

.inline-flex:hover {
  transform: translateY(-1px);
}
</style>
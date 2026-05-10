<template>
    <div class="manage-partner min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-handshake text-indigo-500 text-2xl"></i>
                    Gestion des partenaires
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez les ministères et établissements partenaires</p>
            </div>
            <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openAddModal">
                <i class="fas fa-plus text-sm"></i> Ajouter un partenaire
            </button>
        </div>

        <!-- Statistiques -->
        <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Partenaires totaux</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ partners.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-handshake text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Ministères</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ ministriesCount }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-building text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Établissements</p>
                    <p class="text-2xl font-bold text-amber-600">{{ schoolsCount }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-school text-amber-500"></i>
                </div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Partenariats actifs</p>
                    <p class="text-2xl font-bold text-rose-600">{{ activePartners }}</p>
                </div>
                <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-rose-500"></i>
                </div>
            </div>
        </div>

        <!-- Filtres par catégorie -->
        <div class="filter-bar flex flex-wrap gap-3 mb-6">
            <button @click="filterCategory = 'all'" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200', filterCategory === 'all' ? 'bg-indigo-500 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50']">
                <i class="fas fa-globe mr-2"></i>Tous
            </button>
            <button @click="filterCategory = 'ministry'" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200', filterCategory === 'ministry' ? 'bg-indigo-500 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50']">
                <i class="fas fa-building mr-2"></i>Ministères
            </button>
            <button @click="filterCategory = 'school'" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200', filterCategory === 'school' ? 'bg-indigo-500 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50']">
                <i class="fas fa-school mr-2"></i>Établissements
            </button>
        </div>

        <!-- Liste des partenaires -->
        <div class="partners-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <div v-for="(partner, idx) in filteredPartners" :key="idx" class="partner-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-2">
                <div class="partner-header relative h-24" :class="partner.type === 'ministry' ? 'bg-gradient-to-r from-indigo-600 to-indigo-800' : 'bg-gradient-to-r from-emerald-600 to-teal-600'">
                    <div class="partner-type absolute top-2 right-2">
                        <span :class="partner.type === 'ministry' ? 'bg-indigo-500' : 'bg-emerald-500'" class="text-white text-xs px-2 py-1 rounded-full">
                            <i :class="partner.type === 'ministry' ? 'fas fa-building' : 'fas fa-school'" class="mr-1"></i>
                            {{ partner.type === 'ministry' ? 'Ministère' : 'Établissement' }}
                        </span>
                    </div>
                </div>
                <div class="partner-content text-center p-5">
                    <div class="partner-logo w-20 h-20 mx-auto -mt-12 mb-4 bg-white rounded-xl shadow-md flex items-center justify-center overflow-hidden border-2 border-slate-100">
                        <img :src="partner.logo || defaultLogo" class="w-16 h-16 object-contain" alt="logo">
                    </div>
                    <div class="partner-name font-bold text-slate-800 text-lg mb-1">{{ partner.name }}</div>
                    <div class="partner-country text-sm text-slate-500 mb-3 flex items-center justify-center gap-1">
                        <i class="fas fa-map-marker-alt text-indigo-400 text-xs"></i> {{ partner.country }}
                    </div>
                    <div class="partner-stats flex justify-center gap-4 text-xs text-slate-400 mb-4">
                        <span class="flex items-center gap-1"><i class="fas fa-users"></i> {{ partner.students || 'N/A' }}</span>
                        <span class="flex items-center gap-1"><i class="fas fa-graduation-cap"></i> {{ partner.courses || 'N/A' }}</span>
                    </div>
                    <div class="partner-actions flex justify-center gap-2">
                        <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editPartner(idx)" title="Modifier">
                            <i class="fas fa-edit text-sm"></i>
                        </button>
                        <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deletePartner(idx)" title="Supprimer">
                            <i class="fas fa-trash-alt text-sm"></i>
                        </button>
                        <a v-if="partner.website" :href="partner.website" target="_blank" class="btn-website w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" title="Site web">
                            <i class="fas fa-external-link-alt text-sm"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="filteredPartners.length === 0" class="col-span-full text-center py-12 text-slate-400">
                <i class="fas fa-handshake text-5xl mb-3 block"></i>
                <p>Aucun partenaire trouvé</p>
            </div>
        </div>

        <!-- Modal Ajout/Modification -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showModal, 'flex': showModal }" @click.self="showModal=false">
            <div class="modal-content bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-handshake text-indigo-500"></i>
                        {{ editingIndex !== null ? 'Modifier' : 'Ajouter' }} un partenaire
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="showModal=false">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-tag text-indigo-500"></i> Type de partenaire
                        </label>
                        <select v-model="form.type" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option value="ministry">Ministère de l'Éducation</option>
                            <option value="school">Établissement scolaire</option>
                        </select>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-building text-indigo-500"></i> Nom du partenaire
                        </label>
                        <input v-model="form.name" type="text" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-map-marker-alt text-indigo-500"></i> Pays
                        </label>
                        <input v-model="form.country" type="text" placeholder="Sénégal, France, etc." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-image text-indigo-500"></i> URL du logo
                        </label>
                        <input v-model="form.logo" placeholder="https://..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <div v-if="form.logo" class="mt-2">
                            <img :src="form.logo" class="h-12 object-contain" alt="Aperçu logo">
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <i class="fas fa-link text-indigo-500"></i> Site web
                        </label>
                        <input v-model="form.website" placeholder="https://..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-row grid grid-cols-2 gap-3">
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <i class="fas fa-users text-indigo-500"></i> Étudiants
                            </label>
                            <input v-model="form.students" type="text" placeholder="Nombre d'étudiants" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <i class="fas fa-book text-indigo-500"></i> Formations
                            </label>
                            <input v-model="form.courses" type="text" placeholder="Nombre de formations" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        </div>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="showModal=false">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="savePartner">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleManagePartner',
    data() {
        return {
            showModal: false, 
            editingIndex: null,
            filterCategory: 'all',
            defaultLogo: 'https://via.placeholder.com/120x80?text=Logo',
            form: { 
                name: '', 
                type: 'ministry', 
                logo: '', 
                website: '', 
                country: '',
                students: '',
                courses: ''
            },
            // 10 exemples de partenaires (ministères et établissements scolaires)
            partners: [
                { id: 1, name: 'Ministère de l\'Éducation Nationale du Sénégal', type: 'ministry', logo: 'https://flagcdn.com/sn.svg', website: 'https://www.education.sn', country: 'Sénégal', students: '2.5M', courses: '15k' },
                { id: 2, name: 'Ministère de l\'Enseignement Supérieur du Sénégal', type: 'ministry', logo: 'https://flagcdn.com/sn.svg', website: 'https://www.mesr.sn', country: 'Sénégal', students: '450k', courses: '3k' },
                { id: 3, name: 'Université Cheikh Anta Diop (UCAD)', type: 'school', logo: 'https://via.placeholder.com/120x80?text=UCAD', website: 'https://www.ucad.sn', country: 'Sénégal', students: '80k', courses: '500' },
                { id: 4, name: 'Institut Supérieur de Gestion (ISG)', type: 'school', logo: 'https://via.placeholder.com/120x80?text=ISG', website: 'https://www.isg.sn', country: 'Sénégal', students: '15k', courses: '120' },
                { id: 5, name: 'Ministère de l\'Éducation Nationale du Mali', type: 'ministry', logo: 'https://flagcdn.com/ml.svg', website: 'https://www.education.gouv.ml', country: 'Mali', students: '1.8M', courses: '10k' },
                { id: 6, name: 'Université des Sciences de Bamako', type: 'school', logo: 'https://via.placeholder.com/120x80?text=USB', website: 'https://www.usb.edu.ml', country: 'Mali', students: '60k', courses: '350' },
                { id: 7, name: 'Ministère de l\'Éducation Nationale du Burkina Faso', type: 'ministry', logo: 'https://flagcdn.com/bf.svg', website: 'https://www.education.gov.bf', country: 'Burkina Faso', students: '1.5M', courses: '8k' },
                { id: 8, name: 'Université Ouaga I Pr Joseph Ki-Zerbo', type: 'school', logo: 'https://via.placeholder.com/120x80?text=UO', website: 'https://www.univ-ouaga.bf', country: 'Burkina Faso', students: '40k', courses: '280' },
                { id: 9, name: 'Ministère de l\'Éducation Nationale de Côte d\'Ivoire', type: 'ministry', logo: 'https://flagcdn.com/ci.svg', website: 'https://www.education.gouv.ci', country: 'Côte d\'Ivoire', students: '3.2M', courses: '18k' },
                { id: 10, name: 'Université Félix Houphouët-Boigny', type: 'school', logo: 'https://via.placeholder.com/120x80?text=UFHB', website: 'https://www.univ-fhb.ci', country: 'Côte d\'Ivoire', students: '70k', courses: '450' }
            ]
        }
    },
    computed: {
        ministriesCount() {
            return this.partners.filter(p => p.type === 'ministry').length
        },
        schoolsCount() {
            return this.partners.filter(p => p.type === 'school').length
        },
        activePartners() {
            return this.partners.length
        },
        filteredPartners() {
            if (this.filterCategory === 'all') return this.partners
            return this.partners.filter(p => p.type === this.filterCategory)
        }
    },
    methods: {
        openAddModal() { 
            this.editingIndex = null
            this.form = { name: '', type: 'ministry', logo: '', website: '', country: '', students: '', courses: '' }
            this.showModal = true 
        },
        editPartner(idx) { 
            this.editingIndex = idx
            const partner = this.partners[idx]
            this.form = { 
                name: partner.name, 
                type: partner.type, 
                logo: partner.logo, 
                website: partner.website,
                country: partner.country,
                students: partner.students,
                courses: partner.courses
            }
            this.showModal = true 
        },
        savePartner() {
            if (!this.form.name) {
                alert('Veuillez saisir le nom du partenaire')
                return
            }
            const newPartner = {
                id: Date.now(),
                name: this.form.name,
                type: this.form.type,
                logo: this.form.logo || this.defaultLogo,
                website: this.form.website,
                country: this.form.country || 'Non spécifié',
                students: this.form.students || 'N/A',
                courses: this.form.courses || 'N/A'
            }
            if (this.editingIndex !== null) {
                this.partners[this.editingIndex] = newPartner
                alert('Partenaire modifié avec succès')
            } else {
                this.partners.push(newPartner)
                alert('Partenaire ajouté avec succès')
            }
            this.showModal = false
        },
        deletePartner(idx) { 
            if (confirm('Supprimer ce partenaire ?')) {
                this.partners.splice(idx, 1)
                alert('Partenaire supprimé avec succès')
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

.manage-partner {
  animation: fadeIn 0.3s ease;
}

.stats-grid .stat-card,
.filter-bar,
.partners-grid .partner-card {
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
input:focus, select:focus {
  outline: none;
  ring: 2px solid #6366f1;
}

/* Modal animation */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

/* Partner card hover */
.partner-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
<template>
    <div class="app-settings-module min-h-screen bg-slate-50 p-6">
        <div class="module-header mb-8">
            <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <i class="fas fa-sliders-h text-indigo-500"></i> 
                Paramètres applicatifs
            </h2>
            <p class="text-slate-500 text-sm mt-1">Gérez les éléments visuels de votre plateforme éducative</p>
        </div>

        <!-- Statistiques des ministères -->
        <div class="stats-ministry grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-slate-500 text-sm">Ministères</p>
                        <p class="text-2xl font-bold text-indigo-600">{{ ministries.length }}</p>
                    </div>
                    <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-building text-indigo-500"></i>
                    </div>
                </div>
                <div class="mt-2 text-xs text-green-600">+2 nouveaux</div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-slate-500 text-sm">Enseignants</p>
                        <p class="text-2xl font-bold text-emerald-600">45.2k</p>
                    </div>
                    <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-chalkboard-user text-emerald-500"></i>
                    </div>
                </div>
                <div class="mt-2 text-xs text-green-600">+1.2k cette semaine</div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-slate-500 text-sm">Établissements</p>
                        <p class="text-2xl font-bold text-amber-600">12.8k</p>
                    </div>
                    <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-school text-amber-500"></i>
                    </div>
                </div>
                <div class="mt-2 text-xs text-green-600">+156 nouveaux</div>
            </div>
            <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-slate-500 text-sm">Élèves inscrits</p>
                        <p class="text-2xl font-bold text-rose-600">1.2M</p>
                    </div>
                    <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-graduation-cap text-rose-500"></i>
                    </div>
                </div>
                <div class="mt-2 text-xs text-green-600">+15.3k cette semaine</div>
            </div>
        </div>

        <!-- Liste des ministres et responsables -->
        <div class="ministries-section mb-8">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <i class="fas fa-user-tie text-indigo-500"></i>
                    Ministres et Responsables de l'Éducation
                </h3>
                <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{{ ministries.length }} responsables</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div v-for="minister in ministries" :key="minister.id" class="minister-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                    <div class="relative h-32 overflow-hidden">
                        <img :src="minister.image" class="w-full h-full object-cover" :alt="minister.name">
                        <div class="absolute top-2 right-2">
                            <span class="text-xs bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-indigo-600 font-medium">{{ minister.country }}</span>
                        </div>
                    </div>
                    <div class="p-3">
                        <h4 class="font-semibold text-slate-800 text-sm">{{ minister.name }}</h4>
                        <p class="text-xs text-indigo-600 font-medium mt-0.5">{{ minister.title }}</p>
                        <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <i class="fas fa-calendar-alt text-[10px]"></i> {{ minister.since }}
                        </p>
                        <div class="flex flex-wrap gap-1 mt-2">
                            <span v-for="level in minister.levels" :key="level" class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{{ level }}</span>
                        </div>
                        <div class="mt-2 text-[10px] text-slate-400 flex items-center gap-2">
                            <span><i class="fas fa-school"></i> {{ minister.schools }} écoles</span>
                            <span><i class="fas fa-users"></i> {{ minister.students }} élèves</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="settings-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Gestion du Slider -->
            <div class="setting-card bg-white rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 border border-slate-200 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-400" @click="activeModal = 'slider'">
                <div class="card-icon w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-images text-2xl text-indigo-500"></i>
                </div>
                <h3 class="text-lg font-semibold text-slate-800 mb-2">Gérer le slider</h3>
                <p class="text-sm text-slate-500 mb-3">Ajoutez/modifiez les images du carrousel</p>
                <span class="badge inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                    <i class="fas fa-image text-indigo-400 mr-1 text-xs"></i> {{ sliders.length }} slides
                </span>
            </div>

            <!-- Gestion des informations -->
            <div class="setting-card bg-white rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 border border-slate-200 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-400" @click="activeModal = 'info'">
                <div class="card-icon w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-info-circle text-2xl text-indigo-500"></i>
                </div>
                <h3 class="text-lg font-semibold text-slate-800 mb-2">Gérer les informations</h3>
                <p class="text-sm text-slate-500 mb-3">Modifiez les textes et contenus</p>
                <span class="badge inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                    <i class="fas fa-layer-group text-indigo-400 mr-1 text-xs"></i> 3 sections
                </span>
            </div>

            <!-- Gestion des partenaires -->
            <div class="setting-card bg-white rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 border border-slate-200 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-400" @click="activeModal = 'partner'">
                <div class="card-icon w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-handshake text-2xl text-indigo-500"></i>
                </div>
                <h3 class="text-lg font-semibold text-slate-800 mb-2">Gérer les partenaires</h3>
                <p class="text-sm text-slate-500 mb-3">Ajoutez/modifiez les logos partenaires</p>
                <span class="badge inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                    <i class="fas fa-building text-indigo-400 mr-1 text-xs"></i> {{ partners.length }} partenaires
                </span>
            </div>
        </div>

        <!-- Modal Slider -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': activeModal !== 'slider', 'flex': activeModal === 'slider' }" @click.self="activeModal = null">
            <div class="modal-content bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-images text-indigo-500"></i> Gestion du slider
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="activeModal = null">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <button class="btn-add bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 mb-5" @click="addSlide">
                        <i class="fas fa-plus text-sm"></i> Ajouter un slide
                    </button>
                    <div class="slider-list space-y-3">
                        <div v-for="(slide, idx) in sliders" :key="idx" class="slider-item flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 items-center hover:shadow-md transition-all">
                            <div class="slider-preview flex-shrink-0">
                                <img :src="slide.image || 'https://via.placeholder.com/120x80?text=Image'" class="w-24 h-16 object-cover rounded-lg border border-slate-200" alt="slide">
                                <div class="text-center mt-1">
                                    <span class="text-[10px] text-slate-400">Aperçu</span>
                                </div>
                            </div>
                            <div class="slider-info flex-1 space-y-2">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-heading text-indigo-400 text-xs w-5"></i>
                                    <input v-model="slide.title" placeholder="Titre du slide" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-align-left text-indigo-400 text-xs w-5"></i>
                                    <input v-model="slide.subtitle" placeholder="Sous-titre du slide" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-image text-indigo-400 text-xs w-5"></i>
                                    <input v-model="slide.image" placeholder="URL de l'image" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                </div>
                            </div>
                            <button class="btn-delete w-10 h-10 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="removeSlide(idx)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div v-if="sliders.length === 0" class="text-center py-8 text-slate-400">
                        <i class="fas fa-images text-4xl mb-3 block"></i>
                        <p>Aucun slide. Cliquez sur "Ajouter un slide" pour commencer.</p>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="activeModal = null">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveSliders">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal Partenaires -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': activeModal !== 'partner', 'flex': activeModal === 'partner' }" @click.self="activeModal = null">
            <div class="modal-content bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-handshake text-indigo-500"></i> Gestion des partenaires
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="activeModal = null">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <button class="btn-add bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 mb-5 w-full justify-center" @click="addPartner">
                        <i class="fas fa-plus-circle"></i> Ajouter un partenaire
                    </button>
                    <div class="partners-list space-y-3">
                        <div v-for="(p, idx) in partners" :key="idx" class="partner-item flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 items-center hover:shadow-md transition-all">
                            <div class="flex-1 space-y-2">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-building text-indigo-400 text-xs w-5"></i>
                                    <input v-model="p.name" placeholder="Nom du partenaire" class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-link text-indigo-400 text-xs w-5"></i>
                                    <input v-model="p.logo" placeholder="URL du logo" class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                </div>
                            </div>
                            <button class="remove-partner w-10 h-10 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="removePartner(idx)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div v-if="partners.length === 0" class="text-center py-8 text-slate-400">
                        <i class="fas fa-handshake text-4xl mb-3 block"></i>
                        <p>Aucun partenaire. Cliquez sur "Ajouter un partenaire" pour commencer.</p>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="activeModal = null">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="savePartners">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal Informations -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': activeModal !== 'info', 'flex': activeModal === 'info' }" @click.self="activeModal = null">
            <div class="modal-content bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-info-circle text-indigo-500"></i> Gestion des informations
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="activeModal = null">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="info-sections space-y-4">
                        <div v-for="(info, idx) in infoSections" :key="idx" class="info-item p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div class="flex items-center gap-3 mb-3">
                                <i class="fas fa-arrows-alt text-indigo-400 cursor-move"></i>
                                <input v-model="info.title" placeholder="Titre de la section" class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <button class="text-red-500 hover:text-red-600" @click="removeInfoSection(idx)">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                            <div class="flex items-start gap-3">
                                <i class="fas fa-align-left text-indigo-400 text-sm mt-2"></i>
                                <textarea v-model="info.description" placeholder="Description de la section" rows="2" class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            </div>
                            <div class="flex items-center gap-2 mt-2">
                                <i class="fas fa-image text-indigo-400 text-xs"></i>
                                <input v-model="info.icon" placeholder="Icône FontAwesome (ex: fas fa-school)" class="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            </div>
                        </div>
                    </div>
                    <button class="btn-add w-full mt-4 bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2" @click="addInfoSection">
                        <i class="fas fa-plus-circle"></i> Ajouter une section
                    </button>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="activeModal = null">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveInfoSections">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleAppSettings',
    data() {
        return {
            activeModal: null,
            // Liste des ministres et responsables de l'éducation (10 exemples)
            ministries: [
                {
                    id: 1,
                    name: "Dr. Ahmadou Tidiane Wone",
                    title: "Ministre de l'Éducation Nationale",
                    country: "Sénégal",
                    since: "Septembre 2022",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                    levels: ["Primaire", "Secondaire", "Enseignement supérieur"],
                    schools: 12580,
                    students: "2.5M"
                },
                {
                    id: 2,
                    name: "Prof. Isabelle Lonvis-Rome",
                    title: "Ministre de l'Éducation Nationale",
                    country: "France",
                    since: "Mai 2022",
                    image: "https://randomuser.me/api/portraits/women/68.jpg",
                    levels: ["Maternelle", "Primaire", "Secondaire", "Supérieur"],
                    schools: 61200,
                    students: "12.5M"
                },
                {
                    id: 3,
                    name: "Dr. Miguel Ángel Santos Guerra",
                    title: "Ministro de Educación",
                    country: "Espagne",
                    since: "Novembre 2023",
                    image: "https://randomuser.me/api/portraits/men/45.jpg",
                    levels: ["Infantil", "Primaria", "Secundaria", "Universidad"],
                    schools: 28000,
                    students: "8.2M"
                },
                {
                    id: 4,
                    name: "Prof. José Mauro Rezende",
                    title: "Ministro da Educação",
                    country: "Brésil",
                    since: "Janvier 2023",
                    image: "https://randomuser.me/api/portraits/men/52.jpg",
                    levels: ["Educação Infantil", "Ensino Fundamental", "Ensino Médio", "Superior"],
                    schools: 178000,
                    students: "48M"
                },
                {
                    id: 5,
                    name: "Dr. Mamadou Kaba Camara",
                    title: "Ministre de l'Enseignement Pré-universitaire",
                    country: "Guinée",
                    since: "Juin 2021",
                    image: "https://randomuser.me/api/portraits/men/28.jpg",
                    levels: ["Primaire", "Collège", "Lycée"],
                    schools: 12450,
                    students: "2.1M"
                },
                {
                    id: 6,
                    name: "Prof. Fatoumata Ndiaye",
                    title: "Ministre de l'Enseignement Supérieur",
                    country: "Sénégal",
                    since: "Octobre 2023",
                    image: "https://randomuser.me/api/portraits/women/45.jpg",
                    levels: ["Université", "Grandes Écoles", "Formation professionnelle"],
                    schools: 85,
                    students: "450k"
                },
                {
                    id: 7,
                    name: "Dr. Ousmane Diallo",
                    title: "Directeur National de l'Enseignement Technique",
                    country: "Mali",
                    since: "Mars 2022",
                    image: "https://randomuser.me/api/portraits/men/67.jpg",
                    levels: ["Technique", "Professionnel", "Formation continue"],
                    schools: 1250,
                    students: "380k"
                },
                {
                    id: 8,
                    name: "Prof. Aminata Sow",
                    title: "Ministre de l'Éducation de Base",
                    country: "Burkina Faso",
                    since: "Janvier 2023",
                    image: "https://randomuser.me/api/portraits/women/89.jpg",
                    levels: ["Préscolaire", "Primaire", "Post-primaire"],
                    schools: 15680,
                    students: "3.2M"
                },
                {
                    id: 9,
                    name: "Dr. Ibrahim Boubacar Keïta",
                    title: "Ministre de l'Éducation Nationale",
                    country: "Côte d'Ivoire",
                    since: "Avril 2022",
                    image: "https://randomuser.me/api/portraits/men/73.jpg",
                    levels: ["Primaire", "Secondaire", "Technique"],
                    schools: 18750,
                    students: "4.5M"
                },
                {
                    id: 10,
                    name: "Prof. Khadidiatou Diallo",
                    title: "Ministre de l'Enseignement Supérieur",
                    country: "Mauritanie",
                    since: "Août 2022",
                    image: "https://randomuser.me/api/portraits/women/34.jpg",
                    levels: ["Licence", "Master", "Doctorat", "Recherche"],
                    schools: 42,
                    students: "180k"
                }
            ],
            sliders: [
                { image: 'https://via.placeholder.com/1200x400', title: 'Bienvenue', subtitle: 'Apprenez en ligne' }
            ],
            partners: [
                { name: 'UNESCO', logo: 'https://via.placeholder.com/100x50?text=UNESCO' },
                { name: 'Ministère Éducation Nationale', logo: 'https://via.placeholder.com/100x50?text=Education' },
                { name: 'Banque Mondiale', logo: 'https://via.placeholder.com/100x50?text=WorldBank' }
            ],
            infoSections: [
                { title: 'Enseignement Primaire', description: 'Formation des enfants de 6 à 11 ans', icon: 'fas fa-school' },
                { title: 'Enseignement Secondaire', description: 'Collège et lycée - préparation au baccalauréat', icon: 'fas fa-chalkboard-user' },
                { title: 'Enseignement Supérieur', description: 'Universités et grandes écoles', icon: 'fas fa-graduation-cap' }
            ]
        }
    },
    methods: {
        // Slider methods
        addSlide() {
            this.sliders.push({ image: '', title: '', subtitle: '' })
        },
        removeSlide(idx) {
            this.sliders.splice(idx, 1)
        },
        saveSliders() {
            localStorage.setItem('sliders', JSON.stringify(this.sliders))
            alert('Sliders sauvegardés avec succès !')
        },
        
        // Partners methods
        addPartner() {
            this.partners.push({ name: '', logo: '' })
        },
        removePartner(idx) {
            this.partners.splice(idx, 1)
        },
        savePartners() {
            localStorage.setItem('partners', JSON.stringify(this.partners))
            alert('Partenaires sauvegardés avec succès !')
        },
        
        // Info sections methods
        addInfoSection() {
            this.infoSections.push({ title: 'Nouvelle section', description: '', icon: 'fas fa-book' })
        },
        removeInfoSection(idx) {
            this.infoSections.splice(idx, 1)
        },
        saveInfoSections() {
            localStorage.setItem('infoSections', JSON.stringify(this.infoSections))
            alert('Informations sauvegardées avec succès !')
        }
    },
    mounted() {
        // Charger les données sauvegardées
        const savedSliders = localStorage.getItem('sliders')
        if (savedSliders) this.sliders = JSON.parse(savedSliders)
        
        const savedPartners = localStorage.getItem('partners')
        if (savedPartners) this.partners = JSON.parse(savedPartners)
        
        const savedInfo = localStorage.getItem('infoSections')
        if (savedInfo) this.infoSections = JSON.parse(savedInfo)
    }
}
</script>

<style scoped>
/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
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

/* Modal transition */
.modal {
    transition: opacity 0.2s ease;
}

/* Input focus styles */
input:focus, textarea:focus, select:focus {
    outline: none;
    ring: 2px solid #6366f1;
}

/* Card hover effect */
.setting-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Button active effect */
button:active {
    transform: scale(0.98);
}

/* Minister card hover */
.minister-card {
    transition: all 0.3s ease;
}

.minister-card:hover {
    transform: translateY(-4px);
}

/* Stat card hover */
.stat-card {
    transition: all 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
}
</style>
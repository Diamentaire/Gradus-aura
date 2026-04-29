<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section avec image -->
    <div class="relative h-96 bg-gradient-to-r from-indigo-800 to-indigo-900">
      <div class="absolute inset-0 opacity-30">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=500&fit=crop" alt="Formations" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
          <i class="fas fa-graduation-cap text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Diplômes d'État reconnus</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Formations Diplômantes</h1>
        <p class="text-xl text-indigo-100">BTS, Licence, Master - Diplômes d'État reconnus</p>
        <button @click="goBack" class="mt-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-full px-6 py-2">
          <i class="fas fa-arrow-left"></i> Retour aux formations
        </button>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="bg-white border-b py-3 px-5">
      <div class="container mx-auto">
        <div class="flex items-center gap-2 text-sm">
          <router-link to="/" class="text-gray-500 hover:text-indigo-600">Accueil</router-link>
          <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
          <router-link to="/formations" class="text-gray-500 hover:text-indigo-600">Formations</router-link>
          <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
          <span class="text-indigo-600 font-semibold">Formations Diplômantes</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-5 py-12">
      <!-- Filières disponibles -->
      <div class="mb-12">
        <div class="text-center mb-10">
          <span class="text-indigo-600 font-semibold uppercase tracking-wide">Nos programmes</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Nos filières diplômantes</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Des formations de qualité pour booster votre carrière</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="filiere in filieresDiplomantes" :key="filiere.id" class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer" @click="openFiliereDetail(filiere)">
            <div class="relative h-48 overflow-hidden">
              <img :src="filiere.image" :alt="filiere.nom" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" @error="handleImageError(filiere)">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                <i :class="filiere.icon + ' text-indigo-600 text-xl'"></i>
              </div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">⭐ Populaire</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold group-hover:text-indigo-600 transition">{{ filiere.nom }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-gray-500 text-sm">{{ filiere.niveau }}</span>
                <span class="text-gray-300">•</span>
                <span class="text-gray-500 text-sm">{{ filiere.duree }}</span>
              </div>
              <p class="text-gray-600 mt-3 line-clamp-2">{{ filiere.description }}</p>
              
              <div class="mt-4 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-xl p-3">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-xs text-gray-500">À partir de</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ filiere.prix.toLocaleString() }} FCFA</p>
                    <p class="text-xs text-gray-400">/an</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-500 line-through">{{ (filiere.prix * 1.2).toLocaleString() }} FCFA</p>
                    <p class="text-xs text-green-600">Économisez 20%</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <i class="fas fa-star text-yellow-400 text-sm"></i>
                  <span class="text-sm font-semibold">4.8</span>
                  <span class="text-xs text-gray-400">(128 avis)</span>
                </div>
                <button @click.stop="openChoixModal(filiere)" class="px-5 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center gap-2">
                  <i class="fas fa-arrow-right"></i> S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Avantages -->
      <div class="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-3xl p-8 mb-12">
        <h2 class="text-2xl font-bold text-center mb-8">Pourquoi choisir nos formations diplômantes ?</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-600 transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-graduation-cap text-indigo-600 text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Diplôme d'État</p>
            <p class="text-sm text-gray-500">Reconnu par l'État</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-600 transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-chalkboard-user text-indigo-600 text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Formateurs experts</p>
            <p class="text-sm text-gray-500">Professeurs qualifiés</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-600 transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-laptop-code text-indigo-600 text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Plateforme LMS</p>
            <p class="text-sm text-gray-500">Cours en ligne 24/7</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-600 transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-briefcase text-indigo-600 text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Insertion pro</p>
            <p class="text-sm text-gray-500">85% d'emploi</p>
          </div>
        </div>
      </div>

      <!-- Section FAQ -->
      <div class="bg-white rounded-3xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-indigo-600"></i> Quels sont les prérequis ?</h3>
            <p class="text-gray-600 text-sm mt-2">Être titulaire d'un Baccalauréat ou équivalent pour les licences, et d'une Licence pour les masters.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-indigo-600"></i> La formation est-elle reconnue ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, nos diplômes sont accrédités par l'État et reconnus par les entreprises.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-indigo-600"></i> Quels sont les débouchés ?</h3>
            <p class="text-gray-600 text-sm mt-2">Nos diplômés travaillent dans les administrations, banques, entreprises privées et internationales.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-indigo-600"></i> Peut-on financer sa formation ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, nous proposons des facilités de paiement et des bourses sur dossier.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE CHOIX (SANS FLOU) -->
    <div v-if="choixModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeChoixModal">
      <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.7);"></div>
      <div class="relative bg-white rounded-2xl max-w-2xl w-full p-6" style="animation: slideIn 0.3s ease-out;">
        <div class="bg-gradient-to-r from-indigo-600 to-cyan-600 -mt-6 -mx-6 rounded-t-2xl p-6 text-center relative mb-6">
          <button @click="closeChoixModal" class="absolute top-4 right-4 text-white/80 hover:text-white">
            <i class="fas fa-times text-xl"></i>
          </button>
          <i class="fas fa-graduation-cap text-white text-4xl mb-2"></i>
          <h2 class="text-2xl font-bold text-white">{{ selectedFiliere?.nom || 'Formation Diplômante' }}</h2>
          <p class="text-indigo-100">Choisissez votre option</p>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div @click="openPreInscription" class="border-2 border-indigo-200 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition">
            <i class="fas fa-file-signature text-indigo-600 text-4xl mb-3"></i>
            <h3 class="text-lg font-bold mb-2">Pré-inscription</h3>
            <p class="text-sm text-gray-600">Réservez votre place gratuitement</p>
          </div>
          <div @click="openRenseignement" class="border-2 border-cyan-200 rounded-xl p-6 text-center cursor-pointer hover:border-cyan-600 hover:bg-cyan-50 transition">
            <i class="fas fa-question-circle text-cyan-600 text-4xl mb-3"></i>
            <h3 class="text-lg font-bold mb-2">Demande de renseignement</h3>
            <p class="text-sm text-gray-600">Obtenez plus d'informations</p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL PRÉ-INSCRIPTION -->
    <div v-if="preInscriptionModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closePreInscriptionModal">
      <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.7);"></div>
      <div class="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style="animation: slideIn 0.3s ease-out;">
        <div class="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-t-2xl p-6 text-center sticky top-0">
          <button @click="closePreInscriptionModal" class="absolute top-4 right-4 text-white/80 hover:text-white">
            <i class="fas fa-times text-xl"></i>
          </button>
          <i class="fas fa-graduation-cap text-white text-4xl mb-2"></i>
          <h2 class="text-2xl font-bold text-white">Pré-inscription</h2>
          <p class="text-indigo-100">{{ selectedFiliere?.nom || 'Formation Diplômante' }}</p>
        </div>

        <form @submit.prevent="submitPreInscription" class="p-6 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div><label class="block text-sm font-semibold mb-1">Civilité *</label><select v-model="preInscription.civilite" class="w-full p-3 border rounded-xl" required><option>Madame</option><option>Monsieur</option></select></div>
            <div><label class="block text-sm font-semibold mb-1">Nom *</label><input type="text" v-model="preInscription.nom" class="w-full p-3 border rounded-xl" required></div>
            <div><label class="block text-sm font-semibold mb-1">Prénom *</label><input type="text" v-model="preInscription.prenom" class="w-full p-3 border rounded-xl" required></div>
            <div><label class="block text-sm font-semibold mb-1">Adresse</label><input type="text" v-model="preInscription.adresse" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Code Postal</label><input type="text" v-model="preInscription.codePostal" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Ville</label><input type="text" v-model="preInscription.ville" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Pays *</label><select v-model="preInscription.pays" class="w-full p-3 border rounded-xl" required><option value="">Sélectionner votre pays</option><option>France</option><option>Sénégal</option><option>Côte d'Ivoire</option><option>Cameroun</option><option>Mali</option><option>Burkina Faso</option></select></div>
            <div><label class="block text-sm font-semibold mb-1">Téléphone *</label><input type="tel" v-model="preInscription.telephone" placeholder="+221 77 123 45 67" class="w-full p-3 border rounded-xl" required></div>
            <div class="md:col-span-2"><label class="block text-sm font-semibold mb-1">Email *</label><input type="email" v-model="preInscription.email" class="w-full p-3 border rounded-xl" required></div>
            <div><label class="block text-sm font-semibold mb-1">Niveau académique *</label><select v-model="preInscription.niveau" class="w-full p-3 border rounded-xl" required><option value="">Choisissez votre niveau</option><option>Baccalauréat</option><option>Licence 1</option><option>Licence 2</option><option>Licence 3</option><option>Master 1</option><option>Master 2</option></select></div>
            <div><label class="block text-sm font-semibold mb-1">Formation souhaitée *</label><select v-model="preInscription.formation" class="w-full p-3 border rounded-xl" required><option value="">Choisissez une formation</option><option>BTS Commerce International</option><option>Licence en Administration</option><option>Master MBA Management</option><option>Licence en Droit</option><option>Master en Finance</option><option>BTS Informatique</option></select></div>
          </div>
          <div><label class="block text-sm font-semibold mb-1">Votre message *</label><textarea v-model="preInscription.message" rows="3" class="w-full p-3 border rounded-xl" required></textarea></div>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="closePreInscriptionModal" class="flex-1 border py-3 rounded-xl hover:bg-gray-50 transition">Annuler</button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 rounded-xl hover:shadow-lg transition">Envoyer</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL DEMANDE DE RENSEIGNEMENT -->
    <div v-if="renseignementModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeRenseignementModal">
      <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.7);"></div>
      <div class="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style="animation: slideIn 0.3s ease-out;">
        <div class="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-t-2xl p-6 text-center sticky top-0">
          <button @click="closeRenseignementModal" class="absolute top-4 right-4 text-white/80 hover:text-white">
            <i class="fas fa-times text-xl"></i>
          </button>
          <i class="fas fa-question-circle text-white text-4xl mb-2"></i>
          <h2 class="text-2xl font-bold text-white">Demande de renseignement</h2>
          <p class="text-indigo-100">Gratuit et sans engagement</p>
        </div>

        <form @submit.prevent="submitRenseignement" class="p-6 space-y-4">
          <div><label class="block text-sm font-semibold mb-1">Nom et Prénom(s) *</label><input type="text" v-model="renseignement.nomPrenom" class="w-full p-3 border rounded-xl" required></div>
          <div><label class="block text-sm font-semibold mb-1">Téléphone *</label><input type="tel" v-model="renseignement.telephone" placeholder="221779214424" class="w-full p-3 border rounded-xl" required></div>
          <div><label class="block text-sm font-semibold mb-1">Email *</label><input type="email" v-model="renseignement.email" class="w-full p-3 border rounded-xl" required></div>
          <div><label class="block text-sm font-semibold mb-1">Niveau académique *</label><select v-model="renseignement.niveau" class="w-full p-3 border rounded-xl" required><option value="">Choisissez votre niveau</option><option>Baccalauréat</option><option>Licence 1</option><option>Licence 2</option><option>Licence 3</option><option>Master 1</option><option>Master 2</option></select></div>
          <div><label class="block text-sm font-semibold mb-1">Formation souhaitée *</label><select v-model="renseignement.formationSouhaitee" class="w-full p-3 border rounded-xl" required><option value="">Choisissez une formation</option><option>BTS Commerce International</option><option>Licence en Administration</option><option>Master MBA Management</option><option>Licence en Droit</option><option>Master en Finance</option><option>BTS Informatique</option></select></div>
          <div><label class="block text-sm font-semibold mb-1">Date souhaitée *</label><input type="date" v-model="renseignement.dateSouhaitee" class="w-full p-3 border rounded-xl" required></div>
          <div><label class="block text-sm font-semibold mb-1">Objet *</label><input type="text" v-model="renseignement.objet" class="w-full p-3 border rounded-xl" required></div>
          <div><label class="block text-sm font-semibold mb-1">Votre message *</label><textarea v-model="renseignement.message" rows="4" class="w-full p-3 border rounded-xl" required></textarea></div>
          <div class="flex gap-3 pt-4">
            <button type="button" @click="closeRenseignementModal" class="flex-1 border py-3 rounded-xl hover:bg-gray-50 transition">Annuler</button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 rounded-xl hover:shadow-lg transition">Envoyer</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL SUCCÈS -->
    <div v-if="successModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="successModalOpen=false">
      <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.7);"></div>
      <div class="relative bg-white rounded-2xl max-w-md w-full text-center p-6" style="animation: slideIn 0.3s ease-out;">
        <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-circle text-green-600 text-4xl"></i>
        </div>
        <h3 class="text-xl font-bold">{{ successTitle }}</h3>
        <p class="text-gray-600 mt-2">{{ successMessage }}</p>
        <button @click="successModalOpen=false" class="mt-6 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormationsDiplomantes',
  data() {
    return {
      filieresDiplomantes: [
        { id: 1, nom: 'BTS Commerce International', niveau: 'Bac+2', duree: '2 ans', prix: 120000, description: 'Commerce, logistique, marketing international', icon: 'fas fa-globe', image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=400&h=250&fit=crop' },
        { id: 2, nom: 'Licence en Administration', niveau: 'Bac+3', duree: '3 ans', prix: 180000, description: 'Gestion, RH, comptabilité', icon: 'fas fa-building', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?w=400&h=250&fit=crop' },
        { id: 3, nom: 'Master MBA Management', niveau: 'Bac+5', duree: '2 ans', prix: 250000, description: 'Management stratégique, finance, leadership', icon: 'fas fa-chart-line', image: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?w=400&h=250&fit=crop' },
        { id: 4, nom: 'Licence en Droit', niveau: 'Bac+3', duree: '3 ans', prix: 160000, description: 'Droit des affaires, droit civil', icon: 'fas fa-gavel', image: 'https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?w=400&h=250&fit=crop' },
        { id: 5, nom: 'Master en Finance', niveau: 'Bac+5', duree: '2 ans', prix: 230000, description: "Finance d'entreprise, audit", icon: 'fas fa-coins', image: 'https://images.pexels.com/photos/3184342/pexels-photo-3184342.jpeg?w=400&h=250&fit=crop' },
        { id: 6, nom: 'BTS Informatique', niveau: 'Bac+2', duree: '2 ans', prix: 130000, description: 'Développement, réseaux, base de données', icon: 'fas fa-laptop-code', image: 'https://images.pexels.com/photos/3184343/pexels-photo-3184343.jpeg?w=400&h=250&fit=crop' }
      ],
      choixModalOpen: false,
      preInscriptionModalOpen: false,
      renseignementModalOpen: false,
      successModalOpen: false,
      selectedFiliere: null,
      successTitle: '',
      successMessage: '',
      
      preInscription: {
        civilite: 'Madame',
        nom: '',
        prenom: '',
        adresse: '',
        codePostal: '',
        ville: '',
        pays: '',
        telephone: '',
        email: '',
        niveau: '',
        formation: '',
        message: ''
      },
      
      renseignement: {
        nomPrenom: '',
        telephone: '',
        email: '',
        niveau: '',
        formationSouhaitee: '',
        dateSouhaitee: '',
        objet: '',
        message: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/formations')
    },
    openFiliereDetail(filiere) {
      this.selectedFiliere = filiere
    },
    openChoixModal(filiere) {
      this.selectedFiliere = filiere
      this.choixModalOpen = true
    },
    closeChoixModal() {
      this.choixModalOpen = false
      this.selectedFiliere = null
    },
    openPreInscription() {
      this.choixModalOpen = false
      this.preInscriptionModalOpen = true
      this.preInscription.message = `Je souhaite m'inscrire à la formation : ${this.selectedFiliere?.nom}`
    },
    closePreInscriptionModal() {
      this.preInscriptionModalOpen = false
      this.resetPreInscription()
    },
    openRenseignement() {
      this.choixModalOpen = false
      this.renseignementModalOpen = true
      this.renseignement.objet = `Information sur la formation ${this.selectedFiliere?.nom}`
      this.renseignement.message = `Je souhaite obtenir plus d'informations sur la formation : ${this.selectedFiliere?.nom}`
    },
    closeRenseignementModal() {
      this.renseignementModalOpen = false
      this.resetRenseignement()
    },
    submitPreInscription() {
      console.log('Pré-inscription:', this.preInscription)
      this.successTitle = 'Pré-inscription réussie !'
      this.successMessage = `Votre pré-inscription à ${this.selectedFiliere?.nom} a été enregistrée. Un email de confirmation a été envoyé à ${this.preInscription.email}`
      this.preInscriptionModalOpen = false
      this.successModalOpen = true
      this.resetPreInscription()
    },
    submitRenseignement() {
      console.log('Demande de renseignement:', this.renseignement)
      this.successTitle = 'Demande envoyée !'
      this.successMessage = `Votre demande de renseignement pour ${this.renseignement.formationSouhaitee} a été envoyée. Nous vous contacterons dans les plus brefs délais.`
      this.renseignementModalOpen = false
      this.successModalOpen = true
      this.resetRenseignement()
    },
    handleImageError(filiere) {
      filiere.image = 'https://via.placeholder.com/400x250?text=Formation'
    },
    resetPreInscription() {
      this.preInscription = {
        civilite: 'Madame',
        nom: '',
        prenom: '',
        adresse: '',
        codePostal: '',
        ville: '',
        pays: '',
        telephone: '',
        email: '',
        niveau: '',
        formation: '',
        message: ''
      }
    },
    resetRenseignement() {
      this.renseignement = {
        nomPrenom: '',
        telephone: '',
        email: '',
        niveau: '',
        formationSouhaitee: '',
        dateSouhaitee: '',
        objet: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section avec image -->
    <div class="relative h-96 bg-gradient-to-r from-purple-800 to-pink-800">
      <div class="absolute inset-0 opacity-30">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=500&fit=crop" alt="Formation Présidentielle" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
          <i class="fas fa-crown text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Programme d'excellence</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Formation Présentielle</h1>
        <p class="text-xl text-purple-100">Programme Executive pour hauts responsables</p>
        <button @click="goBack" class="mt-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-full px-6 py-2">
          <i class="fas fa-arrow-left"></i> Retour aux formations
        </button>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="bg-white border-b py-3 px-5">
      <div class="container mx-auto">
        <div class="flex items-center gap-2 text-sm">
          <router-link to="/" class="text-gray-500 hover:text-purple-600">Accueil</router-link>
          <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
          <router-link to="/formations" class="text-gray-500 hover:text-purple-600">Formations</router-link>
          <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
          <span class="text-purple-600 font-semibold">Formation Présidentielle</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-5 py-12">
      <!-- Dates de clôture des candidatures -->
      <div class="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-xl p-5 mb-8">
        <div class="flex items-start gap-3">
          <i class="fas fa-calendar-alt text-amber-600 text-xl mt-0.5"></i>
          <div>
            <h3 class="font-bold text-amber-800">Les dates de clôture des candidatures :</h3>
            <ul class="mt-2 space-y-1">
              <li class="text-amber-700">
                <i class="fas fa-circle text-[8px] mr-2"></i>
                <strong>9 juin 2026</strong> pour la rentrée universitaire de septembre 2026
              </li>
              <li class="text-amber-700">
                <i class="fas fa-circle text-[8px] mr-2"></i>
                <strong>14 septembre 2026</strong> pour la rentrée universitaire de janvier 2027
              </li>
            </ul>
            <p class="text-sm text-amber-600 mt-2">
              <i class="fas fa-info-circle mr-1"></i>
              Découvrez ci-dessous les formations diplômantes internationales à distance proposées par les établissements universitaires membres de l'AUF.
            </p>
          </div>
        </div>
      </div>

      <!-- FILTRES COMPLETS -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
        <!-- Première ligne : Par région, Par pays, Par établissement -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <!-- Par région -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <i class="fas fa-map-marker-alt mr-1"></i> Par région
            </label>
            <select class="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="">Toutes les régions</option>
              <option value="afrique">Afrique</option>
              <option value="europe">Europe</option>
              <option value="asie">Asie</option>
              <option value="amerique">Amérique</option>
              <option value="oceanie">Océanie</option>
            </select>
          </div>
          
          <!-- Par pays -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <i class="fas fa-flag mr-1"></i> Par pays
            </label>
            <select class="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="">Tous les pays</option>
              <option value="france">France</option>
              <option value="senegal">Sénégal</option>
              <option value="cote-ivoire">Côte d'Ivoire</option>
              <option value="cameroun">Cameroun</option>
              <option value="mali">Mali</option>
              <option value="burkina">Burkina Faso</option>
              <option value="niger">Niger</option>
              <option value="benin">Bénin</option>
              <option value="togo">Togo</option>
              <option value="guinee">Guinée</option>
              <option value="canada">Canada</option>
              <option value="belgique">Belgique</option>
              <option value="suisse">Suisse</option>
            </select>
          </div>

          <!-- Par établissement -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <i class="fas fa-university mr-1"></i> Par établissement
            </label>
            <select class="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="">Tous les établissements</option>
              <option value="universite-paris">Université de Paris</option>
              <option value="ucad">UCAD - Sénégal</option>
              <option value="universite-montreal">Université de Montréal</option>
              <option value="universite-libre">Université Libre de Bruxelles</option>
              <option value="universite-geneve">Université de Genève</option>
              <option value="universite-lomé">Université de Lomé</option>
            </select>
          </div>
        </div>

        <!-- Deuxième ligne : Mot clés -->
        <div class="mb-5">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <i class="fas fa-search mr-1"></i> Mot clés
            </label>
            <div class="relative">
              <input type="text" placeholder="Rechercher une formation..." class="w-full p-2.5 pl-9 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <i class="fas fa-search absolute left-3 top-3 text-gray-400 text-sm"></i>
            </div>
          </div>
        </div>

        <!-- Troisième ligne : Par domaine, Par niveau -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Par domaine -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <i class="fas fa-tag mr-1"></i> Par domaine
            </label>
            <select class="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="">Tous les domaines</option>
              <option value="informatique">Informatique</option>
              <option value="commerce">Commerce & Marketing</option>
              <option value="gestion">Gestion & Finance</option>
              <option value="droit">Droit</option>
              <option value="sante">Santé</option>
              <option value="ingenierie">Ingénierie</option>
              <option value="communication">Communication</option>
            </select>
          </div>

          <!-- Par niveau -->
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <i class="fas fa-layer-group mr-1"></i> Par niveau
            </label>
            <select class="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option value="">Tous les niveaux</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="avance">Avancé</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Programmes présidentiels disponibles -->
      <div class="mb-12">
        <div class="text-center mb-10">
          <span class="text-purple-600 font-semibold uppercase tracking-wide">Nos programmes executives</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Formations Présidentielles</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Programmes d'excellence pour cadres dirigeants et hauts responsables</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="programme in programmesPresidentiels" :key="programme.id" class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer" @click="openProgrammeDetail(programme)">
            <div class="relative h-48 overflow-hidden">
              <img :src="programme.image" :alt="programme.nom" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                <i :class="programme.icon + ' text-purple-600 text-xl'"></i>
              </div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">👑 Executive</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold group-hover:text-purple-600 transition">{{ programme.nom }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-gray-500 text-sm">{{ programme.duree }}</span>
                <span class="text-gray-300">•</span>
                <span class="text-gray-500 text-sm">{{ programme.mode }}</span>
              </div>
              <p class="text-gray-600 mt-3 line-clamp-2">{{ programme.description }}</p>
              
              <div class="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-xs text-gray-500">À partir de</p>
                    <p class="text-2xl font-bold text-purple-600">{{ programme.prix.toLocaleString() }} FCFA</p>
                    <p class="text-xs text-gray-400">/formation</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-500 line-through">{{ (programme.prix * 1.2).toLocaleString() }} FCFA</p>
                    <p class="text-xs text-green-600">Économisez 20%</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <i class="fas fa-star text-yellow-400 text-sm"></i>
                  <span class="text-sm font-semibold">{{ programme.note }}</span>
                  <span class="text-xs text-gray-400">({{ programme.avis }} avis)</span>
                </div>
                <button @click.stop="openCandidatureModal(programme)" class="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center gap-2">
                  <i class="fas fa-arrow-right"></i> Candidater
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Avantages -->
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 mb-12">
        <h2 class="text-2xl font-bold text-center mb-8">Pourquoi choisir la formation présidentielle ?</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-600 transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-chalkboard-user text-purple-600 text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Experts internationaux</p>
            <p class="text-sm text-gray-500">Formateurs de renom</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-600 transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-globe text-purple-600 text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Réseau international</p>
            <p class="text-sm text-gray-500">Alumni prestigieux</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-600 transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-trophy text-purple-600 text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Certification Executive</p>
            <p class="text-sm text-gray-500">Reconnue mondialement</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-600 transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-users text-purple-600 text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Networking premium</p>
            <p class="text-sm text-gray-500">Rencontres exclusives</p>
          </div>
        </div>
      </div>

      <!-- Témoignages -->
      <div class="bg-white rounded-3xl shadow-lg p-8 mb-12">
        <h2 class="text-2xl font-bold text-center mb-8">Ce que disent nos alumni</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="temoignage in temoignages" :key="temoignage.id" class="text-center group hover:transform hover:-translate-y-2 transition duration-300">
            <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold group-hover:scale-110 transition">
              {{ temoignage.initiale }}
            </div>
            <p class="italic text-gray-600">"{{ temoignage.message }}"</p>
            <p class="font-semibold mt-2">{{ temoignage.nom }}</p>
            <p class="text-sm text-gray-500">{{ temoignage.programme }}</p>
          </div>
        </div>
      </div>

      <!-- Section FAQ -->
      <div class="bg-white rounded-3xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-purple-600"></i> Quels sont les prérequis ?</h3>
            <p class="text-gray-600 text-sm mt-2">Master minimum et 5 ans d'expérience professionnelle en poste de direction.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-purple-600"></i> La formation est-elle certifiante ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, certification Executive reconnue internationalement.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-purple-600"></i> Y a-t-il des sessions à l'international ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, immersion d'une semaine dans un pays partenaire.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-purple-600"></i> Peut-on financer sa formation ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, financement possible par l'entreprise ou bourse d'excellence.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-purple-600"></i> Quelle est la durée de la formation ?</h3>
            <p class="text-gray-600 text-sm mt-2">6 à 9 mois selon le programme choisi.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-purple-600"></i> Les cours sont-ils en ligne ?</h3>
            <p class="text-gray-600 text-sm mt-2">Format hybride : 70% en ligne + 30% en présentiel (sessions intensives).</p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CONNEXION REQUISE -->
    <div v-if="connexionModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeConnexionModal">
      <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.7);"></div>
      <div class="relative bg-white rounded-2xl max-w-md w-full text-center p-6" style="animation: slideIn 0.3s ease-out;">
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 -mt-6 -mx-6 rounded-t-2xl p-6 text-center relative mb-6">
          <button @click="closeConnexionModal" class="absolute top-4 right-4 text-white/80 hover:text-white">
            <i class="fas fa-times text-xl"></i>
          </button>
          <i class="fas fa-lock text-white text-4xl mb-2"></i>
          <h2 class="text-2xl font-bold text-white">Connexion requise</h2>
        </div>

        <div class="p-4">
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p class="text-gray-700">
              Vous devez être connecté(e) pour pouvoir candidater à la formation <strong>{{ selectedProgramme?.nom }}</strong>.
            </p>
          </div>
          
          <div class="flex gap-3">
            <button @click="closeConnexionModal" class="flex-1 border py-3 rounded-xl hover:bg-gray-50 transition">
              Non
            </button>
            <button @click="goToLogin" class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition">
              Se connecter
            </button>
          </div>
          
          <div class="mt-4 text-center">
            <p class="text-sm text-gray-500">
              Pas encore de compte ? 
              <button @click="goToRegister" class="text-purple-600 font-semibold hover:underline">
                S'inscrire
              </button>
            </p>
          </div>
        </div>
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
        <button @click="successModalOpen=false" class="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormationPresidentiellePage',
  data() {
    return {
      programmesPresidentiels: [
        { 
          id: 1, 
          nom: 'Leadership Stratégique', 
          duree: '8 mois', 
          mode: 'Executive', 
          prix: 450000, 
          note: '4.9', 
          avis: 45, 
          description: 'Développez votre leadership et maîtrisez les stratégies de gouvernance moderne.', 
          icon: 'fas fa-chart-line', 
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=400&h=250&fit=crop' 
        },
        { 
          id: 2, 
          nom: 'Diplomatie Internationale', 
          duree: '9 mois', 
          mode: 'Executive', 
          prix: 480000, 
          note: '4.8', 
          avis: 32, 
          description: 'Maîtrisez les relations internationales et la diplomatie d\'entreprise.', 
          icon: 'fas fa-globe', 
          image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=400&h=250&fit=crop' 
        },
        { 
          id: 3, 
          nom: 'Management de Crise', 
          duree: '6 mois', 
          mode: 'Executive', 
          prix: 420000, 
          note: '4.9', 
          avis: 28, 
          description: 'Préparez-vous à gérer les crises complexes en entreprise et institutions.', 
          icon: 'fas fa-shield-alt', 
          image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?w=400&h=250&fit=crop' 
        }
      ],
      temoignages: [
        { id: 1, nom: 'Dr. Paul M.', initiale: 'P', programme: 'Leadership Stratégique', message: 'Une formation qui a transformé ma vision du leadership. Je recommande vivement.' },
        { id: 2, nom: 'Mme Fatima S.', initiale: 'F', programme: 'Diplomatie Internationale', message: 'Excellent programme, des intervenants de haut niveau et un réseau exceptionnel.' },
        { id: 3, nom: 'M. Jean K.', initiale: 'J', programme: 'Management de Crise', message: 'Les outils et méthodes appris m\'ont permis de gérer des situations complexes.' }
      ],
      connexionModalOpen: false,
      successModalOpen: false,
      selectedProgramme: null,
      successTitle: '',
      successMessage: ''
    }
  },
  methods: {
    goBack() {
      this.$router.push('/formations')
    },
    openProgrammeDetail(programme) {
      this.selectedProgramme = programme
    },
    openCandidatureModal(programme) {
      this.selectedProgramme = programme
      this.connexionModalOpen = true
    },
    closeConnexionModal() {
      this.connexionModalOpen = false
    },
    goToLogin() {
      // Redirige vers la page de connexion
      this.$router.push('/login')
    },
    goToRegister() {
      // Redirige vers la page d'inscription
      this.$router.push('/register')
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
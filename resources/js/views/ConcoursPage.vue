<template>
  <div>
    <!-- SECTION HERO avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-cyan-600 py-20">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-trophy text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">+1000 candidats formés</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Tous les concours préparés par <span class="text-yellow-300">Gradus Aura</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">
          Inscris-toi à un ou plusieurs concours, accède aux annales, cours et suivis personnalisés.
        </p>
        <div class="flex justify-center gap-4 mt-8">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-check-circle text-white"></i>
            <span class="text-white text-sm">Inscription facile</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-clock text-white"></i>
            <span class="text-white text-sm">Préparation accélérée</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-line text-white"></i>
            <span class="text-white text-sm">Suivi personnalisé</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>

    <!-- SECTION STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-building text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">50+</span>
            <span class="text-xs text-gray-500">Établissements partenaires</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-users text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">5000+</span>
            <span class="text-xs text-gray-500">Candidats accompagnés</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-file-alt text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">2000+</span>
            <span class="text-xs text-gray-500">Annales disponibles</span>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
              <i class="fas fa-trophy text-primary text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">89%</span>
            <span class="text-xs text-gray-500">Taux de réussite</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION FILTRES -->
    <section class="py-8 bg-gray-50">
      <div class="container mx-auto px-5">
        <div class="flex flex-wrap justify-center gap-3">
          <button 
            v-for="filtre in filtres" 
            :key="filtre.id"
            @click="filtreActif = filtre.id"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              filtreActif === filtre.id 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            ]"
          >
            <i :class="filtre.icon + ' mr-2'"></i>
            {{ filtre.nom }}
          </button>
        </div>
      </div>
    </section>

    <!-- CONCOURS LIST avec images -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-5">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="concours in concoursFiltres" 
            :key="concours.id"
            class="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            @click="openConcoursDetails(concours)"
          >
            <!-- Image d'illustration -->
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="concours.image" 
                :alt="concours.nom" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-white/90 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  <i class="fas fa-star mr-1 text-yellow-500"></i> Populaire
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <div class="bg-white rounded-full p-2 shadow-md">
                  <i :class="concours.icon + ' text-primary text-xl'"></i>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-primary transition">{{ concours.nom }}</h3>
              <p class="text-gray-500 text-sm mt-2 line-clamp-2">{{ concours.description }}</p>
              
              <!-- Badges matières -->
              <div class="mt-4 flex flex-wrap gap-2">
                <span v-for="matiere in concours.matieres.slice(0,2)" :key="matiere" class="text-xs bg-indigo-50 text-primary px-2 py-1 rounded-full">
                  {{ matiere }}
                </span>
                <span v-if="concours.matieres.length > 2" class="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  +{{ concours.matieres.length - 2 }}
                </span>
              </div>
              
              <!-- Coefficient et prix -->
              <div class="mt-4 flex justify-between items-center">
                <div class="flex items-center gap-1">
                  <i class="fas fa-chart-line text-primary text-sm"></i>
                  <span class="text-sm text-gray-600">{{ concours.coefficient }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="fas fa-money-bill-wave text-green-500 text-sm"></i>
                  <span class="text-sm font-semibold text-primary">{{ concours.fraisDossier + concours.fraisPreparation }} FCFA</span>
                </div>
              </div>
              
              <!-- Bouton inscription -->
              <button class="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <i class="fas fa-arrow-right"></i> S'inscrire maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION AVANTAGES -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-5">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold uppercase tracking-wide">Pourquoi nous choisir</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Des avantages exclusifs</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Accédez à des ressources de qualité et un accompagnement personnalisé</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 rounded-2xl hover:shadow-lg transition">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-headset text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Accompagnement 24/7</h3>
            <p class="text-gray-500 text-sm mt-2">Une équipe dédiée pour répondre à toutes vos questions</p>
          </div>
          <div class="text-center p-6 rounded-2xl hover:shadow-lg transition">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-video text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Classes virtuelles</h3>
            <p class="text-gray-500 text-sm mt-2">Des cours en direct avec des formateurs experts</p>
          </div>
          <div class="text-center p-6 rounded-2xl hover:shadow-lg transition">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-chart-simple text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Suivi de progression</h3>
            <p class="text-gray-500 text-sm mt-2">Statistiques détaillées pour mesurer vos progrès</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL D'INSCRIPTION EN 3 ÉTAPES -->
    <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="handleOverlayClick">
      <div class="absolute inset-0 modal-overlay" @click="closeModal"></div>
      
      <div class="modal-container relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button 
          @click="closeModal" 
          class="absolute top-4 right-4 z-20 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
        
        <div class="gradient-bg rounded-t-2xl p-6 text-center relative">
          <div class="absolute inset-0 opacity-20 rounded-t-2xl overflow-hidden">
            <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=400&h=200&fit=crop" class="w-full h-full object-cover">
          </div>
          <div class="relative z-10">
            <div class="flex justify-center mb-3">
              <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <i class="fas fa-graduation-cap text-white text-3xl"></i>
              </div>
            </div>
            <h2 class="text-2xl font-bold text-white">Inscription au concours</h2>
            <p class="text-indigo-100 text-sm mt-1">
              <i class="fas fa-trophy text-white mr-1"></i> {{ selectedConcours?.nom }}
            </p>
          </div>
        </div>

        <div class="px-6 pt-6">
          <div class="flex justify-between items-center mb-8">
            <div class="flex flex-col items-center flex-1">
              <div :class="stepIndicators[1]" class="w-10 h-10 rounded-full flex items-center justify-center font-bold">1</div>
              <span class="text-xs mt-2 text-gray-600">Informations</span>
            </div>
            <div class="w-full h-1 bg-gray-200 flex-1 mx-2"></div>
            <div class="flex flex-col items-center flex-1">
              <div :class="stepIndicators[2]" class="w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
              <span class="text-xs mt-2 text-gray-600">Documents</span>
            </div>
            <div class="w-full h-1 bg-gray-200 flex-1 mx-2"></div>
            <div class="flex flex-col items-center flex-1">
              <div :class="stepIndicators[3]" class="w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
              <span class="text-xs mt-2 text-gray-600">Paiement</span>
            </div>
          </div>
        </div>

        <!-- ÉTAPE 1 : Informations personnelles -->
        <div v-show="currentStep === 1" class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-user mr-2 text-primary"></i> Informations personnelles</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div><label class="block text-gray-700 font-semibold mb-2">Nom complet <span class="text-red-500">*</span></label><input type="text" v-model="formData.fullname" class="form-input w-full px-4 py-3 border border-gray-300 rounded-xl"></div>
            <div><label class="block text-gray-700 font-semibold mb-2">Email <span class="text-red-500">*</span></label><input type="email" v-model="formData.email" class="form-input w-full px-4 py-3 border border-gray-300 rounded-xl"></div>
            <div><label class="block text-gray-700 font-semibold mb-2">Téléphone <span class="text-red-500">*</span></label><input type="tel" v-model="formData.phone" class="form-input w-full px-4 py-3 border border-gray-300 rounded-xl"></div>
            <div><label class="block text-gray-700 font-semibold mb-2">Date de naissance</label><input type="date" v-model="formData.birthdate" class="form-input w-full px-4 py-3 border border-gray-300 rounded-xl"></div>
            <div><label class="block text-gray-700 font-semibold mb-2">Ville de résidence</label><select v-model="formData.city" class="form-input w-full px-4 py-3 border border-gray-300 rounded-xl"><option>Yaoundé</option><option>Douala</option><option>Garoua</option><option>Bamenda</option><option>Bafoussam</option></select></div>
            <div><label class="block text-gray-700 font-semibold mb-2">Dernier diplôme</label><select v-model="formData.diploma" class="form-input w-full px-4 py-3 border border-gray-300 rounded-xl"><option>BEPC</option><option>Probatoire</option><option>Baccalauréat</option><option>BTS</option><option>Licence</option><option>Master</option></select></div>
          </div>
          <div class="mt-6 flex justify-end"><button @click="nextStep" class="gradient-bg text-white px-8 py-3 rounded-xl font-semibold">Suivant <i class="fas fa-arrow-right ml-2"></i></button></div>
        </div>

        <!-- ÉTAPE 2 : Documents à fournir -->
        <div v-show="currentStep === 2" class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-paperclip mr-2 text-primary"></i> Documents à fournir</h3>
          <div class="space-y-4">
            <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition" @click="triggerFileInput('cv')">
              <i class="fas fa-upload text-3xl text-gray-400 mb-2"></i><p class="text-gray-500">CV / Curriculum Vitae</p><p class="text-xs text-gray-400">PDF, DOC, DOCX (Max 5MB)</p><input type="file" ref="cvInput" class="hidden" accept=".pdf,.doc,.docx" @change="handleFileUpload($event, 'cv')">
            </div>
            <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition" @click="triggerFileInput('diploma')">
              <i class="fas fa-graduation-cap text-3xl text-gray-400 mb-2"></i><p class="text-gray-500">Diplôme(s) obtenu(s)</p><p class="text-xs text-gray-400">PDF, JPG, PNG (Max 5MB)</p><input type="file" ref="diplomaInput" class="hidden" accept=".pdf,.jpg,.png" @change="handleFileUpload($event, 'diploma')">
            </div>
            <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition" @click="triggerFileInput('photo')">
              <i class="fas fa-id-card text-3xl text-gray-400 mb-2"></i><p class="text-gray-500">Photo d'identité</p><p class="text-xs text-gray-400">JPG, PNG (Max 2MB)</p><input type="file" ref="photoInput" class="hidden" accept=".jpg,.png" @change="handleFileUpload($event, 'photo')">
            </div>
            <div class="bg-gray-50 p-4 rounded-xl"><label class="flex items-center gap-3"><input type="checkbox" v-model="formData.declaration" class="w-5 h-5 text-primary"><span class="text-sm text-gray-600">Je déclare sur l'honneur que les informations fournies sont exactes</span></label></div>
          </div>
          <div class="mt-6 flex justify-between"><button @click="prevStep" class="px-6 py-3 border border-gray-300 rounded-xl font-semibold"><i class="fas fa-arrow-left mr-2"></i> Précédent</button><button @click="nextStep" class="gradient-bg text-white px-8 py-3 rounded-xl font-semibold">Suivant <i class="fas fa-arrow-right ml-2"></i></button></div>
        </div>

        <!-- ÉTAPE 3 : Paiement et confirmation -->
        <div v-show="currentStep === 3" class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4"><i class="fas fa-credit-card mr-2 text-primary"></i> Frais d'inscription</h3>
          <div class="bg-indigo-50 rounded-xl p-6 mb-6">
            <div class="flex justify-between items-center mb-4"><span class="text-gray-600">Frais de dossier</span><span class="text-xl font-bold text-primary">{{ fraisDossier }} FCFA</span></div>
            <div class="flex justify-between items-center mb-4"><span class="text-gray-600">Frais de préparation</span><span class="text-xl font-bold text-primary">{{ fraisPreparation }} FCFA</span></div>
            <div class="border-t pt-4 flex justify-between items-center"><span class="font-bold text-gray-800">Total à payer</span><span class="text-2xl font-bold text-primary">{{ totalAmount }} FCFA</span></div>
          </div>
          <div class="space-y-3"><label class="block font-semibold mb-2">Mode de paiement</label><select v-model="formData.paymentMethod" class="form-input w-full px-4 py-3 border border-gray-300 rounded-xl"><option>Orange Money</option><option>MTN Mobile Money</option><option>Carte Bancaire</option><option>Virement bancaire</option></select></div>
          <div class="mt-6 flex justify-between"><button @click="prevStep" class="px-6 py-3 border border-gray-300 rounded-xl font-semibold"><i class="fas fa-arrow-left mr-2"></i> Précédent</button><button @click="submitInscription" class="gradient-bg text-white px-8 py-3 rounded-xl font-semibold">Confirmer l'inscription <i class="fas fa-check-circle ml-2"></i></button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// États du modal
const modalOpen = ref(false);
const currentStep = ref(1);
const selectedConcours = ref(null);
const filtreActif = ref('all');

// Données du formulaire
const formData = ref({
  fullname: '', email: '', phone: '', birthdate: '', city: 'Yaoundé', diploma: 'Baccalauréat',
  declaration: false, paymentMethod: 'Orange Money', cvFile: null, diplomaFile: null, photoFile: null
});

// Références pour les inputs file
const cvInput = ref(null);
const diplomaInput = ref(null);
const photoInput = ref(null);

// Frais
const fraisDossier = ref(25000);
const fraisPreparation = ref(75000);
const totalAmount = computed(() => fraisDossier.value + fraisPreparation.value);

// Filtres
const filtres = ref([
  { id: 'all', nom: 'Tous les concours', icon: 'fas fa-th-large' },
  { id: 'administratifs', nom: 'Administratifs', icon: 'fas fa-gavel' },
  { id: 'grandes-ecoles', nom: 'Grandes Écoles', icon: 'fas fa-chart-line' },
  { id: 'langues', nom: 'Tests de langue', icon: 'fas fa-language' },
  { id: 'paramedicaux', nom: 'Paramédicaux', icon: 'fas fa-briefcase' }
]);

// Liste des concours avec images
const concoursList = ref([
  {
    id: 1,
    nom: 'Concours Administratifs',
    description: 'ENAM, INJS, ENIEG, IRIC, MINFI...',
    icon: 'fas fa-gavel',
    matieres: ['Culture générale', 'Droit', 'Mathématiques'],
    coefficient: 'Coefficients: 3 à 6',
    fraisDossier: 25000,
    fraisPreparation: 75000,
    categorie: 'administratifs',
    image: 'https://images.pexels.com/photos/5668861/pexels-photo-5668861.jpeg?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    nom: 'Grandes Écoles',
    description: 'Polytechnique, Centrale, EM Lyon, HEC',
    icon: 'fas fa-chart-simple',
    matieres: ['Mathématiques approfondies', 'Physique', 'Culture Générale'],
    coefficient: 'Sessions: Mars - Juin',
    fraisDossier: 30000,
    fraisPreparation: 100000,
    categorie: 'grandes-ecoles',
    image: '/images/IMG_6045.JPG'
  },
  {
    id: 3,
    nom: 'TCF / TOEFL / IELTS',
    description: 'Certification officielle, mobilité Canada, France, USA',
    icon: 'fas fa-language',
    matieres: ['Compréhension orale', 'Compréhension écrite', 'Expression orale'],
    coefficient: 'Certification internationale',
    fraisDossier: 20000,
    fraisPreparation: 80000,
    categorie: 'langues',
    image: 'https://images.pexels.com/photos/210647/pexels-photo-210647.jpeg?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    nom: 'Concours Paramédicaux',
    description: 'Médecine, Pharmacie, Sage-femme, IDE',
    icon: 'fas fa-briefcase',
    matieres: ['Biologie', 'Chimie', 'Physique'],
    coefficient: 'Concours national',
    fraisDossier: 25000,
    fraisPreparation: 90000,
    categorie: 'paramedicaux',
    image: '/images/IMG_6060.JPG'
  },
  {
    id: 5,
    nom: 'BTS / DUT / Licences',
    description: 'Commerce, Gestion, Informatique',
    icon: 'fas fa-university',
    matieres: ['Mathématiques', 'Économie', 'Informatique'],
    coefficient: 'Prépa intensive',
    fraisDossier: 20000,
    fraisPreparation: 70000,
    categorie: 'all',
    image: '/images/IMG_6053.JPG'
  },
  {
    id: 6,
    nom: 'Concours Internationaux',
    description: 'Bourses d\'études, mobilité Erasmus',
    icon: 'fas fa-globe',
    matieres: ['Langues', 'Culture générale', 'Test de niveau'],
    coefficient: 'Programmes francophones',
    fraisDossier: 35000,
    fraisPreparation: 120000,
    categorie: 'all',
    image: '/images/IMG_6050.JPG'
  }
]);

// Concours filtrés
const concoursFiltres = computed(() => {
  if (filtreActif.value === 'all') return concoursList.value;
  return concoursList.value.filter(c => c.categorie === filtreActif.value);
});

// Indicateurs d'étape
const stepIndicators = computed(() => ({
  1: currentStep.value >= 1 ? (currentStep.value > 1 ? 'w-10 h-10 rounded-full step-completed flex items-center justify-center font-bold text-white' : 'w-10 h-10 rounded-full step-active flex items-center justify-center font-bold') : 'w-10 h-10 rounded-full step-pending flex items-center justify-center font-bold',
  2: currentStep.value >= 2 ? (currentStep.value > 2 ? 'w-10 h-10 rounded-full step-completed flex items-center justify-center font-bold text-white' : 'w-10 h-10 rounded-full step-active flex items-center justify-center font-bold') : 'w-10 h-10 rounded-full step-pending flex items-center justify-center font-bold',
  3: currentStep.value >= 3 ? (currentStep.value > 3 ? 'w-10 h-10 rounded-full step-completed flex items-center justify-center font-bold text-white' : 'w-10 h-10 rounded-full step-active flex items-center justify-center font-bold') : 'w-10 h-10 rounded-full step-pending flex items-center justify-center font-bold'
}));

// Gestion de la fermeture avec la touche Echap
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && modalOpen.value) {
    closeModal();
  }
};

// Gestion du clic sur l'overlay
const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

// Ouvrir le modal
const openInscriptionModal = (concours) => {
  selectedConcours.value = concours;
  fraisDossier.value = concours.fraisDossier;
  fraisPreparation.value = concours.fraisPreparation;
  modalOpen.value = true;
  currentStep.value = 1;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleEscapeKey);
};

// Fermer le modal
const closeModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = 'auto';
  formData.value = {
    fullname: '', email: '', phone: '', birthdate: '', city: 'Yaoundé', diploma: 'Baccalauréat',
    declaration: false, paymentMethod: 'Orange Money', cvFile: null, diplomaFile: null, photoFile: null
  };
  document.removeEventListener('keydown', handleEscapeKey);
};

// Navigation étapes
const nextStep = () => {
  if (currentStep.value === 1 && (!formData.value.fullname || !formData.value.email || !formData.value.phone)) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }
  if (currentStep.value === 2 && !formData.value.declaration) {
    alert('Veuillez accepter la déclaration sur l\'honneur');
    return;
  }
  if (currentStep.value < 3) currentStep.value++;
};

const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };

// Gestion fichiers
const triggerFileInput = (type) => {
  if (type === 'cv') cvInput.value.click();
  else if (type === 'diploma') diplomaInput.value.click();
  else if (type === 'photo') photoInput.value.click();
};

const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (file) {
    if (type === 'cv') formData.value.cvFile = file;
    else if (type === 'diploma') formData.value.diplomaFile = file;
    else if (type === 'photo') formData.value.photoFile = file;
  }
};

// Redirection vers la page détail du concours
const openConcoursDetails = (concours) => {
  // Vérifier si l'utilisateur est déjà inscrit
  const userId = localStorage.getItem('gradus_user')?.email || null;
  if (userId) {
    // Rediriger vers la page détail du concours
    router.push(`/concours/${concours.id}`);
  } else {
    // Sinon ouvrir le modal d'inscription
    openInscriptionModal(concours);
  }
};

// Soumettre l'inscription
const submitInscription = async () => {
  if (!selectedConcours.value) return;
  
  const userData = {
    fullname: formData.value.fullname,
    email: formData.value.email,
    phone: formData.value.phone,
    birthdate: formData.value.birthdate,
    city: formData.value.city,
    diploma: formData.value.diploma
  };
  
  // Sauvegarder l'utilisateur
  localStorage.setItem('gradus_user', JSON.stringify(userData));
  localStorage.setItem('gradus_token', 'demo_token_' + Date.now());
  
  // Sauvegarder l'inscription
  const userId = formData.value.email;
  const storageKey = `gradus_inscriptions_${userId}`;
  let inscriptions = [];
  const existing = localStorage.getItem(storageKey);
  if (existing) inscriptions = JSON.parse(existing);
  
  inscriptions.push({
    id: Date.now(),
    concoursId: selectedConcours.value.id,
    concoursNom: selectedConcours.value.nom,
    categorie: selectedConcours.value.categorie,
    dateInscription: new Date().toLocaleDateString()
  });
  
  localStorage.setItem(storageKey, JSON.stringify(inscriptions));
  
  alert(`Félicitations ${formData.value.fullname} !\n\nVous êtes inscrit(e) au concours : ${selectedConcours.value.nom}\n\nPaiement de ${totalAmount.value} FCFA à effectuer via ${formData.value.paymentMethod}\n\nAccédez maintenant à votre espace personnel pour commencer votre préparation.`);
  
  closeModal();
  router.push(`/concours/${selectedConcours.value.id}`);
};

// Nettoyage lors du démontage du composant
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
  document.body.style.overflow = 'auto';
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}

.step-active {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
  color: white;
  border-color: transparent;
}

.step-completed {
  background: #10B981;
  color: white;
  border-color: transparent;
}

.step-pending {
  background: white;
  color: #4F46E5;
  border: 2px solid #4F46E5;
}

.form-input:focus {
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  border-color: #4F46E5;
  outline: none;
}

.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.modal-container {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from { opacity: 0; transform: translateY(-50px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
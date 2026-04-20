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
        <!-- Bouton retour -->
        <button @click="goBack" class="mt-6 flex items-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-full px-6 py-2">
          <i class="fas fa-arrow-left"></i> Retour aux formations
        </button>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="bg-white border-b py-3 px-5">
      <div class="container mx-auto">
        <div class="flex items-center gap-2 text-sm">
          <router-link to="/" class="text-gray-500 hover:text-primary">Accueil</router-link>
          <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
          <router-link to="/formations" class="text-gray-500 hover:text-primary">Formations</router-link>
          <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
          <span class="text-primary font-semibold">Formations Diplômantes</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-5 py-12">
      <!-- Filières disponibles -->
      <div class="mb-12">
        <div class="text-center mb-10">
          <span class="text-primary font-semibold uppercase tracking-wide">Nos programmes</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Nos filières diplômantes</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Des formations de qualité pour booster votre carrière</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="filiere in filieresDiplomantes" :key="filiere.id" class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer" @click="openFiliereDetail(filiere)">
            <!-- Image d'illustration -->
            <div class="relative h-48 overflow-hidden">
              <img :src="filiere.image" :alt="filiere.nom" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                <i :class="filiere.icon + ' text-primary text-xl'"></i>
              </div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">⭐ Populaire</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold group-hover:text-primary transition">{{ filiere.nom }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-gray-500 text-sm">{{ filiere.niveau }}</span>
                <span class="text-gray-300">•</span>
                <span class="text-gray-500 text-sm">{{ filiere.duree }}</span>
              </div>
              <p class="text-gray-600 mt-3 line-clamp-2">{{ filiere.description }}</p>
              
              <!-- Prix modèle expert -->
              <div class="mt-4 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-xl p-3">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-xs text-gray-500">À partir de</p>
                    <p class="text-2xl font-bold text-primary">{{ filiere.prix.toLocaleString() }} FCFA</p>
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
                <button @click.stop="openPreInscription(filiere)" class="px-5 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center gap-2">
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
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-graduation-cap text-primary text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Diplôme d'État</p>
            <p class="text-sm text-gray-500">Reconnu par l'État</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-chalkboard-user text-primary text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Formateurs experts</p>
            <p class="text-sm text-gray-500">Professeurs qualifiés</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-laptop-code text-primary text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Plateforme LMS</p>
            <p class="text-sm text-gray-500">Cours en ligne 24/7</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-briefcase text-primary text-2xl group-hover:text-white"></i>
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
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-primary"></i> Quels sont les prérequis ?</h3>
            <p class="text-gray-600 text-sm mt-2">Être titulaire d'un Baccalauréat ou équivalent pour les licences, et d'une Licence pour les masters.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-primary"></i> La formation est-elle reconnue ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, nos diplômes sont accrédités par l'État et reconnus par les entreprises.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-primary"></i> Quels sont les débouchés ?</h3>
            <p class="text-gray-600 text-sm mt-2">Nos diplômés travaillent dans les administrations, banques, entreprises privées et internationales.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-primary"></i> Peut-on financer sa formation ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, nous proposons des facilités de paiement et des bourses sur dossier.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL PRÉ-INSCRIPTION (amélioré) -->
    <div v-if="preInscriptionModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closePreInscriptionModal">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-t-2xl p-6 text-center relative">
          <button @click="closePreInscriptionModal" class="absolute top-4 right-4 text-white/80 hover:text-white">
            <i class="fas fa-times text-xl"></i>
          </button>
          <i class="fas fa-graduation-cap text-white text-4xl mb-2"></i>
          <h2 class="text-2xl font-bold text-white">Pré-inscription</h2>
          <p class="text-indigo-100">Formation Diplômante - {{ selectedFiliere?.nom }}</p>
        </div>

        <div class="px-6 pt-6">
          <div class="flex justify-between mb-8">
            <div class="text-center flex-1"><div :class="stepClass(1)" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto">1</div><span class="text-xs">Infos</span></div>
            <div class="text-center flex-1"><div :class="stepClass(2)" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto">2</div><span class="text-xs">Documents</span></div>
            <div class="text-center flex-1"><div :class="stepClass(3)" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto">3</div><span class="text-xs">Paiement</span></div>
          </div>
        </div>

        <!-- Étape 1 -->
        <div v-show="currentStep === 1" class="p-6">
          <h3 class="text-xl font-bold mb-4">Informations personnelles</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div><label class="block text-sm font-semibold mb-1">Nom complet *</label><input type="text" v-model="inscriptionData.fullname" class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary"></div>
            <div><label class="block text-sm font-semibold mb-1">Email *</label><input type="email" v-model="inscriptionData.email" class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary"></div>
            <div><label class="block text-sm font-semibold mb-1">Téléphone *</label><input type="tel" v-model="inscriptionData.phone" class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary"></div>
            <div><label class="block text-sm font-semibold mb-1">Date de naissance</label><input type="date" v-model="inscriptionData.birthdate" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Ville</label><input type="text" v-model="inscriptionData.city" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Dernier diplôme</label><select v-model="inscriptionData.diploma" class="w-full p-3 border rounded-xl"><option>Baccalauréat</option><option>BTS</option><option>Licence</option><option>Master</option></select></div>
          </div>
          <div class="mt-6 flex justify-between">
            <button @click="closePreInscriptionModal" class="border px-6 py-2 rounded-xl">Annuler</button>
            <button @click="nextStep" class="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-3 rounded-xl">Suivant →</button>
          </div>
        </div>

        <!-- Étape 2 -->
        <div v-show="currentStep === 2" class="p-6">
          <h3 class="text-xl font-bold mb-4">Documents à fournir</h3>
          <div class="space-y-4">
            <div class="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-primary transition" @click="triggerFileInput('cv')">
              <i class="fas fa-upload text-2xl text-gray-400"></i><p>CV / Curriculum Vitae</p><input type="file" ref="cvInput" class="hidden" @change="handleFileUpload($event, 'cv')">
            </div>
            <div class="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-primary transition" @click="triggerFileInput('diploma')">
              <i class="fas fa-graduation-cap text-2xl text-gray-400"></i><p>Dernier diplôme</p><input type="file" ref="diplomaInput" class="hidden" @change="handleFileUpload($event, 'diploma')">
            </div>
            <div class="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-primary transition" @click="triggerFileInput('photo')">
              <i class="fas fa-id-card text-2xl text-gray-400"></i><p>Photo d'identité</p><input type="file" ref="photoInput" class="hidden" @change="handleFileUpload($event, 'photo')">
            </div>
            <label class="flex items-center gap-2"><input type="checkbox" v-model="inscriptionData.terms"> J'accepte les conditions générales</label>
          </div>
          <div class="mt-6 flex justify-between">
            <button @click="prevStep" class="border px-6 py-2 rounded-xl">← Précédent</button>
            <button @click="nextStep" class="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-3 rounded-xl">Suivant →</button>
          </div>
        </div>

        <!-- Étape 3 avec prix détaillé -->
        <div v-show="currentStep === 3" class="p-6">
          <h3 class="text-xl font-bold mb-4">Frais de scolarité</h3>
          <div class="bg-indigo-50 rounded-xl p-6 mb-6">
            <div class="flex justify-between mb-3 pb-2 border-b">
              <span class="font-semibold">Détail des frais</span>
              <span class="font-semibold">Montant</span>
            </div>
            <div class="flex justify-between mb-2"><span>Frais de dossier</span><span>{{ (selectedFiliere?.prix || 150000) * 0.3 }} FCFA</span></div>
            <div class="flex justify-between mb-2"><span>Frais de scolarité (1 an)</span><span>{{ (selectedFiliere?.prix || 150000) * 0.7 }} FCFA</span></div>
            <div class="flex justify-between mb-2"><span>Ressources pédagogiques</span><span>Inclus</span></div>
            <div class="flex justify-between mb-2"><span>Certification</span><span>Incluse</span></div>
            <div class="border-t pt-3 mt-3 flex justify-between font-bold"><span>Total à payer</span><span class="text-primary text-xl">{{ selectedFiliere?.prix || 150000 }} FCFA</span></div>
            <div class="mt-3 bg-green-50 p-2 rounded-lg text-center">
              <p class="text-xs text-green-600"><i class="fas fa-gift mr-1"></i> Paiement échelonné possible (3x sans frais)</p>
            </div>
          </div>
          <div class="space-y-3">
            <label class="block font-semibold">Mode de paiement</label>
            <select v-model="paymentData.method" class="w-full p-3 border rounded-xl">
              <option>Orange Money</option>
              <option>MTN Mobile Money</option>
              <option>Paypal</option>
              <option>Carte Bancaire (Visa/Mastercard)</option>
              <option>Paiement échelonné (3x)</option>
            </select>
            <input type="text" v-model="paymentData.phone" placeholder="Numéro de téléphone / compte" class="w-full p-3 border rounded-xl">
          </div>
          <div class="mt-6 flex justify-between">
            <button @click="prevStep" class="border px-6 py-2 rounded-xl">← Précédent</button>
            <button @click="submitPreInscription" class="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-8 py-3 rounded-xl">Confirmer l'inscription</button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL SUCCÈS -->
    <div v-if="successModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="successModalOpen=false">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container bg-white rounded-2xl max-w-md w-full text-center p-6">
        <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-circle text-green-600 text-4xl"></i>
        </div>
        <h3 class="text-xl font-bold">Pré-inscription réussie !</h3>
        <p class="text-gray-600 mt-2">Un email de confirmation a été envoyé à {{ inscriptionData.email }}</p>
        <div class="flex gap-3 mt-6">
          <button @click="goToConfirmation" class="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-4 py-2 rounded-xl">Voir récapitulatif</button>
          <button @click="successModalOpen=false" class="px-4 py-2 border rounded-xl">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Filières diplômantes avec images
const filieresDiplomantes = ref([
  { id: 1, nom: 'BTS Commerce International', niveau: 'Bac+2', duree: '2 ans', prix: 120000, description: 'Commerce, logistique, marketing international', icon: 'fas fa-globe', image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=400&h=250&fit=crop' },
  { id: 2, nom: 'Licence en Administration', niveau: 'Bac+3', duree: '3 ans', prix: 180000, description: 'Gestion, RH, comptabilité', icon: 'fas fa-building', image: '/images/IMG_6065.JPG' },
  { id: 3, nom: 'Master MBA Management', niveau: 'Bac+5', duree: '2 ans', prix: 250000, description: 'Management stratégique, finance, leadership', icon: 'fas fa-chart-line', image: '/images/IMG_6052.JPG' },
  { id: 4, nom: 'Licence en Droit', niveau: 'Bac+3', duree: '3 ans', prix: 160000, description: 'Droit des affaires, droit civil', icon: 'fas fa-gavel', image: '/images/IMG_6047.JPG' },
  { id: 5, nom: 'Master en Finance', niveau: 'Bac+5', duree: '2 ans', prix: 230000, description: 'Finance d\'entreprise, audit', icon: 'fas fa-coins', image: '/images/IMG_6068.JPG' },
  { id: 6, nom: 'BTS Informatique', niveau: 'Bac+2', duree: '2 ans', prix: 130000, description: 'Développement, réseaux, base de données', icon: 'fas fa-laptop-code', image: '/images/IMG_6064.JPG' }
]);

// États
const preInscriptionModalOpen = ref(false);
const successModalOpen = ref(false);
const selectedFiliere = ref(null);
const currentStep = ref(1);

// Données formulaire
const inscriptionData = ref({ fullname: '', email: '', phone: '', birthdate: '', city: '', diploma: 'Baccalauréat', terms: false, cvFile: null, diplomaFile: null, photoFile: null });
const paymentData = ref({ method: 'Orange Money', phone: '' });

// Références fichiers
const cvInput = ref(null);
const diplomaInput = ref(null);
const photoInput = ref(null);

const stepClass = (step) => {
  if (currentStep.value > step) return 'w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto';
  if (currentStep.value === step) return 'w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white flex items-center justify-center mx-auto';
  return 'w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto';
};

const goBack = () => { router.push('/formations'); };

const openFiliereDetail = (filiere) => { selectedFiliere.value = filiere; preInscriptionModalOpen.value = true; currentStep.value = 1; };
const closePreInscriptionModal = () => { preInscriptionModalOpen.value = false; };
const nextStep = () => { if (currentStep.value < 3) currentStep.value++; };
const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };
const triggerFileInput = (type) => { if (type === 'cv') cvInput.value.click(); else if (type === 'diploma') diplomaInput.value.click(); else photoInput.value.click(); };
const handleFileUpload = (event, type) => { const file = event.target.files[0]; if (file) inscriptionData.value[type + 'File'] = file; };
const submitPreInscription = () => { preInscriptionModalOpen.value = false; successModalOpen.value = true; };
const goToConfirmation = () => { successModalOpen.value = false; router.push({ path: '/confirmation', query: { titre: selectedFiliere.value.nom, prix: selectedFiliere.value.prix, fullname: inscriptionData.value.fullname, email: inscriptionData.value.email, method: paymentData.value.method, type: 'diplomante' } }); };
</script>

<style scoped>
.modal-overlay { background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); }
.modal-container { animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { opacity:0; transform:translateY(-30px); } to { opacity:1; transform:translateY(0); } }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
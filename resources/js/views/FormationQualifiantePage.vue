<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section avec image -->
    <div class="relative h-96 bg-gradient-to-r from-cyan-800 to-teal-800">
      <div class="absolute inset-0 opacity-30">
        <img src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=1920&h=500&fit=crop" alt="Formations" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-4">
          <i class="fas fa-certificate text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Certifications professionnelles reconnues</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Formations Qualifiantes</h1>
        <p class="text-xl text-cyan-100">Certifications professionnelles reconnues</p>
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
          <span class="text-primary font-semibold">Formations Qualifiantes</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-5 py-12">
      <!-- Certifications disponibles -->
      <div class="mb-12">
        <div class="text-center mb-10">
          <span class="text-primary font-semibold uppercase tracking-wide">Nos certifications</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Nos certifications professionnelles</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Des formations courtes pour booster votre carrière</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="certification in certifications" :key="certification.id" class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer" @click="openCertificationDetail(certification)">
            <!-- Image d'illustration -->
            <div class="relative h-48 overflow-hidden">
              <img :src="certification.image" :alt="certification.nom" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                <i :class="certification.icon + ' text-primary text-xl'"></i>
              </div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">⭐ Populaire</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold group-hover:text-primary transition">{{ certification.nom }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-gray-500 text-sm">{{ certification.duree }}</span>
                <span class="text-gray-300">•</span>
                <span class="text-gray-500 text-sm">{{ certification.mode }}</span>
              </div>
              <p class="text-gray-600 mt-3 line-clamp-2">{{ certification.description }}</p>
              
              <!-- Prix modèle expert -->
              <div class="mt-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-3">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-xs text-gray-500">À partir de</p>
                    <p class="text-2xl font-bold text-primary">{{ certification.prix.toLocaleString() }} FCFA</p>
                    <p class="text-xs text-gray-400">/formation</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-500 line-through">{{ (certification.prix * 1.25).toLocaleString() }} FCFA</p>
                    <p class="text-xs text-green-600">Économisez 25%</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <i class="fas fa-star text-yellow-400 text-sm"></i>
                  <span class="text-sm font-semibold">{{ certification.note }}</span>
                  <span class="text-xs text-gray-400">({{ certification.avis }} avis)</span>
                </div>
                <button @click.stop="openPreInscription(certification)" class="px-5 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center gap-2">
                  <i class="fas fa-arrow-right"></i> S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Avantages -->
      <div class="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-3xl p-8 mb-12">
        <h2 class="text-2xl font-bold text-center mb-8">Pourquoi choisir nos formations qualifiantes ?</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-certificate text-primary text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Certification reconnue</p>
            <p class="text-sm text-gray-500">Valeur ajoutée au CV</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-clock text-primary text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Formation courte</p>
            <p class="text-sm text-gray-500">2 à 6 mois</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-laptop text-primary text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">100% en ligne</p>
            <p class="text-sm text-gray-500">Accès illimité</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-chart-line text-primary text-2xl group-hover:text-white"></i>
            </div>
            <p class="font-semibold">Insertion rapide</p>
            <p class="text-sm text-gray-500">92% d'emploi</p>
          </div>
        </div>
      </div>

      <!-- Témoignages -->
      <div class="bg-white rounded-3xl shadow-lg p-8 mb-12">
        <h2 class="text-2xl font-bold text-center mb-8"> Ce que disent nos certifiés</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="temoignage in temoignages" :key="temoignage.id" class="text-center group hover:transform hover:-translate-y-2 transition duration-300">
            <div class="w-20 h-20 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold group-hover:scale-110 transition">
              {{ temoignage.initiale }}
            </div>
            <p class="italic text-gray-600">"{{ temoignage.message }}"</p>
            <p class="font-semibold mt-2">{{ temoignage.nom }}</p>
            <p class="text-sm text-gray-500">{{ temoignage.certification }}</p>
          </div>
        </div>
      </div>

      <!-- Section FAQ -->
      <div class="bg-white rounded-3xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-primary"></i> Quels sont les prérequis ?</h3>
            <p class="text-gray-600 text-sm mt-2">Aucun prérequis spécifique, ouverts à tous les profils motivés.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-primary"></i> La certification est-elle reconnue ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, nos certifications sont reconnues par les professionnels du secteur.</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-primary"></i> Peut-on financer sa formation ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, nous proposons des facilités de paiement (3x sans frais).</p>
          </div>
          <div class="border-b pb-4">
            <h3 class="font-bold flex items-center gap-2"><i class="fas fa-question-circle text-primary"></i> Y a-t-il un accompagnement ?</h3>
            <p class="text-gray-600 text-sm mt-2">Oui, un formateur dédié vous suit tout au long de la formation.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL PRÉ-INSCRIPTION amélioré -->
    <div v-if="preInscriptionModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closePreInscriptionModal">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-t-2xl p-6 text-center relative">
          <button @click="closePreInscriptionModal" class="absolute top-4 right-4 text-white/80 hover:text-white">
            <i class="fas fa-times text-xl"></i>
          </button>
          <i class="fas fa-certificate text-white text-4xl mb-2"></i>
          <h2 class="text-2xl font-bold text-white">Pré-inscription</h2>
          <p class="text-cyan-100">Formation Qualifiante - {{ selectedCertification?.nom }}</p>
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
            <div><label class="block text-sm font-semibold mb-1">Ville</label><input type="text" v-model="inscriptionData.city" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Profession</label><input type="text" v-model="inscriptionData.profession" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Niveau d'étude</label><select v-model="inscriptionData.level" class="w-full p-3 border rounded-xl"><option>Baccalauréat</option><option>BTS</option><option>Licence</option><option>Master</option><option>Doctorat</option></select></div>
          </div>
          <div class="mt-6 flex justify-between">
            <button @click="closePreInscriptionModal" class="border px-6 py-2 rounded-xl">Annuler</button>
            <button @click="nextStep" class="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3 rounded-xl">Suivant →</button>
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
            <label class="flex items-center gap-2"><input type="checkbox" v-model="inscriptionData.terms"> J'accepte les conditions générales</label>
          </div>
          <div class="mt-6 flex justify-between">
            <button @click="prevStep" class="border px-6 py-2 rounded-xl">← Précédent</button>
            <button @click="nextStep" class="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3 rounded-xl">Suivant →</button>
          </div>
        </div>

        <!-- Étape 3 avec prix détaillé -->
        <div v-show="currentStep === 3" class="p-6">
          <h3 class="text-xl font-bold mb-4">Frais de formation</h3>
          <div class="bg-cyan-50 rounded-xl p-6 mb-6">
            <div class="flex justify-between mb-3 pb-2 border-b">
              <span class="font-semibold">Détail des frais</span>
              <span class="font-semibold">Montant</span>
            </div>
            <div class="flex justify-between mb-2"><span>Frais de dossier</span><span>{{ (selectedCertification?.prix || 85000) * 0.2 }} FCFA</span></div>
            <div class="flex justify-between mb-2"><span>Frais de formation</span><span>{{ (selectedCertification?.prix || 85000) * 0.8 }} FCFA</span></div>
            <div class="flex justify-between mb-2"><span>Certification</span><span>Incluse</span></div>
            <div class="flex justify-between mb-2"><span>Support pédagogique</span><span>Inclus</span></div>
            <div class="border-t pt-3 mt-3 flex justify-between font-bold"><span>Total à payer</span><span class="text-primary text-xl">{{ selectedCertification?.prix || 85000 }} FCFA</span></div>
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
            <button @click="submitPreInscription" class="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3 rounded-xl">Confirmer l'inscription</button>
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
          <button @click="goToConfirmation" class="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-4 py-2 rounded-xl">Voir récapitulatif</button>
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

// Certifications qualifiantes avec images et notes
const certifications = ref([
  { id: 1, nom: 'Marketing Digital', duree: '3 mois', mode: '100% en ligne', prix: 85000, note: '4.9', avis: 156, description: 'SEO, Social Media, Email Marketing, Google Ads', icon: 'fas fa-chart-line', image: '/images/IMG_6067.JPG' },
  { id: 2, nom: 'Gestion de Projet (PMP)', duree: '4 mois', mode: 'Hybride', prix: 120000, note: '4.8', avis: 98, description: 'Méthodologie Agile, Waterfall, Outils de gestion', icon: 'fas fa-project-diagram', image: '/images/IMG_6048.JPG' },
  { id: 3, nom: 'Data Science', duree: '6 mois', mode: '100% en ligne', prix: 150000, note: '4.9', avis: 203, description: 'Python, Machine Learning, Analyse de données', icon: 'fas fa-database', image: '/images/IMG_6066.JPG' },
  { id: 4, nom: 'Développement Web Full Stack', duree: '6 mois', mode: '100% en ligne', prix: 140000, note: '4.8', avis: 178, description: 'HTML, CSS, JavaScript, React, Node.js', icon: 'fas fa-code', image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?w=400&h=250&fit=crop' },
  { id: 5, nom: 'Comptabilité & Gestion', duree: '4 mois', mode: 'Présentiel', prix: 90000, note: '4.7', avis: 87, description: 'Comptabilité générale, fiscalité, gestion financière', icon: 'fas fa-calculator', image: '/images/IMG_6049.JPG' },
  { id: 6, nom: 'Ressources Humaines', duree: '3 mois', mode: 'Hybride', prix: 80000, note: '4.8', avis: 112, description: 'Recrutement, paie, droit du travail', icon: 'fas fa-users', image: '/images/IMG_6057.JPG' }
]);

// Témoignages
const temoignages = ref([
  { id: 1, nom: 'Sophie M.', initiale: 'S', certification: 'Marketing Digital', message: 'Grâce à cette certification, j\'ai trouvé un emploi en agence digitale en seulement 2 mois.' },
  { id: 2, nom: 'Marc K.', initiale: 'M', certification: 'Gestion de Projet', message: 'Formation complète qui m\'a permis de décrocher mon PMP.' },
  { id: 3, nom: 'Laura T.', initiale: 'L', certification: 'Data Science', message: 'Des cours de qualité avec des formateurs experts.' }
]);

// États
const preInscriptionModalOpen = ref(false);
const successModalOpen = ref(false);
const selectedCertification = ref(null);
const currentStep = ref(1);

const inscriptionData = ref({ fullname: '', email: '', phone: '', city: '', profession: '', level: 'Baccalauréat', terms: false, cvFile: null, diplomaFile: null });
const paymentData = ref({ method: 'Orange Money', phone: '' });

const cvInput = ref(null);
const diplomaInput = ref(null);

const stepClass = (step) => {
  if (currentStep.value > step) return 'w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto';
  if (currentStep.value === step) return 'w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white flex items-center justify-center mx-auto';
  return 'w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto';
};

const goBack = () => { router.push('/formations'); };

const openCertificationDetail = (certification) => { selectedCertification.value = certification; preInscriptionModalOpen.value = true; currentStep.value = 1; };
const closePreInscriptionModal = () => { preInscriptionModalOpen.value = false; };
const nextStep = () => { if (currentStep.value < 3) currentStep.value++; };
const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };
const triggerFileInput = (type) => { if (type === 'cv') cvInput.value.click(); else diplomaInput.value.click(); };
const handleFileUpload = (event, type) => { const file = event.target.files[0]; if (file) inscriptionData.value[type + 'File'] = file; };
const submitPreInscription = () => { preInscriptionModalOpen.value = false; successModalOpen.value = true; };
const goToConfirmation = () => { successModalOpen.value = false; router.push({ path: '/confirmation', query: { titre: selectedCertification.value.nom, prix: selectedCertification.value.prix, fullname: inscriptionData.value.fullname, email: inscriptionData.value.email, method: paymentData.value.method, type: 'qualifiante' } }); };
</script>

<style scoped>
.modal-overlay { background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); }
.modal-container { animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { opacity:0; transform:translateY(-30px); } to { opacity:1; transform:translateY(0); } }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
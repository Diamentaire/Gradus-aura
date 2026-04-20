<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section avec image -->
    <div class="relative h-64 md:h-96 bg-gradient-to-r from-indigo-600 to-cyan-600">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute inset-0 flex items-center justify-center text-center">
        <div class="text-white px-4">
          <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ formation.titre }}</h1>
          <div class="flex flex-wrap justify-center gap-4 text-sm">
            <span class="flex items-center gap-1"><i class="fas fa-university"></i> {{ formation.etablissement }}</span>
            <span class="flex items-center gap-1"><i class="fas fa-map-marker-alt"></i> {{ formation.pays }}</span>
            <span class="flex items-center gap-1"><i class="fas fa-clock"></i> {{ formation.duree }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-5 py-12">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Colonne principale -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Description -->
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-xl font-bold mb-4">Description de la formation</h2>
            <p class="text-gray-600 leading-relaxed">{{ formation.descriptionLongue || formation.description }}</p>
          </div>

          <!-- Programme -->
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-xl font-bold mb-4">Programme de la formation</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="(module, idx) in formation.programme" :key="idx" class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <i class="fas fa-check-circle text-green-500"></i>
                <span>{{ module }}</span>
              </div>
            </div>
          </div>

          <!-- Débouchés -->
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-xl font-bold mb-4">Débouchés professionnels</h2>
            <div class="flex flex-wrap gap-3">
              <span v-for="(debouche, idx) in formation.debouches" :key="idx" class="px-4 py-2 bg-indigo-50 text-primary rounded-full text-sm">{{ debouche }}</span>
            </div>
          </div>

          <!-- Avis -->
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-xl font-bold mb-4">Avis des anciens étudiants</h2>
            <div class="space-y-4">
              <div v-for="(avis, idx) in avisList" :key="idx" class="border-b pb-4">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    {{ avis.nom.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-semibold">{{ avis.nom }}</p>
                    <div class="flex text-yellow-400 text-sm">
                      <i v-for="n in avis.note" :key="n" class="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p class="text-gray-600 text-sm italic">"{{ avis.commentaire }}"</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne droite - Carte d'inscription -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-6">
            <!-- Carte prix -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div class="text-center mb-6">
                <span class="text-4xl font-bold text-primary">{{ formation.prix.toLocaleString() }} FCFA</span>
                <p class="text-gray-500 text-sm">/ session</p>
              </div>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm"><span>Frais de dossier</span><span class="font-semibold">{{ (formation.prix * 0.3).toLocaleString() }} FCFA</span></div>
                <div class="flex justify-between text-sm"><span>Frais de scolarité</span><span class="font-semibold">{{ (formation.prix * 0.7).toLocaleString() }} FCFA</span></div>
                <div class="border-t pt-3 flex justify-between font-bold"><span>Total à payer</span><span class="text-primary">{{ formation.prix.toLocaleString() }} FCFA</span></div>
              </div>
              <button @click="openPreInscription" class="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                <i class="fas fa-edit mr-2"></i> Pré-inscription
              </button>
              <button @click="openInfoRequest" class="w-full mt-3 border border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition">
                <i class="fas fa-question-circle mr-2"></i> Demander des informations
              </button>
            </div>

            <!-- Informations clés -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <h3 class="font-bold mb-4">Informations clés</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between"><span class="text-gray-500">Niveau requis</span><span class="font-semibold">{{ formation.niveauRequis || 'Baccalauréat' }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Mode d'enseignement</span><span class="font-semibold">{{ formation.mode }}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Langue d'enseignement</span><span class="font-semibold">Français</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Prochaine rentrée</span><span class="font-semibold">Octobre 2025</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Places disponibles</span><span class="font-semibold text-green-600">45/100</span></div>
              </div>
            </div>

            <!-- Contact formateur -->
            <div class="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-2xl p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">P</div>
                <div><h3 class="font-bold">Dr. Professeur</h3><p class="text-xs text-gray-500">Responsable pédagogique</p></div>
              </div>
              <button class="w-full border border-primary text-primary py-2 rounded-xl text-sm hover:bg-primary hover:text-white transition">
                <i class="fas fa-envelope mr-2"></i> Contacter le responsable
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL PRÉ-INSCRIPTION -->
    <div v-if="preInscriptionModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closePreInscriptionModal">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="gradient-bg rounded-t-2xl p-6 text-center">
          <i class="fas fa-graduation-cap text-white text-4xl mb-2"></i>
          <h2 class="text-2xl font-bold text-white">Pré-inscription</h2>
          <p class="text-indigo-100">{{ formation.titre }}</p>
        </div>

        <!-- Étapes -->
        <div class="px-6 pt-6">
          <div class="flex justify-between mb-8">
            <div class="text-center flex-1"><div :class="stepClass(1)" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto">1</div><span class="text-xs">Informations</span></div>
            <div class="text-center flex-1"><div :class="stepClass(2)" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto">2</div><span class="text-xs">Documents</span></div>
            <div class="text-center flex-1"><div :class="stepClass(3)" class="w-10 h-10 rounded-full flex items-center justify-center mx-auto">3</div><span class="text-xs">Paiement</span></div>
          </div>
        </div>

        <!-- Étape 1 -->
        <div v-show="currentStep === 1" class="p-6">
          <h3 class="text-xl font-bold mb-4">Informations personnelles</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div><label class="block text-sm font-semibold mb-1">Nom complet *</label><input type="text" v-model="inscriptionData.fullname" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Email *</label><input type="email" v-model="inscriptionData.email" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Téléphone *</label><input type="tel" v-model="inscriptionData.phone" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Date de naissance</label><input type="date" v-model="inscriptionData.birthdate" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Ville</label><input type="text" v-model="inscriptionData.city" class="w-full p-3 border rounded-xl"></div>
            <div><label class="block text-sm font-semibold mb-1">Dernier diplôme</label><select v-model="inscriptionData.diploma" class="w-full p-3 border rounded-xl"><option>Baccalauréat</option><option>BTS</option><option>Licence</option><option>Master</option></select></div>
          </div>
          <div class="mt-6 flex justify-end"><button @click="nextStep" class="gradient-bg text-white px-8 py-3 rounded-xl">Suivant →</button></div>
        </div>

        <!-- Étape 2 -->
        <div v-show="currentStep === 2" class="p-6">
          <h3 class="text-xl font-bold mb-4">📎 Documents à fournir</h3>
          <div class="space-y-4">
            <div class="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-primary" @click="triggerFileInput('cv')">
              <i class="fas fa-upload text-2xl text-gray-400"></i><p>CV / Curriculum Vitae</p><input type="file" ref="cvInput" class="hidden" @change="handleFileUpload($event, 'cv')">
            </div>
            <div class="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-primary" @click="triggerFileInput('diploma')">
              <i class="fas fa-graduation-cap text-2xl text-gray-400"></i><p>Dernier diplôme</p><input type="file" ref="diplomaInput" class="hidden" @change="handleFileUpload($event, 'diploma')">
            </div>
            <label class="flex items-center gap-2"><input type="checkbox" v-model="inscriptionData.terms"> J'accepte les conditions générales</label>
          </div>
          <div class="mt-6 flex justify-between"><button @click="prevStep" class="border px-8 py-3 rounded-xl">← Précédent</button><button @click="nextStep" class="gradient-bg text-white px-8 py-3 rounded-xl">Suivant →</button></div>
        </div>

        <!-- Étape 3 -->
        <div v-show="currentStep === 3" class="p-6">
          <h3 class="text-xl font-bold mb-4">Paiement</h3>
          <div class="bg-indigo-50 rounded-xl p-6 mb-6">
            <div class="flex justify-between mb-3"><span>Frais de dossier</span><span class="font-bold">{{ (formation.prix * 0.3).toLocaleString() }} FCFA</span></div>
            <div class="flex justify-between mb-3"><span>Frais de scolarité</span><span class="font-bold">{{ (formation.prix * 0.7).toLocaleString() }} FCFA</span></div>
            <div class="border-t pt-3 flex justify-between font-bold"><span>Total</span><span class="text-primary">{{ formation.prix.toLocaleString() }} FCFA</span></div>
          </div>
          <div class="space-y-3">
            <label class="block font-semibold">Mode de paiement</label>
            <select v-model="paymentData.method" class="w-full p-3 border rounded-xl"><option>Orange Money</option><option>MTN Mobile Money</option><option>Carte Bancaire</option></select>
            <input type="text" v-model="paymentData.phone" placeholder="Numéro de téléphone" class="w-full p-3 border rounded-xl">
          </div>
          <div class="mt-6 flex justify-between"><button @click="prevStep" class="border px-8 py-3 rounded-xl">← Précédent</button><button @click="submitPreInscription" class="gradient-bg text-white px-8 py-3 rounded-xl">Confirmer l'inscription</button></div>
        </div>
      </div>
    </div>

    <!-- MODAL DEMANDE INFO -->
    <div v-if="infoModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeInfoModal">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container bg-white rounded-2xl max-w-md w-full"><div class="gradient-bg rounded-t-2xl p-6 text-center"><i class="fas fa-info-circle text-white text-4xl"></i><h2 class="text-2xl font-bold text-white">Demande d'information</h2></div><div class="p-6"><input type="text" v-model="infoData.fullname" placeholder="Nom complet" class="w-full p-3 border rounded-xl mb-3"><input type="email" v-model="infoData.email" placeholder="Email" class="w-full p-3 border rounded-xl mb-3"><textarea v-model="infoData.message" placeholder="Votre message" rows="4" class="w-full p-3 border rounded-xl mb-3"></textarea><button @click="submitInfoRequest" class="w-full gradient-bg text-white py-3 rounded-xl">Envoyer</button></div></div>
    </div>

    <!-- MODAL SUCCÈS -->
    <div v-if="successModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="successModalOpen=false">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container bg-white rounded-2xl max-w-md w-full text-center p-6"><div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4"><i class="fas fa-check-circle text-green-600 text-4xl"></i></div><h3 class="text-xl font-bold">Inscription réussie !</h3><p class="text-gray-600 mt-2">Un email de confirmation a été envoyé</p><button @click="successModalOpen=false; router.push('/dashboard')" class="mt-4 gradient-bg text-white px-6 py-2 rounded-xl">Voir tableau de bord</button></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Récupérer la formation depuis les paramètres
const formation = ref({
  id: route.query.id || 1,
  titre: route.query.titre || 'Master en Administration des Affaires',
  etablissement: 'Université de Douala',
  pays: 'Cameroun',
  duree: '2 ans',
  prix: 250000,
  mode: 'Distanciel',
  description: 'Formation complète en management des affaires',
  descriptionLongue: 'Cette formation vous prépare aux métiers du management...',
  programme: ['Marketing stratégique', 'Finance d\'entreprise', 'Gestion des RH', 'Management interculturel'],
  debouches: ['Consultant en management', 'Chef de projet', 'Directeur administratif'],
  niveauRequis: 'Licence'
});

// Avis
const avisList = ref([
  { nom: 'Marie L.', note: 5, commentaire: 'Excellente formation, les professeurs sont très compétents.' },
  { nom: 'Jean D.', note: 4, commentaire: 'Très bonne expérience, je recommande.' }
]);

// États modaux
const preInscriptionModalOpen = ref(false);
const infoModalOpen = ref(false);
const successModalOpen = ref(false);
const currentStep = ref(1);

// Données formulaire
const inscriptionData = ref({ fullname: '', email: '', phone: '', birthdate: '', city: '', diploma: 'Baccalauréat', terms: false, cvFile: null, diplomaFile: null });
const paymentData = ref({ method: 'Orange Money', phone: '' });
const infoData = ref({ fullname: '', email: '', message: '' });

// Références fichiers
const cvInput = ref(null);
const diplomaInput = ref(null);

const stepClass = (step) => {
  if (currentStep.value > step) return 'w-10 h-10 rounded-full step-completed flex items-center justify-center mx-auto';
  if (currentStep.value === step) return 'w-10 h-10 rounded-full step-active flex items-center justify-center mx-auto';
  return 'w-10 h-10 rounded-full step-pending flex items-center justify-center mx-auto';
};

const openPreInscription = () => { preInscriptionModalOpen.value = true; currentStep.value = 1; };
const closePreInscriptionModal = () => { preInscriptionModalOpen.value = false; };
const openInfoRequest = () => { infoModalOpen.value = true; };
const closeInfoModal = () => { infoModalOpen.value = false; };
const nextStep = () => { if (currentStep.value < 3) currentStep.value++; };
const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };
const triggerFileInput = (type) => { if (type === 'cv') cvInput.value.click(); else diplomaInput.value.click(); };
const handleFileUpload = (event, type) => { const file = event.target.files[0]; if (file) inscriptionData.value[type + 'File'] = file; };
const submitPreInscription = () => { preInscriptionModalOpen.value = false; successModalOpen.value = true; };
const submitInfoRequest = () => { infoModalOpen.value = false; successModalOpen.value = true; };
</script>

<style scoped>
.gradient-bg { background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%); }
.modal-overlay { background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); }
.modal-container { animation: slideIn 0.3s ease-out; }
@keyframes slideIn { from { opacity:0; transform:translateY(-30px); } to { opacity:1; transform:translateY(0); } }
.step-active { background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%); color: white; }
.step-completed { background: #10B981; color: white; }
.step-pending { background: white; color: #4F46E5; border: 2px solid #4F46E5; }
</style>
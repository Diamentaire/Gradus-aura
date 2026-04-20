<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
    <!-- Hero Section avec animation et image -->
    <section class="relative overflow-hidden bg-gradient-to-r from-purple-700 via-pink-700 to-rose-700 py-20">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
      </div>
      
      <div class="absolute inset-0">
        <div class="particles">
          <div v-for="i in 20" :key="i" class="particle" :style="{ left: Math.random() * 100 + '%', animationDelay: Math.random() * 5 + 's' }"></div>
        </div>
      </div>
      
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <i class="fas fa-folder-open text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Préparation à la mobilité</span>
        </div>
        
        <div class="animate-fadeInUp">
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Mon dossier étudiant</h1>
          <p class="text-indigo-100 text-xl max-w-2xl mx-auto">
            Préparez votre dossier de candidature pour les études à l'étranger
          </p>
        </div>
        
        <div class="absolute bottom-0 left-0 right-0">
          <svg class="w-full h-12 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-5 py-12">

        <!-- Progression -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 transform hover:shadow-xl transition">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-lg flex items-center gap-2">
              <i class="fas fa-chart-line text-primary"></i> Progression du dossier
            </h3>
            <span class="text-primary font-bold text-xl">{{ progression }}%</span>
          </div>
          <div class="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div class="bg-gradient-to-r from-primary to-indigo-600 h-4 rounded-full transition-all duration-700" :style="{ width: progression + '%' }">
              <div class="h-full w-full bg-gradient-to-r from-transparent to-white/20 animate-shimmer"></div>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-3 flex items-center gap-1">
            <i class="fas fa-info-circle text-primary"></i> Complétez toutes les sections pour finaliser votre dossier
          </p>
        </div>

        <!-- Sections -->
        <div class="space-y-6">
          <!-- Section 1: Informations personnelles -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:shadow-xl transition-all duration-300">
            <div @click="sections.personnelles.open = !sections.personnelles.open" class="flex justify-between items-center p-5 cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition">
              <div class="flex items-center gap-3">
                <div :class="sections.personnelles.complete ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'" class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  <i v-if="sections.personnelles.complete" class="fas fa-check text-sm"></i>
                  <span v-else>1</span>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Informations personnelles</h3>
                  <p class="text-xs text-gray-400">Votre identité et informations de base</p>
                </div>
              </div>
              <i :class="sections.personnelles.open ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-400 transition-transform"></i>
            </div>
            <div v-show="sections.personnelles.open" class="p-6 border-t bg-gray-50/30">
              <div class="grid md:grid-cols-2 gap-5">
                <div class="group">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-user text-primary mr-1"></i> Nom complet
                  </label>
                  <input type="text" v-model="dossier.nom" placeholder="Jean Dupont" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
                <div class="group">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-calendar-alt text-primary mr-1"></i> Date de naissance
                  </label>
                  <input type="date" v-model="dossier.dateNaissance" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
                <div class="group">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-flag text-primary mr-1"></i> Nationalité
                  </label>
                  <input type="text" v-model="dossier.nationalite" placeholder="Camerounaise" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
                <div class="group">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-map-marker-alt text-primary mr-1"></i> Lieu de naissance
                  </label>
                  <input type="text" v-model="dossier.lieuNaissance" placeholder="Yaoundé" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
              </div>
              <button @click="validerSection('personnelles')" class="mt-6 px-6 py-2.5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                <i class="fas fa-check-circle"></i> Valider cette section
              </button>
            </div>
          </div>

          <!-- Section 2: Coordonnées -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:shadow-xl transition-all duration-300">
            <div @click="sections.coordonnees.open = !sections.coordonnees.open" class="flex justify-between items-center p-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition">
              <div class="flex items-center gap-3">
                <div :class="sections.coordonnees.complete ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'" class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  <i v-if="sections.coordonnees.complete" class="fas fa-check text-sm"></i>
                  <span v-else>2</span>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Coordonnées</h3>
                  <p class="text-xs text-gray-400">Comment vous contacter</p>
                </div>
              </div>
              <i :class="sections.coordonnees.open ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-400 transition-transform"></i>
            </div>
            <div v-show="sections.coordonnees.open" class="p-6 border-t bg-gray-50/30">
              <div class="grid md:grid-cols-2 gap-5">
                <div class="group">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-envelope text-primary mr-1"></i> Email
                  </label>
                  <input type="email" v-model="dossier.email" placeholder="jean.dupont@email.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
                <div class="group">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-phone-alt text-primary mr-1"></i> Téléphone
                  </label>
                  <input type="tel" v-model="dossier.telephone" placeholder="+237 6XX XX XX XX" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
                <div class="group md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-home text-primary mr-1"></i> Adresse
                  </label>
                  <input type="text" v-model="dossier.adresse" placeholder="Votre adresse complète" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
                <div class="group">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-city text-primary mr-1"></i> Ville
                  </label>
                  <input type="text" v-model="dossier.ville" placeholder="Douala" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
                <div class="group">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-map-pin text-primary mr-1"></i> Code postal
                  </label>
                  <input type="text" v-model="dossier.codePostal" placeholder="00000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition">
                </div>
              </div>
              <button @click="validerSection('coordonnees')" class="mt-6 px-6 py-2.5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                <i class="fas fa-check-circle"></i> Valider cette section
              </button>
            </div>
          </div>

          <!-- Section 3: Parcours académique -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:shadow-xl transition-all duration-300">
            <div @click="sections.academique.open = !sections.academique.open" class="flex justify-between items-center p-5 cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition">
              <div class="flex items-center gap-3">
                <div :class="sections.academique.complete ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'" class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  <i v-if="sections.academique.complete" class="fas fa-check text-sm"></i>
                  <span v-else>3</span>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Parcours académique</h3>
                  <p class="text-xs text-gray-400">Votre parcours scolaire et universitaire</p>
                </div>
              </div>
              <i :class="sections.academique.open ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-400 transition-transform"></i>
            </div>
            <div v-show="sections.academique.open" class="p-6 border-t bg-gray-50/30">
              <div class="space-y-4">
                <div v-for="(diplome, idx) in dossier.diplomes" :key="idx" class="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div class="flex justify-between items-center mb-3">
                    <h4 class="font-semibold text-primary">
                      <i class="fas fa-graduation-cap mr-2"></i> Diplôme {{ idx + 1 }}
                    </h4>
                    <button v-if="idx > 0" @click="supprimerDiplome(idx)" class="text-red-400 hover:text-red-600 transition">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
                      <input type="text" v-model="diplome.nom" placeholder="Licence en Droit" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary transition">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Établissement</label>
                      <input type="text" v-model="diplome.etablissement" placeholder="Université de Yaoundé" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary transition">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Année d'obtention</label>
                      <input type="text" v-model="diplome.annee" placeholder="2023" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary transition">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Mention</label>
                      <input type="text" v-model="diplome.mention" placeholder="Assez bien" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary transition">
                    </div>
                  </div>
                </div>
                <button @click="ajouterDiplome" class="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  <i class="fas fa-plus-circle"></i> Ajouter un diplôme
                </button>
              </div>
              <button @click="validerSection('academique')" class="mt-6 px-6 py-2.5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                <i class="fas fa-check-circle"></i> Valider cette section
              </button>
            </div>
          </div>

          <!-- Section 4: Langues -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:shadow-xl transition-all duration-300">
            <div @click="sections.langues.open = !sections.langues.open" class="flex justify-between items-center p-5 cursor-pointer hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition">
              <div class="flex items-center gap-3">
                <div :class="sections.langues.complete ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'" class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  <i v-if="sections.langues.complete" class="fas fa-check text-sm"></i>
                  <span v-else>4</span>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Compétences linguistiques</h3>
                  <p class="text-xs text-gray-400">Langues parlées et certifications</p>
                </div>
              </div>
              <i :class="sections.langues.open ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-400 transition-transform"></i>
            </div>
            <div v-show="sections.langues.open" class="p-6 border-t bg-gray-50/30">
              <div class="space-y-4">
                <div v-for="(langue, idx) in dossier.langues" :key="idx" class="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div class="flex justify-between items-center mb-3">
                    <h4 class="font-semibold text-primary">
                      <i class="fas fa-language mr-2"></i> Langue {{ idx + 1 }}
                    </h4>
                    <button v-if="idx > 0" @click="supprimerLangue(idx)" class="text-red-400 hover:text-red-600 transition">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                  <div class="grid md:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                      <input type="text" v-model="langue.nom" placeholder="Français" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary transition">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                      <div class="relative">
                        <select v-model="langue.niveau" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary transition appearance-none">
                          <option value="">Sélectionner</option>
                          <option value="A1">Débutant (A1)</option>
                          <option value="A2">Élémentaire (A2)</option>
                          <option value="B1">Intermédiaire (B1)</option>
                          <option value="B2">Intermédiaire avancé (B2)</option>
                          <option value="C1">Avancé (C1)</option>
                          <option value="C2">Courant (C2)</option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Certification</label>
                      <input type="text" v-model="langue.certification" placeholder="TCF, TOEFL, IELTS..." class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary transition">
                    </div>
                  </div>
                </div>
                <button @click="ajouterLangue" class="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  <i class="fas fa-plus-circle"></i> Ajouter une langue
                </button>
              </div>
              <button @click="validerSection('langues')" class="mt-6 px-6 py-2.5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                <i class="fas fa-check-circle"></i> Valider cette section
              </button>
            </div>
          </div>

          <!-- Section 5: Documents -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:shadow-xl transition-all duration-300">
            <div @click="sections.documents.open = !sections.documents.open" class="flex justify-between items-center p-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition">
              <div class="flex items-center gap-3">
                <div :class="sections.documents.complete ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'" class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  <i v-if="sections.documents.complete" class="fas fa-check text-sm"></i>
                  <span v-else>5</span>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Documents à fournir</h3>
                  <p class="text-xs text-gray-400">Téléchargez vos documents officiels</p>
                </div>
              </div>
              <i :class="sections.documents.open ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-400 transition-transform"></i>
            </div>
            <div v-show="sections.documents.open" class="p-6 border-t bg-gray-50/30">
              <div class="space-y-3">
                <div v-for="doc in documentsList" :key="doc.id" class="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i class="fas fa-file-pdf text-primary"></i>
                    </div>
                    <div>
                      <p class="font-medium">{{ doc.nom }}</p>
                      <p class="text-xs text-gray-400">
                        <i class="fas fa-info-circle mr-1"></i>{{ doc.obligatoire ? 'Obligatoire' : 'Optionnel' }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="doc.uploaded" class="text-green-600 text-sm flex items-center gap-1">
                      <i class="fas fa-check-circle"></i> Téléchargé
                    </span>
                    <input 
                      type="file" 
                      :id="'file-' + doc.id" 
                      class="hidden" 
                      @change="handleFileUpload($event, doc)"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                    <button @click="triggerFileUpload(doc)" class="px-4 py-2 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-lg text-sm font-bold hover:shadow-lg transition flex items-center gap-1">
                      <i class="fas fa-upload"></i> Déposer
                    </button>
                  </div>
                </div>
              </div>
              <button @click="validerSection('documents')" class="mt-6 px-6 py-2.5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                <i class="fas fa-check-circle"></i> Valider cette section
              </button>
            </div>
          </div>
        </div>

        <!-- Bouton finalisation -->
        <div class="mt-10 flex justify-center">
          <button @click="finaliserDossier" :disabled="progression < 100" class="px-10 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg">
            <i class="fas fa-check-double"></i> Finaliser mon dossier
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <!-- Message de progression -->
        <div v-if="progression < 100" class="mt-6 text-center">
          <p class="text-sm text-gray-500 flex items-center justify-center gap-2">
            <i class="fas fa-hourglass-half text-primary"></i>
            Complétez toutes les sections ({{ sectionsComplete }}/5) pour finaliser votre dossier
          </p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const dossier = ref({
  nom: '',
  dateNaissance: '',
  nationalite: '',
  lieuNaissance: '',
  email: '',
  telephone: '',
  adresse: '',
  ville: '',
  codePostal: '',
  diplomes: [{ nom: '', etablissement: '', annee: '', mention: '' }],
  langues: [{ nom: '', niveau: '', certification: '' }]
});

const sections = ref({
  personnelles: { open: true, complete: false },
  coordonnees: { open: false, complete: false },
  academique: { open: false, complete: false },
  langues: { open: false, complete: false },
  documents: { open: false, complete: false }
});

const documentsList = ref([
  { id: 1, nom: 'CV / Curriculum Vitae', obligatoire: true, uploaded: false, file: null },
  { id: 2, nom: 'Lettre de motivation', obligatoire: true, uploaded: false, file: null },
  { id: 3, nom: 'Relevés de notes', obligatoire: true, uploaded: false, file: null },
  { id: 4, nom: 'Diplômes obtenus', obligatoire: true, uploaded: false, file: null },
  { id: 5, nom: 'Attestation de niveau de langue', obligatoire: true, uploaded: false, file: null },
  { id: 6, nom: 'Lettres de recommandation', obligatoire: false, uploaded: false, file: null },
  { id: 7, nom: 'Passeport (copie)', obligatoire: true, uploaded: false, file: null },
  { id: 8, nom: "Photo d'identité", obligatoire: true, uploaded: false, file: null }
]);

const sectionsComplete = computed(() => {
  let count = 0;
  if (sections.value.personnelles.complete) count++;
  if (sections.value.coordonnees.complete) count++;
  if (sections.value.academique.complete) count++;
  if (sections.value.langues.complete) count++;
  if (sections.value.documents.complete) count++;
  return count;
});

const progression = computed(() => {
  return (sectionsComplete.value / 5) * 100;
});

// Déclencher l'upload de fichier
const triggerFileUpload = (doc) => {
  const fileInput = document.getElementById(`file-${doc.id}`);
  if (fileInput) {
    fileInput.click();
  }
};

// Gérer l'upload de fichier
const handleFileUpload = (event, doc) => {
  const file = event.target.files[0];
  if (file) {
    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Taille maximum : 5 Mo');
      return;
    }
    
    // Vérifier le type de fichier
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format de fichier non supporté. Utilisez PDF, DOC, DOCX, JPG ou PNG.');
      return;
    }
    
    // Simuler le téléchargement
    doc.uploaded = true;
    doc.file = file;
    doc.fileName = file.name;
    
    // Animation de confirmation
    const btn = event.target.parentElement.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Téléchargé !';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 2000);
    }, 1000);
    
    alert(`Document "${doc.nom}" téléchargé avec succès !\n\nFichier : ${file.name}`);
  }
};

const validerSection = (section) => {
  // Vérifier que les champs obligatoires sont remplis
  if (section === 'documents') {
    const docsObligatoiresNonUploades = documentsList.value.filter(doc => doc.obligatoire && !doc.uploaded);
    if (docsObligatoiresNonUploades.length > 0) {
      alert(`Veuillez télécharger tous les documents obligatoires avant de valider cette section.\n\nDocuments manquants :\n- ${docsObligatoiresNonUploades.map(d => d.nom).join('\n- ')}`);
      return;
    }
  }
  
  sections.value[section].complete = true;
  
  // Animation de confirmation
  const btn = event.currentTarget;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validation...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Section validée !';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2000);
  }, 500);
};

const ajouterDiplome = () => {
  dossier.value.diplomes.push({ nom: '', etablissement: '', annee: '', mention: '' });
};

const supprimerDiplome = (index) => {
  dossier.value.diplomes.splice(index, 1);
};

const ajouterLangue = () => {
  dossier.value.langues.push({ nom: '', niveau: '', certification: '' });
};

const supprimerLangue = (index) => {
  dossier.value.langues.splice(index, 1);
};

const finaliserDossier = () => {
  if (progression.value === 100) {
    const dossierComplet = {
      ...dossier.value,
      documents: documentsList.value.map(doc => ({
        nom: doc.nom,
        uploaded: doc.uploaded,
        fileName: doc.fileName || null,
        obligatoire: doc.obligatoire
      })),
      dateCreation: new Date().toISOString(),
      statut: 'en_attente'
    };
    localStorage.setItem('dossier_etudiant', JSON.stringify(dossierComplet));
    alert('Félicitations ! Votre dossier a été finalisé avec succès.\n\nUn conseiller vous contactera sous 48h pour valider votre dossier.');
    router.push('/mobilite/suivi');
  }
};
</script>

<style scoped>
.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

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

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float 8s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
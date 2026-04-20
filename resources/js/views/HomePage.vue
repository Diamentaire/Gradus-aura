<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO -->
    <section class="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div class="container mx-auto px-5 lg:px-8 relative z-10">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="text-center md:text-left">
            <div class="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 mb-6">
              <i class="fas fa-star text-primary text-sm"></i>
              <span class="text-primary font-semibold text-sm">N°1 Préparation Concours & Examens</span>
            </div>
            <h1 class="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-dark">
              Transforme ton ambition 
              <span class="text-primary">en réussite</span>
            </h1>
            <p class="text-gray-500 text-lg mt-6 max-w-lg mx-auto md:mx-0">
              Cours, QCM chronométrés, tests blancs, suivi de progression & accompagnement personnalisé pour décrocher les concours administratifs, grandes écoles et tests de langue (TCF, TOEFL).
            </p>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start mt-8">
              <router-link to="/register" class="px-7 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 flex items-center gap-2">
                <i class="fas fa-chalkboard-user"></i> Commencer gratuitement
              </router-link>
              <a href="#formations" class="px-7 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/10 transition">
                <i class="fas fa-play-circle"></i> Découvrir la plateforme
              </a>
            </div>
            <div class="flex flex-wrap gap-6 justify-center md:justify-start mt-8 text-sm text-gray-500">
              <span><i class="fas fa-check-circle text-primary mr-1"></i> 150+ vidéos</span>
              <span><i class="fas fa-check-circle text-primary mr-1"></i> 2000+ QCM corrigés</span>
              <span><i class="fas fa-check-circle text-primary mr-1"></i> Tests blancs illimités</span>
            </div>
          </div>
          <div class="relative flex justify-center">
            <img 
              :src="graduateImage" 
              alt="Étudiante diplômée" 
              class="relative z-10 rounded-2xl shadow-2xl w-full max-w-md animate-float object-cover"
              @error="handleImageError"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION STATS -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label">
            <i :class="stat.icon + ' text-4xl text-primary mb-2'"></i>
            <div class="text-3xl font-bold text-primary">{{ stat.value }}</div>
            <p class="text-gray-500">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION CONCOURS APERÇU -->
    <section class="py-16 md:py-20 bg-lightgray">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-primary font-semibold uppercase tracking-wide">Prépare-toi aux meilleurs</span>
          <h2 class="font-display font-bold text-3xl md:text-4xl mt-2 text-dark">Concours & examens nationaux et internationaux</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="concours in concoursList" :key="concours.id" class="bg-white rounded-2xl p-6 shadow-md card-hover border border-gray-100">
            <div class="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-5">
              <i :class="concours.icon + ' text-white text-2xl'"></i>
            </div>
            <h3 class="text-xl font-bold">{{ concours.nom }}</h3>
            <p class="text-gray-500 text-sm">{{ concours.description }}</p>
            <div class="mt-5 flex justify-between items-center">
              <span class="font-bold text-primary">{{ concours.coefficient }}</span>
              <router-link to="/concours" class="text-primary font-semibold">Voir →</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION EXAMENS NATIONAUX -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-secondary font-semibold uppercase tracking-wide">Réussis tes examens</span>
          <h2 class="font-display font-bold text-3xl md:text-4xl mt-2 text-dark">Examens nationaux et diplômes</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Du BEPC au Doctorat, prépare-toi efficacement avec nos ressources complètes</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-lightgray rounded-2xl p-6 text-center card-hover">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-graduation-cap text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">BEPC</h3>
            <p class="text-sm text-gray-500 mt-2">Brevet d'Études du Premier Cycle</p>
            <router-link to="/examens" class="mt-4 inline-block text-primary text-sm font-semibold">Préparer →</router-link>
          </div>
          <div class="bg-lightgray rounded-2xl p-6 text-center card-hover">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-chart-line text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Probatoire</h3>
            <p class="text-sm text-gray-500 mt-2">Générale & Technique</p>
            <router-link to="/examens" class="mt-4 inline-block text-primary text-sm font-semibold">Préparer →</router-link>
          </div>
          <div class="bg-lightgray rounded-2xl p-6 text-center card-hover">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-trophy text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Baccalauréat</h3>
            <p class="text-sm text-gray-500 mt-2">Générale & Technique</p>
            <router-link to="/examens" class="mt-4 inline-block text-primary text-sm font-semibold">Préparer →</router-link>
          </div>
          <div class="bg-lightgray rounded-2xl p-6 text-center card-hover">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-university text-primary text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">BTS/Licence/Master</h3>
            <p class="text-sm text-gray-500 mt-2">Enseignement supérieur</p>
            <router-link to="/examens" class="mt-4 inline-block text-primary text-sm font-semibold">Préparer →</router-link>
          </div>
        </div>
        <div class="text-center mt-8">
          <router-link to="/examens" class="inline-flex items-center gap-2 text-primary font-semibold border-b-2 border-primary pb-1">
            Voir tous les examens <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SECTION FORMATIONS -->
    <section id="formations" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-secondary font-semibold uppercase tracking-wide">Notre offre pédagogique</span>
            <h2 class="font-display text-3xl md:text-4xl font-bold mt-2">Des formations 100% adaptées à ton rythme</h2>
            <p class="text-gray-500 mt-4">Présentiel, virtuel ou hybride : choisis ton mode. Bénéficie d'un accompagnement par des formateurs experts et d'une plateforme digitale (LMS) avec plus de 150 vidéos, sujets corrigés et examens blancs trimestriels.</p>
            <ul class="mt-6 space-y-3">
              <li class="flex gap-3"><i class="fas fa-check-circle text-primary text-xl"></i><span><strong>Formations diplômantes</strong> à distance (BTS, Licence, Master)</span></li>
              <li class="flex gap-3"><i class="fas fa-check-circle text-primary text-xl"></i><span><strong>Formations qualifiantes</strong> & techno-pédagogiques (IFIC)</span></li>
              <li class="flex gap-3"><i class="fas fa-check-circle text-primary text-xl"></i><span><strong>Prépa intensive aux concours</strong> avec suivi personnalisé</span></li>
              <li class="flex gap-3"><i class="fas fa-check-circle text-primary text-xl"></i><span><strong>Archives illimitées</strong> : annales, sujets types, correction détaillée</span></li>
            </ul>
            <div class="mt-8 flex flex-wrap gap-4">
              <router-link to="/formations" class="bg-primary text-white font-semibold px-7 py-3 rounded-xl shadow-md">
                Explorer le catalogue <i class="fas fa-arrow-right ml-1"></i>
              </router-link>
              <a href="#" class="border border-gray-300 px-7 py-3 rounded-xl font-semibold hover:bg-gray-50">Télécharger le guide</a>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-indigo-50 p-5 rounded-2xl text-center">
              <i class="fas fa-video text-4xl text-primary mb-2"></i>
              <h4 class="font-bold">150+ vidéos</h4>
              <p class="text-sm text-gray-500">Cours & replay</p>
            </div>
            <div class="bg-cyan-50 p-5 rounded-2xl text-center">
              <i class="fas fa-head-side-vr text-4xl text-secondary mb-2"></i>
              <h4 class="font-bold">Tests blancs</h4>
              <p class="text-sm text-gray-500">Chronométrés & corrigés</p>
            </div>
            <div class="bg-amber-50 p-5 rounded-2xl text-center">
              <i class="fas fa-chart-simple text-4xl text-primary mb-2"></i>
              <h4 class="font-bold">Statistiques</h4>
              <p class="text-sm text-gray-500">Suivi de progression</p>
            </div>
            <div class="bg-purple-50 p-5 rounded-2xl text-center">
              <i class="fas fa-users text-4xl text-purple-600 mb-2"></i>
              <h4 class="font-bold">Classes virtuelles</h4>
              <p class="text-sm text-gray-500">Interactions directes</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION NOS FORMATEURS (CARROUSEL AVEC 10 FORMATEURS) -->
    <section class="py-16 md:py-24 bg-lightgray">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold uppercase tracking-wide">Experts pédagogiques</span>
          <h2 class="font-display text-3xl md:text-4xl font-bold mt-2">Nos formateurs</h2>
          <p class="text-gray-600 mt-4 max-w-2xl mx-auto">Des professionnels expérimentés passionnés par la transmission du savoir</p>
        </div>
        
        <!-- Carrousel -->
        <div class="relative">
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="formateur in formateurs" :key="formateur.id" class="w-full flex-shrink-0 px-4">
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden text-center p-6">
                  <div class="relative inline-block">
                    <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/20">
                      <img :src="formateur.image" :alt="formateur.nom" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute -bottom-2 right-0 bg-primary rounded-full p-1">
                      <i class="fas fa-check-circle text-white text-sm"></i>
                    </div>
                  </div>
                  <h3 class="text-xl font-bold">{{ formateur.nom }}</h3>
                  <p class="text-primary font-semibold text-sm">{{ formateur.specialite }}</p>
                  <p class="text-gray-500 text-sm mt-2">{{ formateur.experience }}</p>
                  <div class="flex justify-center gap-2 mt-4">
                    <span v-for="n in 5" :key="n" class="text-yellow-400 text-sm">
                      <i class="fas fa-star"></i>
                    </span>
                  </div>
                  <div class="mt-4 flex justify-center gap-3">
                    <a :href="formateur.linkedin" class="text-gray-400 hover:text-primary transition"><i class="fab fa-linkedin text-xl"></i></a>
                    <a :href="formateur.twitter" class="text-gray-400 hover:text-primary transition"><i class="fab fa-twitter text-xl"></i></a>
                    <a :href="formateur.mail" class="text-gray-400 hover:text-primary transition"><i class="fas fa-envelope text-xl"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Boutons de navigation -->
          <button @click="prevSlide" class="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-primary hover:text-white transition z-10">
            <i class="fas fa-chevron-left text-xl"></i>
          </button>
          <button @click="nextSlide" class="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-primary hover:text-white transition z-10">
            <i class="fas fa-chevron-right text-xl"></i>
          </button>
        </div>
        
        <!-- Indicateurs -->
        <div class="flex justify-center gap-2 mt-6">
          <button 
            v-for="(_, index) in formateurs" 
            :key="index"
            @click="currentSlide = index"
            :class="['w-3 h-3 rounded-full transition-all', currentSlide === index ? 'bg-primary w-6' : 'bg-gray-300']"
          ></button>
        </div>
      </div>
    </section>

    <!-- SECTION RESSOURCES -->
    <section id="ressources" class="py-16 md:py-24 bg-lightgray">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold uppercase">Entraînement intensif</span>
          <h2 class="font-display text-3xl md:text-4xl font-bold mt-1">Simulateurs & banque de sujets</h2>
          <p class="text-gray-500 max-w-2xl mx-auto mt-3">Accède à des QCM chronométrés, sujets de concours précédents, et tests blancs interactifs avec correction automatique.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-2xl shadow-md card-hover">
            <i class="fas fa-stopwatch text-3xl text-primary mb-4"></i>
            <h3 class="text-xl font-bold">QCM chronométrés</h3>
            <p class="text-gray-500 mt-2">Entraîne-toi en conditions réelles avec minuteur et scores instantanés.</p>
            <router-link to="/register" class="mt-4 inline-block text-primary font-semibold">Commencer →</router-link>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-md card-hover">
            <i class="fas fa-file-alt text-3xl text-primary mb-4"></i>
            <h3 class="text-xl font-bold">Annales corrigées</h3>
            <p class="text-gray-500 mt-2">Sujets de concours des 5 dernières années avec corrections détaillées par expert.</p>
            <router-link to="/register" class="mt-4 inline-block text-primary font-semibold">Accéder →</router-link>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-md card-hover">
            <i class="fas fa-chalkboard text-3xl text-primary mb-4"></i>
            <h3 class="text-xl font-bold">Tests blancs complets</h3>
            <p class="text-gray-500 mt-2">Simulation d'épreuves complètes (écrit + oral) avec classement optionnel.</p>
            <router-link to="/register" class="mt-4 inline-block text-primary font-semibold">Planifier →</router-link>
          </div>
        </div>
        <div class="mt-10 bg-primary rounded-2xl p-8 text-white shadow-xl">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 class="text-2xl font-bold">🚀 Nouveau : Coaching IA personnalisé</h3>
              <p class="opacity-90">Recommandations intelligentes basées sur tes résultats et objectifs concours.</p>
            </div>
            <router-link to="/register" class="bg-white text-primary font-bold px-6 py-3 rounded-xl shadow-md">En savoir plus →</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- TÉMOIGNAGES -->
    <section id="temoignages" class="py-16 md:py-24 bg-lightgray">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold uppercase">Ils ont réussi</span>
          <h2 class="font-display text-3xl md:text-4xl font-bold">+ de 5000 candidats nous font confiance</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="bg-white p-6 rounded-2xl shadow-md">
            <div class="flex items-center gap-2 text-yellow-400 mb-3">
              <i v-for="n in 5" :key="n" class="fas fa-star"></i>
              <i v-if="testimonial.halfStar" class="fas fa-star-half-alt"></i>
            </div>
            <p class="italic text-gray-600">{{ testimonial.text }}</p>
            <div class="mt-4 flex items-center gap-3">
              <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {{ testimonial.initials }}
              </div>
              <div>
                <h4 class="font-bold">{{ testimonial.name }}</h4>
                <p class="text-xs text-gray-400">{{ testimonial.achievement }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<section class="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
  <div class="container mx-auto px-5">
    <div class="text-center mb-12">
      <span class="text-primary font-semibold uppercase tracking-wide">Trouve ta voie</span>
      <h2 class="text-3xl md:text-4xl font-bold mt-2">Bilan d'orientation gratuit</h2>
      <p class="text-gray-600 mt-4 max-w-2xl mx-auto">Découvre tes aptitudes, ta personnalité et les métiers qui te correspondent</p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      <div class="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-brain text-blue-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold">Test QI</h3>
        <p class="text-gray-500 text-sm mt-2">Évaluez vos capacités cognitives</p>
        <router-link to="/orientation/test-qi" class="mt-4 inline-block text-primary font-semibold">Commencer →</router-link>
      </div>
      
      <div class="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-chart-pie text-purple-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold">Test DISC</h3>
        <p class="text-gray-500 text-sm mt-2">Découvrez votre personnalité</p>
        <router-link to="/orientation/test-disc" class="mt-4 inline-block text-primary font-semibold">Commencer →</router-link>
      </div>
      
      <div class="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-chart-bar text-green-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold">Test RIASEC</h3>
        <p class="text-gray-500 text-sm mt-2">Identifiez vos intérêts professionnels</p>
        <router-link to="/orientation/test-riasec" class="mt-4 inline-block text-primary font-semibold">Commencer →</router-link>
      </div>
    </div>
  </div>
</section>

    <!-- CALL TO ACTION -->
    <section class="py-20 bg-primary relative overflow-hidden">
      <div class="container mx-auto px-5 lg:px-8 text-center relative z-10">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-white">Prêt à décrocher ton concours ?</h2>
        <p class="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">Rejoins des milliers d'étudiants et bénéficie d'un accompagnement premium, de contenus exclusifs et d'un suivi personnalisé.</p>
        <div class="mt-8 flex flex-wrap gap-4 justify-center">
          <router-link to="/register" class="bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
            Créer un compte gratuit
          </router-link>
          <router-link to="/contact" class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10">
            Contactez un conseiller
          </router-link>
        </div>
        <p class="text-indigo-200 text-sm mt-6">Accès immédiat aux cours & tests. Sans engagement.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Image de l'étudiante diplômée
const graduateImage = ref('/images/IMG_6055.JPG');

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/600x550/4F46E5/FFFFFF?text=🎓+Étudiant+Diplômé';
};

// Statistiques
const stats = ref([
  { icon: 'fas fa-chart-line', value: '+78%', label: 'de progression moyenne' },
  { icon: 'fas fa-users', value: '5.2k', label: 'candidats formés' },
  { icon: 'fas fa-book-open', value: '340+', label: 'ressources pédagogiques' },
  { icon: 'fas fa-trophy', value: '89%', label: 'taux de réussite concours' }
]);

// Concours
const concoursList = ref([
  { id: 1, nom: 'Concours Administratifs', description: 'Fonction publique, ENIEG, INJS, IRIC...', icon: 'fas fa-landmark', coefficient: 'Coefficients 4-6' },
  { id: 2, nom: 'Grandes Écoles & BTS', description: 'Ingénieurs, Commerce, BTS, Licences', icon: 'fas fa-chart-line', coefficient: 'Prépa intensive' },
  { id: 3, nom: 'Tests de langue', description: 'TCF / TOEFL, mobilité internationale', icon: 'fas fa-language', coefficient: 'Certification' }
]);

// 10 FORMATEURS
const currentSlide = ref(0);
const formateurs = ref([
  {
    id: 1,
    nom: 'Dr. Jean Mbarga',
    specialite: 'Préparation aux concours administratifs',
    experience: '15 ans d\'expérience • Ancien examinateur ENAM',
    image: '/images/IMG_6071.JPG',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 2,
    nom: 'Prof. Marie Claire',
    specialite: 'Langues et tests internationaux (TCF/TOEFL)',
    experience: '12 ans d\'expérience • Formatrice certifiée',
    image: '/images/IMG_6070.JPG',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 3,
    nom: 'Dr. Paul André',
    specialite: 'Mathématiques et sciences',
    experience: '10 ans d\'expérience • Docteur en mathématiques',
    image: '/images/IMG_6072.JPG',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 4,
    nom: 'Mme. Sarah Ngono',
    specialite: 'Culture générale et actualités',
    experience: '8 ans d\'expérience • Journaliste et rédactrice',
    image: '/images/IMG_6073.JPG',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 5,
    nom: 'Prof. Emmanuel Tchinda',
    specialite: 'Philosophie et dissertation',
    experience: '20 ans d\'expérience • Docteur en philosophie',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=200&h=200&fit=crop',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 6,
    nom: 'Dr. Rose Ngo Mbarga',
    specialite: 'SVT (Sciences de la Vie et de la Terre)',
    experience: '14 ans d\'expérience • Chercheuse en biologie',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=200&h=200&fit=crop',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 7,
    nom: 'Prof. Jacques Kengne',
    specialite: 'Histoire-Géographie',
    experience: '18 ans d\'expérience • Ancien membre du jury',
    image: 'https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?w=200&h=200&fit=crop',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 8,
    nom: 'Mme. Céline Mvondo',
    specialite: 'Anglais et communication',
    experience: '10 ans d\'expérience • Formatrice en langues',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=200&h=200&fit=crop',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 9,
    nom: 'Dr. Samuel Fouda',
    specialite: 'Physique-Chimie',
    experience: '16 ans d\'expérience • Chercheur en physique',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=200&h=200&fit=crop',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  },
  {
    id: 10,
    nom: 'Prof. Henriette Djoumessi',
    specialite: 'Économie et gestion',
    experience: '12 ans d\'expérience • Consultante en finance',
    image: 'https://images.pexels.com/photos/3769028/pexels-photo-3769028.jpeg?w=200&h=200&fit=crop',
    linkedin: '#',
    twitter: '#',
    mail: '#'
  }
]);

// Témoignages
const testimonials = ref([
  { id: 1, text: '"Grâce aux tests blancs chronométrés et aux cours vidéo, j\'ai intégré l\'ENAM à ma première tentative. Suivi parfait !"', name: 'Marie L.', initials: 'ML', achievement: 'Concours administratif 2024', halfStar: false },
  { id: 2, text: '"La plateforme TCF m\'a permis d\'atteindre le niveau C1 en seulement 2 mois. Les simulations orales sont bluffantes."', name: 'Jean D.', initials: 'JD', achievement: 'Mobilité Canada', halfStar: false },
  { id: 3, text: '"Le tableau de bord avec statistiques m\'a motivé au quotidien. Une vraie prépa digitale comme je n\'avais jamais vu."', name: 'Aïcha T.', initials: 'AT', achievement: 'Grande école de commerce', halfStar: true }
]);

// Fonctions du carrousel
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % formateurs.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + formateurs.value.length) % formateurs.value.length;
};
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
.card-hover { transition: all 0.3s ease; }
.card-hover:hover { transform: translateY(-8px); box-shadow: 0 25px 40px -12px rgba(0,0,0,0.25); }
.bg-lightgray { background-color: #F8FAFC; }
.text-primary { color: #4F46E5; }
.text-secondary { color: #06B6D4; }
.bg-primary { background-color: #4F46E5; }
</style>
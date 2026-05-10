<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- HERO SECTION -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 pt-16 pb-20 md:pt-20 md:pb-28">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-5 lg:px-8 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-file-alt text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Plateforme officielle des examens camerounais</span>
        </div>
        <h1 class="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white">
          Annales officielles <span class="text-yellow-300">Cameroun 2020-2025</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-6 max-w-3xl mx-auto">
          Téléchargez gratuitement les sujets et corrigés officiels du BEPC au Doctorat
        </p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-download text-white"></i>
            <span class="text-white text-sm">2000+ sujets</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-check-circle text-white"></i>
            <span class="text-white text-sm">Corrigés inclus</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-line text-white"></i>
            <span class="text-white text-sm">Mise à jour 2025</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <!-- STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-600 group-hover:text-white transition">
              <i class="fas fa-file-alt text-indigo-600 text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-gray-800">2000+</span>
            <span class="text-xs text-gray-500">Sujets disponibles</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-600 group-hover:text-white transition">
              <i class="fas fa-check-circle text-indigo-600 text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-gray-800">100%</span>
            <span class="text-xs text-gray-500">Corrigés officiels</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-600 group-hover:text-white transition">
              <i class="fas fa-calendar-alt text-indigo-600 text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-gray-800">2020-2025</span>
            <span class="text-xs text-gray-500">6 années d'archives</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-600 group-hover:text-white transition">
              <i class="fas fa-users text-indigo-600 text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-gray-800">50K+</span>
            <span class="text-xs text-gray-500">Étudiants servis</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-600 group-hover:text-white transition">
              <i class="fas fa-trophy text-indigo-600 text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-gray-800">89%</span>
            <span class="text-xs text-gray-500">Taux de réussite</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ONGLETS DE NAVIGATION PRINCIPAUX AVEC EFFET VISUEL -->
    <div class="sticky top-0 z-40 bg-white shadow-md">
      <div class="container mx-auto px-5 lg:px-8">
        <div class="flex flex-wrap overflow-x-auto justify-center gap-2 py-4">
          <button 
            v-for="category in examCategories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap',
              activeCategory === category.id 
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            <i :class="category.icon + ' mr-2'"></i>
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- CONTENU DYNAMIQUE DES EXAMENS -->
    <div class="py-12">
      <div class="container mx-auto px-5 lg:px-8">

        <!-- ==================== BEPC ==================== -->
        <div v-if="activeCategory === 'bepc'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-graduation-cap text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">BEPC - Brevet d'Études du Premier Cycle</h2>
            <p class="text-gray-500 text-sm mt-2">Sujets officiels du Cameroun (2020 - 2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="annee in annees" :key="annee" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-file-pdf mr-1"></i> EXAMEN OFFICIEL
                </div>
                <div class="absolute top-3 right-3 bg-indigo-600 text-white px-4 py-1 rounded-xl font-bold text-lg">
                  {{ annee }}
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-14">
                  <div class="flex items-center gap-2 text-white/80 text-xs mb-1">
                    <i class="fas fa-book"></i>
                    <span>BEPC - Session {{ annee }}</span>
                  </div>
                  <h3 class="text-lg font-bold text-white">Brevet d'Études du Premier Cycle</h3>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="bg-white/20 px-2 py-0.5 rounded-full text-white text-xs"><i class="fas fa-file-pdf mr-1"></i> Sujets + Corrigés</span>
                  </div>
                </div>
              </div>
              <div class="p-4">
                <div class="grid grid-cols-2 gap-2 mb-3">
                  <div v-for="matiere in bepcMatieres.slice(0,6)" :key="matiere.id" class="flex justify-between items-center p-1 border-b text-xs">
                    <span class="truncate"><i class="fas fa-book-open text-gray-400 mr-1"></i>{{ matiere.nom }}</span>
                    <a :href="getBepcUrl(annee, matiere.nom)" target="_blank" class="text-indigo-600 hover:underline">
                      <i class="fas fa-download"></i>
                    </a>
                  </div>
                </div>
                <a :href="getBepcAnnalesUrl(annee)" target="_blank" class="mt-2 w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <i class="fas fa-download"></i> Tout télécharger
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== PROBATOIRE GÉNÉRALE ==================== -->
        <div v-if="activeCategory === 'probatoireG'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-chart-line text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Probatoire Générale</h2>
            <p class="text-gray-500 text-sm mt-2">Séries A, C, D, E - Sujets officiels du Cameroun (2020 - 2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="serie in probatoireSeries" :key="serie.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-file-pdf mr-1"></i> SÉRIE {{ serie.nom }}
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-14 text-center">
                  <i :class="serie.icon + ' text-white text-3xl'"></i>
                  <h3 class="text-xl font-bold text-white mt-1">Série {{ serie.nom }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-2 mb-3">
                  <div v-for="matiere in serie.matieres.slice(0,5)" :key="matiere" class="flex justify-between items-center p-1 border-b text-xs">
                    <span class="truncate"><i class="fas fa-book-open text-gray-400 mr-1"></i>{{ matiere }}</span>
                    <div class="flex gap-1">
                      <a :href="getProbatoireUrl(serie.nom, matiere, 'sujet')" target="_blank" class="text-indigo-600 text-xs hover:underline"><i class="fas fa-file-pdf"></i></a>
                      <a :href="getProbatoireUrl(serie.nom, matiere, 'corrige')" target="_blank" class="text-green-600 text-xs hover:underline"><i class="fas fa-check-circle"></i></a>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1 justify-center">
                  <a v-for="annee in annees" :key="annee" :href="getProbatoireAnnalesUrl(serie.nom, annee)" target="_blank" class="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs hover:bg-indigo-600 hover:text-white transition">
                    {{ annee }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== BAC GÉNÉRALE ==================== -->
        <div v-if="activeCategory === 'bacG'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-trophy text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Baccalauréat Générale</h2>
            <p class="text-gray-500 text-sm mt-2">Séries A, C, D, E - Sujets officiels du Cameroun (2020 - 2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="serie in bacSeries" :key="serie.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-file-pdf mr-1"></i> SÉRIE {{ serie.nom }}
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-14 text-center">
                  <i :class="serie.icon + ' text-white text-3xl'"></i>
                  <h3 class="text-xl font-bold text-white mt-1">Série {{ serie.nom }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-2 mb-3">
                  <div v-for="matiere in serie.matieres.slice(0,5)" :key="matiere" class="flex justify-between items-center p-1 border-b text-xs">
                    <span class="truncate"><i class="fas fa-book-open text-gray-400 mr-1"></i>{{ matiere }}</span>
                    <div class="flex gap-1">
                      <a :href="getBacUrl(serie.nom, matiere, 'sujet')" target="_blank" class="text-indigo-600 text-xs hover:underline"><i class="fas fa-file-pdf"></i></a>
                      <a :href="getBacUrl(serie.nom, matiere, 'corrige')" target="_blank" class="text-green-600 text-xs hover:underline"><i class="fas fa-check-circle"></i></a>
                    </div>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1 justify-center">
                  <a v-for="annee in annees" :key="annee" :href="getBacAnnalesUrl(serie.nom, annee)" target="_blank" class="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs hover:bg-indigo-600 hover:text-white transition">
                    {{ annee }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== PROBATOIRE TECHNIQUE ==================== -->
        <div v-if="activeCategory === 'probatoireT'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-tools text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Probatoire Technique</h2>
            <p class="text-gray-500 text-sm mt-2">Filières industrielles et tertiaires - Sujets officiels (2020-2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="filiere in probatoireTech" :key="filiere.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-industry mr-1"></i> Technique
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-12 text-center">
                  <i :class="filiere.icon + ' text-white text-3xl'"></i>
                  <h3 class="text-lg font-bold text-white mt-1">{{ filiere.nom }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-2 mb-3">
                  <div v-for="annee in annees.slice(0,4)" :key="annee" class="flex justify-between items-center p-1 border-b text-xs">
                    <span><i class="fas fa-calendar text-gray-400 mr-1"></i>Session {{ annee }}</span>
                    <div class="flex gap-1">
                      <a :href="getProbatoireTechUrl(filiere.nom, annee, 'sujet')" target="_blank" class="text-indigo-600"><i class="fas fa-file-pdf"></i></a>
                      <a :href="getProbatoireTechUrl(filiere.nom, annee, 'corrige')" target="_blank" class="text-green-600"><i class="fas fa-check-circle"></i></a>
                    </div>
                  </div>
                </div>
                <a :href="getProbatoireTechAnnalesUrl(filiere.nom)" target="_blank" class="w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <i class="fas fa-download"></i> Annales
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== BAC TECHNIQUE ==================== -->
        <div v-if="activeCategory === 'bacT'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-industry text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Baccalauréat Technique</h2>
            <p class="text-gray-500 text-sm mt-2">Filières industrielles, tertiaires et hôtelières - Sujets officiels (2020-2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="filiere in bacTech" :key="filiere.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-microchip mr-1"></i> Bac Technique
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-12 text-center">
                  <i :class="filiere.icon + ' text-white text-3xl'"></i>
                  <h3 class="text-lg font-bold text-white mt-1">{{ filiere.nom }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-2 mb-3">
                  <div v-for="annee in annees.slice(0,4)" :key="annee" class="flex justify-between items-center p-1 border-b text-xs">
                    <span><i class="fas fa-calendar text-gray-400 mr-1"></i>Session {{ annee }}</span>
                    <div class="flex gap-1">
                      <a :href="getBacTechUrl(filiere.nom, annee, 'sujet')" target="_blank" class="text-indigo-600"><i class="fas fa-file-pdf"></i></a>
                      <a :href="getBacTechUrl(filiere.nom, annee, 'corrige')" target="_blank" class="text-green-600"><i class="fas fa-check-circle"></i></a>
                    </div>
                  </div>
                </div>
                <a :href="getBacTechAnnalesUrl(filiere.nom)" target="_blank" class="w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <i class="fas fa-download"></i> Annales
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== BTS ==================== -->
        <div v-if="activeCategory === 'bts'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-certificate text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">BTS - Brevet de Technicien Supérieur</h2>
            <p class="text-gray-500 text-sm mt-2">Toutes spécialités - Sujets officiels Cameroun (2020-2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="specialite in btsSpecialites" :key="specialite.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-graduation-cap mr-1"></i> BTS
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-12 text-center">
                  <i :class="specialite.icon + ' text-white text-3xl'"></i>
                  <h3 class="text-sm font-bold text-white mt-1">{{ specialite.nom }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-2 mb-3">
                  <div v-for="annee in annees.slice(0,4)" :key="annee" class="flex justify-between items-center p-1 border-b text-xs">
                    <span><i class="fas fa-calendar text-gray-400 mr-1"></i>Session {{ annee }}</span>
                    <a :href="getBtsUrl(specialite.nom, annee)" target="_blank" class="text-indigo-600"><i class="fas fa-download"></i></a>
                  </div>
                </div>
                <a :href="getBtsAnnalesUrl(specialite.nom)" target="_blank" class="w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <i class="fas fa-download"></i> Annales
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== LICENCE ==================== -->
        <div v-if="activeCategory === 'licence'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-university text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Licence (L1, L2, L3)</h2>
            <p class="text-gray-500 text-sm mt-2">Examens universitaires - Toutes filières (2020-2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="filiere in licenceFilieres" :key="filiere.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-graduation-cap mr-1"></i> Licence
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-12 text-center">
                  <i :class="filiere.icon + ' text-white text-2xl'"></i>
                  <h3 class="text-xs font-bold text-white mt-1">{{ filiere.nom }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-2 mb-3">
                  <div v-for="niveau in ['L1', 'L2', 'L3']" :key="niveau" class="flex justify-between items-center p-1 border-b text-xs">
                    <span><i class="fas fa-layer-group text-gray-400 mr-1"></i>{{ niveau }}</span>
                    <a :href="getLicenceUrl(filiere.nom, niveau)" target="_blank" class="text-indigo-600"><i class="fas fa-download"></i></a>
                  </div>
                </div>
                <a :href="getLicenceAnnalesUrl(filiere.nom)" target="_blank" class="w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <i class="fas fa-download"></i> Annales
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== MASTER ==================== -->
        <div v-if="activeCategory === 'master'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-chalkboard-user text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Master (M1, M2)</h2>
            <p class="text-gray-500 text-sm mt-2">Examens universitaires - Toutes spécialités (2020-2025)</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="specialite in masterSpecialites" :key="specialite.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-chalkboard-user mr-1"></i> Master
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-12 text-center">
                  <i :class="specialite.icon + ' text-white text-2xl'"></i>
                  <h3 class="text-xs font-bold text-white mt-1">{{ specialite.nom }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-2 mb-3">
                  <div v-for="niveau in ['M1', 'M2']" :key="niveau" class="flex justify-between items-center p-1 border-b text-xs">
                    <span><i class="fas fa-layer-group text-gray-400 mr-1"></i>{{ niveau }}</span>
                    <a :href="getMasterUrl(specialite.nom, niveau)" target="_blank" class="text-indigo-600"><i class="fas fa-download"></i></a>
                  </div>
                </div>
                <a :href="getMasterAnnalesUrl(specialite.nom)" target="_blank" class="w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <i class="fas fa-download"></i> Annales
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== DOCTORAT ==================== -->
        <div v-if="activeCategory === 'doctorat'" class="animate-fadeIn">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i class="fas fa-microscope text-indigo-600 text-2xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Doctorat / Thèse</h2>
            <p class="text-gray-500 text-sm mt-2">Sujets de thèse, examens doctoraux et publications (2020-2025)</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="domaine in doctoratDomaines" :key="domaine.id" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="relative">
                <div class="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  <i class="fas fa-microscope mr-1"></i> Doctorat
                </div>
                <div class="bg-gradient-to-r from-indigo-500 to-cyan-500 p-5 pt-12 text-center">
                  <i :class="domaine.icon + ' text-white text-3xl'"></i>
                  <h3 class="text-lg font-bold text-white mt-1">{{ domaine.nom }}</h3>
                </div>
              </div>
              <div class="p-4">
                <div class="space-y-2 mb-3">
                  <div v-for="annee in annees.slice(0,4)" :key="annee" class="flex justify-between items-center p-1 border-b text-xs">
                    <span><i class="fas fa-calendar text-gray-400 mr-1"></i>Session {{ annee }}</span>
                    <a :href="getDoctoratUrl(domaine.nom, annee)" target="_blank" class="text-indigo-600"><i class="fas fa-download"></i></a>
                  </div>
                </div>
                <a :href="getDoctoratAnnalesUrl(domaine.nom)" target="_blank" class="w-full py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                  <i class="fas fa-download"></i> Archives
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION CONSEILS -->
        <div class="mt-16 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl p-8 text-white">
          <h3 class="text-xl font-bold mb-4 text-center"><i class="fas fa-lightbulb mr-2"></i> Conseils pour réussir vos examens</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="flex gap-3 items-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <i class="fas fa-calendar-alt text-2xl"></i>
              <div><h4 class="font-semibold">Planification</h4><p class="text-sm text-indigo-100">Établissez un planning de révisions réaliste</p></div>
            </div>
            <div class="flex gap-3 items-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <i class="fas fa-stopwatch text-2xl"></i>
              <div><h4 class="font-semibold">Entraînement</h4><p class="text-sm text-indigo-100">Faites des sujets chronométrés régulièrement</p></div>
            </div>
            <div class="flex gap-3 items-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <i class="fas fa-chalkboard-user text-2xl"></i>
              <div><h4 class="font-semibold">Accompagnement</h4><p class="text-sm text-indigo-100">Bénéficiez du suivi de nos formateurs experts</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Catégories pour les onglets
const examCategories = ref([
  { id: 'bepc', name: 'BEPC', icon: 'fas fa-graduation-cap' },
  { id: 'probatoireG', name: 'Probatoire Générale', icon: 'fas fa-chart-line' },
  { id: 'bacG', name: 'Baccalauréat Générale', icon: 'fas fa-trophy' },
  { id: 'probatoireT', name: 'Probatoire Technique', icon: 'fas fa-tools' },
  { id: 'bacT', name: 'Baccalauréat Technique', icon: 'fas fa-industry' },
  { id: 'bts', name: 'BTS', icon: 'fas fa-certificate' },
  { id: 'licence', name: 'Licence', icon: 'fas fa-university' },
  { id: 'master', name: 'Master', icon: 'fas fa-chalkboard-user' },
  { id: 'doctorat', name: 'Doctorat', icon: 'fas fa-microscope' }
]);

const activeCategory = ref('bepc');

// Années disponibles
const annees = ref([2020, 2021, 2022, 2023, 2024, 2025]);

// Matières BEPC
const bepcMatieres = ref([
  { id: 1, nom: 'Français', icon: 'fas fa-book', coefficient: 4 },
  { id: 2, nom: 'Maths', icon: 'fas fa-calculator', coefficient: 4 },
  { id: 3, nom: 'Anglais', icon: 'fas fa-language', coefficient: 3 },
  { id: 4, nom: 'Sciences Physiques', icon: 'fas fa-flask', coefficient: 2 },
  { id: 5, nom: 'SVT', icon: 'fas fa-leaf', coefficient: 2 },
  { id: 6, nom: 'Histoire-Géo', icon: 'fas fa-globe', coefficient: 2 },
  { id: 7, nom: 'Éducation Civique', icon: 'fas fa-gavel', coefficient: 1 },
  { id: 8, nom: 'Informatique', icon: 'fas fa-laptop', coefficient: 1 }
]);

// Probatoire Générale
const probatoireSeries = ref([
  { id: 1, nom: 'A', icon: 'fas fa-book', matieres: ['Français', 'Anglais', 'Philosophie', 'Histoire', 'Géographie', 'Maths'] },
  { id: 2, nom: 'C', icon: 'fas fa-calculator', matieres: ['Maths', 'Physique', 'Chimie', 'SVT', 'Anglais', 'Philosophie'] },
  { id: 3, nom: 'D', icon: 'fas fa-leaf', matieres: ['SVT', 'Maths', 'Physique', 'Chimie', 'Anglais', 'Philosophie'] },
  { id: 4, nom: 'E', icon: 'fas fa-chart-line', matieres: ['Économie', 'Maths', 'Comptabilité', 'Gestion', 'Anglais', 'Philosophie'] }
]);

// Bac Générale
const bacSeries = ref([
  { id: 1, nom: 'A', icon: 'fas fa-book', matieres: ['Français', 'Anglais', 'Philosophie', 'Histoire', 'Géographie', 'Maths'] },
  { id: 2, nom: 'C', icon: 'fas fa-calculator', matieres: ['Maths', 'Physique', 'Chimie', 'SVT', 'Anglais', 'Philosophie'] },
  { id: 3, nom: 'D', icon: 'fas fa-leaf', matieres: ['SVT', 'Maths', 'Physique', 'Chimie', 'Anglais', 'Philosophie'] },
  { id: 4, nom: 'E', icon: 'fas fa-chart-line', matieres: ['Économie', 'Maths', 'Comptabilité', 'Gestion', 'Anglais', 'Philosophie'] }
]);

// Probatoire Technique
const probatoireTech = ref([
  { id: 1, nom: 'Génie Civil', icon: 'fas fa-hard-hat' },
  { id: 2, nom: 'Génie Mécanique', icon: 'fas fa-cogs' },
  { id: 3, nom: 'Électrotechnique', icon: 'fas fa-bolt' },
  { id: 4, nom: 'Informatique', icon: 'fas fa-laptop-code' },
  { id: 5, nom: 'Gestion', icon: 'fas fa-chart-line' },
  { id: 6, nom: 'Hôtellerie', icon: 'fas fa-hotel' }
]);

// Bac Technique
const bacTech = ref([
  { id: 1, nom: 'Génie Civil', icon: 'fas fa-hard-hat' },
  { id: 2, nom: 'Génie Mécanique', icon: 'fas fa-cogs' },
  { id: 3, nom: 'Électrotechnique', icon: 'fas fa-bolt' },
  { id: 4, nom: 'Informatique', icon: 'fas fa-laptop-code' },
  { id: 5, nom: 'Comptabilité', icon: 'fas fa-calculator' },
  { id: 6, nom: 'Hôtellerie', icon: 'fas fa-utensils' }
]);

// BTS Spécialités
const btsSpecialites = ref([
  { id: 1, nom: 'Informatique', icon: 'fas fa-laptop-code' },
  { id: 2, nom: 'Comptabilité', icon: 'fas fa-chart-pie' },
  { id: 3, nom: 'Génie Civil', icon: 'fas fa-building' },
  { id: 4, nom: 'Marketing', icon: 'fas fa-chart-simple' },
  { id: 5, nom: 'Réseaux', icon: 'fas fa-network-wired' },
  { id: 6, nom: 'Finance', icon: 'fas fa-coins' }
]);

// Licence Filières
const licenceFilieres = ref([
  { id: 1, nom: 'Droit', icon: 'fas fa-gavel' },
  { id: 2, nom: 'Économie', icon: 'fas fa-chart-line' },
  { id: 3, nom: 'Informatique', icon: 'fas fa-laptop-code' },
  { id: 4, nom: 'Maths', icon: 'fas fa-calculator' },
  { id: 5, nom: 'Physique-Chimie', icon: 'fas fa-flask' },
  { id: 6, nom: 'SVT', icon: 'fas fa-leaf' },
  { id: 7, nom: 'Lettres', icon: 'fas fa-book' },
  { id: 8, nom: 'Anglais', icon: 'fas fa-language' }
]);

// Master Spécialités
const masterSpecialites = ref([
  { id: 1, nom: 'Droit Affaires', icon: 'fas fa-gavel' },
  { id: 2, nom: 'Économie', icon: 'fas fa-chart-line' },
  { id: 3, nom: 'IA et Data', icon: 'fas fa-robot' },
  { id: 4, nom: 'Data Science', icon: 'fas fa-database' },
  { id: 5, nom: 'Gestion Projet', icon: 'fas fa-tasks' },
  { id: 6, nom: 'Marketing', icon: 'fas fa-chart-simple' }
]);

// Doctorat Domaines
const doctoratDomaines = ref([
  { id: 1, nom: 'Sciences Juridiques', icon: 'fas fa-gavel' },
  { id: 2, nom: 'Sciences Économiques', icon: 'fas fa-chart-line' },
  { id: 3, nom: 'Informatique', icon: 'fas fa-robot' },
  { id: 4, nom: 'Sciences Ingénieur', icon: 'fas fa-microchip' }
]);

// ==================== FONCTIONS URL ====================
const getBepcUrl = (annee, matiere) => {
  const matiereCode = matiere.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/bepc/${annee}/${matiereCode}/sujet.pdf`;
};

const getBepcAnnalesUrl = (annee) => {
  return `https://grandprof.cm/annales/bepc/${annee}/annales_completes.zip`;
};

const getProbatoireUrl = (serie, matiere, type) => {
  const matiereCode = matiere.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/probatoire/${serie}/${matiereCode}/${type}.pdf`;
};

const getProbatoireAnnalesUrl = (serie, annee) => {
  return `https://grandprof.cm/annales/probatoire/${serie}/${annee}/annales.zip`;
};

const getBacUrl = (serie, matiere, type) => {
  const matiereCode = matiere.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/baccalaureat/${serie}/${matiereCode}/${type}.pdf`;
};

const getBacAnnalesUrl = (serie, annee) => {
  return `https://grandprof.cm/annales/bac/${serie}/${annee}/annales.zip`;
};

const getProbatoireTechUrl = (filiere, annee, type) => {
  const filiereCode = filiere.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/probatoire_technique/${filiereCode}/${annee}/${type}.pdf`;
};

const getProbatoireTechAnnalesUrl = (filiere) => {
  const filiereCode = filiere.toLowerCase().replace(/ /g, '_');
  return `https://grandprof.cm/annales/probatoire_technique/${filiereCode}/annales.zip`;
};

const getBacTechUrl = (filiere, annee, type) => {
  const filiereCode = filiere.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/bac_technique/${filiereCode}/${annee}/${type}.pdf`;
};

const getBacTechAnnalesUrl = (filiere) => {
  const filiereCode = filiere.toLowerCase().replace(/ /g, '_');
  return `https://grandprof.cm/annales/bac_technique/${filiereCode}/annales.zip`;
};

const getBtsUrl = (specialite, annee) => {
  const specialiteCode = specialite.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/bts/${specialiteCode}/${annee}/epreuve.pdf`;
};

const getBtsAnnalesUrl = (specialite) => {
  const specialiteCode = specialite.toLowerCase().replace(/ /g, '_');
  return `https://grandprof.cm/annales/bts/${specialiteCode}/annales.zip`;
};

const getLicenceUrl = (filiere, niveau) => {
  const filiereCode = filiere.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/licence/${filiereCode}/${niveau}/examen.pdf`;
};

const getLicenceAnnalesUrl = (filiere) => {
  const filiereCode = filiere.toLowerCase().replace(/ /g, '_');
  return `https://grandprof.cm/annales/licence/${filiereCode}/annales.zip`;
};

const getMasterUrl = (specialite, niveau) => {
  const specialiteCode = specialite.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/master/${specialiteCode}/${niveau}/examen.pdf`;
};

const getMasterAnnalesUrl = (specialite) => {
  const specialiteCode = specialite.toLowerCase().replace(/ /g, '_');
  return `https://grandprof.cm/annales/master/${specialiteCode}/annales.zip`;
};

const getDoctoratUrl = (domaine, annee) => {
  const domaineCode = domaine.toLowerCase().replace(/ /g, '_');
  return `https://examen.obc.cm/doctorat/${domaineCode}/${annee}/these.pdf`;
};

const getDoctoratAnnalesUrl = (domaine) => {
  const domaineCode = domaine.toLowerCase().replace(/ /g, '_');
  return `https://grandprof.cm/annales/doctorat/${domaineCode}/archives.zip`;
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.transition {
  transition: all 0.3s ease;
}
</style>
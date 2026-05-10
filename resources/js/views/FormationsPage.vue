<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-20">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-graduation-cap text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Formations certifiantes et diplômantes</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Nos offres de <span class="text-yellow-300">formation</span>
        </h1>
        <p class="text-indigo-100 text-lg max-w-2xl mx-auto">
          Présentiel, virtuel, hybride : choisis ton rythme et décroche ton diplôme
        </p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-certificate text-white"></i>
            <span class="text-white text-sm">Certification officielle</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chalkboard-user text-white"></i>
            <span class="text-white text-sm">Formateurs experts</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-laptop text-white"></i>
            <span class="text-white text-sm">100% en ligne</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <!-- STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-users text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">5000+</span>
            <span class="text-xs text-gray-500">Étudiants formés</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-chalkboard-user text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">50+</span>
            <span class="text-xs text-gray-500">Formateurs experts</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-certificate text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">100%</span>
            <span class="text-xs text-gray-500">Certification reconnue</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer hover:scale-105 transition">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition">
              <i class="fas fa-trophy text-primary text-xl group-hover:text-white"></i>
            </div>
            <span class="text-2xl font-bold text-dark">89%</span>
            <span class="text-xs text-gray-500">Taux d'insertion</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CARTES DES FORMATIONS -->
    <section class="py-16">
      <div class="container mx-auto px-5">
        <!-- Première ligne : FD et FQ -->
        <div class="grid md:grid-cols-2 gap-12 mb-12">
          <!-- Formation Diplômante FD -->
          <div class="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div class="relative h-64 overflow-hidden">
              <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=600&h=400&fit=crop" alt="Formation diplômante" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">⭐ Populaire</span>
              </div>
              <div class="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                <i class="fas fa-graduation-cap text-primary text-xl"></i>
              </div>
            </div>
            <div class="p-8">
              <h2 class="text-2xl font-bold text-gray-800 group-hover:text-primary transition">Formations Diplômantes (FD) à distance</h2>
              <p class="text-gray-500 mt-2">Les formations diplômantes internationales offertes par les universités membres de l'AUF à travers le numérique.</p>
              
              <div class="mt-4 flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <i class="fas fa-globe text-primary"></i>
                  <span class="text-sm"><strong>14</strong> Pays</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-university text-primary"></i>
                  <span class="text-sm"><strong>62</strong> Établissements</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-book text-primary"></i>
                  <span class="text-sm"><strong>228</strong> Formations</span>
                </div>
              </div>

              <div class="mt-4 p-3 bg-indigo-50 rounded-lg">
                <div class="flex items-center gap-2 text-orange-600">
                  <i class="fas fa-calendar-alt"></i>
                  <span class="text-sm font-semibold">Ouverture de la prochaine session de candidature début avril 2026</span>
                </div>
              </div>

              <ul class="mt-5 space-y-3">
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-primary"></i><span>BTS Commerce International</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-primary"></i><span>Licence en Administration</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-primary"></i><span>Master MBA & Management</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-primary"></i><span>Licence en Radioprotection (L1)</span></li>
              </ul>
              <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="fas fa-clock text-gray-400"></i>
                  <span class="text-sm text-gray-500">2 à 3 ans</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-certificate text-primary"></i>
                  <span class="text-sm font-semibold text-primary">Diplôme d'État</span>
                </div>
              </div>
              <div class="mt-4 flex gap-3">
                <button @click="goToFormationDiplomante" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <i class="fas fa-arrow-right"></i> Découvrir
                </button>
                <button @click="goToFormationDetail('fd')" class="py-3 px-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <i class="fas fa-info-circle"></i> Détail
                </button>
              </div>
            </div>
          </div>

          <!-- Formation Qualifiante FQ -->
          <div class="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div class="relative h-64 overflow-hidden">
              <img src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=600&h=400&fit=crop" alt="Formation qualifiante" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">🚀 Certifiant</span>
              </div>
              <div class="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                <i class="fas fa-certificate text-primary text-xl"></i>
              </div>
            </div>
            <div class="p-8">
              <h2 class="text-2xl font-bold text-gray-800 group-hover:text-primary transition">Formations Qualifiantes (FQ) à distance</h2>
              <p class="text-gray-500 mt-2">Les formations qualifiantes internationales offertes par les universités membres de l'AUF à travers le numérique.</p>
              
              <div class="mt-4 flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <i class="fas fa-globe text-primary"></i>
                  <span class="text-sm"><strong>8</strong> Pays</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-university text-primary"></i>
                  <span class="text-sm"><strong>15</strong> Établissements</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-book text-primary"></i>
                  <span class="text-sm"><strong>24</strong> Formations</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-door-open text-primary"></i>
                  <span class="text-sm"><strong>48</strong> Formations ouvertes</span>
                </div>
              </div>

              <div class="mt-4 p-3 bg-orange-50 rounded-lg">
                <div class="flex items-center gap-2 text-red-600">
                  <i class="fas fa-calendar-alt"></i>
                  <span class="text-sm font-semibold">Candidature ouverte jusqu'au 6 avril 2026</span>
                </div>
              </div>

              <ul class="mt-5 space-y-3">
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-primary"></i><span>Marketing Digital & IA</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-primary"></i><span>Gestion de projet (PMP)</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-primary"></i><span>Data Science & Analyse</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-primary"></i><span>Radioprotection & Sécurité Nucléaire</span></li>
              </ul>
              <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="fas fa-clock text-gray-400"></i>
                  <span class="text-sm text-gray-500">2 à 6 mois</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-certificate text-primary"></i>
                  <span class="text-sm font-semibold text-primary">Certification</span>
                </div>
              </div>
              <div class="mt-4 flex gap-3">
                <button @click="goToFormationQualifiante" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <i class="fas fa-arrow-right"></i> Découvrir
                </button>
                <button @click="goToFormationDetail('fq')" class="py-3 px-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <i class="fas fa-info-circle"></i> Détail
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Deuxième ligne : FP et FH côte à côte -->
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Formation Présentielle FP (Violet - Gauche) -->
          <div class="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div class="relative h-64 overflow-hidden">
              <img src="https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?w=600&h=400&fit=crop" alt="Formation présidentielle" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">👑 Executive</span>
              </div>
              <div class="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                <i class="fas fa-crown text-purple-600 text-xl"></i>
              </div>
            </div>
            <div class="p-8">
              <h2 class="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition">Formation Présentielle (FP) Executive</h2>
              <p class="text-gray-500 mt-2">Programme d'excellence pour les hauts responsables et cadres dirigeants, dispensé par des experts internationaux.</p>
              
              <div class="mt-4 flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <i class="fas fa-globe text-purple-600"></i>
                  <span class="text-sm"><strong>5</strong> Pays partenaires</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-chalkboard-user text-purple-600"></i>
                  <span class="text-sm"><strong>20+</strong> Experts internationaux</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-trophy text-purple-600"></i>
                  <span class="text-sm"><strong>6</strong> Modules executives</span>
                </div>
              </div>

              <div class="mt-4 p-3 bg-purple-50 rounded-lg">
                <div class="flex items-center gap-2 text-purple-600">
                  <i class="fas fa-calendar-alt"></i>
                  <span class="text-sm font-semibold">Session spéciale : Octobre 2026 - Inscriptions prioritaires</span>
                </div>
              </div>

              <ul class="mt-5 space-y-3">
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-purple-600"></i><span>Leadership stratégique et gouvernance</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-purple-600"></i><span>Diplomatie et relations internationales</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-purple-600"></i><span>Management de crise et prise de décision</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-purple-600"></i><span>Innovation et transformation digitale</span></li>
              </ul>
              <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="fas fa-clock text-gray-400"></i>
                  <span class="text-sm text-gray-500">6 à 9 mois</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-certificate text-purple-600"></i>
                  <span class="text-sm font-semibold text-purple-600">Certification Executive</span>
                </div>
              </div>
              <div class="mt-4 flex gap-3">
                <button @click="goToFormationPresidentielle" class="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <i class="fas fa-arrow-right"></i> Découvrir
                </button>
                <button @click="goToFormationDetail('presidentielle')" class="py-3 px-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <i class="fas fa-info-circle"></i> Détail
                </button>
              </div>
            </div>
          </div>

          <!-- Formation Hybride FH (Couleur Premium Ambrée - Droite) -->
          <div class="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div class="relative h-64 overflow-hidden">
              <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=600&h=400&fit=crop" alt="Formation hybride" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">🌟 Premium</span>
              </div>
              <div class="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                <i class="fas fa-star text-amber-500 text-xl"></i>
              </div>
            </div>
            <div class="p-8">
              <h2 class="text-2xl font-bold text-gray-800 group-hover:text-amber-600 transition">Formation Hybride (FH) Premium</h2>
              <p class="text-gray-500 mt-2">Bénéficiez du meilleur des deux mondes avec nos campus partenaires et notre plateforme e-learning.</p>
              
              <div class="mt-4 flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <i class="fas fa-globe text-amber-600"></i>
                  <span class="text-sm"><strong>12</strong> Pays</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-building text-amber-600"></i>
                  <span class="text-sm"><strong>25</strong> Campus partenaires</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-laptop text-amber-600"></i>
                  <span class="text-sm"><strong>100%</strong> Plateforme digitale</span>
                </div>
              </div>

              <div class="mt-4 p-3 bg-amber-50 rounded-lg">
                <div class="flex items-center gap-2 text-amber-600">
                  <i class="fas fa-calendar-alt"></i>
                  <span class="text-sm font-semibold">Rentrée : Septembre 2026 - Inscriptions ouvertes</span>
                </div>
              </div>

              <ul class="mt-5 space-y-3">
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-amber-600"></i><span>MBA Executive (Présentiel + Online)</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-amber-600"></i><span>Master en Intelligence Artificielle</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-amber-600"></i><span>Certification en Cybersécurité</span></li>
                <li class="flex items-center gap-3"><i class="fas fa-check-circle text-amber-600"></i><span>Diplôme en Finance Internationale</span></li>
              </ul>
              <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="fas fa-clock text-gray-400"></i>
                  <span class="text-sm text-gray-500">12 à 18 mois</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-certificate text-amber-600"></i>
                  <span class="text-sm font-semibold text-amber-600">Double Certification</span>
                </div>
              </div>
              <div class="mt-4 flex gap-3">
                <button @click="goToFormationHybride" class="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <i class="fas fa-arrow-right"></i> Découvrir
                </button>
                <button @click="goToFormationDetail('hybride')" class="py-3 px-4 border-2 border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <i class="fas fa-info-circle"></i> Détail
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Info catalogue -->
        <div class="mt-12 text-center">
          <a href="#" class="inline-flex items-center gap-2 text-primary hover:text-indigo-700 font-semibold transition-colors">
            <i class="fas fa-book-open"></i>
            Accéder au catalogue
            <i class="fas fa-arrow-right text-sm"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- AVANTAGES SECTION -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-5">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold uppercase tracking-wide">Pourquoi nous choisir</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Des avantages exclusifs</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">Une formation de qualité adaptée à vos besoins</p>
        </div>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center group cursor-pointer">
            <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-headset text-primary text-2xl group-hover:text-white"></i>
            </div>
            <h3 class="font-bold text-lg">Accompagnement 24/7</h3>
            <p class="text-sm text-gray-500 mt-1">Support personnalisé</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-video text-primary text-2xl group-hover:text-white"></i>
            </div>
            <h3 class="font-bold text-lg">Classes virtuelles</h3>
            <p class="text-sm text-gray-500 mt-1">Cours en direct</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-chart-simple text-primary text-2xl group-hover:text-white"></i>
            </div>
            <h3 class="font-bold text-lg">Suivi de progression</h3>
            <p class="text-sm text-gray-500 mt-1">Statistiques détaillées</p>
          </div>
          <div class="text-center group cursor-pointer">
            <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
              <i class="fas fa-certificate text-primary text-2xl group-hover:text-white"></i>
            </div>
            <h3 class="font-bold text-lg">Certification</h3>
            <p class="text-sm text-gray-500 mt-1">Reconnue par l'État</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TÉMOIGNAGES -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-5">
        <div class="text-center mb-12">
          <span class="text-primary font-semibold uppercase tracking-wide">Ils témoignent</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2">Ce que disent nos étudiants</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center gap-2 text-yellow-400 mb-4">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p class="text-gray-600 italic">"Formation exceptionnelle ! Les cours sont bien structurés et les formateurs très disponibles."</p>
            <div class="flex items-center gap-3 mt-4">
              <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">ML</div>
              <div><h4 class="font-bold">Marie L.</h4><p class="text-xs text-gray-400">MBA Management</p></div>
            </div>
          </div>
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center gap-2 text-yellow-400 mb-4">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p class="text-gray-600 italic">"Grâce à cette formation, j'ai décroché une certification PMP et changé de carrière."</p>
            <div class="flex items-center gap-3 mt-4">
              <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">JD</div>
              <div><h4 class="font-bold">Jean D.</h4><p class="text-xs text-gray-400">Gestion de projet</p></div>
            </div>
          </div>
          <div class="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div class="flex items-center gap-2 text-yellow-400 mb-4">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p class="text-gray-600 italic">"Plateforme intuitive, contenus de qualité, je recommande vivement !"</p>
            <div class="flex items-center gap-3 mt-4">
              <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">AT</div>
              <div><h4 class="font-bold">Aïcha T.</h4><p class="text-xs text-gray-400">Marketing Digital</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL DE CONFIRMATION -->
    <div v-if="confirmationModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="confirmationModalOpen = false">
      <div class="absolute inset-0 modal-overlay"></div>
      <div class="modal-container bg-white rounded-2xl max-w-md w-full text-center p-6">
        <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-circle text-green-600 text-4xl"></i>
        </div>
        <h3 class="text-xl font-bold">Redirection en cours</h3>
        <p class="text-gray-600 mt-2">Vous allez être redirigé vers la page de la formation sélectionnée.</p>
        <div class="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full animate-pulse" style="width: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const confirmationModalOpen = ref(false);

const goToFormationDiplomante = () => {
  confirmationModalOpen.value = true;
  setTimeout(() => {
    confirmationModalOpen.value = false;
    router.push('/formation-diplomante');
  }, 1500);
};

const goToFormationQualifiante = () => {
  confirmationModalOpen.value = true;
  setTimeout(() => {
    confirmationModalOpen.value = false;
    router.push('/formation-qualifiante');
  }, 1500);
};

const goToFormationPresidentielle = () => {
  confirmationModalOpen.value = true;
  setTimeout(() => {
    confirmationModalOpen.value = false;
    router.push('/formation-presidentielle');
  }, 1500);
};

const goToFormationHybride = () => {
  confirmationModalOpen.value = true;
  setTimeout(() => {
    confirmationModalOpen.value = false;
    router.push('/formation-hybride-page');
  }, 1500);
};

const goToFormationDetail = (type) => {
  confirmationModalOpen.value = true;
  setTimeout(() => {
    confirmationModalOpen.value = false;
    if (type === 'fd') {
      router.push('/formationdiplomante');
    } else if (type === 'fq') {
      router.push('/formationqualifiante');
    } else if (type === 'presidentielle') {
      router.push('/formationpresidentielle');
    } else if (type === 'hybride') {
      router.push('/formationhybride');
    }
  }, 1500);
};
</script>

<style scoped>
.modal-overlay {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.modal-container {
  animation: slideIn 0.3s ease-out;
}

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

.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-16">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-graduation-cap text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Formations Diplômantes à distance</span>
        </div>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Formations <span class="text-yellow-300">Diplômantes (FD)</span> à distance
        </h1>
        <p class="text-indigo-100 text-base sm:text-lg max-w-2xl mx-auto">
          Les formations diplômantes internationales offertes par les universités membres à travers le numérique
        </p>
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <i class="fas fa-calendar-alt text-white text-xs sm:text-sm"></i>
            <span class="text-white text-xs sm:text-sm">Session avril 2026</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <i class="fas fa-globe text-white text-xs sm:text-sm"></i>
            <span class="text-white text-xs sm:text-sm">14 pays éligibles</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>

    <!-- Section principale -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <!-- Colonne gauche - Contenu principal -->
        <div class="lg:w-2/3 space-y-6 sm:space-y-8">
          <!-- Description -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-info-circle text-primary"></i>
              Description
            </h2>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
              Les formations diplômantes internationales sont proposées par les universités membres à travers le numérique. 
              Ces formations permettent d'obtenir des diplômes reconnus par l'État et les partenaires universitaires.
            </p>
            <div class="mt-4 p-3 sm:p-4 bg-indigo-50 rounded-lg">
              <div class="flex flex-wrap items-center gap-3">
                <i class="fas fa-trophy text-primary text-xl"></i>
                <span class="text-gray-700 text-sm sm:text-base"><strong>+5000</strong> candidats formés depuis 2020</span>
              </div>
            </div>
          </div>

          <!-- Objectifs -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-bullseye text-primary"></i>
              Objectifs de la formation
            </h2>
            <p class="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              Former des ressources humaines qualifiées et aptes à travailler dans tous les secteurs d'activités 
              correspondant à leur domaine de spécialisation.
            </p>
            <ul class="space-y-2 sm:space-y-3">
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Maîtriser les fondamentaux théoriques et pratiques de la filière choisie</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Développer des compétences opérationnelles recherchées par les employeurs</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Obtenir un diplôme reconnu et certifié par l'État</span>
              </li>
            </ul>
          </div>

          <!-- Compétences visées -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-star text-primary"></i>
              Compétences visées
            </h2>
            <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Maîtrise des connaissances théoriques de la filière</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Capacité d'analyse et de synthèse</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Maîtrise des outils numériques et professionnels</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Travail en équipe et gestion de projets</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Communication professionnelle en français</span>
              </div>
            </div>
          </div>

          <!-- Public cible -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-users text-primary"></i>
              Public cible
            </h2>
            <p class="text-gray-600 leading-relaxed text-sm sm:text-base">
              Les formations diplômantes sont ouvertes à tous les titulaires d'un baccalauréat ou équivalent, 
              ainsi qu'aux professionnels souhaitant reprendre leurs études ou se spécialiser.
            </p>
          </div>

          <!-- Prérequis -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-clipboard-list text-primary"></i>
              Niveau prérequis
            </h2>
            <div class="space-y-2">
              <p class="text-gray-600 text-sm sm:text-base">✓ Niveau Baccalauréat minimum (selon la filière)</p>
              <p class="text-gray-600 text-sm sm:text-base">✓ Connaissances de base dans le domaine choisi</p>
              <p class="text-gray-600 text-sm sm:text-base">✓ Maîtrise de la langue française</p>
              <p class="text-gray-600 text-sm sm:text-base">✓ Résider dans un pays éligible</p>
              <p class="text-gray-600 text-sm sm:text-base">✓ Disposer d'une connexion internet et d'un ordinateur</p>
            </div>
          </div>

          <!-- Programme -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-calendar-alt text-primary"></i>
              Programme de la formation
            </h2>
            <p class="text-gray-600 mb-4 text-sm sm:text-base">
              La formation professionnalisante s'étale sur <strong>plusieurs semestres</strong> selon le niveau choisi :
            </p>
            <div class="grid sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <h3 class="font-bold text-primary mb-2 text-sm sm:text-base">Premier cycle (Licence/BTS)</h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Semestres 1 et 2 : tronc commun</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Semestres 3 et 4 : spécialisation progressive</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Semestres 5 et 6 : approfondissement</span></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-primary mb-2 text-sm sm:text-base">Deuxième cycle (Master)</h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Semestres 1 et 2 : fondamentaux</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Semestres 3 et 4 : spécialisation et mémoire</span></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-primary mb-2 text-sm sm:text-base">Stage de fin d'études</h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Stage en entreprise ou en laboratoire</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Rédaction et soutenance de mémoire</span></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Organisation pédagogique -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-chalkboard-user text-primary"></i>
              Organisation pédagogique
            </h2>
            <ul class="space-y-2 sm:space-y-3">
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-laptop text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Formation entièrement dispensée à distance via une plateforme e-learning</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-download text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Matériaux didactiques multimédias accessibles, téléchargeables et imprimables</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-chalkboard text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Tuteurs pour le suivi effectif des activités d'apprentissage</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-map-marker-alt text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Accès aux Campus Numériques pour les infrastructures techniques</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-video text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Classes virtuelles hebdomadaires avec les formateurs</span>
              </li>
            </ul>
          </div>

          <!-- Modalités d'évaluation -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-chart-simple text-primary"></i>
              Modalités d'évaluation
            </h2>
            <div class="space-y-3 sm:space-y-4">
              <div>
                <h3 class="font-bold text-gray-700 text-sm sm:text-base">Évaluations</h3>
                <p class="text-gray-600 mt-1 text-sm sm:text-base">Contrôle continu et/ou examen final selon les matières</p>
              </div>
              <div>
                <h3 class="font-bold text-gray-700 text-sm sm:text-base">Validation</h3>
                <p class="text-gray-600 mt-1 text-sm sm:text-base">Crédits par semestre avec moyenne générale ≥ 10/20</p>
                <p class="text-gray-600 mt-1 text-sm sm:text-base">Examens de rattrapage pour les matières non validées</p>
              </div>
              <div>
                <h3 class="font-bold text-gray-700 text-sm sm:text-base">Stage de fin d'études</h3>
                <p class="text-gray-600 mt-1 text-sm sm:text-base">Stage en entreprise + rédaction de mémoire + soutenance (en ligne ou en présentiel)</p>
              </div>
            </div>
          </div>

          <!-- Débouchés -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-briefcase text-primary"></i>
              Débouchés académiques et professionnels
            </h2>
            <div class="grid sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <h3 class="font-bold text-primary mb-2 text-sm sm:text-base">Poursuite d'études</h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Master spécialisé dans le domaine choisi</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Doctorat et carrière académique</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Certifications professionnelles complémentaires</span></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-primary mb-2 text-sm sm:text-base">Insertion professionnelle</h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Cadre dans le secteur public ou privé</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Expert ou consultant spécialisé</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Chef de projet ou responsable d'équipe</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne droite - Informations pratiques -->
        <div class="lg:w-1/3 space-y-5 sm:space-y-6">
          <!-- Carte d'informations -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 border-b pb-2">
              <i class="fas fa-info-circle text-primary"></i>
              Informations pratiques
            </h3>
            
            <div class="space-y-3 sm:space-y-4">
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-calendar-alt text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Durée</p>
                  <p class="text-gray-500 text-xs sm:text-sm">2 à 5 ans selon le niveau</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-globe text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Pays éligibles</p>
                  <p class="text-gray-500 text-xs sm:text-sm">14 pays (Afrique, Asie, Amérique, Caraïbes)</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-language text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Langue</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Français</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-certificate text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Diplôme</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Diplôme d'État reconnu</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <i class="fas fa-graduation-cap text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Mode</p>
                  <p class="text-gray-500 text-xs sm:text-sm">100% à distance</p>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-6 pt-4 border-t border-gray-200 flex flex-col gap-3">
              <button @click="goToInscription" class="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                <i class="fas fa-arrow-right"></i> S'inscrire maintenant
              </button>
              <button @click="downloadCatalogue" class="w-full py-2.5 sm:py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                <i class="fas fa-download"></i> Télécharger le catalogue
              </button>
            </div>
          </div>

          <!-- Partenaires -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 border-b pb-2">
              <i class="fas fa-handshake text-primary"></i>
              Partenaires
            </h3>
            <div class="space-y-2 sm:space-y-3">
              <div class="flex items-center gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary text-sm"></i>
                <span class="text-gray-600 text-xs sm:text-sm">Agence Universitaire de la Francophonie (AUF)</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary text-sm"></i>
                <span class="text-gray-600 text-xs sm:text-sm">Universités membres</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary text-sm"></i>
                <span class="text-gray-600 text-xs sm:text-sm">Campus Numériques Francophones</span>
              </div>
            </div>
          </div>

          <!-- Contact -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 border-b pb-2">
              <i class="fas fa-envelope text-primary"></i>
              Contact
            </h3>
            <div class="space-y-3 sm:space-y-4">
              <p class="text-gray-600 text-sm sm:text-base">Pour toute information :</p>
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <i class="fas fa-envelope text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <span class="text-gray-500 text-xs sm:text-sm break-all">formations@gradusaura.com</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <i class="fas fa-phone-alt text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <span class="text-gray-500 text-xs sm:text-sm">+237 6 XX XX XX XX</span>
              </div>
            </div>
          </div>

          <!-- Établissements partenaires -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 border-b pb-2">
              <i class="fas fa-university text-primary"></i>
              Établissements partenaires
            </h3>
            <div class="space-y-2 sm:space-y-3">
              <div class="flex items-center gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary text-sm"></i>
                <span class="text-gray-600 text-xs sm:text-sm">Universités membres du réseau</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary text-sm"></i>
                <span class="text-gray-600 text-xs sm:text-sm">Grandes écoles et instituts spécialisés</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary text-sm"></i>
                <span class="text-gray-600 text-xs sm:text-sm">Campus numériques partenaires</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bouton retour -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
      <div class="flex justify-start sm:justify-end">
        <button @click="goBack" class="flex items-center gap-2 text-primary hover:text-indigo-700 font-semibold transition-colors text-sm sm:text-base">
          <i class="fas fa-arrow-left"></i> Retour aux formations
        </button>
      </div>
    </div>

    <!-- Modal de téléchargement -->
    <div v-if="downloadModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="downloadModalOpen = false">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div class="relative bg-white rounded-2xl max-w-md w-full text-center p-5 sm:p-6 animate-modalSlideIn">
        <div class="bg-indigo-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <i class="fas fa-download text-primary text-3xl sm:text-4xl"></i>
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-gray-800">Téléchargement en cours</h3>
        <p class="text-gray-600 text-sm sm:text-base mt-2">Le catalogue des formations diplômantes est en cours de téléchargement...</p>
        <div class="mt-5 sm:mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full animate-pulse" style="width: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const downloadModalOpen = ref(false);

const goBack = () => {
  router.push('/formations');
};

const goToInscription = () => {
  router.push('/register');
};

const downloadCatalogue = () => {
  downloadModalOpen.value = true;
  
  const catalogueHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Catalogue des Formations Diplômantes</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          line-height: 1.6;
          color: #333;
        }
        h1 {
          color: #4F46E5;
          text-align: center;
          border-bottom: 3px solid #4F46E5;
          padding-bottom: 10px;
        }
        h2 {
          color: #4F46E5;
          margin-top: 30px;
          border-left: 4px solid #4F46E5;
          padding-left: 15px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .date {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
        }
        .formation {
          background: #f8fafc;
          padding: 15px;
          margin: 15px 0;
          border-radius: 8px;
          border-left: 4px solid #4F46E5;
        }
        .formation h3 {
          margin: 0 0 10px 0;
          color: #4F46E5;
        }
        .info {
          display: inline-block;
          background: #e0e7ff;
          padding: 3px 10px;
          border-radius: 15px;
          font-size: 12px;
          margin: 5px 5px 0 0;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        .contact {
          background: #f1f5f9;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Catalogue des Formations Diplômantes (FD)</h1>
        <p class="date">Date de publication : ${new Date().toLocaleDateString('fr-FR')}</p>
      </div>
      
      <h2>Présentation</h2>
      <p>Les formations diplômantes internationales sont proposées par les universités membres à travers le numérique. Ces formations permettent d'obtenir des diplômes reconnus par l'État et les partenaires universitaires.</p>
      <p><strong>+5000 candidats formés depuis 2020</strong></p>
      
      <h2>Formations disponibles</h2>
      
      <div class="formation">
        <h3>1. BTS Commerce International</h3>
        <p>Formation complète en commerce international, import-export et logistique.</p>
        <span class="info">Durée: 2 ans</span>
        <span class="info">100% à distance</span>
        <span class="info">Débouchés: Assistant commerce international, responsable export</span>
      </div>
      
      <div class="formation">
        <h3>2. Licence en Administration</h3>
        <p>Formation en gestion administrative, ressources humaines et management.</p>
        <span class="info">Durée: 3 ans</span>
        <span class="info">100% à distance</span>
        <span class="info">Débouchés: Chargé d'administration, gestionnaire RH</span>
      </div>
      
      <div class="formation">
        <h3>3. Master MBA & Management</h3>
        <p>Formation de haut niveau en management stratégique et leadership.</p>
        <span class="info">Durée: 2 ans</span>
        <span class="info">100% à distance</span>
        <span class="info">Débouchés: Manager, consultant, chef d'entreprise</span>
      </div>
      
      <div class="formation">
        <h3>4. Licence en Radioprotection (L1)</h3>
        <p>Formation spécialisée en radioprotection et sécurité nucléaire.</p>
        <span class="info">Durée: 3 ans</span>
        <span class="info">100% à distance</span>
        <span class="info">Débouchés: Responsable radioprotection, technicien contrôle</span>
      </div>
      
      <h2>Informations générales</h2>
      <ul
        <li><strong>Durée :</strong> 2 à 5 ans selon le niveau</li>
        <li><strong>Pays éligibles :</strong> 14 pays (Afrique, Asie, Amérique, Caraïbes)</li>
        <li><strong>Langue :</strong> Français</li>
        <li><strong>Diplôme :</strong> Diplôme d'État reconnu</li>
        <li><strong>Mode :</strong> 100% à distance</li>
      </ul>
      
      <h2>Partenaires</h2>
      <ul>
        <li>Agence Universitaire de la Francophonie (AUF)</li>
        <li>Universités membres</li>
        <li>Campus Numériques Francophones</li>
      </ul>
      
      <div class="contact">
        <h3 style="margin-top: 0;">Contact</h3>
        <p><strong>Email :</strong> formations@gradusaura.com</p>
        <p><strong>Téléphone :</strong> +237 6 XX XX XX XX</p>
        <p><strong>Support scolarité :</strong> scolarite@gradusaura.com</p>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} - Gradus Aura - Tous droits réservés</p>
        <p>Pour plus d'informations, visitez notre site web</p>
      </div>
    </body>
    </html>
  `;
  
  const blob = new Blob([catalogueHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `catalogue_formations_diplomantes_${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  setTimeout(() => {
    downloadModalOpen.value = false;
  }, 2000);
};
</script>

<style scoped>
.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-modalSlideIn {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-16">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-laptop text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Formation Hybride</span>
        </div>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Formation <span class="text-yellow-300">Hybride</span>
        </h1>
        <p class="text-indigo-100 text-base sm:text-lg max-w-2xl mx-auto">
          Le meilleur des deux mondes : présentiel + digital
        </p>
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
              La formation hybride Gradus Aura combine l'excellence de l'enseignement en présentiel avec la flexibilité du digital. 
              Cette approche innovante permet aux apprenants de bénéficier du meilleur des deux mondes : des cours en présentiel 
              pour les interactions humaines et les travaux pratiques, et des ressources en ligne pour l'apprentissage à leur rythme.
            </p>
            <p class="text-gray-600 leading-relaxed mt-4 text-sm sm:text-base">
              En partenariat avec nos campus partenaires à travers le pays, nous offrons une expérience d'apprentissage unique 
              qui s'adapte à votre emploi du temps et à vos besoins spécifiques.
            </p>
          </div>

          <!-- Objectifs -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-bullseye text-primary"></i>
              Objectifs de la formation
            </h2>
            <ul class="space-y-2 sm:space-y-3">
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Former des professionnels capables de s'adapter aux environnements de travail hybrides</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Maîtriser les outils digitaux et les méthodes de travail collaboratives</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Développer des compétences techniques et relationnelles équilibrées</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Optimiser l'apprentissage grâce à une approche blended learning</span>
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
                <i class="fas fa-laptop text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Maîtrise des outils de visioconférence</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-users text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Animation d'équipes hybrides</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-project-diagram text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Gestion de projets digitaux</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-chart-line text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Analyse de données et reporting</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-shield-alt text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Sécurité des échanges numériques</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-comments text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Communication multicanal</span>
              </div>
            </div>
          </div>

          <!-- Public cible -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-users text-primary"></i>
              Public cible
            </h2>
            <ul class="space-y-2 sm:space-y-3">
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-user-graduate text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Étudiants souhaitant allier flexibilité et interactions sociales</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-briefcase text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Professionnels en reconversion ou en perfectionnement</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-chalkboard-teacher text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Cadres et managers cherchant à moderniser leurs méthodes</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-globe text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Personnes résidant dans des zones avec accès limité aux campus</span>
              </li>
            </ul>
          </div>

          <!-- Prérequis -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-clipboard-list text-primary"></i>
              Niveau prérequis
            </h2>
            <div class="space-y-2">
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Niveau Baccalauréat minimum</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Maîtrise de base de l'informatique et d'Internet</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Équipement personnel : ordinateur et connexion Internet</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Motivation et autonomie dans l'apprentissage</p>
            </div>
          </div>

          <!-- Programme -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-calendar-alt text-primary"></i>
              Programme de la formation
            </h2>
            <div class="space-y-5 sm:space-y-6">
              <div>
                <h3 class="text-base sm:text-lg font-bold text-primary mb-2">Semestre 1 (Présentiel - 3 mois)</h3>
                <ul class="space-y-2 ml-4">
                  <li class="flex items-start gap-2"><i class="fas fa-circle text-primary text-xs mt-2"></i><span class="text-sm sm:text-base">Fondamentaux du management</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-circle text-primary text-xs mt-2"></i><span class="text-sm sm:text-base">Communication professionnelle</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-circle text-primary text-xs mt-2"></i><span class="text-sm sm:text-base">Ateliers pratiques en groupe</span></li>
                </ul>
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-bold text-primary mb-2">Semestre 2 (Distanciel - 3 mois)</h3>
                <ul class="space-y-2 ml-4">
                  <li class="flex items-start gap-2"><i class="fas fa-circle text-primary text-xs mt-2"></i><span class="text-sm sm:text-base">Outils collaboratifs digitaux</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-circle text-primary text-xs mt-2"></i><span class="text-sm sm:text-base">E-learning et classes virtuelles</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-circle text-primary text-xs mt-2"></i><span class="text-sm sm:text-base">Projets tutorés à distance</span></li>
                </ul>
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-bold text-primary mb-2">Semestre 3 (Stage - 3 mois)</h3>
                <ul class="space-y-2 ml-4">
                  <li class="flex items-start gap-2"><i class="fas fa-circle text-primary text-xs mt-2"></i><span class="text-sm sm:text-base">Stage en entreprise (présentiel ou distanciel)</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-circle text-primary text-xs mt-2"></i><span class="text-sm sm:text-base">Rédaction et soutenance de mémoire</span></li>
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
                <i class="fas fa-clock text-primary mt-1 text-sm sm:text-base w-5"></i>
                <span class="text-gray-600 text-sm sm:text-base">Durée totale : 9 mois (3 semestres de 3 mois)</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-calendar-week text-primary mt-1 text-sm sm:text-base w-5"></i>
                <span class="text-gray-600 text-sm sm:text-base">Rythme : 2 jours en présentiel + 3 jours en distanciel par semaine</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-chalkboard text-primary mt-1 text-sm sm:text-base w-5"></i>
                <span class="text-gray-600 text-sm sm:text-base">Cours présentiels dans nos campus partenaires</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-video text-primary mt-1 text-sm sm:text-base w-5"></i>
                <span class="text-gray-600 text-sm sm:text-base">Classes virtuelles interactives</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-tasks text-primary mt-1 text-sm sm:text-base w-5"></i>
                <span class="text-gray-600 text-sm sm:text-base">Travaux pratiques et projets collaboratifs</span>
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
                <p class="text-gray-600 mt-1 text-sm sm:text-base">Contrôle continu (40%) + Examens finaux (40%) + Projet de fin d'études (20%)</p>
              </div>
              <div>
                <h3 class="font-bold text-gray-700 text-sm sm:text-base">Validation</h3>
                <p class="text-gray-600 mt-1 text-sm sm:text-base">Moyenne générale ≥ 10/20 pour valider la formation. Rattrapages possibles pour les modules non validés.</p>
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
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Masters spécialisés</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">MBA en management hybride</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Doctorats en sciences de gestion</span></li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-primary mb-2 text-sm sm:text-base">Insertion professionnelle</h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Chef de projet digital</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Responsable formation hybride</span></li>
                  <li class="flex items-start gap-2"><i class="fas fa-angle-right text-primary text-sm"></i><span class="text-sm sm:text-base">Consultant en transformation digitale</span></li>
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
                  <p class="text-gray-500 text-xs sm:text-sm">9 mois (3 semestres)</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-map-marker-alt text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Lieux</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Campus partenaires (Yaoundé, Douala, Garoua) + Plateforme en ligne</p>
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
                <i class="fas fa-money-bill-wave text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Coût de la formation</p>
                  <p class="text-gray-500 text-xs sm:text-sm">500 000 FCFA (frais de dossier inclus)</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-certificate text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Diplôme</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Certification professionnelle reconnue</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <i class="fas fa-globe text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Mode</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Hybride (présentiel + distanciel)</p>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-6 pt-4 border-t border-gray-200 flex flex-col gap-3">
              <button @click="goToInscription" class="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                <i class="fas fa-arrow-right"></i> S'inscrire maintenant
              </button>
              <button @click="downloadBrochure" class="w-full py-2.5 sm:py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                <i class="fas fa-download"></i> Télécharger la plaquette
              </button>
            </div>
          </div>

          <!-- Contacts -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 border-b pb-2">
              <i class="fas fa-phone-alt text-primary"></i>
              Contacts
            </h3>
            <div class="space-y-3 sm:space-y-4">
              <div class="flex items-start gap-3">
                <i class="fas fa-user text-primary mt-1 text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Responsable pédagogique</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Dr. Jean KAMGA</p>
                  <p class="text-gray-400 text-xs break-all">jean.kamga@gradusaura.com</p>
                  <p class="text-gray-400 text-xs">+237 6 XX XX XX XX</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <i class="fas fa-headset text-primary mt-1 text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Support Scolarité</p>
                  <p class="text-gray-500 text-xs sm:text-sm break-all">service.scolarite@gradusaura.com</p>
                  <p class="text-gray-400 text-xs">+237 6 XX XX XX XX</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Campus partenaires -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 border-b pb-2">
              <i class="fas fa-university text-primary"></i>
              Campus partenaires
            </h3>
            <div class="space-y-2 sm:space-y-3">
              <div class="flex items-center gap-2"><i class="fas fa-map-pin text-primary text-sm w-4"></i><span class="text-xs sm:text-sm">Yaoundé - Centre Multimédia</span></div>
              <div class="flex items-center gap-2"><i class="fas fa-map-pin text-primary text-sm w-4"></i><span class="text-xs sm:text-sm">Douala - Campus Numérique</span></div>
              <div class="flex items-center gap-2"><i class="fas fa-map-pin text-primary text-sm w-4"></i><span class="text-xs sm:text-sm">Garoua - Centre Universitaire</span></div>
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

    <!-- Modal de confirmation -->
    <div v-if="confirmationModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="confirmationModalOpen = false">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div class="relative bg-white rounded-2xl max-w-md w-full text-center p-5 sm:p-6 animate-modalSlideIn">
        <div class="bg-indigo-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <i class="fas fa-check-circle text-primary text-3xl sm:text-4xl"></i>
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-gray-800">Redirection en cours</h3>
        <p class="text-gray-600 text-sm sm:text-base mt-2">Vous allez être redirigé vers la page de la formation sélectionnée.</p>
        <div class="mt-5 sm:mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full animate-pulse" style="width: 100%"></div>
        </div>
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
        <p class="text-gray-600 text-sm sm:text-base mt-2">La plaquette de la formation hybride est en cours de téléchargement...</p>
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
const confirmationModalOpen = ref(false);
const downloadModalOpen = ref(false);

const goBack = () => {
  router.push('/formations');
};

const goToInscription = () => {
  confirmationModalOpen.value = true;
  setTimeout(() => {
    confirmationModalOpen.value = false;
    router.push('/inscription');
  }, 1500);
};

const downloadBrochure = () => {
  downloadModalOpen.value = true;
  
  const brochureHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Plaquette - Formation Hybride</title>
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
        .info-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
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
        <h1>Formation Hybride - Gradus Aura</h1>
        <p class="date">Document publié le ${new Date().toLocaleDateString('fr-FR')}</p>
      </div>
      
      <h2>Présentation</h2>
      <p>La formation hybride Gradus Aura combine l'excellence de l'enseignement en présentiel avec la flexibilité du digital. Cette approche innovante permet aux apprenants de bénéficier du meilleur des deux mondes.</p>
      
      <div class="info-card">
        <h3>Informations clés</h3>
        <ul>
          <li><strong>Durée :</strong> 9 mois (3 semestres)</li>
          <li><strong>Rythme :</strong> 2 jours présentiel + 3 jours distanciel par semaine</li>
          <li><strong>Lieux :</strong> Campus partenaires (Yaoundé, Douala, Garoua)</li>
          <li><strong>Langue :</strong> Français</li>
          <li><strong>Coût :</strong> 500 000 FCFA (frais de dossier inclus)</li>
        </ul>
      </div>
      
      <h2>Programme</h2>
      <ul>
        <li><strong>Semestre 1 (Présentiel - 3 mois) :</strong> Fondamentaux du management, Communication professionnelle, Ateliers pratiques</li>
        <li><strong>Semestre 2 (Distanciel - 3 mois) :</strong> Outils collaboratifs digitaux, E-learning, Projets tutorés</li>
        <li><strong>Semestre 3 (Stage - 3 mois) :</strong> Stage en entreprise, Rédaction et soutenance de mémoire</li>
      </ul>
      
      <h2>Compétences visées</h2>
      <ul>
        <li>Maîtrise des outils de visioconférence</li>
        <li>Animation d'équipes hybrides</li>
        <li>Gestion de projets digitaux</li>
        <li>Analyse de données et reporting</li>
      </ul>
      
      <h2>Public cible</h2>
      <ul>
        <li>Étudiants souhaitant allier flexibilité et interactions sociales</li>
        <li>Professionnels en reconversion ou en perfectionnement</li>
        <li>Cadres et managers cherchant à moderniser leurs méthodes</li>
      </ul>
      
      <div class="contact">
        <h3 style="margin-top: 0;">Contact</h3>
        <p><strong>Email :</strong> formations@gradusaura.com</p>
        <p><strong>Téléphone :</strong> +237 6 XX XX XX XX</p>
        <p><strong>Support :</strong> service.scolarite@gradusaura.com</p>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} - Gradus Aura - Tous droits réservés</p>
        <p>Pour plus d'informations, visitez notre site web</p>
      </div>
    </body>
    </html>
  `;
  
  const blob = new Blob([brochureHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `plaquette_formation_hybride_${new Date().toISOString().split('T')[0]}.html`;
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
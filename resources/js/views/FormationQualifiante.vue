<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section avec image de fond -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-cyan-700 py-16">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-certificate text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Formations Qualifiantes à distance</span>
        </div>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Formations <span class="text-yellow-300">Qualifiantes (FQ)</span> à distance
        </h1>
        <p class="text-indigo-100 text-base sm:text-lg max-w-2xl mx-auto">
          Développez vos compétences professionnelles avec des certifications reconnues internationalement
        </p>
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <i class="fas fa-calendar-alt text-white text-xs sm:text-sm"></i>
            <span class="text-white text-xs sm:text-sm">Candidature jusqu'au 6 avril 2026</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <i class="fas fa-globe text-white text-xs sm:text-sm"></i>
            <span class="text-white text-xs sm:text-sm">48 formations ouvertes</span>
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
              Les formations qualifiantes internationales sont proposées par les universités membres à travers le numérique. 
              Ces formations permettent d'acquérir des compétences spécifiques et d'obtenir des certifications reconnues dans les domaines porteurs.
            </p>
            <div class="mt-4 p-3 sm:p-4 bg-indigo-50 rounded-lg">
              <div class="flex flex-wrap items-center gap-3">
                <i class="fas fa-trophy text-primary text-xl"></i>
                <span class="text-gray-700 text-sm sm:text-base"><strong>+3000</strong> professionnels certifiés depuis 2020</span>
              </div>
            </div>
          </div>

          <!-- Domaines de formation -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-layer-group text-primary"></i>
              Domaines de formation
            </h2>
            <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-chart-line text-primary mt-1 text-sm sm:text-base"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Marketing Digital & IA</p>
                  <p class="text-xs sm:text-sm text-gray-500">Stratégies digitales, intelligence artificielle</p>
                </div>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-tasks text-primary mt-1 text-sm sm:text-base"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Gestion de projet (PMP)</p>
                  <p class="text-xs sm:text-sm text-gray-500">Méthodologies agiles, certification PMP</p>
                </div>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-database text-primary mt-1 text-sm sm:text-base"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Data Science & Analyse</p>
                  <p class="text-xs sm:text-sm text-gray-500">Big data, machine learning, Python</p>
                </div>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-shield-alt text-primary mt-1 text-sm sm:text-base"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Cybersécurité</p>
                  <p class="text-xs sm:text-sm text-gray-500">Sécurité des systèmes, protection des données</p>
                </div>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-hand-holding-usd text-primary mt-1 text-sm sm:text-base"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Finance & Comptabilité</p>
                  <p class="text-xs sm:text-sm text-gray-500">Analyse financière, contrôle de gestion</p>
                </div>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-language text-primary mt-1 text-sm sm:text-base"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Langues & Certifications</p>
                  <p class="text-xs sm:text-sm text-gray-500">TOEFL, IELTS, anglais des affaires</p>
                </div>
              </div>
            </div>
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
                <span class="text-gray-600 text-sm sm:text-base">Acquérir des compétences spécifiques recherchées par les employeurs</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Obtenir des certifications professionnelles reconnues internationalement</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Se spécialiser dans un domaine porteur</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Améliorer son employabilité et ses perspectives de carrière</span>
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
                <span class="text-gray-600 text-sm sm:text-base">Maîtrise des outils digitaux</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Gestion de projets complexes</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Analyse et interprétation de données</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-check-circle text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Leadership et management d'équipe</span>
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
                <span class="text-gray-600 text-sm sm:text-base">Professionnels en activité souhaitant se perfectionner</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-briefcase text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Demandeurs d'emploi cherchant à se reconvertir</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-graduation-cap text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Étudiants souhaitant compléter leur formation initiale</span>
              </li>
              <li class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-chart-line text-primary mt-1 text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Cadres et managers en évolution professionnelle</span>
              </li>
            </ul>
          </div>

          <!-- Prérequis -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-clipboard-list text-primary"></i>
              Prérequis
            </h2>
            <div class="space-y-2">
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Niveau Baccalauréat minimum (selon la formation)</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Connaissances de base en informatique</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Connexion Internet et équipement informatique</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Motivation et autonomie</p>
            </div>
          </div>

          <!-- Organisation de la formation -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-calendar-alt text-primary"></i>
              Organisation de la formation
            </h2>
            <div class="space-y-3 sm:space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <i class="fas fa-clock text-primary mt-1 text-sm sm:text-base w-5"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Durée</p>
                  <p class="text-gray-600 text-sm sm:text-base">2 à 6 mois selon la formation</p>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <i class="fas fa-laptop text-primary mt-1 text-sm sm:text-base w-5"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Modalité</p>
                  <p class="text-gray-600 text-sm sm:text-base">100% à distance avec tutorat personnalisé</p>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <i class="fas fa-video text-primary mt-1 text-sm sm:text-base w-5"></i>
                <div>
                  <p class="font-semibold text-gray-800 text-sm sm:text-base">Rythme</p>
                  <p class="text-gray-600 text-sm sm:text-base">Classes virtuelles hebdomadaires + travail personnel</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Modalités d'évaluation -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-chart-simple text-primary"></i>
              Modalités d'évaluation
            </h2>
            <div class="space-y-2 sm:space-y-3">
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Contrôle continu tout au long de la formation</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Projets pratiques et études de cas</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Examen final en ligne</p>
              <p class="text-gray-600 text-sm sm:text-base"><i class="fas fa-check text-primary text-xs mr-2"></i> Obtention d'une certification reconnue</p>
            </div>
          </div>

          <!-- Débouchés professionnels -->
          <div class="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <i class="fas fa-briefcase text-primary"></i>
              Débouchés professionnels
            </h2>
            <div class="grid sm:grid-cols-2 gap-2 sm:gap-3">
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-angle-right text-primary text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Chef de projet digital</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-angle-right text-primary text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Data Analyst</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-angle-right text-primary text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Consultant en transformation digitale</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-angle-right text-primary text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Responsable marketing digital</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-angle-right text-primary text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Expert en cybersécurité</span>
              </div>
              <div class="flex items-start gap-2 sm:gap-3">
                <i class="fas fa-angle-right text-primary text-sm sm:text-base"></i>
                <span class="text-gray-600 text-sm sm:text-base">Chef de produit digital</span>
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
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Date limite</p>
                  <p class="text-gray-500 text-xs sm:text-sm">6 avril 2026</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-clock text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Durée</p>
                  <p class="text-gray-500 text-xs sm:text-sm">2 à 6 mois</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-globe text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Pays éligibles</p>
                  <p class="text-gray-500 text-xs sm:text-sm">8 pays participants</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-language text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Langue</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Français / Anglais</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3 pb-3 border-b border-gray-100">
                <i class="fas fa-euro-sign text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Frais de formation</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Variable selon la formation</p>
                  <p class="text-xs text-primary mt-1"><i class="fas fa-gift"></i> Allocations disponibles</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <i class="fas fa-certificate text-primary text-base sm:text-lg w-5 sm:w-6"></i>
                <div>
                  <p class="font-semibold text-gray-700 text-sm sm:text-base">Certification</p>
                  <p class="text-gray-500 text-xs sm:text-sm">Reconnue internationalement</p>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-6 pt-4 border-t border-gray-200 flex flex-col gap-3">
              <button @click="goToInscription" class="w-full py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                <i class="fas fa-arrow-right"></i> Postuler maintenant
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
        <p class="text-gray-600 text-sm sm:text-base mt-2">Le catalogue des formations qualifiantes est en cours de téléchargement...</p>
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
  router.push('/inscription');
};

const downloadCatalogue = () => {
  downloadModalOpen.value = true;
  
  const catalogueHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Catalogue des Formations Qualifiantes</title>
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
        <h1>Catalogue des Formations Qualifiantes (FQ)</h1>
        <p class="date">Date de publication : ${new Date().toLocaleDateString('fr-FR')}</p>
      </div>
      
      <h2>Présentation</h2>
      <p>Les formations qualifiantes internationales sont proposées par les universités membres à travers le numérique. Ces formations permettent d'acquérir des compétences spécifiques et d'obtenir des certifications reconnues.</p>
      <p><strong>+3000 professionnels certifiés depuis 2020</strong></p>
      
      <h2>Formations disponibles</h2>
      
      <div class="formation">
        <h3>1. Marketing Digital & IA</h3>
        <p>Stratégies digitales, intelligence artificielle appliquée au marketing.</p>
        <span class="info">Durée: 3 mois</span>
        <span class="info">100% à distance</span>
        <span class="info">Certification reconnue</span>
      </div>
      
      <div class="formation">
        <h3>2. Gestion de projet (PMP)</h3>
        <p>Méthodologies agiles, préparation à la certification PMP.</p>
        <span class="info">Durée: 4 mois</span>
        <span class="info">100% à distance</span>
        <span class="info">Certification PMP</span>
      </div>
      
      <div class="formation">
        <h3>3. Data Science & Analyse</h3>
        <p>Big data, machine learning, Python pour l'analyse de données.</p>
        <span class="info">Durée: 6 mois</span>
        <span class="info">100% à distance</span>
        <span class="info">Certification Data Scientist</span>
      </div>
      
      <div class="formation">
        <h3>4. Cybersécurité</h3>
        <p>Sécurité des systèmes, protection des données, audit de sécurité.</p>
        <span class="info">Durée: 4 mois</span>
        <span class="info">100% à distance</span>
        <span class="info">Certification Cybersécurité</span>
      </div>
      
      <h2>Informations générales</h2>
      <ul>
        <li><strong>Durée :</strong> 2 à 6 mois selon la formation</li>
        <li><strong>Pays éligibles :</strong> 8 pays participants</li>
        <li><strong>Langue :</strong> Français / Anglais</li>
        <li><strong>Certification :</strong> Reconnue internationalement</li>
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
        <p><strong>Support :</strong> scolarite@gradusaura.com</p>
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
  link.download = `catalogue_formations_qualifiantes_${new Date().toISOString().split('T')[0]}.html`;
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
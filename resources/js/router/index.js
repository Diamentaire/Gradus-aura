import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import EmptyLayout from '../layouts/EmptyLayout.vue';
import FormationPresidentiellePage from '../views/Formations/FormationPresidentiellePage.vue';
import DashboardFormateur from '../views/Dashboard/DashboardFormateur.vue';


const routes = [
  // Routes publiques avec DefaultLayout
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'home', component: () => import('../views/HomePage.vue') },
      { path: 'concours', name: 'concours', component: () => import('../views/ConcoursPage.vue') },
      { path: 'examens', name: 'examens', component: () => import('../views/ExamensPage.vue') },
      { path: 'formations', name: 'formations', component: () => import('../views/FormationsPage.vue') },
      { path: 'ressources', name: 'ressources', component: () => import('../views/RessourcesPage.vue') },
      { path: 'boutique', name: 'boutique', component: () => import('../views/BoutiquePage.vue') },
      { path: 'mobilite/pays', name: 'mobilite-pays', component: () => import('../views/mobilite/PaysList.vue') },
      { path: 'mobilite/bourses', name: 'mobilite-bourses', component: () => import('../views/mobilite/BoursesList.vue') },
      { path: 'contact', name: 'contact', component: () => import('../views/ContactPage.vue') }
    ]
  },

  // Routes d'authentification
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterPage.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/auth/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../views/auth/ResetPassword.vue')
  },

  // Dashboard utilisateur
  {
    path: '/dashboard',
    component: EmptyLayout,
    children: [
      { path: '', name: 'dashboard', component: () => import('../views/DashboardPage.vue') }
    ],
    meta: { requiresAuth: true }
  },

  // ==================== DASHBOARD FORMATEUR ====================
  {
    path: '/formateur',
    component: EmptyLayout,
    meta: { requiresAuth: true },
    children: [
      { 
        path: '', 
        name: 'dashboard-formateur', 
        component: () => import('../views/Dashboard/DashboardFormateur.vue'),
        meta: { title: 'Dashboard Formateur' }
      },
    ],
  },

  // Super Admin
  {
    path: '/superadmin',
    component: EmptyLayout,
    children: [
      { path: '', name: 'super-admin', component: () => import('../views/Dashboard/AdminDashboard.vue') }
    ],
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/dashboard-admin',
    component: EmptyLayout,
    children: [
      { path: '', name: 'superadmin', component: () => import('../views/Dashboard/DashboardAdmin.vue') }
    ],
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  // Routes E-learning
  {
    path: '/e-learning',
    component: EmptyLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'panier', name: 'panier', component: () => import('../views/e-learning/Panier.vue') },
      { path: 'paiement', name: 'paiement', component: () => import('../views/e-learning/Paiement.vue') },
      { path: 'espace-formateur', name: 'espace-formateur', component: () => import('../views/e-learning/EspaceFormateur.vue') },
      { path: 'certificat', name: 'certificat', component: () => import('../views/e-learning/Certificat.vue') }
    ]
  },

  // Routes Concours
  {
    path: '/concours/:id',
    name: 'ConcoursDetails',
    component: () => import('../views/concours/ConcoursDetailsPage.vue')
  },
  {
    path: '/classement-national',
    name: 'classement-national',
    component: () => import('../views/concours/ClassementNational.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/simulation-examen',
    name: 'simulation-examen',
    component: () => import('../views/concours/SimulationExamen.vue'),
    meta: { requiresAuth: true }
  },

  // Routes Orientation
  {
    path: '/orientation',
    component: EmptyLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'test-qi', name: 'test-qi', component: () => import('../views/orientation/TestQI.vue') },
      { path: 'test-disc', name: 'test-disc', component: () => import('../views/orientation/TestDISC.vue') },
      { path: 'test-riasec', name: 'test-riasec', component: () => import('../views/orientation/TestRIASEC.vue') },
      { path: 'resultats', name: 'resultats-orientation', component: () => import('../views/orientation/ResultatsOrientation.vue') }
    ]
  },

  // Routes Mobilité
  {
    path: '/mobilite',
    component: EmptyLayout,
    children: [
      { path: 'pays', name: 'mobilite-pays', component: () => import('../views/mobilite/PaysList.vue') },
      { path: 'bourses', name: 'mobilite-bourses', component: () => import('../views/mobilite/BoursesList.vue') },
      { path: 'dossier', name: 'mobilite-dossier', component: () => import('../views/mobilite/DossierEtudiant.vue'), meta: { requiresAuth: true } },
      { path: 'suivi', name: 'mobilite-suivi', component: () => import('../views/mobilite/SuiviCandidature.vue'), meta: { requiresAuth: true } }
    ]
  },

  // Routes Formations spécifiques
  {
    path: '/formation-diplomante',
    name: 'formation-diplomante',
    component: () => import('../views/Formations/FormationDiplomantePage.vue')
  },
  {
    path: '/formation-qualifiante',
    name: 'formation-qualifiante',
    component: () => import('../views/Formations/FormationQualifiantePage.vue')
  },
  {
    path: '/formation-presidentielle',
    name: 'FormationPresidentielle',
    component: FormationPresidentiellePage
  },
  {
    path: '/formationdiplomante',
    name: 'FormationDiplomante',
    component: () => import('../views/Formations/FormationPresidentiellePage.vue')
  },
  {
    path: '/formationqualifiante',
    name: 'FormationQualifiante',
    component: () => import('../views/Formations/FormationQualifiante.vue')
  },
  {
    path: '/formationhybride',
    name: 'FormationHybride',
    component: () => import('../views/Formations/FormationHybride.vue')
  },
  {
    path: '/formation-hybride-page',
    name: 'FormationHybridePage',
    component: () => import('../views/Formations/FormationHybridePage.vue')
  },

  // Routes utilitaires
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: () => import('../views/ConfirmationPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard de navigation MODIFIÉE (sans vérification de rôle pour test)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('gradus_token');
  const isAuthenticated = !!token;

  // Définition du titre
  if (to.meta?.title) {
    document.title = `${to.meta.title} | Gradus Aura`;
  }

  // Routes publiques
  const publicRoutes = [
    'home', 'concours', 'examens', 'formations', 'ressources', 
    'boutique', 'mobilite-pays', 'mobilite-bourses', 'contact',
    'login', 'register', 'forgot-password', 'reset-password',
    'ConcoursDetails', 'formation-diplomante', 'formation-qualifiante',
    'FormationDiplomante', 'FormationQualifiante', 'FormationHybride',
    'FormationHybridePage', 'confirmation'
  ];
  
  if (publicRoutes.includes(to.name)) {
    next();
    return;
  }
  
  // Routes protégées (uniquement vérification token)
  if (to.meta?.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }
  
  // ✅ Tout est ok
  next();
});

export default router;
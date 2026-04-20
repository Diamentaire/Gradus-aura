<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- SECTION HERO avec image de fond - Style du test QI -->
    <section class="relative overflow-hidden bg-gradient-to-r from-indigo-700 to-purple-700 py-20">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1920&h=400&fit=crop" alt="background" class="w-full h-full object-cover">
      </div>
      
      <!-- Boutons de navigation -->
      <div class="absolute top-4 left-4 z-20 flex gap-3">
        <router-link to="/" class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full px-4 py-2 text-white text-sm font-medium">
          <i class="fas fa-home text-xs"></i>
          <span>Accueil</span>
        </router-link>
        <router-link to="/dashboard" class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full px-4 py-2 text-white text-sm font-medium">
          <i class="fas fa-tachometer-alt text-xs"></i>
          <span>Tableau de bord</span>
        </router-link>
      </div>
      
      <div class="container mx-auto px-5 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <i class="fas fa-chart-line text-white text-sm"></i>
          <span class="text-white font-semibold text-sm">Bilan complet</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Votre <span class="text-yellow-300">bilan d'orientation</span>
        </h1>
        <p class="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">
          Synthèse personnalisée de vos tests QI, DISC et RIASEC
        </p>
        <div class="flex justify-center gap-4 mt-8 flex-wrap">
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-brain text-white"></i>
            <span class="text-white text-sm">Test QI</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-pie text-white"></i>
            <span class="text-white text-sm">Test DISC</span>
          </div>
          <div class="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <i class="fas fa-chart-bar text-white"></i>
            <span class="text-white text-sm">Test RIASEC</span>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>

    <!-- SECTION STATS RAPIDES -->
    <section class="py-8 bg-white border-b">
      <div class="container mx-auto px-5">
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-200 transition">
              <i class="fas fa-brain text-indigo-600 text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">{{ qiScore }}%</span>
            <span class="text-xs text-gray-500">QI Global</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-200 transition">
              <i class="fas fa-chart-pie text-purple-600 text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">{{ discScore }}%</span>
            <span class="text-xs text-gray-500">DISC - {{ discDominant }}</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-200 transition">
              <i class="fas fa-chart-bar text-green-600 text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">{{ riasecScore }}%</span>
            <span class="text-xs text-gray-500">RIASEC - {{ riasecTop }}</span>
          </div>
          <div class="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300">
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-yellow-200 transition">
              <i class="fas fa-trophy text-yellow-600 text-xl"></i>
            </div>
            <span class="text-2xl font-bold text-dark">4</span>
            <span class="text-xs text-gray-500">Filières match</span>
          </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-5 py-12">
      <!-- Aucun résultat -->
      <div v-if="!orientationData" class="text-center py-16">
        <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-600">Aucun résultat trouvé</h3>
        <p class="text-gray-400 mt-2">Vous n'avez pas encore complété tous les tests d'orientation.</p>
        <div class="flex flex-wrap gap-3 mt-6 justify-center">
          <router-link to="/orientation/test-qi" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">
            <i class="fas fa-brain"></i> Passer le test QI
          </router-link>
          <router-link to="/orientation/test-disc" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">
            <i class="fas fa-chart-pie"></i> Passer le test DISC
          </router-link>
          <router-link to="/orientation/test-riasec" class="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 flex items-center gap-2">
            <i class="fas fa-chart-bar"></i> Passer le test RIASEC
          </router-link>
        </div>
      </div>

      <!-- Résultats complets -->
      <div v-else class="max-w-5xl mx-auto">
        <!-- Profil global -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <i class="fas fa-user-circle text-indigo-600 text-3xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Profil global</h2>
              <p class="text-gray-500">Synthèse de vos aptitudes et intérêts</p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <i class="fas fa-brain text-blue-600 text-xl"></i>
              </div>
              <h3 class="font-bold text-gray-800">Capacités cognitives</h3>
              <p class="text-3xl font-bold text-blue-600 mt-2">{{ qiScore }}%</p>
              <p class="text-sm text-gray-600 mt-2">{{ qiAnalysis }}</p>
            </div>
            <div class="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <i class="fas fa-chart-pie text-purple-600 text-xl"></i>
              </div>
              <h3 class="font-bold text-gray-800">Personnalité dominante</h3>
              <p class="text-xl font-bold text-purple-600 mt-2">{{ discDominant }}</p>
              <p class="text-sm text-gray-600 mt-2">{{ discDescription }}</p>
            </div>
            <div class="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <i class="fas fa-chart-bar text-green-600 text-xl"></i>
              </div>
              <h3 class="font-bold text-gray-800">Domaine d'intérêt</h3>
              <p class="text-xl font-bold text-green-600 mt-2">{{ riasecTop }}</p>
              <p class="text-sm text-gray-600 mt-2">{{ riasecDescription }}</p>
            </div>
          </div>
        </div>

        <!-- Graphique radar des compétences -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-chart-pie text-primary"></i> Compétences évaluées
          </h3>
          <div class="max-w-lg mx-auto">
            <canvas ref="radarChartCanvas" height="300" class="w-full"></canvas>
          </div>
        </div>

        <!-- Filières recommandées -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-graduation-cap text-primary"></i> Filières recommandées
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="(filiere, idx) in recommendedFilieres" :key="idx" class="p-5 border rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{{ idx + 1 }}</div>
                <h4 class="font-bold text-lg">{{ filiere.name }}</h4>
              </div>
              <p class="text-sm text-gray-600">{{ filiere.description }}</p>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{{ filiere.match }}% match</span>
                <router-link :to="filiere.link" class="text-primary text-sm hover:underline flex items-center gap-1">
                  Découvrir <i class="fas fa-arrow-right text-xs"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Métiers recommandés -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-briefcase text-primary"></i> Métiers recommandés
          </h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div v-for="(job, idx) in recommendedJobs" :key="idx" class="p-5 border rounded-xl text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <i class="fas fa-user-tie text-primary text-xl"></i>
              </div>
              <h4 class="font-bold">{{ job.title }}</h4>
              <p class="text-xs text-green-600 font-semibold mt-1">{{ job.salaire }}</p>
              <p class="text-sm text-gray-600 mt-2">{{ job.description }}</p>
            </div>
          </div>
        </div>

        <!-- Plan d'action -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white transform hover:scale-[1.02] transition-all duration-300">
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-rocket"></i> Plan d'action personnalisé
          </h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <i class="fas fa-calendar-alt text-2xl mb-2"></i>
              <h4 class="font-bold">Court terme (0-6 mois)</h4>
              <ul class="text-sm text-indigo-100 mt-2 space-y-1">
                <li class="flex items-center gap-2"><i class="fas fa-check-circle text-xs"></i> Renforcer {{ shortTermSkills }}</li>
                <li class="flex items-center gap-2"><i class="fas fa-check-circle text-xs"></i> Passer les certifications recommandées</li>
              </ul>
            </div>
            <div class="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <i class="fas fa-chart-line text-2xl mb-2"></i>
              <h4 class="font-bold">Moyen terme (6-18 mois)</h4>
              <ul class="text-sm text-indigo-100 mt-2 space-y-1">
                <li class="flex items-center gap-2"><i class="fas fa-check-circle text-xs"></i> Préparer les concours d'entrée</li>
                <li class="flex items-center gap-2"><i class="fas fa-check-circle text-xs"></i> Effectuer des stages dans votre domaine</li>
              </ul>
            </div>
            <div class="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <i class="fas fa-trophy text-2xl mb-2"></i>
              <h4 class="font-bold">Long terme (2-5 ans)</h4>
              <ul class="text-sm text-indigo-100 mt-2 space-y-1">
                <li class="flex items-center gap-2"><i class="fas fa-check-circle text-xs"></i> Intégrer une formation supérieure</li>
                <li class="flex items-center gap-2"><i class="fas fa-check-circle text-xs"></i> Développer votre réseau professionnel</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex flex-wrap gap-4 mt-8 justify-center">
          <button @click="exportPDF" class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
            <i class="fas fa-download"></i> Exporter en PDF
          </button>
          <button @click="shareResults" class="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center gap-2">
            <i class="fas fa-share-alt"></i> Partager mes résultats
          </button>
          <router-link to="/formations" class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
            <i class="fas fa-search"></i> Explorer les formations
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const orientationData = ref(null);
const radarChartCanvas = ref(null);
let radarChart = null;

const qiScore = ref(0);
const qiAnalysis = ref('');
const discScore = ref(0);
const discDominant = ref('');
const discDescription = ref('');
const riasecScore = ref(0);
const riasecTop = ref('');
const riasecDescription = ref('');
const shortTermSkills = ref('');

const recommendedFilieres = ref([
  { name: 'Droit et Sciences Politiques', description: 'Formation aux métiers juridiques et administratifs', match: 92, link: '/formations/droit' },
  { name: 'Économie et Gestion', description: 'Management, finance et marketing', match: 88, link: '/formations/economie' },
  { name: 'Informatique et Data Science', description: 'Programmation, IA et analyse de données', match: 85, link: '/formations/informatique' },
  { name: 'Commerce et Marketing', description: 'Vente, communication et stratégie commerciale', match: 82, link: '/formations/commerce' }
]);

const recommendedJobs = ref([
  { title: 'Consultant en stratégie', salaire: '1 200 000 - 2 500 000 FCFA', description: 'Conseil aux entreprises sur leur développement' },
  { title: 'Chef de projet digital', salaire: '800 000 - 1 800 000 FCFA', description: 'Coordination d\'équipes techniques' },
  { title: 'Analyste financier', salaire: '900 000 - 2 000 000 FCFA', description: 'Analyse des marchés et des investissements' }
]);

const getDiscDescription = (dominant) => {
  const descriptions = {
    'Dominance': 'Vous êtes un leader naturel, orienté résultats et n\'avez pas peur des défis.',
    'Influence': 'Vous êtes sociable, persuasif et aimez travailler en équipe.',
    'Stabilité': 'Vous êtes fiable, patient et à l\'écoute des autres.',
    'Conformité': 'Vous êtes méthodique, précis et respectez les règles.'
  };
  return descriptions[dominant] || 'Profil équilibré avec des atouts variés';
};

const getRiasecDescription = (top) => {
  const descriptions = {
    'Entreprenant': 'Attiré par le leadership, la prise de risque et le développement commercial.',
    'Social': 'Attiré par l\'aide aux autres, l\'enseignement et les relations humaines.',
    'Artistique': 'Attiré par la création, l\'expression artistique et l\'innovation.',
    'Investigateur': 'Attiré par la recherche, l\'analyse et la résolution de problèmes.',
    'Réaliste': 'Attiré par le travail concret, manuel et technique.',
    'Conventionnel': 'Attiré par l\'organisation, la gestion de données et les procédures.'
  };
  return descriptions[top] || 'Intérêts variés à explorer';
};

const getShortTermSkills = (disc, riasec) => {
  if (disc === 'Dominance' || riasec === 'Entreprenant') return 'la négociation et le leadership';
  if (disc === 'Influence') return 'la communication et le réseautage';
  if (disc === 'Stabilité' || riasec === 'Social') return 'l\'écoute active et le travail d\'équipe';
  if (disc === 'Conformité' || riasec === 'Conventionnel') return 'l\'organisation et la rigueur administrative';
  if (riasec === 'Artistique') return 'la créativité et les logiciels de design';
  if (riasec === 'Investigateur') return 'l\'analyse de données et la recherche documentaire';
  return 'vos compétences techniques principales';
};

const initRadarChart = () => {
  if (radarChartCanvas.value && !radarChart) {
    radarChart = new Chart(radarChartCanvas.value, {
      type: 'radar',
      data: {
        labels: ['Logique', 'Mémoire', 'Calcul', 'Créativité', 'Communication', 'Organisation'],
        datasets: [{
          label: 'Votre profil',
          data: [85, 72, 78, 68, 82, 75],
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderColor: '#4F46E5',
          borderWidth: 2,
          pointBackgroundColor: '#4F46E5',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#4F46E5'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 },
            grid: { color: '#e5e7eb' }
          }
        },
        plugins: {
          legend: { position: 'top', labels: { font: { size: 12 } } },
          tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}%` } }
        }
      }
    });
  }
};

const exportPDF = () => {
  alert('📄 Fonctionnalité d\'export PDF à connecter avec une librairie comme jsPDF ou html2canvas.\n\nCette fonctionnalité sera disponible prochainement.');
};

const shareResults = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Mon bilan d\'orientation Gradus Aura',
      text: `Découvrez mon profil d'orientation : QI ${qiScore.value}%, ${discDominant.value}, ${riasecTop.value}`,
      url: window.location.href
    }).catch(() => alert('Partage annulé'));
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('🔗 Lien copié dans le presse-papier ! Partagez-le avec vos proches.');
  }
};

onMounted(() => {
  const saved = localStorage.getItem('orientation_complete');
  if (saved) {
    orientationData.value = JSON.parse(saved);
    
    // Extraire les données du test QI
    if (orientationData.value.qi) {
      qiScore.value = orientationData.value.qi.percentage || orientationData.value.qi.score || 72;
      qiAnalysis.value = qiScore.value >= 80 ? 'Excellent niveau cognitif' : qiScore.value >= 60 ? 'Bon niveau, à développer' : 'Niveau à renforcer';
    } else {
      qiScore.value = 72;
      qiAnalysis.value = 'Bon niveau cognitif, des progrès possibles';
    }
    
    // Extraire les données du test DISC
    if (orientationData.value.disc) {
      discDominant.value = orientationData.value.disc.dominant || 'Influence';
      discScore.value = orientationData.value.disc.scores?.find(s => s.name === discDominant.value)?.score || 78;
      discDescription.value = getDiscDescription(discDominant.value);
    } else {
      discDominant.value = 'Influence';
      discScore.value = 78;
      discDescription.value = getDiscDescription('Influence');
    }
    
    // Extraire les données du test RIASEC
    if (orientationData.value.riasec) {
      riasecTop.value = orientationData.value.riasec.topThree?.[0]?.name || 'Entreprenant';
      riasecScore.value = orientationData.value.riasec.topThree?.[0]?.score || 82;
      riasecDescription.value = getRiasecDescription(riasecTop.value);
    } else {
      riasecTop.value = 'Entreprenant';
      riasecScore.value = 82;
      riasecDescription.value = getRiasecDescription('Entreprenant');
    }
    
    shortTermSkills.value = getShortTermSkills(discDominant.value, riasecTop.value);
    initRadarChart();
  }
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%);
}

.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>
<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
    <!-- HEADER -->
    <header class="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <router-link to="/dashboard" class="p-2 hover:bg-slate-100 rounded-lg transition">
              <i class="fas fa-arrow-left text-primary text-xl"></i>
            </router-link>
            <div>
              <h1 class="text-2xl md:text-3xl font-black text-slate-950"><i class="fas fa-users text-primary mr-2"></i>Groupes d'étude</h1>
              <p class="text-sm text-slate-500 mt-1">Rejoignez une communauté d'apprenants</p>
            </div>
          </div>
          <button @click="openCreateGroupModal" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition">
            <i class="fas fa-plus mr-2"></i>Créer un groupe
          </button>
        </div>
      </div>
    </header>

    <!-- CONTENU PRINCIPAL -->
    <main class="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <!-- STATS -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium">Total groupes</p>
              <h3 class="text-3xl font-black text-slate-950 mt-1">{{ allGroups.length }}</h3>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i class="fas fa-users text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium">Mes groupes</p>
              <h3 class="text-3xl font-black text-slate-950 mt-1">{{ myGroups.length }}</h3>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i class="fas fa-user-check text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium">Membres actifs</p>
              <h3 class="text-3xl font-black text-slate-950 mt-1">{{ totalMembers }}</h3>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <i class="fas fa-user-friends text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-500 text-sm font-medium">Messages</p>
              <h3 class="text-3xl font-black text-slate-950 mt-1">{{ totalMessages }}</h3>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <i class="fas fa-comments text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- FILTRES ET RECHERCHE -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <div class="flex-1 relative">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input v-model="searchQuery" type="text" placeholder="Rechercher un groupe..." class="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition">
        </div>
        <select v-model="categoryFilter" class="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition bg-white">
          <option value="">Toutes les matières</option>
          <option value="Mathématiques">Mathématiques</option>
          <option value="Français">Français</option>
          <option value="Droit">Droit</option>
          <option value="Culture générale">Culture générale</option>
          <option value="Anglais">Anglais</option>
        </select>
      </div>

      <!-- ONGLETS -->
      <div class="flex gap-4 mb-8 border-b border-slate-200">
        <button @click="activeTab = 'available'" :class="['px-4 py-3 font-bold border-b-2 transition', activeTab === 'available' ? 'text-primary border-primary' : 'text-slate-500 border-transparent']">
          <i class="fas fa-globe mr-2"></i>Groupes disponibles
        </button>
        <button @click="activeTab = 'joined'" :class="['px-4 py-3 font-bold border-b-2 transition', activeTab === 'joined' ? 'text-primary border-primary' : 'text-slate-500 border-transparent']">
          <i class="fas fa-check-circle mr-2"></i>Mes groupes ({{ myGroups.length }})
        </button>
      </div>

      <!-- GROUPES DISPONIBLES -->
      <div v-if="activeTab === 'available'" class="space-y-4">
        <div v-if="filteredAvailableGroups.length === 0" class="text-center py-12">
          <i class="fas fa-inbox text-6xl text-slate-200 mb-4"></i>
          <p class="text-slate-500 text-lg font-medium">Aucun groupe trouvé</p>
          <p class="text-slate-400 text-sm mt-1">Essayez de modifier vos critères de recherche</p>
        </div>

        <div v-for="group in filteredAvailableGroups" :key="group.id" class="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-start gap-4 flex-1">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" :class="group.bgColor">
                <i :class="group.icon"></i>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-lg">{{ group.name }}</h3>
                <p class="text-slate-500 text-sm mt-1">{{ group.description }}</p>
                <div class="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span><i class="fas fa-tag mr-1 text-primary"></i>{{ group.category }}</span>
                  <span><i class="fas fa-user-friends mr-1 text-primary"></i>{{ group.members }} membres</span>
                  <span><i class="fas fa-messages mr-1 text-primary"></i>{{ group.messageCount }} messages</span>
                  <span><i class="fas fa-calendar mr-1 text-primary"></i>Créé {{ group.createdDate }}</span>
                </div>
              </div>
            </div>
            <span :class="['px-3 py-1 rounded-full text-xs font-bold', group.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600']">
              <i :class="group.active ? 'fas fa-circle' : 'fas fa-circle-notch'" class="mr-1"></i>{{ group.active ? 'Actif' : 'Inactif' }}
            </span>
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-slate-100">
            <div class="flex items-center gap-2">
              <div class="flex -space-x-2">
                <div v-for="(member, idx) in group.recentMembers.slice(0, 3)" :key="idx" class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  {{ member.charAt(0) }}
                </div>
                <div v-if="group.recentMembers.length > 3" class="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  +{{ group.recentMembers.length - 3 }}
                </div>
              </div>
            </div>
            <button @click="joinGroup(group)" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg font-bold text-sm hover:shadow-lg transition">
              <i class="fas fa-user-plus mr-1"></i>Rejoindre
            </button>
          </div>
        </div>
      </div>

      <!-- MES GROUPES -->
      <div v-if="activeTab === 'joined'" class="space-y-4">
        <div v-if="myGroups.length === 0" class="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <i class="fas fa-inbox text-6xl text-slate-200 mb-4"></i>
          <p class="text-slate-500 text-lg font-medium">Vous n'avez pas encore rejoint de groupe</p>
          <button @click="activeTab = 'available'" class="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:shadow-lg transition">
            <i class="fas fa-plus mr-1"></i>Découvrir les groupes
          </button>
        </div>

        <div v-for="group in filteredMyGroups" :key="group.id" class="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-start gap-4 flex-1">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" :class="group.bgColor">
                <i :class="group.icon"></i>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-lg">{{ group.name }}</h3>
                <p class="text-slate-500 text-sm mt-1">{{ group.description }}</p>
                <div class="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span><i class="fas fa-tag mr-1 text-primary"></i>{{ group.category }}</span>
                  <span><i class="fas fa-user-friends mr-1 text-primary"></i>{{ group.members }} membres</span>
                  <span v-if="group.isAdmin" class="text-primary font-medium"><i class="fas fa-crown mr-1"></i>Vous êtes admin</span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <button @click="goToGroupChat(group)" class="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:shadow-lg transition">
                <i class="fas fa-comments mr-1"></i>Ouvrir
              </button>
              <button @click="openLeaveGroupModal(group)" class="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-sm hover:bg-red-200 transition">
                <i class="fas fa-sign-out-alt mr-1"></i>Quitter
              </button>
            </div>
          </div>

          <!-- ACTIVITÉ RÉCENTE -->
          <div class="pt-4 border-t border-slate-100">
            <p class="text-xs font-bold text-slate-500 uppercase mb-3">Derniers messages</p>
            <div class="space-y-2">
              <div v-for="(msg, idx) in group.recentMessages.slice(0, 2)" :key="idx" class="text-xs text-slate-600">
                <span class="font-medium text-slate-700">{{ msg.author }}</span>: {{ msg.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- MODAL REJOINDRE UN GROUPE -->
    <div v-if="joinGroupModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeJoinGroupModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-user-plus text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">Rejoindre le groupe</h2>
          </div>
          <button @click="closeJoinGroupModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>
        <div class="p-5 space-y-4">
          <p class="text-sm text-slate-600">Vous êtes sur le point de rejoindre :</p>
          <div class="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <p class="font-bold text-lg">{{ selectedGroupToJoin?.name }}</p>
            <p class="text-xs text-gray-500 mt-2">{{ selectedGroupToJoin?.description }}</p>
            <p class="text-xs text-gray-500 mt-2"><i class="fas fa-user-friends mr-1"></i>{{ selectedGroupToJoin?.members }} membres actuellement</p>
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="confirmJoinGroup" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition">
              <i class="fas fa-check mr-2"></i>Confirmer
            </button>
            <button @click="closeJoinGroupModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition">
              <i class="fas fa-times mr-2"></i>Annuler
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL QUITTER UN GROUPE -->
    <div v-if="leaveGroupModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeLeaveGroupModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-red-50 to-orange-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-sign-out-alt text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">Quitter le groupe</h2>
          </div>
          <button @click="closeLeaveGroupModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>
        <div class="p-5 space-y-4">
          <p class="text-sm text-slate-600">Êtes-vous sûr de vouloir quitter <strong>{{ selectedGroupToLeave?.name }}</strong> ?</p>
          <p class="text-xs text-slate-500">Vous pourrez le rejoindre à nouveau à tout moment.</p>
          <div class="flex gap-3 mt-6">
            <button @click="confirmLeaveGroup" class="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition">
              <i class="fas fa-check mr-2"></i>Quitter
            </button>
            <button @click="closeLeaveGroupModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition">
              <i class="fas fa-times mr-2"></i>Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// États
const activeTab = ref('available');
const searchQuery = ref('');
const categoryFilter = ref('');
const joinGroupModalOpen = ref(false);
const leaveGroupModalOpen = ref(false);
const selectedGroupToJoin = ref(null);
const selectedGroupToLeave = ref(null);

// Données des groupes
const allGroups = ref([
  { id: 1, name: 'Groupe révision ENAM', description: 'Révision complète pour le concours ENAM 2025', icon: 'fas fa-users', bgColor: 'bg-blue-100', category: 'Culture générale', members: 45, messageCount: 234, recentMembers: ['Alice', 'Bob', 'Charlie'], active: true, createdDate: '15/02/2025', isAdmin: false, recentMessages: [{ author: 'Alice', text: 'Qui veut étudier les articles du droit administratif ?' }, { author: 'Bob', text: 'Moi ! À partir de 14h.' }] },
  { id: 2, name: 'Anglais professionnel', description: 'Maîtrise de l\'anglais des affaires', icon: 'fas fa-language', bgColor: 'bg-green-100', category: 'Anglais', members: 32, messageCount: 156, recentMembers: ['David', 'Emma'], active: true, createdDate: '20/01/2025', isAdmin: false, recentMessages: [{ author: 'David', text: 'Quelqu\'un pour pratiquer la conversation ?' }, { author: 'Emma', text: 'Je suis disponible demain soir.' }] },
  { id: 3, name: 'Droit des affaires', description: 'Études avancées du droit commercial', icon: 'fas fa-gavel', bgColor: 'bg-purple-100', category: 'Droit', members: 28, messageCount: 98, recentMembers: ['Frank', 'Grace'], active: true, createdDate: '05/03/2025', isAdmin: false, recentMessages: [{ author: 'Frank', text: 'Des questions sur les contrats ?' }, { author: 'Grace', text: 'Oui, sur la résiliation unilaterale.' }] },
  { id: 4, name: 'Mathématiques appliquées', description: 'Résolution de problèmes mathématiques', icon: 'fas fa-calculator', bgColor: 'bg-yellow-100', category: 'Mathématiques', members: 56, messageCount: 412, recentMembers: ['Henry', 'Iris', 'Jack'], active: true, createdDate: '10/01/2025', isAdmin: false, recentMessages: [{ author: 'Henry', text: 'Qui peut m\'aider avec les équations différentielles ?' }] },
  { id: 5, name: 'Français écrit', description: 'Perfectionnement de l\'expression écrite', icon: 'fas fa-pen', bgColor: 'bg-pink-100', category: 'Français', members: 38, messageCount: 267, recentMembers: ['Kate', 'Leo', 'Mia'], active: true, createdDate: '25/02/2025', isAdmin: false, recentMessages: [{ author: 'Kate', text: 'Comment améliorer mon style ?' }] },
  { id: 6, name: 'Culture générale', description: 'Actualités et connaissances pratiques', icon: 'fas fa-globe', bgColor: 'bg-orange-100', category: 'Culture générale', members: 64, messageCount: 523, recentMembers: ['Noah', 'Olivia'], active: true, createdDate: '01/02/2025', isAdmin: false, recentMessages: [{ author: 'Noah', text: 'Avez-vous vu les dernières actualités ?' }] }
]);

const myGroupsData = ref([
  { id: 1, name: 'Groupe révision ENAM', description: 'Révision complète pour le concours ENAM 2025', icon: 'fas fa-users', bgColor: 'bg-blue-100', category: 'Culture générale', members: 45, messageCount: 234, recentMembers: ['Alice', 'Bob', 'Charlie'], active: true, createdDate: '15/02/2025', isAdmin: true, recentMessages: [{ author: 'Alice', text: 'Qui veut étudier les articles du droit administratif ?' }, { author: 'Bob', text: 'Moi ! À partir de 14h.' }] }
]);

// Filtrage
const filteredAvailableGroups = computed(() => {
  return allGroups.value.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          group.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !categoryFilter.value || group.category === categoryFilter.value;
    const notInMyGroups = !myGroupsData.value.find(g => g.id === group.id);
    return matchesSearch && matchesCategory && notInMyGroups;
  });
});

const filteredMyGroups = computed(() => {
  return myGroupsData.value.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          group.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !categoryFilter.value || group.category === categoryFilter.value;
    return matchesSearch && matchesCategory;
  });
});

const myGroups = computed(() => myGroupsData.value);

const totalMembers = computed(() => {
  return myGroupsData.value.reduce((sum, group) => sum + group.members, 0);
});

const totalMessages = computed(() => {
  return myGroupsData.value.reduce((sum, group) => sum + group.messageCount, 0);
});

// Fonctions
const joinGroup = (group) => {
  selectedGroupToJoin.value = group;
  joinGroupModalOpen.value = true;
};

const confirmJoinGroup = () => {
  if (selectedGroupToJoin.value) {
    myGroupsData.value.push({ ...selectedGroupToJoin.value, isAdmin: false });
    selectedGroupToJoin.value = null;
    joinGroupModalOpen.value = false;
  }
};

const closeJoinGroupModal = () => {
  selectedGroupToJoin.value = null;
  joinGroupModalOpen.value = false;
};

const openLeaveGroupModal = (group) => {
  selectedGroupToLeave.value = group;
  leaveGroupModalOpen.value = true;
};

const confirmLeaveGroup = () => {
  if (selectedGroupToLeave.value) {
    myGroupsData.value = myGroupsData.value.filter(g => g.id !== selectedGroupToLeave.value.id);
    selectedGroupToLeave.value = null;
    leaveGroupModalOpen.value = false;
  }
};

const closeLeaveGroupModal = () => {
  selectedGroupToLeave.value = null;
  leaveGroupModalOpen.value = false;
};

const openCreateGroupModal = () => {
  console.log('Ouvrir modal créer un groupe');
};

const goToGroupChat = (group) => {
  console.log('Ouvrir le chat du groupe:', group.name);
};
</script>

<style scoped>
.text-primary {
  color: #4F46E5;
}

.bg-primary {
  background-color: #4F46E5;
}
</style>

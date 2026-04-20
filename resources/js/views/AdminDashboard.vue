<template>
  <div :class="['min-h-screen', isDarkMode ? 'dark' : '']">
    <div :class="['flex h-screen', isDarkMode ? 'dark' : '']">
      <!-- Sidebar -->
      <aside 
        :class="[
          'fixed md:relative z-40 w-64 h-full transition-transform duration-300 ease-in-out flex flex-col shrink-0 overflow-hidden',
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-r border-slate-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
        <button 
          @click="sidebarOpen = false" 
          class="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-50"
        >
          <i class="fas fa-times text-xl"></i>
        </button>

        <div :class="['p-4 md:p-6 border-b', isDarkMode ? 'border-gray-700' : 'border-slate-200']">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl">
              <i class="fas fa-crown text-white text-sm md:text-base"></i>
            </div>
            <span :class="['font-bold text-lg md:text-xl tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">SuperAdmin Panel</span>
          </div>
          
          <div :class="['grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 rounded-2xl border mt-4 md:mt-6', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Admins</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ admins.length }}</p></div>
            <div class="text-center py-1 md:py-2 border-x border-slate-200"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Users</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ users.length }}</p></div>
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Formations</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ courses.length }}</p></div>
          </div>
        </div>
        
        <nav class="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6 custom-scrollbar">
          <div class="space-y-1">
            <p class="px-3 text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Principale</p>
            <div @click="activeMenu = 'dashboard'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'dashboard' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-tachometer-alt w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Tableau de bord</span>
            </div>
            <div @click="activeMenu = 'users'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'users' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-users w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Utilisateurs</span>
            </div>
            <div @click="activeMenu = 'admins'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'admins' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-user-shield w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Administrateurs</span>
            </div>
            <div @click="activeMenu = 'formateurs'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'formateurs' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-chalkboard-user w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Formateurs</span>
            </div>
            <div @click="activeMenu = 'courses'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'courses' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-book w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Formations</span>
            </div>
            <div @click="activeMenu = 'contests'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'contests' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-trophy w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Concours</span>
            </div>
            <div @click="activeMenu = 'exams'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'exams' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-file-alt w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Examens</span>
            </div>
            <div @click="activeMenu = 'payments'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'payments' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-credit-card w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Paiements</span>
            </div>
          </div>
          
          <div class="space-y-1">
            <p class="px-3 text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Analyse</p>
            <div @click="activeMenu = 'statistics'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'statistics' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-chart-line w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Statistiques</span>
            </div>
            <div @click="activeMenu = 'reports'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'reports' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-file-alt w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Rapports</span>
            </div>
          </div>
          
          <div class="space-y-1">
            <p class="px-3 text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Système</p>
            <div @click="activeMenu = 'settings'; sidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeMenu === 'settings' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-cog w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Paramètres</span>
            </div>
          </div>
        </nav>
        
        <div :class="['p-3 md:p-4 border-t', isDarkMode ? 'border-gray-700' : 'border-slate-100']">
          <div class="flex items-center gap-2 md:gap-3">
            <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
              SA
            </div>
            <div class="flex-1">
              <p :class="['text-[10px] md:text-xs font-bold truncate', isDarkMode ? 'text-white' : 'text-slate-950']">Super Admin</p>
              <p :class="['text-[8px] md:text-[10px] truncate', isDarkMode ? 'text-gray-400' : 'text-slate-500']">superadmin@gradusaura.com</p>
            </div>
          </div>
          <button @click="logout" class="w-full mt-3 md:mt-4 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition text-[10px] md:text-[12px]">
            <i class="fas fa-sign-out-alt"></i>
            <span class="font-black uppercase tracking-widest">Déconnexion</span>
          </button>
        </div>
      </aside>
      
      <div 
        v-if="sidebarOpen" 
        class="fixed inset-0 bg-black/50 z-30 md:hidden"
        @click="sidebarOpen = false"
      ></div>
      
      <main :class="['flex-1 overflow-y-auto custom-scrollbar', isDarkMode ? 'bg-gray-900' : 'bg-slate-50']">
        <header :class="['sticky top-0 z-10 backdrop-blur-sm border-b px-4 md:px-8 py-3 md:py-4', 
          isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-slate-100']">
          <div class="flex justify-between items-center">
            <div>
              <h1 :class="['text-xl md:text-2xl font-black tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">{{ activeMenuTitle }}</h1>
              <div class="flex items-center gap-2 md:gap-3 mt-1">
                <div class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <p class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Super Admin</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2 md:gap-4">
              <div class="relative cursor-pointer" @click="notificationsOpen = !notificationsOpen">
                <i class="fas fa-bell text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
                <span class="absolute -top-1 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-[6px] md:text-[8px] font-bold rounded-full flex items-center justify-center">{{ unreadCount }}</span>
              </div>
              <div class="relative cursor-pointer" @click="toggleTheme">
                <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
              </div>
              <div class="flex items-center gap-2 md:gap-3 ml-1 md:ml-2 cursor-pointer">
                <div class="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                  SA
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <!-- ==================== DASHBOARD ==================== -->
        <div v-if="activeMenu === 'dashboard'" class="p-3 md:p-8">
          <div class="mb-6">
            <p class="text-slate-500 text-sm">Bienvenue Super Admin, voici les statistiques globales</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-users text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ Math.floor(Math.random() * 20) }}%</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Utilisateurs totaux</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ users.length + formateurs.length + admins.length }}</h3>
            </div>
            
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-book text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ courses.length }}</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Formations</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ courses.length }}</h3>
            </div>
            
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-trophy text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ contests.filter(c => c.status === 'open').length }}</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Concours actifs</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ contests.filter(c => c.status === 'open').length }}</h3>
            </div>
            
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-chart-line text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+23%</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Chiffre d'affaires</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ formatPrice(totalRevenue) }} FCFA</h3>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
              <div class="flex justify-between items-center mb-4 md:mb-6">
                <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950">Évolution des inscriptions</h3>
                <i class="fas fa-chart-line text-slate-400 text-sm md:text-base"></i>
              </div>
              <canvas ref="inscriptionsChartCanvas" height="200" class="w-full"></canvas>
            </div>
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
              <div class="flex justify-between items-center mb-4 md:mb-6">
                <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950">Répartition par type</h3>
                <i class="fas fa-chart-pie text-slate-400 text-sm md:text-base"></i>
              </div>
              <canvas ref="repartitionChartCanvas" height="200" class="w-full"></canvas>
            </div>
          </div>
          
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div class="p-3 md:p-6 flex justify-between items-center border-b border-slate-50 flex-wrap gap-2">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-950"><i class="fas fa-history mr-2"></i> Dernières activités</h3>
            </div>
            <div class="divide-y divide-slate-50">
              <div v-for="activity in recentActivities" :key="activity.id" class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 md:p-5 hover:bg-blue-50/30 transition-all">
                <div class="flex items-center gap-3 md:gap-4">
                  <div :class="activity.type === 'user' ? 'bg-blue-100 text-blue-600' : activity.type === 'course' ? 'bg-green-100 text-green-600' : activity.type === 'payment' ? 'bg-yellow-100 text-yellow-600' : 'bg-purple-100 text-purple-600'" class="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center">
                    <i :class="activity.icon" class="text-base md:text-lg"></i>
                  </div>
                  <div>
                    <p class="font-bold text-sm md:text-base text-slate-800">{{ activity.message }}</p>
                    <p class="text-xs text-slate-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ==================== GESTION UTILISATEURS ==================== -->
        <div v-if="activeMenu === 'users'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">            <button @click="openUserModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
              <i class="fas fa-plus mr-1"></i> Ajouter un élève
            </button>
          </div>
          
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 mb-6">
            <div class="flex flex-col sm:flex-row gap-3">
              <select v-model="userFilters.status" class="px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary">
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
              <div class="flex-1">
                <input type="text" v-model="userFilters.search" placeholder="Rechercher par nom ou email..." class="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary">
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
            <table class="w-full min-w-[600px]">
              <thead class="bg-slate-50 border-b border-slate-100">
                <tr class="text-left">
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Utilisateur</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Email</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Téléphone</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Statut</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Inscrit le</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-blue-50/30 transition">
                  <td class="p-3 md:p-4">
                    <div class="flex items-center gap-2 md:gap-3">
                      <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs md:text-sm">
                        {{ user.name.charAt(0) }}
                      </div>
                      <span class="font-medium text-sm md:text-base text-slate-800">{{ user.name }}</span>
                    </div>
                   </td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ user.email }}</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ user.phone || '-' }}</td>
                  <td class="p-3 md:p-4">
                    <span :class="user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'" class="px-2 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                      {{ user.status === 'active' ? 'Actif' : 'Inactif' }}
                    </span>
                  </td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ user.joined }}</td>
                  <td class="p-3 md:p-4">
                    <div class="flex gap-2">
                      <button @click="editUser(user)" class="text-blue-600 hover:text-blue-800 transition"><i class="fas fa-edit text-sm"></i></button>
                      <button @click="toggleUserStatus(user)" class="text-yellow-600 hover:text-yellow-800 transition"><i :class="user.status === 'active' ? 'fas fa-ban' : 'fas fa-check-circle'" class="text-sm"></i></button>
                      <button @click="deleteUser(user)" class="text-red-600 hover:text-red-800 transition"><i class="fas fa-trash text-sm"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="6" class="text-center py-8 text-slate-500">Aucun utilisateur trouvé</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- ==================== GESTION ADMINISTRATEURS ==================== -->
        <div v-if="activeMenu === 'admins'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
                <button @click="openAdminModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
              <i class="fas fa-plus mr-1"></i> Ajouter un admin
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="admin in admins" :key="admin.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-center">
                <div class="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                  {{ admin.name.charAt(0) }}
                </div>
                <h3 class="text-white font-bold mt-2 text-base md:text-lg">{{ admin.name }}</h3>
                <p class="text-indigo-200 text-xs md:text-sm">{{ admin.role }}</p>
              </div>
              <div class="p-4 md:p-5">
                <div class="space-y-2 text-sm">
                  <p class="text-slate-600"><i class="fas fa-envelope text-primary w-5"></i> {{ admin.email }}</p>
                  <p class="text-slate-600"><i class="fas fa-phone text-primary w-5"></i> {{ admin.phone }}</p>
                  <p class="text-slate-600"><i class="fas fa-calendar text-primary w-5"></i> Créé le {{ admin.createdAt }}</p>
                </div>
                <div class="flex gap-2 mt-4">
                  <button @click="editAdmin(admin)" class="flex-1 py-2 border border-primary text-primary rounded-lg text-xs md:text-sm font-bold hover:bg-primary/10 transition">
                    <i class="fas fa-edit mr-1"></i> Modifier
                  </button>
                  <button @click="deleteAdmin(admin)" class="flex-1 py-2 border border-red-500 text-red-500 rounded-lg text-xs md:text-sm font-bold hover:bg-red-50 transition">
                    <i class="fas fa-trash mr-1"></i> Supprimer
                  </button>
                </div>
              </div>
            </div>
            <div v-if="admins.length === 0" class="col-span-full text-center py-12 text-slate-500">
              <i class="fas fa-user-shield text-5xl mb-3 text-slate-300"></i>
              <p>Aucun administrateur trouvé</p>
            </div>
          </div>
        </div>
        
        <!-- ==================== GESTION FORMATEURS ==================== -->
        <div v-if="activeMenu === 'formateurs'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <button @click="openFormateurModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
              <i class="fas fa-plus mr-1"></i> Ajouter un formateur
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="formateur in formateurs" :key="formateur.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div class="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-center">
                <div class="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                  {{ formateur.name.charAt(0) }}
                </div>
                <h3 class="text-white font-bold mt-2 text-base md:text-lg">{{ formateur.name }}</h3>
                <p class="text-emerald-200 text-xs md:text-sm">{{ formateur.specialite }}</p>
              </div>
              <div class="p-4 md:p-5">
                <div class="space-y-2 text-sm">
                  <p class="text-slate-600"><i class="fas fa-envelope text-primary w-5"></i> {{ formateur.email }}</p>
                  <p class="text-slate-600"><i class="fas fa-phone text-primary w-5"></i> {{ formateur.phone }}</p>
                  <p class="text-slate-600"><i class="fas fa-book text-primary w-5"></i> {{ formateur.coursCount }} cours</p>
                  <p class="text-slate-600"><i class="fas fa-calendar text-primary w-5"></i> Ajouté le {{ formateur.createdAt }}</p>
                </div>
                <div class="flex gap-2 mt-4">
                  <button @click="editFormateur(formateur)" class="flex-1 py-2 border border-primary text-primary rounded-lg text-xs md:text-sm font-bold hover:bg-primary/10 transition">
                    <i class="fas fa-edit mr-1"></i> Modifier
                  </button>
                  <button @click="deleteFormateur(formateur)" class="flex-1 py-2 border border-red-500 text-red-500 rounded-lg text-xs md:text-sm font-bold hover:bg-red-50 transition">
                    <i class="fas fa-trash mr-1"></i> Supprimer
                  </button>
                </div>
              </div>
            </div>
            <div v-if="formateurs.length === 0" class="col-span-full text-center py-12 text-slate-500">
              <i class="fas fa-chalkboard-user text-5xl mb-3 text-slate-300"></i>
              <p>Aucun formateur trouvé</p>
            </div>
          </div>
        </div>
        
        <!-- ==================== GESTION FORMATIONS ==================== -->
        <div v-if="activeMenu === 'courses'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <button @click="openCourseModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
              <i class="fas fa-plus mr-1"></i> Ajouter une formation
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="course in courses" :key="course.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div class="relative h-40 md:h-48 overflow-hidden">
                <img :src="course.image" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" :alt="course.title">
                <div class="absolute top-2 right-2">
                  <span :class="course.status === 'published' ? 'bg-emerald-500' : 'bg-yellow-500'" class="text-white text-[8px] md:text-[10px] px-2 py-0.5 md:py-1 rounded-full font-bold">
                    {{ course.status === 'published' ? 'Publié' : 'Brouillon' }}
                  </span>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p class="text-white text-xs md:text-sm font-bold">{{ formatPrice(course.price) }} FCFA</p>
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-bold text-base md:text-lg text-slate-950">{{ course.title }}</h3>
                <p class="text-xs md:text-sm text-slate-500 mt-1">{{ course.category }} • {{ course.level }}</p>
                <p class="text-xs md:text-sm text-slate-600 mt-2 line-clamp-2">{{ course.description }}</p>
                <div class="flex justify-between items-center mt-3">
                  <p class="text-xs md:text-sm text-slate-500"><i class="fas fa-users mr-1"></i> {{ course.enrolled }} inscrits</p>
                  <div class="flex gap-2">
                    <button @click="editCourse(course)" class="text-blue-600 hover:text-blue-800 transition"><i class="fas fa-edit"></i></button>
                    <button @click="toggleCourseStatus(course)" class="text-yellow-600 hover:text-yellow-800 transition"><i :class="course.status === 'published' ? 'fas fa-eye-slash' : 'fas fa-eye'"></i></button>
                    <button @click="deleteCourse(course)" class="text-red-600 hover:text-red-800 transition"><i class="fas fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="courses.length === 0" class="col-span-full text-center py-12 text-slate-500">
              <i class="fas fa-book text-5xl mb-3 text-slate-300"></i>
              <p>Aucune formation trouvée</p>
            </div>
          </div>
        </div>
        
        <!-- ==================== GESTION CONCOURS ==================== -->
        <div v-if="activeMenu === 'contests'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <button @click="openContestModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
              <i class="fas fa-plus mr-1"></i> Ajouter un concours
            </button>
          </div>
          
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
            <table class="w-full min-w-[600px]">
              <thead class="bg-slate-50 border-b border-slate-100">
                <tr class="text-left">
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Concours</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Catégorie</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Date</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Inscrits</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Statut</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="contest in contests" :key="contest.id" class="hover:bg-blue-50/30 transition">
                  <td class="p-3 md:p-4 font-medium text-sm md:text-base text-slate-800">{{ contest.name }}</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ contest.category }}</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ contest.date }}</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ contest.registered }}</td>
                  <td class="p-3 md:p-4">
                    <span :class="contest.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                      {{ contest.status === 'open' ? 'Ouvert' : 'Fermé' }}
                    </span>
                  </td>
                  <td class="p-3 md:p-4">
                    <div class="flex gap-2">
                      <button @click="editContest(contest)" class="text-blue-600 hover:text-blue-800 transition"><i class="fas fa-edit"></i></button>
                      <button @click="toggleContestStatus(contest)" class="text-yellow-600 hover:text-yellow-800 transition"><i class="fas fa-toggle-on"></i></button>
                      <button @click="deleteContest(contest)" class="text-red-600 hover:text-red-800 transition"><i class="fas fa-trash"></i></button>
                    </div>
                   </td>
                 </tr>
                <tr v-if="contests.length === 0">
                  <td colspan="6" class="text-center py-8 text-slate-500">Aucun concours trouvé</td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- ==================== GESTION EXAMENS ==================== -->
        <div v-if="activeMenu === 'exams'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <button @click="openExamModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
              <i class="fas fa-plus mr-1"></i> Ajouter un examen
            </button>
          </div>
          
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
            <table class="w-full min-w-[800px]">
              <thead class="bg-slate-50 border-b border-slate-100">
                <tr class="text-left">
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Titre</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Matière</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Durée</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Questions</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Niveau</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                 </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="exam in exams" :key="exam.id" class="hover:bg-blue-50/30 transition">
                  <td class="p-3 md:p-4 font-medium text-sm md:text-base text-slate-800">{{ exam.title }}</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ exam.subject }}</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ exam.duration }} min</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ exam.questionsCount }}</td>
                  <td class="p-3 md:p-4">
                    <span :class="exam.level === 'Débutant' ? 'bg-green-100 text-green-700' : exam.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'" class="px-2 py-1 rounded-full text-[10px] md:text-[11px] font-bold">
                      {{ exam.level }}
                    </span>
                   </td>
                  <td class="p-3 md:p-4">
                    <div class="flex gap-2">
                      <button @click="editExam(exam)" class="text-blue-600 hover:text-blue-800 transition"><i class="fas fa-edit"></i></button>
                      <button @click="viewExamQuestions(exam)" class="text-green-600 hover:text-green-800 transition"><i class="fas fa-list"></i></button>
                      <button @click="deleteExam(exam)" class="text-red-600 hover:text-red-800 transition"><i class="fas fa-trash"></i></button>
                    </div>
                   </td>
                 </tr>
                <tr v-if="exams.length === 0">
                  <td colspan="6" class="text-center py-8 text-slate-500">Aucun examen trouvé</td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- ==================== GESTION PAIEMENTS ==================== -->
        <div v-if="activeMenu === 'payments'" class="p-3 md:p-8">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-chart-line text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+23%</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Total des revenus</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ formatPrice(totalRevenue) }} FCFA</h3>
            </div>
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-credit-card text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ payments.length }}</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Transactions</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ payments.length }}</h3>
            </div>
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-percent text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+5%</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Taux de conversion</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">68%</h3>
            </div>
          </div>
          
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
            <div class="p-3 md:p-6 border-b border-slate-50">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-950">Historique des transactions</h3>
            </div>
            <table class="w-full min-w-[600px]">
              <thead class="bg-slate-50 border-b border-slate-100">
                <tr class="text-left">
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">ID</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Client</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Formation</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Montant</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Date</th>
                  <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">Statut</th>
                 </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="payment in payments" :key="payment.id" class="hover:bg-blue-50/30 transition">
                  <td class="p-3 md:p-4 text-sm text-slate-600">#{{ payment.id }}</td>
                  <td class="p-3 md:p-4 text-sm text-slate-800 font-medium">{{ payment.client }}</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ payment.course }}</td>
                  <td class="p-3 md:p-4 text-sm font-bold text-primary">{{ formatPrice(payment.amount) }} FCFA</td>
                  <td class="p-3 md:p-4 text-sm text-slate-600">{{ payment.date }}</td>
                  <td class="p-3 md:p-4"><span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] md:text-[11px] font-bold">Payé</span></td>
                 </tr>
                <tr v-if="payments.length === 0">
                  <td colspan="6" class="text-center py-8 text-slate-500">Aucune transaction trouvée</td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- ==================== STATISTIQUES ==================== -->
        <div v-if="activeMenu === 'statistics'" class="p-3 md:p-8">
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8">
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4">Utilisateurs par mois</h3>
              <canvas ref="monthlyUsersChartCanvas" height="200" class="w-full"></canvas>
            </div>
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4">Revenus par mois</h3>
              <canvas ref="monthlyRevenueChartCanvas" height="200" class="w-full"></canvas>
            </div>
          </div>
          
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
            <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4">Top formations populaires</h3>
            <div class="space-y-4">
              <div v-for="course in courses.slice(0, 5)" :key="course.id" class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg overflow-hidden">
                  <img :src="course.image" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                  <p class="font-bold text-slate-800">{{ course.title }}</p>
                  <p class="text-xs text-slate-500">{{ course.enrolled }} inscrits</p>
                </div>
                <div class="w-32 bg-slate-100 rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full" :style="{ width: (course.enrolled / 500 * 100) + '%' }"></div>
                </div>
                <span class="text-sm font-bold text-primary">{{ Math.round(course.enrolled / 500 * 100) }}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ==================== RAPPORTS ==================== -->
        <div v-if="activeMenu === 'reports'" class="p-3 md:p-8">          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i class="fas fa-users text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-950">Rapport utilisateurs</h3>
                  <p class="text-xs text-slate-500">Exportez la liste des utilisateurs</p>
                </div>
              </div>
              <button @click="exportReport('users')" class="w-full py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition">
                <i class="fas fa-download mr-2"></i> Télécharger (Excel)
              </button>
            </div>
            
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <i class="fas fa-chart-line text-green-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-950">Rapport financier</h3>
                  <p class="text-xs text-slate-500">Exportez les transactions</p>
                </div>
              </div>
              <button @click="exportReport('payments')" class="w-full py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition">
                <i class="fas fa-download mr-2"></i> Télécharger (Excel)
              </button>
            </div>
            
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i class="fas fa-trophy text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-950">Rapport concours</h3>
                  <p class="text-xs text-slate-500">Statistiques des concours</p>
                </div>
              </div>
              <button @click="exportReport('contests')" class="w-full py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition">
                <i class="fas fa-download mr-2"></i> Télécharger (Excel)
              </button>
            </div>
            
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-6">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <i class="fas fa-graduation-cap text-orange-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-slate-950">Rapport formations</h3>
                  <p class="text-xs text-slate-500">Performances des formations</p>
                </div>
              </div>
              <button @click="exportReport('courses')" class="w-full py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition">
                <i class="fas fa-download mr-2"></i> Télécharger (Excel)
              </button>
            </div>
          </div>
        </div>
        
        <!-- ==================== PARAMÈTRES ==================== -->
        <div v-if="activeMenu === 'settings'" class="p-3 md:p-8">          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4 md:mb-6"><i class="fas fa-info-circle mr-2 text-primary"></i> Informations générales</h3>
              <div class="space-y-4">
                <div>
                  <label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nom du site</label>
                  <input type="text" v-model="settings.siteName" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
                </div>
                <div>
                  <label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email de contact</label>
                  <input type="email" v-model="settings.contactEmail" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
                </div>
                <div>
                  <label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Téléphone</label>
                  <input type="tel" v-model="settings.phone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
                </div>
                <button @click="saveSettings" class="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition">
                  <i class="fas fa-save mr-2"></i> Enregistrer les paramètres
                </button>
              </div>
            </div>
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4 md:mb-6"><i class="fas fa-cog mr-2 text-primary"></i> Configuration</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                  <div>
                    <p class="font-bold text-sm text-slate-950">Mode maintenance</p>
                    <p class="text-xs text-slate-500">Désactiver l'accès aux utilisateurs</p>
                  </div>
                  <button @click="settings.maintenanceMode = !settings.maintenanceMode" :class="settings.maintenanceMode ? 'bg-red-500' : 'bg-green-500'" class="w-12 h-6 rounded-full transition-colors shadow-inner">
                    <div class="w-5 h-5 bg-white rounded-full transition-transform shadow-md" :class="settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'"></div>
                  </button>
                </div>
                <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                  <div>
                    <p class="font-bold text-sm text-slate-950">Inscription ouverte</p>
                    <p class="text-xs text-slate-500">Permettre les nouvelles inscriptions</p>
                  </div>
                  <button @click="settings.registrationOpen = !settings.registrationOpen" :class="settings.registrationOpen ? 'bg-green-500' : 'bg-red-500'" class="w-12 h-6 rounded-full transition-colors shadow-inner">
                    <div class="w-5 h-5 bg-white rounded-full transition-transform shadow-md" :class="settings.registrationOpen ? 'translate-x-6' : 'translate-x-1'"></div>
                  </button>
                </div>
                <div>
                  <label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Devise</label>
                  <select v-model="settings.currency" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
                    <option value="FCFA">FCFA</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <!-- MODAL NOTIFICATIONS -->
    <div v-if="notificationsOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="notificationsOpen = false">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-bell text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">Notifications</h2>
          </div>
          <button @click="notificationsOpen = false" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="max-h-96 overflow-y-auto custom-scrollbar">
          <div v-for="notif in notifications" :key="notif.id" class="p-4 border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">
            <div class="flex gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-100 to-cyan-100 flex items-center justify-center"><i class="fas fa-bell text-primary text-lg"></i></div>
              <div class="flex-1">
                <p class="font-bold text-sm text-slate-950">{{ notif.title }}</p>
                <p class="text-xs text-slate-500 mt-1">{{ notif.message }}</p>
                <p class="text-[10px] text-slate-400 mt-1"><i class="far fa-clock mr-1"></i> {{ notif.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODAL UTILISATEUR (Élève) -->
    <div v-if="userModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeUserModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-user-plus text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">{{ editingUser ? 'Modifier' : 'Ajouter' }} un élève</h2>
          </div>
          <button @click="closeUserModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <input type="text" v-model="userForm.name" placeholder="Nom complet" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="email" v-model="userForm.email" placeholder="Email" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="tel" v-model="userForm.phone" placeholder="Téléphone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="password" v-model="userForm.password" placeholder="Mot de passe" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <select v-model="userForm.status" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
          <div class="flex gap-3 pt-4">
            <button @click="saveUser" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> Enregistrer</button>
            <button @click="closeUserModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODAL ADMINISTRATEUR -->
    <div v-if="adminModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeAdminModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-user-shield text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">{{ editingAdmin ? 'Modifier' : 'Ajouter' }} un administrateur</h2>
          </div>
          <button @click="closeAdminModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <input type="text" v-model="adminForm.name" placeholder="Nom complet" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="email" v-model="adminForm.email" placeholder="Email" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="tel" v-model="adminForm.phone" placeholder="Téléphone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="password" v-model="adminForm.password" placeholder="Mot de passe" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <select v-model="adminForm.role" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
            <option value="Super Admin">Super Admin</option>
            <option value="Admin Contenu">Admin Contenu</option>
            <option value="Admin Finances">Admin Finances</option>
            <option value="Support">Support</option>
          </select>
          <div class="flex gap-3 pt-4">
            <button @click="saveAdmin" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> Enregistrer</button>
            <button @click="closeAdminModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODAL FORMATEUR -->
    <div v-if="formateurModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeFormateurModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-chalkboard-user text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">{{ editingFormateur ? 'Modifier' : 'Ajouter' }} un formateur</h2>
          </div>
          <button @click="closeFormateurModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <input type="text" v-model="formateurForm.name" placeholder="Nom complet" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="email" v-model="formateurForm.email" placeholder="Email" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="tel" v-model="formateurForm.phone" placeholder="Téléphone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="password" v-model="formateurForm.password" placeholder="Mot de passe" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="text" v-model="formateurForm.specialite" placeholder="Spécialité (ex: Mathématiques, Français...)" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <div class="flex gap-3 pt-4">
            <button @click="saveFormateur" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> Enregistrer</button>
            <button @click="closeFormateurModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODAL FORMATION -->
    <div v-if="courseModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeCourseModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50 sticky top-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-book text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">{{ editingCourse ? 'Modifier' : 'Ajouter' }} une formation</h2>
          </div>
          <button @click="closeCourseModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <input type="text" v-model="courseForm.title" placeholder="Titre de la formation" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <textarea v-model="courseForm.description" placeholder="Description" rows="3" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></textarea>
          <div class="grid grid-cols-2 gap-3">
            <select v-model="courseForm.category" class="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              <option value="">Catégorie</option>
              <option value="Data Science">Data Science</option>
              <option value="Développement Web">Développement Web</option>
              <option value="Marketing Digital">Marketing Digital</option>
              <option value="Design">Design</option>
              <option value="Langues">Langues</option>
            </select>
            <select v-model="courseForm.level" class="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              <option value="">Niveau</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <input type="number" v-model="courseForm.price" placeholder="Prix (FCFA)" class="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
            <input type="text" v-model="courseForm.duration" placeholder="Durée (ex: 40h)" class="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          </div>
          <input type="text" v-model="courseForm.image" placeholder="URL de l'image" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <select v-model="courseForm.formateurId" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
            <option value="">Sélectionner un formateur</option>
            <option v-for="f in formateurs" :key="f.id" :value="f.id">{{ f.name }} - {{ f.specialite }}</option>
          </select>
          <div class="flex gap-3 pt-4">
            <button @click="saveCourse" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> Enregistrer</button>
            <button @click="closeCourseModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODAL CONCOURS -->
    <div v-if="contestModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeContestModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-trophy text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">{{ editingContest ? 'Modifier' : 'Ajouter' }} un concours</h2>
          </div>
          <button @click="closeContestModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <input type="text" v-model="contestForm.name" placeholder="Nom du concours" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="text" v-model="contestForm.category" placeholder="Catégorie" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="date" v-model="contestForm.date" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <select v-model="contestForm.status" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
            <option value="open">Ouvert</option>
            <option value="closed">Fermé</option>
          </select>
          <div class="flex gap-3 pt-4">
            <button @click="saveContest" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> Enregistrer</button>
            <button @click="closeContestModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODAL EXAMEN -->
    <div v-if="examModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeExamModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50 sticky top-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-file-alt text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">{{ editingExam ? 'Modifier' : 'Ajouter' }} un examen</h2>
          </div>
          <button @click="closeExamModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <input type="text" v-model="examForm.title" placeholder="Titre de l'examen" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <input type="text" v-model="examForm.subject" placeholder="Matière" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          <div class="grid grid-cols-2 gap-3">
            <input type="number" v-model="examForm.duration" placeholder="Durée (minutes)" class="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
            <input type="number" v-model="examForm.questionsCount" placeholder="Nombre de questions" class="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
          </div>
          <select v-model="examForm.level" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
          </select>
          <div class="border-t pt-4 mt-2">
            <p class="text-xs font-bold text-slate-400 mb-2">Questions de l'examen</p>
            <div v-for="(q, index) in examForm.questions" :key="index" class="bg-slate-50 rounded-xl p-3 mb-3">
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-primary">Question {{ index + 1 }}</span>
                <button @click="removeQuestion(index)" class="text-red-500 text-xs"><i class="fas fa-trash"></i></button>
              </div>
              <input type="text" v-model="q.text" placeholder="Question" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm mb-2">
              <div class="grid grid-cols-1 gap-1">
                <div v-for="(opt, optIndex) in q.options" :key="optIndex" class="flex items-center gap-2">
                  <input type="radio" :name="'correct_' + index" :value="optIndex" v-model="q.correct" class="w-4 h-4">
                  <input type="text" v-model="q.options[optIndex]" placeholder="Option {{ String.fromCharCode(65 + optIndex) }}" class="flex-1 px-3 py-1 rounded-lg border border-slate-200 text-sm">
                </div>
              </div>
            </div>
            <button @click="addQuestion" class="w-full py-2 border border-dashed border-primary text-primary rounded-xl text-sm font-bold hover:bg-primary/10 transition">
              <i class="fas fa-plus mr-1"></i> Ajouter une question
            </button>
          </div>
          <div class="flex gap-3 pt-4">
            <button @click="saveExam" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> Enregistrer</button>
            <button @click="closeExamModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODAL QUESTIONS EXAMEN -->
    <div v-if="examQuestionsModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeExamQuestionsModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50 sticky top-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-list text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">Questions - {{ selectedExam?.title }}</h2>
          </div>
          <button @click="closeExamQuestionsModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5">
          <div v-for="(q, index) in selectedExam?.questions" :key="index" class="bg-slate-50 rounded-xl p-4 mb-4">
            <p class="font-bold text-slate-800 mb-2">{{ index + 1 }}. {{ q.text }}</p>
            <div class="space-y-1 ml-4">
              <div v-for="(opt, optIndex) in q.options" :key="optIndex" class="flex items-center gap-2">
                <i :class="optIndex === q.correct ? 'fas fa-check-circle text-green-500' : 'far fa-circle text-slate-400'" class="text-sm"></i>
                <span :class="optIndex === q.correct ? 'text-green-700 font-medium' : 'text-slate-600'">{{ String.fromCharCode(65 + optIndex) }}. {{ opt }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';

const router = useRouter();

// Thème
const isDarkMode = ref(false);
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// États
const activeMenu = ref('dashboard');
const sidebarOpen = ref(false);
const notificationsOpen = ref(false);

// Données principales
const users = ref([
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com', phone: '612345678', status: 'active', joined: '2025-01-15', password: 'password123' },
  { id: 2, name: 'Marie Claire', email: 'marie@example.com', phone: '698765432', status: 'active', joined: '2025-01-20', password: 'password123' },
  { id: 3, name: 'Paul Mbarga', email: 'paul@example.com', phone: '677889900', status: 'inactive', joined: '2025-02-01', password: 'password123' }
]);

const admins = ref([
  { id: 1, name: 'Admin Principal', email: 'admin@gradusaura.com', phone: '600000000', role: 'Super Admin', createdAt: '2025-01-01', password: 'admin123' },
  { id: 2, name: 'Admin Content', email: 'content@gradusaura.com', phone: '600000001', role: 'Admin Contenu', createdAt: '2025-02-15', password: 'admin123' }
]);

const formateurs = ref([
  { id: 1, name: 'Prof. Jean Martin', email: 'jean.martin@gradusaura.com', phone: '612345679', specialite: 'Data Science', coursCount: 3, createdAt: '2025-01-10', password: 'formateur123' },
  { id: 2, name: 'Dr. Marie Laure', email: 'marie.laure@gradusaura.com', phone: '698765433', specialite: 'Développement Web', coursCount: 2, createdAt: '2025-01-15', password: 'formateur123' }
]);

const courses = ref([
  { id: 1, title: 'Data Science Masterclass', category: 'Data Science', level: 'Intermédiaire', description: 'Formation complète en Data Science', price: 150000, enrolled: 234, image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=200&h=150&fit=crop', status: 'published', formateurId: 1, duration: '40h' },
  { id: 2, title: 'Développement Web Full Stack', category: 'Développement', level: 'Débutant', description: 'Devenez développeur Full Stack', price: 200000, enrolled: 189, image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?w=200&h=150&fit=crop', status: 'published', formateurId: 2, duration: '60h' }
]);

const contests = ref([
  { id: 1, name: 'ENAM 2025', category: 'Administratif', date: '2025-06-15', registered: 234, status: 'open' },
  { id: 2, name: 'ENS 2025', category: 'Enseignement', date: '2025-07-01', registered: 189, status: 'open' }
]);

const exams = ref([
  { id: 1, title: 'Test blanc Mathématiques', subject: 'Mathématiques', duration: 60, questionsCount: 20, level: 'Intermédiaire', questions: [
    { text: 'Quelle est la dérivée de x² ?', options: ['2x', 'x', 'x²', '2'], correct: 0 },
    { text: 'Résoudre : 2x + 5 = 13', options: ['x = 4', 'x = 3', 'x = 5', 'x = 6'], correct: 0 }
  ] },
  { id: 2, title: 'Test Culture Générale', subject: 'Culture Générale', duration: 45, questionsCount: 30, level: 'Débutant', questions: [] }
]);

const payments = ref([
  { id: 'TRX001', client: 'Jean Dupont', course: 'Data Science', amount: 150000, date: '2025-03-15', status: 'completed' },
  { id: 'TRX002', client: 'Marie Claire', course: 'Dev Web', amount: 200000, date: '2025-03-14', status: 'completed' },
  { id: 'TRX003', client: 'Paul Mbarga', course: 'Marketing Digital', amount: 120000, date: '2025-03-13', status: 'completed' }
]);

// Notifications
const unreadCount = ref(3);
const notifications = ref([
  { id: 1, title: 'Nouvel utilisateur', message: 'Jean Dupont vient de s\'inscrire', time: 'Il y a 5 min' },
  { id: 2, title: 'Nouvelle formation', message: 'Data Science Masterclass a été ajoutée', time: 'Il y a 1 heure' },
  { id: 3, title: 'Paiement reçu', message: 'Paiement de 150 000 FCFA', time: 'Il y a 3 heures' }
]);

// Activités récentes
const recentActivities = ref([
  { id: 1, type: 'user', icon: 'fas fa-user-plus', message: 'Nouvel élève inscrit: Jean Dupont', time: 'Il y a 5 minutes' },
  { id: 2, type: 'course', icon: 'fas fa-book', message: 'Nouvelle formation: Data Science Masterclass', time: 'Il y a 1 heure' },
  { id: 3, type: 'payment', icon: 'fas fa-credit-card', message: 'Paiement de 150 000 FCFA reçu', time: 'Il y a 3 heures' },
  { id: 4, type: 'user', icon: 'fas fa-chalkboard-user', message: 'Nouveau formateur: Prof. Jean Martin', time: 'Il y a 1 jour' }
]);

// Filtres utilisateurs
const userFilters = ref({ status: 'all', search: '' });

const filteredUsers = computed(() => {
  let result = users.value;
  if (userFilters.value.status !== 'all') {
    result = result.filter(u => u.status === userFilters.value.status);
  }
  if (userFilters.value.search) {
    result = result.filter(u => u.name.toLowerCase().includes(userFilters.value.search.toLowerCase()) || u.email.toLowerCase().includes(userFilters.value.search.toLowerCase()));
  }
  return result;
});

const totalRevenue = computed(() => {
  return payments.value.reduce((sum, p) => sum + p.amount, 0);
});

const activeMenuTitle = computed(() => {
  const titles = {
    dashboard: 'Tableau de bord',
    users: 'Gestion des utilisateurs (Élèves)',
    admins: 'Gestion des administrateurs',
    formateurs: 'Gestion des formateurs',
    courses: 'Gestion des formations',
    contests: 'Gestion des concours',
    exams: 'Gestion des examens',
    payments: 'Gestion des paiements',
    statistics: 'Statistiques détaillées',
    reports: 'Rapports',
    settings: 'Paramètres généraux'
  };
  return titles[activeMenu.value] || 'SuperAdmin Panel';
});

// Paramètres
const settings = ref({
  siteName: 'Gradus Aura',
  contactEmail: 'contact@gradusaura.com',
  phone: '+237 600 000 000',
  maintenanceMode: false,
  registrationOpen: true,
  currency: 'FCFA'
});

// Modals states
const userModalOpen = ref(false);
const adminModalOpen = ref(false);
const formateurModalOpen = ref(false);
const courseModalOpen = ref(false);
const contestModalOpen = ref(false);
const examModalOpen = ref(false);
const examQuestionsModalOpen = ref(false);

// Edit states
const editingUser = ref(null);
const editingAdmin = ref(null);
const editingFormateur = ref(null);
const editingCourse = ref(null);
const editingContest = ref(null);
const editingExam = ref(null);
const selectedExam = ref(null);

// Forms
const userForm = ref({ name: '', email: '', phone: '', password: '', status: 'active' });
const adminForm = ref({ name: '', email: '', phone: '', password: '', role: 'Admin Contenu' });
const formateurForm = ref({ name: '', email: '', phone: '', password: '', specialite: '' });
const courseForm = ref({ title: '', description: '', category: '', level: '', price: '', duration: '', image: '', formateurId: '', status: 'draft' });
const contestForm = ref({ name: '', category: '', date: '', status: 'open' });
const examForm = ref({ title: '', subject: '', duration: 60, questionsCount: 0, level: 'Intermédiaire', questions: [] });

// Chart refs
const inscriptionsChartCanvas = ref(null);
const repartitionChartCanvas = ref(null);
const monthlyUsersChartCanvas = ref(null);
const monthlyRevenueChartCanvas = ref(null);
let inscriptionsChart = null;
let repartitionChart = null;
let monthlyUsersChart = null;
let monthlyRevenueChart = null;

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// ==================== USER FUNCTIONS ====================
const openUserModal = () => {
  editingUser.value = null;
  userForm.value = { name: '', email: '', phone: '', password: '', status: 'active' };
  userModalOpen.value = true;
};

const editUser = (user) => {
  editingUser.value = user;
  userForm.value = { ...user };
  userModalOpen.value = true;
};

const saveUser = () => {
  if (editingUser.value) {
    const index = users.value.findIndex(u => u.id === editingUser.value.id);
    users.value[index] = { ...userForm.value, id: editingUser.value.id, joined: editingUser.value.joined };
    addActivity('user', `Utilisateur modifié: ${userForm.value.name}`);
  } else {
    const newUser = { 
      ...userForm.value, 
      id: Date.now(), 
      joined: new Date().toISOString().split('T')[0]
    };
    users.value.unshift(newUser);
    addActivity('user', `Nouvel élève inscrit: ${userForm.value.name}`);
  }
  closeUserModal();
};

const toggleUserStatus = (user) => {
  user.status = user.status === 'active' ? 'inactive' : 'active';
  addActivity('user', `Statut de l'élève ${user.name} modifié en ${user.status === 'active' ? 'actif' : 'inactif'}`);
};

const deleteUser = (user) => {
  if (confirm(`Supprimer l'utilisateur "${user.name}" ?`)) {
    users.value = users.value.filter(u => u.id !== user.id);
    addActivity('user', `Utilisateur supprimé: ${user.name}`);
  }
};

const closeUserModal = () => {
  userModalOpen.value = false;
  editingUser.value = null;
};

// ==================== ADMIN FUNCTIONS ====================
const openAdminModal = () => {
  editingAdmin.value = null;
  adminForm.value = { name: '', email: '', phone: '', password: '', role: 'Admin Contenu' };
  adminModalOpen.value = true;
};

const editAdmin = (admin) => {
  editingAdmin.value = admin;
  adminForm.value = { ...admin };
  adminModalOpen.value = true;
};

const saveAdmin = () => {
  if (editingAdmin.value) {
    const index = admins.value.findIndex(a => a.id === editingAdmin.value.id);
    admins.value[index] = { ...adminForm.value, id: editingAdmin.value.id, createdAt: editingAdmin.value.createdAt };
    addActivity('admin', `Administrateur modifié: ${adminForm.value.name}`);
  } else {
    const newAdmin = { 
      ...adminForm.value, 
      id: Date.now(), 
      createdAt: new Date().toISOString().split('T')[0]
    };
    admins.value.unshift(newAdmin);
    addActivity('admin', `Nouvel administrateur ajouté: ${adminForm.value.name}`);
  }
  closeAdminModal();
};

const deleteAdmin = (admin) => {
  if (confirm(`Supprimer l'administrateur "${admin.name}" ?`)) {
    admins.value = admins.value.filter(a => a.id !== admin.id);
    addActivity('admin', `Administrateur supprimé: ${admin.name}`);
  }
};

const closeAdminModal = () => {
  adminModalOpen.value = false;
  editingAdmin.value = null;
};

// ==================== FORMATEUR FUNCTIONS ====================
const openFormateurModal = () => {
  editingFormateur.value = null;
  formateurForm.value = { name: '', email: '', phone: '', password: '', specialite: '' };
  formateurModalOpen.value = true;
};

const editFormateur = (formateur) => {
  editingFormateur.value = formateur;
  formateurForm.value = { ...formateur };
  formateurModalOpen.value = true;
};

const saveFormateur = () => {
  if (editingFormateur.value) {
    const index = formateurs.value.findIndex(f => f.id === editingFormateur.value.id);
    formateurs.value[index] = { ...formateurForm.value, id: editingFormateur.value.id, coursCount: editingFormateur.value.coursCount, createdAt: editingFormateur.value.createdAt };
    addActivity('formateur', `Formateur modifié: ${formateurForm.value.name}`);
  } else {
    const newFormateur = { 
      ...formateurForm.value, 
      id: Date.now(), 
      coursCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    formateurs.value.unshift(newFormateur);
    addActivity('formateur', `Nouveau formateur ajouté: ${formateurForm.value.name} - Spécialité: ${formateurForm.value.specialite}`);
  }
  closeFormateurModal();
};

const deleteFormateur = (formateur) => {
  if (confirm(`Supprimer le formateur "${formateur.name}" ?`)) {
    formateurs.value = formateurs.value.filter(f => f.id !== formateur.id);
    addActivity('formateur', `Formateur supprimé: ${formateur.name}`);
  }
};

const closeFormateurModal = () => {
  formateurModalOpen.value = false;
  editingFormateur.value = null;
};

// ==================== COURSE FUNCTIONS ====================
const openCourseModal = () => {
  editingCourse.value = null;
  courseForm.value = { title: '', description: '', category: '', level: '', price: '', duration: '', image: '', formateurId: '', status: 'draft' };
  courseModalOpen.value = true;
};

const editCourse = (course) => {
  editingCourse.value = course;
  courseForm.value = { ...course };
  courseModalOpen.value = true;
};

const saveCourse = () => {
  if (editingCourse.value) {
    const index = courses.value.findIndex(c => c.id === editingCourse.value.id);
    courses.value[index] = { ...courseForm.value, id: editingCourse.value.id, enrolled: editingCourse.value.enrolled };
    addActivity('course', `Formation modifiée: ${courseForm.value.title}`);
  } else {
    const newCourse = { 
      ...courseForm.value, 
      id: Date.now(), 
      enrolled: 0,
      price: parseInt(courseForm.value.price),
      status: 'published'
    };
    courses.value.unshift(newCourse);
    addActivity('course', `Nouvelle formation ajoutée: ${courseForm.value.title}`);
  }
  closeCourseModal();
};

const toggleCourseStatus = (course) => {
  course.status = course.status === 'published' ? 'draft' : 'published';
  addActivity('course', `Statut de la formation ${course.title} modifié en ${course.status === 'published' ? 'publié' : 'brouillon'}`);
};

const deleteCourse = (course) => {
  if (confirm(`Supprimer la formation "${course.title}" ?`)) {
    courses.value = courses.value.filter(c => c.id !== course.id);
    addActivity('course', `Formation supprimée: ${course.title}`);
  }
};

const closeCourseModal = () => {
  courseModalOpen.value = false;
  editingCourse.value = null;
};

// ==================== CONTEST FUNCTIONS ====================
const openContestModal = () => {
  editingContest.value = null;
  contestForm.value = { name: '', category: '', date: '', status: 'open' };
  contestModalOpen.value = true;
};

const editContest = (contest) => {
  editingContest.value = contest;
  contestForm.value = { ...contest };
  contestModalOpen.value = true;
};

const saveContest = () => {
  if (editingContest.value) {
    const index = contests.value.findIndex(c => c.id === editingContest.value.id);
    contests.value[index] = { ...contestForm.value, id: editingContest.value.id, registered: editingContest.value.registered };
    addActivity('contest', `Concours modifié: ${contestForm.value.name}`);
  } else {
    const newContest = { 
      ...contestForm.value, 
      id: Date.now(), 
      registered: 0
    };
    contests.value.unshift(newContest);
    addActivity('contest', `Nouveau concours ajouté: ${contestForm.value.name}`);
  }
  closeContestModal();
};

const toggleContestStatus = (contest) => {
  contest.status = contest.status === 'open' ? 'closed' : 'open';
  addActivity('contest', `Statut du concours ${contest.name} modifié en ${contest.status === 'open' ? 'ouvert' : 'fermé'}`);
};

const deleteContest = (contest) => {
  if (confirm(`Supprimer le concours "${contest.name}" ?`)) {
    contests.value = contests.value.filter(c => c.id !== contest.id);
    addActivity('contest', `Concours supprimé: ${contest.name}`);
  }
};

const closeContestModal = () => {
  contestModalOpen.value = false;
  editingContest.value = null;
};

// ==================== EXAM FUNCTIONS ====================
const openExamModal = () => {
  editingExam.value = null;
  examForm.value = { title: '', subject: '', duration: 60, questionsCount: 0, level: 'Intermédiaire', questions: [] };
  examModalOpen.value = true;
};

const editExam = (exam) => {
  editingExam.value = exam;
  examForm.value = { ...exam, questions: exam.questions || [] };
  examModalOpen.value = true;
};

const addQuestion = () => {
  examForm.value.questions.push({
    text: '',
    options: ['', '', '', ''],
    correct: 0
  });
  examForm.value.questionsCount = examForm.value.questions.length;
};

const removeQuestion = (index) => {
  examForm.value.questions.splice(index, 1);
  examForm.value.questionsCount = examForm.value.questions.length;
};

const saveExam = () => {
  if (editingExam.value) {
    const index = exams.value.findIndex(e => e.id === editingExam.value.id);
    exams.value[index] = { ...examForm.value, id: editingExam.value.id };
    addActivity('exam', `Examen modifié: ${examForm.value.title}`);
  } else {
    const newExam = { 
      ...examForm.value, 
      id: Date.now(),
      questionsCount: examForm.value.questions.length
    };
    exams.value.unshift(newExam);
    addActivity('exam', `Nouvel examen ajouté: ${examForm.value.title}`);
  }
  closeExamModal();
};

const deleteExam = (exam) => {
  if (confirm(`Supprimer l'examen "${exam.title}" ?`)) {
    exams.value = exams.value.filter(e => e.id !== exam.id);
    addActivity('exam', `Examen supprimé: ${exam.title}`);
  }
};

const viewExamQuestions = (exam) => {
  selectedExam.value = exam;
  examQuestionsModalOpen.value = true;
};

const closeExamModal = () => {
  examModalOpen.value = false;
  editingExam.value = null;
  examForm.value = { title: '', subject: '', duration: 60, questionsCount: 0, level: 'Intermédiaire', questions: [] };
};

const closeExamQuestionsModal = () => {
  examQuestionsModalOpen.value = false;
  selectedExam.value = null;
};

// ==================== UTILS ====================
const addActivity = (type, message) => {
  const newActivity = {
    id: Date.now(),
    type: type,
    icon: type === 'user' ? 'fas fa-user-plus' : type === 'course' ? 'fas fa-book' : type === 'payment' ? 'fas fa-credit-card' : type === 'formateur' ? 'fas fa-chalkboard-user' : 'fas fa-trophy',
    message: message,
    time: 'À l\'instant'
  };
  recentActivities.value.unshift(newActivity);
  
  // Garder seulement les 20 dernières activités
  if (recentActivities.value.length > 20) {
    recentActivities.value = recentActivities.value.slice(0, 20);
  }
};

const saveSettings = () => {
  localStorage.setItem('gradus_admin_settings', JSON.stringify(settings.value));
  addActivity('settings', 'Paramètres généraux mis à jour');
  alert('Paramètres enregistrés avec succès !');
};

const exportReport = (type) => {
  let data = [];
  let filename = '';
  
  switch(type) {
    case 'users':
      data = users.value.map(u => ({ Nom: u.name, Email: u.email, Téléphone: u.phone, Statut: u.status, 'Date inscription': u.joined }));
      filename = 'rapport_utilisateurs.csv';
      break;
    case 'payments':
      data = payments.value.map(p => ({ ID: p.id, Client: p.client, Formation: p.course, Montant: p.amount, Date: p.date }));
      filename = 'rapport_paiements.csv';
      break;
    case 'contests':
      data = contests.value.map(c => ({ Nom: c.name, Catégorie: c.category, Date: c.date, Inscrits: c.registered, Statut: c.status }));
      filename = 'rapport_concours.csv';
      break;
    case 'courses':
      data = courses.value.map(c => ({ Titre: c.title, Catégorie: c.category, Niveau: c.level, Prix: c.price, Inscrits: c.enrolled }));
      filename = 'rapport_formations.csv';
      break;
  }
  
  // Créer le CSV
  const headers = Object.keys(data[0] || {});
  const csvRows = [headers.join(',')];
  for (const row of data) {
    const values = headers.map(header => JSON.stringify(row[header] || ''));
    csvRows.push(values.join(','));
  }
  
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  
  addActivity('report', `Rapport ${type} exporté`);
};

// Logout
const logout = () => {
  localStorage.removeItem('gradus_user');
  localStorage.removeItem('gradus_token');
  router.push('/login');
};

// Chart initialization
const initCharts = () => {
  if (inscriptionsChartCanvas.value) {
    if (inscriptionsChart) inscriptionsChart.destroy();
    inscriptionsChart = new Chart(inscriptionsChartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{ 
          label: 'Inscriptions', 
          data: [85, 92, 101, 112, 119, 125], 
          borderColor: '#4F46E5', 
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4, 
          fill: true,
          borderWidth: 3
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: true,
        plugins: { legend: { position: 'top' } }
      }
    });
  }
  
  if (repartitionChartCanvas.value) {
    if (repartitionChart) repartitionChart.destroy();
    repartitionChart = new Chart(repartitionChartCanvas.value, {
      type: 'doughnut',
      data: { 
        labels: ['Élèves', 'Formateurs', 'Admins'], 
        datasets: [{ 
          data: [users.value.length, formateurs.value.length, admins.value.length], 
          backgroundColor: ['#4F46E5', '#06B6D4', '#F97316'],
          borderWidth: 0
        }] 
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
  
  if (monthlyUsersChartCanvas.value) {
    if (monthlyUsersChart) monthlyUsersChart.destroy();
    monthlyUsersChart = new Chart(monthlyUsersChartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{ label: 'Nouveaux utilisateurs', data: [25, 32, 38, 45, 52, 48], backgroundColor: '#4F46E5', borderRadius: 8 }]
      },
      options: { responsive: true, maintainAspectRatio: true }
    });
  }
  
  if (monthlyRevenueChartCanvas.value) {
    if (monthlyRevenueChart) monthlyRevenueChart.destroy();
    monthlyRevenueChart = new Chart(monthlyRevenueChartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{ label: 'Revenus (FCFA)', data: [2500000, 3200000, 3800000, 4500000, 5200000, 5800000], backgroundColor: '#10B981', borderRadius: 8 }]
      },
      options: { responsive: true, maintainAspectRatio: true }
    });
  }
};

onMounted(() => {
  // Charger les paramètres sauvegardés
  const savedSettings = localStorage.getItem('gradus_admin_settings');
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings);
  }
  
  initCharts();
});
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}

.sidebar-item:hover { background: rgba(79, 70, 229, 0.1); }
.sidebar-item.active { background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.2)); border-left: 3px solid #4F46E5; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

.stat-card { transition: all 0.3s ease; }
.stat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15); }

.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }

.dark .bg-white { background-color: #1f2937; }
.dark .text-slate-950 { color: #f3f4f6; }
.dark .text-slate-500 { color: #9ca3af; }
.dark .text-slate-600 { color: #cbd5e1; }
.dark .border-slate-100 { border-color: #374151; }
.dark .border-slate-200 { border-color: #374151; }
.dark .bg-slate-50 { background-color: #1f2937; }
.dark .bg-slate-100 { background-color: #374151; }
.dark .hover\:bg-blue-50\/30:hover { background-color: rgba(59, 130, 246, 0.1); }
</style>
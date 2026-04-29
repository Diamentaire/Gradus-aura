<template>
  <div :class="['min-h-screen', isDarkMode ? 'dark' : '']">
    <div :class="['flex h-screen', isDarkMode ? 'dark' : '']">
      <!-- SIDEBAR -->
      <aside :class="['fixed md:relative z-40 w-64 h-full transition-transform duration-300 ease-in-out flex flex-col shrink-0 overflow-hidden', isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-r border-slate-200', sidebarCollapsed ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
        <button @click="sidebarCollapsed = false" class="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-50"><i class="fas fa-times text-xl"></i></button>
        <div :class="['p-4 md:p-6 border-b', isDarkMode ? 'border-gray-700' : 'border-slate-200']">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl"><i class="fas fa-crown text-white text-sm md:text-base"></i></div>
            <span :class="['font-bold text-lg md:text-xl tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">Gradus Aura</span>
          </div>
          <div :class="['grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 rounded-2xl border mt-4 md:mt-6', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
            <div class="text-center py-1 md:py-2"><i class="fas fa-users text-[8px] md:text-[10px] text-slate-400"></i><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase mt-1">Utilisateurs</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ usersList.length }}</p></div>
            <div class="text-center py-1 md:py-2 border-x border-slate-200"><i class="fas fa-chalkboard-user text-[8px] md:text-[10px] text-slate-400"></i><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase mt-1">Formateurs</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ teachersList.length }}</p></div>
            <div class="text-center py-1 md:py-2"><i class="fas fa-book text-[8px] md:text-[10px] text-slate-400"></i><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase mt-1">Cours</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ coursesList.length }}</p></div>
          </div>
        </div>
        
        <nav class="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6 custom-scrollbar">
          <div class="space-y-1">
            <p class="px-3 text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Menu principal</p>
            <div v-for="item in navItems" :key="item.id" @click="activeSection = item.id; sidebarCollapsed = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeSection === item.id ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i :class="item.icon + ' w-4 md:w-5'"></i>
              <span class="font-black uppercase tracking-widest">{{ item.label }}</span>
            </div>
          </div>
        </nav>
        
        <div :class="['p-3 md:p-4 border-t', isDarkMode ? 'border-gray-700' : 'border-slate-100']">
          <div class="flex items-center gap-2 md:gap-3 mb-3">
            <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">{{ adminInitials }}</div>
            <div class="flex-1">
              <p class="text-[10px] md:text-xs font-bold truncate" :class="isDarkMode ? 'text-white' : 'text-slate-950'">{{ adminProfile.name }}</p>
              <p class="text-[8px] md:text-[10px] truncate" :class="isDarkMode ? 'text-gray-400' : 'text-slate-500'">Super Admin</p>
            </div>
          </div>
          <button @click="toggleDarkMode" class="w-full mb-2 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition text-[10px] md:text-[12px]" :class="isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'">
            <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
            <span class="font-black uppercase tracking-widest">Mode sombre</span>
          </button>
          <button @click="logout" class="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition text-[10px] md:text-[12px]">
            <i class="fas fa-sign-out-alt"></i>
            <span class="font-black uppercase tracking-widest">Déconnexion</span>
          </button>
        </div>
      </aside>
      
      <div v-if="sidebarCollapsed" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="sidebarCollapsed = false"></div>
      
      <main :class="['flex-1 overflow-y-auto custom-scrollbar', isDarkMode ? 'bg-gray-900' : 'bg-slate-50']">
        <header :class="['sticky top-0 z-10 backdrop-blur-sm border-b px-4 md:px-8 py-3 md:py-4', isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-slate-100']">
          <div class="flex justify-between items-center">
            <div><h1 :class="['text-xl md:text-2xl font-black tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">{{ activeMenuTitle }}</h1><div class="flex items-center gap-2 md:gap-3 mt-1"><div class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></div><p class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">SUPER ADMIN</p></div></div>
            <div class="flex items-center gap-2 md:gap-4">
              <div class="relative cursor-pointer" @click="showNotifications = !showNotifications"><i class="fas fa-bell text-slate-400 text-base md:text-xl hover:text-primary transition"></i><span class="absolute -top-1 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-[6px] md:text-[8px] font-bold rounded-full flex items-center justify-center">{{ unreadCount }}</span></div>
              <div class="flex items-center gap-2 md:gap-3 ml-1 md:ml-2 cursor-pointer" @click="activeSection = 'profile'"><div class="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">{{ adminInitials }}</div></div>
            </div>
          </div>
        </header>
        
        <div class="p-3 md:p-8">
          <!-- DASHBOARD AVEC GRAPHIQUES -->
          <div v-if="activeSection === 'dashboard'" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-white rounded-2xl p-4 shadow-sm"><div class="flex justify-between"><i class="fas fa-users text-2xl text-primary"></i><span class="text-xs text-green-600">+12%</span></div><p class="text-2xl font-bold mt-2">{{ usersList.length }}</p><p class="text-sm text-slate-500">Utilisateurs</p></div>
              <div class="bg-white rounded-2xl p-4 shadow-sm"><div class="flex justify-between"><i class="fas fa-chalkboard-user text-2xl text-primary"></i><span class="text-xs text-green-600">+8%</span></div><p class="text-2xl font-bold mt-2">{{ teachersList.length }}</p><p class="text-sm text-slate-500">Formateurs</p></div>
              <div class="bg-white rounded-2xl p-4 shadow-sm"><div class="flex justify-between"><i class="fas fa-book text-2xl text-primary"></i><span class="text-xs text-green-600">+15%</span></div><p class="text-2xl font-bold mt-2">{{ coursesList.length }}</p><p class="text-sm text-slate-500">Cours</p></div>
              <div class="bg-white rounded-2xl p-4 shadow-sm"><div class="flex justify-between"><i class="fas fa-euro-sign text-2xl text-primary"></i><span class="text-xs text-green-600">+22%</span></div><p class="text-2xl font-bold mt-2">{{ formatMoney(totalRevenue) }}</p><p class="text-sm text-slate-500">Revenus</p></div>
            </div>
            
            <!-- Graphiques -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm">
                <h3 class="font-semibold mb-3"><i class="fas fa-chart-line text-primary mr-2"></i>Évolution des inscriptions</h3>
                <canvas ref="growthChartCanvas" style="height: 300px; width: 100%;"></canvas>
              </div>
              <div class="bg-white rounded-2xl p-5 shadow-sm">
                <h3 class="font-semibold mb-3"><i class="fas fa-chart-pie text-primary mr-2"></i>Répartition par rôle</h3>
                <canvas ref="pieChartCanvas" style="height: 300px; width: 100%;"></canvas>
              </div>
            </div>
            
            <!-- Activités récentes -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-3"><i class="fas fa-history text-primary mr-2"></i>Activités récentes</h3><div v-for="act in activities" :key="act.id" class="flex justify-between py-2 border-b"><span>{{ act.message }}</span><span class="text-xs text-slate-400">{{ act.time }}</span></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-3"><i class="fas fa-bell text-primary mr-2"></i>Notifications</h3><div v-for="notif in notifications" :key="notif.id" class="py-2 border-b"><p class="text-sm">{{ notif.message }}</p><p class="text-xs text-slate-400">{{ notif.time }}</p></div></div>
            </div>
          </div>

          <!-- UTILISATEURS -->
          <div v-if="activeSection === 'users'" class="space-y-6">
            <div class="flex justify-between items-center"><h2 class="text-xl font-bold"><i class="fas fa-users text-primary mr-2"></i>Gestion des utilisateurs</h2><button @click="openUserModal" class="bg-primary text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition"><i class="fas fa-plus mr-1"></i>Ajouter</button></div>
            <div class="bg-white rounded-2xl shadow-sm overflow-x-auto">
              <table class="w-full min-w-[800px]">
                <thead class="bg-slate-50"><tr class="text-left"><th class="p-3 text-left text-xs font-bold">Utilisateur</th><th class="p-3 text-left text-xs font-bold">Email</th><th class="p-3 text-left text-xs font-bold">Rôle</th><th class="p-3 text-left text-xs font-bold">Statut</th><th class="p-3 text-left text-xs font-bold">Inscription</th><th class="p-3 text-left text-xs font-bold">Actions</th></tr></thead>
                <tbody><tr v-for="user in usersList" :key="user.id" class="border-t hover:bg-slate-50"><td class="p-3"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs">{{ user.name.charAt(0) }}</div><span>{{ user.name }}</span></div></td><td class="p-3">{{ user.email }}</td><td class="p-3"><span class="px-2 py-0.5 rounded-full text-xs" :class="user.role === 'formateur' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'">{{ user.role }}</span></td><td class="p-3"><span class="px-2 py-0.5 rounded-full text-xs" :class="user.status === 'actif' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">{{ user.status }}</span></td><td class="p-3 text-sm">{{ user.date }}</td><td class="p-3"><div class="flex gap-2"><button @click="editUser(user)" class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button><button @click="deleteUser(user)" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button><button @click="toggleUserStatus(user)" class="text-yellow-600 hover:text-yellow-800"><i :class="user.status === 'actif' ? 'fas fa-ban' : 'fas fa-check-circle'"></i></button></div></td></tr></tbody>
              </table>
            </div>
          </div>

          <!-- ==================== FORMATEURS (CARTES TRÈS GRANDES) ==================== -->
<div v-if="activeSection === 'teachers'" class="space-y-6">
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold"><i class="fas fa-chalkboard-user text-primary mr-3"></i>Gestion des formateurs</h2>
    <button @click="openTeacherModal" class="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-md"><i class="fas fa-plus mr-2"></i>Ajouter</button>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
    <div v-for="teacher in teachersList" :key="teacher.id" class="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-slate-100">
      <!-- Bannière colorée avec avatar -->
      <div class="relative h-40 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
        <div class="absolute top-3 right-3">
          <span :class="['px-3 py-1 rounded-full text-xs font-semibold', teacher.status === 'actif' ? 'bg-green-500 text-white' : 'bg-red-500 text-white']">
            {{ teacher.status === 'actif' ? 'Actif' : 'Inactif' }}
          </span>
        </div>
        <div class="w-28 h-28 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <span class="text-white text-5xl font-bold">{{ teacher.name.charAt(0) }}</span>
        </div>
      </div>
      
      <!-- Informations -->
      <div class="p-6">
        <h3 class="font-bold text-2xl truncate" :title="teacher.name">{{ teacher.name }}</h3>
        <p class="text-sm text-slate-500 truncate mt-1" :title="teacher.email">{{ teacher.email }}</p>
        <p class="text-sm text-primary mt-2"><i class="fas fa-tag mr-2"></i>{{ teacher.specialite }}</p>
        
        <!-- Statistiques en 3 colonnes -->
        <div class="grid grid-cols-3 gap-4 mt-5 pt-4 border-t">
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center mb-2">
              <i class="fas fa-book text-blue-600 text-xl"></i>
            </div>
            <p class="text-xs text-slate-400 uppercase">Cours</p>
            <p class="text-2xl font-bold text-primary">{{ teacher.courses }}</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-green-100 rounded-xl flex items-center justify-center mb-2">
              <i class="fas fa-chart-line text-green-600 text-xl"></i>
            </div>
            <p class="text-xs text-slate-400 uppercase">Revenus</p>
            <p class="text-xl font-bold text-green-600">{{ formatMoney(teacher.revenue) }}</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-purple-100 rounded-xl flex items-center justify-center mb-2">
              <i class="fas fa-globe text-purple-600 text-xl"></i>
            </div>
            <p class="text-xs text-slate-400 uppercase">Pays</p>
            <p class="text-lg font-bold">{{ teacher.pays }}</p>
          </div>
        </div>
        
        <!-- Boutons -->
        <div class="flex gap-3 mt-6">
          <button @click="editTeacher(teacher)" class="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md">
            <i class="fas fa-edit mr-2"></i>Modifier
          </button>
          <button @click="suspendTeacher(teacher)" :class="['flex-1 py-3 rounded-xl text-sm font-semibold transition shadow-md', 
            teacher.status === 'actif' ? 'border-2 border-red-500 text-red-500 hover:bg-red-50' : 'bg-green-600 text-white hover:bg-green-700']">
            <i :class="teacher.status === 'actif' ? 'fas fa-ban mr-2' : 'fas fa-check-circle mr-2'"></i>
            {{ teacher.status === 'actif' ? 'Suspendre' : 'Activer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>



<!-- ==================== EXAMENS (CARTES TRÈS GRANDES) ==================== -->
<div v-if="activeSection === 'exams'" class="space-y-6">
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold"><i class="fas fa-file-alt text-primary mr-3"></i>Gestion des examens</h2>
    <button @click="openExamModal" class="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-md"><i class="fas fa-plus mr-2"></i>Ajouter</button>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
    <div v-for="exam in examsList" :key="exam.id" class="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
      <!-- En-tête coloré -->
      <div class="h-32 bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center relative">
        <i class="fas fa-file-alt text-white text-6xl opacity-20"></i>
        <div class="absolute top-3 right-3">
          <span :class="['px-3 py-1 rounded-full text-xs font-semibold', exam.status === 'actif' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white']">
            {{ exam.status === 'actif' ? 'Actif' : 'Brouillon' }}
          </span>
        </div>
      </div>
      
      <!-- Contenu -->
      <div class="p-6">
        <h3 class="font-bold text-2xl">{{ exam.title }}</h3>
        <p class="text-sm text-slate-500 mt-2 line-clamp-2 min-h-[40px]">{{ exam.description }}</p>
        
        <!-- Métriques -->
        <div class="grid grid-cols-2 gap-4 mt-5 py-4 border-t border-b">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="fas fa-users text-blue-600 text-lg"></i>
            </div>
            <div>
              <p class="text-xs text-slate-400 uppercase">Participants</p>
              <p class="text-xl font-bold text-primary">{{ exam.participants }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <i class="fas fa-clock text-amber-600 text-lg"></i>
            </div>
            <div>
              <p class="text-xs text-slate-400 uppercase">Durée</p>
              <p class="text-xl font-bold text-primary">{{ exam.duration }}</p>
            </div>
          </div>
        </div>
        
        <!-- Boutons -->
        <div class="flex gap-3 mt-6">
          <button @click="editExam(exam)" class="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md">
            <i class="fas fa-edit mr-2"></i>Modifier
          </button>
          <button @click="deleteExam(exam)" class="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition shadow-md">
            <i class="fas fa-trash mr-2"></i>Supprimer
          </button>
          <button @click="viewExamResults(exam)" class="py-3 px-5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-md">
            <i class="fas fa-chart-bar"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

          <!-- ==================== COURS (CARTES GRANDES COMME SUR L'IMAGE) ==================== -->
          <div v-if="activeSection === 'courses'" class="space-y-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold"><i class="fas fa-book text-primary mr-3"></i>Gestion des cours</h2>
              <button @click="openCourseModal" class="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-md"><i class="fas fa-plus mr-2"></i>Ajouter</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="course in coursesList" :key="course.id" class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-100">
                <!-- Image avec overlay -->
                <div class="relative h-48 overflow-hidden">
                  <img :src="course.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div class="absolute top-3 right-3">
                    <span :class="['px-3 py-1 rounded-full text-xs font-semibold', course.status === 'publié' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white']">
                      {{ course.status === 'publié' ? 'Publié' : 'Brouillon' }}
                    </span>
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 p-4">
                    <div class="flex justify-between items-center text-white">
                      <div class="flex items-center gap-2">
                        <i class="fas fa-users"></i>
                        <span class="font-semibold">{{ course.students }} inscrits</span>
                      </div>
                      <div class="text-xl font-bold">{{ formatMoney(course.price) }} FCFA</div>
                    </div>
                  </div>
                </div>
                <!-- Contenu -->
                <div class="p-5">
                  <h3 class="font-bold text-xl truncate">{{ course.title }}</h3>
                  <p class="text-sm text-slate-500 mt-1">{{ course.category }}</p>
                  
                  <!-- Barre de progression -->
                  <div class="mt-4">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-slate-600">Progression moyenne</span>
                      <span class="font-semibold text-primary">{{ course.completionRate }}%</span>
                    </div>
                    <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full bg-primary rounded-full transition-all duration-500" :style="{ width: course.completionRate + '%' }"></div>
                    </div>
                  </div>
                  
                  <!-- Boutons -->
                  <div class="flex gap-3 mt-5">
                    <button @click="editCourse(course)" class="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"><i class="fas fa-edit mr-2"></i>Modifier</button>
                    <button @click="openCourseModulesModal(course)" class="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"><i class="fas fa-layer-group mr-2"></i>Modules</button>
                    <button @click="viewCourseDetails(course)" class="py-2.5 px-4 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200 transition"><i class="fas fa-eye"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <!-- ANALYTIQUES -->
<div v-if="activeSection === 'analytics'" class="space-y-6">
  <h2 class="text-xl font-bold"><i class="fas fa-chart-line text-primary mr-2"></i>Analytiques</h2>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white rounded-2xl p-5 shadow-sm">
      <h3 class="font-semibold mb-3"><i class="fas fa-chart-bar text-primary mr-2"></i>Évolution des inscriptions</h3>
      <canvas ref="analyticsChartCanvas" style="height: 300px; width: 100%;"></canvas>
    </div>
    <div class="bg-white rounded-2xl p-5 shadow-sm">
      <h3 class="font-semibold mb-3"><i class="fas fa-chart-pie text-primary mr-2"></i>Répartition des cours</h3>
      <canvas ref="analyticsPieCanvas" style="height: 300px; width: 100%;"></canvas>
    </div>
  </div>
  <div class="flex gap-3 justify-end">
    <button @click="exportPDF" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"><i class="fas fa-file-pdf mr-1"></i>PDF</button>
    <button @click="exportExcel" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"><i class="fas fa-file-excel mr-1"></i>Excel</button>
  </div>
</div>

          <!-- FINANCES AVEC EXPORT EXCEL -->
          <div v-if="activeSection === 'finance'" class="space-y-6">
            <div class="flex justify-between items-center"><h2 class="text-xl font-bold"><i class="fas fa-credit-card text-primary mr-2"></i>Transactions</h2><button @click="exportFinanceExcel" class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm"><i class="fas fa-file-excel mr-1"></i>Exporter Excel</button></div>
            <div class="bg-white rounded-2xl shadow-sm overflow-x-auto"><table class="w-full min-w-[800px]"><thead class="bg-slate-50"><tr class="text-left"><th class="p-3 text-left text-xs font-bold">ID</th><th class="p-3 text-left text-xs font-bold">Utilisateur</th><th class="p-3 text-left text-xs font-bold">Type</th><th class="p-3 text-left text-xs font-bold">Montant</th><th class="p-3 text-left text-xs font-bold">Méthode</th><th class="p-3 text-left text-xs font-bold">Statut</th><th class="p-3 text-left text-xs font-bold">Date</th></tr></thead><tbody><tr v-for="t in transactionsList" :key="t.id" class="border-t hover:bg-slate-50"><td class="p-3">{{ t.id }}</td><td class="p-3">{{ t.user }}</td><td class="p-3">{{ t.type }}</td><td class="p-3 font-bold">{{ formatMoney(t.amount) }} FCFA</td><td class="p-3">{{ t.method }}</td><td class="p-3"><span class="px-2 py-0.5 rounded-full text-xs" :class="t.status === 'payé' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'">{{ t.status }}</span></td><td class="p-3">{{ t.date }}</td></tr></tbody></table></div>
          </div>

          <!-- OPPORTUNITÉS AVEC MODALE FONCTIONNELLE -->
          <div v-if="activeSection === 'opportunities'" class="space-y-6">
            <div class="flex justify-between items-center"><h2 class="text-xl font-bold"><i class="fas fa-globe text-primary mr-2"></i>Opportunités & Bourses</h2><button @click="openOpportunityModal" class="bg-primary text-white px-4 py-2 rounded-xl text-sm"><i class="fas fa-plus mr-1"></i>Ajouter</button></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-3"><i class="fas fa-graduation-cap mr-2"></i>Bourses</h3><div v-for="b in scholarshipsList" :key="b.id" class="flex justify-between items-center py-2 border-b"><div><p class="font-medium">{{ b.name }}</p><p class="text-xs text-slate-500">{{ b.provider }}</p></div><div class="flex gap-2"><span class="font-bold text-primary">{{ b.amount }}</span><button @click="deleteScholarship(b)" class="text-red-500 text-xs"><i class="fas fa-trash"></i></button></div></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-3"><i class="fas fa-plane mr-2"></i>Programmes internationaux</h3><div v-for="p in programsList" :key="p.id" class="flex justify-between items-center py-2 border-b"><div><p class="font-medium">{{ p.name }}</p><p class="text-xs text-slate-500">{{ p.country }} • {{ p.duration }}</p></div><button @click="deleteProgram(p)" class="text-red-500 text-xs"><i class="fas fa-trash"></i></button></div></div>
            </div>
          </div>

          <!-- SUPPORT -->
          <div v-if="activeSection === 'support'" class="space-y-6"><div class="flex justify-between items-center"><h2 class="text-xl font-bold"><i class="fas fa-headset text-primary mr-2"></i>Tickets support</h2><button @click="openTicketModal" class="bg-primary text-white px-4 py-2 rounded-xl text-sm"><i class="fas fa-plus mr-1"></i>Ticket</button></div><div class="bg-white rounded-2xl shadow-sm overflow-x-auto"><table class="w-full min-w-[800px]"><thead class="bg-slate-50"><tr class="text-left"><th class="p-3 text-left text-xs font-bold">ID</th><th class="p-3 text-left text-xs font-bold">Sujet</th><th class="p-3 text-left text-xs font-bold">Utilisateur</th><th class="p-3 text-left text-xs font-bold">Statut</th><th class="p-3 text-left text-xs font-bold">Priorité</th><th class="p-3 text-left text-xs font-bold">Date</th><th class="p-3 text-left text-xs font-bold">Actions</th></tr></thead><tbody><tr v-for="t in ticketsList" :key="t.id" class="border-t hover:bg-slate-50"><td class="p-3">#{{ t.id }}</td><td class="p-3">{{ t.subject }}</td><td class="p-3">{{ t.user }}</td><td class="p-3"><span class="px-2 py-0.5 rounded-full text-xs" :class="t.status === 'ouvert' ? 'bg-yellow-100 text-yellow-600' : t.status === 'en cours' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'">{{ t.status }}</span></td><td class="p-3"><span class="px-2 py-0.5 rounded-full text-xs" :class="t.priority === 'haute' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'">{{ t.priority }}</span></td><td class="p-3">{{ t.date }}</td><td class="p-3"><div class="flex gap-2"><button @click="editTicket(t)" class="text-blue-600"><i class="fas fa-edit"></i></button><button @click="deleteTicket(t)" class="text-red-600"><i class="fas fa-trash"></i></button><button @click="resolveTicket(t)" class="text-green-600"><i class="fas fa-check-circle"></i></button></div></td></tr></tbody></table></div></div>

          <!-- MESSAGES -->
          <div v-if="activeSection === 'messages'" class="space-y-6"><div class="flex justify-between items-center"><h2 class="text-xl font-bold"><i class="fas fa-envelope text-primary mr-2"></i>Messages</h2><button @click="openMessageModal" class="bg-primary text-white px-4 py-2 rounded-xl text-sm"><i class="fas fa-plus mr-1"></i>Message</button></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="bg-white rounded-2xl p-4 shadow-sm"><h3 class="font-semibold mb-3">Conversations</h3><div v-for="c in conversationsList" :key="c.id" @click="selectConversation(c)" class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"><div class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">{{ c.name.charAt(0) }}</div><div><p class="font-medium">{{ c.name }}</p><p class="text-xs text-slate-500">{{ c.lastMessage }}</p></div></div></div><div class="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm"><div class="border-b pb-2 mb-2"><p class="font-bold">Conversation avec {{ currentConversation?.name || 'Sélectionnez une conversation' }}</p></div><div class="h-80 overflow-y-auto space-y-2"><div v-for="m in currentMessages" :key="m.id" class="flex" :class="m.sender === 'admin' ? 'justify-end' : 'justify-start'"><div class="max-w-[70%] p-2 rounded-lg" :class="m.sender === 'admin' ? 'bg-primary text-white' : 'bg-slate-100'"><p class="text-sm">{{ m.content }}</p><p class="text-[10px] opacity-70">{{ m.time }}</p></div></div></div><div class="flex gap-2 mt-3"><input type="text" v-model="newMessageText" placeholder="Écrivez un message..." class="flex-1 px-3 py-2 border rounded-xl text-sm"><button @click="sendMessage" class="px-4 py-2 bg-primary text-white rounded-xl"><i class="fas fa-paper-plane"></i></button></div></div></div></div>

          <!-- PROFIL -->
          <div v-if="activeSection === 'profile'" class="space-y-6"><h2 class="text-xl font-bold"><i class="fas fa-user-shield text-primary mr-2"></i>Mon profil</h2><div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center"><div class="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold mb-3">{{ adminInitials }}</div><h3 class="text-xl font-bold">{{ adminProfile.name }}</h3><p class="text-slate-500">{{ adminProfile.email }}</p><p class="text-sm mt-2"><i class="fas fa-phone mr-1"></i>{{ adminProfile.phone }}</p><div class="flex gap-3 mt-4"><button @click="openEditProfileModal" class="px-4 py-2 bg-primary text-white rounded-lg"><i class="fas fa-edit mr-1"></i>Modifier</button><button @click="openChangePasswordModal" class="px-4 py-2 bg-slate-800 text-white rounded-lg"><i class="fas fa-key mr-1"></i>Mot de passe</button></div></div></div>

          <!-- PARAMÈTRES -->
          <div v-if="activeSection === 'settings'" class="space-y-6"><h2 class="text-xl font-bold"><i class="fas fa-cog text-primary mr-2"></i>Paramètres</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-3">Apparence</h3><div class="flex justify-between items-center"><span>Mode sombre</span><button @click="toggleDarkMode" class="w-12 h-6 rounded-full transition-colors" :class="isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'"><div class="w-5 h-5 bg-white rounded-full transition-transform" :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"></div></button></div></div><div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-3">Langue</h3><div class="flex justify-between items-center"><span>Langue de l'interface</span><button @click="toggleLanguage" class="px-4 py-2 bg-primary text-white rounded-lg text-sm">{{ currentLang === 'fr' ? 'Français' : 'English' }}</button></div></div><div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-3">Sécurité</h3><button @click="openChangePasswordModal" class="w-full py-2 bg-slate-100 rounded-lg text-sm">Changer mot de passe</button></div><div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-3">Sauvegarde</h3><button @click="exportData" class="w-full py-2 bg-primary text-white rounded-lg text-sm"><i class="fas fa-database mr-1"></i>Exporter les données</button></div></div></div>
        </div>
      </main>
    </div>

    <!-- MODAL UTILISATEUR -->
<div v-if="userModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeUserModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <i class="fas fa-user-plus text-white text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-white">{{ editingUser ? 'Modifier utilisateur' : 'Ajouter un utilisateur' }}</h3>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="relative">
        <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <input type="text" v-model="userForm.name" placeholder="Nom complet" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition">
      </div>
      <div class="relative">
        <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <input type="email" v-model="userForm.email" placeholder="Adresse email" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition">
      </div>
      <div class="relative">
        <i class="fas fa-user-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <select v-model="userForm.role" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none">
          <option value="étudiant">Étudiant</option>
          <option value="formateur">Formateur</option>
        </select>
      </div>
      <div class="relative">
        <i class="fas fa-circle absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <select v-model="userForm.status" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none">
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl flex gap-3">
      <button @click="closeUserModal" class="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-all">Annuler</button>
      <button @click="saveUser" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"><i class="fas fa-save mr-2"></i>Enregistrer</button>
    </div>
  </div>
</div>

<!-- MODAL FORMATEUR -->
<div v-if="teacherModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeTeacherModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-2xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <i class="fas fa-chalkboard-user text-white text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-white">{{ editingTeacher ? 'Modifier formateur' : 'Ajouter un formateur' }}</h3>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="relative">
        <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"></i>
        <input type="text" v-model="teacherForm.name" placeholder="Nom complet" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"></i>
        <input type="email" v-model="teacherForm.email" placeholder="Email" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-brain absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"></i>
        <input type="text" v-model="teacherForm.specialite" placeholder="Spécialité" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"></i>
        <select v-model="teacherForm.pays" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 appearance-none">
          <option value="Sénégal">🇸🇳 Sénégal</option>
          <option value="France">🇫🇷 France</option>
          <option value="USA">🇺🇸 USA</option>
          <option value="Canada">🇨🇦 Canada</option>
        </select>
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl flex gap-3">
      <button @click="closeTeacherModal" class="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition">Annuler</button>
      <button @click="saveTeacher" class="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition"><i class="fas fa-save mr-2"></i>Enregistrer</button>
    </div>
  </div>
</div>

<!-- MODAL COURS -->
<div v-if="courseModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeCourseModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-2xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <i class="fas fa-book text-white text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-white">{{ editingCourse ? 'Modifier cours' : 'Ajouter un cours' }}</h3>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="relative">
        <i class="fas fa-heading absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"></i>
        <input type="text" v-model="courseForm.title" placeholder="Titre du cours" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"></i>
        <input type="text" v-model="courseForm.category" placeholder="Catégorie" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-money-bill-wave absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"></i>
        <input type="number" v-model="courseForm.price" placeholder="Prix (FCFA)" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-users absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"></i>
        <input type="number" v-model="courseForm.students" placeholder="Nombre d'étudiants" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-image absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400"></i>
        <input type="file" @change="uploadCourseImage" accept="image/*" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl">
      </div>
      <div v-if="courseForm.imagePreview" class="mt-2">
        <img :src="courseForm.imagePreview" class="w-full h-32 object-cover rounded-xl">
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl flex gap-3">
      <button @click="closeCourseModal" class="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition">Annuler</button>
      <button @click="saveCourse" class="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition"><i class="fas fa-save mr-2"></i>Enregistrer</button>
    </div>
  </div>
</div>

<!-- MODAL EXAMEN -->
<div v-if="examModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeExamModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-blue-600 to-cyan-600 rounded-t-2xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <i class="fas fa-file-alt text-white text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-white">{{ editingExam ? 'Modifier examen' : 'Ajouter un examen' }}</h3>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="relative">
        <i class="fas fa-heading absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"></i>
        <input type="text" v-model="examForm.title" placeholder="Titre de l'examen" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-align-left absolute left-3 top-3 text-blue-400"></i>
        <textarea v-model="examForm.description" placeholder="Description" rows="3" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition"></textarea>
      </div>
      <div class="relative">
        <i class="fas fa-users absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"></i>
        <input type="number" v-model="examForm.participants" placeholder="Nombre de participants" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-clock absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"></i>
        <input type="text" v-model="examForm.duration" placeholder="Durée (ex: 2h)" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-flag-checkered absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400"></i>
        <select v-model="examForm.status" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none">
          <option value="actif">Actif</option>
          <option value="brouillon">Brouillon</option>
        </select>
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl flex gap-3">
      <button @click="closeExamModal" class="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition">Annuler</button>
      <button @click="saveExam" class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition"><i class="fas fa-save mr-2"></i>Enregistrer</button>
    </div>
  </div>
</div>

<!-- MODAL RÉSULTATS EXAMEN -->
<div v-if="resultsModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeResultsModal">
  <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-green-600 to-emerald-600">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <i class="fas fa-chart-bar text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-white">Résultats - {{ selectedExam?.title }}</h3>
        </div>
        <button @click="closeResultsModal" class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition">
          <i class="fas fa-times text-white"></i>
        </button>
      </div>
    </div>
    <div class="p-5 overflow-y-auto max-h-[60vh]">
      <table class="w-full">
        <thead class="bg-slate-50 rounded-xl">
          <tr>
            <th class="p-3 text-left text-xs font-bold text-slate-500 uppercase">Étudiant</th>
            <th class="p-3 text-left text-xs font-bold text-slate-500 uppercase">Note</th>
            <th class="p-3 text-left text-xs font-bold text-slate-500 uppercase">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in examResults" :key="r.id" class="border-b hover:bg-slate-50 transition">
            <td class="p-3"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">{{ r.name.charAt(0) }}</div><span>{{ r.name }}</span></div></td>
            <td class="p-3"><span class="font-bold">{{ r.score }}/20</span></td>
            <td class="p-3"><span class="px-3 py-1 rounded-full text-xs font-semibold" :class="r.score >= 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">{{ r.score >= 10 ? '✅ Validé' : '❌ Non validé' }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-5 border-t bg-slate-50">
      <button @click="closeResultsModal" class="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition">Fermer</button>
    </div>
  </div>
</div>

<!-- MODAL DÉTAILS COURS -->
<div v-if="courseDetailsModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeCourseDetailsModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-orange-600 to-amber-600 rounded-t-2xl">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <i class="fas fa-info-circle text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-bold text-white">Détails du cours</h3>
        </div>
        <button @click="closeCourseDetailsModal" class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition">
          <i class="fas fa-times text-white"></i>
        </button>
      </div>
    </div>
    <div class="p-5">
      <img :src="selectedCourse?.image" class="w-full h-40 object-cover rounded-xl mb-4 shadow-md">
      <h3 class="font-bold text-xl text-slate-800">{{ selectedCourse?.title }}</h3>
      <p class="text-sm text-slate-500 mt-1"><i class="fas fa-tag mr-1"></i>{{ selectedCourse?.category }}</p>
      <div class="flex justify-between mt-4 p-3 bg-slate-50 rounded-xl">
        <span class="font-bold text-primary"><i class="fas fa-money-bill-wave mr-1"></i>{{ formatMoney(selectedCourse?.price) }} FCFA</span>
        <span class="text-slate-600"><i class="fas fa-users mr-1"></i>{{ selectedCourse?.students }} inscrits</span>
      </div>
      <div class="mt-3 p-3 rounded-xl" :class="selectedCourse?.status === 'publié' ? 'bg-green-50' : 'bg-yellow-50'">
        <p class="text-sm"><i class="fas fa-flag-checkered mr-1"></i>Statut: <span :class="selectedCourse?.status === 'publié' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'">{{ selectedCourse?.status === 'publié' ? 'Publié' : 'Brouillon' }}</span></p>
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl">
      <button @click="closeCourseDetailsModal" class="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-medium hover:shadow-lg transition">Fermer</button>
    </div>
  </div>
</div>

<!-- MODAL TICKET -->
<div v-if="ticketModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeTicketModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-red-600 to-orange-600 rounded-t-2xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <i class="fas fa-ticket-alt text-white text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-white">{{ editingTicket ? 'Modifier ticket' : 'Nouveau ticket' }}</h3>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="relative">
        <i class="fas fa-heading absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400"></i>
        <input type="text" v-model="ticketForm.subject" placeholder="Sujet du ticket" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400"></i>
        <select v-model="ticketForm.user" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 appearance-none">
          <option v-for="u in usersList.filter(u => u.role === 'étudiant')" :key="u.id" :value="u.name">{{ u.name }}</option>
        </select>
      </div>
      <div class="relative">
        <i class="fas fa-chart-line absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400"></i>
        <select v-model="ticketForm.status" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 appearance-none">
          <option value="ouvert">Ouvert</option>
          <option value="en cours">En cours</option>
          <option value="résolu">Résolu</option>
        </select>
      </div>
      <div class="relative">
        <i class="fas fa-flag absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400"></i>
        <select v-model="ticketForm.priority" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 appearance-none">
          <option value="haute">Haute</option>
          <option value="moyenne">Moyenne</option>
          <option value="basse">Basse</option>
        </select>
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl flex gap-3">
      <button @click="closeTicketModal" class="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition">Annuler</button>
      <button @click="saveTicket" class="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition"><i class="fas fa-save mr-2"></i>Enregistrer</button>
    </div>
  </div>
</div>

<!-- MODAL OPPORTUNITÉ -->
<div v-if="opportunityModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeOpportunityModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-violet-600 to-purple-600 rounded-t-2xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <i class="fas fa-globe text-white text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-white">Ajouter une opportunité</h3>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="relative">
        <i class="fas fa-layer-group absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400"></i>
        <select v-model="opportunityForm.type" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 appearance-none">
          <option value="bourse">Bourse d'étude</option>
          <option value="programme">Programme international</option>
        </select>
      </div>
      <div class="relative">
        <i class="fas fa-trophy absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400"></i>
        <input type="text" v-model="opportunityForm.name" placeholder="Nom de l'opportunité" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition">
      </div>
      <div v-if="opportunityForm.type === 'bourse'">
        <div class="relative">
          <i class="fas fa-building absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400"></i>
          <input type="text" v-model="opportunityForm.provider" placeholder="Fournisseur / Organisateur" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition">
        </div>
        <div class="relative mt-3">
          <i class="fas fa-money-bill-wave absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400"></i>
          <input type="text" v-model="opportunityForm.amount" placeholder="Montant" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition">
        </div>
      </div>
      <div v-if="opportunityForm.type === 'programme'">
        <div class="relative">
          <i class="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400"></i>
          <input type="text" v-model="opportunityForm.country" placeholder="Pays" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition">
        </div>
        <div class="relative mt-3">
          <i class="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400"></i>
          <input type="text" v-model="opportunityForm.duration" placeholder="Durée" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 transition">
        </div>
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl flex gap-3">
      <button @click="closeOpportunityModal" class="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition">Annuler</button>
      <button @click="saveOpportunity" class="flex-1 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition"><i class="fas fa-save mr-2"></i>Enregistrer</button>
    </div>
  </div>
</div>

<!-- MODAL PROFIL -->
<div v-if="editProfileModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeEditProfileModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <i class="fas fa-user-edit text-white text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-white">Modifier mon profil</h3>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="relative">
        <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <input type="text" v-model="editProfileForm.name" placeholder="Nom complet" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <input type="email" v-model="editProfileForm.email" placeholder="Email" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <input type="tel" v-model="editProfileForm.phone" placeholder="Téléphone" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <input type="text" v-model="editProfileForm.location" placeholder="Localisation" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-image absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"></i>
        <input type="file" accept="image/*" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl">
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl flex gap-3">
      <button @click="closeEditProfileModal" class="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition">Annuler</button>
      <button @click="saveProfile" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition"><i class="fas fa-save mr-2"></i>Enregistrer</button>
    </div>
  </div>
</div>

<!-- MODAL CHANGEMENT MOT DE PASSE -->
<div v-if="changePasswordModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="closeChangePasswordModal">
  <div class="bg-white rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-5 border-b bg-gradient-to-r from-slate-700 to-slate-900 rounded-t-2xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <i class="fas fa-key text-white text-xl"></i>
        </div>
        <h3 class="text-xl font-bold text-white">Changer mot de passe</h3>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="relative">
        <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
        <input type="password" v-model="passwordForm.current" placeholder="Mot de passe actuel" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-key absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
        <input type="password" v-model="passwordForm.new" placeholder="Nouveau mot de passe" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 transition">
      </div>
      <div class="relative">
        <i class="fas fa-check-circle absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
        <input type="password" v-model="passwordForm.confirm" placeholder="Confirmer le mot de passe" class="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-500 transition">
      </div>
    </div>
    <div class="p-5 border-t bg-slate-50 rounded-b-2xl flex gap-3">
      <button @click="closeChangePasswordModal" class="flex-1 py-3 border border-slate-300 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition">Annuler</button>
      <button @click="savePassword" class="flex-1 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-medium hover:shadow-lg transition"><i class="fas fa-save mr-2"></i>Enregistrer</button>
    </div>
  </div>
</div>

<!-- MODALE NOTIFICATIONS -->
<div v-if="showNotifications" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="showNotifications = false">
  <div class="bg-white rounded-2xl w-96 max-w-[90%] transform transition-all duration-300 scale-100 shadow-2xl">
    <div class="p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <i class="fas fa-bell text-white text-xl"></i>
          <h3 class="font-bold text-white">Notifications</h3>
        </div>
        <button @click="showNotifications = false" class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition">
          <i class="fas fa-times text-white"></i>
        </button>
      </div>
    </div>
    <div class="max-h-96 overflow-y-auto">
      <div v-for="n in notifications" :key="n.id" class="p-4 border-b hover:bg-slate-50 transition cursor-pointer">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <i class="fas fa-bell text-amber-600"></i>
          </div>
          <div class="flex-1">
            <p class="font-medium text-slate-800">{{ n.message }}</p>
            <p class="text-xs text-slate-400 mt-1"><i class="far fa-clock mr-1"></i>{{ n.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import Chart from 'chart.js/auto'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  name: 'GradusAuraDashboard',
  setup() {
    const isDarkMode = ref(false)
    const sidebarCollapsed = ref(false)
    const activeSection = ref('dashboard')
    const showNotifications = ref(false)
    const currentLang = ref('fr')
    const unreadCount = ref(5)

    // Profil admin
    const adminProfile = ref({ name: 'Jean Dupont', email: 'admin@gradusaura.com', phone: '+237 690 000 000', location: 'Douala, Cameroun' })
    const adminInitials = computed(() => adminProfile.value.name.charAt(0).toUpperCase())

    // Navigation
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
      { id: 'users', label: 'Utilisateurs', icon: 'fas fa-users' },
      { id: 'teachers', label: 'Formateurs', icon: 'fas fa-chalkboard-user' },
      { id: 'courses', label: 'Cours', icon: 'fas fa-book' },
      { id: 'exams', label: 'Examens', icon: 'fas fa-file-alt' },
      { id: 'analytics', label: 'Analytiques', icon: 'fas fa-chart-line' },
      { id: 'finance', label: 'Finances', icon: 'fas fa-credit-card' },
      { id: 'opportunities', label: 'Opportunités', icon: 'fas fa-globe' },
      { id: 'support', label: 'Support', icon: 'fas fa-headset' },
      { id: 'messages', label: 'Messages', icon: 'fas fa-envelope' },
      { id: 'profile', label: 'Profil', icon: 'fas fa-user-shield' },
      { id: 'settings', label: 'Paramètres', icon: 'fas fa-cog' }
    ]
    const activeMenuTitle = computed(() => navItems.find(i => i.id === activeSection.value)?.label || 'Dashboard')

    // Données (10 exemples chacun)
    const usersList = ref([
      { id: 1, name: 'Jean Dupont', email: 'jean@email.com', role: 'étudiant', status: 'actif', date: '2025-01-15' },
      { id: 2, name: 'Marie Martin', email: 'marie@email.com', role: 'formateur', status: 'actif', date: '2025-01-14' },
      { id: 3, name: 'Pierre Durand', email: 'pierre@email.com', role: 'étudiant', status: 'inactif', date: '2025-01-13' },
      { id: 4, name: 'Sophie Bernard', email: 'sophie@email.com', role: 'formateur', status: 'actif', date: '2025-01-12' },
      { id: 5, name: 'Thomas Petit', email: 'thomas@email.com', role: 'étudiant', status: 'actif', date: '2025-01-11' },
      { id: 6, name: 'Isabelle Leroy', email: 'isabelle@email.com', role: 'formateur', status: 'actif', date: '2025-01-10' },
      { id: 7, name: 'Nicolas Moreau', email: 'nicolas@email.com', role: 'étudiant', status: 'inactif', date: '2025-01-09' },
      { id: 8, name: 'Catherine Dubois', email: 'catherine@email.com', role: 'formateur', status: 'actif', date: '2025-01-08' },
      { id: 9, name: 'Michel Lambert', email: 'michel@email.com', role: 'étudiant', status: 'actif', date: '2025-01-07' },
      { id: 10, name: 'Valérie Fontaine', email: 'valerie@email.com', role: 'formateur', status: 'actif', date: '2025-01-06' }
    ])

    const teachersList = ref([
      { id: 1, name: 'Marie Martin', email: 'marie@email.com', courses: 12, revenue: 450000, status: 'actif', specialite: 'Data Science', pays: 'Sénégal' },
      { id: 2, name: 'Sophie Bernard', email: 'sophie@email.com', courses: 8, revenue: 280000, status: 'actif', specialite: 'Web Dev', pays: 'France' },
      { id: 3, name: 'Isabelle Leroy', email: 'isabelle@email.com', courses: 15, revenue: 620000, status: 'actif', specialite: 'IA', pays: 'USA' },
      { id: 4, name: 'Catherine Dubois', email: 'catherine@email.com', courses: 6, revenue: 210000, status: 'inactif', specialite: 'Marketing', pays: 'France' },
      { id: 5, name: 'Valérie Fontaine', email: 'valerie@email.com', courses: 4, revenue: 120000, status: 'actif', specialite: 'UX Design', pays: 'Canada' },
      { id: 6, name: 'Emma Dubois', email: 'emma@email.com', courses: 10, revenue: 390000, status: 'actif', specialite: 'Data Eng', pays: 'UK' },
      { id: 7, name: 'François Renard', email: 'francois@email.com', courses: 3, revenue: 90000, status: 'inactif', specialite: 'SEO', pays: 'France' },
      { id: 8, name: 'Claire Bonnet', email: 'claire@email.com', courses: 7, revenue: 250000, status: 'actif', specialite: 'DevOps', pays: 'Allemagne' },
      { id: 9, name: 'Éric Marchand', email: 'eric@email.com', courses: 9, revenue: 340000, status: 'actif', specialite: 'Cloud', pays: 'Canada' },
      { id: 10, name: 'Audrey Petit', email: 'audrey@email.com', courses: 11, revenue: 470000, status: 'actif', specialite: 'Blockchain', pays: 'Suisse' }
    ])

    const coursesList = ref([
      { id: 1, title: 'Vue.js Masterclass', category: 'Programmation', price: 75000, students: 1234, status: 'publié', image: 'https://picsum.photos/200/120?random=1' },
      { id: 2, title: 'Design UX/UI Complet', category: 'Design', price: 65000, students: 856, status: 'publié', image: 'https://picsum.photos/200/120?random=2' },
      { id: 3, title: 'Data Science avec Python', category: 'Data', price: 120000, students: 567, status: 'publié', image: 'https://picsum.photos/200/120?random=3' },
      { id: 4, title: 'React.js Avancé', category: 'Programmation', price: 85000, students: 890, status: 'brouillon', image: 'https://picsum.photos/200/120?random=4' },
      { id: 5, title: 'Marketing Digital', category: 'Marketing', price: 55000, students: 678, status: 'publié', image: 'https://picsum.photos/200/120?random=5' },
      { id: 6, title: 'IA et Machine Learning', category: 'Data', price: 150000, students: 432, status: 'publié', image: 'https://picsum.photos/200/120?random=6' },
      { id: 7, title: 'Gestion de Projet Agile', category: 'Business', price: 65000, students: 543, status: 'publié', image: 'https://picsum.photos/200/120?random=7' },
      { id: 8, title: 'Cybersécurité Essentielle', category: 'Tech', price: 95000, students: 321, status: 'brouillon', image: 'https://picsum.photos/200/120?random=8' },
      { id: 9, title: 'Blockchain et Crypto', category: 'Tech', price: 110000, students: 234, status: 'publié', image: 'https://picsum.photos/200/120?random=9' },
      { id: 10, title: 'Photographie Pro', category: 'Design', price: 45000, students: 567, status: 'publié', image: 'https://picsum.photos/200/120?random=10' }
    ])

    const examsList = ref([
      { id: 1, title: 'Certification JavaScript', description: 'Examen final JS', participants: 245, duration: '2h', status: 'actif' },
      { id: 2, title: 'Examen UX Design', description: 'Certification UX', participants: 189, duration: '1h30', status: 'actif' },
      { id: 3, title: 'Test Python', description: 'Bases de Python', participants: 567, duration: '1h', status: 'actif' },
      { id: 4, title: 'Certification React', description: 'React.js avancé', participants: 234, duration: '2h', status: 'brouillon' },
      { id: 5, title: 'Examen Data Science', description: 'Machine Learning', participants: 345, duration: '3h', status: 'actif' },
      { id: 6, title: 'Quiz Marketing', description: 'Marketing digital', participants: 456, duration: '45min', status: 'actif' },
      { id: 7, title: 'Test SEO', description: 'Référencement', participants: 234, duration: '1h', status: 'actif' },
      { id: 8, title: 'Certification Agile', description: 'Scrum Master', participants: 123, duration: '2h', status: 'brouillon' },
      { id: 9, title: 'Examen DevOps', description: 'CI/CD', participants: 189, duration: '2h30', status: 'actif' },
      { id: 10, title: 'Test Blockchain', description: 'Crypto', participants: 98, duration: '1h30', status: 'actif' }
    ])

    const transactionsList = ref([
      { id: 'TRX-001', user: 'Jean Dupont', type: 'Abonnement', amount: 29990, method: 'Orange Money', status: 'payé', date: '2025-01-15' },
      { id: 'TRX-002', user: 'Marie Martin', type: 'Commission', amount: 45000, method: 'MTN MoMo', status: 'payé', date: '2025-01-14' },
      { id: 'TRX-003', user: 'Pierre Durand', type: 'Cours', amount: 75000, method: 'Carte', status: 'payé', date: '2025-01-13' },
      { id: 'TRX-004', user: 'Sophie Bernard', type: 'Abonnement', amount: 29990, method: 'Orange Money', status: 'payé', date: '2025-01-12' },
      { id: 'TRX-005', user: 'Thomas Petit', type: 'Livre', amount: 15000, method: 'PayPal', status: 'en attente', date: '2025-01-11' },
      { id: 'TRX-006', user: 'Isabelle Leroy', type: 'Formation', amount: 120000, method: 'Carte', status: 'payé', date: '2025-01-10' },
      { id: 'TRX-007', user: 'Nicolas Moreau', type: 'Abonnement', amount: 29990, method: 'MTN MoMo', status: 'payé', date: '2025-01-09' },
      { id: 'TRX-008', user: 'Catherine Dubois', type: 'Cours', amount: 85000, method: 'Orange Money', status: 'payé', date: '2025-01-08' },
      { id: 'TRX-009', user: 'Michel Lambert', type: 'Commission', amount: 28000, method: 'PayPal', status: 'en attente', date: '2025-01-07' },
      { id: 'TRX-010', user: 'Valérie Fontaine', type: 'Formation', amount: 95000, method: 'Carte', status: 'payé', date: '2025-01-06' }
    ])

    const scholarshipsList = ref([
      { id: 1, name: "Bourse d'Excellence", provider: 'Ministère', amount: '5M FCFA' },
      { id: 2, name: 'Bourse AUF', provider: 'AUF', amount: '8M FCFA' },
      { id: 3, name: 'Bourse Google', provider: 'Google', amount: '3M FCFA' },
      { id: 4, name: 'Bourse Microsoft', provider: 'Microsoft', amount: '4M FCFA' },
      { id: 5, name: 'Bourse Mastercard', provider: 'Mastercard', amount: '6M FCFA' },
      { id: 6, name: 'Bourse Erasmus', provider: 'UE', amount: '7M FCFA' },
      { id: 7, name: 'Bourse France Excellence', provider: 'France', amount: '9M FCFA' },
      { id: 8, name: 'Bourse Québec', provider: 'Canada', amount: '5M FCFA' },
      { id: 9, name: 'Bourse Chine', provider: 'Chine', amount: '4M FCFA' },
      { id: 10, name: 'Bourse Allemagne', provider: 'DAAD', amount: '6M FCFA' }
    ])

    const programsList = ref([
      { id: 1, name: 'Master à MIT', country: 'USA', duration: '2 ans' },
      { id: 2, name: 'Échange Erasmus', country: 'Europe', duration: '1 semestre' },
      { id: 3, name: 'Programme Québec', country: 'Canada', duration: '1 an' },
      { id: 4, name: 'Doctorat Sorbonne', country: 'France', duration: '3 ans' },
      { id: 5, name: 'Master Oxford', country: 'Royaume-Uni', duration: '1 an' },
      { id: 6, name: 'Programme DAAD', country: 'Allemagne', duration: '1 an' },
      { id: 7, name: 'Bourse Chine', country: 'Chine', duration: '2 ans' },
      { id: 8, name: 'Programme Japon', country: 'Japon', duration: '1 an' },
      { id: 9, name: 'Master Canada', country: 'Canada', duration: '2 ans' },
      { id: 10, name: 'Programme Australie', country: 'Australie', duration: '2 ans' }
    ])

    const ticketsList = ref([
      { id: 1, subject: 'Problème de connexion', user: 'Jean Dupont', status: 'ouvert', priority: 'haute', date: '2025-01-15' },
      { id: 2, subject: 'Question sur le cours', user: 'Marie Martin', status: 'en cours', priority: 'moyenne', date: '2025-01-14' },
      { id: 3, subject: 'Paiement refusé', user: 'Pierre Durand', status: 'résolu', priority: 'haute', date: '2025-01-13' },
      { id: 4, subject: 'Certificat non reçu', user: 'Sophie Bernard', status: 'ouvert', priority: 'moyenne', date: '2025-01-12' },
      { id: 5, subject: 'Bug application', user: 'Thomas Petit', status: 'en cours', priority: 'haute', date: '2025-01-11' },
      { id: 6, subject: 'Problème vidéo', user: 'Isabelle Leroy', status: 'résolu', priority: 'basse', date: '2025-01-10' },
      { id: 7, subject: 'Accès refusé', user: 'Nicolas Moreau', status: 'ouvert', priority: 'haute', date: '2025-01-09' },
      { id: 8, subject: 'Question examen', user: 'Catherine Dubois', status: 'en cours', priority: 'moyenne', date: '2025-01-08' },
      { id: 9, subject: 'Problème téléchargement', user: 'Michel Lambert', status: 'résolu', priority: 'basse', date: '2025-01-07' },
      { id: 10, subject: 'Mot de passe oublié', user: 'Valérie Fontaine', status: 'ouvert', priority: 'moyenne', date: '2025-01-06' }
    ])

    const conversationsList = ref([
      { id: 1, name: 'Jean Dupont', lastMessage: 'Merci pour votre aide' },
      { id: 2, name: 'Marie Martin', lastMessage: 'Quand aura lieu le prochain cours ?' },
      { id: 3, name: 'Sophie Bernard', lastMessage: 'J\'ai terminé le module 3' },
      { id: 4, name: 'Thomas Petit', lastMessage: 'Question sur l\'examen' },
      { id: 5, name: 'Isabelle Leroy', lastMessage: 'Merci pour la formation' }
    ])

    const messagesMap = ref({
      1: [{ id: 1, sender: 'user', content: 'Bonjour, j\'ai une question', time: '10:30' }, { id: 2, sender: 'admin', content: 'Bonjour, je vous écoute', time: '10:32' }],
      2: [{ id: 1, sender: 'user', content: 'Quand aura lieu la prochaine session ?', time: '09:15' }],
      3: [{ id: 1, sender: 'user', content: 'J\'ai terminé le module 3', time: 'Hier' }],
      4: [{ id: 1, sender: 'user', content: 'Question sur l\'examen final', time: '15:20' }],
      5: [{ id: 1, sender: 'user', content: 'Merci pour la formation', time: '12:00' }]
    })

    const activities = ref([
      { id: 1, message: 'Nouvel utilisateur inscrit: Jean Dupont', time: '5 min' },
      { id: 2, message: 'Paiement reçu de 45 000 FCFA', time: '15 min' },
      { id: 3, message: 'Cours publié: Vue.js Masterclass', time: '1h' },
      { id: 4, message: 'Ticket résolu #123', time: '2h' },
      { id: 5, message: 'Nouveau formateur: Marie Martin', time: '3h' }
    ])

    const notifications = ref([
      { id: 1, message: '3 nouveaux utilisateurs inscrits', time: '5 min' },
      { id: 2, message: 'Paiement de 75 000 FCFA reçu', time: '1h' },
      { id: 3, message: 'Maintenance programmée ce soir', time: '3h' },
      { id: 4, message: 'Nouveau cours publié', time: '5h' },
      { id: 5, message: 'Ticket urgent #456', time: 'Hier' }
    ])

    // Formulaires
    const userModalOpen = ref(false)
    const teacherModalOpen = ref(false)
    const courseModalOpen = ref(false)
    const examModalOpen = ref(false)
    const ticketModalOpen = ref(false)
    const editProfileModalOpen = ref(false)
    const changePasswordModalOpen = ref(false)
    const opportunityModalOpen = ref(false)
    const resultsModalOpen = ref(false)
    const courseDetailsModalOpen = ref(false)
    
    const editingUser = ref(null)
    const editingTeacher = ref(null)
    const editingCourse = ref(null)
    const editingExam = ref(null)
    const editingTicket = ref(null)
    
    const userForm = ref({ name: '', email: '', role: 'étudiant', status: 'actif' })
    const teacherForm = ref({ name: '', email: '', specialite: '', pays: '' })
    const courseForm = ref({ title: '', category: '', price: 0, imagePreview: null, imageFile: null })
    const examForm = ref({ title: '', description: '', participants: 0, duration: '', status: 'actif' })
    const ticketForm = ref({ subject: '', user: '', status: 'ouvert', priority: 'moyenne' })
    const editProfileForm = ref({ name: '', email: '', phone: '', location: '' })
    const passwordForm = ref({ current: '', new: '', confirm: '' })
    const opportunityForm = ref({ type: 'bourse', name: '', provider: '', amount: '', country: '', duration: '' })

    // Exam results
    const selectedExam = ref(null)
    const examResults = ref([
      { id: 1, name: 'Jean Dupont', score: 15 },
      { id: 2, name: 'Marie Martin', score: 18 },
      { id: 3, name: 'Pierre Durand', score: 8 },
      { id: 4, name: 'Sophie Bernard', score: 16 },
      { id: 5, name: 'Thomas Petit', score: 12 }
    ])

    const selectedCourse = ref(null)

    // Messages
    const currentConversation = ref(null)
    const currentMessages = ref([])
    const newMessageText = ref('')

    const totalRevenue = computed(() => transactionsList.value.filter(t => t.status === 'payé').reduce((sum, t) => sum + t.amount, 0))

    // Graphiques refs
    const growthChartCanvas = ref(null)
    const pieChartCanvas = ref(null)
    const analyticsChartCanvas = ref(null)
    const analyticsPieCanvas = ref(null)
    let growthChart, pieChart, analyticsChart, analyticsPie

    // Initialisation des graphiques
    const initCharts = () => {
      nextTick(() => {
        // Graphique croissance
        if (growthChartCanvas.value) {
          if (growthChart) growthChart.destroy()
          growthChart = new Chart(growthChartCanvas.value.getContext('2d'), {
            type: 'line',
            data: {
              labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
              datasets: [{ label: 'Utilisateurs', data: [8500, 9200, 10100, 11200, 11900, 12700], borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)', fill: true, tension: 0.4 }]
            },
            options: { responsive: true, maintainAspectRatio: true }
          })
        }

        // Graphique camembert
        if (pieChartCanvas.value) {
          if (pieChart) pieChart.destroy()
          pieChart = new Chart(pieChartCanvas.value.getContext('2d'), {
            type: 'doughnut',
            data: {
              labels: ['Étudiants', 'Formateurs'],
              datasets: [{ data: [usersList.value.filter(u => u.role === 'étudiant').length, teachersList.value.length], backgroundColor: ['#3b82f6', '#8b5cf6'], borderWidth: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } }
          })
        }

        // Graphique analytics
        if (analyticsChartCanvas.value) {
          if (analyticsChart) analyticsChart.destroy()
          analyticsChart = new Chart(analyticsChartCanvas.value.getContext('2d'), {
            type: 'bar',
            data: {
              labels: coursesList.value.slice(0,5).map(c => c.title.substring(0,10)),
              datasets: [{ label: 'Inscriptions', data: coursesList.value.slice(0,5).map(c => c.students), backgroundColor: '#6366f1', borderRadius: 8 }]
            },
            options: { responsive: true, maintainAspectRatio: true }
          })
        }

        // Graphique analytics pie
        if (analyticsPieCanvas.value) {
          if (analyticsPie) analyticsPie.destroy()
          analyticsPie = new Chart(analyticsPieCanvas.value.getContext('2d'), {
            type: 'pie',
            data: {
              labels: ['Cours publiés', 'Cours brouillon'],
              datasets: [{ data: [coursesList.value.filter(c => c.status === 'publié').length, coursesList.value.filter(c => c.status === 'brouillon').length], backgroundColor: ['#10b981', '#f59e0b'] }]
            },
            options: { responsive: true, maintainAspectRatio: true }
          })
        }
      })
    }

    // Upload image cours
    const uploadCourseImage = (e) => {
      const file = e.target.files[0]
      if (file) {
        courseForm.value.imageFile = file
        courseForm.value.imagePreview = URL.createObjectURL(file)
      }
    }

    // Fonctions CRUD Utilisateurs
    const openUserModal = () => { editingUser.value = null; userForm.value = { name: '', email: '', role: 'étudiant', status: 'actif' }; userModalOpen.value = true }
    const editUser = (user) => { editingUser.value = user; userForm.value = { ...user }; userModalOpen.value = true }
    const closeUserModal = () => { userModalOpen.value = false }
    const saveUser = () => {
      if (editingUser.value) { const index = usersList.value.findIndex(u => u.id === editingUser.value.id); usersList.value[index] = { ...userForm.value, id: editingUser.value.id, date: editingUser.value.date }; alert('Utilisateur modifié') }
      else { usersList.value.unshift({ id: Date.now(), ...userForm.value, date: new Date().toISOString().split('T')[0] }); alert('Utilisateur ajouté') }
      closeUserModal()
    }
    const deleteUser = (user) => { if (confirm(`Supprimer ${user.name} ?`)) { usersList.value = usersList.value.filter(u => u.id !== user.id); alert('Utilisateur supprimé') } }
    const toggleUserStatus = (user) => { user.status = user.status === 'actif' ? 'inactif' : 'actif'; alert(`Statut modifié pour ${user.name}`) }

    // Fonctions CRUD Formateurs
    const openTeacherModal = () => { editingTeacher.value = null; teacherForm.value = { name: '', email: '', specialite: '', pays: '' }; teacherModalOpen.value = true }
    const editTeacher = (teacher) => { editingTeacher.value = teacher; teacherForm.value = { name: teacher.name, email: teacher.email, specialite: teacher.specialite, pays: teacher.pays }; teacherModalOpen.value = true }
    const closeTeacherModal = () => { teacherModalOpen.value = false }
    const saveTeacher = () => {
      if (editingTeacher.value) { const index = teachersList.value.findIndex(t => t.id === editingTeacher.value.id); teachersList.value[index] = { ...teachersList.value[index], ...teacherForm.value }; alert('Formateur modifié') }
      else { teachersList.value.unshift({ id: Date.now(), ...teacherForm.value, courses: 0, revenue: 0, status: 'actif' }); alert('Formateur ajouté') }
      closeTeacherModal()
    }
    const suspendTeacher = (teacher) => { teacher.status = teacher.status === 'actif' ? 'inactif' : 'actif'; alert(`Formateur ${teacher.status === 'actif' ? 'activé' : 'suspendu'}`) }

    // Fonctions CRUD Cours
    const openCourseModal = () => { editingCourse.value = null; courseForm.value = { title: '', category: '', price: 0, imagePreview: null, imageFile: null }; courseModalOpen.value = true }
    const editCourse = (course) => { editingCourse.value = course; courseForm.value = { title: course.title, category: course.category, price: course.price, imagePreview: course.image, imageFile: null }; courseModalOpen.value = true }
    const closeCourseModal = () => { courseModalOpen.value = false }
    const saveCourse = () => {
      if (editingCourse.value) { const index = coursesList.value.findIndex(c => c.id === editingCourse.value.id); coursesList.value[index] = { ...coursesList.value[index], title: courseForm.value.title, category: courseForm.value.category, price: courseForm.value.price, image: courseForm.value.imagePreview || coursesList.value[index].image }; alert('Cours modifié') }
      else { coursesList.value.unshift({ id: Date.now(), title: courseForm.value.title, category: courseForm.value.category, price: courseForm.value.price, students: 0, status: 'brouillon', image: courseForm.value.imagePreview || 'https://picsum.photos/200/120?random=' + Date.now() }); alert('Cours ajouté') }
      closeCourseModal()
    }
    const deleteCourse = (course) => { if (confirm(`Supprimer le cours "${course.title}" ?`)) { coursesList.value = coursesList.value.filter(c => c.id !== course.id); alert('Cours supprimé') } }
    const viewCourseDetails = (course) => { selectedCourse.value = course; courseDetailsModalOpen.value = true }
    const closeCourseDetailsModal = () => { courseDetailsModalOpen.value = false }

    // Fonctions Examens
    const openExamModal = () => { editingExam.value = null; examForm.value = { title: '', description: '', participants: 0, duration: '', status: 'actif' }; examModalOpen.value = true }
    const editExam = (exam) => { editingExam.value = exam; examForm.value = { title: exam.title, description: exam.description, participants: exam.participants, duration: exam.duration, status: exam.status }; examModalOpen.value = true }
    const closeExamModal = () => { examModalOpen.value = false }
    const saveExam = () => {
      if (editingExam.value) { const index = examsList.value.findIndex(e => e.id === editingExam.value.id); examsList.value[index] = { ...examForm.value, id: editingExam.value.id }; alert('Examen modifié') }
      else { examsList.value.unshift({ id: Date.now(), ...examForm.value }); alert('Examen ajouté') }
      closeExamModal()
    }
    const deleteExam = (exam) => { if (confirm(`Supprimer l'examen "${exam.title}" ?`)) { examsList.value = examsList.value.filter(e => e.id !== exam.id); alert('Examen supprimé') } }
    const viewExamResults = (exam) => { selectedExam.value = exam; resultsModalOpen.value = true }
    const closeResultsModal = () => { resultsModalOpen.value = false }

    // Fonctions Tickets
    const openTicketModal = () => { editingTicket.value = null; ticketForm.value = { subject: '', user: usersList.value[0]?.name || '', status: 'ouvert', priority: 'moyenne' }; ticketModalOpen.value = true }
    const editTicket = (ticket) => { editingTicket.value = ticket; ticketForm.value = { subject: ticket.subject, user: ticket.user, status: ticket.status, priority: ticket.priority }; ticketModalOpen.value = true }
    const closeTicketModal = () => { ticketModalOpen.value = false }
    const saveTicket = () => {
      if (editingTicket.value) { const index = ticketsList.value.findIndex(t => t.id === editingTicket.value.id); ticketsList.value[index] = { ...ticketForm.value, id: editingTicket.value.id, date: editingTicket.value.date }; alert('Ticket modifié') }
      else { ticketsList.value.unshift({ id: Date.now(), ...ticketForm.value, date: new Date().toISOString().split('T')[0] }); alert('Ticket ajouté') }
      closeTicketModal()
    }
    const deleteTicket = (ticket) => { if (confirm(`Supprimer le ticket #${ticket.id} ?`)) { ticketsList.value = ticketsList.value.filter(t => t.id !== ticket.id); alert('Ticket supprimé') } }
    const resolveTicket = (ticket) => { ticket.status = 'résolu'; alert(`Ticket #${ticket.id} résolu`) }

    // Fonctions Opportunités
    const openOpportunityModal = () => { opportunityForm.value = { type: 'bourse', name: '', provider: '', amount: '', country: '', duration: '' }; opportunityModalOpen.value = true }
    const closeOpportunityModal = () => { opportunityModalOpen.value = false }
    const saveOpportunity = () => {
      if (opportunityForm.value.type === 'bourse') {
        scholarshipsList.value.unshift({ id: Date.now(), name: opportunityForm.value.name, provider: opportunityForm.value.provider, amount: opportunityForm.value.amount })
        alert('Bourse ajoutée')
      } else {
        programsList.value.unshift({ id: Date.now(), name: opportunityForm.value.name, country: opportunityForm.value.country, duration: opportunityForm.value.duration })
        alert('Programme ajouté')
      }
      closeOpportunityModal()
    }
    const deleteScholarship = (s) => { if (confirm(`Supprimer la bourse "${s.name}" ?`)) { scholarshipsList.value = scholarshipsList.value.filter(b => b.id !== s.id); alert('Bourse supprimée') } }
    const deleteProgram = (p) => { if (confirm(`Supprimer le programme "${p.name}" ?`)) { programsList.value = programsList.value.filter(pr => pr.id !== p.id); alert('Programme supprimé') } }

    // Exports Excel et PDF
    const exportFinanceExcel = () => {
      const wsData = transactionsList.value.map(t => ({ ID: t.id, Utilisateur: t.user, Type: t.type, Montant: t.amount, Méthode: t.method, Statut: t.status, Date: t.date }))
      const ws = XLSX.utils.json_to_sheet(wsData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Transactions')
      XLSX.writeFile(wb, `transactions_${new Date().toISOString().split('T')[0]}.xlsx`)
      alert('Export Excel terminé')
    }

    const exportAnalyticsExcel = () => {
      const wsData = coursesList.value.map(c => ({ Cours: c.title, Catégorie: c.category, Prix: c.price, Inscrits: c.students, Statut: c.status }))
      const ws = XLSX.utils.json_to_sheet(wsData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Analytiques')
      XLSX.writeFile(wb, `analytiques_${new Date().toISOString().split('T')[0]}.xlsx`)
      alert('Export Excel terminé')
    }

    const exportAnalyticsPDF = () => {
      const doc = new jsPDF()
      doc.text('Rapport Analytiques', 20, 20)
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30)
      doc.autoTable({
        startY: 40,
        head: [['Cours', 'Catégorie', 'Prix (FCFA)', 'Inscrits', 'Statut']],
        body: coursesList.value.map(c => [c.title, c.category, c.price, c.students, c.status])
      })
      doc.save(`analytiques_${new Date().toISOString().split('T')[0]}.pdf`)
      alert('Export PDF terminé')
    }

    // Fonctions Profil
    const openEditProfileModal = () => { editProfileForm.value = { ...adminProfile.value }; editProfileModalOpen.value = true }
    const closeEditProfileModal = () => { editProfileModalOpen.value = false }
    const saveProfile = () => { adminProfile.value = { ...editProfileForm.value }; alert('Profil modifié avec succès'); closeEditProfileModal() }
    
    const openChangePasswordModal = () => { passwordForm.value = { current: '', new: '', confirm: '' }; changePasswordModalOpen.value = true }
    const closeChangePasswordModal = () => { changePasswordModalOpen.value = false }
    const savePassword = () => {
      if (passwordForm.value.new !== passwordForm.value.confirm) { alert('Les nouveaux mots de passe ne correspondent pas'); return }
      if (passwordForm.value.new.length < 6) { alert('Le mot de passe doit contenir au moins 6 caractères'); return }
      alert('Mot de passe changé avec succès')
      closeChangePasswordModal()
    }

    // Fonctions Messages
    const openMessageModal = () => { alert('Nouveau message') }
    const selectConversation = (conv) => { currentConversation.value = conv; currentMessages.value = messagesMap.value[conv.id] || [] }
    const sendMessage = () => { if (newMessageText.value.trim() && currentConversation.value) { currentMessages.value.push({ id: Date.now(), sender: 'admin', content: newMessageText.value, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }); newMessageText.value = ''; alert('Message envoyé') } }

    // Exports
    const exportData = () => { alert('Export des données en cours...') }

    const formatMoney = (amount) => { return new Intl.NumberFormat('fr-FR').format(amount) }
    const toggleDarkMode = () => { isDarkMode.value = !isDarkMode.value; document.documentElement.classList.toggle('dark', isDarkMode.value) }
    const toggleLanguage = () => { currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr'; alert(`Langue changée: ${currentLang.value === 'fr' ? 'Français' : 'English'}`) }
    const logout = () => { alert('Déconnexion') }

    // Initialisation des graphiques analytics
const initAnalyticsCharts = () => {
  setTimeout(() => {
    // Graphique à barres
    if (analyticsChartCanvas.value) {
      try {
        if (analyticsChart) {
          analyticsChart.destroy()
        }
        const ctx = analyticsChartCanvas.value.getContext('2d')
        analyticsChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: coursesList.value.slice(0,6).map(c => c.title.substring(0,12)),
            datasets: [{
              label: 'Nombre d\'inscriptions',
              data: coursesList.value.slice(0,6).map(c => c.students),
              backgroundColor: '#6366f1',
              borderRadius: 8,
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { position: 'top' }
            }
          }
        })
        console.log('Graphique analytics initialisé')
      } catch (error) {
        console.error('Erreur graphique analytics:', error)
      }
    }

    // Graphique camembert
    if (analyticsPieCanvas.value) {
      try {
        if (analyticsPie) {
          analyticsPie.destroy()
        }
        const ctx = analyticsPieCanvas.value.getContext('2d')
        analyticsPie = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Cours publiés', 'Cours brouillon'],
            datasets: [{
              data: [
                coursesList.value.filter(c => c.status === 'publié').length,
                coursesList.value.filter(c => c.status === 'brouillon').length
              ],
              backgroundColor: ['#10b981', '#f59e0b'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        })
        console.log('Graphique camembert analytics initialisé')
      } catch (error) {
        console.error('Erreur graphique camembert analytics:', error)
      }
    }
  }, 500)
}

    
onMounted(() => {
  setTimeout(() => {
    initCharts()
    initAnalyticsCharts()
  }, 1000)
})

// Surveiller le changement d'onglet
watch(activeSection, (newVal) => {
  if (newVal === 'dashboard') {
    setTimeout(() => initCharts(), 500)
  }
  if (newVal === 'analytics') {
    setTimeout(() => initAnalyticsCharts(), 500)
  }
})

    return {
      isDarkMode, sidebarCollapsed, activeSection, showNotifications, currentLang, unreadCount,
      adminProfile, adminInitials, navItems, activeMenuTitle,
      usersList, teachersList, coursesList, examsList, transactionsList,
      scholarshipsList, programsList, ticketsList, activities, notifications,
      conversationsList, currentConversation, currentMessages, newMessageText,
      userModalOpen, teacherModalOpen, courseModalOpen, examModalOpen, ticketModalOpen, editProfileModalOpen, changePasswordModalOpen, opportunityModalOpen, resultsModalOpen, courseDetailsModalOpen,
      editingUser, editingTeacher, editingCourse, editingExam, editingTicket,
      userForm, teacherForm, courseForm, examForm, ticketForm, editProfileForm, passwordForm, opportunityForm, totalRevenue,
      selectedExam, examResults, selectedCourse,
      growthChartCanvas, pieChartCanvas, analyticsChartCanvas, analyticsPieCanvas,
      uploadCourseImage,
      openUserModal, editUser, closeUserModal, saveUser, deleteUser, toggleUserStatus,
      openTeacherModal, editTeacher, closeTeacherModal, saveTeacher, suspendTeacher,
      openCourseModal, editCourse, closeCourseModal, saveCourse, deleteCourse, viewCourseDetails, closeCourseDetailsModal,
      openExamModal, editExam, closeExamModal, saveExam, deleteExam, viewExamResults, closeResultsModal,
      openTicketModal, editTicket, closeTicketModal, saveTicket, deleteTicket, resolveTicket,
      openOpportunityModal, closeOpportunityModal, saveOpportunity, deleteScholarship, deleteProgram,
      openMessageModal, selectConversation, sendMessage,
      openEditProfileModal, closeEditProfileModal, saveProfile,
      openChangePasswordModal, closeChangePasswordModal, savePassword,
      exportFinanceExcel, exportAnalyticsExcel, exportAnalyticsPDF, exportData,
      analyticsChartCanvas: ref(null),
      analyticsPieCanvas: ref(null),
      formatMoney, toggleDarkMode, toggleLanguage, logout
    }
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.sidebar-item.active { background: linear-gradient(135deg, rgba(79,70,229,0.2), rgba(6,182,212,0.2)); border-left: 3px solid #4f46e5; }
.dark .bg-white { background-color: #1f2937; }
.dark .text-slate-900, .dark .text-slate-800, .dark .text-slate-950 { color: #f3f4f6; }
.dark .bg-slate-50, .dark .bg-slate-100 { background-color: #374151; }
.dark .border-slate-200 { border-color: #4b5563; }
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
<template>
  <div :class="['flex h-screen', isDarkMode ? 'dark' : '']">
    <!-- Bouton pour mobile - Menu hamburger -->
    <button 
      @click="mobileSidebarOpen = !mobileSidebarOpen" 
      class="fixed bottom-4 right-4 z-50 md:hidden bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
    >
      <i class="fas fa-bars text-xl"></i>
    </button>

    <!-- Sidebar - Responsive -->
    <aside 
      :class="[
        'fixed md:relative z-40 w-64 h-full transition-transform duration-300 ease-in-out flex flex-col shrink-0 overflow-hidden',
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-r border-slate-200',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <button 
        @click="mobileSidebarOpen = false" 
        class="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-50"
      >
        <i class="fas fa-times text-xl"></i>
      </button>

      <!-- Logo Section -->
      <div :class="['p-4 md:p-6 border-b', isDarkMode ? 'border-gray-700' : 'border-slate-200']">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 md:w-10 md:h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl">
            <i class="fas fa-chalkboard-user text-white text-sm md:text-base"></i>
          </div>
          <span :class="['font-bold text-lg md:text-xl tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">Gradus Aura</span>
          <span class="text-[8px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">Formateur</span>
        </div>
        
        <div :class="['grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 rounded-2xl border mt-4 md:mt-6', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
          <div class="text-center py-1 md:py-2">
            <p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Étudiants</p>
            <p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ studentsList.length }}</p>
          </div>
          <div class="text-center py-1 md:py-2 border-x border-slate-200">
            <p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Cours</p>
            <p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ coursesList.length }}</p>
          </div>
          <div class="text-center py-1 md:py-2">
            <p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Certificats</p>
            <p class="text-[8px] md:text-[10px] font-bold text-emerald-600">{{ certificationsList.length }}</p>
          </div>
        </div>
      </div>
      
      <!-- Navigation Formateur -->
      <nav class="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6 custom-scrollbar">
        <div class="space-y-1">
          <p class="px-2 md:px-4 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 md:mb-4">APERÇU</p>
          <div @click="activeTab = 'dashboard'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'dashboard' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-tachometer-alt w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">Tableau de bord</span>
          </div>
        </div>
        
        <div class="space-y-1">
          <p class="px-2 md:px-4 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 md:mb-4">GESTION</p>
          <div @click="activeTab = 'courses'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'courses' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-book-open w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">Mes cours</span>
          </div>
          <div @click="activeTab = 'students'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'students' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-users w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">Étudiants</span>
          </div>
          <div @click="activeTab = 'certifications'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'certifications' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-certificate w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">Certifications</span>
          </div>
          <div @click="activeTab = 'messages'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'messages' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-envelope w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">Messages</span>
          </div>
        </div>
        
        <div class="space-y-1">
          <p class="px-2 md:px-4 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 md:mb-4">SYSTÈME</p>
          <div @click="activeTab = 'profile'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'profile' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-user w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">Mon profil</span>
          </div>
          <div @click="activeTab = 'settings'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'settings' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-cog w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">Paramètres</span>
          </div>
        </div>
      </nav>
      
      <!-- Footer Sidebar -->
      <div :class="['p-3 md:p-4 border-t', isDarkMode ? 'border-gray-700' : 'border-slate-100']">
        <div class="flex items-center gap-2 md:gap-3">
          <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">{{ userInitials }}</div>
          <div class="flex-1">
            <p :class="['text-[10px] md:text-xs font-bold truncate', isDarkMode ? 'text-white' : 'text-slate-950']">{{ userFullname }}</p>
            <p :class="['text-[8px] md:text-[10px] truncate', isDarkMode ? 'text-gray-400' : 'text-slate-500']">{{ userEmail }}</p>
          </div>
        </div>
        <button @click="logout" class="w-full mt-3 md:mt-4 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition text-[10px] md:text-[12px]">
          <i class="fas fa-sign-out-alt"></i>
          <span class="font-black uppercase tracking-widest">Déconnexion</span>
        </button>
      </div>
    </aside>
    
    <!-- Overlay pour mobile -->
    <div 
      v-if="mobileSidebarOpen" 
      class="fixed inset-0 bg-black/50 z-30 md:hidden"
      @click="mobileSidebarOpen = false"
    ></div>
    
    <!-- Main Content -->
    <main :class="['flex-1 overflow-y-auto custom-scrollbar', isDarkMode ? 'bg-gray-900' : 'bg-slate-50']">
      <!-- Header -->
      <header :class="['sticky top-0 z-10 backdrop-blur-sm border-b px-4 md:px-8 py-3 md:py-4', 
        isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-slate-100']">
        <div class="flex justify-between items-center">
          <div>
            <h1 :class="['text-xl md:text-2xl font-black tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">{{ activeTabTitle }}</h1>
            <div class="flex items-center gap-2 md:gap-3 mt-1">
              <div class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Mode Formateur</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2 md:gap-4">
            <div class="relative cursor-pointer" @click="activeTab = 'messages'">
              <i class="fas fa-envelope text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
              <span class="absolute -top-1 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-[6px] md:text-[8px] font-bold rounded-full flex items-center justify-center">{{ unreadMessagesCount }}</span>
            </div>
            <div class="relative cursor-pointer" @click="openSettingsModal">
              <i class="fas fa-cog text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
            </div>
            <div class="flex items-center gap-2 md:gap-3 ml-1 md:ml-2 cursor-pointer" @click="activeTab = 'profile'">
              <div class="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                {{ userInitials }}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- ==================== DASHBOARD ==================== -->
      <div v-if="activeTab === 'dashboard'" class="p-3 md:p-8">
        <!-- Alerte de bienvenue -->
        <div v-if="showWelcomeAlert" class="mb-6 animate-fade-in-up">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl p-4">
            <div class="flex items-center gap-3">
              <i class="fas fa-smile-wink text-green-500 text-2xl"></i>
              <div class="flex-1">
                <p class="font-bold text-gray-800">Bienvenue, {{ userFullname }} ! 👋</p>
                <p class="text-sm text-gray-600">Heureux de vous revoir. Voici un résumé de votre activité récente.</p>
              </div>
              <button @click="showWelcomeAlert = false" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Cartes statistiques -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer" @click="activeTab = 'students'">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-users text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+12%</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Total étudiants</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ studentsList.length }}</h3>
          </div>
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer" @click="activeTab = 'courses'">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-book-open text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ activeCoursesCount }}</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Cours actifs</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ coursesList.length }}</h3>
          </div>
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer" @click="activeTab = 'certifications'">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-certificate text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ totalCertificatesDelivered }}</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Certificats délivrés</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ certificationsList.length }}</h3>
          </div>
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer" @click="activeTab = 'messages'">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-envelope text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">{{ unreadMessagesCount }}</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Messages non lus</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ messagesList.length }}</h3>
          </div>
        </div>
        
        <!-- Graphiques et activités -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
            <div class="flex justify-between items-center mb-4 md:mb-6">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950">Progression des étudiants</h3>
              <i class="fas fa-chart-line text-slate-400 text-sm md:text-base"></i>
            </div>
            <canvas ref="progressChartCanvas" height="200" class="w-full"></canvas>
          </div>
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
            <div class="flex justify-between items-center mb-4 md:mb-6">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950">Derniers étudiants inscrits</h3>
              <i class="fas fa-users text-slate-400 text-sm md:text-base"></i>
            </div>
            <div class="space-y-3">
              <div v-for="student in recentStudents" :key="student.id" class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {{ student.initials }}
                  </div>
                  <div>
                    <p class="font-bold text-sm">{{ student.name }}</p>
                    <p class="text-xs text-gray-500">Inscrit le {{ student.dateInscription }}</p>
                  </div>
                </div>
                <button @click="contactStudent(student)" class="text-primary text-sm">
                  <i class="fas fa-envelope"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Dernières activités -->
        <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div class="p-3 md:p-6 border-b border-slate-50">
            <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-950">Activités récentes</h3>
          </div>
          <div class="divide-y divide-slate-50">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 p-3 md:p-4 hover:bg-blue-50/30 transition">
              <i :class="activity.icon" class="text-primary text-lg"></i>
              <div class="flex-1">
                <p class="text-sm text-slate-800">{{ activity.description }}</p>
                <p class="text-xs text-slate-400">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- ==================== MES COURS ==================== -->
      <div v-if="activeTab === 'courses'" class="p-3 md:p-8">
        <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
          <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-book-open mr-2"></i> Mes cours</p>
          <button @click="openAddCourseModal" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition">
            <i class="fas fa-plus mr-2"></i> Nouveau cours
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div v-for="course in coursesList" :key="course.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition">
            <div class="flex justify-between items-start mb-3">
              <i :class="course.icon" class="text-primary text-2xl md:text-3xl"></i>
              <span :class="course.status === 'Publié' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'" class="px-2 py-1 rounded-full text-xs font-bold">{{ course.status }}</span>
            </div>
            <h3 class="font-bold text-base md:text-lg">{{ course.title }}</h3>
            <p class="text-sm text-slate-500 mt-1">{{ course.description }}</p>
            <div class="mt-3">
              <div class="flex justify-between text-xs mb-1">
                <span class="text-slate-500">Progression création</span>
                <span class="font-bold text-primary">{{ course.progress }}%</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-1.5">
                <div class="bg-primary h-1.5 rounded-full" :style="{ width: course.progress + '%' }"></div>
              </div>
            </div>
            <div class="flex gap-2 mt-4">
              <button @click="editCourse(course)" class="flex-1 py-1.5 border border-primary text-primary rounded-lg text-[10px] font-bold hover:bg-primary/10 transition">
                <i class="fas fa-edit mr-1"></i> Modifier
              </button>
              <button @click="viewCourse(course)" class="flex-1 py-1.5 gradient-bg text-white rounded-lg text-[10px] font-bold hover:shadow-md transition">
                <i class="fas fa-eye mr-1"></i> Voir
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- ==================== ÉTUDIANTS ==================== -->
      <div v-if="activeTab === 'students'" class="p-3 md:p-8">
        <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
          <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-users mr-2"></i> Mes étudiants</p>
          <div class="flex gap-2">
            <input type="text" v-model="studentSearch" placeholder="Rechercher..." class="px-4 py-2 rounded-xl border border-slate-200 text-sm w-64 focus:outline-none focus:border-primary">
            <select v-model="studentFilter" class="px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary">
              <option value="all">Tous</option>
              <option value="actif">Actifs</option>
              <option value="inactif">Inactifs</option>
            </select>
          </div>
        </div>
        <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead :class="['border-b', isDarkMode ? 'border-gray-700' : 'border-slate-100']">
              <tr class="text-left">
                <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">Étudiant</th>
                <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">Progression</th>
                <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">Score</th>
                <th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-blue-50/30 transition">
                <td class="p-3 md:p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">{{ student.initials }}</div>
                    <span class="font-medium text-sm text-slate-800">{{ student.name }}</span>
                  </div>
                </td>
                <td class="p-3 md:p-4 text-sm text-slate-600">{{ student.email }}</td>
                <td class="p-3 md:p-4">
                  <div class="flex items-center gap-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                      <div class="bg-primary h-2 rounded-full" :style="{ width: student.progress + '%' }"></div>
                    </div>
                    <span class="text-xs">{{ student.progress }}%</span>
                  </div>
                </td>
                <td class="p-3 md:p-4">
                  <span :class="student.averageScore >= 70 ? 'text-emerald-600' : 'text-orange-600'" class="font-bold text-sm">{{ student.averageScore }}%</span>
                </td>
                <td class="p-3 md:p-4">
                  <div class="flex gap-2">
                    <button @click="viewStudent(student)" class="text-blue-600 hover:text-blue-800"><i class="fas fa-eye"></i></button>
                    <button @click="contactStudent(student)" class="text-green-600 hover:text-green-800"><i class="fas fa-envelope"></i></button>
                    <button @click="deliverCertificateToStudent(student)" class="text-purple-600 hover:text-purple-800"><i class="fas fa-certificate"></i></button>
                  </div>
                </td>
               </tr>
            </tbody>
           </table>
        </div>
      </div>
      
      <!-- ==================== CERTIFICATIONS (avec lien vers /e-learning/certificat) ==================== -->
      <div v-if="activeTab === 'certifications'" class="p-3 md:p-8">
        <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
          <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-certificate mr-2"></i> Certifications</p>
          <a href="/e-learning/certificat" target="_blank" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition inline-flex items-center gap-2">
            <i class="fas fa-external-link-alt mr-1"></i> Accéder aux certificats
          </a>
        </div>
        
        <!-- Statistiques rapides -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-6 border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Certifications</p>
                <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ certificationsList.length }}</h3>
              </div>
              <div class="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center"><i class="fas fa-certificate text-purple-600 text-lg"></i></div>
            </div>
          </div>
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-6 border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Certificats délivrés</p>
                <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ totalCertificatesDelivered }}</h3>
              </div>
              <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center"><i class="fas fa-check-circle text-emerald-600 text-lg"></i></div>
            </div>
          </div>
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-6 border border-slate-100 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Taux complétion</p>
                <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ certificationCompletionRate }}%</h3>
              </div>
              <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"><i class="fas fa-chart-line text-blue-600 text-lg"></i></div>
            </div>
          </div>
        </div>
        
        <!-- Liste des certifications -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div v-for="certif in certificationsList" :key="certif.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <i class="fas fa-certificate text-white text-xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-base md:text-lg">{{ certif.title }}</h3>
                <p class="text-sm text-slate-500">{{ certif.courseName }}</p>
              </div>
            </div>
            <p class="text-sm text-slate-600 mb-3">{{ certif.description }}</p>
            <div class="flex justify-between items-center text-xs text-slate-500 mb-3">
              <span><i class="fas fa-users mr-1"></i> Délivrés: {{ certif.deliveredCount }}</span>
              <span><i class="fas fa-chart-line mr-1"></i> Score requis: {{ certif.requiredScore }}%</span>
            </div>
            <div class="flex gap-2 mt-2">
              <button @click="editCertification(certif)" class="flex-1 py-2 border border-primary text-primary rounded-lg text-[11px] font-bold hover:bg-primary/10 transition">
                <i class="fas fa-edit mr-1"></i> Modifier
              </button>
              <a :href="'/e-learning/certificat/' + certif.id" target="_blank" class="flex-1 py-2 bg-primary text-white rounded-lg text-[11px] font-bold hover:bg-indigo-700 transition text-center">
                <i class="fas fa-eye mr-1"></i> Voir
              </a>
            </div>
          </div>
        </div>
        
        <!-- Lien supplémentaire -->
        <div class="mt-6 text-center">
          <a href="/e-learning/certificat" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition">
            <i class="fas fa-external-link-alt"></i>
            Accéder à l'espace complet des certificats
          </a>
        </div>
      </div>
      
      <!-- ==================== MESSAGES ==================== -->
      <div v-if="activeTab === 'messages'" class="p-3 md:p-8">
        <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950 mb-4 md:mb-6"><i class="fas fa-envelope mr-2"></i> Messages</p>
        
        <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div class="flex flex-col md:flex-row h-[600px]">
            <div class="w-full md:w-1/3 border-r border-slate-100 overflow-y-auto">
              <div class="p-4 border-b bg-slate-50">
                <div class="relative">
                  <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                  <input type="text" v-model="messageSearch" placeholder="Rechercher..." class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm">
                </div>
              </div>
              <div v-for="msg in filteredMessages" :key="msg.id" @click="selectedMessage = msg" :class="['p-4 cursor-pointer transition-all', selectedMessage?.id === msg.id ? 'bg-gradient-to-r from-indigo-50 to-cyan-50 border-r-4 border-primary' : 'hover:bg-slate-50']">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">{{ msg.initials }}</div>
                  <div class="flex-1">
                    <p class="font-bold text-sm">{{ msg.from }}</p>
                    <p class="text-xs text-slate-500 truncate">{{ msg.message }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-[10px] text-slate-400">{{ msg.time }}</p>
                    <span v-if="!msg.read" class="w-2 h-2 bg-red-500 rounded-full inline-block mt-1"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-1 flex flex-col">
              <div v-if="selectedMessage" class="flex-1 flex flex-col">
                <div class="p-4 border-b bg-slate-50">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-bold">{{ selectedMessage.from }}</p>
                      <p class="text-xs text-slate-500">{{ selectedMessage.email }}</p>
                    </div>
                    <button @click="markMessageAsRead(selectedMessage.id)" class="text-primary text-sm">
                      <i class="fas fa-check-double"></i> Marquer comme lu
                    </button>
                  </div>
                </div>
                <div class="flex-1 overflow-y-auto p-4">
                  <div class="bg-slate-50 rounded-xl p-4">
                    <p class="text-gray-700">{{ selectedMessage.message }}</p>
                    <p class="text-xs text-slate-400 mt-3">Reçu le {{ selectedMessage.date }}</p>
                  </div>
                </div>
                <div class="p-4 border-t flex gap-2 bg-white">
                  <textarea v-model="replyText" rows="2" placeholder="Écrivez votre réponse..." class="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"></textarea>
                  <button @click="sendReply" class="px-5 py-2 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
              <div v-else class="flex-1 flex flex-col items-center justify-center text-slate-400">
                <i class="fas fa-comment-dots text-5xl mb-4"></i>
                <p>Sélectionnez un message</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- ==================== MON PROFIL ==================== -->
      <div v-if="activeTab === 'profile'" class="p-3 md:p-8">
        <div class="flex justify-between items-center mb-4 md:mb-6">
          <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-user mr-2"></i> Mon profil</p>
          <button @click="openEditProfileModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">Modifier</button>
        </div>
        <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 md:mb-8">
            <div class="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold">{{ userInitials }}</div>
            <div class="text-center sm:text-left">
              <h3 class="text-xl md:text-2xl font-bold text-slate-950">{{ userFullname }}</h3>
              <p class="text-slate-500 text-sm md:text-base">{{ userEmail }}</p>
              <p class="text-xs text-slate-400 mt-1">Formateur depuis {{ memberSince }}</p>
              <span class="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider">Formateur</span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div class="space-y-3 md:space-y-4">
              <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom complet</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userFullname }}</p></div>
              <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userEmail }}</p></div>
              <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Téléphone</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userPhone || 'Non renseigné' }}</p></div>
            </div>
            <div class="space-y-3 md:space-y-4">
              <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Ville</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userCity || 'Yaoundé' }}</p></div>
              <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</label><p class="text-emerald-600 font-medium mt-1"><i class="fas fa-circle text-[6px] mr-1"></i> Actif</p></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- ==================== PARAMÈTRES ==================== -->
      <div v-if="activeTab === 'settings'" class="p-3 md:p-8">
        <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950 mb-4 md:mb-6"><i class="fas fa-cog mr-2"></i> Paramètres</p>
        
        <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8 max-w-2xl">
          <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50 mb-4">
            <div>
              <p class="font-bold text-sm">Thème sombre</p>
              <p class="text-xs text-slate-500">Activer le mode sombre</p>
            </div>
            <button @click="toggleTheme" class="w-12 h-6 rounded-full transition-colors" :class="isDarkMode ? 'bg-primary' : 'bg-slate-300'">
              <div class="w-5 h-5 bg-white rounded-full transition-transform" :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"></div>
            </button>
          </div>
          
          <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50 mb-4">
            <div>
              <p class="font-bold text-sm">Langue</p>
              <p class="text-xs text-slate-500">Français / English</p>
            </div>
            <button @click="toggleLanguage" class="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold">{{ currentLanguage === 'fr' ? 'FR' : 'EN' }}</button>
          </div>
          
          <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50">
            <div>
              <p class="font-bold text-sm">Notifications</p>
              <p class="text-xs text-slate-500">Recevoir les alertes par email</p>
            </div>
            <button @click="toggleEmailNotifications" class="w-12 h-6 rounded-full transition-colors" :class="emailNotificationsEnabled ? 'bg-primary' : 'bg-slate-300'">
              <div class="w-5 h-5 bg-white rounded-full transition-transform" :class="emailNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'"></div>
            </button>
          </div>
          
          <div class="border-t border-slate-100 pt-4 mt-4">
            <button @click="openChangePasswordModal" class="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 transition flex items-center gap-3">
              <i class="fas fa-lock text-slate-500 w-5"></i>
              <span class="text-sm font-medium">Changer le mot de passe</span>
            </button>
          </div>
        </div>
      </div>
    </main>
    
    <!-- ==================== MODALES ==================== -->
    
    <!-- MODALE AJOUT COURS -->
    <div v-if="addCourseModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeAddCourseModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden">
        <div class="p-5 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-book-open text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black">Nouveau cours</h2>
          </div>
        </div>
        <div class="p-5 space-y-4">
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Titre</label>
            <input type="text" v-model="newCourse.title" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
          </div>
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Description</label>
            <textarea v-model="newCourse.description" rows="3" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"></textarea>
          </div>
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Catégorie</label>
            <select v-model="newCourse.category" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
              <option value="Préparation concours">Préparation concours</option>
              <option value="Langues">Langues</option>
              <option value="Informatique">Informatique</option>
            </select>
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="addCourse" class="flex-1 py-2 bg-primary text-white rounded-xl font-bold">Créer</button>
            <button @click="closeAddCourseModal" class="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODALE ÉDITION PROFIL -->
    <div v-if="editProfileModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeEditProfileModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden">
        <div class="p-5 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-user-edit text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black">Modifier profil</h2>
          </div>
        </div>
        <div class="p-5 space-y-4">
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Nom complet</label>
            <input type="text" v-model="editProfileForm.fullname" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
          </div>
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Email</label>
            <input type="email" v-model="editProfileForm.email" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
          </div>
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Téléphone</label>
            <input type="tel" v-model="editProfileForm.phone" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="saveProfile" class="flex-1 py-2 bg-primary text-white rounded-xl font-bold">Enregistrer</button>
            <button @click="closeEditProfileModal" class="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODALE CHANGEMENT MOT DE PASSE -->
    <div v-if="changePasswordModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeChangePasswordModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden">
        <div class="p-5 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-lock text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black">Changer mot de passe</h2>
          </div>
        </div>
        <div class="p-5 space-y-4">
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Mot de passe actuel</label>
            <input type="password" v-model="passwordForm.current" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
          </div>
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Nouveau mot de passe</label>
            <input type="password" v-model="passwordForm.new" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
          </div>
          <div>
            <label class="text-xs font-bold text-slate-400 block mb-1">Confirmer</label>
            <input type="password" v-model="passwordForm.confirm" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="changePassword" class="flex-1 py-2 bg-primary text-white rounded-xl font-bold">Changer</button>
            <button @click="closeChangePasswordModal" class="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODALE PARAMÈTRES RAPIDES -->
    <div v-if="settingsModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeSettingsModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-cog text-white text-lg"></i></div><h2 class="text-lg font-black">Paramètres rapides</h2></div>
          <button @click="closeSettingsModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50"><div><p class="font-bold text-sm">Thème</p><p class="text-xs text-slate-500">{{ isDarkMode ? 'Sombre' : 'Clair' }}</p></div><button @click="toggleTheme" class="w-12 h-6 rounded-full transition-colors shadow-inner" :class="isDarkMode ? 'bg-primary' : 'bg-slate-300'"><div class="w-5 h-5 bg-white rounded-full transition-transform shadow-md" :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"></div></button></div>
          <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50"><div><p class="font-bold text-sm">Langue</p><p class="text-xs text-slate-500">{{ currentLanguage === 'fr' ? 'Français' : 'English' }}</p></div><button @click="toggleLanguage" class="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition">{{ currentLanguage === 'fr' ? 'FR' : 'EN' }}</button></div>
          <div class="border-t border-slate-100 pt-3 space-y-1">
            <button @click="activeTab = 'settings'; closeSettingsModal()" class="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 transition flex items-center gap-3"><i class="fas fa-cog text-slate-500 w-5"></i><span class="text-sm font-medium">Paramètres complets</span></button>
            <button @click="activeTab = 'profile'; closeSettingsModal()" class="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 transition flex items-center gap-3"><i class="fas fa-user text-slate-500 w-5"></i><span class="text-sm font-medium">Mon profil</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Chart from 'chart.js/auto';

const router = useRouter();
const store = useStore();

// ==================== ÉTATS ====================
const mobileSidebarOpen = ref(false);
const activeTab = ref('dashboard');
const isDarkMode = ref(false);
const currentLanguage = ref('fr');
const showWelcomeAlert = ref(true);
const studentSearch = ref('');
const studentFilter = ref('all');
const messageSearch = ref('');
const replyText = ref('');
const selectedMessage = ref(null);
const emailNotificationsEnabled = ref(true);

// Chart refs
const progressChartCanvas = ref(null);
let progressChart = null;

// Modales
const addCourseModalOpen = ref(false);
const editProfileModalOpen = ref(false);
const changePasswordModalOpen = ref(false);
const settingsModalOpen = ref(false);

// Données utilisateur
const userFullname = computed(() => store.getters.user?.fullname || 'Formateur');
const userEmail = computed(() => store.getters.user?.email || 'formateur@gradusaura.com');
const userRole = computed(() => store.getters.user?.role || 'formateur');
const userInitials = computed(() => userFullname.value.charAt(0).toUpperCase());
const userPhone = ref('+237 699 000 000');
const userCity = ref('Yaoundé');
const memberSince = ref('Janvier 2025');

// Données de démonstration
const coursesList = ref([
  { id: 1, title: 'Préparation TCF Canada', description: 'Formation complète pour le TCF Canada', icon: 'fas fa-language', status: 'Publié', progress: 100, students: 45 },
  { id: 2, title: 'Mathématiques Concours', description: 'Préparation aux épreuves de mathématiques', icon: 'fas fa-calculator', status: 'Publié', progress: 100, students: 38 },
  { id: 3, title: 'Culture Générale', description: 'Révision complète de culture générale', icon: 'fas fa-globe', status: 'En création', progress: 65, students: 0 }
]);

const studentsList = ref([
  { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', initials: 'JD', coursesCount: 3, progress: 75, averageScore: 82, status: 'actif', dateInscription: '2025-03-15' },
  { id: 2, name: 'Marie Claire', email: 'marie.claire@email.com', initials: 'MC', coursesCount: 2, progress: 60, averageScore: 78, status: 'actif', dateInscription: '2025-03-12' },
  { id: 3, name: 'Paul Ngono', email: 'paul.ngono@email.com', initials: 'PN', coursesCount: 4, progress: 45, averageScore: 65, status: 'actif', dateInscription: '2025-03-10' }
]);

const certificationsList = ref([
  { id: 1, title: 'Certification TCF Canada', description: 'Atteste d\'un niveau B2 en français', courseName: 'Préparation TCF Canada', requiredScore: 75, deliveredCount: 28 },
  { id: 2, title: 'Certification Mathématiques', description: 'Maîtrise des concepts avancés', courseName: 'Mathématiques Concours', requiredScore: 70, deliveredCount: 15 }
]);

const messagesList = ref([
  { id: 1, from: 'Jean Dupont', email: 'jean.dupont@email.com', initials: 'JD', message: 'Bonjour, quand aura lieu le prochain cours ?', time: '10:30', date: '2025-03-16 10:30', read: false },
  { id: 2, from: 'Marie Claire', email: 'marie.claire@email.com', initials: 'MC', message: 'Merci pour votre aide !', time: 'Hier', date: '2025-03-15 14:20', read: false }
]);

const recentActivities = ref([
  { id: 1, icon: 'fas fa-user-plus', description: 'Nouvel étudiant inscrit: Jean Dupont', time: 'Il y a 5 minutes' },
  { id: 2, icon: 'fas fa-certificate', description: 'Certificat délivré à Marie Claire', time: 'Il y a 1 heure' },
  { id: 3, icon: 'fas fa-book-open', description: 'Nouveau cours créé: Culture Générale', time: 'Il y a 3 heures' }
]);

// Formulaires
const newCourse = ref({ title: '', description: '', category: 'Préparation concours' });
const editProfileForm = ref({ fullname: '', email: '', phone: '' });
const passwordForm = ref({ current: '', new: '', confirm: '' });

// Computed
const activeCoursesCount = computed(() => coursesList.value.filter(c => c.status === 'Publié').length);
const totalCertificatesDelivered = computed(() => certificationsList.value.reduce((sum, c) => sum + c.deliveredCount, 0));
const certificationCompletionRate = computed(() => Math.round(78));
const unreadMessagesCount = computed(() => messagesList.value.filter(m => !m.read).length);
const recentStudents = computed(() => studentsList.value.slice(0, 3));
const filteredStudents = computed(() => {
  let result = studentsList.value;
  if (studentSearch.value) {
    result = result.filter(s => s.name.toLowerCase().includes(studentSearch.value.toLowerCase()));
  }
  if (studentFilter.value !== 'all') {
    result = result.filter(s => s.status === studentFilter.value);
  }
  return result;
});
const filteredMessages = computed(() => {
  if (!messageSearch.value) return messagesList.value;
  return messagesList.value.filter(m => m.from.toLowerCase().includes(messageSearch.value.toLowerCase()));
});
const activeTabTitle = computed(() => {
  const titles = {
    dashboard: 'Tableau de bord',
    courses: 'Mes cours',
    students: 'Étudiants',
    certifications: 'Certifications',
    messages: 'Messages',
    profile: 'Mon profil',
    settings: 'Paramètres'
  };
  return titles[activeTab.value] || 'Tableau de bord';
});

// ==================== FONCTIONS ====================
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'fr' ? 'en' : 'fr';
  localStorage.setItem('language', currentLanguage.value);
};

const toggleEmailNotifications = () => {
  emailNotificationsEnabled.value = !emailNotificationsEnabled.value;
};

const openAddCourseModal = () => { addCourseModalOpen.value = true; };
const closeAddCourseModal = () => { addCourseModalOpen.value = false; newCourse.value = { title: '', description: '', category: 'Préparation concours' }; };
const addCourse = () => {
  if (newCourse.value.title) {
    coursesList.value.push({
      id: Date.now(),
      ...newCourse.value,
      icon: 'fas fa-book',
      status: 'Brouillon',
      progress: 0,
      students: 0
    });
    closeAddCourseModal();
    addNotification('Nouveau cours créé', 'fas fa-book-open');
  }
};

const openEditProfileModal = () => {
  editProfileForm.value = { fullname: userFullname.value, email: userEmail.value, phone: userPhone.value };
  editProfileModalOpen.value = true;
};
const closeEditProfileModal = () => { editProfileModalOpen.value = false; };
const saveProfile = () => {
  userPhone.value = editProfileForm.value.phone;
  closeEditProfileModal();
  addNotification('Profil mis à jour', 'fas fa-user-edit');
};

const openChangePasswordModal = () => { changePasswordModalOpen.value = true; };
const closeChangePasswordModal = () => { changePasswordModalOpen.value = false; passwordForm.value = { current: '', new: '', confirm: '' }; };
const changePassword = () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }
  if (passwordForm.value.new.length < 6) {
    alert('Le mot de passe doit contenir au moins 6 caractères');
    return;
  }
  alert('Mot de passe changé avec succès');
  closeChangePasswordModal();
  addNotification('Mot de passe modifié', 'fas fa-key');
};

const openSettingsModal = () => { settingsModalOpen.value = true; };
const closeSettingsModal = () => { settingsModalOpen.value = false; };

const editCourse = (course) => { alert(`Édition du cours: ${course.title}`); };
const viewCourse = (course) => { alert(`Visualisation du cours: ${course.title}`); };
const viewStudent = (student) => { alert(`Visualisation de l'étudiant: ${student.name}`); };
const contactStudent = (student) => { alert(`Envoi de message à: ${student.name}`); };
const deliverCertificateToStudent = (student) => { alert(`Certificat délivré à ${student.name} !`); addNotification(`Certificat délivré à ${student.name}`, 'fas fa-certificate'); };
const editCertification = (certif) => { alert(`Édition de la certification: ${certif.title}`); };
const markMessageAsRead = (id) => {
  const msg = messagesList.value.find(m => m.id === id);
  if (msg && !msg.read) { msg.read = true; }
};
const sendReply = () => {
  if (replyText.value.trim() && selectedMessage.value) {
    alert(`Réponse envoyée à ${selectedMessage.value.from}`);
    replyText.value = '';
    markMessageAsRead(selectedMessage.value.id);
    addNotification(`Message envoyé à ${selectedMessage.value.from}`, 'fas fa-paper-plane');
  }
};

const addNotification = (message, icon = 'fas fa-bell') => {
  console.log(`Notification: ${message}`);
};

const initChart = () => {
  if (progressChartCanvas.value) {
    if (progressChart) progressChart.destroy();
    progressChart = new Chart(progressChartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
          label: 'Progression moyenne (%)',
          data: [45, 55, 62, 70, 75, 82],
          borderColor: '#4F46E5',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(79, 70, 229, 0.1)'
        }]
      },
      options: { responsive: true, maintainAspectRatio: true }
    });
  }
};

const logout = () => {
  localStorage.removeItem('gradus_token');
  localStorage.removeItem('gradus_user');
  store.commit('logout');
  router.push('/login');
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const savedLanguage = localStorage.getItem('language');
  if (savedTheme === 'dark') { isDarkMode.value = true; document.documentElement.classList.add('dark'); }
  if (savedLanguage === 'en') currentLanguage.value = 'en';
  initChart();
});
</script>

<style scoped>
.gradient-bg { background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%); }
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

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }

.dark .bg-white { background-color: #1f2937; }
.dark .text-slate-950 { color: #f3f4f6; }
.dark .text-slate-500 { color: #9ca3af; }
.dark .border-slate-100 { border-color: #374151; }
.dark .bg-slate-50 { background-color: #1f2937; }
.dark .text-slate-600 { color: #cbd5e1; }
.dark .border-slate-200 { border-color: #374151; }
</style>
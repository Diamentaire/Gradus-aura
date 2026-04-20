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
            <div class="w-3 h-3 md:w-4 md:h-4 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <span :class="['font-bold text-lg md:text-xl tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">Gradus Aura Admin</span>
        </div>
        
        <div :class="['grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 rounded-2xl border mt-4 md:mt-6', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
          <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">{{ t('system') }}</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ t('online') }}</p></div>
          <div class="text-center py-1 md:py-2 border-x border-slate-200"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">{{ t('uptime') }}</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">99.9%</p></div>
          <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">{{ t('security') }}</p><p class="text-[8px] md:text-[10px] font-bold text-emerald-600">{{ t('encrypted') }}</p></div>
        </div>
      </div>
      
      <!-- Navigation Admin -->
      <nav class="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6 custom-scrollbar">
        <div class="space-y-1">
          <p class="px-2 md:px-4 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 md:mb-4">{{ t('overview') }}</p>
          <div @click="activeTab = 'dashboard'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'dashboard' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-tachometer-alt w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('dashboard') }}</span>
          </div>
        </div>
        
        <div class="space-y-1">
          <p class="px-2 md:px-4 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 md:mb-4">{{ t('management') }}</p>
          <div @click="activeTab = 'users'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'users' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-users w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('users') }}</span>
          </div>
          <div @click="activeTab = 'exams'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'exams' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-file-alt w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('exams') }}</span>
          </div>
          <div @click="activeTab = 'contests'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'contests' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-trophy w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('contests') }}</span>
          </div>
          <div @click="activeTab = 'trainings'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'trainings' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-graduation-cap w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('trainings') }}</span>
          </div>
          <div @click="activeTab = 'quizzes'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'quizzes' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-question-circle w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('quizzes') }}</span>
          </div>
        </div>
        
        <div class="space-y-1">
          <p class="px-2 md:px-4 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 md:mb-4">{{ t('analytics') }}</p>
          <div @click="activeTab = 'statistics'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'statistics' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-chart-pie w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('statistics') }}</span>
          </div>
          <div @click="activeTab = 'reports'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'reports' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-chart-line w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('reports') }}</span>
          </div>
        </div>
        
        <div class="space-y-1">
          <p class="px-2 md:px-4 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 md:mb-4">{{ t('system') }}</p>
          <div @click="activeTab = 'profile'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'profile' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-user-shield w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('adminProfile') }}</span>
          </div>
          <div @click="activeTab = 'settings'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'settings' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-cog w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('settings') }}</span>
          </div>
          <div @click="activeTab = 'backup'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
            activeTab === 'backup' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
            <i class="fas fa-database w-4 md:w-5"></i>
            <span class="font-black uppercase tracking-widest">{{ t('backup') }}</span>
          </div>
        </div>
      </nav>
      
      <!-- Footer Sidebar -->
      <div :class="['p-3 md:p-4 border-t', isDarkMode ? 'border-gray-700' : 'border-slate-100']">
        <div class="flex items-center gap-2 md:gap-3">
          <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">AD</div>
          <div class="flex-1">
            <p :class="['text-[10px] md:text-xs font-bold truncate', isDarkMode ? 'text-white' : 'text-slate-950']">{{ adminProfile.name || t('adminGlobal') }}</p>
            <p :class="['text-[8px] md:text-[10px] truncate', isDarkMode ? 'text-gray-400' : 'text-slate-500']">{{ adminProfile.email || 'admin@gradusaura.com' }}</p>
          </div>
        </div>
        <button @click="logout" class="w-full mt-3 md:mt-4 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition text-[10px] md:text-[12px]">
          <i class="fas fa-sign-out-alt"></i>
          <span class="font-black uppercase tracking-widest">{{ t('logout') }}</span>
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
              <p class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{{ t('adminAccess') }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2 md:gap-4">
            <div class="relative cursor-pointer" @click="openNotificationsModal">
              <i class="fas fa-bell text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
              <span class="absolute -top-1 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-[6px] md:text-[8px] font-bold rounded-full flex items-center justify-center">{{ unreadNotificationsCount }}</span>
            </div>
            <div class="relative cursor-pointer" @click="openSettingsModal">
              <i class="fas fa-cog text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
            </div>
            <div class="flex items-center gap-2 md:gap-3 ml-1 md:ml-2 cursor-pointer" @click="activeTab = 'profile'">
              <div class="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                {{ adminInitials }}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Dashboard (contenu principal) -->
      <div v-if="activeTab === 'dashboard'" class="p-3 md:p-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 mb-4 md:mb-8">
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-users text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+12%</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ t('totalUsers') }}</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ stats.totalUsers }}</h3>
          </div>
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-file-alt text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+8</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ t('totalExams') }}</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ stats.totalExams }}</h3>
          </div>
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-trophy text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+3</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ t('activeContests') }}</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ stats.activeContests }}</h3>
          </div>
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-graduation-cap text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+5</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ t('trainings') }}</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ stats.totalTrainings }}</h3>
          </div>
          <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm">
            <div class="flex justify-between items-start mb-2 md:mb-4">
              <div class="p-2 md:p-3 bg-slate-50 rounded-xl"><i class="fas fa-check-circle text-primary text-base md:text-xl"></i></div>
              <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">{{ stats.completionRate }}%</span>
            </div>
            <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ t('completionRate') }}</p>
            <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ stats.completionRate }}%</h3>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
            <div class="flex justify-between items-center mb-4 md:mb-6">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950">{{ t('userGrowth') }}</h3>
              <i class="fas fa-chart-line text-slate-400 text-sm md:text-base"></i>
            </div>
            <canvas ref="userGrowthChartCanvas" height="200" class="w-full"></canvas>
          </div>
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
            <div class="flex justify-between items-center mb-4 md:mb-6">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950">{{ t('activityDistribution') }}</h3>
              <i class="fas fa-chart-pie text-slate-400 text-sm md:text-base"></i>
            </div>
            <canvas ref="activityChartCanvas" height="200" class="w-full"></canvas>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div class="p-3 md:p-6 flex justify-between items-center border-b border-slate-50">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-950">{{ t('recentUsers') }}</h3>
              <button @click="activeTab = 'users'" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition">{{ t('viewAll') }}</button>
            </div>
            <div class="divide-y divide-slate-50">
              <div v-for="user in recentUsers" :key="user.id" class="flex items-center justify-between p-3 md:p-4 hover:bg-blue-50/30 transition">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">{{ user.name.charAt(0) }}</div>
                  <div><p class="font-bold text-sm text-slate-800">{{ user.name }}</p><p class="text-xs text-slate-500">{{ user.email }}</p></div>
                </div>
                <span class="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{{ user.status === 'active' ? t('active') : t('inactive') }}</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div class="p-3 md:p-6 border-b border-slate-50"><h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-950">{{ t('recentActivity') }}</h3></div>
            <div class="divide-y divide-slate-50">
              <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 p-3 md:p-4 hover:bg-blue-50/30 transition">
                <i :class="activity.icon" class="text-primary text-lg"></i>
                <div class="flex-1"><p class="text-sm text-slate-800">{{ activity.description }}</p><p class="text-xs text-slate-400">{{ activity.time }}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Users Management (simplifié pour la lisibilité) -->
      <div v-if="activeTab === 'users'" class="p-3 md:p-8">
        <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
          <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950">{{ t('usersManagement') }}</p>
          <button @click="openAddUserModal" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition">
            <i class="fas fa-plus mr-2"></i> {{ t('addUser') }}
          </button>
        </div>
        <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-3 md:p-4 mb-4 md:mb-6">
          <div class="flex flex-wrap gap-3 items-center justify-between">
            <div class="flex gap-2 flex-wrap">
              <button @click="userFilter = 'all'" :class="['px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition', userFilter === 'all' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">{{ t('all') }}</button>
              <button @click="userFilter = 'active'" :class="['px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition', userFilter === 'active' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">{{ t('active') }}</button>
              <button @click="userFilter = 'inactive'" :class="['px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition', userFilter === 'inactive' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">{{ t('inactive') }}</button>
            </div>
            <div class="relative"><i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i><input type="text" v-model="userSearch" :placeholder="t('searchUsers')" class="pl-9 pr-4 py-1.5 md:py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"></div>
          </div>
        </div>
        <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
          <table class="w-full min-w-[600px]">
            <thead :class="['border-b', isDarkMode ? 'border-gray-700' : 'border-slate-100']"><tr class="text-left"><th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">{{ t('user') }}</th><th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">{{ t('email') }}</th><th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">{{ t('status') }}</th><th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">{{ t('joined') }}</th><th class="p-3 md:p-4 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">{{ t('actions') }}</th></tr></thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-blue-50/30 transition">
                <td class="p-3 md:p-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">{{ user.name.charAt(0) }}</div><span class="font-medium text-sm text-slate-800">{{ user.name }}</span></div></td>
                <td class="p-3 md:p-4 text-sm text-slate-600">{{ user.email }}</td>
                <td class="p-3 md:p-4"><span :class="user.status === 'active' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'" class="px-2 py-1 rounded-full text-[10px] font-bold">{{ user.status === 'active' ? t('active') : t('inactive') }}</span></td>
                <td class="p-3 md:p-4 text-sm text-slate-500">{{ user.joined }}</td>
                <td class="p-3 md:p-4"><div class="flex gap-2"><button @click="editUser(user)" class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button><button @click="deleteUser(user)" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button><button @click="toggleUserStatus(user)" class="text-slate-600 hover:text-slate-800"><i :class="user.status === 'active' ? 'fas fa-ban' : 'fas fa-check-circle'"></i></button></div></td>
              </tr>
            </tbody>
           </table>
        </div>
      </div>
      
      <!-- Exams, Contests, Trainings, Quizzes (contenu similaire) -->
      <div v-if="activeTab === 'exams'" class="p-3 md:p-8"><div class="flex justify-between items-center mb-4 md:mb-6"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950">{{ t('examsManagement') }}</p><button @click="openAddExamModal" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-plus mr-2"></i> {{ t('addExam') }}</button></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"><div v-for="exam in exams" :key="exam.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition"><div class="flex justify-between items-start mb-3"><i class="fas fa-file-pdf text-red-500 text-2xl"></i><div class="flex gap-2"><button @click="editExam(exam)" class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button><button @click="deleteExam(exam)" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button></div></div><h3 class="font-bold text-base md:text-lg">{{ exam.title }}</h3><p class="text-sm text-slate-500">{{ exam.subject }}</p><p class="text-xs text-slate-400 mt-2">{{ t('year') }}: {{ exam.year }} • {{ t('downloads') }}: {{ exam.downloads }}</p><button @click="toggleExamStatus(exam)" class="mt-3 w-full py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition" :class="exam.active ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-300 text-slate-600 hover:bg-slate-400'">{{ exam.active ? t('active') : t('inactive') }}</button></div></div></div>
      
      <div v-if="activeTab === 'contests'" class="p-3 md:p-8"><div class="flex justify-between items-center mb-4 md:mb-6"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950">{{ t('contestsManagement') }}</p><button @click="openAddContestModal" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-plus mr-2"></i> {{ t('addContest') }}</button></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"><div v-for="contest in contests" :key="contest.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition"><div class="flex justify-between items-start mb-3"><div class="flex items-center gap-3"><i :class="contest.icon || 'fas fa-gavel'" class="text-primary text-xl"></i><h3 class="font-bold text-base md:text-lg">{{ contest.name }}</h3></div><div class="flex gap-2"><button @click="editContest(contest)" class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button><button @click="deleteContest(contest)" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button></div></div><p class="text-sm text-slate-500">{{ t('date') }}: {{ contest.date }}</p><p class="text-sm text-slate-500">{{ t('registered') }}: {{ contest.registered }} {{ t('users') }}</p><button @click="toggleContestStatus(contest)" class="mt-3 w-full py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition" :class="contest.active ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-300 text-slate-600 hover:bg-slate-400'">{{ contest.active ? t('open') : t('closed') }}</button></div></div></div>
      
      <div v-if="activeTab === 'trainings'" class="p-3 md:p-8"><div class="flex justify-between items-center mb-4 md:mb-6"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950">{{ t('trainingsManagement') }}</p><button @click="openAddTrainingModal" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-plus mr-2"></i> {{ t('addTraining') }}</button></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"><div v-for="training in trainings" :key="training.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition"><div class="flex justify-between items-start mb-3"><h3 class="font-bold text-base md:text-lg">{{ training.title }}</h3><div class="flex gap-2"><button @click="editTraining(training)" class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button><button @click="deleteTraining(training)" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button></div></div><p class="text-sm text-slate-500 mb-2">{{ training.description }}</p><div class="flex justify-between text-xs mb-1"><span class="text-slate-500">{{ t('enrolled') }}: {{ training.enrolled }}</span><span class="text-primary font-bold">{{ t('avgProgress') }}: {{ training.avgProgress }}%</span></div><button @click="toggleTrainingStatus(training)" class="mt-3 w-full py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition" :class="training.active ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-300 text-slate-600 hover:bg-slate-400'">{{ training.active ? t('published') : t('draft') }}</button></div></div></div>
      
      <div v-if="activeTab === 'quizzes'" class="p-3 md:p-8"><div class="flex justify-between items-center mb-4 md:mb-6"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-question-circle mr-2"></i> {{ t('quizzesManagement') }}</p><button @click="openAddQuizModal" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-plus mr-2"></i> {{ t('addQuiz') }}</button></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6"><div v-for="quiz in quizzes" :key="quiz.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition"><div class="flex justify-between items-start mb-3"><div><i class="fas fa-question-circle text-primary text-2xl mb-2"></i><h3 class="font-bold text-base md:text-lg">{{ quiz.title }}</h3></div><div class="flex gap-2"><button @click="editQuiz(quiz)" class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button><button @click="deleteQuiz(quiz)" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button></div></div><p class="text-sm text-slate-500 mb-2">{{ quiz.description }}</p><div class="flex justify-between text-xs mb-1"><span class="text-slate-500">{{ t('questions') }}: {{ quiz.questionsCount }}</span><span class="text-primary font-bold">{{ t('attempts') }}: {{ quiz.attempts }}</span></div><button @click="toggleQuizStatus(quiz)" class="mt-3 w-full py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition" :class="quiz.active ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-300 text-slate-600 hover:bg-slate-400'">{{ quiz.active ? t('published') : t('draft') }}</button></div></div></div>
      
      <!-- Reports, Statistics, Profile, Settings, Backup (contenu simplifié) -->
      <div v-if="activeTab === 'reports'" class="p-3 md:p-8"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950 mb-4 md:mb-6"><i class="fas fa-chart-line mr-2"></i> {{ t('reports') }}</p><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 mb-4 md:mb-6"><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ t('reportType') }}</label><select v-model="reportType" class="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-sm"><option value="users">{{ t('users') }}</option><option value="exams">{{ t('exams') }}</option><option value="contests">{{ t('contests') }}</option><option value="trainings">{{ t('trainings') }}</option><option value="quizzes">{{ t('quizzes') }}</option></select></div><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ t('period') }}</label><select v-model="reportPeriod" class="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-sm"><option value="week">{{ t('lastWeek') }}</option><option value="month">{{ t('lastMonth') }}</option><option value="year">{{ t('lastYear') }}</option><option value="all">{{ t('allTime') }}</option></select></div><div class="flex items-end"><button @click="generateReport" class="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-chart-line mr-2"></i> {{ t('generateReport') }}</button></div></div></div><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-sm font-black uppercase tracking-widest text-slate-950">{{ t('reportPreview') }}</h3><button @click="exportReport" class="px-3 py-1 bg-slate-800 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition"><i class="fas fa-download mr-1"></i> {{ t('export') }}</button></div><div v-if="reportData.length === 0" class="text-center py-8 text-slate-400"><i class="fas fa-chart-line text-4xl mb-3"></i><p>{{ t('selectReportType') }}</p></div><div v-else class="overflow-x-auto"><table class="w-full min-w-[500px]"><thead class="border-b border-slate-100"><tr class="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest"><th class="p-2" v-for="col in reportColumns" :key="col">{{ col }}</th></tr></thead><tbody class="divide-y divide-slate-50"><tr v-for="item in reportData" :key="item.id" class="text-sm"><td class="p-2" v-for="value in Object.values(item)" :key="value">{{ value }}</td></tr></tbody></table></div></div></div>
      
      <div v-if="activeTab === 'statistics'" class="p-3 md:p-8"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950 mb-4 md:mb-6">{{ t('platformStatistics') }}</p><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8"><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm"><h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('monthlyActiveUsers') }}</h3><canvas ref="monthlyUsersChartCanvas" height="200" class="w-full"></canvas></div><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm"><h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('examDownloadsTrend') }}</h3><canvas ref="downloadsChartCanvas" height="200" class="w-full"></canvas></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8"><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm"><h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('topPerformingUsers') }}</h3><div class="space-y-3"><div v-for="(user, index) in topUsers" :key="user.id" class="flex items-center justify-between"><div class="flex items-center gap-2"><span class="text-sm font-bold text-primary">#{{ index + 1 }}</span><span class="text-sm text-slate-800">{{ user.name }}</span></div><span class="text-sm font-bold text-emerald-600">{{ user.score }}%</span></div></div></div><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm"><h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('mostDownloadedExams') }}</h3><div class="space-y-3"><div v-for="(exam, index) in topExams" :key="exam.id" class="flex items-center justify-between"><div class="flex items-center gap-2"><span class="text-sm font-bold text-primary">#{{ index + 1 }}</span><span class="text-sm text-slate-800">{{ exam.title }}</span></div><span class="text-sm font-bold text-emerald-600">{{ exam.downloads }} {{ t('downloads') }}</span></div></div></div><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm"><h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('systemHealth') }}</h3><div class="space-y-3"><div class="flex justify-between"><span class="text-sm text-slate-600">{{ t('apiStatus') }}</span><span class="text-sm font-bold text-emerald-600">{{ t('operational') }}</span></div><div class="flex justify-between"><span class="text-sm text-slate-600">{{ t('database') }}</span><span class="text-sm font-bold text-emerald-600">{{ t('connected') }}</span></div><div class="flex justify-between"><span class="text-sm text-slate-600">{{ t('storage') }}</span><span class="text-sm font-bold text-emerald-600">45% {{ t('used') }}</span></div><div class="flex justify-between"><span class="text-sm text-slate-600">{{ t('lastBackup') }}</span><span class="text-sm font-bold text-slate-800">{{ lastBackup }}</span></div></div></div></div></div>
      
      <div v-if="activeTab === 'profile'" class="p-3 md:p-8"><div class="flex justify-between items-center mb-4 md:mb-6"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-user-shield mr-2"></i> {{ t('adminProfile') }}</p></div><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8"><div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 md:mb-8"><div class="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold">{{ adminInitials }}</div><div class="text-center sm:text-left"><h3 class="text-xl md:text-2xl font-bold text-slate-950">{{ adminProfile.name || t('adminGlobal') }}</h3><p class="text-slate-500 text-sm md:text-base">{{ adminProfile.email || 'admin@gradusaura.com' }}</p><p class="text-xs text-slate-400 mt-1">{{ t('adminSince') }} {{ adminProfile.memberSince || 'Janvier 2025' }}</p><span class="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider">{{ t('administrator') }}</span></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"><div class="space-y-3 md:space-y-4"><div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ t('fullName') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ adminProfile.name || t('adminGlobal') }}</p></div><div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ t('email') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ adminProfile.email || 'admin@gradusaura.com' }}</p></div><div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ t('phone') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ adminProfile.phone || t('notProvided') }}</p></div></div><div class="space-y-3 md:space-y-4"><div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ t('role') }}</label><p class="text-sm md:text-base text-primary font-medium mt-1">{{ t('superAdmin') }}</p></div><div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ t('lastLogin') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ adminProfile.lastLogin || new Date().toLocaleString() }}</p></div><div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ t('status') }}</label><p class="text-emerald-600 font-medium mt-1"><i class="fas fa-circle text-[6px] mr-1"></i> {{ t('active') }}</p></div></div></div><div class="flex gap-3 mt-6 md:mt-8 pt-4 border-t border-slate-100"><button @click="openEditAdminProfileModal" class="px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-primary/90 transition"><i class="fas fa-edit mr-2"></i> {{ t('editProfile') }}</button><button @click="openAdminChangePasswordModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-800 text-white rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition"><i class="fas fa-key mr-2"></i> {{ t('changePassword') }}</button></div></div></div>
      
      <div v-if="activeTab === 'settings'" class="p-3 md:p-8"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950 mb-4 md:mb-6">{{ t('systemSettings') }}</p><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8"><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8"><h3 class="text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('generalSettings') }}</h3><div class="space-y-4"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><span class="text-sm text-slate-600">{{ t('siteName') }}</span><input type="text" v-model="settings.siteName" class="px-3 py-1 rounded-lg border border-slate-200 text-sm w-full sm:w-auto"></div><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><span class="text-sm text-slate-600">{{ t('maintenanceMode') }}</span><button @click="settings.maintenanceMode = !settings.maintenanceMode" :class="settings.maintenanceMode ? 'bg-red-500' : 'bg-emerald-500'" class="px-3 py-1 rounded-lg text-white text-xs font-bold">{{ settings.maintenanceMode ? t('on') : t('off') }}</button></div><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><span class="text-sm text-slate-600">{{ t('userRegistration') }}</span><button @click="settings.userRegistration = !settings.userRegistration" :class="settings.userRegistration ? 'bg-emerald-500' : 'bg-red-500'" class="px-3 py-1 rounded-lg text-white text-xs font-bold">{{ settings.userRegistration ? t('open') : t('closed') }}</button></div></div></div><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8"><h3 class="text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('appearance') }}</h3><div class="space-y-4"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><span class="text-sm text-slate-600">{{ t('theme') }}</span><button @click="toggleTheme" class="w-12 h-6 rounded-full transition-colors" :class="isDarkMode ? 'bg-primary' : 'bg-slate-300'"><div class="w-5 h-5 bg-white rounded-full transition-transform" :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"></div></button></div><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><span class="text-sm text-slate-600">{{ t('language') }}</span><button @click="toggleLanguage" class="px-3 py-1 bg-primary text-white rounded-lg text-sm font-bold">{{ currentLanguage === 'fr' ? 'FR' : 'EN' }}</button></div><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><span class="text-sm text-slate-600">{{ t('primaryColor') }}</span><input type="color" v-model="settings.primaryColor" class="w-10 h-10 rounded border border-slate-200"></div></div></div></div></div>
      
      <div v-if="activeTab === 'backup'" class="p-3 md:p-8"><p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950 mb-4 md:mb-6">{{ t('backupRestore') }}</p><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8"><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8"><h3 class="text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('createBackup') }}</h3><p class="text-sm text-slate-500 mb-4">{{ t('createBackupDesc') }}</p><button @click="createBackup" :disabled="backupLoading" class="w-full py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:shadow-lg transition disabled:opacity-50"><i class="fas fa-database mr-2"></i> {{ backupLoading ? t('creating') : t('createBackup') }}</button></div><div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8"><h3 class="text-sm font-black uppercase tracking-widest text-slate-950 mb-4">{{ t('restoreBackup') }}</h3><p class="text-sm text-slate-500 mb-4">{{ t('restoreBackupDesc') }}</p><input type="file" ref="backupFileInput" class="hidden" @change="restoreBackup"><button @click="$refs.backupFileInput.click()" class="w-full py-2 md:py-3 bg-slate-800 text-white rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition"><i class="fas fa-upload mr-2"></i> {{ t('restoreBackup') }}</button></div></div><div class="mt-4 md:mt-8 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden"><div class="p-3 md:p-6 border-b border-slate-50"><h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-950">{{ t('backupHistory') }}</h3></div><div class="divide-y divide-slate-50"><div v-for="backup in backupHistory" :key="backup.id" class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 md:p-4"><div><p class="text-sm font-medium text-slate-800">{{ backup.name }}</p><p class="text-xs text-slate-400">{{ backup.date }} • {{ backup.size }}</p></div><button @click="downloadBackup(backup)" class="text-primary hover:text-primary/80"><i class="fas fa-download"></i></button></div></div></div></div>
    </main>
    
        <!-- ==================== MODALES EN MODE CLAIR UNIQUEMENT ==================== -->
    
    <!-- MODALE NOTIFICATIONS -->
    <div v-if="notificationsModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeNotificationsModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <i class="fas fa-bell text-white text-lg"></i>
            </div>
            <h2 class="text-lg font-black text-slate-950">{{ t('notifications') }}</h2>
          </div>
          <div class="flex gap-2">
            <button @click="markAllNotificationsAsRead" class="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition">{{ t('markAllRead') }}</button>
            <button @click="closeNotificationsModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <div v-for="notif in notifications" :key="notif.id" @click="markNotificationAsRead(notif.id)" :class="['p-4 border-b border-slate-50 cursor-pointer transition-all duration-200', !notif.read ? 'bg-gradient-to-r from-indigo-50/50 to-cyan-50/50' : 'hover:bg-slate-50']">
            <div class="flex gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-100 to-cyan-100 flex items-center justify-center"><i :class="[notif.icon, 'text-primary text-lg']"></i></div>
              <div class="flex-1"><p class="font-bold text-sm text-slate-950">{{ notif.title }}</p><p class="text-xs text-slate-500 mt-1">{{ notif.message }}</p><p class="text-[10px] text-slate-400 mt-1"><i class="far fa-clock mr-1"></i> {{ notif.time }}</p></div>
              <div v-if="!notif.read" class="w-2.5 h-2.5 bg-red-500 rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODALE PARAMÈTRES RAPIDES -->
    <div v-if="settingsModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeSettingsModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-cog text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">{{ t('quickSettings') }}</h2></div>
          <button @click="closeSettingsModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50"><div><p class="font-bold text-sm text-slate-950">{{ t('theme') }}</p><p class="text-xs text-slate-500">{{ isDarkMode ? t('dark') : t('light') }}</p></div><button @click="toggleTheme" class="w-12 h-6 rounded-full transition-colors shadow-inner" :class="isDarkMode ? 'bg-primary' : 'bg-slate-300'"><div class="w-5 h-5 bg-white rounded-full transition-transform shadow-md" :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"></div></button></div>
          <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50"><div><p class="font-bold text-sm text-slate-950">{{ t('language') }}</p><p class="text-xs text-slate-500">{{ currentLanguage === 'fr' ? 'Français' : 'English' }}</p></div><button @click="toggleLanguage" class="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition">{{ currentLanguage === 'fr' ? 'FR' : 'EN' }}</button></div>
          <div class="border-t border-slate-100 pt-3 space-y-1">
            <button @click="activeTab = 'settings'; closeSettingsModal()" class="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 transition flex items-center gap-3"><i class="fas fa-cog text-slate-500 w-5"></i><span class="text-sm text-slate-950 font-medium">{{ t('fullSettings') }}</span></button>
            <button @click="activeTab = 'profile'; closeSettingsModal()" class="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 transition flex items-center gap-3"><i class="fas fa-user-shield text-slate-500 w-5"></i><span class="text-sm text-slate-950 font-medium">{{ t('adminProfile') }}</span></button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- MODALE ÉDITION PROFIL ADMIN -->
    <div v-if="editAdminProfileModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeEditAdminProfileModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-user-edit text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">{{ t('editProfile') }}</h2></div>
          <button @click="closeEditAdminProfileModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('fullName') }}</label><input type="text" v-model="editAdminForm.name" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('email') }}</label><input type="email" v-model="editAdminForm.email" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('phone') }}</label><input type="tel" v-model="editAdminForm.phone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div class="flex gap-3 mt-6"><button @click="saveAdminProfile" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> {{ t('save') }}</button><button @click="closeEditAdminProfileModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ t('cancel') }}</button></div>
        </div>
      </div>
    </div>
    
    <!-- MODALE CHANGEMENT MOT DE PASSE ADMIN -->
    <div v-if="adminChangePasswordModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeAdminChangePasswordModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-key text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">{{ t('changePassword') }}</h2></div>
          <button @click="closeAdminChangePasswordModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('currentPassword') }}</label><input type="password" v-model="adminPasswordForm.current" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('newPassword') }}</label><input type="password" v-model="adminPasswordForm.new" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('confirmPassword') }}</label><input type="password" v-model="adminPasswordForm.confirm" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div class="flex gap-3 mt-6"><button @click="changeAdminPassword" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-key mr-2"></i> {{ t('change') }}</button><button @click="closeAdminChangePasswordModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ t('cancel') }}</button></div>
        </div>
      </div>
    </div>
    
    <!-- MODALE AJOUT/MODIFICATION CONCOURS -->
    <div v-if="contestModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeContestModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-trophy text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">{{ editingContest ? t('editContest') : t('addContest') }}</h2></div>
          <button @click="closeContestModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('contestName') }}</label><input type="text" v-model="contestForm.name" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Icône</label><select v-model="contestForm.icon" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"><option value="fas fa-gavel">Gavel (Concours général)</option><option value="fas fa-chalkboard">Chalkboard (Enseignement)</option><option value="fas fa-microscope">Microscope (Scientifique)</option><option value="fas fa-laptop-code">Laptop (Informatique)</option><option value="fas fa-stethoscope">Stethoscope (Médical)</option><option value="fas fa-balance-scale">Balance (Droit)</option></select></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('date') }}</label><input type="date" v-model="contestForm.date" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('registeredUsers') }}</label><input type="number" v-model="contestForm.registered" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div class="flex items-center gap-2"><input type="checkbox" v-model="contestForm.active" id="contestActive" class="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"><label for="contestActive" class="text-sm text-slate-600">{{ t('active') }}</label></div>
          <div class="flex gap-3 mt-6"><button @click="saveContest" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> {{ t('save') }}</button><button @click="closeContestModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ t('cancel') }}</button></div>
        </div>
      </div>
    </div>
    
    <!-- MODALE AJOUT/MODIFICATION EXAMEN -->
    <div v-if="examModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeExamModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-file-alt text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">{{ editingExam ? t('editExam') : t('addExam') }}</h2></div>
          <button @click="closeExamModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('examTitle') }}</label><input type="text" v-model="examForm.title" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('subject') }}</label><input type="text" v-model="examForm.subject" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('year') }}</label><input type="text" v-model="examForm.year" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('downloads') }}</label><input type="number" v-model="examForm.downloads" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div class="flex items-center gap-2"><input type="checkbox" v-model="examForm.active" id="examActive" class="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"><label for="examActive" class="text-sm text-slate-600">{{ t('active') }}</label></div>
          <div class="flex gap-3 mt-6"><button @click="saveExam" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> {{ t('save') }}</button><button @click="closeExamModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ t('cancel') }}</button></div>
        </div>
      </div>
    </div>
    
    <!-- MODALE AJOUT/MODIFICATION FORMATION -->
    <div v-if="trainingModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeTrainingModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-graduation-cap text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">{{ editingTraining ? t('editTraining') : t('addTraining') }}</h2></div>
          <button @click="closeTrainingModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('trainingTitle') }}</label><input type="text" v-model="trainingForm.title" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('description') }}</label><textarea v-model="trainingForm.description" rows="3" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></textarea></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('enrolledUsers') }}</label><input type="number" v-model="trainingForm.enrolled" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('avgProgress') }}</label><input type="number" v-model="trainingForm.avgProgress" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div class="flex items-center gap-2"><input type="checkbox" v-model="trainingForm.active" id="trainingActive" class="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"><label for="trainingActive" class="text-sm text-slate-600">{{ t('active') }}</label></div>
          <div class="flex gap-3 mt-6"><button @click="saveTraining" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> {{ t('save') }}</button><button @click="closeTrainingModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ t('cancel') }}</button></div>
        </div>
      </div>
    </div>
    
    <!-- MODALE AJOUT/MODIFICATION QUIZ -->
    <div v-if="quizModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeQuizModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-question-circle text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">{{ editingQuiz ? t('editQuiz') : t('addQuiz') }}</h2></div>
          <button @click="closeQuizModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('quizTitle') }}</label><input type="text" v-model="quizForm.title" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('description') }}</label><textarea v-model="quizForm.description" rows="3" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></textarea></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('questionsCount') }}</label><input type="number" v-model="quizForm.questionsCount" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div class="flex gap-3 mt-6"><button @click="saveQuiz" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> {{ t('save') }}</button><button @click="closeQuizModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ t('cancel') }}</button></div>
        </div>
      </div>
    </div>
    
    <!-- MODALE AJOUT/MODIFICATION UTILISATEUR -->
    <div v-if="userModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeUserModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-user-plus text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">{{ editingUser ? t('editUser') : t('addUser') }}</h2></div>
          <button @click="closeUserModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('fullName') }}</label><input type="text" v-model="userForm.name" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('email') }}</label><input type="email" v-model="userForm.email" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('phone') }}</label><input type="tel" v-model="userForm.phone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ t('status') }}</label><select v-model="userForm.status" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"><option value="active">{{ t('active') }}</option><option value="inactive">{{ t('inactive') }}</option></select></div>
          <div class="flex gap-3 mt-6"><button @click="saveUser" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> {{ t('save') }}</button><button @click="closeUserModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ t('cancel') }}</button></div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';

const router = useRouter();
const mobileSidebarOpen = ref(false);

// ==================== THÈME ET LANGUE ====================
const isDarkMode = ref(false);
const currentLanguage = ref('fr');

const translations = {
  fr: {
    system: 'Système', online: 'En ligne', uptime: 'Dispo', security: 'Sécurité', encrypted: 'Chiffré',
    overview: 'Aperçu', dashboard: 'Tableau de bord', management: 'Gestion', users: 'Utilisateurs',
    exams: 'Examens', contests: 'Concours', trainings: 'Formations', quizzes: 'Quiz',
    analytics: 'Analytique', statistics: 'Statistiques', reports: 'Rapports',
    settings: 'Paramètres', backup: 'Sauvegarde', adminGlobal: 'Admin Global', logout: 'Déconnexion',
    adminAccess: 'Accès Admin', adminProfile: 'Profil Admin', adminSince: 'Admin depuis',
    administrator: 'Administrateur', superAdmin: 'Super Admin', lastLogin: 'Dernière connexion',
    totalUsers: 'Utilisateurs total', totalExams: 'Examens total', activeContests: 'Concours actifs',
    completionRate: 'Taux complétion', userGrowth: 'Croissance utilisateurs', activityDistribution: 'Distribution activités',
    recentUsers: 'Utilisateurs récents', recentActivity: 'Activités récentes', viewAll: 'Voir tout',
    active: 'Actif', inactive: 'Inactif',
    usersManagement: 'Gestion des utilisateurs', addUser: 'Ajouter utilisateur', searchUsers: 'Rechercher...',
    user: 'Utilisateur', email: 'Email', status: 'Statut', joined: 'Inscrit le', actions: 'Actions',
    all: 'Tous', editUser: 'Modifier utilisateur', fullName: 'Nom complet', phone: 'Téléphone',
    save: 'Enregistrer', cancel: 'Annuler', notProvided: 'Non renseigné',
    examsManagement: 'Gestion des examens', addExam: 'Ajouter examen', year: 'Année', downloads: 'Téléchargements',
    contestsManagement: 'Gestion des concours', addContest: 'Ajouter concours', date: 'Date', registered: 'Inscrits',
    open: 'Ouvert', closed: 'Fermé',
    trainingsManagement: 'Gestion des formations', addTraining: 'Ajouter formation', enrolled: 'Inscrits', avgProgress: 'Progression moyenne',
    published: 'Publié', draft: 'Brouillon',
    quizzesManagement: 'Gestion des quiz', addQuiz: 'Ajouter quiz', editQuiz: 'Modifier quiz',
    quizTitle: 'Titre du quiz', description: 'Description', questionsCount: 'Nombre de questions',
    questions: 'Questions', attempts: 'Tentatives',
    reportType: 'Type de rapport', period: 'Période', lastWeek: 'Dernière semaine', lastMonth: 'Dernier mois',
    lastYear: 'Dernière année', allTime: 'Tout temps', generateReport: 'Générer', reportPreview: 'Aperçu du rapport',
    export: 'Exporter', selectReportType: 'Sélectionnez un type de rapport',
    platformStatistics: 'Statistiques de la plateforme', monthlyActiveUsers: 'Utilisateurs actifs par mois',
    examDownloadsTrend: 'Tendance téléchargements examens', topPerformingUsers: 'Meilleurs utilisateurs',
    mostDownloadedExams: 'Examens les plus téléchargés', systemHealth: 'Santé du système',
    apiStatus: 'Statut API', operational: 'Opérationnel', database: 'Base de données', connected: 'Connectée',
    storage: 'Stockage', used: 'utilisé', lastBackup: 'Dernière sauvegarde',
    systemSettings: 'Paramètres système', generalSettings: 'Paramètres généraux', siteName: 'Nom du site',
    maintenanceMode: 'Mode maintenance', on: 'Activé', off: 'Désactivé', userRegistration: 'Inscription utilisateurs',
    appearance: 'Apparence', theme: 'Thème', light: 'Clair', dark: 'Sombre', language: 'Langue',
    primaryColor: 'Couleur principale', quickSettings: 'Paramètres rapides', fullSettings: 'Paramètres complets',
    backupRestore: 'Sauvegarde & Restauration', createBackup: 'Créer une sauvegarde', createBackupDesc: 'Créez une sauvegarde complète de toutes les données système.',
    creating: 'Création...', restoreBackup: 'Restaurer', restoreBackupDesc: 'Restaurer les données à partir d\'un fichier de sauvegarde.',
    backupHistory: 'Historique des sauvegardes',
    notifications: 'Notifications', markAllRead: 'Tout lire',
    editProfile: 'Modifier le profil', changePassword: 'Changer le mot de passe',
    currentPassword: 'Mot de passe actuel', newPassword: 'Nouveau mot de passe', confirmPassword: 'Confirmer',
    change: 'Changer', role: 'Rôle', contestName: 'Nom du concours', registeredUsers: 'Nombre d\'inscrits',
    examTitle: 'Titre de l\'examen', subject: 'Matière', trainingTitle: 'Titre de la formation',
    enrolledUsers: 'Nombre d\'inscrits', editContest: 'Modifier le concours', editExam: 'Modifier l\'examen',
    editTraining: 'Modifier la formation'
  },
  en: {
    system: 'System', online: 'Online', uptime: 'Uptime', security: 'Security', encrypted: 'Encrypted',
    overview: 'Overview', dashboard: 'Dashboard', management: 'Management', users: 'Users',
    exams: 'Exams', contests: 'Contests', trainings: 'Trainings', quizzes: 'Quizzes',
    analytics: 'Analytics', statistics: 'Statistics', reports: 'Reports',
    settings: 'Settings', backup: 'Backup', adminGlobal: 'Global Admin', logout: 'Logout',
    adminAccess: 'Admin Access', adminProfile: 'Admin Profile', adminSince: 'Admin since',
    administrator: 'Administrator', superAdmin: 'Super Admin', lastLogin: 'Last login',
    totalUsers: 'Total Users', totalExams: 'Total Exams', activeContests: 'Active Contests',
    completionRate: 'Completion Rate', userGrowth: 'User Growth', activityDistribution: 'Activity Distribution',
    recentUsers: 'Recent Users', recentActivity: 'Recent Activity', viewAll: 'View All',
    active: 'Active', inactive: 'Inactive',
    usersManagement: 'Users Management', addUser: 'Add User', searchUsers: 'Search users...',
    user: 'User', email: 'Email', status: 'Status', joined: 'Joined', actions: 'Actions',
    all: 'All', editUser: 'Edit User', fullName: 'Full Name', phone: 'Phone',
    save: 'Save', cancel: 'Cancel', notProvided: 'Not provided',
    examsManagement: 'Exams Management', addExam: 'Add Exam', year: 'Year', downloads: 'Downloads',
    contestsManagement: 'Contests Management', addContest: 'Add Contest', date: 'Date', registered: 'Registered',
    open: 'Open', closed: 'Closed',
    trainingsManagement: 'Trainings Management', addTraining: 'Add Training', enrolled: 'Enrolled', avgProgress: 'Avg Progress',
    published: 'Published', draft: 'Draft',
    quizzesManagement: 'Quizzes Management', addQuiz: 'Add Quiz', editQuiz: 'Edit Quiz',
    quizTitle: 'Quiz Title', description: 'Description', questionsCount: 'Questions Count',
    questions: 'Questions', attempts: 'Attempts',
    reportType: 'Report Type', period: 'Period', lastWeek: 'Last Week', lastMonth: 'Last Month',
    lastYear: 'Last Year', allTime: 'All Time', generateReport: 'Generate', reportPreview: 'Report Preview',
    export: 'Export', selectReportType: 'Select a report type',
    platformStatistics: 'Platform Statistics', monthlyActiveUsers: 'Monthly Active Users',
    examDownloadsTrend: 'Exam Downloads Trend', topPerformingUsers: 'Top Performing Users',
    mostDownloadedExams: 'Most Downloaded Exams', systemHealth: 'System Health',
    apiStatus: 'API Status', operational: 'Operational', database: 'Database', connected: 'Connected',
    storage: 'Storage', used: 'used', lastBackup: 'Last Backup',
    systemSettings: 'System Settings', generalSettings: 'General Settings', siteName: 'Site Name',
    maintenanceMode: 'Maintenance Mode', on: 'On', off: 'Off', userRegistration: 'User Registration',
    appearance: 'Appearance', theme: 'Theme', light: 'Light', dark: 'Dark', language: 'Language',
    primaryColor: 'Primary Color', quickSettings: 'Quick Settings', fullSettings: 'Full Settings',
    backupRestore: 'Backup & Restore', createBackup: 'Create Backup', createBackupDesc: 'Create a full backup of all system data.',
    creating: 'Creating...', restoreBackup: 'Restore Backup', restoreBackupDesc: 'Restore system data from a backup file.',
    backupHistory: 'Backup History',
    notifications: 'Notifications', markAllRead: 'Mark all read',
    editProfile: 'Edit Profile', changePassword: 'Change Password',
    currentPassword: 'Current Password', newPassword: 'New Password', confirmPassword: 'Confirm Password',
    change: 'Change', role: 'Role', contestName: 'Contest name', registeredUsers: 'Registered users',
    examTitle: 'Exam title', subject: 'Subject', trainingTitle: 'Training title',
    enrolledUsers: 'Enrolled users', editContest: 'Edit contest', editExam: 'Edit exam',
    editTraining: 'Edit training'
  }
};

const t = (key) => translations[currentLanguage.value][key] || key;

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); } 
  else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
};

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'fr' ? 'en' : 'fr';
  localStorage.setItem('language', currentLanguage.value);
};

// ==================== ÉTATS ====================
const activeTab = ref('dashboard');
const userFilter = ref('all');
const userSearch = ref('');
const backupLoading = ref(false);
const backupFileInput = ref(null);

// Chart refs
const userGrowthChartCanvas = ref(null);
const activityChartCanvas = ref(null);
const monthlyUsersChartCanvas = ref(null);
const downloadsChartCanvas = ref(null);

let userGrowthChart = null;
let activityChart = null;
let monthlyUsersChart = null;
let downloadsChart = null;

// Modales
const notificationsModalOpen = ref(false);
const settingsModalOpen = ref(false);
const editAdminProfileModalOpen = ref(false);
const adminChangePasswordModalOpen = ref(false);
const contestModalOpen = ref(false);
const examModalOpen = ref(false);
const trainingModalOpen = ref(false);
const quizModalOpen = ref(false);
const userModalOpen = ref(false);

// Éditions
const editingContest = ref(null);
const editingExam = ref(null);
const editingTraining = ref(null);
const editingQuiz = ref(null);
const editingUser = ref(null);

// ==================== PROFIL ADMIN ====================
const adminProfile = ref({
  name: 'Admin Global',
  email: 'admin@gradusaura.com',
  phone: '+237 600 000 000',
  memberSince: 'Janvier 2025',
  lastLogin: new Date().toLocaleString()
});

const adminInitials = computed(() => (adminProfile.value.name || 'AD').charAt(0).toUpperCase());
const editAdminForm = ref({ name: '', email: '', phone: '' });
const adminPasswordForm = ref({ current: '', new: '', confirm: '' });

// ==================== DONNÉES ====================
const users = ref([
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com', status: 'active', joined: '2025-01-15' },
  { id: 2, name: 'Marie Claire', email: 'marie@example.com', status: 'active', joined: '2025-01-20' },
  { id: 3, name: 'Paul Biya', email: 'paul@example.com', status: 'inactive', joined: '2025-02-01' },
  { id: 4, name: 'Alice Ngono', email: 'alice@example.com', status: 'active', joined: '2025-02-10' },
  { id: 5, name: 'Charles Mbarga', email: 'charles@example.com', status: 'active', joined: '2025-02-15' }
]);

const exams = ref([
  { id: 1, title: 'TCF Canada 2024', subject: 'Français', year: '2024', downloads: 234, active: true },
  { id: 2, title: 'DALF C1 2023', subject: 'Français', year: '2023', downloads: 156, active: true },
  { id: 3, title: 'ENAM Concours 2025', subject: 'Général', year: '2025', downloads: 89, active: true },
  { id: 4, title: 'TOEIC 2024', subject: 'Anglais', year: '2024', downloads: 45, active: false }
]);

const contests = ref([
  { id: 1, name: 'ENAM 2025', icon: 'fas fa-gavel', date: '2025-06-15', registered: 234, active: true },
  { id: 2, name: 'ENS 2025', icon: 'fas fa-chalkboard', date: '2025-07-01', registered: 189, active: true },
  { id: 3, name: 'IRIC 2025', icon: 'fas fa-microscope', date: '2025-05-20', registered: 67, active: false }
]);

const trainings = ref([
  { id: 1, title: 'Préparation TCF Canada', description: 'Préparation complète pour l\'examen TCF Canada', enrolled: 456, avgProgress: 65, active: true },
  { id: 2, title: 'Préparation Concours ENAM', description: 'Mathématiques et culture générale', enrolled: 234, avgProgress: 58, active: true },
  { id: 3, title: 'Anglais pour Examens', description: 'Préparation TOEIC, TOEFL', enrolled: 123, avgProgress: 72, active: false }
]);

const quizzes = ref([
  { id: 1, title: 'Quiz Mathématiques - Niveau 1', description: 'Testez vos connaissances en mathématiques de base', questionsCount: 20, attempts: 156, active: true },
  { id: 2, title: 'Quiz Culture Générale', description: 'Questions sur l\'actualité et la culture', questionsCount: 15, attempts: 89, active: true },
  { id: 3, title: 'Quiz Anglais - Vocabulaire', description: 'Testez votre vocabulaire anglais', questionsCount: 25, attempts: 234, active: false }
]);

const notifications = ref([
  { id: 1, title: 'Nouvel utilisateur inscrit', message: 'Jean Dupont vient de créer un compte', icon: 'fas fa-user-plus', time: 'Il y a 5 min', read: false },
  { id: 2, title: 'Examen téléchargé', message: 'TCF Canada 2024 a été téléchargé 50 fois', icon: 'fas fa-download', time: 'Il y a 1 heure', read: false },
  { id: 3, title: 'Nouveau concours créé', message: 'Le concours ENS 2025 a été publié', icon: 'fas fa-trophy', time: 'Il y a 3 heures', read: false }
]);

const recentActivities = ref([
  { id: 1, icon: 'fas fa-user-plus', description: 'Nouvel utilisateur inscrit: Jean Dupont', time: 'Il y a 5 minutes' },
  { id: 2, icon: 'fas fa-download', description: 'Examen téléchargé: TCF Canada 2024', time: 'Il y a 1 heure' },
  { id: 3, icon: 'fas fa-trophy', description: 'Nouveau concours créé: ENS 2025', time: 'Il y a 3 heures' }
]);

const settings = ref({ siteName: 'Gradus Aura', maintenanceMode: false, userRegistration: true, primaryColor: '#4F46E5' });
const backupHistory = ref([{ id: 1, name: 'backup_2025_03_01.zip', date: '2025-03-01', size: '45.2 MB' }]);

const contestForm = ref({ name: '', icon: 'fas fa-gavel', date: new Date().toISOString().split('T')[0], registered: 0, active: true });
const examForm = ref({ title: '', subject: '', year: new Date().getFullYear().toString(), downloads: 0, active: true });
const trainingForm = ref({ title: '', description: '', enrolled: 0, avgProgress: 0, active: true });
const quizForm = ref({ title: '', description: '', questionsCount: 10 });
const userForm = ref({ name: '', email: '', phone: '', status: 'active' });

// Reports
const reportType = ref('users');
const reportPeriod = ref('month');
const reportData = ref([]);

// Computed
const unreadNotificationsCount = computed(() => notifications.value.filter(n => !n.read).length);
const recentUsers = computed(() => users.value.slice(0, 3));
const filteredUsers = computed(() => {
  let filtered = users.value;
  if (userFilter.value !== 'all') filtered = filtered.filter(u => u.status === userFilter.value);
  if (userSearch.value) filtered = filtered.filter(u => u.name.toLowerCase().includes(userSearch.value.toLowerCase()) || u.email.toLowerCase().includes(userSearch.value.toLowerCase()));
  return filtered;
});
const topUsers = ref([{ id: 1, name: 'Jean Dupont', score: 94 }, { id: 2, name: 'Marie Claire', score: 89 }, { id: 3, name: 'Alice Ngono', score: 87 }]);
const topExams = computed(() => exams.value.sort((a, b) => b.downloads - a.downloads).slice(0, 3));
const lastBackup = computed(() => backupHistory.value[0]?.date || 'Aucune sauvegarde');
const reportColumns = computed(() => reportData.value.length ? Object.keys(reportData.value[0]) : []);

const stats = ref({ totalUsers: 0, totalExams: 0, activeContests: 0, totalTrainings: 0, completionRate: 0 });
const activeTabTitle = computed(() => {
  const titles = { dashboard: t('dashboard'), users: t('usersManagement'), exams: t('examsManagement'), contests: t('contestsManagement'), trainings: t('trainingsManagement'), quizzes: t('quizzesManagement'), reports: t('reports'), statistics: t('statistics'), profile: t('adminProfile'), settings: t('settings'), backup: t('backupRestore') };
  return titles[activeTab.value] || t('dashboard');
});

const updateStats = () => {
  stats.value = {
    totalUsers: users.value.length,
    totalExams: exams.value.length,
    activeContests: contests.value.filter(c => c.active).length,
    totalTrainings: trainings.value.length,
    completionRate: Math.round((trainings.value.reduce((sum, t) => sum + t.avgProgress, 0) / trainings.value.length) || 0)
  };
};

const addNotification = (message, icon = 'fas fa-bell') => {
  notifications.value.unshift({ id: Date.now(), title: 'Notification', message, icon, time: 'À l\'instant', read: false });
};

// ==================== FONCTIONS ====================
const openEditAdminProfileModal = () => { editAdminForm.value = { ...adminProfile.value }; editAdminProfileModalOpen.value = true; };
const closeEditAdminProfileModal = () => { editAdminProfileModalOpen.value = false; };
const saveAdminProfile = () => { adminProfile.value = { ...adminProfile.value, ...editAdminForm.value }; localStorage.setItem('adminProfile', JSON.stringify(adminProfile.value)); closeEditAdminProfileModal(); addNotification('Profil administrateur mis à jour', 'fas fa-user-edit'); };
const openAdminChangePasswordModal = () => { adminPasswordForm.value = { current: '', new: '', confirm: '' }; adminChangePasswordModalOpen.value = true; };
const closeAdminChangePasswordModal = () => { adminChangePasswordModalOpen.value = false; };
const changeAdminPassword = () => { if (adminPasswordForm.value.new !== adminPasswordForm.value.confirm) { alert(t('confirmPassword')); return; } if (adminPasswordForm.value.new.length < 6) { alert('Le mot de passe doit contenir au moins 6 caractères'); return; } addNotification('Mot de passe administrateur modifié', 'fas fa-key'); closeAdminChangePasswordModal(); };

const openAddContestModal = () => { editingContest.value = null; contestForm.value = { name: '', icon: 'fas fa-gavel', date: new Date().toISOString().split('T')[0], registered: 0, active: true }; contestModalOpen.value = true; };
const editContest = (contest) => { editingContest.value = contest; contestForm.value = { ...contest }; contestModalOpen.value = true; };
const saveContest = () => { if (editingContest.value) { const index = contests.value.findIndex(c => c.id === editingContest.value.id); contests.value[index] = { ...contestForm.value, id: editingContest.value.id }; addNotification(`Concours "${contestForm.value.name}" modifié`, 'fas fa-edit'); } else { contests.value.unshift({ ...contestForm.value, id: Date.now() }); addNotification(`Concours "${contestForm.value.name}" ajouté`, 'fas fa-trophy'); } updateStats(); closeContestModal(); };
const deleteContest = (contest) => { if (confirm(`Supprimer le concours "${contest.name}" ?`)) { contests.value = contests.value.filter(c => c.id !== contest.id); addNotification(`Concours "${contest.name}" supprimé`, 'fas fa-trash'); updateStats(); } };
const toggleContestStatus = (contest) => { contest.active = !contest.active; addNotification(`Concours "${contest.name}" ${contest.active ? 'activé' : 'désactivé'}`, 'fas fa-toggle-on'); updateStats(); };
const closeContestModal = () => { contestModalOpen.value = false; editingContest.value = null; };

const openAddExamModal = () => { editingExam.value = null; examForm.value = { title: '', subject: '', year: new Date().getFullYear().toString(), downloads: 0, active: true }; examModalOpen.value = true; };
const editExam = (exam) => { editingExam.value = exam; examForm.value = { ...exam }; examModalOpen.value = true; };
const saveExam = () => { if (editingExam.value) { const index = exams.value.findIndex(e => e.id === editingExam.value.id); exams.value[index] = { ...examForm.value, id: editingExam.value.id }; addNotification(`Examen "${examForm.value.title}" modifié`, 'fas fa-edit'); } else { exams.value.unshift({ ...examForm.value, id: Date.now() }); addNotification(`Examen "${examForm.value.title}" ajouté`, 'fas fa-file-alt'); } updateStats(); closeExamModal(); };
const deleteExam = (exam) => { if (confirm(`Supprimer l'examen "${exam.title}" ?`)) { exams.value = exams.value.filter(e => e.id !== exam.id); addNotification(`Examen "${exam.title}" supprimé`, 'fas fa-trash'); updateStats(); } };
const toggleExamStatus = (exam) => { exam.active = !exam.active; addNotification(`Examen "${exam.title}" ${exam.active ? 'activé' : 'désactivé'}`, 'fas fa-toggle-on'); };
const closeExamModal = () => { examModalOpen.value = false; editingExam.value = null; };

const openAddTrainingModal = () => { editingTraining.value = null; trainingForm.value = { title: '', description: '', enrolled: 0, avgProgress: 0, active: true }; trainingModalOpen.value = true; };
const editTraining = (training) => { editingTraining.value = training; trainingForm.value = { ...training }; trainingModalOpen.value = true; };
const saveTraining = () => { if (editingTraining.value) { const index = trainings.value.findIndex(t => t.id === editingTraining.value.id); trainings.value[index] = { ...trainingForm.value, id: editingTraining.value.id }; addNotification(`Formation "${trainingForm.value.title}" modifiée`, 'fas fa-edit'); } else { trainings.value.unshift({ ...trainingForm.value, id: Date.now() }); addNotification(`Formation "${trainingForm.value.title}" ajoutée`, 'fas fa-graduation-cap'); } updateStats(); closeTrainingModal(); };
const deleteTraining = (training) => { if (confirm(`Supprimer la formation "${training.title}" ?`)) { trainings.value = trainings.value.filter(t => t.id !== training.id); addNotification(`Formation "${training.title}" supprimée`, 'fas fa-trash'); updateStats(); } };
const toggleTrainingStatus = (training) => { training.active = !training.active; addNotification(`Formation "${training.title}" ${training.active ? 'publiée' : 'dépubliée'}`, 'fas fa-toggle-on'); updateStats(); };
const closeTrainingModal = () => { trainingModalOpen.value = false; editingTraining.value = null; };

const openAddQuizModal = () => { editingQuiz.value = null; quizForm.value = { title: '', description: '', questionsCount: 10 }; quizModalOpen.value = true; };
const editQuiz = (quiz) => { editingQuiz.value = quiz; quizForm.value = { ...quiz }; quizModalOpen.value = true; };
const saveQuiz = () => { if (editingQuiz.value) { const index = quizzes.value.findIndex(q => q.id === editingQuiz.value.id); quizzes.value[index] = { ...quizForm.value, id: editingQuiz.value.id, attempts: editingQuiz.value.attempts }; addNotification(`Quiz "${quizForm.value.title}" modifié`, 'fas fa-edit'); } else { quizzes.value.unshift({ ...quizForm.value, id: Date.now(), attempts: 0, active: true }); addNotification(`Quiz "${quizForm.value.title}" ajouté`, 'fas fa-question-circle'); } closeQuizModal(); };
const deleteQuiz = (quiz) => { if (confirm(`Supprimer le quiz "${quiz.title}" ?`)) { quizzes.value = quizzes.value.filter(q => q.id !== quiz.id); addNotification(`Quiz "${quiz.title}" supprimé`, 'fas fa-trash'); } };
const toggleQuizStatus = (quiz) => { quiz.active = !quiz.active; addNotification(`Quiz "${quiz.title}" ${quiz.active ? 'publié' : 'dépublié'}`, 'fas fa-toggle-on'); };
const closeQuizModal = () => { quizModalOpen.value = false; editingQuiz.value = null; };

const openAddUserModal = () => { editingUser.value = null; userForm.value = { name: '', email: '', phone: '', status: 'active' }; userModalOpen.value = true; };
const editUser = (user) => { editingUser.value = user; userForm.value = { ...user }; userModalOpen.value = true; };
const saveUser = () => { if (editingUser.value) { const index = users.value.findIndex(u => u.id === editingUser.value.id); users.value[index] = { ...userForm.value, id: editingUser.value.id, joined: editingUser.value.joined }; addNotification(`Utilisateur "${userForm.value.name}" modifié`, 'fas fa-user-edit'); } else { users.value.unshift({ ...userForm.value, id: Date.now(), joined: new Date().toISOString().split('T')[0] }); addNotification(`Utilisateur "${userForm.value.name}" ajouté`, 'fas fa-user-plus'); } updateStats(); closeUserModal(); };
const deleteUser = (user) => { if (confirm(`Supprimer l'utilisateur "${user.name}" ?`)) { users.value = users.value.filter(u => u.id !== user.id); addNotification(`Utilisateur "${user.name}" supprimé`, 'fas fa-user-minus'); updateStats(); } };
const toggleUserStatus = (user) => { user.status = user.status === 'active' ? 'inactive' : 'active'; addNotification(`Utilisateur "${user.name}" ${user.status === 'active' ? 'activé' : 'désactivé'}`, 'fas fa-toggle-on'); };
const closeUserModal = () => { userModalOpen.value = false; editingUser.value = null; };

const generateReport = () => {
  if (reportType.value === 'users') reportData.value = users.value.map(u => ({ Nom: u.name, Email: u.email, Statut: u.status, Inscrit: u.joined }));
  else if (reportType.value === 'exams') reportData.value = exams.value.map(e => ({ Titre: e.title, Matière: e.subject, Année: e.year, Téléchargements: e.downloads }));
  else if (reportType.value === 'contests') reportData.value = contests.value.map(c => ({ Nom: c.name, Date: c.date, Inscrits: c.registered, Statut: c.active ? 'Ouvert' : 'Fermé' }));
  else if (reportType.value === 'trainings') reportData.value = trainings.value.map(t => ({ Titre: t.title, Inscrits: t.enrolled, Progression: `${t.avgProgress}%` }));
  else if (reportType.value === 'quizzes') reportData.value = quizzes.value.map(q => ({ Titre: q.title, Questions: q.questionsCount, Tentatives: q.attempts, Statut: q.active ? 'Publié' : 'Brouillon' }));
};
const exportReport = () => { const csv = reportData.value.map(row => Object.values(row).join(',')).join('\n'); const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `rapport_${reportType.value}_${new Date().toISOString().split('T')[0]}.csv`; a.click(); URL.revokeObjectURL(url); };

const markNotificationAsRead = (id) => { const notif = notifications.value.find(n => n.id === id); if (notif && !notif.read) notif.read = true; };
const markAllNotificationsAsRead = () => { notifications.value.forEach(n => n.read = true); };
const openNotificationsModal = () => { notificationsModalOpen.value = true; };
const closeNotificationsModal = () => { notificationsModalOpen.value = false; };
const openSettingsModal = () => { settingsModalOpen.value = true; };
const closeSettingsModal = () => { settingsModalOpen.value = false; };

const createBackup = async () => { backupLoading.value = true; await new Promise(resolve => setTimeout(resolve, 2000)); backupHistory.value.unshift({ id: Date.now(), name: `backup_${new Date().toISOString().split('T')[0]}.zip`, date: new Date().toISOString().split('T')[0], size: '45.5 MB' }); addNotification('Sauvegarde créée avec succès', 'fas fa-database'); backupLoading.value = false; };
const restoreBackup = (event) => { const file = event.target.files[0]; if (file) addNotification(`Restauration depuis ${file.name}`, 'fas fa-upload'); backupFileInput.value.value = ''; };
const downloadBackup = (backup) => { addNotification(`Téléchargement de ${backup.name}`, 'fas fa-download'); };
const logout = () => { router.push('/login'); };

// Chart initialization
const initCharts = () => {
  if (userGrowthChartCanvas.value) { if (userGrowthChart) userGrowthChart.destroy(); userGrowthChart = new Chart(userGrowthChartCanvas.value, { type: 'line', data: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], datasets: [{ label: t('users'), data: [850, 920, 1010, 1120, 1190, 1247], borderColor: '#4F46E5', tension: 0.4, borderWidth: 3, fill: true, backgroundColor: 'rgba(79, 70, 229, 0.1)' }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' } } } }); }
  if (activityChartCanvas.value) { if (activityChart) activityChart.destroy(); activityChart = new Chart(activityChartCanvas.value, { type: 'doughnut', data: { labels: [t('exams'), t('contests'), t('trainings'), t('quizzes')], datasets: [{ data: [42, 28, 18, 12], backgroundColor: ['#4F46E5', '#06B6D4', '#F97316', '#10B981'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } } }); }
  if (monthlyUsersChartCanvas.value) { if (monthlyUsersChart) monthlyUsersChart.destroy(); monthlyUsersChart = new Chart(monthlyUsersChartCanvas.value, { type: 'bar', data: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], datasets: [{ label: t('users'), data: [720, 810, 890, 980, 1050, 1120], backgroundColor: '#4F46E5', borderRadius: 8 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } } }); }
  if (downloadsChartCanvas.value) { if (downloadsChart) downloadsChart.destroy(); downloadsChart = new Chart(downloadsChartCanvas.value, { type: 'line', data: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], datasets: [{ label: t('downloads'), data: [320, 410, 520, 610, 720, 850], borderColor: '#F97316', tension: 0.4, borderWidth: 3, fill: true, backgroundColor: 'rgba(249, 115, 22, 0.1)' }] }, options: { responsive: true, maintainAspectRatio: true } }); }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const savedLanguage = localStorage.getItem('language');
  const savedAdminProfile = localStorage.getItem('adminProfile');
  if (savedTheme === 'dark') { isDarkMode.value = true; document.documentElement.classList.add('dark'); }
  if (savedLanguage === 'en') currentLanguage.value = 'en';
  if (savedAdminProfile) adminProfile.value = JSON.parse(savedAdminProfile);
  updateStats();
  initCharts();
});

watch(activeTab, (newTab) => { if (newTab === 'dashboard') nextTick(() => initCharts()); });
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
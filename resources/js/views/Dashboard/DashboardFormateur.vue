<template>
  <div :class="['min-h-screen', isDarkMode ? 'dark' : '']">
    <div :class="['flex h-screen', isDarkMode ? 'dark' : '']">
      <!-- SIDEBAR -->
      <aside :class="['fixed md:relative z-40 w-64 h-full transition-transform duration-300 ease-in-out flex flex-col shrink-0 overflow-hidden', isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-r border-slate-200', sidebarCollapsed ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
        <button @click="sidebarCollapsed = false" class="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-50"><i class="fas fa-times text-xl"></i></button>
        <div :class="['p-4 md:p-6 border-b', isDarkMode ? 'border-gray-700' : 'border-slate-200']">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl"><i class="fas fa-chalkboard-teacher text-white text-sm md:text-base"></i></div>
            <span :class="['font-bold text-lg md:text-xl tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">Gradus Aura</span>
          </div>
          <div :class="['grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 rounded-2xl border mt-4 md:mt-6', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Étudiants</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ stats.totalStudents }}</p></div>
            <div class="text-center py-1 md:py-2 border-x border-slate-200"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Cours</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ stats.totalCourses }}</p></div>
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Complétion</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ stats.completionRate }}%</p></div>
          </div>
        </div>
        <nav class="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-6 custom-scrollbar">
          <div class="space-y-1"><p class="px-3 text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Menu principal</p>
            <div v-for="item in navItems" :key="item.id" @click="activeSection = item.id; sidebarCollapsed = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeSection === item.id ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]"><i :class="item.icon + ' w-4 md:w-5'"></i><span class="font-black uppercase tracking-widest">{{ item.label }}</span></div>
          </div>
        </nav>
        <div :class="['p-3 md:p-4 border-t', isDarkMode ? 'border-gray-700' : 'border-slate-100']">
          <div class="flex items-center gap-2 md:gap-3 mb-3"><div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">{{ formatterInitials }}</div><div class="flex-1"><p class="text-[10px] md:text-xs font-bold truncate" :class="isDarkMode ? 'text-white' : 'text-slate-950'">{{ formatterName }}</p><p class="text-[8px] md:text-[10px] truncate" :class="isDarkMode ? 'text-gray-400' : 'text-slate-500'">Formateur</p></div></div>
          <button @click="toggleDarkMode" class="w-full mb-2 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition text-[10px] md:text-[12px]" :class="isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"><i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i><span class="font-black uppercase tracking-widest">Mode sombre</span></button>
          <button @click="logout" class="w-full flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition text-[10px] md:text-[12px]"><i class="fas fa-sign-out-alt"></i><span class="font-black uppercase tracking-widest">Déconnexion</span></button>
        </div>
      </aside>
      
      <div v-if="sidebarCollapsed" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="sidebarCollapsed = false"></div>
      
      <main :class="['flex-1 overflow-y-auto custom-scrollbar', isDarkMode ? 'bg-gray-900' : 'bg-slate-50']">
        <header :class="['sticky top-0 z-10 backdrop-blur-sm border-b px-4 md:px-8 py-3 md:py-4', isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-slate-100']">
          <div class="flex justify-between items-center">
            <div><h1 :class="['text-xl md:text-2xl font-black tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">{{ activeMenuTitle }}</h1><div class="flex items-center gap-2 md:gap-3 mt-1"><div class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></div><p class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">ESPACE FORMATEUR</p></div></div>
            <div class="flex items-center gap-2 md:gap-4"><div class="relative cursor-pointer" @click="showNotifications = !showNotifications"><i class="fas fa-bell text-slate-400 text-base md:text-xl hover:text-primary transition"></i><span class="absolute -top-1 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-[6px] md:text-[8px] font-bold rounded-full flex items-center justify-center">{{ unreadNotifications.length }}</span></div><div class="flex items-center gap-2 md:gap-3 ml-1 md:ml-2 cursor-pointer" @click="showUserMenu = !showUserMenu"><div class="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm md:text-base">{{ formatterInitials }}</div></div></div>
          </div>
        </header>
        
        <div class="p-3 md:p-8">
          <!-- SECTION ACCUEIL -->
          <div v-show="activeSection === 'home'" class="section">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-white"><h2 class="text-xl md:text-2xl font-bold">Bonjour, {{ formatterName }} ! 👋</h2><p class="text-indigo-100 mt-2">{{ getWelcomeMessage() }}</p><div class="flex gap-3 mt-4"><button @click="activeSection = 'courses'" class="px-4 py-2 bg-white/20 rounded-xl text-sm font-semibold hover:bg-white/30 transition"><i class="fas fa-plus mr-2"></i>Créer un cours</button><button @click="activeSection = 'assessments'" class="px-4 py-2 bg-white/20 rounded-xl text-sm font-semibold hover:bg-white/30 transition"><i class="fas fa-tasks mr-2"></i>Ajouter un quiz</button><button @click="openBulkMessageModal" class="px-4 py-2 bg-white/20 rounded-xl text-sm font-semibold hover:bg-white/30 transition"><i class="fas fa-envelope mr-2"></i>Envoyer un message</button></div></div>
            
            <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              <div class="stat-card bg-white rounded-2xl p-5 shadow-sm cursor-pointer" @click="activeSection = 'students'"><div class="flex items-center gap-4"><div class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl text-primary"><i class="fas fa-users"></i></div><div><h3 class="text-xs text-slate-500 font-semibold">Total Apprenants</h3><p class="text-2xl font-bold text-slate-900">{{ stats.totalStudents }}</p><span class="text-xs text-green-600">+{{ stats.studentsGrowth }}%</span></div></div></div>
              <div class="stat-card bg-white rounded-2xl p-5 shadow-sm cursor-pointer" @click="activeSection = 'courses'"><div class="flex items-center gap-4"><div class="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-2xl text-primary"><i class="fas fa-book"></i></div><div><h3 class="text-xs text-slate-500 font-semibold">Cours actifs</h3><p class="text-2xl font-bold text-slate-900">{{ courses.filter(c => c.status === 'published').length }}</p><span class="text-xs text-green-600">Publiés</span></div></div></div>
              <div class="stat-card bg-white rounded-2xl p-5 shadow-sm cursor-pointer" @click="activeSection = 'payments'"><div class="flex items-center gap-4"><div class="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl text-primary"><i class="fas fa-money-bill-wave"></i></div><div><h3 class="text-xs text-slate-500 font-semibold">Revenus du mois</h3><p class="text-2xl font-bold text-slate-900">{{ formatPrice(monthlyRevenue) }}</p><span class="text-xs text-green-600">+{{ stats.revenueGrowth }}%</span></div></div></div>
              <div class="stat-card bg-white rounded-2xl p-5 shadow-sm"><div class="flex items-center gap-4"><div class="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-2xl text-primary"><i class="fas fa-chart-line"></i></div><div><h3 class="text-xs text-slate-500 font-semibold">Taux de complétion</h3><p class="text-2xl font-bold text-slate-900">{{ stats.completionRate }}%</p><span class="text-xs text-green-600">Objectif: 85%</span></div></div></div>
            </div>

            <!-- SECTION ACCUEIL - GRAPHIQUES -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  <!-- Graphique 1: Engagement des apprenants (Ligne) -->
  <div class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold text-slate-800 flex items-center gap-2">
        <i class="fas fa-chart-line text-primary"></i> Engagement des apprenants
      </h3>
      <div class="flex gap-2">
        <button @click="engagementPeriod = 'week'" :class="['px-2 py-1 text-xs rounded-lg transition', engagementPeriod === 'week' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Semaine</button>
        <button @click="engagementPeriod = 'month'" :class="['px-2 py-1 text-xs rounded-lg transition', engagementPeriod === 'month' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">Mois</button>
      </div>
    </div>
    <div class="h-64">
      <canvas ref="homeEngagementChart"></canvas>
    </div>
    <div class="mt-4 text-center text-xs text-slate-500">
      <span class="inline-flex items-center gap-1"><i class="fas fa-clock text-primary"></i> Heures d'étude par jour</span>
    </div>
  </div>

  <!-- Graphique 2: Progression par cours (Barres) -->
  <div class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold text-slate-800 flex items-center gap-2">
        <i class="fas fa-chart-bar text-primary"></i> Progression par cours
      </h3>
      <select v-model="selectedHomeCourse" @change="updateHomeCharts" class="px-2 py-1 text-xs border rounded-lg bg-white">
        <option value="all">Tous les cours</option>
        <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title.substring(0,20) }}</option>
      </select>
    </div>
    <div class="h-64">
      <canvas ref="homeProgressionChart"></canvas>
    </div>
    <div class="mt-4 text-center text-xs text-slate-500">
      <span class="inline-flex items-center gap-1"><i class="fas fa-percent text-green-500"></i> Taux de complétion par cours</span>
    </div>
  </div>
</div>

<!-- Graphique 3: Répartition des étudiants (Pie chart) - Pleine largeur -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  <div class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
    <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <i class="fas fa-chart-pie text-primary"></i> Répartition par niveau
    </h3>
    <div class="h-64">
      <canvas ref="homeLevelChart"></canvas>
    </div>
    <div class="mt-4 flex justify-center gap-4 text-xs">
      <span class="inline-flex items-center gap-1"><i class="fas fa-circle text-blue-500"></i> Débutants</span>
      <span class="inline-flex items-center gap-1"><i class="fas fa-circle text-green-500"></i> Intermédiaires</span>
      <span class="inline-flex items-center gap-1"><i class="fas fa-circle text-orange-500"></i> Avancés</span>
    </div>
  </div>

  <!-- Graphique 4: Taux de complétion global (Jauge / Doughnut) -->
  <div class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
    <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <i class="fas fa-chart-simple text-primary"></i> Taux de complétion global
    </h3>
    <div class="h-64 relative">
      <canvas ref="homeCompletionChart"></canvas>
      <div class="absolute inset-0 flex items-center justify-center flex-col">
        <span class="text-4xl font-bold text-primary">{{ stats.completionRate }}%</span>
        <span class="text-xs text-slate-500">de complétion</span>
      </div>
    </div>
    <div class="mt-4 text-center text-xs text-slate-500">
      <span class="inline-flex items-center gap-1"><i class="fas fa-arrow-up text-green-500"></i> +{{ stats.completionTrend }}% ce mois</span>
    </div>
  </div>
</div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-bell text-primary mr-2"></i>Notifications</h3><div class="space-y-3"><div v-for="notif in importantNotifications" :key="notif.id" class="flex items-center gap-3 p-2 bg-slate-50 rounded-xl"><i :class="notif.icon + ' text-primary'"></i><div class="flex-1"><p class="text-sm font-medium">{{ notif.message }}</p><p class="text-xs text-slate-400">{{ notif.time }}</p></div><button v-if="notif.action" @click="notif.action()" class="text-xs text-primary">Voir</button></div></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-history text-primary mr-2"></i>Activité récente</h3><div class="space-y-3"><div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 p-2 border-b border-slate-100"><i :class="activity.icon + ' text-primary'"></i><div class="flex-1"><p class="text-sm">{{ activity.description }}</p><p class="text-xs text-slate-400">{{ activity.time }}</p></div></div></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold text-slate-800 mb-4"><i class="fas fa-calendar-alt text-primary mr-2"></i>Agenda</h3><div class="space-y-3"><div v-for="event in upcomingEvents" :key="event.id" class="flex items-center gap-3 p-2 bg-slate-50 rounded-xl"><i :class="event.icon + ' text-primary'"></i><div class="flex-1"><p class="text-sm font-medium">{{ event.title }}</p><p class="text-xs text-slate-400">{{ event.date }} • {{ event.time }}</p></div><button @click="event.action()" class="text-xs text-primary">Voir</button></div></div></div>
            </div>
            
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5"><h3 class="font-semibold text-slate-800 mb-3"><i class="fas fa-brain text-primary mr-2"></i>Recommandations IA</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-3"><div v-for="rec in aiRecommendations" :key="rec.id" class="flex items-center justify-between p-3 bg-white rounded-xl"><div><p class="text-sm font-medium">{{ rec.message }}</p><p class="text-xs text-slate-400">{{ rec.details }}</p></div><button @click="rec.action()" class="px-3 py-1 bg-primary text-white rounded-lg text-xs">Agir</button></div></div></div>
          </div>

          <!-- SECTION COURS -->
          <div v-show="activeSection === 'courses'" class="section">
            <div class="flex justify-between items-center mb-6 flex-wrap gap-4"><h1 class="text-2xl font-bold text-slate-900 flex items-center gap-2"><i class="fas fa-book text-primary"></i> Mes cours</h1><button class="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition" @click="openCreateCourseModal"><i class="fas fa-plus mr-2"></i>Créer un cours</button></div>
            <div class="courses-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="course in courses" :key="course.id" class="course-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div class="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center cursor-pointer" @click="viewCourseDetails(course)"><img :src="course.image" class="w-full h-full object-cover"><div class="absolute top-2 right-2"><span :class="['px-2 py-1 rounded-full text-xs font-semibold', course.status === 'published' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white']">{{ course.status === 'published' ? 'Publié' : 'Brouillon' }}</span></div><div class="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-lg"><span class="text-white text-xs"><i class="fas fa-users mr-1"></i>{{ course.enrolledStudents }} inscrits</span></div></div>
                <div class="p-4"><h3 class="font-bold text-slate-800 cursor-pointer hover:text-primary" @click="viewCourseDetails(course)">{{ course.title }}</h3><p class="text-xs text-slate-500 mt-1">{{ course.category }}</p><div class="flex justify-between items-center mt-3"><p class="text-sm font-bold text-primary">{{ formatPrice(course.price) }}</p><div class="w-24"><div class="flex items-center gap-1"><div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-primary rounded-full" :style="{ width: course.completionRate + '%' }"></div></div><span class="text-xs">{{ course.completionRate }}%</span></div></div></div>
                <div class="flex gap-2 mt-3"><button @click="openEditCourseModal(course)" class="flex-1 py-1.5 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary/10"><i class="fas fa-edit mr-1"></i>Modifier</button><button @click="openCourseModulesModal(course)" class="flex-1 py-1.5 border border-slate-300 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50"><i class="fas fa-layer-group mr-1"></i>Modules</button><button @click="deleteCourseItem(course)" class="py-1.5 px-2 border border-red-500 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50"><i class="fas fa-trash"></i></button></div></div>
              </div>
            </div>
          </div>

          <!-- SECTION APPRENANTS AVEC CERTIFICAT -->
          <div v-show="activeSection === 'students'" class="section">
            <div class="flex justify-between items-center mb-6 flex-wrap gap-4"><h1 class="text-2xl font-bold text-slate-900 flex items-center gap-2"><i class="fas fa-users text-primary"></i> Apprenants</h1><div class="flex gap-2"><select v-model="studentFilter" class="px-4 py-2 border rounded-xl text-sm bg-white"><option value="all">Tous</option><option value="excellent">Excellents (>16)</option><option value="good">Bons (12-16)</option><option value="average">Moyens (10-12)</option><option value="struggling">En difficulté (<10)</option><option value="inactive">Inactifs</option></select><select v-model="studentCourseFilter" class="px-4 py-2 border rounded-xl text-sm bg-white"><option value="all">Tous les cours</option><option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title }}</option></select><button class="bg-primary text-white px-4 py-2 rounded-xl text-sm" @click="openBulkMessageModal"><i class="fas fa-envelope mr-1"></i>Message groupé</button></div></div>
            <div class="bg-white rounded-2xl shadow-sm overflow-x-auto"><table class="w-full"><thead class="bg-slate-50"><tr><th class="p-4 text-xs font-bold text-slate-400 uppercase">Étudiant</th><th class="p-4 text-xs font-bold text-slate-400 uppercase">Email</th><th class="p-4 text-xs font-bold text-slate-400 uppercase">Cours</th><th class="p-4 text-xs font-bold text-slate-400 uppercase">Progression</th><th class="p-4 text-xs font-bold text-slate-400 uppercase">Note moyenne</th><th class="p-4 text-xs font-bold text-slate-400 uppercase">Actions</th></tr></thead>
              <tbody><tr v-for="student in filteredStudentsByCourse" :key="student.id" class="border-b hover:bg-slate-50"><td class="p-4"><div class="flex items-center gap-3"><img :src="student.avatar" class="w-8 h-8 rounded-full object-cover"><span class="font-medium">{{ student.name }}</span></div></td><td class="p-4 text-sm">{{ student.email }}</td><td class="p-4 text-sm">{{ student.coursesEnrolled }}</td><td class="p-4"><div class="w-32 flex items-center gap-2"><div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-primary rounded-full" :style="{ width: student.progress + '%' }"></div></div><span class="text-xs">{{ student.progress }}%</span></div></td><td class="p-4"><span :class="['px-2 py-1 rounded-full text-xs font-semibold', student.averageGrade >= 16 ? 'bg-green-100 text-green-600' : student.averageGrade >= 12 ? 'bg-blue-100 text-blue-600' : student.averageGrade >= 10 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600']">{{ student.averageGrade }}/20</span></td><td class="p-4"><div class="flex gap-2"><button @click="viewStudentDetails(student)" class="p-1 text-blue-500 hover:bg-blue-50 rounded"><i class="fas fa-eye"></i></button><button @click="messageStudent(student)" class="p-1 text-green-500 hover:bg-green-50 rounded"><i class="fas fa-comment"></i></button><button @click="openCertificateForStudent(student)" class="p-1 text-purple-500 hover:bg-purple-50 rounded"><i class="fas fa-certificate"></i></button></div></td></tr></tbody>
            </table></div>
          </div>

          <!-- SECTION EVALUATIONS -->
          <div v-show="activeSection === 'assessments'" class="section">
            <div class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold text-slate-900 flex items-center gap-2"><i class="fas fa-tasks text-primary"></i> Évaluations</h1><button class="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm" @click="openCreateAssessmentModal"><i class="fas fa-plus mr-2"></i>Créer une évaluation</button></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div v-for="assessment in assessments" :key="assessment.id" class="bg-white rounded-2xl p-5 shadow-sm"><div class="flex justify-between items-start mb-3"><h3 class="font-bold text-slate-800">{{ assessment.title }}</h3><span :class="['px-2 py-1 rounded-full text-xs font-semibold', assessment.type === 'quiz' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600']">{{ assessment.type === 'quiz' ? 'QCM' : 'Examen' }}</span></div><p class="text-sm text-slate-600 mb-3">{{ assessment.description }}</p><div class="flex justify-between text-xs text-slate-500 mb-3"><span><i class="fas fa-clock mr-1"></i>{{ assessment.duration }} min</span><span><i class="fas fa-users mr-1"></i>{{ assessment.submissions }} soumissions</span><span><i class="fas fa-chart-line mr-1"></i>Moy: {{ assessment.averageScore }}/{{ assessment.maxScore }}</span></div><div class="flex gap-2"><button @click="viewAssessmentResultsModal(assessment)" class="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-semibold"><i class="fas fa-chart-bar mr-1"></i>Résultats</button><button @click="openEditAssessmentModal(assessment)" class="p-2 border rounded-lg hover:bg-slate-50"><i class="fas fa-edit text-slate-600"></i></button><button @click="deleteAssessmentItem(assessment)" class="p-2 border border-red-200 rounded-lg hover:bg-red-50"><i class="fas fa-trash text-red-500"></i></button></div></div></div>
          </div>

          <!-- SECTION ANALYTICS AVEC GRAPHIQUES DYNAMIQUES -->
          <div v-show="activeSection === 'analytics'" class="section">
            <div class="mb-6"><h1 class="text-2xl font-bold text-slate-900 flex items-center gap-2"><i class="fas fa-chart-line text-primary"></i> Analytics pédagogiques</h1></div>
            <div class="flex gap-4 mb-6 flex-wrap">
              <select v-model="selectedAnalyticsCourse" @change="updateChartsForCourse" class="px-4 py-2 border rounded-xl text-sm bg-white">
                <option value="all">Tous les cours</option>
                <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title }}</option>
              </select>
              <select v-model="analyticsPeriod" @change="updateChartsForCourse" class="px-4 py-2 border rounded-xl text-sm bg-white">
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="semester">Ce semestre</option>
              </select>
              <button @click="exportAnalytics" class="bg-primary text-white px-4 py-2 rounded-xl text-sm"><i class="fas fa-download mr-1"></i>Exporter Excel</button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-4">Progression des apprenants</h3><div class="h-64"><canvas ref="progressChart"></canvas></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-4">Taux de réussite par cours</h3><div class="h-64"><canvas ref="successRateChart"></canvas></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-4">Engagement (heures/semaine)</h3><div class="h-64"><canvas ref="engagementChart"></canvas></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-4">Taux d'abandon par module</h3><div class="h-64"><canvas ref="dropoutChart"></canvas></div></div>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-4"><i class="fas fa-exclamation-triangle text-primary mr-2"></i>IA - Détection étudiants en difficulté</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"><div v-for="student in strugglingStudents" :key="student.id" class="flex items-center justify-between p-3 bg-red-50 rounded-xl"><div><p class="font-medium">{{ student.name }}</p><p class="text-xs text-slate-500">Progression: {{ student.progress }}% • Note: {{ student.averageGrade }}/20</p></div><button @click="messageStudent(student)" class="px-3 py-1 bg-primary text-white rounded-lg text-xs">Contacter</button></div></div></div>
          </div>

          <!-- SECTION COMMUNICATION -->
          <div v-show="activeSection === 'communication'" class="section">
            <h1 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><i class="fas fa-comments text-primary"></i> Communication</h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="bg-white rounded-2xl p-4 shadow-sm"><h3 class="font-semibold mb-4">Conversations</h3><div class="relative mb-4"><i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i><input type="text" v-model="conversationSearch" placeholder="Rechercher..." class="w-full pl-10 pr-4 py-2 border rounded-xl text-sm"></div><div class="space-y-2 max-h-96 overflow-y-auto"><div v-for="conv in filteredConversations" :key="conv.id" @click="selectConversation(conv.id)" :class="['p-3 rounded-xl cursor-pointer transition', activeConversation === conv.id ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-slate-50']"><div class="flex items-center gap-3"><img :src="conv.avatar" class="w-10 h-10 rounded-full object-cover"><div class="flex-1"><p class="font-semibold text-sm">{{ conv.name }}</p><p class="text-xs text-slate-500 truncate">{{ conv.lastMessage }}</p></div><span class="text-xs text-slate-400">{{ formatTimeShort(conv.lastMessageTime) }}</span></div></div></div></div>
              <div class="bg-white rounded-2xl shadow-sm flex flex-col lg:col-span-2"><div class="p-4 border-b" v-if="currentConversation"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><img :src="currentConversation.avatar" class="w-10 h-10 rounded-full"><div><h4 class="font-semibold">{{ currentConversation.name }}</h4><p class="text-xs text-green-500">En ligne</p></div></div><button @click="startVideoCall" class="px-4 py-2 bg-primary text-white rounded-xl text-sm"><i class="fab fa-google mr-2"></i>Google Meet</button></div></div><div class="chat-messages flex-1 p-4 overflow-y-auto max-h-96" ref="chatMessages"><div v-for="message in conversationMessages" :key="message.id" :class="['flex mb-4', message.sender === 'me' ? 'justify-end' : 'justify-start']"><div :class="['max-w-[70%] p-3 rounded-xl', message.sender === 'me' ? 'bg-primary text-white rounded-br-none' : 'bg-slate-100 rounded-bl-none']"><p>{{ message.text }}</p><p class="text-xs opacity-70 mt-1">{{ formatTime(message.timestamp) }}</p></div></div></div><div class="p-4 border-t flex gap-3"><input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Écrivez votre message..." class="flex-1 px-4 py-2 border rounded-xl text-sm"><button @click="sendMessage" class="px-4 py-2 bg-primary text-white rounded-xl"><i class="fas fa-paper-plane"></i></button></div></div>
            </div>
          </div>

          <!-- SECTION RESSOURCES -->
          <div v-show="activeSection === 'resources'" class="section">
            <div class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold text-slate-900 flex items-center gap-2"><i class="fas fa-folder text-primary"></i> Bibliothèque de ressources</h1><button class="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm" @click="openUploadResourceModal"><i class="fas fa-upload mr-2"></i>Ajouter une ressource</button></div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><div v-for="resource in resources" :key="resource.id" class="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"><i :class="getResourceIcon(resource.type) + ' text-3xl text-primary'"></i><div class="flex-1"><h4 class="font-semibold">{{ resource.name }}</h4><p class="text-xs text-slate-400">{{ resource.size }} • {{ resource.type }}</p><p class="text-xs text-slate-500 mt-1"><i class="fas fa-folder-open mr-1"></i>{{ resource.category }}</p></div><div class="flex gap-2"><button @click="openEditResourceModal(resource)" class="p-2 text-blue-500 hover:bg-blue-50 rounded"><i class="fas fa-edit"></i></button><button @click="downloadResource(resource)" class="p-2 text-green-500 hover:bg-green-50 rounded"><i class="fas fa-download"></i></button><button @click="deleteResource(resource)" class="p-2 text-red-500 hover:bg-red-50 rounded"><i class="fas fa-trash"></i></button></div></div></div>
          </div>

          <!-- SECTION PAIEMENTS -->
          <div v-show="activeSection === 'payments'" class="section">
            <div class="flex justify-between items-center mb-6"><h1 class="text-2xl font-bold text-slate-900 flex items-center gap-2"><i class="fas fa-credit-card text-primary"></i> Gestion des paiements</h1><button @click="exportPaymentsExcel" class="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm"><i class="fas fa-file-excel mr-2"></i>Exporter Excel</button></div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"><div class="bg-white rounded-2xl p-4 text-center"><p class="text-2xl font-bold text-primary">{{ formatPrice(paymentStats.totalAmount) }}</p><p class="text-xs text-slate-500">Total encaissé</p></div><div class="bg-white rounded-2xl p-4 text-center"><p class="text-2xl font-bold text-green-600">{{ formatPrice(paymentStats.thisMonth) }}</p><p class="text-xs text-slate-500">Ce mois</p></div><div class="bg-white rounded-2xl p-4 text-center"><p class="text-2xl font-bold text-blue-600">{{ paymentStats.totalTransactions }}</p><p class="text-xs text-slate-500">Transactions</p></div><div class="bg-white rounded-2xl p-4 text-center"><p class="text-2xl font-bold text-orange-600">{{ formatPrice(paymentStats.pendingAmount) }}</p><p class="text-xs text-slate-500">En attente</p></div></div>
            <div class="bg-white rounded-2xl shadow-sm overflow-x-auto"><table class="w-full"><thead class="bg-slate-50"><tr><th class="p-4 text-xs font-bold uppercase">Étudiant</th><th class="p-4 text-xs font-bold uppercase">Produit</th><th class="p-4 text-xs font-bold uppercase">Type</th><th class="p-4 text-xs font-bold uppercase">Montant</th><th class="p-4 text-xs font-bold uppercase">Date</th><th class="p-4 text-xs font-bold uppercase">Statut</th><th class="p-4 text-xs font-bold uppercase">Facture</th></tr></thead>
              <tbody><tr v-for="payment in payments" :key="payment.id" class="border-b hover:bg-slate-50"><td class="p-4"><div class="flex items-center gap-2"><img :src="payment.studentAvatar" class="w-8 h-8 rounded-full"><span>{{ payment.studentName }}</span></div></td><td class="p-4">{{ payment.productName }}</td><td class="p-4"><span :class="['px-2 py-1 rounded-full text-xs', payment.type === 'cours' ? 'bg-blue-100 text-blue-600' : payment.type === 'formation' ? 'bg-purple-100 text-purple-600' : payment.type === 'livre' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600']">{{ getTypeLabel(payment.type) }}</span></td><td class="p-4 font-bold text-primary">{{ formatPrice(payment.amount) }}</td><td class="p-4">{{ formatDate(payment.date) }}</td><td class="p-4"><span :class="['px-2 py-1 rounded-full text-xs', payment.status === 'payé' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600']">{{ payment.status === 'payé' ? 'Payé' : 'En attente' }}</span></td><td class="p-4"><button @click="downloadInvoicePDF(payment)" class="p-2 text-blue-500 hover:bg-blue-50 rounded"><i class="fas fa-download"></i></button></td></tr></tbody>
            </table></div>
          </div>

          <!-- SECTION PARAMÈTRES / PROFIL -->
          <div v-show="activeSection === 'settings'" class="section">
            <h1 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><i class="fas fa-user-circle text-primary"></i> Mon profil</h1>
            
            <!-- Cartes d'informations -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div class="bg-white rounded-2xl p-6 shadow-sm">
                <div class="text-center">
                  <div class="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">{{ formatterInitials }}</div>
                  <h2 class="text-xl font-bold text-slate-800">{{ formatterProfile.name }}</h2>
                  <p class="text-sm text-slate-500">{{ formatterProfile.email }}</p>
                  <p class="text-xs text-slate-400 mt-1">Formateur certifié</p>
                  <div class="mt-4 flex justify-center gap-2"><span class="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Actif</span><span class="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Premium</span></div>
                </div>
              </div>
              
              <div class="bg-white rounded-2xl p-6 shadow-sm">
                <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2"><i class="fas fa-chart-simple text-primary"></i> Mes statistiques</h3>
                <div class="space-y-3">
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl"><span class="text-sm"><i class="fas fa-users text-primary mr-2"></i>Total étudiants</span><span class="font-bold text-primary">{{ stats.totalStudents }}</span></div>
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl"><span class="text-sm"><i class="fas fa-book text-primary mr-2"></i>Total cours</span><span class="font-bold text-primary">{{ stats.totalCourses }}</span></div>
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl"><span class="text-sm"><i class="fas fa-chart-line text-primary mr-2"></i>Taux de complétion</span><span class="font-bold text-primary">{{ stats.completionRate }}%</span></div>
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl"><span class="text-sm"><i class="fas fa-money-bill-wave text-primary mr-2"></i>Revenus totaux</span><span class="font-bold text-primary">{{ formatPrice(stats.revenue) }}</span></div>
                </div>
              </div>
              
              <div class="bg-white rounded-2xl p-6 shadow-sm">
                <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2"><i class="fas fa-code text-primary"></i> Mes compétences</h3>
                <div class="flex flex-wrap gap-2"><span v-for="skill in formatterProfile.skills.split(',')" :key="skill" class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">{{ skill.trim() }}</span></div>
                <div class="mt-4"><h4 class="text-sm font-semibold text-slate-700 mb-2">Bio</h4><p class="text-sm text-slate-600">{{ formatterProfile.bio || 'Aucune biographie renseignée' }}</p></div>
              </div>
            </div>
            
            <!-- Formulaire de modification -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2"><i class="fas fa-edit text-primary"></i> Modifier mon profil</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label class="block text-sm font-semibold text-slate-700 mb-2">Nom complet</label><input type="text" v-model="formatterProfile.name" class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"></div>
                <div><label class="block text-sm font-semibold text-slate-700 mb-2">Email</label><input type="email" v-model="formatterProfile.email" class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"></div>
                <div class="md:col-span-2"><label class="block text-sm font-semibold text-slate-700 mb-2">Bio</label><textarea v-model="formatterProfile.bio" rows="3" class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Présentez-vous..."></textarea></div>
                <div class="md:col-span-2"><label class="block text-sm font-semibold text-slate-700 mb-2">Compétences (séparées par des virgules)</label><input type="text" v-model="formatterProfile.skills" class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Python, JavaScript, IA, ..."><p class="text-xs text-slate-400 mt-1">Exemple: Python, JavaScript, Data Science, Marketing</p></div>
              </div>
              <div class="mt-6 flex justify-end"><button @click="saveProfile" class="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-indigo-700 transition"><i class="fas fa-save mr-2"></i>Enregistrer</button></div>
            </div>
            
            <!-- Sécurité -->
            <div class="bg-white rounded-2xl p-6 shadow-sm mt-6"><h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2"><i class="fas fa-shield-alt text-primary"></i> Sécurité</h3><div class="flex flex-wrap gap-4"><button @click="openChangePasswordModal" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition flex items-center gap-2"><i class="fas fa-key"></i> Changer mot de passe</button><button @click="enable2FA" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition flex items-center gap-2"><i class="fas fa-mobile-alt"></i> Activer 2FA</button><button @click="exportMyData" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition flex items-center gap-2"><i class="fas fa-download"></i> Exporter mes données</button></div></div>
            
            <!-- Préférences -->
            <div class="bg-white rounded-2xl p-6 shadow-sm mt-6"><h3 class="font-semibold text-slate-800 mb-4 flex items-center gap-2"><i class="fas fa-bell text-primary"></i> Préférences de notification</h3><div class="space-y-3"><label class="flex items-center gap-3 cursor-pointer"><input type="checkbox" v-model="notificationSettings.email" class="w-4 h-4 text-primary rounded focus:ring-primary"><span>Notifications par email</span></label><label class="flex items-center gap-3 cursor-pointer"><input type="checkbox" v-model="notificationSettings.inApp" class="w-4 h-4 text-primary rounded"><span>Notifications in-app</span></label><label class="flex items-center gap-3 cursor-pointer"><input type="checkbox" v-model="notificationSettings.strugglingStudents" class="w-4 h-4 text-primary rounded"><span>Alerte étudiants en difficulté</span></label></div></div>
          </div>
        </div>
      </main>
    </div>

    <!-- MODAL CRÉATION ÉVALUATION -->
    <div v-if="showCreateAssessmentModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeCreateAssessmentModal"><div class="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"><div class="sticky top-0 bg-white p-5 border-b"><h2 class="text-xl font-bold"><i class="fas fa-plus-circle text-primary mr-2"></i>Créer une évaluation</h2><button @click="closeCreateAssessmentModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><form @submit.prevent="saveNewAssessment" class="p-5"><div class="mb-4"><label class="block text-sm font-semibold mb-2">Titre</label><input type="text" v-model="newAssessmentForm.title" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Description</label><textarea v-model="newAssessmentForm.description" rows="3" required class="w-full px-4 py-2 border rounded-xl"></textarea></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Type</label><select v-model="newAssessmentForm.type" class="w-full px-4 py-2 border rounded-xl"><option value="quiz">QCM</option><option value="exam">Examen</option></select></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Durée (minutes)</label><input type="number" v-model="newAssessmentForm.duration" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Note maximale</label><input type="number" v-model="newAssessmentForm.maxScore" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Cours associé</label><select v-model="newAssessmentForm.courseId" class="w-full px-4 py-2 border rounded-xl"><option v-for="c in courses" :key="c.id" :value="c.id">{{ c.title }}</option></select></div><div class="flex gap-3"><button type="button" @click="closeCreateAssessmentModal" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl">Créer</button></div></form></div></div>

    <!-- MODAL MODIFICATION ÉVALUATION -->
    <div v-if="showEditAssessmentModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeEditAssessmentModal"><div class="bg-white rounded-2xl w-full max-w-md"><div class="p-5 border-b"><h2 class="text-xl font-bold"><i class="fas fa-edit text-primary mr-2"></i>Modifier l'évaluation</h2><button @click="closeEditAssessmentModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><form @submit.prevent="saveAssessmentChanges" class="p-5"><div class="mb-4"><label class="block text-sm font-semibold mb-2">Titre</label><input type="text" v-model="editAssessmentForm.title" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Description</label><textarea v-model="editAssessmentForm.description" rows="3" required class="w-full px-4 py-2 border rounded-xl"></textarea></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Type</label><select v-model="editAssessmentForm.type" class="w-full px-4 py-2 border rounded-xl"><option value="quiz">QCM</option><option value="exam">Examen</option></select></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Durée (min)</label><input type="number" v-model="editAssessmentForm.duration" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Note max</label><input type="number" v-model="editAssessmentForm.maxScore" required class="w-full px-4 py-2 border rounded-xl"></div><div class="flex gap-3"><button type="button" @click="closeEditAssessmentModal" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl">Enregistrer</button></div></form></div></div>

    <!-- MODAL RÉSULTATS ÉVALUATION -->
    <div v-if="showAssessmentResultsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeAssessmentResultsModal"><div class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"><div class="sticky top-0 bg-white p-5 border-b"><h2 class="text-xl font-bold"><i class="fas fa-chart-bar text-primary mr-2"></i>Résultats - {{ selectedAssessment?.title }}</h2><button @click="closeAssessmentResultsModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><div class="p-5"><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"><div class="bg-slate-50 rounded-xl p-3 text-center"><p class="text-2xl font-bold text-primary">{{ selectedAssessment?.submissions }}</p><p class="text-xs">Soumissions</p></div><div class="bg-slate-50 rounded-xl p-3 text-center"><p class="text-2xl font-bold text-primary">{{ selectedAssessment?.averageScore }}/{{ selectedAssessment?.maxScore }}</p><p class="text-xs">Moyenne</p></div><div class="bg-slate-50 rounded-xl p-3 text-center"><p class="text-2xl font-bold text-green-600">{{ getSuccessRate(selectedAssessment) }}%</p><p class="text-xs">Réussite</p></div><div class="bg-slate-50 rounded-xl p-3 text-center"><p class="text-2xl font-bold text-orange-600">{{ selectedAssessment?.duration }} min</p><p class="text-xs">Durée</p></div></div><table class="w-full"><thead class="bg-slate-50"><tr><th class="p-3 text-left text-xs font-bold">Étudiant</th><th class="p-3 text-left text-xs font-bold">Note</th><th class="p-3 text-left text-xs font-bold">Statut</th><th class="p-3 text-left text-xs font-bold">Temps</th><th class="p-3 text-left text-xs font-bold">Actions</th></tr></thead><tbody><tr v-for="result in mockResults" :key="result.id" class="border-b"><td class="p-3"><div class="flex items-center gap-2"><img :src="result.avatar" class="w-6 h-6 rounded-full"><span class="text-sm">{{ result.name }}</span></div></td><td class="p-3 font-semibold">{{ result.score }}/{{ selectedAssessment?.maxScore }}</td><td class="p-3"><span :class="['px-2 py-0.5 rounded-full text-xs', result.score >= (selectedAssessment?.maxScore || 20) * 0.5 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600']">{{ result.score >= (selectedAssessment?.maxScore || 20) * 0.5 ? 'Validé' : 'Non validé' }}</span></td><td class="p-3 text-sm">{{ result.time }} min</td><td class="p-3"><button @click="viewStudentResult(result)" class="text-primary text-sm"><i class="fas fa-eye"></i></button></td></tr></tbody></table></div></div></div>

    <!-- MODAL CERTIFICAT -->
    <div v-if="showCertificateModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto py-8" @click.self="closeCertificateModal"><div class="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl max-w-5xl w-full mx-4"><div id="certificat" class="relative rounded-2xl overflow-hidden text-white"><svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none"><defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fbbf24"/><stop offset="50%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/></linearGradient><linearGradient id="goldLight" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fef3c7"/><stop offset="100%" stop-color="#fbbf24"/></linearGradient></defs><path d="M0,0 C150,100 150,500 0,600 L100,600 C250,450 250,150 100,0 Z" fill="url(#gold)"/><path d="M800,0 C650,100 650,500 800,600 L700,600 C550,450 550,150 700,0 Z" fill="url(#gold)"/><path d="M50,100 L80,80 L70,120 Z" fill="url(#goldLight)" opacity="0.5"/><path d="M750,100 L720,80 L730,120 Z" fill="url(#goldLight)" opacity="0.5"/></svg><div class="absolute left-6 top-1/2 -translate-y-1/2 -mt-16"><div class="crown-container"><i class="fas fa-crown text-3xl text-yellow-400 crown-icon"></i><svg class="crown-svg" width="60" height="40" viewBox="0 0 60 40" fill="none"><path d="M10,35 L5,15 L15,25 L30,5 L45,25 L55,15 L50,35 Z" fill="url(#gold)" stroke="#b45309" stroke-width="1.5"/><circle cx="30" cy="8" r="3" fill="#fef3c7"/><circle cx="15" cy="20" r="2.5" fill="#fef3c7"/><circle cx="45" cy="20" r="2.5" fill="#fef3c7"/></svg></div></div><div class="absolute left-6 top-1/2 -translate-y-1/2"><div class="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-xl medal-glow"><div class="w-20 h-20 bg-[#0b1a2d] rounded-full flex items-center justify-center text-center flex-col"><i class="fas fa-award text-yellow-400 text-xl mb-1"></i><span class="text-xs text-yellow-400 font-bold">Best</span><span class="text-xs text-yellow-400 font-bold">Award</span></div></div></div><div class="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-yellow-500/30"><div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"><i class="fas fa-graduation-cap text-white text-sm"></i></div><span class="text-sm font-bold text-yellow-400">Gradus Aura</span></div><div class="relative z-10 p-10 text-center"><h1 class="text-4xl md:text-5xl font-bold tracking-widest" style="font-family: 'Georgia', serif;">CERTIFICAT</h1><p class="text-yellow-400 tracking-widest mt-2">DE RÉUSSITE</p><p class="mt-6 text-gray-300">Décerné à</p><h2 class="text-3xl md:text-4xl text-yellow-400 border-b border-gray-500 inline-block mt-4">{{ certificateData.studentName }}</h2><p class="mt-6 max-w-xl mx-auto italic text-gray-200" style="font-family: 'Georgia', serif; font-style: italic; line-height: 1.6;">Ce certificat récompense les efforts exceptionnels, la persévérance et l'excellence démontrés tout au long du programme de formation. Votre dévouement, votre travail acharné et votre engagement sans faille vous ont permis d'atteindre des résultats remarquables. Nous vous félicitons chaleureusement pour cette brillante réussite et vous encourageons à poursuivre sur cette voie d'excellence.</p><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10"><div><input type="date" v-model="certificateData.date" class="bg-transparent border-b border-yellow-500/50 w-full text-center text-white focus:border-yellow-400 outline-none"><p class="text-xs text-gray-400 mt-1">Date</p></div><div><div @click="openSignatureModal" class="cursor-pointer"><div v-if="signatureImage" class="flex justify-center"><img :src="signatureImage" class="h-10 mx-auto object-contain"></div><div v-else class="text-gray-400 text-center border-b border-yellow-500/50 pb-1">Signer</div></div><p class="text-xs text-gray-400 mt-1">Signature</p></div><div><input v-model="certificateData.trainer" placeholder="Formateur" class="bg-transparent border-b border-yellow-500/50 w-full text-center text-white focus:border-yellow-400 outline-none"><p class="text-xs text-gray-400 mt-1">Formateur</p></div><div><div @click="openStampModal" class="cursor-pointer"><div v-if="stampImage" class="flex justify-center"><img :src="stampImage" class="w-12 h-12 mx-auto object-contain"></div><div v-else class="text-gray-400 text-center border-b border-yellow-500/50 pb-1">Cachet</div></div><p class="text-xs text-gray-400 mt-1">Cachet</p></div></div></div><div class="absolute bottom-4 right-4 opacity-30"><i class="fas fa-certificate text-yellow-500 text-4xl"></i></div></div><div class="flex justify-center gap-4 p-6 bg-gradient-to-r from-slate-900 to-indigo-900 rounded-b-2xl"><button @click="generateCertificatePDF" :disabled="certificateLoading" class="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-2 rounded-lg text-white font-semibold hover:shadow-lg transition-all transform hover:scale-105"><i class="fas fa-download mr-2"></i>{{ certificateLoading ? 'Génération...' : 'Télécharger le certificat' }}</button><button @click="closeCertificateModal" class="border border-yellow-500/50 px-6 py-2 rounded-lg text-white hover:bg-yellow-500/10 transition-all"><i class="fas fa-times mr-2"></i>Fermer</button></div></div></div>

    <!-- SIGNATURE MODAL -->
    <div v-if="signatureModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" @click.self="signatureModal=false"><div class="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl shadow-2xl w-[500px] border-2 border-yellow-500"><div class="text-center mb-4"><div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"><i class="fas fa-pen-fancy text-white text-2xl"></i></div><h3 class="text-xl font-bold text-yellow-800">Signature manuscrite</h3><p class="text-sm text-yellow-600">Signez dans la zone ci-dessous</p></div><div class="border-2 border-yellow-400 rounded-lg overflow-hidden bg-white"><canvas ref="signatureCanvas" width="450" height="150" class="w-full cursor-crosshair" style="touch-action: none;"></canvas></div><div class="flex gap-3 mt-4 justify-center"><button @click="clearSignature" class="px-4 py-2 border border-yellow-400 rounded-lg text-yellow-700 hover:bg-yellow-100 transition">Effacer</button><button @click="saveSignature" class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition">Valider</button><button @click="signatureModal=false" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">Fermer</button></div></div></div>

    <!-- STAMP MODAL -->
    <div v-if="stampModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" @click.self="stampModal=false"><div class="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl shadow-2xl w-[450px] border-2 border-yellow-500"><div class="text-center mb-4"><div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"><i class="fas fa-stamp text-white text-2xl"></i></div><h3 class="text-xl font-bold text-yellow-800">Ajouter un cachet officiel</h3><p class="text-sm text-yellow-600">Importez l'image du cachet (PNG, JPG)</p></div><div class="border-2 border-dashed border-yellow-400 rounded-lg p-8 text-center cursor-pointer hover:bg-yellow-100 transition-all" @click="triggerStampUpload"><i class="fas fa-cloud-upload-alt text-4xl text-yellow-500 mb-2"></i><p class="text-yellow-700">Cliquez pour importer une image</p><p class="text-xs text-yellow-500 mt-1">PNG, JPG (Max 2MB)</p><input type="file" ref="stampInput" class="hidden" accept="image/*" @change="handleStampUpload"></div><div v-if="stampPreview" class="mt-4 flex justify-center"><div class="relative"><img :src="stampPreview" class="w-24 h-24 object-contain border-2 border-yellow-400 rounded-lg p-2"><button @click="stampPreview=null; stampImage=null" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600">✕</button></div></div><div class="flex gap-3 mt-4"><button @click="confirmStamp" class="flex-1 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition">Valider</button><button @click="stampModal=false" class="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">Annuler</button></div></div></div>

    <!-- MODAL MESSAGE GROUPÉ -->
    <div v-if="showBulkMessageModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeBulkMessageModal"><div class="bg-white rounded-2xl w-full max-w-md"><div class="p-5 border-b"><h2 class="text-xl font-bold"><i class="fas fa-envelope text-primary mr-2"></i>Message groupé</h2><button @click="closeBulkMessageModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><div class="p-5"><div class="mb-4"><label class="block text-sm font-semibold mb-2">Destinataires</label><select v-model="bulkMessageRecipients" class="w-full px-4 py-2 border rounded-xl"><option value="all">Tous les étudiants</option><option value="excellent">Excellents (>16/20)</option><option value="struggling">En difficulté (<10/20)</option><option value="inactive">Inactifs</option></select></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Objet</label><input type="text" v-model="bulkMessageSubject" class="w-full px-4 py-2 border rounded-xl" placeholder="Objet"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Message</label><textarea v-model="bulkMessageContent" rows="4" class="w-full px-4 py-2 border rounded-xl" placeholder="Message..."></textarea></div><div class="flex gap-3"><button @click="closeBulkMessageModal" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button @click="sendBulkMessage" class="flex-1 py-2 bg-primary text-white rounded-xl">Envoyer</button></div></div></div></div>

    <!-- MODAL UPLOAD RESSOURCE -->
    <div v-if="showUploadResourceModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeUploadResourceModal"><div class="bg-white rounded-2xl w-full max-w-md"><div class="p-5 border-b"><h2 class="text-xl font-bold"><i class="fas fa-upload text-primary mr-2"></i>{{ editingResource ? 'Modifier' : 'Ajouter' }} une ressource</h2><button @click="closeUploadResourceModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><form @submit.prevent="saveResource" class="p-5"><div class="mb-4"><label class="block text-sm font-semibold mb-2">Nom</label><input type="text" v-model="resourceForm.name" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Type</label><select v-model="resourceForm.type" class="w-full px-4 py-2 border rounded-xl"><option value="pdf">PDF</option><option value="video">Vidéo</option><option value="doc">Document</option><option value="image">Image</option></select></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Catégorie</label><select v-model="resourceForm.category" class="w-full px-4 py-2 border rounded-xl"><option value="Cours Python">Cours Python</option><option value="Data Science">Data Science</option><option value="Marketing">Marketing</option><option value="Design">Design</option></select></div><div class="mb-4" v-if="!editingResource"><label class="block text-sm font-semibold mb-2">URL de la ressource</label><input type="url" v-model="resourceForm.url" placeholder="https://..." class="w-full px-4 py-2 border rounded-xl"></div><div class="flex gap-3"><button type="button" @click="closeUploadResourceModal" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl">Enregistrer</button></div></form></div></div>

    <!-- MODAL CRÉATION/MODIFICATION COURS -->
    <div v-if="showCourseModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeCourseModal"><div class="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"><div class="sticky top-0 bg-white p-5 border-b"><h2 class="text-xl font-bold"><i class="fas fa-edit text-primary mr-2"></i>{{ editingCourse ? 'Modifier' : 'Créer' }} un cours</h2><button @click="closeCourseModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><form @submit.prevent="saveCourse" class="p-5"><div class="mb-4"><label class="block text-sm font-semibold mb-2">Titre</label><input type="text" v-model="courseForm.title" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Description</label><textarea v-model="courseForm.description" rows="3" required class="w-full px-4 py-2 border rounded-xl"></textarea></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Catégorie</label><select v-model="courseForm.category" class="w-full px-4 py-2 border rounded-xl"><option value="programming">Programmation</option><option value="design">Design</option><option value="business">Business</option><option value="marketing">Marketing</option></select></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Niveau</label><select v-model="courseForm.level" class="w-full px-4 py-2 border rounded-xl"><option value="beginner">Débutant</option><option value="intermediate">Intermédiaire</option><option value="advanced">Avancé</option></select></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Prix (FCFA)</label><input type="number" v-model="courseForm.price" class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Image du cours</label><input type="file" @change="uploadCourseImage" accept="image/*" class="w-full"><div v-if="courseForm.imagePreview" class="mt-2"><img :src="courseForm.imagePreview" class="w-full h-32 object-cover rounded-xl"></div></div><div class="flex gap-3"><button type="button" @click="closeCourseModal" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl">Enregistrer</button></div></form></div></div>

    <!-- MODAL MODULES -->
    <div v-if="showModulesModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeModulesModal"><div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"><div class="sticky top-0 bg-white p-5 border-b"><h2 class="text-xl font-bold"><i class="fas fa-layer-group text-primary mr-2"></i>Modules - {{ selectedCourseForModules?.title }}</h2><button @click="closeModulesModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><div class="p-5"><div class="mb-4 flex justify-between"><h3 class="font-semibold">Chapitres</h3><button @click="addModule" class="text-primary text-sm"><i class="fas fa-plus mr-1"></i>Ajouter un chapitre</button></div><div class="space-y-3"><div v-for="(module, idx) in selectedCourseForModules.modules" :key="module.id" class="bg-slate-50 rounded-xl p-4"><div class="flex justify-between items-center mb-3"><i class="fas fa-grip-vertical text-slate-400"></i><input type="text" v-model="module.title" class="flex-1 mx-3 px-3 py-1 border rounded-lg text-sm font-medium" placeholder="Titre du chapitre"><button @click="removeModule(idx)" class="text-red-500"><i class="fas fa-trash"></i></button></div><div class="pl-6 space-y-2"><div v-for="(lesson, lIdx) in module.lessons" :key="lIdx" class="flex items-center gap-2"><i :class="lesson.type === 'video' ? 'fas fa-video' : lesson.type === 'pdf' ? 'fas fa-file-pdf' : 'fas fa-file-alt'" class="text-primary text-sm"></i><input type="text" v-model="lesson.title" class="flex-1 px-2 py-1 border-b text-sm" placeholder="Titre de la leçon"><select v-model="lesson.type" class="px-2 py-1 border rounded-lg text-xs"><option value="video">Vidéo</option><option value="pdf">PDF</option><option value="text">Texte</option></select><button @click="removeLesson(idx, lIdx)" class="text-red-500 text-xs"><i class="fas fa-times"></i></button></div><button @click="addLesson(idx)" class="text-xs text-primary mt-2"><i class="fas fa-plus mr-1"></i>Ajouter une leçon</button></div></div></div><div class="flex justify-end mt-6"><button @click="saveModules" class="px-6 py-2 bg-primary text-white rounded-xl">Enregistrer</button></div></div></div></div>

    <!-- MODAL NOTIFICATIONS -->
    <div v-if="showNotifications" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="showNotifications = false"><div class="bg-white rounded-2xl w-full max-w-md overflow-hidden"><div class="p-5 border-b bg-gradient-to-r from-indigo-50 to-cyan-50 flex justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center"><i class="fas fa-bell text-white"></i></div><h2 class="text-lg font-bold">Notifications</h2></div><button @click="showNotifications = false" class="w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><div class="max-h-96 overflow-y-auto"><div v-for="n in notifications" :key="n.id" class="p-4 border-b hover:bg-slate-50"><div class="flex gap-3"><div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center"><i :class="n.icon + ' text-primary text-lg'"></i></div><div><p class="font-bold text-sm">{{ n.title }}</p><p class="text-xs text-slate-500">{{ n.message }}</p><p class="text-[10px] text-slate-400 mt-1">{{ n.time }}</p></div></div></div></div></div></div>

    <!-- MODAL CHANGEMENT MOT DE PASSE -->
    <div v-if="showChangePasswordModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="closeChangePasswordModal"><div class="bg-white rounded-2xl w-full max-w-md"><div class="p-5 border-b"><h2 class="text-xl font-bold"><i class="fas fa-key text-primary mr-2"></i>Changer le mot de passe</h2><button @click="closeChangePasswordModal" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100"><i class="fas fa-times"></i></button></div><form @submit.prevent="changePassword" class="p-5"><div class="mb-4"><label class="block text-sm font-semibold mb-2">Mot de passe actuel</label><input type="password" v-model="passwordForm.current" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Nouveau mot de passe</label><input type="password" v-model="passwordForm.new" required class="w-full px-4 py-2 border rounded-xl"></div><div class="mb-4"><label class="block text-sm font-semibold mb-2">Confirmer</label><input type="password" v-model="passwordForm.confirm" required class="w-full px-4 py-2 border rounded-xl"></div><div class="flex gap-3"><button type="button" @click="closeChangePasswordModal" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl">Changer</button></div></form></div></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default {
  name: 'DashboardFormateur',
  setup() {
    const router = useRouter()
    
    // Récupération des données du formateur depuis localStorage
    const savedFormatter = localStorage.getItem('formateurData')
    const formatterData = savedFormatter ? JSON.parse(savedFormatter) : { 
      name: 'Jean Dupont', 
      email: 'jean.dupont@gradusaura.com', 
      bio: 'Formateur expert en développement web et data science', 
      skills: 'Python, JavaScript, IA, Base de données' 
    }
    
    // State
    const isDarkMode = ref(false)
    const sidebarCollapsed = ref(false)
    const activeSection = ref('home')
    const showNotifications = ref(false)
    const showCourseModal = ref(false)
    const showModulesModal = ref(false)
    const showAssessmentResultsModal = ref(false)
    const showBulkMessageModal = ref(false)
    const showUploadResourceModal = ref(false)
    const showCertificateModal = ref(false)
    const showCreateAssessmentModal = ref(false)
    const showEditAssessmentModal = ref(false)
    const showChangePasswordModal = ref(false)
    const showUserMenu = ref(false)
    const studentFilter = ref('all')
    const studentCourseFilter = ref('all')
    const conversationSearch = ref('')
    const selectedAnalyticsCourse = ref('all')
    const analyticsPeriod = ref('month')
    const activeConversation = ref(null)
    const newMessage = ref('')
    const editingCourse = ref(null)
    const editingResource = ref(null)
    const editingAssessment = ref(null)
    const selectedCourseForModules = ref(null)
    const selectedAssessment = ref(null)
    const bulkMessageRecipients = ref('all')
    const bulkMessageSubject = ref('')
    const bulkMessageContent = ref('')
    
    // Certificate state
    const certificateData = ref({ studentName: '', studentEmail: '', studentGrade: 0, courseName: '', date: new Date().toISOString().split('T')[0], trainer: formatterData.name })
    const certificateLoading = ref(false)
    const signatureModal = ref(false)
    const stampModal = ref(false)
    const signatureImage = ref(null)
    const stampImage = ref(null)
    const stampPreview = ref(null)
    const signatureCanvas = ref(null)
    let signatureCtx = null
    let drawing = false
    const stampInput = ref(null)
    
    // Formulaires
    const courseForm = ref({ title: '', description: '', category: 'programming', level: 'beginner', price: 0, imagePreview: null, imageFile: null })
    const resourceForm = ref({ name: '', type: 'pdf', category: 'Cours Python', url: '' })
    const newAssessmentForm = ref({ title: '', description: '', type: 'quiz', duration: 30, maxScore: 20, courseId: null })
    const editAssessmentForm = ref({ title: '', description: '', type: 'quiz', duration: 30, maxScore: 20 })
    const passwordForm = ref({ current: '', new: '', confirm: '' })
    
    // Charts refs
    const progressChart = ref(null)
    const successRateChart = ref(null)
    const engagementChart = ref(null)
    const dropoutChart = ref(null)
    const chatMessages = ref(null)
    let progressChartInstance = null
    let successRateChartInstance = null
    let engagementChartInstance = null
    let dropoutChartInstance = null
    
    const formatterName = ref(formatterData.name)
    const formatterEmail = ref(formatterData.email)
    const formatterInitials = computed(() => formatterName.value.split(' ').map(n => n[0]).join(''))
    
    // Stats
    const stats = ref({ totalStudents: 1247, studentsGrowth: 12.5, totalCourses: 15, completionRate: 78, completionTrend: 5.2, revenue: 7825000, revenueGrowth: 15.3, successRate: 87 })
    const monthlyRevenue = computed(() => payments.value.filter(p => p.status === 'payé' && new Date(p.date).getMonth() === new Date().getMonth()).reduce((s, p) => s + p.amount, 0))
    
    // Dans setup(), ajoutez ces refs et méthodes

const homeEngagementChart = ref(null)
const homeProgressionChart = ref(null)
const homeLevelChart = ref(null)
const homeCompletionChart = ref(null)
const engagementPeriod = ref('week')
const selectedHomeCourse = ref('all')

let homeEngagementChartInstance = null
let homeProgressionChartInstance = null
let homeLevelChartInstance = null
let homeCompletionChartInstance = null

// Initialiser tous les graphiques de l'accueil
const initHomeCharts = () => {
  // 1. Graphique d'engagement (connexions par jour)
  if (homeEngagementChart.value) {
    if (homeEngagementChartInstance) homeEngagementChartInstance.destroy()
    
    let data
    if (engagementPeriod.value === 'week') {
      data = [2.5, 3.2, 2.8, 4.1, 3.5, 1.8, 1.2]
    } else {
      data = [65, 72, 68, 80, 75, 82, 78, 85, 79, 73, 70, 68, 72, 76, 74, 69, 71, 77, 81, 79, 75, 72, 70, 68, 73, 77, 80, 76, 74, 71]
    }
    
    homeEngagementChartInstance = new Chart(homeEngagementChart.value, {
      type: 'line',
      data: {
        labels: engagementPeriod.value === 'week' 
          ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
          : Array.from({length: 30}, (_, i) => `${i+1}`),
        datasets: [{
          label: 'Heures d\'étude',
          data: data,
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79,70,229,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#4f46e5',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { position: 'top' } }
      }
    })
  }
  
  // 2. Graphique de progression par cours (barres)
  if (homeProgressionChart.value) {
    if (homeProgressionChartInstance) homeProgressionChartInstance.destroy()
    
    let displayCourses
    if (selectedHomeCourse.value === 'all') {
      displayCourses = courses.value.slice(0,8)
    } else {
      const course = courses.value.find(c => c.id == selectedHomeCourse.value)
      displayCourses = course ? [course] : courses.value.slice(0,8)
    }
    
    homeProgressionChartInstance = new Chart(homeProgressionChart.value, {
      type: 'bar',
      data: {
        labels: displayCourses.map(c => c.title.length > 15 ? c.title.substring(0,12)+'...' : c.title),
        datasets: [{
          label: 'Taux de complétion (%)',
          data: displayCourses.map(c => c.completionRate),
          backgroundColor: '#10b981',
          borderRadius: 8,
          barPercentage: 0.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { min: 0, max: 100 } }
      }
    })
  }
  
  // 3. Graphique de répartition par niveau (camembert)
  if (homeLevelChart.value) {
    if (homeLevelChartInstance) homeLevelChartInstance.destroy()
    
    const debutants = students.value.filter(s => s.progress < 33).length
    const intermediaires = students.value.filter(s => s.progress >= 33 && s.progress < 66).length
    const avances = students.value.filter(s => s.progress >= 66).length
    
    homeLevelChartInstance = new Chart(homeLevelChart.value, {
      type: 'doughnut',
      data: {
        labels: ['Débutants', 'Intermédiaires', 'Avancés'],
        datasets: [{
          data: [debutants, intermediaires, avances],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { position: 'bottom' } },
        cutout: '60%'
      }
    })
  }
  
  // 4. Graphique de taux de complétion global (jauge)
  if (homeCompletionChart.value) {
    if (homeCompletionChartInstance) homeCompletionChartInstance.destroy()
    
    homeCompletionChartInstance = new Chart(homeCompletionChart.value, {
      type: 'doughnut',
      data: {
        labels: ['Complété', 'Restant'],
        datasets: [{
          data: [stats.value.completionRate, 100 - stats.value.completionRate],
          backgroundColor: ['#4f46e5', '#e2e8f0'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        cutout: '75%'
      }
    })
  }
}

// Mettre à jour les graphiques quand les filtres changent
const updateHomeCharts = () => {
  initHomeCharts()
}

// Watchers
watch(engagementPeriod, () => { initHomeCharts() })
watch(selectedHomeCourse, () => { initHomeCharts() })
watch(stats, () => { initHomeCharts() }, { deep: true })


    // 15 COURS
    const courses = ref([
      { id: 1, title: 'Introduction à la programmation', description: 'Apprenez les bases', category: 'programming', level: 'beginner', status: 'published', enrolledStudents: 342, price: 75000, completionRate: 85, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop', modules: [] },
      { id: 2, title: 'Marketing digital avancé', description: 'Maîtrisez les techniques avancées', category: 'marketing', level: 'advanced', status: 'published', enrolledStudents: 287, price: 125000, completionRate: 72, image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=200&fit=crop', modules: [] },
      { id: 3, title: 'Data Science Masterclass', description: 'Formation complète en Data Science', category: 'data-science', level: 'advanced', status: 'published', enrolledStudents: 156, price: 250000, completionRate: 68, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop', modules: [] },
      { id: 4, title: 'Développement Web Full Stack', description: 'Devenez développeur Full Stack', category: 'programming', level: 'intermediate', status: 'published', enrolledStudents: 423, price: 150000, completionRate: 79, image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=200&fit=crop', modules: [] },
      { id: 5, title: 'UI/UX Design Complet', description: 'Maîtrisez le design d\'interface', category: 'design', level: 'beginner', status: 'published', enrolledStudents: 198, price: 85000, completionRate: 82, image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop', modules: [] },
      { id: 6, title: 'Finance d\'entreprise', description: 'Analyse financière', category: 'business', level: 'advanced', status: 'draft', enrolledStudents: 0, price: 180000, completionRate: 0, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop', modules: [] },
      { id: 7, title: 'Machine Learning', description: 'Introduction au Machine Learning', category: 'data-science', level: 'advanced', status: 'published', enrolledStudents: 234, price: 220000, completionRate: 71, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop', modules: [] },
      { id: 8, title: 'Gestion de projet Agile', description: 'Méthodologies Agile et Scrum', category: 'business', level: 'intermediate', status: 'published', enrolledStudents: 312, price: 95000, completionRate: 88, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop', modules: [] },
      { id: 9, title: 'Photographie professionnelle', description: 'Techniques avancées de photographie', category: 'design', level: 'beginner', status: 'draft', enrolledStudents: 0, price: 65000, completionRate: 0, image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=200&fit=crop', modules: [] },
      { id: 10, title: 'SEO et Référencement', description: 'Optimisez votre visibilité', category: 'marketing', level: 'intermediate', status: 'published', enrolledStudents: 267, price: 110000, completionRate: 76, image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=200&fit=crop', modules: [] },
      { id: 11, title: 'Cybersécurité essentielle', description: 'Protégez vos systèmes', category: 'programming', level: 'intermediate', status: 'published', enrolledStudents: 189, price: 195000, completionRate: 74, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop', modules: [] },
      { id: 12, title: 'Mobile App Development', description: 'Créez des apps iOS et Android', category: 'programming', level: 'advanced', status: 'published', enrolledStudents: 145, price: 280000, completionRate: 69, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop', modules: [] },
      { id: 13, title: 'Cloud Computing AWS', description: 'Maîtrisez les services AWS', category: 'programming', level: 'advanced', status: 'draft', enrolledStudents: 0, price: 320000, completionRate: 0, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop', modules: [] },
      { id: 14, title: 'Communication professionnelle', description: 'Améliorez vos soft skills', category: 'business', level: 'beginner', status: 'published', enrolledStudents: 456, price: 55000, completionRate: 91, image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=200&fit=crop', modules: [] },
      { id: 15, title: 'Blockchain fondamentaux', description: 'Introduction à la blockchain', category: 'programming', level: 'intermediate', status: 'published', enrolledStudents: 98, price: 210000, completionRate: 65, image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=200&fit=crop', modules: [] }
    ])
    
    // 15 ETUDIANTS
    const students = ref([
      { id: 1, name: 'Marie Lambert', email: 'marie.lambert@email.com', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', progress: 85, averageGrade: 16.5, lastActive: new Date(), coursesEnrolled: 3, certificates: 2, enrolledCourses: [1,2,3] },
      { id: 2, name: 'Thomas Martin', email: 'thomas.martin@email.com', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', progress: 45, averageGrade: 12, lastActive: new Date(Date.now() - 3*24*3600000), coursesEnrolled: 2, certificates: 0, enrolledCourses: [1,4] },
      { id: 3, name: 'Sophie Durand', email: 'sophie.durand@email.com', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', progress: 92, averageGrade: 17.5, lastActive: new Date(), coursesEnrolled: 4, certificates: 3, enrolledCourses: [1,2,4,5] },
      { id: 4, name: 'Lucas Bernard', email: 'lucas.bernard@email.com', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', progress: 28, averageGrade: 8.5, lastActive: new Date(Date.now() - 10*24*3600000), coursesEnrolled: 1, certificates: 0, enrolledCourses: [2] },
      { id: 5, name: 'Emma Petit', email: 'emma.petit@email.com', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', progress: 78, averageGrade: 14.5, lastActive: new Date(Date.now() - 1*24*3600000), coursesEnrolled: 3, certificates: 1, enrolledCourses: [1,3,5] },
      { id: 6, name: 'Hugo Dubois', email: 'hugo.dubois@email.com', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', progress: 95, averageGrade: 18, lastActive: new Date(), coursesEnrolled: 4, certificates: 4, enrolledCourses: [1,2,3,4] },
      { id: 7, name: 'Claire Moreau', email: 'claire.moreau@email.com', avatar: 'https://randomuser.me/api/portraits/women/7.jpg', progress: 62, averageGrade: 13, lastActive: new Date(Date.now() - 5*24*3600000), coursesEnrolled: 2, certificates: 0, enrolledCourses: [5,7] },
      { id: 8, name: 'Antoine Lefebvre', email: 'antoine.lefebvre@email.com', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', progress: 52, averageGrade: 11.5, lastActive: new Date(Date.now() - 7*24*3600000), coursesEnrolled: 2, certificates: 0, enrolledCourses: [2,8] },
      { id: 9, name: 'Julie Garcia', email: 'julie.garcia@email.com', avatar: 'https://randomuser.me/api/portraits/women/9.jpg', progress: 88, averageGrade: 16, lastActive: new Date(Date.now() - 2*24*3600000), coursesEnrolled: 3, certificates: 2, enrolledCourses: [1,4,10] },
      { id: 10, name: 'Nicolas Rousseau', email: 'nicolas.rousseau@email.com', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', progress: 35, averageGrade: 9.5, lastActive: new Date(Date.now() - 15*24*3600000), coursesEnrolled: 1, certificates: 0, enrolledCourses: [11] },
      { id: 11, name: 'Camille Leroy', email: 'camille.leroy@email.com', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', progress: 72, averageGrade: 14.2, lastActive: new Date(), coursesEnrolled: 3, certificates: 1, enrolledCourses: [1,2,14] },
      { id: 12, name: 'Maxime Fournier', email: 'maxime.fournier@email.com', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', progress: 58, averageGrade: 12.8, lastActive: new Date(Date.now() - 4*24*3600000), coursesEnrolled: 2, certificates: 0, enrolledCourses: [3,7] },
      { id: 13, name: 'Laura Simon', email: 'laura.simon@email.com', avatar: 'https://randomuser.me/api/portraits/women/13.jpg', progress: 97, averageGrade: 18.5, lastActive: new Date(), coursesEnrolled: 5, certificates: 4, enrolledCourses: [1,2,3,4,5] },
      { id: 14, name: 'Kevin Dubois', email: 'kevin.dubois@email.com', avatar: 'https://randomuser.me/api/portraits/men/14.jpg', progress: 42, averageGrade: 10.5, lastActive: new Date(Date.now() - 8*24*3600000), coursesEnrolled: 2, certificates: 0, enrolledCourses: [7,11] },
      { id: 15, name: 'Sarah Martin', email: 'sarah.martin@email.com', avatar: 'https://randomuser.me/api/portraits/women/15.jpg', progress: 81, averageGrade: 15.5, lastActive: new Date(Date.now() - 1*24*3600000), coursesEnrolled: 3, certificates: 2, enrolledCourses: [1,5,14] }
    ])
    
    // 10 EVALUATIONS
    const assessments = ref([
      { id: 1, title: 'Quiz - Bases de données', description: 'Évaluez vos connaissances SQL', type: 'quiz', duration: 30, submissions: 156, averageScore: 14.5, maxScore: 20, courseId: 1 },
      { id: 2, title: 'Examen - Programmation avancée', description: 'Examen final POO', type: 'exam', duration: 60, submissions: 89, averageScore: 15.2, maxScore: 20, courseId: 1 },
      { id: 3, title: 'Quiz - HTML/CSS', description: 'Testez vos compétences', type: 'quiz', duration: 20, submissions: 234, averageScore: 16.5, maxScore: 20, courseId: 4 },
      { id: 4, title: 'Examen - Data Science', description: 'Examen final', type: 'exam', duration: 90, submissions: 67, averageScore: 14.8, maxScore: 20, courseId: 3 },
      { id: 5, title: 'Quiz - Marketing Digital', description: 'Fondamentaux', type: 'quiz', duration: 25, submissions: 178, averageScore: 13.5, maxScore: 20, courseId: 2 },
      { id: 6, title: 'Examen - UI/UX Design', description: 'Examen pratique', type: 'exam', duration: 75, submissions: 92, averageScore: 17.2, maxScore: 20, courseId: 5 },
      { id: 7, title: 'Quiz - React.js', description: 'Maîtrise de React', type: 'quiz', duration: 35, submissions: 145, averageScore: 15.8, maxScore: 20, courseId: 4 },
      { id: 8, title: 'Examen - Gestion de projet', description: 'Méthodologies Agile', type: 'exam', duration: 60, submissions: 112, averageScore: 14.2, maxScore: 20, courseId: 8 },
      { id: 9, title: 'Quiz - SEO', description: 'Référencement', type: 'quiz', duration: 20, submissions: 198, averageScore: 16.2, maxScore: 20, courseId: 10 },
      { id: 10, title: 'Examen - Finance', description: 'Analyse financière', type: 'exam', duration: 90, submissions: 56, averageScore: 13.8, maxScore: 20, courseId: 6 }
    ])
    
    // 15 PAIEMENTS
    const payments = ref([
      { id: 1, studentName: 'Marie Lambert', studentAvatar: 'https://randomuser.me/api/portraits/women/1.jpg', productName: 'Introduction à la programmation', type: 'cours', amount: 75000, date: new Date(), status: 'payé' },
      { id: 2, studentName: 'Thomas Martin', studentAvatar: 'https://randomuser.me/api/portraits/men/2.jpg', productName: 'Marketing digital avancé', type: 'cours', amount: 125000, date: new Date(Date.now() - 2*24*3600000), status: 'payé' },
      { id: 3, studentName: 'Sophie Durand', studentAvatar: 'https://randomuser.me/api/portraits/women/3.jpg', productName: 'Formation Data Science', type: 'formation', amount: 500000, date: new Date(Date.now() - 5*24*3600000), status: 'payé' },
      { id: 4, studentName: 'Lucas Bernard', studentAvatar: 'https://randomuser.me/api/portraits/men/4.jpg', productName: 'Guide Python avancé', type: 'livre', amount: 15000, date: new Date(Date.now() - 1*24*3600000), status: 'en_attente' },
      { id: 5, studentName: 'Emma Petit', studentAvatar: 'https://randomuser.me/api/portraits/women/5.jpg', productName: 'Kit outils développeur', type: 'bord', amount: 45000, date: new Date(Date.now() - 7*24*3600000), status: 'payé' },
      { id: 6, studentName: 'Hugo Dubois', studentAvatar: 'https://randomuser.me/api/portraits/men/6.jpg', productName: 'Formation Web Full Stack', type: 'formation', amount: 350000, date: new Date(Date.now() - 3*24*3600000), status: 'payé' },
      { id: 7, studentName: 'Claire Moreau', studentAvatar: 'https://randomuser.me/api/portraits/women/7.jpg', productName: 'Livre UX Design', type: 'livre', amount: 25000, date: new Date(Date.now() - 4*24*3600000), status: 'payé' },
      { id: 8, studentName: 'Antoine Lefebvre', studentAvatar: 'https://randomuser.me/api/portraits/men/8.jpg', productName: 'Cours Machine Learning', type: 'cours', amount: 220000, date: new Date(Date.now() - 6*24*3600000), status: 'en_attente' },
      { id: 9, studentName: 'Julie Garcia', studentAvatar: 'https://randomuser.me/api/portraits/women/9.jpg', productName: 'Formation Certification', type: 'formation', amount: 750000, date: new Date(Date.now() - 10*24*3600000), status: 'payé' },
      { id: 10, studentName: 'Nicolas Rousseau', studentAvatar: 'https://randomuser.me/api/portraits/men/10.jpg', productName: 'Pack complet outils', type: 'bord', amount: 89000, date: new Date(Date.now() - 1*24*3600000), status: 'payé' },
      { id: 11, studentName: 'Camille Leroy', studentAvatar: 'https://randomuser.me/api/portraits/women/11.jpg', productName: 'Cours Python avancé', type: 'cours', amount: 95000, date: new Date(Date.now() - 2*24*3600000), status: 'payé' },
      { id: 12, studentName: 'Maxime Fournier', studentAvatar: 'https://randomuser.me/api/portraits/men/12.jpg', productName: 'Formation DevOps', type: 'formation', amount: 450000, date: new Date(Date.now() - 8*24*3600000), status: 'payé' },
      { id: 13, studentName: 'Laura Simon', studentAvatar: 'https://randomuser.me/api/portraits/women/13.jpg', productName: 'Livre Algorithmes', type: 'livre', amount: 35000, date: new Date(Date.now() - 3*24*3600000), status: 'payé' },
      { id: 14, studentName: 'Kevin Dubois', studentAvatar: 'https://randomuser.me/api/portraits/men/14.jpg', productName: 'Kit design UI/UX', type: 'bord', amount: 120000, date: new Date(Date.now() - 5*24*3600000), status: 'en_attente' },
      { id: 15, studentName: 'Sarah Martin', studentAvatar: 'https://randomuser.me/api/portraits/women/15.jpg', productName: 'Cours IA générative', type: 'cours', amount: 195000, date: new Date(Date.now() - 1*24*3600000), status: 'payé' }
    ])
    
    // 15 RESSOURCES EN LIGNE
    const resources = ref([
      { id: 1, name: 'Cours_Python_Basics.pdf', type: 'pdf', size: '2.5 MB', category: 'Cours Python', url: 'https://www.grandprof.com/ressources/python-basics.pdf' },
      { id: 2, name: 'Video_Introduction_Programmation.mp4', type: 'video', size: '150 MB', category: 'Programmation', url: 'https://www.grandprof.com/ressources/intro-prog.mp4' },
      { id: 3, name: 'Exercices_pratiques_JS.docx', type: 'doc', size: '1.2 MB', category: 'Exercices', url: 'https://ressources.grandprof.com/js-exercices.docx' },
      { id: 4, name: 'Certification_Template.pdf', type: 'pdf', size: '0.8 MB', category: 'Templates', url: 'https://www.grandprof.com/ressources/certif-template.pdf' },
      { id: 5, name: 'Projet_Final_FullStack.zip', type: 'doc', size: '5.3 MB', category: 'Projets', url: 'https://ressources.grandprof.com/fullstack-projet.zip' },
      { id: 6, name: 'Tutoriel_React_Native.mp4', type: 'video', size: '320 MB', category: 'React', url: 'https://www.grandprof.com/ressources/react-native-tuto.mp4' },
      { id: 7, name: 'Guide_Data_Science.pdf', type: 'pdf', size: '4.2 MB', category: 'Data Science', url: 'https://ressources.grandprof.com/data-science-guide.pdf' },
      { id: 8, name: 'Slides_Marketing_Digital.pptx', type: 'doc', size: '3.1 MB', category: 'Marketing', url: 'https://www.grandprof.com/ressources/marketing-digital.pptx' },
      { id: 9, name: 'Exercices_Algorithmique.pdf', type: 'pdf', size: '1.8 MB', category: 'Exercices', url: 'https://ressources.grandprof.com/algorithmes-exos.pdf' },
      { id: 10, name: 'Cours_HTML_CSS_Complet.pdf', type: 'pdf', size: '6.5 MB', category: 'Web', url: 'https://www.grandprof.com/ressources/html-css-complet.pdf' },
      { id: 11, name: 'Video_Design_UX_Figma.mp4', type: 'video', size: '280 MB', category: 'Design', url: 'https://ressources.grandprof.com/figma-ux.mp4' },
      { id: 12, name: 'Template_CV_Formateur.docx', type: 'doc', size: '0.5 MB', category: 'Templates', url: 'https://www.grandprof.com/ressources/cv-template.docx' },
      { id: 13, name: 'Ebook_IA_Pour_Tous.pdf', type: 'pdf', size: '3.8 MB', category: 'IA', url: 'https://ressources.grandprof.com/ia-ebook.pdf' },
      { id: 14, name: 'Cours_Cloud_AWS_Basics.pdf', type: 'pdf', size: '7.2 MB', category: 'Cloud', url: 'https://www.grandprof.com/ressources/aws-basics.pdf' },
      { id: 15, name: 'Video_Blockchain_Explained.mp4', type: 'video', size: '195 MB', category: 'Blockchain', url: 'https://ressources.grandprof.com/blockchain-explained.mp4' }
    ])
    
    // Notifications
    const notifications = ref([
      { id: 1, title: 'Nouvel inscrit', message: '3 étudiants se sont inscrits à vos cours', time: 'Il y a 5 min', read: false, icon: 'fas fa-user-plus' },
      { id: 2, title: 'Examen à corriger', message: '12 copies en attente de correction', time: 'Il y a 1h', read: false, icon: 'fas fa-check-circle', action: () => { activeSection.value = 'assessments' } },
      { id: 3, title: 'Message non lu', message: 'Marie Lambert vous a envoyé un message', time: 'Il y a 3h', read: true, icon: 'fas fa-comment', action: () => { activeSection.value = 'communication' } },
      { id: 4, title: 'Paiement reçu', message: 'Paiement de 125 000 FCFA reçu', time: 'Il y a 5h', read: false, icon: 'fas fa-money-bill-wave', action: () => { activeSection.value = 'payments' } }
    ])
    
    const importantNotifications = computed(() => notifications.value.filter(n => !n.read).slice(0,3))
    
    const recentActivities = ref([
      { id: 1, icon: 'fas fa-user-plus', description: '5 nouveaux étudiants inscrits', time: 'Il y a 2h' },
      { id: 2, icon: 'fas fa-money-bill-wave', description: 'Paiement de 75 000 FCFA reçu', time: 'Il y a 4h' },
      { id: 3, icon: 'fas fa-check-circle', description: '8 étudiants ont terminé le module 2', time: 'Il y a 6h' },
      { id: 4, icon: 'fas fa-chart-line', description: 'Taux de complétion en hausse de 5%', time: 'Il y a 1j' },
      { id: 5, icon: 'fas fa-comment', description: '3 messages non lus', time: 'Il y a 1j' }
    ])
    
    const upcomingEvents = ref([
      { id: 1, icon: 'fas fa-video', title: 'Live - Introduction Python', date: 'Demain', time: '14:00', action: () => startVideoCall() },
      { id: 2, icon: 'fas fa-tasks', title: 'Examen - Programmation', date: 'Vendredi', time: '09:00', action: () => { activeSection.value = 'assessments' } },
      { id: 3, icon: 'fas fa-chalkboard', title: 'Webinaire Marketing Digital', date: 'Lundi prochain', time: '15:00', action: () => startVideoCall() }
    ])
    
    const aiRecommendations = ref([
      { id: 1, message: 'Étudiants en difficulté détectés', details: '3 étudiants ont une progression < 30%', action: () => { studentFilter.value = 'struggling'; activeSection.value = 'students' } },
      { id: 2, message: 'Module à risque', details: 'Module 3 : taux d\'abandon élevé (45%)', action: () => { selectedAnalyticsCourse.value = 'all'; activeSection.value = 'analytics' } },
      { id: 3, message: 'Recommandation contenu', details: 'Ajoutez une vidéo récapitulative au module 2', action: () => { activeSection.value = 'courses' } }
    ])
    
    const conversations = ref([
      { id: 1, name: 'Marie Lambert', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', lastMessage: 'Merci pour votre aide !', lastMessageTime: new Date() },
      { id: 2, name: 'Thomas Martin', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', lastMessage: 'Quand aura lieu le prochain cours ?', lastMessageTime: new Date(Date.now() - 2*3600000) },
      { id: 3, name: 'Sophie Durand', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', lastMessage: 'J\'ai une question sur le module 4', lastMessageTime: new Date(Date.now() - 5*3600000) },
      { id: 4, name: 'Emma Petit', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', lastMessage: 'Merci pour les ressources !', lastMessageTime: new Date(Date.now() - 24*3600000) }
    ])
    
    const conversationMessages = ref([])
    
    // Mock résultats examen
    const mockResults = ref([
      { id: 1, name: 'Marie Lambert', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', score: 16, time: 28 },
      { id: 2, name: 'Thomas Martin', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', score: 12, time: 45 },
      { id: 3, name: 'Sophie Durand', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', score: 18, time: 25 },
      { id: 4, name: 'Hugo Dubois', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', score: 19, time: 22 },
      { id: 5, name: 'Emma Petit', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', score: 15, time: 32 }
    ])
    
    const navItems = [
      { id: 'home', label: 'Accueil', icon: 'fas fa-home' },
      { id: 'courses', label: 'Mes cours', icon: 'fas fa-book' },
      { id: 'students', label: 'Apprenants', icon: 'fas fa-users' },
      { id: 'assessments', label: 'Évaluations', icon: 'fas fa-tasks' },
      { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
      { id: 'communication', label: 'Communication', icon: 'fas fa-comments' },
      { id: 'resources', label: 'Ressources', icon: 'fas fa-folder' },
      { id: 'payments', label: 'Paiements', icon: 'fas fa-credit-card' },
      { id: 'settings', label: 'Paramètres', icon: 'fas fa-cog' }
    ]
    
    const formatterProfile = ref({ name: formatterName.value, email: formatterEmail.value, bio: formatterData.bio, skills: formatterData.skills })
    const notificationSettings = ref({ email: true, inApp: true, strugglingStudents: true })
    
    // Computed
    const unreadNotifications = computed(() => notifications.value.filter(n => !n.read))
    const filteredConversations = computed(() => conversationSearch.value ? conversations.value.filter(c => c.name.toLowerCase().includes(conversationSearch.value.toLowerCase())) : conversations.value)
    const currentConversation = computed(() => conversations.value.find(c => c.id === activeConversation.value))
    const activeMenuTitle = computed(() => navItems.find(i => i.id === activeSection.value)?.label || 'Dashboard')
    
    const filteredStudentsByCourse = computed(() => {
      let filtered = students.value
      if (studentFilter.value === 'excellent') filtered = filtered.filter(s => s.averageGrade >= 16)
      else if (studentFilter.value === 'good') filtered = filtered.filter(s => s.averageGrade >= 12 && s.averageGrade < 16)
      else if (studentFilter.value === 'average') filtered = filtered.filter(s => s.averageGrade >= 10 && s.averageGrade < 12)
      else if (studentFilter.value === 'struggling') filtered = filtered.filter(s => s.averageGrade < 10)
      else if (studentFilter.value === 'inactive') filtered = filtered.filter(s => (Date.now() - new Date(s.lastActive)) / (1000 * 3600 * 24) > 7)
      if (studentCourseFilter.value !== 'all') filtered = filtered.filter(s => s.enrolledCourses.includes(parseInt(studentCourseFilter.value)))
      return filtered
    })
    
    const strugglingStudents = computed(() => students.value.filter(s => s.averageGrade < 10 && s.progress < 50).slice(0,6))
    
    const paymentStats = computed(() => {
      const totalAmount = payments.value.filter(p => p.status === 'payé').reduce((s, p) => s + p.amount, 0)
      const thisMonth = payments.value.filter(p => p.status === 'payé' && new Date(p.date).getMonth() === new Date().getMonth()).reduce((s, p) => s + p.amount, 0)
      const pendingAmount = payments.value.filter(p => p.status === 'en_attente').reduce((s, p) => s + p.amount, 0)
      return { totalAmount, thisMonth, totalTransactions: payments.value.length, pendingAmount }
    })
    
    // Méthodes utilitaires
    const getWelcomeMessage = () => { const h = new Date().getHours(); if (h < 12) return 'Prêt pour une nouvelle journée sur Gradus Aura ?'; if (h < 18) return 'Continuez votre excellent travail !'; return 'Bonne soirée sur Gradus Aura' }
    const toggleDarkMode = () => { isDarkMode.value = !isDarkMode.value; localStorage.setItem('darkMode', isDarkMode.value); document.documentElement.classList.toggle('dark', isDarkMode.value) }
    const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
    const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')
    const formatTime = (date) => new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    const formatTimeShort = (date) => { const diff = (Date.now() - new Date(date)) / 1000 / 3600; if (diff < 1) return 'maintenant'; if (diff < 24) return `${Math.floor(diff)}h`; return `${Math.floor(diff / 24)}j` }
    const getTypeLabel = (type) => ({ cours: 'Cours', formation: 'Formation', livre: 'Livre', bord: 'Outils' }[type] || type)
    const getResourceIcon = (type) => ({ pdf: 'fas fa-file-pdf', video: 'fas fa-video', doc: 'fas fa-file-word', image: 'fas fa-image' }[type] || 'fas fa-file')
    const getSuccessRate = (assessment) => Math.round((assessment.averageScore / assessment.maxScore) * 100)
    
    // Graphiques Analytics qui changent selon le cours sélectionné
    const updateChartsForCourse = () => {
      if (progressChartInstance) progressChartInstance.destroy()
      if (successRateChartInstance) successRateChartInstance.destroy()
      if (engagementChartInstance) engagementChartInstance.destroy()
      if (dropoutChartInstance) dropoutChartInstance.destroy()
      
      const selectedCourse = selectedAnalyticsCourse.value === 'all' ? null : courses.value.find(c => c.id == selectedAnalyticsCourse.value)
      
      let progressionData, successData, engagementData, dropoutData, labels, moduleLabels
      
      if (selectedCourse) {
        progressionData = [25, 45, 65, selectedCourse.completionRate]
        successData = [85, 78, 72, 68]
        engagementData = [3.2, 3.8, 3.5, 4.2, 3.9, 2.5, 2.0]
        dropoutData = [4, 7, 12, 10, 6]
        labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
        moduleLabels = ['Module 1', 'Module 2', 'Module 3', 'Module 4']
      } else {
        progressionData = courses.value.slice(0,8).map(c => c.completionRate)
        successData = [78, 72, 68, 79, 82, 71]
        engagementData = [2.5, 3.2, 2.8, 4.1, 3.5, 1.8, 1.2]
        dropoutData = [5, 8, 15, 12, 9]
        labels = courses.value.slice(0,8).map(c => c.title.substring(0,12))
        moduleLabels = ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5']
      }
      
      if (progressChart.value) {
        progressChartInstance = new Chart(progressChart.value, {
          type: 'line',
          data: { labels: labels, datasets: [{ label: 'Progression (%)', data: progressionData, borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)', fill: true, tension: 0.4 }] },
          options: { responsive: true, maintainAspectRatio: true }
        })
      }
      
      if (successRateChart.value) {
        successRateChartInstance = new Chart(successRateChart.value, {
          type: 'bar',
          data: { labels: selectedCourse ? ['Q1', 'Q2', 'Q3', 'Q4'] : courses.value.slice(0,6).map(c => c.title.substring(0,10)), datasets: [{ label: 'Taux de réussite (%)', data: successData, backgroundColor: '#10b981' }] },
          options: { responsive: true }
        })
      }
      
      if (engagementChart.value) {
        engagementChartInstance = new Chart(engagementChart.value, {
          type: 'line',
          data: { labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'], datasets: [{ label: 'Heures d\'étude', data: engagementData, borderColor: '#f59e0b', fill: true, backgroundColor: 'rgba(245,158,11,0.1)' }] },
          options: { responsive: true }
        })
      }
      
      if (dropoutChart.value) {
        dropoutChartInstance = new Chart(dropoutChart.value, {
          type: 'line',
          data: { labels: moduleLabels, datasets: [{ label: 'Taux d\'abandon (%)', data: dropoutData, borderColor: '#ef4444', fill: true, backgroundColor: 'rgba(239,68,68,0.1)' }] },
          options: { responsive: true }
        })
      }
    }
    
    // Exports
    const exportPaymentsExcel = () => {
      const wsData = payments.value.map(p => ({ 'Étudiant': p.studentName, 'Produit': p.productName, 'Type': getTypeLabel(p.type), 'Montant': p.amount, 'Date': formatDate(p.date), 'Statut': p.status === 'payé' ? 'Payé' : 'En attente' }))
      const ws = XLSX.utils.json_to_sheet(wsData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Paiements')
      XLSX.writeFile(wb, `paiements_${formatDate(new Date())}.xlsx`)
      alert('Export Excel terminé')
    }
    
    const exportAnalytics = () => {
      const wsData = courses.value.map(c => ({ 'Cours': c.title, 'Inscrits': c.enrolledStudents, 'Complétion': c.completionRate + '%', 'Prix': c.price }))
      const ws = XLSX.utils.json_to_sheet(wsData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Analytics')
      XLSX.writeFile(wb, `analytics_${formatDate(new Date())}.xlsx`)
      alert('Export Excel terminé')
    }
    
    const downloadInvoicePDF = (payment) => {
      const doc = new jsPDF()
      doc.setFontSize(20)
      doc.text('FACTURE', 105, 20, { align: 'center' })
      doc.setFontSize(12)
      doc.text(`Gradus Aura - Facture n°${payment.id.toString().padStart(6, '0')}`, 105, 35, { align: 'center' })
      doc.text(`Date: ${formatDate(payment.date)}`, 20, 55)
      doc.text(`Client: ${payment.studentName}`, 20, 65)
      doc.text(`Produit: ${payment.productName}`, 20, 75)
      doc.text(`Type: ${getTypeLabel(payment.type)}`, 20, 85)
      doc.text(`Montant: ${formatPrice(payment.amount)}`, 20, 95)
      doc.text(`Statut: ${payment.status === 'payé' ? 'Payé' : 'En attente'}`, 20, 105)
      doc.line(20, 115, 190, 115)
      doc.setFontSize(14)
      doc.text(`TOTAL: ${formatPrice(payment.amount)}`, 20, 125)
      doc.save(`Facture_${payment.studentName}_${formatDate(payment.date)}.pdf`)
      alert('Facture téléchargée')
    }
    
    // Gestion Cours
    const openCreateCourseModal = () => { editingCourse.value = null; courseForm.value = { title: '', description: '', category: 'programming', level: 'beginner', price: 0, imagePreview: null, imageFile: null }; showCourseModal.value = true }
    const openEditCourseModal = (course) => { editingCourse.value = course; courseForm.value = { ...course, imagePreview: course.image }; showCourseModal.value = true }
    const closeCourseModal = () => { showCourseModal.value = false; editingCourse.value = null }
    const uploadCourseImage = (e) => { const file = e.target.files[0]; if (file) { courseForm.value.imageFile = file; courseForm.value.imagePreview = URL.createObjectURL(file) } }
    const saveCourse = () => { if (editingCourse.value) { const idx = courses.value.findIndex(c => c.id === editingCourse.value.id); courses.value[idx] = { ...courses.value[idx], ...courseForm.value, image: courseForm.value.imagePreview || courses.value[idx].image, enrolledStudents: courses.value[idx].enrolledStudents }; alert('Cours modifié') } else { courses.value.push({ id: Date.now(), ...courseForm.value, enrolledStudents: 0, completionRate: 0, status: 'draft', image: courseForm.value.imagePreview || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop', modules: [] }); alert('Cours créé') } closeCourseModal() }
    const deleteCourseItem = (course) => { if (confirm('Supprimer ce cours ?')) { courses.value = courses.value.filter(c => c.id !== course.id); alert('Cours supprimé') } }
    const viewCourseDetails = (course) => { alert(`📚 Détails: ${course.title}\nPrix: ${formatPrice(course.price)}\nInscrits: ${course.enrolledStudents}`) }
    const openCourseModulesModal = (course) => { if (!course.modules || course.modules.length === 0) course.modules = [{ id: 1, title: 'Introduction', lessons: [{ title: 'Bienvenue', type: 'video' }] }]; selectedCourseForModules.value = course; showModulesModal.value = true }
    const closeModulesModal = () => { showModulesModal.value = false; selectedCourseForModules.value = null }
    const addModule = () => { selectedCourseForModules.value.modules.push({ id: Date.now(), title: 'Nouveau chapitre', lessons: [] }) }
    const removeModule = (idx) => { selectedCourseForModules.value.modules.splice(idx, 1) }
    const addLesson = (moduleIdx) => { selectedCourseForModules.value.modules[moduleIdx].lessons.push({ title: 'Nouvelle leçon', type: 'video' }) }
    const removeLesson = (moduleIdx, lessonIdx) => { selectedCourseForModules.value.modules[moduleIdx].lessons.splice(lessonIdx, 1) }
    const saveModules = () => { alert('Modules enregistrés'); closeModulesModal() }
    
    // Gestion Évaluations
    const openCreateAssessmentModal = () => { newAssessmentForm.value = { title: '', description: '', type: 'quiz', duration: 30, maxScore: 20, courseId: courses.value[0]?.id || null }; showCreateAssessmentModal.value = true }
    const closeCreateAssessmentModal = () => { showCreateAssessmentModal.value = false }
    const saveNewAssessment = () => { assessments.value.push({ id: Date.now(), ...newAssessmentForm.value, submissions: 0, averageScore: 0 }); alert('Évaluation créée avec succès'); closeCreateAssessmentModal() }
    const openEditAssessmentModal = (assessment) => { editingAssessment.value = assessment; editAssessmentForm.value = { title: assessment.title, description: assessment.description, type: assessment.type, duration: assessment.duration, maxScore: assessment.maxScore }; showEditAssessmentModal.value = true }
    const closeEditAssessmentModal = () => { showEditAssessmentModal.value = false; editingAssessment.value = null }
    const saveAssessmentChanges = () => { if (editingAssessment.value) { const idx = assessments.value.findIndex(a => a.id === editingAssessment.value.id); assessments.value[idx] = { ...assessments.value[idx], ...editAssessmentForm.value }; alert('Évaluation modifiée'); closeEditAssessmentModal() } }
    const deleteAssessmentItem = (assessment) => { if (confirm('Supprimer cette évaluation ?')) { assessments.value = assessments.value.filter(a => a.id !== assessment.id); alert('Évaluation supprimée') } }
    const viewAssessmentResultsModal = (assessment) => { selectedAssessment.value = assessment; showAssessmentResultsModal.value = true }
    const closeAssessmentResultsModal = () => { showAssessmentResultsModal.value = false; selectedAssessment.value = null }
    const viewStudentResult = (result) => { alert(`📊 Résultat: ${result.name}\nNote: ${result.score}/${selectedAssessment.value?.maxScore}\nTemps: ${result.time} min`) }
    
    // Gestion Ressources
    const openUploadResourceModal = () => { editingResource.value = null; resourceForm.value = { name: '', type: 'pdf', category: 'Cours Python', url: '' }; showUploadResourceModal.value = true }
    const openEditResourceModal = (resource) => { editingResource.value = resource; resourceForm.value = { name: resource.name, type: resource.type, category: resource.category, url: resource.url }; showUploadResourceModal.value = true }
    const closeUploadResourceModal = () => { showUploadResourceModal.value = false; editingResource.value = null }
    const saveResource = () => { if (editingResource.value) { const idx = resources.value.findIndex(r => r.id === editingResource.value.id); resources.value[idx] = { ...resources.value[idx], name: resourceForm.value.name, type: resourceForm.value.type, category: resourceForm.value.category, url: resourceForm.value.url }; alert('Ressource modifiée') } else { resources.value.push({ id: Date.now(), name: resourceForm.value.name, type: resourceForm.value.type, size: '~1 MB', category: resourceForm.value.category, url: resourceForm.value.url }); alert('Ressource ajoutée') } closeUploadResourceModal() }
    const downloadResource = (resource) => { if (resource.url && resource.url !== '#') { window.open(resource.url, '_blank') } else { alert('URL non disponible pour cette ressource') } }
    const deleteResource = (resource) => { if (confirm('Supprimer cette ressource ?')) { resources.value = resources.value.filter(r => r.id !== resource.id); alert('Ressource supprimée') } }
    
    // Gestion Apprenants
    const viewStudentDetails = (student) => { alert(`👤 ${student.name}\nProgression: ${student.progress}%\nNote: ${student.averageGrade}/20\nCertificats: ${student.certificates}`) }
    const messageStudent = (student) => { activeSection.value = 'communication'; activeConversation.value = conversations.value.find(c => c.name === student.name)?.id || 1 }
    const openCertificateForStudent = (student) => {
      certificateData.value = { studentName: student.name, studentEmail: student.email, studentGrade: student.averageGrade, courseName: courses.value.find(c => student.enrolledCourses.includes(c.id))?.title || 'Formation Gradus Aura', date: new Date().toISOString().split('T')[0], trainer: formatterName.value }
      showCertificateModal.value = true
    }
    const closeCertificateModal = () => { showCertificateModal.value = false; signatureImage.value = null; stampImage.value = null; stampPreview.value = null }
    
    // Signature et Cachet
    const initSignatureCanvas = () => {
      if (signatureCanvas.value) {
        signatureCtx = signatureCanvas.value.getContext('2d')
        signatureCtx.strokeStyle = '#b45309'
        signatureCtx.lineWidth = 2
        signatureCtx.lineCap = 'round'
        signatureCtx.lineJoin = 'round'
        signatureCtx.fillStyle = '#ffffff'
        signatureCtx.fillRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height)
        signatureCanvas.value.addEventListener('mousedown', (e) => { drawing = true; const rect = signatureCanvas.value.getBoundingClientRect(); const x = (e.clientX - rect.left) * (signatureCanvas.value.width / rect.width); const y = (e.clientY - rect.top) * (signatureCanvas.value.height / rect.height); signatureCtx.beginPath(); signatureCtx.moveTo(x, y); signatureCtx.lineTo(x, y); signatureCtx.stroke() })
        signatureCanvas.value.addEventListener('mousemove', (e) => { if (!drawing) return; const rect = signatureCanvas.value.getBoundingClientRect(); const x = (e.clientX - rect.left) * (signatureCanvas.value.width / rect.width); const y = (e.clientY - rect.top) * (signatureCanvas.value.height / rect.height); signatureCtx.lineTo(x, y); signatureCtx.stroke() })
        signatureCanvas.value.addEventListener('mouseup', () => { drawing = false; signatureCtx.beginPath() })
        signatureCanvas.value.addEventListener('mouseleave', () => { drawing = false; signatureCtx.beginPath() })
      }
    }
    const openSignatureModal = () => { signatureModal.value = true; setTimeout(() => initSignatureCanvas(), 100) }
    const clearSignature = () => { signatureCtx.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height); signatureCtx.fillStyle = '#ffffff'; signatureCtx.fillRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height); signatureCtx.beginPath() }
    const saveSignature = () => { signatureImage.value = signatureCanvas.value.toDataURL('image/png'); signatureModal.value = false; alert('Signature ajoutée') }
    const openStampModal = () => { stampModal.value = true }
    const triggerStampUpload = () => { stampInput.value.click() }
    const handleStampUpload = (e) => { const file = e.target.files[0]; if (file) { if (file.size > 2 * 1024 * 1024) { alert('Fichier trop volumineux (max 2 Mo)'); return } const reader = new FileReader(); reader.onload = (ev) => { stampPreview.value = ev.target.result }; reader.readAsDataURL(file) } }
    const confirmStamp = () => { if (stampPreview.value) { stampImage.value = stampPreview.value; alert('Cachet ajouté') } stampModal.value = false }
    const generateCertificatePDF = async () => {
      certificateLoading.value = true
      try {
        const el = document.getElementById('certificat')
        const canvas = await html2canvas(el, { scale: 3, backgroundColor: '#0b1a2d', useCORS: true })
        const pdf = new jsPDF('landscape', 'mm', 'a4')
        const imgWidth = 297
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        pdf.addImage(canvas.toDataURL(), 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save(`Certificat_${certificateData.value.studentName}.pdf`)
        alert('Certificat téléchargé avec succès')
      } catch (error) { console.error(error); alert('Erreur lors de la génération') }
      finally { certificateLoading.value = false }
    }
    
    // Communication
    const selectConversation = (id) => { activeConversation.value = id; conversationMessages.value = [{ id: 1, text: "Bonjour, j'ai une question sur le module 3", sender: 'student', timestamp: new Date() }, { id: 2, text: "Bien sûr, je vous écoute", sender: 'me', timestamp: new Date() }]; nextTick(() => { if (chatMessages.value) chatMessages.value.scrollTop = chatMessages.value.scrollHeight }) }
    const sendMessage = () => { if (!newMessage.value.trim()) return; conversationMessages.value.push({ id: Date.now(), text: newMessage.value, sender: 'me', timestamp: new Date() }); newMessage.value = ''; nextTick(() => { if (chatMessages.value) chatMessages.value.scrollTop = chatMessages.value.scrollHeight }) }
    const startVideoCall = () => { window.open('https://meet.google.com/new', '_blank') }
    
    // Messages groupés
    const openBulkMessageModal = () => { bulkMessageSubject.value = ''; bulkMessageContent.value = ''; showBulkMessageModal.value = true }
    const closeBulkMessageModal = () => { showBulkMessageModal.value = false }
    const sendBulkMessage = () => { let count = 0; if (bulkMessageRecipients.value === 'all') count = students.value.length; else if (bulkMessageRecipients.value === 'excellent') count = students.value.filter(s => s.averageGrade >= 16).length; else if (bulkMessageRecipients.value === 'struggling') count = students.value.filter(s => s.averageGrade < 10).length; else if (bulkMessageRecipients.value === 'inactive') count = students.value.filter(s => (Date.now() - new Date(s.lastActive)) / (1000 * 3600 * 24) > 7).length; alert(`📧 Message envoyé à ${count} étudiants\nObjet: ${bulkMessageSubject.value}\nMessage: ${bulkMessageContent.value}`); closeBulkMessageModal() }
    
    // Changement mot de passe
    const changePassword = () => { if (passwordForm.value.new !== passwordForm.value.confirm) { alert('Les mots de passe ne correspondent pas'); return } if (passwordForm.value.new.length < 6) { alert('Le mot de passe doit contenir au moins 6 caractères'); return } alert('✅ Mot de passe changé avec succès'); closeChangePasswordModal() }
    const openChangePasswordModal = () => { passwordForm.value = { current: '', new: '', confirm: '' }; showChangePasswordModal.value = true }
    const closeChangePasswordModal = () => { showChangePasswordModal.value = false }
    
    // Profil - Sauvegarde des données
    const saveProfile = () => {
      const updatedFormatter = { name: formatterProfile.value.name, email: formatterProfile.value.email, bio: formatterProfile.value.bio, skills: formatterProfile.value.skills }
      localStorage.setItem('formateurData', JSON.stringify(updatedFormatter))
      formatterName.value = formatterProfile.value.name
      formatterEmail.value = formatterProfile.value.email
      alert('Profil mis à jour avec succès')
    }
    
    const exportMyData = () => {
      const myData = { profil: formatterProfile.value, statistiques: stats.value, cours: courses.value.length, etudiants: students.value.length, notifications: notificationSettings.value, dateExport: new Date().toISOString() }
      const dataStr = JSON.stringify(myData, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `mes_donnees_${formatDate(new Date())}.json`
      a.click()
      URL.revokeObjectURL(url)
      alert('Export des données terminé')
    }
    
    // Paramètres
    const enable2FA = () => { alert('🔐 Double authentification activée') }
    const saveSettings = () => { saveProfile() }
    const logout = () => { localStorage.removeItem('formateurData'); router.push('/login') }
    
    watch(selectedAnalyticsCourse, () => { updateChartsForCourse() })
    watch(analyticsPeriod, () => { updateChartsForCourse() })
    
    onMounted(() => { 
      const savedDarkMode = localStorage.getItem('darkMode'); if (savedDarkMode === 'true') { isDarkMode.value = true; document.documentElement.classList.add('dark') } 
      nextTick(() => {
        initHomeCharts()
        updateChartsForCourse()
      })
    })
    
    return { isDarkMode, sidebarCollapsed, activeSection, showNotifications, showCourseModal, showModulesModal, showAssessmentResultsModal, showBulkMessageModal, showUploadResourceModal, showCertificateModal, showCreateAssessmentModal, showEditAssessmentModal, showChangePasswordModal, showUserMenu, studentFilter, studentCourseFilter, conversationSearch, selectedAnalyticsCourse, analyticsPeriod, activeConversation, newMessage, editingCourse, editingResource, editingAssessment, selectedCourseForModules, selectedAssessment, bulkMessageRecipients, bulkMessageSubject, bulkMessageContent, certificateData, certificateLoading, signatureModal, stampModal, signatureImage, stampImage, stampPreview, signatureCanvas, stampInput, courseForm, resourceForm, newAssessmentForm, editAssessmentForm, passwordForm, progressChart, successRateChart, engagementChart, dropoutChart, chatMessages, homeEngagementChart, homeProgressionChart, homeLevelChart, homeCompletionChart, engagementPeriod, selectedHomeCourse, formatterName, formatterInitials, stats, monthlyRevenue, courses, students, assessments, payments, resources, notifications, importantNotifications, recentActivities, upcomingEvents, aiRecommendations, conversations, conversationMessages, mockResults, navItems, formatterProfile, notificationSettings, filteredStudentsByCourse, strugglingStudents, paymentStats, unreadNotifications, filteredConversations, currentConversation, activeMenuTitle, getWelcomeMessage, toggleDarkMode, formatPrice, formatDate, formatTime, formatTimeShort, getTypeLabel, getResourceIcon, getSuccessRate, updateHomeCharts, updateChartsForCourse, exportPaymentsExcel, exportAnalytics, downloadInvoicePDF, openCreateCourseModal, openEditCourseModal, closeCourseModal, uploadCourseImage, saveCourse, deleteCourseItem, viewCourseDetails, openCourseModulesModal, closeModulesModal, addModule, removeModule, addLesson, removeLesson, saveModules, openCreateAssessmentModal, closeCreateAssessmentModal, saveNewAssessment, openEditAssessmentModal, closeEditAssessmentModal, saveAssessmentChanges, deleteAssessmentItem, viewAssessmentResultsModal, closeAssessmentResultsModal, viewStudentResult, openUploadResourceModal, openEditResourceModal, closeUploadResourceModal, saveResource, downloadResource, deleteResource, viewStudentDetails, messageStudent, openCertificateForStudent, closeCertificateModal, openSignatureModal, clearSignature, saveSignature, openStampModal, triggerStampUpload, handleStampUpload, confirmStamp, generateCertificatePDF, selectConversation, sendMessage, startVideoCall, openBulkMessageModal, closeBulkMessageModal, sendBulkMessage, openChangePasswordModal, closeChangePasswordModal, changePassword, saveProfile, exportMyData, enable2FA, saveSettings, logout }
  }
}
</script>

<style>
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.sidebar-item.active { background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.2)); border-left: 3px solid #4f46e5; }
.stat-card, .course-card { transition: all 0.3s ease; }
.stat-card:hover, .course-card:hover { transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
.dark .bg-white { background-color: #1f2937; }
.dark .text-slate-900, .dark .text-slate-800, .dark .text-slate-950 { color: #f3f4f6; }
.dark .bg-slate-50, .dark .bg-slate-100 { background-color: #374151; }
.dark .border-slate-200, .dark .border { border-color: #4b5563; }
.dark .text-slate-600, .dark .text-slate-500, .dark .text-slate-400 { color: #9ca3af; }

/* Certificate styles */
.medal-glow { animation: medalPulse 2s infinite; }
@keyframes medalPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); } 50% { box-shadow: 0 0 0 15px rgba(245,158,11,0); } }
.crown-container { position: relative; display: flex; justify-content: center; margin-bottom: -15px; z-index: 10; }
.crown-icon { position: absolute; top: -25px; left: 50%; transform: translateX(-50%); filter: drop-shadow(0 0 5px rgba(245,158,11,0.5)); animation: crownFloat 3s ease-in-out infinite; }
.crown-svg { filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); }
@keyframes crownFloat { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-5px); } }
canvas { border: 1px solid #fbbf24; cursor: crosshair; }
input[type="date"] { color-scheme: dark; }
</style>
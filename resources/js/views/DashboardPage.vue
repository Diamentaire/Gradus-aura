<template>
  <div :class="['flex h-screen', isDarkMode ? 'dark' : '']">
    <!-- Écran de connexion / inscription -->
    <div v-if="!isAuthenticated" class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200">
      <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-slate-100">
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <i class="fas fa-graduation-cap text-white text-2xl"></i>
          </div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tighter">Gradus Aura</h2>
          <p class="text-slate-500 text-sm mt-2">{{ authMode === 'login' ? 'Connectez-vous à votre espace' : 'Créez votre compte gratuitement' }}</p>
        </div>

        <div class="flex gap-2 mb-6 bg-slate-100 rounded-xl p-1">
          <button @click="authMode = 'login'" :class="['flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2', authMode === 'login' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/50']">
            <i class="fas fa-sign-in-alt text-sm"></i> Connexion
          </button>
          <button @click="authMode = 'register'" :class="['flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2', authMode === 'register' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/50']">
            <i class="fas fa-user-plus text-sm"></i> Inscription
          </button>
        </div>

        <form v-if="authMode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
          <div class="relative">
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="email" v-model="loginForm.email" placeholder="Email" required class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 transition">
          </div>
          <div class="relative">
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="password" v-model="loginForm.password" placeholder="Mot de passe" required class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 transition">
          </div>
          <div class="flex justify-end">
            <a href="#" class="text-xs text-blue-600 hover:text-blue-700 transition" @click.prevent="openForgotPasswordModal">Mot de passe oublié ?</a>
          </div>
          <button type="submit" :disabled="authLoading" class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-lg transition">
            {{ authLoading ? 'Chargement...' : 'Se connecter' }}
          </button>
        </form>

        <form v-if="authMode === 'register'" @submit.prevent="handleRegister" class="space-y-3">
          <div class="relative">
            <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="text" v-model="registerForm.fullname" placeholder="Nom complet" required class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 transition">
          </div>
          <div class="relative">
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="email" v-model="registerForm.email" placeholder="Email" required class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 transition">
          </div>
          <div class="relative">
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="password" v-model="registerForm.password" placeholder="Mot de passe (min 6 caractères)" required class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 transition">
          </div>
          <div class="relative">
            <i class="fas fa-check-circle absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="password" v-model="registerForm.confirmPassword" placeholder="Confirmer" required class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500 transition">
          </div>
          <button type="submit" :disabled="authLoading" class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-lg transition mt-4">
            {{ authLoading ? 'Chargement...' : 'Créer mon compte' }}
          </button>
        </form>

        <p v-if="authError" class="text-red-500 text-sm text-center mt-4">{{ authError }}</p>

        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-slate-200"></div>
          <span class="text-slate-400 text-xs">ou</span>
          <div class="flex-1 h-px bg-slate-200"></div>
        </div>

        <div class="flex gap-3">
          <button class="flex-1 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"><i class="fab fa-google text-red-500"></i><span class="text-sm ml-2">Google</span></button>
          <button class="flex-1 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"><i class="fab fa-facebook-f text-blue-600"></i><span class="text-sm ml-2">Facebook</span></button>
        </div>
      </div>
    </div>

    <!-- Interface principale -->
    <template v-else>
      <button @click="mobileSidebarOpen = !mobileSidebarOpen" class="fixed bottom-4 right-4 z-50 md:hidden bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all">
        <i class="fas fa-bars text-xl"></i>
      </button>

      <aside :class="['fixed md:relative z-40 w-64 h-full transition-transform duration-300 ease-in-out flex flex-col shrink-0 overflow-hidden', isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-r border-slate-200', mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
        <button @click="mobileSidebarOpen = false" class="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-50"><i class="fas fa-times text-xl"></i></button>

        <div :class="['p-4 md:p-6 border-b', isDarkMode ? 'border-gray-800' : 'border-slate-200']">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl">
              <i class="fas fa-graduation-cap text-white text-sm md:text-base"></i>
            </div>
            <span :class="['font-bold text-lg md:text-xl tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">Gradus Aura</span>
          </div>
          <div :class="['grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 rounded-2xl border mt-4 md:mt-6', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Cours</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ coursesList.length }}</p></div>
            <div class="text-center py-1 md:py-2 border-x border-slate-200"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Quiz</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ quizzesList.length }}</p></div>
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Score</p><p class="text-[8px] md:text-[10px] font-bold text-emerald-600">{{ averageScore }}%</p></div>
          </div>
        </div>

        <nav class="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6 custom-scrollbar">
          <div class="space-y-1">
            <div @click="activeModule = 'dashboard'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'dashboard' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-tachometer-alt w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Tableau de bord</span>
            </div>
          </div>
          <div class="space-y-1">
            <div @click="activeModule = 'courses'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'courses' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-book-open w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Mes cours</span>
            </div>
            <div @click="activeModule = 'exams'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'exams' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-file-alt w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Examens blancs</span>
            </div>
            <div @click="activeModule = 'quizzes'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'quizzes' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-question-circle w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Quiz & tests</span>
            </div>
            <div @click="activeModule = 'orientation'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'orientation' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-chart-line w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Orientation</span>
            </div>
            <div @click="activeModule = 'mobility'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'mobility' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-globe w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Mobilité</span>
            </div>
            <div @click="activeModule = 'community'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'community' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-users w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Communauté</span>
            </div>
            <div @click="activeModule = 'certificates'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'certificates' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-certificate w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Certificats</span>
            </div>
            <div @click="activeModule = 'profile'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', activeModule === 'profile' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-user w-4 md:w-5"></i><span class="font-black uppercase tracking-widest">Mon profil</span>
            </div>
          </div>
        </nav>

        <div :class="['p-3 md:p-4 border-t', isDarkMode ? 'border-gray-800' : 'border-slate-100']">
          <div class="flex items-center gap-2 md:gap-3">
            <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">{{ userInitials }}</div>
            <div class="flex-1"><p :class="['text-[10px] md:text-xs font-bold truncate', isDarkMode ? 'text-white' : 'text-slate-950']">{{ userFullname }}</p><p :class="['text-[8px] md:text-[10px] truncate', isDarkMode ? 'text-gray-400' : 'text-slate-500']">{{ userEmail }}</p></div>
          </div>
          <button @click="logout" class="w-full mt-3 md:mt-4 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition"><i class="fas fa-sign-out-alt"></i><span class="font-black uppercase tracking-widest">Déconnexion</span></button>
        </div>
      </aside>

      <div v-if="mobileSidebarOpen" class="fixed inset-0 bg-black/50 z-30 md:hidden" @click="mobileSidebarOpen = false"></div>

      <main :class="['flex-1 overflow-y-auto custom-scrollbar', isDarkMode ? 'bg-gray-900' : 'bg-slate-50']">
        <header :class="['sticky top-0 z-10 backdrop-blur-sm border-b px-4 md:px-8 py-3 md:py-4', isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-slate-100']">
          <div class="flex justify-between items-center">
            <div><h1 :class="['text-xl md:text-2xl font-black tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">{{ moduleTitle }}</h1></div>
            <div class="flex items-center gap-2 md:gap-4">
              <button @click="openPremiumModal" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition"><i class="fas fa-crown mr-2"></i>Premium</button>
              <button @click="isDarkMode = !isDarkMode; document.documentElement.classList.toggle('dark')" class="p-2 text-slate-400 hover:text-primary transition"><i class="fas fa-moon text-base md:text-xl"></i></button>
              <div class="flex items-center gap-2 md:gap-3 cursor-pointer" @click="activeModule = 'profile'"><div class="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">{{ userInitials }}</div></div>
            </div>
          </div>
        </header>

        <!-- DASHBOARD -->
        <div v-if="activeModule === 'dashboard'" class="p-3 md:p-8">
          <div class="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 mb-8 text-white">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div><h2 class="text-2xl font-bold mb-2">Bonjour, {{ userFullname }} !</h2><p class="text-indigo-100">Votre assistant intelligent pour réussir vos examens</p><div class="mt-4 flex items-center gap-2"><i class="fas fa-chart-line"></i><span class="text-sm">Progression globale: <strong>{{ globalProgress }}%</strong></span><div class="w-32 bg-white/30 rounded-full h-2 ml-2"><div class="bg-white h-2 rounded-full" :style="{ width: globalProgress + '%' }"></div></div></div></div>
              <div class="bg-white/20 rounded-xl p-4 text-center"><p class="text-3xl font-bold">45</p><p class="text-xs">jours avant concours</p><p class="text-sm font-semibold mt-1">ENAM 2025</p></div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
            <div class="stat-card bg-white p-3 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer" @click="activeModule = 'courses'"><div class="flex justify-between items-start mb-2"><div class="p-2 bg-slate-50 rounded-xl"><i class="fas fa-book-open text-primary text-xl"></i></div><span class="text-[7px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+{{ newCoursesCount }}</span></div><p class="text-[8px] font-black text-slate-400 uppercase">Cours suivis</p><h3 class="text-2xl font-black text-slate-950 mt-1">{{ coursesList.length }}</h3></div>
            <div class="stat-card bg-white p-3 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer" @click="activeModule = 'quizzes'"><div class="flex justify-between items-start mb-2"><div class="p-2 bg-slate-50 rounded-xl"><i class="fas fa-check-circle text-primary text-xl"></i></div><span class="text-[7px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{{ completedQuizzesPercentage }}%</span></div><p class="text-[8px] font-black text-slate-400 uppercase">Quiz complétés</p><h3 class="text-2xl font-black text-slate-950 mt-1">{{ completedQuizzes }}/{{ quizzesList.length }}</h3></div>
            <div class="stat-card bg-white p-3 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer" @click="activeModule = 'orientation'"><div class="flex justify-between items-start mb-2"><div class="p-2 bg-slate-50 rounded-xl"><i class="fas fa-chart-line text-primary text-xl"></i></div></div><p class="text-[8px] font-black text-slate-400 uppercase">Score moyen</p><h3 class="text-2xl font-black text-slate-950 mt-1">{{ averageScore }}%</h3></div>
            <div class="stat-card bg-white p-3 md:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer" @click="activeModule = 'certificates'"><div class="flex justify-between items-start mb-2"><div class="p-2 bg-slate-50 rounded-xl"><i class="fas fa-certificate text-primary text-xl"></i></div></div><p class="text-[8px] font-black text-slate-400 uppercase">Certificats obtenus</p><h3 class="text-2xl font-black text-slate-950 mt-1">{{ certificatesList.length }}</h3></div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><h3 class="font-black uppercase text-xs text-slate-950 mb-4">Progression par matière</h3><canvas ref="progressChartCanvas" height="200"></canvas></div>
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"><h3 class="font-black uppercase text-xs text-slate-950 mb-4">Activités récentes</h3><div class="space-y-3"><div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"><div :class="['w-8 h-8 rounded-full flex items-center justify-center', activity.bgColor]"><i :class="[activity.icon, activity.iconColor]"></i></div><div class="flex-1"><p class="text-sm text-slate-800">{{ activity.description }}</p><p class="text-xs text-slate-400">{{ activity.time }}</p></div></div></div></div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl border border-slate-100 overflow-hidden"><div class="p-4 flex justify-between items-center border-b border-slate-100"><h3 class="text-xs font-black uppercase text-slate-950"><i class="fas fa-clock mr-2"></i>Quiz récents</h3></div><div class="divide-y"><div v-for="quiz in recentQuizzes" :key="quiz.id" class="flex justify-between items-center p-4 hover:bg-blue-50/20"><div class="flex items-center gap-3"><i class="fas fa-question-circle text-primary text-xl"></i><div><p class="font-bold text-sm">{{ quiz.title }}</p><p class="text-xs text-slate-500">{{ quiz.category }}</p></div></div><button @click="startQuiz(quiz)" class="px-3 py-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg text-[10px] font-black">Commencer</button></div></div></div>
            <div class="bg-white rounded-2xl border border-slate-100 overflow-hidden"><div class="p-4 flex justify-between items-center border-b border-slate-100"><h3 class="text-xs font-black uppercase text-slate-950"><i class="fas fa-trophy mr-2"></i>Examens blancs</h3></div><div class="divide-y"><div v-for="exam in recentExams" :key="exam.id" class="flex justify-between items-center p-4 hover:bg-blue-50/20"><div class="flex items-center gap-3"><i class="fas fa-file-alt text-primary text-xl"></i><div><p class="font-bold text-sm">{{ exam.title }}</p><p class="text-xs text-slate-500">{{ exam.duration }} min</p></div></div><button @click="startExam(exam)" class="px-3 py-1 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg text-[10px] font-black">Commencer</button></div></div></div>
          </div>
        </div>

        <!-- MES COURS -->
        <div v-if="activeModule === 'courses'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-6 flex-wrap gap-2"><p class="text-2xl font-black text-slate-950"><i class="fas fa-book-open text-primary mr-2"></i>Mes cours</p><div class="relative"><i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i><input type="text" v-model="courseSearch" placeholder="Rechercher un cours..." class="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm w-64 focus:outline-none focus:border-primary"></div></div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div v-for="course in filteredCourses" :key="course.id" class="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-primary/20 transition-all"><div class="flex justify-between items-start mb-3"><i :class="course.icon" class="text-primary text-3xl"></i><span :class="course.status === 'Terminé' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'" class="px-2 py-0.5 rounded-full text-xs font-bold">{{ course.status }}</span></div><h3 class="font-bold text-lg">{{ course.title }}</h3><p class="text-sm text-slate-500 mt-1">{{ course.description }}</p><div class="mt-3"><div class="flex justify-between text-xs mb-1"><span>Progression</span><span class="font-bold text-primary">{{ course.progress }}%</span></div><div class="w-full bg-slate-100 rounded-full h-1.5"><div class="bg-primary h-1.5 rounded-full" :style="{ width: course.progress + '%' }"></div></div></div><button @click="continueCourse(course)" class="mt-4 w-full py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl text-[11px] font-black uppercase shadow-md hover:shadow-lg transition"><i class="fas fa-play mr-1"></i>Continuer</button></div></div>
        </div>

        <!-- EXAMENS BLANCS -->
        <div v-if="activeModule === 'exams'" class="p-3 md:p-8"><p class="text-2xl font-black text-slate-950 mb-6"><i class="fas fa-file-alt text-primary mr-2"></i>Examens blancs</p><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div v-for="exam in examsList" :key="exam.id" class="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-primary/20 transition"><div class="flex justify-between items-start mb-3"><h3 class="font-bold text-lg">{{ exam.title }}</h3><span :class="exam.difficulty === 'Facile' ? 'bg-green-100 text-green-700' : exam.difficulty === 'Moyen' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded-full text-xs font-bold">{{ exam.difficulty }}</span></div><p class="text-sm text-slate-500 mb-3">{{ exam.description }}</p><div class="flex justify-between text-xs text-slate-400 mb-4"><span><i class="far fa-clock mr-1"></i>{{ exam.duration }} min</span><span><i class="fas fa-question-circle mr-1"></i>{{ exam.questions }} questions</span><span><i class="fas fa-users mr-1"></i>{{ exam.taken }} candidats</span></div><button @click="startExam(exam)" class="w-full py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl text-[11px] font-black uppercase shadow-md hover:shadow-lg transition"><i class="fas fa-play mr-1"></i>Commencer l'épreuve</button></div></div></div>

        <!-- QUIZ -->
        <div v-if="activeModule === 'quizzes'" class="p-3 md:p-8"><div class="flex justify-between items-center mb-6 flex-wrap gap-2"><p class="text-2xl font-black text-slate-950"><i class="fas fa-question-circle text-primary mr-2"></i>Quiz & tests</p><div class="flex gap-2"><div class="relative"><i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i><input type="text" v-model="quizSearch" placeholder="Rechercher..." class="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm w-48 focus:outline-none focus:border-primary"></div><select v-model="quizCategoryFilter" class="px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"><option value="all">Toutes catégories</option><option value="Mathématiques">Mathématiques</option><option value="Français">Français</option><option value="Culture générale">Culture générale</option></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div v-for="quiz in filteredQuizzesList" :key="quiz.id" class="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-primary/20 transition"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center"><i class="fas fa-question text-indigo-600 text-lg"></i></div><div><h3 class="font-bold text-lg">{{ quiz.title }}</h3><p class="text-xs text-slate-500">{{ quiz.category }} • {{ quiz.questions }} questions</p></div></div><div class="flex justify-between items-center"><span class="text-xs text-slate-500"><i class="fas fa-users mr-1"></i>{{ quiz.attempts }} tentatives</span><button @click="startQuiz(quiz)" class="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg text-[10px] font-black uppercase shadow-sm hover:shadow-md transition">Commencer</button></div></div></div></div>

        <!-- ORIENTATION -->
        <div v-if="activeModule === 'orientation'" class="p-3 md:p-8"><p class="text-2xl font-black text-slate-950 mb-6"><i class="fas fa-chart-line text-primary mr-2"></i>Bilan d'orientation</p><div class="grid md:grid-cols-3 gap-6 mb-8"><div v-for="test in orientationTests" :key="test.id" @click="window.open(test.link, '_blank')" class="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:border-primary/30 cursor-pointer transition-all"><div class="w-12 h-12 rounded-full flex items-center justify-center mb-3" :class="test.bgColor"><i :class="[test.icon, test.iconColor, 'text-xl']"></i></div><h3 class="font-bold text-lg">{{ test.name }}</h3><p class="text-sm text-gray-500 mt-1">{{ test.description }}</p><div class="mt-3 flex justify-between items-center"><span class="text-xs text-gray-400"><i class="far fa-clock mr-1"></i>{{ test.duration }}</span><span class="text-primary text-sm font-medium">Commencer <i class="fas fa-arrow-right ml-1"></i></span></div></div></div><div class="bg-white rounded-2xl border border-slate-100 p-6"><h3 class="font-bold text-lg mb-4"><i class="fas fa-chart-simple text-primary mr-2"></i>Résultats des tests</h3><div class="space-y-4"><div v-for="result in orientationResults" :key="result.id" class="flex justify-between items-center p-3 bg-slate-50 rounded-xl"><div><p class="font-medium">{{ result.testName }}</p><p class="text-xs text-gray-500">Complété le {{ result.date }}</p></div><span class="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700"><i class="fas fa-check-circle mr-1"></i>Complété</span></div></div></div></div>

        <!-- MOBILITÉ -->
        <div v-if="activeModule === 'mobility'" class="p-3 md:p-8"><p class="text-2xl font-black text-slate-950 mb-6"><i class="fas fa-globe text-primary mr-2"></i>Mobilité internationale</p><div class="grid lg:grid-cols-2 gap-6"><div class="bg-white rounded-2xl border border-slate-100 p-6"><h3 class="font-semibold mb-4 text-primary"><i class="fas fa-graduation-cap mr-2"></i>Bourses disponibles</h3><div class="space-y-3"><div v-for="scholarship in filteredScholarships" :key="scholarship.id" class="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition"><div><p class="font-medium">{{ scholarship.title }}</p><p class="text-xs text-gray-500"><i class="fas fa-map-marker-alt mr-1"></i>{{ scholarship.country }} • <i class="far fa-calendar-alt mr-1"></i>{{ scholarship.deadline }}</p></div><button @click="applyForScholarship(scholarship)" class="text-primary text-sm font-medium hover:underline"><i class="fas fa-external-link-alt mr-1"></i>Postuler</button></div></div><div class="mt-4 relative"><i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i><input type="text" v-model="scholarshipSearch" placeholder="Rechercher une bourse..." class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"></div></div><div class="bg-white rounded-2xl border border-slate-100 p-6"><h3 class="font-semibold mb-4 text-primary"><i class="fas fa-folder-open mr-2"></i>Suivi candidatures</h3><div class="space-y-3"><div v-for="app in applications" :key="app.id" class="flex justify-between items-center p-3 bg-slate-50 rounded-lg"><div><p class="text-sm font-medium">{{ app.program }}</p><p class="text-xs text-gray-500">Dernière mise à jour: {{ app.lastUpdate || '15/03/2025' }}</p></div><span :class="app.status === 'En cours' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'" class="px-2 py-1 rounded-full text-xs font-medium"><i :class="app.status === 'En cours' ? 'fas fa-spinner fa-pulse' : 'fas fa-check-circle'"></i> {{ app.status }}</span></div></div></div></div></div>

        <!-- COMMUNAUTÉ -->
        <div v-if="activeModule === 'community'" class="p-3 md:p-8"><p class="text-2xl font-black text-slate-950 mb-6"><i class="fas fa-users text-primary mr-2"></i>Communauté</p><div class="grid lg:grid-cols-2 gap-6"><div class="bg-white rounded-2xl border border-slate-100 p-6"><h3 class="font-semibold mb-4 text-primary"><i class="fas fa-comments mr-2"></i>Forum de discussion</h3><div class="space-y-3"><div v-for="topic in forumTopics" :key="topic.id" class="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition"><div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><i class="fas fa-user text-indigo-600 text-sm"></i></div><div class="flex-1"><p class="font-medium text-sm">{{ topic.title }}</p><p class="text-xs text-gray-500">{{ topic.author }} • {{ topic.replies }} réponses • {{ topic.time }}</p></div><span class="text-xs text-primary"><i class="fas fa-arrow-right"></i></span></div></div><button @click="openNewTopicModal" class="w-full mt-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition"><i class="fas fa-plus mr-2"></i>Nouveau sujet</button></div><div class="bg-white rounded-2xl border border-slate-100 p-6"><h3 class="font-semibold mb-4 text-primary"><i class="fas fa-users mr-2"></i>Groupes d'étude</h3><div class="space-y-3"><div v-for="group in studyGroups" :key="group.id" class="flex justify-between items-center p-3 bg-slate-50 rounded-lg"><div class="flex items-center gap-3"><i :class="group.icon" class="text-2xl text-primary"></i><div><p class="font-medium text-sm">{{ group.name }}</p><p class="text-xs text-gray-500"><i class="fas fa-user-friends mr-1"></i>{{ group.members }} membres</p></div></div><button @click="joinGroup(group)" class="text-primary text-sm font-medium hover:underline"><i class="fas fa-users mr-1"></i>Rejoindre</button></div></div></div></div></div>

        <!-- CERTIFICATS -->
        <div v-if="activeModule === 'certificates'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-6">
            <p class="text-2xl font-black text-slate-950"><i class="fas fa-certificate text-primary mr-2"></i>Mes certifications</p>
            <div class="relative"><i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i><input type="text" v-model="certificateSearch" placeholder="Rechercher un certificat..." class="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm w-64 focus:outline-none focus:border-primary"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="cert in filteredCertificates" :key="cert.id" class="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all">
              <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 text-center">
                <i class="fas fa-certificate text-4xl text-primary"></i>
              </div>
              <div class="p-4 text-center">
                <h3 class="font-bold">{{ cert.title }}</h3>
                <p class="text-xs text-slate-400 mt-1"><i class="far fa-calendar-alt mr-1"></i>Délivré le {{ cert.date }}</p>
                <p class="text-sm mt-2">Score: <strong class="text-primary">{{ cert.score }}%</strong></p>
                <div class="flex gap-2 mt-3">
                  <button @click="openCertificateModal(cert)" class="flex-1 px-3 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition">
                    <i class="fas fa-eye mr-1"></i>Voir certificat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MODALE CERTIFICAT AVEC NOM UTILISATEUR -->
        <div v-if="certificateModalOpen" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" @click.self="closeCertificateModal">
          <div class="max-w-5xl w-full">
            <!-- CERTIFICAT -->
            <div id="certificat" class="relative bg-[#0b1a2d] rounded-2xl shadow-2xl overflow-hidden text-white">
              <!-- RUBANS OR SVG -->
              <svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fbbf24"/>
                    <stop offset="50%" stop-color="#f59e0b"/>
                    <stop offset="100%" stop-color="#d97706"/>
                  </linearGradient>
                  <linearGradient id="goldLight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#fef3c7"/>
                    <stop offset="100%" stop-color="#fbbf24"/>
                  </linearGradient>
                </defs>
                <path d="M0,0 C150,100 150,500 0,600 L100,600 C250,450 250,150 100,0 Z" fill="url(#gold)"/>
                <path d="M800,0 C650,100 650,500 800,600 L700,600 C550,450 550,150 700,0 Z" fill="url(#gold)"/>
              </svg>

              <!-- COURONNE -->
              <div class="absolute left-6 top-1/2 -translate-y-1/2 -mt-16">
                <div class="crown-container">
                  <i class="fas fa-crown text-3xl text-yellow-400 crown-icon"></i>
                  <svg class="crown-svg" width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <path d="M10,35 L5,15 L15,25 L30,5 L45,25 L55,15 L50,35 Z" fill="url(#gold)" stroke="#b45309" stroke-width="1.5"/>
                    <circle cx="30" cy="8" r="3" fill="#fef3c7"/>
                    <circle cx="15" cy="20" r="2.5" fill="#fef3c7"/>
                    <circle cx="45" cy="20" r="2.5" fill="#fef3c7"/>
                  </svg>
                </div>
              </div>

              <!-- MÉDAILLE -->
              <div class="absolute left-6 top-1/2 -translate-y-1/2">
                <div class="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-xl medal-glow">
                  <div class="w-20 h-20 bg-[#0b1a2d] rounded-full flex items-center justify-center text-center flex-col">
                    <i class="fas fa-award text-yellow-400 text-xl mb-1"></i>
                    <span class="text-xs text-yellow-400 font-bold">Best</span>
                    <span class="text-xs text-yellow-400 font-bold">Award</span>
                  </div>
                </div>
              </div>

              <!-- LOGO GRADUS AURA -->
              <div class="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-yellow-500/30">
                <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <i class="fas fa-graduation-cap text-white text-sm"></i>
                </div>
                <span class="text-sm font-bold text-yellow-400">Gradus Aura</span>
              </div>

              <!-- CONTENU -->
              <div class="relative z-10 p-10 text-center">
                <h1 class="text-4xl md:text-5xl font-bold tracking-widest" style="font-family: 'Georgia', serif;">CERTIFICAT</h1>
                <p class="text-yellow-400 tracking-widest mt-2">DE RÉUSSITE</p>

                <p class="mt-6 text-gray-300">Décerné à</p>
                <h2 class="text-3xl md:text-4xl text-yellow-400 border-b border-gray-500 inline-block mt-4">{{ userFullname }}</h2>

                <p class="mt-6 max-w-xl mx-auto italic text-gray-200" style="font-family: 'Georgia', serif; font-style: italic; line-height: 1.6;">
                  Ce certificat récompense les efforts exceptionnels, la persévérance et l'excellence démontrés tout au long du programme de formation "<strong>{{ selectedCertificate?.title }}</strong>". Votre dévouement, votre travail acharné et votre engagement sans faille vous ont permis d'atteindre des résultats remarquables. Nous vous félicitons chaleureusement pour cette brillante réussite et vous encourageons à poursuivre sur cette voie d'excellence.
                </p>

                <!-- Informations du certificat -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
                  <div>
                    <p class="text-yellow-400 font-semibold">{{ selectedCertificate?.date || '15 Mars 2025' }}</p>
                    <p class="text-xs text-gray-400 mt-1">Date d'obtention</p>
                  </div>
                  <div>
                    <p class="text-yellow-400 font-semibold">{{ selectedCertificate?.score || '85' }}%</p>
                    <p class="text-xs text-gray-400 mt-1">Score obtenu</p>
                  </div>
                  <div>
                    <div class="flex justify-center">
                      <i class="fas fa-signature text-2xl text-yellow-400"></i>
                    </div>
                    <p class="text-xs text-gray-400 mt-1">Signature du formateur</p>
                  </div>
                  <div>
                    <div class="flex justify-center">
                      <i class="fas fa-stamp text-2xl text-yellow-400"></i>
                    </div>
                    <p class="text-xs text-gray-400 mt-1">Cachet officiel</p>
                  </div>
                </div>
              </div>

              <!-- Sceau décoratif -->
              <div class="absolute bottom-4 right-4 opacity-30">
                <i class="fas fa-certificate text-yellow-500 text-4xl"></i>
              </div>
            </div>

            <!-- BOUTONS -->
            <div class="flex justify-center gap-4 mt-6">
              <button @click="generateCertificatePDF" :disabled="pdfLoading" class="bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-2 rounded-lg text-white font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                <i class="fas fa-download mr-2"></i>{{ pdfLoading ? 'Génération...' : 'Télécharger le certificat' }}
              </button>
              <button @click="closeCertificateModal" class="border border-indigo-600/50 px-6 py-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-all">
                <i class="fas fa-times mr-2"></i>Fermer
              </button>
            </div>
          </div>
        </div>

        <!-- PROFIL -->
        <div v-if="activeModule === 'profile'" class="p-3 md:p-8"><div class="flex justify-between items-center mb-6"><p class="text-2xl font-black text-slate-950"><i class="fas fa-user-circle text-primary mr-2"></i>Mon profil</p><button @click="openEditProfileModal" class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl text-[11px] font-black uppercase shadow-md hover:shadow-lg transition">Modifier</button></div><div class="bg-white rounded-2xl border border-slate-100 p-8 max-w-2xl mx-auto"><div class="flex flex-col sm:flex-row items-center gap-6 mb-8"><div class="w-24 h-24 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">{{ userInitials }}</div><div><h3 class="text-2xl font-bold">{{ userFullname }}</h3><p class="text-slate-500">{{ userEmail }}</p><p class="text-xs text-slate-400 mt-1"><i class="far fa-calendar-alt mr-1"></i>Membre depuis {{ memberSince }}</p><span class="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black"><i class="fas fa-star mr-1"></i>Étudiant</span></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-wider"><i class="fas fa-user mr-1"></i>Nom complet</label><p class="text-base font-medium mt-1">{{ userFullname }}</p></div><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-wider"><i class="fas fa-envelope mr-1"></i>Email</label><p class="text-base font-medium mt-1">{{ userEmail }}</p></div><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-wider"><i class="fas fa-phone mr-1"></i>Téléphone</label><p class="text-base font-medium mt-1">{{ userPhone || '+237 699 000 000' }}</p></div><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-wider"><i class="fas fa-map-marker-alt mr-1"></i>Ville</label><p class="text-base font-medium mt-1">{{ userCity || 'Yaoundé, Cameroun' }}</p></div><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-wider"><i class="fas fa-certificate mr-1"></i>Certificats</label><p class="text-base font-medium mt-1">{{ certificatesList.length }} certificats obtenus</p></div><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-wider"><i class="fas fa-chart-line mr-1"></i>Statut</label><p class="text-emerald-600 font-medium mt-1"><i class="fas fa-circle text-[6px] mr-1"></i>Actif</p></div></div></div></div>
      </main>
    </template>

    <!-- MODALES -->
    <div v-if="editProfileModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeEditProfileModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-user-edit text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">Modifier mon profil</h2></div>
          <button @click="closeEditProfileModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nom complet</label><input type="text" v-model="editProfileForm.fullname" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email</label><input type="email" v-model="editProfileForm.email" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Téléphone</label><input type="tel" v-model="editProfileForm.phone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div class="flex gap-3 mt-6"><button @click="saveProfile" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> Enregistrer</button><button @click="closeEditProfileModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button></div>
        </div>
      </div>
    </div>

    <div v-if="newTopicModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeNewTopicModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-comment text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">Nouveau sujet</h2></div>
          <button @click="closeNewTopicModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Titre</label><input type="text" v-model="newTopicForm.title" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div>
          <div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Message</label><textarea v-model="newTopicForm.message" rows="4" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></textarea></div>
          <div class="flex gap-3 mt-6"><button @click="createTopic" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-paper-plane mr-2"></i> Publier</button><button @click="closeNewTopicModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button></div>
        </div>
      </div>
    </div>

    <div v-if="premiumModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closePremiumModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-crown text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">Passer à Premium</h2></div>
          <button @click="closePremiumModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4">
          <div class="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl"><div class="flex justify-between items-center"><div><p class="font-bold text-lg text-amber-800">Premium</p><p class="text-sm text-gray-600">Accès illimité à toutes les fonctionnalités</p></div><span class="text-2xl font-bold text-amber-600">9 900 FCFA</span></div></div>
          <div class="space-y-2"><div class="flex items-center gap-2"><i class="fas fa-check-circle text-amber-500"></i><span class="text-sm">Accès à tous les cours et examens blancs</span></div><div class="flex items-center gap-2"><i class="fas fa-check-circle text-amber-500"></i><span class="text-sm">Certificats de réussite premium</span></div><div class="flex items-center gap-2"><i class="fas fa-check-circle text-amber-500"></i><span class="text-sm">Support prioritaire 24/7</span></div></div>
          <div class="flex gap-3 mt-6"><button @click="processPayment" class="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-credit-card mr-2"></i> Payer</button><button @click="closePremiumModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button></div>
        </div>
      </div>
    </div>

    <div v-if="paymentSuccessModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closePaymentSuccessModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100 text-center p-6">
        <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4"><i class="fas fa-check-circle text-green-600 text-4xl"></i></div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Paiement réussi !</h2><p class="text-gray-500 mb-6">Votre compte a été mis à jour vers Premium. Profitez de tous les avantages !</p>
        <button @click="closePaymentSuccessModal" class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition">Fermer</button>
      </div>
    </div>

    <div v-if="forgotPasswordModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeForgotPasswordModal">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
        <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-key text-white text-lg"></i></div><h2 class="text-lg font-black text-slate-950">Mot de passe oublié</h2></div>
          <button @click="closeForgotPasswordModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
        </div>
        <div class="p-5 space-y-4"><p class="text-sm text-slate-600">Entrez votre email pour recevoir un lien de réinitialisation</p><div><label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email</label><input type="email" v-model="forgotPasswordEmail" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition"></div><div class="flex gap-3 mt-6"><button @click="sendResetLink" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-paper-plane mr-2"></i> Envoyer</button><button @click="closeForgotPasswordModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> Annuler</button></div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const router = useRouter();

// Authentification
const isAuthenticated = ref(false);
const authMode = ref('login');
const authLoading = ref(false);
const authError = ref('');
const mobileSidebarOpen = ref(false);
const isDarkMode = ref(false);
const activeModule = ref('dashboard');
const forgotPasswordModalOpen = ref(false);
const forgotPasswordEmail = ref('');

const loginForm = ref({ email: '', password: '' });
const registerForm = ref({ fullname: '', email: '', password: '', confirmPassword: '' });

const userFullname = ref('');
const userEmail = ref('');
const userPhone = ref('');
const userCity = ref('');
const userInitials = computed(() => (userFullname.value.charAt(0) || 'U').toUpperCase());
const memberSince = ref(new Date().toLocaleDateString());

// Modales
const editProfileModalOpen = ref(false);
const newTopicModalOpen = ref(false);
const premiumModalOpen = ref(false);
const paymentSuccessModalOpen = ref(false);
const certificateModalOpen = ref(false);
const selectedCertificate = ref(null);
const pdfLoading = ref(false);

const editProfileForm = ref({ fullname: '', email: '', phone: '' });
const newTopicForm = ref({ title: '', message: '' });

// Données
const coursesList = ref([
  { id: 1, title: 'Préparation Concours ENAM 2025', description: 'Mathématiques, Culture générale, Droit', icon: 'fas fa-gavel', status: 'En cours', progress: 65 },
  { id: 2, title: 'TCF Canada - Compréhension écrite', description: 'Préparation complète TCF', icon: 'fas fa-language', status: 'En cours', progress: 80 },
  { id: 3, title: 'Culture Générale 2025', description: 'Actualités et connaissances', icon: 'fas fa-globe', status: 'En cours', progress: 45 },
  { id: 4, title: 'Droit Constitutionnel', description: 'Institutions de la République', icon: 'fas fa-balance-scale', status: 'Terminé', progress: 100 },
  { id: 5, title: 'Anglais Professionnel', description: 'Maîtrise de l\'anglais', icon: 'fas fa-comments', status: 'En cours', progress: 30 },
  { id: 6, title: 'Mathématiques Financières', description: 'Intérêts, emprunts', icon: 'fas fa-calculator', status: 'À commencer', progress: 0 }
]);

const examsList = ref([
  { id: 1, title: 'Épreuve blanche ENAM 2025', description: 'Simulation complète', duration: 180, questions: 100, difficulty: 'Difficile', taken: 234 },
  { id: 2, title: 'Test TCF - Expression écrite', description: 'Préparation TCF', duration: 60, questions: 25, difficulty: 'Moyen', taken: 156 },
  { id: 3, title: 'Test blanc Mathématiques', description: 'Algèbre, analyse', duration: 90, questions: 40, difficulty: 'Difficile', taken: 189 },
  { id: 4, title: 'Quiz Culture Générale', description: 'Actualités 2025', duration: 30, questions: 50, difficulty: 'Facile', taken: 342 },
  { id: 5, title: 'Droit des contrats', description: 'Droit des obligations', duration: 75, questions: 35, difficulty: 'Moyen', taken: 98 },
  { id: 6, title: 'Anglais - Compréhension', description: 'Test TOEIC', duration: 45, questions: 30, difficulty: 'Moyen', taken: 145 }
]);

const quizzesList = ref([
  { id: 1, title: 'Grammaire française', category: 'Français', questions: 15, attempts: 234 },
  { id: 2, title: 'Calcul mental', category: 'Mathématiques', questions: 20, attempts: 187 },
  { id: 3, title: 'Actualités 2025', category: 'Culture générale', questions: 10, attempts: 145 },
  { id: 4, title: 'Conjugaison', category: 'Français', questions: 12, attempts: 98 },
  { id: 5, title: 'Vocabulaire anglais', category: 'Anglais', questions: 20, attempts: 156 },
  { id: 6, title: 'Droit administratif', category: 'Droit', questions: 15, attempts: 89 }
]);

const certificatesList = ref([
  { id: 1, title: 'Certification TCF Canada', date: '10/02/2025', score: 85 },
  { id: 2, title: 'Préparation Concours ENAM', date: '05/01/2025', score: 78 },
  { id: 3, title: 'Anglais Professionnel B2', date: '20/12/2024', score: 82 },
  { id: 4, title: 'Droit Administratif', date: '15/11/2024', score: 75 },
  { id: 5, title: 'Culture Générale', date: '01/10/2024', score: 88 },
  { id: 6, title: 'Mathématiques Financières', date: '05/09/2024', score: 71 }
]);

const orientationTests = ref([
  { id: 1, name: 'Test QI', description: 'Évaluez vos capacités cognitives', icon: 'fas fa-brain', bgColor: 'bg-blue-100', iconColor: 'text-blue-600', duration: '30 min', link: '/orientation/test-qi' },
  { id: 2, name: 'Test DISC', description: 'Découvrez votre personnalité', icon: 'fas fa-chart-pie', bgColor: 'bg-purple-100', iconColor: 'text-purple-600', duration: '15 min', link: '/orientation/test-disc' },
  { id: 3, name: 'Test RIASEC', description: 'Identifiez vos intérêts', icon: 'fas fa-chart-bar', bgColor: 'bg-green-100', iconColor: 'text-green-600', duration: '20 min', link: '/orientation/test-riasec' }
]);

const orientationResults = ref([
  { id: 1, testName: 'Test QI', date: '15/03/2025', status: 'Complété' },
  { id: 2, testName: 'Test DISC', date: '10/03/2025', status: 'Complété' },
  { id: 3, testName: 'Test RIASEC', date: '05/03/2025', status: 'Complété' }
]);

const scholarshipsList = ref([
  { id: 1, title: 'Bourse Eiffel - France', country: 'France', deadline: '30/04/2025' },
  { id: 2, title: 'Bourse Excellence - Canada', country: 'Canada', deadline: '15/05/2025' },
  { id: 3, title: 'Programme Mastercard', country: 'Afrique du Sud', deadline: '01/06/2025' },
  { id: 4, title: 'Bourse AUF', country: 'France', deadline: '20/05/2025' }
]);

const applications = ref([
  { id: 1, program: 'Master Droit - Paris 2', status: 'En cours', lastUpdate: '10/03/2025' },
  { id: 2, program: 'Bourse Eiffel', status: 'Acceptée', lastUpdate: '15/03/2025' },
  { id: 3, program: 'Université de Montréal', status: 'En cours', lastUpdate: '05/03/2025' }
]);

const forumTopics = ref([
  { id: 1, title: 'Conseils pour l\'épreuve de droit', author: 'Marie', replies: 5, time: '2 jours' },
  { id: 2, title: 'Ressources maths recommandées', author: 'Paul', replies: 3, time: '5 jours' },
  { id: 3, title: 'Comment gérer le stress ?', author: 'Sophie', replies: 8, time: '1 jour' }
]);

const studyGroups = ref([
  { id: 1, name: 'Groupe révision ENAM', icon: 'fas fa-users', members: 45 },
  { id: 2, name: 'Anglais professionnel', icon: 'fas fa-language', members: 32 },
  { id: 3, name: 'Droit des affaires', icon: 'fas fa-gavel', members: 28 }
]);

const recentActivities = ref([
  { id: 1, description: 'Vous avez terminé le quiz "Culture Générale" avec 85%', time: 'Il y a 2h', icon: 'fas fa-check-circle', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
  { id: 2, description: 'Nouveau cours disponible: "Droit Constitutionnel"', time: 'Il y a 1j', icon: 'fas fa-book-open', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 3, description: 'Certificat obtenu: TCF Canada', time: 'Il y a 3j', icon: 'fas fa-certificate', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' }
]);

// Recherches
const courseSearch = ref('');
const quizSearch = ref('');
const quizCategoryFilter = ref('all');
const scholarshipSearch = ref('');
const certificateSearch = ref('');

// Computed
const newCoursesCount = ref(2);
const completedQuizzes = computed(() => 4);
const completedQuizzesPercentage = computed(() => 66);
const averageScore = computed(() => 76);
const globalProgress = computed(() => 65);

const filteredCourses = computed(() => {
  if (!courseSearch.value) return coursesList.value;
  return coursesList.value.filter(c => c.title.toLowerCase().includes(courseSearch.value.toLowerCase()));
});

const filteredQuizzesList = computed(() => {
  let filtered = quizzesList.value;
  if (quizSearch.value) filtered = filtered.filter(q => q.title.toLowerCase().includes(quizSearch.value.toLowerCase()));
  if (quizCategoryFilter.value !== 'all') filtered = filtered.filter(q => q.category === quizCategoryFilter.value);
  return filtered;
});

const filteredScholarships = computed(() => {
  if (!scholarshipSearch.value) return scholarshipsList.value;
  return scholarshipsList.value.filter(s => s.title.toLowerCase().includes(scholarshipSearch.value.toLowerCase()));
});

const filteredCertificates = computed(() => {
  if (!certificateSearch.value) return certificatesList.value;
  return certificatesList.value.filter(c => c.title.toLowerCase().includes(certificateSearch.value.toLowerCase()));
});

const recentQuizzes = computed(() => quizzesList.value.slice(0, 3));
const recentExams = computed(() => examsList.value.slice(0, 3));

const moduleTitle = computed(() => {
  const titles = { dashboard: 'Tableau de bord', courses: 'Mes cours', exams: 'Examens blancs', quizzes: 'Quiz & tests', orientation: 'Bilan orientation', mobility: 'Mobilité', community: 'Communauté', certificates: 'Certificats', profile: 'Mon profil' };
  return titles[activeModule.value] || 'Accueil';
});

// Fonctions authentification
const initDefaultUsers = () => {
  const users = JSON.parse(localStorage.getItem('gradus_users') || '[]');
  if (users.length === 0) {
    localStorage.setItem('gradus_users', JSON.stringify([
      { id: 1, fullname: 'Sophie Martin', email: 'eleve@gradusaura.com', password: 'Eleve-123', memberSince: new Date().toLocaleDateString() }
    ]));
  }
};

const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) { authError.value = 'Les mots de passe ne correspondent pas'; return; }
  if (registerForm.value.password.length < 6) { authError.value = 'Mot de passe trop court'; return; }
  authLoading.value = true;
  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('gradus_users') || '[]');
    if (users.find(u => u.email === registerForm.value.email)) { authError.value = 'Email déjà utilisé'; authLoading.value = false; return; }
    const newUser = { id: Date.now(), fullname: registerForm.value.fullname, email: registerForm.value.email, password: registerForm.value.password, memberSince: new Date().toLocaleDateString() };
    users.push(newUser);
    localStorage.setItem('gradus_users', JSON.stringify(users));
    userFullname.value = newUser.fullname; userEmail.value = newUser.email; memberSince.value = newUser.memberSince;
    localStorage.setItem('gradus_token', 'token-' + Date.now());
    localStorage.setItem('gradus_user', JSON.stringify(newUser));
    isAuthenticated.value = true;
    authLoading.value = false;
  }, 1000);
};

const handleLogin = () => {
  authLoading.value = true;
  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('gradus_users') || '[]');
    const user = users.find(u => u.email === loginForm.value.email && u.password === loginForm.value.password);
    if (user) {
      userFullname.value = user.fullname; userEmail.value = user.email; memberSince.value = user.memberSince;
      localStorage.setItem('gradus_token', 'token-' + Date.now());
      localStorage.setItem('gradus_user', JSON.stringify(user));
      isAuthenticated.value = true; authError.value = '';
    } else { authError.value = 'Email ou mot de passe incorrect'; }
    authLoading.value = false;
  }, 1000);
};

const logout = () => { localStorage.removeItem('gradus_token'); localStorage.removeItem('gradus_user'); isAuthenticated.value = false; };

// Actions fonctionnelles
const continueCourse = (course) => { console.log(`Continuer le cours: ${course.title}`); };
const startExam = (exam) => { console.log(`Démarrer l'examen: ${exam.title}`); };
const startQuiz = (quiz) => { console.log(`Démarrer le quiz: ${quiz.title}`); };
const applyForScholarship = (scholarship) => { window.open('/mobilite/dossier', '_blank'); };
const joinGroup = (group) => { console.log(`Rejoindre le groupe: ${group.name}`); };
const createTopic = () => { console.log(`Nouveau sujet: ${newTopicForm.value.title}`); closeNewTopicModal(); };
const saveProfile = () => { userFullname.value = editProfileForm.value.fullname; userEmail.value = editProfileForm.value.email; userPhone.value = editProfileForm.value.phone; closeEditProfileModal(); };
const processPayment = () => { premiumModalOpen.value = false; paymentSuccessModalOpen.value = true; };
const sendResetLink = () => { closeForgotPasswordModal(); };

const openCertificateModal = (cert) => {
  selectedCertificate.value = cert;
  certificateModalOpen.value = true;
};

const closeCertificateModal = () => {
  certificateModalOpen.value = false;
  selectedCertificate.value = null;
};

const generateCertificatePDF = async () => {
  pdfLoading.value = true;
  try {
    const element = document.getElementById('certificat');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 3, backgroundColor: '#0b1a2d', useCORS: true });
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgWidth = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`Certificat_${selectedCertificate.value?.title || 'Formation'}_${userFullname.value}.pdf`);
  } catch (error) {
    console.error('Erreur PDF:', error);
  } finally {
    pdfLoading.value = false;
  }
};

const openEditProfileModal = () => { editProfileForm.value = { fullname: userFullname.value, email: userEmail.value, phone: userPhone.value }; editProfileModalOpen.value = true; };
const closeEditProfileModal = () => { editProfileModalOpen.value = false; };
const openNewTopicModal = () => { newTopicForm.value = { title: '', message: '' }; newTopicModalOpen.value = true; };
const closeNewTopicModal = () => { newTopicModalOpen.value = false; };
const openPremiumModal = () => { premiumModalOpen.value = true; };
const closePremiumModal = () => { premiumModalOpen.value = false; };
const closePaymentSuccessModal = () => { paymentSuccessModalOpen.value = false; };
const openForgotPasswordModal = () => { forgotPasswordModalOpen.value = true; };
const closeForgotPasswordModal = () => { forgotPasswordModalOpen.value = false; forgotPasswordEmail.value = ''; };

// Graphiques
const progressChartCanvas = ref(null);
let progressChart = null;

const initCharts = () => {
  if (progressChartCanvas.value) {
    if (progressChart) progressChart.destroy();
    progressChart = new Chart(progressChartCanvas.value, {
      type: 'bar',
      data: { labels: ['Maths', 'Français', 'Culture', 'Droit', 'Anglais'], datasets: [{ label: 'Score (%)', data: [68, 75, 82, 62, 71], backgroundColor: '#4F46E5', borderRadius: 8 }] },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }
    });
  }
};

onMounted(() => {
  initDefaultUsers();
  const token = localStorage.getItem('gradus_token');
  const savedUser = localStorage.getItem('gradus_user');
  if (token && savedUser) {
    const user = JSON.parse(savedUser);
    userFullname.value = user.fullname; userEmail.value = user.email; memberSince.value = user.memberSince;
    isAuthenticated.value = true;
  }
  nextTick(() => initCharts());
});
</script>

<style scoped>
.gradient-bg { background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%); }
.sidebar-item:hover { background: rgba(79, 70, 229, 0.1); }
.sidebar-item.active { background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(6, 182, 212, 0.2)); border-left: 3px solid #4F46E5; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
.stat-card { transition: all 0.3s ease; }
.stat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15); }
.text-primary { color: #4F46E5; }
.bg-primary { background-color: #4F46E5; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }

/* Styles pour le certificat */
.crown-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: -15px;
  z-index: 10;
}
.crown-icon {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.5));
  animation: crownFloat 3s ease-in-out infinite;
}
.crown-svg {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}
@keyframes crownFloat {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-5px); }
}
.medal-glow {
  animation: medalPulse 2s infinite;
}
@keyframes medalPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
  50% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); }
}

.dark .bg-white { background-color: #1f2937; }
.dark .text-slate-950 { color: #f3f4f6; }
.dark .text-slate-500 { color: #9ca3af; }
.dark .border-slate-100 { border-color: #374151; }
.dark .bg-slate-50 { background-color: #1f2937; }
.dark .text-slate-600 { color: #cbd5e1; }
.dark .border-slate-200 { border-color: #374151; }
</style>
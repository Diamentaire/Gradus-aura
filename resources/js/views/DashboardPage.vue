<template>
  <div :class="['flex h-screen', isDarkMode ? 'dark' : '']">
    <!-- Écran de connexion / inscription si non authentifié -->
    <div v-if="!isAuthenticated" class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200">
      <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-slate-100">
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <i class="fas fa-graduation-cap text-white text-2xl"></i>
          </div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tighter">Gradus Aura</h2>
          <p class="text-slate-500 text-sm mt-2">{{ translateAuth('welcome') }}</p>
        </div>

        <div class="flex gap-2 mb-6 bg-slate-100 rounded-xl p-1">
          <button @click="authMode = 'login'" :class="['flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2', authMode === 'login' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/50']">
            <i class="fas fa-sign-in-alt text-sm"></i>
            {{ translateAuth('login') }}
          </button>
          <button @click="authMode = 'register'" :class="['flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2', authMode === 'register' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/50']">
            <i class="fas fa-user-plus text-sm"></i>
            {{ translateAuth('register') }}
          </button>
        </div>

        <form v-if="authMode === 'login'" @submit.prevent="handleLogin" class="space-y-4">
          <div class="relative">
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="email" v-model="loginForm.email" placeholder="Email" required
              class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
          </div>
          <div class="relative">
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="password" v-model="loginForm.password" placeholder="Mot de passe" required
              class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
          </div>
          <div class="flex justify-end">
            <a href="#" class="text-xs text-blue-600 hover:text-blue-700 transition" @click.prevent="openForgotPasswordModal">Mot de passe oublié ?</a>
          </div>
          <button type="submit" :disabled="authLoading" class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2">
            <i class="fas fa-arrow-right text-sm"></i>
            {{ authLoading ? 'Chargement...' : translateAuth('loginBtn') }}
          </button>
        </form>

        <form v-if="authMode === 'register'" @submit.prevent="handleRegister" class="space-y-3">
          <div class="relative">
            <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="text" v-model="registerForm.fullname" placeholder="Nom complet" required
              class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
          </div>
          <div class="relative">
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="email" v-model="registerForm.email" placeholder="Email" required
              class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
          </div>
          <div class="relative">
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="password" v-model="registerForm.password" placeholder="Mot de passe (min 6 caractères)" required
              class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
          </div>
          <div class="relative">
            <i class="fas fa-check-circle absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="password" v-model="registerForm.confirmPassword" placeholder="Confirmer le mot de passe" required
              class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
          </div>
          <button type="submit" :disabled="authLoading" class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 mt-4">
            <i class="fas fa-user-plus text-sm"></i>
            {{ authLoading ? 'Chargement...' : translateAuth('registerBtn') }}
          </button>
        </form>

        <p v-if="authError" class="text-red-500 text-sm text-center mt-4 flex items-center justify-center gap-2">
          <i class="fas fa-exclamation-circle"></i>
          {{ authError }}
        </p>

        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-slate-200"></div>
          <span class="text-slate-400 text-xs">ou</span>
          <div class="flex-1 h-px bg-slate-200"></div>
        </div>

        <div class="flex gap-3">
          <button class="flex-1 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
            <i class="fab fa-google text-red-500"></i>
            <span class="text-sm">Google</span>
          </button>
          <button class="flex-1 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
            <i class="fab fa-facebook-f text-blue-600"></i>
            <span class="text-sm">Facebook</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Interface principale -->
    <template v-else>
      <button 
        @click="mobileSidebarOpen = !mobileSidebarOpen" 
        class="fixed bottom-4 right-4 z-50 md:hidden bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <i class="fas fa-bars text-xl"></i>
      </button>

      <!-- Sidebar -->
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

        <div :class="['p-4 md:p-6 border-b', isDarkMode ? 'border-gray-700' : 'border-slate-200']">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl">
              <i class="fas fa-graduation-cap text-white text-sm md:text-base"></i>
            </div>
            <span :class="['font-bold text-lg md:text-xl tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">Gradus Aura</span>
          </div>
          
          <div :class="['grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 rounded-2xl border mt-4 md:mt-6', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Nodes</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">Actifs</p></div>
            <div class="text-center py-1 md:py-2 border-x border-slate-200"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Uptime</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">99.9%</p></div>
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Securite</p><p class="text-[8px] md:text-[10px] font-bold text-emerald-600">Encrypted</p></div>
          </div>
        </div>
        
        <nav class="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6 custom-scrollbar">
          <div class="space-y-1">
            <div @click="activeTab = 'dashboard'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'dashboard' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-tachometer-alt w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">{{ translate('dashboard') }}</span>
            </div>
          </div>
          
          <div class="space-y-1">
            <div @click="activeTab = 'epreuves'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'epreuves' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-download w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">{{ translate('myExams') }}</span>
            </div>
            <div @click="activeTab = 'concours'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'concours' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-trophy w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">{{ translate('myContests') }}</span>
            </div>
            <div @click="activeTab = 'formations'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'formations' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-graduation-cap w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">{{ translate('myTrainings') }}</span>
            </div>
            <div @click="activeTab = 'progression'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'progression' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-chart-line w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">{{ translate('myProgress') }}</span>
            </div>
            <div @click="activeTab = 'tests'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'tests' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-certificate w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">{{ translate('myTests') }}</span>
            </div>
            <div @click="activeTab = 'orientation'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'orientation' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-chart-line w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Orientation</span>
            </div>
            <div @click="activeTab = 'e-learning'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'e-learning' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-graduation-cap w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">E-learning</span>
            </div>
            <div @click="activeTab = 'mobilite'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'mobilite' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-globe w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Mobilité</span>
            </div>
            <div @click="activeTab = 'errorWall'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'errorWall' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-exclamation-triangle w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Mur des erreurs</span>
            </div>
            <div @click="activeTab = 'notes'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'notes' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-pen w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Mes notes</span>
            </div>
            <div @click="activeTab = 'calendar'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'calendar' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-calendar-alt w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">Calendrier</span>
            </div>
            <div @click="activeTab = 'profil'; mobileSidebarOpen = false" :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeTab === 'profil' ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i class="fas fa-user w-4 md:w-5"></i>
              <span class="font-black uppercase tracking-widest">{{ translate('myProfile') }}</span>
            </div>
          </div>
        </nav>
        
        <div :class="['p-3 md:p-4 border-t', isDarkMode ? 'border-gray-700' : 'border-slate-100']">
          <div class="flex items-center gap-2 md:gap-3">
            <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
              {{ userInitials }}
            </div>
            <div class="flex-1">
              <p :class="['text-[10px] md:text-xs font-bold truncate', isDarkMode ? 'text-white' : 'text-slate-950']">{{ userName }}</p>
              <p :class="['text-[8px] md:text-[10px] truncate', isDarkMode ? 'text-gray-400' : 'text-slate-500']">{{ userEmail }}</p>
            </div>
          </div>
          <button @click="logout" class="w-full mt-3 md:mt-4 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition text-[10px] md:text-[12px]">
            <i class="fas fa-sign-out-alt"></i>
            <span class="font-black uppercase tracking-widest">{{ translate('logout') }}</span>
          </button>
        </div>
      </aside>
      
      <div 
        v-if="mobileSidebarOpen" 
        class="fixed inset-0 bg-black/50 z-30 md:hidden"
        @click="mobileSidebarOpen = false"
      ></div>
      
      <main :class="['flex-1 overflow-y-auto custom-scrollbar', isDarkMode ? 'bg-gray-900' : 'bg-slate-50']">
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
                <p class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{{ translate('connected') }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2 md:gap-4">
              <div class="relative">
                <div @click="orientationMenuOpen = !orientationMenuOpen" class="cursor-pointer">
                  <i class="fas fa-chart-line text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
                </div>
                <div v-if="orientationMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50">
                  <div class="block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer" @click="orientationMenuOpen = false; $router.push('/orientation/test-qi')">
                    <i class="fas fa-brain mr-2 text-blue-500"></i> Test QI
                  </div>
                  <div class="block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer" @click="orientationMenuOpen = false; $router.push('/orientation/test-disc')">
                    <i class="fas fa-chart-pie mr-2 text-purple-500"></i> Test DISC
                  </div>
                  <div class="block px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer" @click="orientationMenuOpen = false; $router.push('/orientation/test-riasec')">
                    <i class="fas fa-chart-bar mr-2 text-green-500"></i> Test RIASEC
                  </div>
                  <hr class="my-1">
                  <div class="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-50 cursor-pointer" @click="orientationMenuOpen = false; $router.push('/orientation/resultats')">
                    <i class="fas fa-chart-line mr-2"></i> Mes résultats
                  </div>
                </div>
              </div>
              <div class="relative cursor-pointer" @click="openMessagesModal">
                <i class="fas fa-envelope text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
                <span class="absolute -top-1 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-[6px] md:text-[8px] font-bold rounded-full flex items-center justify-center">{{ unreadMessages }}</span>
              </div>
              <div class="relative cursor-pointer" @click="openNotificationsModal">
                <i class="fas fa-bell text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
                <span class="absolute -top-1 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-[6px] md:text-[8px] font-bold rounded-full flex items-center justify-center">{{ unreadNotifications }}</span>
              </div>
              <div class="relative cursor-pointer" @click="openSettingsModal">
                <i class="fas fa-cog text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
              </div>
              <div class="flex items-center gap-2 md:gap-3 ml-1 md:ml-2 cursor-pointer" @click="activeTab = 'profil'; mobileSidebarOpen = false">
                <div class="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                  {{ userInitials }}
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <!-- ==================== DASHBOARD ==================== -->
        <div v-if="activeTab === 'dashboard'" class="p-3 md:p-8">
          <!-- Alertes et rappels -->
          <div class="mb-6">
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl p-4 mb-3">
              <div class="flex items-center gap-3">
                <i class="fas fa-bell text-amber-500 text-xl"></i>
                <div class="flex-1">
                  <p class="font-bold text-gray-800">Rappel de révision</p>
                  <p class="text-sm text-gray-600">Vous avez 3 chapitres à réviser cette semaine</p>
                </div>
                <button class="text-amber-600 text-sm">Voir <i class="fas fa-arrow-right ml-1"></i></button>
              </div>
            </div>
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-xl p-4">
              <div class="flex items-center gap-3">
                <i class="fas fa-calendar-check text-blue-500 text-xl"></i>
                <div class="flex-1">
                  <p class="font-bold text-gray-800">Test blanc programmé</p>
                  <p class="text-sm text-gray-600">Concours Administratifs - 15 Avril 2025 à 14h00</p>
                </div>
                <button class="text-blue-600 text-sm">S'inscrire <i class="fas fa-arrow-right ml-1"></i></button>
              </div>
            </div>
          </div>

          <!-- Cartes statistiques -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer" @click="activeTab = 'epreuves'">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-download text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ epreuvesTelechargees.length }}</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ translate('downloadedExams') }}</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ epreuvesTelechargees.length }}</h3>
            </div>
            
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer" @click="activeTab = 'concours'">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-trophy text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ inscriptionsConcours.length }}</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ translate('registeredContests') }}</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ inscriptionsConcours.length }}</h3>
            </div>
            
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer" @click="activeTab = 'formations'">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-graduation-cap text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ formationsInscrites.length }}</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ translate('trainingsFollowed') }}</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ formationsInscrites.length }}</h3>
            </div>
            
            <div class="stat-card bg-white p-3 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer" @click="activeTab = 'tests'">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <div class="p-2 md:p-3 bg-slate-50 rounded-xl transition-all"><i class="fas fa-check-circle text-primary text-base md:text-xl"></i></div>
                <span class="text-[7px] md:text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full">+{{ testsEffectues.length + quizRealises.length }}</span>
              </div>
              <p class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ translate('testsQuizzes') }}</p>
              <h3 class="text-xl md:text-2xl font-black text-slate-950 tracking-tighter mt-1">{{ testsEffectues.length + quizRealises.length }}</h3>
            </div>
          </div>

          <!-- Blocs orientation et progression -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer" @click="$router.push('/orientation/test-qi')">
              <div class="flex items-center justify-between mb-4">
                <i class="fas fa-chart-line text-4xl"></i>
                <i class="fas fa-arrow-right text-xl opacity-75"></i>
              </div>
              <h3 class="text-xl font-bold">Bilan d'orientation</h3>
              <p class="text-indigo-100 text-sm mt-2">Tests QI, personnalité et métiers</p>
              <div class="mt-4 flex items-center gap-2">
                <span class="text-xs bg-white/20 px-2 py-1 rounded-full">Découvrir →</span>
              </div>
            </div>
            
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-gray-800">Progression globale</h3>
                <i class="fas fa-chart-line text-slate-400"></i>
              </div>
              <div class="flex items-center gap-4">
                <div class="relative w-20 h-20">
                  <svg class="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="35" stroke="#E5E7EB" stroke-width="6" fill="none"/>
                    <circle cx="40" cy="40" r="35" stroke="#4F46E5" stroke-width="6" fill="none" stroke-dasharray="219.9" :stroke-dashoffset="219.9 * (1 - globalProgress / 100)"/>
                  </svg>
                  <span class="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary">{{ globalProgress }}%</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Taux de complétion des cours</p>
                  <div class="w-full bg-gray-100 rounded-full h-2 mt-2">
                    <div class="bg-primary h-2 rounded-full" :style="{ width: globalProgress + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Graphiques -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
              <div class="flex justify-between items-center mb-4 md:mb-6">
                <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950">{{ translate('progressBySubject') }}</h3>
                <i class="fas fa-chart-line text-slate-400 text-sm md:text-base"></i>
              </div>
              <canvas ref="progressChartCanvas" height="200" class="w-full"></canvas>
            </div>
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-slate-100 shadow-sm">
              <div class="flex justify-between items-center mb-4 md:mb-6">
                <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950">{{ translate('testPerformance') }}</h3>
                <i class="fas fa-chart-bar text-slate-400 text-sm md:text-base"></i>
              </div>
              <canvas ref="performanceChartCanvas" height="200" class="w-full"></canvas>
            </div>
          </div>
          
          <!-- Dernières épreuves téléchargées -->
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm mb-4 md:mb-8 overflow-hidden">
            <div class="p-3 md:p-6 flex justify-between items-center border-b border-slate-50 flex-wrap gap-2">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-950"><i class="fas fa-download mr-2"></i> {{ translate('recentDownloads') }}</h3>
              <button @click="activeTab = 'epreuves'" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">{{ translate('seeAll') }}</button>
            </div>
            <div v-if="epreuvesTelechargees.length === 0" class="text-center text-gray-500 py-8 md:py-12">
              <i class="fas fa-download text-4xl md:text-5xl mb-3 text-slate-300"></i>
              <p class="text-sm">{{ translate('noExams') }}</p>
            </div>
            <div class="divide-y divide-slate-50" v-else>
              <div v-for="epreuve in epreuvesTelechargees.slice(0,5)" :key="epreuve.id" class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 md:p-5 hover:bg-blue-50/30 transition-all cursor-pointer">
                <div class="flex items-center gap-3 md:gap-4">
                  <i class="fas fa-file-pdf text-red-500 text-xl md:text-2xl"></i>
                  <div>
                    <p class="font-bold text-sm md:text-base text-slate-800">{{ epreuve.examen }} - {{ epreuve.annee }}</p>
                    <p class="text-xs text-slate-500">{{ epreuve.matiere }} • {{ translate('downloadedOn') }} {{ epreuve.dateTelechargement }}</p>
                  </div>
                </div>
                <button @click="ouvrirEpreuve(epreuve)" class="px-3 md:px-4 py-1.5 md:py-2 gradient-bg text-white rounded-lg text-[10px] md:text-[11px] font-black uppercase tracking-widest">{{ translate('open') }}</button>
              </div>
            </div>
          </div>
          
          <!-- Prochains concours -->
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div class="p-3 md:p-6 flex justify-between items-center border-b border-slate-50 flex-wrap gap-2">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-slate-950"><i class="fas fa-trophy mr-2"></i> {{ translate('upcomingContests') }}</h3>
              <button @click="activeTab = 'concours'" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">{{ translate('seeAll') }}</button>
            </div>
            <div v-if="inscriptionsConcours.length === 0" class="text-center text-gray-500 py-8 md:py-12">
              <i class="fas fa-trophy text-4xl md:text-5xl mb-3 text-slate-300"></i>
              <p class="text-sm">{{ translate('noContests') }}</p>
            </div>
            <div class="divide-y divide-slate-50" v-else>
              <div v-for="concours in inscriptionsConcours" :key="concours.id" class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 md:p-5 hover:bg-blue-50/30 transition-all cursor-pointer">
                <div class="flex items-center gap-3 md:gap-4">
                  <i :class="concours.icon || 'fas fa-gavel'" class="text-primary text-xl md:text-2xl"></i>
                  <div>
                    <p class="font-bold text-sm md:text-base text-slate-800">{{ concours.nom }}</p>
                    <p class="text-xs text-slate-500">{{ translate('registeredOn') }} {{ concours.dateInscription }}</p>
                  </div>
                </div>
                <button @click="openContenuConcours(concours)" class="px-3 md:px-4 py-1.5 md:py-2 gradient-bg text-white rounded-lg text-[10px] md:text-[11px] font-black uppercase tracking-widest">{{ translate('prepare') }}</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE ÉPREUVES ==================== -->
        <div v-if="activeTab === 'epreuves'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-download mr-2"></i> {{ translate('myExams') }}</p>
            <span class="text-xs md:text-sm text-slate-500">{{ epreuvesTelechargees.length }} {{ translate('exams') }}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="epreuve in epreuvesTelechargees" :key="epreuve.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition">
              <i class="fas fa-file-pdf text-red-500 text-2xl md:text-3xl mb-2 md:mb-3"></i>
              <h3 class="font-bold text-base md:text-lg">{{ epreuve.examen }} - {{ epreuve.annee }}</h3>
              <p class="text-sm text-slate-500">{{ epreuve.matiere }}</p>
              <p class="text-xs text-slate-400 mt-2">{{ translate('downloadedOn') }} {{ epreuve.dateTelechargement }}</p>
              <button @click="ouvrirEpreuve(epreuve)" class="mt-3 md:mt-4 w-full py-1.5 md:py-2 gradient-bg text-white rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest"><i class="fas fa-file-pdf mr-1"></i> {{ translate('open') }}</button>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE CONCOURS ==================== -->
        <div v-if="activeTab === 'concours'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-trophy mr-2"></i> {{ translate('myContests') }}</p>
            <button class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">
              <i class="fas fa-plus mr-1"></i> Nouveau concours
            </button>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div v-for="concours in inscriptionsConcours" :key="concours.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition">
              <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <i :class="concours.icon || 'fas fa-gavel'" class="text-primary text-xl md:text-2xl"></i>
                <h3 class="font-bold text-base md:text-lg">{{ concours.nom }}</h3>
              </div>
              <p class="text-sm text-slate-500">{{ translate('registeredOn') }} {{ concours.dateInscription }}</p>
              <div class="mt-3">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-slate-500">Progression</span>
                  <span class="font-bold text-primary">{{ concours.progression || 0 }}%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5">
                  <div class="bg-primary h-1.5 rounded-full" :style="{ width: (concours.progression || 0) + '%' }"></div>
                </div>
              </div>
              <button @click="openContenuConcours(concours)" class="mt-3 md:mt-4 w-full py-1.5 md:py-2 gradient-bg text-white rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                <i class="fas fa-book-open mr-1"></i> {{ translate('prepare') }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE FORMATIONS ==================== -->
        <div v-if="activeTab === 'formations'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-graduation-cap mr-2"></i> {{ translate('myTrainings') }}</p>
            <span class="text-xs md:text-sm text-slate-500">{{ formationsInscrites.length }} {{ translate('trainings') }}</span>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div v-for="formation in formationsInscrites" :key="formation.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6 hover:shadow-md transition">
              <h3 class="font-bold text-base md:text-lg">{{ formation.titre }}</h3>
              <div class="mt-2 md:mt-3">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-slate-500">{{ translate('progress') }}</span>
                  <span class="font-bold text-primary">{{ formation.progression || 0 }}%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5 md:h-2">
                  <div class="bg-primary h-1.5 md:h-2 rounded-full" :style="{ width: (formation.progression || 0) + '%' }"></div>
                </div>
              </div>
              <button class="mt-3 md:mt-4 w-full py-1.5 md:py-2 gradient-bg text-white rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest"><i class="fas fa-play mr-1"></i> {{ translate('continue') }}</button>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE PROGRESSION ==================== -->
        <div v-if="activeTab === 'progression'" class="p-3 md:p-8">
          <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950 mb-4 md:mb-6"><i class="fas fa-chart-line mr-2"></i> {{ translate('myProgress') }}</p>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-3 md:mb-4">{{ translate('generalStats') }}</h3>
              <div class="space-y-3 md:space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-slate-600 text-sm md:text-base">{{ translate('globalProgress') }}</span>
                  <span class="text-xl md:text-2xl font-black text-primary">{{ globalProgress }}%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-2 md:h-3">
                  <div class="bg-primary h-2 md:h-3 rounded-full" :style="{ width: globalProgress + '%' }"></div>
                </div>
                <div class="flex justify-between pt-3 md:pt-4 flex-wrap gap-2">
                  <div><p class="text-xs text-slate-400">{{ translate('completedTests') }}</p><p class="text-lg md:text-xl font-bold text-slate-800">{{ testsEffectues.length }}</p></div>
                  <div><p class="text-xs text-slate-400">{{ translate('completedQuizzes') }}</p><p class="text-lg md:text-xl font-bold text-slate-800">{{ quizRealises.length }}</p></div>
                  <div><p class="text-xs text-slate-400">{{ translate('averageScore') }}</p><p class="text-lg md:text-xl font-bold text-primary">{{ averageScore }}%</p></div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8">
              <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-slate-950 mb-3 md:mb-4"><i class="fas fa-bullseye mr-1"></i> {{ translate('pointsToImprove') }}</h3>
              <ul class="space-y-2 md:space-y-3">
                <li class="flex items-center gap-2 md:gap-3 text-sm md:text-base"><i class="fas fa-chart-line text-orange-500"></i><span>{{ translate('mathLevel') }}</span></li>
                <li class="flex items-center gap-2 md:gap-3 text-sm md:text-base"><i class="fas fa-book text-orange-500"></i><span>{{ translate('frenchWriting') }}</span></li>
                <li class="flex items-center gap-2 md:gap-3 text-sm md:text-base"><i class="fas fa-language text-orange-500"></i><span>{{ translate('englishListening') }}</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE TESTS ==================== -->
        <div v-if="activeTab === 'tests'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-certificate mr-2"></i> {{ translate('myTests') }}</p>
            <span class="text-xs md:text-sm text-slate-500">{{ testsEffectues.length + quizRealises.length }} {{ translate('achievements') }}</span>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div v-for="test in testsEffectues" :key="test.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6">
              <div class="flex justify-between items-start mb-2 md:mb-3 flex-wrap gap-2">
                <h3 class="font-bold text-base md:text-lg">{{ test.titre }}</h3>
                <span :class="test.score >= 70 ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'" class="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-bold">{{ test.score }}%</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-1.5 md:h-2 mb-2 md:mb-3">
                <div class="bg-primary h-1.5 md:h-2 rounded-full" :style="{ width: test.score + '%' }"></div>
              </div>
              <p class="text-xs text-slate-400">{{ translate('completedOn') }} {{ test.date }}</p>
            </div>
            <div v-for="quiz in quizRealises" :key="quiz.id" class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6">
              <div class="flex justify-between items-start mb-2 md:mb-3 flex-wrap gap-2">
                <h3 class="font-bold text-base md:text-lg">{{ quiz.titre }}</h3>
                <span :class="quiz.score >= 70 ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'" class="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-bold">{{ quiz.score }}%</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-1.5 md:h-2 mb-2 md:mb-3">
                <div class="bg-primary h-1.5 md:h-2 rounded-full" :style="{ width: quiz.score + '%' }"></div>
              </div>
              <p class="text-xs text-slate-400">{{ translate('completedOn') }} {{ quiz.date }}</p>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE ORIENTATION ==================== -->
        <div v-if="activeTab === 'orientation'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-chart-line mr-2"></i> Bilan d'orientation</p>
            <span class="text-xs md:text-sm text-slate-500">Découvrez votre profil</span>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer" @click="$router.push('/orientation/test-qi')">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <i class="fas fa-brain text-blue-600 text-xl"></i>
              </div>
              <h3 class="font-bold text-lg">Test QI</h3>
              <p class="text-sm text-gray-500 mt-1">Évaluez vos capacités cognitives</p>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-400">20 questions • 30 min</span>
                <i class="fas fa-arrow-right text-primary"></i>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer" @click="$router.push('/orientation/test-disc')">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <i class="fas fa-chart-pie text-purple-600 text-xl"></i>
              </div>
              <h3 class="font-bold text-lg">Test DISC</h3>
              <p class="text-sm text-gray-500 mt-1">Découvrez votre personnalité</p>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-400">12 questions • 15 min</span>
                <i class="fas fa-arrow-right text-primary"></i>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition cursor-pointer" @click="$router.push('/orientation/test-riasec')">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <i class="fas fa-chart-bar text-green-600 text-xl"></i>
              </div>
              <h3 class="font-bold text-lg">Test RIASEC</h3>
              <p class="text-sm text-gray-500 mt-1">Identifiez vos intérêts professionnels</p>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-xs text-gray-400">30 questions • 20 min</span>
                <i class="fas fa-arrow-right text-primary"></i>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="font-bold text-lg mb-4"><i class="fas fa-chart-line text-primary mr-2"></i> Statut de votre bilan</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div :class="orientationCompleted.qi ? 'bg-green-100' : 'bg-gray-100'" class="w-10 h-10 rounded-full flex items-center justify-center">
                    <i :class="orientationCompleted.qi ? 'fas fa-check-circle text-green-600' : 'fas fa-circle text-gray-400'"></i>
                  </div>
                  <div>
                    <p class="font-medium">Test QI</p>
                    <p class="text-xs text-gray-500">{{ orientationCompleted.qi ? 'Complété' : 'Non commencé' }}</p>
                  </div>
                </div>
                <div class="text-primary text-sm font-medium cursor-pointer" @click="$router.push('/orientation/test-qi')">{{ orientationCompleted.qi ? 'Revoir' : 'Commencer' }} →</div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div :class="orientationCompleted.disc ? 'bg-green-100' : 'bg-gray-100'" class="w-10 h-10 rounded-full flex items-center justify-center">
                    <i :class="orientationCompleted.disc ? 'fas fa-check-circle text-green-600' : 'fas fa-circle text-gray-400'"></i>
                  </div>
                  <div>
                    <p class="font-medium">Test DISC</p>
                    <p class="text-xs text-gray-500">{{ orientationCompleted.disc ? 'Complété' : 'Non commencé' }}</p>
                  </div>
                </div>
                <div class="text-primary text-sm font-medium cursor-pointer" @click="$router.push('/orientation/test-disc')">{{ orientationCompleted.disc ? 'Revoir' : 'Commencer' }} →</div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div :class="orientationCompleted.riasec ? 'bg-green-100' : 'bg-gray-100'" class="w-10 h-10 rounded-full flex items-center justify-center">
                    <i :class="orientationCompleted.riasec ? 'fas fa-check-circle text-green-600' : 'fas fa-circle text-gray-400'"></i>
                  </div>
                  <div>
                    <p class="font-medium">Test RIASEC</p>
                    <p class="text-xs text-gray-500">{{ orientationCompleted.riasec ? 'Complété' : 'Non commencé' }}</p>
                  </div>
                </div>
                <div class="text-primary text-sm font-medium cursor-pointer" @click="$router.push('/orientation/test-riasec')">{{ orientationCompleted.riasec ? 'Revoir' : 'Commencer' }} →</div>
              </div>
            </div>
            
            <div v-if="orientationCompleted.all" class="mt-6 p-4 bg-green-50 rounded-xl">
              <div class="flex items-center gap-3">
                <i class="fas fa-trophy text-green-600 text-2xl"></i>
                <div>
                  <p class="font-bold text-green-800">Bilan complet !</p>
                  <p class="text-sm text-green-600">Vos résultats sont prêts à être consultés.</p>
                </div>
                <div class="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold cursor-pointer" @click="$router.push('/orientation/resultats')">
                  Voir mes résultats →
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE E-LEARNING ==================== -->
        <div v-if="activeTab === 'e-learning'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950">
                <i class="fas fa-graduation-cap mr-2 text-primary"></i> E-learning
              </p>
              <p class="text-sm text-gray-500 mt-1">Formations en ligne, certifications et suivi de progression</p>
            </div>
            <div class="relative cursor-pointer" @click="$router.push('/e-learning/panier')">
              <i class="fas fa-shopping-cart text-2xl text-gray-600 hover:text-primary transition"></i>
              <span v-if="cartCount > 0" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{{ cartCount }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div @click="openElearningTab = 'mes-formations'" :class="['p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md', openElearningTab === 'mes-formations' ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200']">
              <i class="fas fa-book-open text-primary text-2xl mb-2"></i>
              <h3 class="font-bold text-gray-800">Mes formations</h3>
              <p class="text-xs text-gray-500 mt-1">{{ formationsAchetees.length }} formation(s) achetée(s)</p>
            </div>
            <div @click="openElearningTab = 'catalogue'" :class="['p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md', openElearningTab === 'catalogue' ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200']">
              <i class="fas fa-search text-primary text-2xl mb-2"></i>
              <h3 class="font-bold text-gray-800">Catalogue</h3>
              <p class="text-xs text-gray-500 mt-1">Découvrir les formations disponibles</p>
            </div>
            <div @click="openElearningTab = 'certificats'" :class="['p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md', openElearningTab === 'certificats' ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200']">
              <i class="fas fa-certificate text-primary text-2xl mb-2"></i>
              <h3 class="font-bold text-gray-800">Mes certificats</h3>
              <p class="text-xs text-gray-500 mt-1">{{ certificatsObtenus.length }} certificat(s) obtenu(s)</p>
            </div>
            <div @click="openElearningTab = 'historique'" :class="['p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md', openElearningTab === 'historique' ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200']">
              <i class="fas fa-history text-primary text-2xl mb-2"></i>
              <h3 class="font-bold text-gray-800">Historique</h3>
              <p class="text-xs text-gray-500 mt-1">Suivi de mes achats</p>
            </div>
          </div>

          <div v-if="openElearningTab === 'mes-formations'">
            <div v-if="formationsAchetees.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-sm">
              <i class="fas fa-book-open text-5xl text-gray-300 mb-4"></i>
              <p class="text-gray-500">Vous n'avez pas encore acheté de formation</p>
              <button @click="openElearningTab = 'catalogue'" class="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-bold">Explorer le catalogue</button>
            </div>
            <div v-else class="grid md:grid-cols-2 gap-6">
              <div v-for="formation in formationsAchetees" :key="formation.id" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div class="relative h-48 overflow-hidden">
                  <img :src="formation.image" class="w-full h-full object-cover" alt="formation">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div class="absolute bottom-4 left-4">
                    <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">{{ formation.categorie }}</span>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-xl font-bold text-gray-800">{{ formation.titre }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ formation.formateur }} • {{ formation.duree }}</p>
                  
                  <div class="mt-4">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-500">Progression</span>
                      <span class="text-primary font-bold">{{ formation.progression }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-primary h-2 rounded-full transition-all" :style="{ width: formation.progression + '%' }"></div>
                    </div>
                  </div>
                  
                  <button @click="continuerFormation(formation)" class="mt-4 w-full py-2 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition">
                    <i class="fas fa-play mr-2"></i> Continuer la formation
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="openElearningTab === 'catalogue'">
            <div class="bg-white rounded-2xl shadow-sm p-4 mb-6">
              <div class="flex flex-wrap gap-3">
                <select v-model="filtreCategorie" class="px-4 py-2 rounded-xl border border-gray-200 text-sm">
                  <option value="all">Toutes catégories</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Développement Web">Développement Web</option>
                  <option value="Marketing Digital">Marketing Digital</option>
                  <option value="Design">Design</option>
                </select>
                <select v-model="filtreNiveau" class="px-4 py-2 rounded-xl border border-gray-200 text-sm">
                  <option value="all">Tous niveaux</option>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
                <div class="flex-1">
                  <input type="text" v-model="searchCatalogue" placeholder="Rechercher une formation..." class="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm">
                </div>
              </div>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="formation in formationsFiltrees" :key="formation.id" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div class="relative h-48 overflow-hidden">
                  <img :src="formation.image" class="w-full h-full object-cover" alt="formation">
                  <div class="absolute top-2 right-2">
                    <span class="bg-primary text-white text-xs px-2 py-1 rounded-full">{{ formation.categorie }}</span>
                  </div>
                </div>
                <div class="p-5">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs text-gray-500">{{ formation.niveau }}</span>
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-yellow-400 text-sm"></i>
                      <span class="text-sm font-semibold">{{ formation.note }}</span>
                    </div>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800">{{ formation.titre }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ formation.formateur }}</p>
                  <p class="text-sm text-gray-600 mt-2 line-clamp-2">{{ formation.description }}</p>
                  <div class="flex items-center justify-between mt-4">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-clock text-gray-400 text-sm"></i>
                      <span class="text-sm text-gray-500">{{ formation.duree }}</span>
                    </div>
                    <p class="text-xl font-bold text-primary">{{ formatPrice(formation.prix) }} FCFA</p>
                  </div>
                  
                  <button v-if="estAchetee(formation.id)" @click="continuerFormation(formation)" class="mt-4 w-full py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition">
                    <i class="fas fa-play mr-2"></i> Continuer
                  </button>
                  <button v-else @click="ajouterAuPanier(formation)" class="mt-4 w-full py-2 bg-primary text-white rounded-xl font-bold hover:bg-indigo-700 transition">
                    <i class="fas fa-shopping-cart mr-2"></i> Ajouter au panier - {{ formatPrice(formation.prix) }} FCFA
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="openElearningTab === 'certificats'">
            <div v-if="certificatsObtenus.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-sm">
              <i class="fas fa-certificate text-5xl text-gray-300 mb-4"></i>
              <p class="text-gray-500">Vous n'avez pas encore de certificat</p>
              <p class="text-sm text-gray-400 mt-1">Complétez une formation à 100% pour obtenir votre certificat</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="certificat in certificatsObtenus" :key="certificat.id" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div class="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-center">
                  <i class="fas fa-certificate text-white text-5xl mb-3"></i>
                  <h3 class="text-white font-bold text-lg">{{ certificat.titreFormation }}</h3>
                </div>
                <div class="p-5">
                  <p class="text-gray-600 text-sm">Délivré à : <strong>{{ userName }}</strong></p>
                  <p class="text-gray-600 text-sm mt-1">Date d'obtention : {{ certificat.date }}</p>
                  <p class="text-gray-600 text-sm">Score : <strong class="text-primary">{{ certificat.score }}%</strong></p>
                  <div class="flex gap-2 mt-4">
                    <button @click="telechargerCertificat(certificat)" class="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition">
                      <i class="fas fa-download mr-1"></i> Télécharger PDF
                    </button>
                    <button @click="partagerCertificat(certificat)" class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
                      <i class="fas fa-share-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="openElearningTab === 'historique'">
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b">
                    <tr class="text-left">
                      <th class="p-4 text-sm font-bold text-gray-500">Date</th>
                      <th class="p-4 text-sm font-bold text-gray-500">Formation</th>
                      <th class="p-4 text-sm font-bold text-gray-500">Montant</th>
                      <th class="p-4 text-sm font-bold text-gray-500">Statut</th>
                      <th class="p-4 text-sm font-bold text-gray-500">Référence</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    <tr v-for="transaction in historiqueTransactions" :key="transaction.id" class="hover:bg-gray-50 transition">
                      <td class="p-4 text-sm">{{ transaction.date }}</td>
                      <td class="p-4 text-sm font-medium">{{ transaction.formation }}</td>
                      <td class="p-4 text-sm text-primary font-bold">{{ formatPrice(transaction.montant) }} FCFA</td>
                      <td class="p-4">
                        <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Payé</span>
                      </td>
                      <td class="p-4 text-sm text-gray-500">{{ transaction.reference }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE MOBILITÉ INTERNATIONALE ==================== -->
        <div v-if="activeTab === 'mobilite'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950">
                <i class="fas fa-globe mr-2 text-primary"></i> Mobilité internationale
              </p>
              <p class="text-sm text-gray-500 mt-1">Étudier à l'étranger, bourses et accompagnement</p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group cursor-pointer" @click="$router.push('/mobilite/pays')">
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-globe text-primary text-2xl group-hover:text-white"></i>
                </div>
                <i class="fas fa-arrow-right text-gray-400 group-hover:text-primary"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Destinations</h3>
              <p class="text-gray-500 text-sm mt-2">Découvrez les pays et universités partenaires</p>
            </div>
            
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group cursor-pointer" @click="$router.push('/mobilite/bourses')">
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-graduation-cap text-green-600 text-2xl group-hover:text-white"></i>
                </div>
                <i class="fas fa-arrow-right text-gray-400 group-hover:text-primary"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Bourses</h3>
              <p class="text-gray-500 text-sm mt-2">Financez vos études à l'étranger</p>
            </div>
            
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group cursor-pointer" @click="$router.push('/mobilite/dossier')">
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-folder-open text-purple-600 text-2xl group-hover:text-white"></i>
                </div>
                <i class="fas fa-arrow-right text-gray-400 group-hover:text-primary"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Mon dossier</h3>
              <p class="text-gray-500 text-sm mt-2">Préparez votre dossier de candidature</p>
            </div>
            
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group cursor-pointer" @click="$router.push('/mobilite/suivi')">
              <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-primary transition">
                  <i class="fas fa-chart-line text-orange-600 text-2xl group-hover:text-white"></i>
                </div>
                <i class="fas fa-arrow-right text-gray-400 group-hover:text-primary"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800">Suivi</h3>
              <p class="text-gray-500 text-sm mt-2">Suivez l'avancement de vos candidatures</p>
            </div>
          </div>
        </div>
        
        <!-- ==================== MUR DES ERREURS ==================== -->
        <div v-if="activeTab === 'errorWall'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-exclamation-triangle mr-2"></i> Mur des erreurs</p>
            <span class="text-xs md:text-sm text-slate-500">{{ errorList.length }} erreurs à corriger</span>
          </div>
          
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6">
            <div class="mb-6">
              <div class="bg-red-50 rounded-xl p-4 border border-red-100">
                <div class="flex items-center gap-3 mb-2">
                  <i class="fas fa-chart-line text-red-500 text-xl"></i>
                  <span class="font-bold text-slate-950">Statistiques des erreurs</span>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <div>
                    <p class="text-xs text-slate-500">Total erreurs</p>
                    <p class="text-2xl font-bold text-red-600">{{ errorList.length }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500">Matière la plus difficile</p>
                    <p class="text-lg font-bold text-slate-950">{{ topErrorSubject }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500">Taux de réussite moyen</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ averageSuccessRate }}%</p>
                  </div>
                  <div>
                    <p class="text-xs text-slate-500">Questions à revoir</p>
                    <p class="text-2xl font-bold text-orange-600">{{ uniqueErrorCount }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="errorList.length === 0" class="text-center py-8">
              <i class="fas fa-check-circle text-5xl text-emerald-500 mb-3"></i>
              <p class="text-slate-500">Bravo ! Vous n'avez aucune erreur enregistrée.</p>
              <p class="text-sm text-slate-400 mt-1">Continuez à vous entraîner pour maintenir ce niveau.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="(error, idx) in errorList" :key="error.id" class="border border-slate-100 rounded-xl p-4 hover:shadow-md transition">
                <div class="flex justify-between items-start flex-wrap gap-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">{{ idx + 1 }}</span>
                    <span class="font-bold text-slate-950">{{ error.question }}</span>
                  </div>
                  <span :class="error.difficulte === 'Facile' ? 'bg-green-100 text-green-700' : error.difficulte === 'Moyen' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded-full text-xs font-bold">
                    {{ error.difficulte }}
                  </span>
                </div>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="text-slate-500">Votre réponse :</p>
                    <p class="text-red-600 font-medium">{{ error.userAnswer }}</p>
                  </div>
                  <div>
                    <p class="text-slate-500">Bonne réponse :</p>
                    <p class="text-emerald-600 font-medium">{{ error.correctAnswer }}</p>
                  </div>
                </div>
                <div class="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p class="text-xs text-slate-600"><i class="fas fa-lightbulb text-yellow-500 mr-1"></i> Explication :</p>
                  <p class="text-sm text-slate-700">{{ error.explanation }}</p>
                </div>
                <div class="mt-3 flex gap-2">
                  <button @click="retryQuestion(error)" class="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition">
                    <i class="fas fa-redo-alt mr-1"></i> Refaire la question
                  </button>
                  <button @click="addToRevision(error)" class="px-4 py-1.5 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary/10 transition">
                    <i class="fas fa-bookmark mr-1"></i> Ajouter à ma révision
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="errorList.length > 0" class="mt-6 flex justify-center">
              <button @click="retryAllErrors" class="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-sm">
                <i class="fas fa-play mr-2"></i> Refaire toutes mes erreurs ({{ errorList.length }} questions)
              </button>
            </div>
          </div>
        </div>
        
        <!-- ==================== PRISE DE NOTES ==================== -->
        <div v-if="activeTab === 'notes'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-pen mr-2"></i> Mes notes</p>
            <button @click="createNewNote" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition">
              <i class="fas fa-plus mr-1"></i> Nouvelle note
            </button>
          </div>
          
          <div class="grid lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4">
              <div class="mb-4">
                <div class="relative">
                  <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                  <input type="text" v-model="noteSearch" placeholder="Rechercher une note..." class="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary">
                </div>
              </div>
              <div class="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
                <div v-for="note in filteredNotes" :key="note.id" @click="selectedNote = note" :class="['p-3 rounded-xl cursor-pointer transition-all', selectedNote?.id === note.id ? 'bg-gradient-to-r from-indigo-50 to-cyan-50 border-l-4 border-primary' : 'hover:bg-slate-50']">
                  <p class="font-bold text-slate-950 text-sm truncate">{{ note.title }}</p>
                  <p class="text-xs text-slate-400 mt-1">{{ note.concoursNom }} • {{ note.date }}</p>
                  <p class="text-xs text-slate-500 mt-1 line-clamp-2">{{ note.content.substring(0, 80) }}...</p>
                </div>
              </div>
            </div>
            
            <div class="lg:col-span-2 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-6">
              <div v-if="selectedNote" class="space-y-4">
                <input type="text" v-model="selectedNote.title" class="w-full text-xl font-bold border-b border-slate-200 px-2 py-1 focus:outline-none focus:border-primary">
                <div class="flex gap-2 text-sm text-slate-500">
                  <span><i class="fas fa-folder-open mr-1"></i> {{ selectedNote.concoursNom }}</span>
                  <span><i class="far fa-calendar mr-1"></i> {{ selectedNote.date }}</span>
                </div>
                <textarea v-model="selectedNote.content" rows="15" class="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" placeholder="Écrivez votre note ici..."></textarea>
                <div class="flex justify-end gap-2">
                  <button @click="deleteNote(selectedNote.id)" class="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-bold hover:bg-red-50 transition">
                    <i class="fas fa-trash mr-1"></i> Supprimer
                  </button>
                  <button @click="saveNote" class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition">
                    <i class="fas fa-save mr-1"></i> Sauvegarder
                  </button>
                </div>
              </div>
              <div v-else class="flex flex-col items-center justify-center py-12 text-slate-400">
                <i class="fas fa-pen-alt text-5xl mb-4"></i>
                <p>Sélectionnez une note ou créez-en une nouvelle</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ==================== CALENDRIER DE RÉVISION ==================== -->
        <div v-if="activeTab === 'calendar'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-calendar-alt mr-2"></i> Calendrier de révision</p>
            <button @click="openAddEventModal" class="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:shadow-lg transition">
              <i class="fas fa-plus mr-1"></i> Ajouter un événement
            </button>
          </div>
          
          <div class="grid lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4">
              <div class="mb-4 flex justify-between items-center">
                <button @click="previousMonth" class="p-2 hover:bg-slate-100 rounded-lg transition"><i class="fas fa-chevron-left"></i></button>
                <span class="text-lg font-bold text-slate-950">{{ currentMonthName }} {{ currentYear }}</span>
                <button @click="nextMonth" class="p-2 hover:bg-slate-100 rounded-lg transition"><i class="fas fa-chevron-right"></i></button>
              </div>
              <div class="grid grid-cols-7 gap-1 text-center mb-2">
                <div v-for="day in weekDays" :key="day" class="text-xs font-bold text-slate-400 py-2">{{ day }}</div>
              </div>
              <div class="grid grid-cols-7 gap-1">
                <div v-for="day in calendarDays" :key="day.date" @click="selectDay(day)" :class="[
                  'min-h-[80px] p-1 border rounded-lg cursor-pointer transition-all',
                  day.isCurrentMonth ? 'bg-white' : 'bg-slate-50 text-slate-400',
                  selectedDate === day.date ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200 hover:border-primary',
                  day.hasEvent ? 'bg-indigo-50' : ''
                ]">
                  <span class="text-sm font-medium">{{ day.dayNumber }}</span>
                  <div class="mt-1 space-y-1">
                    <div v-for="event in getDayEvents(day.date)" :key="event.id" class="text-[10px] p-0.5 rounded bg-primary/10 text-primary truncate" :title="event.title">
                      {{ event.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4">
              <h3 class="font-bold text-slate-950 mb-3">Événements à venir</h3>
              <div class="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
                <div v-for="event in upcomingEventsList" :key="event.id" class="p-3 bg-slate-50 rounded-xl">
                  <div class="flex items-start gap-2">
                    <div :class="event.type === 'cours' ? 'bg-blue-100 text-blue-600' : event.type === 'quiz' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'" class="w-8 h-8 rounded-lg flex items-center justify-center">
                      <i :class="event.type === 'cours' ? 'fas fa-video' : event.type === 'quiz' ? 'fas fa-question-circle' : 'fas fa-trophy'"></i>
                    </div>
                    <div class="flex-1">
                      <p class="font-bold text-sm text-slate-950">{{ event.title }}</p>
                      <p class="text-xs text-slate-500">{{ formatEventDate(event.date) }} • {{ event.time || 'Toute la journée' }}</p>
                      <p class="text-xs text-slate-600 mt-1">{{ event.description }}</p>
                    </div>
                    <button @click="deleteEvent(event.id)" class="text-slate-400 hover:text-red-500 transition">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div v-if="upcomingEventsList.length === 0" class="text-center text-slate-400 py-8">
                  <i class="fas fa-calendar-week text-3xl mb-2"></i>
                  <p class="text-sm">Aucun événement planifié</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ==================== VUE PROFIL ==================== -->
        <div v-if="activeTab === 'profil'" class="p-3 md:p-8">
          <div class="flex justify-between items-center mb-4 md:mb-6 flex-wrap gap-2">
            <p class="text-xl md:text-2xl font-black tracking-tighter text-slate-950"><i class="fas fa-user mr-2"></i> {{ translate('myProfile') }}</p>
            <button @click="openEditProfileModal" class="px-4 md:px-6 py-2 md:py-3 bg-slate-950 text-white rounded-[20px] text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md">{{ translate('edit') }}</button>
          </div>
          <div class="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm p-4 md:p-8">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 md:mb-8">
              <div class="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold">{{ userInitials }}</div>
              <div class="text-center sm:text-left">
                <h3 class="text-xl md:text-2xl font-bold text-slate-950">{{ userName }}</h3>
                <p class="text-slate-500 text-sm md:text-base">{{ userEmail }}</p>
                <p class="text-xs text-slate-400 mt-1">{{ translate('memberSince') }} {{ memberSince }}</p>
              </div>
            </div>
            
            <div class="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
              <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-3">
                  <i class="fas fa-chart-line text-primary text-2xl"></i>
                  <div>
                    <p class="font-bold text-gray-800">Bilan d'orientation</p>
                    <p class="text-sm text-gray-600">Découvrez votre profil et les métiers qui vous correspondent</p>
                  </div>
                </div>
                <div v-if="orientationCompleted.all" class="flex items-center gap-3">
                  <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Complété</span>
                  <div class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold cursor-pointer" @click="$router.push('/orientation/resultats')">
                    Voir résultats →
                  </div>
                </div>
                <div v-else class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold cursor-pointer" @click="$router.push('/orientation/test-qi')">
                  Commencer le bilan →
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div class="space-y-3 md:space-y-4">
                <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ translate('fullName') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userName }}</p></div>
                <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ translate('email') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userEmail }}</p></div>
                <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ translate('phone') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userPhone || translate('notProvided') }}</p></div>
              </div>
              <div class="space-y-3 md:space-y-4">
                <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ translate('educationLevel') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userLevel || translate('notProvided') }}</p></div>
                <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ translate('city') }}</label><p class="text-sm md:text-base text-slate-800 font-medium mt-1">{{ userCity || 'Yaoundé' }}</p></div>
                <div><label class="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ translate('status') }}</label><p class="text-emerald-600 font-medium mt-1"><i class="fas fa-circle text-[6px] mr-1"></i> {{ translate('active') }}</p></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ==================== MODALES ==================== -->
        
        <!-- MODALE MESSAGES -->
        <div v-if="messagesModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeMessagesModal">
          <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-envelope text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">{{ translate('messages') }}</h2>
              </div>
              <button @click="closeMessagesModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
            </div>
            <div class="flex flex-1 overflow-hidden">
              <div class="w-1/3 border-r border-slate-100 overflow-y-auto custom-scrollbar">
                <div v-for="conv in conversations" :key="conv.id" @click="selectedConversation = conv" :class="['p-4 cursor-pointer transition-all duration-200', selectedConversation?.id === conv.id ? 'bg-gradient-to-r from-indigo-50 to-cyan-50 border-r-4 border-primary' : 'hover:bg-slate-50']">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">{{ conv.initials }}</div>
                    <div class="flex-1 min-w-0">
                      <div class="flex justify-between items-center">
                        <p class="font-bold text-sm text-slate-950 truncate">{{ conv.name }}</p>
                        <span class="text-[10px] text-slate-400">{{ conv.time }}</span>
                      </div>
                      <p class="text-xs text-slate-500 truncate">{{ conv.lastMessage }}</p>
                    </div>
                    <span v-if="conv.unread" class="w-2.5 h-2.5 bg-red-500 rounded-full shadow-md"></span>
                  </div>
                </div>
              </div>
              <div class="flex-1 flex flex-col">
                <div v-if="selectedConversation" class="flex-1 flex flex-col">
                  <div class="p-4 border-b border-slate-100 bg-slate-50">
                    <p class="font-bold text-slate-950">{{ selectedConversation.name }}</p>
                  </div>
                  <div ref="chatMessagesContainer" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    <div v-for="msg in selectedConversation.messages" :key="msg.id" :class="['flex', msg.sender === 'me' ? 'justify-end' : 'justify-start']">
                      <div :class="['max-w-[70%] p-3 rounded-2xl text-sm', msg.sender === 'me' ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md' : 'bg-slate-100 text-slate-800']">
                        <p>{{ msg.text }}</p>
                        <p class="text-[10px] opacity-70 mt-1">{{ msg.time }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 border-t border-slate-100 flex gap-2 bg-white">
                    <input type="text" v-model="replyMessage" @keyup.enter="sendReply" :placeholder="translate('writeReply')" class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-950 text-sm focus:outline-none focus:border-primary transition">
                    <button @click="sendReply" class="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition"><i class="fas fa-paper-plane"></i></button>
                  </div>
                </div>
                <div v-else class="flex-1 flex flex-col items-center justify-center text-slate-400">
                  <div class="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4"><i class="fas fa-comment-dots text-3xl text-slate-300"></i></div>
                  <p class="text-sm font-medium">{{ translate('selectConversation') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- MODALE NOTIFICATIONS -->
        <div v-if="notificationsModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeNotificationsModal">
          <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-bell text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">{{ translate('notifications') }}</h2>
              </div>
              <div class="flex gap-2">
                <button @click="markAllAsRead" class="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition">{{ translate('markAllRead') }}</button>
                <button @click="closeNotificationsModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
              </div>
            </div>
            <div class="max-h-96 overflow-y-auto custom-scrollbar">
              <div v-for="notif in notifications" :key="notif.id" @click="markAsRead(notif.id)" :class="['p-4 border-b border-slate-100 cursor-pointer transition-all duration-200', !notif.read ? 'bg-gradient-to-r from-indigo-50/30 to-cyan-50/30' : 'hover:bg-slate-50']">
                <div class="flex gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-100 to-cyan-100 flex items-center justify-center"><i :class="[notif.icon, 'text-primary text-lg']"></i></div>
                  <div class="flex-1">
                    <p class="font-bold text-sm text-slate-950">{{ notif.title }}</p>
                    <p class="text-xs text-slate-500 mt-1">{{ notif.message }}</p>
                    <p class="text-[10px] text-slate-400 mt-1"><i class="far fa-clock mr-1"></i> {{ notif.time }}</p>
                  </div>
                  <div v-if="!notif.read" class="w-2.5 h-2.5 bg-red-500 rounded-full shadow-md mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- MODALE AJOUT ÉVÉNEMENT -->
        <div v-if="addEventModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeAddEventModal">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-calendar-plus text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">Ajouter un événement</h2>
              </div>
            </div>
            <div class="p-5 space-y-4">
              <div>
                <label class="text-xs font-bold text-slate-400 block mb-1">Titre</label>
                <input type="text" v-model="newEvent.title" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 block mb-1">Type</label>
                <select v-model="newEvent.type" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
                  <option value="cours">Cours / Révision</option>
                  <option value="quiz">Quiz / Exercice</option>
                  <option value="concours">Concours / Examen</option>
                </select>
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 block mb-1">Date</label>
                <input type="date" v-model="newEvent.date" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 block mb-1">Heure (optionnel)</label>
                <input type="time" v-model="newEvent.time" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
              </div>
              <div>
                <label class="text-xs font-bold text-slate-400 block mb-1">Description</label>
                <textarea v-model="newEvent.description" rows="2" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary"></textarea>
              </div>
              <div class="flex gap-3 mt-6">
                <button @click="addEvent" class="flex-1 py-2 bg-primary text-white rounded-xl font-bold">Ajouter</button>
                <button @click="closeAddEventModal" class="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Annuler</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- MODALE AJOUT RÉVISION -->
        <div v-if="addRevisionModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeAddRevisionModal">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-calendar-day text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">Ajouter à mon planning</h2>
              </div>
            </div>
            <div class="p-5 space-y-4">
              <p class="text-slate-600">Choisissez une date pour réviser : <strong>{{ revisionQuestion?.question }}</strong></p>
              <div>
                <label class="text-xs font-bold text-slate-400 block mb-1">Date de révision</label>
                <input type="date" v-model="revisionDate" class="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary">
              </div>
              <div class="flex gap-3 mt-6">
                <button @click="confirmAddRevision" class="flex-1 py-2 bg-primary text-white rounded-xl font-bold">Planifier</button>
                <button @click="closeAddRevisionModal" class="flex-1 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Annuler</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- MODALE PARAMÈTRES -->
        <div v-if="settingsModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeSettingsModal">
          <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-cog text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">{{ translate('settings') }}</h2>
              </div>
              <button @click="closeSettingsModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
            </div>
            <div class="p-5 space-y-4">
              <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                <div>
                  <p class="font-bold text-sm text-slate-950">{{ translate('theme') }}</p>
                  <p class="text-xs text-slate-500">{{ translate('light') }} / {{ translate('dark') }}</p>
                </div>
                <button @click="toggleTheme" class="w-12 h-6 rounded-full transition-colors shadow-inner" :class="isDarkMode ? 'bg-primary' : 'bg-slate-300'">
                  <div class="w-5 h-5 bg-white rounded-full transition-transform shadow-md" :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"></div>
                </button>
              </div>
              <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                <div>
                  <p class="font-bold text-sm text-slate-950">{{ translate('language') }}</p>
                  <p class="text-xs text-slate-500">Français / English</p>
                </div>
                <button @click="toggleLanguage" class="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition">{{ currentLanguage === 'fr' ? 'FR' : 'EN' }}</button>
              </div>
              <div class="border-t border-slate-100 pt-3 space-y-1">
                <button @click="openEditProfileModal" class="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 transition flex items-center gap-3">
                  <i class="fas fa-user-edit text-slate-500 w-5"></i>
                  <span class="text-sm text-slate-950 font-medium">{{ translate('editProfile') }}</span>
                </button>
                <button @click="openChangePasswordModal" class="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 transition flex items-center gap-3">
                  <i class="fas fa-lock text-slate-500 w-5"></i>
                  <span class="text-sm text-slate-950 font-medium">{{ translate('changePassword') }}</span>
                </button>
                <button @click="openSupportModal" class="w-full text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 transition flex items-center gap-3">
                  <i class="fas fa-headset text-slate-500 w-5"></i>
                  <span class="text-sm text-slate-950 font-medium">{{ translate('support') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- MODALE ÉDITION PROFIL -->
        <div v-if="editProfileModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeEditProfileModal">
          <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-user-edit text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">{{ translate('editProfile') }}</h2>
              </div>
              <button @click="closeEditProfileModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
            </div>
            <div class="p-5 space-y-4">
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ translate('fullName') }}</label>
                <input type="text" v-model="editProfileData.fullname" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ translate('email') }}</label>
                <input type="email" v-model="editProfileData.email" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ translate('phone') }}</label>
                <input type="tel" v-model="editProfileData.phone" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ translate('city') }}</label>
                <input type="text" v-model="editProfileData.city" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              </div>
              <div class="flex gap-3 mt-6">
                <button @click="saveProfile" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-save mr-2"></i> {{ translate('save') }}</button>
                <button @click="closeEditProfileModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ translate('close') }}</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- MODALE CHANGEMENT MOT DE PASSE -->
        <div v-if="changePasswordModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeChangePasswordModal">
          <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-lock text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">{{ translate('changePassword') }}</h2>
              </div>
              <button @click="closeChangePasswordModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
            </div>
            <div class="p-5 space-y-4">
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ translate('currentPassword') }}</label>
                <input type="password" v-model="passwordData.current" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ translate('newPassword') }}</label>
                <input type="password" v-model="passwordData.new" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{{ translate('confirmPassword') }}</label>
                <input type="password" v-model="passwordData.confirm" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              </div>
              <div class="flex gap-3 mt-6">
                <button @click="changePassword" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition"><i class="fas fa-key mr-2"></i> {{ translate('change') }}</button>
                <button @click="closeChangePasswordModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition"><i class="fas fa-times mr-2"></i> {{ translate('close') }}</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- MODALE SUPPORT -->
        <div v-if="supportModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeSupportModal">
          <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-headset text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">{{ translate('support') }}</h2>
              </div>
              <button @click="closeSupportModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
            </div>
            <div class="p-5 space-y-3">
              <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:shadow-md transition-all cursor-pointer">
                <div class="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-phone-alt text-white text-xl"></i></div>
                <div>
                  <p class="font-bold text-sm text-slate-950">{{ translate('phoneSupport') }}</p>
                  <p class="text-xs text-slate-500">+237 600 000 000</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:shadow-md transition-all cursor-pointer">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md"><i class="fas fa-envelope text-white text-xl"></i></div>
                <div>
                  <p class="font-bold text-sm text-slate-950">{{ translate('emailSupport') }}</p>
                  <p class="text-xs text-slate-500">support@gradusaura.com</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:shadow-md transition-all cursor-pointer">
                <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-md"><i class="fab fa-whatsapp text-white text-xl"></i></div>
                <div>
                  <p class="font-bold text-sm text-slate-950">{{ translate('whatsappSupport') }}</p>
                  <p class="text-xs text-slate-500">+237 600 000 001</p>
                </div>
              </div>
              <p class="text-center text-xs text-slate-400 pt-2"><i class="far fa-clock mr-1"></i> {{ translate('monFri') }}: 08:00 - 18:00</p>
            </div>
          </div>
        </div>
        
        <!-- MODALE MOT DE PASSE OUBLIÉ -->
        <div v-if="forgotPasswordModalOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300" @click.self="closeForgotPasswordModal">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up overflow-hidden border border-slate-100">
            <div class="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                  <i class="fas fa-key text-white text-lg"></i>
                </div>
                <h2 class="text-lg font-black text-slate-950">Mot de passe oublié</h2>
              </div>
              <button @click="closeForgotPasswordModal" class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition flex items-center justify-center"><i class="fas fa-times text-sm"></i></button>
            </div>
            <div class="p-5 space-y-4">
              <p class="text-sm text-slate-600">Entrez votre email pour recevoir un lien de réinitialisation</p>
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email</label>
                <input type="email" v-model="forgotPasswordEmail" placeholder="votre@email.com" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-950 focus:outline-none focus:border-primary transition">
              </div>
              <div class="flex gap-3 mt-6">
                <button @click="sendResetLink" class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition">
                  <i class="fas fa-paper-plane mr-2"></i> Envoyer
                </button>
                <button @click="closeForgotPasswordModal" class="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition">
                  <i class="fas fa-times mr-2"></i> Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </main>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Chart from 'chart.js/auto';

const router = useRouter();
const store = useStore();
const mobileSidebarOpen = ref(false);
const chatMessagesContainer = ref(null);

// États d'authentification
const isAuthenticated = ref(false);
const authMode = ref('login');
const authLoading = ref(false);
const authError = ref('');
const forgotPasswordModalOpen = ref(false);
const forgotPasswordEmail = ref('');

// Formulaires
const loginForm = ref({ email: '', password: '' });
const registerForm = ref({ fullname: '', email: '', password: '', confirmPassword: '' });

// États principaux
const activeTab = ref('dashboard');
const progressChartCanvas = ref(null);
const performanceChartCanvas = ref(null);
let progressChart = null;
let performanceChart = null;

// États modaux
const messagesModalOpen = ref(false);
const notificationsModalOpen = ref(false);
const settingsModalOpen = ref(false);
const editProfileModalOpen = ref(false);
const changePasswordModalOpen = ref(false);
const supportModalOpen = ref(false);
const addEventModalOpen = ref(false);
const addRevisionModalOpen = ref(false);
const orientationMenuOpen = ref(false);

// Données messages
const unreadMessages = ref(2);
const selectedConversation = ref(null);
const replyMessage = ref('');
const conversations = ref([
  { id: 1, name: 'Prof. Marie Claire', initials: 'MC', lastMessage: 'Votre cours de TCF commence demain', time: '10:30', unread: true, messages: [{ id: 1, sender: 'them', text: 'Bonjour ! Votre cours de TCF commence demain à 14h.', time: '10:30' }, { id: 2, sender: 'them', text: 'N\'oubliez pas de vous connecter 5 minutes avant.', time: '10:31' }, { id: 3, sender: 'me', text: 'Merci pour le rappel !', time: '10:32' }] },
  { id: 2, name: 'Administration', initials: 'AD', lastMessage: 'Votre inscription a été validée', time: 'Hier', unread: true, messages: [{ id: 1, sender: 'them', text: 'Votre inscription au concours a été validée.', time: 'Hier' }, { id: 2, sender: 'me', text: 'Super, merci !', time: 'Hier' }] }
]);

// Notifications
const unreadNotifications = ref(3);
const notifications = ref([
  { id: 1, title: 'Nouveau cours disponible', message: 'Un nouveau module de mathématiques a été ajouté', icon: 'fas fa-graduation-cap', time: 'Il y a 5 min', read: false },
  { id: 2, title: 'Rappel de test', message: 'Votre test blanc est prévu demain à 14h', icon: 'fas fa-bell', time: 'Il y a 1 heure', read: false },
  { id: 3, title: 'Certificat disponible', message: 'Votre certificat de formation est prêt', icon: 'fas fa-certificate', time: 'Il y a 3 heures', read: false }
]);

// Thème et langue
const isDarkMode = ref(false);
const currentLanguage = ref('fr');

// Traductions
const translations = {
  fr: {
    dashboard: 'Tableau de bord', myExams: 'Mes épreuves', myContests: 'Mes concours', myTrainings: 'Mes formations',
    myProgress: 'Ma progression', myTests: 'Mes tests & quiz', myProfile: 'Mon profil', logout: 'Déconnexion',
    connected: 'Connecté', downloadedExams: 'Épreuves téléchargées', registeredContests: 'Concours inscrits',
    trainingsFollowed: 'Formations suivies', testsQuizzes: 'Tests & Quiz', progressBySubject: 'Progression par matière',
    testPerformance: 'Performances aux tests', recentDownloads: 'Dernières épreuves téléchargées', seeAll: 'Voir tout',
    noExams: 'Aucune épreuve téléchargée', downloadExams: 'Télécharger des épreuves', downloadedOn: 'Téléchargé le',
    open: 'Ouvrir', upcomingContests: 'Prochains concours', noContests: 'Aucun concours inscrit',
    registerContest: 'S\'inscrire à un concours', registeredOn: 'Inscrit le', prepare: 'Préparer',
    edit: 'Modifier', memberSince: 'Membre depuis', fullName: 'Nom complet', email: 'Email', phone: 'Téléphone',
    notProvided: 'Non renseigné', educationLevel: 'Niveau d\'étude', city: 'Ville', status: 'Statut', active: 'Actif',
    progress: 'Progression', continue: 'Continuer', generalStats: 'Statistiques générales', globalProgress: 'Progression globale',
    completedTests: 'Tests complétés', completedQuizzes: 'Quiz réalisés', averageScore: 'Score moyen',
    pointsToImprove: 'Points à améliorer', mathLevel: 'Mathématiques - Niveau à renforcer',
    frenchWriting: 'Français - Expression écrite', englishListening: 'Anglais - Compréhension orale',
    achievements: 'réalisations', completedOn: 'Réalisé le', exams: 'épreuves', contests: 'concours',
    trainings: 'formations', messages: 'Messages', selectConversation: 'Sélectionnez une conversation',
    writeReply: 'Écrivez votre réponse...', notifications: 'Notifications', markAllRead: 'Tout lire',
    settings: 'Paramètres', editProfile: 'Modifier profil', changePassword: 'Changer mot de passe',
    theme: 'Thème', light: 'Clair', dark: 'Sombre', language: 'Langue', support: 'Support',
    save: 'Enregistrer', currentPassword: 'Mot de passe actuel', newPassword: 'Nouveau mot de passe',
    confirmPassword: 'Confirmer', change: 'Changer', close: 'Fermer', phoneSupport: 'Assistance téléphonique',
    emailSupport: 'Email', whatsappSupport: 'WhatsApp', monFri: 'Lun-Ven'
  },
  en: {
    dashboard: 'Dashboard', myExams: 'My exams', myContests: 'My contests', myTrainings: 'My trainings',
    myProgress: 'My progress', myTests: 'My tests & quizzes', myProfile: 'My profile', logout: 'Logout',
    connected: 'Connected', downloadedExams: 'Downloaded exams', registeredContests: 'Registered contests',
    trainingsFollowed: 'Trainings followed', testsQuizzes: 'Tests & Quizzes', progressBySubject: 'Progress by subject',
    testPerformance: 'Test performance', recentDownloads: 'Recent downloads', seeAll: 'See all',
    noExams: 'No exams downloaded', downloadExams: 'Download exams', downloadedOn: 'Downloaded on',
    open: 'Open', upcomingContests: 'Upcoming contests', noContests: 'No contests registered',
    registerContest: 'Register for a contest', registeredOn: 'Registered on', prepare: 'Prepare',
    edit: 'Edit', memberSince: 'Member since', fullName: 'Full name', email: 'Email', phone: 'Phone',
    notProvided: 'Not provided', educationLevel: 'Education level', city: 'City', status: 'Status', active: 'Active',
    progress: 'Progress', continue: 'Continue', generalStats: 'General statistics', globalProgress: 'Global progress',
    completedTests: 'Completed tests', completedQuizzes: 'Completed quizzes', averageScore: 'Average score',
    pointsToImprove: 'Points to improve', mathLevel: 'Mathematics - Level to reinforce',
    frenchWriting: 'French - Written expression', englishListening: 'English - Listening comprehension',
    achievements: 'achievements', completedOn: 'Completed on', exams: 'exams', contests: 'contests',
    trainings: 'trainings', messages: 'Messages', selectConversation: 'Select a conversation',
    writeReply: 'Write your reply...', notifications: 'Notifications', markAllRead: 'Mark all read',
    settings: 'Settings', editProfile: 'Edit profile', changePassword: 'Change password',
    theme: 'Theme', light: 'Light', dark: 'Dark', language: 'Language', support: 'Support',
    save: 'Save', currentPassword: 'Current password', newPassword: 'New password',
    confirmPassword: 'Confirm password', change: 'Change', close: 'Close', phoneSupport: 'Phone support',
    emailSupport: 'Email', whatsappSupport: 'WhatsApp', monFri: 'Mon-Fri'
  }
};

const translateAuth = (key) => {
  const authTranslations = {
    fr: { welcome: 'Votre plateforme de préparation aux examens et concours', login: 'Connexion', register: 'Inscription', loginBtn: 'Se connecter', registerBtn: 'Créer mon compte' },
    en: { welcome: 'Your exam and contest preparation platform', login: 'Login', register: 'Register', loginBtn: 'Login', registerBtn: 'Create account' }
  };
  return authTranslations[currentLanguage.value][key] || key;
};

const translate = (key) => translations[currentLanguage.value][key] || key;

// Données utilisateur
const userName = computed(() => store.getters.user?.fullname || store.getters.user?.name || 'Utilisateur');
const userEmail = computed(() => store.getters.user?.email || '');
const userInitials = computed(() => userName.value.charAt(0).toUpperCase());
const userPhone = computed(() => store.getters.user?.phone || '');
const userLevel = computed(() => store.getters.user?.level || '');
const userCity = computed(() => store.getters.user?.city || 'Yaoundé');
const memberSince = computed(() => store.getters.user?.memberSince || new Date().toLocaleDateString());

// ==================== DONNÉES EXEMPLES COMPLÈTES ====================

// Épreuves téléchargées
const epreuvesTelechargees = ref([
  { id: 1, examen: 'TCF', annee: '2024', matiere: 'Compréhension écrite', dateTelechargement: '2025-03-15', url: '#' },
  { id: 2, examen: 'DALF C1', annee: '2023', matiere: 'Production écrite', dateTelechargement: '2025-03-10', url: '#' },
  { id: 3, examen: 'Concours ENAM', annee: '2024', matiere: 'Culture Générale', dateTelechargement: '2025-03-05', url: '#' },
  { id: 4, examen: 'BAC', annee: '2023', matiere: 'Philosophie', dateTelechargement: '2025-02-28', url: '#' },
  { id: 5, examen: 'TOEIC', annee: '2024', matiere: 'Listening & Reading', dateTelechargement: '2025-02-20', url: '#' },
  { id: 6, examen: 'GRE', annee: '2023', matiere: 'Quantitative Reasoning', dateTelechargement: '2025-02-15', url: '#' }
]);

// Inscriptions aux concours
const inscriptionsConcours = ref([
  { id: 1, nom: 'Concours ENAM 2025', icon: 'fas fa-gavel', dateInscription: '2025-03-01', progression: 45, description: 'Concours d\'entrée à l\'ENAM' },
  { id: 2, nom: 'Concours ENS 2025', icon: 'fas fa-chalkboard', dateInscription: '2025-02-15', progression: 30, description: 'Concours d\'entrée à l\'ENS' },
  { id: 3, nom: 'Concours INJS 2025', icon: 'fas fa-balance-scale', dateInscription: '2025-03-10', progression: 15, description: 'Institut National de la Jeunesse et des Sports' },
  { id: 4, nom: 'Concours ENSP 2025', icon: 'fas fa-hospital', dateInscription: '2025-03-05', progression: 60, description: 'École Nationale de Santé Publique' },
  { id: 5, nom: 'Concours IRIC 2025', icon: 'fas fa-globe', dateInscription: '2025-02-28', progression: 25, description: 'Institut de Relations Internationales du Cameroun' }
]);

// Formations suivies
const formationsInscrites = ref([
  { id: 1, titre: 'Préparation TCF Canada', progression: 45, chapitres: 12, chapitresCompletes: 5 },
  { id: 2, titre: 'Mathématiques Concours', progression: 30, chapitres: 10, chapitresCompletes: 3 },
  { id: 3, titre: 'Culture Générale', progression: 60, chapitres: 8, chapitresCompletes: 5 },
  { id: 4, titre: 'Droit Administratif', progression: 20, chapitres: 15, chapitresCompletes: 3 },
  { id: 5, titre: 'Anglais Professionnel', progression: 75, chapitres: 10, chapitresCompletes: 7 },
  { id: 6, titre: 'Informatique Bureautique', progression: 90, chapitres: 8, chapitresCompletes: 7 }
]);

// Tests effectués
const testsEffectues = ref([
  { id: 1, titre: 'Test blanc TCF - Compréhension', score: 75, date: '2025-03-14', questions: 40, bonnesReponses: 30 },
  { id: 2, titre: 'Test blanc Mathématiques', score: 62, date: '2025-03-12', questions: 30, bonnesReponses: 18 },
  { id: 3, titre: 'Simulation Concours ENAM', score: 58, date: '2025-03-08', questions: 60, bonnesReponses: 35 },
  { id: 4, titre: 'Test QCM Culture Générale', score: 85, date: '2025-03-05', questions: 50, bonnesReponses: 42 }
]);

// Quiz réalisés
const quizRealises = ref([
  { id: 1, titre: 'Quiz Culture Générale - Semaine 1', score: 85, date: '2025-03-10', questions: 20, bonnesReponses: 17 },
  { id: 2, titre: 'Quiz Anglais - Vocabulaire', score: 70, date: '2025-03-08', questions: 25, bonnesReponses: 17 },
  { id: 3, titre: 'Quiz Droit - Semaine 2', score: 65, date: '2025-03-06', questions: 30, bonnesReponses: 19 },
  { id: 4, titre: 'Quiz Mathématiques - Algèbre', score: 55, date: '2025-03-03', questions: 20, bonnesReponses: 11 },
  { id: 5, titre: 'Quiz Français - Orthographe', score: 90, date: '2025-03-01', questions: 15, bonnesReponses: 13 }
]);

// Statistiques
const globalProgress = computed(() => {
  if (formationsInscrites.value.length === 0) return 0;
  const total = formationsInscrites.value.reduce((sum, f) => sum + (f.progression || 0), 0);
  return Math.round(total / formationsInscrites.value.length);
});

const averageScore = computed(() => {
  const allTests = [...testsEffectues.value, ...quizRealises.value];
  if (allTests.length === 0) return 0;
  const total = allTests.reduce((sum, t) => sum + (t.score || 0), 0);
  return Math.round(total / allTests.length);
});

const activeTabTitle = computed(() => {
  const titles = { 
    dashboard: translate('dashboard'), 
    epreuves: translate('myExams'), 
    concours: translate('myContests'), 
    formations: translate('myTrainings'), 
    progression: translate('myProgress'), 
    tests: translate('myTests'), 
    orientation: 'Bilan d\'orientation',
    'e-learning': 'E-learning',
    mobilite: 'Mobilité',
    errorWall: 'Mur des erreurs', 
    notes: 'Mes notes', 
    calendar: 'Calendrier', 
    profil: translate('myProfile') 
  };
  return titles[activeTab.value] || translate('dashboard');
});

// ==================== ORIENTATION ====================
const orientationCompleted = ref({ qi: false, disc: false, riasec: false, all: false });

const checkOrientationStatus = () => {
  const qi = localStorage.getItem('qi_test_result');
  const disc = localStorage.getItem('disc_test_result');
  const riasec = localStorage.getItem('riasec_test_result');
  const complete = localStorage.getItem('orientation_complete');
  
  orientationCompleted.value.qi = !!qi;
  orientationCompleted.value.disc = !!disc;
  orientationCompleted.value.riasec = !!riasec;
  orientationCompleted.value.all = !!complete;
};

// ==================== E-LEARNING ====================
const openElearningTab = ref('mes-formations');
const formationsAchetees = ref([]);
const certificatsObtenus = ref([
  { id: 1, titreFormation: 'Préparation TCF Canada', date: '2025-02-15', score: 92 },
  { id: 2, titreFormation: 'Anglais Professionnel', date: '2025-01-20', score: 88 }
]);
const historiqueTransactions = ref([
  { id: 1, date: '2025-03-01', formation: 'Data Science Masterclass', montant: 150000, reference: 'TRX-001' },
  { id: 2, date: '2025-02-15', formation: 'Développement Web Full Stack', montant: 200000, reference: 'TRX-002' }
]);
const filtreCategorie = ref('all');
const filtreNiveau = ref('all');
const searchCatalogue = ref('');

const cartCount = computed(() => {
  const cart = JSON.parse(localStorage.getItem('cart_items') || '[]');
  return cart.length;
});

const catalogueFormations = ref([
  {
    id: 1,
    titre: 'Data Science Masterclass',
    formateur: 'Prof. Jean Martin',
    description: 'Formation complète en Data Science : Python, Pandas, Scikit-learn, Machine Learning.',
    categorie: 'Data Science',
    niveau: 'Intermédiaire',
    duree: '40 heures',
    prix: 150000,
    note: 4.8,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=400&h=250&fit=crop',
    chapitres: []
  },
  {
    id: 2,
    titre: 'Développement Web Full Stack',
    formateur: 'Dr. Marie Claire',
    description: 'Devenez développeur Full Stack avec HTML, CSS, JavaScript, Vue.js, Node.js.',
    categorie: 'Développement Web',
    niveau: 'Débutant',
    duree: '60 heures',
    prix: 200000,
    note: 4.9,
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?w=400&h=250&fit=crop',
    chapitres: []
  },
  {
    id: 3,
    titre: 'Marketing Digital',
    formateur: 'Mme. Sophie Durand',
    description: 'Maîtrisez les stratégies de marketing digital, SEO, SEA, réseaux sociaux.',
    categorie: 'Marketing Digital',
    niveau: 'Débutant',
    duree: '35 heures',
    prix: 120000,
    note: 4.7,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?w=400&h=250&fit=crop',
    chapitres: []
  },
  {
    id: 4,
    titre: 'UI/UX Design',
    formateur: 'Jean-Paul Ngono',
    description: 'Apprenez les bases du design d\'interface et de l\'expérience utilisateur.',
    categorie: 'Design',
    niveau: 'Débutant',
    duree: '30 heures',
    prix: 100000,
    note: 4.6,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=250&fit=crop',
    chapitres: []
  }
]);

const formationsFiltrees = computed(() => {
  let result = catalogueFormations.value;
  if (filtreCategorie.value !== 'all') {
    result = result.filter(f => f.categorie === filtreCategorie.value);
  }
  if (filtreNiveau.value !== 'all') {
    result = result.filter(f => f.niveau === filtreNiveau.value);
  }
  if (searchCatalogue.value) {
    result = result.filter(f => f.titre.toLowerCase().includes(searchCatalogue.value.toLowerCase()));
  }
  return result;
});

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const estAchetee = (formationId) => {
  return formationsAchetees.value.some(f => f.id === formationId);
};

const ajouterAuPanier = (formation) => {
  let cart = JSON.parse(localStorage.getItem('cart_items') || '[]');
  if (!cart.some(item => item.id === formation.id)) {
    cart.push({
      id: formation.id,
      titre: formation.titre,
      formateur: formation.formateur,
      duree: formation.duree,
      categorie: formation.categorie,
      niveau: formation.niveau,
      prix: formation.prix,
      image: formation.image
    });
    localStorage.setItem('cart_items', JSON.stringify(cart));
    alert(`"${formation.titre}" ajouté au panier !`);
  } else {
    alert('Cette formation est déjà dans votre panier');
  }
};

const continuerFormation = (formation) => {
  alert(`Continuation de la formation "${formation.titre}"`);
};

const telechargerCertificat = (certificat) => {
  alert(`Téléchargement du certificat "${certificat.titreFormation}" en cours...`);
};

const partagerCertificat = (certificat) => {
  alert(`Partage du certificat "${certificat.titreFormation}"`);
};

// ==================== MUR DES ERREURS ====================
const errorList = ref([
  { id: 1, question: 'Quelle est la capitale du Cameroun ?', userAnswer: 'Douala', correctAnswer: 'Yaoundé', explanation: 'Yaoundé est la capitale politique du Cameroun depuis 1960.', difficulte: 'Facile', concoursId: 1, matiere: 'Géographie' },
  { id: 2, question: 'La loi portant code électoral au Cameroun date de ?', userAnswer: '2018', correctAnswer: '2012', explanation: 'Le code électoral a été adopté en 2012 et modifié plusieurs fois.', difficulte: 'Moyen', concoursId: 1, matiere: 'Droit' },
  { id: 3, question: 'Quel est le rôle du Conseil Constitutionnel ?', userAnswer: 'Juger les criminels', correctAnswer: 'Contrôler la constitutionnalité des lois', explanation: 'Le Conseil Constitutionnel est le juge de la constitutionnalité des lois.', difficulte: 'Difficile', concoursId: 1, matiere: 'Droit Constitutionnel' },
  { id: 4, question: 'Qui a écrit "Le Malade imaginaire" ?', userAnswer: 'Victor Hugo', correctAnswer: 'Molière', explanation: 'Le Malade imaginaire est une comédie-ballet de Molière.', difficulte: 'Facile', concoursId: 2, matiere: 'Littérature' },
  { id: 5, question: 'Quelle est la formule de l\'aire d\'un cercle ?', userAnswer: 'πd', correctAnswer: 'πr²', explanation: 'L\'aire d\'un cercle est π × r² où r est le rayon.', difficulte: 'Moyen', concoursId: 2, matiere: 'Mathématiques' }
]);

const loadErrors = () => {
  const userId = store.getters.user?.email || 'default';
  const savedErrors = localStorage.getItem(`gradus_errors_${userId}`);
  if (savedErrors) {
    errorList.value = JSON.parse(savedErrors);
  } else {
    saveErrors();
  }
};

const saveErrors = () => {
  const userId = store.getters.user?.email || 'default';
  localStorage.setItem(`gradus_errors_${userId}`, JSON.stringify(errorList.value));
};

const topErrorSubject = computed(() => {
  if (errorList.value.length === 0) return 'Aucune';
  const subjects = errorList.value.reduce((acc, e) => {
    acc[e.matiere] = (acc[e.matiere] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(subjects).reduce((a, b) => subjects[a] > subjects[b] ? a : b, '');
});

const averageSuccessRate = computed(() => {
  if (errorList.value.length === 0) return 100;
  return Math.round(85 - (errorList.value.length * 2));
});

const uniqueErrorCount = computed(() => {
  return new Set(errorList.value.map(e => e.question)).size;
});

const retryQuestion = (error) => {
  alert(`Question : ${error.question}\n\nBonne réponse : ${error.correctAnswer}\n\nExplication : ${error.explanation}`);
};

const retryAllErrors = () => {
  alert(`Préparation d'une session de rattrapage avec ${errorList.value.length} questions.`);
};

const revisionQuestion = ref(null);
const revisionDate = ref('');

const addToRevision = (error) => {
  revisionQuestion.value = error;
  addRevisionModalOpen.value = true;
};

const confirmAddRevision = () => {
  if (revisionDate.value && revisionQuestion.value) {
    const newEventItem = {
      id: Date.now(),
      title: `Révision : ${revisionQuestion.value.question.substring(0, 30)}...`,
      type: 'quiz',
      date: revisionDate.value,
      time: '',
      description: `Question à revoir : ${revisionQuestion.value.question}`
    };
    calendarEvents.value.push(newEventItem);
    saveCalendarEvents();
    closeAddRevisionModal();
    alert('Événement ajouté à votre calendrier !');
  }
};

const closeAddRevisionModal = () => {
  addRevisionModalOpen.value = false;
  revisionQuestion.value = null;
  revisionDate.value = '';
};

// ==================== PRISE DE NOTES ====================
const notesList = ref([
  { id: 1, title: 'Introduction aux concours', content: 'Points clés à retenir pour les concours administratifs :\n- Culture générale\n- Actualités\n- Droit constitutionnel\n- Mathématiques', concoursNom: 'Concours Administratifs', date: '2025-03-10' },
  { id: 2, title: 'Méthodologie QCM', content: 'Toujours lire toutes les réponses avant de choisir.\nÉliminer les réponses manifestement fausses.\nNe pas passer trop de temps sur une question.', concoursNom: 'Grandes Écoles', date: '2025-03-12' },
  { id: 3, title: 'Dates importantes', content: 'ENAM : inscriptions jusqu\'au 30 Avril\nENS : épreuves écrites en Juin\nTCF : session tous les mois', concoursNom: 'Général', date: '2025-03-05' }
]);
const selectedNote = ref(null);
const noteSearch = ref('');

const loadNotes = () => {
  const userId = store.getters.user?.email || 'default';
  const savedNotes = localStorage.getItem(`gradus_notes_${userId}`);
  if (savedNotes) {
    notesList.value = JSON.parse(savedNotes);
  } else {
    saveNotes();
  }
};

const saveNotes = () => {
  const userId = store.getters.user?.email || 'default';
  localStorage.setItem(`gradus_notes_${userId}`, JSON.stringify(notesList.value));
};

const createNewNote = () => {
  const newNote = {
    id: Date.now(),
    title: 'Nouvelle note',
    content: '',
    concoursNom: inscriptionsConcours.value[0]?.nom || 'Général',
    date: new Date().toISOString().split('T')[0]
  };
  notesList.value.unshift(newNote);
  selectedNote.value = newNote;
  saveNotes();
};

const deleteNote = (id) => {
  notesList.value = notesList.value.filter(n => n.id !== id);
  if (selectedNote.value?.id === id) selectedNote.value = null;
  saveNotes();
};

const saveNote = () => {
  if (selectedNote.value) {
    const index = notesList.value.findIndex(n => n.id === selectedNote.value.id);
    if (index !== -1) notesList.value[index] = selectedNote.value;
    saveNotes();
    alert('Note sauvegardée !');
  }
};

const filteredNotes = computed(() => {
  if (!noteSearch.value) return notesList.value;
  return notesList.value.filter(n => n.title.toLowerCase().includes(noteSearch.value.toLowerCase()) || n.content.toLowerCase().includes(noteSearch.value.toLowerCase()));
});

// ==================== CALENDRIER ====================
const calendarEvents = ref([
  { id: 1, title: 'Révision Mathématiques', type: 'cours', date: new Date().toLocaleDateString(), time: '14:00', description: 'Chapitre 3 : Les fonctions' },
  { id: 2, title: 'Quiz Culture Générale', type: 'quiz', date: new Date(Date.now() + 86400000).toLocaleDateString(), time: '10:00', description: 'Série 1 à 5' },
  { id: 3, title: 'Concours ENAM', type: 'concours', date: new Date(Date.now() + 7 * 86400000).toLocaleDateString(), time: '08:00', description: 'Épreuves écrites' }
]);
const currentDate = ref(new Date());
const selectedDate = ref('');
const newEvent = ref({ title: '', type: 'cours', date: '', time: '', description: '' });

const loadCalendarEvents = () => {
  const userId = store.getters.user?.email || 'default';
  const savedEvents = localStorage.getItem(`gradus_calendar_${userId}`);
  if (savedEvents) {
    calendarEvents.value = JSON.parse(savedEvents);
  } else {
    saveCalendarEvents();
  }
};

const saveCalendarEvents = () => {
  const userId = store.getters.user?.email || 'default';
  localStorage.setItem(`gradus_calendar_${userId}`, JSON.stringify(calendarEvents.value));
};

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentMonthName = computed(() => currentDate.value.toLocaleString('fr', { month: 'long' }));

const calendarDays = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthDays - i);
    days.push({ date: date.toLocaleDateString(), dayNumber: prevMonthDays - i, isCurrentMonth: false, hasEvent: hasEventOnDate(date) });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({ date: date.toLocaleDateString(), dayNumber: i, isCurrentMonth: true, hasEvent: hasEventOnDate(date) });
  }
  
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push({ date: date.toLocaleDateString(), dayNumber: i, isCurrentMonth: false, hasEvent: hasEventOnDate(date) });
  }
  
  return days;
});

const hasEventOnDate = (date) => {
  return calendarEvents.value.some(e => e.date === date.toLocaleDateString());
};

const getDayEvents = (dateStr) => {
  return calendarEvents.value.filter(e => e.date === dateStr);
};

const upcomingEventsList = computed(() => {
  const today = new Date().toLocaleDateString();
  return calendarEvents.value.filter(e => e.date >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
});

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const selectDay = (day) => {
  selectedDate.value = day.date;
};

const formatEventDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr', { day: 'numeric', month: 'long', year: 'numeric' });
};

const openAddEventModal = () => {
  newEvent.value = { title: '', type: 'cours', date: new Date().toISOString().split('T')[0], time: '', description: '' };
  addEventModalOpen.value = true;
};

const closeAddEventModal = () => {
  addEventModalOpen.value = false;
};

const addEvent = () => {
  if (newEvent.value.title && newEvent.value.date) {
    calendarEvents.value.push({
      id: Date.now(),
      ...newEvent.value
    });
    saveCalendarEvents();
    closeAddEventModal();
    alert('Événement ajouté !');
  }
};

const deleteEvent = (id) => {
  calendarEvents.value = calendarEvents.value.filter(e => e.id !== id);
  saveCalendarEvents();
};

// ==================== CONTENU CONCOURS ====================
const openContenuConcours = (concours) => {
  alert(`Ouverture du contenu de préparation pour : ${concours.nom}\n\nProgression : ${concours.progression || 0}%\nDescription : ${concours.description || ''}`);
};

// ==================== FONCTIONS AUTHENTIFICATION ====================
const openForgotPasswordModal = () => {
  forgotPasswordModalOpen.value = true;
};

const closeForgotPasswordModal = () => {
  forgotPasswordModalOpen.value = false;
  forgotPasswordEmail.value = '';
};

const sendResetLink = () => {
  if (!forgotPasswordEmail.value) {
    alert('Veuillez entrer votre email');
    return;
  }
  alert(`Un lien de réinitialisation a été envoyé à ${forgotPasswordEmail.value}`);
  closeForgotPasswordModal();
};

const handleLogin = async () => {
  authLoading.value = true;
  authError.value = '';
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (loginForm.value.email && loginForm.value.password.length >= 6) {
      const user = {
        fullname: loginForm.value.email.split('@')[0],
        email: loginForm.value.email,
        memberSince: new Date().toLocaleDateString()
      };
      localStorage.setItem('gradus_user', JSON.stringify(user));
      localStorage.setItem('gradus_token', 'fake-jwt-token');
      
      store.commit('setUser', user);
      
      isAuthenticated.value = true;
      loginForm.value = { email: '', password: '' };
    } else {
      authError.value = 'Email ou mot de passe incorrect';
    }
  } catch (error) {
    authError.value = 'Erreur de connexion';
  } finally {
    authLoading.value = false;
  }
};

const handleRegister = async () => {
  authLoading.value = true;
  authError.value = '';
  
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    authError.value = 'Les mots de passe ne correspondent pas';
    authLoading.value = false;
    return;
  }
  
  if (registerForm.value.password.length < 6) {
    authError.value = 'Le mot de passe doit contenir au moins 6 caractères';
    authLoading.value = false;
    return;
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      fullname: registerForm.value.fullname,
      email: registerForm.value.email,
      memberSince: new Date().toLocaleDateString()
    };
    localStorage.setItem('gradus_user', JSON.stringify(user));
    localStorage.setItem('gradus_token', 'fake-jwt-token');
    
    store.commit('setUser', user);
    
    isAuthenticated.value = true;
    registerForm.value = { fullname: '', email: '', password: '', confirmPassword: '' };
  } catch (error) {
    authError.value = 'Erreur lors de l\'inscription';
  } finally {
    authLoading.value = false;
  }
};

const logout = () => {
  if (progressChart) { progressChart.destroy(); progressChart = null; }
  if (performanceChart) { performanceChart.destroy(); performanceChart = null; }
  
  localStorage.removeItem('gradus_user');
  localStorage.removeItem('gradus_token');
  
  store.commit('setUser', null);
  activeTab.value = 'dashboard';
  isAuthenticated.value = false;
  authMode.value = 'login';
  
  router.push('/');
};

// ==================== FONCTIONS MODALES ====================
const openMessagesModal = () => { messagesModalOpen.value = true; unreadMessages.value = 0; nextTick(() => { if (chatMessagesContainer.value) chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight; }); };
const closeMessagesModal = () => { messagesModalOpen.value = false; selectedConversation.value = null; };
const sendReply = () => {
  if (replyMessage.value.trim() && selectedConversation.value) {
    selectedConversation.value.messages.push({ id: Date.now(), sender: 'me', text: replyMessage.value, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    selectedConversation.value.lastMessage = replyMessage.value;
    replyMessage.value = '';
    nextTick(() => { if (chatMessagesContainer.value) chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight; });
  }
};

const openNotificationsModal = () => { notificationsModalOpen.value = true; };
const closeNotificationsModal = () => { notificationsModalOpen.value = false; };
const markAsRead = (id) => {
  const notif = notifications.value.find(n => n.id === id);
  if (notif && !notif.read) { notif.read = true; unreadNotifications.value = notifications.value.filter(n => !n.read).length; }
};
const markAllAsRead = () => { notifications.value.forEach(n => n.read = true); unreadNotifications.value = 0; };

const openSettingsModal = () => { settingsModalOpen.value = true; };
const closeSettingsModal = () => { settingsModalOpen.value = false; };
const openEditProfileModal = () => {
  editProfileData.value = { fullname: userName.value, email: userEmail.value, phone: userPhone.value, city: userCity.value };
  editProfileModalOpen.value = true;
  closeSettingsModal();
};
const closeEditProfileModal = () => { editProfileModalOpen.value = false; };
const saveProfile = () => {
  if (store.getters.user) {
    const updatedUser = { ...store.getters.user, fullname: editProfileData.value.fullname, phone: editProfileData.value.phone, city: editProfileData.value.city };
    store.commit('setUser', updatedUser);
    localStorage.setItem('gradus_user', JSON.stringify(updatedUser));
  }
  closeEditProfileModal();
};

const openChangePasswordModal = () => { changePasswordModalOpen.value = true; closeSettingsModal(); };
const closeChangePasswordModal = () => { changePasswordModalOpen.value = false; };
const changePassword = () => {
  if (passwordData.value.new !== passwordData.value.confirm) { alert('Les mots de passe ne correspondent pas'); return; }
  if (passwordData.value.new.length < 6) { alert('Le mot de passe doit contenir au moins 6 caractères'); return; }
  alert('Mot de passe changé avec succès');
  passwordData.value = { current: '', new: '', confirm: '' };
  closeChangePasswordModal();
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) { document.documentElement.classList.add('dark'); } 
  else { document.documentElement.classList.remove('dark'); }
};

const toggleLanguage = () => { currentLanguage.value = currentLanguage.value === 'fr' ? 'en' : 'fr'; };

const openSupportModal = () => { supportModalOpen.value = true; closeSettingsModal(); };
const closeSupportModal = () => { supportModalOpen.value = false; };

const ouvrirEpreuve = (epreuve) => { alert(`Ouverture de l'épreuve:\n\n${epreuve.examen} - ${epreuve.annee}\n${epreuve.matiere}\n\nTéléchargement en cours...`); };

const editProfileData = ref({ fullname: '', email: '', phone: '', city: '' });
const passwordData = ref({ current: '', new: '', confirm: '' });

// ==================== GRAPHIQUES ====================
const initCharts = () => {
  if (progressChartCanvas.value && !progressChart) {
    progressChart = new Chart(progressChartCanvas.value, {
      type: 'line',
      data: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], datasets: [
        { label: 'Culture Générale', data: [45, 55, 65, 70, 75, 82], borderColor: '#4F46E5', tension: 0.4, borderWidth: 3, fill: false },
        { label: 'Droit', data: [50, 60, 68, 72, 78, 85], borderColor: '#06B6D4', tension: 0.4, borderWidth: 3, fill: false },
        { label: 'Mathématiques', data: [40, 52, 64, 71, 79, 84], borderColor: '#F97316', tension: 0.4, borderWidth: 3, fill: false }
      ] },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' } } }
    });
  }
  if (performanceChartCanvas.value && !performanceChart) {
    performanceChart = new Chart(performanceChartCanvas.value, {
      type: 'bar',
      data: { labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'], datasets: [{ label: 'Score (%)', data: [65, 72, 78, 74, 85], backgroundColor: '#4F46E5', borderRadius: 12, barPercentage: 0.6 }] },
      options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }
    });
  }
};

// ==================== INIT ====================
onMounted(() => {
  const savedUser = localStorage.getItem('gradus_user');
  const savedToken = localStorage.getItem('gradus_token');
  
  if (savedUser && savedToken) {
    store.commit('setUser', JSON.parse(savedUser));
    isAuthenticated.value = true;
    loadErrors();
    loadNotes();
    loadCalendarEvents();
    checkOrientationStatus();
    nextTick(() => initCharts());
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'dashboard' && isAuthenticated.value) {
    nextTick(() => initCharts());
  }
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

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dark .bg-white { background-color: #1f2937; }
.dark .text-slate-950 { color: #f3f4f6; }
.dark .text-slate-500 { color: #9ca3af; }
.dark .border-slate-100 { border-color: #374151; }
.dark .bg-slate-50 { background-color: #1f2937; }
.dark .text-slate-600 { color: #cbd5e1; }
.dark .border-slate-200 { border-color: #374151; }
</style>
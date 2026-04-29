<template>
  <div :class="['min-h-screen', isDarkMode ? 'dark' : '']">
    <div :class="['flex h-screen', isDarkMode ? 'dark' : '']">
      <!-- Sidebar -->
      <aside 
        :class="[
          'fixed md:relative z-40 w-64 h-full transition-transform duration-300 ease-in-out flex flex-col shrink-0 overflow-hidden',
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-r border-slate-200',
          sidebarCollapsed ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
        <button 
          @click="sidebarCollapsed = false" 
          class="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-50"
        >
          <i class="fas fa-times text-xl"></i>
        </button>

        <div :class="['p-4 md:p-6 border-b', isDarkMode ? 'border-gray-700' : 'border-slate-200']">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 md:w-10 md:h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl">
              <i class="fas fa-crown text-white text-sm md:text-base"></i>
            </div>
            <span :class="['font-bold text-lg md:text-xl tracking-tighter', isDarkMode ? 'text-white' : 'text-slate-950']">Gradus Aura Admin</span>
          </div>
          
          <div :class="['grid grid-cols-3 gap-1 md:gap-2 p-1 md:p-2 rounded-2xl border mt-4 md:mt-6', isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100']">
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Plateformes</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ allTenants.length }}</p></div>
            <div class="text-center py-1 md:py-2 border-x border-slate-200"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Utilisateurs</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">2.8M</p></div>
            <div class="text-center py-1 md:py-2"><p class="text-[6px] md:text-[8px] font-black text-slate-400 uppercase">Cours</p><p class="text-[8px] md:text-[10px] font-bold text-slate-900">{{ allCourses.length }}</p></div>
          </div>
        </div>
        
        <nav class="flex-1 overflow-y-auto px-2 md:px-4 py-4 md:py-6 space-y-4 md:space-y-6 custom-scrollbar">
          <div class="space-y-1">
            <p class="px-3 text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Principale</p>
            <div v-for="item in navItems" :key="item.id" @click="activeSection = item.id; sidebarCollapsed = false" 
              :class="['sidebar-item px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 cursor-pointer transition rounded-[22px] text-[10px] md:text-[11px]', 
              activeSection === item.id ? 'active text-primary font-semibold' : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-primary')]">
              <i :class="item.icon + ' w-4 md:w-5'"></i>
              <span class="font-black uppercase tracking-widest">{{ item.label }}</span>
            </div>
          </div>
        </nav>
        
        <div :class="['p-3 md:p-4 border-t', isDarkMode ? 'border-gray-700' : 'border-slate-100']">
          <div class="flex items-center gap-2 md:gap-3">
            <div class="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
              SA
            </div>
            <div class="flex-1">
              <p :class="['text-[10px] md:text-xs font-bold truncate', isDarkMode ? 'text-white' : 'text-slate-950']">{{ currentAdmin.name }}</p>
              <p :class="['text-[8px] md:text-[10px] truncate', isDarkMode ? 'text-gray-400' : 'text-slate-500']">{{ currentAdmin.email }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between mt-3">
            <button @click="toggleLanguage" class="px-2 py-1 text-xs bg-slate-100 rounded-lg flex items-center gap-1">
              <i class="fas fa-globe"></i> {{ currentLang === 'fr' ? 'FR' : 'EN' }}
            </button>
            <button @click="logout" class="px-3 py-1 text-xs text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition">
              <i class="fas fa-sign-out-alt mr-1"></i> Déconnexion
            </button>
          </div>
        </div>
      </aside>
      
      <div 
        v-if="sidebarCollapsed" 
        class="fixed inset-0 bg-black/50 z-30 md:hidden"
        @click="sidebarCollapsed = false"
      ></div>
      
      <main :class="['flex-1 overflow-y-auto custom-scrollbar', isDarkMode ? 'bg-gray-900' : 'bg-slate-50']">
        <header :class="['sticky top-0 z-10 backdrop-blur-sm border-b px-4 md:px-8 py-3 md:py-4', 
          isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-slate-100']">
          <div class="flex flex-wrap justify-between items-center gap-4">
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
              <div class="relative cursor-pointer" @click="showNotifications = !showNotifications">
                <i class="fas fa-bell text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
                <span class="absolute -top-1 -right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-[6px] md:text-[8px] font-bold rounded-full flex items-center justify-center">{{ unreadCount }}</span>
              </div>
              <div class="relative cursor-pointer" @click="toggleTheme">
                <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-slate-400 text-base md:text-xl hover:text-primary transition"></i>
              </div>
              <div class="flex items-center gap-2 md:gap-3 ml-1 md:ml-2 cursor-pointer" @click="showProfile = true">
                <div class="w-7 h-7 md:w-10 md:h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                  SA
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div class="p-3 md:p-8">
          <!-- SECTION DASHBOARD -->
          <div v-show="activeSection === 'dashboard'" class="space-y-6">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div v-for="kpi in dashboardKPIs" :key="kpi.label" class="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition">
                <i :class="kpi.icon" class="text-2xl text-primary mb-2"></i>
                <p class="text-xl font-bold">{{ kpi.value }}</p>
                <p class="text-xs text-slate-500">{{ kpi.label }}</p>
                <span class="text-xs text-green-600">{{ kpi.trend }}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm">
                <h3 class="font-semibold mb-4"><i class="fas fa-chart-line text-primary mr-2"></i>Croissance par région</h3>
                <div class="h-72"><canvas ref="growthChartCanvas"></canvas></div>
              </div>
              <div class="bg-white rounded-2xl p-5 shadow-sm">
                <h3 class="font-semibold mb-4"><i class="fas fa-chart-pie text-primary mr-2"></i>Répartition par pays</h3>
                <div class="h-72"><canvas ref="countryChartCanvas"></canvas></div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-5 shadow-sm">
              <h3 class="font-semibold mb-4"><i class="fas fa-globe-africa text-primary mr-2"></i>Présence mondiale 3D (52 pays)</h3>
              <div id="globe-3d-container" class="w-full h-[550px] rounded-xl overflow-hidden border border-slate-200 shadow-lg"></div>
              <div class="flex flex-wrap justify-center gap-4 mt-4 text-xs text-slate-500">
                <span><i class="fas fa-circle text-green-500"></i> Activité élevée</span>
                <span><i class="fas fa-circle text-yellow-500"></i> Activité moyenne</span>
                <span><i class="fas fa-circle text-red-500"></i> Activité faible</span>
                <span><i class="fas fa-circle text-purple-500"></i> Partenaire stratégique</span>
                <span><i class="fas fa-mouse-pointer text-primary"></i> Cliquez sur un point</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-5 shadow-sm">
              <h3 class="font-semibold mb-4"><i class="fas fa-flag-checkered text-primary mr-2"></i>Liste des 52 pays partenaires par continent</h3>
              
              <div class="relative mb-4">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                <input type="text" v-model="countrySearch" placeholder="Rechercher un pays..." class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary transition">
              </div>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <button v-for="cont in continentFilters" :key="cont.name" @click="selectedContinent = cont.name" 
                  :class="['px-4 py-2 rounded-xl text-sm font-semibold transition', selectedContinent === cont.name ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200']">
                  <i :class="cont.icon + ' mr-2'"></i>{{ cont.name }} <span class="ml-1 text-xs">({{ getContinentCount(cont.name) }})</span>
                </button>
              </div>
              
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-h-96 overflow-y-auto p-2">
                <div v-for="country in filteredCountries" :key="country.code" 
                  @click="showCountryDetails(country)"
                  class="flex items-center gap-2 p-2 bg-slate-50 rounded-xl cursor-pointer hover:bg-indigo-50 transition group">
                  <img :src="country.flag" class="w-8 h-5 object-cover rounded shadow-sm">
                  <div class="flex-1">
                    <p class="font-semibold text-sm text-slate-800">{{ country.nom }}</p>
                    <div class="flex items-center gap-1">
                      <span :class="getActivityColorClass(country.activity)" class="w-2 h-2 rounded-full"></span>
                      <span class="text-xs text-slate-400">{{ country.users }} utilisateurs</span>
                    </div>
                  </div>
                  <i class="fas fa-chevron-right text-slate-300 text-xs group-hover:text-primary transition"></i>
                </div>
              </div>
              
              <div v-if="filteredCountries.length === 0" class="text-center py-8 text-slate-500">
                <i class="fas fa-globe text-4xl mb-2"></i>
                <p>Aucun pays trouvé dans cette région</p>
              </div>
            </div>

            <div v-if="selectedCountry" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up" @click.self="selectedCountry = null">
              <div class="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div class="flex justify-between items-center mb-4 pb-2 border-b">
                  <h3 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <img :src="selectedCountry.flag" class="w-10 h-6 object-cover rounded shadow-md">
                    {{ selectedCountry.nom }}
                  </h3>
                  <button @click="selectedCountry = null" class="text-slate-400 hover:text-slate-600 transition"><i class="fas fa-times text-xl"></i></button>
                </div>
                
                <div class="space-y-3">
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span class="text-sm font-medium text-slate-600"><i class="fas fa-globe text-primary mr-2"></i>Continent</span>
                    <span class="font-semibold text-slate-800">{{ selectedCountry.continent }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span class="text-sm font-medium text-slate-600"><i class="fas fa-money-bill-wave text-primary mr-2"></i>Monnaie</span>
                    <span class="font-semibold text-slate-800">{{ selectedCountry.currency }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span class="text-sm font-medium text-slate-600"><i class="fas fa-users text-primary mr-2"></i>Utilisateurs</span>
                    <span class="font-semibold text-slate-800">{{ selectedCountry.users }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span class="text-sm font-medium text-slate-600"><i class="fas fa-chart-line text-primary mr-2"></i>Revenus</span>
                    <span class="font-semibold text-slate-800">{{ selectedCountry.revenue }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span class="text-sm font-medium text-slate-600"><i class="fas fa-book text-primary mr-2"></i>Formations actives</span>
                    <span class="font-semibold text-slate-800">{{ selectedCountry.courses }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span class="text-sm font-medium text-slate-600"><i class="fas fa-chart-simple text-primary mr-2"></i>Activité</span>
                    <span class="flex items-center gap-2">
                      <span :class="getActivityColorClass(selectedCountry.activity)" class="w-3 h-3 rounded-full"></span>
                      <span class="font-semibold text-slate-800">{{ getActivityLabel(selectedCountry.activity) }}</span>
                    </span>
                  </div>
                  
                  <div class="p-3 bg-primary/5 rounded-xl">
                    <p class="text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-school text-primary mr-2"></i>Établissements partenaires</p>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="school in selectedCountry.schools" :key="school" class="px-2 py-1 bg-white rounded-lg text-xs text-slate-600 border border-slate-200 shadow-sm">
                        {{ school }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="flex gap-3 mt-6">
                  <button @click="selectedCountry = null" class="flex-1 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
                    <i class="fas fa-check mr-2"></i>Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ==================== SECTION PLATEFORMES (15 exemples) ==================== -->
<div v-show="activeSection === 'platforms'" class="space-y-6">
  <div class="flex justify-between items-center flex-wrap gap-4">
    <h2 class="text-2xl font-bold"><i class="fas fa-building text-primary mr-2"></i>Plateformes partenaires (15)</h2>
    <button @click="openTenantModal" class="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition"><i class="fas fa-plus mr-2"></i>Ajouter</button>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="tenant in allTenants" :key="tenant.id" class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
      <!-- Image d'illustration de la plateforme -->
      <div class="relative h-44 overflow-hidden">
        <img :src="tenant.image" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" :alt="tenant.name">
        <div class="absolute top-3 right-3">
          <button @click="toggleTenantStatus(tenant)" :class="tenant.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'" class="px-3 py-1 rounded-full text-xs font-bold shadow-md">
            <i :class="tenant.status === 'active' ? 'fas fa-check-circle' : 'fas fa-pause-circle'" class="mr-1"></i>
            {{ tenant.status === 'active' ? 'ACTIF' : 'SUSPENDU' }}
          </button>
        </div>
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><i :class="tenant.icon" class="text-white text-sm"></i></div>
            <h3 class="text-white font-bold text-lg">{{ tenant.name }}</h3>
          </div>
          <p class="text-white/80 text-xs mt-1"><i class="fas fa-map-marker-alt mr-1"></i>{{ tenant.location }}</p>
        </div>
      </div>
      
      <div class="p-5">
        <div class="grid grid-cols-3 gap-3 text-center mb-4">
          <div class="p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition">
            <i class="fas fa-users text-primary text-lg mb-1"></i>
            <p class="font-bold text-lg">{{ tenant.users }}</p>
            <p class="text-xs text-slate-500">Utilisateurs</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition">
            <i class="fas fa-dollar-sign text-primary text-lg mb-1"></i>
            <p class="font-bold text-lg">{{ tenant.revenue }}</p>
            <p class="text-xs text-slate-500">Revenus</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition">
            <i class="fas fa-book text-primary text-lg mb-1"></i>
            <p class="font-bold text-lg">{{ tenant.courses }}</p>
            <p class="text-xs text-slate-500">Formations</p>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button @click="configureTenant(tenant)" class="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-sm">
            <i class="fas fa-cog mr-2"></i>Configurer
          </button>
          <button @click="viewTenantDetails(tenant)" class="py-2.5 px-4 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200 transition">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

          <!-- SECTION FORMATEURS -->
          <div v-show="activeSection === 'trainers'" class="space-y-6">
            <div class="flex justify-between items-center flex-wrap gap-4">
              <h2 class="text-2xl font-bold"><i class="fas fa-chalkboard-user text-primary mr-2"></i>Formateurs experts (15)</h2>
              <button @click="openTrainerModal" class="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold"><i class="fas fa-plus mr-2"></i>Ajouter</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="trainer in allTrainers" :key="trainer.id" class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div class="relative h-40 bg-gradient-to-r from-indigo-600 to-purple-600">
                  <img :src="trainer.avatar" class="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover shadow-lg">
                  <div class="absolute top-3 right-3"><span class="bg-yellow-400 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold"><i class="fas fa-star mr-1"></i>{{ trainer.rating }}</span></div>
                </div>
                <div class="pt-14 pb-5 px-5 text-center">
                  <h3 class="text-xl font-bold mt-2">{{ trainer.name }}</h3>
                  <p class="text-slate-500 text-sm"><i class="fas fa-graduation-cap text-primary mr-1"></i>{{ trainer.specialite }}</p>
                  <div class="flex justify-center gap-3 mt-2"><span class="text-xs bg-slate-100 px-3 py-1 rounded-full"><i class="fas fa-map-marker-alt text-primary mr-1"></i>{{ trainer.pays }}</span><span class="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">{{ formatMoney(trainer.totalEarned) }}</span></div>
                  <div class="flex gap-3 mt-5"><button class="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold"><i class="fas fa-envelope mr-2"></i>Message</button><button class="p-2.5 border border-slate-200 rounded-xl"><i class="fas fa-edit text-slate-600"></i></button><button class="p-2.5 border border-red-200 rounded-xl"><i class="fas fa-trash text-red-500"></i></button></div>
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION FORMATIONS -->
          <div v-show="activeSection === 'courses'" class="space-y-6">
            <div class="flex justify-between items-center flex-wrap gap-4">
              <h2 class="text-2xl font-bold"><i class="fas fa-book text-primary mr-2"></i>Formations premium (15)</h2>
              <button @click="openCourseModal" class="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold"><i class="fas fa-plus mr-2"></i>Ajouter</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="course in allCourses" :key="course.id" class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div class="relative h-44 overflow-hidden">
                  <img :src="course.image" class="w-full h-full object-cover">
                  <div class="absolute top-3 right-3"><span class="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold"><i class="fas fa-check-circle mr-1"></i>{{ course.level }}</span></div>
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3"><p class="text-white font-bold text-lg">{{ formatMoney(course.price) }}</p></div>
                </div>
                <div class="p-4">
                  <h3 class="font-bold text-lg">{{ course.title }}</h3>
                  <p class="text-sm text-slate-500 mt-1">{{ course.category }}</p>
                  <div class="flex justify-between items-center mt-3"><span class="text-sm text-slate-500"><i class="fas fa-users text-primary mr-1"></i>{{ course.enrolled }} inscrits</span><div class="flex gap-2"><button class="p-2 rounded-lg border border-primary text-primary"><i class="fas fa-edit"></i></button><button class="p-2 rounded-lg border border-red-500 text-red-500"><i class="fas fa-trash"></i></button></div></div>
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION ANALYSES -->
          <div v-show="activeSection === 'analytics'" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm"><canvas ref="forecastChartCanvas"></canvas></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm">
                <div class="heatmap">
                  <div v-for="i in 7" :key="i" class="flex gap-1 mb-1">
                    <div v-for="j in 24" :key="j" class="heatmap-cell w-7 h-7 rounded" :class="getHeatmapClass(i, j)"></div>
                  </div>
                  <div class="flex justify-between mt-2 text-xs"><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span></div>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-sm">
              <h3 class="font-semibold mb-4">Rapports exportables</h3>
              <div class="flex gap-3 flex-wrap"><button class="bg-primary text-white px-4 py-2 rounded-lg text-sm"><i class="fas fa-download mr-2"></i>PDF</button><button class="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm"><i class="fas fa-file-excel mr-2"></i>Excel</button></div>
            </div>
          </div>

          <!-- SECTION FINANCES -->
          <div v-show="activeSection === 'financial'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm"><canvas ref="revenueChartCanvas"></canvas></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm">
                <h3 class="font-semibold mb-4">Commissions</h3>
                <div class="space-y-3"><div class="flex justify-between"><span>Plateforme</span><div class="flex items-center gap-2"><input v-model="platformCommission" class="w-16 p-1 border rounded text-center">%<button @click="saveCommissions" class="text-primary text-sm"><i class="fas fa-save"></i></button></div></div><div class="flex justify-between"><span>Formateur</span><div class="flex items-center gap-2"><input v-model="trainerCommission" class="w-16 p-1 border rounded text-center">%<button @click="saveCommissions" class="text-primary text-sm"><i class="fas fa-save"></i></button></div></div></div>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-5 shadow-sm overflow-x-auto">
              <h3 class="font-semibold mb-4">Transactions récentes</h3>
              <table class="w-full text-sm">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="p-2">ID</th>
                    <th class="p-2">Plateforme</th>
                    <th class="p-2">Montant</th>
                    <th class="p-2">Méthode</th>
                    <th class="p-2">Statut</th>
                    <th class="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in recentTransactions" :key="t.id" class="border-t">
                    <td class="p-2">#{{ t.id }}</td>
                    <td class="p-2">{{ t.platform }}</td>
                    <td class="p-2 font-bold text-primary">{{ formatMoney(t.amount) }}</td>
                    <td class="p-2">{{ t.method }}</td>
                    <td class="p-2"><span :class="t.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'" class="px-2 py-0.5 rounded-full text-xs">{{ t.status }}</span></td>
                    <td class="p-2">{{ t.date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SECTION SÉCURITÉ -->
          <div v-show="activeSection === 'security'" class="space-y-6">
            <div class="flex justify-end"><button @click="runSecurityAudit" class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"><i class="fas fa-shield-virus mr-2"></i>Lancer audit</button></div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-4"><i class="fas fa-history mr-2"></i>Logs système</h3><div class="space-y-2 max-h-96 overflow-y-auto"><div v-for="log in systemLogs" :key="log.id" class="p-2 rounded text-sm" :class="log.type === 'info' ? 'bg-blue-50' : log.type === 'warning' ? 'bg-yellow-50' : 'bg-red-50'"><i :class="log.type === 'info' ? 'fas fa-info-circle text-blue-500' : log.type === 'warning' ? 'fas fa-exclamation-triangle text-yellow-500' : 'fas fa-times-circle text-red-500'" class="mr-2"></i>{{ log.message }}<span class="text-xs text-slate-400 float-right">{{ log.time }}</span></div></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-4"><i class="fas fa-eye mr-2"></i>Activités suspectes</h3><div class="space-y-2"><div v-for="act in suspiciousActivities" :key="act.id" class="flex justify-between items-center p-3 bg-red-50 rounded-lg"><span class="text-sm">{{ act.description }}</span><button @click="resolveActivity(act)" class="px-2 py-1 bg-white rounded text-xs">Résoudre</button></div></div></div>
            </div>
          </div>

          <!-- SECTION IA -->
          <div v-show="activeSection === 'ai'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm text-center"><div class="text-5xl font-bold text-primary">1,234</div><p>Étudiants à risque</p><div class="h-2 bg-slate-100 rounded-full mt-3"><div class="h-full bg-primary rounded-full" style="width:12%"></div></div></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><canvas ref="aiForecastChartCanvas"></canvas></div>
              <div class="bg-white rounded-2xl p-5 shadow-sm"><h3 class="font-semibold mb-4">Recommandations IA</h3><ul class="space-y-2"><li v-for="rec in aiRecommendations" :key="rec.id" class="p-2 bg-slate-50 rounded-lg text-sm"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>{{ rec.message }}</li></ul></div>
            </div>
          </div>

          <!-- SECTION RÉSERVATIONS -->
          <div v-show="activeSection === 'bookings'" class="space-y-6">
            <div class="flex justify-between items-center flex-wrap gap-4">
              <h2 class="text-2xl font-bold"><i class="fas fa-calendar-check text-primary mr-2"></i>Pré-inscriptions (15)</h2>
              <div class="flex gap-2"><select v-model="bookingFilter.type" class="px-3 py-2 text-sm border rounded-lg"><option value="all">Tous</option><option value="preinscription">Pré-inscriptions</option><option value="info">Demandes</option></select><input type="text" v-model="bookingSearch" placeholder="Rechercher..." class="px-3 py-2 border rounded-lg text-sm w-48"></div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-white rounded-2xl p-4 text-center shadow-sm"><div class="text-2xl font-bold text-primary">{{ bookingsStats.total }}</div><p class="text-xs">Total</p></div>
              <div class="bg-white rounded-2xl p-4 text-center shadow-sm"><div class="text-2xl font-bold text-emerald-600">{{ bookingsStats.preinscriptions }}</div><p class="text-xs">Pré-inscriptions</p></div>
              <div class="bg-white rounded-2xl p-4 text-center shadow-sm"><div class="text-2xl font-bold text-blue-600">{{ bookingsStats.inquiries }}</div><p class="text-xs">Demandes</p></div>
              <div class="bg-white rounded-2xl p-4 text-center shadow-sm"><div class="text-2xl font-bold text-purple-600">{{ bookingsStats.pays }}</div><p class="text-xs">Pays</p></div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-slate-50"><tr><th class="p-3">Date</th><th class="p-3">Candidat</th><th class="p-3">Pays</th><th class="p-3">Concours</th><th class="p-3">Établissement</th><th class="p-3">Type</th><th class="p-3">Statut</th><th class="p-3">Actions</th></tr></thead><tbody><tr v-for="booking in filteredBookings" :key="booking.id" class="border-t hover:bg-slate-50"><td class="p-3">{{ booking.date }}</td><td class="p-3"><div class="flex items-center gap-2"><img :src="booking.avatar" class="w-8 h-8 rounded-full"><div><p class="font-medium">{{ booking.candidat }}</p><p class="text-xs text-slate-500">{{ booking.email }}</p></div></div></td><td class="p-3"><img :src="booking.flag" class="w-5 h-3 inline mr-1">{{ booking.pays }}</td><td class="p-3">{{ booking.concours }}</td><td class="p-3">{{ booking.etablissement }}</td><td class="p-3"><span :class="booking.type === 'preinscription' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'" class="px-2 py-0.5 rounded-full text-xs">{{ booking.type === 'preinscription' ? 'Pré-inscription' : 'Demande' }}</span></td><td class="p-3"><span :class="booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded-full text-xs">{{ booking.status === 'pending' ? 'En attente' : booking.status === 'confirmed' ? 'Confirmé' : 'Annulé' }}</span></td><td class="p-3"><div class="flex gap-2"><button @click="viewBookingDetails(booking)" class="text-blue-600"><i class="fas fa-eye"></i></button><button @click="confirmBooking(booking)" class="text-green-600"><i class="fas fa-check-circle"></i></button><button @click="cancelBooking(booking)" class="text-red-600"><i class="fas fa-times-circle"></i></button></div></td></tr></tbody></table></div>
            </div>
          </div>

          <!-- SECTION CERTIFICATION -->
          <div v-show="activeSection === 'certification'" class="space-y-6">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 class="text-xl font-bold mb-4 pb-2 border-b flex items-center"><i class="fas fa-certificate text-primary mr-2"></i>Autorité de Certification (Super Admin)</h2>
              <p class="text-sm text-slate-500 mb-6">Définissez les règles globales de certification pour toutes les plateformes</p>
              
              <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-slate-50 rounded-xl p-4">
                  <h3 class="font-semibold mb-3"><i class="fas fa-sliders-h text-primary mr-2"></i>Règles de certification</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center"><span class="text-sm">Certificats activés</span><button @click="certificatesEnabled = !certificatesEnabled" :class="certificatesEnabled ? 'bg-green-500' : 'bg-red-500'" class="relative w-12 h-6 rounded-full transition"><div class="absolute w-5 h-5 bg-white rounded-full top-0.5 transition" :class="certificatesEnabled ? 'translate-x-6' : 'translate-x-1'"></div></button></div>
                    <div class="flex justify-between items-center"><span class="text-sm">Certificats automatiques</span><button @click="autoCertificates = !autoCertificates" :class="autoCertificates ? 'bg-green-500' : 'bg-red-500'" class="relative w-12 h-6 rounded-full transition"><div class="absolute w-5 h-5 bg-white rounded-full top-0.5 transition" :class="autoCertificates ? 'translate-x-6' : 'translate-x-1'"></div></button></div>
                    <div><label class="text-sm block mb-1">Score minimum (%):</label><input type="number" v-model="minScore" class="w-full p-2 border rounded-lg"></div>
                    <div><label class="text-sm block mb-1">Présence minimale (heures):</label><input type="number" v-model="minAttendance" class="w-full p-2 border rounded-lg"></div>
                  </div>
                </div>
                
                <div class="bg-slate-50 rounded-xl p-4">
                  <h3 class="font-semibold mb-3"><i class="fas fa-pen-fancy text-primary mr-2"></i>Signature officielle</h3>
                  <div class="space-y-3">
                    <div><label class="text-sm block mb-1">Nom du signataire:</label><input type="text" v-model="signatoryName" class="w-full p-2 border rounded-lg"></div>
                    <div><label class="text-sm block mb-1">Titre du signataire:</label><input type="text" v-model="signatoryTitle" class="w-full p-2 border rounded-lg"></div>
                    <div><label class="text-sm block mb-1">Logo officiel (URL):</label><input type="text" v-model="officialLogo" class="w-full p-2 border rounded-lg"></div>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="font-semibold mb-3"><i class="fas fa-file-alt text-primary mr-2"></i>Modèle de certificat</h3>
                <div class="bg-slate-50 rounded-xl p-4">
                  <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div><label class="text-sm block mb-1">Titre du certificat:</label><input type="text" v-model="certificateTitle" class="w-full p-2 border rounded-lg"></div>
                    <div><label class="text-sm block mb-1">Couleur du thème:</label><input type="color" v-model="certificateColor" class="w-full p-2 border rounded-lg h-10"></div>
                    <div><label class="text-sm block mb-1">Texte du pied de page:</label><input type="text" v-model="certificateFooter" class="w-full p-2 border rounded-lg"></div>
                    <div><label class="text-sm block mb-1">Validité (jours):</label><input type="number" v-model="certificateValidity" class="w-full p-2 border rounded-lg"></div>
                  </div>
                  <div class="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center"><i class="fas fa-image text-3xl text-slate-400 mb-2"></i><p class="text-sm text-slate-500">Aperçu du modèle de certificat</p><div class="mt-3 p-4 border rounded-lg" :style="{borderColor: certificateColor}"><p class="text-center"><strong>{{ certificateTitle }}</strong></p><p class="text-sm mt-2">Attestation délivrée à <span class="font-semibold">[Nom de l'étudiant]</span></p><p class="text-sm">pour avoir complété avec succès la formation <span class="font-semibold">[Nom de la formation]</span></p><p class="text-xs text-slate-400 mt-2">Délivré le [Date] • Valide {{ certificateValidity }} jours</p></div></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-4"><h3 class="font-semibold"><i class="fas fa-list text-primary mr-2"></i>Certificats émis (15 derniers)</h3><button class="text-primary text-sm"><i class="fas fa-sync-alt mr-1"></i>Rafraîchir</button></div>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="bg-slate-50">
                      <tr>
                        <th class="p-3">ID</th>
                        <th class="p-3">Étudiant</th>
                        <th class="p-3">Formation</th>
                        <th class="p-3">Date émission</th>
                        <th class="p-3">Validité</th>
                        <th class="p-3">Statut</th>
                        <th class="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="cert in recentCertificates" :key="cert.id" class="border-t hover:bg-slate-50">
                        <td class="p-3">#{{ cert.id }}</td>
                        <td class="p-3">{{ cert.student }}</td>
                        <td class="p-3">{{ cert.course }}</td>
                        <td class="p-3">{{ cert.date }}</td>
                        <td class="p-3">{{ cert.expiry }}</td>
                        <td class="p-3"><span :class="cert.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'" class="px-2 py-0.5 rounded-full text-xs">{{ cert.status === 'active' ? 'Actif' : 'Expiré' }}</span></td>
                        <td class="p-3"><button class="text-blue-600 mr-2"><i class="fas fa-eye"></i></button><button class="text-red-600"><i class="fas fa-trash"></i></button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex gap-3 mt-6"><button @click="saveCertificationSettings" class="flex-1 py-2.5 bg-primary text-white rounded-xl font-semibold"><i class="fas fa-save mr-2"></i>Enregistrer les paramètres</button><button @click="generateBulkCertificates" class="flex-1 py-2.5 border border-primary text-primary rounded-xl font-semibold"><i class="fas fa-layer-group mr-2"></i>Génération massive</button></div>
            </div>
          </div>

          <!-- SECTION PARAMÈTRES -->
          <div v-show="activeSection === 'settings'" class="space-y-6">
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 class="text-xl font-bold mb-4 pb-2 border-b flex items-center"><i class="fas fa-sliders-h text-primary mr-2"></i>Configuration plateforme</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="flex justify-between items-center p-4 bg-slate-50 rounded-xl"><div><p class="font-semibold">Nom de la plateforme</p><p class="text-sm text-slate-500">Gradus Aura</p></div><button @click="editPlatformName" class="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary/10"><i class="fas fa-edit mr-1"></i>Modifier</button></div>
                <div class="flex justify-between items-center p-4 bg-slate-50 rounded-xl"><div><p class="font-semibold">Mode maintenance</p><p class="text-sm text-slate-500">Désactiver l'accès temporairement</p></div><button @click="maintenanceMode = !maintenanceMode" :class="maintenanceMode ? 'bg-red-500' : 'bg-green-500'" class="relative w-12 h-6 rounded-full transition"><div class="absolute w-5 h-5 bg-white rounded-full top-0.5 transition" :class="maintenanceMode ? 'translate-x-6' : 'translate-x-1'"></div></button></div>
                <div class="flex justify-between items-center p-4 bg-slate-50 rounded-xl"><div><p class="font-semibold">Inscriptions</p><p class="text-sm text-slate-500">Autoriser les nouvelles inscriptions</p></div><button @click="registrationsOpen = !registrationsOpen" :class="registrationsOpen ? 'bg-green-500' : 'bg-red-500'" class="relative w-12 h-6 rounded-full transition"><div class="absolute w-5 h-5 bg-white rounded-full top-0.5 transition" :class="registrationsOpen ? 'translate-x-6' : 'translate-x-1'"></div></button></div>
                <div class="flex justify-between items-center p-4 bg-slate-50 rounded-xl"><div><p class="font-semibold">2FA Admins</p><p class="text-sm text-slate-500">Double authentification</p></div><button @click="twoFAEnabled = !twoFAEnabled" :class="twoFAEnabled ? 'bg-green-500' : 'bg-red-500'" class="relative w-12 h-6 rounded-full transition"><div class="absolute w-5 h-5 bg-white rounded-full top-0.5 transition" :class="twoFAEnabled ? 'translate-x-6' : 'translate-x-1'"></div></button></div>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"><h2 class="text-xl font-bold mb-4 pb-2 border-b flex items-center"><i class="fas fa-key text-primary mr-2"></i>Gestion API</h2>
              <div class="space-y-4"><div class="flex justify-between items-center p-4 bg-slate-50 rounded-xl"><div><p class="font-semibold">Clé API publique</p><code class="text-xs bg-white px-2 py-1 rounded">pk_live_••••1234</code></div><button class="text-primary text-sm"><i class="fas fa-copy mr-1"></i>Copier</button></div>
              <div class="flex justify-between items-center p-4 bg-slate-50 rounded-xl"><div><p class="font-semibold">Clé API secrète</p><code class="text-xs bg-white px-2 py-1 rounded">sk_live_••••5678</code></div><button class="text-primary text-sm"><i class="fas fa-copy mr-1"></i>Copier</button></div>
              <button class="w-full py-2 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600"><i class="fas fa-sync-alt mr-2"></i>Regénérer les clés</button></div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"><h2 class="text-xl font-bold mb-4 pb-2 border-b flex items-center"><i class="fas fa-users-cog text-primary mr-2"></i>Rôles & Permissions</h2>
              <div class="grid md:grid-cols-2 gap-3"><div v-for="role in roles" :key="role.name" class="flex justify-between items-center p-4 bg-slate-50 rounded-xl"><div><p class="font-semibold">{{ role.name }}</p><p class="text-sm text-slate-500">{{ role.users }} utilisateurs</p></div><button class="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary/10">Configurer</button></div></div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- MODALS -->
    <div v-if="showTenantModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up" @click.self="showTenantModal = false">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold"><i class="fas fa-plus-circle text-primary mr-2"></i>Ajouter une plateforme</h2><button @click="showTenantModal = false" class="text-slate-400 hover:text-slate-600"><i class="fas fa-times text-xl"></i></button></div>
        <form @submit.prevent="createTenant"><div class="mb-4"><label class="block text-sm font-semibold mb-2"><i class="fas fa-building text-primary mr-1"></i>Nom</label><input v-model="newTenant.name" placeholder="Ex: Université de Paris" class="w-full p-3 border rounded-xl focus:outline-none focus:border-primary"></div>
        <div class="mb-4"><label class="block text-sm font-semibold mb-2"><i class="fas fa-tag text-primary mr-1"></i>Type</label><select v-model="newTenant.type" class="w-full p-3 border rounded-xl"><option value="university">Université</option><option value="training">Centre de formation</option></select></div>
        <div class="mb-4"><label class="block text-sm font-semibold mb-2"><i class="fas fa-envelope text-primary mr-1"></i>Email admin</label><input v-model="newTenant.adminEmail" placeholder="admin@exemple.com" class="w-full p-3 border rounded-xl"></div>
        <div class="flex gap-3 mt-6"><button type="button" @click="showTenantModal = false" class="flex-1 py-2 bg-slate-100 rounded-xl font-semibold">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl font-semibold"><i class="fas fa-save mr-2"></i>Créer</button></div></form>
      </div>
    </div>

    <div v-if="showTrainerModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up" @click.self="showTrainerModal = false">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold"><i class="fas fa-user-plus text-primary mr-2"></i>Ajouter un formateur</h2><button @click="showTrainerModal = false" class="text-slate-400 hover:text-slate-600"><i class="fas fa-times text-xl"></i></button></div>
        <form @submit.prevent="saveTrainer"><div><label class="block text-sm font-semibold mb-2"><i class="fas fa-user text-primary mr-1"></i>Nom</label><input v-model="trainerForm.name" class="w-full p-3 border rounded-xl"></div>
        <div class="mt-3"><label class="block text-sm font-semibold mb-2"><i class="fas fa-envelope text-primary mr-1"></i>Email</label><input v-model="trainerForm.email" class="w-full p-3 border rounded-xl"></div>
        <div class="mt-3"><label class="block text-sm font-semibold mb-2"><i class="fas fa-graduation-cap text-primary mr-1"></i>Spécialité</label><input v-model="trainerForm.specialite" class="w-full p-3 border rounded-xl"></div>
        <div class="mt-3"><label class="block text-sm font-semibold mb-2"><i class="fas fa-map-marker-alt text-primary mr-1"></i>Pays</label><select v-model="trainerForm.pays" class="w-full p-3 border rounded-xl"><option value="">Sélectionner</option><option v-for="c in allCountries" :key="c.code" :value="c.nom">{{ c.nom }}</option></select></div>
        <div class="flex gap-3 mt-6"><button type="button" @click="showTrainerModal = false" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl"><i class="fas fa-save mr-2"></i>Enregistrer</button></div></form>
      </div>
    </div>

    <div v-if="showCourseModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up" @click.self="showCourseModal = false">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold"><i class="fas fa-plus-circle text-primary mr-2"></i>Ajouter une formation</h2><button @click="showCourseModal = false" class="text-slate-400 hover:text-slate-600"><i class="fas fa-times text-xl"></i></button></div>
        <form @submit.prevent="saveCourse"><div class="mb-4"><label class="block text-sm font-semibold mb-2"><i class="fas fa-heading text-primary mr-1"></i>Titre</label><input v-model="courseForm.title" class="w-full p-3 border rounded-xl"></div>
        <div class="mb-4"><label class="block text-sm font-semibold mb-2"><i class="fas fa-align-left text-primary mr-1"></i>Description</label><textarea v-model="courseForm.description" rows="2" class="w-full p-3 border rounded-xl"></textarea></div>
        <div class="grid grid-cols-2 gap-3 mb-4"><div><label><i class="fas fa-tag text-primary mr-1"></i>Catégorie</label><select v-model="courseForm.category" class="w-full p-3 border rounded-xl"><option>Data Science</option><option>Développement Web</option><option>Marketing</option></select></div><div><label><i class="fas fa-dollar-sign text-primary mr-1"></i>Prix</label><input type="number" v-model="courseForm.price" class="w-full p-3 border rounded-xl"></div></div>
        <div class="flex gap-3 mt-6"><button type="button" @click="showCourseModal = false" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl"><i class="fas fa-save mr-2"></i>Enregistrer</button></div></form>
      </div>
    </div>

    <div v-if="showProfile" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up" @click.self="showProfile = false">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold"><i class="fas fa-user-edit text-primary mr-2"></i>Modifier le profil</h2><button @click="showProfile = false" class="text-slate-400 hover:text-slate-600"><i class="fas fa-times text-xl"></i></button></div>
        <form @submit.prevent="saveProfile"><div class="flex justify-center mb-4"><div class="relative"><img :src="currentAdmin.avatar" class="w-24 h-24 rounded-full border-4 border-primary"><button type="button" class="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 text-xs"><i class="fas fa-camera"></i></button></div></div>
        <div class="mb-3"><label class="block text-sm font-semibold mb-1"><i class="fas fa-user text-primary mr-1"></i>Nom</label><input v-model="profileForm.name" class="w-full p-3 border rounded-xl"></div>
        <div class="mb-3"><label class="block text-sm font-semibold mb-1"><i class="fas fa-envelope text-primary mr-1"></i>Email</label><input v-model="profileForm.email" class="w-full p-3 border rounded-xl"></div>
        <div class="mb-3"><label class="block text-sm font-semibold mb-1"><i class="fas fa-phone text-primary mr-1"></i>Téléphone</label><input v-model="profileForm.phone" class="w-full p-3 border rounded-xl"></div>
        <div class="flex gap-3 mt-6"><button type="button" @click="showProfile = false" class="flex-1 py-2 bg-slate-100 rounded-xl">Annuler</button><button type="submit" class="flex-1 py-2 bg-primary text-white rounded-xl"><i class="fas fa-save mr-2"></i>Enregistrer</button></div></form>
      </div>
    </div>

    <div v-if="showNotifications" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up" @click.self="showNotifications = false">
      <div class="bg-white rounded-2xl w-full max-w-md"><div class="p-4 border-b"><h3 class="font-bold"><i class="fas fa-bell text-primary mr-2"></i>Notifications</h3></div><div class="max-h-96 overflow-y-auto"><div v-for="n in notificationsList" :key="n.id" class="p-4 border-b hover:bg-slate-50"><p class="font-medium">{{ n.title }}</p><p class="text-sm text-slate-500">{{ n.message }}</p><p class="text-xs text-slate-400 mt-1">{{ n.time }}</p></div></div></div>
    </div>

    <div v-if="selectedBooking" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up" @click.self="selectedBooking = null">
      <div class="bg-white rounded-2xl p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-4"><h3 class="text-xl font-bold"><i class="fas fa-info-circle text-primary mr-2"></i>Détails</h3><button @click="selectedBooking = null" class="text-slate-400"><i class="fas fa-times text-xl"></i></button></div>
        <div class="space-y-3"><div class="flex justify-between p-3 bg-slate-50 rounded-xl"><span class="font-medium"><i class="fas fa-user text-primary mr-2"></i>Candidat</span><span>{{ selectedBooking.candidat }}</span></div><div class="flex justify-between p-3 bg-slate-50 rounded-xl"><span class="font-medium"><i class="fas fa-envelope text-primary mr-2"></i>Email</span><span>{{ selectedBooking.email }}</span></div><div class="flex justify-between p-3 bg-slate-50 rounded-xl"><span class="font-medium"><i class="fas fa-phone text-primary mr-2"></i>Téléphone</span><span>{{ selectedBooking.phone }}</span></div><div class="flex justify-between p-3 bg-slate-50 rounded-xl"><span class="font-medium"><i class="fas fa-map-marker-alt text-primary mr-2"></i>Pays</span><span><img :src="selectedBooking.flag" class="w-5 h-3 inline mr-1">{{ selectedBooking.pays }}</span></div><div class="flex justify-between p-3 bg-slate-50 rounded-xl"><span class="font-medium"><i class="fas fa-trophy text-primary mr-2"></i>Concours</span><span>{{ selectedBooking.concours }}</span></div><div class="flex justify-between p-3 bg-slate-50 rounded-xl"><span class="font-medium"><i class="fas fa-university text-primary mr-2"></i>Établissement</span><span>{{ selectedBooking.etablissement }}</span></div><div class="p-3 bg-slate-50 rounded-xl"><span class="font-medium"><i class="fas fa-comment text-primary mr-2"></i>Message</span><p class="mt-2">{{ selectedBooking.message }}</p></div></div>
        <div class="flex gap-3 mt-6"><button @click="confirmBooking(selectedBooking)" class="flex-1 py-2 bg-green-500 text-white rounded-lg"><i class="fas fa-check mr-2"></i>Confirmer</button><button @click="selectedBooking = null" class="flex-1 py-2 border rounded-lg">Fermer</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  name: 'SuperAdminDashboard',
  setup() {
    // THEME
    const isDarkMode = ref(false)
    const toggleTheme = () => { 
      isDarkMode.value = !isDarkMode.value
      document.documentElement.classList.toggle('dark', isDarkMode.value)
      updateGlobeBackground()
    }

    // STATE
    const sidebarCollapsed = ref(false)
    const activeSection = ref('dashboard')
    const showNotifications = ref(false)
    const showProfile = ref(false)
    const showTenantModal = ref(false)
    const showTrainerModal = ref(false)
    const showCourseModal = ref(false)
    const unreadCount = ref(15)
    const selectedCountry = ref(null)
    const selectedBooking = ref(null)
    const currentLang = ref('fr')
    
    // Settings
    const maintenanceMode = ref(false)
    const registrationsOpen = ref(true)
    const twoFAEnabled = ref(true)
    
    // Certification
    const certificatesEnabled = ref(true)
    const autoCertificates = ref(true)
    const minScore = ref(70)
    const minAttendance = ref(40)
    const signatoryName = ref('Dr. Jean Dupont')
    const signatoryTitle = ref('Directeur Général, Gradus Aura')
    const officialLogo = ref('https://gradusaura.com/logo.png')
    const certificateTitle = ref('CERTIFICAT DE RÉUSSITE')
    const certificateColor = ref('#6366f1')
    const certificateFooter = ref('Gradus Aura - Plateforme éducative internationale')
    const certificateValidity = ref(365)
    
    // Admin profil
    const currentAdmin = ref({
      name: 'Dr. Jean Dupont',
      email: 'superadmin@gradusaura.com',
      phone: '+221 78 123 45 67',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    })
    const profileForm = ref({ name: '', email: '', phone: '' })
    
    // Formulaires
    const newTenant = ref({ name: '', type: 'university', adminEmail: '' })
    const trainerForm = ref({ name: '', email: '', specialite: '', pays: '' })
    const courseForm = ref({ title: '', description: '', category: 'Data Science', price: 0 })
    
    // Commissions
    const platformCommission = ref(10)
    const trainerCommission = ref(90)
    
    // Réservations
    const bookingSearch = ref('')
    const bookingFilter = ref({ type: 'all', continent: 'all' })
    
    // Langue
    const toggleLanguage = () => { currentLang.value = currentLang.value === 'fr' ? 'en' : 'fr' }
    
    // Navigation
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
      { id: 'platforms', label: 'Plateformes', icon: 'fas fa-building' },
      { id: 'trainers', label: 'Formateurs', icon: 'fas fa-chalkboard-user' },
      { id: 'courses', label: 'Formations', icon: 'fas fa-book' },
      { id: 'analytics', label: 'Analyses', icon: 'fas fa-chart-line' },
      { id: 'financial', label: 'Finances', icon: 'fas fa-chart-pie' },
      { id: 'security', label: 'Sécurité', icon: 'fas fa-shield-alt' },
      { id: 'ai', label: 'IA', icon: 'fas fa-brain' },
      { id: 'bookings', label: 'Réservations', icon: 'fas fa-calendar-check' },
      { id: 'certification', label: 'Certification', icon: 'fas fa-certificate' },
      { id: 'settings', label: 'Paramètres', icon: 'fas fa-cogs' }
    ]
    
    const activeMenuTitle = computed(() => {
      const titles = { dashboard: 'Tableau de bord', platforms: 'Plateformes', trainers: 'Formateurs', courses: 'Formations', analytics: 'Analyses', financial: 'Finances', security: 'Sécurité', ai: 'IA', bookings: 'Réservations', certification: 'Certification', settings: 'Paramètres' }
      return titles[activeSection.value] || 'SuperAdmin'
    })
    
    // FILTRES CONTINENT
    const continentFilters = ref([
      { name: 'Tous', icon: 'fas fa-globe' },
      { name: 'Afrique', icon: 'fas fa-map-marker-alt' },
      { name: 'Europe', icon: 'fas fa-map-marker-alt' },
      { name: 'Asie', icon: 'fas fa-map-marker-alt' },
      { name: 'Amérique du Nord', icon: 'fas fa-map-marker-alt' },
      { name: 'Amérique du Sud', icon: 'fas fa-map-marker-alt' },
      { name: 'Océanie', icon: 'fas fa-map-marker-alt' }
    ])
    
    const countrySearch = ref('')
    const selectedContinent = ref('Tous')
    
    // 52 PAYS COMPLETS
    const allCountries = ref([
      // AFRIQUE
      { code: 'sn', nom: 'Sénégal', continent: 'Afrique', flag: 'https://flagcdn.com/sn.svg', currency: 'Franc CFA', users: '145k', revenue: '$1.2M', courses: 245, activity: 'high', schools: ['ESP', 'UCAD', 'Polytechnique de Thiès'], lat: 14.7167, lng: -17.4677 },
      { code: 'cm', nom: 'Cameroun', continent: 'Afrique', flag: 'https://flagcdn.com/cm.svg', currency: 'Franc CFA', users: '98k', revenue: '$0.9M', courses: 178, activity: 'medium', schools: ['Université de Yaoundé', 'Université de Douala'], lat: 3.8480, lng: 11.5021 },
      { code: 'ci', nom: "Côte d'Ivoire", continent: 'Afrique', flag: 'https://flagcdn.com/ci.svg', currency: 'Franc CFA', users: '87k', revenue: '$0.8M', courses: 156, activity: 'medium', schools: ['Université Félix Houphouët-Boigny'], lat: 7.5399, lng: -5.5471 },
      { code: 'ng', nom: 'Nigéria', continent: 'Afrique', flag: 'https://flagcdn.com/ng.svg', currency: 'Naira', users: '328k', revenue: '$3.4M', courses: 512, activity: 'high', schools: ['Université de Lagos', 'Université d\'Ibadan'], lat: 9.0820, lng: 8.6753 },
      { code: 'za', nom: 'Afrique du Sud', continent: 'Afrique', flag: 'https://flagcdn.com/za.svg', currency: 'Rand', users: '187k', revenue: '$2.1M', courses: 389, activity: 'medium', schools: ['Université du Cap', 'Stellenbosch'], lat: -30.5595, lng: 22.9375 },
      { code: 'ma', nom: 'Maroc', continent: 'Afrique', flag: 'https://flagcdn.com/ma.svg', currency: 'Dirham', users: '167k', revenue: '$1.8M', courses: 312, activity: 'high', schools: ['Université Mohammed V'], lat: 31.7917, lng: -7.0926 },
      { code: 'eg', nom: 'Égypte', continent: 'Afrique', flag: 'https://flagcdn.com/eg.svg', currency: 'Livre égyptienne', users: '178k', revenue: '$2.0M', courses: 345, activity: 'medium', schools: ['Université du Caire'], lat: 26.8206, lng: 30.8025 },
      { code: 'ke', nom: 'Kenya', continent: 'Afrique', flag: 'https://flagcdn.com/ke.svg', currency: 'Shilling', users: '126k', revenue: '$1.5M', courses: 267, activity: 'high', schools: ['Université de Nairobi'], lat: -1.2921, lng: 36.8219 },
      { code: 'gh', nom: 'Ghana', continent: 'Afrique', flag: 'https://flagcdn.com/gh.svg', currency: 'Cedi', users: '98k', revenue: '$0.8M', courses: 178, activity: 'medium', schools: ['Université du Ghana'], lat: 7.9465, lng: -1.0232 },
      { code: 'tn', nom: 'Tunisie', continent: 'Afrique', flag: 'https://flagcdn.com/tn.svg', currency: 'Dinar', users: '78k', revenue: '$0.6M', courses: 145, activity: 'medium', schools: ['Université de Tunis'], lat: 33.8869, lng: 9.5375 },
      { code: 'dz', nom: 'Algérie', continent: 'Afrique', flag: 'https://flagcdn.com/dz.svg', currency: 'Dinar', users: '145k', revenue: '$1.1M', courses: 234, activity: 'medium', schools: ['Université d\'Alger'], lat: 28.0339, lng: 1.6596 },
      { code: 'ml', nom: 'Mali', continent: 'Afrique', flag: 'https://flagcdn.com/ml.svg', currency: 'Franc CFA', users: '45k', revenue: '$0.4M', courses: 98, activity: 'low', schools: ['Université de Bamako'], lat: 17.5707, lng: -3.9962 },
      { code: 'bf', nom: 'Burkina Faso', continent: 'Afrique', flag: 'https://flagcdn.com/bf.svg', currency: 'Franc CFA', users: '52k', revenue: '$0.4M', courses: 105, activity: 'low', schools: ['Université de Ouagadougou'], lat: 12.2383, lng: -1.5616 },
      { code: 'bj', nom: 'Bénin', continent: 'Afrique', flag: 'https://flagcdn.com/bj.svg', currency: 'Franc CFA', users: '48k', revenue: '$0.4M', courses: 98, activity: 'low', schools: ['Université d\'Abomey-Calavi'], lat: 9.3077, lng: 2.3158 },
      { code: 'tg', nom: 'Togo', continent: 'Afrique', flag: 'https://flagcdn.com/tg.svg', currency: 'Franc CFA', users: '42k', revenue: '$0.3M', courses: 89, activity: 'low', schools: ['Université de Lomé'], lat: 8.6195, lng: 0.8248 },
      // EUROPE
      { code: 'fr', nom: 'France', continent: 'Europe', flag: 'https://flagcdn.com/fr.svg', currency: 'Euro', users: '356k', revenue: '$4.5M', courses: 890, activity: 'high', schools: ['Sorbonne', 'HEC'], lat: 46.2276, lng: 2.2137 },
      { code: 'de', nom: 'Allemagne', continent: 'Europe', flag: 'https://flagcdn.com/de.svg', currency: 'Euro', users: '312k', revenue: '$4.2M', courses: 845, activity: 'high', schools: ['TU Munich', 'Heidelberg'], lat: 51.1657, lng: 10.4515 },
      { code: 'gb', nom: 'Royaume-Uni', continent: 'Europe', flag: 'https://flagcdn.com/gb.svg', currency: 'Livre sterling', users: '298k', revenue: '$3.9M', courses: 798, activity: 'high', schools: ['Oxford', 'Cambridge'], lat: 55.3781, lng: -3.4360 },
      { code: 'it', nom: 'Italie', continent: 'Europe', flag: 'https://flagcdn.com/it.svg', currency: 'Euro', users: '189k', revenue: '$2.3M', courses: 456, activity: 'high', schools: ['Université de Bologne'], lat: 41.8719, lng: 12.5674 },
      { code: 'es', nom: 'Espagne', continent: 'Europe', flag: 'https://flagcdn.com/es.svg', currency: 'Euro', users: '178k', revenue: '$2.1M', courses: 423, activity: 'high', schools: ['Université Complutense'], lat: 40.4637, lng: -3.7492 },
      { code: 'nl', nom: 'Pays-Bas', continent: 'Europe', flag: 'https://flagcdn.com/nl.svg', currency: 'Euro', users: '156k', revenue: '$1.8M', courses: 367, activity: 'high', schools: ['Université d\'Amsterdam'], lat: 52.1326, lng: 5.2913 },
      { code: 'ch', nom: 'Suisse', continent: 'Europe', flag: 'https://flagcdn.com/ch.svg', currency: 'Franc suisse', users: '145k', revenue: '$1.6M', courses: 345, activity: 'high', schools: ['ETH Zurich', 'EPFL'], lat: 46.8182, lng: 8.2275 },
      { code: 'be', nom: 'Belgique', continent: 'Europe', flag: 'https://flagcdn.com/be.svg', currency: 'Euro', users: '112k', revenue: '$1.2M', courses: 267, activity: 'high', schools: ['KU Leuven'], lat: 50.8503, lng: 4.3517 },
      { code: 'pt', nom: 'Portugal', continent: 'Europe', flag: 'https://flagcdn.com/pt.svg', currency: 'Euro', users: '98k', revenue: '$0.9M', courses: 234, activity: 'medium', schools: ['Université de Lisbonne'], lat: 39.3999, lng: -8.2245 },
      { code: 'se', nom: 'Suède', continent: 'Europe', flag: 'https://flagcdn.com/se.svg', currency: 'Couronne', users: '123k', revenue: '$1.3M', courses: 289, activity: 'high', schools: ['Université de Stockholm'], lat: 60.1282, lng: 18.6435 },
      { code: 'no', nom: 'Norvège', continent: 'Europe', flag: 'https://flagcdn.com/no.svg', currency: 'Couronne', users: '89k', revenue: '$0.8M', courses: 212, activity: 'medium', schools: ['Université d\'Oslo'], lat: 60.4720, lng: 8.4689 },
      { code: 'ru', nom: 'Russie', continent: 'Europe', flag: 'https://flagcdn.com/ru.svg', currency: 'Rouble', users: '267k', revenue: '$2.5M', courses: 567, activity: 'medium', schools: ['Université de Moscou'], lat: 61.5240, lng: 105.3188 },
      // ASIE
      { code: 'cn', nom: 'Chine', continent: 'Asie', flag: 'https://flagcdn.com/cn.svg', currency: 'Yuan', users: '845k', revenue: '$12.5M', courses: 1890, activity: 'high', schools: ['Université de Pékin', 'Tsinghua'], lat: 35.8617, lng: 104.1954 },
      { code: 'in', nom: 'Inde', continent: 'Asie', flag: 'https://flagcdn.com/in.svg', currency: 'Roupie', users: '689k', revenue: '$8.9M', courses: 1456, activity: 'high', schools: ['IIT Bombay'], lat: 20.5937, lng: 78.9629 },
      { code: 'jp', nom: 'Japon', continent: 'Asie', flag: 'https://flagcdn.com/jp.svg', currency: 'Yen', users: '312k', revenue: '$3.8M', courses: 678, activity: 'high', schools: ['Université de Tokyo'], lat: 36.2048, lng: 138.2529 },
      { code: 'kr', nom: 'Corée du Sud', continent: 'Asie', flag: 'https://flagcdn.com/kr.svg', currency: 'Won', users: '256k', revenue: '$2.9M', courses: 567, activity: 'high', schools: ['Université de Séoul'], lat: 35.9078, lng: 127.7669 },
      { code: 'id', nom: 'Indonésie', continent: 'Asie', flag: 'https://flagcdn.com/id.svg', currency: 'Roupie', users: '187k', revenue: '$2.3M', courses: 398, activity: 'medium', schools: ['Université d\'Indonésie'], lat: -0.7893, lng: 113.9213 },
      { code: 'vn', nom: 'Vietnam', continent: 'Asie', flag: 'https://flagcdn.com/vn.svg', currency: 'Dong', users: '145k', revenue: '$1.7M', courses: 287, activity: 'medium', schools: ['Université de Hanoï'], lat: 14.0583, lng: 108.2772 },
      { code: 'th', nom: 'Thaïlande', continent: 'Asie', flag: 'https://flagcdn.com/th.svg', currency: 'Baht', users: '134k', revenue: '$1.4M', courses: 234, activity: 'medium', schools: ['Université Chulalongkorn'], lat: 15.8700, lng: 100.9925 },
      { code: 'my', nom: 'Malaisie', continent: 'Asie', flag: 'https://flagcdn.com/my.svg', currency: 'Ringgit', users: '123k', revenue: '$1.1M', courses: 198, activity: 'medium', schools: ['Université de Malaya'], lat: 4.2105, lng: 101.9758 },
      { code: 'pk', nom: 'Pakistan', continent: 'Asie', flag: 'https://flagcdn.com/pk.svg', currency: 'Roupie', users: '156k', revenue: '$1.6M', courses: 278, activity: 'medium', schools: ['Université du Punjab'], lat: 30.3753, lng: 69.3451 },
      { code: 'tr', nom: 'Turquie', continent: 'Asie', flag: 'https://flagcdn.com/tr.svg', currency: 'Lire', users: '178k', revenue: '$2.1M', courses: 345, activity: 'high', schools: ['Université d\'Istanbul'], lat: 38.9637, lng: 35.2433 },
      { code: 'sa', nom: 'Arabie Saoudite', continent: 'Asie', flag: 'https://flagcdn.com/sa.svg', currency: 'Riyal', users: '145k', revenue: '$1.9M', courses: 289, activity: 'medium', schools: ['Université King Saud'], lat: 23.8859, lng: 45.0792 },
      { code: 'ph', nom: 'Philippines', continent: 'Asie', flag: 'https://flagcdn.com/ph.svg', currency: 'Peso', users: '98k', revenue: '$0.9M', courses: 189, activity: 'medium', schools: ['Université des Philippines'], lat: 12.8797, lng: 121.7740 },
      // AMÉRIQUE DU NORD
      { code: 'us', nom: 'États-Unis', continent: 'Amérique du Nord', flag: 'https://flagcdn.com/us.svg', currency: 'Dollar US', users: '534k', revenue: '$8.9M', courses: 1234, activity: 'high', schools: ['MIT', 'Harvard', 'Stanford'], lat: 37.0902, lng: -95.7129 },
      { code: 'ca', nom: 'Canada', continent: 'Amérique du Nord', flag: 'https://flagcdn.com/ca.svg', currency: 'Dollar CAD', users: '189k', revenue: '$2.8M', courses: 567, activity: 'high', schools: ['Université de Toronto', 'UBC'], lat: 56.1304, lng: -106.3468 },
      { code: 'mx', nom: 'Mexique', continent: 'Amérique du Nord', flag: 'https://flagcdn.com/mx.svg', currency: 'Peso', users: '167k', revenue: '$1.9M', courses: 345, activity: 'medium', schools: ['UNAM', 'ITESM'], lat: 23.6345, lng: -102.5528 },
      { code: 'cu', nom: 'Cuba', continent: 'Amérique du Nord', flag: 'https://flagcdn.com/cu.svg', currency: 'Peso', users: '56k', revenue: '$0.5M', courses: 112, activity: 'low', schools: ['Université de La Havane'], lat: 21.5218, lng: -77.7812 },
      { code: 'ht', nom: 'Haïti', continent: 'Amérique du Nord', flag: 'https://flagcdn.com/ht.svg', currency: 'Gourde', users: '34k', revenue: '$0.3M', courses: 78, activity: 'low', schools: ['Université d\'État d\'Haïti'], lat: 18.9712, lng: -72.2852 },
      // AMÉRIQUE DU SUD
      { code: 'br', nom: 'Brésil', continent: 'Amérique du Sud', flag: 'https://flagcdn.com/br.svg', currency: 'Real', users: '289k', revenue: '$3.2M', courses: 678, activity: 'high', schools: ['USP', 'UNICAMP'], lat: -14.2350, lng: -51.9253 },
      { code: 'ar', nom: 'Argentine', continent: 'Amérique du Sud', flag: 'https://flagcdn.com/ar.svg', currency: 'Peso', users: '145k', revenue: '$1.2M', courses: 245, activity: 'medium', schools: ['Université de Buenos Aires'], lat: -38.4161, lng: -63.6167 },
      { code: 'co', nom: 'Colombie', continent: 'Amérique du Sud', flag: 'https://flagcdn.com/co.svg', currency: 'Peso', users: '156k', revenue: '$1.4M', courses: 278, activity: 'medium', schools: ['Université des Andes'], lat: 4.5709, lng: -74.2973 },
      { code: 'cl', nom: 'Chili', continent: 'Amérique du Sud', flag: 'https://flagcdn.com/cl.svg', currency: 'Peso', users: '134k', revenue: '$0.9M', courses: 189, activity: 'medium', schools: ['Université du Chili'], lat: -35.6751, lng: -71.5430 },
      { code: 'pe', nom: 'Pérou', continent: 'Amérique du Sud', flag: 'https://flagcdn.com/pe.svg', currency: 'Sol', users: '98k', revenue: '$0.8M', courses: 167, activity: 'medium', schools: ['Université nationale de San Marcos'], lat: -9.1900, lng: -75.0152 },
      { code: 've', nom: 'Venezuela', continent: 'Amérique du Sud', flag: 'https://flagcdn.com/ve.svg', currency: 'Bolivar', users: '87k', revenue: '$0.7M', courses: 145, activity: 'low', schools: ['UCV'], lat: 6.4238, lng: -66.5897 },
      { code: 'uy', nom: 'Uruguay', continent: 'Amérique du Sud', flag: 'https://flagcdn.com/uy.svg', currency: 'Peso', users: '56k', revenue: '$0.5M', courses: 112, activity: 'medium', schools: ['UDELAR'], lat: -32.5228, lng: -55.7658 },
      { code: 'py', nom: 'Paraguay', continent: 'Amérique du Sud', flag: 'https://flagcdn.com/py.svg', currency: 'Guarani', users: '45k', revenue: '$0.4M', courses: 98, activity: 'low', schools: ['UNA'], lat: -23.4425, lng: -58.4438 },
      // OCÉANIE
      { code: 'au', nom: 'Australie', continent: 'Océanie', flag: 'https://flagcdn.com/au.svg', currency: 'Dollar AUD', users: '192k', revenue: '$2.7M', courses: 478, activity: 'high', schools: ['Université de Melbourne', 'Université de Sydney'], lat: -25.2744, lng: 133.7751 },
      { code: 'nz', nom: 'Nouvelle-Zélande', continent: 'Océanie', flag: 'https://flagcdn.com/nz.svg', currency: 'Dollar NZD', users: '98k', revenue: '$0.9M', courses: 189, activity: 'medium', schools: ['Université d\'Auckland'], lat: -40.9006, lng: 174.8860 }
    ])
    
    // Computed for filtered countries
    const filteredCountries = computed(() => {
      let result = allCountries.value
      if (selectedContinent.value !== 'Tous') {
        result = result.filter(c => c.continent === selectedContinent.value)
      }
      if (countrySearch.value) {
        result = result.filter(c => c.nom.toLowerCase().includes(countrySearch.value.toLowerCase()))
      }
      return result
    })
    
    // Methods
    const getContinentCount = (continentName) => {
      if (continentName === 'Tous') return allCountries.value.length
      return allCountries.value.filter(c => c.continent === continentName).length
    }
    
    const getActivityColorClass = (activity) => {
      if (activity === 'high') return 'bg-green-500'
      if (activity === 'medium') return 'bg-yellow-500'
      return 'bg-red-500'
    }
    
    const getActivityLabel = (activity) => {
      if (activity === 'high') return 'Très active'
      if (activity === 'medium') return 'Modérément active'
      return 'Peu active'
    }
    
    const showCountryDetails = (country) => {
      selectedCountry.value = country
    }
    
    // 15 KPIs
    const dashboardKPIs = ref([
      { icon: 'fas fa-users', value: '2.5M', label: 'Utilisateurs', trend: '+15%' },
      { icon: 'fas fa-building', value: '58', label: 'Plateformes', trend: '+5' },
      { icon: 'fas fa-dollar-sign', value: '$6.8M', label: 'Revenus', trend: '+22%' },
      { icon: 'fas fa-book', value: '2.1k', label: 'Formations', trend: '+12%' },
      { icon: 'fas fa-chalkboard-user', value: '345', label: 'Formateurs', trend: '+8%' },
      { icon: 'fas fa-chart-line', value: '82%', label: 'Rétention', trend: '+6%' },
      { icon: 'fas fa-percent', value: '28%', label: 'Conversion', trend: '+3%' },
      { icon: 'fas fa-star', value: '4.9', label: 'Note moyenne', trend: '+0.1' },
      { icon: 'fas fa-clock', value: '26m', label: 'Session', trend: '+2m' },
      { icon: 'fas fa-calendar-check', value: '245', label: 'Réservations', trend: '+18%' },
      { icon: 'fas fa-trophy', value: '89', label: 'Concours', trend: '+6' },
      { icon: 'fas fa-file-alt', value: '1.4k', label: 'Examens', trend: '+15%' },
      { icon: 'fas fa-envelope', value: '3.2k', label: 'Messages', trend: '+20%' },
      { icon: 'fas fa-handshake', value: '112', label: 'Partenariats', trend: '+8' },
      { icon: 'fas fa-certificate', value: '2.3k', label: 'Certificats', trend: '+25%' }
    ])
    
    // ==================== 15 PLATEFORMES AVEC IMAGES ====================
const allTenants = ref([
  { id: 1, name: 'Université Harvard', type: 'Université', icon: 'fas fa-university', location: 'Cambridge, USA', users: '52.3k', revenue: '$1.45M', courses: 278, status: 'active', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop' },
  { id: 2, name: 'MIT Learning Center', type: 'Centre', icon: 'fas fa-chalkboard-user', location: 'Boston, USA', users: '32.1k', revenue: '$1.02M', courses: 215, status: 'active', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop' },
  { id: 3, name: 'Stanford Online', type: 'Université', icon: 'fas fa-university', location: 'Stanford, USA', users: '41.2k', revenue: '$1.32M', courses: 356, status: 'active', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop' },
  { id: 4, name: 'Oxford Academy', type: 'Centre', icon: 'fas fa-chalkboard-user', location: 'Oxford, UK', users: '18.5k', revenue: '$560K', courses: 112, status: 'active', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop' },
  { id: 5, name: 'Sorbonne Université', type: 'Université', icon: 'fas fa-university', location: 'Paris, France', users: '26.8k', revenue: '$890K', courses: 178, status: 'active', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop' },
  { id: 6, name: 'UCAD', type: 'Université', icon: 'fas fa-university', location: 'Dakar, Sénégal', users: '22.3k', revenue: '$740K', courses: 156, status: 'active', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop' },
  { id: 7, name: 'Cambridge College', type: 'Université', icon: 'fas fa-university', location: 'Cambridge, UK', users: '23.1k', revenue: '$810K', courses: 165, status: 'active', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop' },
  { id: 8, name: 'Tokyo Tech', type: 'Université', icon: 'fas fa-university', location: 'Tokyo, Japon', users: '24.7k', revenue: '$830K', courses: 189, status: 'active', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop' },
  { id: 9, name: 'Berlin Institute', type: 'Centre', icon: 'fas fa-chalkboard-user', location: 'Berlin, Allemagne', users: '14.2k', revenue: '$440K', courses: 94, status: 'active', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop' },
  { id: 10, name: 'Cape Town Uni', type: 'Université', icon: 'fas fa-university', location: 'Le Cap, Afrique du Sud', users: '16.8k', revenue: '$520K', courses: 118, status: 'active', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop' },
  { id: 11, name: 'Université de Pékin', type: 'Université', icon: 'fas fa-university', location: 'Pékin, Chine', users: '38.5k', revenue: '$1.15M', courses: 267, status: 'active', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop' },
  { id: 12, name: 'IIT Delhi', type: 'Université', icon: 'fas fa-university', location: 'New Delhi, Inde', users: '31.2k', revenue: '$980K', courses: 234, status: 'active', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop' },
  { id: 13, name: 'Université de São Paulo', type: 'Université', icon: 'fas fa-university', location: 'São Paulo, Brésil', users: '28.7k', revenue: '$890K', courses: 201, status: 'active', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop' },
  { id: 14, name: 'University of Melbourne', type: 'Université', icon: 'fas fa-university', location: 'Melbourne, Australie', users: '25.4k', revenue: '$780K', courses: 189, status: 'active', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop' },
  { id: 15, name: 'Université de Toronto', type: 'Université', icon: 'fas fa-university', location: 'Toronto, Canada', users: '29.3k', revenue: '$910K', courses: 212, status: 'active', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop' }
])

const viewTenantDetails = (tenant) => {
  alert(`Détails de ${tenant.name}\n\nLocalisation: ${tenant.location}\nUtilisateurs: ${tenant.users}\nRevenus: ${tenant.revenue}\nFormations: ${tenant.courses}`)
}
    
    // 15 FORMATEURS
    const allTrainers = ref([
      { id: 1, name: 'Prof. Jean Martin', email: 'jean@harvard.edu', specialite: 'Data Science', pays: 'États-Unis', rating: 4.9, totalEarned: 256000, avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 2, name: 'Dr. Marie Diop', email: 'marie@ucad.sn', specialite: 'Développement Web', pays: 'Sénégal', rating: 4.8, totalEarned: 178000, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { id: 3, name: 'Prof. Paul Atem', email: 'paul@mit.edu', specialite: 'IA', pays: 'États-Unis', rating: 4.9, totalEarned: 289000, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { id: 4, name: 'Dr. Sophie Laurent', email: 'sophie@sorbonne.fr', specialite: 'Marketing', pays: 'France', rating: 4.7, totalEarned: 198000, avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: 5, name: 'Prof. Thomas Ndiaye', email: 'thomas@oxford.edu', specialite: 'Finance', pays: 'Royaume-Uni', rating: 4.8, totalEarned: 234000, avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { id: 6, name: 'Dr. Claire Mbaye', email: 'claire@stanford.edu', specialite: 'UX Design', pays: 'États-Unis', rating: 4.9, totalEarned: 245000, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { id: 7, name: 'Prof. Ali Sow', email: 'ali@udb.sn', specialite: 'Cloud', pays: 'Sénégal', rating: 4.6, totalEarned: 148000, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
      { id: 8, name: 'Dr. Fatou Diouf', email: 'fatou@esp.sn', specialite: 'Cybersécurité', pays: 'Sénégal', rating: 4.8, totalEarned: 192000, avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { id: 9, name: 'Prof. Mamadou Diallo', email: 'mamadou@ugb.sn', specialite: 'Blockchain', pays: 'Sénégal', rating: 4.7, totalEarned: 165000, avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { id: 10, name: 'Dr. Awa Ndiaye', email: 'awa@polytech.sn', specialite: 'Data Engineering', pays: 'Sénégal', rating: 4.9, totalEarned: 201000, avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { id: 11, name: 'Prof. Wei Zhang', email: 'wei@tsinghua.edu', specialite: 'IA Avancée', pays: 'Chine', rating: 4.9, totalEarned: 267000, avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
      { id: 12, name: 'Dr. Carlos Mendez', email: 'carlos@usp.br', specialite: 'Big Data', pays: 'Brésil', rating: 4.8, totalEarned: 213000, avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { id: 13, name: 'Prof. Sarah Johnson', email: 'sarah@toronto.ca', specialite: 'Cloud AWS', pays: 'Canada', rating: 4.9, totalEarned: 242000, avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
      { id: 14, name: 'Dr. James Wilson', email: 'james@melbourne.edu', specialite: 'DevOps', pays: 'Australie', rating: 4.8, totalEarned: 228000, avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
      { id: 15, name: 'Prof. Ahmed Ben Ali', email: 'ahmed@um5.ma', specialite: 'Réseaux', pays: 'Maroc', rating: 4.7, totalEarned: 175000, avatar: 'https://randomuser.me/api/portraits/men/9.jpg' }
    ])
    
    // 15 FORMATIONS
    const allCourses = ref([
      { id: 1, title: 'Data Science Masterclass', category: 'Data Science', level: 'Intermédiaire', price: 250000, enrolled: 3456, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop' },
      { id: 2, title: 'Développement Web Full Stack', category: 'Développement', level: 'Débutant', price: 200000, enrolled: 5678, image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop' },
      { id: 3, title: 'IA & Deep Learning', category: 'IA', level: 'Avancé', price: 350000, enrolled: 2345, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop' },
      { id: 4, title: 'Marketing Digital', category: 'Marketing', level: 'Débutant', price: 150000, enrolled: 4321, image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=250&fit=crop' },
      { id: 5, title: 'Finance d\'entreprise', category: 'Finance', level: 'Intermédiaire', price: 280000, enrolled: 1876, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop' },
      { id: 6, title: 'Design Thinking & UX', category: 'Design', level: 'Débutant', price: 180000, enrolled: 2987, image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop' },
      { id: 7, title: 'DevOps & CI/CD', category: 'DevOps', level: 'Avancé', price: 320000, enrolled: 1234, image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop' },
      { id: 8, title: 'React Native Mobile', category: 'Mobile', level: 'Intermédiaire', price: 220000, enrolled: 3456, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop' },
      { id: 9, title: 'Cybersécurité', category: 'Sécurité', level: 'Avancé', price: 380000, enrolled: 987, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop' },
      { id: 10, title: 'Cloud Computing AWS', category: 'Cloud', level: 'Intermédiaire', price: 300000, enrolled: 2345, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop' },
      { id: 11, title: 'Blockchain & Crypto', category: 'Blockchain', level: 'Avancé', price: 420000, enrolled: 876, image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop' },
      { id: 12, title: 'Product Management', category: 'Management', level: 'Intermédiaire', price: 260000, enrolled: 1543, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop' },
      { id: 13, title: 'Leadership & Soft Skills', category: 'Développement personnel', level: 'Débutant', price: 120000, enrolled: 4321, image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop' },
      { id: 14, title: 'Anglais des affaires', category: 'Langues', level: 'Débutant', price: 90000, enrolled: 5678, image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop' },
      { id: 15, title: 'Préparation concours ENAM', category: 'Préparation', level: 'Intermédiaire', price: 180000, enrolled: 2890, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop' }
    ])
    
    // 15 TRANSACTIONS
    const recentTransactions = ref([
      { id: 'TXN001', platform: 'Harvard', amount: 499, method: 'Carte', status: 'completed', date: '2025-04-27' },
      { id: 'TXN002', platform: 'MIT', amount: 299, method: 'Mobile', status: 'pending', date: '2025-04-26' },
      { id: 'TXN003', platform: 'Stanford', amount: 899, method: 'PayPal', status: 'completed', date: '2025-04-25' },
      { id: 'TXN004', platform: 'Oxford', amount: 649, method: 'Virement', status: 'completed', date: '2025-04-24' },
      { id: 'TXN005', platform: 'Sorbonne', amount: 399, method: 'Carte', status: 'pending', date: '2025-04-23' },
      { id: 'TXN006', platform: 'UCAD', amount: 199, method: 'Mobile', status: 'completed', date: '2025-04-22' },
      { id: 'TXN007', platform: 'Cambridge', amount: 549, method: 'PayPal', status: 'completed', date: '2025-04-21' },
      { id: 'TXN008', platform: 'Tokyo Tech', amount: 749, method: 'Carte', status: 'completed', date: '2025-04-20' },
      { id: 'TXN009', platform: 'Berlin', amount: 299, method: 'Virement', status: 'pending', date: '2025-04-19' },
      { id: 'TXN010', platform: 'Cape Town', amount: 449, method: 'Mobile', status: 'completed', date: '2025-04-18' },
      { id: 'TXN011', platform: 'Pékin', amount: 599, method: 'PayPal', status: 'completed', date: '2025-04-17' },
      { id: 'TXN012', platform: 'IIT Delhi', amount: 349, method: 'Carte', status: 'completed', date: '2025-04-16' },
      { id: 'TXN013', platform: 'São Paulo', amount: 279, method: 'Mobile', status: 'pending', date: '2025-04-15' },
      { id: 'TXN014', platform: 'Melbourne', amount: 529, method: 'Virement', status: 'completed', date: '2025-04-14' },
      { id: 'TXN015', platform: 'Toronto', amount: 399, method: 'Carte', status: 'completed', date: '2025-04-13' }
    ])
    
    // 15 LOGS SYSTÈME
    const systemLogs = ref([
      { id: 1, time: '10:23:45', type: 'info', message: 'Connexion admin réussie' },
      { id: 2, time: '10:15:22', type: 'warning', message: 'Tentatives échouées depuis IP 45.67.89.12' },
      { id: 3, time: '09:58:10', type: 'error', message: 'Timeout API sur tenant-3' },
      { id: 4, time: '09:30:05', type: 'info', message: 'Sauvegarde automatique effectuée' },
      { id: 5, time: '08:45:33', type: 'warning', message: 'Utilisation CPU à 85%' },
      { id: 6, time: '08:00:00', type: 'info', message: 'Démarrage du système' },
      { id: 7, time: '07:30:12', type: 'info', message: 'Mise à jour des certificats SSL' },
      { id: 8, time: '06:55:44', type: 'warning', message: 'Tentative d\'accès non autorisé' },
      { id: 9, time: '06:20:33', type: 'info', message: 'Nettoyage des logs terminé' },
      { id: 10, time: '05:45:22', type: 'error', message: 'Base de données lente' },
      { id: 11, time: '04:30:15', type: 'info', message: 'Synchronisation API réussie' },
      { id: 12, time: '03:15:44', type: 'warning', message: 'Tentative de brute force' },
      { id: 13, time: '02:00:00', type: 'info', message: 'Rotation des logs' },
      { id: 14, time: '01:20:33', type: 'error', message: 'Cache Redis indisponible' },
      { id: 15, time: '00:45:22', type: 'info', message: 'Sauvegarde terminée' }
    ])
    
    // 15 ACTIVITÉS SUSPECTES
    const suspiciousActivities = ref([
      { id: 1, description: 'Multiples échecs de connexion depuis IP 192.168.1.1 (10 tentatives)' },
      { id: 2, description: 'Accès admin depuis localisation inconnue (Chine)' },
      { id: 3, description: 'Tentative d\'injection SQL' },
      { id: 4, description: 'Requêtes API abusives (1200 req/min)' },
      { id: 5, description: 'Modification massive de données' },
      { id: 6, description: 'Connexion hors horaires (03:00 AM)' },
      { id: 7, description: 'Tentative de brute force' },
      { id: 8, description: 'Accès à des données sensibles' },
      { id: 9, description: 'Changement de mot de passe suspect' },
      { id: 10, description: 'Multiples exportations de données' },
      { id: 11, description: 'Tentative de téléchargement DB' },
      { id: 12, description: 'Accès depuis proxy anonyme' },
      { id: 13, description: 'Script automatisé détecté' },
      { id: 14, description: 'Tentative de contournement 2FA' },
      { id: 15, description: 'Activité anormale sur les paiements' }
    ])
    
    // 15 RECOMMANDATIONS IA
    const aiRecommendations = ref([
      { id: 1, message: 'Ajouter des ressources IA pour le Sénégal' },
      { id: 2, message: 'Former 5 nouveaux formateurs en Data Science' },
      { id: 3, message: 'Augmenter le budget marketing pour l\'Afrique' },
      { id: 4, message: 'Créer un programme de bourses' },
      { id: 5, message: 'Développer des formations en Wolof' },
      { id: 6, message: 'Organiser un hackathon IA à Dakar' },
      { id: 7, message: 'Partenariat avec des entreprises tech' },
      { id: 8, message: 'Lancer des webinaires gratuits' },
      { id: 9, message: 'Améliorer l\'application mobile' },
      { id: 10, message: 'Ajouter un système de mentorat' },
      { id: 11, message: 'Créer une communauté Slack' },
      { id: 12, message: 'Proposer des certifications reconnues' },
      { id: 13, message: 'Développer des cours en VR' },
      { id: 14, message: 'Système de parrainage' },
      { id: 15, message: 'Campagne recrutement formateurs' }
    ])
    
    // 15 NOTIFICATIONS
    const notificationsList = ref([
      { id: 1, title: 'Nouvel utilisateur', message: 'Jean Dupont inscrit', time: '5 min' },
      { id: 2, title: 'Paiement reçu', message: 'Formation Data Science', time: '1h' },
      { id: 3, title: 'Nouveau formateur', message: 'Dr. Martin rejoint', time: '2h' },
      { id: 4, title: 'Maintenance', message: 'Mise à jour planifiée', time: '3h' },
      { id: 5, title: 'Alerte sécurité', message: 'Tentative de connexion', time: '5h' },
      { id: 6, title: 'Nouvelle plateforme', message: 'Tokyo Tech créée', time: '1j' },
      { id: 7, title: 'Rapport disponible', message: 'Statistiques mensuelles', time: '2j' },
      { id: 8, title: 'Formation ajoutée', message: 'Cloud Computing AWS', time: '3j' },
      { id: 9, title: 'Concours ouvert', message: 'ENAM 2025', time: '4j' },
      { id: 10, title: 'Promotion', message: '-20% sur Data Science', time: '5j' },
      { id: 11, title: 'Certification', message: 'Nouvelle certification', time: '6j' },
      { id: 12, title: 'Webinaire', message: 'IA le 20/05', time: '7j' },
      { id: 13, title: 'Partenariat', message: 'Avec Microsoft', time: '8j' },
      { id: 14, title: 'Record', message: '15k utilisateurs simultanés', time: '9j' },
      { id: 15, title: 'Mise à jour', message: 'App mobile v3.0', time: '10j' }
    ])
    
    // 15 CERTIFICATS RÉCENTS
    const recentCertificates = ref([
      { id: 1, student: 'Jean Dupont', course: 'Data Science', date: '2025-04-27', expiry: '2026-04-27', status: 'active' },
      { id: 2, student: 'Marie Diop', course: 'Dev Web', date: '2025-04-26', expiry: '2026-04-26', status: 'active' },
      { id: 3, student: 'Paul Atem', course: 'IA', date: '2025-04-25', expiry: '2026-04-25', status: 'active' },
      { id: 4, student: 'Sophie Laurent', course: 'Marketing', date: '2025-04-24', expiry: '2026-04-24', status: 'active' },
      { id: 5, student: 'Thomas Ndiaye', course: 'Finance', date: '2025-04-23', expiry: '2026-04-23', status: 'active' },
      { id: 6, student: 'Claire Mbaye', course: 'UX Design', date: '2025-04-22', expiry: '2026-04-22', status: 'active' },
      { id: 7, student: 'Ali Sow', course: 'Cloud', date: '2025-04-21', expiry: '2026-04-21', status: 'active' },
      { id: 8, student: 'Fatou Diouf', course: 'Cybersécurité', date: '2025-04-20', expiry: '2026-04-20', status: 'active' },
      { id: 9, student: 'Mamadou Diallo', course: 'Blockchain', date: '2025-04-19', expiry: '2026-04-19', status: 'active' },
      { id: 10, student: 'Awa Ndiaye', course: 'Data Eng', date: '2025-04-18', expiry: '2026-04-18', status: 'active' },
      { id: 11, student: 'Wei Zhang', course: 'IA', date: '2025-04-17', expiry: '2026-04-17', status: 'active' },
      { id: 12, student: 'Carlos Mendez', course: 'Big Data', date: '2025-04-16', expiry: '2026-04-16', status: 'active' },
      { id: 13, student: 'Sarah Johnson', course: 'AWS', date: '2025-04-15', expiry: '2026-04-15', status: 'active' },
      { id: 14, student: 'James Wilson', course: 'DevOps', date: '2025-04-14', expiry: '2026-04-14', status: 'active' },
      { id: 15, student: 'Ahmed Ben Ali', course: 'Réseaux', date: '2025-04-13', expiry: '2026-04-13', status: 'active' }
    ])
    
    // RÉSERVATIONS
    const allBookings = ref([
      { id: 1, date: '2025-04-27', candidat: 'Jean Dupont', email: 'jean@email.com', phone: '+221 77 123 45 67', pays: 'Sénégal', flag: 'https://flagcdn.com/sn.svg', concours: 'ENAM 2025', etablissement: 'UCAD', type: 'preinscription', status: 'pending', message: 'Inscription', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 2, date: '2025-04-26', candidat: 'Marie Diop', email: 'marie@email.com', phone: '+221 78 234 56 78', pays: 'France', flag: 'https://flagcdn.com/fr.svg', concours: 'ENS 2025', etablissement: 'Sorbonne', type: 'info', status: 'pending', message: 'Dates limites ?', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { id: 3, date: '2025-04-25', candidat: 'Paul Atem', email: 'paul@email.com', phone: '+1 617 555 0123', pays: 'États-Unis', flag: 'https://flagcdn.com/us.svg', concours: 'MIT Graduate', etablissement: 'MIT', type: 'preinscription', status: 'confirmed', message: 'Complet', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { id: 4, date: '2025-04-24', candidat: 'Sophie Laurent', email: 'sophie@email.com', phone: '+33 6 12 34 56 78', pays: 'France', flag: 'https://flagcdn.com/fr.svg', concours: 'Sciences Po', etablissement: 'Sorbonne', type: 'preinscription', status: 'pending', message: 'Inscription concours', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: 5, date: '2025-04-23', candidat: 'Thomas Ndiaye', email: 'thomas@email.com', phone: '+221 77 987 65 43', pays: 'Sénégal', flag: 'https://flagcdn.com/sn.svg', concours: 'ENAM 2025', etablissement: 'UCAD', type: 'preinscription', status: 'confirmed', message: 'Dossier complet', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { id: 6, date: '2025-04-22', candidat: 'Claire Mbaye', email: 'claire@email.com', phone: '+1 650 555 0199', pays: 'États-Unis', flag: 'https://flagcdn.com/us.svg', concours: 'Stanford', etablissement: 'Stanford', type: 'info', status: 'pending', message: 'Bourses disponibles?', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { id: 7, date: '2025-04-21', candidat: 'Ali Sow', email: 'ali@email.com', phone: '+221 78 456 78 90', pays: 'Sénégal', flag: 'https://flagcdn.com/sn.svg', concours: 'ENAM 2025', etablissement: 'UCAD', type: 'preinscription', status: 'pending', message: 'Inscription', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
      { id: 8, date: '2025-04-20', candidat: 'Fatou Diouf', email: 'fatou@email.com', phone: '+221 77 123 98 76', pays: 'Sénégal', flag: 'https://flagcdn.com/sn.svg', concours: 'ENAM 2025', etablissement: 'ESP', type: 'preinscription', status: 'cancelled', message: 'Annulé', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { id: 9, date: '2025-04-19', candidat: 'Mamadou Diallo', email: 'mamadou@email.com', phone: '+221 78 987 12 34', pays: 'Sénégal', flag: 'https://flagcdn.com/sn.svg', concours: 'ENAM 2025', etablissement: 'UCAD', type: 'preinscription', status: 'confirmed', message: 'Inscription validée', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
      { id: 10, date: '2025-04-18', candidat: 'Awa Ndiaye', email: 'awa@email.com', phone: '+221 77 456 12 34', pays: 'Sénégal', flag: 'https://flagcdn.com/sn.svg', concours: 'ENAM 2025', etablissement: 'ESP', type: 'info', status: 'pending', message: 'Conditions d\'admission', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { id: 11, date: '2025-04-17', candidat: 'Wei Zhang', email: 'wei@email.com', phone: '+86 10 1234 5678', pays: 'Chine', flag: 'https://flagcdn.com/cn.svg', concours: 'Tsinghua', etablissement: 'Tsinghua', type: 'preinscription', status: 'confirmed', message: 'Inscription', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
      { id: 12, date: '2025-04-16', candidat: 'Carlos Mendez', email: 'carlos@email.com', phone: '+55 11 98765 4321', pays: 'Brésil', flag: 'https://flagcdn.com/br.svg', concours: 'USP', etablissement: 'USP', type: 'info', status: 'pending', message: 'Documents requis', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { id: 13, date: '2025-04-15', candidat: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 416 555 0199', pays: 'Canada', flag: 'https://flagcdn.com/ca.svg', concours: 'Toronto', etablissement: 'UofT', type: 'preinscription', status: 'pending', message: 'Inscription', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
      { id: 14, date: '2025-04-14', candidat: 'James Wilson', email: 'james@email.com', phone: '+61 3 9876 5432', pays: 'Australie', flag: 'https://flagcdn.com/au.svg', concours: 'Melbourne', etablissement: 'UniMelb', type: 'preinscription', status: 'confirmed', message: 'Inscription', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
      { id: 15, date: '2025-04-13', candidat: 'Ahmed Ben Ali', email: 'ahmed@email.com', phone: '+212 6 12 34 56 78', pays: 'Maroc', flag: 'https://flagcdn.com/ma.svg', concours: 'ENA', etablissement: 'UM5', type: 'info', status: 'pending', message: 'Préparation concours', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' }
    ])
    
    const bookingsStats = computed(() => ({
      total: allBookings.value.length,
      preinscriptions: allBookings.value.filter(b => b.type === 'preinscription').length,
      inquiries: allBookings.value.filter(b => b.type === 'info').length,
      pays: [...new Set(allBookings.value.map(b => b.pays))].length
    }))
    
    const filteredBookings = computed(() => {
      let result = allBookings.value
      if (bookingFilter.value.type !== 'all') result = result.filter(b => b.type === bookingFilter.value.type)
      if (bookingSearch.value) result = result.filter(b => b.candidat.toLowerCase().includes(bookingSearch.value.toLowerCase()))
      return result
    })
    
    // Rôles
    const roles = ref([
      { name: 'Super Admin', users: 2 }, 
      { name: 'Admin Académique', users: 5 }, 
      { name: 'Admin Contenu', users: 8 }, 
      { name: 'Admin Financier', users: 3 }, 
      { name: 'Support', users: 12 }
    ])
    
    // Méthodes utilitaires
    const getHeatmapClass = (row, col) => { 
      const v = (row * col) % 10
      if (v > 7) return 'bg-red-500'
      if (v > 4) return 'bg-orange-500'
      return 'bg-green-500'
    }
    
    const formatMoney = (amount) => {
      return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
    }
    
    const toggleTenantStatus = (tenant) => { 
      tenant.status = tenant.status === 'active' ? 'suspended' : 'active'
      alert(`${tenant.name} ${tenant.status === 'active' ? 'activée' : 'suspendue'}`)
    }
    
    const configureTenant = (tenant) => { 
      alert(`Configuration de ${tenant.name}`)
    }
    
    const editPlatformName = () => { 
      const newName = prompt('Nouveau nom de la plateforme:', 'Gradus Aura')
      if(newName) alert(`Nom changé en ${newName}`)
    }
    
    const openTenantModal = () => { showTenantModal.value = true }
    const createTenant = () => { showTenantModal.value = false; alert('Plateforme créée') }
    const openTrainerModal = () => { showTrainerModal.value = true }
    const saveTrainer = () => { showTrainerModal.value = false; alert('Formateur ajouté') }
    const openCourseModal = () => { showCourseModal.value = true }
    const saveCourse = () => { showCourseModal.value = false; alert('Formation ajoutée') }
    const saveCommissions = () => { alert('Commissions sauvegardées') }
    const resolveActivity = () => { alert('Résolu') }
    const runSecurityAudit = () => { alert('🔐 Audit lancé !\n✅ Système sécurisé') }
    const logout = () => { alert('Déconnexion') }
    const viewBookingDetails = (b) => { selectedBooking.value = b }
    const confirmBooking = (b) => { b.status = 'confirmed'; alert('Confirmé') }
    const cancelBooking = (b) => { b.status = 'cancelled'; alert('Annulé') }
    const saveProfile = () => { 
      currentAdmin.value = { ...profileForm.value, avatar: currentAdmin.value.avatar }
      showProfile.value = false
      alert('Profil modifié')
    }
    
    // Certification methods
    const saveCertificationSettings = () => { alert('Paramètres de certification sauvegardés') }
    const generateBulkCertificates = () => { alert('Génération massive de certificats lancée') }
    
    // GRAPHIQUES
    const growthChartCanvas = ref(null)
    const countryChartCanvas = ref(null)
    const forecastChartCanvas = ref(null)
    const revenueChartCanvas = ref(null)
    const aiForecastChartCanvas = ref(null)
    
    const initCharts = () => {
      if (growthChartCanvas.value) {
        new Chart(growthChartCanvas.value, { 
          type: 'line', 
          data: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], datasets: [{ label: 'Croissance', data: [120, 135, 148, 162, 178, 195], borderColor: '#6366f1' }] }, 
          options: { responsive: true, maintainAspectRatio: false }
        })
      }
      if (countryChartCanvas.value) {
        new Chart(countryChartCanvas.value, { 
          type: 'pie', 
          data: { labels: ['Afrique', 'Europe', 'Asie', 'Amérique du Nord', 'Amérique du Sud', 'Océanie'], 
                  datasets: [{ data: [15, 12, 12, 5, 8, 2], backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'] }] }, 
          options: { responsive: true, maintainAspectRatio: false }
        })
      }
      if (forecastChartCanvas.value) {
        new Chart(forecastChartCanvas.value, { 
          type: 'line', 
          data: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], datasets: [{ label: 'Prévision', data: [100, 115, 132, 148, 165, 182], borderColor: '#f59e0b' }] }, 
          options: { responsive: true, maintainAspectRatio: false }
        })
      }
      if (revenueChartCanvas.value) {
        new Chart(revenueChartCanvas.value, { 
          type: 'bar', 
          data: { labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'], datasets: [{ label: 'Revenus', data: [1250, 1580, 1420, 1890, 2340, 2870], backgroundColor: '#6366f1' }] }, 
          options: { responsive: true, maintainAspectRatio: false }
        })
      }
      if (aiForecastChartCanvas.value) {
        new Chart(aiForecastChartCanvas.value, { 
          type: 'line', 
          data: { labels: ['M+1', 'M+2', 'M+3', 'M+4', 'M+5', 'M+6'], datasets: [{ label: 'Prévision', data: [1250, 1420, 1680, 1950, 2250, 2580], borderColor: '#f59e0b' }] }, 
          options: { responsive: true, maintainAspectRatio: false }
        })
      }
    }
    
    // GLOBE 3D
    let scene, camera, renderer, controls, markerGroup
    
    const initGlobe = () => {
      const container = document.getElementById('globe-3d-container')
      if (!container) return
      
      const width = container.clientWidth
      const height = 550
      
      scene = new THREE.Scene()
      scene.background = new THREE.Color(isDarkMode.value ? 0x0a0a2a : 0xf0f4f8)
      
      camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000)
      camera.position.set(0, 0, 3.5)
      
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      container.innerHTML = ''
      container.appendChild(renderer.domElement)
      
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.5
      controls.enableZoom = true
      controls.enablePan = false
      
      const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg')
      const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 256, 256), new THREE.MeshPhongMaterial({ map: texture, shininess: 5 }))
      scene.add(earth)
      
      const atmos = new THREE.Mesh(new THREE.SphereGeometry(1.01, 128, 128), new THREE.MeshPhongMaterial({ color: 0x88aaff, transparent: true, opacity: 0.12 }))
      scene.add(atmos)
      
      const starGeo = new THREE.BufferGeometry()
      const starsPos = new Float32Array(2000 * 3)
      for (let i = 0; i < 2000; i++) { 
        starsPos[i*3] = (Math.random() - 0.5) * 2000
        starsPos[i*3+1] = (Math.random() - 0.5) * 2000
        starsPos[i*3+2] = (Math.random() - 0.5) * 500 - 200
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3))
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 })))
      
      scene.add(new THREE.AmbientLight(0x404060))
      const light = new THREE.DirectionalLight(0xffffff, 1.2)
      light.position.set(5, 3, 5)
      scene.add(light)
      
      const colors = { high: 0x10b981, medium: 0xf59e0b, low: 0xef4444 }
      
      markerGroup = new THREE.Group()
      scene.add(markerGroup)
      
      allCountries.value.forEach(country => {
        const phi = (90 - country.lat) * Math.PI / 180
        const theta = country.lng * Math.PI / 180
        const r = 1.02
        const x = r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.cos(phi)
        const z = r * Math.sin(phi) * Math.sin(theta)
        
        const markerMat = new THREE.MeshStandardMaterial({ color: colors[country.activity] || colors.medium, emissive: colors[country.activity] || colors.medium, emissiveIntensity: 0.5 })
        const marker = new THREE.Mesh(new THREE.SphereGeometry(0.022, 24, 24), markerMat)
        marker.position.set(x, y, z)
        marker.userData = { countryName: country.nom }
        
        const ringMat = new THREE.MeshStandardMaterial({ color: colors[country.activity] || colors.medium, transparent: true, opacity: 0.6, emissive: colors[country.activity] || colors.medium })
        const ring = new THREE.Mesh(new THREE.SphereGeometry(0.032, 16, 16), ringMat)
        marker.add(ring)
        
        markerGroup.add(marker)
      })
      
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      
      renderer.domElement.addEventListener('click', (event) => {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(markerGroup.children, true)
        
        if (intersects.length > 0) {
          let hit = intersects[0]
          while (hit.object.parent !== markerGroup && hit.object.parent !== hit.object) {
            hit = { object: hit.object.parent }
          }
          if (hit.object.userData && hit.object.userData.countryName) {
            const country = allCountries.value.find(c => c.nom === hit.object.userData.countryName)
            if (country) showCountryDetails(country)
          }
        }
      })
      
      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()
      
      window.addEventListener('resize', () => {
        const w = container.clientWidth
        const h = 550
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      })
    }
    
    const updateGlobeBackground = () => { 
      if (scene) scene.background = new THREE.Color(isDarkMode.value ? 0x0a0a2a : 0xf0f4f8) 
    }
    
    onMounted(() => { 
      initCharts()
      setTimeout(() => initGlobe(), 500)
    })
    
    watch(activeSection, () => { 
      setTimeout(initCharts, 100)
    })
    
    return {
      isDarkMode, toggleTheme, sidebarCollapsed, activeSection, showNotifications, showProfile,
      showTenantModal, showTrainerModal, showCourseModal, unreadCount, currentLang, toggleLanguage,
      selectedCountry, selectedBooking, bookingSearch, bookingFilter, bookingsStats, filteredBookings,
      dashboardKPIs, allTenants, allTrainers, allCourses, recentTransactions,
      systemLogs, suspiciousActivities, aiRecommendations, notificationsList,
      allCountries, navItems, activeMenuTitle, roles,
      maintenanceMode, registrationsOpen, twoFAEnabled, currentAdmin, profileForm,
      certificatesEnabled, autoCertificates, minScore, minAttendance, signatoryName, signatoryTitle,
      officialLogo, certificateTitle, certificateColor, certificateFooter, certificateValidity, recentCertificates,
      growthChartCanvas, countryChartCanvas, forecastChartCanvas, revenueChartCanvas, aiForecastChartCanvas,
      newTenant, trainerForm, courseForm, platformCommission, trainerCommission,
      countrySearch, selectedContinent, continentFilters, filteredCountries, getContinentCount,
      getActivityColorClass, getActivityLabel, showCountryDetails, formatMoney, toggleTenantStatus,
      configureTenant, editPlatformName, openTenantModal, createTenant, openTrainerModal,
      saveTrainer, openCourseModal, saveCourse, saveCommissions, resolveActivity, runSecurityAudit,
      logout, viewBookingDetails, confirmBooking, cancelBooking, saveProfile,
      saveCertificationSettings, generateBulkCertificates, getHeatmapClass
    }
  }
}
</script>

<style scoped>
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.sidebar-item.active { background: linear-gradient(135deg, rgba(79,70,229,0.2), rgba(6,182,212,0.2)); border-left: 3px solid #4f46e5; }
.heatmap-cell { transition: all 0.2s; cursor: pointer; }
.heatmap-cell:hover { transform: scale(1.1); }
#globe-3d-container canvas { border-radius: 12px; cursor: grab; }
#globe-3d-container canvas:active { cursor: grabbing; }
.dark .bg-white { background-color: #1f2937; }
.dark .text-slate-900, .dark .text-slate-800, .dark .text-slate-950 { color: #f3f4f6; }
.dark .bg-slate-50, .dark .bg-slate-100 { background-color: #374151; }
.dark .border-slate-200 { border-color: #4b5563; }
</style>
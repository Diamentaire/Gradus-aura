<template>
    <div class="dashboard-admin">
        <!-- SIDEBAR -->
        <aside class="sidebar" :class="{ 'sidebar-mobile-open': mobileMenuOpen }">
            <div class="sidebar-header">
                <div class="logo">
                    <i class="fas fa-graduation-cap"></i>
                    <h2>Admin<span>Panel</span></h2>
                </div>
                <button class="sidebar-close" @click="mobileMenuOpen = false">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="sidebar-user">
                <div class="user-avatar">
                    <img :src="userAvatar" alt="Admin">
                </div>
                <div class="user-info">
                    <h4>{{ userNom }}</h4>
                    <p>Super Administrateur</p>
                </div>
            </div>

            <nav class="sidebar-nav">
                <ul class="nav-menu">
                    <!-- Menu Principal -->
                    <li class="nav-section-title">PRINCIPAL</li>
                    
                    <li :class="{ active: currentModule === 'dashboard' }">
                        <a @click="currentModule = 'dashboard'">
                            <i class="fas fa-chart-line"></i>
                            <span>Tableau de bord</span>
                        </a>
                    </li>

                    <li :class="{ active: currentModule === 'profile' }">
                        <a @click="currentModule = 'profile'">
                            <i class="fas fa-user-circle"></i>
                            <span>Mon profil</span>
                        </a>
                    </li>

                    <li :class="{ active: currentModule === 'settings' }">
                        <a @click="currentModule = 'settings'">
                            <i class="fas fa-cog"></i>
                            <span>Paramètres</span>
                        </a>
                    </li>

                    <!-- GESTION -->
                    <li class="nav-section-title">GESTION</li>

                    <li class="nav-dropdown" :class="{ expanded: dropdowns.categories }">
                        <a @click="toggleDropdown('categories')">
                            <i class="fas fa-layer-group"></i>
                            <span>Gérer les catégories</span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li :class="{ active: currentModule === 'categories' }">
                                <a @click="currentModule = 'categories'">Toutes les catégories</a>
                            </li>
                            <li :class="{ active: currentModule === 'subcategories' }">
                                <a @click="currentModule = 'subcategories'">Sous-catégories</a>
                            </li>
                        </ul>
                    </li>

                    <li :class="{ active: currentModule === 'instructeurs' }">
                        <a @click="currentModule = 'instructeurs'">
                            <i class="fas fa-chalkboard-user"></i>
                            <span>Gérer les instructeurs</span>
                        </a>
                    </li>

                    <li :class="{ active: currentModule === 'cours' }">
                        <a @click="currentModule = 'cours'">
                            <i class="fas fa-book-open"></i>
                            <span>Gérer les cours</span>
                        </a>
                    </li>

                    <li :class="{ active: currentModule === 'commandes' }">
                        <a @click="currentModule = 'commandes'">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Gérer les commandes</span>
                        </a>
                    </li>

                    <li :class="{ active: currentModule === 'rapports' }">
                        <a @click="currentModule = 'rapports'">
                            <i class="fas fa-chart-pie"></i>
                            <span>Gérer les rapports</span>
                        </a>
                    </li>

                    <!-- CONFIGURATION -->
                    <li class="nav-section-title">CONFIGURATION</li>

                    <li class="nav-dropdown" :class="{ expanded: dropdowns.configuration }">
                        <a @click="toggleDropdown('configuration')">
                            <i class="fas fa-cog"></i>
                            <span>Configuration</span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li :class="{ active: currentModule === 'mailSetting' }">
                                <a @click="currentModule = 'mailSetting'">Configuration email</a>
                            </li>
                            <li :class="{ active: currentModule === 'googleSetting' }">
                                <a @click="currentModule = 'googleSetting'">Configuration Google</a>
                            </li>
                            <li :class="{ active: currentModule === 'stripeSetting' }">
                                <a @click="currentModule = 'stripeSetting'">Configuration Stripe</a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-dropdown" :class="{ expanded: dropdowns.appSettings }">
                        <a @click="toggleDropdown('appSettings')">
                            <i class="fas fa-sliders-h"></i>
                            <span>Paramètres applicatifs</span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li :class="{ active: currentModule === 'slider' }">
                                <a @click="currentModule = 'slider'">Gérer le slider</a>
                            </li>
                            <li :class="{ active: currentModule === 'info' }">
                                <a @click="currentModule = 'info'">Gérer les informations</a>
                            </li>
                            <li :class="{ active: currentModule === 'partner' }">
                                <a @click="currentModule = 'partner'">Gérer les partenaires</a>
                            </li>
                            <li :class="{ active: currentModule === 'subscriber' }">
                                <a @click="currentModule = 'subscriber'">Gérer les abonnés</a>
                            </li>
                            <li :class="{ active: currentModule === 'siteSettings' }">
                                <a @click="currentModule = 'siteSettings'">Paramètres du site</a>
                            </li>
                            <li :class="{ active: currentModule === 'pageSettings' }">
                                <a @click="currentModule = 'pageSettings'">Paramètres des pages</a>
                            </li>
                        </ul>
                    </li>

                    <!-- CONTENU -->
                    <li class="nav-section-title">CONTENU</li>

                    <li :class="{ active: currentModule === 'avis' }">
                        <a @click="currentModule = 'avis'">
                            <i class="fas fa-star"></i>
                            <span>Gérer les avis</span>
                        </a>
                    </li>

                    <li :class="{ active: currentModule === 'utilisateurs' }">
                        <a @click="currentModule = 'utilisateurs'">
                            <i class="fas fa-users"></i>
                            <span>Gérer les utilisateurs</span>
                        </a>
                    </li>

                    <li class="nav-dropdown" :class="{ expanded: dropdowns.blog }">
                        <a @click="toggleDropdown('blog')">
                            <i class="fas fa-blog"></i>
                            <span>Gérer le blog</span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li :class="{ active: currentModule === 'blogCategory' }">
                                <a @click="currentModule = 'blogCategory'">Catégories du blog</a>
                            </li>
                            <li :class="{ active: currentModule === 'blog' }">
                                <a @click="currentModule = 'blog'">Tous les articles</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            <!-- Footer Sidebar avec bouton déconnexion -->
            <div class="sidebar-footer">
                <button @click="confirmLogout" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>

        <!-- MAIN CONTENT -->
        <div class="main-content">
            <!-- TOP HEADER -->
            <header class="top-header">
                <button class="menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
                    <i class="fas fa-bars"></i>
                </button>
                
                <div class="search-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" v-model="searchQuery" placeholder="Rechercher un cours, une catégorie, un utilisateur...">
                </div>
                
                <div class="header-actions">
                    <div class="notification" @click="openNotificationsModal">
                        <i class="far fa-bell"></i>
                        <span class="badge">{{ unreadNotificationsCount }}</span>
                    </div>
                    
                    <div class="user-menu" @click="showUserMenu = !showUserMenu">
                        <img :src="userAvatar" alt="Admin">
                        <div class="user-details">
                            <span class="user-name">{{ userNom }}</span>
                            <span class="user-role">Administrateur</span>
                        </div>
                        <i class="fas fa-chevron-down"></i>
                        <div class="user-dropdown" v-show="showUserMenu">
                            <a @click="goToProfile"><i class="fas fa-user"></i> Mon profil</a>
                            <a @click="goToSettings"><i class="fas fa-cog"></i> Paramètres</a>
                            <hr>
                            <a @click="confirmLogout"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
                        </div>
                    </div>
                </div>
            </header>

            <!-- DYNAMIC CONTENT -->
            <div class="content-wrapper">
                <!-- MODULE TABLEAU DE BORD -->
                <div v-if="currentModule === 'dashboard'" class="dashboard-module">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3>6</h3>
                                <p>Commandes totales</p>
                                <span class="trend neutral">+0.0% depuis la semaine dernière</span>
                            </div>
                            <div class="stat-icon purple">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3>3 835 F</h3>
                                <p>Gains totaux</p>
                                <span class="trend neutral">+0.0% depuis la semaine dernière</span>
                            </div>
                            <div class="stat-icon green">
                                <i class="fas fa-euro-sign"></i>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3>8</h3>
                                <p>Étudiants totaux</p>
                                <span class="trend positive">+33.3% depuis la semaine dernière</span>
                            </div>
                            <div class="stat-icon blue">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-info">
                                <h3>4</h3>
                                <p>Instructeurs totaux</p>
                                <span class="trend positive">+100.0% depuis la semaine dernière</span>
                            </div>
                            <div class="stat-icon orange">
                                <i class="fas fa-chalkboard-user"></i>
                            </div>
                        </div>
                    </div>

                    <div class="chart-section">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h3>Aperçu des ventes</h3>
                                <div class="chart-legend">
                                    <span class="legend orders"><i class="fas fa-circle"></i> Commandes</span>
                                    <span class="legend courses"><i class="fas fa-circle"></i> Cours</span>
                                </div>
                            </div>
                            <canvas ref="salesChart"></canvas>
                        </div>
                    </div>

                    <div class="contact-section">
                        <div class="section-header">
                            <h3>Liste des contacts</h3>
                            <button class="btn-view">Voir les détails</button>
                        </div>
                        <div class="contact-actions">
                            <button class="btn-edit">Modifier</button>
                            <button class="btn-delete">Supprimer</button>
                        </div>
                        <div class="contact-table">
                            <div class="contact-row" v-for="contact in contacts" :key="contact.id">
                                <input type="checkbox">
                                <span class="client-name">{{ contact.nom }}</span>
                                <span class="course-name">{{ contact.cours }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE PROFIL -->
                <div v-if="currentModule === 'profile'" class="profile-module">
                    <div class="profile-card">
                        <div class="profile-header">
                            <div class="profile-avatar">
                                <img :src="userAvatar" alt="Avatar">
                                <button class="change-avatar-btn" @click="changeAvatar">
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                            <div class="profile-title">
                                <h2>{{ profileForm.name || userNom }}</h2>
                                <p>{{ profileForm.email || userEmail }}</p>
                                <div class="profile-badges">
                                    <span class="badge-admin">Administrateur</span>
                                    <span class="badge-active">Actif</span>
                                </div>
                            </div>
                            <button class="edit-profile-btn" @click="editProfile = !editProfile">
                                <i class="fas fa-edit"></i> Modifier le profil
                            </button>
                        </div>

                        <div v-if="editProfile" class="profile-form">
                            <h3>Modifier mes informations</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Nom complet</label>
                                    <input type="text" v-model="profileForm.name" placeholder="Jean Dupont">
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" v-model="profileForm.email" placeholder="email@example.com">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Téléphone</label>
                                    <input type="tel" v-model="profileForm.phone" placeholder="+33 6 12 34 56 78">
                                </div>
                                <div class="form-group">
                                    <label>Fonction</label>
                                    <input type="text" v-model="profileForm.role" placeholder="Administrateur">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Bio</label>
                                <textarea v-model="profileForm.bio" rows="3" placeholder="Présentation..."></textarea>
                            </div>
                            <div class="form-actions">
                                <button class="btn-save" @click="saveProfile">Enregistrer</button>
                                <button class="btn-cancel" @click="editProfile = false">Annuler</button>
                            </div>
                        </div>

                        <div class="profile-stats">
                            <div class="stat">
                                <div class="stat-value">156</div>
                                <div class="stat-label">Cours créés</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">2.8k</div>
                                <div class="stat-label">Étudiants</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">45k F</div>
                                <div class="stat-label">Revenus</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value">4.9</div>
                                <div class="stat-label">Note moyenne</div>
                            </div>
                        </div>

                        <div class="profile-info-section">
                            <h3>Informations de contact</h3>
                            <div class="info-grid">
                                <div class="info-item"><i class="fas fa-envelope"></i> {{ profileForm.email || userEmail }}</div>
                                <div class="info-item"><i class="fas fa-phone"></i> {{ profileForm.phone || '+33 6 12 34 56 78' }}</div>
                                <div class="info-item"><i class="fas fa-calendar-alt"></i> Inscrit depuis le 01/01/2024</div>
                                <div class="info-item"><i class="fas fa-shield-alt"></i> Dernière connexion: Aujourd'hui</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MODULE PARAMÈTRES -->
                <div v-if="currentModule === 'settings'" class="settings-module">
                    <div class="settings-card">
                        <div class="settings-tabs">
                            <button :class="{ active: settingsTab === 'general' }" @click="settingsTab = 'general'">
                                <i class="fas fa-globe"></i> Général
                            </button>
                            <button :class="{ active: settingsTab === 'email' }" @click="settingsTab = 'email'">
                                <i class="fas fa-envelope"></i> Email
                            </button>
                            <button :class="{ active: settingsTab === 'security' }" @click="settingsTab = 'security'">
                                <i class="fas fa-shield-alt"></i> Sécurité
                            </button>
                            <button :class="{ active: settingsTab === 'api' }" @click="settingsTab = 'api'">
                                <i class="fas fa-key"></i> API
                            </button>
                        </div>

                        <!-- Onglet Général -->
                        <div v-show="settingsTab === 'general'" class="settings-pane">
                            <h3>Paramètres généraux</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Nom du site</label>
                                    <input type="text" v-model="settings.siteName" placeholder="Udemy Clone">
                                </div>
                                <div class="form-group">
                                    <label>Slogan</label>
                                    <input type="text" v-model="settings.slogan" placeholder="Apprenez en ligne">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Email de contact</label>
                                    <input type="email" v-model="settings.contactEmail" placeholder="contact@example.com">
                                </div>
                                <div class="form-group">
                                    <label>Téléphone</label>
                                    <input type="tel" v-model="settings.phone" placeholder="+33 1 23 45 67 89">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Adresse</label>
                                <textarea v-model="settings.address" rows="2" placeholder="Adresse complète"></textarea>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Devise</label>
                                    <select v-model="settings.currency">
                                        <option value="EUR">Euro (€)</option>
                                        <option value="USD">Dollar ($)</option>
                                        <option value="GBP">Livre (£)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Langue</label>
                                    <select v-model="settings.language">
                                        <option value="fr">Français</option>
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Onglet Email -->
                        <div v-show="settingsTab === 'email'" class="settings-pane">
                            <h3>Configuration SMTP</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Mail Host</label>
                                    <input type="text" v-model="mailConfig.host" placeholder="smtp.example.com">
                                </div>
                                <div class="form-group">
                                    <label>Mail Port</label>
                                    <input type="number" v-model="mailConfig.port" placeholder="587">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Mail Username</label>
                                    <input type="text" v-model="mailConfig.username" placeholder="utilisateur">
                                </div>
                                <div class="form-group">
                                    <label>Mail Password</label>
                                    <input type="password" v-model="mailConfig.password" placeholder="••••••••">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Mail Encryption</label>
                                    <select v-model="mailConfig.encryption">
                                        <option value="tls">TLS</option>
                                        <option value="ssl">SSL</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>From Address</label>
                                    <input type="email" v-model="mailConfig.fromAddress" placeholder="noreply@example.com">
                                </div>
                            </div>
                            <button class="btn-test-email" @click="testEmailConfig">Tester la configuration</button>
                        </div>

                        <!-- Onglet Sécurité -->
                        <div v-show="settingsTab === 'security'" class="settings-pane">
                            <h3>Paramètres de sécurité</h3>
                            <div class="security-item">
                                <div class="security-info">
                                    <i class="fas fa-key"></i>
                                    <div>
                                        <strong>Changer le mot de passe</strong>
                                        <p>Modifiez votre mot de passe régulièrement</p>
                                    </div>
                                </div>
                                <button class="btn-change-password" @click="showChangePassword = true">Modifier</button>
                            </div>
                            <div class="security-item">
                                <div class="security-info">
                                    <i class="fas fa-mobile-alt"></i>
                                    <div>
                                        <strong>Authentification à deux facteurs</strong>
                                        <p>Sécurisez votre compte avec 2FA</p>
                                    </div>
                                </div>
                                <button class="btn-toggle-2fa" @click="security2FA = !security2FA" :class="{ active: security2FA }">
                                    {{ security2FA ? 'Désactiver' : 'Activer' }}
                                </button>
                            </div>
                            <div class="security-item">
                                <div class="security-info">
                                    <i class="fas fa-history"></i>
                                    <div>
                                        <strong>Sessions actives</strong>
                                        <p>Gérez vos sessions connectées</p>
                                    </div>
                                </div>
                                <button class="btn-logout-all" @click="logoutAllSessions">Déconnecter tout</button>
                            </div>
                        </div>

                        <!-- Onglet API -->
                        <div v-show="settingsTab === 'api'" class="settings-pane">
                            <h3>Clés API</h3>
                            <div class="api-item">
                                <div class="api-info">
                                    <strong>Clé API publique</strong>
                                    <code>pk_live_••••••••••••1234</code>
                                </div>
                                <button class="btn-copy" @click="copyToClipboard('pk_live_1234')">Copier</button>
                            </div>
                            <div class="api-item">
                                <div class="api-info">
                                    <strong>Clé API secrète</strong>
                                    <code>sk_live_••••••••••••5678</code>
                                </div>
                                <button class="btn-copy" @click="copyToClipboard('sk_live_5678')">Copier</button>
                            </div>
                            <button class="btn-regenerate" @click="regenerateApiKeys">Regénérer les clés</button>
                        </div>

                        <div class="settings-actions">
                            <button class="btn-reset" @click="resetSettings">Réinitialiser</button>
                            <button class="btn-save-settings" @click="saveAllSettings">Enregistrer</button>
                        </div>
                    </div>
                </div>

                <!-- AUTRES MODULES -->
                <component :is="currentComponent" v-else-if="currentModule !== 'dashboard' && currentModule !== 'profile' && currentModule !== 'settings'" />
            </div>

            <!-- FOOTER -->
            <footer class="footer">
                <p>Copyright © 2024. Tous droits réservés. | Tableau de bord administrateur Gradus Aura</p>
            </footer>
        </div>

        <!-- MODALE NOTIFICATIONS -->
        <div v-if="showNotificationsModal" class="modal-overlay" @click.self="closeNotificationsModal">
            <div class="modal-container modal-notifications">
                <div class="modal-header">
                    <h3><i class="fas fa-bell"></i> Notifications</h3>
                    <div class="modal-actions">
                        <button class="btn-mark-all" @click="markAllNotificationsRead">Tout lire</button>
                        <button class="modal-close" @click="closeNotificationsModal">&times;</button>
                    </div>
                </div>
                <div class="modal-body">
                    <div v-if="notificationsList.length === 0" class="empty-notifications">
                        <i class="far fa-bell-slash"></i>
                        <p>Aucune notification</p>
                    </div>
                    <div v-for="notif in notificationsList" :key="notif.id" class="notification-item" :class="{ unread: !notif.read }">
                        <div class="notif-icon" :class="notif.type">
                            <i :class="notif.icon"></i>
                        </div>
                        <div class="notif-content">
                            <p class="notif-title">{{ notif.title }}</p>
                            <p class="notif-message">{{ notif.message }}</p>
                            <span class="notif-time">{{ notif.time }}</span>
                        </div>
                        <button v-if="!notif.read" class="notif-mark-read" @click="markNotificationRead(notif.id)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-clear-all" @click="clearAllNotifications">Effacer toutes</button>
                    <button class="btn-close" @click="closeNotificationsModal">Fermer</button>
                </div>
            </div>
        </div>

        <!-- MODALE CHANGEMENT DE MOT DE PASSE -->
        <div v-if="showChangePassword" class="modal-overlay" @click.self="showChangePassword = false">
            <div class="modal-container modal-small">
                <div class="modal-header">
                    <h3><i class="fas fa-key"></i> Changer le mot de passe</h3>
                    <button class="modal-close" @click="showChangePassword = false">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Mot de passe actuel</label>
                        <input type="password" v-model="passwordForm.current" placeholder="Entrez votre mot de passe actuel">
                    </div>
                    <div class="form-group">
                        <label>Nouveau mot de passe</label>
                        <input type="password" v-model="passwordForm.new" placeholder="Entrez le nouveau mot de passe">
                    </div>
                    <div class="form-group">
                        <label>Confirmer le mot de passe</label>
                        <input type="password" v-model="passwordForm.confirm" placeholder="Confirmez le nouveau mot de passe">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="showChangePassword = false">Annuler</button>
                    <button class="btn-save" @click="changePassword">Modifier</button>
                </div>
            </div>
        </div>

        <!-- MODALE CONFIRMATION DÉCONNEXION -->
        <div v-if="showLogoutModal" class="modal-overlay" @click.self="showLogoutModal = false">
            <div class="modal-container modal-small">
                <div class="modal-header">
                    <h3><i class="fas fa-sign-out-alt"></i> Déconnexion</h3>
                    <button class="modal-close" @click="showLogoutModal = false">&times;</button>
                </div>
                <div class="modal-body text-center">
                    <i class="fas fa-question-circle logout-icon"></i>
                    <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="showLogoutModal = false">Annuler</button>
                    <button class="btn-logout" @click="performLogout">Déconnexion</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

// Import de tous les modules
import ModuleCategories from '../modules/ModuleCategories.vue'
import ModuleSubCategories from '../modules/ModuleSubCategories.vue'
import ModuleInstructeurs from '../modules/ModuleInstructeurs.vue'
import ModuleCours from '../modules/ModuleCours.vue'
import ModuleCommandes from '../modules/ModuleCommandes.vue'
import ModuleConfiguration from '../modules/ModuleConfiguration.vue'
import ModuleRapports from '../modules/ModuleRapports.vue'
import ModuleAppSettings from '../modules/ModuleAppSettings.vue'
import ModuleManageSlider from '../modules/ModuleManageSlider.vue'
import ModuleManageInfo from '../modules/ModuleManageInfo.vue'
import ModuleManagePartner from '../modules/ModuleManagePartner.vue'
import ModuleManageSubscriber from '../modules/ModuleManageSubscriber.vue'
import ModuleSiteSettings from '../modules/ModuleSiteSettings.vue'
import ModulePageSettings from '../modules/ModulePageSettings.vue'
import ModuleAvis from '../modules/ModuleAvis.vue'
import ModuleUtilisateurs from '../modules/ModuleUtilisateurs.vue'
import ModuleBlog from '../modules/ModuleBlog.vue'
import ModuleBlogCategory from '../modules/ModuleBlogCategory.vue'
import ModuleGoogleSetting from '../modules/ModuleGoogleSetting.vue'
import ModuleMailSetting from '../modules/ModuleMailSetting.vue'
import ModuleStripeSetting from '../modules/ModuleStripeSetting.vue'

export default {
    name: 'DashboardAdmin',
    components: {
        ModuleCategories,
        ModuleSubCategories,
        ModuleInstructeurs,
        ModuleCours,
        ModuleCommandes,
        ModuleConfiguration,
        ModuleRapports,
        ModuleAppSettings,
        ModuleManageSlider,
        ModuleManageInfo,
        ModuleManagePartner,
        ModuleManageSubscriber,
        ModuleSiteSettings,
        ModulePageSettings,
        ModuleAvis,
        ModuleUtilisateurs,
        ModuleBlog,
        ModuleBlogCategory,
        ModuleGoogleSetting,
        ModuleMailSetting,
        ModuleStripeSetting
    },
    data() {
        return {
            mobileMenuOpen: false,
            currentModule: 'dashboard',
            searchQuery: '',
            showUserMenu: false,
            showNotificationsModal: false,
            showLogoutModal: false,
            showChangePassword: false,
            editProfile: false,
            settingsTab: 'general',
            security2FA: false,
            userNom: 'Jean Dupont',
            userEmail: 'jean.dupont@gradusaura.com',
            userAvatar: 'https://ui-avatars.com/api/?background=3b82f6&color=fff&name=JD',
            dropdowns: {
                categories: false,
                configuration: false,
                appSettings: false,
                blog: false
            },
            profileForm: {
                name: 'Jean Dupont',
                email: 'jean.dupont@gradusaura.com',
                phone: '+33 6 12 34 56 78',
                role: 'Super Administrateur',
                bio: 'Administrateur de la plateforme gradus aura'
            },
            passwordForm: {
                current: '',
                new: '',
                confirm: ''
            },
            settings: {
                siteName: 'Gradus Aura',
                slogan: 'Apprenez en ligne',
                contactEmail: 'contact@gradusaura.com',
                phone: '+33 1 23 45 67 89',
                address: 'Paris, France',
                currency: 'EUR',
                language: 'fr'
            },
            mailConfig: {
                host: 'sandbox.smtp.mailtrap.io',
                port: 587,
                username: '',
                password: '',
                encryption: 'tls',
                fromAddress: 'noreply@gradusaura.com'
            },
            contacts: [
                { id: 1, nom: 'Thomas Richard', cours: 'React - La formation complète' },
                { id: 2, nom: 'Julie Petit', cours: 'Photoshop pour les pros' },
                { id: 3, nom: 'Nicolas Legrand', cours: 'Stratégies SEO avancées' }
            ],
            notificationsList: [
                { id: 1, title: 'Nouveau cours ajouté', message: 'React - La formation complète a été publié', time: 'Il y a 2 heures', type: 'success', icon: 'fas fa-check-circle', read: false },
                { id: 2, title: 'Nouvel étudiant inscrit', message: 'Jean Dupont vient de s\'inscrire sur la plateforme', time: 'Il y a 5 heures', type: 'info', icon: 'fas fa-user-plus', read: false },
                { id: 3, title: 'Avis en attente', message: '3 nouveaux avis nécessitent votre modération', time: 'Hier', type: 'warning', icon: 'fas fa-exclamation-triangle', read: true }
            ],
            salesChart: null,
            mois: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            commandesData: [2, 3, 4, 5, 6, 5, 7, 6, 8, 6, 5, 6],
            coursData: [1, 2, 3, 4, 5, 4, 6, 5, 7, 5, 4, 5]
        }
    },
    computed: {
        currentComponent() {
            const modules = {
                categories: 'ModuleCategories',
                subcategories: 'ModuleSubCategories',
                instructeurs: 'ModuleInstructeurs',
                cours: 'ModuleCours',
                commandes: 'ModuleCommandes',
                configuration: 'ModuleConfiguration',
                rapports: 'ModuleRapports',
                appSettings: 'ModuleAppSettings',
                slider: 'ModuleManageSlider',
                info: 'ModuleManageInfo',
                partner: 'ModuleManagePartner',
                subscriber: 'ModuleManageSubscriber',
                siteSettings: 'ModuleSiteSettings',
                pageSettings: 'ModulePageSettings',
                avis: 'ModuleAvis',
                utilisateurs: 'ModuleUtilisateurs',
                blog: 'ModuleBlog',
                blogCategory: 'ModuleBlogCategory',
                googleSetting: 'ModuleGoogleSetting',
                mailSetting: 'ModuleMailSetting',
                stripeSetting: 'ModuleStripeSetting'
            }
            return modules[this.currentModule] || null
        },
        unreadNotificationsCount() {
            return this.notificationsList.filter(n => !n.read).length
        }
    },
    mounted() {
        this.initChart()
        this.loadSavedData()
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
        toggleDropdown(menu) {
            this.dropdowns[menu] = !this.dropdowns[menu]
        },
        handleClickOutside(event) {
            if (!event.target.closest('.user-menu')) this.showUserMenu = false
        },
        openNotificationsModal() {
            this.showNotificationsModal = true
            this.showUserMenu = false
        },
        closeNotificationsModal() {
            this.showNotificationsModal = false
        },
        markNotificationRead(id) {
            const notif = this.notificationsList.find(n => n.id === id)
            if (notif) notif.read = true
        },
        markAllNotificationsRead() {
            this.notificationsList.forEach(n => n.read = true)
        },
        clearAllNotifications() {
            if (confirm('Supprimer toutes les notifications ?')) {
                this.notificationsList = []
                this.closeNotificationsModal()
            }
        },
        goToProfile() {
            this.currentModule = 'profile'
            this.showUserMenu = false
        },
        goToSettings() {
            this.currentModule = 'settings'
            this.showUserMenu = false
        },
        changeAvatar() {
            alert('Fonctionnalité à venir - Changer d\'avatar')
        },
        saveProfile() {
            this.userNom = this.profileForm.name
            this.userEmail = this.profileForm.email
            this.editProfile = false
            localStorage.setItem('user_profile', JSON.stringify(this.profileForm))
            alert('Profil mis à jour avec succès')
        },
        saveAllSettings() {
            localStorage.setItem('app_settings', JSON.stringify(this.settings))
            localStorage.setItem('mail_config', JSON.stringify(this.mailConfig))
            alert('Paramètres enregistrés avec succès')
        },
        resetSettings() {
            this.settings = {
                siteName: 'Gradus Aura',
                slogan: 'Apprenez en ligne',
                contactEmail: 'contact@gradusaura.com',
                phone: '+33 1 23 45 67 89',
                address: 'Paris, France',
                currency: 'EUR',
                language: 'fr'
            }
            this.mailConfig = {
                host: 'sandbox.smtp.mailtrap.io',
                port: 587,
                username: '',
                password: '',
                encryption: 'tls',
                fromAddress: 'noreply@gradusaura.com'
            }
            alert('Paramètres réinitialisés')
        },
        testEmailConfig() {
            alert('Test d\'email envoyé ! Vérifiez votre boîte de réception.')
        },
        changePassword() {
            if (this.passwordForm.new !== this.passwordForm.confirm) {
                alert('Les mots de passe ne correspondent pas')
                return
            }
            if (this.passwordForm.new.length < 6) {
                alert('Le mot de passe doit contenir au moins 6 caractères')
                return
            }
            alert('Mot de passe modifié avec succès')
            this.showChangePassword = false
            this.passwordForm = { current: '', new: '', confirm: '' }
        },
        logoutAllSessions() {
            if (confirm('Déconnecter toutes les sessions actives ?')) {
                alert('Toutes les sessions ont été déconnectées')
            }
        },
        copyToClipboard(text) {
            navigator.clipboard.writeText(text)
            alert('Clé copiée dans le presse-papier')
        },
        regenerateApiKeys() {
            if (confirm('Regénérer les clés API ? Les anciennes clés seront invalidées.')) {
                alert('Nouvelles clés API générées')
            }
        },
        confirmLogout() {
            this.showLogoutModal = true
            this.showUserMenu = false
        },
        performLogout() {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_profile')
            window.location.href = '/login'
        },
        loadSavedData() {
            const savedProfile = localStorage.getItem('user_profile')
            if (savedProfile) {
                const profile = JSON.parse(savedProfile)
                this.profileForm = profile
                this.userNom = profile.name
                this.userEmail = profile.email
            }
            const savedSettings = localStorage.getItem('app_settings')
            if (savedSettings) this.settings = JSON.parse(savedSettings)
            const savedMail = localStorage.getItem('mail_config')
            if (savedMail) this.mailConfig = JSON.parse(savedMail)
        },
        initChart() {
            const ctx = this.$refs.salesChart?.getContext('2d')
            if (ctx) {
                this.salesChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.mois,
                        datasets: [
                            { label: 'Commandes', data: this.commandesData, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.05)', fill: true, tension: 0.4, pointBackgroundColor: '#3b82f6' },
                            { label: 'Cours', data: this.coursData, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.05)', fill: true, tension: 0.4, pointBackgroundColor: '#ef4444' }
                        ]
                    },
                    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' }, tooltip: { mode: 'index', intersect: false } }, scales: { y: { beginAtZero: true, max: 8, title: { display: true, text: 'Valeur' } }, x: { title: { display: true, text: 'Mois' } } } }
                })
            }
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.dashboard-admin {
    display: flex;
    min-height: 100vh;
    background: #f5f7fb;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* ========== SIDEBAR ========== */
.sidebar {
    width: 280px;
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    z-index: 1000;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
}

.sidebar-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo i {
    font-size: 24px;
    color: #3b82f6;
}

.logo h2 {
    font-size: 20px;
    font-weight: 700;
}

.logo h2 span {
    color: #3b82f6;
}

.sidebar-close {
    display: none;
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
}

.sidebar-user {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.user-avatar img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
}

.user-info h4 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
}

.user-info p {
    font-size: 11px;
    color: #94a3b8;
}

.sidebar-nav {
    flex: 1;
    padding: 15px 0;
}

.nav-menu {
    list-style: none;
}

.nav-section-title {
    padding: 15px 20px 5px 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #64748b;
    text-transform: uppercase;
}

.nav-menu li {
    margin: 2px 0;
}

.nav-menu li a {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: #cbd5e1;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;
    gap: 12px;
    font-size: 13px;
}

.nav-menu li a i:first-child {
    width: 20px;
    font-size: 14px;
}

.nav-menu li a:hover {
    background: rgba(59,130,246,0.1);
    color: #fff;
    padding-left: 25px;
}

.nav-menu li.active a {
    background: linear-gradient(90deg, rgba(59,130,246,0.2) 0%, transparent 100%);
    color: #3b82f6;
    border-left: 3px solid #3b82f6;
}

.nav-dropdown .dropdown-icon {
    margin-left: auto;
    transition: transform 0.3s;
    font-size: 12px;
}

.nav-dropdown.expanded .dropdown-icon {
    transform: rotate(180deg);
}

.dropdown-menu {
    list-style: none;
    padding-left: 48px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.nav-dropdown.expanded .dropdown-menu {
    max-height: 300px;
}

.dropdown-menu li a {
    padding: 8px 15px;
    font-size: 12px;
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
}

.logout-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: rgba(239,68,68,0.15);
    border: 1px solid rgba(239,68,68,0.3);
    color: #f87171;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.3s;
}

.logout-btn:hover {
    background: rgba(239,68,68,0.25);
    border-color: #ef4444;
    color: #ef4444;
}

/* ========== MAIN CONTENT ========== */
.main-content {
    flex: 1;
    margin-left: 280px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Header */
.top-header {
    background: #fff;
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    position: sticky;
    top: 0;
    z-index: 99;
    flex-wrap: wrap;
    gap: 15px;
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
    color: #1e293b;
}

.search-bar {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border-radius: 40px;
    padding: 8px 18px;
    width: 350px;
}

.search-bar i {
    color: #94a3b8;
    margin-right: 10px;
}

.search-bar input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
    font-size: 13px;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.notification {
    position: relative;
    cursor: pointer;
}

.notification i {
    font-size: 20px;
    color: #64748b;
}

.notification .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ef4444;
    color: white;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 50%;
    min-width: 18px;
    text-align: center;
}

.user-menu {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    position: relative;
}

.user-menu img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-size: 13px;
    font-weight: 600;
}

.user-role {
    font-size: 10px;
    color: #64748b;
}

.user-dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    width: 200px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    z-index: 100;
    overflow: hidden;
}

.user-dropdown a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 15px;
    color: #1e293b;
    text-decoration: none;
    font-size: 13px;
    transition: background 0.2s;
}

.user-dropdown a:hover {
    background: #f1f5f9;
}

.user-dropdown hr {
    margin: 5px 0;
    border-color: #e2e8f0;
}

/* Content Wrapper */
.content-wrapper {
    flex: 1;
    padding: 24px;
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.stat-info h3 {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 5px;
}

.stat-info p {
    color: #64748b;
    font-size: 13px;
    margin-bottom: 5px;
}

.trend {
    font-size: 11px;
}

.trend.positive {
    color: #10b981;
}

.trend.neutral {
    color: #64748b;
}

.stat-icon {
    width: 55px;
    height: 55px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.stat-icon.purple { background: rgba(59,130,246,0.1); color: #3b82f6; }
.stat-icon.green { background: rgba(16,185,129,0.1); color: #10b981; }
.stat-icon.blue { background: rgba(59,130,246,0.1); color: #3b82f6; }
.stat-icon.orange { background: rgba(245,158,11,0.1); color: #f59e0b; }

/* Chart Section */
.chart-section { margin-bottom: 30px; }
.chart-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
.chart-header h3 { font-size: 18px; font-weight: 600; }
.chart-legend { display: flex; gap: 15px; }
.legend { display: flex; align-items: center; gap: 5px; font-size: 12px; }
.legend.orders i { color: #3b82f6; }
.legend.courses i { color: #ef4444; }
canvas { max-height: 300px; width: 100%; }

/* Contact Section */
.contact-section { background: white; border-radius: 16px; padding: 20px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.section-header h3 { font-size: 18px; font-weight: 600; }
.btn-view { background: #e0e7ff; color: #4f46e5; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 12px; }
.contact-actions { display: flex; gap: 10px; margin-bottom: 15px; }
.btn-edit { background: #dbeafe; color: #3b82f6; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; }
.btn-delete { background: #fee2e2; color: #ef4444; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; }
.contact-table { border-top: 1px solid #e2e8f0; }
.contact-row { display: flex; align-items: center; gap: 15px; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
.contact-row input { width: 18px; height: 18px; cursor: pointer; }
.client-name { font-weight: 500; width: 150px; }
.course-name { color: #64748b; flex: 1; }

/* Footer */
.footer { background: white; padding: 15px 24px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; }

/* Profile Module */
.profile-module { max-width: 1000px; margin: 0 auto; }
.profile-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.profile-header { background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px; display: flex; align-items: center; gap: 30px; flex-wrap: wrap; }
.profile-avatar { position: relative; }
.profile-avatar img { width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; object-fit: cover; }
.change-avatar-btn { position: absolute; bottom: 5px; right: 5px; background: white; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; color: #3b82f6; }
.profile-title h2 { color: white; font-size: 24px; margin-bottom: 5px; }
.profile-title p { color: rgba(255,255,255,0.8); margin-bottom: 10px; }
.profile-badges { display: flex; gap: 10px; }
.badge-admin { background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 12px; color: white; }
.badge-active { background: #10b981; padding: 4px 12px; border-radius: 20px; font-size: 12px; color: white; }
.edit-profile-btn { margin-left: auto; background: rgba(255,255,255,0.2); border: none; padding: 10px 20px; border-radius: 8px; color: white; cursor: pointer; }
.profile-form, .profile-info-section { padding: 30px; border-bottom: 1px solid #e2e8f0; }
.profile-form h3, .profile-info-section h3 { margin-bottom: 20px; color: #1e293b; }
.profile-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 30px; background: #f8fafc; }
.stat { text-align: center; }
.stat-value { font-size: 28px; font-weight: 700; color: #3b82f6; }
.stat-label { font-size: 13px; color: #64748b; margin-top: 5px; }
.info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
.info-item { display: flex; align-items: center; gap: 10px; padding: 12px; background: #f8fafc; border-radius: 8px; }
.info-item i { width: 20px; color: #3b82f6; }

/* Settings Module */
.settings-module { max-width: 900px; margin: 0 auto; }
.settings-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.settings-tabs { display: flex; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
.settings-tabs button { flex: 1; padding: 15px; background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 500; color: #64748b; transition: all 0.2s; }
.settings-tabs button.active { color: #3b82f6; border-bottom: 2px solid #3b82f6; background: white; }
.settings-pane { padding: 30px; }
.settings-pane h3 { margin-bottom: 20px; color: #1e293b; }
.settings-actions { padding: 20px 30px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 15px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 13px; color: #1e293b; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #3b82f6; }
.form-actions { display: flex; gap: 15px; margin-top: 20px; }
.btn-save { background: #3b82f6; color: white; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 500; }
.btn-cancel { background: #f1f5f9; color: #64748b; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; }
.btn-save-settings { background: #3b82f6; color: white; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; }
.btn-reset { background: #f1f5f9; color: #64748b; border: none; padding: 10px 24px; border-radius: 8px; cursor: pointer; }
.btn-test-email { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 10px; }
.security-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #e2e8f0; }
.security-info { display: flex; align-items: center; gap: 15px; }
.security-info i { font-size: 20px; color: #3b82f6; width: 40px; }
.security-info strong { display: block; margin-bottom: 3px; }
.security-info p { font-size: 12px; color: #64748b; }
.btn-change-password, .btn-toggle-2fa, .btn-logout-all { padding: 6px 16px; border-radius: 6px; font-size: 12px; cursor: pointer; }
.btn-change-password { background: #dbeafe; color: #3b82f6; border: none; }
.btn-toggle-2fa { background: #f1f5f9; border: 1px solid #e2e8f0; cursor: pointer; }
.btn-toggle-2fa.active { background: #10b981; color: white; border-color: #10b981; }
.btn-logout-all { background: #fee2e2; color: #ef4444; border: none; }
.api-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f8fafc; border-radius: 8px; margin-bottom: 10px; }
.api-info code { background: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; display: block; margin-top: 5px; }
.btn-copy { background: #dbeafe; color: #3b82f6; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
.btn-regenerate { background: #f59e0b; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 15px; width: 100%; }

/* Modals */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 2000; display: flex; align-items: center; justify-content: center; }
.modal-container { background: white; border-radius: 20px; max-width: 500px; width: 90%; max-height: 80vh; overflow: hidden; display: flex; flex-direction: column; animation: modalFadeIn 0.3s ease; }
.modal-notifications { max-width: 550px; }
.modal-small { max-width: 400px; }
@keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.modal-header { padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.modal-actions { display: flex; gap: 10px; align-items: center; }
.btn-mark-all { background: none; border: none; color: #3b82f6; font-size: 12px; cursor: pointer; }
.modal-close { background: none; border: none; font-size: 24px; cursor: pointer; color: #94a3b8; }
.modal-body { flex: 1; overflow-y: auto; padding: 20px; }
.modal-footer { padding: 15px 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; }
.btn-clear-all { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 13px; }
.btn-close { background: #f1f5f9; border: none; padding: 8px 20px; border-radius: 8px; cursor: pointer; }
.btn-logout { background: #ef4444; color: white; border: none; padding: 8px 20px; border-radius: 8px; cursor: pointer; }

/* Notification items */
.notification-item { display: flex; align-items: flex-start; gap: 15px; padding: 15px; border-bottom: 1px solid #e2e8f0; transition: background 0.2s; }
.notification-item.unread { background: #eff6ff; }
.notif-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.notif-icon.success { background: #d1fae5; color: #10b981; }
.notif-icon.info { background: #dbeafe; color: #3b82f6; }
.notif-icon.warning { background: #fed7aa; color: #f59e0b; }
.notif-content { flex: 1; }
.notif-title { font-weight: 600; margin-bottom: 5px; }
.notif-message { font-size: 13px; color: #64748b; margin-bottom: 5px; }
.notif-time { font-size: 11px; color: #94a3b8; }
.notif-mark-read { background: none; border: none; color: #3b82f6; cursor: pointer; padding: 5px; }
.empty-notifications { text-align: center; padding: 40px; color: #94a3b8; }
.empty-notifications i { font-size: 48px; margin-bottom: 15px; }
.logout-icon { font-size: 48px; color: #ef4444; margin-bottom: 15px; }
.text-center { text-align: center; }

/* Responsive */
@media (max-width: 1024px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); width: 280px; }
    .sidebar.sidebar-mobile-open { transform: translateX(0); }
    .sidebar-close { display: block; }
    .main-content { margin-left: 0; }
    .menu-toggle { display: block; }
    .stats-grid { grid-template-columns: 1fr; }
    .top-header { flex-direction: column; }
    .search-bar { width: 100%; }
    .header-actions { width: 100%; justify-content: space-between; }
    .user-details { display: none; }
    .profile-header { flex-direction: column; text-align: center; }
    .edit-profile-btn { margin-left: 0; }
    .form-row { grid-template-columns: 1fr; }
    .settings-tabs { flex-wrap: wrap; }
    .settings-tabs button { flex: none; width: 50%; }
}
</style>
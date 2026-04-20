import { createStore } from 'vuex';

const store = createStore({
    state: {
        // ========== AUTHENTIFICATION ==========
        user: null,
        token: localStorage.getItem('token'),
        
        // ========== DONNÉES ÉTUDIANT ==========
        // Téléchargements et activités utilisateur
        epreuvesTelechargees: JSON.parse(localStorage.getItem('gradus_epreuves_telechargees') || '[]'),
        inscriptionsConcours: JSON.parse(localStorage.getItem('gradus_inscriptions_concours') || '[]'),
        formationsInscrites: JSON.parse(localStorage.getItem('gradus_formations_inscrites') || '[]'),
        testsEffectues: JSON.parse(localStorage.getItem('gradus_tests_effectues') || '[]'),
        quizRealises: JSON.parse(localStorage.getItem('gradus_quiz_realises') || '[]'),
        
        // ========== DONNÉES FORMATEUR ==========
        // Cours créés par le formateur
        formateurCours: JSON.parse(localStorage.getItem('gradus_formateur_cours') || '[]'),
        // Étudiants inscrits
        formateurEtudiants: JSON.parse(localStorage.getItem('gradus_formateur_etudiants') || '[]'),
        // Examens créés
        formateurExamens: JSON.parse(localStorage.getItem('gradus_formateur_examens') || '[]'),
        // Quiz créés
        formateurQuiz: JSON.parse(localStorage.getItem('gradus_formateur_quiz') || '[]'),
        // Certifications créées
        formateurCertifications: JSON.parse(localStorage.getItem('gradus_formateur_certifications') || '[]'),
        // Diagrammes créés
        formateurDiagrammes: JSON.parse(localStorage.getItem('gradus_formateur_diagrammes') || '[]'),
        // Messages avec les étudiants
        formateurMessages: JSON.parse(localStorage.getItem('gradus_formateur_messages') || '[]'),
        // Événements du calendrier
        formateurEvenements: JSON.parse(localStorage.getItem('gradus_formateur_evenements') || '[]'),
        // Certificats délivrés
        certificatsDelivres: JSON.parse(localStorage.getItem('gradus_certificats_delivres') || '[]'),
        
        // ========== STATISTIQUES FORMATEUR ==========
        totalStudents: 156,
        totalRevenue: 1250
    },
    
    mutations: {
        // ========== AUTHENTIFICATION ==========
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('gradus_user', JSON.stringify(user));
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('gradus_user');
        },
        
        // ========== TÉLÉCHARGEMENTS ÉTUDIANT ==========
        ADD_TELECHARGEMENT(state, epreuve) {
            const existe = state.epreuvesTelechargees.some(e => 
                e.examen === epreuve.examen && 
                e.annee === epreuve.annee && 
                e.matiere === epreuve.matiere
            );
            if (!existe) {
                state.epreuvesTelechargees.push(epreuve);
                localStorage.setItem('gradus_epreuves_telechargees', JSON.stringify(state.epreuvesTelechargees));
            }
        },
        SUPPRIMER_TELECHARGEMENT(state, id) {
            state.epreuvesTelechargees = state.epreuvesTelechargees.filter(e => e.id !== id);
            localStorage.setItem('gradus_epreuves_telechargees', JSON.stringify(state.epreuvesTelechargees));
        },
        
        // ========== INSCRIPTIONS CONCOURS ÉTUDIANT ==========
        ADD_INSCRIPTION_CONCOURS(state, concours) {
            const existe = state.inscriptionsConcours.some(c => c.id === concours.id);
            if (!existe) {
                state.inscriptionsConcours.push({
                    ...concours,
                    dateInscription: new Date().toLocaleString(),
                    statut: 'en_cours'
                });
                localStorage.setItem('gradus_inscriptions_concours', JSON.stringify(state.inscriptionsConcours));
            }
        },
        ANNULER_INSCRIPTION_CONCOURS(state, id) {
            state.inscriptionsConcours = state.inscriptionsConcours.filter(c => c.id !== id);
            localStorage.setItem('gradus_inscriptions_concours', JSON.stringify(state.inscriptionsConcours));
        },
        
        // ========== INSCRIPTIONS FORMATIONS ÉTUDIANT ==========
        ADD_INSCRIPTION_FORMATION(state, formation) {
            const existe = state.formationsInscrites.some(f => f.id === formation.id);
            if (!existe) {
                state.formationsInscrites.push({
                    ...formation,
                    dateInscription: new Date().toLocaleString(),
                    progression: 0,
                    statut: 'en_cours'
                });
                localStorage.setItem('gradus_formations_inscrites', JSON.stringify(state.formationsInscrites));
            }
        },
        UPDATE_PROGRESSION_FORMATION(state, { id, progression }) {
            const formation = state.formationsInscrites.find(f => f.id === id);
            if (formation) {
                formation.progression = progression;
                localStorage.setItem('gradus_formations_inscrites', JSON.stringify(state.formationsInscrites));
            }
        },
        
        // ========== TESTS ET QUIZ ÉTUDIANT ==========
        ADD_TEST_RESULTAT(state, test) {
            state.testsEffectues.push({
                ...test,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('gradus_tests_effectues', JSON.stringify(state.testsEffectues));
        },
        ADD_QUIZ_RESULTAT(state, quiz) {
            state.quizRealises.push({
                ...quiz,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('gradus_quiz_realises', JSON.stringify(state.quizRealises));
        },
        
        // ========== GESTION DES COURS (FORMATEUR) ==========
        ADD_COURS(state, cours) {
            state.formateurCours.push({
                ...cours,
                id: Date.now(),
                dateCreation: new Date().toLocaleString(),
                status: 'Brouillon',
                progress: 0,
                students: 0
            });
            localStorage.setItem('gradus_formateur_cours', JSON.stringify(state.formateurCours));
        },
        UPDATE_COURS(state, { id, data }) {
            const index = state.formateurCours.findIndex(c => c.id === id);
            if (index !== -1) {
                state.formateurCours[index] = { ...state.formateurCours[index], ...data };
                localStorage.setItem('gradus_formateur_cours', JSON.stringify(state.formateurCours));
            }
        },
        DELETE_COURS(state, id) {
            state.formateurCours = state.formateurCours.filter(c => c.id !== id);
            localStorage.setItem('gradus_formateur_cours', JSON.stringify(state.formateurCours));
        },
        
        // ========== GESTION DES EXAMENS (FORMATEUR) ==========
        ADD_EXAMEN(state, examen) {
            state.formateurExamens.push({
                ...examen,
                id: Date.now(),
                dateCreation: new Date().toLocaleString(),
                status: 'Brouillon'
            });
            localStorage.setItem('gradus_formateur_examens', JSON.stringify(state.formateurExamens));
        },
        UPDATE_EXAMEN(state, { id, data }) {
            const index = state.formateurExamens.findIndex(e => e.id === id);
            if (index !== -1) {
                state.formateurExamens[index] = { ...state.formateurExamens[index], ...data };
                localStorage.setItem('gradus_formateur_examens', JSON.stringify(state.formateurExamens));
            }
        },
        DELETE_EXAMEN(state, id) {
            state.formateurExamens = state.formateurExamens.filter(e => e.id !== id);
            localStorage.setItem('gradus_formateur_examens', JSON.stringify(state.formateurExamens));
        },
        
        // ========== GESTION DES QUIZ (FORMATEUR) ==========
        ADD_QUIZ(state, quiz) {
            state.formateurQuiz.push({
                ...quiz,
                id: Date.now(),
                dateCreation: new Date().toLocaleString(),
                attempts: 0,
                averageScore: 0
            });
            localStorage.setItem('gradus_formateur_quiz', JSON.stringify(state.formateurQuiz));
        },
        UPDATE_QUIZ(state, { id, data }) {
            const index = state.formateurQuiz.findIndex(q => q.id === id);
            if (index !== -1) {
                state.formateurQuiz[index] = { ...state.formateurQuiz[index], ...data };
                localStorage.setItem('gradus_formateur_quiz', JSON.stringify(state.formateurQuiz));
            }
        },
        DELETE_QUIZ(state, id) {
            state.formateurQuiz = state.formateurQuiz.filter(q => q.id !== id);
            localStorage.setItem('gradus_formateur_quiz', JSON.stringify(state.formateurQuiz));
        },
        
        // ========== GESTION DES CERTIFICATIONS (FORMATEUR) ==========
        ADD_CERTIFICATION(state, certification) {
            state.formateurCertifications.push({
                ...certification,
                id: Date.now(),
                dateCreation: new Date().toLocaleString(),
                deliveredCount: 0
            });
            localStorage.setItem('gradus_formateur_certifications', JSON.stringify(state.formateurCertifications));
        },
        UPDATE_CERTIFICATION(state, { id, data }) {
            const index = state.formateurCertifications.findIndex(c => c.id === id);
            if (index !== -1) {
                state.formateurCertifications[index] = { ...state.formateurCertifications[index], ...data };
                localStorage.setItem('gradus_formateur_certifications', JSON.stringify(state.formateurCertifications));
            }
        },
        DELETE_CERTIFICATION(state, id) {
            state.formateurCertifications = state.formateurCertifications.filter(c => c.id !== id);
            localStorage.setItem('gradus_formateur_certifications', JSON.stringify(state.formateurCertifications));
        },
        
        // ========== GESTION DES CERTIFICATS DÉLIVRÉS ==========
        ADD_CERTIFICAT_DELIVRE(state, certificat) {
            state.certificatsDelivres.push({
                ...certificat,
                id: Date.now(),
                date: new Date().toLocaleString()
            });
            localStorage.setItem('gradus_certificats_delivres', JSON.stringify(state.certificatsDelivres));
            
            // Incrémenter le compteur de la certification correspondante
            const certification = state.formateurCertifications.find(c => c.id === certificat.certificationId);
            if (certification) {
                certification.deliveredCount++;
                localStorage.setItem('gradus_formateur_certifications', JSON.stringify(state.formateurCertifications));
            }
        },
        
        // ========== GESTION DES DIAGRAMMES (FORMATEUR) ==========
        ADD_DIAGRAMME(state, diagramme) {
            state.formateurDiagrammes.push({
                ...diagramme,
                id: Date.now(),
                dateCreation: new Date().toLocaleString()
            });
            localStorage.setItem('gradus_formateur_diagrammes', JSON.stringify(state.formateurDiagrammes));
        },
        UPDATE_DIAGRAMME(state, { id, data }) {
            const index = state.formateurDiagrammes.findIndex(d => d.id === id);
            if (index !== -1) {
                state.formateurDiagrammes[index] = { ...state.formateurDiagrammes[index], ...data };
                localStorage.setItem('gradus_formateur_diagrammes', JSON.stringify(state.formateurDiagrammes));
            }
        },
        DELETE_DIAGRAMME(state, id) {
            state.formateurDiagrammes = state.formateurDiagrammes.filter(d => d.id !== id);
            localStorage.setItem('gradus_formateur_diagrammes', JSON.stringify(state.formateurDiagrammes));
        },
        
        // ========== GESTION DES MESSAGES (FORMATEUR) ==========
        ADD_MESSAGE(state, message) {
            state.formateurMessages.push({
                ...message,
                id: Date.now(),
                date: new Date().toLocaleString(),
                lu: false
            });
            localStorage.setItem('gradus_formateur_messages', JSON.stringify(state.formateurMessages));
        },
        MARK_MESSAGE_AS_READ(state, id) {
            const message = state.formateurMessages.find(m => m.id === id);
            if (message) {
                message.lu = true;
                localStorage.setItem('gradus_formateur_messages', JSON.stringify(state.formateurMessages));
            }
        },
        
        // ========== GESTION DES ÉVÉNEMENTS (FORMATEUR) ==========
        ADD_EVENEMENT(state, evenement) {
            state.formateurEvenements.push({
                ...evenement,
                id: Date.now()
            });
            localStorage.setItem('gradus_formateur_evenements', JSON.stringify(state.formateurEvenements));
        },
        DELETE_EVENEMENT(state, id) {
            state.formateurEvenements = state.formateurEvenements.filter(e => e.id !== id);
            localStorage.setItem('gradus_formateur_evenements', JSON.stringify(state.formateurEvenements));
        },
        
        // ========== GESTION DES ÉTUDIANTS (FORMATEUR) ==========
        ADD_ETUDIANT(state, etudiant) {
            state.formateurEtudiants.push({
                ...etudiant,
                id: Date.now(),
                dateInscription: new Date().toLocaleString(),
                status: 'actif'
            });
            localStorage.setItem('gradus_formateur_etudiants', JSON.stringify(state.formateurEtudiants));
            state.totalStudents++;
        },
        UPDATE_ETUDIANT(state, { id, data }) {
            const index = state.formateurEtudiants.findIndex(e => e.id === id);
            if (index !== -1) {
                state.formateurEtudiants[index] = { ...state.formateurEtudiants[index], ...data };
                localStorage.setItem('gradus_formateur_etudiants', JSON.stringify(state.formateurEtudiants));
            }
        },
        DELETE_ETUDIANT(state, id) {
            state.formateurEtudiants = state.formateurEtudiants.filter(e => e.id !== id);
            localStorage.setItem('gradus_formateur_etudiants', JSON.stringify(state.formateurEtudiants));
            state.totalStudents--;
        },
        
        // ========== STATISTIQUES FORMATEUR ==========
        UPDATE_STATISTIQUES(state, { totalStudents, totalRevenue }) {
            if (totalStudents !== undefined) state.totalStudents = totalStudents;
            if (totalRevenue !== undefined) state.totalRevenue = totalRevenue;
        },
        
        // ========== RÉINITIALISATION COMPLÈTE ==========
        RESET_ALL_DATA(state) {
            // Données étudiant
            state.epreuvesTelechargees = [];
            state.inscriptionsConcours = [];
            state.formationsInscrites = [];
            state.testsEffectues = [];
            state.quizRealises = [];
            
            // Données formateur
            state.formateurCours = [];
            state.formateurEtudiants = [];
            state.formateurExamens = [];
            state.formateurQuiz = [];
            state.formateurCertifications = [];
            state.formateurDiagrammes = [];
            state.formateurMessages = [];
            state.formateurEvenements = [];
            state.certificatsDelivres = [];
            
            // Statistiques
            state.totalStudents = 0;
            state.totalRevenue = 0;
            
            // Nettoyage localStorage
            localStorage.removeItem('gradus_epreuves_telechargees');
            localStorage.removeItem('gradus_inscriptions_concours');
            localStorage.removeItem('gradus_formations_inscrites');
            localStorage.removeItem('gradus_tests_effectues');
            localStorage.removeItem('gradus_quiz_realises');
            localStorage.removeItem('gradus_formateur_cours');
            localStorage.removeItem('gradus_formateur_etudiants');
            localStorage.removeItem('gradus_formateur_examens');
            localStorage.removeItem('gradus_formateur_quiz');
            localStorage.removeItem('gradus_formateur_certifications');
            localStorage.removeItem('gradus_formateur_diagrammes');
            localStorage.removeItem('gradus_formateur_messages');
            localStorage.removeItem('gradus_formateur_evenements');
            localStorage.removeItem('gradus_certificats_delivres');
        },
        
        // ========== INITIALISATION DES DONNÉES EXEMPLES ==========
        INIT_EXAMPLE_DATA(state) {
            // Données de démonstration pour le formateur
            if (state.formateurCours.length === 0) {
                state.formateurCours = [
                    { id: 1, title: 'Préparation TCF Canada', description: 'Formation complète pour le TCF Canada', icon: 'fas fa-language', status: 'Publié', progress: 100, students: 45, dateCreation: '2024-01-15' },
                    { id: 2, title: 'Mathématiques Concours', description: 'Préparation aux épreuves de mathématiques', icon: 'fas fa-calculator', status: 'Publié', progress: 100, students: 38, dateCreation: '2024-02-10' },
                    { id: 3, title: 'Culture Générale', description: 'Révision complète de culture générale', icon: 'fas fa-globe', status: 'En création', progress: 65, students: 0, dateCreation: '2024-03-01' }
                ];
                localStorage.setItem('gradus_formateur_cours', JSON.stringify(state.formateurCours));
            }
            
            if (state.formateurCertifications.length === 0) {
                state.formateurCertifications = [
                    { id: 1, title: 'Certification TCF Canada', description: 'Atteste d\'un niveau B2 en français', courseName: 'Préparation TCF Canada', requiredScore: 75, deliveredCount: 28, courseId: 1 },
                    { id: 2, title: 'Certification Mathématiques', description: 'Maîtrise des concepts avancés', courseName: 'Mathématiques Concours', requiredScore: 70, deliveredCount: 15, courseId: 2 }
                ];
                localStorage.setItem('gradus_formateur_certifications', JSON.stringify(state.formateurCertifications));
            }
            
            if (state.formateurEtudiants.length === 0) {
                state.formateurEtudiants = [
                    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', initials: 'JD', coursesCount: 3, progress: 75, averageScore: 82, status: 'actif', dateInscription: '2025-03-01' },
                    { id: 2, name: 'Marie Claire', email: 'marie.claire@email.com', initials: 'MC', coursesCount: 2, progress: 60, averageScore: 78, status: 'actif', dateInscription: '2025-03-05' },
                    { id: 3, name: 'Paul Ngono', email: 'paul.ngono@email.com', initials: 'PN', coursesCount: 4, progress: 45, averageScore: 65, status: 'actif', dateInscription: '2025-02-28' }
                ];
                localStorage.setItem('gradus_formateur_etudiants', JSON.stringify(state.formateurEtudiants));
                state.totalStudents = state.formateurEtudiants.length;
            }
        }
    },
    
    actions: {
        // ========== AUTHENTIFICATION ==========
        login({ commit }, userData) {
            commit('setUser', userData.user);
            commit('setToken', userData.token);
            commit('INIT_EXAMPLE_DATA');
        },
        logout({ commit }) {
            commit('logout');
        },
        
        // ========== GESTION DU RÔLE UTILISATEUR ==========
        setUserRole({ commit }, role) {
            const user = JSON.parse(localStorage.getItem('gradus_user') || '{}');
            user.role = role;
            commit('setUser', user);
        },
        
        // ========== TÉLÉCHARGEMENTS ÉTUDIANT ==========
        addTelechargement({ commit }, epreuve) {
            commit('ADD_TELECHARGEMENT', epreuve);
        },
        supprimerTelechargement({ commit }, id) {
            commit('SUPPRIMER_TELECHARGEMENT', id);
        },
        
        // ========== INSCRIPTIONS CONCOURS ÉTUDIANT ==========
        addInscriptionConcours({ commit }, concours) {
            commit('ADD_INSCRIPTION_CONCOURS', concours);
        },
        annulerInscriptionConcours({ commit }, id) {
            commit('ANNULER_INSCRIPTION_CONCOURS', id);
        },
        
        // ========== INSCRIPTIONS FORMATIONS ÉTUDIANT ==========
        addInscriptionFormation({ commit }, formation) {
            commit('ADD_INSCRIPTION_FORMATION', formation);
        },
        updateProgressionFormation({ commit }, data) {
            commit('UPDATE_PROGRESSION_FORMATION', data);
        },
        
        // ========== TESTS ET QUIZ ÉTUDIANT ==========
        addTestResultat({ commit }, test) {
            commit('ADD_TEST_RESULTAT', test);
        },
        addQuizResultat({ commit }, quiz) {
            commit('ADD_QUIZ_RESULTAT', quiz);
        },
        
        // ========== GESTION DES COURS (FORMATEUR) ==========
        addCours({ commit }, cours) {
            commit('ADD_COURS', cours);
        },
        updateCours({ commit }, data) {
            commit('UPDATE_COURS', data);
        },
        deleteCours({ commit }, id) {
            commit('DELETE_COURS', id);
        },
        
        // ========== GESTION DES EXAMENS (FORMATEUR) ==========
        addExamen({ commit }, examen) {
            commit('ADD_EXAMEN', examen);
        },
        updateExamen({ commit }, data) {
            commit('UPDATE_EXAMEN', data);
        },
        deleteExamen({ commit }, id) {
            commit('DELETE_EXAMEN', id);
        },
        
        // ========== GESTION DES QUIZ (FORMATEUR) ==========
        addQuiz({ commit }, quiz) {
            commit('ADD_QUIZ', quiz);
        },
        updateQuiz({ commit }, data) {
            commit('UPDATE_QUIZ', data);
        },
        deleteQuiz({ commit }, id) {
            commit('DELETE_QUIZ', id);
        },
        
        // ========== GESTION DES CERTIFICATIONS (FORMATEUR) ==========
        addCertification({ commit }, certification) {
            commit('ADD_CERTIFICATION', certification);
        },
        updateCertification({ commit }, data) {
            commit('UPDATE_CERTIFICATION', data);
        },
        deleteCertification({ commit }, id) {
            commit('DELETE_CERTIFICATION', id);
        },
        
        // ========== GESTION DES CERTIFICATS DÉLIVRÉS ==========
        deliverCertificate({ commit }, certificat) {
            commit('ADD_CERTIFICAT_DELIVRE', certificat);
        },
        
        // ========== GESTION DES DIAGRAMMES (FORMATEUR) ==========
        addDiagramme({ commit }, diagramme) {
            commit('ADD_DIAGRAMME', diagramme);
        },
        updateDiagramme({ commit }, data) {
            commit('UPDATE_DIAGRAMME', data);
        },
        deleteDiagramme({ commit }, id) {
            commit('DELETE_DIAGRAMME', id);
        },
        
        // ========== GESTION DES MESSAGES (FORMATEUR) ==========
        sendMessage({ commit }, message) {
            commit('ADD_MESSAGE', message);
        },
        markMessageAsRead({ commit }, id) {
            commit('MARK_MESSAGE_AS_READ', id);
        },
        
        // ========== GESTION DES ÉVÉNEMENTS (FORMATEUR) ==========
        addEvenement({ commit }, evenement) {
            commit('ADD_EVENEMENT', evenement);
        },
        deleteEvenement({ commit }, id) {
            commit('DELETE_EVENEMENT', id);
        },
        
        // ========== GESTION DES ÉTUDIANTS (FORMATEUR) ==========
        addEtudiant({ commit }, etudiant) {
            commit('ADD_ETUDIANT', etudiant);
        },
        updateEtudiant({ commit }, data) {
            commit('UPDATE_ETUDIANT', data);
        },
        deleteEtudiant({ commit }, id) {
            commit('DELETE_ETUDIANT', id);
        },
        
        // ========== STATISTIQUES FORMATEUR ==========
        updateStatistiques({ commit }, data) {
            commit('UPDATE_STATISTIQUES', data);
        },
        
        // ========== RÉINITIALISATION ==========
        resetAllData({ commit }) {
            commit('RESET_ALL_DATA');
        },
        
        // ========== INITIALISATION ==========
        initExampleData({ commit }) {
            commit('INIT_EXAMPLE_DATA');
        }
    },
    
    getters: {
        // ========== AUTHENTIFICATION ==========
        isAuthenticated: (state) => !!state.token,
        user: (state) => state.user,
        userRole: (state) => state.user?.role || 'etudiant',
        
        // ========== TÉLÉCHARGEMENTS ÉTUDIANT ==========
        epreuvesTelechargees: (state) => state.epreuvesTelechargees,
        nombreEpreuvesTelechargees: (state) => state.epreuvesTelechargees.length,
        
        // ========== INSCRIPTIONS CONCOURS ÉTUDIANT ==========
        inscriptionsConcours: (state) => state.inscriptionsConcours,
        nombreConcoursInscrits: (state) => state.inscriptionsConcours.length,
        
        // ========== INSCRIPTIONS FORMATIONS ÉTUDIANT ==========
        formationsInscrites: (state) => state.formationsInscrites,
        nombreFormationsInscrites: (state) => state.formationsInscrites.length,
        progressionMoyenne: (state) => {
            if (state.formationsInscrites.length === 0) return 0;
            const total = state.formationsInscrites.reduce((sum, f) => sum + (f.progression || 0), 0);
            return Math.round(total / state.formationsInscrites.length);
        },
        
        // ========== TESTS ET QUIZ ÉTUDIANT ==========
        testsEffectues: (state) => state.testsEffectues,
        quizRealises: (state) => state.quizRealises,
        scoreMoyenTests: (state) => {
            if (state.testsEffectues.length === 0) return 0;
            const total = state.testsEffectues.reduce((sum, t) => sum + (t.score || 0), 0);
            return Math.round(total / state.testsEffectues.length);
        },
        scoreMoyenQuiz: (state) => {
            if (state.quizRealises.length === 0) return 0;
            const total = state.quizRealises.reduce((sum, q) => sum + (q.score || 0), 0);
            return Math.round(total / state.quizRealises.length);
        },
        
        // ========== STATISTIQUES GLOBALES ÉTUDIANT ==========
        statsGlobales: (state) => ({
            totalEpreuves: state.epreuvesTelechargees.length,
            totalConcours: state.inscriptionsConcours.length,
            totalFormations: state.formationsInscrites.length,
            totalTests: state.testsEffectues.length,
            totalQuiz: state.quizRealises.length,
            progressionMoyenne: (() => {
                if (state.formationsInscrites.length === 0) return 0;
                const total = state.formationsInscrites.reduce((sum, f) => sum + (f.progression || 0), 0);
                return Math.round(total / state.formationsInscrites.length);
            })()
        }),
        
        // ========== DONNÉES FORMATEUR ==========
        formateurCours: (state) => state.formateurCours,
        formateurEtudiants: (state) => state.formateurEtudiants,
        formateurExamens: (state) => state.formateurExamens,
        formateurQuiz: (state) => state.formateurQuiz,
        formateurCertifications: (state) => state.formateurCertifications,
        formateurDiagrammes: (state) => state.formateurDiagrammes,
        formateurMessages: (state) => state.formateurMessages,
        formateurEvenements: (state) => state.formateurEvenements,
        certificatsDelivres: (state) => state.certificatsDelivres,
        
        // ========== STATISTIQUES FORMATEUR ==========
        totalStudents: (state) => state.totalStudents,
        totalRevenue: (state) => state.totalRevenue,
        totalCertifications: (state) => state.formateurCertifications.length,
        totalCertificatesDelivered: (state) => state.certificatsDelivres.length,
        
        // ========== MESSAGES NON LUS ==========
        unreadMessagesCount: (state) => state.formateurMessages.filter(m => !m.lu).length,
        
        // ========== ÉVÉNEMENTS À VENIR ==========
        upcomingEvents: (state) => {
            const today = new Date().toLocaleDateString();
            return state.formateurEvenements.filter(e => e.date >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
        }
    }
});

export default store;
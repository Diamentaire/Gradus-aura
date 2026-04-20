import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Forcer le rôle formateur pour le développement (À SUPPRIMER EN PRODUCTION)
import { createApp } from 'vue';

// Attendre que l'app soit chargée
window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('gradus_user');
    if (user) {
        const userData = JSON.parse(user);
        if (userData.role !== 'formateur') {
            userData.role = 'formateur';
            localStorage.setItem('gradus_user', JSON.stringify(userData));
            console.log('✅ Rôle forcé à "formateur" pour le développement');
        }
    } else {
        // Créer un utilisateur formateur par défaut si aucun n'existe
        const defaultUser = {
            id: 1,
            fullname: 'Formateur Test',
            email: 'formateur@test.com',
            role: 'formateur',
            memberSince: new Date().toLocaleDateString()
        };
        localStorage.setItem('gradus_user', JSON.stringify(defaultUser));
        localStorage.setItem('gradus_token', 'fake-jwt-token');
        console.log('✅ Utilisateur formateur par défaut créé');
    }
});
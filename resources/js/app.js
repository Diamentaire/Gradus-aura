import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import store from './store';

// Importation correcte du routeur
import router from './router';

// Vérification supplémentaire
console.log('Router importé:', router);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

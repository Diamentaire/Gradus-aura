// resources/js/app.js
import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

// Import des styles
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp({});

// Créer et utiliser le store Pinia
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');
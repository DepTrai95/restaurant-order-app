import { createApp } from 'vue';
import App from './App.vue';
import './assets/scss/style.scss'
import router from './router.js';

const app = createApp(App);
// app.use(router); 
// app.use(PrimeVue, {});

app.mount('#app');

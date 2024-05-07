import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router.js';
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router); 

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, faFacebook, faInstagram, faTiktok);
app.component('font-awesome-icon', FontAwesomeIcon);

// PrimeVue
import "primeflex/primeflex.css";
import 'primevue/resources/themes/lara-dark-pink/theme.css';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar'; 
import Sidebar from 'primevue/sidebar';
import DialogService from 'primevue/dialogservice';
import Dialog from 'primevue/dialog';
import Image from 'primevue/image';
import Checkbox from 'primevue/checkbox';

app.use(PrimeVue, {
   ripple: true,
});
app.use(DialogService);
app.component('Button', Button);
app.component('Card', Card);
app.component('Menubar', Menubar);
app.component('Sidebar', Sidebar);
app.component('Dialog', Dialog);
app.component('Image', Image);
app.component('Checkbox', Checkbox);

app.mount('#app');
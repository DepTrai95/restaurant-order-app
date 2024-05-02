import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import { StoryblokVue, apiPlugin } from '@storyblok/vue';

const app = createApp(App);
app.use(router); 
app.use(StoryblokVue, {
  accessToken: 'hSfGUT3HAdLsBad99PskLwtt',
  bridge: process.env.NODE_ENV !== 'production', // optimizes by excluding the bridge on production
  use: [apiPlugin],
  apiOptions: {
     region: "eu",
  },
});

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, faFacebook, faInstagram, faTiktok);
app.component('font-awesome-icon', FontAwesomeIcon);

// PrimeVue
// import "primeicons/primeicons.css";
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
app.mount('#app');
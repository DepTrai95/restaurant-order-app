import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

const app = createApp(App);
app.use(router); 

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas);
app.component('font-awesome-icon', FontAwesomeIcon);

// PrimeVue
// import "primeicons/primeicons.css";
import 'primevue/resources/themes/lara-dark-pink/theme.css';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';

app.use(PrimeVue, {
   ripple: true,
});
app.component('Button', Button);
app.component('Card', Card);
app.component('Menubar', Menubar);


app.mount('#app');
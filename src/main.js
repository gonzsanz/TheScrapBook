import "@/assets/index.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Image from 'primevue/image';


const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('Image', Image);

app.mount('#app')

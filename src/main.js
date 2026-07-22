import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import './assets/my_bootstrap.css';
import './assets/global.css';
import './assets/pages.css';
import './assets/admin.css';
import './assets/manager.css';
import './assets/footer.css';
import './assets/header.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';


const app = createApp(App).use(bootstrap);

app.use(createPinia());
app.use(router);

app.mount('#app');

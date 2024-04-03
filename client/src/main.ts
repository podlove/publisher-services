import { createApp } from 'vue';
import { provideStore } from 'redux-vuex';
import router from './router';
import { store } from './store';
import { i18n } from './i18n';

import './style.css';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(i18n);
provideStore({ app, store });

app.mount('#app');

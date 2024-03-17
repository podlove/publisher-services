import { createApp } from 'vue'
import { provideStore } from 'redux-vuex';
import router from './router';
import { store } from './store';

import './style.css'
import App from './App.vue'

const app = createApp(App);

app.use(router)
provideStore({ app, store });

app.mount('#app');

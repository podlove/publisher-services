import { createWebHistory, createRouter } from 'vue-router';
import { actions, store } from '../store';

import Wizard from '../pages/Wizard.vue';
import Authenticate from '../pages/Authenticate.vue';

const routes = [
  { path: '/wizard', name: 'wizard', component: Wizard },
  { path: '/authenticate', name: 'authenticate', component: Authenticate }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  store.dispatch(actions.router.navigate(to));
});

export default router;

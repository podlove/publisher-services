import { createWebHistory, createRouter } from 'vue-router';
import { actions, store } from '../store';

import Onboarding from '../pages/onboarding/Onboarding.vue';

const routes = [
  { path: '/onboarding', name: 'onboarding', component: Onboarding }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  store.dispatch(actions.router.navigate(to));
});

export default router;

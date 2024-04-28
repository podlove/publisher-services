import { createWebHistory, createRouter } from 'vue-router';
import { actions, store } from '../store';

import Onboarding from '../pages/onboarding/Onboarding.vue';
import Select from '../pages/select/Select.vue';

const routes = [
  { path: '/onboarding', name: 'onboarding', component: Onboarding },
  { path: '/select', name: 'select', component: Select }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  store.dispatch(actions.router.navigate(to));
});

export default router;

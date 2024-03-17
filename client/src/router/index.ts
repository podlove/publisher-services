import { createWebHashHistory, createRouter } from 'vue-router';
import { actions, store } from '../store';

import Wizard from '../pages/Wizard.vue';

const routes = [{ path: '/wizard', name: 'wizard', component: Wizard }];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to) => {
  store.dispatch(actions.router.navigate(to));
});

export default router;

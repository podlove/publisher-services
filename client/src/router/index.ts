import { createWebHashHistory, createRouter } from 'vue-router';
import { actions, selectors, store } from '../store';

import Wizard from '../pages/Wizard.vue';
import Authenticate from '../pages/Authenticate.vue';

const routes = [
  { path: '/wizard', name: 'wizard', component: Wizard },
  { path: '/authenticate', name: 'authenticate', component: Authenticate }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  store.dispatch(actions.router.navigate(to));

  const state = store.getState();

  const user = selectors.authentication.user(state);
  const password = selectors.authentication.password(state);
  const site = selectors.authentication.site(state);
  console.log(to.name);
  if ((!user || !password || !site) && to.name !== 'authenticate') {
    next({ name: 'authenticate' });
  } else {
    next();
  }
});

export default router;

import { createSelector } from 'reselect';
import { get } from 'lodash-es';
import State from './state';
import * as router from './router.store';
import * as authentication from './authentication.store';
import * as onboarding from './onboarding.store';

const root = {
  router: (state: State): router.State => get(state, 'router', {}),
  authentication: (state: State): authentication.State => get(state, 'authentication', {}),
  onboarding: (state: State): onboarding.State => get(state, 'onboarding', {})
};

export default {
  authentication: {
    user: createSelector(root.authentication, authentication.selectors.user),
    password: createSelector(root.authentication, authentication.selectors.password),
    site: createSelector(root.authentication, authentication.selectors.site)
  },
  onboarding: {
    steps: createSelector(root.onboarding, onboarding.selectors.steps),
    current: createSelector(root.onboarding, onboarding.selectors.current),
    upcoming: createSelector(root.onboarding, onboarding.selectors.upcoming)
  }
};

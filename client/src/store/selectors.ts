import { createSelector } from 'reselect';
import { get } from 'lodash-es';
import State from './state';
import * as router from './router.store';
import * as authentication from './authentication.store';
import * as onboarding from './onboarding.store';
import * as runtime from './runtime.store';

const root = {
  router: (state: State): router.State => get(state, 'router', {}),
  authentication: (state: State): authentication.State => get(state, 'authentication', {}),
  onboarding: (state: State): onboarding.State => get(state, 'onboarding', {}),
  runtime: (state: State): runtime.State => get(state, 'runtime', {}),
};

export default {
  authentication: {
    user: createSelector(root.authentication, authentication.selectors.user),
    password: createSelector(root.authentication, authentication.selectors.password),
    site: createSelector(root.authentication, authentication.selectors.site)
  },
  onboarding: {
    steps: createSelector(root.onboarding, onboarding.selectors.steps),
    previous: createSelector(root.onboarding, onboarding.selectors.previous),
    current: createSelector(root.onboarding, onboarding.selectors.current),
    upcoming: createSelector(root.onboarding, onboarding.selectors.upcoming),
  },
  runtime: {
    language: createSelector(root.runtime, runtime.selectors.language),
  }
};

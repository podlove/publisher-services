import { createSelector } from 'reselect';
import { get } from 'lodash-es';
import State from './state';
import * as router from './router.store';
import * as authentication from './authentication.store';

const root = {
  router: (state: State): router.State => get(state, 'router', {}),
  authentication: (state: State): authentication.State => get(state, 'authentication', {})
};

export default {
  authentication: {
    user: createSelector(root.authentication, authentication.selectors.user),
    password: createSelector(root.authentication, authentication.selectors.password),
    site: createSelector(root.authentication, authentication.selectors.site),
  }
};

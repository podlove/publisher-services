import { createAction, handleActions, type Action } from 'redux-actions';
import { type RouteLocationNormalized } from 'vue-router';

export type navigatePayload = RouteLocationNormalized;

export type State = RouteLocationNormalized;

export const INITIAL_STATE: State = {
  fullPath: '',
  hash: '',
  matched: [],
  meta: {},
  name: '',
  params: {},
  path: '',
  query: {},
  redirectedFrom: undefined
};

export const actions = {
  navigate: createAction<navigatePayload>('ROUTER/NAVIGATE')
};

export const reducer = handleActions<State, any>(
  {
    [actions.navigate.toString()]: (_state, action: Action<RouteLocationNormalized>) => action.payload
  },
  INITIAL_STATE
);

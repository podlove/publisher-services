import { createAction, handleActions, type Action } from 'redux-actions';

export interface State {
  user: string | null;
  password: string | null;
  site: string | null;
}

export type setCredentialsPayload = State;

export const actions = {
  setCredentials: createAction<setCredentialsPayload>('AUTHENTICATE/SET_CREDENTIALS')
};

export const reducer = handleActions<State, any>(
  {
    [actions.setCredentials.toString()]: (_state, { payload }: Action<setCredentialsPayload>) =>
      payload
  },
  { user: null, password: null, site: null }
);

export const selectors = {
  user: (state: State) => state.user,
  password: (state: State) => state.password,
  site: (state: State) => state.site,
};

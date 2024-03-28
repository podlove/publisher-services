import { createAction, handleActions, type Action } from 'redux-actions';

export interface State {
  user: string | null;
  password: string | null;
  site: string | null;
}

export type setApplicationPasswordPayload = {
  user: string;
  password: string;
  site: string;
};

export const actions = {
  setApplicationPassword: createAction<setApplicationPasswordPayload>(
    'AUTHENTICATE/SET_APPLICATION_PASSWORD'
  )
};

export const reducer = handleActions<State, any>(
  {
    [actions.setApplicationPassword.toString()]: (
      state,
      { payload }: Action<setApplicationPasswordPayload>
    ) => ({ ...state, ...payload })
  },
  { user: null, password: null, site: null }
);

export const selectors = {
  user: (state: State) => state.user,
  password: (state: State) => state.password,
  site: (state: State) => state.site
};

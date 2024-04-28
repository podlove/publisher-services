import { createAction, handleActions, type Action } from 'redux-actions';

export interface State {
  type: null | 'import' | 'fresh';
}

export const INITIAL_STATE: State = {
  type: null
};

export type selectSetupTypeActionPayload = 'import' | 'fresh';

export const actions = {
  select: createAction<selectSetupTypeActionPayload>('SETUP_TYPE/SELECT')
};

export const reducer = handleActions<State, any>(
  {
    [actions.select.toString()]: (state, { payload }: Action<selectSetupTypeActionPayload>) => ({
      ...state,
      type: payload
    })
  },
  INITIAL_STATE
);

export const selectors = {
  type: (state: State) => state.type
};

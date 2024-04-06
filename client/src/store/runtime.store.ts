import { createAction, handleActions, type Action } from 'redux-actions';

export type languageActionPayload = string;

export type State = {
  language: string;
};

export const INITIAL_STATE: State = {
  language: navigator && navigator.language || 'en',
};

export const actions = {
  language: createAction<languageActionPayload>('RUNTIME/LANGUAGE')
};

export const reducer = handleActions<State, any>(
  {
    [actions.language.toString()]: (state, action: Action<languageActionPayload>) => ({
      ...state,
      language: action.payload
    })
  },
  INITIAL_STATE
);

export const selectors = {
  language: (state: State) => state.language
}

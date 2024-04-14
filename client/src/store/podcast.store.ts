import { createAction, handleActions, type Action } from 'redux-actions';

export interface State {
  name: string | null;
  description: string | null;
  image_name: string | null;
  image_data: string | null;
  language: string | null;
  category: string | null;
  explicit: boolean | null;
}

export type setPodcastNamePayload = string;
export type setPodcastDescriptionPayload = string;
export type setPodcastCoverNamePayload = string;
export type setPodcastCoverPayload = string;
export type setPodcastLanguagePayload = string;
export type setPodcastCategoryPayload = string;
export type setPodcastExplicitPayload = boolean;

export const actions = {
  setPodcastName: createAction<setPodcastNamePayload>('PODCAST/SET_NAME'),
  setPodcastDescription: createAction<setPodcastDescriptionPayload>('PODCAST/SET_DESCRIPTION'),
  setPodcastLanguage: createAction<setPodcastLanguagePayload>('PODCAST/SET_LANGUAGE'),
  setPodcastCategory: createAction<setPodcastCategoryPayload>('PODCAST/SET_CATEGORY'),
  setPodcastCoverName: createAction<setPodcastCoverNamePayload>('PODCAST/SET_COVER_NAME'),
  setPodcastCoverData: createAction<setPodcastCoverPayload>('PODCAST/SET_COVER_DATA'),
  setPodcastExplicit: createAction<setPodcastExplicitPayload>('PODCAST/SET_EXPLICIT'),
};

export const reducer = handleActions<State, any>(
  {
    [actions.setPodcastName.toString()]: (
      state, 
      { payload }: Action<setPodcastNamePayload>
     ) => ({ ...state, name: payload }),
     [actions.setPodcastDescription.toString()]: (
      state,
      { payload }: Action<setPodcastDescriptionPayload>
     ) => ({ ...state, description: payload}),
     [actions.setPodcastLanguage.toString()]: (
      state,
      { payload }: Action<setPodcastLanguagePayload>
     ) => ({ ...state, language: payload}),
     [actions.setPodcastCategory.toString()]: (
      state,
      { payload }: Action<setPodcastCategoryPayload>
     ) => ({ ...state, category: payload}),
     [actions.setPodcastCoverName.toString()]: (
      state,
      { payload }: Action<setPodcastCoverNamePayload>
     ) => ({ ...state, image_name: payload}),
     [actions.setPodcastCoverData.toString()]: (
      state,
      { payload }: Action<setPodcastCoverPayload>
     ) => ({ ...state, image_data: payload}),
     [actions.setPodcastExplicit.toString()]: (
      state,
      { payload }: Action<setPodcastExplicitPayload>
     ) => ({ ...state, explicit: payload})
  },
  { 
    name: null,
    description: null,
    image_name: null,
    image_data: null,
    language: null,
    category: null,
    explicit: null
  }
);

export const selectors = {
  name: (state: State) => state.name,
  description: (state: State) => state.description,
  image_name: (state: State) => state.image_name,
  image_data: (state: State) => state.image_data,
  language: (state: State) => state.language,
  category: (state: State) => state.category,
  explicit: (state: State) => state.explicit,
}

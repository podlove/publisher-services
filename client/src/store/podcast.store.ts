import { createAction, handleActions, type Action } from 'redux-actions';
import { category } from '../types/categories.types';
import { locales } from '../types/locales.types';

export interface State {
  name: string | null;
  description: string | null;
  author: string | null,
  image_name: string | null;
  image_data: string | null;
  language: locales | null;
  category: category | null;
  explicit: boolean | null;
  feed: string | null;
}

export type setPodcastNamePayload = string;
export type setPodcastDescriptionPayload = string;
export type setPodcastAuthorPayload = string;
export type setPodcastCoverPayload = File;
export type setPodcastCoverNamePayload = string | null;
export type setPodcastCoverDataPayload = string | null;
export type removePodcastCoverPayload = void;
export type setPodcastLanguagePayload = locales;
export type setPodcastCategoryPayload = category;
export type setPodcastExplicitPayload = boolean;
export type tooglePodcastExplicitPayload = void;
export type readFeedUrlPayload = void;
export type transferPodcastPayload = void;

export const actions = {
  setPodcastName: createAction<setPodcastNamePayload>('PODCAST/SET_NAME'),
  setPodcastDescription: createAction<setPodcastDescriptionPayload>('PODCAST/SET_DESCRIPTION'),
  setPodcastAuthor: createAction<setPodcastAuthorPayload>('PODCAST/SET_AUTHOR'),
  setPodcastLanguage: createAction<setPodcastLanguagePayload>('PODCAST/SET_LANGUAGE'),
  setPodcastCategory: createAction<setPodcastCategoryPayload>('PODCAST/SET_CATEGORY'),
  setPodcastCover: createAction<setPodcastCoverPayload>('PODCAST/SET_COVER'),
  setPodcastCoverName: createAction<setPodcastCoverNamePayload>('PODCAST/SET_COVER_NAME'),
  setPodcastCoverData: createAction<setPodcastCoverDataPayload>('PODCAST/SET_COVER_DATA'),
  removePodcastCover: createAction<removePodcastCoverPayload>('PODCAST/REMOVE_COVER'),
  setPodcastExplicit: createAction<setPodcastExplicitPayload>('PODCAST/SET_EXPLICIT'),
  tooglePodcastExplicit: createAction<tooglePodcastExplicitPayload>('PODCAST/TOGGLE_EXPLICIT'),
  readFeedUrl: createAction<readFeedUrlPayload>('PODCAST/READ_FEED_URL'),
  transferPodcast: createAction<transferPodcastPayload>('PODCAST/TRANSFER_DATA'),
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
     [actions.setPodcastAuthor.toString()]: (
      state,
      { payload }: Action<setPodcastAuthorPayload>
     ) => ({ ...state, author: payload}),
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
      { payload }: Action<setPodcastCoverDataPayload>
     ) => ({ ...state, image_data: payload}),
     [actions.setPodcastExplicit.toString()]: (
      state,
      { payload }: Action<setPodcastExplicitPayload>
     ) => ({ ...state, explicit: payload}),
     [actions.tooglePodcastExplicit.toString()]: (
      state,
      { payload }: Action<tooglePodcastExplicitPayload>
     ) => ({ ...state, explicit: !state.explicit})

  },
  { 
    name: null,
    description: null,
    author: null,
    image_name: null,
    image_data: null,
    language: null,
    category: null,
    explicit: null,
    feed: null
  }
);

export const selectors = {
  name: (state: State) => state.name,
  description: (state: State) => state.description,
  author: (state: State) => state.author,
  image_name: (state: State) => state.image_name,
  image_data: (state: State) => state.image_data,
  language: (state: State) => state.language,
  category: (state: State) => state.category,
  explicit: (state: State) => state.explicit,
  feed: (state: State) => state.feed,
}

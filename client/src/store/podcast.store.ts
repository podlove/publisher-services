import { createAction, handleActions, type Action } from 'redux-actions';
import { type category } from '../types/categories.types';
import { type locales } from '../types/locales.types';

export interface State {
  name: string | null;
  description: string | null;
  author: string | null;
  image_name: string | null;
  image_data: string | null;
  image_url: string | null;
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
export type setPodcastCoverUrlPayload = string | null;
export type removePodcastCoverPayload = void;
export type setPodcastLanguagePayload = locales;
export type setPodcastCategoryPayload = category;
export type setPodcastExplicitPayload = boolean;
export type tooglePodcastExplicitPayload = void;
export type readFeedUrlPayload = void;
export type setFeedUrlPayload = string;

export const actions = {
  setPodcastName: createAction<setPodcastNamePayload>('PODCAST/SET_NAME'),
  setPodcastDescription: createAction<setPodcastDescriptionPayload>('PODCAST/SET_DESCRIPTION'),
  setPodcastAuthor: createAction<setPodcastAuthorPayload>('PODCAST/SET_AUTHOR'),
  setPodcastLanguage: createAction<setPodcastLanguagePayload>('PODCAST/SET_LANGUAGE'),
  setPodcastCategory: createAction<setPodcastCategoryPayload>('PODCAST/SET_CATEGORY'),
  setPodcastCover: createAction<setPodcastCoverPayload>('PODCAST/SET_COVER'),
  setPodcastCoverName: createAction<setPodcastCoverNamePayload>('PODCAST/SET_COVER_NAME'),
  setPodcastCoverData: createAction<setPodcastCoverDataPayload>('PODCAST/SET_COVER_DATA'),
  setPodcastCoverUrl: createAction<setPodcastCoverUrlPayload>('PODCAST/SET_COVER_URL'),
  removePodcastCover: createAction<removePodcastCoverPayload>('PODCAST/REMOVE_COVER'),
  setPodcastExplicit: createAction<setPodcastExplicitPayload>('PODCAST/SET_EXPLICIT'),
  tooglePodcastExplicit: createAction<tooglePodcastExplicitPayload>('PODCAST/TOGGLE_EXPLICIT'),
  readFeedUrl: createAction<readFeedUrlPayload>('PODCAST/READ_FEED_URL'),
  setFeedUrl: createAction<setFeedUrlPayload>('PODCAST/SET_FEED_URL'),
  transferPodcast: createAction<void>('PODCAST/TRANSFER_PODCAST')
};

export const reducer = handleActions<State, any>(
  {
    [actions.setPodcastName.toString()]: (state, { payload }: Action<setPodcastNamePayload>) => ({
      ...state,
      name: payload
    }),
    [actions.setPodcastDescription.toString()]: (
      state,
      { payload }: Action<setPodcastDescriptionPayload>
    ) => ({ ...state, description: payload }),
    [actions.setPodcastAuthor.toString()]: (
      state,
      { payload }: Action<setPodcastAuthorPayload>
    ) => ({ ...state, author: payload }),
    [actions.setPodcastLanguage.toString()]: (
      state,
      { payload }: Action<setPodcastLanguagePayload>
    ) => ({ ...state, language: payload }),
    [actions.setPodcastCategory.toString()]: (
      state,
      { payload }: Action<setPodcastCategoryPayload>
    ) => ({ ...state, category: payload }),
    [actions.setPodcastCoverName.toString()]: (
      state,
      { payload }: Action<setPodcastCoverNamePayload>
    ) => ({ ...state, image_name: payload }),
    [actions.setPodcastCoverData.toString()]: (
      state,
      { payload }: Action<setPodcastCoverDataPayload>
    ) => ({ ...state,
      image_data: payload,
      image_url: null
    }),
    [actions.setPodcastCoverUrl.toString()]: (
      state,
      { payload }: Action<setPodcastCoverUrlPayload>
    ) => ({ ...state,
      image_url: payload,
      image_data: null
    }),
    [actions.setPodcastExplicit.toString()]: (
      state,
      { payload }: Action<setPodcastExplicitPayload>
    ) => ({ ...state, explicit: payload }),
    [actions.tooglePodcastExplicit.toString()]: (state) => ({
      ...state,
      explicit: !state.explicit
    }),
    [actions.setFeedUrl.toString()]: (state, { payload }: Action<setFeedUrlPayload>) => ({
      ...state,
      feed: payload
    })
  },
  {
    name: null,
    description: null,
    author: null,
    image_name: null,
    image_data: null,
    image_url: null,
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
  image_url: (state: State) => state.image_url,
  language: (state: State) => state.language,
  category: (state: State) => state.category,
  explicit: (state: State) => state.explicit,
  feed: (state: State) => state.feed
};

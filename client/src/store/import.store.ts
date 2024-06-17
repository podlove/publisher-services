import { createAction, handleActions, type Action } from 'redux-actions';

type FeedStatus = 'valid' | 'invalid' | 'not-set'

export interface State {
  feedUrl: string | null;
  feedStatus: FeedStatus;
}

export type validateFeedUrlPayload = string;
export type setFeedUrlPayload = string;
export type setFeedStatusPayload = FeedStatus;

export const actions = {
  validateFeedUrl: createAction<validateFeedUrlPayload>('IMPORT/VALIDATE_FEED_URL'),
  setFeedUrl: createAction<setFeedUrlPayload>('IMPORT/SET_FEED_URL'),
  setFeedStatus: createAction<setFeedStatusPayload>('IMPORT/SET_FEED_STATUS'),
};

export const reducer = handleActions<State, any>(
  {
    [actions.setFeedStatus.toString()]: (
      state,
      { payload }: Action<setFeedStatusPayload>
    ) => ({ ...state, feedStatus: payload}),
    [actions.setFeedUrl.toString()]: (
      state,
      { payload }: Action<setFeedUrlPayload>
    ) => ({ ...state, feedUrl: payload})
  },
  {
    feedUrl: null,
    feedStatus: 'not-set',
  }
);

export const selectors = {
  feedStatus: (state: State) => state.feedStatus,
  feedUrl: (state: State) => state.feedUrl,
};

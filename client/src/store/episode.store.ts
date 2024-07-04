import { createAction, handleActions, type Action } from 'redux-actions';
import { type Episode } from '../types/episode.types';

export interface State {
  episodes: {
    episode: Episode;
    importStarted: boolean;
    importFinished: boolean;
  }[];
}

export type addEpisodePayload = Episode;
export type removeEpisodePayload = string;

export const actions = {
  addEpisode: createAction<addEpisodePayload>('EPISODES/ADD_EPISODE'),
  removeEpisode: createAction<removeEpisodePayload>('EPISODES/REMOVE_EPISODE')
};

export const reducer = handleActions<State, any>(
  {
    [actions.addEpisode.toString()]: (state, { payload }: Action<addEpisodePayload>): State => {
      const episode = {
        episode: payload,
        importStarted: false,
        importFinished: false
      };
      return {
        ...state,
        episodes: [...state.episodes, episode]
      };
    },
    [actions.removeEpisode.toString()]: (state, { payload }: Action<removeEpisodePayload>) => ({
      ...state,
      episodes: state.episodes.filter((item) => item.episode.uuid !== payload)
    })
  },
  {
    episodes: []
  }
);

export const selectors = {
  episodes: (state: State) => state.episodes
};

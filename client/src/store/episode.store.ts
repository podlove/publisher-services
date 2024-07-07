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
export type clearEpisodesPayload = void;

export const actions = {
  addEpisode: createAction<addEpisodePayload>('EPISODES/ADD_EPISODE'),
  removeEpisode: createAction<removeEpisodePayload>('EPISODES/REMOVE_EPISODE'),
  clearEpisodes: createAction<clearEpisodesPayload>('EPISODES/CLEAR_EPISODES')
};

export const reducer = handleActions<State, any>(
  {
    [actions.addEpisode.toString()]: (state, { payload }: Action<addEpisodePayload>): State => {
      // Check if the new episode exists in the list
      const episodes = state.episodes.filter((item) => item.episode.uuid !== payload.uuid);
      const episode = {
        episode: payload,
        importStarted: false,
        importFinished: false
      };
      return {
        ...state,
        episodes: [...episodes, episode]
      };
    },
    [actions.removeEpisode.toString()]: (state, { payload }: Action<removeEpisodePayload>) => ({
      ...state,
      episodes: state.episodes.filter((item) => item.episode.uuid !== payload)
    }),
    [actions.clearEpisodes.toString()]: (state, { payload }: Action<clearEpisodesPayload>) => ({
      ...state,
      episodes: []
    }),
  },
  {
    episodes: []
  }
);

export const selectors = {
  episodes: (state: State) => state.episodes
};

import { createAction, handleActions, type Action } from 'redux-actions';

export interface State {
  episodes: {
    title: string | null;
    uuid: string;
    pub_date: Date;
    enclosure: {
      url: string;
      type: string;
    };
    importStarted: boolean;
    importFinished: boolean;
  }[];
}

export type addEpisodePayload = {
  title: string;
  uuid: string;
  pub_date: string;
  enclosure: {
    url: string;
    type: string;
  };
};
export type removeEpisodePayload = string;

export const actions = {
  addEpisode: createAction<addEpisodePayload>('EPISODES/ADD_EPISODE'),
  removeEpisode: createAction<removeEpisodePayload>('EPISODES/REMOVE_EPISODE')
};

export const reducer = handleActions<State, any>(
  {
    [actions.addEpisode.toString()]: (state, { payload }: Action<addEpisodePayload>): State => {
      const episode = {
        title: payload.title,
        uuid: payload.uuid,
        pub_date: payload.pub_date,
        enclosure: {
          url: payload.enclosure.url,
          type: payload.enclosure.type
        },
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
      episodes: state.episodes.filter((episode) => episode.uuid !== payload)
    })
  },
  {
    episodes: []
  }
);

export const selectors = {
  episodes: (state: State) => state.episodes
};

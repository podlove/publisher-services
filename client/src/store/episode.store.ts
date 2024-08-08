import { createAction, handleActions, type Action } from 'redux-actions';
import { type Episode } from '../types/episode.types';

export type State = {
  selectedEpisode: string | null;
  importRunning: boolean;
  episodes: {
    guid: string;
    data: Episode;
    status: {
      detailsFetched: boolean;
      importStarted: boolean;
      importRunning: boolean;
      importFinished: boolean;
      importError: boolean;
    };
  }[];
};

export type addEpisodePayload = Episode[];
export type addEpisodeDetailsPayload = Partial<Episode>;
export type removeEpisodePayload = string;
export type clearEpisodesPayload = void;
export type episodeImportStartedPayload = string;
export type episodeImportFailedPayload = string;
export type episodeImportFinishedPayload = string;
export type selectEpisodePayload = string;

export const actions = {
  addEpisodes: createAction<addEpisodePayload>('EPISODES/ADD_EPISODE'),
  removeEpisode: createAction<removeEpisodePayload>('EPISODES/REMOVE_EPISODE'),
  addEpisodeDetails: createAction<addEpisodeDetailsPayload>('EPISODES/DETAILS_FETCHED'),
  episodeImportStarted: createAction<episodeImportStartedPayload>(
    'EPISODES/EPISODE_IMPORT_STARTED'
  ),
  episodeImportFailed: createAction<episodeImportFailedPayload>('EPISODES/EPISODE_IMPORT_FAILED'),
  episodeImportFinished: createAction<episodeImportFinishedPayload>('EPISODES/EPISODE_IMPORT_FINISHED'),
  selectEpisode: createAction<selectEpisodePayload>('EPISODES/SELECT_EPISODE'),
  startImport: createAction<void>('EPISODES/START_IMPORT'),
  stopImport: createAction<void>('EPISODES/STOP_IMPORT'),
  restartImport: createAction<void>('EPISODES/RESTART_IMPORT'),
  finishImport: createAction<void>('EPISODES/FINISH_IMPORT'),
};

export const reducer = handleActions<State, any>(
  {
    [actions.addEpisodes.toString()]: (state, { payload }: Action<addEpisodePayload>): State => {
      // Check if the new episode exists in the list
      const episodes = payload.map(episode => ({
        guid: episode.guid,
        data: episode,
        status: {
          detailsFetched: false,
          importStarted: false,
          importRunning: false,
          importFinished: false,
          importError: false
        }
      }))

      return { ...state, episodes };
    },
    [actions.addEpisodeDetails.toString()]: (
      state,
      { payload }: Action<addEpisodeDetailsPayload>
    ): State => {
      const episodes = state.episodes.map((episode) => {
        if (episode.guid !== payload.guid) {
          return episode;
        }

        return {
          ...episode,
          data: {
            ...episode.data,
            ...payload
          },
          status: {
            ...episode.status,
            detailsFetched: true
          }
        }
      });

      return {
        ...state,
        episodes
      }
    },
    [actions.removeEpisode.toString()]: (state, { payload }: Action<removeEpisodePayload>) => ({
      ...state,
      episodes: state.episodes.filter((item) => item.guid !== payload)
    }),
    [actions.episodeImportStarted.toString()]: (
      state,
      { payload }: Action<episodeImportStartedPayload>
    ): State => {
      const episodes = state.episodes.map((episode) => {
        if (episode.guid !== payload) {
          return episode;
        }

        return {
          ...episode,
          status: {
            ...episode.status,
            importStarted: true,
            importRunning: true
          }
        }
      });

      return {
        ...state,
        episodes
      }
    },
    [actions.episodeImportFailed.toString()]: (
      state,
      { payload }: Action<episodeImportFailedPayload>
    ): State => {
      const episodes = state.episodes.map((episode) => {
        if (episode.guid !== payload) {
          return episode;
        }

        return {
          ...episode,
          status: {
            ...episode.status,
            importRunning: false,
            importError: true
          }
        }
      });

      return {
        ...state,
        episodes
      }
    },
    [actions.episodeImportFinished.toString()]: (
      state,
      { payload }: Action<episodeImportFinishedPayload>
    ): State => {
      const episodes = state.episodes.map((episode) => {
        if (episode.guid !== payload) {
          return episode;
        }

        return {
          ...episode,
          status: {
            ...episode.status,
            importRunning: false,
            importFinished: true
          }
        }
      });

      return {
        ...state,
        episodes
      }
    },
    [actions.selectEpisode.toString()]: (state, { payload }: Action<selectEpisodePayload>) => ({
      ...state,
      selectedEpisode: payload
    }),
    [actions.startImport.toString()]: (state) => ({
      ...state,
      importRunning: true
    }),
    [actions.stopImport.toString()]: (state) => ({
      ...state,
      importRunning: false
    }),
    [actions.finishImport.toString()]: (state) => ({
      ...state,
      importRunning: false
    }),
    [actions.restartImport.toString()]: (state) => ({
      ...state,
      importRunning: true,
      episodes: state.episodes.map((episode) => ({
        ...episode,
        status: {
          ...episode.status,
          importStarted: false,
          importRunning: false,
          importFinished: false,
          importError: false
        }
      }))
    }),
  },
  {
    selectedEpisode: null,
    episodes: [],
    importRunning: false
  }
);

export const selectors = {
  episodes: (state: State) => state.episodes,
  importRunning: (state: State) => state.importRunning,
  nextEpisodeToImport: (state: State) =>
    state.episodes.find((item) => !item.status.importFinished && !item.status.importError),
  episodeInImport: (state: State) =>
    state.episodes.find((item) => !item.status.importFinished && item.status.importRunning),
  selectedEpisode: (state: State) => state.episodes.find(episode => episode.guid === state.selectedEpisode)?.data
};

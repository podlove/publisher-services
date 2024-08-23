import { select } from 'redux-saga/effects';
import * as request from '../../lib/request';
import { selectors } from '../../store';
import { type State as EpisodeState } from '../../store/episode.store';

export function* setOnboardingPodcastSettings() {
  const episodes : EpisodeState = yield select(selectors.episodes.list);
  if (!episodes || episodes.length === 0) {
    yield request.post(request.origin('/api/v1/set_podcast_settings'), { params: {}, data: {} });
  }

  const hasContributor = episodes.some(
    (episode) => episode.data.contributors && episode.data.contributors.length > 0
  );
  const hasTranscript = episodes.some(
    (episode) => episode.data.transcript && episode.data.transcript.url && episode.data.transcript.url.length > 0
  );

  const module = {
    transcript: hasTranscript,
    contributor: hasContributor
  };
  yield request.post(request.origin('/api/v1/set_podcast_settings'), { params: {}, data: module });
}

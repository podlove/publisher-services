import { select, takeEvery } from 'redux-saga/effects';
import { identity, pick } from 'lodash-es';
import * as localStorage from '../lib/local-storage';
import { actions } from '../store';

function* persist() {
  const state = yield select(identity);
  localStorage.save(
    'REDUX_STATE',
    pick(state, ['authentication', 'podcast', 'onboarding', 'feed', 'episodes'])
  );
}

export default function* routerSaga() {
  yield takeEvery(
    [
      actions.authentication.setApplicationPassword.toString(),

      actions.onboarding.setSetupType.toString(),
      actions.onboarding.next.toString(),
      actions.onboarding.previous.toString(),

      actions.podcast.setPodcastName.toString(),
      actions.podcast.setPodcastDescription.toString(),
      actions.podcast.setPodcastLanguage.toString(),
      actions.podcast.setPodcastCategory.toString(),
      actions.podcast.setPodcastCoverName.toString(),
      actions.podcast.setPodcastCoverData.toString(),
      actions.podcast.setPodcastExplicit.toString(),

      actions.feed.setFeedStatus.toString(),
      actions.feed.setFeedUrl.toString(),

      actions.episodes.addEpisode.toString(),
      actions.episodes.removeEpisode.toString()
    ],
    persist
  );
}

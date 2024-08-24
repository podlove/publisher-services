import { select, takeEvery } from 'redux-saga/effects';
import { identity } from 'lodash-es';
import { actions, type State } from '../store';
import { persistState } from '../lib/persist';

function* persist() {
  const state: State = yield select(identity);
  persistState(state)
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

      actions.episodes.addEpisodes.toString(),
    ],
    persist
  );
}

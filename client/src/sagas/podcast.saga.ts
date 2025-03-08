import { call, put, takeEvery } from 'redux-saga/effects';
import { type Action } from 'redux-actions';
import { convertImageToBase64 } from '../lib/image';

import { actions } from '../store';
import * as request from '../lib/request';
import { type setPodcastCoverPayload } from '../store/podcast.store';
import { setOnboardingPodcastSettings } from './helpers/settings';
import { savePodcastMetadata } from './helpers/podcast';
import { i18n } from '../i18n';

const { t } = i18n.global;

function readImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    convertImageToBase64(file, function (base64Image: string) {
      resolve(base64Image);
    });
  });
}

function* getImageData({ payload }: Action<setPodcastCoverPayload>) {
  if (!payload) return;
  const imageData: string = yield call(readImage, payload);

  if (imageData) {
    yield put(actions.podcast.setPodcastCoverData(imageData));
    yield put(actions.podcast.setPodcastCoverName((payload as File).name));
  }
}

function* removeImage() {
  yield put(actions.podcast.setPodcastCoverData(null));
  yield put(actions.podcast.setPodcastCoverName(null));
  yield put(actions.podcast.setPodcastCoverUrl(null));
}

function* transferPodcast() {
  try {
    yield setOnboardingPodcastSettings();
    yield savePodcastMetadata();
    yield put(actions.podcast.readFeedUrl());
    yield put(actions.onboarding.next());
  } catch (error) {
    yield put(
      actions.notifications.error({
        title: 'Error saving podcast',
        details: error as string
      })
    );
  }
}

function* readFeedUrl() {
  let feed: string | null;

  try {
    feed = yield request.get(request.origin('api/v1/podcast_feed_url'), { params: {} });
  } catch (err) {
    feed = null;
    yield put(
      actions.notifications.error({
        title: t('onboarding.error.podcast.feedUrl.title'),
        details: t('onboarding.error.podcast.feedUrl.details')
      })
    );
  }

  if (!feed) {
    return;
  }

  yield put(actions.podcast.setFeedUrl(feed));
}

export default function* podcastSaga() {
  yield takeEvery(actions.podcast.removePodcastCover.toString(), removeImage);
  yield takeEvery(actions.podcast.setPodcastCover.toString(), getImageData);
  yield takeEvery(actions.podcast.readFeedUrl.toString(), readFeedUrl);
  yield takeEvery(actions.podcast.transferPodcast.toString(), transferPodcast);
}

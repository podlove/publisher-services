import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { convertImageToBase64, extractImageType } from '../lib/image';

import { actions, selectors } from '../store';
import * as request from '../lib/request';
import { locales } from '../types/locales.types';
import { category } from '../types/categories.types';
import { setPodcastCoverPayload } from '../store/podcast.store';
import { savePodcastMetadata } from './helpers/podcast';


function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    convertImageToBase64(file, function (base64Image: string) {
      resolve(base64Image);
    });
  });
}

function* getImageData({ payload }: Action<setPodcastCoverPayload>) {
  if (!payload) return;
  const imageData = yield call(readImage, payload);
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
  yield savePodcastMetadata();
  yield put(actions.onboarding.next());
}

function* readFeedUrl() {
  const feed : string = yield request.get(request.origin('api/v1/podcast_feed_url'), { params:{} } );
  if (feed) {
    yield put(actions.podcast.setFeedUrl(feed))
  }
}

export default function* podcastSaga() {
  yield takeEvery(actions.podcast.removePodcastCover.toString(), removeImage);
  yield takeEvery(actions.podcast.setPodcastCover.toString(), getImageData);
  yield takeEvery(actions.podcast.readFeedUrl.toString(), readFeedUrl);
  yield takeEvery(actions.podcast.transferPodcast.toString(), transferPodcast);
}

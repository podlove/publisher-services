import { call, put, select, takeEvery } from 'redux-saga/effects';
import { convertImageToBase64, extractImageType } from '../lib/image';

import { actions, selectors } from '../store';
import * as request from '../lib/request';
import { locales } from '../types/locales.types';
import { category } from '../types/categories.types';
import { setPodcastCoverPayload } from '../store/podcast.store';
import { Action } from 'redux-actions';


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
}

function* transferPodcast() {
  const currentStep = yield select(selectors.onboarding.current);

  if (currentStep !== 'start-new-next-steps') {
    return;
  }

  const name: string = yield select(selectors.podcast.name);
  const description: string = yield select(selectors.podcast.description);
  const author: string = yield select(selectors.podcast.author);
  const language: locales = yield select(selectors.podcast.language);
  const category: category = yield select(selectors.podcast.category);
  const explicit: boolean = yield select(selectors.podcast.explicit);

  const image_data: string = yield select(selectors.podcast.image_data);
  const image_name: string = yield select(selectors.podcast.image_name);

  const parts: string[] = image_data.split(',');
  const image_type: string | null = extractImageType(parts[0]);

  const podcast = {
    name: name,
    description: description,
    author: author,
    language: language.tag,
    category: category.api,
    explicit: explicit ? 'true' : 'false'
  };

  const image = {
    base64Data: parts[1],
    name: image_name,
    type: image_type
  };

  yield request.post(request.origin('/api/v1/save_podcast'), { params: {}, data: podcast });
  yield request.post(request.origin('/api/v1/save_podcast_image'), { params: {}, data: image });
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
  yield takeEvery(actions.onboarding.next.toString(), transferPodcast);
}

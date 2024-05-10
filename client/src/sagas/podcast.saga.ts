import { call, put, select, takeEvery } from 'redux-saga/effects';
import { convertImageToBase64, extractImageType } from '../lib/image';

import * as podcast from '../store/podcast.store';
import * as request from '../lib/request';
import { selectors } from '../store';
import { locales } from '../types/locales.types';
import { category } from '../types/categories.types';

function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    convertImageToBase64(file, function (base64Image: string) {
      resolve(base64Image);
    });
  });
}

function* getImageData({ payload }: any) {
  if (payload) {
    const imageData = yield call(readImage, payload);
    if (imageData) {
      yield put(podcast.actions.setPodcastCoverData(imageData));
      yield put(podcast.actions.setPodcastCoverName((payload as File).name));
    }
  }
}

function* removeImage() {
  yield put(podcast.actions.setPodcastCoverData(null));
  yield put(podcast.actions.setPodcastCoverName(null));
}

function* transferPodcast() {
  const user: string = yield select(selectors.authentication.user);
  const password: string = yield select(selectors.authentication.password);
  const site: string = yield select(selectors.authentication.site);

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
    wordpress: {
      user: user,
      password: password,
      site: site
    },
    podcast: {
      name: name,
      description: description,
      author: author,
      language: language.tag,
      category: category.api,
      explicit: explicit ? 'true' : 'false'
    }
  };

  const image = {
    wordpress: {
      user: user,
      password: password,
      site: site
    },
    podcast_image: {
      base64Data: parts[1],
      name: image_name,
      type: image_type
    }
  };

  request.post(request.origin('/api/v1/save_podcast'), { params: {}, data: podcast });
  request.post(request.origin('/api/v1/save_podcast_image'), { params: {}, data: image });
}

export default function* podcastSaga() {
  yield takeEvery(podcast.actions.removePodcastCover.toString(), removeImage);
  yield takeEvery(podcast.actions.setPodcastCover.toString(), getImageData);
  yield takeEvery(podcast.actions.transferPodcast.toString(), transferPodcast);
}

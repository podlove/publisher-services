import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { convertImageToBase64 } from '../lib/image'

import * as podcast from '../store/podcast.store'

function readImage(file: File) : Promise<string> {
  return new Promise((resolve, reject) => {
    convertImageToBase64(file, function(base64Image: string) {
        resolve(base64Image);
    });
  });
}

function* getImageData({payload} : any) {
  if(payload) {
    const imageData = yield call(readImage, payload)
    if (imageData) {
      yield put(podcast.actions.setPodcastCoverData(imageData))
      yield put(podcast.actions.setPodcastCoverName((payload as File).name))
    }
  }
}

function* removeImage() {
  yield put(podcast.actions.setPodcastCoverData(null))
  yield put(podcast.actions.setPodcastCoverName(null))
}

export default function* podcastSaga() {
  yield takeEvery(podcast.actions.removePodcastCover.toString(), removeImage)
  yield takeEvery(podcast.actions.setPodcastCover.toString(), getImageData)
}

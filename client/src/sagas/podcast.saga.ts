import { fork, put, takeEvery } from 'redux-saga/effects';
import * as podcast from '../store/podcast.store'

function* removeImage() {
  yield put(podcast.actions.setPodcastCoverData(null))
  yield put(podcast.actions.setPodcastCoverName(null))
}

export default function* podcastSaga() {
  yield takeEvery(podcast.actions.removePodcastCover.toString(), removeImage)
}

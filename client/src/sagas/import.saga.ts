import { takeEvery, put } from "redux-saga/effects";
import { Action } from 'redux-actions';

import { actions } from "../store";
import { validateFeedUrlPayload } from "../store/import.store";
import * as request from '../lib/request';

function* validateFeedUrl({payload}: Action<validateFeedUrlPayload>) {
  const feed = {
    url: payload
  }
  try {
    const response : any = yield request.get(request.origin('api/v1/fetch_feed'), {params: feed});
    yield put(actions.importFeed.setFeedStatus('valid'));
    yield put(actions.importFeed.setFeedUrl(payload));
    }
  catch (error) {
    yield put(actions.importFeed.setFeedStatus('invalid'));  
    yield put(actions.importFeed.setFeedUrl(''));
  }
}

export default function* importFeedSaga() {
  yield takeEvery(actions.importFeed.validateFeedUrl.toString(), validateFeedUrl);
}
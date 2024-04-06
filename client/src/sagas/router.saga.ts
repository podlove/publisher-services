import { Action } from 'redux-actions';
import { delay, fork, put, takeEvery } from 'redux-saga/effects';
import { get } from 'lodash-es';
import { actions } from '../store';
import { navigatePayload } from '../store/router.store';
import * as request from '../lib/request';

function* authenticate(payload: navigatePayload) {
  const site = get(payload, ['query', 'site_url'], null);
  const user = get(payload, ['query', 'user_login'], null);
  const password = get(payload, ['query', 'password'], null);

  if (site && user && password) {
    yield put(actions.authentication.setApplicationPassword({ site, user, password }));
  }
}

function* runtime(payload: navigatePayload) {
  const lang = get(payload, ['query', 'lang'], null);

  if (lang) {
    yield put(actions.runtime.language(lang));
  }
}

function* navigate({ payload }: Action<navigatePayload>) {
  yield fork(authenticate, payload);
  yield fork(runtime, payload);
}

export default function* routerSaga() {
  yield takeEvery(actions.router.navigate.toString(), navigate);
}

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

function* demo() {
  const test = yield request.get(request.origin('/api/demo'));
  console.log(test);
}

function* navigate({ payload }: Action<navigatePayload>) {
  switch (payload.name) {
    case 'wizard':
      yield fork(authenticate, payload);
      yield delay(1000);
      yield fork(demo);
  }
}

export default function* routerSaga() {
  yield takeEvery(actions.router.navigate.toString(), navigate);
}

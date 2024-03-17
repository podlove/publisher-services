import { Action } from 'redux-actions';
import { fork, put, takeEvery } from 'redux-saga/effects';
import { get } from 'lodash-es';
import { actions } from '../store';
import { navigatePayload } from '../store/router.store';

function* authenticate(payload: navigatePayload) {
  const site = get(payload, ['query', 'site_url'], null);
  const user = get(payload, ['query', 'user_login'], null);
  const password = get(payload, ['query', 'password'], null);

  if (!site || !user || !password) {
    return;
  }

  yield put(actions.authentication.setCredentials({ site, user, password }));
}

function* navigate({ payload }: Action<navigatePayload>) {
  switch (payload.name) {
    case 'wizard':
      yield fork(authenticate, payload);
  }
}

export default function* routerSaga() {
  yield takeEvery(actions.router.navigate.toString(), navigate);
}

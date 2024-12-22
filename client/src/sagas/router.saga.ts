import { type Action } from 'redux-actions';
import { fork, put, takeEvery } from 'redux-saga/effects';
import { get } from 'lodash-es';
import { actions } from '../store';
import { type navigatePayload } from '../store/router.store';

function* authenticate(payload: navigatePayload) {
  const site = get(payload, ['query', 'site_url'], null) as string | null;
  const rest_endpoint = get(payload, ['query', 'rest_url'], null) as string | null;
  const user = get(payload, ['query', 'user_login'], null) as string | null;
  const password = get(payload, ['query', 'password'], null) as string | null;

  if (site && user && password) {
    yield put(
      actions.authentication.setApplicationPassword({ site, user, password, rest_endpoint })
    );
  }
}

function* runtime(payload: navigatePayload) {
  const lang = get(payload, ['query', 'lang'], null) as string | null;

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

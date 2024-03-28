import { select, takeEvery } from 'redux-saga/effects';
import { identity, pick } from 'lodash-es';
import * as localStorage from '../lib/local-storage';
import { actions } from '../store';

function* persist() {
  const state = yield select(identity);
  localStorage.save('REDUX_STATE', pick(state, ['authentication']));
}

export default function* routerSaga() {
  yield takeEvery(
    [
      // actions.authentication.setApplicationPassword.toString()
    ],
    persist
  );
}

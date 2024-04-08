import { takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { actions } from '../store';
import { i18n } from '../i18n';

function* setLanguage({ payload }: Action<'de' | 'en'>) {
  i18n.global.locale.value = payload;
}

export default function* runtimeSaga() {
  yield takeEvery([actions.runtime.language.toString()], setLanguage);
}

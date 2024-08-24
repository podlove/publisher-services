import { pick } from 'lodash-es';
import type { State } from '../store';
import * as localStorage from '../lib/local-storage';

const persistKey = (): string | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('site_url');
  } catch (err) {
    return null;
  }
};

export const persistState = (state: State) => {
  const key = persistKey();

  if (!key) {
    return;
  }

  localStorage.save(
    key,
    pick(state, ['authentication', 'podcast', 'onboarding', 'feed', 'episodes'])
  );
};

export const getPersistedState= (): Partial<State> | undefined => {
  const key = persistKey();

  if (!key) {
    return undefined;
  }

  return localStorage.get<Partial<State>>(key) || undefined;
}

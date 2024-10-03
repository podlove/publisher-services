import { createStore as createReduxStore, applyMiddleware, compose, type Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import routerSaga from '../sagas/router.saga';
import persistSaga from '../sagas/persist.saga';
import runtimeSaga from '../sagas/runtime.saga';
import podcastSaga from '../sagas/podcast.saga';
import importSaga from '../sagas/import.saga';
import { getPersistedState } from '../lib/persist';

import selectors from './selectors';
import actions from './actions';
import reducers from './reducers';
import type State from './state';


const createStore = () => {
  let composeEnhancers = compose;
  let preloadedState: Partial<State> | undefined = undefined;

  const sagaMiddleware = createSagaMiddleware();

  if (globalThis.window) {
    composeEnhancers = (globalThis.window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    preloadedState = getPersistedState();
  }

  const store = createReduxStore(
    reducers,
    preloadedState as any,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(routerSaga);
  sagaMiddleware.run(persistSaga);
  sagaMiddleware.run(runtimeSaga);
  sagaMiddleware.run(podcastSaga);
  sagaMiddleware.run(importSaga);

  return store as unknown as Store<State, any, any>;
};

const store = createStore();

export { selectors, actions, type State, store };

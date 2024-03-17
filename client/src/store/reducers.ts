import { combineReducers } from 'redux';
import { reducer as router } from './router.store';
import { reducer as authentication } from './authentication.store';

export default combineReducers({
  router,
  authentication
});

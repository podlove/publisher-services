import { combineReducers } from 'redux';
import { reducer as router } from './router.store';
import { reducer as authentication } from './authentication.store';
import { reducer as onboarding } from './onboarding.store';
import { reducer as runtime } from './runtime.store';

export default combineReducers({
  router,
  authentication,
  onboarding,
  runtime
});

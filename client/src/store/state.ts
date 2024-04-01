import { type State as router } from './router.store';
import { type State as authentication } from './authentication.store';
import { type State as onboarding } from './onboarding.store';

export default interface State {
  router: router,
  authentication: authentication,
  onboarding: onboarding,
}

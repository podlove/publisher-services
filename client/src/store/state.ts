import { type State as router } from './router.store';
import { type State as authentication } from './authentication.store';

export default interface State {
  router: router,
  authentication: authentication
}

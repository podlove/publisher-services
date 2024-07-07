import { type State as router } from './router.store';
import { type State as authentication } from './authentication.store';
import { type State as onboarding } from './onboarding.store';
import { type State as runtime } from './runtime.store';
import { type State as podcast } from './podcast.store';
import { type State as importFeed } from './import.store';
import { type State as episodes } from './episode.store'

export default interface State {
  router: router,
  authentication: authentication,
  onboarding: onboarding,
  runtime: runtime,
  podcast: podcast,
  importFeed: importFeed,
  episodes: episodes,
}

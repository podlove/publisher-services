import { type State as router } from './router.store';
import { type State as authentication } from './authentication.store';
import { type State as onboarding } from './onboarding.store';
import { type State as runtime } from './runtime.store';
import { type State as podcast } from './podcast.store';
import { type State as feed } from './feed.store';
import { type State as episodes } from './episode.store';
import { type State as notifications } from './notifications.store';

export default interface State {
  router: router,
  authentication: authentication,
  onboarding: onboarding,
  runtime: runtime,
  podcast: podcast,
  feed: feed,
  episodes: episodes,
  notifications: notifications,
}

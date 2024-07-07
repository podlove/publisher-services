import { actions as router } from './router.store';
import { actions as authentication } from './authentication.store';
import { actions as onboarding } from './onboarding.store';
import { actions as runtime } from './runtime.store';
import { actions as podcast } from './podcast.store';
import { actions as importFeed } from './import.store';
import { actions as episodes } from './episode.store';

export default {
  router,
  authentication,
  onboarding,
  runtime,
  podcast,
  importFeed,
  episodes,
};

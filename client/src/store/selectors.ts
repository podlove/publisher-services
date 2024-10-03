import { createSelector } from 'reselect';
import { get } from 'lodash-es';
import type State from './state';
import * as router from './router.store';
import * as authentication from './authentication.store';
import * as onboarding from './onboarding.store';
import * as runtime from './runtime.store';
import * as podcast from './podcast.store';
import * as feed from './feed.store';
import * as episodes from './episode.store';
import * as notifications from './notifications.store';
import { onboardingUpcomingEnabled } from './lib/validations';

const root = {
  router: (state: State): router.State => get(state, 'router', {}) as router.State,
  authentication: (state: State): authentication.State =>
    get(state, 'authentication', {}) as authentication.State,
  onboarding: (state: State): onboarding.State => get(state, 'onboarding', {}) as onboarding.State,
  runtime: (state: State): runtime.State => get(state, 'runtime', {}) as runtime.State,
  podcast: (state: State): podcast.State => get(state, 'podcast', {}) as podcast.State,
  feed: (state: State): feed.State => get(state, 'feed', {}) as feed.State,
  episodes: (state: State): episodes.State => get(state, 'episodes', {}) as episodes.State,
  notifications: (state: State): notifications.State => get(state, 'notifications', []) as notifications.State
};

export default {
  authentication: {
    user: createSelector(root.authentication, authentication.selectors.user),
    password: createSelector(root.authentication, authentication.selectors.password),
    site: createSelector(root.authentication, authentication.selectors.site)
  },
  onboarding: {
    steps: createSelector(root.onboarding, onboarding.selectors.steps),
    previous: createSelector(root.onboarding, onboarding.selectors.previous),
    nextAction: createSelector(root.onboarding, onboarding.selectors.nextAction),
    previousAction: createSelector(root.onboarding, onboarding.selectors.previousAction),
    current: createSelector(root.onboarding, onboarding.selectors.current),
    upcoming: createSelector(root.onboarding, onboarding.selectors.upcoming),
    upcomingEnabled: onboardingUpcomingEnabled,
    setupType: createSelector(root.onboarding, onboarding.selectors.setupType)
  },
  runtime: {
    language: createSelector(root.runtime, runtime.selectors.language)
  },
  podcast: {
    name: createSelector(root.podcast, podcast.selectors.name),
    description: createSelector(root.podcast, podcast.selectors.description),
    author: createSelector(root.podcast, podcast.selectors.author),
    image_name: createSelector(root.podcast, podcast.selectors.image_name),
    image_data: createSelector(root.podcast, podcast.selectors.image_data),
    image_url: createSelector(root.podcast, podcast.selectors.image_url),
    language: createSelector(root.podcast, podcast.selectors.language),
    category: createSelector(root.podcast, podcast.selectors.category),
    explicit: createSelector(root.podcast, podcast.selectors.explicit),
    feed: createSelector(root.podcast, podcast.selectors.feed)
  },
  feed: {
    feedStatus: createSelector(root.feed, feed.selectors.feedStatus),
    feedUrl: createSelector(root.feed, feed.selectors.feedUrl)
  },
  episodes: {
    list: createSelector(root.episodes, episodes.selectors.episodes),
    nextEpisodeToImport: createSelector(root.episodes, episodes.selectors.nextEpisodeToImport),
    selectedEpisode: createSelector(root.episodes, episodes.selectors.selectedEpisode),
    importRunning: createSelector(root.episodes, episodes.selectors.importRunning),
    episodeInImport: createSelector(root.episodes, episodes.selectors.episodeInImport)
  },
  notifications: root.notifications
};

import { takeEvery, put, select, debounce } from 'redux-saga/effects';
import { type Action } from 'redux-actions';
import { get, pickBy } from 'lodash-es';

import { actions, selectors } from '../store';
import { type validateFeedUrlPayload } from '../store/feed.store';
import * as request from '../lib/request';
import { findCategories } from '../helper/categories';
import { LanguageLocales } from '../types/locales.types';
import { type Episode, type EpisodeDetailsPayload } from '../types/episode.types';
import { setOnboardingPodcastSettings } from './helpers/settings';
import { savePodcastMetadata } from './helpers/podcast';
import { i18n } from '../i18n';

const { t } = i18n.global;

function* validateFeedUrl({ payload }: Action<validateFeedUrlPayload>) {
  const feed = payload.trim();
  yield put(actions.feed.setFeedUrl(feed));

  if (feed === '') {
    yield put(actions.feed.setFeedStatus('not-set'));
    return;
  }

  try {
    yield request.get(request.origin('api/v1/fetch_feed'), {
      params: { feed_url: feed }
    });
    yield put(actions.feed.setFeedStatus('valid'));
  } catch (error) {
    yield put(actions.feed.setFeedStatus('invalid'));
  }
}

function* fetchPodcastMetaData(): any {
  const feedUrl: string = yield select(selectors.feed.feedUrl);
  let podcast: any;

  try {
    const response: any = yield request.get(request.origin('api/v1/fetch_feed'), {
      params: {
        feed_url: feedUrl,
        force_refresh: true
      }
    });

    podcast = get(response, ['podcast'], null);
  } catch (err) {
    podcast = null;
    yield put(
      actions.notifications.error({
        title: t('onboarding.error.podcast.metadata.title'),
        details: t('onboarding.error.podcast.metadata.details')
      })
    );
  }

  if (!podcast) {
    return;
  }

  yield put(actions.podcast.setPodcastName(get(podcast, ['title'], '')));
  yield put(actions.podcast.setPodcastDescription(get(podcast, ['description'], '')));
  yield put(actions.podcast.setPodcastAuthor(get(podcast, ['owner', 'name'], '')));
  yield put(actions.podcast.setPodcastExplicit(get(podcast, ['explicit'], '')));
  yield put(actions.podcast.setPodcastCoverUrl(get(podcast, ['image'], '')));

  const lang = get(podcast, ['language'], '');
  const language = LanguageLocales.find((item) => item.tag === lang);
  if (language) {
    yield put(actions.podcast.setPodcastLanguage(language));
  }

  const categories = get(podcast, ['categories'], null);

  yield put(actions.onboarding.next());

  if (!categories) {
    return;
  }

  const category = findCategories(categories);

  if (category) {
    yield put(actions.podcast.setPodcastCategory(category));
  }
}

function* fetchEpisodes(): any {
  const feedUrl: string = yield select(selectors.feed.feedUrl);

  let episodes: null | any[] = null;

  try {
    const response: any = yield request.get(request.origin('api/v1/fetch_feed'), {
      params: { feed_url: feedUrl }
    });

    episodes = get(response, ['episodes'], null);
  } catch (err) {
    episodes = null;
    yield put(
      actions.notifications.error({
        title: t('onboarding.error.podcast.episodes.title'),
        details: t('onboarding.error.podcast.episodes.details')
      })
    );
  }

  if (episodes === null) {
    return;
  }

  yield put(
    actions.episodes.addEpisodes(
      (episodes as any).map((episode: Episode) => ({
        title: get(episode, 'title', null),
        guid: get(episode, 'guid', null),
        pub_date: get(episode, 'pub_date', null),
        enclosure: {
          url: get(episode, ['enclosure', 'url'], null),
          type: get(episode, ['enclosure', 'type'], null)
        },
        cover: get(episode, 'cover', null),
        contributors: get(episode, 'contributors', []),
        transcript: {
          language: get(episode, ['transcript', 'language'], null),
          rel: get(episode, ['transcript', 'rel'], null),
          type: get(episode, ['transcript', 'type'], null),
          url: get(episode, ['transcript', 'url'], null)
        }
      }))
    )
  );

  const firstEpisodeGuid: string | null = get(episodes, [0, 'guid'], null);

  if (firstEpisodeGuid) {
    yield put(actions.episodes.selectEpisode(firstEpisodeGuid));
  }
}

function* importPodcast() {
  try {
    yield savePodcastMetadata();
    yield fetchEpisodes();
    yield setOnboardingPodcastSettings();
    yield put(actions.onboarding.next());
  } catch (error) {
    // TODO: use translation
    // TODO: apply to other step sagas
    yield put(
      actions.notifications.error({
        title: 'Error saving podcast',
        details: error as string
      })
    );
    // actions.notifications.error({
    //   title: t('onboarding.error.import.title'),
    //   details: t('onboarding.error.import.details')
    // })
  }
}

function* fetchEpisodeDetails({ payload }: Action<string>) {
  const feedUrl: string = yield select(selectors.feed.feedUrl);

  try {
    const { episode }: EpisodeDetailsPayload = yield request.get(
      request.origin(`/api/v1/fetch_episode`),
      {
        params: {
          feed_url: feedUrl,
          episode_guid: payload
        }
      }
    );

    const result = {
      guid: episode.guid,
      chapters: get(episode, 'chapters', []),
      content: get(episode, 'content', ''),
      contributors: get(episode, 'contributors', []),
      title: get(episode, 'title', ''),
      subtitle: get(episode, 'subtitle', ''),
      summary: get(episode, 'summary', ''),
      number: get(episode, 'number', null),
      slug: get(episode, 'slug', null),
      type: get(episode, 'type', null),
      explicit: get(episode, 'explicit', null),
      duration: get(episode, 'duration', null),
      cover: get(episode, 'cover', null),
      pub_date: get(episode, 'pub_date', null),
      transcript: {
        language: get(episode, ['transcript', 'language'], null),
        rel: get(episode, ['transcript', 'rel'], null),
        type: get(episode, ['transcript', 'type'], null),
        url: get(episode, ['transcript', 'url'], null)
      },
      media_file: {
        content_length: get(episode, ['media_file', 'content_length'], null),
        type: get(episode, ['media_file', 'type'], null),
        url: get(episode, ['media_file', 'url'], null)
      }
    };

    yield put(actions.episodes.addEpisodeDetails(pickBy(result)));

    return result;
  } catch (err) {
    return null;
  }
}

function* importEpisodes(): any {
  const nextEpisode: { guid: string } | null = yield select(selectors.episodes.nextEpisodeToImport);
  const importRunning: boolean = yield select(selectors.episodes.importRunning);

  if (!importRunning) {
    return;
  }

  if (!nextEpisode) {
    yield actions.episodes.finishImport();
    return;
  }

  yield put(actions.episodes.episodeImportStarted(nextEpisode.guid));

  const episodeDetails = yield fetchEpisodeDetails({ payload: nextEpisode.guid } as Action<string>);

  if (!episodeDetails) {
    yield put(actions.episodes.episodeImportFailed(nextEpisode.guid));
  } else {
    try {
      yield request.post(request.origin('api/v1/import_episode'), {
        params: {},
        data: episodeDetails
      });
      {
      }
      yield put(actions.episodes.episodeImportFinished(nextEpisode.guid));
    } catch (error) {
      yield put(actions.episodes.episodeImportFailed(nextEpisode.guid));
    }
  }

  yield importEpisodes();
}

function* showNextSteps() {
  yield put(actions.podcast.readFeedUrl());
  yield put(actions.onboarding.next());
}

export default function* importSaga() {
  yield debounce(500, actions.feed.validateFeedUrl.toString(), validateFeedUrl);
  yield takeEvery(actions.feed.fetchPodcastMetadata.toString(), fetchPodcastMetaData);
  yield takeEvery(actions.feed.importPodcast.toString(), importPodcast);
  yield takeEvery(actions.episodes.startImport.toString(), importEpisodes);
  yield takeEvery(actions.episodes.restartImport.toString(), importEpisodes);
  yield takeEvery(actions.episodes.selectEpisode.toString(), fetchEpisodeDetails);
  yield takeEvery(actions.feed.importEpisodes.toString(), showNextSteps);
}

import { takeEvery, put, select, debounce } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { get } from 'lodash-es';

import { actions, selectors } from '../store';
import { validateFeedUrlPayload } from '../store/feed.store';
import * as request from '../lib/request';
import { findCategories } from '../helper/categories';
import { LanguageLocales } from '../types/locales.types';
import { Episode, EpisodeDetailsPayload } from '../types/episode.types';
import { savePodcastMetadata } from './helpers/podcast';

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

function* fetchPodcastMetaData() {
  const feedUrl = yield select(selectors.feed.feedUrl);

  const response: any = yield request.get(request.origin('api/v1/fetch_feed'), {
    params: {
      feed_url: feedUrl,
      force_refresh: true
    }
  });
  const podcast = get(response, ['podcast'], null);

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

function* fetchEpisodes() {
  const feedUrl = yield select(selectors.feed.feedUrl);
  const response: any = yield request.get(request.origin('api/v1/fetch_feed'), {
    params: { feed_url: feedUrl }
  });

  const episodes = get(response, ['episodes'], null);

  if (!episodes) {
    return;
  }

  yield put(
    actions.episodes.addEpisodes(
      episodes.map((episode: Episode) => ({
        title: get(episode, 'title', null),
        guid: get(episode, 'guid', null),
        pub_date: get(episode, 'pub_date', null),
        enclosure: {
          url: get(episode, ['enclosure', 'url'], null),
          type: get(episode, ['enclosure', 'type'], null)
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
  yield savePodcastMetadata();
  yield fetchEpisodes();
  yield put(actions.onboarding.next());
}

function* fetchEpisodeDetails({ payload }: Action<string>) {
  const feedUrl = yield select(selectors.feed.feedUrl);

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
      subtitle: get(episode, 'subtitle', ''),
      summary: get(episode, 'summary', ''),
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

    yield put(actions.episodes.addEpisodeDetails(result));

    return result;
  } catch (err) {
    return null;
  }
}

function* importEpisodes() {
  const nextEpisode: { guid: string } | null = yield select(selectors.episodes.nextEpisodeToImport);

  if (!nextEpisode) {
    // we are done with all stored episodes, validate results and move to next step
    return;
  }

  yield put(actions.episodes.episodeImportStarted(nextEpisode.guid));

  const episodeDetails = yield fetchEpisodeDetails({ payload: nextEpisode.guid } as Action<string>);

  if (!episodeDetails) {
    yield put(actions.episodes.episodeImportFailed(nextEpisode.guid));
  } else {
    // try {
    //   yield request.post(request.origin('api/v1/import_episode'), {
    //     params: {},
    //     data: {
    //       guid: episodeDetails.guid,
    //       title: episodeDetails.title,
    //       subtitle: episodeDetails.subtitle,
    //       summary: episodeDetails.summary,
    //       number: '1', // <-- fehlt
    //       explicit: 'false', // <-- fehlt
    //       slug: 'lov001-lorem-ipsum', // <-- fehlt
    //       duration: '00:00:05.108', // <-- fehlt
    //       type: 'full',  // <-- fehlt
    //       enclosure: episodeDetails.media_file.url
    //     }
    //   });
    //   yield put(actions.episodes.episodeImportFinished(nextEpisode..guid));
    // } catch (error) {
    //   yield put(actions.episodes.episodeImportFailed(nextEpisode.guid));
    // }
  }

  // yield importEpisodes();
}

export default function* importSaga() {
  yield debounce(500, actions.feed.validateFeedUrl.toString(), validateFeedUrl);
  yield takeEvery(actions.feed.fetchPodcastMetadata.toString(), fetchPodcastMetaData);
  yield takeEvery(actions.feed.importPodcast.toString(), importPodcast);
  yield takeEvery(actions.feed.importEpisodes.toString(), importEpisodes);
  yield takeEvery(actions.episodes.selectEpisode.toString(), fetchEpisodeDetails);
}

import { takeEvery, put, select, all, throttle } from "redux-saga/effects";
import { Action } from 'redux-actions';
import { get } from 'lodash-es'

import { actions, selectors } from "../store";
import { validateFeedUrlPayload } from "../store/import.store";
import * as request from '../lib/request';
import { findCategories } from '../helper/categories'
import { LanguageLocales } from '../types/locales.types';

function* validateFeedUrl({payload}: Action<validateFeedUrlPayload>) {
  yield put(actions.importFeed.setFeedUrl(payload));
  try {
    const response : any = yield request.get(request.origin('api/v1/fetch_feed'), {params: {feed_url: payload}});
    yield put(actions.importFeed.setFeedStatus('valid'));
    }
  catch (error) {
    yield put(actions.importFeed.setFeedStatus('invalid'));
  }
}

function* fetchPodcastMetaData() {
  const currentStep = yield select(selectors.onboarding.current);

  if (currentStep.name !== 'import-podcast') {
    return;
  }

  const importFeedUrl = yield select(selectors.importFeed.feedUrl)
  const response : any = yield request.get(request.origin('api/v1/fetch_feed'), {params: {feed_url: importFeedUrl}});
  const podcast = get(response, ['podcast'], null);

  if (!podcast) {
    return;
  }

  yield put( actions.podcast.setPodcastName(get(podcast, ['title'], '')) );
  yield put( actions.podcast.setPodcastDescription(get(podcast, ['description'], '')) );
  yield put( actions.podcast.setPodcastAuthor(get(podcast, ['owner', 'name'], '')));
  yield put( actions.podcast.setPodcastExplicit(get(podcast, ['explicit'], '')));
  yield put( actions.podcast.setPodcastCoverUrl(get(podcast, ['image'], '')));

  const lang = get(podcast, ['language'], '');
  const language = LanguageLocales.find((item) => item.tag === lang);
  if (language) {
    yield put( actions.podcast.setPodcastLanguage(language))
  }

  const categories = get(podcast, ['categories'], null);
  if (!categories) {
    return;
  }
  const category = findCategories(categories);
  if (category) {
    yield put( actions.podcast.setPodcastCategory(category))
  }

}

function* fetchEpisodes() {
  const currentStep = yield select(selectors.onboarding.current);

  if (currentStep.name !== 'import-episodes') {
    return;
  }

  const importFeedUrl = yield select(selectors.importFeed.feedUrl);
  const response: any = yield request.get(request.origin('api/v1/fetch_feed'), {
    params: { feed_url: importFeedUrl }
  });
  const episodes = get(response, ['episodes'], null);

  if (!episodes) {
    return;
  }

  yield put(actions.episodes.clearEpisodes());

  yield all(
    episodes.map((element: any) =>
      put(
        actions.episodes.addEpisode({
          title: element.title,
          uuid: element.guid,
          pub_date: element.pub_date,
          enclosure: {
            url: element.enclosure.url,
            type: element.enclosure.type
          }
        })
      )
    )
  );
}

export default function* importFeedSaga() {
  yield throttle(500, actions.importFeed.validateFeedUrl.toString(), validateFeedUrl);
  yield takeEvery(actions.onboarding.next.toString(), fetchPodcastMetaData);
  yield takeEvery(actions.onboarding.next.toString(), fetchEpisodes);
}
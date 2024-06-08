import { takeEvery, put, select, call } from "redux-saga/effects";
import { Action } from 'redux-actions';
import { get } from 'lodash-es'

import { actions, selectors } from "../store";
import { validateFeedUrlPayload } from "../store/import.store";
import { fetchImageToBlob, convertBlobToBase64 } from "../lib/image";
import * as request from '../lib/request';
import { PodcastCategories } from '../types/categories.types'
import { LanguageLocales } from '../types/locales.types';

function* validateFeedUrl({payload}: Action<validateFeedUrlPayload>) {
  try {
    const response : any = yield request.get(request.origin('api/v1/fetch_feed'), {params: {url: payload}});
    yield put(actions.importFeed.setFeedStatus('valid'));
    yield put(actions.importFeed.setFeedUrl(payload));
    }
  catch (error) {
    yield put(actions.importFeed.setFeedStatus('invalid'));
  }
}

export function readImageFromUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetchImageToBlob(url, (blob) => {
      if (blob) {
        convertBlobToBase64(blob, (base64Image: string) => {
          resolve(base64Image);
        });
      }
    });
  });
}

function* fetchPodcastMetaData() {
  const currentStep = yield select(selectors.onboarding.current);

  if (currentStep.name !== 'import-podcast') {
    return;
  }

  const importFeedUrl = yield select(selectors.importFeed.feedUrl)
  const response : any = yield request.get(request.origin('api/v1/fetch_feed'), {params: {url: importFeedUrl}});
  const podcast = get(response, ['podcast'], null);
  if (podcast) {
    yield put( actions.podcast.setPodcastName(get(podcast, ['title'], '')) );
    yield put( actions.podcast.setPodcastDescription(get(podcast, ['description'], '')) );
    yield put( actions.podcast.setPodcastAuthor(get(podcast, ['owner', 'name'], '')));
    yield put( actions.podcast.setPodcastExplicit(get(podcast, ['explicit'], '')));

    const lang = get(podcast, ['language'], '');
    console.log(lang)
    const language = LanguageLocales.find((item) => item.tag === lang);
    if (language) {
      yield put( actions.podcast.setPodcastLanguage(language))
    }

    const categories = get(podcast, ['categories'], null);
    if (categories) {
      if (Array.isArray(categories) && categories.length > 0) {
        if (Array.isArray(categories[0]) && categories[0].length > 0) {
          let value : string = categories[0][0];
          if (categories[0].length === 2) {
            value = value + ' > ' + categories[0][1];
          }
          const category = PodcastCategories.find((item) => item.name === value);
          if (category) {
            yield put( actions.podcast.setPodcastCategory(category))
          }
        }
      }
    }

    const imageData = yield call(readImageFromUrl, podcast.image);
    if (imageData)
      yield put( actions.podcast.setPodcastCoverData(imageData));
  }
}

export default function* importFeedSaga() {
  yield takeEvery(actions.importFeed.validateFeedUrl.toString(), validateFeedUrl);
  yield takeEvery(actions.onboarding.next.toString(), fetchPodcastMetaData);
}
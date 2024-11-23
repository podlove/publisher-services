import { select } from 'redux-saga/effects';
import * as request from '../../lib/request';
import { selectors } from '../../store';
import { type locales } from '../../types/locales.types';
import { type category } from '../../types/categories.types';
import { extractImageType, removeUnicodeAndSpecialCharacters} from '../../lib/image';

function transferPodcastCoverFromData(imageData: string, imageName: string) {
  const parts: string[] = imageData.split(',');
  const imageType: string | null = extractImageType(parts[0]);
  const name = removeUnicodeAndSpecialCharacters(imageName);

  const image = {
    base64Data: parts[1],
    name: name + '-cover',
    type: imageType
  };

  request.post(request.origin('/api/v1/save_podcast_image'), { params: {}, data: image });
}

function transferPodcastCoverFromURL(imageUrl: string, podcastName: string) {
  const name = removeUnicodeAndSpecialCharacters(podcastName);

  const image = {
    name: name + '-cover',
    url: imageUrl
  };
  request.post(request.origin('api/v1/copy_podcast_image'), { params: {}, data: image });
}

export function* savePodcastMetadata() {
  const name: string = yield select(selectors.podcast.name);
  const description: string = yield select(selectors.podcast.description);
  const author: string = yield select(selectors.podcast.author);
  const language: locales = yield select(selectors.podcast.language);
  const category: category = yield select(selectors.podcast.category);
  const explicit: boolean = yield select(selectors.podcast.explicit);

  const podcast = {
    name: name,
    description: description,
    author: author,
    language: language.tag,
    category: category.api,
    explicit: explicit ? 'true' : 'false'
  };
  yield request.post(request.origin('/api/v1/save_podcast'), { params: {}, data: podcast });

  const imageData: string = yield select(selectors.podcast.image_data);
  const imageName: string = yield select(selectors.podcast.image_name);
  const imageUrl: string = yield select(selectors.podcast.image_url);

  if (imageData) {
    yield transferPodcastCoverFromData(imageData, imageName);
  }

  if (imageUrl) {
    yield transferPodcastCoverFromURL(imageUrl, name);
  }
}

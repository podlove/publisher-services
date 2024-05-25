<template>
  <div class="flex justify-center">
    <PhoneFrame
      background="linear-gradient(0deg, rgba(214,206,193,1) 0%, rgba(239,227,209,1) 35%, rgba(215,205,188,1) 100%)"
    >
      <div class="flex items-center flex-col">
        <div class="w-full flex justify-between px-3 mb-3 opacity-65">
          <span class="flex items-center content-center bg-slate-700 rounded-full h-5 w-5 p-1">
            <ChevronLeftIcon class="h-3 w-3 text-white ml-[-1px]" aria-hidden="true" />
          </span>
          <div class="flex">
            <span class="flex items-center content-center bg-slate-700 rounded-full px-2 h-5 mr-2">
              <PlusIcon class="h-3 w-3 text-white mr-1" aria-hidden="true" /><span
                class="text-white text-xs -mt-[1px]"
                >{{ t('onboarding.preview.follow') }}</span
              >
            </span>
            <span class="flex items-center content-center bg-slate-700 rounded-full p-1 h-5">
              <EllipsisHorizontalIcon class="h-3 w-3 text-white" aria-hidden="true" />
            </span>
          </div>
        </div>
        <img :src="podcastCover" class="w-36 h-36 shadow-lg rounded mb-2" />
        <h2 class="font-bold text-sm text-gray-900">{{ podcastName }}</h2>
        <h3 class="font-light text-xs text-gray-600 mb-2">{{ podcastAuthor }}</h3>
        <button
          class="flex bg-gray-900 text-white p-2 rounded-lg w-[70%] items-center justify-center mb-2"
        >
          <PlayIcon class="w-5 h-5 mr-1" /><span class="text-sm">{{
            t('onboarding.preview.playButton')
          }}</span>
        </button>
        <div class="w-[85%] text-gray-600 text-sm text-justify font-light leading-none mb-1 line-clamp-6">
          {{ podcastDescription }}
        </div>
        <div class="w-[85%] text-xs font-medium">
          {{ podcastCategory }}
        </div>
      </div>
    </PhoneFrame>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { mapState } from 'redux-vuex';
import { computed } from 'vue';
import {
  ChevronLeftIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  PlayIcon
} from '@heroicons/vue/24/solid';

import podcastCoverPlaceholder from '../../../assets/podcast-cover-placeholder.svg';
import PhoneFrame from '../../../components/phone-frame/PhoneFrame.vue';
import { selectors } from '../../../store';
import { PodcastCategories } from '../../../types/categories.types';

const { t } = useI18n();

const state = mapState({
  name: selectors.podcast.name,
  description: selectors.podcast.description,
  author: selectors.podcast.author,
  imageName: selectors.podcast.image_name,
  imageData: selectors.podcast.image_data,
  explicit: selectors.podcast.explicit,
  language: selectors.podcast.language,
  category: selectors.podcast.category
});

const podcastCover = computed(() => (state.imageData ? state.imageData : podcastCoverPlaceholder));
const podcastName = computed(() => state.name || t('onboarding.preview.name'));
const podcastAuthor = computed(() => state.author || t('onboarding.preview.author'));
const podcastDescription = computed(() => {
  const description = state.description || t('onboarding.preview.description');
  if (description.length > 270) {
    return description.slice(0, 270) + '...';
  }

  return description;
});

const podcastCategory = computed((): string | null => {
  if (state.category === null) {
    return '[category]';
  }
  const category = PodcastCategories.find((item) => item.id === state.category.id);

  if (!category) {
    return '[category]';
  }

  return category.name;
});
</script>

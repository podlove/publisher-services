<template>
  <div class="w-full">
    <label for="category" class="block text-sm font-medium leading-6 text-gray-900 mb-2">
      {{ t('onboarding.podcast.podcast-category') }}
    </label>
    <select
      :value="getPodcastCategoryName()"
      @input="updatePodcastCategory"
      class="mb-1 block w-full bg-white rounded-md border-0 p-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option
        v-for="(category, cindex) in PodcastCategories"
        :value="category.name"
        :key="`category-${cindex}`"
      >
        {{ category.name }}
      </option>
    </select>
    <p class="text-xs leading-5 text-gray-600">
      {{ t('onboarding.podcast.podcast-category-hint') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { type Action } from 'redux';

import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../../store';
import { PodcastCategories } from '../../../types/categories.types';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  category: selectors.podcast.category
});

const updatePodcastCategory = (event: Event) => {
  const value: string = (event.target as HTMLInputElement).value;
  const category = PodcastCategories.find((item) => item.name === value);
  if (category) {
    store.dispatch(actions.podcast.setPodcastCategory(category) as unknown as Action);
  }
};

const getPodcastCategoryName = (): string | null => {
  if (state.category === null) {
    return null;
  }
  const category = PodcastCategories.find((item) => item.id === state.category.id);
  if (!category) {
    return null;
  }
  return category.name;
};
</script>

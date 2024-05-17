<template>
  <div class="w-full">
    <label for="description" class="block text-sm font-medium leading-6 text-gray-900 mb-2">{{
      t('onboarding.steps.podcast.podcast-description')
    }}</label>
    <textarea
      id="description"
      @input="changePodcastDescription"
      :value="state.description"
      rows="2"
      class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm placeholder:text-gray-400 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-1"
    />
    <p class="text-xs leading-5 text-gray-600">
      {{ t('onboarding.steps.podcast.podcast-description-hint') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { Action } from 'redux';

import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../../store';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  description: selectors.podcast.description
});

const changePodcastDescription = (event: Event) => {
  store.dispatch(
    actions.podcast.setPodcastDescription(
      (event.target as HTMLInputElement).value
    ) as unknown as Action
  );
};
</script>

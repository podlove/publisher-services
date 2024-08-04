<template>
  <div class="w-full">
    <label for="name" class="block text-sm font-medium leading-6 text-gray-900 mb-2">{{
      t('onboarding.podcast.podcast-name')
    }}</label>

    <div
      class="w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
    >
      <input
        type="text"
        @input="changePodcastName"
        :value="state.name"
        id="name"
        class="w-full flex-1 border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :placeholder="t('onboarding.podcast.podcast-name-placeholder')"
      />
    </div>
    <p class="text-xs leading-5 text-gray-600">
      {{ t('onboarding.podcast.podcast-name-hint') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { type Action } from 'redux';

import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../../store';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  name: selectors.podcast.name
});

const changePodcastName = (event: Event) => {
  store.dispatch(
    actions.podcast.setPodcastName((event.target as HTMLInputElement).value) as unknown as Action
  );
};
</script>

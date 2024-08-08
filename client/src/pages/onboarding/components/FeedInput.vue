<template>
  <div class="w-full">
    <label for="feed-url" class="block text-sm font-medium leading-6 text-gray-900">{{
      t('onboarding.steps.import-feed.feed-url')
    }}</label>
    <div class="mt-2">
      <div
        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
      >
        <input
          type="text"
          @input="changeFeedUrl"
          :value="state.feedUrl"
          id="feed-url"
          class="block flex-1 border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          :class="backgroundColor"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { type Action } from 'redux';
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../../store';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  feedStatus: selectors.feed.feedStatus,
  feedUrl: selectors.feed.feedUrl
});

const backgroundColor = computed(() => {
  if (state.feedStatus === 'invalid') {
    return 'bg-red-50';
  }
  if (state.feedStatus === 'valid') {
    return 'bg-green-50';
  }
  return 'bg-white'
});

const changeFeedUrl = (event: Event) => {
  store.dispatch(
    actions.feed.validateFeedUrl((event.target as HTMLInputElement).value) as unknown as Action
  );
};
</script>

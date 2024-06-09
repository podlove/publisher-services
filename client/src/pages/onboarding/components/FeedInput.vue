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
          :class="{'bg-red-300' : isFeedInvalid}"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { Action } from 'redux';
import { computed } from 'vue';

import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../../store';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  feedStatus: selectors.importFeed.feedStatus,
  feedUrl: selectors.importFeed.feedUrl
});

const isFeedInvalid = computed(() => state.feedStatus === 'invalid');

const changeFeedUrl = (event: Event) => {
  store.dispatch(
    actions.importFeed.validateFeedUrl((event.target as HTMLInputElement).value) as unknown as Action
  );
};
</script>
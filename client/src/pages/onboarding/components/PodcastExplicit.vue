<template>
  <div class="w-full">
  <label for="explicit" class="mb-2 block text-sm font-medium leading-6 text-gray-900">
    {{ t('onboarding.podcast.podcast-content') }}
  </label>
  <label class="inline-flex items-center cursor-pointer mb-1">
    <input type="checkbox" @input="swapPodcastExpicit" v-model="state.explicit" class="sr-only peer">
    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none
      peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700
      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600">
    </div>
    <span class="ms-3 text-sm text-gray-900">
      {{ t('onboarding.podcast.podcast-content-desc') }}
    </span>
  </label>
  <p class="text-xs leading-5 text-gray-600">
    {{ t('onboarding.podcast.podcast-content-hint') }}
  </p>
</div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { type Action } from 'redux';

import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../../store';

const { t } = useI18n()
const store = injectStore()

const state = mapState({
  explicit: selectors.podcast.explicit
})

const swapPodcastExpicit = (event: Event) => {
  store.dispatch(actions.podcast.tooglePodcastExplicit() as unknown as Action)
}

</script>

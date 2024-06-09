<template>
  <div class="flex min-h-full flex-col md:flex-row">
    <!-- Left column area -->
    <div class="w-full max-w-screen-xl sm:mb-4">
      <h2 class="font-semibold leading-7 text-gray-900">
        {{ t('onboarding.steps.import-feed.headline') }}
      </h2>
      <p class="my-2 text-base leading-6 text-gray-600">
        {{ t('onboarding.steps.import-feed.description') }}
      </p>
      <p class="my-2 text-base leading-6 text-gray-600"> 
        {{ t('onboarding.steps.import-feed.help') }}
      </p>
      <FeedInput class="mb-5"></FeedInput>
      <div v-if="state.feedStatus === 'valid'">
        <h3 class="font-semibold leading-7 text-gray-900">
          {{ t('onboarding.steps.import-feed.success-head') }}
        </h3>
        <p class="my-2 text-base leading-6 text-gray-600"> 
          {{ t('onboarding.steps.import-feed.success-info') }}
        </p>
      </div>
      <div v-else-if="state.feedStatus === 'invalid'">
        <h3 class="font-semibold leading-7 text-gray-900">
          {{ t('onboarding.steps.import-feed.warning-head') }}
        </h3>
        <p class="my-2 text-base leading-6 text-gray-600"> 
          {{ t('onboarding.steps.import-feed.warning-info') }}
        </p>
      </div>
    </div>

    <!-- Right column area -->
    <div class="px-4 py-6 sm:px-6 w-full">
      <img :src="moveIconUrl" alt="" class="aspect-[16/9] w-96 rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { useI18n } from 'vue-i18n';

import FeedInput from '../../components/FeedInput.vue';
import moveIconUrl from '../../../../assets/feed-import.svg';

import { selectors } from '../../../../store';

const { t } = useI18n();

const state = mapState({
  feedStatus: selectors.importFeed.feedStatus
});

</script>

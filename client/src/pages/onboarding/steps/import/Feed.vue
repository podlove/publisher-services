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
      <p
        class="my-2 text-base leading-6 text-gray-600"
        v-html="t('onboarding.steps.import-feed.help')"
      ></p>
      <FeedInput class="mb-5"></FeedInput>
      <div v-if="state.feedStatus === 'valid'">
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="font-semibold leading-7 text-green-800">
                {{ t('onboarding.steps.import-feed.success-head') }}
              </h3>
              <div class="mt-2 text-base leading-6 text-green-700">
                <p v-html="t('onboarding.steps.import-feed.success-info')"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="state.feedStatus === 'invalid'">
        <div class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="font-semibold leading-7 text-red-800">
                {{ t('onboarding.steps.import-feed.warning-head') }}
              </h3>
              <p class="mt-2 text-base leading-6 text-red-800">
                {{ t('onboarding.steps.import-feed.warning-info') }}
              </p>
              <div class="mt-2 text-base leading-6 text-red-600">
                <ul class="list-disc space-y-1 pl-5">
                  <li v-for="item in $tm('onboarding.steps.import-feed.warning-hints')">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right column area -->
    <div class="px-4 py-6 sm:px-6 w-full flex justify-center items-center">
      <img
        :src="moveIconUrl"
        alt=""
        class="aspect-[16/9] w-96 rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid';

import FeedInput from '../../components/FeedInput.vue';
import moveIconUrl from '../../../../assets/feed-import.svg';

import { selectors } from '../../../../store';

const { t } = useI18n();

const state = mapState({
  feedStatus: selectors.feed.feedStatus
});
</script>

<style>
.support-link {
  color: indigo;
  text-decoration: underline;
}
</style>

<template>
  <div class="mx-auto p-8">
    <div class="text-center mb-6">
      <h2 class="text-3xl mb-2 font-semibold text-indigo-600">
        {{ t('onboarding.steps.start-new-next-steps.headline') }}
      </h2>
      <p class="text-md mb-6 text-gray-600">
        {{ t('onboarding.steps.start-new-next-steps.description') }}
      </p>
    </div>
    <div class="flex flex-col items-center mb-6 py-10">
      <h3 class="text-lg font-bold text-indigo-600 mb-4">
        {{ t('onboarding.steps.start-new-next-steps.feed') }}
      </h3>
      <input
        type="text"
        :value="state.feedUrl"
        :size="state.feedUrl?.length"
        ref="feedUrl"
        class="w-auto bg-indigo-100 block rounded-md shadow-md flex-1 border-0 p-2 text-gray-600 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 mb-4 text-center"
        readonly
        @click="selectText"
      />
      <p
        class="text-sm leading-5 text-gray-500 text-center"
        v-html="t('onboarding.steps.start-new-next-steps.feedHint')"
      ></p>
    </div>

    <h3 class="text-lg font-bold text-indigo-600 mb-4 text-center">
      {{ t('onboarding.steps.start-new-next-steps.more') }}
    </h3>
    <div
      class="pb-5 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      <FinishCard
        :image="learnIconUrl"
        :headline="t('onboarding.steps.start-new-next-steps.learn.headline')"
        :content="t('onboarding.steps.start-new-next-steps.learn.content')"
      />
      <FinishCard
        :image="promoteIconUrl"
        :headline="t('onboarding.steps.start-new-next-steps.promote.headline')"
        :content="t('onboarding.steps.start-new-next-steps.promote.content')"
      />
      <FinishCard
        :image="communityIconUrl"
        :headline="t('onboarding.steps.start-new-next-steps.community.headline')"
        :content="t('onboarding.steps.start-new-next-steps.community.content')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {  mapState } from 'redux-vuex';
import { selectors } from '../../../../store';

import FinishCard from '../../components/FinishCard.vue';

import learnIconUrl from '../../../../assets/next-learn.svg';
import promoteIconUrl from '../../../../assets/next-promote.svg';
import communityIconUrl from '../../../../assets/next-community.svg';

const { t } = useI18n();

const state = mapState({
  feedUrl: selectors.podcast.feed
});

const selectText = (event: MouseEvent) => (event?.target as HTMLInputElement).select();
</script>

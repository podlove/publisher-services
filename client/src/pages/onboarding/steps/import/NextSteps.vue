<template>
  <div class="mx-auto p-8">
    <div class="text-center mb-6">
      <h2 class="text-3xl mb-2 font-semibold text-indigo-600">
        {{ t('onboarding.steps.import-next-steps.headline') }}
      </h2>
      <p class="text-md mb-6 text-gray-600">
        {{ t('onboarding.steps.import-next-steps.description') }}
      </p>
    </div>
    <div class="flex flex-col items-center mb-6 py-10">
      <h3 class="text-lg font-bold text-indigo-600 mb-4">
        {{ t('onboarding.steps.import-next-steps.feed') }}
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
        v-html="t('onboarding.steps.import-next-steps.feedHint')"
      ></p>
    </div>
    <h3 class="text-lg font-bold text-indigo-600 mb-4 text-center">
      {{ t('onboarding.steps.import-next-steps.more') }}
    </h3>
    <div
      class="pb-5 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-5"
    >
      <FinishCard
        :image="episodesIconUrl"
        :headline="t('onboarding.steps.import-next-steps.episodes.headline')"
        :content="t('onboarding.steps.import-next-steps.episodes.content')"
      />
      <FinishCard
        :image="redirectIconUrl"
        :headline="t('onboarding.steps.import-next-steps.redirect.headline')"
        :content="t('onboarding.steps.import-next-steps.redirect.content')"
      />
      <FinishCard
        :image="learnIconUrl"
        :headline="t('onboarding.steps.import-next-steps.learn.headline')"
        :content="t('onboarding.steps.import-next-steps.learn.content')"
      />
    </div>
    <div class="text-center">
      <PodloveButton :href="episodesListLink" type="a" target="_top" variant="primary">{{
        $t('onboarding.steps.import-next-steps.button')
      }}</PodloveButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Action } from 'redux';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { selectors, actions } from '../../../../store';

import FinishCard from '../../components/FinishCard.vue';
import PodloveButton from '../../../../components/button/Button.vue';

import learnIconUrl from '../../../../assets/next-learn.svg';
import redirectIconUrl from '../../../../assets/next-redirect.svg';
import episodesIconUrl from '../../../../assets/next-check-episodes.svg';

const { t } = useI18n();

const state = mapState<{ feedUrl: string; site: string }>({
  feedUrl: selectors.podcast.feed,
  site: selectors.authentication.site
});

const episodesListLink = computed(() => `${state.site}/wp-admin/edit.php?post_type=podcast`);

const selectText = (event: MouseEvent) => (event?.target as HTMLInputElement).select();

const { dispatch } = injectStore();
dispatch(actions.podcast.readFeedUrl() as Action);
</script>

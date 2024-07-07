<template>
  <div class="h-full flex flex-col" :data-test="`step-${state.current.name}`">
    <Steps :steps="state.steps" v-if="state.current && state.current.visible"></Steps>
    <div class="pt-4 sm:px-6 xl:pl-6 overflow-y-auto" :style="contentStyle">
      <component :is="stepComponents[state.current.name]" />
    </div>
    <div class="flex justify-between w-full px-4 sm:px-6 xl:pl-6 py-2">
      <PodloveButton v-if="state.previous" variant="secondary" @click="prevStep()">{{
        t('onboarding.navigation.prev')
      }}</PodloveButton>
      <div class="w-full"></div>
      <PodloveButton variant="primary" v-if="state.upcoming" :disabled="!state.upcomingEnabled" @click="nextStep()">{{
        t('onboarding.navigation.next.' + state.current.name)
      }}</PodloveButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import { Action } from 'redux';

import { selectors, actions } from '../../store';
import Steps from './components/Steps.vue';
import PodloveButton from '../../components/button/Button.vue';

import SetupType from './steps/SetupType.vue';

import StartNewPodcast from './steps/start-new/Podcast.vue';
import StartNewNextSteps from './steps/start-new/NextSteps.vue';

import ImportFeed from './steps/import/Feed.vue';
import ImportPodcast from './steps/import/Podcast.vue';
import ImportEpisodes from './steps/import/Episodes.vue';
import ImportNextSteps from './steps/import/NextSteps.vue';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  steps: selectors.onboarding.steps,
  previous: selectors.onboarding.previous,
  current: selectors.onboarding.current,
  upcoming: selectors.onboarding.upcoming,
  upcomingEnabled: selectors.onboarding.upcomingEnabled,
});

const contentStyle = computed(() => ({
  height: state.current && state.current.visible ? `calc(100vh - 75px - 35px)` : `calc(100vh - 35px)`
}));

const stepComponents = {
  select: SetupType,
  'start-new-podcast': StartNewPodcast,
  'start-new-next-steps': StartNewNextSteps,
  'import-feed': ImportFeed,
  'import-podcast': ImportPodcast,
  'import-episodes': ImportEpisodes,
  'import-next-steps': ImportNextSteps
};

const nextStep = () => {
  store.dispatch(actions.onboarding.next() as unknown as Action);
};

const prevStep = () => {
  store.dispatch(actions.onboarding.previous() as unknown as Action);
};
</script>

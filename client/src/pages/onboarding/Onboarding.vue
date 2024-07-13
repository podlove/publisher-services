<template>
  <div ref="viewPort" class="relative h-full flex flex-col" :data-test="`step-${state.current.name}`">
    <Steps class="fixed top-0 w-full z-50" :steps="state.steps" v-if="stepsVisible"></Steps>
    <div
      id="content"
      class="pt-4 pb-[50px] sm:px-6 xl:pl-6 overflow-y-auto"
      :class="{ 'pt-[80px]': stepsVisible }"

    >
      <component :is="stepComponents[state.current.name]" />
    </div>
    <div class="fixed bottom-0 flex justify-between w-full px-4 sm:px-6 xl:pl-6 py-2 bg-white z-50">
      <PodloveButton v-if="state.previous" variant="secondary" @click="prevStep()">{{
        t('onboarding.navigation.prev')
      }}</PodloveButton>
      <div class="w-full"></div>
      <PodloveButton
        variant="primary"
        v-if="state.upcoming"
        :disabled="!state.upcomingEnabled"
        @click="nextStep()"
        >{{ t('onboarding.navigation.next.' + state.current.name) }}</PodloveButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';

import { selectors } from '../../store';
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
  nextAction: selectors.onboarding.nextAction,
  previousAction: selectors.onboarding.previousAction
});

const stepComponents = {
  select: SetupType,
  'start-new-podcast': StartNewPodcast,
  'start-new-next-steps': StartNewNextSteps,
  'import-feed': ImportFeed,
  'import-podcast': ImportPodcast,
  'import-episodes': ImportEpisodes,
  'import-next-steps': ImportNextSteps
};

const stepsVisible = computed(() => state.current && state.current.visible);

const nextStep = () => {
  store.dispatch(state.nextAction);
};

const prevStep = () => {
  store.dispatch(state.previousAction);
};
</script>

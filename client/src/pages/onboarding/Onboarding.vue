<template>
  <div class="h-full flex flex-col">
    <Steps :steps="state.steps" v-if="state.current && state.current.visible"></Steps>
    <div class="p-4 sm:px-6 xl:pl-6">
      <component :is="stepComponents[state.current.name]" />
    </div>
    <div class="flex justify-between w-full px-4 sm:px-6 xl:pl-6">
      <PodloveButton v-if="state.previous" variant="secondary" @click="prevStep()">{{
        t('onboarding.navigation.prev')
      }}</PodloveButton>
      <div class="w-full"></div>
      <PodloveButton variant="primary" :disabled="!state.upcomingEnabled" @click="nextStep()">{{
        t('onboarding.navigation.next.' + state.current.name)
      }}</PodloveButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import { Action } from 'redux';

import { selectors, actions } from '../../store';
import Steps from './components/Steps.vue';
import PodloveButton from '../../components/button/Button.vue';

import Podcast from './steps/start-new/Podcast.vue';
import NextSteps from './steps/start-new/NextSteps.vue';
import SetupType from './steps/SetupType.vue';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  steps: selectors.onboarding.steps,
  previous: selectors.onboarding.previous,
  current: selectors.onboarding.current,
  upcoming: selectors.onboarding.upcoming,
  upcomingEnabled: selectors.onboarding.upcomingEnabled,
});

const stepComponents = {
  select: SetupType,
  'start-new-podcast': Podcast,
  'start-new-next-steps': NextSteps
};

const nextStep = () => {
  store.dispatch(actions.onboarding.next() as unknown as Action);
};

const prevStep = () => {
  store.dispatch(actions.onboarding.previous() as unknown as Action);
};
</script>

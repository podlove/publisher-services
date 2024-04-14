<template>
  <div class="h-full flex flex-col">
    <Steps :steps="state.steps"></Steps>
    <div class="py-4 px-2">
      <component :is="stepComponents[state.current]" />
    </div>
    <div class="grid grid-cols-3 justify-between">
      <div v-if="state.previous" class="justify-self-start mt-auto">
        <div class="py-4 px-2">
          <PodloveButton variant="primary" @click="prevStep()">{{
            t('onboarding.navigation.prev')
          }}</PodloveButton>
        </div>
      </div>
      <div v-else></div>
      <div class="justify-self-center mt-auto">
        <div class="py-4 px-2">
          <PodloveButton variant="primary">
            <router-link to="/select" class="px-2">{{t('onboarding.navigation.home')}}
            </router-link>
          </PodloveButton>
        </div>
      </div>
      <div v-if="state.upcoming" class="justify-self-end mt-auto">
        <div class="py-4 px-2">
          <PodloveButton variant="primary" @click="nextStep()">{{
      t('onboarding.navigation.next')
            }}</PodloveButton>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../store';
import Steps from './components/Steps.vue';
import PodloveButton from '../../components/button/Button.vue';

import Podcast from './components/Podcast.vue';
import Preview from './components/PodcastPreview.vue';
import NextSteps from './components/NextSteps.vue';
import { Action } from 'redux';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  steps: selectors.onboarding.steps,
  previous: selectors.onboarding.previous,
  current: selectors.onboarding.current,
  upcoming: selectors.onboarding.upcoming
});

const stepComponents = {
  podcast: Podcast,
  preview: Preview,
  'next-steps': NextSteps
};

// const steps = state.steps.map((step) => ({
//   ...step,
//   name: t(`onboarding.steps.${step.name}.title`)
// }));

const nextStep = () => {
  store.dispatch(actions.onboarding.next() as unknown as Action);
};

const prevStep = () => {
  store.dispatch(actions.onboarding.previous() as unknown as Action);
}
</script>

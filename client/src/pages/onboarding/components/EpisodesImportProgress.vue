<template>
  <div class="w-full">
    <div class="flex items-center">
      <div class="mr-2">
        <PodloveButton
          variant="secondary"
          @click="startImport"
          v-if="!state.importRunning && numOfWaitingEpisode > 0"
          >{{ t('onboarding.steps.import-episodes.progress.startImport') }}</PodloveButton
        >
        <PodloveButton
          variant="secondary"
          @click="stopImport"
          v-if="state.importRunning && numOfWaitingEpisode > 0"
          >{{ t('onboarding.steps.import-episodes.progress.stopImport') }}</PodloveButton
        >
        <PodloveButton
          variant="secondary"
          @click="restartImport"
          v-if="!state.importRunning && numOfWaitingEpisode === 0"
          >{{ t('onboarding.steps.import-episodes.progress.restartImport') }}</PodloveButton
        >
      </div>
      <div class="w-full relative">
        <div class="w-full flex rounded-sm overflow-hidden h-3">
          <div
            class="bg-green-500 h-full cursor-help"
            v-tooltip="
              t('onboarding.steps.import-episodes.progress.numSuccessEpisode', {
                count: numOfSuccessEpisode
              })
            "
            :style="successfullImportedStyle"
          ></div>
          <div
            class="bg-red-500 h-full cursor-help"
            v-tooltip="
              t('onboarding.steps.import-episodes.progress.numFaultyEpisode', {
                count: numOfFaultyEpisode
              })
            "
            :style="faultyImportedStyle"
          ></div>
          <div
            class="bg-cyan-500 h-full cursor-help"
            v-if="state.episodeInImport"
            :style="currentlyImportedStyle"
            v-tooltip="
              t('onboarding.steps.import-episodes.progress.episodeInImport', {
                title: state.episodeInImport.data.title
              })
            "
          ></div>
          <div
            class="bg-gray-500 h-full cursor-help"
            :class="{ 'animate-pulse': state.importRunning }"
            :style="waitingImportedStyle"
            v-tooltip="
              t('onboarding.steps.import-episodes.progress.numWaitingEpisode', {
                count: numOfWaitingEpisode
              })
            "
          ></div>
        </div>
        <div class="absolute right-1 text-sm text-gray-500 font-light">
          {{
            t('onboarding.steps.import-episodes.progress.progressStatus', {
              processed: numTotalEpisodes - numOfWaitingEpisode,
              waiting: numTotalEpisodes
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Action } from 'redux';
import { computed } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import { vTooltip } from 'floating-vue';
import { selectors, actions } from '../../../store';
import PodloveButton from '../../../components/button/Button.vue';

const { t } = useI18n();

const { dispatch } = injectStore();

const state = mapState<{
  episodes: {
    status: {
      importStarted: boolean;
      importRunning: boolean;
      importFinished: boolean;
      importError: boolean;
    };
  }[];
  importRunning: boolean;
  episodeInImport: {
    data: {
      title: string;
    };
  };
}>({
  episodes: selectors.episodes.list,
  importRunning: selectors.episodes.importRunning,
  episodeInImport: selectors.episodes.episodeInImport
});

const numOfWaitingEpisode = computed(
  (): number =>
    state.episodes.filter(
      (item) =>
        !item.status.importFinished && !item.status.importRunning && !item.status.importError
    ).length
);
const numOfSuccessEpisode = computed(
  (): number => state.episodes.filter((item) => item.status.importFinished).length
);
const numOfFaultyEpisode = computed(
  (): number => state.episodes.filter((item) => item.status.importError).length
);
const numTotalEpisodes = computed((): number => state.episodes.length);

const successfullImportedStyle = computed(() => ({
  width:
    (numTotalEpisodes.value > 0 ? (numOfSuccessEpisode.value / numTotalEpisodes.value) * 100 : 0) +
    '%',
  transition: 'width 0.5s ease-in-out'
}));

const faultyImportedStyle = computed(() => ({
  width:
    (numTotalEpisodes.value > 0 ? (numOfFaultyEpisode.value / numTotalEpisodes.value) * 100 : 0) +
    '%',
  transition: 'width 0.5s ease-in-out'
}));

const waitingImportedStyle = computed(() => ({
  width:
    (numTotalEpisodes.value > 0
      ? (numOfWaitingEpisode.value / numTotalEpisodes.value) * 100
      : 100) + '%',
  transition: 'width 0.5s ease-in-out'
}));

const currentlyImportedStyle = computed(() => ({
  width: (numTotalEpisodes.value > 0 ? (1 / numTotalEpisodes.value) * 100 : 0) + '%',
  transition: 'width 0.5s ease-in-out'
}));

const startImport = () => {
  dispatch(actions.episodes.startImport() as Action);
};

const stopImport = () => {
  dispatch(actions.episodes.stopImport() as Action);
};

const restartImport = () => {
  dispatch(actions.episodes.restartImport() as Action);
};
</script>

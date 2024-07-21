<template>
  <div>
    <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">{{ t('onboarding.steps.import-episodes.statistics.waiting') }}</dt>
        <dd class="mt-1 text-xl font-semibold tracking-tight text-gray-900">{{ t('onboarding.steps.import-episodes.statistics.numWaitingEpisode', {count: numOfWaitingEpisode}) }}</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">{{ t('onboarding.steps.import-episodes.statistics.successfull') }}</dt>
        <dd class="mt-1 text-xl font-semibold tracking-tight text-green-600">{{ t('onboarding.steps.import-episodes.statistics.numSuccessEpisode', {count: numOfSuccessEpisode}) }}</dd>
      </div>
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">{{ t('onboarding.steps.import-episodes.statistics.faulty') }}</dt>
        <dd class="mt-1 text-xl font-semibold tracking-tight text-red-600">{{ t('onboarding.steps.import-episodes.statistics.numFaultyEpisode', {count: numOfFaultyEpisode}) }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { mapState } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import { selectors } from '../../../store';
import { Episode } from '../../../types/episode.types';

const { t } = useI18n();

const state = mapState<{
  episodes: {
    guid: string;
    data: Episode;
    status: {
      importStarted: boolean;
      importRunning: boolean;
      importFinished: boolean;
      importError: boolean;
    };
  }[];
}>({
  episodes: selectors.episodes.list
});

const numOfWaitingEpisode = computed(() : number => state.episodes.filter((item) => !item.status.importFinished && !item.status.importRunning && !item.status.importError).length )
const numOfSuccessEpisode = computed(() : number => state.episodes.filter((item) => item.status.importFinished).length )
const numOfFaultyEpisode = computed(() : number => state.episodes.filter((item) => item.status.importError).length )
</script>
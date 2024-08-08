<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">
    {{ t('onboarding.steps.import-episodes.headline') }}
  </h2>
  <p class="my-2 text-sm leading-6 text-gray-600">
    {{ t('onboarding.steps.import-episodes.description', { count: state.episodes.length }) }}
  </p>
  <EpisodesImportProgress class="h-[50px]"></EpisodesImportProgress>
  <div class="flex flex-col md:flex-row">
    <!-- Left column area -->
    <div class="w-full max-w-screen-xl sm:mb-4">
      <div class="overflow-y-auto max-h-[calc(70vh-50px)]">
        <ul class="h-full divide-y divide-gray-200">
          <EpisodeListItem
            v-for="item in state.episodes"
            :data="item.data"
            :status="item.status"
            :guid="item.guid"
            :key="item.guid"
          ></EpisodeListItem>
        </ul>
      </div>
    </div>
    <!-- Right column area -->
    <div class="px-4 sm:px-6 w-full overflow-y-auto max-h-[70vh]">
      <EpisodePreview />
    </div>
  </div>
</template>
<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import { selectors } from '../../../../store';
import { type Episode } from '../../../../types/episode.types';

import EpisodeListItem from '../../components/EpisodeListItem.vue';
import EpisodePreview from '../../components/EpisodePreview.vue';
import EpisodesImportProgress from '../../components/EpisodesImportProgress.vue'

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
</script>

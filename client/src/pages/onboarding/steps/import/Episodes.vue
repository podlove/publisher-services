<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">
    {{ t('onboarding.steps.import-episodes.headline') }}
  </h2>
  <p class="my-2 text-sm leading-6 text-gray-600">
    {{ t('onboarding.steps.import-episodes.description', { count: numOfEpisodes }) }}
  </p>
  <div class="flex flex-col md:flex-row">
    <!-- Left column area -->
    <div class="w-full max-w-screen-xl sm:mb-4">
      <div class="list-height overflow-y-auto">
        <ul class="h-full divide-y divide-gray-200">
          <li v-for="item in state.episodes" :key="item.episode.uuid" class="flex items-center justify-between gap-x-6 py-5">
            <EpisodeListItem :episode="item.episode"></EpisodeListItem>
          </li>
        </ul>
      </div>
    </div>
    <!-- Right column area -->
    <div class="px-4 py-6 sm:px-6 w-full">
      <h2>Preview Episode</h2>
    </div>
  </div>
  <div>
    <p>Footer</p>
  </div>
</template>
<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import { selectors } from '../../../../store';
import { computed } from 'vue';
import EpisodeListItem from '../../components/EpisodeListItem.vue';

const { t } = useI18n();

const state = mapState({
  episodes: selectors.episodes.list
});

const numOfEpisodes = computed<Number>(() => state.episodes.length);

</script>

<style>
.list-height {
  max-height: 70vh;
}
</style>

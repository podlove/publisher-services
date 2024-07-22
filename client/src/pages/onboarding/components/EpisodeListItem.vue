<template>
  <li
    class="flex items-center justify-between gap-x-6 py-2 px-2 cursor-pointer"
     :class="{ 'bg-gray-200': state.selectedEpisode?.guid === guid }"
     @click="selectEpisode()"
  >
    <div class="flex min-w-0 gap-x-4">
      <div class="content-center">
        <CheckCircleIcon
          v-if="status.importFinished"
          class="h-8 w-8 text-green-600"
          aria-hidden="true"
        />
        <XCircleIcon v-if="status.importError" class="h-8 w-8 text-red-600" aria-hidden="true" />
        <QuestionMarkCircleIcon
          v-if="!status.importFinished && !status.importStarted && !status.importRunning"
          class="h-8 w-8 text-gray-500"
          aria-hidden="true"
        />
        <LoadingSpinner
          v-if="status.importRunning"
          class="h-8 w-8 text-gray-500"
          aria-hidden="true"
        />
      </div>
      <div class="min-w-0 flex-auto">
        <p class="text-xs leading-5 text-gray-500">
          {{ publicationDate }}
        </p>
        <p class="text-sm leading-1 text-gray-900">
          {{ data.title }}
        </p>
        <p class="mt-1 flex text-xs text-gray-500">
          {{ data.enclosure.url }}
        </p>
      </div>
    </div>
    <div class="flex min-w-0 gap-x-4">
      <img v-if="data.cover" class="h-12 w-12 flex-none bg-gray-800" :src="data.cover" alt="" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { Action } from 'redux';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapState, injectStore } from 'redux-vuex';
import { CheckCircleIcon, QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid';
import LoadingSpinner from '../../../components/loading/Loading.vue';
import { selectors, actions } from '../../../store';
import { type Episode } from '../../../types/episode.types';
const { t } = useI18n();

const props = defineProps<{
  guid: string;
  data: Episode;
  status: {
    importStarted: boolean;
    importRunning: boolean;
    importFinished: boolean;
    importError: boolean;
  };
}>();

const store = injectStore();

const state = mapState<{
  selectedEpisode: Episode;
}>({
  selectedEpisode: selectors.episodes.selectedEpisode
});

const publicationDate = computed(() => {
  if (!props.data.pub_date) {
    return t('steps.import-episodes.missing.missingReleaseDate');
  }

  if (isNaN(Date.parse(props.data.pub_date))) {
    return t('steps.import-episodes.missing.missingReleaseDate');
  }
  const timestamp = Date.parse(props.data.pub_date);
  return new Date(timestamp).toLocaleDateString();
});

const selectEpisode = () => {
  store.dispatch(actions.episodes.selectEpisode(props.guid) as unknown as Action)
}
</script>

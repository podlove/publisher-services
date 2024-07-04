<template>
  <h2 class="text-base font-semibold leading-7 text-gray-900">
    {{ t('onboarding.steps.import-episodes.headline') }}
  </h2>
  <p class="my-2 text-sm leading-6 text-gray-600">
    {{ t('onboarding.steps.import-episodes.description', { count: numOfEpisodes }) }}
  </p>
</template>
<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import { selectors } from '../../../../store';
import { computed } from 'vue';

const { t } = useI18n();

const state = mapState({
  episodes: selectors.episodes.list
});

const numOfEpisodes = computed<Number>(() => state.episodes.length);

</script>

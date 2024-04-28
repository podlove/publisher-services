<template>
  <div>
    <h2 class="text-base font-semibold leading-7 text-gray-900">
      {{ t('onboarding.steps.select.headline') }}
    </h2>
    <p class="my-4 text-sm leading-6 text-gray-600">
      {{ t('onboarding.steps.select.description') }}
    </p>
    <div class="flex justify-center items-center flex-col sm:flex-row p-4 cursor-pointer">
      <select-tile @click="selectSetup('fresh')" class="mx-4 w-96 text-neutral-500 hover:text-neutral-900" :selected="state.type === 'fresh'" :class="{ 'text-neutral-900': state.type === 'fresh' }" :title="t('onboarding.steps.select.fresh.title')">
        <img :src="freshIconUrl" />
        <p class="text-base text-center h-12">{{ t('onboarding.steps.select.fresh.description') }}</p>

      </select-tile>
      <select-tile @click="selectSetup('import')" class="mx-4 w-96 text-neutral-500 hover:text-neutral-900" :class="{ 'text-neutral-900': state.type === 'import' }" :selected="state.type === 'import'" :title="t('onboarding.steps.select.import.title')">
        <div class="flex items-center flex-col">
          <img :src="importIconUrl"  />
          <p class="text-base text-center h-12">{{ t('onboarding.steps.select.fresh.description') }}</p>
        </div>
      </select-tile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mapState, injectStore } from 'redux-vuex';
import { useI18n } from 'vue-i18n';
import SelectTile from '../../../components/select-tile/SelectTile.vue';
import freshIconUrl from '../../../assets/select-fresh.svg';
import importIconUrl from '../../../assets/select-import.svg';

import { selectors, actions } from '../../../store';
import { Action } from 'redux';

const store = injectStore();

const { t } = useI18n();

const state = mapState({
  type: selectors.setupType.type
});

const selectSetup = (type: 'fresh' | 'import') => {
  store.dispatch(actions.setupType.select(type) as unknown as Action);
}
</script>

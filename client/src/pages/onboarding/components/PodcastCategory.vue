<template>
  <label for="category" class="block text-sm font-medium leading-6 text-gray-900">
    {{ t('onboarding.steps.podcast.podcast-category') }}
  </label>
  <select :value="getPodcastCategoryName()" @input="updatePodcastCategory"
    class="mt-2 block w-full bg-white rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
    <option v-for="(category, cindex) in PodcastCategories" :value="category.name" :key="`category-${cindex}`">
      {{ category.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { Action } from 'redux'

import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../../store';
import { PodcastCategories } from '../../../types/categories.types';


const { t } = useI18n()
const store = injectStore()

const state = mapState({
  category: selectors.podcast.category
})

const updatePodcastCategory = (event: Event) => {
  const value: string = (event.target as HTMLInputElement).value
  const idx: number = PodcastCategories.findIndex(item => item.name === value)

  if (idx !== undefined && idx !== -1) {
    store.dispatch(actions.podcast.setPodcastCategory(PodcastCategories[idx].id) as unknown as Action)
  }
}

const getPodcastCategoryName = () : string => {
  if (state.category !== null) {
    const idx: number = PodcastCategories.findIndex(item => item.id === state.category)
    if (idx !== undefined && idx !== -1) {
      return PodcastCategories[idx].name
    }
  }
  return ""
}

</script>

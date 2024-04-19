<template>
    <label for="author" class="block text-sm font-medium leading-6 text-gray-900">{{
      t('onboarding.steps.podcast.podcast-author')
    }}</label>
    <div class="mt-2">
      <div
        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input type="text" @input="changePodcastAuthor" :value="state.author" id="author"
          class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { injectStore, mapState } from 'redux-vuex';
  import { Action } from 'redux'
  
  import { useI18n } from 'vue-i18n';
  
  import { selectors, actions } from '../../../store';
  
  const { t } = useI18n()
  const store = injectStore()
  
  const state = mapState({
      author: selectors.podcast.author
  })
  
  const changePodcastAuthor = (event: Event) => {
    store.dispatch(actions.podcast.setPodcastAuthor((event.target as HTMLInputElement).value) as unknown as Action)
  }
  
  </script>
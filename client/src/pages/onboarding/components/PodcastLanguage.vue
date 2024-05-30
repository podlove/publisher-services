<template>
  <div class="w-full">
    <label for="language" class="block text-sm font-medium leading-6 text-gray-900 mb-2">
      {{ t('onboarding.steps.podcast.podcast-language') }}
    </label>
    <select
      :value="getPodcastLanguageName()"
      @input="updatePodcastLanguage"
      class="block w-full bg-white rounded-md border-0 p-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-1"
    >
      <option
        v-for="(lang, lindex) in LanguageLocales"
        :value="lang.name"
        :key="`language-${lindex}`"
      >
        {{ lang.name }}
      </option>
    </select>
    <p class="text-xs leading-5 text-gray-600">
      {{ t('onboarding.steps.podcast.podcast-language-hint') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { Action } from 'redux';

import { useI18n } from 'vue-i18n';

import { selectors, actions } from '../../../store';
import { LanguageLocales } from '../../../types/locales.types';

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  language: selectors.podcast.language
});

const updatePodcastLanguage = (event: Event) => {
  const value: string = (event.target as HTMLInputElement).value;
  const language = LanguageLocales.find((item) => item.name === value);
  if (language) {
    store.dispatch(actions.podcast.setPodcastLanguage(language) as unknown as Action);
  }
};

const getPodcastLanguageName = (): string | null => {
  if (state.language === null) {
    return null;
  }
  const language = LanguageLocales.find((item) => item.tag === state.language.tag);
  if (!language) {
    return null;
  }
  return language.name;
};
</script>

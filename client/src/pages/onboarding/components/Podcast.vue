<template>
  <form>
    <div class="flex flex-col px-4 sm:px-6 xl:pl-6">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ t('onboarding.steps.podcast.headline') }}
      </h2>
      <p class="my-4 text-sm leading-6 text-gray-600">
        {{ t('onboarding.steps.podcast.description') }}
      </p>
    </div>
    <div class="flex min-h-full flex-col md:flex-row">
      <!-- Left column area -->
      <div class="px-4 sm:px-6 w-full max-w-lg sm:mb-4">
        <PodcastTitle class="mb-4"></PodcastTitle>
        <PodcastDescription class="mb-4"></PodcastDescription>
        <PodcastAuthor class="mb-4"></PodcastAuthor>
        <PodcastLanguage class="mb-4"></PodcastLanguage>
        <PodcastCategory class="mb-4"></PodcastCategory>
        <PodcastExplicit class="mb-4"></PodcastExplicit>
        <PodcastCover></PodcastCover>
      </div>

      <!-- Right column area -->
      <div class="px-4 py-6 sm:px-6 w-full">
        <PodcastPreview></PodcastPreview>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import PodcastTitle from './PodcastTitle.vue';
import PodcastDescription from './PodcastDescription.vue';
import PodcastAuthor from './PodcastAuthor.vue';
import PodcastLanguage from './PodcastLanguage.vue';
import PodcastCategory from './PodcastCategory.vue';
import PodcastExplicit from './PodcastExplicit.vue';
import PodcastCover from './PodcastCover.vue';
import PodcastPreview from './PodcastPreview.vue';

const { t } = useI18n();
</script>

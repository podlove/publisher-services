<template>
  <form>
    <h2 class="text-base font-semibold leading-7 text-gray-900">
      {{ t('onboarding.steps.podcast.headline') }}
    </h2>
    <p class="my-4 text-sm leading-6 text-gray-600">
      {{ t('onboarding.steps.podcast.description') }}
    </p>
    <div class="flex min-h-full flex-col md:flex-row">
      <!-- Left column area -->
      <div class="w-full max-w-screen-xl sm:mb-4">
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

import PodcastTitle from '../components/PodcastTitle.vue';
import PodcastDescription from '../components/PodcastDescription.vue';
import PodcastAuthor from '../components/PodcastAuthor.vue';
import PodcastLanguage from '../components/PodcastLanguage.vue';
import PodcastCategory from '../components/PodcastCategory.vue';
import PodcastExplicit from '../components/PodcastExplicit.vue';
import PodcastCover from '../components/PodcastCover.vue';
import PodcastPreview from '../components/PodcastPreview.vue';

const { t } = useI18n();
</script>

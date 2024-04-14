<template>
  <form>
    <div class="flex min-h-full flex-col">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        {{ t('onboarding.steps.podcast.headline') }}
      </h2>
      <p class="my-4 text-sm leading-6 text-gray-600">
        {{ t('onboarding.steps.podcast.description') }}
      </p>
    </div>
    <div class="flex min-h-full flex-col">
      <div class="mx-auto w-full grow lg:flex">
        <div class="px-4 py-2 sm:px-6 w-1/2 xl:pl-6">
          <!-- Left column area -->
          <div class="space-y-2">
            <div class="my-6 grid grid-cols-1 gap-y-4 sm:grid-cols-6">

              <div class="sm:col-span-4">
                <PodcastTitle></PodcastTitle>
              </div>

              <div class="col-span-full">
                <PodcastDescription></PodcastDescription>
              </div>

              <div class="sm:col-span-4">
                <PodcastLanguage></PodcastLanguage>
              </div>

              <div class="sm:col-span-3">
                <PodcastCategory></PodcastCategory>
              </div>

              <div class="col-span-full">
                <PodcastExplicit></PodcastExplicit>
              </div>

              <div class="col-span-full">
                <PodcastCover></PodcastCover>
              </div>

            </div>
          </div>
        </div>
        
        <div class="px-4 py-6 sm:px-6 w-1/2 lg:pr-8 xl:pr-6">
          <!-- Right column area -->
          <PodcastPreview></PodcastPreview>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import PodcastTitle from './PodcastTitle.vue';
import PodcastDescription from './PodcastDescription.vue';
import PodcastLanguage from './PodcastLanguage.vue';
import PodcastCategory from './PodcastCategory.vue';
import PodcastExplicit from './PodcastExplicit.vue'
import PodcastCover from './PodcastCover.vue'
import PodcastPreview from './PodcastPreview.vue';

const { t } = useI18n();

</script>

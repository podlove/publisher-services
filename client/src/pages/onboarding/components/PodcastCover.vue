<template>
  <div class="w-full">
    <label for="cover-photo" class="mb-1 block text-sm font-medium leading-6 text-gray-900">{{
      t('onboarding.steps.podcast.cover-photo')
    }}</label>
    <div
      class="relative flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-10 bg-contain bg-no-repeat bg-left"
      :class="{ 'bg-gray-400': dragHighlight }"
      @dragover.prevent
      @drop="handleDrop"
      @dragenter="highlight"
      @dragleave="unhighlight"
    >
      <div
        class="absolute mb-4 z-10 left-0 top-0 w-full h-full flex justify-center items-center bg-opacity-40 hover:opacity-0 text-gray-500 opacity-100"
      >
        <PhotoIcon class="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
      </div>
      <div
        class="absolute z-10 left-0 top-0 w-full h-full flex flex-col justify-center items-center bg-white bg-opacity-50 text-gray-500 opacity-0 hover:opacity-100"
      >
        <div class="flex mb-3 justify-center text-sm leading-6 text-gray-600">
          <Button @click="simulateUploadClick" variant="secondary" class="mt-3 w-32">
            {{ t('onboarding.steps.podcast.upload-file') }}
          </Button>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            class="hidden"
            @change="handleFileEvent"
          />
        </div>
        <Button
          variant="secondary"
          class="mb-3 w-32 text-center"
          :disabled="state.imageData === null"
          @click="removeCover"
          ><span class="w-full text-center">{{ t('onboarding.steps.podcast.cover-reset') }}</span>
        </Button>
        <div class="text-center">
          <p class="pl-1">{{ t('onboarding.steps.podcast.drag-and-drop') }}</p>
        </div>
      </div>
    </div>

    <p class="mt-2 text-xs leading-5 text-gray-600">
      {{ t('onboarding.steps.podcast.podcast-upload-hint') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { Action } from 'redux';

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { PhotoIcon } from '@heroicons/vue/24/solid';
import Button from '../../../components/button/Button.vue';

import { selectors, actions } from '../../../store';

import { convertImageToBase64, getImageResolution } from '../../../lib/image';

const dragHighlight = ref<boolean>(false);

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  imageName: selectors.podcast.image_name,
  imageData: selectors.podcast.image_data
});

const highlight = () => {
  dragHighlight.value = true;
};

const unhighlight = () => {
  dragHighlight.value = false;
};

const simulateUploadClick = () => {
  const fileInput = document.getElementById('file-upload');
  if (fileInput !== undefined) {
    (fileInput as HTMLInputElement).click();
  }
};

const removeCover = () => {
  store.dispatch(actions.podcast.removePodcastCover() as unknown as Action);
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  if (
    event.dataTransfer !== undefined &&
    event.dataTransfer?.files &&
    event.dataTransfer.files.length > 0
  ) {
    store.dispatch(
      actions.podcast.setPodcastCover(event.dataTransfer.files[0]) as unknown as Action
    );
  }
};

// Handler für die Bildauswahl
const handleFileEvent = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    store.dispatch(actions.podcast.setPodcastCover(target.files[0]) as unknown as Action);
  }
};
</script>

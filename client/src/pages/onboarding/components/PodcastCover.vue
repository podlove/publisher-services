<template>
  <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">{{
    t('onboarding.steps.podcast.cover-photo') }}</label>
  <div
    class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-contain bg-no-repeat bg-left"
    :class="{ 'bg-gray-400': dragHighlight }" @dragover.prevent @drop="handleDrop" @dragenter="highlight"
    @dragleave="unhighlight">
    <div class="text-center">
      <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
      <div class="mt-4 flex justify-center text-sm leading-6 text-gray-600">
        <label for="file-upload"
          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
          <span>{{ t('onboarding.steps.podcast.upload-file') }}</span>
          <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileEvent" />
        </label>
        <p class="pl-1">{{ t('onboarding.steps.podcast.drag-and-drop') }}</p>
      </div>
    </div>
  </div>
  <p class="mt-3 text-sm leading-6 text-gray-600">
    {{ t('onboarding.steps.podcast.podcast-upload-hint') }}
  </p>
</template>

<script lang="ts" setup>
import { injectStore, mapState } from 'redux-vuex';
import { Action } from 'redux'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

import { PhotoIcon } from '@heroicons/vue/24/solid';

import { selectors, actions } from '../../../store';

const dragHighlight = ref<boolean>(false);

const { t } = useI18n()
const store = injectStore()

const state = mapState({
  imageName: selectors.podcast.image_name,
  imageData: selectors.podcast.image_data
})

const highlight = () => {
  dragHighlight.value = true
}

const unhighlight = () => {
  dragHighlight.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer !== undefined && event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    handleFile(event.dataTransfer.files[0])
  }
}

function convertImageToBase64(file: File, callback: (base64Image: string) => void): void {
  const reader = new FileReader();
  reader.onload = function(event: ProgressEvent<FileReader>) {
    if (event.target && typeof event.target.result === 'string') {
      callback(event.target.result);
    }
  };
  reader.readAsDataURL(file);
}

// Handler für die Bildauswahl
const handleFileEvent = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    handleFile(target.files[0])
  }
};

const handleFile = (file: File) => {
  if (file.type.startsWith('image/')) {
    convertImageToBase64(file, function(base64Image: string) {
      store.dispatch(actions.podcast.setPodcastCoverData(base64Image) as unknown as Action)
    })
    store.dispatch(actions.podcast.setPodcastCoverName(file.name) as unknown as Action)
  }
}

</script>

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
        <div class="border-2 border-gray-200 px-4 py-2 sm:px-6 w-1/2 xl:pl-6">
          <!-- Left column area -->
          <div class="space-y-2">
            <div class="pb-12">

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label for="name" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('onboarding.steps.podcast.podcast-name')
                    }}</label>
                  <div class="mt-2">
                    <div
                      class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input type="text" @change="changePodcastName" :value="state.name" id="name"
                        class="block flex-1 border-0 py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        :placeholder="t('onboarding.steps.podcast.podcast-name-placeholder')" />
                    </div>
                  </div>
                </div>

                <div class="col-span-full">
                  <label for="description" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('onboarding.steps.podcast.podcast-description')
                    }}</label>
                  <div class="mt-2">
                    <textarea id="description" @change="changePodcastDescription" :value="state.description" rows="3"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">
                    {{ t('onboarding.steps.podcast.podcast-description-hint') }}
                  </p>
                </div>

                <div class="sm:col-span-4">
                  <label for="language" class="block text-sm font-medium leading-6 text-gray-900">
                    {{ t('onboarding.steps.podcast.podcast-language') }}
                  </label>
                  <select :value="getPodcastLanguageName()" @input="updatePodcastLanguage"
                    class="mt-2 block w-full bg-white rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option v-for="(lang, lindex) in LanguageLocales" :value="lang.name"
                      :key="`jurisdiction-${lindex}`">
                      {{ lang.name }}
                    </option>
                  </select>
                  <p class="mt-3 text-sm leading-6 text-gray-600">
                    {{ t('onboarding.steps.podcast.podcast-language-hint') }}
                  </p>
                </div>

                <div class="sm:col-span-3">
                  <label for="category" class="block text-sm font-medium leading-6 text-gray-900">
                    {{ t('onboarding.steps.podcast.podcast-category') }}
                  </label>
                  <select :value="getPodcastCategoryName()" @input="updatePodcastCategory"
                    class="mt-2 block w-full bg-white rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option v-for="(category, cindex) in PodcastCategories" :value="category.name"
                      :key="`jurisdiction-${cindex}`">
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div class="col-span-full">
                  <label for="category" class="pb-2 block text-sm font-medium leading-6 text-gray-900" >
                    {{ t('onboarding.steps.podcast.podcast-content') }}
                  </label>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" @change="swapPodcastExpicit" value="state.explicit" class="sr-only peer">
                    <div
                      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span class="ms-3 text-sm text-gray-900 dark:text-gray-300">
                      {{ t('onboarding.steps.podcast.podcast-content-hint') }}
                    </span>
                  </label>
                </div>

                <div class="col-span-full">
                  <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">{{
                    t('onboarding.steps.podcast.cover-photo') }}</label>
                  <div
                    class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-contain bg-no-repeat bg-left"
                    :class="{ 'bg-gray-200': dragHighlight}"
                    @dragover.prevent
                    @drop="handleDrop"
                    @dragenter="highlight"
                    @dragleave="unhighlight">
                    <div class="text-center">
                      <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div class="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                        <label for="file-upload"
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>{{ t('onboarding.steps.podcast.upload-file') }}</span>
                          <input id="file-upload" name="file-upload" type="file" class="sr-only"
                            @change="handleFileEvent" />
                        </label>
                        <p class="pl-1">{{ t('onboarding.steps.podcast.drag-and-drop') }}</p>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 text-sm leading-6 text-gray-600">
                    {{ t('onboarding.steps.podcast.podcast-upload-hint') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="border-2 border-gray-200 px-4 py-6 sm:px-6 w-1/2 lg:pr-8 xl:pr-6">
          <!-- Right column area -->
          <Preview></Preview>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { PhotoIcon } from '@heroicons/vue/24/solid';
import { injectStore, mapState } from 'redux-vuex';
import { selectors, actions } from '../../../store';
import { Action } from 'redux';
import { LanguageLocales } from '../../../types/locales.types'
import { PodcastCategories } from '../../../types/categories.types'
import Preview from '../components/Preview.vue';
import { computed } from 'vue';

const dragHighlight = ref<boolean>(false);

const { t } = useI18n();
const store = injectStore();

const state = mapState({
  name: selectors.podcast.name,
  description: selectors.podcast.description,
  imageName: selectors.podcast.image_name,
  imageData: selectors.podcast.image_data,
  explicit: selectors.podcast.explicit,
  language: selectors.podcast.language,
  category: selectors.podcast.category
})

const changePodcastName = (event: Event) => {
  store.dispatch(actions.podcast.setPodcastName((event.target as HTMLInputElement).value) as unknown as Action)
}

const changePodcastDescription = (event: Event) => {
  store.dispatch(actions.podcast.setPodcastDescription((event.target as HTMLInputElement).value) as unknown as Action)
}

const swapPodcastExpicit = (event: Event) => {
  if (state.explicit) {
    store.dispatch(actions.podcast.setPodcastExplicit(false) as unknown as Action)
  }
  else {
    store.dispatch(actions.podcast.setPodcastExplicit(true) as unknown as Action)
  }
}

// Podcast Language
const updatePodcastLanguage = (event: Event) => {
  const value: string = (event.target as HTMLInputElement).value
  const idx: number = LanguageLocales.findIndex(item => item.name === value)

  if (idx !== undefined && idx !== -1) {
    store.dispatch(actions.podcast.setPodcastLanguage(LanguageLocales[idx].tag) as unknown as Action)
  }
}

const getPodcastLanguageName = () : string => {
  if (state.language !== null) {
    const idx: number = LanguageLocales.findIndex(item => item.tag === state.language)
    if (idx !== undefined && idx !== -1) {
      return LanguageLocales[idx].name
    }
  }
  return ""
}

// Podcast Category
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

// Cover functions

const highlight = () => {
  dragHighlight.value = true
}

const unhighlight = () => {
  dragHighlight.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer !== undefined && event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    console.log("File :" + event.dataTransfer.files[0].name)
    handleFile(event.dataTransfer.files[0])
  }
}

function convertImageToBase64(file: File, callback: (base64Image: string) => void): void {
  const reader = new FileReader();
  reader.onload = function(event: ProgressEvent<FileReader>) {
    if (event.target && typeof event.target.result === 'string') {
      callback(event.target.result);
    } else {
      console.error('Fehler beim Lesen der Datei.');
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

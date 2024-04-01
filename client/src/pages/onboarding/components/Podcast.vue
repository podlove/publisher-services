<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          {{ t('onboarding.steps.podcast.headline') }}
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          {{ t('onboarding.steps.podcast.description') }}
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">{{
              t('onboarding.steps.podcast.podcast-name')
            }}</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  :placeholder="t('onboarding.steps.podcast.podcast-name-placeholder')"
                />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label for="description" class="block text-sm font-medium leading-6 text-gray-900">{{
              t('onboarding.steps.podcast.podcast-description')
            }}</label>
            <div class="mt-2">
              <textarea
                id="description"
                name="description"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              {{ t('onboarding.steps.podcast.podcast-description-hint') }}
            </p>
          </div>

          <div class="col-span-full">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">{{ t('onboarding.steps.podcast.cover-photo') }}</label
            >
            <div
              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            >
              <div class="text-center">
                <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div class="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>{{ t('onboarding.steps.podcast.upload-file') }}</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                  </label>
                  <p class="pl-1">{{ t('onboarding.steps.podcast.drag-and-drop') }}</p>
                </div>
                <p class="flex justify-center text-xs leading-5 text-gray-600">
                  {{ t('onboarding.steps.podcast.upload-image-description') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { PhotoIcon } from '@heroicons/vue/24/solid';

const { t } = useI18n();
</script>

<style lang="postcss"></style>

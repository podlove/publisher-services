<template>
  <div class="mx-auto px-6 lg:px-8">
    <div class="mx-auto pb-5 lg:text-center">
      <h2 class="text-3xl font-semibold leading-7 text-indigo-600">{{ t('onboarding.steps.next-steps.headline') }}</h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">{{ t('onboarding.steps.next-steps.description') }}</p>
    </div>
    <h3 class="text-lg font-bold text-indigo-600 mb-4">{{ t('onboarding.steps.next-steps.feed') }}</h3>
    <div class="pb-5">
      <p> http://prototypefund.local/feed/mp3 </p>
      <p class="mt-5 text-sm leading-6 text-gray-600">{{ t('onboarding.steps.next-steps.feed-hint') }}</p>
    </div>
    <h3 class="text-lg font-bold text-indigo-600 mb-4">{{ t('onboarding.steps.next-steps.more') }}</h3>
    <div class="pb-5 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <div class="flex flex-col items-start justify-between">
        <div class="relative w-full">
          <img :src="learnIconUrl" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        </div>
        <div class="max-w-xl">
          <h3 class="mt-5 text-base leading-6 text-gray-800">{{ t('onboarding.steps.next-steps.learn-head') }}</h3>
          <p class="mt-5 text-sm leading-6 text-gray-600">{{ t('onboarding.steps.next-steps.learn') }}</p>
        </div>
      </div>
      <div class="flex flex-col items-start justify-between">
        <div class="relative w-full">
          <img :src="promoteIconUrl" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        </div>
        <div class="max-w-xl">
          <h3 class="mt-5 text-base leading-6 text-gray-800">{{ t('onboarding.steps.next-steps.promote-head') }}</h3>
          <p class="mt-5 text-sm leading-6 text-gray-600">{{ t('onboarding.steps.next-steps.promote') }}</p>
        </div>
      </div>
      <div class="flex flex-col items-start justify-between">
        <div class="relative w-full">
          <img :src="communityIconUrl" alt="" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        </div>
        <div class="max-w-xl">
          <h3 class="mt-5 text-base leading-6 text-gray-800">{{ t('onboarding.steps.next-steps.community-head') }}</h3>
          <p class="mt-5 text-sm leading-6 text-gray-600">{{ t('onboarding.steps.next-steps.community') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import learnIconUrl from '../../../assets/next-learn.svg';
import promoteIconUrl from '../../../assets/next-promote.svg';
import communityIconUrl from '../../../assets/next-community.svg';

const { t } = useI18n();
</script>

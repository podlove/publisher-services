<template>
  <div class="flex min-w-0 gap-x-4">
    <div class="content-center">
      <CheckCircleIcon v-if="enclosureValid" class="h-12 w-12 text-green-600" aria-hidden="true" />
      <XCircleIcon v-else class="h-12 w-12 text-red-600" aria-hidden="true" />
    </div>
    <div class="min-w-0 flex-auto">
      <p class="text-xs leading-5 text-gray-500">
        {{ publicationDate }}
      </p>
      <p class="text-sm leading-6 text-gray-900">
        {{ episode.title }}
      </p>
      <p class="mt-1 flex text-xs leading-5 text-gray-500">
        {{ episode.enclosure.url }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid';
import { type Episode } from '../../../types/episode.types';
const { t } = useI18n();

const props = defineProps<{ episode: Episode }>();
const enclosureValid = computed(
  () => props.episode.enclosure.url && props.episode.enclosure.url.length > 0
);
const publicationDate = computed(() => {
  if (!props.episode.pub_date) {
    return t('steps.import-episodes.missing.missingReleaseDate');
  }
  if (isNaN(Date.parse(props.episode.pub_date))) {
    return t('steps.import-episodes.missing.missingReleaseDate');
  }
  const timestamp = Date.parse(props.episode.pub_date);
  return new Date(timestamp).toLocaleDateString();
});
</script>

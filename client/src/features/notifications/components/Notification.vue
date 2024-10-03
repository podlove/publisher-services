<template>
  <div
    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <InformationCircleIcon
            v-if="type === 'info'"
            class="h-6 w-6"
            :class="textColor"
            aria-hidden="true"
          />
          <ExclamationCircleIcon
            v-if="type === 'error'"
            class="h-6 w-6"
            :class="textColor"
            aria-hidden="true"
          />
          <ExclamationCircleIcon
            v-if="type === 'warning'"
            class="h-6 w-6"
            :class="textColor"
            aria-hidden="true"
          />
          <CheckCircleIcon
            v-if="type === 'success'"
            class="h-6 w-6"
            :class="textColor"
            aria-hidden="true"
          />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium" :class="textColor">{{ title }}</p>
          <p class="mt-1 text-sm text-gray-500" v-if="details">
            {{ details }}
          </p>
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <button
            type="button"
            @click="emit('close')"
            class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="sr-only">Close</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InformationCircleIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { type Notification } from '../../../types/notification.types';
import { computed } from 'vue';

const props = defineProps<{ type: Notification['type']; title: string; details?: string }>();
const emit = defineEmits(['close']);
const textColor = computed(() => {
  switch (props.type) {
    case 'info':
      return 'text-gray-900';
    case 'error':
      return 'text-red-600';
    case 'warning':
      return 'text-yellow-600';
    case 'success':
      return 'text-green-600';
  }
});
</script>

<template>
  <component
    :is="type"
    type="button"
    class="inline-flex items-center focus:outline-none focus:ring-2 border border-transparent shadow-sm whitespace-nowrap disabled:opacity-75"
    :disabled="disabled"
    :class="[variantClass, sizeClass]"
  >
    <slot />
</component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

export type ButtonType =
  | 'primary'
  | 'primary-disabled'
  | 'secondary'
  | 'secondary-disabled'
  | 'submit'
  | 'danger'
  | 'default';

export type ButtonSize = 'small' | 'medium' | 'large';

interface Props {
  variant?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  type?: 'button' | 'a';
}

const props = defineProps<Props>();

const variant = computed<ButtonType>(() => props.variant || 'default');
const size = computed<ButtonSize>(() => props.size || 'medium');
const disabled = computed<boolean>(() => props.disabled || false);

const type = computed<'button' | 'a'>(() => props.type || 'button');

const variantClass = computed(() => {
  switch (variant.value) {
    case 'default':
      return `focus:outline-none text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-100`;
    case 'primary':
      return `focus:ring-offset-2 text-white focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300`;
    case 'primary-disabled':
      return `focus:ring-offset-2 text-white focus:ring-indigo-500 bg-indigo-600 opacity-50 cursor-not-allowed`;
    case 'secondary':
      return `focus:ring-offset-2 text-indigo-700 focus:ring-indigo-500 bg-indigo-100 hover:bg-indigo-200 disabled:bg-indigo-50`;
    case 'secondary-disabled':
      return `focus:ring-offset-2 text-indigo-700 focus:ring-indigo-500 bg-indigo-100 disabled:bg-indigo-50 opacity-50 cursor-not-allowed`;
    case 'danger':
      return `bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300`;
  }
});

const sizeClass = computed(() => {
  switch (size.value) {
    case 'small':
      return `px-2.5 py-1.5 text-xs font-medium rounded `;
    case 'medium':
      return `px-3 py-2 text-sm leading-4 font-medium rounded-md`;
    case 'large':
      return `px-6 py-3 text-base font-medium rounded-md`;
  }
});
</script>

<style></style>

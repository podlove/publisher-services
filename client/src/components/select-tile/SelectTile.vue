<template>
  <div
    :class="[
      selected ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
      'rounded-3xl p-8 xl:p-10 hover:ring-2 hover:ring-indigo-600'
    ]"
  >
    <h2
      :class="[
        selected ? 'text-indigo-600' : 'text-gray-900',
        'text-xl text-center font-semibold leading-8'
      ]"
    >
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selected: boolean;
  title: string;
}>();
</script>

<template>
  <div>
    <label class="text-xs text-gray-900 font-bold">{{ label }}</label>
    <div class="text-sm text-gray-800 pl-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>

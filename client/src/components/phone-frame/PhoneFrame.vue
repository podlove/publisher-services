<template>
  <div class="relative w-[255px] h-[515px]">
    <img :src="phoneFrame" class="block absolute z-10 w-full h-full top-0 left-0" />
    <div class="absolute screen-container z-0">
      <div class="relative overflow-auto w-full h-full rounded-lg pt-9">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import phoneFrame from '../../assets/phone-frame.svg';

const props = defineProps<{ background?: string }>();

const background = computed(() => props.background || 'transparent');
</script>

<style lang="postcss" scoped>
.screen-container {
  width: calc(100% - 28px);
  height: calc(100% - 22px);
  left: 14px;
  top: 11px;
  background: v-bind('background');
}
</style>

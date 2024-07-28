<template>
  <div class="ring-2 ring-gray-300 rounded-3xl p-8 xl:p-10">
    <div class="flex flex-col items-start justify-between">
      <div class="relative w-full">
        <img
          :src="image"
          alt=""
          class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-contain sm:aspect-[2/1] lg:aspect-[3/2]"
        />
      </div>
      <div class="max-w-xl">
        <h3 class="mt-5 text-base leading-6 text-gray-800">
          {{ headline }}
        </h3>
        <p class="mt-5 text-sm leading-6 text-gray-600">
          {{ content}}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  headline: string;
  content: string;
}>()
</script>

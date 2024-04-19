<template>
    <div class="flex flex-col">
        <div class="border-2 flex justify-center">
            <img id="cover" class="w-1/2 aspect-square" :src="image"/>
        </div>
        <div>
            <p class="text-center text-2xl">
                {{ state.name }}
            </p>
        </div>
        <div>
            <p class="p-2 text-center text-medium">
                {{ state.author }}
            </p>
        </div>
        <div>
            <p class="p-2 text-block text-medium">
                {{ state.description }}
            </p>
        </div>
        <div>
            <p class="p-2 text-block text-medium">
                {{ getPodcastCategoryName() }}
            </p>
        </div>
    </div>
</template>
  
<script lang="ts" setup>

import { useI18n } from 'vue-i18n';
import { mapState } from 'redux-vuex';
import { computed } from 'vue';
import { selectors, actions } from '../../../store';
import { PodcastCategories } from '../../../types/categories.types'

const { t } = useI18n();

const state = mapState({
  name: selectors.podcast.name,
  description: selectors.podcast.description,
  author: selectors.podcast.author,
  imageName: selectors.podcast.image_name,
  imageData: selectors.podcast.image_data,
  explicit: selectors.podcast.explicit,
  language: selectors.podcast.language,
  category: selectors.podcast.category
})

const getPodcastCategoryName = () : string | null => {
  if (state.category === null) {
    return null
  }
  const category = PodcastCategories.find(item => item.id === state.category.id)
  if (!category) {
    return null
  }
  return category.name
}

const image = computed(() => state.imageData ? state.imageData : undefined)

</script>

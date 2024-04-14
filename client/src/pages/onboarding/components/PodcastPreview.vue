<template>
    <div class="flex flex-col">
        <div class="border-2 flex justify-center">
            <img id="cover" class="w-1/2 aspect-square" :src="getImage()"/>
        </div>
        <div>
            <p class="text-center text-2xl">
                {{ state.name }}
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
import { selectors, actions } from '../../../store';
import { PodcastCategories } from '../../../types/categories.types'

const { t } = useI18n();

const state = mapState({
  name: selectors.podcast.name,
  description: selectors.podcast.description,
  imageName: selectors.podcast.image_name,
  imageData: selectors.podcast.image_data,
  explicit: selectors.podcast.explicit,
  language: selectors.podcast.language,
  category: selectors.podcast.category
})

const getPodcastCategoryName = () : string => {
  if (state.category !== null) {
    const idx: number = PodcastCategories.findIndex(item => item.id === state.category)
    if (idx !== undefined && idx !== -1) {
      return PodcastCategories[idx].name
    }
  }
  return ""
}

const getImage = () => {
    if (state.imageData !== undefined) {
        const img = document.getElementById("cover") as HTMLImageElement
        if (img) {
            img.src = state.imageData
        } 
    }
}

</script>

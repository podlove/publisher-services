<template>
  <div>
    <EpisodeDetail
      class="mb-1"
      :label="t('onboarding.steps.import-episodes.episodePreview.title')"
      v-if="state.selectedEpisode?.title"
    >
      {{ state.selectedEpisode?.title }}
    </EpisodeDetail>
    <EpisodeDetail
      class="mb-1"
      :label="t('onboarding.steps.import-episodes.episodePreview.subtitle')"
      v-if="state.selectedEpisode?.subtitle"
    >
      {{ state.selectedEpisode?.subtitle }}
    </EpisodeDetail>
    <EpisodeDetail
      class="mb-1"
      :label="t('onboarding.steps.import-episodes.episodePreview.publicationDate')"
      v-if="state.selectedEpisode?.pub_date"
    >
      {{ publicationDate }}
    </EpisodeDetail>
    <EpisodeDetail
      class="mb-1"
      :label="t('onboarding.steps.import-episodes.episodePreview.mediaFile')"
      v-if="state.selectedEpisode?.enclosure.url"
    >
      <a :href="state.selectedEpisode?.enclosure.url" class="border-gray-300 hover:border-b">{{ state.selectedEpisode?.enclosure.url }}</a>
    </EpisodeDetail>
    <EpisodeDetail
      class="mb-1"
      :label="t('onboarding.steps.import-episodes.episodePreview.duration')"
      v-if="state.selectedEpisode?.duration"
    >
      {{ state.selectedEpisode?.duration }}
    </EpisodeDetail>
    <EpisodeDetail
      class="mb-1"
      :label="t('onboarding.steps.import-episodes.episodePreview.summary')"
      v-if="state.selectedEpisode?.summary"
    >
      <div v-html="state.selectedEpisode?.summary"></div>
    </EpisodeDetail>
    <EpisodeDetail
      class="mb-1"
      :label="t('onboarding.steps.import-episodes.episodePreview.chapters')"
      v-if="(state.selectedEpisode?.chapters || []).length > 0"
    >
      <ul class="list-decimal pl-6">
        <li v-for="chapter in state.selectedEpisode?.chapters || []">
          {{ chapter.title }}
        </li>
      </ul>
    </EpisodeDetail>
    <EpisodeDetail
      class="mb-1"
      :label="t('onboarding.steps.import-episodes.episodePreview.transcripts')"
      v-if="state.selectedEpisode?.transcript?.url"
    >
      {{ state.selectedEpisode?.transcript?.url }}
    </EpisodeDetail>
    <EpisodeDetail
      class="mb-1 episode-content"
      :label="t('onboarding.steps.import-episodes.episodePreview.content')"
      v-if="state.selectedEpisode?.content"
    >
      <div v-html="state.selectedEpisode?.content"></div>
    </EpisodeDetail>
  </div>
</template>

<script setup lang="ts">
import { mapState } from 'redux-vuex';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Episode } from '../../../types/episode.types';
import { selectors } from '../../../store';
import EpisodeDetail from './EpisodeDetail.vue';

const { t } = useI18n();

const state = mapState<{ selectedEpisode: Episode | null }>({
  selectedEpisode: selectors.episodes.selectedEpisode
});

const publicationDate = computed(() => {
  if (!state.selectedEpisode?.pub_date) {
    return t('steps.import-episodes.missing.missingReleaseDate');
  }

  if (isNaN(Date.parse(state.selectedEpisode?.pub_date))) {
    return t('steps.import-episodes.missing.missingReleaseDate');
  }
  const timestamp = Date.parse(state.selectedEpisode?.pub_date);
  return new Date(timestamp).toLocaleDateString();
});
</script>

<style is:global>
.episode-content ul {
  list-style-type: disc !important;
  margin-bottom: 2em;
  margin-left: 1.5em;
}

.episode-content li {
  margin-bottom: 0.5em;
}

.episode-content h1 {
  font-weight: bold;
  margin-bottom: 1em;
}

.episode-content h2 {
  font-weight: bold;
  margin-bottom: 0.75em;
}

.episode-content h3 {
  font-weight: bold;
  margin-bottom: 0.75em;
}

.episode-content a {
  border-bottom: 1px solid rgba(203, 213, 224);
  padding-bottom: 1px;
}
</style>

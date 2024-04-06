<template>
    <div class="bg-white">
        <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-black">
                    {{ t('select.description') }}
                </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <PodloveButton variant="primary"><router-link to="/onboarding">{{t('select.podcast.title')}}</router-link></PodloveButton>
                    <PodloveButton variant="primary"><router-link to="/import">{{t('select.import.title')}}</router-link></PodloveButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import PodloveButton from '../../components/button/Button.vue'

const { t } = useI18n();

</script>
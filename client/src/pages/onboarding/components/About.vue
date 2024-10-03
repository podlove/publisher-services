<template>
  <div>
    <modal :visible="visible" @close="visible = false">
      <div class="font-light">
        <h3 class="text-lg font-semibold leading-6 text-gray-900">About</h3>
        <div class="mb-2">
          <h4 class="text-base font-bold leading-6 text-gray-800">Content and Service</h4>
          <p>Service provided by podlove.org, represented by</p>
          <ul class="mb-2 list-disc ml-4">
            <li>Martin Fischer</li>
            <li>Alexander Heimbuch</li>
            <li>Eric Teubert</li>
            <li>Dirk Schumann</li>
          </ul>

          <p>
            Responsible for the content according to § 55 Abs. 2 RStV: Eric Teubert<br />
            Hafenstr. 5C<br />
            04179 Leipzig<br />
          </p>
        </div>
        <div class="mb-2">
          <h4 class="text-base font-bold leading-6 text-gray-800">Contact</h4>
          <p>Mail: podlove@podlove.org</p>
        </div>
        <div class="mb-2">
          <h4 class="text-base font-bold leading-6 text-gray-800">Privacy and Data Protection</h4>
          <p>
            This service is hosted in Germany, we don't collect or store any information, neither do
            we send any of your data to other services.
          </p>
        </div>
        <div class="mb-2">
          <h4 class="text-base font-bold leading-6 text-gray-800">Resources</h4>
          <p>
            Illustrations by
            <a class="text-blue-400 hover:text-blue-500" href="https://storyset.com">storyset</a>
          </p>
        </div>
      </div>
    </modal>
    <button class="absolute right-2" @click="visible = true">
      <InformationCircleIcon class="w-6 text-gray-500 hover:text-gray-700" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import Modal from '../../../components/modal/Modal.vue';

const visible = ref(false);
</script>

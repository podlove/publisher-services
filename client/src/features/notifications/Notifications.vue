<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        v-for="(notification, index) in state.notifications"
      >
        <NotificationComponent
          v-if="notification.visible"
          :type="notification.type"
          :title="notification.title"
          :details="notification.details"
          @close="closeNotification(index)"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Action } from 'redux';
import { injectStore, mapState } from 'redux-vuex';
import { actions, selectors } from '../../store';
import { type Notification } from '../../types/notification.types';
import NotificationComponent from './components/Notification.vue';

const store = injectStore();

const state = mapState<{
  notifications: Notification[]
}>({
  notifications: selectors.notifications
});

const closeNotification = (index: number) => {
  store.dispatch(actions.notifications.hide(index) as Action);
};
</script>

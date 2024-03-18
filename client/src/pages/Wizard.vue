<template>
  <div v-if="state.user && state.password && state.site">
    Authenticated with <pre>{{ state.user }}: {{ state.password }}</pre> for <pre>{{ state.site }}</pre>
  </div>
</template>
<script lang="ts" setup>
import { mapState } from 'redux-vuex';
import { selectors } from '../store';
import * as request from '../lib/request';

const state = mapState({
  user: selectors.authentication.user,
  password: selectors.authentication.password,
  site: selectors.authentication.site
});
</script>

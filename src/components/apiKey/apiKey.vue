<!-- eslint-disable camelcase -->
<!-- eslint-disable max-len -->
<!-- html -->
<template>
  <div id="q-app" class="col-3">
    <div class="q-pa-md">
      <div class="q-gutter-y-md column">
        <q-input v-model="apiKeyData" style="max-width: 32rem" label="API-key">
        </q-input>
        <q-btn label="保存" @click="saveApiKey"></q-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapWritableState } from 'pinia';
import { useApiKey } from './apiKey';

export default defineComponent({
  name: 'inputSearch',

  components: {},
  computed: {
    ...mapWritableState(useApiKey, ['apiKeyData']),
  },
  methods: {
    ...mapActions(useApiKey, ['saveApiKey']),
  },
});
</script>

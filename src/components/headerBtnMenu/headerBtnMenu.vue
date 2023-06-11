<!-- eslint-disable camelcase -->
<!-- eslint-disable max-len -->
<template>
  <q-btn class="col-1" flat style="width: 20px" dense icon="menu">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section @click="leftDrawerOpen = !leftDrawerOpen"
            >设置</q-item-section
          >
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section @click="router.push('register-page')"
            >login</q-item-section
          >
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapWritableState } from 'pinia';
import { useRegister } from 'src/pages/registerPage/registerPage.vue';
import { defineStore } from 'pinia';

export const useHeaderBtnMenuData = defineStore('headerBtnMenuData', {
  state: () => ({
    leftDrawerOpen: false,
    userName: 'testa',
    searchType: 'anki',
  }),
});

export default defineComponent({
  name: 'headerBtnMenu',
  computed: {
    ...mapWritableState(useHeaderBtnMenuData, ['leftDrawerOpen']),
    ...mapWritableState(useRegister, ['router']),
  },
});
</script>

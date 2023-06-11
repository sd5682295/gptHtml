<template>
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="menuOpen = !menuOpen" />
    <q-toolbar-title>魔法书</q-toolbar-title>
  </q-toolbar>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useMainLayoutData } from 'src/layouts/MainLayout.vue';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'ToolBar',

  mounted() {},
  computed: { ...mapWritableState(useMainLayoutData, ['menuOpen']) },
});
</script>

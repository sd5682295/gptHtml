<!-- eslint-disable max-len -->

<!-- @keydown.left="test_click" -->

<!-- <h3 style="font-size: 24px; color: red; border-bottom: 1px solid #ddd">
      注册和登入
    </h3> -->
<template>
  <div
    class="q-gutter-md q-mt-xl q-mb-xl q-pa-md q-ma-sm"
    style="max-width: 600px"
  >
    <h3 style="font-size: 24px; border-bottom: 1px solid #ddd">用户中心</h3>
    <q-field label="用户名" v-model="userName" readonly />
    <q-field label="vip过期时间" v-model="vipExpirationDate" readonly />
  </div>
</template>

<script lang="ts">
import { mapActions, mapWritableState } from 'pinia';
import {
  ComponentInternalInstance,
  defineComponent,
  getCurrentInstance,
} from 'vue';

import { defineStore } from 'pinia';
// import _ from 'lodash/fp';
import { Md5 } from 'ts-md5';
import axios from 'axios';
import { Router, useRouter } from 'vue-router';
import { useConfig } from 'src/stores/config';
import { useRegister } from './registerPage.vue';
// import { useBeShow } from 'src/stores/beShow';

export const useUserManage = defineStore('userManage', {
  state: () => ({}),
  // place:mainTreeDataInterface['place']
  actions: {},
});

export default defineComponent({
  name: 'userManage',
  computed: {
    ...mapWritableState(useRegister, ['userName', 'vipExpirationDate']),
  },
  methods: {},
});
</script>
<style>
/* h3::first-letter {
      font-size: 60px;
      text-transform: capitalize;
    } */
.q-card {
  width: 800px;
}
@media only screen and (max-width: 750px) {
  .q-card {
    width: 500px;
  }
}
@media only screen and (max-width: 550px) {
  .q-card {
    width: 300px;
  }
}
@media only screen and (max-width: 350px) {
  .q-card {
    width: 200px;
  }
}
</style>

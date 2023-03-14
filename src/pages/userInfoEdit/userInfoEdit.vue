<!-- eslint-disable max-len -->

<!-- @keydown.left="test_click" -->
<template>
  <div
    class="q-gutter-md q-mt-xl q-mb-xl q-pa-md q-ma-sm"
    style="max-width: 600px"
  >
    <h3 style="font-size: 24px; color: #333; border-bottom: 1px solid #ddd">
      修改用户信息
    </h3>
    <q-form>
      <div class="q-mb-md">
        <q-input
          v-model="userName"
          label="用户名"
          type="text"
          outlined
          dense
          :maxlength="20"
        />
      </div>
      <div class="q-mb-lg">
        <q-input
          v-model="password"
          label="新密码，不修改密码不需要填写"
          type="password"
          outlined
          dense
          :show-password="true"
        />
      </div>
      <div class="q-mb-md">
        <q-input
          v-model="vipExpirationDate"
          :format="stringToDate"
          label="VIP到期日期"
          type="date"
          outlined
          dense
        />
      </div>
      <q-btn
        type="submit"
        label="提交信息"
        color="primary"
        class="q-mt-md"
        @click="editUserInfo"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { mapActions, mapWritableState } from 'pinia';
import { defineComponent } from 'vue';
import { useUserInfoEdit } from './userInfoEdit';
export default defineComponent({
  name: 'registerPage',
  setup() {
    return {};
  },

  computed: {
    ...mapWritableState(useUserInfoEdit, [
      'password',
      'userName',
      'vipExpirationDate',
    ]),
  },
  methods: {
    ...mapActions(useUserInfoEdit, ['editUserInfo', 'stringToDate']),
  },
});
</script>

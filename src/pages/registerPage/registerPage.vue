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
    <h3 style="font-size: 24px; border-bottom: 1px solid #ddd">注册和登入</h3>
    <q-form @keyup.enter="login">
      <q-input
        v-model="userName"
        label="Username"
        type="text"
        :rules="[validateUserName]"
        lazy-rules
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        :rules="[validatePassword]"
        lazy-rules
      />
      <q-btn
        label="Create Account"
        class="q-mt-md"
        color="primary"
        :disable="!validUserName || !validPassWord || isLoading"
        :loading="isLoading"
        @click.prevent="login"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { mapActions, mapWritableState } from 'pinia';
import {
  ComponentInternalInstance,
  defineComponent,
  getCurrentInstance,
} from 'vue';
import { useRegister } from 'pages/registerPage/registerPageData';

export default defineComponent({
  name: 'registerPage',

  computed: {
    ...mapWritableState(useRegister, [
      'password',
      'userName',
      'validUserName',
      'validPassWord',
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions(useRegister, [
      'login',
      'validatePassword',
      'validateUserName',
    ]),
  },
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

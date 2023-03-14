<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable camelcase -->
<!-- eslint-disable max-len -->
<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar class="row">
        <q-btn
          :color="checkVipExpire() === 'VIP已过期' ? 'grey' : 'primary'"
          size="md"
          class="font-bold"
        >
          {{ checkVipExpire() }}
        </q-btn>

        <q-block style="width: 20px" />
        <!-- 添加一个空块 -->
        <!-- <type-Select style="margin-left: 1rem"/> -->
        <div
          class="q-mr-auto q-ml-4"
          style="max-width: 600px; width: 100%; margin-top: 20px"
        >
          <q-input
            v-model="apiKey"
            label="API Key"
            dense
            outlined
            class="q-mt-2"
            :rules="[validateApiKey]"
            lazy-rules
          >
            <q-btn flat label="set" @click="saveApiKey"></q-btn>
          </q-input>
        </div>

        <q-btn flat round icon="menu">
          <!-- 添加菜单内容 -->
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup @click="handleUserClick">
                <q-item-section>用户</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="handleUpgradeVipClick">
                <q-item-section>升级vip</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="handleLogoutClick">
                <q-item-section>退出</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="handleMessageClick">
                <q-item-section>留言</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section> 管理员 </q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>
                <q-menu>
                  <q-list>
                    <q-item clickable v-close-popup @click="goToChatPage">
                      <q-item-section>Chat</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="goToRegisterPage">
                      <q-item-section>Register</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="goToBuyPage">
                      <q-item-section>Buy</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="goToUserAdmin">
                      <q-item-section>User Admin</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="checkVipExpire">
                      <q-item-section>checkVip</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-item clickable v-close-popup @click="handleAboutUsClick">
                <q-item-section>关于我们</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    </q-drawer> -->

    <q-page-container v-show="true">
      <router-view></router-view>
      <!-- <chat-page v-show="false" /> -->
      <!-- <user-admin /> -->
    </q-page-container>
    <!-- <q-page-container v-show="false">
      <register-page v-show="false" style="margin-left: 1rem" />
      <buyPage />
    </q-page-container> -->
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapWritableState } from 'pinia';
import headerBtnMenu from 'src/components/headerBtnMenu/headerBtnMenu.vue';
// import registerPage from 'src/pages/registerPage/registerPage.vue';
// import buyPage from 'src/pages/buyPage/buyPage.vue';
// import chatPage from 'src/pages/chatPage/chatPage.vue';
// import userAdmin from 'src/pages/userAdmin/userAdmin.vue';
import { useMainLayoutData } from './MainLayoutData';
import { useRegister } from 'src/pages/registerPage/registerPageData';
import axios from 'axios';
import { useApiKey } from 'src/components/apiKey/apiKey';

export default defineComponent({
  name: 'MainLayout',

  components: {
    headerBtnMenu,
    // registerPage,
    // chatPage,
    // buyPage,
    // userAdmin,
  },
  mounted() {
    useRegister().getUseNameAsSession();
    console.log('start');
  },
  computed: {
    ...mapWritableState(useMainLayoutData, ['apiKey', 'validApiKey']),
    ...mapWritableState(useRegister, ['vipExpirationDate']),
  },
  methods: {
    ...mapActions(useMainLayoutData, [
      'validateApiKey',
      'handleAboutUsClick',
      'handleLogoutClick',
      'handleMessageClick',
      'handleUpgradeVipClick',
      'handleUserClick',
      'saveApiKey',
      'checkVipExpire',
    ]),
    goToChatPage() {
      this.$router.push('/chat-page');
    },
    goToRegisterPage() {
      this.$router.push('/register-page');
    },
    goToBuyPage() {
      this.$router.push('/buy-page');
    },
    goToUserAdmin() {
      this.$router.push('/user-admin');
    },
  },
});
</script>
<style scoped>
.glass-container {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 191, 255, 0.081);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 2px rgba(255, 255, 255, 0.4) solid;
  border-bottom: 2px rgba(40, 40, 40, 0.35) solid;
  border-right: 2px rgba(40, 40, 40, 0.35) solid;
}
</style>

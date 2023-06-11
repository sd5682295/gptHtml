<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable camelcase -->
<!-- eslint-disable max-len -->
<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar class="toolbar">
        <q-btn flat dense round icon="menu" @click="menuOpen = true" />
        <q-space />
        <q-input
          outlined
          class="search-input"
          placeholder="搜索"
          :model-value="searchInputData"
        />
        <q-btn-group flat dense>
          <q-btn icon="add" />
          <q-btn icon="exit_to_app" label="退出" @click="handleLogout" />
          <!-- <q-btn icon="person" @click="router.push('user-manage')" /> -->
        </q-btn-group>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="menuOpen"
      show-if-above
      v-bind="$attrs"
      content-class="menu-content"
    >
      <div class="menu-header">
        <span>类似flomo</span>
        <q-btn
          round
          dense
          flat
          icon="close"
          class="menu-close-btn"
          @click="menuOpen = false"
          aria-label="关闭左侧菜单"
        />
      </div>

      <div class="menu-lists">
        <!-- 菜单链接 -->
        <el-menu default-active="1" class="el-menu-vertical-demo sidebar-menu">
          <el-menu-item index="1" @click="router.push('/chat-page')">
            <i class="fas fa-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="fas fa-bookmark"></i>
            <span>暂时记录</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="fas fa-clipboard"></i>
            <span>所有记录</span>
          </el-menu-item>
          <el-menu-item index="4" @click="router.push('/mubu')">
            <i class="fas fa-file"></i>
            <span>mubu</span>
          </el-menu-item>

          <el-sub-menu index="8">
            <template #title>
              <span>管理员</span>
            </template>
            <el-menu-item index="9" @click="router.push('/chat-page')">
              <i class="fas fa-comment-alt"></i>
              <span>聊天室</span>
            </el-menu-item>
            <el-menu-item index="15" @click="router.push('/viaNetwork')">
              <i class="fas fa-comment-alt"></i>
              <span>viaNetwork</span>
            </el-menu-item>
            <el-menu-item index="16" @click="router.push('register-page')">
              <i class="fas fa-user"></i>
              <span>注册</span>
            </el-menu-item>
            <el-menu-item index="5" @click="router.push('mind-page')">
              <i class="fas fa-user"></i>
              <span>mind</span>
            </el-menu-item>
            <el-menu-item index="6" @click="router.push('user-info-edit')">
              <i class="fas fa-edit"></i>
              <span>编辑用户信息</span>
            </el-menu-item>
            <el-menu-item index="7" @click="router.push('user-admin')">
              <i class="fas fa-users-cog"></i>
              <span>用户管理</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="10">
            <template #title>
              <span>数据库操作</span>
            </template>
            <el-menu-item index="11" @click="router.push('table-list')">
              <i class="far fa-trash-alt"></i>
              <span>数据表操作</span>
            </el-menu-item>

            <el-menu-item index="12" @click="router.push('delete-data')">
              <i class="far fa-trash-alt"></i>
              <span>删除数据</span>
            </el-menu-item>

            <el-menu-item index="13" @click="router.push('find-all-data')">
              <i class="fas fa-search"></i>
              <span>查找全部数据</span>
            </el-menu-item>

            <el-menu-item index="14" @click="router.push('find-by-condition')">
              <i class="fas fa-filter"></i>
              <span>按条件查找</span>
            </el-menu-item>

            <el-menu-item index="5" @click="router.push('insert-data')">
              <i class="fas fa-plus"></i>
              <span>插入数据</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </q-drawer>

    <q-page-container v-show="true">
      <router-view></router-view>

      <!-- <chat-page v-show="false" /> -->
      <!-- <user-admin /> -->
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapWritableState } from 'pinia';
import headerBtnMenu from 'src/components/headerBtnMenu/headerBtnMenu.vue';
// import useRegister from 'src/pages/registerPage/registerPageData.vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useRegister } from 'src/pages/registerPage/registerPage.vue';
import { useConfig } from 'src/stores/config';
import { Router, useRouter } from 'vue-router';
// import { useMapList } from 'src/pages/mapList/mapList';

export const useMainLayoutData = defineStore('useMainLayoutData', {
  state: () => ({
    searchInputData: '',
    menuOpen: false,
    newMessage: '',
    router: useRouter() as Router,
  }),
  getters: {},
  actions: {
    handleLogout(): void {
      // 设置用户名为空字符串
      useRegister().userName = '';
      useRegister().password = '';

      // 清空本地会话存储
      localStorage.removeItem('session');

      // 跳转到注册页面
      this.router.push('/register-page');
    },
    goToChatPage() {
      this.router.push('/chat-page');
    },
    goToRegisterPage() {
      this.router.push('/register-page');
    },
    goToUserInfoEdit() {
      this.router.push('/user-info-edit');
    },
    goToUserAdmin() {
      this.router.push('/user-admin');
    },
    async goHome() {
      useMainLayoutData().router.push('/chat-page');
    },
  },
});

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
    ...mapWritableState(useMainLayoutData, [
      'menuOpen',
      'searchInputData',
      'newMessage',
      'router', // 添加这一行
    ]),
    ...mapWritableState(useRegister, ['vipExpirationDate']),
  },
  methods: {
    ...mapActions(useMainLayoutData, [
      'goToChatPage',
      'goToRegisterPage',
      'goToUserAdmin',
      'goToUserInfoEdit',
      'handleLogout',
    ]),
  },
});
</script>

<style scoped>
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  position: relative;
}

.menu-header span {
  font-size: 18px;
  font-weight: bold;
  color: #444;
}

.menu-close-btn {
  color: #999;
}
</style>

import axios from 'axios';
import { defineStore } from 'pinia';
import { useRegister } from 'src/pages/registerPage/registerPageData';
import { useConfig } from 'src/stores/config';
import { Router, useRouter } from 'vue-router';

export const useMainLayoutData = defineStore('useMainLayoutData', {
  state: () => ({
    apiKey: '',
    validApiKey: false,
    router: useRouter() as Router,
  }),
  getters: {},
  actions: {
    checkVipExpire(): string {
      const compareTime =
        useRegister().vipExpirationDate.getTime() - new Date().getTime();
      if (compareTime <= 0) {
        return 'VIP已过期';
      } else {
        const leftDays = Math.ceil(compareTime / (24 * 60 * 60 * 1000));
        return `VIP还有${leftDays}天过期`;
      }
    },
    validateApiKey(value: string): boolean | string {
      // 验证方法，接受一个字符串类型的参数并返回布尔值或字符串
      const regex = /^sk-[a-zA-Z0-9]{40,50}$/; // 修改正则表达式限制ApiKey为40到50个字符
      this.validApiKey = regex.test(value);
      return (
        this.validApiKey ||
        '输入格式不正确，请输入以 sk- 开头的 40-50 位字母或数字组成的字符串'
      ); // 修改错误提示信息
    },
    saveApiKey() {
      if (this.validApiKey === false) {
        alert('请输入正确的apiKey');
      }
      const session = localStorage.getItem('session');
      axios
        .post<string, { msg: string }>(
          `${useConfig().baseUrl}/saveApiKey/`,
          JSON.stringify({ apiKey: this.apiKey, session }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        .then((response) => {
          console.log('Save API Key response:', response.msg);
        })
        .catch((error) => {
          console.error('Save API Key error:', error);
        });
    },

    handleUserClick() {
      console.log('用户功能还没完成');
      // 处理"用户"点击事件
    },
    handleUpgradeVipClick() {
      console.log('升级vip功能还没完成');
      // 处理"升级vip"点击事件
    },
    handleLogoutClick() {
      localStorage.removeItem('session');
      useRegister().userName = '';
      useRegister().password = '';

      this.router.push('register-page');
      // 处理"退出"点击事件
    },
    handleMessageClick() {
      console.log('留言功能还没完成');
      // 处理"留言"点击事件
    },
    handleAboutUsClick() {
      alert('我们的信息');
      // 处理"关于我们"点击事件
    },
  },
});

import { defineStore } from 'pinia';
import { useConfig } from 'src/stores/config';

import { parser } from 'lezer-python';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';
import ClipboardJS from 'clipboard';
import { useRegister } from 'src/pages/registerPage/registerPage.vue';
import { useMainLayoutData } from 'src/layouts/MainLayout.vue';
import { useChatPageData } from '../chatPage/chatData';

export const useMubu = defineStore('mubu', {
  state: () => ({
    mubuTitle: 'chatmubuTitle',
    mubuContent: 'chatmubuContent',
    showNote: true,
    showKeyPoints: true,
  }),
  actions: {
    async navigateToChatPage() {
      useMainLayoutData().router.push('/chat-page');
    },
    async selectMUbuTitle(index: number, id: string) {
      // 获取消息内容
      const message = useChatPageData().messages[index];
      this.mubuTitle = message.title;
      this.mubuContent = message.content;

      // 发送消息给服务器
      const session = localStorage.getItem('session');
      const body = JSON.stringify({ session, id, message });
      const headers = { 'Content-Type': 'application/json' };

      try {
        const response = await axios.post(
          `${useConfig().baseUrl}/selectmUbutitle/`,
          body,
          { headers }
        );

        const res = useRegister().handleResponse(response);

        if (res.resCode === 0) {
          const data = res.data;
          console.log(['继续开发', data]);
        }
      } catch (err) {
        console.log(['err', err]);
      }

      // 跳转页面
      useMainLayoutData().router.push('/mubu');
    },
  },
});

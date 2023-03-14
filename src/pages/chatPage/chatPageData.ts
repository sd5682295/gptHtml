/* eslint-disable max-len */

import { defineStore } from 'pinia';
// import _ from 'lodash/fp';
// import { Md5 } from 'ts-md5';
import axios, { AxiosResponse } from 'axios';
import { useRegister } from '../registerPage/registerPageData';
import { useMainLayoutData } from 'src/layouts/MainLayoutData';
import { useConfig } from 'src/stores/config';
// import { useBeShow } from 'src/stores/beShow';

export const useChatPageData = defineStore('chatPageData', {
  state: () => ({
    messages: [
      {
        author: 'user',
        content: ['hello world'],
        type: 'user',
        sent: false,
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
      },
      {
        author: 'System',
        content: ['Welcome to Facebook Chat Room!'],
        type: 'system',
        sent: true,
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
      },
    ],
    newMessage: '',
  }),
  actions: {
    sendMessage(): void {
      const session = localStorage.getItem('session');
      if (this.newMessage === '') {
        alert('请输入信息');
        return;
      }

      // 将新消息加入到列表中
      this.messages.push({
        author: useRegister().userName,
        content: [this.newMessage],
        type: 'user',
        sent: true,
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
      });

      // 将用户名和密码转换为 JSON 字符串
      const paramsString = JSON.stringify({
        newMessage: this.newMessage,
        session,
        apiKey: useMainLayoutData().apiKey,
      });

      // 发送登录请求
      axios
        .post<string, { data: { resCode: Number; resMessage: string } }>(
          `${useConfig().baseUrl}/sent/`,
          paramsString,
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        .then((res) => {
          console.log(['sendMessage', res]);
          if (res.data.resCode === 0) {
            this.messages.push({
              author: 'chatgpt',
              content: [res.data.resMessage],
              type: 'AI',
              sent: false,
              avatar:
                'https://tse2-mm.cn.bing.net/th/id/OIP-C.cKsck1yFTO7rGVxOO284PQHaJ-?w=139&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            });
          } else if (res.data.resCode === 2) {
            this.messages.push({
              author: 'chatgpt',
              content: ['VIP已过期，请续费！'],
              type: 'AI',
              sent: false,
              avatar:
                'https://tse2-mm.cn.bing.net/th/id/OIP-C.cKsck1yFTO7rGVxOO284PQHaJ-?w=139&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            });
          }
          this.newMessage = '';
          // 处理请求成功的回调函数
        })
        .catch((error) => {
          console.error(error);
          // 处理请求失败的回调函数
        });
    },
  },
});

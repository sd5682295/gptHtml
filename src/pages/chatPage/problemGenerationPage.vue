<template>
  <q-page class="chat-container">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="menuOpen = !menuOpen" />
      <q-toolbar-title>聊天室</q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-sm q-ma-sm" style="max-width: 600px">
      <div style="display: flex; justify-content: flex-end">
        <q-btn
          flat
          dense
          label="send"
          icon-color="white"
          color="green"
          @click="sendMessage"
        />
      </div>
      <q-editor
        v-model="newMessage"
        height="150px"
        rounded
        :style="{ height: editorHeight, width: '100%' }"
        @focus="onFocus"
        @blur="onBlur"
        custom-bottom-toolbar
        toolbar-bg-color="transparent"
        toolbar-toggle-color="light-blue-5"
        :toolbar="[
          [
            'left',
            'center',
            'right',
            'justify',
            'bold',
            'italic',
            'underline',
            'strike',
            'undo',
            'redo',
            'viewsource',
          ],
        ]"
        @keydown.ctrl.enter.prevent="sendMessage"
      />
    </div>

    <div
      v-for="(msg, index) in messages.slice().reverse()"
      :key="msg.id"
      class="d-flex q-pl-sm q-pr-sm q-ma-sm message-container"
      style="max-width: 600px"
    >
      <q-card
        @mouseover="onMouseOver(messages.length - 1 - index)"
        @mouseleave="onMouseLeave(messages.length - 1 - index)"
        flat
        bordered
        class="q-mt-md message-card"
        :rounded="!msg.isHtml && msg.focused"
        style="flex: 1"
        ><q-card-actions
          class="q-pr-md q-pb-md"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p
            class="text-xs text-[#b4bbc4] text-left"
            style="
              box-sizing: border-box;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(229, 231, 235);
              --tw-border-spacing-x: 0;
              --tw-border-spacing-y: 0;
              --tw-translate-x: 0;
              --tw-translate-y: 0;
              --tw-rotate: 0;
              --tw-skew-x: 0;
              --tw-skew-y: 0;
              --tw-scale-x: 1;
              --tw-scale-y: 1;
              --tw-pan-x: ;
              --tw-pan-y: ;
              --tw-pinch-zoom: ;
              --tw-scroll-snap-strictness: proximity;
              --tw-ordinal: ;
              --tw-slashed-zero: ;
              --tw-numeric-figure: ;
              --tw-numeric-spacing: ;
              --tw-numeric-fraction: ;
              --tw-ring-inset: ;
              --tw-ring-offset-width: 0px;
              --tw-ring-offset-color: #fff;
              --tw-ring-color: rgb(59 130 246 / 0.5);
              --tw-ring-offset-shadow: 0 0 #0000;
              --tw-ring-shadow: 0 0 #0000;
              --tw-shadow: 0 0 #0000;
              --tw-shadow-colored: 0 0 #0000;
              --tw-blur: ;
              --tw-brightness: ;
              --tw-contrast: ;
              --tw-grayscale: ;
              --tw-hue-rotate: ;
              --tw-invert: ;
              --tw-saturate: ;
              --tw-sepia: ;
              --tw-drop-shadow: ;
              --tw-backdrop-blur: ;
              --tw-backdrop-brightness: ;
              --tw-backdrop-contrast: ;
              --tw-backdrop-grayscale: ;
              --tw-backdrop-hue-rotate: ;
              --tw-backdrop-invert: ;
              --tw-backdrop-opacity: ;
              --tw-backdrop-saturate: ;
              --tw-backdrop-sepia: ;
              margin-bottom: 0px;
              font-size: 0.75rem;
              line-height: 1rem;
              --tw-text-opacity: 1;
              color: rgb(180 187 196 / var(--tw-text-opacity));
            "
          >
            {{ msg.createTime }}
          </p>
          <div class="msg-buttons">
            <q-btn
              flat
              dense
              v-show="msg.isHovered"
              :label="msg.focused ? 'send' : '编辑'"
              icon-color="white"
              :color="msg.focused ? 'green' : 'grey-5'"
              :class="msg.focused ? 'send-btn' : 'edit-btn'"
              @click.stop.prevent="
                msg.focused
                  ? onCardBlur(messages.length - 1 - index, false)
                  : startEditing(messages.length - 1 - index)
              "
              style="align-self: center"
            />
            <q-btn
              round
              dense
              v-show="msg.isHovered"
              flat
              icon="close"
              color="grey-5"
              class="menu-close-btn"
              @click="deleteMessage(messages.length - 1 - index)"
              aria-label="关闭左侧菜单"
            />
          </div>
        </q-card-actions>
        <q-card-section
          style="height: msg.focused ? '200px' : '100%',"
          class="message-card-section"
        >
          <div v-if="msg.isHtml && !msg.focused" v-html="msg.content"></div>
          <div v-if="!msg.isHtml && !msg.focused">{{ msg.content }}</div>
          <q-input
            outlined
            custom-bottom-toolbar
            v-if="!msg.isHtml && msg.focused"
            v-model="messages[messages.length - 1 - index].content"
            :style="{ height: '100%', padding: 0, width: '100%' }"
          />
          <q-editor
            v-if="msg.isHtml && msg.focused"
            v-model="messages[messages.length - 1 - index].content"
            rounded
            :style="{
              height: '100%',
              padding: 0,
              width: '100%',
            }"
            @focus="onCardFocus(messages.length - 1 - index)"
            custom-bottom-toolbar
            toolbar-bg-color="transparent"
            toolbar-toggle-color="light-blue-5"
            :definitions="{
              sent: {
                tip: 'Sent',
                icon: 'send',
                label: 'Sent',
                handler: () => {
                  onCardBlur(messages.length - 1 - index, false);
                },
              },
            }"
            :toolbar="[
              [
                'left',
                'center',
                'right',
                'justify',
                'bold',
                'italic',
                'underline',
                'strike',
                'undo',
                'redo',
                'viewsource',
                'sent',
                {
                  tip: 'Cancel',
                  icon: 'close',
                  handler: () => {
                    onCardBlur(messages.length - 1 - index, true);
                  },
                },
                {
                  tip: 'Save',
                  icon: 'save',
                  handler: () => {
                    onCardBlur(messages.length - 1 - index, false);
                  },
                },
              ],
            ]"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script lang="ts">
import hljs from 'highlight.js';

import { mapActions, mapWritableState } from 'pinia';
import { defineComponent } from 'vue';
import { useRegister } from 'src/pages/registerPage/registerPage.vue';
import { useMainLayoutData } from 'src/layouts/MainLayout.vue';
import { defineStore } from 'pinia';

import axios, { AxiosResponse } from 'axios';
import { useConfig } from 'src/stores/config';

import { parser } from 'lezer-python';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';

import { uniqueId } from 'lodash';

export const useChatPageData = defineStore('chatPageData', {
  state: () => ({
    isHovered: false,
    editorHeight: '100px', // 默认高度
    messages: [] as {
      id: string;
      content: string;
      isHtml: boolean;
      focused: boolean;
      createTime: string;
      isHovered?: boolean;
    }[],
    newMessage: '',
    newMessageTemp: '',
  }),
  actions: {
    onMouseOver(index: number) {
      this.messages[index].isHovered = true;
    },
    onMouseLeave(index: number) {
      this.messages[index].isHovered = false;
    },
    onFocus() {
      this.editorHeight = '200px'; // 聚焦时高度增加到半个屏幕
    },
    onBlur() {
      this.editorHeight = '100px'; // 失焦时高度恢复为默认值
    },
    startEditing(index: number) {
      this.messages = this.messages.map((msg) => {
        return {
          ...msg,
          focused: false,
        };
      });
      this.messages[index].focused = !this.messages[index].focused;
      if (this.messages[index].isHtml) {
        this.messages[index].content = DOMPurify.sanitize(
          this.messages[index].content.trim()
        );
      }
    },
    onCardFocus(index: number) {
      this.messages[index].focused = true;
    },
    onCardBlur(index: number, cancel: boolean) {
      const session = localStorage.getItem('session');
      if (!session) {
        useRegister().router.push('register-page');
        return;
        // 进行router转到注册页面的操作
      }
      const content = DOMPurify.sanitize(this.messages[index].content.trim());
      this.messages[index].focused = false;
      if (!cancel) {
        this.messages[index] = { ...this.messages[index], content };
        const data = { message: this.messages[index], session: session }; // 构造要发送的数据
        axios
          .post(`${useConfig().baseUrl}/messageEdit/`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          })
          .then((response) => {
            // 处理响应
          })
          .catch((error) => {
            // 处理错误
          });
      }
    },

    getSessionMessages(): void {
      const session = localStorage.getItem('session');
      console.log(session);
      if (session) {
        const paramsString = JSON.stringify({
          session: session,
        });
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        };
        axios
          .post<
            string,
            {
              resCode: number;
              data:
                | {
                    id: string;
                    content: string;
                    session: string;
                    isHtml: boolean;
                    createTime: string;
                  }[];
            }
          >(`${useConfig().baseUrl}/sessionMessages/`, paramsString, {
            headers,
          })

          .then((response) => {
            const res = useRegister().handleResponse(response);
            // console.log([
            //   'response0',
            //   res.resCode,
            //   typeof res.data[0].createTime,
            // ]);
            if (res.resCode === 0 && response) {
              this.messages = res.data.map((item: any) => {
                return {
                  ...item,
                  focused: false,
                  isHovered: false,
                };
              });
              console.log(['--aa1--', this.messages]);
            } else {
              console.log(['response1', res]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    isHtml(str: string): boolean {
      const doc = new DOMParser().parseFromString(str, 'text/html');
      return Array.from(doc.body.childNodes).some(
        (node) => node.nodeType === 1
      );
    },
    deleteMessage(index: number): void {
      const message = this.messages[index];
      this.messages.splice(index, 1);

      const session = localStorage.getItem('session');
      console.log(['deleteMessage', { ...message, session }]);
      axios
        .post(
          `${useConfig().baseUrl}/deleteMessage/`,
          JSON.stringify({ ...message, session }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        .then((response) => {
          const { resCode, resMessage } = response.data;
          if (resCode === 0) {
            console.log('删除成功');
          } else {
            console.log(resMessage);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    sendMessage(): void {
      if (!this.newMessage || this.newMessage === '') {
        console.log('请输入消息');
        return;
      }

      const messageList = this.newMessage;
      this.newMessageTemp = this.newMessage;
      this.newMessage = '';
      const session = localStorage.getItem('session');
      if (!session) {
        useMainLayoutData().router.push('register-page');
        return;
      }
      const now = new Date();
      const createTime = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now
        .getHours()
        .toString()
        .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;

      const params = {
        id: uuidv4().replace(/-/g, ''),
        content: messageList,
        isHtml: this.isHtml(messageList),
        session: session,
        focused: false,
        createTime,
      };
      this.messages.push(params);
      const paramsString = JSON.stringify(params);

      axios
        .post(`${useConfig().baseUrl}/sent/`, paramsString, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((response) => {
          const { resCode, resMessage } = response.data;
          if (resCode === 0) {
            this.newMessageTemp = '';
            console.log('保存成功');
          } else if (resCode === 2) {
            this.newMessageTemp = '';
            alert('VIP已过期，请续费');
          } else if (resCode === 1) {
            alert('用户未登入');
            localStorage.removeItem('session');
            this.newMessage = this.newMessageTemp;
            useMainLayoutData().router.push('register-page');
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
});

export default defineComponent({
  name: 'chatPage',
  mounted() {
    this.getSessionMessages();
    this.$nextTick(() => {
      this.getSessionMessages();
      // 解决异步更新视图的问题
      // const codeBlock = this.$refs.codeBlock as HTMLElement; // 使用类型断言将 $refs.codeBlock 的类型转换为 HTMLElement
      // hljs.highlightBlock(codeBlock); // 使用 highlight.js 对代码块进行高亮处理
    });
  },
  computed: {
    // menuOpen: false,
    ...mapWritableState(useRegister, ['password', 'userName']),
    ...mapWritableState(useChatPageData, [
      'messages',
      'newMessage',
      'editorHeight',
      'isHovered',
    ]),
    ...mapWritableState(useMainLayoutData, ['menuOpen']),
  },
  methods: {
    // ...mapActions(useRegister, ['onSubmit']),
    ...mapActions(useChatPageData, [
      'sendMessage',
      'getSessionMessages',
      'onBlur',
      'onFocus',
      'onCardBlur',
      'startEditing',
      'onCardFocus',
      'onMouseOver',
      'onMouseLeave',
      'deleteMessage',
    ]),
  },
});
</script>
<style scoped>
.sent-btn {
  border: 1px solid #2196f3;
  background-color: #2196f3;
  color: #fff;
}

.sent-btn:hover {
  background-color: #1976d2;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
}
.message-card {
  margin-top: 5px;
  margin-bottom: 5px;
}

.message-card-section {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-form el-input {
  flex: 1;
  margin-right: 10px;
}
.message-card,
.message-card-section {
  width: 100%;
}
.code-block {
  display: block;
  font-size: 14px;
  margin: 16px 0;
  padding: 0.5rem;
  overflow: auto;
  border-radius: 3px;
  background-color: #f6f8fa;
  word-wrap: normal;
  text-align: left;
}

.code-block pre {
  margin: 0;
  border-radius: 0;
  background-color: inherit;
  box-shadow: none;
  white-space: pre-wrap;
}

.code-block pre code {
  display: inline;
  padding: 0;
  background-color: inherit;
  word-wrap: normal;
}
.message-card-section {
  overflow-x: auto;
}

.message-card-section div {
  word-wrap: break-word;
  word-break: break-all;
}
.msg-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>

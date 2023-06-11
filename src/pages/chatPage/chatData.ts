import { defineStore } from 'pinia';
import { useConfig } from 'src/stores/config';

import { parser } from 'lezer-python';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';
import ClipboardJS from 'clipboard';
import { useRegister } from 'src/pages/registerPage/registerPage.vue';
import { useMainLayoutData } from 'src/layouts/MainLayout.vue';

export const useChatPageData = defineStore('chatPageData', {
  state: () => ({
    menuShow: false,
    diaLogContent: '',
    showDialog: false,
    // `${titleInput}是什么请分别用书上的定义、严谨、通俗和英语四种方式解释，并举例对例子进行说明，
    //     写出相反的定义并作比较，再列出它含有的所有的知识点的列表注意数学公式的格式，需要能正确显示`,
    gptQuestion: [
      {
        name: '知识点解释',
        content(item: string) {
          return `${item}是什么请分别用书上的定义、严谨、通俗和英语四种方式解释，并举例对例子进行说明，写出相反的定义并作比较，再列出它含有的所有的知识点的列表注意数学公式的格式，需要能正确显示`;
        },
        icon: 'mdi-teacher',
      },
    ],

    tagForce: false,
    componentKey: 0,
    isHovered: false,
    editorHeight: '100px', // 默认高度
    messages: [] as {
      id: string;
      title: string;
      keyWord: string[];
      content: string;
      isHtml?: boolean;
      focused: boolean;
      createTime: string;
      isHovered?: boolean;
      contentShow?: boolean;
    }[],
    newMessage: '',
    titleInput: '',
    tagInput: [] as string[],
    newMessageTemp: '',
  }),
  actions: {
    // handleToggle(expanded: any, index: number, id: string) {
    //   console.log('Expanding item:', id, index, expanded);
    //   if (this.messages[index].content === '') {
    //     this.loadData(index);
    //   } else {
    //     return;
    //   }selectMUbuTitle
    // },
    async addTitleAndKeyword(index: number, id: string) {
      const session = localStorage.getItem('session');
      const body = JSON.stringify({ session, id });
      const headers = { 'Content-Type': 'application/json' };

      try {
        const response = await axios.post(
          `${useConfig().baseUrl}/addTitleAndKeyword/`,
          body,
          { headers }
        );

        if (response == null || response.data == null) {
          // 检查响应是否为null或undefined
          alert('响应数据为空');
          return;
        }

        const res = useRegister().handleResponse(response);

        if (res.resCode === 0) {
          const data = res.data;
          console.log(['-----00-----', data]);
          if (
            this.messages &&
            this.messages[index] &&
            this.messages[index].keyWord
          ) {
            if (
              data.titleAndKeyword.标题 === data.data.title &&
              data.titleAndKeyword.关键词.join(',') ===
                this.messages[index].keyWord.join(',')
            ) {
              alert('title和keyword没有变化');
              return;
            }

            const confirmChange =
              data.titleAndKeyword.标题 !== data.data.title
                ? confirm(`是否将title修改为${data.titleAndKeyword.标题}`)
                : true;

            if (confirmChange) {
              this.messages[index].title = data.titleAndKeyword.标题;
              this.messages[index].keyWord = data.titleAndKeyword.关键词;

              if (data.titleAndKeyword.标题 !== this.messages[index].title) {
                alert('已将title值修改为新的值。');
              }
            }
            if (this.messages[index].title === data.data.content) {
              console.log('getsummary');
              const newContent = await this.getSummary(
                id,
                data.data.content,
                data.data.isHtml
              );
              this.messages[index].content = newContent;
              alert('已删除旧content并获取新content。');
            }
          } else if (res.resCode === 0.1) {
            alert('title和keyword没有变化');
          }
          // 进行属性操作
        } else {
          console.log('未找到消息或关键词。');
        }
      } catch (err) {
        console.log(['err', err]);
      }
    },
    async getSummary(id: string, content: string, isHtml: boolean) {
      const session = localStorage.getItem('session');
      const body = JSON.stringify({ session, id, content, isHtml });
      const headers = { 'Content-Type': 'application/json' };

      try {
        const response = await axios.post(
          `${useConfig().baseUrl}/getSummary/`,
          body,
          { headers }
        );

        const res = useRegister().handleResponse(response);

        if (res.resCode === 0) {
          console.log(['message_res', res]);
          return res.data.content;
        } else {
          console.log(res.resMsg);
          return content;
        }
      } catch (err) {
        console.log(['err', err]);
        return content;
      }
    },

    async handleToggle(index: number, id: string) {
      // this.messages[index].contentShow = !this.messages[index].contentShow;
      this.messages[index].contentShow = true;
      // console.log(['00', this.messages[index].contentShow]);
      if (
        this.messages &&
        this.messages.length > index &&
        this.messages[index].content
      ) {
        console.log('handleToggle1', this.messages[index]);
        this.messages[index].contentShow = true;
        // console.log(['00', this.messages[index].contentShow]);
        return;
      }
      console.log(['handleToggle']);
      const session = localStorage.getItem('session');
      const paramsString = JSON.stringify({
        session: session,
        id: id,
      });
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      try {
        const response = await axios.post<
          string,
          {
            resCode: number;
            data: { content: string };
          }
        >(`${useConfig().baseUrl}/getOneMessage/`, paramsString, {
          headers,
        });
        const res = useRegister().handleResponse(response);
        if (res.resCode === 0 && response) {
          this.messages[index].contentShow = true;
          // console.log(['00', this.messages[index].contentShow]);
          this.messages[index].content = res.data.content;
          this.messages[index].isHtml = res.data.isHtml;
          this.messages[index].contentShow = true;
          console.log(['showContent', res, this.messages[index]]);
        } else {
          this.messages[index].contentShow = true;
          // console.log(['00', this.messages[index].contentShow]);
          console.log(['response1', res]);
        }
      } catch (err) {
        this.messages[index].contentShow = true;
        // console.log(['00', this.messages[index].contentShow]);
        console.log(err);
      }
    },
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
        const content = DOMPurify.sanitize(
          this.messages[index]?.content?.trim() ?? ''
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
      const content = DOMPurify.sanitize(
        this.messages[index]?.content?.trim() ?? ''
      );
      this.messages[index].focused = false;
      if (!cancel) {
        this.messages[index].content = content;
        const data = { message: this.messages[index], session: session }; // 构造要发送的数据
        axios
          .post(`${useConfig().baseUrl}/messageEdit/`, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          })
          .then((response) => {
            console.log(useRegister().handleResponse(response));
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
            if (res.resCode === 0 && response) {
              this.messages = res.data.map((item: any) => {
                return {
                  ...item,
                  focused: false,
                  isHovered: false,
                  contentShow: false,
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
      this.menuShow = false;

      if (confirm('确定删除此消息吗？')) {
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
      } else {
        console.log('取消删除');
      }
    },
    // deleteMessage(index: number): void {
    //   const message = this.messages[index];
    //   this.messages.splice(index, 1);

    //   const session = localStorage.getItem('session');
    //   console.log(['deleteMessage', { ...message, session }]);
    //   axios
    //     .post(
    //       `${useConfig().baseUrl}/deleteMessage/`,
    //       JSON.stringify({ ...message, session }),
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Access-Control-Allow-Origin': '*',
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       const { resCode, resMessage } = response.data;
    //       if (resCode === 0) {
    //         console.log('删除成功');
    //       } else {
    //         console.log(resMessage);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // },
    sendQuestion() {
      const dummy = document.createElement('textarea');
      dummy.value = this.diaLogContent;
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      console.log('已复制到剪贴板');
    },
    async selectQuestion(question: string) {
      if (!this.titleInput || this.titleInput.trim() === '') {
        // 打开题目输入对话框
        alert('请输入title');
      } else {
        // 打开内容输入对话框
        this.showDialog = true;
        this.diaLogContent = question;
        console.log(['selectQuestion', question]);
      }
    },

    handleClick() {
      this.componentKey += 1;
      console.log(['componentKey', this.componentKey]);
    },

    async sendMessage(): Promise<void> {
      if (!this.newMessage || this.newMessage === '') {
        console.log('请输入消息');
        return;
      }
      console.log(['message0', this.messages]);

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
        title: this.titleInput,
        hasNote: '1',
        keyWord: [],
        contentShow: true,
      };
      // const titleKeyword: {
      //   [id: string]: { title: string; keyword: string[]; isLoding: boolean };
      // } = JSON.parse(localStorage.getItem('titleKeyword') || '{}');
      // titleKeyword[params.id] = {
      //   title: params.title,
      //   keyword: params.keyWord,
      //   isLoding: true,
      // };
      // localStorage.setItem('titleKeyword', JSON.stringify(titleKeyword));

      this.messages.push(params);
      console.log(['message1', this.messages]);
      console.log('messages');
      const paramsString = JSON.stringify(params);

      try {
        const response = await axios.post(
          `${useConfig().baseUrl}/sent/`,
          paramsString,
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        const res = useRegister().handleResponse(response);
        console.log(['res', res]);

        const { resCode, data, message } = res;
        if (resCode === 0) {
          // this.newMessageTemp = '';
          // console.log(['resData.', data]);
          // titleKeyword[params.id] = {
          //   title: data.title,
          //   keyword: data.keyWord,
          //   isLoding: false,
          // };
          //-------------------------------------------------------------------------
          // localStorage.setItem('titleKeyword', JSON.stringify(titleKeyword));
          //-------------------------------------------------------------------------
          // this.messages[this.messages.length - 1].title = data.title;
          // this.messages[this.messages.length - 1].keyWord = data.keyWord;
          //-------------------------------------------------------------------------
          // console.log(['localStorage', data.title, data.keyWord]);
          this.handleClick();
          console.log(['保存成功', data]);
          this.addTitleAndKeyword(this.messages.length, params.id);
          console.log(this.getSummary);
        } else if (resCode === 2) {
          this.newMessageTemp = '';
          alert('VIP已过期，请续费');
        } else if (resCode === 1) {
          alert('用户未登入');
          localStorage.removeItem('session');
          this.newMessage = this.newMessageTemp;
          useMainLayoutData().router.push('register-page');
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    },
  },
});

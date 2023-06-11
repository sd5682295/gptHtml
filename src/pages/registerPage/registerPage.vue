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

import { defineStore } from 'pinia';
// import _ from 'lodash/fp';
import { Md5 } from 'ts-md5';
import axios from 'axios';
import { Router, useRouter } from 'vue-router';
import { useConfig } from 'src/stores/config';
// import { useBeShow } from 'src/stores/beShow';

export const useRegister = defineStore('register', {
  state: () => ({
    // name: '',
    password: '',
    userName: '',
    vipExpirationDate: new Date(),
    router: useRouter() as Router,
    validUserName: false,
    validPassWord: false,
    isLoading: false,
  }),
  // place:mainTreeDataInterface['place']
  actions: {
    validateUserName(value: string): boolean | string {
      const regex = /^[a-zA-Z0-9_]{4,20}$/; // 用户名长度为4-20个字符，可使用字母、数字和下划线
      this.validUserName = regex.test(value);
      return (
        this.validUserName ||
        '请使用 4 到 20 个字符的字母、数字或下划线作为用户名。'
      );
      // 验证用户名唯一性，如需调用后台接口实现，请自行补充
      // 判断是否使用了违禁词汇，如需实现请自行补充
    },

    validatePassword(value: string): boolean | string {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_!@])[A-Za-z\d-_\!@]{8,20}$/;

      /*
        ^ 匹配字符串的开始位置
        (?=.*[a-z]) 需至少包含一个小写字母
        (?=.*[A-Z]) 需至少包含一个大写字母
        (?=.*\d) 需至少包含一个数字
        (?=.*[-_!@]) 需至少包含一个特殊字符（-、_、!、@）
        [A-Za-z\d-_\!@]{8,20} 至少包含 8-20 个由大小写字母、数字、特殊字符（-、_、!、@）所组成的字符
        $ 匹配字符串的结束位置
      */

      this.validPassWord = regex.test(value);
      return (
        this.validPassWord ||
        '密码必须包含大小写字母、数字和特殊字符，长度为8-20个字符'
      );
    },
    handleResponse(response: any): any {
      let data = response.data;
      if (typeof data === 'string') {
        data = data.replace(/NaN/g, '""').replace(/\n/g, '').trim();
        try {
          data = JSON.parse(data);
        } catch (e) {
          // catch any errors from JSON.parse
        }
      }
      return data;
    },
    login() {
      // const hashedPassword = Md5.hashStr(password); // 对密码进行哈希
      const paramsString = JSON.stringify({
        username: this.userName,
        password: Md5.hashStr(this.password),
      });

      axios
        .post<
          string,
          {
            data: string;
          }
        >(
          `${useConfig().baseUrl}/login/`,
          paramsString, // 使用哈希后的密码
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        .then((response) => {
          const res = this.handleResponse(response);

          // console.log(response);
          this.isLoading = false;
          if (res.resCode !== 0) {
            alert('用户名或者密码错误');

            this.password = '';
          } else {
            function stringToDate(timestamp: string): Date {
              const milliseconds = Date.parse(timestamp);
              const date = new Date(milliseconds);
              return date;
            }
            this.userName = res.userName;
            localStorage.setItem('session', res.session);
            this.vipExpirationDate = stringToDate(res.vipExpirationDate);
            this.router.push('chat-page');
            console.log('注册或者创建成功');
          } // 处理响应数据，这里只是打印响应数据到控制台
        })
        .catch((error) => {
          console.error(error);
        });
    },
    usernameRule() {
      return [
        (v: string) => !!v || 'Username is required.',
        (v: string) =>
          v.length <= 20 ||
          'Username must be less than or equal to 20 characters.',
      ];
    },

    passwordRule() {
      return [
        (v: string) => !!v || 'Password is required.',
        (v: string) =>
          v.length >= 6 || 'Password must be at least 6 characters.',
      ];
    },

    getUseNameAsSession(): void {
      console.log('-1');
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
              data: {
                resCode: number;
                session: string;
                vipExpirationDate: string;
              };
            }
          >(`${useConfig().baseUrl}/session/`, paramsString, { headers })
          .then((response) => {
            console.log(response);
            const res = this.handleResponse(response);
            // const res = response.data;
            function stringToDate(timestamp: string): Date {
              const milliseconds = Date.parse(timestamp);
              const date = new Date(milliseconds);
              return date;
            }
            if (res.resCode !== 0) {
              console.log(['--aa1--', res]);
              this.userName = '';
              this.password = '';
              this.vipExpirationDate = new Date();
              localStorage.removeItem('session');
              this.router.push('/register-page');
            } else {
              console.log(['验证通过', res]);
              // 验证通过
              this.vipExpirationDate = stringToDate(res.vipExpirationDate);
              this.userName = res.userName;
              this.router.push('/chat-page');
            }
          })
          .catch((err) => {
            this.router.push('/register-page');
          });
      } else {
        this.userName = '';
        this.password = '';
        this.vipExpirationDate = new Date();
        localStorage.removeItem('session');
        this.router.push('/register-page');
      }
    },
  },
});

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

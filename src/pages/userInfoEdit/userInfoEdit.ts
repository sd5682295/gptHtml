/* eslint-disable max-len */

import { defineStore } from 'pinia';
// import _ from 'lodash/fp';
import { Md5 } from 'ts-md5';
import axios from 'axios';
import { useUserAdminData } from '../userAdmin/userAdminData';
// import { useBeShow } from 'src/stores/beShow';

export const useUserInfoEdit = defineStore('userInfoEditer', {
  state: () => ({
    // name: '',
    password: '',
    userName: '',
    vipExpirationDate: null as string | null,
    tag: 'edit' as 'edit' | 'create',
    path: '' as string,
  }),
  // place:mainTreeDataInterface['place']
  actions: {
    // formatDate(date: Date): string {
    //   if (date) {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    //   } else {
    //     return '-';
    //   }
    // },
    editUserInfo() {
      // const hashedPassword = Md5.hashStr(password); // 对密码进行哈希
      console.log([
        'editUserIndfo',
        typeof this.vipExpirationDate,
        this.vipExpirationDate,
      ]);
      const session = localStorage.getItem('session');
      const paramsString = JSON.stringify({
        username: this.userName,
        password: Md5.hashStr(this.password),
        vipExpirationDate: this.vipExpirationDate,
        session,
      });
      if (this.tag === 'edit') {
        this.path = 'http://120.48.84.244:5000/editUserInfo/';
      } else {
        this.path = 'http://120.48.84.244:5000/createUserInfo/';
      }

      axios
        .post<
          string,
          { resCode: number; session: string; vipExpirationDate: string }
        >(
          this.path,
          paramsString, // 使用哈希后的密码
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        .then((response) => {
          if (response.resCode !== 0) {
            alert('出错了，重新登入管理员账号请重试一次');
            console.log('todo');
          } else {
            localStorage.setItem('session', response.session);
            this.vipExpirationDate = response.vipExpirationDate;
            console.log('注册或者创建成功');
          } // 处理响应数据，这里只是打印响应数据到控制台
        })
        .catch((error) => {
          console.error(error);
        });
    },
    clearData() {
      this.userName = '';
      this.password = '';
      this.vipExpirationDate = useUserAdminData().formatDate(new Date());
    },
    stringToDate(data: string): Date {
      return new Date(data);
    },
  },
});

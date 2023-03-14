import { defineStore } from 'pinia';
// import _ from 'lodash/fp';
import { Md5 } from 'ts-md5';
import axios from 'axios';
import { userInfo } from 'os';
import { useUserInfoEdit } from '../userInfoEdit/userInfoEdit';
// import { useBeShow } from 'src/stores/beShow';
interface UserInfo {
  id: string;
  username: string;
  vipExpirationDate: string;
}
interface userInfoList {
  id: string;
  username: string;
  vipExpirationDate: string;
}
[];
export const useUserAdminData = defineStore('useAdminData', {
  state: () => ({
    // name: '',
    userInfoList: [] as UserInfo[],
  }),
  // place:mainTreeDataInterface['place']
  actions: {
    removeTimeFromDate(dateString: string): string {
      const dateWithoutTime = dateString.replace(
        /\s\d{1,2}:\d{1,2}:\d{1,2}/,
        ''
      );
      return dateWithoutTime;
    },
    getUserInfo(): void {
      const session = localStorage.getItem('session');
      console.log(['getUserInfo', session]);
      if (session) {
        axios
          .post<
            string,
            {
              data: {
                resCode: number;
                msg?: string;
                userInfoList?: UserInfo[];
              };
            }
          >(
            'http://120.48.84.244:5000/getUserList/',
            JSON.stringify({ session }),
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          )
          .then((response) => {
            const res = response.data;
            if (res.resCode !== 0) {
              console.log(res.msg);
            } else {
              this.userInfoList = res.userInfoList as UserInfo[];
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log('Session not found');
      }
    },
    formatDate(date: Date | string): string {
      if (typeof date === 'string') {
        return date;
      } else if (date instanceof Date && !isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      } else {
        return '-';
      }
    },
    editRow(index: number): void {
      useUserInfoEdit().userName = this.userInfoList[index].username;
      console.log([
        'editRow',
        typeof this.userInfoList[index].vipExpirationDate,
        this.userInfoList[index].vipExpirationDate,
      ]);
      useUserInfoEdit().vipExpirationDate = this.removeTimeFromDate(
        this.userInfoList[index].vipExpirationDate
      );

      useUserInfoEdit().tag = 'edit';
      this.router.push('/user-info-edit');
    },
    deleteRow(index: number): void {
      const userInfo = this.userInfoList[index];
      const { id } = userInfo;
      const session = localStorage.getItem('session');
      const data = JSON.stringify({ id, session });
      this.userInfoList.splice(index, 1); // 删除此项
      axios
        .post('http://120.48.84.244:5000/uerDelete/', data, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((response) => {
          // TODO: Implement success functionality
          console.log(response);
        })
        .catch((error) => {
          console.error('There was a problem with the axios operation:', error);
        });
    },

    onAddItem(): void {
      useUserInfoEdit().tag = 'create';
      this.router.push('/user-info-edit');

      // TODO: Implement add item functionality
    },
  },
});

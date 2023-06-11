<template>
  <div>
    <h3
      style="
        margin-left: 0.9375rem;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
      "
    >
      user admin
    </h3>
    <el-table :data="userInfoList" max-height="500" virtual-scroll>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="Username" width="120" />
      <el-table-column
        prop="vipExpirationDate"
        label="VIP Expiration Date"
        width="150"
        :formatter="formatDate"
      />

      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="editRow(scope.$index)"
          >
            edit
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4" @click="onAddItem">Add Item</el-button>
  </div>
</template>

<script lang="ts">
import { mapActions, mapWritableState } from 'pinia';
import { defineComponent, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserInfoEdit } from 'src/pages/userInfoEdit/userInfoEdit.vue';
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

export default defineComponent({
  name: 'userAdmin',
  setup() {
    return {};
  },
  mounted() {
    useUserAdminData().getUserInfo();
  },
  computed: { ...mapWritableState(useUserAdminData, ['userInfoList']) },
  methods: {
    ...mapActions(useUserAdminData, ['deleteRow', 'editRow', 'getUserInfo']),
  },
});
</script>
<style></style>

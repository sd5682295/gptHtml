<template>
  <div class="table-page">
    <h3>{{ selectTableName }} 表详情</h3>
    <q-table :rows="tableData" :title="selectTableName">
      <template #body-cell-vipExpirationDate="props">
        <div style="margin-top: 15px">
          {{ formatDate(props.value) }}
        </div>
      </template>
    </q-table>
    <q-card class="table-card">
      <q-card-section>
        <pre>{{ JSON.stringify(columns, null, 2) }}</pre>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <pre>{{ JSON.stringify(tableData, null, 2) }}</pre>
      </q-card-section>
    </q-card>
    <div>
      <div v-for="attr in columns" :key="attr">
        <q-input v-model="newData[attr]" :label="attr"></q-input>
      </div>
      <q-btn @click="createData">提交数据</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { defineStore, mapActions, mapWritableState } from 'pinia';
import axios from 'axios';
import { useRegister } from '../registerPage/registerPage.vue';
import { useTableData } from './tablelist.vue';

export const useTablePage = defineStore('tablePage', {
  state: () => ({
    newData: {} as {
      [key: string]: any;
    },
    tableData: [] as {
      [key: string]: any;
    }[],
    columns: [] as string[],
  }),
  actions: {
    formatDate(dateTimeString: string) {
      const dateTime = new Date(dateTimeString);
      return `${dateTime.getFullYear()}/${this.padZero(
        dateTime.getMonth() + 1
      )}/${this.padZero(dateTime.getDate())} ${this.padZero(
        dateTime.getHours()
      )}:${this.padZero(dateTime.getMinutes())}:${this.padZero(
        dateTime.getSeconds()
      )}`;
    },

    // 工具函数：将数字转化为两位数的字符串（例如 1 => "01"）
    padZero(num: number) {
      return num < 10 ? `0${num}` : num;
    },
    async createData() {
      this.tableData.push(this.newData);
      const params = {
        newData: this.newData,
        tableName: useTableData().selectTableName,
        columns: this.columns,
      };
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      const response = await axios.post<
        string,
        { resCode: number; msg: string }
      >('http://120.48.84.244:5000/createData/', JSON.stringify(params), {
        headers,
      });
      let res = useRegister().handleResponse(response);
      console.log(res);
      this.newData = {};
    },

    async getTableData() {
      const paramsString = JSON.stringify({
        tableName: useTableData().selectTableName,
      });
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      const response = await axios.post<
        string,
        { resCode: number; data: { [key: string]: any } }
      >('http://120.48.84.244:5000/getTableData/', paramsString, {
        headers,
      });
      let res = useRegister().handleResponse(response);
      // console.log('resCode', r);
      // console.log('resresCode', res.data);

      if (res.resCode === 0) {
        this.columns = res.data.columns;
        this.tableData = res.data.result;
        console.log(['resCode0', this.tableData, this.columns]);
        this.newData = {};
      } else if (res.resCode === 1) {
        this.columns = res.data.columns;
        console.log(['resCode1', this.tableData, this.columns]);
      } else {
        console.log('获取数据库表列表失败', res);
      }
    },
  },
});

export default defineComponent({
  name: 'databaseTables',
  setup() {
    return {};
  },
  computed: {
    ...mapWritableState(useTablePage, ['tableData', 'columns', 'newData']),
    ...mapWritableState(useTableData, ['selectTableName']),
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    goToDetail(tableName: string) {
      // 进入该table的详情页
      console.log(`进入${tableName}的详情页`);
    },
    ...mapActions(useTablePage, ['getTableData', 'formatDate', 'createData']),
  },
});
</script>

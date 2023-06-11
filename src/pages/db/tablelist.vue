<template>
  <div
    class="q-gutter-md q-mt-xl q-mb-xl q-pa-md q-ma-sm"
    style="max-width: 600px"
  >
    <h3 style="font-size: 24px; color: #333; border-bottom: 1px solid #ddd">
      数据库表列表
    </h3>
    <q-list bordered class="q-mt-lg">
      <q-item v-for="(table, index) in tableList" :key="index">
        <q-item-section>{{ table }}</q-item-section>
        <q-item-section side>
          <q-btn
            dense
            color="negative"
            label="删除"
            @click="deleteTable(table)"
          />
        </q-item-section>
        <q-item-section side arrow>
          <q-btn
            dense
            color="primary"
            label="详情"
            @click="goToDetail(table)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { defineStore, mapActions, mapWritableState } from 'pinia';
import axios from 'axios';
import { useRegister } from '../registerPage/registerPage.vue';
import { Router, useRouter } from 'vue-router';

export const useTableData = defineStore('tableData', {
  state: () => ({
    selectTableName: '',
    tableList: [] as string[],
  }),
  actions: {
    async getTableList() {
      const response = await axios.get<{ resCode: number; data: string[] }>(
        'http://120.48.84.244:5000/getTableList/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      let res = useRegister().handleResponse(response);
      console.log('res', res);

      if (res.resCode === 0) {
        this.tableList = res.data.tableList;
        console.log(['tableList', this.tableList]);
      } else {
        console.log('获取数据库表列表失败', response);
      }
    },
    deleteTable(tableName: string) {
      const paramsString = JSON.stringify({ tableName });
      this.tableList = this.tableList.filter((table) => table !== tableName);

      axios
        .post<{ resCode: number }>(
          'http://120.48.84.244:5000/deleteTable/',
          paramsString,
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        .then((response) => {
          if (response.data.resCode === 0) {
          } else {
            console.log('获取数据库表列表失败', response);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});

export default defineComponent({
  name: 'databaseTables',
  setup() {
    return {};
  },
  computed: {
    ...mapWritableState(useTableData, ['tableList']),
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    goToDetail(tableName: string) {
      useTableData().selectTableName = tableName;
      useRegister().router.push('table-Page');
      // 进入该table的详情页
      console.log(`进入${tableName}的详情页`);
    },
    ...mapActions(useTableData, ['getTableList', 'deleteTable']),
  },
});
</script>

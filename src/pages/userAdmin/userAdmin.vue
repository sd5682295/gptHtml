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
import { ElTable, ElTableColumn, ElButton } from 'element-plus';
import { mapActions, mapWritableState } from 'pinia';
import { defineComponent, ref } from 'vue';
import { useUserAdminData } from './userAdminData';

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

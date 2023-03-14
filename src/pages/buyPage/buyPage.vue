<template>
  <div class="commodity-list">
    <el-card shadow="hover" v-for="item in commodityList" :key="item.id">
      <div class="commodity-card-content">
        <div class="commodity-info">
          <div class="commodity-name">{{ item.name }}</div>
        </div>

        <el-form inline :model="item" class="demo-form-inline">
          <el-form-item>
            <div class="el-form-item__content commodity-price">
              ¥ {{ item.price }}
            </div>
          </el-form-item>
          <el-form-item>
            <div class="form-button-container">
              <el-button type="primary" @click="onSubmit(item.id)"
                >购买</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'buyPage',
  setup() {
    const commodityList = reactive([
      { name: '包月，每天可以使用100次', id: '0', price: 50 },
      { name: '包月，每天可以使用30次', id: '1', price: 20 },
      { name: '次数，总共可以使用30次', id: '2', price: 2 },
    ]);

    const onSubmit = (commodityId: string) => {
      console.log(['onSubmit未完成', commodityId]);
    };

    return {
      commodityList,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.commodity-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
}

.el-card {
  width: 300px; /* 缩小方框 */
  height: 200px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.commodity-card-content {
  padding: 20px;
  flex-grow: 1;
}

.commodity-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.commodity-name {
  font-size: 20px;
  font-weight: bold;
}

.commodity-price {
  font-size: 18px;
}

.el-form-item__content {
  flex-grow: 1;
}

.form-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.el-button {
  margin-left: 10px;
}
</style>

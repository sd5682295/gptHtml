<template>
  <div ref="network" class="network"></div>
</template>

<script>
import 'vis-network/dist/dist/vis-network.css';
import { Network } from 'vis-network/standalone/esm/vis-network.min.js';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'viaNetwork',
  mounted() {
    const container = this.$refs.network;
    const nodes = [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
    ];
    const edges = [
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ];
    const data = { nodes, edges };
    const options = {};
    const network = new Network(container, data, options);
    network();
  },
});
</script>
<style scoped>
.network {
  height: 100vh; /* 以视口宽度的80%作为元素宽度 */
  max-width: 600px; /* 以视口高度的60%作为元素高度 */
  margin: 0 auto 0 0; /* 让元素靠页面最左边 */
}
</style>

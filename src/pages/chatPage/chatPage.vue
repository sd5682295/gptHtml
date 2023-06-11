<template>
  <!-- 页面容器 -->
  <q-page class="chat-container">
    <!-- 工具栏组件 -->
    <tool-bar />
    <editor-box />
    <!-- 循环渲染消息列表 -->
    <message-box />
    <!-- 页面元素样式设置 -->
  </q-page>
</template>
<script lang="ts">
import hljs from 'highlight.js';

import { mapActions, mapWritableState } from 'pinia';
import { defineComponent, reactive, ref, onBeforeUnmount } from 'vue';
import { useRegister } from 'src/pages/registerPage/registerPage.vue';
import { useMainLayoutData } from 'src/layouts/MainLayout.vue';

import toolBar from 'src/pages/chatPage/ToolBar.vue';
import editorBox from 'src/pages/chatPage/EditorBox.vue';
import messageBox from 'src/pages/chatPage/MessageBox.vue';
import { useChatPageData } from './chatData';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'chatPage',

  components: {
    toolBar,
    editorBox,
    messageBox,
    // headerBtnMenu,
    // registerPage,
    // chatPage,
    // buyPage,
    // userAdmin,
  },
  mounted() {
    this.getSessionMessages();
    this.$nextTick(() => {
      this.getSessionMessages();
      // 解决异步更新视图的问题
      // const codeBlock = this.$refs.codeBlock as HTMLElement; // 使用类型断言将 $refs.codeBlock 的类型转换为 HTMLElement
      // hljs.highlightBlock(codeBlock); // 使用 highlight.js 对代码块进行高亮处理
    });
  },

  methods: {
    // ...mapActions(useRegister, ['onSubmit']),
    ...mapActions(useChatPageData, ['getSessionMessages', 'sendMessage']),
  },
});
</script>
<style scoped>
.sent-btn {
  border: 1px solid #2196f3;
  background-color: #2196f3;
  color: #fff;
}

.sent-btn:hover {
  background-color: #1976d2;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
}
.message-card {
  margin-top: 5px;
  margin-bottom: 5px;
}

.message-card-section {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-form el-input {
  flex: 1;
  margin-right: 10px;
}
.message-card,
.message-card-section {
  width: 100%;
}
.code-block {
  display: block;
  font-size: 14px;
  margin: 16px 0;
  padding: 0.5rem;
  overflow: auto;
  border-radius: 3px;
  background-color: #f6f8fa;
  word-wrap: normal;
  text-align: left;
}

.code-block pre {
  margin: 0;
  border-radius: 0;
  background-color: inherit;
  box-shadow: none;
  white-space: pre-wrap;
}

.code-block pre code {
  display: inline;
  padding: 0;
  background-color: inherit;
  word-wrap: normal;
}
.message-card-section {
  overflow-x: auto;
}

.message-card-section div {
  word-wrap: break-word;
  word-break: break-all;
}
.msg-buttons {
  display: flex;
  justify-content: flex-end;
}
footer {
  position: relative;
  /* 其他样式属性 */
}

editor-box {
  position: absolute;
  bottom: 0;
  /* 其他样式属性 */
}
</style>

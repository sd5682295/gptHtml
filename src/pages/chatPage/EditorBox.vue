<template>
  <div class="q-pa-sm q-ma-sm" style="max-width: 600px">
    <!-- 消息编辑框头部 -->
    <div style="display: flex; justify-content: flex-end">
      <!-- 发送消息按钮，点击后调用sendMessage方法 -->
      <q-btn
      
        flat
        dense
        label="send"
        icon-color="white"
        color="green"
        @click="sendMessage"
      />
    </div>
    <div>
      <!-- 标题输入框，使用了Quasar框架的样式 -->
      <q-input outlined dense label="Title" v-model="titleInput" />
    </div>
    <div>
      <!-- 对话框输入框，使用了Quasar框架的样式和autogrow自动扩展高度的功能 -->
      <q-input
        autogrow
        text-color="primary"
        name="editQuestion"
        v-if="showDialog"
        outlined
        dense
        label="Title"
        v-model="diaLogContent"
      >
        <!-- 对话框发送按钮，点击后调用sendQuestion方法 -->
        <template v-slot:after>
          <q-btn
            color="primary"
            round
            dense
            flat
            icon="send"
            @click="sendQuestion"
          />
        </template>
      </q-input>
    </div>
    <!-- 富文本编辑器组件，使用了Quasar框架的样式和自定义工具栏的功能 -->
    <q-editor
      v-model="newMessage"
      height="150px"
      rounded
      :style="{ height: editorHeight, width: '100%' }"
      @focus="onFocus"
      @blur="onBlur"
      custom-bottom-toolbar
      toolbar-bg-color="transparent"
      toolbar-toggle-color="light-blue-5"
      :toolbar="[['undo', 'redo', 'viewsource'], ['token']]"
      @keydown.ctrl.enter.prevent="sendMessage"
    >
      <!-- 下拉菜单按钮，点击后显示下拉菜单列表 -->
      <template v-slot:token>
        <q-btn-dropdown
          dense
          no-caps
          ref="tokenRef"
          no-wrap
          unelevated
          color="white"
          text-color="primary"
          label="Token"
          size="sm"
        >
          <!-- 下拉菜单列表项，点击后调用selectQuestion方法 -->
          <q-list dense>
            <q-item
              tag="label"
              clickable
              v-for="(item, index) in gptQuestion"
              :key="index"
              @click="selectQuestion(item.content(titleInput))"
            >
              <q-item-section side>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>{{ item.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-editor>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { useMainLayoutData } from 'src/layouts/MainLayout.vue';
import { defineComponent, reactive, ref } from 'vue';
import { useChatPageData } from './chatData';

export default defineComponent({
  name: 'EditorBox',

  mounted() {},
  computed: {
    ...mapWritableState(useChatPageData, [
      'titleInput',
      'showDialog',
      'gptQuestion',
      'editorHeight',
      'newMessage',
    ]),
  },
  methods: {
    ...mapActions(useChatPageData, [
      'sendMessage',
      'selectQuestion',
      'sendQuestion',
      'onFocus',
      'onBlur',
    ]),
  },
});
</script>

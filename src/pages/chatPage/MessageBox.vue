<template>
  <div :key="componentKey" style="height: 630px; overflow-y: scroll">
    <!-- 消息容器，使用了Quasar框架的样式和v-for指令 -->
    <!-- messages.slice().reverse() -->
    <div
      v-for="(msg, index) in filteredMessages"
      :key="msg.id"
      class="d-flex q-pl-sm q-pr-sm q-ma-sm message-container"
      style="max-width: 600px"
    >
      <div style="display: flex; justify-content: flex-end">
        <!-- <el-button-group class="ml-4">
          <el-button type="primary">编辑</el-button>
          <el-button type="primary">补全</el-button>
          <el-button type="primary">删除</el-button>
        </el-button-group>
        <q-btn outline color="primary" icon="close" label="One" />
        <q-btn outline color="primary" label="Two" />
        <q-btn outline color="primary" label="Two" /> -->
        <!-- 发送消息按钮，点击后调用sendMessage方法 -->
      </div>
      <!-- 列表组件，使用了Quasar框架的样式 -->
      <q-list bordered class="rounded-borders">
        <!-- 展开项组件，使用了Quasar框架的样式和展开/收缩的功能，点击时调用handleToggle方法 -->
        <q-expansion-item
          v-model="msg.contentShow"
          expand-icon-toggle
          expand-separator
          :default-opened="msg.contentShow"
          @before-show="handleToggle(messages.length - 1 - index, msg.id)"
        >
          <!-- 消息标题 -->
          <template v-slot:header>
            <q-item-section>
              <!-- 提示框组件，使用了Quasar框架的样式 -->
              <div
                v-if="!msg.focused"
                :title="msg.title.length > 25 ? msg.title : ''"
              >
                <q-tooltip :offset="[10, 10]">{{ msg.title }} </q-tooltip>
                {{
                  msg.title.length > 25
                    ? msg.title.substring(0, 25) + '...'
                    : msg.title
                }}
              </div>
              <!-- 标题编辑框，使用了Quasar框架的样式和自定义工具栏的功能 -->
              <q-input
                v-if="msg.focused"
                outlined
                custom-bottom-toolbar
                v-model="msg.title"
                :style="{ height: '100%', padding: 0, width: '100%' }"
              />
            </q-item-section>
            <q-item-section side>
              <div class="row items-center">
                <!-- 发送时间 -->
                <p
                  class="text-xs text-[#b4bbc4] text-left"
                  style="
                    margin-bottom: 0px;
                    font-size: 0.75rem;
                    line-height: 1rem;
                    --tw-text-opacity: 1;
                    color: rgb(180 187 196 / var(--tw-text-opacity));
                  "
                >
                  {{ msg.createTime }}
                </p>
                <!-- 编辑/发送按钮，点击时调用onCardBlur/startEditing方法 -->
                <q-btn
                  v-show="msg.focused"
                  flat
                  dense
                  label="send"
                  icon-color="white"
                  color="green"
                  class="send-btn"
                  @click.stop.prevent="
                    onCardBlur(messages.length - 1 - index, false)
                  "
                  style="align-self: center"
                />
                <q-btn
                  flat
                  dense
                  @click="msg.contentShow = true"
                  style="align-self: center"
                >
                  <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                    ></path>
                  </svg>
                  <q-menu anchor="bottom left" self="top left">
                    <q-item clickable>
                      <q-item-section
                        clickable
                        v-close-popup
                        @click.stop.prevent="
                          startEditing(messages.length - 1 - index)
                        "
                        >编辑</q-item-section
                      >
                    </q-item>
                    <q-item clickable>
                      <q-item-section
                        @click.stop.prevent="
                          deleteMessage(messages.length - 1 - index)
                        "
                        style="color: red"
                        >删除</q-item-section
                      >
                    </q-item>
                    <q-item clickable>
                      <q-item-section
                        clickable
                        v-close-popup
                        @click.stop.prevent="
                          addTitleAndKeyword(
                            messages.length - 1 - index,
                            msg.id
                          )
                        "
                        >补充</q-item-section
                      >
                    </q-item>
                    <q-item clickable>
                      <q-item-section
                        clickable
                        v-close-popup
                        @click.stop.prevent="
                          selectMUbuTitle(messages.length - 1 - index, msg.id)
                        "
                        >拓展</q-item-section
                      >
                    </q-item>
                  </q-menu>
                </q-btn>

                <!-- 删除按钮，点击时调用deleteMessage方法 -->
              </div>
            </q-item-section>
          </template>
          <q-card
            flat
            bordered
            class="q-mt-md message-card"
            :rounded="!msg.isHtml && msg.focused"
            style="flex: 1"
          >
            <q-card-actions style="padding-top: 0">
              <el-tag
                style="padding-top: 0"
                v-for="tag in msg.keyWord"
                :key="tag"
                :closable="msg.focused ? true : false"
                >{{ tag }}</el-tag
              >
              <div class="d-flex align-center">
                <el-input
                  ref="InputRef"
                  class="ml-2"
                  size="small"
                  style="flex-shrink: 0; width: 80px"
                />
                <el-button class="button-new-tag ml-1" size="small">
                  +
                </el-button>
              </div>
            </q-card-actions>

            <!-- @click="showInput" -->
            <!-- @close="handleClose(tag)" -->

            <q-card-section
              style="height: msg.focused ? '200px' : '100%',"
              class="message-card-section"
            >
              <!-- v-if="msg.isHtml && !msg.focused" -->
              <div v-if="msg.isHtml && !msg.focused" v-html="msg.content"></div>
              <div v-if="!msg.isHtml && !msg.focused">{{ msg.content }}</div>
              <q-input
                outlined
                custom-bottom-toolbar
                v-if="!msg.isHtml && msg.focused"
                v-model="messages[messages.length - 1 - index].content"
                :style="{ height: '100%', padding: 0, width: '100%' }"
              />
              <q-editor
                v-if="msg.isHtml && msg.focused"
                v-model="messages[messages.length - 1 - index].content"
                rounded
                :style="{
                  height: '100%',
                  padding: 0,
                  width: '100%',
                }"
                @focus="onCardFocus(messages.length - 1 - index)"
                custom-bottom-toolbar
                toolbar-bg-color="transparent"
                toolbar-toggle-color="light-blue-5"
                :definitions="{
                  sent: {
                    tip: 'Sent',
                    icon: 'send',
                    label: 'Sent',
                    handler: () => {
                      onCardBlur(messages.length - 1 - index, false);
                    },
                  },
                }"
                :toolbar="[['undo', 'redo', 'viewsource', 'sent']]"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  Edit,
  Share,
} from '@element-plus/icons-vue';
import { mapActions, mapWritableState } from 'pinia';
import { useMainLayoutData } from 'src/layouts/MainLayout.vue';
import { defineComponent, reactive, ref } from 'vue';
import { useChatPageData } from './chatData';
import { useMubu } from 'src/pages/mubu/mubu.ts';
export default defineComponent({
  name: 'chatPage',
  computed: {
    ...mapWritableState(useChatPageData, ['messages']),
    filteredMessages() {
      return this.messages
        .slice()
        .reverse()
        .filter((msg) => msg.hasNote === '1');
    },
  },
  methods: {
    ...mapActions(useChatPageData, [
      'handleToggle',
      'onCardBlur',
      'startEditing',
      'deleteMessage',
      'handleToggle',
      'addTitleAndKeyword',
    ]),
    ...mapActions(useMubu, ['selectMUbuTitle']),
  },
});
</script>
<style scoped>
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
.message-card,
.message-card-section {
  width: 100%;
}

.message-card-section {
  overflow-x: auto;
}

.message-card-section div {
  word-wrap: break-word;
  word-break: break-all;
}
</style>

<template>
  <div>
    <tool-bar />

    <!-- <editor-box
      :title-input="messageTitle"
      :show-dialog="showGPTDialog"
      :dia-log-content="gptDialogContent"
      :new-message="newMessage"
      :send-message="handleSendMessage"
      :send-question="handleSendQuestion"
    />

    <message-box :messages="messages" :component-key="componentKey" /> -->
  </div>
</template>

<script>
import toolBar from 'src/pages/chatPage/ToolBar.vue';
import EditorBox from 'src/pages/chatPage/EditorBox.vue';
import MessageBox from 'src/pages/chatPage/MessageBox.vue';

export default defineComponent({
  name: 'chat2',
  components: { toolBar, EditorBox, MessageBox },
});
</script>

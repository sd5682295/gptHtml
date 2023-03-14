<template>
  <div class="chat-container">
    <!-- <div class="chat-header">Chat Room</div> -->
    <div class="chat-messages">
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 600px">
          <q-chat-message
            v-for="(message, index) in messages"
            :key="index"
            :text="message.content"
            :sent="message.sent"
            :name="message.author"
            :avatar="message.avatar"
          />
        </div>
      </div>
    </div>
    <div class="chat-form">
      <el-input v-model="newMessage" placeholder="Type your message"></el-input>
      <el-button type="primary" @click="sendMessage">Send</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { defineComponent } from 'vue';
import { useChatPageData } from 'src/pages/chatPage/chatPageData.ts';
import { useRegister } from 'src/pages/registerPage/registerPageData.ts';
export default defineComponent({
  name: 'chatPage',
  computed: {
    ...mapWritableState(useRegister, ['password', 'userName']),
    ...mapWritableState(useChatPageData, ['messages', 'newMessage']),
  },
  methods: {
    ...mapActions(useRegister, ['onSubmit']),
    ...mapActions(useChatPageData, ['sendMessage']),
    // sendMessage() {
    //   if (this.newMessage !== '') {
    //     this.messages.push({
    //       author: 'You',
    //       content: this.newMessage,
    //       type: 'user',
    //     });
    //     this.newMessage = '';
    //   }
    // },
  },
});
</script>
<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
}
.chat-header {
  background-color: #4267b2;
  color: white;
  padding: 10px;
  font-size: 24px;
  text-align: center;
}
.chat-message {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  height: 100vh;
}
.chat-message .chat-message-content {
  background-color: #f0f0f0;
  border-radius: 16px;
  padding: 10px;
  margin-left: 10px;
  max-width: 60%;
  word-wrap: break-word;
}
.chat-form {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: auto;
  background-color: #f0f0f0;
}
.chat-form el-input {
  flex: 1;
  margin-right: 10px;
}
</style>

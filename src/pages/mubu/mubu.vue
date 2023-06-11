<template>
  <!-- @keydown.left="test_click" -->
  <div style="margin-top: 15px">
    <transition name="fade">
      <q-btn @click="navigateToChatPage" flat>home</q-btn>
    </transition>
    <h2
      style="
        margin-left: 0.9375rem;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
      "
    >
      {{ mubuTitle }}
    </h2>
    <transition name="note" appear>
      <div style="margin-left: 0.9375rem">
        <h4 name @click="showNote = !showNote">notes</h4>
        <p v-show="showNote" style="max-width: 600px" v-html="mubuContent"></p>
      </div>
    </transition>
    <transition name="note" appear>
      <div style="margin-left: 0.9375rem">
        <h4 name @click="showNote = !showKeyPoints">Key Points</h4>
        <p
          v-show="showKeyPoints"
          style="max-width: 600px"
          v-html="mubuContent"
        ></p>
      </div>
    </transition>

    <!-- <template>
<div>
  <h3 style="margin-left: 0.9375rem; margin-top: 1.25rem;margin-bottom: 1.25rem;"
   v-if="searchType =='文件'">
        {{stateFileName.main}}</h3>
  <form ref="formTree"
  @keydown.shift.tab.prevent="mainStabhandle($event)"
  @keydown.tab.prevent="mainTabhandle($event)"
  @keydown.alt.enter.prevent='mainAltEnter'
  @keydown.down.prevent="maindownhandle"
  @keydown.up.prevent="mainuphandle"
  @keydown.ctrl.d.prevent='mainCtrlD("main")'
  >
  <el-tree
  style="border:none;outline:none;"
  id="tree"
  tabindex=0
  :data="resScreen[stateFileName.main]"
  node-key="id"
  default-expand-all
  :expand-on-click-node="false"
  :highlight-current="true"
  :current-node-key="currentKey"
  draggable>
  <template #default="{ node }" >
    <element-tree-line
        @click="mainClickHandle(node, stateFileName.main, node.key, 'main',);"
        :node="node"
                showLabelLine
            >
             <span>
      <q-icon size="1px" color="orange" name="circle" />
        </span>
        <span style="margin-left: 1rem" class="custom-tree-node">
          <span @blur="blur('main', node)" tabindex=0 :id=node.key :ref=node.key
          style="outline: none" contenteditable = true @input="dataInput($event, node)"
           v-html="node.label"
           ></span>
        </span>
           </element-tree-line>

      </template>
</el-tree>
</form>
</div>
</template> -->
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { defineComponent, reactive, ref } from 'vue';
import { useMubu } from 'src/pages/mubu/mubu.ts';
export default defineComponent({
  name: 'mubu',

  computed: {
    ...mapWritableState(useMubu, [
      'mubuTitle',
      'mubuContent',
      'showNote',
      'showKeyPoints',
    ]),
  },
  methods: {
    ...mapActions(useMubu, ['selectMUbuTitle', 'navigateToChatPage']),
  },
});
</script>

<style scoped>
h4 {
  max-width: 600px;
  margin-block-start: 2rem;
  margin-block-end: 1rem;
  background-color: rgb(220, 220, 220);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.note-enter-active,
.note-leave-active {
  transition: opacity 0.5s ease-out;
}

.note-enter,
.note-leave-to {
  opacity: 0;
}
</style>

<template>
  <AppDrop @itemDroped="moveElement" @dragover.prevent @dragenter.prevent>
    <AppDrag
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
      }"
      class="task"
      @click="setTask(task)"
    >
      <span class="task__item">{{ task.name }}</span>
    </AppDrag>
  </AppDrop>
</template>

<script>

import AppDrag from './AppDrag.vue';
import AppDrop from './AppDrop.vue';

import useBoardMethods from '../useBoardMethods';

export default {
  props: {
    task: { type: Object, required: true },
    taskIndex: { type: Number, required: true },
    toTasks: { type: Object, required: true },
    columnIndex: { type: Number, required: true },
  },
  components: { AppDrag, AppDrop },
  setup(props) {
    return { ...useBoardMethods(props) };
  },
};
</script>

<style>
.task {
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  padding: 0.8rem;
}
.task__item {
  display: flex;
  flex-shrink: 0;
  font-weight: bold;
  width: 100%;
  word-break: break-all;
  text-align: left;
}
.task__input {
  border: none;
  height: 100%;
  resize: none;
  width: 100%;
}

</style>

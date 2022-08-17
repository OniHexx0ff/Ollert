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

<style></style>

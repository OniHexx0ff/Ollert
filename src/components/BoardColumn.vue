<template>
  <AppDrop @itemDroped="moveElement">
    <AppDrag
      class="column"
      :transferData="{ type: 'column', fromColumnIndex: columnIndex }"
    >
      <div class="collumn__name">
        <input
          @change="updateColumn($event, 'name')"
          @keyup.enter="updateColumn($event, 'name')"
          type="text"
          :value="column.name"
        />
      </div>

      <ColumnTask
        v-for="(task, taskIndex) of column.tasks"
        :key="taskIndex"
        :task="task"
        :taskIndex="taskIndex"
        :toTasks="column.tasks"
        :columnIndex="columnIndex"
      />
      <ActionDiv
        @save="saveTask"
        class="add-task__holder"
        triggerButton="+ Add task"
        saveButton="Save task"
      />
    </AppDrag>
  </AppDrop>
</template>

<script>
import { useBoardStore } from '../stores/Board';

import AppDrag from '@/components/AppDrag.vue';
import AppDrop from '@/components/AppDrop.vue';

import ColumnTask from './ColumnTask.vue';
import ActionDiv from './ActionDiv.vue';
import useBoardMethods from '../useBoardMethods';

export default {
  components: {
    AppDrag,
    AppDrop,
    ColumnTask,
    ActionDiv,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const boardStore = useBoardStore();
    const updateColumn= (event, key) => {
      console.log(props.column)
      boardStore.updateColumn(event.target.value, props.column, key)
    }
    return { ...useBoardMethods(props), updateColumn };
  },
};
</script>

<style>
.add-task__holder .button__show-actions{
  width: 100%;
}
.column {
  background-color: #ebecf0;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  margin-left: 1rem;
  margin-top: 1rem;
  min-width: 350px;
  max-width: 450px;
  height: fit-content;
}
.column__add-list {
  padding: 0.25rem;
}
.collumn__name {
  align-items: center;
  display: flex;
}
.collumn__name input {
  font-weight: bold;
  margin-bottom: 2rem;
  margin-left: 0.25rem;
  background-color: transparent;
}
.collumn__name input:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
}
.container {
  display: flex;
}

.column__button {
  background-color: transparent;
  border: none;
  color: #2c3e50;
  padding: 0.5rem;
  font-size: large;
  width: 350px;
}
.column__button:hover {
  background-color: rgb(176, 176, 176);
  color: rgb(60, 58, 58);
  cursor: pointer;
}
.column__input {
  border-radius: 0.5rem;
  height: 45px;
  margin-bottom: 0.5rem;
  width: 100%;
}
</style>

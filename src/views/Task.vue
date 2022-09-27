<template>
  <div class="task-view">
    <div class="task__body" ref="taskBody">
      <h3 class="task__body-text">Name</h3>
      <textarea
        @input="handleGrowth($event)"
        @change="updadeProprety($event, 'name')"
        @keyup.enter="updadeProprety($event, 'name')"
        type="text"
        :value="task.name"
        class="task__name"
      >
      </textarea>
      <h3 class="task__body-text">Description</h3>
      <textarea
        @input="handleGrowth($event)"
        @change="updadeProprety($event, 'description')"
        @keyup.enter="updadeProprety($event, 'description')"
        cols="30"
        rows="2"
        :value="task.description"
        class="task__description"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { computed, onUpdated, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { handleHeight, newHeight } from '../utils';
import { useBoardStore } from '../stores/Board';
export default {
  setup() {
    const boardStore = useBoardStore();
    const route = useRoute();
    const taskBody = ref(null);

    onMounted(() => {
      const textarea = taskBody.value.querySelectorAll('textarea');
      textarea.forEach((element) => {
        const { height } = newHeight(element.value);
        element.style.height = height + 'px';
      });
    });

    const handleGrowth = (e) => {
      handleHeight(e.target, 55);
    };

    const task = computed(() => {
      return boardStore.getTask(route.params.id);
    });
    const updadeProprety = (e, key) => {
      e.target.blur()
      boardStore.updateTask(e.target.value, task, key);
    };
    return { boardStore, task, taskBody, updadeProprety, handleGrowth };
  },
};
</script>

<style scoped>
.task-view {
  background-color: white;
  border-radius: 0.5rem;
  cursor: default;
  display: flex;
  max-height: 500px;
  margin: auto;
  margin-top: 5rem;
  position: relative;
  padding: 1rem;
  width: 600px;
}
.task__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  width: 100%;
  padding: 1rem;
}
.task__body textarea {
  border: none;
  font-weight: bold;
  /* font-size: x-large; */
  overflow: hidden;
  padding: 0.5rem;
  resize: none;
  width: 100%;
  word-break: break-all;
}
.task__name {
  margin-bottom: 2rem;
}
.task__description {
  background-color: #eaecef;
}
.task__body-text {
  width: 100%;
  text-align: left;
}
.task__name:focus,
.task__description:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
}
</style>

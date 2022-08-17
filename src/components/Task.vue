<template>
  <div class="task-view">
    <div class="task__body">
      <input @change="updadeProprety($event, 'name')"  @keyup.enter="updadeProprety($event, 'name')" type="text" :value="task.name" class="task__name" />
      <h3 class="task__description-text">Description</h3>
      <textarea @change="updadeProprety($event, 'description')"  @keyup.enter="updadeProprety($event, 'description')"  cols="30" rows="2" :value="task.description" class="task__description"></textarea>
      
    </div>
  </div>
</template>

<script>
import { useBoardStore } from '../stores/Board';
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
export default {
  setup() {
    const boardStore = useBoardStore();
    const route = useRoute();
    const task = computed(() => {
      return boardStore.getTask(route.params.id);
    });
    const updadeProprety = (event, key) => { 
      boardStore.updateTask(event.target.value, task, key)
    }
    return { boardStore, task, updadeProprety };
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
.task__name{
  border: none;
  font-weight: bold;
  font-size: x-large;
  margin-bottom: 2rem;
  padding: 0.5rem;
  width: 100%;
}
.task__description{
  background-color: #eaecef;
  border: none;
  font-weight: bold;
  font-size: x-large;
  padding: 0.5rem;
  width: 100%;
}
.task__description-text{
   width: 100%;
   text-align: left;
}
.task__name:focus, .task__description:focus{
  box-shadow: inset 0 0 0 2px #0079bf;
}
</style>

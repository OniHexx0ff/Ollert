<template>

    <Navbar :isBoardsView="false"></Navbar> 
    <!-- <SidebarMenu /> -->
    <div class="container">
      <div class="board">
        <BoardColumn
          v-for="(column, columnIndex) of boardStore.board.columns"
          :key="columnIndex"
          :column="column"
          :columnIndex="columnIndex"
        />
        <div class="drop">
          <div class="column column__add-list">
            <ActionDiv
              @save="addColumn"
              triggerButton="+ Add list"
              saveButton="Save list"
            />
          </div>
        </div>
      </div>
      <div v-if="isTaskModalOpen" @click.self="closeModal()" class="task-view">
        <router-view />
      </div>
    </div>

</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';

import { useBoardStore } from '../stores/Board';
import { lateralScroll } from '../utils';

import Navbar from '../components/Navbar.vue'
import SidebarMenu from '../components/SidebarMenu.vue';
import BoardColumn from '../components/BoardColumn.vue';
import ActionDiv from '../components/ActionDiv.vue';

export default {
  components: { BoardColumn, ActionDiv, SidebarMenu, Navbar },
  setup() {
    const boardStore = useBoardStore();
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
      lateralScroll();
    });
    const addColumn = (actions) => {
      const text =
        actions.querySelector('textarea') || actions.querySelector('input');
      boardStore.createColum(text.value);
      text.value = '';
    };
    const closeModal = () => {
      router.push({ name: 'board' });
    };
    const isTaskModalOpen = computed(() => {
      return route.name == 'task';
    });

    return {
      boardStore,
      isTaskModalOpen,
      addColumn,
      closeModal,
    };
  },
};
</script>
<style>

.board {
  background-color: #73c6b6;
  display: flex;
  height: calc(100vh - var(--navbar-height));
  justify-content: flex-start;
  overflow: auto;
  width: 100%;
}

.column .drop{
  width: 350px;
}
.new-element:hover {
  background-color: rgb(176, 176, 176);
  color: rgb(60, 58, 58);
}
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.task-view {
  background-color: rgba(128, 128, 128, 0.511);
  bottom: 0;
  cursor: pointer;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  width: 100%;
}


.is-disabled {
  display: none;
}
.drop:first-of-type {
  margin-left: 2rem;
}
</style>

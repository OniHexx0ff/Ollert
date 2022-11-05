<template>
  <Navbar></Navbar>

  <div v-if="isModalOpen" @click.self="closeModal()" class="task-view">
    <router-view />
  </div>

  <div class="boards">
    <div class="boards-container">
      <div
        @click="boardClicked(board.id)"
        v-for="(board, index) in Object.values(boardStore.boards)"
        :key="index"
        class="board-selection"
      >
        <h1>{{ board.name }}</h1>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

import { useBoardStore } from '../stores/Board';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
  components:{
    Navbar
  },

  setup() {
    const boardStore = useBoardStore();
    const router = useRouter();
    const route = useRoute();
    const isModalOpen = computed(() => route.name == 'createBoard');

    const boardClicked = (id) => {
      boardStore.setActiveBoard(id);
      router.push({ name: 'board' });
    };

    const closeModal = () => {
      router.push({ name: 'boards' });
    };

    return {
      boardStore,
      isModalOpen,
      boardClicked,
      closeModal,
    };
  },
};
</script>

<style scoped>
.boards {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}
.boards-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  
}

.board-selection {
  align-items: center;
  background-color: white;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  height: 150px;
  justify-content: center;
  margin-bottom: 2rem;
  margin-right: 2rem;
  width: 300px;
  overflow: hidden;
}
.new {
  box-sizing: border-box;
  background-color: rgba(128, 128, 128, 0.504);
}
</style>

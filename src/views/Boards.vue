<template>
  <div class="navbar">
    
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
      <div @click="createBoard()" class="board-selection new">
        <h1>Create new board</h1>
      </div>
    </div>
  </div>

</template>

<script>
import { useBoardStore } from '../stores/Board';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const boardStore = useBoardStore();
    const router = useRouter();

    const boardClicked = (id) => {
      boardStore.setActiveBoard(id)
      router.push({ name: 'board' });
    };

    const createBoard = () => {
      boardStore.createBoard('Task')
    };
    return { boardStore, boardClicked, createBoard };
  },
};
</script>

<style scoped>

  .navbar{
    width: 100%;
    height: 48px;
    background-color: rgb(102,102,102);
  }
.boards{
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
}
.new {
  box-sizing: border-box;
  background-color: rgba(128, 128, 128, 0.504);
}
</style>

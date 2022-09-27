<template>
  <div class="config-menu" @click="toggleSidebar">
    <div class="icons">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 icon"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 is-disabled icon"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="options is-disabled">
      <div @click="clearBoard" class="menu-item">
        <span class="task__item">Clear board</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useBoardStore } from '../stores/Board';

export default {
  setup() {
    const boardStore = useBoardStore();
    const toggleSidebar = () => {
      const configMenu = document.querySelector('.config-menu');
      const options = configMenu.querySelector('.options');
      const icons = [...configMenu.querySelectorAll('.icon')];
      const isOpen = configMenu.classList.contains('open') ? true : false;
      if (isOpen) {
        configMenu.classList.remove('open');
        options.classList.add('is-disabled');
        icons.at(-1).classList.add('is-disabled');
        icons.at(0).classList.remove('is-disabled');
      } else {
        configMenu.classList.add('open');
        options.classList.remove('is-disabled');
        icons.at(-1).classList.remove('is-disabled');
        icons.at(0).classList.add('is-disabled');
      }
    };

    const clearBoard = () => {
      boardStore.clearBoard();
    };

    return { toggleSidebar, clearBoard };
  },
};
</script>

<style scoped>
.config-menu {
  background-color: rgb(102,102,102);
  cursor: pointer;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 2rem;
  overflow: hidden;
  position: absolute;
  transition: width 0.2s ease-out;
}
.config-menu svg {
  position: absolute;
  right: 0;
  top: 1.25rem;
  color: white;
  width: 30px;
  height: 30px;
}
.menu-item {
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.5rem;
  padding: 0.8rem;
  width: 200px;
}
.menu-item span {
  width: fit-content;
}

.menu-item:hover {
  background-color: rgb(180, 177, 177);
}

.menu-item:first-of-type {
  margin-top: 3.5rem;
}

.open {
  width: 300px;
  background-color: rgb(102,102,102);
}
.position-unset {
  position: unset;
}
</style>

<template>
  <div class="navbar">
    <div class="logo">
      <h1 @click="goToBoards()">Ollert</h1>
    </div>
    <div v-if="hasRightMenu" class="right menu">
      <!-- <button class="clear"  @click="">Clear boards</button>
      <button class="create" @click="openModal()">New board</button> -->
      <div class="config" @click="toggleMenu()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div class="menu" ref="menu">
          <div class="container">
            <template v-if="isBoardsView"> 
              <a @click="openModal()">Create board</a>
            </template>
            <template v-else>
              <a @click="clearBoard()">Reset board</a>
              <a @click="deleteBoard()">Delete board</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '../stores/Board';

export default {
  props: {
    hasRightMenu: {
      type: Boolean,
      default: true,
    },
    isBoardsView: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    const router = useRouter();
    const boardStore = useBoardStore();

    const menu = ref('');

    const clearBoard = () => {
      boardStore.clearBoard();
    };

    const deleteBoard = () =>{
      boardStore.deleteBoard()
      goToBoards()
    }
    const openModal = () => {
      router.push({ name: 'createBoard' });
    };

    const toggleMenu = () => {
      if (!menu.value) return
      const currentDisplay = menu.value?.style.display;
      menu.value.style.display = currentDisplay == 'block' ? 'none' : 'block';
    };
    const goToBoards = () => {
      router.push({ name: 'boards' });
    };

    return { menu, clearBoard, deleteBoard , openModal, goToBoards, toggleMenu };
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: var(--navbar-height);
  background-color: rgb(51, 51, 51);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar .config {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: relative;
}
.navbar .config .menu {
  align-items: center;
  background-color: white;
  cursor: pointer;
  display: none;
  height: fit-content;
  position: absolute;
  right: 0;
  top: 48px;
  width: fit-content;
}
.navbar .config .menu .container {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}
.navbar .config .menu .container a {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: gray; */
  font-size: 20px;
  height: 64px;
  width: 150px;
}
.navbar .config .menu .container a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.navbar .config svg {
  color: white;
  height: 30px;
  width: 30px;
}
.navbar .logo {
  margin-left: 3rem;
  color: white;
  cursor: pointer;
}
.navbar .right.menu {
  margin-right: 1rem;
}
.navbar .right.menu button {
  border-radius: 0.5rem;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  margin-left: 1rem;
  padding: 0.8rem;
}
.navbar .right.menu .clear {
  width: 200px;
}
.navbar .right.menu .create {
  width: 150px;
}
</style>

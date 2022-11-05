<template>
  <Modal>
    <template v-slot:body>
      <h3 class="text">Name:</h3>
      <input type="text" class="name" :style="inputState" v-model="boardName" />
    </template>
    <template v-slot:actions>
      <button class="create" @click="createBoard()">Create</button>
    </template>
  </Modal>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '../components/Modal.vue';
import { useBoardStore } from '../stores/Board';
export default {
  components: { Modal },
  setup() {
    const router = useRouter();
    const boardStore = useBoardStore();
    const boardName = ref('');
    const isValidName = ref(undefined);
    const inputState = computed(() => {
      if (boardName.value == '') return '';
      else if (boardName.value.trim() == '')
        return 'box-shadow: inset 0 0 0 2px red';
      else return 'box-shadow: inset 0 0 0 2px green';
    });

    const createBoard = () => {
      if (boardName.value.trim() != '') {
        boardStore.createBoard(boardName.value);
        router.push({ name: 'boards' });
      }
    };
    return { boardName, isValidName, inputState, createBoard };
  },
};
</script>

<style scoped>
input {
  background-color: #eaecef;
  border: none;
  font-weight: bold;
  font-size: 20px;
  overflow: hidden;
  padding: 0.5rem 0 0.5rem 0;
  resize: none;
  word-break: break-all;
  width: 100%;
}
.create {
  background-color: #2185d0;
  border-radius: 0.25rem;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.7rem;
  font-size: 18px;
  font-weight: bold;
  width: 110px;
}
.description {
  background-color: #eaecef;
}
.name {
  margin-bottom: 1rem;
}

.text {
  width: 100%;
  text-align: left;
}
.name:focus,
.description:focus {
  box-shadow: inset 0 0 0 2px #0079bf;
}
</style>

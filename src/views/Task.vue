<template>
  <Modal>
    <template v-slot:body>
      <h3 class="text">Name:</h3>
      <textarea
        @input="handleGrowth($event)"
        @change="updadeProprety($event, 'name')"
        @keyup.enter="updadeProprety($event, 'name')"
        type="text"
        :value="task.name"
        class="name"
      >
      </textarea>
      <h3 class="text">Description:</h3>
      <textarea
        @input="handleGrowth($event)"
        @change="updadeProprety($event, 'description')"
        @keyup.enter="updadeProprety($event, 'description')"
        cols="30"
        rows="2"
        :value="task.description"
        class="description"
      ></textarea>
    </template>
    <template v-slot:actions>
      <button class="create" @click="closeModal()">Close</button>
    </template>
  </Modal>
</template>

<script>
import Modal from '../components/Modal.vue';

import { computed, onUpdated, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { handleHeight, newHeight } from '../utils';
import { useBoardStore } from '../stores/Board';
export default {
  components: { Modal },

  setup() {
    const boardStore = useBoardStore();
    const route = useRoute();
    const router = useRouter()


    onMounted(() => {
      const textarea = document.querySelector('.modal .body').querySelectorAll('textarea');
      textarea.forEach((element) => {
        const { height } = newHeight(element.value);
        element.style.height = height + 'px';
      });
    });

    const closeModal = () => {
      router.push({ name: 'board' });
    };

    const handleGrowth = (e) => {
      handleHeight(e.target, 55);
    };

    const task = computed(() => {
      return boardStore.getTask(route.params.id);
    });
    const updadeProprety = (e, key) => {
      e.target.blur();
      boardStore.updateTask(e.target.value, task, key);
    };
    return { boardStore, task, closeModal, updadeProprety, handleGrowth };
  },
};
</script>

<style scoped>
textarea {
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

.name {
  margin-bottom: 2rem;
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

<template>
  <div @click="handleClick($event)" class="actions">
    <button data-action="trigger" class="button button__show-actions">
      {{ triggerButton }}
    </button>
    <div class="task is-disabled action">
      <textarea
        ref="textarea"
        @keyup.enter="handleEnter($event)"
        @input="handleGrowth($event)"
        class="task__input"
      ></textarea>
    </div>
    <div class="button-holder is-disabled action">
      <button data-action="save" class="button button__save">
        <span>{{ saveButton }}</span>
      </button>
      <button data-action="hide" class="button button__hide-actions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { onUpdated, ref } from 'vue';

import { handleHeight, newHeight } from '../utils';
export default {
  props: {
    triggerButton: {
      type: String,
      required: true,
    },
    saveButton: {
      type: String,
      required: true,
    },
  },
  setup(_, context) {
    const textarea = ref(null);

    onUpdated(() => {
      const {height} = newHeight(textarea.value.value)
      textarea.value.style.height =  height + 'px';
    });

    const actions = {
      trigger(button, actions) {
        button.style.display = 'none';
        actions.querySelectorAll('.action').forEach((element) => {
          element.style.display = 'flex';
        });
        actions.querySelector('textarea').focus()
      },
      hide(_, actions) {
        const text =
          actions.querySelector('textarea') || actions.querySelector('input');
        actions.querySelector('.button.button__show-actions').style.display =
          'flex';
        actions.querySelectorAll('.action').forEach((element) => {
          element.style.display = 'none';
        });
        text.value = '';
      },
      save(_, actions) {
        context.emit('save', actions);
        this.hide(null, actions);
      },
    };

    const handleGrowth = (e) => {
      handleHeight(e.target, 32);
    };

    const handleEnter = (e) => {
      const actionsDiv = e.srcElement.closest('.actions');
      actions.save(null, actionsDiv);
    };

    const handleClick = (e) => {
      e.stopPropagation;
      const button = e.target.closest('button');
      if (button === null) return;

      const buttonAction = button.dataset.action;
      const actionsDiv = button.closest('.actions');
      actions[buttonAction](button, actionsDiv);
    };

    return { handleClick, handleEnter, handleGrowth };
  },
};
</script>

<style>
.actions {
  display: flex;
  flex-wrap: wrap;
  width: 350px;
}
.action {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.button {
  background-color: transparent;
  border-radius: 0.5rem;
  color: gray;
  cursor: pointer;
  border: none;
  word-break: break-all;
  font-size: large;
  font-weight: bold;
  text-align: left;
  padding: 0.5rem;
}

.button__save {
  background-color: #0079bf;
  border-radius: 0.25rem;
  color: white;
  font-weight: 600;
  text-align: center;
}

.button-holder {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.button__hide-actions {
  width: 45px;
  height: 45px;
}
.button__hide-actions:hover {
  color: rgb(93, 90, 90);
}
</style>

<template>
  <div
    draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const onDrag = (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('payload', JSON.stringify(props.transferData));
    };

    return { onDrag };
  },
};
</script>

<style></style>

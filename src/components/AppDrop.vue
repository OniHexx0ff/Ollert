<template>
  <div class="drop" @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
export default {
  setup(_, context) {
    const onDrop = (e) => {
      const transferData = JSON.parse(e.dataTransfer.getData('payload'));
      context.emit('itemDroped', transferData);
    };
    return { onDrop };
  },
};
</script>

<style>
</style>

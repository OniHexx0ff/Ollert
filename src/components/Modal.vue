<template>
    <div class="modal">
      <div class="body">
        <slot name="body"></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </template>
  
  <script>

  export default {
  };
  </script>
  
  <style scoped>

  .modal {
    --width: 600px;
    background-color: white;
    border-radius: 0.5rem;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    max-height: 700px;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    width: var(--width);
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    width: 100%;
    padding: 1rem;
  }
  .actions{
    align-items: center;
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem 0 1rem;
    width: 100%;
  }


  

  </style>
  
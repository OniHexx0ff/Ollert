import { defineStore } from 'pinia';
import defaultBoard from '../default-board';
import { uuid } from '../utils';

const boards = JSON.parse(localStorage.getItem('boards')) || {}
const board = Object.values(boards)[0] 

export const useBoardStore = defineStore('Board', {
  state: () => {
    return {
      boards,
      board,
    };
  },
  getters: {
    getTask: (state) =>
      function (id) {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      },
  },
  actions: {
    createBoard(name) {
      const newUuid = uuid()
      this.boards[newUuid] = { name, id: newUuid, columns: [] }
    },
    createColum(name) {
      this.board.columns.push({ name, tasks: [] });
    },
    createTask(name, column) {
      column.tasks.push({
        name,
        id: uuid(),
        description: '',
      });
    },
    clearBoard() {
      this.board.columns = [] 
    },
    moveTask(fromTasks, toTasks, fromTaskIndex, toTaskIndex) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, taskToMove);
    },
    moveColumn(fromColumnIndex, toColumnIndex) {
      const columnList = this.board.columns;
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, columnToMove);
    },
    setActiveBoard(id){
      this.board = boards[id]
    },
    updateTask(value, task, key) {
      task.value[key] = value;
    },
    updateColumn(value, column, key) {
      column[key] = value;
    },
  },
});

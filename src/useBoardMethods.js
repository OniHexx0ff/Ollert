import { useRouter } from 'vue-router';
import { useBoardStore } from './stores/Board';

export default function (props) {
  const boardStore = useBoardStore();
  const router = useRouter();
  const moveElement = (transferData) => {
    if (transferData.type === 'task') moveTask(transferData);
    else moveColumn(transferData);
  };
  const moveColumn = ({ fromColumnIndex }) => {
    boardStore.moveColumn(fromColumnIndex, props.columnIndex);
  };
  const moveTask = ({ fromColumnIndex, fromTaskIndex }) => {
    const fromTasks = boardStore.board.columns[fromColumnIndex].tasks;
    const toTasks = boardStore.board.columns[props.columnIndex].tasks;
    boardStore.moveTask(fromTasks, toTasks, fromTaskIndex, 0);
  };
  const saveTask = (actions) => {
    const text =
      actions.querySelector('textarea') || actions.querySelector('input');
    boardStore.createTask(text.value, props.column);
    text.value = '';
  };
  const setTask = (task) => {
    router.push({ name: 'task', params: { id: task.id } });
  };

  return { moveElement, moveColumn, moveTask, saveTask, setTask };
}

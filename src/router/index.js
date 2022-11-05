import { createRouter, createWebHistory } from "vue-router";
import Board from "../views/Board.vue";
import Boards from "../views/Boards.vue";
import CreateBoard from "../views/CreateBoard.vue"
import Task from "../views/Task.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/board",
      name: "board",
      component: Board,
      children:[
        {
          path:'task/:id',
          name: 'task',
          component:  Task
        }
      ]
    },
    {
      path: "/",
      name: "boards",
      component: Boards,
      children:[
        {
          path:'createBoard',
          name: 'createBoard',
          component:  CreateBoard
        }
      ]
    }
  ],
});

export default router;

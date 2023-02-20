import { createRouter, createWebHistory } from "vue-router";
import MainComp from "../Screens/MainScreen.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainComp",
      component: MainComp,
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/VisualizerView.vue"),
    },
    {
      path: "/visualizer",
      name: "visualizer",
      component: () => import("../views/VisualizerView.vue"),
    },
    {
      path: "/training",
      name: "training",
      component: () => import("../views/TrainingView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;

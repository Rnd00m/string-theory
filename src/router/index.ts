import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/ViewerView.vue"),
    },
    {
      path: "/exercise",
      name: "exercise",
      component: () => import("../views/exercises/ExerciseIndexView.vue"),
    },
    {
      path: "/exercise/find-notes",
      name: "exercise.findNotes",
      component: () => import("../views/exercises/fretboard/ExerciseFindNotesView.vue"),
    },
    {
      path: "/exercise/find-intervals",
      name: "exercise.findIntervals",
      component: () => import("../views/exercises/fretboard/ExerciseFindIntervalsView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
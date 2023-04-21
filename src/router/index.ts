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
      name: "exercise.index",
      component: () => import("../views/exercises/ExerciseIndexView.vue"),
    },
    {
      path: "/exercise/fretboard/find-notes",
      name: "exercise.fretboard.findNotes",
      component: () => import("../views/exercises/fretboard/ExerciseFindNotesView.vue"),
    },
    {
      path: "/exercise/fretboard/find-intervals",
      name: "exercise.fretboard.findIntervals",
      component: () => import("../views/exercises/fretboard/ExerciseFindIntervalsView.vue"),
    },
    {
      path: "/exercise/ear-training/find-intervals",
      name: "exercise.earTraining.findIntervals",
      component: () => import("../views/exercises/earTraining/ExerciseIntervalsRecognition.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
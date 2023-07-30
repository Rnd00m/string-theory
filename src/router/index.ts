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
      name: "exercises.index",
      component: () => import("../views/exercises/ExerciseIndexView.vue"),
    },
    {
      path: "/exercise/fretboard/find-notes",
      name: "exercises.fretboard.findNotes",
      component: () =>
        import("../views/exercises/fretboard/ExerciseFindNotesView.vue"),
    },
    {
      path: "/exercise/fretboard/find-intervals",
      name: "exercises.fretboard.findIntervals",
      component: () =>
        import("../views/exercises/fretboard/ExerciseFindIntervalsView.vue"),
    },
    {
      path: "/exercise/ear-training/find-intervals",
      name: "exercises.earTraining.findIntervals",
      component: () =>
        import(
          "../views/exercises/earTraining/ExerciseIntervalsRecognition.vue"
        ),
    },
    {
      path: "/tools",
      name: "tools.index",
      component: () => import("../views/tools/ToolIndexView.vue"),
    },
    {
      path: "/tools/string-tension",
      name: "tools.stringTensionsCalculator",
      component: () =>
        import("../views/tools/ToolStringTensionsCalculatorView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;

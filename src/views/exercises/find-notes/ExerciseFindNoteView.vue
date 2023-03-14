<template>
  <div class="training">
    <ExerciseExplication
      v-if="!isExerciseStarted"
      @exercise-started="isExerciseStarted = true"
    />
    <ExerciseDetail v-else />
  </div>
</template>

<style></style>
<script setup lang="ts">
import ExerciseDetail from "@/modules/exercise/components/ExerciseDetail.vue";
import ExerciseExplication from "@/modules/exercise/components/ExerciseExplication.vue";
import { ref } from "vue";

const isExerciseStarted = ref<boolean>(false);
</script>
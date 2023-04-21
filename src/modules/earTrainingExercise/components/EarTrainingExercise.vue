<template>
  <div
    v-if="!isExerciseStarted"
    class="exercise-wrapper flex justify-center gap-4"
  >
    <BaseCard class="w-10/12 lg:w-full">
      <template #title><slot name="exercise-explication-title"></slot></template>
      <div class="text-base lg:text-md max-w-prose">
        <slot name="exercise-explication-content"></slot>
      </div>
      <template #card-actions>
        <button class="btn btn-primary place-self-end" @click="startExercise">Start</button>
      </template>
    </BaseCard>
  </div>

  <div v-else class="exercise-wrapper grid gap-4 w-80 sm:w-[32rem]">
    <slot name="exercise-detail" />

    <slot name="exercise-responses" />

    <slot name="exercise-modal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BaseCard from "@/components/base/cards/BaseCard.vue";

const emit = defineEmits(["exercise-started"]);
const isExerciseStarted = ref<boolean>(false);

function startExercise() {
  isExerciseStarted.value = true;

  emit("exercise-started");
}
</script>

<style scoped>

</style>
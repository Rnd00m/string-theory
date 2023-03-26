<template>
  <div class="exercise-wrapper flex justify-center gap-4">
    <BaseCard>
      <template #title>Note finding exercise</template>
      <p>A note will be given to you. Find all the occurrences on the fretboard.</p>
      <p>Choose your settings below.</p>
      <template #card-actions>
        <button class="btn btn-primary place-self-end" @click="startExercise">Start</button>
      </template>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from "@/components/base/BaseCard.vue";

const emit = defineEmits(["exercise-started"]);

function startExercise() {
  emit("exercise-started");
}
</script>

<style scoped lang="scss">
</style>